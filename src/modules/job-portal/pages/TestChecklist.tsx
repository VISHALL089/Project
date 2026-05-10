import { useState, useEffect } from 'react'
import { CheckCircle, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react'

const TEST_ITEMS = [
    { id: 't1', label: 'Preferences persist after refresh', help: 'Set values in /settings, refresh page, ensure they remain.' },
    { id: 't2', label: 'Match score calculates correctly', help: 'Verify the % match badge aligns with scoring rules (e.g. +25 for title).' },
    { id: 't3', label: '"Show only matches" toggle works', help: 'Check the toggle on /dashboard; it should hide jobs below your min score.' },
    { id: 't4', label: 'Save job persists after refresh', help: 'Save a job, refresh, ensure it remains in /saved.' },
    { id: 't5', label: 'Apply opens in new tab', help: 'Click Apply. It should open a _blank target external URL.' },
    { id: 't6', label: 'Status update persists after refresh', help: 'Change a job to "Applied", refresh, ensure it remains Applied.' },
    { id: 't7', label: 'Status filter works correctly', help: 'Dropdown filter for Status should accurately parse the current statuses.' },
    { id: 't8', label: 'Digest generates top 10 by score', help: 'Generate digest. Ensure max 10 jobs appear, sorted highest score first.' },
    { id: 't9', label: 'Digest persists for the day', help: 'Generate digest, refresh page. It should not ask you to generate again.' },
    { id: 't10', label: 'No console errors on main pages', help: 'Open DevTools (F12) -> Console. Ensure no red React rendering errors exist.' }
];

export default function TestChecklist() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerTests');
        if (saved) {
            setCheckedItems(JSON.parse(saved));
        }
    }, []);

    const handleCheck = (id: string, checked: boolean) => {
        const updated = { ...checkedItems, [id]: checked };
        setCheckedItems(updated);
        localStorage.setItem('jobTrackerTests', JSON.stringify(updated));
    };

    const handleReset = () => {
        setCheckedItems({});
        localStorage.removeItem('jobTrackerTests');
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const totalCount = TEST_ITEMS.length;
    const allPassed = passedCount === totalCount;

    return (
        <div>
            <div className="context-header" style={{ textAlign: 'left', marginBottom: 'var(--space-40)' }}>
                <h1 style={{ marginBottom: 'var(--space-8)' }}>System Validation</h1>
                <p style={{ margin: 0 }}>Built-In Test Checklist.</p>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-24)', paddingBottom: 'var(--space-16)', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-16)' }}>
                        <h2 style={{ margin: 0, fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                            Tests Passed: {passedCount} / {totalCount}
                        </h2>
                        {allPassed ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--success-color)', fontSize: '0.875rem', fontWeight: 600, backgroundColor: '#EBF2EE', padding: '4px 12px', borderRadius: '16px' }}>
                                <CheckCircle size={16} /> Ready for Ship Phase
                            </span>
                        ) : (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning-color)', fontSize: '0.875rem', fontWeight: 600, backgroundColor: '#FEF3C7', padding: '4px 12px', borderRadius: '16px' }}>
                                <AlertCircle size={16} /> Resolve all issues before shipping.
                            </span>
                        )}
                    </div>
                    <button className="btn btn-secondary" onClick={handleReset} style={{ fontSize: '0.75rem', padding: '6px 12px' }}>
                        <RefreshCw size={14} /> Reset Test Status
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
                    {TEST_ITEMS.map((item) => (
                        <label key={item.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-16)', padding: 'var(--space-8) 0', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                style={{ width: '20px', height: '20px', accentColor: 'var(--accent-color)', marginTop: '2px' }}
                                checked={!!checkedItems[item.id]}
                                onChange={(e) => handleCheck(item.id, e.target.checked)}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '1rem', fontWeight: 500, color: checkedItems[item.id] ? 'var(--text-secondary)' : 'var(--text-primary)', textDecoration: checkedItems[item.id] ? 'line-through' : 'none' }}>
                                    {item.label}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                                    <HelpCircle size={14} /> {item.help}
                                </div>
                            </div>
                        </label>
                    ))}
                </div>

            </div>
        </div>
    )
}
