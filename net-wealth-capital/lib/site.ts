export const brand = {
  name: "NWealth Capital",
  shortName: "NWealth",
  tagline: "Personalised wealth management for every life stage.",
  description:
    "Independent, fiduciary wealth advisors helping individuals, families and NRIs grow, protect and pass on their wealth.",
  email: "hello@nwealthcapital.com",
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  address: {
    line1: "12th Floor, Maker Maxity, Bandra Kurla Complex",
    line2: "Mumbai, Maharashtra 400051, India",
  },
  hours: "Mon–Sat, 9:30 AM – 6:30 PM IST",
  social: {
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
  },
  amc: "₹4,200 Cr+",
  clients: "1,800+",
  experience: "20+ yrs",
  retention: "97%",
};

export interface NavLink {
  label: string;
  href: string;
}

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why NWealth", href: "/why-nwealth" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Why NWealth", href: "/why-nwealth" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Consultation", href: "/book" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Investment Advisory", href: "/services/investment-advisory" },
      { label: "Taxation & Compliance", href: "/services/taxation-compliance" },
      { label: "Insurance Advisory", href: "/services/insurance-advisory" },
      { label: "Retirement Planning", href: "/services/retirement-planning" },
      { label: "Estate Planning", href: "/services/estate-succession-planning" },
      { label: "NRI Wealth", href: "/services/nri-wealth-management" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", href: "/auth" },
      { label: "Client Portal", href: "/portal" },
      { label: "Get Started", href: "/onboarding" },
    ],
  },
];

export const whyPillars = [
  {
    title: "20+ Years of Experience",
    description:
      "Two decades advising individuals, families and business owners through every market cycle.",
  },
  {
    title: "Client-First, Always",
    description:
      "We are fiduciaries. Our advice is commission-agnostic and built solely around your goals.",
  },
  {
    title: "A Transparent Process",
    description:
      "Clear fees, real-time dashboards, and plain-English reporting — no jargon, no surprises.",
  },
  {
    title: "Personalised Advisory",
    description:
      "No templates. Every plan is engineered around your goals, cash flows and risk appetite.",
  },
  {
    title: "End-to-End Support",
    description:
      "From investments to tax, insurance, retirement and estate — one accountable relationship.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Book a Consultation",
    description: "Share your goals in a free, no-obligation discovery call with a senior advisor.",
  },
  {
    step: "02",
    title: "Understand Your Profile",
    description: "We assess your finances, risk appetite and priorities to understand your needs.",
  },
  {
    step: "03",
    title: "Receive Your Plan",
    description: "Get a personalised, goal-based wealth plan with clear, actionable recommendations.",
  },
  {
    step: "04",
    title: "Implement & Grow",
    description: "We execute, monitor and review — keeping you on track through every life stage.",
  },
];

export const testimonials = [
  {
    quote:
      "NWealth restructured our portfolio and tax strategy in a way three previous advisors never bothered to. Genuinely goal-driven advice.",
    name: "Rohan Mehta",
    role: "Founder, SaaS Startup",
    location: "Mumbai",
  },
  {
    quote:
      "As an NRI, managing my Indian investments was a nightmare. NWealth handles everything — taxes, repatriation, reviews — across time zones.",
    name: "Ananya Iyer",
    role: "Product Lead",
    location: "Singapore",
  },
  {
    quote:
      "Their retirement projections finally gave us clarity. We know exactly where we stand and what to do next. Calm, competent, transparent.",
    name: "Dr. Suresh & Lata Nair",
    role: "Physicians",
    location: "Bengaluru",
  },
  {
    quote:
      "The estate planning engagement was handled with real sensitivity and rigour. Our succession is now documented and dispute-proof.",
    name: "Vikram Singh",
    role: "Business Owner",
    location: "Delhi",
  },
];

export const generalFaqs = [
  {
    question: "How is NWealth Capital different from a bank or distributor?",
    answer:
      "We are independent fiduciary advisors, not product distributors. Our recommendations are commission-agnostic and built solely around your goals, with transparent advisory fees.",
  },
  {
    question: "How are your fees structured?",
    answer:
      "We charge a transparent advisory fee — either a flat retainer or a percentage of assets advised — disclosed upfront with no hidden commissions.",
  },
  {
    question: "Is my data and money safe?",
    answer:
      "Your investments always remain in your own name with regulated custodians. We never take custody of your funds, and your data is encrypted and access-controlled.",
  },
  {
    question: "Do you work with clients outside major cities?",
    answer:
      "Yes. Our client portal and video consultations mean we serve clients across India and NRIs worldwide.",
  },
  {
    question: "What happens after I book a consultation?",
    answer:
      "You will have a free discovery call with a senior advisor. If it is a fit, we guide you through a simple onboarding and deliver your personalised plan.",
  },
];

export const coreValues = [
  { title: "Integrity", description: "We do the right thing, especially when no one is watching." },
  { title: "Transparency", description: "Clear fees, clear advice, clear reporting — always." },
  { title: "Empathy", description: "We listen first and advise around your life, not a product." },
  { title: "Excellence", description: "Rigorous research and disciplined execution in everything." },
  { title: "Stewardship", description: "We treat your wealth with the care we would our own." },
  { title: "Accountability", description: "One relationship, owning your outcomes end-to-end." },
];

export const leadership = [
  {
    name: "Naveen Wadhwa",
    role: "Founder & Chief Investment Officer",
    bio: "20+ years in portfolio management and financial planning. CFA charterholder.",
  },
  {
    name: "Priya Deshmukh",
    role: "Head of Financial Planning",
    bio: "Certified Financial Planner specialising in goal-based and retirement planning.",
  },
  {
    name: "Arjun Kapoor",
    role: "Head of Taxation & Compliance",
    bio: "Chartered Accountant with deep expertise in personal and NRI taxation.",
  },
  {
    name: "Meera Raghunathan",
    role: "Head of Client Experience",
    bio: "Leads onboarding and servicing, ensuring every client feels genuinely looked after.",
  },
];
