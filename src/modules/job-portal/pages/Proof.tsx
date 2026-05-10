import { useState, useEffect } from 'react'
import { Copy, CheckCircle, ExternalLink, Globe, Github } from 'lucide-react'

interface Artifacts {
    lovableLink: string;
    githubLink: string;
    deployedLink: string;
}

const STEPS = [
    "Project Scaffolding & Design System",
    "Core Routing Structure",
    "Realistic Mock Dataset",
    "Preferences & Settings Engine",
    "Deterministic Match Scoring",
    "Stateful Job Tracking",
    "Simulation: Daily Digest",
    "Built-In Test Checklist Validation"
];

export default function Proof() {
    const [artifacts, setArtifacts] = useState<Artifacts>({
        lovableLink: '',
        githubLink: '',
        deployedLink: ''
    });

    const [testsPassed, setTestsPassed] = useState(0);
    const [copyStatus, setCopyStatus] = useState('Copy Final Submission');

    useEffect(() => {
        const savedArtifacts = localStorage.getItem('jobTrackerArtifacts');
        if (savedArtifacts) {
            setArtifacts(JSON.parse(savedArtifacts));
        }

        const savedTests = localStorage.getItem('jobTrackerTests');
        if (savedTests) {
            const parsedTests = JSON.parse(savedTests);
            setTestsPassed(Object.values(parsedTests).filter(Boolean).length);
        }
    }, []);

    const handleChange = (field: keyof Artifacts, value: string) => {
        const updated = { ...artifacts, [field]: value };
        setArtifacts(updated);
        localStorage.setItem('jobTrackerArtifacts', JSON.stringify(updated));
    };

    const isValidUrl = (url: string) => {
        if (!url) return false;
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const hasAllLinks = isValidUrl(artifacts.lovableLink) && isValidUrl(artifacts.githubLink) && isValidUrl(artifacts.deployedLink);
    const isShipped = hasAllLinks && testsPassed === 10;

    // Basic heuristic for status
    let statusBadge = "Not Started";
    if (isShipped) {
        statusBadge = "Shipped";
    } else if (artifacts.lovableLink || artifacts.githubLink || artifacts.deployedLink || testsPassed > 0) {
        statusBadge = "In Progress";
    }

    const handleCopy = () => {
        const text = `------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${artifacts.lovableLink || 'Pending'}

GitHub Repository:
${artifacts.githubLink || 'Pending'}

Live Deployment:
${artifacts.deployedLink || 'Pending'}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------`;

        navigator.clipboard.writeText(text);
        setCopyStatus('Copied to Clipboard!');
        setTimeout(() => setCopyStatus('Copy Final Submission'), 2000);
    };

    return (
        <div>
            <div className="context-header" style={{ textAlign: 'left', marginBottom: 'var(--space-40)' }}>
                <h1 style={{ marginBottom: 'var(--space-8)' }}>Proof of Work</h1>
                <p style={{ margin: 0 }}>Artifact collection and final project submission.</p>
            </div>

            <div className="workspace-layout">
                <div className="primary-workspace" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-24)' }}>

                    <div className="card">
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: 'var(--space-16)' }}>Artifact Collection Inputs</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                            <div>
                                <label className="input-label" htmlFor="lovableLink">Lovable Project Link <span style={{ color: isValidUrl(artifacts.lovableLink) ? 'var(--success-color)' : 'var(--text-secondary)' }}>*</span></label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
                                    <ExternalLink size={20} color="var(--text-secondary)" />
                                    <input
                                        id="lovableLink"
                                        type="url"
                                        className="input-field"
                                        placeholder="https://preview.lovable.dev/..."
                                        value={artifacts.lovableLink}
                                        onChange={(e) => handleChange('lovableLink', e.target.value)}
                                        style={{ flex: 1, borderColor: artifacts.lovableLink && !isValidUrl(artifacts.lovableLink) ? 'var(--warning-color)' : '' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input-label" htmlFor="githubLink">GitHub Repository Link <span style={{ color: isValidUrl(artifacts.githubLink) ? 'var(--success-color)' : 'var(--text-secondary)' }}>*</span></label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
                                    <Github size={20} color="var(--text-secondary)" />
                                    <input
                                        id="githubLink"
                                        type="url"
                                        className="input-field"
                                        placeholder="https://github.com/..."
                                        value={artifacts.githubLink}
                                        onChange={(e) => handleChange('githubLink', e.target.value)}
                                        style={{ flex: 1, borderColor: artifacts.githubLink && !isValidUrl(artifacts.githubLink) ? 'var(--warning-color)' : '' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="input-label" htmlFor="deployedLink">Deployed URL (Vercel/Netlify) <span style={{ color: isValidUrl(artifacts.deployedLink) ? 'var(--success-color)' : 'var(--text-secondary)' }}>*</span></label>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
                                    <Globe size={20} color="var(--text-secondary)" />
                                    <input
                                        id="deployedLink"
                                        type="url"
                                        className="input-field"
                                        placeholder="https://your-deployment.vercel.app"
                                        value={artifacts.deployedLink}
                                        onChange={(e) => handleChange('deployedLink', e.target.value)}
                                        style={{ flex: 1, borderColor: artifacts.deployedLink && !isValidUrl(artifacts.deployedLink) ? 'var(--warning-color)' : '' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', marginBottom: 'var(--space-16)' }}>Final Submission Export</h2>
                        <div style={{ padding: 'var(--space-16)', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap', marginBottom: 'var(--space-16)', color: 'var(--text-secondary)' }}>
                            Job Notification Tracker — Final Submission<br />
                            <br />
                            Lovable Project:<br />
                            {artifacts.lovableLink || 'Pending'}<br />
                            <br />
                            GitHub Repository:<br />
                            {artifacts.githubLink || 'Pending'}<br />
                            <br />
                            Live Deployment:<br />
                            {artifacts.deployedLink || 'Pending'}<br />
                            <br />
                            Core Features:<br />
                            - Intelligent match scoring<br />
                            - Daily digest simulation<br />
                            - Status tracking<br />
                            - Test checklist enforced
                        </div>
                        <button className="btn btn-primary" onClick={handleCopy} style={{ width: '100%' }}>
                            <Copy size={16} /> {copyStatus}
                        </button>

                        {isShipped && (
                            <div style={{ marginTop: 'var(--space-16)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--success-color)', fontWeight: 600 }}>
                                <CheckCircle size={20} /> Project 1 Shipped Successfully.
                            </div>
                        )}
                    </div>

                </div>

                <div className="secondary-panel">
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-16)' }}>
                            <h3 style={{ fontFamily: 'var(--font-heading)', margin: 0, fontSize: '1.125rem' }}>Project 1 Status</h3>
                            <span style={{
                                fontSize: '0.75rem', fontWeight: 600, padding: '4px 12px', borderRadius: '16px',
                                backgroundColor: statusBadge === 'Shipped' ? '#D1FAE5' : statusBadge === 'In Progress' ? '#DBEAFE' : '#EFEFEF',
                                color: statusBadge === 'Shipped' ? '#065f46' : statusBadge === 'In Progress' ? '#1e3a8a' : '#555'
                            }}>
                                {statusBadge}
                            </span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-12)' }}>
                            {STEPS.map((step, idx) => {
                                const isCompleted = idx < 7 ? true : isShipped;
                                return (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 'var(--space-12)', borderBottom: idx < STEPS.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                        <div style={{ fontSize: '0.875rem', color: isCompleted ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isCompleted ? 500 : 400 }}>
                                            Step {idx + 1}: {step}
                                        </div>
                                        <span style={{ fontSize: '0.75rem', color: isCompleted ? 'var(--success-color)' : 'var(--text-secondary)' }}>
                                            {isCompleted ? 'Completed' : 'Pending'}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
