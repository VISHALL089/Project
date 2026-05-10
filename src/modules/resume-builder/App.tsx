import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import { useJobStore } from '../../shared/store/useJobStore';
import './index.css';

// --- Types ---
const STEPS = [
  { id: '01', name: 'Problem', path: '01-problem' },
  { id: '02', name: 'Market', path: '02-market' },
  { id: '03', name: 'Architecture', path: '03-architecture' },
  { id: '04', name: 'HLD', path: '04-hld' },
  { id: '05', name: 'LLD', path: '05-lld' },
  { id: '06', name: 'Build', path: '06-build' },
  { id: '07', name: 'Test', path: '07-test' },
  { id: '08', name: 'Ship', path: '08-ship' },
];

type TemplateType = 'Classic' | 'Modern' | 'Minimal';

interface Education { school: string; degree: string; year: string; }
interface Experience { company: string; role: string; period: string; description: string; }

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  isCollapsed: boolean;
}

interface SkillGroup {
  technical: string[];
  soft: string[];
  tools: string[];
}

interface ResumeData {
  personalInfo: { name: string; email: string; phone: string; location: string; };
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup;
  links: { github: string; linkedin: string; };
}

const INITIAL_DATA: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', location: '' },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  links: { github: '', linkedin: '' }
};

const SAMPLE_DATA: ResumeData = {
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

const ACTION_VERBS = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];

// --- Logic Helpers ---

const calculateATSScore = (data: ResumeData) => {
  let score = 0;
  const wordCount = data.summary.trim() ? data.summary.trim().split(/\s+/).length : 0;
  if (wordCount >= 40 && wordCount <= 120) score += 15;
  if (data.projects.length >= 2) score += 10;
  if (data.experience.length >= 1) score += 10;
  const skillsCount = [...data.skills.technical, ...data.skills.soft, ...data.skills.tools].length;
  if (skillsCount >= 8) score += 10;
  if (data.links.github.trim() || data.links.linkedin.trim()) score += 10;
  const hasNumbers = [...data.experience, ...data.projects].some(item => /\d/.test(item instanceof Object && 'description' in item ? item.description : ''));
  if (hasNumbers) score += 15;
  const eduComplete = data.education.some(e => e.school && e.degree && e.year);
  if (eduComplete) score += 10;
  return Math.min(score, 100);
};

const getTopImprovements = (data: ResumeData) => {
  const imp: string[] = [];
  const wordCount = data.summary.trim() ? data.summary.trim().split(/\s+/).length : 0;
  const skillsCount = [...data.skills.technical, ...data.skills.soft, ...data.skills.tools].length;
  const hasNumbers = [...data.experience, ...data.projects].some(item => /\d/.test(item instanceof Object && 'description' in item ? item.description : ''));

  if (data.projects.length < 2) imp.push("Add at least 2 projects.");
  if (!hasNumbers) imp.push("Add measurable impact (numbers) in bullets.");
  if (wordCount < 40) imp.push("Expand your summary (aim for 40-120 words).");
  if (skillsCount < 8) imp.push("Add more skills (target 8+).");
  if (data.experience.length === 0) imp.push("Add internship or professional experience.");

  return imp.slice(0, 3);
};

const checkBulletGuidance = (text: string) => {
  const suggestions: string[] = [];
  if (!text.trim()) return suggestions;
  const firstWord = text.trim().split(/\s+/)[0].replace(/[^a-zA-Z]/g, '');
  if (!ACTION_VERBS.some(v => v.toLowerCase() === firstWord.toLowerCase())) {
    suggestions.push("Start with a strong action verb.");
  }
  if (!/\d/.test(text)) {
    suggestions.push("Add measurable impact (numbers).");
  }
  return suggestions;
};

// --- Shared Components ---

const TopBar: React.FC<{ title: string; subtitle?: string; statusBadge?: React.ReactNode }> = ({ title, subtitle, statusBadge }) => (
  <header className="topbar">
    <div style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '0.05em' }}>{title}</div>
    {subtitle && <div style={{ fontSize: '14px', opacity: 0.6 }}>{subtitle}</div>}
    {statusBadge}
  </header>
);

