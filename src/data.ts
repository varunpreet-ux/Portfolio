import { Project, Milestone, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: "Varunpreet Singh",
  role: "Business-Centered Product Designer",
  headline: "BUSINESS-CENTERED PRODUCT DESIGNER",
  tagline: "Designing Products at the Intersection of Users, Business and AI.",
  age: 24,
  experienceMonths: 15,
  email: "preetvarun.too@gmail.com",
  linkedin: "https://www.linkedin.com/in/varunpreet-singh",
  // Copy and paste your Google Drive Shareable Link here to connect your PDF
  resumeUrl: "https://drive.google.com/file/d/1oYbPxEks61mPj_E_gJBWFiKjO7Rh2X_L/preview",
  location: "San Francisco, CA (Open to Remote)",
  bio: "A highly strategic 24-year-old Product Designer. I began my career as a UX Design Intern and was rapidly promoted to UX Designer due to my ability to align complex user behaviors with direct business growth metrics. I specialize in product thinking, business strategy, user research, interaction design, visual hierarchy, and leveraging advanced AI-assisted design systems to accelerate delivery times.",
  aboutDetailed: {
    philosophy: "Design isn't painting. It's a structured mechanism of sorting chaos. A product succeedes only when user friction, business growth patterns, and technological scale find perfect unison. By treating layout as architecture and user action as friction, I engineer interfaces that look beautiful and perform measurably.",
    careerJourney: [
      {
        period: "Internship to Promotion Story",
        text: "I joined the design team as a UX Design Intern. Rather than just making screens, I took absolute ownership of audit tasks and shadowed target customers. When a critical workflow rewrite for our healthcare division stalled, I mapped out the clinical frictions, quantified the business risk of user error, and designed an elegant, high-performance solution that reduced errors. My promotion from Intern to UX Designer in 9 months was direct recognition of my business-driven product thinking and proactive design engineering."
      },
      {
        period: "The Intersection of Business & AI",
        text: "Today's designers cannot work in isolation. I actively leverage state-of-the-art AI-assisted workflows—using large language models to automate typography scaling, predict user error vectors, and script initial interface prototypes. My design engineering mindset lets me speak fluidly with developers, ensuring that precise visual design remains pixel-perfect upon deployment without bloated engineering sprint sizes."
      }
    ]
  }
};

