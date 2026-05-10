import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Zap, Shield, Target, ArrowRight, Star } from 'lucide-react';

export default function Home() {
    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* Hero Section */}
            <section className="relative pt-12 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl -z-10" />
                
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-black uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <Star size={14} className="fill-current" />
                        Next-Gen Placement Suite
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-gray-900">
                        Stop Missing <br />
                        <span className="text-primary">The Right Jobs.</span>
                    </h1>
                    
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                        Precision-matched job discovery, AI-powered resume building, and 
                        interview readiness—all synced in one seamless placement suite.
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Link to="/settings" className="btn btn-primary h-14 px-10 text-lg shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                            Start Tracking Now
                        </Link>
                        <Link to="/readiness" className="btn btn-secondary h-14 px-10 text-lg hover:bg-white transition-all">
                            Check Readiness
                        </Link>
                    </div>
                    
                    <div className="flex items-center justify-center gap-8 pt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Briefcase size={20}/> LinkedIn</div>
                        <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Target size={20}/> Naukri</div>
                        <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Zap size={20}/> Indeed</div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="card group hover:border-primary/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Daily Digest</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Every morning at 9AM, get a curated list of jobs that perfectly 
                            match your profile and preferences.
                        </p>
                    </div>

                    <div className="card group hover:border-blue-500/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Readiness Audit</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Analyze your gap for any job description and get a 7-day 
                            preparation roadmap to ace the interview.
                        </p>
                    </div>

                    <div className="card group hover:border-emerald-500/50 transition-all duration-300">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Shield size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Smart Resume</h3>
                        <p className="text-emerald-900 text-sm leading-relaxed">
                            Sync job-specific skills directly to your resume builder for 
                            maximum ATS score optimization.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="max-w-5xl mx-auto w-full bg-gray-900 rounded-[32px] p-12 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative z-10 space-y-6">
                    <h2 className="text-4xl font-bold text-white">Ready to land your dream role?</h2>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Join 2,000+ students using the V Placement Suite to automate 
                        their job hunt and master their interviews.
                    </p>
                    <Link to="/settings" className="btn btn-primary h-12 px-8 inline-flex items-center gap-2">
                        Get Started <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
