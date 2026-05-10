import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import JDAnalyzer from './pages/JDAnalyzer';
import History from './pages/History';
import Results from './pages/Results';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';
import Proof from './pages/Proof';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="analyzer" element={<JDAnalyzer />} />
                <Route path="history" element={<History />} />
                <Route path="resources" element={<Resources />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="results/:id" element={<DashboardLayout />} >
                <Route index element={<Results />} />
            </Route>
            <Route path="prp/07-test" element={<TestChecklist />} />
            <Route path="prp/08-ship" element={<Ship />} />
            <Route path="prp/proof" element={<Proof />} />
        </Routes>
    );
}

export default App;
