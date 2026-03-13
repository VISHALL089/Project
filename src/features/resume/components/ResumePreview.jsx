import React from 'react';

export const ResumeContent = ({ data, template, color }) => {
  const isModern = template === 'Modern';
  const isMinimal = template === 'Minimal';

  const accentStyle = { '--accent-color': color };

  const renderHeader = (dark = false) => (
    <div style={{ marginBottom: isMinimal ? '32px' : '40px', textAlign: isModern && !dark ? 'left' : 'center' }}>
      <h1 className={isMinimal ? '' : 'serif-heading'} style={{ 
        fontSize: isMinimal ? '32px' : '44px', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em', 
        marginBottom: '8px', 
        color: dark ? 'white' : 'var(--text-main)', 
        fontFamily: isMinimal ? 'var(--font-sans)' : 'var(--font-serif)' 
      }}>
        {data.personalInfo.name || 'Your Name'}
      </h1>
      <div style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', opacity: 0.8, color: dark ? 'white' : '#666' }}>
        {data.personalInfo.email} {data.personalInfo.phone && `• ${data.personalInfo.phone}`}
        <br />{data.personalInfo.location}
      </div>
      {(data.links.github || data.links.linkedin) && !isModern && (
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', marginTop: '12px', color: isMinimal ? 'var(--text-sub)' : color, fontWeight: 600 }}>
          {data.links.github.toUpperCase()} {data.links.github && data.links.linkedin && ' | '} {data.links.linkedin.toUpperCase()}
        </div>
      )}
    </div>
  );

  const renderSections = (side = false) => (
    <>
      {side ? (
        <>
          <section style={{ marginBottom: '32px' }}>
            <h4 className="preview-section-header">Contact</h4>
            <div style={{ fontSize: '12px', lineHeight: '1.8' }}>
              {data.links.github && <div><strong style={{ opacity: 0.6 }}>GH:</strong> {data.links.github}</div>}
              {data.links.linkedin && <div><strong style={{ opacity: 0.6 }}>LI:</strong> {data.links.linkedin}</div>}
            </div>
          </section>
          {(data.skills.technical.length > 0 || data.skills.soft.length > 0 || data.skills.tools.length > 0) && (
            <section>
              <h4 className="preview-section-header">Skills</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.skills.technical.length > 0 && (
                  <div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', marginBottom: '6px', opacity: 0.7 }}>Technical</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {data.skills.technical.map((s, i) => <span key={i} className="skill-tag-preview">{s}</span>)}
                    </div>
                  </div>
                )}
                {data.skills.tools.length > 0 && (
                  <div>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', marginBottom: '6px', opacity: 0.7 }}>Tools</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {data.skills.tools.map((s, i) => <span key={i} className="skill-tag-preview">{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      ) : (
        <>
          {data.summary.trim() && (
            <section style={{ marginBottom: '32px' }}>
              <h4 className="preview-section-header">Summary</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.6', fontFamily: 'var(--font-sans)' }}>{data.summary}</p>
            </section>
          )}
          {data.experience.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h4 className="preview-section-header">Experience</h4>
              {data.experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px' }}>
                    <span>{exp.company}</span>
                    <span style={{ fontSize: '12px', opacity: 0.7 }}>{exp.period}</span>
                  </div>
                  <div style={{ fontStyle: 'italic', fontSize: '13px', marginBottom: '8px', color: isMinimal ? 'inherit' : color }}>{exp.role}</div>
                  <p style={{ fontSize: '14px', lineHeight: '1.5', opacity: 0.9, fontFamily: 'var(--font-sans)' }}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}
          {data.projects.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h4 className="preview-section-header">Projects</h4>
              {data.projects.map((proj, i) => (
                <div key={i} style={{ marginBottom: '24px' }} className="project-preview-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>
                    <span>{proj.title}</span>
                    <div className="link-icons no-print">
                      {proj.liveUrl && <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="link-icon">↗ Live</a>}
                      {proj.githubUrl && <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="link-icon">⑀ GitHub</a>}
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', lineHeight: '1.5', opacity: 0.9, marginBottom: '8px', fontFamily: 'var(--font-sans)' }}>{proj.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {proj.techStack.map((tech, idx) => <span key={idx} className="skill-tag-preview">{tech}</span>)}
                  </div>
                </div>
              ))}
            </section>
          )}
          {!isModern && (data.skills.technical.length > 0 || data.skills.soft.length > 0) && (
            <section style={{ marginBottom: '32px' }}>
              <h4 className="preview-section-header">Skills</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {data.skills.technical.length > 0 && <p style={{ fontSize: '14px' }}><strong>Technical:</strong> {data.skills.technical.join(', ')}</p>}
                {data.skills.soft.length > 0 && <p style={{ fontSize: '14px' }}><strong>Soft Skills:</strong> {data.skills.soft.join(', ')}</p>}
              </div>
            </section>
          )}
          {data.education.length > 0 && (
            <section>
              <h4 className="preview-section-header">Education</h4>
              {data.education.map((edu, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                    <span>{edu.school}</span>
                    <span style={{ fontSize: '12px', opacity: 0.7 }}>{edu.year}</span>
                  </div>
                  <div style={{ fontSize: '13px' }}>{edu.degree}</div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </>
  );

  return (
    <div className={`resume-preview-shell ${template.toLowerCase()} animate-fade-in`} style={{ ...accentStyle }}>
      {isModern ? (
        <div className="modern-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', minHeight: '1100px' }}>
          <div className="modern-sidebar" style={{ background: color, color: 'white' }}>
            {renderHeader(true)}
            {renderSections(true)}
          </div>
          <div className="modern-main">
            {renderSections(false)}
          </div>
        </div>
      ) : (
        <div style={{ padding: '64px' }}>
          {renderHeader()}
          {renderSections(false)}
        </div>
      )}
    </div>
  );
};
