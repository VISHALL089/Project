import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';
import { Calendar, PlayCircle, Send, PlusCircle, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getHistory } from '../lib/analyzer';

const mockSkillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Core CS', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

export default function Dashboard() {
    const [history, setHistory] = useState([]);
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        setHistory(getHistory().slice(0, 3));
        if (sessionStorage.getItem('history_corrupted') === 'true') {
            setShowWarning(true);
        }
    }, []);

    const readinessScore = history[0]?.finalScore || 72;
    const circumference = 2 * Math.PI * 45; // r=45
    const strokeDashoffset = circumference - (readinessScore / 100) * circumference;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back, User</h2>
                    <p className="text-gray-500">Here's your placement readiness overview.</p>
                </div>
                <Link to="/dashboard/analyzer" className="hidden md:flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/25">
                    <PlusCircle className="w-5 h-5" /> Analyze New JD
                </Link>
            </div>

            {showWarning && (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 px-6 py-4 rounded-2xl flex items-center justify-between shadow-sm">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Stats Column */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Overall Readiness */}
                        <Card className="flex flex-col justify-center items-center border-none shadow-xl shadow-gray-200/50">
                            <CardHeader>
                                <CardTitle className="text-center text-lg text-gray-700">Latest Readiness</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center pb-8">
                                <div className="relative w-40 h-40 flex items-center justify-center">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="45" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
                                        <circle
                                            cx="80" cy="80" r="45" stroke="currentColor" strokeWidth="8" fill="transparent"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={strokeDashoffset}
                                            className="text-primary-500 transition-all duration-1000 ease-out"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-4xl font-bold text-gray-800">{readinessScore}</span>
                                        <span className="text-sm text-gray-500">/100</span>
                                    </div>
                                </div>
                                <p className="mt-4 font-medium text-gray-600 truncate max-w-[200px]">
                                    {history[0] ? `${history[0].company} - ${history[0].role}` : 'Overall Score'}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Skill Breakdown */}
                        <Card className="border-none shadow-xl shadow-gray-200/50">
                            <CardHeader>
                                <CardTitle className="text-lg text-gray-700">Skill Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={mockSkillData}>
                                            <PolarGrid stroke="#e5e7eb" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar
                                                name="Student"
                                                dataKey="A"
                                                stroke="#8B0000"
                                                fill="#8B0000"
                                                fillOpacity={0.6}
                                            />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Goal Progress */}
                    <Card className="border-none shadow-xl shadow-gray-200/50 bg-white">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-700">Weekly Goal Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-gray-600">12/20 problems solved</span>
                                <span className="text-sm font-black text-primary-500">60%</span>
                            </div>
                            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                                <div className="bg-primary-500 h-full w-[60%] rounded-full"></div>
                            </div>
                            <p className="mt-4 text-xs text-gray-400 italic">8 more to reach your weekly streak!</p>
                        </CardContent>
                    </Card>

                    {/* Quick Analysis CTA */}
                    <Card className="bg-primary-500 border-none relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
                        <CardContent className="p-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2 font-serif">Ready for your next interview?</h3>
                                <p className="text-primary-100">Upload a JD and get a personalized 7-day preparation roadmap in seconds.</p>
                            </div>
                            <Link to="/dashboard/analyzer" className="px-8 py-4 bg-white text-primary-500 rounded-xl font-bold whitespace-nowrap hover:bg-gray-50 transition-colors flex items-center gap-2 group">
                                Start Analyzing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Column: Recent History */}
                <div className="space-y-8">
                    <Card className="border-none shadow-xl shadow-gray-200/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-lg text-gray-700">Recent History</CardTitle>
                            <Link to="/dashboard/history" className="text-sm text-primary-500 font-medium hover:underline">View All</Link>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-6 p-4 bg-primary-50 rounded-2xl border border-primary-100">
                                <h4 className="text-xs font-black uppercase text-primary-600 mb-2 tracking-widest">Continue Practice</h4>
                                <div className="flex justify-between items-center">
                                    <div className="min-w-0">
                                        <p className="font-bold text-gray-900 truncate">Graph Traversals (BFS/DFS)</p>
                                        <p className="text-[10px] text-gray-500">Last practiced 2h ago</p>
                                    </div>
                                    <Link to="/dashboard/analyzer" className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                                        <PlayCircle className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                            {history.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-gray-400 text-sm">No recent analyses.</p>
                                </div>
                            ) : (
                                <ul className="space-y-4">
                                    {history.map((item) => (
                                        <li key={item.id}>
                                            <Link to={`/results/${item.id}`} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
                                                <div className="w-10 h-10 rounded-lg bg-primary-50 text-primary-500 flex items-center justify-center font-bold text-xs">
                                                    {item.finalScore}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">{item.company}</h4>
                                                    <p className="text-xs text-gray-500 truncate">{item.role}</p>
                                                </div>
                                                <Calendar className="w-4 h-4 text-gray-300 mt-1" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-gray-200/50 bg-gray-900 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-primary-400" /> Platform Status
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400 text-sm">Deployment Ready</span>
                                    {Object.values(JSON.parse(localStorage.getItem('prp_test_checklist') || '{}')).filter(Boolean).length === 10 ? (
                                        <span className="text-white bg-primary-500 px-2 py-0.5 rounded text-[10px] font-black uppercase">Yes</span>
                                    ) : (
                                        <span className="text-primary-400 text-xs font-black uppercase italic">Pending</span>
                                    )}
                                </div>
                                <Link to="/prp/proof" className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-bold text-sm border border-white/10">
                                    View Proof of Work <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-gray-200/50">
                        <CardHeader>
                            <CardTitle className="text-lg text-gray-700">Upcoming Mock Tests</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="bg-primary-100 text-primary-600 p-2 rounded-lg mt-0.5">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">DSA Mock Test</h4>
                                        <p className="text-xs text-gray-500">Tomorrow, 10:00 AM</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="bg-primary-50 text-primary-500 p-2 rounded-lg mt-0.5">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">System Design Review</h4>
                                        <p className="text-xs text-gray-500">Wed, 2:00 PM</p>
                                    </div>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}

