import { Project, Milestone, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: "Varunpreet Singh",
  role: "User-Centered Product Designer",
  headline: "USER-CENTERED PRODUCT DESIGNER",
  tagline: "Designing Products at the Intersection of Users, Business and AI.",
  age: 24,
  experienceMonths: 15,
  email: "preetvarun.too@gmail.com",
  linkedin: "https://www.linkedin.com/in/varunpreet-singh",
  // Copy and paste your Google Drive Shareable Link here to connect your PDF
  resumeUrl: "https://drive.google.com/file/d/1Zv7UdLFDP2NhUkZdaxdbBlrGwBELo5Yu/preview",
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
    imageAlt: "AI-Powered Cinematic Creation Ecosystem Header",
    mockupUrl: "./assets/images/case-studies/evil-genius/Thumbnail.png",
    overview: "Tabletop role-playing platforms have traditionally required significant effort from creators, players, and Game Masters. Creators spend hours converting content into platform-compatible formats, players frequently interrupt gameplay to search through hundreds of pages of rules, and Game Masters invest substantial time preparing campaigns, encounters, characters, and storylines before every session. To address these challenges, I designed a suite of AI-powered workflows that reduced preparation effort, improved information accessibility, and accelerated content creation across the platform."
  },
  {
    id: "personality-plus",
    title: "Personality Plus",
    subtitle: "Helping Job Seekers Present Themselves Beyond The Resume",
    tagline: "Designing an AI-assisted platform that helps candidates create, record, and share professional video introductions.",
    category: "UX Design • Spatial Logic • Interaction",
    year: "2024",
    role: "Lead UX Designer",
    duration: "2 Months",
    metrics: [
      { value: "End-to-End UX Leadership", label: "Led UX design across the end-to-end product experience" },
      { value: "User Flows & Architecture", label: "Defined user flows and interaction models" },
      { value: "AI-Assisted Workflows", label: "Designed AI-assisted scripting workflows" }
    ],
    imageAlt: "Personality Plus Interface Mockup",
    mockupUrl: "./assets/images/case-studies/personality-plus/Landing Page Before login wide.png",
    overview: "Resumes communicate experience.\n\nThey rarely communicate presence.\n\nMany candidates struggle to showcase communication skills, personality, and confidence during the early stages of the hiring process.\n\nPersonality Plus was created to bridge this gap through a guided experience that helps users craft, record, and share professional video introductions that complement traditional resumes.",
    businessProblem: "The hiring process remains heavily dependent on static documents.\n\nWhile resumes effectively communicate qualifications, they often fail to capture qualities that recruiters evaluate during interviews, including:",
    userProblem: "Many users knew they wanted to introduce themselves professionally. Few knew how to structure their story or felt comfortable speaking directly to a camera.",
    research: {
      approach: "This creates a gap between application and interview stages. The opportunity was to help candidates communicate these qualities earlier in the hiring process without requiring recruiters to adopt entirely new workflows.",
      insights: [
        "Communication ability",
        "Professional presence",
        "Confidence",
        "Personality"
      ]
    },
    designProcess: "Rather than asking users to immediately record themselves, the experience was designed to progressively build confidence through guidance, preparation, and iteration.\n\nEvery feature supports this principle.",
    wireframesDescription: "Build structured professional stories via interactive scripting helper systems, record securely using user-paced teleprompters, and publish with complete creative control.",
    solution: "Evaluate complex communication, personality parameters, and user culture alignments inside 60 seconds of secure candidate-video playback.",
    outcomes: [
      "Teleprompter & Recording: Designed teleprompter-based recording experiences",
      "Sharing & Dashboards: Designed sharing and dashboard experiences",
      "Strategic Stakeholder Alignment: Collaborated with stakeholders and engineering teams throughout development"
    ],
    reflections: "The most valuable insight from this project was that confidence is often a design problem rather than a user problem.\n\nMany users already possess the skills and experiences necessary to tell compelling professional stories. What they lack is structure, guidance, and a comfortable environment in which to present themselves.\n\nBy reducing uncertainty throughout the process, the product helps users focus less on the mechanics of recording and more on communicating who they are."
  }
];
