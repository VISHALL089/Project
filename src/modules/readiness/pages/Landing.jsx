import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Video, LineChart, ArrowRight, Building2, Briefcase, FileText, Send, AlertCircle } from 'lucide-react';
import { analyzeJD, saveToHistory } from '../lib/analyzer';

export default function Landing() {
    const [company, setCompany] = useState('');
    const [role, setRole] = useState('');
    const [jdText, setJdText] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAnalyze = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const analysis = analyzeJD(company, role, jdText);
            saveToHistory(analysis);
            setLoading(false);
            navigate(`/results/${analysis.id}`);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Navbar */}
            <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 shadow-sm z-50">
                <div className="text-2xl font-black text-primary-500 tracking-tighter">Placement<span className="text-gray-900">Prep</span></div>
                <nav className="gap-8 hidden md:flex items-center">
                    <Link to="/features" className="text-gray-600 hover:text-primary-500 font-bold transition-colors">Features</Link>
                    <Link to="/dashboard/history" className="text-gray-600 hover:text-primary-500 font-bold transition-colors">History</Link>
                    <Link to="/dashboard" className="px-5 py-2.5 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all">
                        Get Started
                    </Link>
                </nav>
            </header>

            {/* Hero Section with Analyzer */}
            <main className="flex-1">
                <section className="bg-gray-50 py-16 px-6 md:px-12 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:40px_40px]"></div>
                    <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row gap-16 items-center">

                        <div className="lg:w-1/2 space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-widest">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                                </span>
                                Now powered by local AI analysis
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]">
                                Ace Your <br />
                                <span className="text-primary-500">Placement.</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Paste your target JD and get a 7-day preparation roadmap, targeted questions, and skill gap analysis instantly.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    onClick={() => document.getElementById('analyzer-form').scrollIntoView({ behavior: 'smooth' })}
                                    className="px-8 py-4 bg-primary-500 text-white rounded-2xl font-black text-lg hover:bg-primary-600 shadow-xl shadow-primary-500/30 hover:-translate-y-1 transition-all"
                                >
                                    Get Started
                                </button>
                                <Link to="/dashboard" className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 rounded-2xl font-black text-lg hover:border-primary-500 hover:text-primary-500 transition-all">
                                    View Dashboard
                                </Link>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm font-bold text-gray-500">Joined by 2000+ students this week</p>
                            </div>
                        </div>

                        <div className="lg:w-1/2 w-full">
                            <div className="bg-white p-8 rounded-[32px] shadow-2xl shadow-primary-500/10 border border-white relative">
                                <form id="analyzer-form" onSubmit={handleAnalyze} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                                <Building2 className="w-3 h-3" /> Company
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Google"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm font-semibold"
                                                value={company}
                                                onChange={(e) => setCompany(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                                <Briefcase className="w-3 h-3" /> Role
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Frontend"
                                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all text-sm font-semibold"
                                                value={role}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
                                                <FileText className="w-3 h-3" /> Job Description (Required)
                                            </label>
                                            {jdText.length > 0 && jdText.length < 200 && (
                                                <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-black flex items-center gap-1 uppercase tracking-tighter">
                                                    <AlertCircle className="w-2.5 h-2.5" /> Too short
                                                </span>
                                            )}
                                        </div>
                                        <textarea
                                            required
                                            placeholder="Paste the full job description here..."
                                            className="w-full h-48 px-4 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none text-sm font-medium leading-relaxed"
                                            value={jdText}
                                            onChange={(e) => setJdText(e.target.value)}
                                        />
                                        {jdText.length > 0 && jdText.length < 200 && (
                                            <p className="text-[10px] text-amber-500 font-bold italic">
                                                This JD is too short to analyze deeply. Paste full JD for better output.
                                            </p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${loading
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-primary-500 text-white hover:bg-primary-600 shadow-xl shadow-primary-500/30 hover:-translate-y-1 active:translate-y-0'
                                            }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                                                Synthesizing Data...
                                            </>
                                        ) : (
                                            <>
                                                Analyze & Generate Plan <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 px-6 md:px-12 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Everything you need to succeed</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-primary-50 text-primary-500 rounded-xl flex items-center justify-center mb-6">
                                    <Code2 className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Practice Problems</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Master coding skills with our curated collection of industry-standard algorithmic challenges.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-primary-50 text-primary-500 rounded-xl flex items-center justify-center mb-6">
                                    <Video className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Mock Interviews</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Simulate real interview scenarios with peer-to-peer and AI-driven video mock interviews.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-primary-50 text-primary-500 rounded-xl flex items-center justify-center mb-6">
                                    <LineChart className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Track Progress</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Monitor your learning curve with detailed analytics, performance metrics, and skill gap analysis.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-xl font-bold">Placement Prep</div>
                    <div className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