const TemplateTabs: React.FC<{ selected: TemplateType; onSelect: (t: TemplateType) => void }> = ({ selected, onSelect }) => (
  <div className="template-tabs no-print" style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
    {(['Classic', 'Modern', 'Minimal'] as TemplateType[]).map(t => (
      <button
        key={t}
        className={`btn-secondary ${selected === t ? 'active' : ''}`}
        onClick={() => onSelect(t)}
        style={{ padding: '8px 16px', fontSize: '11px', background: selected === t ? 'var(--text-main)' : 'transparent', color: selected === t ? 'white' : 'inherit', border: '1px solid var(--text-main)', cursor: 'pointer', fontWeight: 700 }}
      >
        {t.toUpperCase()}
      </button>
    ))}
  </div>
);

// --- Resume Preview Layouts ---

const ResumeContent: React.FC<{ data: ResumeData; template: TemplateType }> = ({ data, template }) => {
  const isModern = template === 'Modern';
  const isMinimal = template === 'Minimal';

  const sectionStyle = { marginBottom: isMinimal ? '24px' : '40px' };
  const headerSectionStyle = {
    textAlign: isModern ? ('left' as const) : ('center' as const),
    marginBottom: isMinimal ? '32px' : '60px',
    borderBottom: isModern ? '2px solid #000' : 'none',
    paddingBottom: isModern ? '24px' : '0'
  };

  return (
    <div className={`resume-preview-shell ${template.toLowerCase()} glass-card animate-fade-in`} style={{
      width: '100%', maxWidth: '850px', background: 'white', padding: isMinimal ? '40px' : '64px', minHeight: '1100px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', color: '#000', fontFamily: isMinimal ? 'var(--font-sans)' : 'var(--font-serif)', transition: 'all 0.3s ease'
    }}>
      <div style={headerSectionStyle}>
        <h1 style={{ fontSize: isMinimal ? '32px' : '48px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>{data.personalInfo.name || 'Your Name'}</h1>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: isMinimal ? '12px' : '13px', color: '#666', fontWeight: 500, letterSpacing: '0.02em' }}>
          {data.personalInfo.email} {data.personalInfo.phone && `• ${data.personalInfo.phone}`} {data.personalInfo.location && `• ${data.personalInfo.location}`}
        </div>
        {(data.links.github || data.links.linkedin) && (
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', marginTop: '12px', color: 'var(--acc-red)', fontWeight: 600, letterSpacing: '0.05em' }}>
            {data.links.github.toUpperCase()} {data.links.github && data.links.linkedin && ' | '} {data.links.linkedin.toUpperCase()}
          </div>
        )}
      </div>

      {data.summary.trim() && (
        <section style={sectionStyle}>
          <h4 className="preview-section-header">Summary</h4>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>{data.summary}</p>
        </section>
      )}

      {data.experience.length > 0 && (
        <section style={sectionStyle}>
          <h4 className="preview-section-header">Experience</h4>
          {data.experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: isMinimal ? '20px' : '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '16px', letterSpacing: '0.02em' }}>{exp.company}</strong>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', fontStyle: 'italic', opacity: 0.7 }}>{exp.period}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{exp.role}</div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: '1.6', color: '#444' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section style={sectionStyle}>
          <h4 className="preview-section-header">Projects</h4>
          {data.projects.map((proj, i) => (
            <div key={i} className="project-preview-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '16px', letterSpacing: '0.02em' }}>{proj.title}</strong>
                <div className="link-icons">
                  {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="link-icon">↗ Live</a>}
                  {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="link-icon">⑀ GitHub</a>}
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', lineHeight: '1.5', color: '#444', marginBottom: '8px' }}>{proj.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {proj.techStack.map((tech, idx) => (
                  <span key={idx} className="skill-tag-preview">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
        <section style={sectionStyle}>
          <h4 className="preview-section-header">Skills</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.skills.technical.length > 0 && (
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', opacity: 0.6 }}>Technical</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {data.skills.technical.map((s, i) => <span key={i} className="skill-tag-preview">{s}</span>)}
                </div>
              </div>
            )}
            {data.skills.tools.length > 0 && (
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', opacity: 0.6 }}>Tools & Technologies</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {data.skills.tools.map((s, i) => <span key={i} className="skill-tag-preview">{s}</span>)}
                </div>
              </div>
            )}
            {data.skills.soft.length > 0 && (
              <div>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', opacity: 0.6 }}>Soft Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {data.skills.soft.map((s, i) => <span key={i} className="skill-tag-preview">{s}</span>)}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section style={sectionStyle}>
          <h4 className="preview-section-header">Education</h4>
          {data.education.map((edu, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '16px' }}>{edu.school}</strong>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', opacity: 0.7 }}>{edu.year}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 500 }}>{edu.degree}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

// --- Shared Components for Form ---

const TagInput: React.FC<{ tags: string[]; onAdd: (tag: string) => void; onRemove: (idx: number) => void; placeholder?: string }> = ({ tags, onAdd, onRemove, placeholder }) => {
  const [input, setInput] = useState('');
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      onAdd(input.trim());
      setInput('');
    }
  };
  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Type and press Enter..."}
      />
      <div className="pill-container">
        {tags.map((tag, i) => (
          <div key={i} className="pill">
            {tag} <span className="pill-remove" onClick={() => onRemove(i)}>×</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Build Track Components ---

const BuildTrackLayout: React.FC<{ children: React.ReactNode; stepIndex: number }> = ({ children, stepIndex }) => {
  const currentStep = STEPS[stepIndex];
  const artifactKey = `rb_step_${currentStep.id}_artifact`;
  const [artifact, setArtifact] = useState(localStorage.getItem(artifactKey) || '');
  const [isCopied, setIsCopied] = useState(false);

  const isAccessible = STEPS.slice(0, stepIndex).every(s => localStorage.getItem(`rb_step_${s.id}_artifact`));
  if (!isAccessible && stepIndex > 0) return <Navigate to={`/rb/${STEPS[0].path}`} />;

  const handleSave = (val: string) => { setArtifact(val); localStorage.setItem(artifactKey, val); };
  const handleCopy = () => { navigator.clipboard.writeText(artifact); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };

  return (
    <div className="premium-layout" style={{ display: 'grid', gridTemplateRows: '64px 40px 1fr 64px', gridTemplateColumns: '70% 30%', height: '100vh', width: '100vw' }}>
      <TopBar
        title="AI RESUME BUILDER"
        subtitle={`STEP ${stepIndex + 1} OF 8`}
        statusBadge={<div className="status-badge" style={{ padding: '8px 16px', background: artifact ? 'var(--acc-red)' : 'transparent', color: artifact ? 'white' : 'var(--acc-red)', border: '1px solid var(--acc-red)', fontWeight: 700 }}>{artifact ? 'SAVED' : 'PENDING'}</div>}
      />
      <div className="context-header">{currentStep.name.toUpperCase()} ENGINE // 0.0.{currentStep.id}</div>
      <main className="main-workspace" style={{ padding: '64px 40px', overflowY: 'auto', borderRight: '1px solid var(--border-color)' }}>{children}</main>
      <aside className="build-panel" style={{ background: 'var(--bg-primary)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        <h3 className="serif-heading" style={{ fontSize: '16px', textTransform: 'uppercase' }}>LOVABLE INSTRUCTIONS</h3>
        <textarea value={artifact} onChange={(e) => handleSave(e.target.value)} placeholder="Type instructions here..." style={{ flex: 1, padding: '24px', border: '1px solid var(--border-color)', resize: 'none' }} />
        <button className="btn-secondary" onClick={handleCopy}>{isCopied ? 'COPIED!' : 'COPY INSTRUCTIONS'}</button>
        <button className="btn-primary" onClick={() => window.open('https://lovable.dev', '_blank')}>BUILD IN LOVABLE</button>
      </aside>
      <footer className="footer" style={{ gridColumn: '1/3', display: 'flex', justifyContent: 'space-between', padding: '0 40px', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {STEPS.map((s, idx) => (
            <Link key={s.id} to={`/rb/${s.path}`} style={{ color: idx === stepIndex ? 'var(--acc-red)' : 'var(--text-main)', textDecoration: 'none', fontWeight: 700, fontSize: '14px', opacity: (idx > stepIndex && !localStorage.getItem(`rb_step_${STEPS[idx - 1]?.id}_artifact`)) ? 0.3 : 1 }}>
              {s.id}
            </Link>
          ))}
          <Link to="/rb/proof" style={{ textDecoration: 'none', fontWeight: 700, color: 'var(--text-main)', fontSize: '14px' }}>PROOF</Link>
        </div>
        <Link to={stepIndex < 7 ? `/rb/${STEPS[stepIndex + 1].path}` : "/rb/proof"}>
          <button className="btn-primary" disabled={!artifact}>{stepIndex < 7 ? 'NEXT STEP' : 'VIEW PROOF'}</button>
        </Link>
      </footer>
    </div>
  );
};

const BuildStep: React.FC<{ index: number }> = ({ index }) => (
  <div style={{ maxWidth: '800px' }}>
    <h1 className="serif-heading" style={{ fontSize: '64px', marginBottom: '24px' }}>{STEPS[index].name}</h1>
    <p style={{ fontSize: '20px', lineHeight: '1.6', opacity: 0.7 }}>Define your {STEPS[index].name.toLowerCase()} strategy in the build panel.</p>
  </div>
);

const BuildProof: React.FC = () => {
  const stepsComplete = STEPS.map(s => !!localStorage.getItem(`rb_step_${s.id}_artifact`));
  const allComplete = stepsComplete.every(v => v);
  return (
    <div className="premium-layout" style={{ display: 'grid', gridTemplateRows: '64px 40px 1fr 64px', height: '100vh' }}>
      <TopBar title="AI RESUME BUILDER" subtitle="PROOF OF SHIPMENT" statusBadge={<div className="status-badge" style={{ padding: '8px 16px', background: allComplete ? 'var(--acc-red)' : 'transparent', color: allComplete ? 'white' : 'var(--acc-red)', border: '1px solid var(--acc-red)', fontWeight: 700 }}>{allComplete ? 'READY' : 'INCOMPLETE'}</div>} />
      <div className="context-header">DELIVERY MANIFEST // FINAL VALIDATION</div>
      <main className="main-workspace" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', padding: '64px 40px' }}>
        <section>
          <h2 className="serif-heading" style={{ fontSize: '32px', marginBottom: '40px' }}>Build Progress</h2>
          {STEPS.map((s, idx) => <div key={s.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}><span>{s.id}. {s.name.toUpperCase()}</span><strong>{stepsComplete[idx] ? '✓' : '—'}</strong></div>)}
        </section>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h2 className="serif-heading" style={{ fontSize: '32px', marginBottom: '40px' }}>Link Artifacts</h2>
          {['Lovable Project', 'GitHub Repo', 'Deployment'].map(label => (
            <div key={label} className="field"><label>{label}</label><input className="glass-card" style={{ width: '100%', padding: '16px' }} /></div>
          ))}
          <button className="btn-primary" disabled={!allComplete}>COMMIT SHIPMENT</button>
        </section>
      </main>
      <footer className="footer" style={{ padding: '0 40px', display: 'flex', alignItems: 'center' }}><Link to="/rb/08-ship" style={{ textDecoration: 'none', fontWeight: 800, fontSize: '12px', color: 'var(--text-main)' }}>RETURN TO STEP 08</Link></footer>
    </div>
  );
};

// --- WebApp Components ---

const WebAppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {!isHome && (
        <nav className="topbar no-print" style={{ padding: '0 40px', height: '64px', background: 'white', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
          <Link to="/" style={{ textDecoration: 'none', fontWeight: 800, fontSize: '20px', color: 'var(--text-main)' }}>AI RESUME BUILDER</Link>
          <div style={{ display: 'flex', gap: '40px' }}>
            {['BUILDER', 'PREVIEW', 'PROOF'].map(item => (
              <Link key={item} to={`/${item.toLowerCase()}`} className={`nav-link ${location.pathname === `/${item.toLowerCase()}` ? 'active' : ''}`}>{item}</Link>
            ))}
          </div>
          <div className="status-badge" style={{ padding: '8px 16px', background: 'var(--acc-red)', color: 'white', fontWeight: 700, fontSize: '12px' }}>PREMIUM</div>
        </nav>
      )}
      {children}
    </div>
  );
};

const HomePage: React.FC = () => (
  <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
    <h1 className="serif-heading" style={{ fontSize: '72px', marginBottom: '24px' }}>Build a Resume That<br />Gets Read.</h1>
    <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.7 }}>A premium tool for high-impact candidates.</p>
    <Link to="/builder"><button className="btn-primary" style={{ padding: '20px 48px' }}>START BUILDING</button></Link>
  </div>
);

const BuilderPage: React.FC<{ data: ResumeData; setData: (d: ResumeData) => void; template: TemplateType; setTemplate: (t: TemplateType) => void }> = ({ data, setData, template, setTemplate }) => {
  const score = calculateATSScore(data);
  const improvements = getTopImprovements(data);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const addEdu = () => setData({ ...data, education: [...data.education, { school: '', degree: '', year: '' }] });
  const addExp = () => setData({ ...data, experience: [...data.experience, { company: '', role: '', period: '', description: '' }] });

  const addProject = () => {
    const newProj: Project = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Project',
      description: '',
      techStack: [],
      isCollapsed: false
    };
    setData({ ...data, projects: [...data.projects, newProj] });
  };

  const removeProject = (id: string) => {
    setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
  };

  const toggleProjectCollapse = (id: string) => {
    setData({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, isCollapsed: !p.isCollapsed } : p) });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setData({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, ...updates } : p) });
  };

  const suggestSkills = () => {
    setIsSuggesting(true);
    setTimeout(() => {
      setData({
        ...data,
        skills: {
          technical: [...new Set([...data.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
          soft: [...new Set([...data.skills.soft, "Team Leadership", "Problem Solving"])],
          tools: [...new Set([...data.skills.tools, "Git", "Docker", "AWS"])]
        }
      });
      setIsSuggesting(false);
    }, 1000);
  };

  return (
    <div className="builder-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(450px, 1fr) minmax(0, 1fr)' }}>
      <div className="form-panel" style={{ padding: '40px', overflowY: 'auto', maxHeight: 'calc(100vh - 64px)', borderRight: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 className="serif-heading" style={{ fontSize: '32px' }}>Resume Details</h2>
          <button className="btn-secondary" onClick={() => setData(SAMPLE_DATA)}>LOAD SAMPLE DATA</button>
        </div>

        <TemplateTabs selected={template} onSelect={setTemplate} />

        <div className="score-container" style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>ATS Readiness Score</span>
            <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--acc-red)' }}>{score}<span style={{ fontSize: '14px', color: '#ccc' }}>/100</span></span>
          </div>
          <div className="score-meter-bg"><div className="score-meter-fill" style={{ width: `${score}%` }} /></div>

          <div style={{ marginTop: '24px' }}>
            <h5 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-sub)', marginBottom: '12px' }}>Top 3 Improvements</h5>
            <div className="suggestions-list">
              {improvements.map((s, i) => <div key={i} className="suggestion-item">{s}</div>)}
            </div>
          </div>
        </div>

        <section className="form-section">
          <h3>Personal Info</h3>
          <div className="input-grid">
            <div className="field"><label>Name</label><input value={data.personalInfo.name} onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, name: e.target.value } })} /></div>
            <div className="field"><label>Email</label><input value={data.personalInfo.email} onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, email: e.target.value } })} /></div>
            <div className="field"><label>Phone</label><input value={data.personalInfo.phone} onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, phone: e.target.value } })} /></div>
            <div className="field"><label>Location</label><input value={data.personalInfo.location} onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, location: e.target.value } })} /></div>
          </div>
        </section>

        <section className="form-section">
          <h3>Summary</h3>
          <textarea value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} rows={4} placeholder="Summarize your professional value..." />
        </section>

        <section className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0 }}>Skills</h3>
            <button className="btn-secondary" onClick={suggestSkills} disabled={isSuggesting} style={{ fontSize: '10px', padding: '6px 12px' }}>
              {isSuggesting ? '...' : '✨ SUGGEST SKILLS'}
            </button>
          </div>

          <div className="field">
            <label>Technical Skills ({data.skills.technical.length})</label>
            <TagInput
              tags={data.skills.technical}
              onAdd={(tag) => setData({ ...data, skills: { ...data.skills, technical: [...data.skills.technical, tag] } })}
              onRemove={(idx) => setData({ ...data, skills: { ...data.skills, technical: data.skills.technical.filter((_, i) => i !== idx) } })}
            />
          </div>

          <div className="field">
            <label>Soft Skills ({data.skills.soft.length})</label>
            <TagInput
              tags={data.skills.soft}
              onAdd={(tag) => setData({ ...data, skills: { ...data.skills, soft: [...data.skills.soft, tag] } })}
              onRemove={(idx) => setData({ ...data, skills: { ...data.skills, soft: data.skills.soft.filter((_, i) => i !== idx) } })}
            />
          </div>

          <div className="field">
            <label>Tools & Technologies ({data.skills.tools.length})</label>
            <TagInput
              tags={data.skills.tools}
              onAdd={(tag) => setData({ ...data, skills: { ...data.skills, tools: [...data.skills.tools, tag] } })}
              onRemove={(idx) => setData({ ...data, skills: { ...data.skills, tools: data.skills.tools.filter((_, i) => i !== idx) } })}
            />
          </div>
        </section>

        <section className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0 }}>Projects</h3>
            <button className="btn-secondary" onClick={addProject} style={{ fontSize: '10px', padding: '6px 12px' }}>+ ADD PROJECT</button>
          </div>

          {data.projects.map((proj) => (
            <div key={proj.id} style={{ marginBottom: '16px' }}>
              <div className="collapsible-header" onClick={() => toggleProjectCollapse(proj.id)}>
                <span style={{ fontWeight: 600 }}>{proj.title || 'Untitled Project'}</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={(e) => { e.stopPropagation(); removeProject(proj.id); }} style={{ background: 'transparent', border: 'none', color: 'var(--acc-red)', cursor: 'pointer', fontSize: '11px', fontWeight: 700 }}>DELETE</button>
                  <span>{proj.isCollapsed ? '▼' : '▲'}</span>
                </div>
              </div>
              {!proj.isCollapsed && (
                <div className="project-entry-content">
                  <div className="field">
                    <label>Project Title</label>
                    <input value={proj.title} onChange={(e) => updateProject(proj.id, { title: e.target.value })} />
                  </div>
                  <div className="field">
                    <label>Description</label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, { description: e.target.value.substring(0, 200) })}
                      rows={3}
                    />
                    <div className="char-counter">{proj.description.length}/200</div>
                  </div>
                  <div className="field">
                    <label>Tech Stack</label>
                    <TagInput
                      tags={proj.techStack}
                      onAdd={(tag) => updateProject(proj.id, { techStack: [...proj.techStack, tag] })}
                      onRemove={(idx) => updateProject(proj.id, { techStack: proj.techStack.filter((_, i) => i !== idx) })}
                    />
                  </div>
                  <div className="input-grid">
                    <div className="field"><label>Live URL</label><input value={proj.liveUrl || ''} onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })} placeholder="https://..." /></div>
                    <div className="field"><label>GitHub URL</label><input value={proj.githubUrl || ''} onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })} placeholder="https://..." /></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="form-section">
          <h3>Experience</h3>
          {data.experience.map((exp, i) => {
            const guidance = checkBulletGuidance(exp.description);
            return (
              <div key={i} className="entry-card" style={{ marginBottom: '24px' }}>
                <div className="input-grid" style={{ marginBottom: '8px' }}>
                  <input value={exp.company} placeholder="Company" onChange={(e) => { const n = [...data.experience]; n[i].company = e.target.value; setData({ ...data, experience: n }); }} />
                  <input value={exp.role} placeholder="Role" onChange={(e) => { const n = [...data.experience]; n[i].role = e.target.value; setData({ ...data, experience: n }); }} />
                </div>
                <input value={exp.period} placeholder="Period" onChange={(e) => { const n = [...data.experience]; n[i].period = e.target.value; setData({ ...data, experience: n }); }} style={{ marginBottom: '8px' }} />
                <textarea value={exp.description} placeholder="Description..." onChange={(e) => { const n = [...data.experience]; n[i].description = e.target.value; setData({ ...data, experience: n }); }} rows={3} />
                {guidance.length > 0 && (
                  <div style={{ marginTop: '12px', padding: '12px', borderLeft: '2px solid var(--acc-red)', background: '#fff' }}>
                    {guidance.map((g, idx) => <p key={idx} style={{ fontSize: '11px', color: 'var(--text-sub)', fontStyle: 'italic', marginBottom: '4px' }}>{g}</p>)}
                  </div>
                )}
              </div>
            );
          })}
          <button className="btn-secondary" onClick={addExp}>+ ADD EXPERIENCE</button>
        </section>

        <section className="form-section">
          <h3>Education</h3>
          {data.education.map((edu, i) => (
            <div key={i} className="entry-card" style={{ marginBottom: '24px' }}>
              <input value={edu.school} placeholder="School" onChange={(e) => { const newEdu = [...data.education]; newEdu[i].school = e.target.value; setData({ ...data, education: newEdu }); }} style={{ marginBottom: '8px' }} />
              <div className="input-grid"><input value={edu.degree} placeholder="Degree" onChange={(e) => { const newEdu = [...data.education]; newEdu[i].degree = e.target.value; setData({ ...data, education: newEdu }); }} /><input value={edu.year} placeholder="Year" onChange={(e) => { const newEdu = [...data.education]; newEdu[i].year = e.target.value; setData({ ...data, education: newEdu }); }} /></div>
            </div>
          ))}
          <button className="btn-secondary" onClick={addEdu}>+ ADD EDUCATION</button>
        </section>
      </div>

      <div className="preview-panel" style={{ background: '#E5E7EB', padding: '64px', overflowY: 'auto', maxHeight: 'calc(100vh - 64px)' }}>
        <ResumeContent data={data} template={template} />
      </div>
    </div>
  );
};

