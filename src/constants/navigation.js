import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Settings 
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Resume Builder', path: '/resume', icon: FileText },
  { label: 'Job Portal', path: '/jobs', icon: Briefcase },
  { label: 'Placement Prep', path: '/prep', icon: GraduationCap },
  { label: 'Settings', path: '/settings', icon: Settings },
];
