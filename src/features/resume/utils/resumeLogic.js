import { ACTION_VERBS } from '../constants';

export const SCORING_RULES = [
  { id: 'name', label: 'Add your full name', points: 10, check: (d) => !!d.personalInfo.name.trim() },
  { id: 'email', label: 'Add your email address', points: 10, check: (d) => !!d.personalInfo.email.trim() },
  { id: 'summary_len', label: 'Write a summary (>50 chars)', points: 10, check: (d) => d.summary.length > 50 },
  { id: 'exp', label: 'Add at least 1 experience with bullets', points: 15, check: (d) => d.experience.some(e => e.description.trim().length > 0) },
  { id: 'edu', label: 'Add at least 1 education entry', points: 10, check: (d) => d.education.some(e => e.school.trim().length > 0) },
  { id: 'skills', label: 'Add at least 5 skills', points: 10, check: (d) => ([...d.skills.technical, ...d.skills.soft, ...d.skills.tools].length >= 5) },
  { id: 'proj', label: 'Add at least 1 project', points: 10, check: (d) => d.projects.some(p => p.title.trim().length > 0) },
  { id: 'phone', label: 'Add your phone number', points: 5, check: (d) => !!d.personalInfo.phone.trim() },
  { id: 'li', label: 'Add LinkedIn profile', points: 5, check: (d) => !!d.links.linkedin.trim() },
  { id: 'gh', label: 'Add GitHub profile', points: 5, check: (d) => !!d.links.github.trim() },
  { id: 'verbs', label: 'Use action verbs in summary', points: 10, check: (d) => ACTION_VERBS.some(v => d.summary.toLowerCase().includes(v.toLowerCase())) },
];

export const calculateATSScore = (data) => {
  return SCORING_RULES.reduce((acc, rule) => rule.check(data) ? acc + rule.points : acc, 0);
};

export const getImprovementSuggestions = (data) => {
  return SCORING_RULES.filter(rule => !rule.check(data));
};

export const checkBulletGuidance = (text) => {
  const suggestions = [];
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

export const isValidUrl = (url) => {
  try { return new URL(url).protocol.startsWith('http'); } catch { return false; }
};
