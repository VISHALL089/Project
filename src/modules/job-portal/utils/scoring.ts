import { Job } from '../data/jobs'

export interface Preferences {
    roleKeywords: string;
    preferredLocations: string[];
    preferredMode: string[];
    experienceLevel: string;
    skills: string;
    minMatchScore: number;
}

export function calculateMatchScore(job: Job, prefs: Preferences | null): number {
    if (!prefs) return 0;

    let score = 0;

    const roleKeywordsList = prefs.roleKeywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k);
    const userSkillsList = prefs.skills.split(',').map(s => s.trim().toLowerCase()).filter(s => s);

    const titleLower = job.title.toLowerCase();
    const descLower = job.description.toLowerCase();

    // +25 if any roleKeyword appears in job.title (case-insensitive)
    if (roleKeywordsList.some(k => titleLower.includes(k))) score += 25;

    // +15 if any roleKeyword appears in job.description
    if (roleKeywordsList.some(k => descLower.includes(k))) score += 15;

    // +15 if job.location matches preferredLocations
    if (prefs.preferredLocations.some(l => job.location.toLowerCase().includes(l.toLowerCase()))) score += 15;

    // +10 if job.mode matches preferredMode
    if (prefs.preferredMode.includes(job.mode)) score += 10;

    // +10 if job.experience matches experienceLevel
    if (prefs.experienceLevel && job.experience === prefs.experienceLevel) score += 10;

    // +15 if overlap between job.skills and user.skills (any match)
    const jobSkillsLower = job.skills.map(s => s.toLowerCase());
    if (userSkillsList.some(s => jobSkillsLower.some(js => js.includes(s) || s.includes(js)))) score += 15;

    // +5 if postedDaysAgo <= 2
    if (job.postedDaysAgo <= 2) score += 5;

    // +5 if source is LinkedIn
    if (job.source === 'LinkedIn') score += 5;

    return Math.min(score, 100);
}

export function extractSalaryNum(salaryRange: string): number {
    const str = salaryRange.toLowerCase();
    if (str.includes('lpa')) {
        const match = str.match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
    }
    if (str.includes('/month') || str.includes('month')) {
        const match = str.match(/(\d+)/);
        if (match) {
            let val = parseInt(match[1]);
            if (str.includes('k')) val *= 1000;
            return (val * 12) / 100000; // returns equivalent LPA
        }
    }
    return 0;
}
