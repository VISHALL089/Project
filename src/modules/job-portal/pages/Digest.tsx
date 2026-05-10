import { useState, useEffect, useMemo } from 'react'
import { Mail, Copy, Send } from 'lucide-react'
import { JOBS, Job } from '../data/jobs'
import { Preferences, calculateMatchScore } from '../utils/scoring'
import { getStatusMap, StatusMap } from '../utils/status'
import { Link } from 'react-router-dom'

export default function Digest() {
    const [prefs, setPrefs] = useState<Preferences | null>(null);
    const [digestJobs, setDigestJobs] = useState<(Job & { matchScore?: number })[]>([]);
    const [hasGenerated, setHasGenerated] = useState(false);
    const [copyStatus, setCopyStatus] = useState('Copy Digest to Clipboard');
    const [statusMap, setStatusMapState] = useState<StatusMap>({});

    const todayStr = useMemo(() => {
        const d = new Date();
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    }, []);

    const storageKey = `jobTrackerDigest_${todayStr}`;

    useEffect(() => {
        const savedPrefs = localStorage.getItem('jobTrackerPreferences');
        if (savedPrefs) {
            setPrefs(JSON.parse(savedPrefs));
        }

        const savedDigest = localStorage.getItem(storageKey);
        if (savedDigest) {
            setDigestJobs(JSON.parse(savedDigest));
            setHasGenerated(true);
        }

        setStatusMapState(getStatusMap());
    }, [storageKey]);

    const recentUpdates = useMemo(() => {
        const sorted = Object.entries(statusMap)
            .sort(([, a], [, b]) => new Date(b.dateChanged).getTime() - new Date(a.dateChanged).getTime())
            .slice(0, 5); // Show latest 5

        return sorted.map(([jobId, record]) => {
            const job = JOBS.find(j => j.id === jobId);
            return { job, record };
        }).filter(item => item.job !== undefined); // TS checker
    }, [statusMap]);

    const generateDigest = () => {
        if (!prefs) return;

        const scoredJobs = JOBS.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, prefs)
        }));

        const qualifiedJobs = scoredJobs.filter(job => job.matchScore >= prefs.minMatchScore);

        qualifiedJobs.sort((a, b) => {
            if (b.matchScore !== a.matchScore) {
                return b.matchScore - a.matchScore;
            }
            return a.postedDaysAgo - b.postedDaysAgo;
        });

        const top10 = qualifiedJobs.slice(0, 10);

        setDigestJobs(top10);
        setHasGenerated(true);
        localStorage.setItem(storageKey, JSON.stringify(top10));
    };

    const getPlainTextDigest = () => {
        let text = `Top 10 Jobs For You — 9AM Digest (${todayStr})\n\n`;
        if (digestJobs.length === 0) {
            text += "No matching roles today. Check again tomorrow.\n";
        } else {
            digestJobs.forEach((job, idx) => {
                text += `${idx + 1}. ${job.title} at ${job.company}\n`;
                text += `   - Location: ${job.location} | Mode: ${job.mode}\n`;
                text += `   - Exp: ${job.experience} | Match: ${job.matchScore}%\n`;
                text += `   - Apply: ${job.applyUrl}\n\n`;
            });
        }
        text += "This digest was generated based on your preferences.";
        return text;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(getPlainTextDigest());
        setCopyStatus('Copied!');
        setTimeout(() => setCopyStatus('Copy Digest to Clipboard'), 2000);
    };

    const handleEmail = () => {
        const subject = encodeURIComponent("My 9AM Job Digest");
        const body = encodeURIComponent(getPlainTextDigest());
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };

    if (!prefs) {
        return (
            <div>
                <div className="context-header" style={{ textAlign: 'left', marginBottom: 'var(--space-40)' }}>
                    <h1 style={{ marginBottom: 'var(--space-8)' }}>Daily Digest</h1>
                    <p style={{ margin: 0 }}>Your curated 9AM delivery.</p>
                </div>

                <div className="card" style={{ backgroundColor: '#FEF3C7', borderColor: '#D97706', padding: 'var(--space-24)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-16)' }}>
                    <h3 style={{ color: '#D97706', margin: 0, fontFamily: 'var(--font-body)', fontSize: '1.125rem' }}>Set preferences to generate a personalized digest.</h3>
                    <Link to="/settings" className="btn btn-primary" style={{ backgroundColor: '#D97706', color: '#fff' }}>Go to Settings</Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="context-header" style={{ textAlign: 'left', marginBottom: 'var(--space-40)' }}>
                <h1 style={{ marginBottom: 'var(--space-8)' }}>Daily Digest</h1>
                <p style={{ margin: 0 }}>Your curated 9AM delivery.</p>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 'var(--space-8)' }}>
                    Demo Mode: Daily 9AM trigger simulated manually.
                </div>
            </div>

            <div className="workspace-layout">

                {/* Main Digest Area - 70% */}
                <div className="primary-workspace">
                    {!hasGenerated ? (
                        <div className="empty-state" style={{ padding: 'var(--space-64)' }}>
                            <Mail size={48} color="var(--border-color)" style={{ marginBottom: 'var(--space-16)' }} />
                            <div style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 'var(--space-8)' }}>
                                No digest generated today.
                            </div>
                            <button className="btn btn-primary" onClick={generateDigest} style={{ marginTop: 'var(--space-16)' }}>
                                Generate Today's 9AM Digest (Simulated)
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'flex', gap: 'var(--space-16)', marginBottom: 'var(--space-24)', justifyContent: 'flex-end' }}>
                                <button className="btn btn-secondary" onClick={handleCopy}>
                                    <Copy size={16} /> {copyStatus}
                                </button>
                                <button className="btn btn-primary" onClick={handleEmail}>
                                    <Send size={16} /> Create Email Draft
                                </button>
                            </div>

                            {/* Email Style Container */}
                            <div className="card" style={{ padding: 0, overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
                                <div style={{ backgroundColor: 'var(--accent-color)', color: 'white', padding: 'var(--space-32) var(--space-40)', textAlign: 'center' }}>
                                    <h2 style={{ margin: '0 0 var(--space-8) 0', fontSize: '1.75rem' }}>Top {digestJobs.length} Jobs For You — 9AM Digest</h2>
                                    <div style={{ opacity: 0.9, fontSize: '0.875rem' }}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>

                                <div style={{ padding: 'var(--space-40)' }}>
                                    {digestJobs.length === 0 ? (
                                        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: 'var(--space-40) 0' }}>
                                            <div style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 'var(--space-8)' }}>
                                                No matching roles today.
                                            </div>
                                            <div>Check again tomorrow.</div>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-32)' }}>
                                            {digestJobs.map((job, index) => (
                                                <div key={job.id} style={{ borderBottom: index < digestJobs.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: index < digestJobs.length - 1 ? 'var(--space-32)' : '0' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-8)' }}>
                                                        <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--accent-color)' }}>{job.title}</h3>
                                                        <span style={{ backgroundColor: '#EBF2EE', color: '#4C7766', padding: '4px 8px', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600 }}>
                                                            {job.matchScore}% Match
                                                        </span>
                                                    </div>

                                                    <div style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: 'var(--space-16)' }}>
                                                        {job.company}
                                                    </div>

                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-16)' }}>
                                                        <div><strong>Location:</strong> {job.location} ({job.mode})</div>
                                                        <div><strong>Experience:</strong> {job.experience}</div>
                                                    </div>

                                                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ width: '100%', borderColor: 'var(--border-color)' }}>
                                                        Review & Apply
                                                    </a>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={{ backgroundColor: 'var(--bg-color)', padding: 'var(--space-24)', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-color)' }}>
                                    This digest was generated based on your preferences.<br />
                                    KodNest Premium Build System
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Support Panel - 30% */}
                <div className="secondary-panel">
                    <div className="card">
                        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.125rem', marginBottom: 'var(--space-16)', color: 'var(--text-primary)' }}>Recent Status Updates</h3>

                        {recentUpdates.length === 0 ? (
                            <p style={{ fontSize: '0.875rem', margin: 0, color: 'var(--text-secondary)' }}>No jobs tracked yet.</p>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                                {recentUpdates.map((item, idx) => {
                                    let badgeBg = '#EFEFEF';
                                    let badgeCol = '#111';
                                    if (item.record.status === 'Applied') { badgeBg = '#DBEAFE'; badgeCol = '#1e3a8a'; }
                                    if (item.record.status === 'Rejected') { badgeBg = '#FEE2E2'; badgeCol = '#991b1b'; }
                                    if (item.record.status === 'Selected') { badgeBg = '#D1FAE5'; badgeCol = '#065f46'; }

                                    return (
                                        <div key={idx} style={{ paddingBottom: idx < recentUpdates.length - 1 ? 'var(--space-16)' : '0', borderBottom: idx < recentUpdates.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.job?.title}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{item.job?.company}</div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 600, backgroundColor: badgeBg, color: badgeCol, padding: '2px 6px', borderRadius: '4px' }}>
                                                    {item.record.status}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                    {new Date(item.record.dateChanged).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
