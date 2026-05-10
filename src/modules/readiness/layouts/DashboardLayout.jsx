import { Outlet, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Code2,
    FileCheck2,
    Library,
    User,
    LogOut
} from 'lucide-react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Practice', href: '/dashboard/analyzer', icon: Code2 },
    { name: 'Assessments', href: '/dashboard/history', icon: FileCheck2 },
    { name: 'Resources', href: '/dashboard/resources', icon: Library },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-primary-500">Placement Prep</span>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-1">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            end={item.href === '/dashboard'}
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                    ? 'bg-primary-50 text-primary-500'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`
                            }
                        >
                            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        <LogOut className="mr-3 h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
                    <h1 className="text-xl font-semibold text-gray-800">Placement Prep</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
                            <span className="sr-only">Notifications</span>
                            {/* Add bell icon if needed */}
                            <div className="h-5 w-5 rounded-full bg-gray-200" />
                        </button>
                        <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium shadow-sm">
                            U
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 overflow-auto p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
