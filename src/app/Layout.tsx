import { Outlet } from 'react-router-dom';
import Navbar from '../shared/components/Navbar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
