import React, { useState } from 'react';
import { useResume } from '../ResumeContext';
import { SAMPLE_DATA } from '../constants';
import { calculateATSScore, checkBulletGuidance } from '../utils/resumeLogic';
import { ResumeContent } from '../components/ResumePreview';
import { TagInput, TemplateThumb, ColorPicker } from '../components/ResumeFormParts';
import '../styles/resume.css';

const ResumeBuilder = () => {
  const { data, setData, template, setTemplate, color, setColor } = useResume();
  const score = calculateATSScore(data);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const addEdu = () => setData({ ...data, education: [...data.education, { school: '', degree: '', year: '' }] });
  const addExp = () => setData({ ...data, experience: [...data.experience, { company: '', role: '', period: '', description: '' }] });

  const addProject = () => {
    const newProj = { id: Math.random().toString(36).substr(2, 9), title: 'New Project', description: '', techStack: [], isCollapsed: false };
    setData({ ...data, projects: [...data.projects, newProj] });
  };
  const removeProject = (id) => setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
  const toggleProjectCollapse = (id) => setData({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, isCollapsed: !p.isCollapsed } : p) });
  const updateProject = (id, updates) => setData({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, ...updates } : p) });

  const suggestSkills = () => {
    setIsSuggesting(true);
    setTimeout(() => {
      setData({
        ...data, skills: {
          technical: [...new Set([...data.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])],
          soft: [...new Set([...data.skills.soft, "Team Leadership", "Problem Solving"])],
          tools: [...new Set([...data.skills.tools, "Git", "Docker", "AWS"])]
        }
      });
      setIsSuggesting(false);
    }, 1000);
  };

  return (
    <div className="builder-layout">
      <div className="form-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
          <h2 className="serif-heading" style={{ fontSize: '32px' }}>Resume Builder</h2>
          <button className="btn-secondary" onClick={() => setData(SAMPLE_DATA)}>LOAD SAMPLE DATA</button>
        </div>

        <section className="form-section">
          <h3>Appearance</h3>
          <div className="template-thumbnails">
            {['Classic', 'Modern', 'Minimal'].map(t => (
              <TemplateThumb key={t} type={t} active={template === t} onClick={() => setTemplate(t)} />
            ))}
          </div>
          <label>Accent Color</label>
          <ColorPicker selected={color} onSelect={setColor} />
        </section>

        <section className="form-section">
          <div className="score-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '11px', fontWeight: 700 }}>ATS READINESS SCORE</span>
              <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--acc-red)' }}>{score}<span style={{ fontSize: '14px', color: '#ccc' }}>/100</span></span>
            </div>
            <div className="score-meter-bg"><div className="score-meter-fill" style={{ width: `${score}%` }} /></div>
          </div>
        </section>

        <section className="form-section">
          <h3>Personal Info</h3>
          <div className="input-grid">
            <div className="field"><label>Name</label><input value={data.personalInfo.name} onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, name: e.target.value } })} /></div>
            <div className="field"><label>Email</label><input value={data.personalInfo.email} onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, email: e.target.value } })} /></div>
            <div className="field"><label>Phone</label><input value={data.personalInfo.phone} onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, phone: e.target.value } })} /></div>
            <div className="field"><label>Location</label><input value={data.personalInfo.location} onChange={(e) => setData({ ...data, personalInfo: { ...data.personalInfo, location: e.target.value } })} /></div>
          </div>
          <div className="input-grid">
            <div className="field"><label>GitHub</label><input value={data.links.github} onChange={(e) => setData({ ...data, links: { ...data.links, github: e.target.value } })} /></div>
            <div className="field"><label>LinkedIn</label><input value={data.links.linkedin} onChange={(e) => setData({ ...data, links: { ...data.links, linkedin: e.target.value } })} /></div>
          </div>
        </section>

        <section className="form-section">
          <h3>Summary</h3>
          <textarea value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} rows={4} placeholder="Summarize your professional value..." />
        </section>

        <section className="form-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0 }}>Skills</h3>
            <button className="btn-secondary" onClick={suggestSkills} disabled={isSuggesting} style={{ fontSize: '10px', padding: '6px 12px' }}>{isSuggesting ? '...' : '✨ SUGGEST SKILLS'}</button>
          </div>
          <div className="field"><label>Technical Skills ({data.skills.technical.length})</label><TagInput tags={data.skills.technical} onAdd={(tag) => setData({ ...data, skills: { ...data.skills, technical: [...data.skills.technical, tag] } })} onRemove={(idx) => setData({ ...data, skills: { ...data.skills, technical: data.skills.technical.filter((_, i) => i !== idx) } })} /></div>
          <div className="field"><label>Soft Skills ({data.skills.soft.length})</label><TagInput tags={data.skills.soft} onAdd={(tag) => setData({ ...data, skills: { ...data.skills, soft: [...data.skills.soft, tag] } })} onRemove={(idx) => setData({ ...data, skills: { ...data.skills, soft: data.skills.soft.filter((_, i) => i !== idx) } })} /></div>
          <div className="field"><label>Tools & Technologies ({data.skills.tools.length})</label><TagInput tags={data.skills.tools} onAdd={(tag) => setData({ ...data, skills: { ...data.skills, tools: [...data.skills.tools, tag] } })} onRemove={(idx) => setData({ ...data, skills: { ...data.skills, tools: data.skills.tools.filter((_, i) => i !== idx) } })} /></div>
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
                <span>{proj.isCollapsed ? '▼' : '▲'}</span>
              </div>
              {!proj.isCollapsed && (
                <div className="project-entry-content">
                  <div className="field"><label>Title</label><input value={proj.title} onChange={(e) => updateProject(proj.id, { title: e.target.value })} /></div>
                  <div className="field"><label>Description</label><textarea value={proj.description} onChange={(e) => updateProject(proj.id, { description: e.target.value.substring(0, 200) })} rows={3} /><div className="char-counter">{proj.description.length}/200</div></div>
                  <div className="field"><label>Tech Stack</label><TagInput tags={proj.techStack} onAdd={(tag) => updateProject(proj.id, { techStack: [...proj.techStack, tag] })} onRemove={(idx) => updateProject(proj.id, { techStack: proj.techStack.filter((_, i) => i !== idx) })} /></div>
                  <div className="input-grid">
                    <div className="field"><label>Live URL</label><input value={proj.liveUrl || ''} onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })} /></div>
                    <div className="field"><label>GitHub URL</label><input value={proj.githubUrl || ''} onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })} /></div>
                  </div>
                  <button onClick={() => removeProject(proj.id)} style={{ background: 'transparent', border: 'none', color: 'var(--acc-red)', cursor: 'pointer', fontSize: '11px', fontWeight: 700, marginTop: '8px' }}>DELETE PROJECT</button>
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
                <div className="input-grid" style={{ marginBottom: '8px' }}><input value={exp.company} placeholder="Company" onChange={(e) => { const n = [...data.experience]; n[i].company = e.target.value; setData({ ...data, experience: n }); }} /><input value={exp.role} placeholder="Role" onChange={(e) => { const n = [...data.experience]; n[i].role = e.target.value; setData({ ...data, experience: n }); }} /></div>
                <input value={exp.period} placeholder="Period" onChange={(e) => { const n = [...data.experience]; n[i].period = e.target.value; setData({ ...data, experience: n }); }} style={{ marginBottom: '8px' }} />
                <textarea value={exp.description} placeholder="Description..." onChange={(e) => { const n = [...data.experience]; n[i].description = e.target.value; setData({ ...data, experience: n }); }} rows={3} />
                {guidance.map((g, idx) => <p key={idx} style={{ fontSize: '11px', color: 'var(--text-sub)', fontStyle: 'italic', marginTop: '4px' }}>{g}</p>)}
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
      <div className="preview-panel">
        <ResumeContent data={data} template={template} color={color} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
