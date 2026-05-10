import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

const QUESTIONS_BANK = {
    "SQL": "Explain indexing and when it helps.",
    "React": "Explain state management options in React.",
    "DSA": "How would you optimize search in sorted data?",
    "Java": "Explain the difference between interface and abstract class.",
    "Python": "What are decorators and how do they work?",
    "Node.js": "Explain the event loop in Node.js.",
    "Docker": "What is the difference between an image and a container?",
    "AWS": "What is S3 and what is it used for?",
    "DBMS": "What is normalization and why is it important?",
    "OS": "What is virtual memory and how does it work?",
    "Networks": "Explain the OSI model layers.",
    "JavaScript": "What is hoisting and closure?",
    "TypeScript": "What are the advantages of using TypeScript over JavaScript?",
    "System Design": "How would you design a scalable notification system?",
    "REST": "What are the key principles of RESTful APIs?",
    "MongoDB": "When would you choose NoSQL over SQL?",
    "Linux": "Explain the file permission model in Linux.",
    "CI/CD": "What is the importance of a CI/CD pipeline?",
    "Testing": "What is the difference between unit and integration testing?"
};

const CATEGORY_MAP = {
    "Core CS": "coreCS",
    "Languages": "languages",
    "Web": "web",
    "Data": "data",
    "Cloud/DevOps": "cloud",
    "Testing": "testing"
};

export function analyzeJD(company, role, jdText) {
    const text = jdText.toLowerCase();
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };

    let totalSkillsFound = 0;
    let categoriesFound = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const foundInCat = skills.filter(skill =>
            text.includes(skill.toLowerCase())
        );
        if (foundInCat.length > 0) {
            const schemaKey = CATEGORY_MAP[category];
            extractedSkills[schemaKey] = foundInCat;
            totalSkillsFound += foundInCat.length;
            categoriesFound++;
        }
    });

    // Default behavior if no skills detected
    if (totalSkillsFound === 0) {
        extractedSkills.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    const skillList = Object.values(extractedSkills).flat();

    // baseScore computed only on analyze (immutable later)
    let baseScore = 35;
    baseScore += Math.min(categoriesFound * 5, 30);
    if (company?.trim()) baseScore += 10;
    if (role?.trim()) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    baseScore = Math.min(baseScore, 100);

    const checklist = [
        {
            roundTitle: "Round 1: Aptitude / Basics",
            items: ["Quantitative aptitude", "Logical reasoning", "English communication", "Core CS fundamentals", "Basic problem solving"]
        },
        {
            roundTitle: "Round 2: Technical Fundamentals",
            items: [
                "Data Structures basics",
                "Algorithm analysis",
                ...(extractedSkills.coreCS.length > 0 ? extractedSkills.coreCS.map(s => `${s} Advanced`) : ["Basic Coding", "Time Complexity"]),
                "Memory Management"
            ].slice(0, 8)
        },
        {
            roundTitle: "Round 3: Stack & Projects",
            items: [
                "Project walkthrough",
                "Deep dive into implementation",
                ...skillList.slice(0, 5).map(s => `${s} Use Cases`),
                "System architecture"
            ].slice(0, 8)
        },
        {
            roundTitle: "Round 4: Behavioral & Culture",
            items: ["STAR Method practice", "Teamwork examples", "Conflict resolution", "Salary markers", "Company values alignment"]
        }
    ];

    const plan7Days = [
        { day: "Day 1-2", focus: "Core Fundamentals", tasks: [`Review ${extractedSkills.coreCS.length > 0 ? extractedSkills.coreCS.join(", ") : "Basic CS concepts"}`] },
        { day: "Day 3-4", focus: "Problem Solving", tasks: ["Attempt 10 medium-level problems", "Practice explaining logic out loud"] },
        { day: "Day 5", focus: "Stack & Projects", tasks: [`Review ${skillList.slice(0, 3).join(", ")} projects`, "Refine project descriptions"] },
        { day: "Day 6", focus: "Mock Prep", tasks: [`Focus on ${role || "Generic"} interview patterns`, "Practice common HR questions"] },
        { day: "Day 7", focus: "Final Polish", tasks: ["Review notes", "Relax and prepare dress/setup"] }
    ];

    const questions = [];
    const skillKeys = Object.keys(QUESTIONS_BANK);

    skillList.forEach(skill => {
        const matchingKey = skillKeys.find(k => k.toLowerCase() === skill.toLowerCase());
        if (matchingKey && questions.length < 10) {
            questions.push(QUESTIONS_BANK[matchingKey]);
        }
    });

    // Fallbacks
    const fallbacks = ["Explain your most complex project.", "What is your preferred programming language and why?", "How do you handle deadlines?", "Explain a time you faced a technical challenge."];
    while (questions.length < 10 && fallbacks.length > 0) {
        questions.push(fallbacks.shift());
    }

    // Company Intel Heuristics (Enterprise vs Startup)
    const enterpriseNames = ["google", "amazon", "microsoft", "meta", "apple", "netflix", "infosys", "tcs", "wipro", "accenture", "cognizant", "ibm", "oracle", "sap", "adobe", "salesforce"];
    const isEnterprise = company && enterpriseNames.some(n => company.toLowerCase().includes(n));

    const roundMapping = isEnterprise ? [
        {
            roundTitle: "OA / Online Assessment",
            focusAreas: ["DSA", "Aptitude"],
            whyItMatters: "High-volume filter for core logical competency."
        },
        {
            roundTitle: "Technical Interview I",
            focusAreas: ["Deep DSA", "Optimization"],
            whyItMatters: "Validates your ability to write clean, optimized code."
        },
        {
            roundTitle: "System Design",
            focusAreas: ["Scalability", "Architecture"],
            whyItMatters: "Assesses how you think about larger components and data flow."
        }
    ] : [
        {
            roundTitle: "Machine Coding",
            focusAreas: ["Building Features", "Live Coding"],
            whyItMatters: "Ensures you are 'plug-and-play' for the team's needs."
        },
        {
            roundTitle: "Technical Discussion",
            focusAreas: ["Project Depth", "Stack Expertise"],
            whyItMatters: "Startups value deep ownership of your previous work."
        }
    ];

    const result = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        questions,
        baseScore,
        finalScore: baseScore,
        skillConfidenceMap: {},
        companyIntel: {
            industry: isEnterprise ? "Technology / Enterprise" : "Tech Startup",
            size: isEnterprise ? "Enterprise (2000+)" : "Startup (<200)",
            hiringFocus: isEnterprise
                ? "Structured DSA + Computer Science Fundamentals"
                : "Practical Problem Solving + Direct Stack Depth"
        }
    };

    return result;
}

export function updateAnalysis(updated) {
    const history = getHistory();
    const index = history.findIndex(a => a.id === updated.id);
    if (index !== -1) {
        history[index] = {
            ...updated,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('analysis_history', JSON.stringify(history));
    }
}

export function saveToHistory(analysis) {
    const history = getHistory();
    history.unshift(analysis);
    localStorage.setItem('analysis_history', JSON.stringify(history));
}

export function getHistory() {
    try {
        const raw = localStorage.getItem('analysis_history');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error("Not an array");

        const filtered = parsed.filter(entry => {
            return entry && entry.id && entry.jdText && entry.extractedSkills;
        });

        if (filtered.length < parsed.length) {
            sessionStorage.setItem('history_corrupted', 'true');
        }

        return filtered;
    } catch (e) {
        console.error("Failed to load history:", e);
        return [];
    }
}

export function getAnalysisById(id) {
    const history = getHistory();
    return history.find(a => a.id === id);
}
