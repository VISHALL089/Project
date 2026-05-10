import { Link } from 'react-router-dom';
import { Briefcase, BookOpen, FileText, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Briefcase,
    title: 'Job Portal',
    description: 'Browse, track and apply to jobs tailored for fresh graduates and placement seekers.',
    href: '/jobs',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    border: 'border-blue-100',
    btnClass: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    icon: BookOpen,
    title: 'Placement Readiness',
    description: 'Assess and sharpen your placement skills with mock tests and curated practice sets.',
    href: '/readiness',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    border: 'border-emerald-100',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700',
  },
  {
    icon: FileText,
    title: 'AI Resume Builder',
    description: 'Build an ATS-ready resume with AI assistance — export and share in one click.',
    href: '/resume',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50',
    iconColor: 'text-violet-600',
    border: 'border-violet-100',
    btnClass: 'bg-violet-600 hover:bg-violet-700',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-700 mb-6 tracking-wide">
          All-in-One Placement Platform
        </span>
        <h1 className="text-5xl font-extrabold text-slate-900 leading-tight mb-5">
          V Placement Suite
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          Your complete career platform — built for placement success.
          <br />
          Three powerful tools, one unified workspace.
        </p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold text-base hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
        >
          Get Started <ArrowRight size={18} />
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, href, bg, iconColor, border, btnClass }) => (
            <div
              key={title}
              className={`relative flex flex-col rounded-2xl border ${border} ${bg} p-8 shadow-sm hover:shadow-lg transition-shadow duration-300`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-5 ${iconColor}`}>
                <Icon size={24} />
              </div>

              {/* Content */}
              <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-6">{description}</p>

              {/* CTA */}
              <Link
                to={href}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-colors ${btnClass}`}
              >
                Open {title} <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-slate-400 pb-10">
        © {new Date().getFullYear()} V Placement Suite — Built for placement success.
      </footer>
    </div>
  );
}
