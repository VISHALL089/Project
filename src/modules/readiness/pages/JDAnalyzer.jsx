import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { analyzeJD, saveToHistory } from '../lib/analyzer';
import { Send, FileText, Building2, Briefcase, AlertCircle } from 'lucide-react';
import { useJobStore } from '../../../shared/store/useJobStore';

export default function JDAnalyzer() {
    const { selectedJob } = useJobStore();
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedJob) {
            setCompany(selectedJob.company || '');
            setRole(selectedJob.title || '');
            setJdText(selectedJob.description || '');
        }
    }, [selectedJob]);

    const handleAnalyze = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate a bit of processing for "premium" feel
        setTimeout(() => {
            const analysis = analyzeJD(company, role, jdText);
            saveToHistory(analysis);
            setLoading(false);
            navigate(`/results/${analysis.id}`);
        }, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-gray-900">JD Analyzer</h2>
                <p className="text-gray-500">Paste your job description and get a customized preparation roadmap.</p>
            </div>

            <Card className="border-primary-100 shadow-xl shadow-primary-500/5">
                <CardHeader className="border-b border-gray-50 flex flex-row items-center gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-500">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <CardTitle>Job Details</CardTitle>
                        <p className="text-sm text-gray-500 italic">No external scraping, everything runs locally.</p>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <form onSubmit={handleAnalyze} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" /> Company Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Google, Microsoft"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <Briefcase className="w-4 h-4" /> Role Position (Optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Software Engineer, Frontend Intern"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                                Job Description (Required)
                                {jdText.length > 0 && jdText.length < 200 && (
                                    <span className="text-[10px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                        <AlertCircle className="w-3 h-3" /> Too short for deep analysis
                                    </span>
                                )}
                            </label>
                            <textarea
                                required
                                placeholder="Paste the full job description here..."
                                className="w-full h-64 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                                value={jdText}
                                onChange={(e) => setJdText(e.target.value)}
                            />
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-xs text-gray-400">Length: {jdText.length} characters</p>
                                {jdText.length > 0 && jdText.length < 200 && (
                                    <p className="text-[10px] text-amber-500 font-medium italic">
                                        This JD is too short to analyze deeply. Paste full JD for better output.
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${loading
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/25 hover:-translate-y-0.5'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                    Analyzing JD...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Generate Preparation Strategy
                                </>
                            )}
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
