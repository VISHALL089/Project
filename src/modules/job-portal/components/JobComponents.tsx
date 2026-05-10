import { useEffect } from 'react'
import { Briefcase, MapPin, Clock, DollarSign, Bookmark, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Job } from '../data/jobs'
import type { JobStatus } from '../utils/status'
import { useJobStore } from '../../../shared/store/useJobStore'

interface JobCardProps {
    job: Job;
    onView: (job: Job) => void;
    onSave: (jobId: string) => void;
    isSaved?: boolean;
    matchScore?: number;
    status: JobStatus;
    onStatusChange: (jobId: string, status: JobStatus) => void;
}

export function JobCard({ job, onView, onSave, isSaved = false, matchScore, status, onStatusChange }: JobCardProps) {
    const sourceColor =
        job.source === 'LinkedIn' ? '#0077b5' :
            job.source === 'Naukri' ? '#072e61' : '#003a9b';

    let scoreColor = '#555555';
    let scoreBg = '#E2E1DD';
    if (matchScore !== undefined) {
        if (matchScore >= 80) {
            scoreColor = '#4C7766';
            scoreBg = '#EBF2EE';
        } else if (matchScore >= 60) {
            scoreColor = '#D97706';
            scoreBg = '#FEF3C7';
        } else if (matchScore >= 40) {
            scoreColor = '#111111';
            scoreBg = '#EFEFEF';
        } else {
            scoreColor = '#777777';
            scoreBg = '#F7F6F3';
        }
    }

    let statusColor = '#111111';
    let statusBg = '#EFEFEF';
    if (status === 'Applied') {
        statusColor = '#1e3a8a'; // Blue
        statusBg = '#DBEAFE';
    } else if (status === 'Rejected') {
        statusColor = '#991b1b'; // Red
        statusBg = '#FEE2E2';
    } else if (status === 'Selected') {
        statusColor = '#065f46'; // Green
        statusBg = '#D1FAE5';
    }

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--text-primary)' }}>{job.title}</h3>
                    <div style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{job.company}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {matchScore !== undefined && (
                        <span style={{
                            fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px',
                            backgroundColor: scoreBg, color: scoreColor, fontWeight: 700
                        }}>
                            {matchScore}% Match
                        </span>
                    )}
                    <span
                        style={{
                            fontSize: '0.75rem', padding: '2px 8px', borderRadius: '12px',
                            backgroundColor: `${sourceColor}20`, color: sourceColor, fontWeight: 600
                        }}>
                        {job.source}
                    </span>
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-16)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={16} /> {job.location} • {job.mode}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Briefcase size={16} /> {job.experience}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <DollarSign size={16} /> {job.salaryRange}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={16} /> {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}
                </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-8)', alignItems: 'center', marginTop: 'auto', paddingTop: 'var(--space-16)' }}>

                {/* Status Dropdown */}
                <select
                    className="input-field"
                    style={{ flex: 1, appearance: 'auto', padding: '10px 12px', fontSize: '0.875rem', fontWeight: 600, backgroundColor: statusBg, color: statusColor, borderColor: statusBg }}
                    value={status}
                    onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
                >
                    <option value="Not Applied" style={{ background: '#fff', color: '#111' }}>Not Applied</option>
                    <option value="Applied" style={{ background: '#fff', color: '#1e3a8a' }}>Applied</option>
                    <option value="Rejected" style={{ background: '#fff', color: '#991b1b' }}>Rejected</option>
                    <option value="Selected" style={{ background: '#fff', color: '#065f46' }}>Selected</option>
                </select>

                <button className="btn btn-secondary" style={{ padding: '10px' }} onClick={() => onView(job)} title="View Detail">
                    <Briefcase size={16} />
                </button>

                <button
                    className="btn btn-secondary"
                    style={{
                        padding: '10px',
                        borderColor: isSaved ? 'var(--accent-color)' : '',
                        color: isSaved ? 'var(--accent-color)' : ''
                    }}
                    onClick={() => onSave(job.id)}
                    title="Save Job"
                >
                    <Bookmark size={16} fill={isSaved ? 'var(--accent-color)' : 'none'} color={isSaved ? 'var(--accent-color)' : 'currentColor'} />
                </button>

                <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" title="Apply External" style={{ padding: '10px' }}>
                    <ExternalLink size={16} />
                </a>
            </div>
        </div>
    )
}

export function JobModal({ job, onClose }: { job: Job | null, onClose: () => void }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (job) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [job]);

    if (!job) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'var(--space-24)'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-24)' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>{job.title}</h2>
                        <div style={{ fontSize: '1.125rem', color: 'var(--text-secondary)' }}>{job.company}</div>
                    </div>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>&times;</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)', marginBottom: 'var(--space-24)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-16)', flexWrap: 'wrap', paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--border-color)' }}>
                        <div><strong>Location:</strong> {job.location} ({job.mode})</div>
                        <div><strong>Experience:</strong> {job.experience}</div>
                        <div><strong>Salary:</strong> {job.salaryRange}</div>
                        <div><strong>Posted:</strong> {job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo} days ago`}</div>
                        <div><strong>Source:</strong> {job.source}</div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-8)' }}>Description</h3>
                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{job.description}</p>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-8)' }}>Key Skills</h3>
                        <div style={{ display: 'flex', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
                            {job.skills.map(skill => (
                                <span key={skill} style={{ padding: '4px 12px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '16px', fontSize: '0.875rem' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-16)', justifyContent: 'flex-end', paddingTop: 'var(--space-16)', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                    <button className="btn btn-secondary" onClick={() => {
                        useJobStore.getState().setSelectedJob({
                            id: job.id,
                            title: job.title,
                            company: job.company,
                            description: job.description,
                            skills: job.skills,
                            location: job.location,
                            experience: job.experience
                        });
                        navigate('/readiness/dashboard/analyzer');
                    }} style={{ backgroundColor: '#DBEAFE', color: '#1e3a8a', borderColor: '#DBEAFE' }}>
                        Prepare in Readiness
                    </button>
                    
                    <button className="btn btn-secondary" onClick={() => {
                        useJobStore.getState().setSelectedJob({
                            id: job.id,
                            title: job.title,
                            company: job.company,
                            description: job.description,
                            skills: job.skills,
                            location: job.location,
                            experience: job.experience
                        });
                        navigate('/resume/builder');
                    }} style={{ backgroundColor: '#D1FAE5', color: '#065f46', borderColor: '#D1FAE5' }}>
                        Build Resume
                    </button>

                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                    <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    )
}
