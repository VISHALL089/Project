import { useState, useEffect } from 'react'
import { Preferences } from '../utils/scoring'

const COMMON_LOCATIONS = [
    'Bengaluru', 'Pune', 'Hyderabad', 'Chennai', 'Mumbai', 'Gurugram', 'Noida', 'Remote'
];

export default function Settings() {
    const [prefs, setPrefs] = useState<Preferences>({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: '',
        skills: '',
        minMatchScore: 40,
    });

    const [savedMessage, setSavedMessage] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            setPrefs(JSON.parse(saved));
        }
    }, []);

    const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setPrefs({ ...prefs, preferredLocations: values });
    };

    const handleModeChange = (mode: string, checked: boolean) => {
        setPrefs(prev => ({
            ...prev,
            preferredMode: checked
                ? [...prev.preferredMode, mode]
                : prev.preferredMode.filter(m => m !== mode)
        }));
    };

    const handleSave = () => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setSavedMessage('Preferences saved successfully!');
        setTimeout(() => setSavedMessage(''), 3000);
    };

    return (
        <div>
            <div className="context-header" style={{ textAlign: 'left', marginBottom: 'var(--space-40)' }}>
                <h1 style={{ marginBottom: 'var(--space-8)' }}>Tracking Settings</h1>
                <p style={{ margin: 0 }}>Define your perfect opportunity profile.</p>
            </div>

            <div className="workspace-layout">
                <div className="primary-workspace card">
                    <div style={{ display: 'grid', gap: 'var(--space-24)' }}>
                        <div>
                            <label className="input-label" htmlFor="role-keywords">Role Keywords (comma-separated)</label>
                            <input
                                id="role-keywords"
                                className="input-field"
                                type="text"
                                placeholder="e.g. Frontend, React, Product Designer"
                                value={prefs.roleKeywords}
                                onChange={e => setPrefs({ ...prefs, roleKeywords: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="input-label" htmlFor="skills">Skills (comma-separated)</label>
                            <input
                                id="skills"
                                className="input-field"
                                type="text"
                                placeholder="e.g. JavaScript, Python, AWS"
                                value={prefs.skills}
                                onChange={e => setPrefs({ ...prefs, skills: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="input-label" htmlFor="locations">Preferred Locations (Multi-select)</label>
                            <select
                                id="locations"
                                multiple
                                className="input-field"
                                style={{ height: '120px', padding: '8px' }}
                                value={prefs.preferredLocations}
                                onChange={handleLocationChange}
                            >
                                {COMMON_LOCATIONS.map(loc => (
                                    <option key={loc} value={loc} style={{ padding: '8px', cursor: 'pointer' }}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                Hold Ctrl (Windows) or Cmd (Mac) to select multiple.
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-24)' }}>
                            <div>
                                <label className="input-label">Mode</label>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
                                    {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                        <label key={mode} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                checked={prefs.preferredMode.includes(mode)}
                                                onChange={(e) => handleModeChange(mode, e.target.checked)}
                                            />
                                            {mode}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="input-label" htmlFor="experience">Experience Level</label>
                                <select
                                    id="experience"
                                    className="input-field"
                                    style={{ appearance: 'auto' }}
                                    value={prefs.experienceLevel}
                                    onChange={e => setPrefs({ ...prefs, experienceLevel: e.target.value })}
                                >
                                    <option value="">Select Level...</option>
                                    <option value="Fresher">Fresher</option>
                                    <option value="0-1">0-1 yrs</option>
                                    <option value="1-3">1-3 yrs</option>
                                    <option value="3-5">3-5 yrs</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="input-label" htmlFor="score">
                                Minimum Match Threshold: {prefs.minMatchScore}
                            </label>
                            <input
                                id="score"
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={prefs.minMatchScore}
                                onChange={e => setPrefs({ ...prefs, minMatchScore: parseInt(e.target.value) })}
                                style={{ width: '100%', accentColor: 'var(--accent-color)' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                <span>Broad Match</span>
                                <span>Laser Focused</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'var(--space-40)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ color: 'var(--success-color)', fontWeight: 500 }}>
                            {savedMessage}
                        </div>
                        <button className="btn btn-primary" onClick={handleSave}>Save Preferences</button>
                    </div>
                </div>

                <div className="secondary-panel">
                    <div className="card">
                        <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', marginBottom: 'var(--space-8)' }}>Why this matters</h3>
                        <p style={{ fontSize: '0.875rem', marginBottom: 0 }}>
                            Your preferences act as robust factors for the matching engine. The algorithm dynamically scores each job from 0 to 100 based on your exact specifications.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
