export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    mode: 'Remote' | 'Hybrid' | 'Onsite';
    experience: 'Fresher' | '0-1' | '1-3' | '3-5';
    skills: string[];
    source: 'LinkedIn' | 'Naukri' | 'Indeed';
    postedDaysAgo: number;
    salaryRange: string;
    applyUrl: string;
    description: string;
}

export const JOBS: Job[] = [
    {
        id: 'j-001', title: 'SDE Intern', company: 'Amazon', location: 'Bengaluru', mode: 'Hybrid', experience: 'Fresher',
        skills: ['Java', 'Algorithms', 'AWS'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '₹40k–₹80k/month Internship',
        applyUrl: 'https://amazon.jobs', description: 'Join our core AWS team to build scalable cloud infrastructure. You will work on real-world projects alongside experienced engineers. Strong problem-solving skills required.'
    },
    {
        id: 'j-002', title: 'Frontend Intern', company: 'Razorpay', location: 'Bengaluru', mode: 'Remote', experience: 'Fresher',
        skills: ['React', 'JavaScript', 'Tailwind'], source: 'LinkedIn', postedDaysAgo: 1, salaryRange: '₹35k–₹50k/month Internship',
        applyUrl: 'https://razorpay.com/jobs', description: 'Help us build the next generation payment gateway dashboard. Ideal for candidates with personal React projects and a keen eye for clean UX.'
    },
    {
        id: 'j-003', title: 'Junior Backend Developer', company: 'CRED', location: 'Bengaluru', mode: 'Onsite', experience: '0-1',
        skills: ['Java', 'Spring Boot', 'Microservices'], source: 'Naukri', postedDaysAgo: 4, salaryRange: '14–18 LPA',
        applyUrl: 'https://cred.club/careers', description: 'Scale backend systems that power rewards for millions of high-trust users. Need basic understanding of distributed systems and caching mechanisms.'
    },
    {
        id: 'j-004', title: 'Graduate Engineer Trainee', company: 'TCS', location: 'Pune', mode: 'Onsite', experience: 'Fresher',
        skills: ['C++', 'SQL', 'Python'], source: 'Naukri', postedDaysAgo: 5, salaryRange: '3–5 LPA',
        applyUrl: 'https://tcs.com/careers', description: 'Entry-level role in Digital transformation projects. Selected candidates will undergo a 3-month intense bootcamp before client deployment.'
    },
    {
        id: 'j-005', title: 'React Developer', company: 'Swiggy', location: 'Hyderabad', mode: 'Hybrid', experience: '1-3',
        skills: ['React', 'Redux', 'TypeScript'], source: 'Indeed', postedDaysAgo: 0, salaryRange: '12–16 LPA',
        applyUrl: 'https://careers.swiggy.com', description: 'Own merchant-facing dashboards. Work closely with product dynamically mapping restaurant layouts. Fast-paced, high ownership environment.'
    },
    {
        id: 'j-006', title: 'Python Developer', company: 'Freshworks', location: 'Chennai', mode: 'Remote', experience: '0-1',
        skills: ['Python', 'Django', 'PostgreSQL'], source: 'LinkedIn', postedDaysAgo: 3, salaryRange: '8–12 LPA',
        applyUrl: 'https://freshworks.com/company/careers/', description: 'Build and maintain critical integrations on the Freshdesk platform. Solid understanding of REST APIs and relational databases needed.'
    },
    {
        id: 'j-007', title: 'QA Intern', company: 'PhonePe', location: 'Bengaluru', mode: 'Onsite', experience: 'Fresher',
        skills: ['Manual Testing', 'Selenium', 'Java'], source: 'Naukri', postedDaysAgo: 6, salaryRange: '₹25k–₹30k/month Internship',
        applyUrl: 'https://phonepe.com/careers', description: 'Ensure zero-defect releases for millions of daily transactions. Exposure to both manual and automated testing cycles.'
    },
    {
        id: 'j-008', title: 'Data Analyst Intern', company: 'Flipkart', location: 'Bengaluru', mode: 'Hybrid', experience: 'Fresher',
        skills: ['SQL', 'Excel', 'Python'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '₹30k–₹45k/month Internship',
        applyUrl: 'https://flipkartcareers.com', description: 'Analyze supply chain metrics to optimize delivery times. Must be highly numbers-driven and comfortable with large datasets.'
    },
    {
        id: 'j-009', title: 'Java Developer', company: 'Infosys', location: 'Mysuru', mode: 'Onsite', experience: '0-1',
        skills: ['Java', 'Spring', 'MySQL'], source: 'Naukri', postedDaysAgo: 1, salaryRange: '4–6 LPA',
        applyUrl: 'https://infosys.com/careers', description: 'Join as a Systems Engineer working on enterprise banking clients. Opportunity to travel onsite after 18 months.'
    },
    {
        id: 'j-010', title: 'SDE 1', company: 'Paytm', location: 'Noida', mode: 'Hybrid', experience: '1-3',
        skills: ['Node.js', 'MongoDB', 'AWS'], source: 'Indeed', postedDaysAgo: 4, salaryRange: '10–15 LPA',
        applyUrl: 'https://paytm.com/careers', description: 'Build high-throughput microservices for the core payments team. Deep understanding of asynchronous programming is required.'
    },
    {
        id: 'j-011', title: 'Frontend Developer', company: 'Zoho', location: 'Chennai', mode: 'Onsite', experience: '1-3',
        skills: ['Ember.js', 'JavaScript', 'HTML/CSS'], source: 'LinkedIn', postedDaysAgo: 7, salaryRange: '8–14 LPA',
        applyUrl: 'https://zoho.com/careers', description: 'Contribute to Zoho CRM UI. We build everything from scratch. Deep Javascript fundamentals are more valued than framework knowledge.'
    },
    {
        id: 'j-012', title: 'Backend Intern', company: 'Juspay', location: 'Bengaluru', mode: 'Remote', experience: 'Fresher',
        skills: ['Haskell', 'Functional Programming', 'PostgreSQL'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '₹40k–₹50k/month Internship',
        applyUrl: 'https://juspay.in/careers', description: 'Learn and write robust functional code in Haskell. We handle millions of payment transactions with mathematically proven reliability.'
    },
    {
        id: 'j-013', title: 'Associate Software Engineer', company: 'Accenture', location: 'Gurugram', mode: 'Hybrid', experience: '0-1',
        skills: ['Java', 'Angular', 'Oracle DB'], source: 'Naukri', postedDaysAgo: 8, salaryRange: '4.5–7 LPA',
        applyUrl: 'https://accenture.com/careers', description: 'Develop scalable modules for Fortune 500 retail clients. Requires excellent communication and basic CS fundamentals.'
    },
    {
        id: 'j-014', title: 'SDE Intern', company: 'Cognizant', location: 'Pune', mode: 'Hybrid', experience: 'Fresher',
        skills: ['.NET', 'C#', 'SQL Server'], source: 'Indeed', postedDaysAgo: 1, salaryRange: '₹20k–₹30k/month Internship',
        applyUrl: 'https://cognizant.com/careers', description: 'Six-month internship leading to PPO. Will work alongside architects on legacy modernization projects.'
    },
    {
        id: 'j-015', title: 'React Developer', company: 'Wipro', location: 'Hyderabad', mode: 'Remote', experience: '1-3',
        skills: ['React', 'Redux', 'Jest'], source: 'Naukri', postedDaysAgo: 3, salaryRange: '6–9 LPA',
        applyUrl: 'https://wipro.com/careers', description: 'Build responsive web apps for global healthcare clients. Strong emphasis on test-driven development and accessibility.'
    },
    {
        id: 'j-016', title: 'Software Engineer', company: 'Capgemini', location: 'Mumbai', mode: 'Hybrid', experience: '0-1',
        skills: ['Python', 'AWS', 'Docker'], source: 'LinkedIn', postedDaysAgo: 4, salaryRange: '5–8 LPA',
        applyUrl: 'https://capgemini.com/careers', description: 'Cloud migration and scripting role. Good knowledge of Linux and basic containerization is expected.'
    },
    {
        id: 'j-017', title: 'Frontend Intern', company: 'Postman', location: 'Bengaluru', mode: 'Remote', experience: 'Fresher',
        skills: ['React', 'TypeScript', 'Figma'], source: 'LinkedIn', postedDaysAgo: 0, salaryRange: '₹40k–₹60k/month Internship',
        applyUrl: 'https://postman.com/careers', description: 'Help improve the core Postman web client. Great UI/UX sensibilities and strong engineering fundamentals required.'
    },
    {
        id: 'j-018', title: 'Data Analyst', company: 'IBM', location: 'Bengaluru', mode: 'Onsite', experience: '1-3',
        skills: ['Python', 'SQL', 'Tableau'], source: 'Indeed', postedDaysAgo: 5, salaryRange: '8–12 LPA',
        applyUrl: 'https://ibm.com/employment', description: 'Work on predictive analytics models for supply chain optimization. Present insights directly to global stakeholders.'
    },
    {
        id: 'j-019', title: 'Java Developer', company: 'Oracle', location: 'Hyderabad', mode: 'Hybrid', experience: '3-5',
        skills: ['Java 11', 'Microservices', 'Oracle DB'], source: 'LinkedIn', postedDaysAgo: 9, salaryRange: '18–25 LPA',
        applyUrl: 'https://oracle.com/careers', description: 'Core development for Oracle Cloud ERP. Requires deep expertise in JVM tuning and complex distributed transactions.'
    },
    {
        id: 'j-020', title: 'SDE 2', company: 'SAP', location: 'Bengaluru', mode: 'Hybrid', experience: '3-5',
        skills: ['ABAP', 'HANA', 'JavaScript'], source: 'Naukri', postedDaysAgo: 2, salaryRange: '20–30 LPA',
        applyUrl: 'https://jobs.sap.com', description: 'Develop extensions for SAP S/4HANA. Full-stack role requiring knowledge of SAP BTP and Fiori.'
    },
    {
        id: 'j-021', title: 'Junior Data Scientist', company: 'Dell', location: 'Bengaluru', mode: 'Remote', experience: '0-1',
        skills: ['Python', 'Scikit-Learn', 'R'], source: 'LinkedIn', postedDaysAgo: 3, salaryRange: '10–14 LPA',
        applyUrl: 'https://jobs.dell.com', description: 'Price optimization and forecasting models. Strong background in statistics and machine learning required.'
    },
    {
        id: 'j-022', title: 'Backend Developer', company: 'Zomato', location: 'Gurugram', mode: 'Onsite', experience: '1-3',
        skills: ['Go', 'Redis', 'Kafka'], source: 'LinkedIn', postedDaysAgo: 1, salaryRange: '15–20 LPA',
        applyUrl: 'https://zomato.com/careers', description: 'Handle order routing and real-time fleet tracking. Low latency and high availability are critical.'
    },
    {
        id: 'j-023', title: 'Platform Engineer', company: 'Zerodha', location: 'Bengaluru', mode: 'Onsite', experience: '3-5',
        skills: ['Go', 'PostgreSQL', 'AWS'], source: 'LinkedIn', postedDaysAgo: 0, salaryRange: '25–40 LPA',
        applyUrl: 'https://zerodha.com/careers', description: 'Build systems that handle billions of requests per day. We favor simple, boring infrastructure that never breaks.'
    },
    {
        id: 'j-024', title: 'Frontend UI Developer', company: 'Pine Labs', location: 'Noida', mode: 'Hybrid', experience: '1-3',
        skills: ['Vue.js', 'Vuex', 'SCSS'], source: 'Naukri', postedDaysAgo: 6, salaryRange: '10–14 LPA',
        applyUrl: 'https://pinelabs.com', description: 'Create dashboard interfaces for merchants to track POS transactions. Mobile-first design experience needed.'
    },
    {
        id: 'j-025', title: 'SDE Intern', company: 'Groww', location: 'Bengaluru', mode: 'Remote', experience: 'Fresher',
        skills: ['Java', 'Spring Boot', 'React'], source: 'Indeed', postedDaysAgo: 4, salaryRange: '₹30k–₹40k/month Internship',
        applyUrl: 'https://groww.in/careers', description: 'Full-stack internship with the mutual funds team. Will launch a live feature within 3 months.'
    },
    {
        id: 'j-026', title: 'Android Developer', company: 'Udaan', location: 'Bengaluru', mode: 'Hybrid', experience: '1-3',
        skills: ['Kotlin', 'Coroutines', 'MVVM'], source: 'LinkedIn', postedDaysAgo: 7, salaryRange: '14–22 LPA',
        applyUrl: 'https://udaan.com/careers', description: 'Build and optimize the B2B commerce app. Focus on offline-first architecture and performance on low-end devices.'
    },
    {
        id: 'j-027', title: 'iOS Developer', company: 'ShareChat', location: 'Bengaluru', mode: 'Remote', experience: '3-5',
        skills: ['Swift', 'Combine', 'CoreData'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '22–35 LPA',
        applyUrl: 'https://sharechat.com/careers', description: 'Revamp the media creation workflow. Looking for experts in AVFoundation and smooth UI animations.'
    },
    {
        id: 'j-028', title: 'QA Engineer', company: 'Meesho', location: 'Bengaluru', mode: 'Hybrid', experience: '1-3',
        skills: ['Appium', 'Selenium', 'Python'], source: 'Naukri', postedDaysAgo: 1, salaryRange: '8–14 LPA',
        applyUrl: 'https://meesho.io/jobs', description: 'Automate release pipelines for both Android and iOS platforms. Write reliable, fast UI tests.'
    },
    {
        id: 'j-029', title: 'SDE 1 (Platform)', company: 'Ola', location: 'Bengaluru', mode: 'Onsite', experience: '0-1',
        skills: ['Java', 'Microservices', 'MySQL'], source: 'LinkedIn', postedDaysAgo: 5, salaryRange: '12–16 LPA',
        applyUrl: 'https://ola.in/careers', description: 'Work in the maps and routing team to optimize ETA algorithms. Strong algorithmic background required.'
    },
    {
        id: 'j-030', title: 'SDE Intern', company: 'BrowserStack', location: 'Mumbai', mode: 'Hybrid', experience: 'Fresher',
        skills: ['Ruby on Rails', 'JavaScript', 'AWS'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '₹40k–₹60k/month Internship',
        applyUrl: 'https://browserstack.com/careers', description: 'Help build scalable infrastructure that powers testing for millions of developers globally.'
    },
    {
        id: 'j-031', title: 'Node.js Developer', company: 'TCS', location: 'Chennai', mode: 'Hybrid', experience: '1-3',
        skills: ['Node.js', 'Express', 'MongoDB'], source: 'Naukri', postedDaysAgo: 1, salaryRange: '5-8 LPA',
        applyUrl: 'https://tcs.com/careers', description: 'Develop and maintain backend APIs for an international retail client.'
    },
    {
        id: 'j-032', title: 'React Intern', company: 'Razorpay', location: 'Remote', mode: 'Remote', experience: 'Fresher',
        skills: ['React', 'CSS', 'HTML'], source: 'Indeed', postedDaysAgo: 0, salaryRange: '₹20k–₹30k/month Internship',
        applyUrl: 'https://razorpay.com/jobs', description: 'Assist in migrating legacy merchant tools to modern React applications.'
    },
    {
        id: 'j-033', title: 'Software Engineer', company: 'Google India', location: 'Hyderabad', mode: 'Hybrid', experience: '0-1',
        skills: ['C++', 'Go', 'Distributed Systems'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '18-24 LPA',
        applyUrl: 'https://careers.google.com', description: 'Join the Google Cloud infrastructure team building scalable storage solutions.'
    },
    {
        id: 'j-034', title: 'DevOps Intern', company: 'Swiggy', location: 'Bengaluru', mode: 'Onsite', experience: 'Fresher',
        skills: ['Linux', 'Docker', 'Bash'], source: 'LinkedIn', postedDaysAgo: 3, salaryRange: '₹25k–₹40k/month Internship',
        applyUrl: 'https://careers.swiggy.com', description: 'Learn CI/CD pipelines and infrastructure as code by assisting our core platform team.'
    },
    {
        id: 'j-035', title: 'Full Stack Developer', company: 'Infosys', location: 'Pune', mode: 'Remote', experience: '3-5',
        skills: ['Java', 'React', 'Oracle'], source: 'Naukri', postedDaysAgo: 4, salaryRange: '8-12 LPA',
        applyUrl: 'https://infosys.com/careers', description: 'Lead module development for an upcoming fin-tech portal. Direct client interaction involved.'
    },
    {
        id: 'j-036', title: 'Big Data Engineer', company: 'Wipro', location: 'Bengaluru', mode: 'Hybrid', experience: '3-5',
        skills: ['Hadoop', 'Spark', 'Python'], source: 'Indeed', postedDaysAgo: 5, salaryRange: '12-18 LPA',
        applyUrl: 'https://wipro.com/careers', description: 'Design complex data pipelines and data warehouse solutions for healthcare clients.'
    },
    {
        id: 'j-037', title: 'Security Analyst', company: 'Paytm', location: 'Noida', mode: 'Onsite', experience: '1-3',
        skills: ['Penetration Testing', 'Network Security', 'OWASP'], source: 'LinkedIn', postedDaysAgo: 1, salaryRange: '10-15 LPA',
        applyUrl: 'https://paytm.com/careers', description: 'Ensure the highest level of security for all payment gateways and internal systems.'
    },
    {
        id: 'j-038', title: 'Machine Learning Engineer', company: 'Flipkart', location: 'Bengaluru', mode: 'Hybrid', experience: '3-5',
        skills: ['Python', 'TensorFlow', 'PyTorch'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '20-30 LPA',
        applyUrl: 'https://flipkartcareers.com', description: 'Improve product recommendation engines and implement NLP based search enhancements.'
    },
    {
        id: 'j-039', title: 'System Administrator', company: 'IBM', location: 'Chennai', mode: 'Onsite', experience: '1-3',
        skills: ['Linux', 'Shell Scripting', 'VMware'], source: 'Naukri', postedDaysAgo: 6, salaryRange: '5-7 LPA',
        applyUrl: 'https://ibm.com/employment', description: 'Manage and monitor critical server infrastructure to ensure 99.99% uptime.'
    },
    {
        id: 'j-040', title: 'Graduate Engineer Trainee', company: 'Capgemini', location: 'Gurugram', mode: 'Remote', experience: 'Fresher',
        skills: ['C', 'C++', 'Java'], source: 'Indeed', postedDaysAgo: 7, salaryRange: '3-4.5 LPA',
        applyUrl: 'https://capgemini.com/careers', description: 'Undergo rigorous training on cutting-edge technologies before project deployment.'
    },
    {
        id: 'j-041', title: 'Cloud Architect', company: 'Oracle', location: 'Hyderabad', mode: 'Hybrid', experience: '3-5',
        skills: ['OCI', 'AWS', 'System Design'], source: 'LinkedIn', postedDaysAgo: 8, salaryRange: '25-35 LPA',
        applyUrl: 'https://oracle.com/careers', description: 'Design multi-tenant cloud solutions for enterprise migrations to Oracle Cloud Infrastructure.'
    },
    {
        id: 'j-042', title: 'SDE 2', company: 'Amazon', location: 'Bengaluru', mode: 'Hybrid', experience: '3-5',
        skills: ['Java', 'DynamoDB', 'System Design'], source: 'LinkedIn', postedDaysAgo: 1, salaryRange: '30-45 LPA',
        applyUrl: 'https://amazon.jobs', description: 'Drive architectural decisions for high-scale order fulfillment systems.'
    },
    {
        id: 'j-043', title: 'Game Developer', company: 'Zoho', location: 'Chennai', mode: 'Onsite', experience: '0-1',
        skills: ['C++', 'Unreal Engine', 'Math'], source: 'Naukri', postedDaysAgo: 2, salaryRange: '6-9 LPA',
        applyUrl: 'https://zoho.com/careers', description: 'Work on our experimental interactive projects. Strong math and physics background preferred.'
    },
    {
        id: 'j-044', title: 'Technical Writer', company: 'Postman', location: 'Remote', mode: 'Remote', experience: '1-3',
        skills: ['Markdown', 'API Testing', 'English'], source: 'Indeed', postedDaysAgo: 4, salaryRange: '8-12 LPA',
        applyUrl: 'https://postman.com/careers', description: 'Create clear, comprehensive documentation for developers using the Postman API platform.'
    },
    {
        id: 'j-045', title: 'Blockchain Intern', company: 'CoinDCX', location: 'Mumbai', mode: 'Hybrid', experience: 'Fresher',
        skills: ['Solidity', 'Web3.js', 'Cryptography'], source: 'LinkedIn', postedDaysAgo: 0, salaryRange: '₹30k–₹40k/month Internship',
        applyUrl: 'https://coindcx.com/careers', description: 'Research and prototype smart contracts for decentralized exchange protocols.'
    },
    {
        id: 'j-046', title: 'DevOps Engineer', company: 'Cred', location: 'Bengaluru', mode: 'Onsite', experience: '1-3',
        skills: ['Kubernetes', 'Terraform', 'AWS'], source: 'LinkedIn', postedDaysAgo: 5, salaryRange: '18-25 LPA',
        applyUrl: 'https://cred.club/careers', description: 'Maintain and scale Kubernetes clusters. Build robust CI/CD pipelines for rapid deployment.'
    },
    {
        id: 'j-047', title: 'Product Manager Intern', company: 'PhonePe', location: 'Bengaluru', mode: 'Onsite', experience: 'Fresher',
        skills: ['Data Analysis', 'Wireframing', 'Agile'], source: 'Naukri', postedDaysAgo: 1, salaryRange: '₹40k–₹50k/month Internship',
        applyUrl: 'https://phonepe.com/careers', description: 'Work with engineering and design to define the roadmap for merchant products.'
    },
    {
        id: 'j-048', title: 'UI/UX Designer', company: 'Freshworks', location: 'Chennai', mode: 'Hybrid', experience: '1-3',
        skills: ['Figma', 'Prototyping', 'User Research'], source: 'LinkedIn', postedDaysAgo: 3, salaryRange: '10-14 LPA',
        applyUrl: 'https://freshworks.com/company/careers/', description: 'Design intuitive interfaces for B2B SaaS products. Empathy for the end user is critical.'
    },
    {
        id: 'j-049', title: 'Data Engineer', company: 'Cognizant', location: 'Pune', mode: 'Remote', experience: '3-5',
        skills: ['Snowflake', 'Python', 'ETL'], source: 'Indeed', postedDaysAgo: 6, salaryRange: '14-20 LPA',
        applyUrl: 'https://cognizant.com/careers', description: 'Build resilient ETL pipelines for financial analytics.'
    },
    {
        id: 'j-050', title: 'Site Reliability Engineer', company: 'Juspay', location: 'Bengaluru', mode: 'Hybrid', experience: '1-3',
        skills: ['Linux', 'Monitoring', 'Incident Response'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '15-22 LPA',
        applyUrl: 'https://juspay.in/careers', description: 'Ensure the payments infrastructure remains highly available under extreme loads.'
    },
    {
        id: 'j-051', title: 'Ruby Developer', company: 'BrowserStack', location: 'Mumbai', mode: 'Remote', experience: '1-3',
        skills: ['Ruby', 'Rails', 'Redis'], source: 'Naukri', postedDaysAgo: 3, salaryRange: '12-18 LPA',
        applyUrl: 'https://browserstack.com/careers', description: 'Scale the primary API gateway handling tests from myriad devices concurrently.'
    },
    {
        id: 'j-052', title: 'QA Automation Lead', company: 'Freshworks', location: 'Chennai', mode: 'Hybrid', experience: '3-5',
        skills: ['Cypress', 'JavaScript', 'CI/CD'], source: 'LinkedIn', postedDaysAgo: 4, salaryRange: '18-24 LPA',
        applyUrl: 'https://freshworks.com', description: 'Lead the testing framework transition to Cypress. Mentor junior QA engineers.'
    },
    {
        id: 'j-053', title: 'Cloud Support Engineer', company: 'Amazon', location: 'Hyderabad', mode: 'Onsite', experience: '0-1',
        skills: ['Linux', 'Networking', 'AWS'], source: 'Indeed', postedDaysAgo: 2, salaryRange: '7-10 LPA',
        applyUrl: 'https://amazon.jobs', description: 'Be the first point of contact for enterprise clients navigating complex AWS outages.'
    },
    {
        id: 'j-054', title: 'Salesforce Developer', company: 'Accenture', location: 'Noida', mode: 'Remote', experience: '1-3',
        skills: ['Apex', 'Lightning', 'Salesforce'], source: 'Naukri', postedDaysAgo: 5, salaryRange: '8-12 LPA',
        applyUrl: 'https://accenture.com', description: 'Customize Salesforce deployments for European automotive clients.'
    },
    {
        id: 'j-055', title: 'Angular Developer', company: 'TCS', location: 'Bengaluru', mode: 'Onsite', experience: '3-5',
        skills: ['Angular 14', 'RxJS', 'TypeScript'], source: 'LinkedIn', postedDaysAgo: 7, salaryRange: '10-15 LPA',
        applyUrl: 'https://tcs.com', description: 'Modernize legacy banking portals into single page applications.'
    },
    {
        id: 'j-056', title: 'Performance Engineer', company: 'Flipkart', location: 'Bengaluru', mode: 'Hybrid', experience: '3-5',
        skills: ['JMeter', 'Gatling', 'Java'], source: 'LinkedIn', postedDaysAgo: 1, salaryRange: '16-22 LPA',
        applyUrl: 'https://flipkartcareers.com', description: 'Ensure the platform handles Big Billion Days traffic with zero degradation.'
    },
    {
        id: 'j-057', title: 'Embedded Software Engineer', company: 'Dell', location: 'Bengaluru', mode: 'Hybrid', experience: '1-3',
        skills: ['C', 'RTOS', 'Microcontrollers'], source: 'Naukri', postedDaysAgo: 8, salaryRange: '10-14 LPA',
        applyUrl: 'https://jobs.dell.com', description: 'Write low-level firmware for upcoming enterprise server storage controllers.'
    },
    {
        id: 'j-058', title: 'Cyber Security Intern', company: 'Wipro', location: 'Pune', mode: 'Remote', experience: 'Fresher',
        skills: ['Ethical Hacking', 'Networking', 'Python'], source: 'Indeed', postedDaysAgo: 0, salaryRange: '₹20k–₹30k/month Internship',
        applyUrl: 'https://wipro.com/careers', description: 'Assist the SOC team in monitoring alerts and performing basic vulnerability assessments.'
    },
    {
        id: 'j-059', title: 'Data Scientist', company: 'Paytm', location: 'Noida', mode: 'Hybrid', experience: '1-3',
        skills: ['Python', 'SQL', 'Machine Learning'], source: 'LinkedIn', postedDaysAgo: 2, salaryRange: '15-22 LPA',
        applyUrl: 'https://paytm.com/careers', description: 'Build fraud detection models reducing false positives in real-time transactions.'
    },
    {
        id: 'j-060', title: 'Full Stack Engineer', company: 'Zerodha', location: 'Bengaluru', mode: 'Onsite', experience: '1-3',
        skills: ['Vue.js', 'Go', 'Redis'], source: 'LinkedIn', postedDaysAgo: 1, salaryRange: '20-30 LPA',
        applyUrl: 'https://zerodha.com', description: 'Work on Kite web platform adding new order types and optimizing websocket connections.'
    }
];
