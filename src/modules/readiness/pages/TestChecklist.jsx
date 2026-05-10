import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { CheckCircle2, AlertCircle, Info, RotateCcw, Ship } from 'lucide-react';
import { Link } from 'react-router-dom';

const TEST_ITEMS = [
    { id: 'jd-required', label: 'JD required validation works', hint: 'Go to Home, try analyzing with empty JD.' },
    { id: 'short-jd', label: 'Short JD warning shows for <200 chars', hint: 'Paste a small sentence in JD and see if yellow warning appears.' },
    { id: 'skill-groups', label: 'Skills extraction groups correctly', hint: 'Check if Java/Python are in Languages, React/Vue in Web, etc.' },
    { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Check if "Enterprise" show different rounds than a random company.' },
    { id: 'deterministic-score', label: 'Score calculation is deterministic', hint: 'Analyze same JD twice, check if baseScore is identical.' },
    { id: 'live-toggles', label: 'Skill toggles update score live', hint: 'On results page, check a skill and watch the circle score grow.' },
    { id: 'refresh-persist', label: 'Changes persist after refresh', hint: 'Toggle score, refresh the page, see if it stays checked.' },
    { id: 'history-saves', label: 'History saves and loads correctly', hint: 'Go to history page, verify recent analyses are listed.' },
    { id: 'export-content', label: 'Export buttons copy the correct content', hint: 'Click Copy or Download, verify text contains plan and score.' },
    { id: 'console-errors', label: 'No console errors on core pages', hint: 'Open DevTools (F12) and browse Home, Results, and History.' }
];

export default function TestChecklist() {
    const [checkedItems, setCheckedItems] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('prp_test_checklist', JSON.stringify(checkedItems));
    }, [checkedItems]);

    const handleToggle = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleReset = () => {
        if (window.confirm('Reset all test progress?')) {
            setCheckedItems({});
        }
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const allPassed = passedCount === 10;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header & Progress */}
                <div className="bg-white p-8 rounded-[32px] shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Post-Hardening Tests</h1>
                            <p className="text-gray-500 mt-1 font-medium italic">PLACEMENT READINESS PLATFORM v1.2</p>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-black text-primary-500">{passedCount}/10</div>
                            <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest leading-none">Tests Passed</div>
                        </div>
                    </div>

                    {!allPassed ? (
                        <div className="mt-8 p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-center gap-3 text-amber-700">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-bold tracking-tight">Fix issues before shipping. All 10 tests must be passed.</p>
                        </div>
                    ) : (
                        <div className="mt-8 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3 text-emerald-700">
                            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                            <p className="text-sm font-bold tracking-tight">System validated. Ready for deployment.</p>
                        </div>
                    )}
                </div>

                {/* Checklist */}
                <div className="space-y-4">
                    {TEST_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleToggle(item.id)}
                            className={`group cursor-pointer p-5 bg-white rounded-2xl border transition-all duration-200 flex items-start gap-4 ${checkedItems[item.id]
                                    ? 'border-primary-500 shadow-lg shadow-primary-500/5 bg-primary-50/10'
                                    : 'border-gray-100 hover:border-gray-300'
                                }`}
                        >
                            <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${checkedItems[item.id]
                                    ? 'bg-primary-500 border-primary-500 text-white'
                                    : 'border-gray-300 group-hover:border-primary-400'
                                }`}>
                                {checkedItems[item.id] && <Check className="w-4 h-4" />}
                            </div>

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className={`font-bold transition-colors ${checkedItems[item.id] ? 'text-primary-900' : 'text-gray-700'}`}>
                                        {item.label}
                                    </h3>
                                    {checkedItems[item.id] && (
                                        <span className="text-[10px] bg-primary-500 text-white px-2 py-0.5 rounded-full font-black uppercase">Passed</span>
                                    )}
                                </div>
                                <div className="mt-1 flex items-center gap-2 text-xs text-gray-400 font-medium italic">
                                    <Info className="w-3 h-3" />
                                    {item.hint}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-4">
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-gray-900 font-bold transition-all text-sm group"
                    >
                        <RotateCcw className="w-4 h-4 group-hover:rotate-[-45deg] transition-transform" />
                        Reset Checklist
                    </button>

                    <Link
                        to="/prp/08-ship"
                        className={`px-10 py-4 rounded-2xl font-black text-lg flex items-center gap-3 transition-all ${allPassed
                                ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-xl shadow-primary-500/30 hover:-translate-y-1'
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                            }`}
                        onClick={(e) => !allPassed && e.preventDefault()}
                    >
                        Go to Ship <Ship className="w-5 h-5" />
                    </Link>
                </div>

            </div>
        </div>
    );
}

function Check({ className }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
