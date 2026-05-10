import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { JOBS, Job } from '../data/jobs'
import { JobCard, JobModal } from '../components/JobComponents'
import { Preferences, calculateMatchScore, extractSalaryNum } from '../utils/scoring'
import { JobStatus, StatusMap, getStatusMap, saveStatusMap } from '../utils/status'

export default function Dashboard() {
    const [keyword, setKeyword] = useState('');
    const [locationStr, setLocationStr] = useState('');
    const [mode, setMode] = useState('');
    const [experience, setExperience] = useState('');
    const [source, setSource] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [sortBy, setSortBy] = useState('latest');
    const [showOnlyMatches, setShowOnlyMatches] = useState(false);

    const [prefs, setPrefs] = useState<Preferences | null>(null);
    const [statusMap, setStatusMapState] = useState<StatusMap>({});

    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            setPrefs(JSON.parse(saved));
        }
        setStatusMapState(getStatusMap());
    }, []);

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
        const saved = localStorage.getItem('savedJobs');
        return saved ? JSON.parse(saved) : [];
    });

    const toggleSaveJob = (jobId: string) => {
        setSavedJobIds(prev => {
            const isSaved = prev.includes(jobId);
            const updated = isSaved ? prev.filter(id => id !== jobId) : [...prev, jobId];
            localStorage.setItem('savedJobs', JSON.stringify(updated));
            return updated;
        });
    };

    const handleStatusChange = (jobId: string, status: JobStatus) => {
        const updatedMap = {
            ...statusMap,
            [jobId]: { status, dateChanged: new Date().toISOString() }
        };

        // If resetting to Not Applied, we can either delete or persist
        if (status === 'Not Applied') {
            delete updatedMap[jobId];
        }

        setStatusMapState(updatedMap);
        saveStatusMap(updatedMap);

        // Toast Logic
        if (status !== 'Not Applied') {
            setToastMessage(`Status updated: ${status}`);
            setTimeout(() => setToastMessage(null), 3000);
        }
    };

    const processedJobs = useMemo(() => {
        // Phase 1: Score & Filter
        let filtered = JOBS.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, prefs),
            currentStatus: statusMap[job.id]?.status || 'Not Applied'
        })).filter(job => {
            // Base UI Filters (AND logic)
            const matchesKeyword = keyword === '' ||
                job.title.toLowerCase().includes(keyword.toLowerCase()) ||
                job.company.toLowerCase().includes(keyword.toLowerCase());
            const matchesLocation = locationStr === '' || job.location.toLowerCase().includes(locationStr.toLowerCase());
            const matchesMode = mode === '' || job.mode === mode;
            const matchesExp = experience === '' || job.experience === experience;
            const matchesSource = source === '' || job.source === source;
            const matchesStatus = statusFilter === '' || job.currentStatus === statusFilter;

            const passesBaseFilters = matchesKeyword && matchesLocation && matchesMode && matchesExp && matchesSource && matchesStatus;

            // Toggle Filter
            if (showOnlyMatches && prefs) {
                return passesBaseFilters && job.matchScore >= prefs.minMatchScore;
            }
            return passesBaseFilters;
        });

        // Phase 2: Sort
        return filtered.sort((a, b) => {
            if (sortBy === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
            if (sortBy === 'score') return b.matchScore - a.matchScore;
            if (sortBy === 'salary') return extractSalaryNum(b.salaryRange) - extractSalaryNum(a.salaryRange);
            return 0; // Default
        });
    }, [keyword, locationStr, mode, experience, source, statusFilter, sortBy, showOnlyMatches, prefs, statusMap]);

    return (
        <div>
            <div className="context-header" style={{ textAlign: 'left', marginBottom: 'var(--space-40)' }}>
                <h1 style={{ marginBottom: 'var(--space-8)' }}>Dashboard</h1>
                <p style={{ margin: 0 }}>Discover your precision-matched opportunities.</p>
            </div>

            {!prefs && (
                <div className="card" style={{ backgroundColor: '#FEF3C7', borderColor: '#D97706', marginBottom: 'var(--space-24)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ color: '#D97706', fontWeight: 500 }}>
                        Set your preferences to activate intelligent matching.
                    </div>
                    <Link to="/settings" className="btn btn-primary" style={{ backgroundColor: '#D97706', color: '#fff' }}>Go to Settings</Link>
                </div>
            )}

            {/* FILTER BAR UI */}
            <div className="card" style={{ padding: 'var(--space-16)', marginBottom: 'var(--space-24)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-16)', flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 'var(--space-16)' }}>
                    <div style={{ flex: '1 1 200px' }}>
                        <label className="input-label" htmlFor="search-keyword">Keyword Search</label>
                        <input id="search-keyword" className="input-field" placeholder="Job title or company" value={keyword} onChange={e => setKeyword(e.target.value)} />
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <label className="input-label" htmlFor="location-filter">Location</label>
                        <input id="location-filter" className="input-field" placeholder="City" value={locationStr} onChange={e => setLocationStr(e.target.value)} />
                    </div>
                    <div style={{ flex: '1 1 120px' }}>
                        <label className="input-label" htmlFor="mode-filter">Mode</label>
                        <select id="mode-filter" className="input-field" value={mode} onChange={e => setMode(e.target.value)} style={{ appearance: 'auto' }}>
                            <option value="">All</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="Onsite">Onsite</option>
                        </select>
                    </div>
                    <div style={{ flex: '1 1 120px' }}>
                        <label className="input-label" htmlFor="exp-filter">Experience</label>
                        <select id="exp-filter" className="input-field" value={experience} onChange={e => setExperience(e.target.value)} style={{ appearance: 'auto' }}>
                            <option value="">All</option>
                            <option value="Fresher">Fresher</option>
                            <option value="0-1">0-1 yrs</option>
                            <option value="1-3">1-3 yrs</option>
                            <option value="3-5">3-5 yrs</option>
                        </select>
                    </div>
                    <div style={{ flex: '1 1 120px' }}>
                        <label className="input-label" htmlFor="source-filter">Source</label>
                        <select id="source-filter" className="input-field" value={source} onChange={e => setSource(e.target.value)} style={{ appearance: 'auto' }}>
                            <option value="">All</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Naukri">Naukri</option>
                            <option value="Indeed">Indeed</option>
                        </select>
                    </div>
                    <div style={{ flex: '1 1 120px' }}>
                        <label className="input-label" htmlFor="status-filter">Status</label>
                        <select id="status-filter" className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ appearance: 'auto' }}>
                            <option value="">All</option>
                            <option value="Not Applied">Not Applied</option>
                            <option value="Applied">Applied</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Selected">Selected</option>
                        </select>
                    </div>
                    <div style={{ flex: '1 1 120px' }}>
                        <label className="input-label" htmlFor="sort-filter">Sort</label>
                        <select id="sort-filter" className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ appearance: 'auto' }}>
                            <option value="latest">Latest First</option>
                            <option value="score">Match Score</option>
                            <option value="salary">Salary (High to Low)</option>
                        </select>
                    </div>
                </div>

                {prefs && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--space-16)' }}>
                        <label className="checkbox-item" style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                            <input
                                type="checkbox"
                                checked={showOnlyMatches}
                                onChange={e => setShowOnlyMatches(e.target.checked)}
                                style={{ width: '18px', height: '18px' }}
                            />
                            Show only jobs above my threshold ({prefs.minMatchScore}%)
                        </label>
                    </div>
                )}
            </div>

            {/* RENDER JOBS */}
            {processedJobs.length === 0 ? (
                <div className="empty-state">
                    <div style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 'var(--space-8)' }}>
                        No jobs yet
                    </div>
                    <div>Adjust filters or lower threshold.</div>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: 'var(--space-24)',
                    alignItems: 'stretch'
                }}>
                    {processedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            matchScore={job.matchScore}
                            status={job.currentStatus as JobStatus}
                            onStatusChange={handleStatusChange}
                            onView={setSelectedJob}
                            onSave={toggleSaveJob}
                            isSaved={savedJobIds.includes(job.id)}
                        />
                    ))}
                </div>
            )}

            {/* MODAL */}
            <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />

            {/* TOAST */}
            {toastMessage && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    backgroundColor: '#111',
                    color: '#fff',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    zIndex: 100,
                    fontWeight: 500,
                    animation: 'fadein 0.3s'
                }}>
                    {toastMessage}
                </div>
            )}
        </div>
    )
}
