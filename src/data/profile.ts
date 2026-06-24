// ============================================================================
// EDIT THIS FILE to put your real information into the site.
// Every section of the portfolio reads from this single config.
// Swap placeholder values (marked TODO) with your actual details, then
// `npm run dev` to see changes instantly.
// ============================================================================

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  github?: string;
  demo?: string;
  image?: string; // path under /public/projects, e.g. "/projects/wanderlust.png"
  featured?: boolean;
};

export type ExperienceItem = {
  org: string;
  role: string;
  location: string;
  start: string;
  end: string; // "Present" allowed
  bullets: string[];
};

export type EducationItem = {
  institution: string;
  credential: string;
  location: string;
  start: string;
  end: string;
  focus?: string;
};

export type SkillCategory = {
  category: string;
  items: { name: string; level: number }[]; // level 0-100, used for animated bars
};

export const profile = {
  name: "Abhijit Swain",
  title: "Full-Stack Developer",
  subtitle: "MERN · Real-Time Systems · DevSecOps",
  location: "Bengaluru, Karnataka, India",
  email: "swain.abhijit0119@gmail.com",
  phone: "+91 9937358951",
  resumeFile: "/resume.pdf", // TODO: drop your real PDF into /public/resume.pdf

  social: {
    github: "https://github.com/Abhijit8951",
    linkedin: "https://linkedin.com/in/abhijit-swain-414556329",
    medium: "", // TODO optional
    twitter: "", // TODO optional
  },

  heroLines: [
    "$ whoami",
    "> full-stack developer, bengaluru",
    "$ cat journey.log",
    "> 2019 — struggled academically, almost gave up",
    "> found programming — something finally clicked",
    "> built real-time systems, shipped real products",
    "$ status",
    "> grit > grades. still building.",
  ],

  about: {
    summary:
      "Results-driven, early-career full-stack JavaScript developer based in Bengaluru, with a focus on real-time systems, scalable APIs, and DevSecOps practices. I build things end to end — from WebRTC signaling servers to production-minded CI/CD pipelines — and I care more about whether it ships and holds up than how it looks on paper.",
    story:
      "In 2019 I was struggling academically and seriously considered giving up on tech altogether. Programming was the first thing that made sense to me on my own terms — not because it was easy, but because progress was visible and earned. That mindset (grit over grades) still drives how I work: I'd rather ship a working real-time video pipeline than have a perfect transcript. I'm currently completing my MCA and actively building toward backend, full-stack, and DevSecOps roles.",
  },

  skills: [
    {
      category: "Languages",
      items: [
        { name: "JavaScript (ES6+)", level: 90 },
        { name: "TypeScript", level: 80 },
        { name: "Go", level: 45 },
      ],
    },
    {
      category: "Frontend",
      items: [
        { name: "React.js", level: 88 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Next.js", level: 70 },
      ],
    },
    {
      category: "Backend & Data",
      items: [
        { name: "Node.js / Express", level: 88 },
        { name: "MongoDB", level: 82 },
        { name: "RESTful APIs", level: 85 },
      ],
    },
    {
      category: "Real-Time Systems",
      items: [
        { name: "WebRTC", level: 80 },
        { name: "Socket.IO / WebSockets", level: 82 },
      ],
    },
    {
      category: "DevSecOps & Cloud",
      items: [
        { name: "Docker", level: 70 },
        { name: "Kubernetes", level: 55 },
        { name: "OWASP / Snyk / SonarQube", level: 60 },
        { name: "AWS", level: 60 },
      ],
    },
  ] satisfies SkillCategory[],

  projects: [
    {
      slug: "echomeet",
      name: "EchoMeet",
      tagline: "Real-time video conferencing, built from the signaling layer up",
      description:
        "A multi-party video collaboration platform built on WebRTC and Socket.IO, with custom signaling, presence sync, and connection-health monitoring across concurrent calls.",
      role: "Lead Developer",
      stack: ["React", "Node.js", "Socket.IO", "WebRTC", "Express", "JWT"],
      highlights: [
        "Custom WebSocket signaling server for SDP/ICE exchange across multi-party calls",
        "Client-state synchronization to keep presence and connection health consistent",
        "Stateless JWT auth for session validation across reconnects",
      ],
      github: "https://github.com/Abhijit8951/echomeet",
      demo: "", // No live demo yet — CTA links to GitHub repo instead
      image: "/projects/echomeet.png", // TODO add screenshot
      featured: true,
    },
    {
      slug: "wanderlust",
      name: "WanderLust",
      tagline: "MERN-stack rental marketplace",
      description:
        "A full-stack rental marketplace covering listings, search/filtering, bookings, and reviews — built to production-app conventions, not tutorial conventions.",
      role: "Full-Stack Developer",
      stack: ["MongoDB", "Express", "React", "Node.js"],
      highlights: [
        "End-to-end CRUD for listings with image handling and validation",
        "Search and filter pipeline over MongoDB aggregation",
        "Review and rating system tied to bookings",
      ],
      github: "https://github.com/Abhijit8951/wanderlust",
      demo: "", // No live demo yet — CTA links to GitHub repo instead
      image: "/projects/wanderlust.png", // TODO add screenshot
      featured: true,
    },
    {
      slug: "anigram",
      name: "Anigram (OSS Contribution)",
      tagline: "Open-source contribution",
      description:
        "Contributed to Anigram, an open-source project, working within an existing codebase and contribution workflow rather than building solo.",
      role: "Contributor",
      stack: ["JavaScript", "Git", "Open Source"],
      highlights: [
        "Shipped changes through a real PR review and CI process",
        "Worked within existing architecture and code conventions",
      ],
      github: "https://github.com/Abhijit8951", // TODO: link to actual PR/fork once available
      demo: "",
      featured: false,
    },
  ] satisfies Project[],

  experience: [
    {
      org: "Web Boket Software Solutions",
      role: "Software Developer Intern",
      location: "Remote / India",
      start: "Feb 2025",
      end: "Aug 2025",
      bullets: [
        "Worked across the MERN stack on production features and bug fixes",
        "Collaborated within a small team using Git-based review workflows",
        "Gained hands-on exposure to real-world deployment and debugging practices",
      ],
    },
  ] satisfies ExperienceItem[],

  education: [
    {
      institution: "Srusti Academy of Management and Technology",
      credential: "Master of Computer Applications (MCA)",
      location: "Bhubaneswar, Odisha, India",
      start: "2024",
      end: "Expected May 2026",
      focus: "Advanced Web Architectures, Distributed Systems, Cloud Deployments",
    },
    {
      institution: "Regional College of Management",
      credential: "Bachelor of Computer Applications (BCA)",
      location: "Bengaluru, Karnataka, India",
      start: "2021",
      end: "May 2024",
      focus: "Software Engineering, DBMS, Data Structures & Algorithms",
    },
  ] satisfies EducationItem[],

  achievements: [
    "Running an active LinkedIn technical content strategy — system design and career-journey writing, building toward consistent long-term audience growth",
    "Shipped 3 distinct full-stack projects spanning real-time systems (EchoMeet), a production-style marketplace (WanderLust), and open-source contribution (Anigram)",
    "Actively reframing toward DevSecOps practice — OWASP, Snyk/SonarQube, IaC, and AWS security fundamentals alongside core MERN work",
  ],
} as const;

export type Profile = typeof profile;
