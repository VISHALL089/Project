import { useState, useMemo, useEffect } from 'react'
import { Bookmark } from 'lucide-react'
import { JOBS, Job } from '../data/jobs'
import { JobCard, JobModal } from '../components/JobComponents'
import { JobStatus, StatusMap, getStatusMap, saveStatusMap } from '../utils/status'

export default function Saved() {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [statusMap, setStatusMapState] = useState<StatusMap>({});
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        setStatusMapState(getStatusMap());
    }, []);

    // State initialization matching Dashboard
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

        if (status === 'Not Applied') {
            delete updatedMap[jobId];
        }

        setStatusMapState(updatedMap);
        saveStatusMap(updatedMap);

        if (status !== 'Not Applied') {
            setToastMessage(`Status updated: ${status}`);
            setTimeout(() => setToastMessage(null), 3000);
        }
    };

    const savedJobs = useMemo(() => {
        return JOBS.filter(job => savedJobIds.includes(job.id)).map(job => ({
            ...job,
            currentStatus: statusMap[job.id]?.status || 'Not Applied'
        }));
    }, [savedJobIds, statusMap]);

    return (
        <div>
            <div className="context-header" style={{ textAlign: 'left', marginBottom: 'var(--space-40)' }}>
                <h1 style={{ marginBottom: 'var(--space-8)' }}>Saved Opportunities</h1>
                <p style={{ margin: 0 }}>Jobs you have bookmarked for later consideration.</p>
            </div>

            {savedJobs.length === 0 ? (
                <div className="empty-state" style={{ padding: 'var(--space-64)' }}>
                    <Bookmark size={48} color="var(--border-color)" style={{ marginBottom: 'var(--space-16)' }} />
                    <div style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: 'var(--space-8)' }}>
                        Your saved list is calm and empty.
                    </div>
                    <div>When you bookmark a job, it will appear here for deep review.</div>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: 'var(--space-24)',
                    alignItems: 'stretch'
                }}>
                    {savedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            status={job.currentStatus as JobStatus}
                            onStatusChange={handleStatusChange}
                            onView={setSelectedJob}
                            onSave={toggleSaveJob}
                            isSaved={true}
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
