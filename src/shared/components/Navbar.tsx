import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';

const navLinks = [
  { label: 'Jobs', to: '/jobs' },
  { label: 'Readiness', to: '/readiness' },
  { label: 'Resume', to: '/resume' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-slate-900 hover:text-indigo-600 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <LayoutDashboard size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            V Placement Suite
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-1">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
