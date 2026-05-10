import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { getAnalysisById, updateAnalysis, cn } from '../lib/analyzer';
import {
    CheckCircle2,
    Calendar,
    Lightbulb,
    ChevronRight,
    Target,
    Award,
    Clock,
    ArrowLeft,
    Copy,
    Download,
    Check,
    AlertCircle,
    Zap,
    Building2,
    GitBranch,
    Binary
} from 'lucide-react';

export default function Results() {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        const result = getAnalysisById(id);
        if (result) {
            // Ensure schema compatibility for older entries
            const fixed = {
                ...result,
                skillConfidenceMap: result.skillConfidenceMap || {},
                baseScore: result.baseScore || result.readinessScore || 70,
                finalScore: result.finalScore || result.readinessScore || 70,
                plan7Days: result.plan7Days || result.plan || [],
                roundMapping: result.roundMapping || []
            };
            setData(fixed);
        }
    }, [id]);

    if (!data) return <div className="p-8 text-center text-gray-500">Loading analysis...</div>;

    const toggleSkill = (skill) => {
        const current = data.skillConfidenceMap[skill] || 'practice';
        const next = current === 'know' ? 'practice' : 'know';

        const newMap = { ...data.skillConfidenceMap, [skill]: next };

        // Score stability rule: finalScore changes only based on skillConfidenceMap
        const allSkills = Object.values(data.extractedSkills).flat();
        let adjustment = 0;
        allSkills.forEach(s => {
            const state = newMap[s] || 'practice';
            // Each "know" skill adds 2 points (max 100), baseline is baseScore
            if (state === 'know') adjustment += 2;
        });

        const newScore = Math.min(Math.max(data.baseScore + adjustment, 0), 100);

        const updated = {
            ...data,
            skillConfidenceMap: newMap,
            finalScore: newScore
        };

        setData(updated);
        updateAnalysis(updated);
    };

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const downloadTxt = () => {
        const content = `
ANALYSIS REPORT: ${data.company} - ${data.role}
Date: ${new Date(data.createdAt).toLocaleDateString()}
Readiness Score: ${data.finalScore}%

7-DAY PLAN:
${data.plan7Days.map(p => `${p.day}: ${p.focus} - ${p.tasks.join(', ')}`).join('\n')}

ROUND-WISE CHECKLIST:
${data.checklist.map(r => `${r.roundTitle}:\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

PRACTICE QUESTIONS:
${data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
        `.trim();

        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${data.company}_Prep_Roadmap.txt`;
        document.body.appendChild(element);
        element.click();
    };

    const allSkills = Object.values(data.extractedSkills).flat();
    const weakSkills = allSkills.filter(s => (data.skillConfidenceMap[s] || 'practice') === 'practice').slice(0, 3);

    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (data.finalScore / 100) * circumference;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20">
            {/* Header with Export Options */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <Link to="/dashboard/history" className="flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to History
                </Link>
                <div className="flex flex-wrap items-center gap-3">
                    <button
                        onClick={downloadTxt}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Download className="w-4 h-4" /> Download TXT
                    </button>
                    <div className="h-6 w-px bg-gray-200 mx-1 hidden sm:block"></div>
                    <button
                        onClick={() => copyToClipboard(data.plan7Days.map(p => `${p.day}: ${p.focus}`).join('\n'), 'plan')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        {copied === 'plan' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} Copy 7-day plan
                    </button>
                    <button
                        onClick={() => copyToClipboard(data.checklist.map(r => `${r.roundTitle}: ${r.items.join(', ')}`).join('\n'), 'round')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        {copied === 'round' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} Copy round checklist
                    </button>
                    <button
                        onClick={() => copyToClipboard(data.questions.join('\n'), 'qs')}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                    >
                        {copied === 'qs' ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} Copy 10 questions
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Summary & Interactive Skills */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="bg-gradient-to-br from-primary-600 to-black text-white overflow-hidden relative border-none shadow-2xl shadow-primary-500/20">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Award className="w-32 h-32 text-white" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-white opacity-90 text-sm uppercase tracking-widest font-bold">Dynamic Readiness</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center pb-8">
                            <div className="relative w-44 h-44 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle cx="88" cy="88" r="45" stroke="rgba(255,255,255,0.1)" strokeWidth="10" fill="transparent" />
                                    <circle
                                        cx="88" cy="88" r="45" stroke="white" strokeWidth="10" fill="transparent"
                                        strokeDasharray={2 * Math.PI * 45}
                                        strokeDashoffset={2 * Math.PI * 45 - (data.finalScore / 100) * (2 * Math.PI * 45)}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-in-out"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-2">
                                    <span className="text-6xl font-black">{Math.round(data.finalScore)}</span>
                                    <span className="text-xs opacity-60 font-bold uppercase tracking-tighter">Current Score</span>
                                </div>
                            </div>
                            <div className="mt-8 text-center space-y-1">
                                <h3 className="text-2xl font-black tracking-tight">{data.company || "General Role"}</h3>
                                <p className="opacity-70 font-medium">{data.role || "JD Analysis"}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Company Intel Block */}
                    {data.companyIntel && (
                        <Card className="border-none shadow-xl shadow-gray-200/50 bg-gray-900 text-white overflow-hidden">
                            <div className="bg-primary-500 h-1.5 w-full"></div>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-400 flex items-center gap-2">
                                    <Building2 className="w-4 h-4" /> Company Intel
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Industry</p>
                                        <p className="text-sm font-bold">{data.companyIntel.industry}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase">Size Category</p>
                                        <p className="text-sm font-bold">{data.companyIntel.size}</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                    <p className="text-[10px] text-primary-400 font-black uppercase mb-1">Hiring Focus</p>
                                    <p className="text-xs text-gray-300 leading-relaxed font-medium">{data.companyIntel.hiringFocus}</p>
                                </div>
                                <p className="text-[10px] text-gray-600 italic tracking-tighter">Company intel generated heuristically.</p>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="border-none shadow-xl shadow-gray-200/50">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-gray-800">
                                <Target className="w-5 h-5 text-primary-500" /> Skill Assessment
                            </CardTitle>
                            <p className="text-xs text-gray-400">Toggle skills you've mastered to update score.</p>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            {Object.entries(data.extractedSkills).map(([cat, skills]) => (
                                skills.length > 0 && (
                                    <div key={cat} className="space-y-3">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{cat}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(s => {
                                                const isKnown = data.skillConfidenceMap[s] === 'know';
                                                return (
                                                    <button
                                                        key={s}
                                                        onClick={() => toggleSkill(s)}
                                                        className={cn(
                                                            "px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5",
                                                            isKnown
                                                                ? "bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm"
                                                                : "bg-white border-gray-100 text-gray-500 hover:border-primary-200 hover:text-primary-600"
                                                        )}
                                                    >
                                                        {isKnown ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3 opacity-40" />}
                                                        {s}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Roadmap & Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Strategy */}
                    <Card className="border-none shadow-xl shadow-gray-200/50 overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b border-gray-100">
                            <CardTitle className="flex items-center gap-2 font-bold text-gray-800">
                                <Calendar className="w-5 h-5 text-primary-500" /> 7-Day Strategy
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {data.plan7Days.map((p, i) => (
                                    <div key={i} className="flex gap-6 p-6 hover:bg-primary-50/30 transition-colors group">
                                        <div className="flex flex-col items-center w-24 shrink-0">
                                            <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest leading-none mb-1 text-center">{p.day}</span>
                                            <span className="text-xs font-bold text-primary-600 text-center">{p.focus}</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="space-y-2">
                                                {p.tasks.map((task, j) => (
                                                    <div key={j} className="flex items-start gap-2 group">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-300" />
                                                        <p className="text-sm text-gray-700 font-medium leading-relaxed">{task}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-gray-200/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-bold text-gray-800">
                                <Lightbulb className="w-5 h-5 text-orange-400" /> Top Targeted Prep Qs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.questions.map((q, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:bg-white hover:border-primary-100 hover:shadow-sm transition-all">
                                        <span className="text-primary-200 font-black italic">{String(i + 1).padStart(2, '0')}</span>
                                        <p className="text-sm text-gray-700 font-semibold leading-relaxed">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Round Mapping Timeline */}
                    {data.roundMapping && (
                        <Card className="border-none shadow-xl shadow-gray-200/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-bold text-gray-800">
                                    <GitBranch className="w-5 h-5 text-primary-500" /> Interview Round Flow
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-2 pb-10">
                                <div className="space-y-6">
                                    {data.roundMapping.map((round, i) => (
                                        <div key={i} className="flex gap-4 items-start">
                                            <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold shrink-0">
                                                {i + 1}
                                            </div>
                                            <div className="flex-1 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                <h4 className="font-bold text-gray-900">{round.roundTitle}</h4>
                                                <p className="text-xs text-primary-600 font-bold italic mt-1 pb-2 border-b border-gray-100">"{round.whyItMatters}"</p>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    {round.focusAreas.map((area, j) => (
                                                        <span key={j} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600 font-black uppercase">
                                                            {area}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <Card className="border-none shadow-xl shadow-gray-200/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-bold text-gray-800">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" /> Success Checklist
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                {data.checklist.map((round, i) => (
                                    <div key={i} className="space-y-3">
                                        <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">{round.roundTitle}</h4>
                                        <div className="space-y-2">
                                            {round.items.map((item, j) => (
                                                <div key={j} className="flex items-center gap-3 text-sm text-gray-600 group">
                                                    <div className="w-4 h-4 rounded-md border border-gray-200 group-hover:border-primary-300 transition-colors flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-sm bg-primary-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <span className="font-medium">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Action Next Box */}
            <div className="sticky bottom-8 left-0 right-0 z-30">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-primary-500/20 flex items-center justify-center text-primary-400">
                                <Zap className="w-7 h-7 fill-primary-400/20" />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-lg">Next Action Focus</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-400">Target Weak Areas:</span>
                                    {weakSkills.length > 0 ? (
                                        <div className="flex gap-2">
                                            {weakSkills.map(s => (
                                                <span key={s} className="px-2 py-0.5 bg-gray-800 border border-gray-700 text-primary-300 text-[10px] font-black uppercase rounded-md tracking-tighter">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-emerald-400 font-bold">All mastered!</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 relative z-10 w-full md:w-auto">
                            <button
                                onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                                className="flex-1 md:flex-none px-8 py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20 hover:-translate-y-0.5"
                            >
                                Start Day 1 plan now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