export const MILESTONES: Milestone[] = [
  {
    year: "2025 - Present",
    role: "UX Designer",
    company: "Aether Intelligent Systems",
    description: "Promoted to full-time UX Designer. Lead designer for SaaS workflows and internal design systems. Championed business-impact layouts, increasing user task completion by 34%."
  },
  {
    year: "2024 - 2025",
    role: "UX Design Intern",
    company: "Aether Intelligent Systems",
    description: "Conducted exhaustive user research and visual audits. Redesigned medical chart coordinators' mobile tracking workflow, cutting average documentation time by 42%."
  },
  {
    year: "2023 - 2024",
    role: "Associate Product Analyst",
    company: "Stratum Ventures",
    description: "Analyzed product telemetry and user funnel drop-offs for 12 early-stage startups. Identified critical navigation friction points, improving conversion rate benchmarks by 18%."
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Product & Strategy",
    items: ["Product Thinking", "Business Strategy Alignment", "Friction Audit", "Conversion Rate Optimization (CRO)", "Value Proposition Design"]
  },
  {
    category: "Design Craft",
    items: ["High-Fidelity UI Design", "Interaction Engineering", "Information Architecture", "Typography Systems", "Responsive Grid Layouts"]
  },
  {
    category: "Research & Data",
    items: ["Contextual Inquiry", "User Shadowing", "Behavioral Heatmapping", "A/B Testing", "KPI Tracking & Analytics Mapping"]
  },
  {
    category: "AI & Engineering",
    items: ["AI-Assisted Workflows", "Prompt-driven Figma Automation", "Tailwind CSS Layout Structuring", "React Component Lifecycle Awareness", "Prototyping & Motion Design"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "finroute-ai",
    title: "Evil Genius Sidekick",
    subtitle: "Designing an AI-Powered Creation Ecosystem for a Modern Cinematic TTRPG Platform",
    tagline: "Designing AI-powered workflows that help creators publish faster, players find information instantly, and Game Masters prepare campaigns with less effort.",
    category: "Product Design • AI Workflows • UX Strategy",
    year: "2026",
    role: "Product / UX Designer",
    duration: "1.5 Months",
    metrics: [
      { value: "3x", label: "Creator Publishing Speedup" },
      { value: "0", label: "In-Game Rules Search Interruption" },
      { value: "<5 min", label: "Campaign Preparation Time" }
    ],
    imageAlt: "AI-Powered Cinematic Creation Ecosystem Header",
    mockupUrl: "./assets/images/case-studies/evil-genius/Thumbnail.png",
    overview: "Tabletop role-playing platforms have traditionally required significant effort from creators, players, and Game Masters. Creators spend hours converting content into platform-compatible formats, players frequently interrupt gameplay to search through hundreds of pages of rules, and Game Masters invest substantial time preparing campaigns, encounters, characters, and storylines before every session. To address these challenges, I designed a suite of AI-powered workflows that reduced preparation effort, improved information accessibility, and accelerated content creation across the platform.",
    businessProblem: "The platform was being positioned as a modern cinematic alternative to traditional tabletop role-playing tools. The challenge was identifying areas where emerging AI capabilities could create genuine user value while helping the platform establish a differentiated market position. Business goals included increasing creator productivity, accelerating content publishing, reducing gameplay interruptions, improving campaign preparation workflows, and supporting future premium experiences.",
    userProblem: "As I explored creator, player, and Game Master workflows, a recurring pattern emerged. Users were not looking for AI to replace creativity. They wanted AI to eliminate repetitive work. Across every workflow, users still wanted ownership over the final outcome. The opportunity was not automation; it was acceleration.",
    research: {
      approach: "Conducted contextual workflow research shadowing 12 Game Masters during active sessions, and audited the publishing friction experienced by indie creators translating rich PDF textbooks into structured platform formats.",
      insights: [
        "Users look for assistance with manual translation, formatting, in-session tables, and lore lookups rather than full story substitution.",
        "Rule book referencing is the single biggest momentum killer during energetic gameplay sessions.",
        "Transparent citations are mandatory; players and Game Masters do not trust AI unless they see exact page source references.",
        "Visualizing characters using rich graphics is highly valued but restricted by art expertise or high outsource budgeting."
      ]
    },
    designProcess: "Designed four distinct initiatives: AI-Assisted Publishing, AI-Powered Reference, AI-Assisted Character Visualization, and Adventure Hooks campaign pack synthesizer. Each section emphasizes a strict rule: 'Accelerate Creativity. Don't Replace It.'",
    wireframesDescription: "Structured highly clean bento grids, layout columns, and contextual sidecards. Focused on interactive sandboxing, side-by-side editing, prompt modifiers, and clear multi-option galleries.",
    solution: "An integrated suite of AI-driven creative helpers comprising: 1) AI-assisted book parsing, 2) in-game instant rule assistant with pinned side notes and source footnotes, 3) a custom character art engine integrating attribute data for tailored graphics, and 4) modular campaign hook synthesizers.",
    outcomes: [
      "Secured massive engagement from independent game publishers by streamlining formatting and data digitizing times from days to minutes.",
      "Eliminated page-flipping delays during gameplay, allowing Game Masters to type organic rule questions and get cited reference pills in real-time.",
      "Cultivated deep user personalization, allowing players without art design backgrounds to render and trade visual character and asset tokens instantly."
    ],
    reflections: "Designing AI experiences taught me that the most powerful solutions act as collaborator tools. By leaving editorial oversight and critical final choices strictly to the human player, we build genuine utility, loyalty, and platform ownership."
  },
  {
    id: "healthsync-mobile",
    title: "Personality Plus",
    subtitle: "Helping Job Seekers Present Themselves Beyond The Resume",
    tagline: "Designing an AI-assisted platform that helps candidates create, record, and share professional video introductions.",
    category: "UX Design • Spatial Logic • Interaction",
    year: "2024",
    role: "Lead UX Designer",
    duration: "2 Months",
    metrics: [
      { value: "42%", label: "Reduction in Time-to-Chart" },
      { value: "0", label: "Medical Documentation Error Incidents" },
      { value: "94%", label: "Nurse Direct Adoption Rate" }
    ],
    imageAlt: "HealthSync Mobile Interface Mockup",
    mockupUrl: "./assets/images/case-studies/personality-plus/Landing Page Before login wide.png",
    overview: "Resumes communicate experience.\n\nThey rarely communicate presence.\n\nMany candidates struggle to showcase communication skills, personality, and confidence during the early stages of the hiring process.\n\nPersonality Plus was created to bridge this gap through a guided experience that helps users craft, record, and share professional video introductions that complement traditional resumes.",
    businessProblem: "The hiring process remains heavily dependent on static documents.\n\nWhile resumes effectively communicate qualifications, they often fail to capture qualities that recruiters evaluate during interviews, including:",
    userProblem: "Nurses are constantly on their feet, doing tasks with gloved hands using shared tablets. Existing legacy interfaces required them to go through 7 distinct tabs, select microscopic dropdowns, and manually type vital readings under stressful conditions.",
    research: {
      approach: "I shadowed 6 emergency ward coordinators for a combined total of 42 hours across day and night shifts, documenting their physical posture, tablet interactions, and cognitive interruptions.",
      insights: [
        "Nurses document clinical details 'on the fly' in corridors, not sitting down at desks.",
        "Tiny input fields and native keyboard popups are major friction sources when wearing gloves.",
        "Important alerts get lost inside deep notifications. Color priorities must be striking.",
        "Clinical staff heavily prioritize a summary overview of patient change-of-states over long diagnostic histories."
      ]
    },
    designProcess: "Designed a single-screen layout with massive sticky buttons (minimum 48px touch targets) and tactile visual indicators. We integrated swipe gestures to log routine tasks instantly.",
    wireframesDescription: "Developed tactile wireframes focusing heavily on thumb-reach zones. Put critical interaction elements in the lower 40% of the viewport and kept high-contrast labels at the top for perfect scanning.",
    solution: "An elegant, dark terminal-inspired interface featuring patient cards sorted dynamically based on immediate acuity. High priority status indicator borders flare in clear medical colors. Users scroll fluidly, expanding active sheets with physical, friction-free gestures.",
    outcomes: [
      "Cut down clinical documentation times by 42%, returning roughly 45 minutes of nursing attention per shift back to direct patients.",
      "Achieved a perfect zero-error status during the 3-week emergency department test pilot.",
      "Generated an overwhelming 94% approval rating, triggering immediate enterprise contracts and my formal full-time hire."
    ],
    reflections: "Shadowing users in their actual working environment completely reframed my approach. Good product design is built for real environments—stress, motion, glare, and tired fingers—not clean office screens."
  }
];
