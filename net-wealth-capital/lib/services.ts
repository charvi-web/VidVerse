import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  Receipt,
  ShieldCheck,
  PiggyBank,
  Landmark,
  Globe2,
} from "lucide-react";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  overview: string;
  benefits: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
  highlight?: boolean;
}

export const services: Service[] = [
  {
    slug: "investment-advisory",
    name: "Investment Advisory",
    shortName: "Investments",
    icon: TrendingUp,
    tagline: "Goal-based portfolios, actively guided.",
    summary:
      "Personalised, research-backed portfolio strategies across equity, debt, and alternatives — aligned to your goals and risk appetite.",
    overview:
      "Our investment advisory blends disciplined asset allocation with rigorous fund selection. We build a diversified portfolio mapped to each of your financial goals, rebalance as markets move, and keep you accountable to the plan — not the noise.",
    benefits: [
      "Goal-based asset allocation across equity, debt and alternatives",
      "Independent, commission-agnostic fund and security selection",
      "Quarterly portfolio reviews and disciplined rebalancing",
      "Transparent reporting with real-time portfolio dashboards",
      "Tax-aware harvesting to improve post-tax returns",
    ],
    process: [
      { title: "Discovery", description: "Understand your goals, cash flows, and risk appetite." },
      { title: "Strategy", description: "Design a target asset allocation and investment policy." },
      { title: "Implementation", description: "Deploy capital across curated, low-cost instruments." },
      { title: "Review", description: "Monitor, rebalance and report every quarter." },
    ],
    faqs: [
      {
        question: "What is the minimum investment to get started?",
        answer:
          "We work with portfolios starting from ₹25 lakh, though we tailor engagements to each client. Book a consultation to discuss your situation.",
      },
      {
        question: "Are you a fiduciary?",
        answer:
          "Yes. We are commission-agnostic and always act in your best interest, recommending low-cost, suitable instruments.",
      },
      {
        question: "How often will my portfolio be reviewed?",
        answer:
          "Formal reviews happen quarterly, with continuous monitoring and rebalancing triggered by material market or life events.",
      },
    ],
    highlight: true,
  },
  {
    slug: "taxation-compliance",
    name: "Taxation & Compliance",
    shortName: "Taxation",
    icon: Receipt,
    tagline: "Plan smarter, file with confidence.",
    summary:
      "Year-round tax planning, return filing, and regulatory compliance for individuals, families, and business owners.",
    overview:
      "We integrate tax strategy into your broader wealth plan — optimising deductions, capital gains, and structure — then handle accurate, timely filing and ongoing compliance so nothing slips through the cracks.",
    benefits: [
      "Proactive, year-round tax planning (not just at filing time)",
      "Capital-gains and tax-loss harvesting strategies",
      "Accurate ITR preparation and timely filing",
      "Advance tax computation and reminders",
      "Notice handling and representation support",
    ],
    process: [
      { title: "Assessment", description: "Review income sources, investments and prior filings." },
      { title: "Planning", description: "Identify deductions, exemptions and structuring options." },
      { title: "Filing", description: "Prepare and file accurate returns before deadlines." },
      { title: "Support", description: "Respond to notices and keep you compliant year-round." },
    ],
    faqs: [
      {
        question: "Do you handle capital gains from equity and property?",
        answer:
          "Yes. We compute short- and long-term capital gains across asset classes and advise on harvesting and reinvestment options.",
      },
      {
        question: "Can you represent me for tax notices?",
        answer: "We assist with notice responses and coordinate representation where required.",
      },
      {
        question: "Do you support business and NRI taxation?",
        answer: "Absolutely — including presumptive taxation, TDS, and DTAA relief for NRIs.",
      },
    ],
  },
  {
    slug: "insurance-advisory",
    name: "Insurance Advisory",
    shortName: "Insurance",
    icon: ShieldCheck,
    tagline: "Protect what matters, without over-paying.",
    summary:
      "Independent risk assessment and cover recommendations across life, health, and general insurance.",
    overview:
      "Insurance should protect, not complicate. We quantify your protection gap and recommend the right term, health and general cover — separating insurance from investment so you never overpay for either.",
    benefits: [
      "Objective protection-gap and human-life-value analysis",
      "Pure-risk term and health cover recommendations",
      "Policy portfolio audit to remove costly overlaps",
      "Claims guidance and nominee support",
      "Annual review as your life circumstances change",
    ],
    process: [
      { title: "Needs Analysis", description: "Quantify your protection gap and liabilities." },
      { title: "Recommendation", description: "Shortlist suitable, cost-effective policies." },
      { title: "Onboarding", description: "Assist with applications and medicals." },
      { title: "Servicing", description: "Support renewals, changes and claims." },
    ],
    faqs: [
      {
        question: "Do you sell insurance policies?",
        answer:
          "We advise independently and are agnostic to providers, focusing on the most suitable, cost-effective cover for you.",
      },
      {
        question: "How much life cover do I actually need?",
        answer:
          "We use a human-life-value and needs-based approach factoring liabilities, dependents, and goals to arrive at the right sum assured.",
      },
      {
        question: "Should I mix insurance and investment?",
        answer:
          "Generally no. We recommend separating pure-risk protection from investments for clarity and better outcomes.",
      },
    ],
  },
  {
    slug: "retirement-planning",
    name: "Retirement Planning",
    shortName: "Retirement",
    icon: PiggyBank,
    tagline: "Retire on your terms, with certainty.",
    summary:
      "Build and draw down a retirement corpus that sustains your lifestyle — inflation-adjusted and tax-efficient.",
    overview:
      "We project the corpus you need, engineer a savings and investment path to reach it, and design a sustainable, tax-efficient withdrawal strategy so your money lasts as long as you do.",
    benefits: [
      "Inflation-adjusted retirement corpus projections",
      "Accumulation glide-path across your working years",
      "Tax-efficient withdrawal and bucketing strategy",
      "NPS, EPF and annuity optimisation",
      "Longevity and healthcare cost planning",
    ],
    process: [
      { title: "Projection", description: "Model your target corpus and shortfall." },
      { title: "Accumulation", description: "Design a savings and investment glide-path." },
      { title: "Transition", description: "De-risk as you approach retirement." },
      { title: "Distribution", description: "Draw down sustainably and tax-efficiently." },
    ],
    faqs: [
      {
        question: "When should I start retirement planning?",
        answer: "The earlier the better — compounding rewards an early start, but it is never too late to optimise.",
      },
      {
        question: "How do you account for inflation?",
        answer:
          "All projections are inflation-adjusted, and we stress-test your plan against multiple return and inflation scenarios.",
      },
      {
        question: "Do you optimise NPS and EPF?",
        answer: "Yes, we integrate NPS, EPF and annuities into a cohesive, tax-efficient retirement strategy.",
      },
    ],
    highlight: true,
  },
  {
    slug: "estate-succession-planning",
    name: "Estate & Succession Planning",
    shortName: "Estate",
    icon: Landmark,
    tagline: "Pass on your legacy, seamlessly.",
    summary:
      "Wills, trusts, nominations and succession structures that transfer wealth smoothly across generations.",
    overview:
      "We help you document intent and build the right structures — wills, trusts and nominations — so your wealth transfers smoothly, minimises disputes, and honours your wishes across generations.",
    benefits: [
      "Will drafting and periodic updates",
      "Private trust structuring for control and continuity",
      "Nomination and beneficiary alignment across assets",
      "Succession planning for family businesses",
      "Coordination with legal and tax professionals",
    ],
    process: [
      { title: "Discovery", description: "Map assets, liabilities and family intent." },
      { title: "Design", description: "Recommend wills, trusts and nomination structures." },
      { title: "Documentation", description: "Draft and execute legal instruments." },
      { title: "Stewardship", description: "Review and update as circumstances evolve." },
    ],
    faqs: [
      {
        question: "Do I need a trust or just a will?",
        answer:
          "It depends on your assets, family situation and objectives. We assess and recommend the simplest structure that meets your goals.",
      },
      {
        question: "Can you help family businesses with succession?",
        answer: "Yes, we design succession frameworks that balance control, continuity and fairness.",
      },
      {
        question: "How often should estate documents be reviewed?",
        answer: "At least every three years, or after major life events such as marriage, birth or acquisition of assets.",
      },
    ],
  },
  {
    slug: "nri-wealth-management",
    name: "NRI Wealth Management",
    shortName: "NRI",
    icon: Globe2,
    tagline: "Your India wealth, expertly managed abroad.",
    summary:
      "End-to-end management of Indian investments, taxation, and repatriation for non-resident Indians.",
    overview:
      "We simplify cross-border wealth for NRIs — managing India-based investments, navigating FEMA and DTAA, handling NRE/NRO accounts, and coordinating repatriation, all through a single, accountable relationship.",
    benefits: [
      "NRE/NRO/FCNR account and portfolio management",
      "FEMA-compliant investing and repatriation support",
      "DTAA relief and cross-border tax coordination",
      "Real-estate and inheritance advisory in India",
      "Single point of contact across time zones",
    ],
    process: [
      { title: "Onboarding", description: "Set up compliant account and investment structure." },
      { title: "Strategy", description: "Design a cross-border, goal-based portfolio." },
      { title: "Execution", description: "Invest, file taxes and manage repatriation." },
      { title: "Review", description: "Coordinate across jurisdictions on an ongoing basis." },
    ],
    faqs: [
      {
        question: "Can you help with repatriation of funds?",
        answer:
          "Yes, we guide FEMA-compliant repatriation from NRO/NRE accounts, including documentation and limits.",
      },
      {
        question: "Do you handle DTAA relief?",
        answer:
          "We coordinate double-taxation-avoidance relief so you are not taxed twice on the same income where treaties apply.",
      },
      {
        question: "Which countries do you support NRIs in?",
        answer:
          "We work with NRIs across the US, UK, UAE, Singapore, Australia and beyond, coordinating across time zones.",
      },
    ],
    highlight: true,
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const serviceNames = services.map((s) => s.name);
