import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import {
    CheckCircle2,
    Circle,
    Link as LinkIcon,
    Github,
    Globe,
    Copy,
    Check,
    AlertCircle,
    Award,
    Trophy,
    ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
    { id: '01', label: 'Landing & Hero UI', path: '/' },
    { id: '02', label: 'Dashboard Overview', path: '/dashboard' },
    { id: '03', label: 'Skills Analysis Engine', path: '/dashboard/analyzer' },
    { id: '04', label: '7-Day Plan Generation', path: '/results/latest' },
    { id: '05', label: 'History & Persistence', path: '/dashboard/history' },
    { id: '06', label: 'Resources & Profile', path: '/dashboard/resources' },
    { id: '07', label: 'Hardening & Tests', path: '/prp/07-test' },
    { id: '08', label: 'Ship Status Layout', path: '/prp/08-ship' }
];

export default function Proof() {
    const [submission, setSubmission] = useState(() => {
        const saved = localStorage.getItem('prp_final_submission');
        try {
            return saved ? JSON.parse(saved) : { lovable: '', github: '', deploy: '' };
        } catch (_) {
            return { lovable: '', github: '', deploy: '' };
        }
    });

    const [testChecklist, setTestChecklist] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        try {
            return saved ? JSON.parse(saved) : {};
        } catch (_) {
            return {};
        }
    });

    const [copied, setCopied] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        localStorage.setItem('prp_final_submission', JSON.stringify(submission));
    }, [submission]);

    const validateUrl = (url) => {
        if (!url) return false;
        try {
            const parsed = new URL(url);
            return parsed.protocol === "http:" || parsed.protocol === "https:";
        } catch (_) {
            return false;
        }
    };

    const handleInputChange = (field, value) => {
        setSubmission(prev => ({ ...prev, [field]: value }));
        if (value && !validateUrl(value)) {
            setErrors(prev => ({ ...prev, [field]: 'Invalid URL' }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const testsPassed = Object.values(testChecklist).filter(Boolean).length === 10;
    const linksValid = validateUrl(submission.lovable) && validateUrl(submission.github) && validateUrl(submission.deploy);

    // Step 07 and 08 are tied to testsPassed
    const stepsStatus = STEPS.map(step => {
        let completed = true;
        if (step.id === '07' || step.id === '08') {
            completed = testsPassed;
        }
        return { ...step, completed };
    });

    const allStepsDone = stepsStatus.every(s => s.completed);
    const isShipped = allStepsDone && testsPassed && linksValid;

    const copySubmission = () => {
        const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${submission.lovable}
GitHub Repository: ${submission.github}
Live Deployment: ${submission.deploy}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
`.trim();
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFF] py-12 px-6 font-sans selection:bg-primary-100">
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-1000">

                {/* Status Header */}
                <div className={`p-8 md:p-12 rounded-[48px] shadow-2xl transition-all duration-700 border-b-8 ${isShipped
                    ? 'bg-primary-500 border-primary-600 text-white shadow-primary-500/30'
                    : 'bg-white border-gray-100 text-gray-900 shadow-gray-200/50'
                    }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div className="space-y-4">
                            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-2 ${isShipped ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                                }`}>
                                Project Status: {isShipped ? 'Shipped' : 'In Progress'}
                            </div>
                            <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-2">
                                Proof of Work
                            </h1>
                            <p className={`text-lg font-medium opacity-70 max-w-md ${isShipped ? 'text-primary-50' : 'text-gray-500'}`}>
                                Building a high-performance career tool requires absolute verification. Check your status below.
                            </p>
                        </div>
                        <div className="relative group">
                            {isShipped ? (
                                <div className="p-8 bg-white/10 rounded-[40px] backdrop-blur-md border border-white/20 shadow-inner">
                                    <Trophy className="w-24 h-24 text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)] animate-bounce" />
                                </div>
                            ) : (
                                <div className="w-32 h-32 rounded-[40px] border-4 border-dashed border-gray-200 flex items-center justify-center bg-gray-50/50 transition-all group-hover:border-primary-200">
                                    <Award className="w-12 h-12 text-gray-300 transition-colors group-hover:text-primary-300" />
                                </div>
                            )}
                        </div>
                    </div>

                    {isShipped && (
                        <div className="mt-12 pt-10 border-t border-white/20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                            <p className="text-2xl md:text-3xl font-black italic leading-snug tracking-tight">
                                "You built a real product.<br />
                                Not a tutorial. Not a clone.<br />
                                A structured tool that solves a real problem.<br /><br />
                                This is your proof of work."
                            </p>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Section A: Step Completion Overview */}
                    <Card className="border-none shadow-2xl shadow-gray-200/40 rounded-[40px] overflow-hidden bg-white">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-6 px-8">
                            <CardTitle className="text-xl font-black flex items-center gap-3">
                                <CheckCircle2 className="w-6 h-6 text-primary-500" /> Phase Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-50">
                                {stepsStatus.map((step) => (
                                    <div key={step.id} className="flex items-center justify-between p-5 px-8 hover:bg-gray-50/30 transition-colors group">
                                        <div className="flex items-center gap-5">
                                            <span className="text-[10px] font-black text-gray-300 group-hover:text-primary-300 transition-colors">{step.id}</span>
                                            <span className="text-[15px] font-bold text-gray-700 tracking-tight">{step.label}</span>
                                        </div>
                                        {step.completed ? (
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-500 bg-emerald-50/50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
                                                <Check className="w-3 h-3" /> Completed
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-amber-500 bg-amber-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-amber-100 italic">
                                                Pending
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section B: Artifact Inputs */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-2xl shadow-gray-200/40 rounded-[40px] bg-white overflow-hidden">
                            <CardHeader className="pb-4 px-8 pt-8">
                                <CardTitle className="text-xl font-black flex items-center gap-3">
                                    <LinkIcon className="w-6 h-6 text-primary-500" /> Artifact Inputs
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6 px-8 pb-10">
                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] flex items-center gap-2">
                                        <Circle className="w-2 h-2 fill-primary-500" /> Lovable Project URL
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="https://lovable.dev/projects/..."
                                            value={submission.lovable}
                                            onChange={(e) => handleInputChange('lovable', e.target.value)}
                                            className={`w-full px-5 py-4 rounded-[20px] border-2 bg-gray-50/50 focus:bg-white outline-none transition-all text-[15px] font-bold ${errors.lovable ? 'border-red-200 focus:border-red-400 focus:ring-4 ring-red-50' : 'border-gray-50 focus:border-primary-500 focus:ring-4 ring-primary-50'
                                                }`}
                                        />
                                        {validateUrl(submission.lovable) && (
                                            <div className="absolute right-4 top-4 bg-emerald-500 p-1.5 rounded-full text-white">
                                                <Check className="w-3 h-3" strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>
                                    {errors.lovable && <p className="text-[11px] text-red-500 font-bold ml-2">{errors.lovable}</p>}
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] flex items-center gap-2">
                                        <Github className="w-3.5 h-3.5" /> GitHub Repository
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="https://github.com/user/repo"
                                            value={submission.github}
                                            onChange={(e) => handleInputChange('github', e.target.value)}
                                            className={`w-full px-5 py-4 rounded-[20px] border-2 bg-gray-50/50 focus:bg-white outline-none transition-all text-[15px] font-bold ${errors.github ? 'border-red-200 focus:border-red-400 focus:ring-4 ring-red-50' : 'border-gray-50 focus:border-primary-500 focus:ring-4 ring-primary-50'
                                                }`}
                                        />
                                        {validateUrl(submission.github) && (
                                            <div className="absolute right-4 top-4 bg-emerald-500 p-1.5 rounded-full text-white">
                                                <Check className="w-3 h-3" strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>
                                    {errors.github && <p className="text-[11px] text-red-500 font-bold ml-2">{errors.github}</p>}
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] flex items-center gap-2">
                                        <Globe className="w-3.5 h-3.5" /> Deployed Live URL
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="https://your-site.vercel.app"
                                            value={submission.deploy}
                                            onChange={(e) => handleInputChange('deploy', e.target.value)}
                                            className={`w-full px-5 py-4 rounded-[20px] border-2 bg-gray-50/50 focus:bg-white outline-none transition-all text-[15px] font-bold ${errors.deploy ? 'border-red-200 focus:border-red-400 focus:ring-4 ring-red-50' : 'border-gray-50 focus:border-primary-500 focus:ring-4 ring-primary-50'
                                                }`}
                                        />
                                        {validateUrl(submission.deploy) && (
                                            <div className="absolute right-4 top-4 bg-emerald-500 p-1.5 rounded-full text-white">
                                                <Check className="w-3 h-3" strokeWidth={4} />
                                            </div>
                                        )}
                                    </div>
                                    {errors.deploy && <p className="text-[11px] text-red-500 font-bold ml-2">{errors.deploy}</p>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Export Action */}
                        <button
                            onClick={copySubmission}
                            disabled={!isShipped}
                            className={`w-full py-6 rounded-[32px] font-black text-xl flex items-center justify-center gap-4 transition-all duration-300 border-b-4 ${isShipped
                                ? 'bg-gray-900 text-white hover:bg-black border-black shadow-2xl shadow-gray-400 hover:-translate-y-1 active:translate-y-0 active:border-b-0'
                                : 'bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed uppercase tracking-widest text-sm'
                                }`}
                        >
                            {copied ? (
                                <><Check className="w-6 h-6" /> Text Copied!</>
                            ) : (
                                <><Copy className="w-6 h-6" /> Copy Final Submission</>
                            )}
                        </button>
                    </div>
                </div>

                {!isShipped && (
                    <div className="bg-amber-50 border border-amber-200 rounded-[40px] p-8 flex flex-col items-center text-center gap-6 shadow-lg shadow-amber-200/20">
                        <div className="w-16 h-16 bg-amber-100 rounded-[20px] flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-amber-600" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-amber-900 font-black text-xl">Ship Verification Locked</h3>
                            <p className="text-amber-800/70 font-bold max-w-lg mx-auto">
                                To unlock the "Shipped" status, you must complete the <Link to="/prp/07-test" className="underline decoration-2 underline-offset-4 hover:text-amber-900 transition-colors">10-point hardening checklist</Link> and provide valid artifact URLs.
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col items-center gap-6 py-10">
                    <Link to="/prp/08-ship" className="text-gray-400 hover:text-primary-500 text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-3 group transition-colors">
                        <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                        Inspect Security Protocol (Step 08)
                    </Link>
                    <div className="w-12 h-1 bg-gray-100 rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
