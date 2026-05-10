import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Lock, Rocket, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Ship() {
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        if (saved) {
            const checklist = JSON.parse(saved);
            const passedCount = Object.values(checklist).filter(Boolean).length;
            if (passedCount === 10) {
                setIsLocked(false);
            }
        }
    }, []);

    if (isLocked) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-8 relative">
                    <Lock className="w-10 h-10" />
                    <div className="absolute inset-0 bg-red-500/10 rounded-full animate-ping"></div>
                </div>

                <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-4">Ship Lock Active</h1>
                <p className="text-gray-500 max-w-md leading-relaxed font-medium mb-12">
                    Security protocol prevents deployment because some mandatory hardening tests have not been verified.
                </p>

                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <Link
                        to="/prp/07-test"
                        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" /> Return to Tests
                    </Link>
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Required: 10/10 Verification Steps
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-500 flex flex-col items-center justify-center p-6 text-center selection:bg-white/20">
            <div className="w-32 h-32 bg-white/10 text-white rounded-[40px] flex items-center justify-center mb-10 backdrop-blur-xl border border-white/20 relative shadow-2xl">
                <Rocket className="w-14 h-14" />
                <div className="absolute -top-4 -right-4 bg-emerald-400 text-white p-2 rounded-full shadow-lg">
                    <ShieldCheck className="w-6 h-6" />
                </div>
            </div>

            <h1 className="text-6xl font-black text-white tracking-tight mb-6">Cleared for Launch.</h1>
            <p className="text-primary-100 max-w-lg text-lg leading-relaxed font-bold mb-16 px-4">
                All hardening verification steps passed. The Placement Readiness Platform build is stable and secure for production.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl px-4">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 text-left">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                        <h3 className="text-white font-black text-xl">Build Info</h3>
                    </div>
                    <ul className="space-y-3 text-primary-50 font-bold text-sm">
                        <li className="flex justify-between"><span>Version</span> <span className="opacity-60 text-xs">1.2.0-stable</span></li>
                        <li className="flex justify-between"><span>Environment</span> <span className="opacity-60 text-xs">Production</span></li>
                        <li className="flex justify-between"><span>Lock Status</span> <span className="text-emerald-300">Unlocked</span></li>
                        <li className="flex justify-between"><span>Sign-off</span> <span className="opacity-40 text-xs">System Auto-Gen</span></li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => alert('Deployment sequence initiated... (Simulation mode)')}
                        className="flex-1 bg-white text-primary-600 px-10 py-6 rounded-[32px] font-black text-2xl shadow-2xl shadow-black/20 hover:-translate-y-2 active:translate-y-0 transition-all flex items-center justify-center gap-4 group"
                    >
                        Deploy Now <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                    <Link
                        to="/dashboard"
                        className="py-4 text-white/50 hover:text-white font-bold transition-all flex items-center justify-center gap-2"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>

            <p className="mt-20 text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">
                Placement Readiness Platform Secure Deployment Protocol
            </p>
        </div>
    );
}
