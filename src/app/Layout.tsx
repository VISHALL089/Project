import { Outlet, NavLink } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              V Placement Suite
            </span>
          </div>
          <nav className="flex gap-4">
            <NavLink to="/" className={({isActive}) => isActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900 font-medium"}>Job Portal</NavLink>
            <NavLink to="/readiness" className={({isActive}) => isActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900 font-medium"}>Readiness</NavLink>
            <NavLink to="/resume" className={({isActive}) => isActive ? "text-indigo-600 font-medium" : "text-gray-600 hover:text-gray-900 font-medium"}>Resume Builder</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
