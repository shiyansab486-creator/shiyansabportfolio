export type ResumeEducation = {
  degree: string;
  institution: string;
  period: string;
  bullets: string[];
};

export type ResumeProject = {
  name: string;
  bullets: string[];
};

export type SkillItem = {
  title: string;
  tags: string[];
  percentage: number;
  icon: string;
};

export type ExperienceItem = {
  year: string;
  title: string;
  subtitle: string;
  description: string;
};

export type VideoExperienceItem = {
  id: string;
  title: string;
  category: string;
  src: string;
  fileName: string;
  caption: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  category: string;
  stack: string[];
  description: string;
  result: string;
  link?: string;
  accentFrom: string;
  accentTo: string;
  mockLabel: string;
  details: string[];
};

export type TestimonialItem = {
  name: string;
  role: string;
  text: string;
  rating: number;
};

export const profile = {
  name: "Ahammad Shiyan Sab",
  shortName: "Shiyan Sab",
  title: "Digital Marketer, Web Developer, Videographer & Content Creator",
  tagline: "I Build Brands, Create Stories & Develop Digital Experiences.",
  subTagline: "Digital Marketer · Web Developer · Videographer · Content Creator",
  email: "shiyansab486@gmail.com",
  phone: "+91 7338534272",
  phoneRaw: "7338534272",
  location: "Honnaver, Karnataka, India",
  workingBase: "Based in Mangaluru, India — Available for Work",
  linkedin: "https://www.linkedin.com/in/shiyansab",
  github: "https://github.com/shiyansab486-creator",
  portfolio: "https://shiyansab.portfolio",
  instagram: "https://instagram.com/shiyansab486",
  youtube: "https://youtube.com/@shiyansab486",
};

export const resumeData = {
  name: "Ahammad Shiyan Sab",
  title: "Digital Marketing & Web Development Professional",
  location: "Honnaver, Karnataka, India",
  email: "shiyansab486@gmail.com",
  phone: "7338534272",
  summary:
    "Advanced Digital Marketing student with a strong interest in digital marketing strategy, social media management, SEO/SEM, content creation, and branding. Currently studying at Zephyr Technologies, Mangaluru. Experienced in developing customer-centric brand concepts, conducting market research, and performing SWOT analysis.",
  education: [
    {
      degree: "Multi-Disciplinary Technology & Business Program",
      institution: "Zephyr Technologies Pvt. Ltd., Mangalore",
      period: "Sep 2025 – Pursuing",
      bullets: [
        "Training in SEO, SEM, social media marketing, paid advertising, and content marketing",
        "Learning branding, market research, and digital business strategy",
        "Hands-on exposure to real-world brand analysis and campaign planning",
      ],
    },
    {
      degree: "Pre-University Course (PUC)",
      institution: "",
      period: "2022 – 2024",
      bullets: [
        "Core subjects: Accountancy, Business Studies, Economics, Statistics, English",
      ],
    },
  ] satisfies ResumeEducation[],
  projects: [
    {
      name: "Organic Skincare Brand — Market Research, SWOT & PESTEL",
      bullets: [
        "Complete market research on the $10.5B global organic skincare market (projected $21B by 2030)",
        "Conducted SWOT & PESTEL analysis, consumer behavior study, and competitive analysis",
        "Designed buyer persona (Nisha Verma) with demographic, psychographic, and behavioral segmentation",
        "Mapped distribution strategy across Amazon, Flipkart, and medical stores",
      ],
    },
    {
      name: "Apple iPhone — SWOT & PESTEL Analysis",
      bullets: [
        "Analyzed Apple iPhone as a global premium brand across strategy, competition, and regulation",
        "Identified strengths (ecosystem, loyalty), opportunities (5G, emerging markets), and threats (Android, antitrust)",
        "Completed full PESTEL covering trade policies, AI innovation, sustainability, and consumer protection laws",
      ],
    },
    {
      name: "Luxury Perfume Brand — Market Research, SWOT, PESTEL & Persona",
      bullets: [
        "Researched global luxury perfume market (USD 47–52B in 2024, projected USD 75–84B)",
        "Built SWOT, PESTEL, and distribution strategy focused on flagship physical stores",
        "Created buyer persona: Rajiv Malhotra — Prestige Enthusiast with full behavior and attraction strategies",
      ],
    },
    {
      name: "Affordable Footwear Brand — Market Segmentation Strategy",
      bullets: [
        "Developed full segmentation across demographic, psychographic, geographic, and behavioral dimensions",
        "Mapped product offerings (school, office, daily wear) to customer segments and regional preferences",
        "Designed loyalty program and affordability strategy for mass-market targeting",
      ],
    },
    {
      name: "3C Laundry — SEO & Keyword Research Strategy",
      bullets: [
        "Built complete SEO strategy for a laundry & dry-cleaning business from seed keywords to page mapping",
        "Grouped 9 keyword clusters by search intent: transactional, commercial, informational, navigational",
        "Delivered SERP analysis, keyword-to-page mapping, content plan, and tracking strategy",
      ],
    },
  ] satisfies ResumeProject[],
  skills: [
    "HTML",
    "CSS",
    "JavaScript",
    "MERN Basics",
    "Photoshop",
    "SEO",
    "SEM",
    "Social Media Marketing",
    "Content Strategy",
    "Brand Development",
    "Market Research",
    "Video Editing",
  ],
  languages: ["English", "Kannada", "Hindi", "Malayalam"],
};

