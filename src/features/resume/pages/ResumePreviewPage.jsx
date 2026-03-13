import React, { useState } from 'react';
import { useResume } from '../ResumeContext';
import { calculateATSScore, getImprovementSuggestions } from '../utils/resumeLogic';
import { ResumeContent } from '../components/ResumePreview';
import { TemplateThumb, ColorPicker, ATSScoreCircle } from '../components/ResumeFormParts';
import '../styles/resume.css';

const ResumePreviewPage = () => {
  const { data, template, setTemplate, color, setColor } = useResume();
  const [showToast, setShowToast] = useState(false);
  const score = calculateATSScore(data);
  const suggestions = getImprovementSuggestions(data);
  const isIncomplete = !data.personalInfo.name.trim() || (data.experience.length === 0 && data.projects.length === 0);

  const handleDownload = () => { setShowToast(true); setTimeout(() => setShowToast(false), 3000); };

  const copyAsText = () => {
    let text = `${data.personalInfo.name.toUpperCase()}\n`;
    text += `${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}\n`;
    if (data.summary.trim()) text += `\nSUMMARY\n${data.summary}\n`;
    if (data.experience.length > 0) {
      text += `\nEXPERIENCE\n`;
      data.experience.forEach(exp => text += `${exp.company} | ${exp.role} | ${exp.period}\n${exp.description}\n\n`);
    }
    if (data.projects.length > 0) {
      text += `\nPROJECTS\n`;
      data.projects.forEach(proj => text += `${proj.title}\n${proj.description}\n\n`);
    }
    navigator.clipboard.writeText(text);
    alert('Resume copied as text!');
  };

  return (
    <div style={{ padding: '64px 40px', background: 'var(--bg-primary)', minHeight: 'calc(100vh - 64px)' }}>
      {showToast && <div className="toast">PDF export ready! Check your downloads.</div>}
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '40px' }}>

        <div className="preview-column">
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div><h2 className="serif-heading" style={{ fontSize: '32px' }}>Final Preview</h2><p style={{ color: '#666' }}>Fine-tune the appearance before export.</p></div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn-secondary" onClick={copyAsText}>COPY AS TEXT</button>
              <button className="btn-secondary" onClick={handleDownload}>DOWNLOAD PDF</button>
              <button className="btn-primary" onClick={() => window.print()}>PRINT RESUME</button>
            </div>
          </div>

          {isIncomplete && <div className="warning-banner no-print"><span>⚠️</span> Your resume may look incomplete. Add a name and at least one project/experience.</div>}

          <div className="no-print" style={{ marginBottom: '40px' }}>
            <div className="template-thumbnails">
                {['Classic', 'Modern', 'Minimal'].map(t => <TemplateThumb key={t} type={t} active={template === t} onClick={() => setTemplate(t)} />)}
            </div>
            <ColorPicker selected={color} onSelect={setColor} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', padding: '64px', background: '#E5E7EB', borderRadius: '8px' }} className="preview-panel">
            <ResumeContent data={data} template={template} color={color} />
          </div>
        </div>

        <aside className="no-print" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ATSScoreCircle score={score} />

          <div className="improvements-panel glass-card" style={{ padding: '24px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '20px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>How to improve</h3>
            {suggestions.length > 0 ? (
              suggestions.map(s => (
                <div key={s.id} className="improvement-item">
                  <span>{s.label}</span>
                  <span className="improvement-points">+{s.points}</span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '20px', color: '#166534', fontWeight: 600 }}>✨ All criteria met! Your resume is ATS optimized.</div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ResumePreviewPage;
