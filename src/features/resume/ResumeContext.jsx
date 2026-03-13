import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_DATA, COLORS } from './constants';

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const s = localStorage.getItem('resumeBuilderData');
    if (s) {
      const p = JSON.parse(s);
      // Data migration/patching from original logic
      if (typeof p.skills === 'string') p.skills = { technical: p.skills.split(',').filter(Boolean), soft: [], tools: [] };
      if (p.projects && p.projects.length > 0 && !p.projects[0].id) {
        p.projects = p.projects.map((proj) => ({
          id: Math.random().toString(36).substr(2, 9),
          title: proj.name || 'Untitled',
          description: proj.description || '',
          techStack: [],
          isCollapsed: true
        }));
      }
      return p;
    }
    return INITIAL_DATA;
  });

  const [template, setTemplate] = useState(() => (localStorage.getItem('resumeTemplate')) || 'Classic');
  const [color, setColor] = useState(() => localStorage.getItem('resumeColor') || COLORS[0].value);

  useEffect(() => localStorage.setItem('resumeBuilderData', JSON.stringify(data)), [data]);
  useEffect(() => localStorage.setItem('resumeTemplate', template), [template]);
  useEffect(() => localStorage.setItem('resumeColor', color), [color]);

  const value = {
    data, setData,
    template, setTemplate,
    color, setColor
  };

  return (
    <ResumeContext.Provider value={value}>
      <div className="resume-module-container">
        {children}
      </div>
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
};