export const aboutStats = [
  { label: "Years Learning", value: 2, suffix: "+" },
  { label: "Projects Done", value: 10, suffix: "+" },
  { label: "Languages", value: 4, suffix: "" },
] as const;

export const aboutTimeline = [
  {
    year: "2022–2024",
    title: "Pre-University Course",
    subtitle: "Business & analytics foundation",
  },
  {
    year: "Sep 2025–Now",
    title: "Zephyr Technologies, Mangaluru",
    subtitle: "Multi-Disciplinary Technology & Business Program",
  },
  {
    year: "2026",
    title: "Freelance Projects",
    subtitle: "Market research, brand strategy, SEO & content creation",
  },
] as const;

export const skills: SkillItem[] = [
  {
    title: "Digital Marketing",
    tags: ["SEO", "SEM", "Meta Ads", "Google Ads", "Analytics"],
    percentage: 87,
    icon: "megaphone",
  },
  {
    title: "Content Strategy",
    tags: ["Storytelling", "Brand Voice", "Calendar", "Copywriting"],
    percentage: 82,
    icon: "pen-tool",
  },
  {
    title: "Social Media",
    tags: ["Instagram", "YouTube", "Growth", "Community"],
    percentage: 85,
    icon: "share-2",
  },
  {
    title: "Web Development",
    tags: ["HTML", "CSS", "JavaScript", "Vite"],
    percentage: 70,
    icon: "code-2",
  },
  {
    title: "Videography",
    tags: ["Cinematography", "Color Grading", "Editing", "Reels"],
    percentage: 90,
    icon: "clapperboard",
  },
  {
    title: "Brand Development",
    tags: ["Identity", "Positioning", "SWOT", "Research"],
    percentage: 80,
    icon: "sparkles",
  },
  {
    title: "Photoshop & Design",
    tags: ["Compositing", "Retouching", "Mockups"],
    percentage: 89,
    icon: "swatch-book",
  },
  {
    title: "Market Research",
    tags: ["Competitor Analysis", "Audience Mapping", "Buyer Persona", "PESTEL"],
    percentage: 85,
    icon: "search-check",
  },
  {
    title: "Business Strategy",
    tags: ["Go-to-market", "Franchise Model", "Pitch Decks", "Segmentation"],
    percentage: 83,
    icon: "briefcase-business",
  },
];

export const experiences: ExperienceItem[] = [
  {
    year: "2026",
    title: "Freelance Projects",
    subtitle: "The Practice",
    description:
      "Applying everything learned — market research, SEO strategy, brand positioning, and content creation — to real client and self-initiated projects.",
  },
  {
    year: "Sep 2025–Now",
    title: "Zephyr Technologies",
    subtitle: "The Program",
    description:
      "Multi-Disciplinary Technology & Business Program — SEO, SEM, paid ads, content marketing, SWOT, PESTEL, branding, and real-world brand analysis.",
  },
  {
    year: "2022–2024",
    title: "PUC Education",
    subtitle: "The Foundation",
    description:
      "Business Studies, Economics, Accountancy, and Statistics — building the analytical mindset behind every campaign, research project, and creative decision.",
  },
];