const PreviewPage: React.FC<{ data: ResumeData; template: TemplateType; setTemplate: (t: TemplateType) => void }> = ({ data, template, setTemplate }) => {
  const isIncomplete = !data.personalInfo.name.trim() || (data.experience.length === 0 && data.projects.length === 0);

  const copyAsText = () => {
    let text = `${data.personalInfo.name.toUpperCase()}\n`;
    text += `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}\n`;
    if (data.links.github || data.links.linkedin) {
      text += `${data.links.github} ${data.links.linkedin}\n`;
    }

    if (data.summary.trim()) {
      text += `\nSUMMARY\n${data.summary}\n`;
    }

    if (data.experience.length > 0) {
      text += `\nEXPERIENCE\n`;
      data.experience.forEach(exp => {
        text += `${exp.company} | ${exp.role} | ${exp.period}\n${exp.description}\n\n`;
      });
    }

    if (data.projects.length > 0) {
      text += `\nPROJECTS\n`;
      data.projects.forEach(proj => {
        text += `${proj.title} | ${proj.liveUrl || ''}\n${proj.description}\n\n`;
      });
    }

    if (data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) {
      text += `\nSKILLS\n`;
      text += `Technical: ${data.skills.technical.join(', ')}\n`;
      text += `Soft: ${data.skills.soft.join(', ')}\n`;
      text += `Tools: ${data.skills.tools.join(', ')}\n`;
    }

    if (data.education.length > 0) {
      text += `\nEDUCATION\n`;
      data.education.forEach(edu => {
        text += `${edu.school} | ${edu.degree} | ${edu.year}\n`;
      });
    }

    navigator.clipboard.writeText(text);
    alert('Resume copied as text!');
  };

  return (
    <div style={{ padding: '64px 40px', background: 'var(--bg-primary)', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
          <div>
            <h2 className="serif-heading" style={{ fontSize: '32px', marginBottom: '8px' }}>Export Preview</h2>
            <p style={{ color: 'var(--text-sub)', fontSize: '14px' }}>Review your resume before finalizing.</p>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-secondary" onClick={copyAsText}>COPY RESUME AS TEXT</button>
            <button className="btn-primary" onClick={() => window.print()}>PRINT / SAVE AS PDF</button>
          </div>
        </div>

        {isIncomplete && (
          <div className="warning-banner no-print">
            <span>⚠️</span>
            Your resume may look incomplete. Consider adding a name and at least one experience or project.
          </div>
        )}

        <div className="no-print">
          <TemplateTabs selected={template} onSelect={setTemplate} />
        </div>

        <div className="preview-panel" style={{ background: '#E5E7EB', padding: '64px', display: 'flex', justifyContent: 'center' }}>
          <ResumeContent data={data} template={template} />
        </div>
      </div>
    </div>
  );
};

// --- App Root ---

function App() {
  const { selectedJob } = useJobStore();

  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resumeBuilderData');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration: Ensure skills is an object
      if (typeof parsed.skills === 'string') {
        parsed.skills = { technical: parsed.skills.split(',').map((s: string) => s.trim()).filter(Boolean), soft: [], tools: [] };
      }
      // Migration: Ensure projects have id and description
      if (parsed.projects && parsed.projects.length > 0 && !parsed.projects[0].id) {
        parsed.projects = parsed.projects.map((p: any) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: p.name || 'Untitled',
          description: p.description || '',
          techStack: [],
          isCollapsed: true
        }));
      }
      return parsed;
    }
    return INITIAL_DATA;
  });

  const [template, setTemplate] = useState<TemplateType>(() => {
    const saved = localStorage.getItem('resumeTemplate');
    return (saved as TemplateType) || 'Classic';
  });

  useEffect(() => { localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData)); }, [resumeData]);
  useEffect(() => { localStorage.setItem('resumeTemplate', template); }, [template]);

  useEffect(() => {
    if (selectedJob) {
      setResumeData(prev => ({
        ...prev,
        summary: prev.summary || `Professional targeting ${selectedJob.title} roles at companies like ${selectedJob.company}.`,
        skills: {
          ...prev.skills,
          technical: Array.from(new Set([...prev.skills.technical, ...selectedJob.skills]))
        }
      }));
    }
  }, [selectedJob]);

  return (
    <Routes>
      <Route path="/" element={<WebAppLayout><HomePage /></WebAppLayout>} />
      <Route path="builder" element={<WebAppLayout><BuilderPage data={resumeData} setData={setResumeData} template={template} setTemplate={setTemplate} /></WebAppLayout>} />
      <Route path="preview" element={<WebAppLayout><PreviewPage data={resumeData} template={template} setTemplate={setTemplate} /></WebAppLayout>} />
      <Route path="proof" element={<WebAppLayout><div className="main-workspace"><h1 className="serif-heading">WebApp Proof</h1></div></WebAppLayout>} />
      {STEPS.map((step, idx) => (
        <Route key={step.id} path={`rb/${step.path}`} element={<BuildTrackLayout stepIndex={idx}><BuildStep index={idx} /></BuildTrackLayout>} />
      ))}
      <Route path="rb/proof" element={<BuildProof />} />
    </Routes>
  );
}

export default App;
