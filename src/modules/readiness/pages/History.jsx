import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { getHistory } from '../lib/analyzer';
import { Building2, Calendar, ChevronRight, Briefcase, AlertCircle } from 'lucide-react';

export default function History() {
    const [history, setHistory] = useState([]);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        setHistory(getHistory());
        if (sessionStorage.getItem('history_corrupted') === 'true') {
            setShowWarning(true);
        }
    }, []);

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Analysis History</h2>
                    <p className="text-gray-500">Your past JD analyses and preparation roadmaps.</p>
                </div>
                <Link to="/dashboard/analyzer" className="px-5 py-2.5 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/20">
                    New Analysis
                </Link>
            </div>

            {showWarning && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 px-6 py-4 rounded-2xl flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-medium">One saved entry couldn't be loaded. Create a new analysis.</p>
                    </div>
                    <button
                        onClick={() => {
                            setShowWarning(false);
                            sessionStorage.removeItem('history_corrupted');
                        }}
                        className="text-amber-900/50 hover:text-amber-900 font-bold"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {history.length === 0 ? (
                <Card className="text-center py-20 pointer-events-none">
                    <CardContent className="space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                            <Calendar className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-400">No history found yet</h3>
                        <p className="max-w-xs mx-auto text-gray-400">Your JD analysis results will appear here once you run them.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {history.map((item) => (
                        <Link key={item.id} to={`/results/${item.id}`}>
                            <Card className="hover:border-primary-300 hover:shadow-lg transition-all cursor-pointer group">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex gap-6 items-center">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl ${item.finalScore > 80 ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' :
                                            item.finalScore > 50 ? 'bg-primary-50 text-primary-500' :
                                                'bg-gray-100 text-gray-500'
                                            }`}>
                                            {item.finalScore}
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-gray-400" /> {item.company}
                                            </h3>
                                            <div className="flex gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {item.role}</span>
                                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-primary-500 transition-all group-hover:translate-x-1" />
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