export const videoShowcase: VideoExperienceItem[] = Array.from({ length: 31 }, (_, index) => {
  const displayIndex = 31 - index;
  const number = String(displayIndex).padStart(2, "0");

  return {
    id: `video-${number}`,
    title: `Video ${number}`,
    category: displayIndex % 3 === 0 ? "Brand Reel" : displayIndex % 3 === 1 ? "Cinematic Edit" : "Content Cut",
    src: `/videos/video-${number}.mp4`,
    fileName: `video-${number}.mp4`,
    caption: "Drop your final exported MP4 into the public/videos folder using this file name.",
  };
});

export const projects: ProjectItem[] = [
  {
    id: "organic-skincare",
    name: "Organic Skincare Brand",
    category: "Market Research · SWOT · PESTEL",
    stack: ["Market Research", "SWOT Analysis", "PESTEL Analysis", "Buyer Persona", "Segmentation"],
    description:
      "Full business and marketing analysis of an organic skincare brand. The global organic skincare market was valued at ~$10.5B in 2022 and is projected to reach ~$21B by 2030, growing at 8–10% annually.",
    result:
      "Delivered complete SWOT, PESTEL, consumer behavior study, demographic-psychographic-behavioral segmentation, competitive analysis, distribution strategy, and a buyer persona (Nisha Verma – Conscious Skincare Seeker).",
    accentFrom: "#06b6d4",
    accentTo: "#3b82f6",
    mockLabel: "Organic skincare market research deck",
    details: [
      "Identified key consumer drivers: sensitive skin, allergy concerns, chemical-free positioning, and safety-first buying behavior.",
      "SWOT: Strengths — fully organic; Weaknesses — higher cost, shorter shelf life; Opportunities — DNA-based allergy testing; Threats — big brands copying organic claims.",
      "PESTEL covered political regulations, economic pricing sensitivity, social wellness trends, technological e-commerce growth, environmental sustainability, and legal ethical claims.",
      "Segmentation across demographic, geographic, psychographic, and behavioral dimensions. Distribution mapped to Amazon, Flipkart, and medical stores.",
      "Buyer persona: Nisha Verma — goals, challenges, buying triggers, and brand attraction strategies fully documented.",
    ],
  },
  {
    id: "apple-iphone",
    name: "Apple iPhone – Brand Study",
    category: "SWOT · PESTEL · Competitive Analysis",
    stack: ["SWOT Analysis", "PESTEL Analysis", "Brand Strategy", "Competitive Research"],
    description:
      "In-depth analysis of Apple iPhone as a global premium brand — examining its competitive positioning, regulatory environment, and strategic opportunities in emerging markets.",
    result:
      "Produced a comprehensive SWOT and PESTEL framework identifying Apple's key strengths (ecosystem, loyalty, security) and strategic threats (Android competition, foldables, antitrust pressure).",
    accentFrom: "#8b5cf6",
    accentTo: "#d946ef",
    mockLabel: "Apple brand strategy analysis",
    details: [
      "SWOT Strengths: Brand reputation, iOS ecosystem integration, privacy-first security, and fierce customer loyalty.",
      "Weaknesses: Limited customization, premium pricing, battery life concerns, and expensive repairs.",
      "Opportunities: 5G network expansion, financing options to reduce entry barrier, and untapped emerging markets.",
      "Threats: Android competition, rise of foldable devices, and global regulatory/antitrust scrutiny.",
      "PESTEL covered trade policies, inflation sensitivity, digital lifestyle trends, AI/AR chip innovation, recycling programs, and consumer protection laws.",
    ],
  },
  {
    id: "luxury-perfume",
    name: "Luxury Perfume Brand",
    category: "Market Research · SWOT · PESTEL · Persona",
    stack: ["Market Research", "SWOT Analysis", "PESTEL Analysis", "Buyer Persona", "Distribution Strategy"],
    description:
      "Complete research study on the luxury perfume industry. Global market valued between USD 47–52 billion in 2024 and projected to exceed USD 75–84 billion — growing at 6–7% annually.",
    result:
      "Delivered market sizing, consumer psychology study, competitive analysis, SWOT, PESTEL, distribution strategy (flagship physical stores in major cities), and buyer persona (Rajiv Malhotra – Prestige Enthusiast).",
    accentFrom: "#ec4899",
    accentTo: "#f43f5e",
    mockLabel: "Luxury perfume market research deck",
    details: [
      "Key consumer motivators: status signaling, fragrance longevity, exclusivity, and identity expression.",
      "Opportunity identified: customizable luxury perfumes and Tier-2 city expansion for affordable luxury positioning.",
      "SWOT: Strengths — brand image and loyalty; Weaknesses — high pricing, limited accessibility; Threats — strong established competitors and trust barriers for new entrants.",
      "PESTEL analysis covering prestige regulations, economic luxury sensitivity, social aspirational trends, tech in customization, environmental sustainability, and legal fragrance standards.",
      "Buyer persona: Rajiv Malhotra — lifestyle, purchase behavior, goals, challenges, and brand attraction strategies.",
    ],
  },
  {
    id: "shoe-segmentation",
    name: "Affordable Footwear Brand",
    category: "Market Segmentation Strategy",
    stack: ["Demographic Segmentation", "Psychographic Segmentation", "Geographic Segmentation", "Behavioral Segmentation"],
    description:
      "Market segmentation and targeting strategy for an affordable everyday shoe brand, mapping the full consumer landscape across demographic, psychographic, geographic, and behavioral dimensions.",
    result:
      "Produced an actionable segmentation framework with product-to-segment mapping across school, office, and daily-wear categories — aligned with regional preferences, affordable pricing, and loyalty program design.",
    accentFrom: "#14b8a6",
    accentTo: "#06b6d4",
    mockLabel: "Footwear segmentation strategy",
    details: [
      "Demographic segmentation: age, gender, income level, occupation, and education level.",
      "Psychographic segmentation: interests, values, lifestyle, and purchase motivations.",
      "Geographic segmentation: local, regional, and climate-based product adaptations.",
      "Behavioral segmentation: purchase history, brand loyalty, and usage frequency.",
      "Strategy emphasized customization, regional preference mapping, affordable pricing tiers, and occupation-based product offerings (school, office, daily wear).",
    ],
  },
  {
    id: "laundry-seo",
    name: "3C Laundry – SEO & Keyword Strategy",
    category: "SEO · Keyword Research · Content Planning",
    stack: ["SEO Strategy", "Keyword Research", "Search Intent Mapping", "SERP Analysis", "Content Planning"],
    description:
      "Complete SEO and keyword research strategy for 3C – Cloth Cleaning Centre, a laundry and dry-cleaning business. Covers the full keyword lifecycle from seed lists to page-level mapping and performance tracking.",
    result:
      "Delivered a structured keyword cluster map covering 9 service categories, search intent groupings (transactional, commercial, informational, navigational), SERP analysis, keyword-to-page mapping, and a content + tracking plan.",
    accentFrom: "#f59e0b",
    accentTo: "#eab308",
    mockLabel: "SEO strategy and keyword map",
    details: [
      "Built seed keyword lists from business goals and audience research, then grouped by intent: transactional (book now), commercial (best dry cleaners), informational (how laundry pickup works), navigational (3C near me).",
      "Keyword clusters: Laundry Near Me · Dry Cleaning · Wash & Fold · Machine Sales · Machine Service · Ironing Services · Commercial Laundry · Specialty Cleaning · Competitor Brands.",
      "Conducted SERP analysis to understand ranking difficulty, snippet opportunities, and competitive content gaps.",
      "Mapped keywords to landing pages, service pages, and blog content — aligned to the buyer journey.",
      "Defined tracking and measurement strategy using rank monitoring, organic traffic KPIs, and conversion optimization.",
    ],
  },
];

export const marqueePrimary = [
  "Digital Marketing",
  "Web Development",
  "Brand Strategy",
  "Videography",
  "SEO",
  "Content Creation",
];

export const marqueeSecondary = [
  "Photoshop",
  "Social Media",
  "Analytics",
  "Photoshop",
  "Social Media",
  "Analytics",
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Arjun Menon",
    role: "Founder, Local Brand",
    text: "Shiyan brings both creative vision and marketing intelligence to every project. That's a rare combination.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Startup Founder",
    text: "The brand strategy work felt thoughtful, practical, and immediately actionable. Strong attention to detail.",
    rating: 5,
  },
  {
    name: "Rahul Shetty",
    role: "Digital Agency Lead",
    text: "Strong work ethic, sharp analytical thinking, and a genuine passion for digital growth. Great to collaborate with.",
    rating: 5,
  },
];
