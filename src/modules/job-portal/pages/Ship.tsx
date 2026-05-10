import { useState, useEffect } from 'react'
import { Rocket, Lock } from 'lucide-react'

export default function Ship() {
    const [passedCount, setPassedCount] = useState(0);
    const totalTests = 10; // Must match TEST_ITEMS length in TestChecklist.tsx

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerTests');
        if (saved) {
            const parsed = JSON.parse(saved);
            const count = Object.values(parsed).filter(Boolean).length;
            setPassedCount(count);
        }
    }, []);

    const isUnlocked = passedCount === totalTests;

    return (
        <div>
            <div className="context-header" style={{ textAlign: 'left', marginBottom: 'var(--space-40)' }}>
                <h1 style={{ marginBottom: 'var(--space-8)' }}>Deploy Phase</h1>
                <p style={{ margin: 0 }}>Launch your KodNest Premium Build System.</p>
            </div>

            <div className="empty-state" style={{ maxWidth: '600px', margin: '0 auto', padding: 'var(--space-64)' }}>
                {isUnlocked ? (
                    <>
                        <Rocket size={48} color="var(--success-color)" style={{ marginBottom: 'var(--space-24)' }} />
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-8)' }}>
                            Ship Lock Disengaged.
                        </div>
                        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-24)' }}>
                            All 10 tests passed flawlessly. Your premium system is verified.
                        </div>
                        <button className="btn btn-primary" style={{ backgroundColor: 'var(--success-color)' }}>
                            Deploy to Production
                        </button>
                    </>
                ) : (
                    <>
                        <Lock size={48} color="var(--warning-color)" style={{ marginBottom: 'var(--space-24)' }} />
                        <div style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 'var(--space-8)' }}>
                            Ship Lock Engaged.
                        </div>
                        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 'var(--space-24)' }}>
                            You have passed {passedCount} / {totalTests} mandatory checks. Resolve remaining issues to unlock deployment.
                        </div>
                        <button className="btn btn-secondary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                            Deploy to Production
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
