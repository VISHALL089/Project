import { useState } from 'react'
import { Routes, Route, NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

// Page Components
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Saved from './pages/Saved'
import Digest from './pages/Digest'
import Proof from './pages/Proof'
import TestChecklist from './pages/TestChecklist'
import Ship from './pages/Ship'

// Layout Component holding Top Nav
const BaseLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMenu = () => {
        setIsMobileMenuOpen(false)
    }

    // Determine NavLinks 
    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Saved', path: '/saved' },
        { name: 'Digest', path: '/digest' },
        { name: 'Settings', path: '/settings' },
        { name: 'Proof', path: '/proof' },
        { name: 'Test', path: '/jt/07-test' },
        { name: 'Ship', path: '/jt/08-ship' },
    ]

    return (
        <div className="layout-container">
            <header className="top-bar">
                <div className="top-bar-left">
                    <NavLink to="/" className="top-bar-title" onClick={closeMenu}>
                        V's Job-Portal
                    </NavLink>
                </div>

                {/* Desktop Navigation */}
                <nav className="top-nav">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile Hamburger Button */}
                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <nav className="mobile-nav open">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={closeMenu}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>
                )}
            </header>

            {/* Main Content Area populated by Routes */}
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<BaseLayout />}>
                <Route index element={<Home />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="saved" element={<Saved />} />
                <Route path="digest" element={<Digest />} />
                <Route path="settings" element={<Settings />} />
                <Route path="proof" element={<Proof />} />
                <Route path="jt/07-test" element={<TestChecklist />} />
                <Route path="jt/08-ship" element={<Ship />} />

                {/* Catch-all for unmatched routes */}
                <Route path="*" element={
                    <div style={{ textAlign: 'center', paddingTop: 'var(--space-64)' }}>
                        <h1>404 - Not Found</h1>
                    </div>
                } />
            </Route>
        </Routes>
    )
}

export default App
