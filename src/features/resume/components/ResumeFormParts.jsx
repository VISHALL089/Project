import React, { useState } from 'react';
import { COLORS } from '../constants';

export const TagInput = ({ tags, onAdd, onRemove, placeholder }) => {
  const [input, setInput] = useState('');
  const handleKeyDown = (e) => {
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

export const TemplateThumb = ({ type, active, onClick }) => (
  <div className={`template-thumb ${active ? 'active' : ''}`} onClick={onClick}>
    <div className={`sketch-${type.toLowerCase()}`}>
      {type === 'Modern' ? (
        <div className="sketch-modern">
          <div className="sketch-modern-side"><div className="sketch-line" style={{ width: '80%' }} /><div className="sketch-line" style={{ width: '60%' }} /></div>
          <div className="sketch-modern-main"><div className="sketch-header" /><div className="sketch-line" /><div className="sketch-line" /></div>
        </div>
      ) : (
        <div className={`sketch-${type.toLowerCase()}`}>
          <div className="sketch-header" />
          <div className="sketch-line" />
          <div className="sketch-line" style={{ width: '80%' }} />
        </div>
      )}
    </div>
    <div style={{ fontSize: '10px', textAlign: 'center', marginTop: '8px', fontWeight: 700 }}>{type}</div>
  </div>
);

export const ColorPicker = ({ selected, onSelect }) => (
  <div className="color-circles">
    {COLORS.map(c => (
      <div
        key={c.value}
        className={`color-circle ${selected === c.value ? 'active' : ''}`}
        style={{ background: c.value }}
        onClick={() => onSelect(c.value)}
      />
    ))}
  </div>
);

export const ATSScoreCircle = ({ score }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let status = "Needs Work";
  let statusClass = "status-red";
  let strokeColor = "#ef4444";

  if (score > 70) { status = "Strong Resume"; statusClass = "status-green"; strokeColor = "#22c55e"; }
  else if (score > 40) { status = "Getting There"; statusClass = "status-amber"; strokeColor = "#f59e0b"; }

  return (
    <div className="score-circle-container glass-card">
      <div className="circular-progress">
        <svg>
          <circle className="bg" cx="60" cy="60" r={radius} />
          <circle
            className="fg"
            cx="60" cy="60" r={radius}
            style={{ strokeDasharray: circumference, strokeDashoffset: offset, stroke: strokeColor }}
          />
        </svg>
        <div className="score-text">
          <span className="score-value">{score}%</span>
          <span className="score-label">ATS Score</span>
        </div>
      </div>
      <div className={`score-status ${statusClass}`}>{status}</div>
    </div>
  );
};
