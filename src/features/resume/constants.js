export const STEPS = [
  { id: '01', name: 'Problem', path: '01-problem' },
  { id: '02', name: 'Market', path: '02-market' },
  { id: '03', name: 'Architecture', path: '03-architecture' },
  { id: '04', name: 'HLD', path: '04-hld' },
  { id: '05', name: 'LLD', path: '05-lld' },
  { id: '06', name: 'Build', path: '06-build' },
  { id: '07', name: 'Test', path: '07-test' },
  { id: '08', name: 'Ship', path: '08-ship' },
];

export const CHECKLIST_ITEMS = [
  "All form sections save to localStorage",
  "Live preview updates in real-time",
  "Template switching preserves data",
  "Color theme persists after refresh",
  "ATS score calculates correctly",
  "Score updates live on edit",
  "Export buttons work (copy/download)",
  "Empty states handled gracefully",
  "Mobile responsive layout works",
  "No console errors on any page"
];

export const COLORS = [
  { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
  { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
  { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
  { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
  { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' },
];

export const INITIAL_DATA = {
  personalInfo: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  links: { github: '', linkedin: '' }
};

export const SAMPLE_DATA = {
  personalInfo: { name: 'Julian Sterling', email: 'julian@sterling.design', phone: '+1 (555) 012-3456', location: 'London, UK' },
  summary: 'Architectural designer turned frontend engineer. Specialized in crafting high-precision user interfaces and premium digital experiences using React, TypeScript, and modern CSS.',
  education: [{ school: 'Royal College of Art', degree: 'MA Digital Design', year: '2020' }],
  experience: [{ company: 'Aesthetic Labs', role: 'Lead UI Engineer', period: '2021 - Present', description: 'Developed high-performance visualization engines and design systems reducing render latency by 45%.' }],
  projects: [{
    id: '1',
    title: 'Antigravity UI',
    description: 'A physics-based animation library for React with 12k monthly downloads.',
    techStack: ['React', 'TypeScript', 'WebGL'],
    liveUrl: 'https://antigravity.ui',
    githubUrl: 'https://github.com/sterling/anti',
    isCollapsed: false
  }],
  skills: {
    technical: ['React', 'TypeScript', 'Framer Motion', 'WebGL', 'Node.js'],
    soft: ['Team Leadership', 'Problem Solving'],
    tools: ['Git', 'Docker', 'AWS']
  },
  links: { github: 'github.com/jsterling', linkedin: 'linkedin.com/in/jsterling' }
};

export const ACTION_VERBS = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];
