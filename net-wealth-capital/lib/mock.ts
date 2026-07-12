import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UserCircle,
  Briefcase,
  CalendarDays,
  FileText,
  CreditCard,
  MessageSquare,
  LifeBuoy,
  Settings,
  Users,
  UserPlus,
  ClipboardList,
  BarChart3,
  ShieldCheck,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export const portalNav: NavItem[] = [
  { label: "Dashboard", href: "/portal", icon: LayoutDashboard },
  { label: "My Profile", href: "/portal/profile", icon: UserCircle },
  { label: "My Services", href: "/portal/services", icon: Briefcase },
  { label: "Consultations", href: "/portal/consultations", icon: CalendarDays },
  { label: "Documents", href: "/portal/documents", icon: FileText },
  { label: "Payments", href: "/portal/payments", icon: CreditCard },
  { label: "Messages", href: "/portal/messages", icon: MessageSquare, badge: "2" },
  { label: "Support", href: "/portal/support", icon: LifeBuoy },
  { label: "Settings", href: "/portal/settings", icon: Settings },
];

export const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: UserPlus, badge: "6" },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Consultations", href: "/admin/consultations", icon: CalendarDays },
  { label: "Service Requests", href: "/admin/service-requests", icon: ClipboardList },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Documents", href: "/admin/documents", icon: FileText },
  { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  { label: "Users", href: "/admin/users", icon: ShieldCheck },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export type StatusTone = "success" | "warning" | "info" | "destructive" | "secondary" | "default";

export const currentClient = {
  name: "Aarav Sharma",
  email: "aarav.sharma@example.com",
  phone: "+91 91234 56789",
  city: "Pune",
  dob: "1988-04-12",
  pan: "ABCPS1234K",
  occupation: "Senior Product Manager",
  income: "₹45,00,000 – ₹60,00,000",
  riskAppetite: "Moderate–Aggressive",
  experience: "Intermediate",
  advisor: "Priya Deshmukh",
  memberSince: "2023-06-18",
  clientId: "NW-2023-0417",
};

export const notifications = [
  { id: 1, title: "Consultation confirmed", body: "Your review call with Priya is confirmed for 4 Jul, 11:00 AM.", time: "2h ago", tone: "info" as StatusTone },
  { id: 2, title: "New document available", body: "Q2 Portfolio Review report has been shared with you.", time: "1d ago", tone: "success" as StatusTone },
  { id: 3, title: "Invoice due", body: "Advisory fee invoice INV-2041 is due on 10 Jul.", time: "2d ago", tone: "warning" as StatusTone },
  { id: 4, title: "KYC update requested", body: "Please re-verify your address proof to stay compliant.", time: "4d ago", tone: "warning" as StatusTone },
];

export const quickActions = [
  { label: "Book Consultation", href: "/book", icon: CalendarDays },
  { label: "Upload Document", href: "/portal/documents", icon: FileText },
  { label: "Message Advisor", href: "/portal/messages", icon: MessageSquare },
  { label: "View Payments", href: "/portal/payments", icon: CreditCard },
];

export interface Consultation {
  id: string;
  service: string;
  advisor: string;
  date: string;
  time: string;
  mode: "Video Call" | "In-Person" | "Phone";
  status: "Upcoming" | "Completed" | "Cancelled";
}

export const consultations: Consultation[] = [
  { id: "CN-5012", service: "Portfolio Review", advisor: "Priya Deshmukh", date: "2026-07-04", time: "11:00 AM", mode: "Video Call", status: "Upcoming" },
  { id: "CN-5008", service: "Tax Planning", advisor: "Arjun Kapoor", date: "2026-07-14", time: "03:30 PM", mode: "Video Call", status: "Upcoming" },
  { id: "CN-4990", service: "Retirement Planning", advisor: "Priya Deshmukh", date: "2026-06-12", time: "10:00 AM", mode: "In-Person", status: "Completed" },
  { id: "CN-4971", service: "Insurance Review", advisor: "Meera Raghunathan", date: "2026-05-28", time: "05:00 PM", mode: "Phone", status: "Completed" },
  { id: "CN-4952", service: "Investment Advisory", advisor: "Naveen Wadhwa", date: "2026-05-09", time: "02:00 PM", mode: "Video Call", status: "Cancelled" },
];

export interface ServiceRequest {
  id: string;
  service: string;
  requested: string;
  advisor: string;
  progress: number;
  status: "New" | "In Progress" | "Completed" | "On Hold";
}

export const serviceRequests: ServiceRequest[] = [
  { id: "SR-3301", service: "Investment Advisory", requested: "2026-06-20", advisor: "Naveen Wadhwa", progress: 70, status: "In Progress" },
  { id: "SR-3298", service: "Taxation & Compliance", requested: "2026-06-18", advisor: "Arjun Kapoor", progress: 40, status: "In Progress" },
  { id: "SR-3285", service: "Retirement Planning", requested: "2026-05-30", advisor: "Priya Deshmukh", progress: 100, status: "Completed" },
  { id: "SR-3270", service: "Insurance Advisory", requested: "2026-06-25", advisor: "Meera Raghunathan", progress: 10, status: "New" },
];

export interface Invoice {
  id: string;
  description: string;
  date: string;
  amount: number;
  status: "Paid" | "Due" | "Overdue";
}

export const invoices: Invoice[] = [
  { id: "INV-2041", description: "Advisory Fee — Q3 2026", date: "2026-07-01", amount: 45000, status: "Due" },
  { id: "INV-2033", description: "Tax Filing — FY 2025-26", date: "2026-06-15", amount: 18000, status: "Paid" },
  { id: "INV-2019", description: "Advisory Fee — Q2 2026", date: "2026-04-01", amount: 45000, status: "Paid" },
  { id: "INV-2004", description: "Estate Planning Engagement", date: "2026-03-10", amount: 60000, status: "Paid" },
];

export interface Transaction {
  id: string;
  method: string;
  date: string;
  amount: number;
  status: "Success" | "Pending" | "Failed";
}

export const transactions: Transaction[] = [
  { id: "TXN-88213", method: "UPI · HDFC", date: "2026-06-15", amount: 18000, status: "Success" },
  { id: "TXN-87540", method: "Net Banking · ICICI", date: "2026-04-02", amount: 45000, status: "Success" },
  { id: "TXN-86991", method: "Card · Visa ••42", date: "2026-03-11", amount: 60000, status: "Success" },
];

export interface Doc {
  id: string;
  name: string;
  category: string;
  size: string;
  date: string;
  owner: string;
}

export const documents: Doc[] = [
  { id: "D-901", name: "Q2 Portfolio Review.pdf", category: "Reports", size: "2.4 MB", date: "2026-06-28", owner: "NWealth" },
  { id: "D-889", name: "PAN Card.jpg", category: "KYC", size: "480 KB", date: "2026-06-18", owner: "You" },
  { id: "D-882", name: "ITR Acknowledgement FY25.pdf", category: "Tax", size: "310 KB", date: "2026-06-15", owner: "NWealth" },
  { id: "D-870", name: "Investment Policy Statement.pdf", category: "Advisory", size: "1.1 MB", date: "2026-05-30", owner: "NWealth" },
  { id: "D-855", name: "Term Insurance Policy.pdf", category: "Insurance", size: "900 KB", date: "2026-05-12", owner: "You" },
];

export interface MessageThread {
  id: string;
  from: string;
  role: string;
  preview: string;
  time: string;
  unread: boolean;
}

export const messageThreads: MessageThread[] = [
  { id: "M-1", from: "Priya Deshmukh", role: "Financial Planner", preview: "I've shared your Q2 review — let's discuss rebalancing on our call.", time: "2h ago", unread: true },
  { id: "M-2", from: "Arjun Kapoor", role: "Tax Advisor", preview: "Please upload your latest Form 16 so we can begin planning.", time: "1d ago", unread: true },
  { id: "M-3", from: "Meera Raghunathan", role: "Client Experience", preview: "Welcome aboard! Here's how to make the most of your portal.", time: "3d ago", unread: false },
];

export const conversation = [
  { from: "advisor", name: "Priya Deshmukh", text: "Hi Aarav! I've just shared your Q2 Portfolio Review in your Documents.", time: "10:24 AM" },
  { from: "advisor", name: "Priya Deshmukh", text: "Overall your equity allocation has drifted a little high — I'd suggest we rebalance ~5% into debt.", time: "10:25 AM" },
  { from: "client", name: "You", text: "Thanks Priya! That makes sense. Can we go over it on Friday's call?", time: "10:31 AM" },
  { from: "advisor", name: "Priya Deshmukh", text: "Absolutely — I'll prepare a couple of options for you. See you at 11 on the 4th.", time: "10:33 AM" },
];

export interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  updated: string;
  status: "Open" | "In Progress" | "Resolved";
}

export const supportTickets: SupportTicket[] = [
  { id: "TCK-207", subject: "Unable to download Q2 report on mobile", category: "Technical", updated: "2026-06-27", status: "In Progress" },
  { id: "TCK-198", subject: "Question about advisory fee invoice", category: "Billing", updated: "2026-06-20", status: "Resolved" },
];

export const supportFaqs = [
  { question: "How do I book or reschedule a consultation?", answer: "Go to Consultations or Book a Consultation, pick a service and slot. To reschedule, open the consultation and choose Reschedule." },
  { question: "How do I upload KYC documents securely?", answer: "Head to Documents → Upload. Files are encrypted in transit and at rest, and only visible to your advisory team." },
  { question: "How do I change my registered email or phone?", answer: "Open Settings → Security, or contact your advisor. Some changes require re-verification for compliance." },
  { question: "Who can see my financial data?", answer: "Only your assigned advisory team. Your investments remain in your name with regulated custodians." },
];

/* ---------------- Admin mock data ---------------- */

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  source: string;
  created: string;
  advisor: string;
  status: "New" | "Contacted" | "Qualified" | "Converted" | "Lost";
}

export const leads: Lead[] = [
  { id: "LD-7788", name: "Karan Malhotra", email: "karan.m@example.com", phone: "+91 90000 11111", service: "Investment Advisory", source: "Website", created: "2026-06-29", advisor: "Unassigned", status: "New" },
  { id: "LD-7784", name: "Sneha Patil", email: "sneha.p@example.com", phone: "+91 90000 22222", service: "Retirement Planning", source: "Referral", created: "2026-06-28", advisor: "Priya Deshmukh", status: "Contacted" },
  { id: "LD-7779", name: "Imran Sheikh", email: "imran.s@example.com", phone: "+971 50 123 4567", service: "NRI Wealth Management", source: "LinkedIn", created: "2026-06-27", advisor: "Naveen Wadhwa", status: "Qualified" },
  { id: "LD-7771", name: "Divya Nair", email: "divya.n@example.com", phone: "+91 90000 33333", service: "Taxation & Compliance", source: "Website", created: "2026-06-25", advisor: "Arjun Kapoor", status: "Converted" },
  { id: "LD-7765", name: "Rahul Verma", email: "rahul.v@example.com", phone: "+91 90000 44444", service: "Insurance Advisory", source: "Google Ads", created: "2026-06-24", advisor: "Unassigned", status: "New" },
  { id: "LD-7760", name: "Fatima Khan", email: "fatima.k@example.com", phone: "+91 90000 55555", service: "Estate Planning", source: "Referral", created: "2026-06-22", advisor: "Meera Raghunathan", status: "Lost" },
];

export interface Client {
  id: string;
  name: string;
  email: string;
  city: string;
  services: number;
  aum: number;
  advisor: string;
  joined: string;
  status: "Active" | "Onboarding" | "Dormant";
}

export const clients: Client[] = [
  { id: "NW-2023-0417", name: "Aarav Sharma", email: "aarav.sharma@example.com", city: "Pune", services: 3, aum: 12500000, advisor: "Priya Deshmukh", joined: "2023-06-18", status: "Active" },
  { id: "NW-2022-0311", name: "Neha Gupta", email: "neha.g@example.com", city: "Mumbai", services: 4, aum: 28400000, advisor: "Naveen Wadhwa", joined: "2022-11-02", status: "Active" },
  { id: "NW-2024-0588", name: "Imran Sheikh", email: "imran.s@example.com", city: "Dubai", services: 2, aum: 41000000, advisor: "Naveen Wadhwa", joined: "2024-01-15", status: "Active" },
  { id: "NW-2026-0701", name: "Sneha Patil", email: "sneha.p@example.com", city: "Nashik", services: 1, aum: 3200000, advisor: "Priya Deshmukh", joined: "2026-06-28", status: "Onboarding" },
  { id: "NW-2021-0140", name: "George Mathew", email: "george.m@example.com", city: "Kochi", services: 2, aum: 8700000, advisor: "Arjun Kapoor", joined: "2021-08-19", status: "Dormant" },
];

export const adminActivity = [
  { id: 1, actor: "Priya Deshmukh", action: "converted lead", target: "Divya Nair", time: "35m ago", tone: "success" as StatusTone },
  { id: 2, actor: "System", action: "received payment for", target: "INV-2033 · ₹18,000", time: "1h ago", tone: "success" as StatusTone },
  { id: 3, actor: "Aarav Sharma", action: "uploaded document", target: "PAN Card.jpg", time: "3h ago", tone: "info" as StatusTone },
  { id: 4, actor: "Naveen Wadhwa", action: "scheduled consultation with", target: "Imran Sheikh", time: "5h ago", tone: "info" as StatusTone },
  { id: 5, actor: "New lead", action: "submitted enquiry —", target: "Karan Malhotra", time: "1d ago", tone: "warning" as StatusTone },
];

export interface PlatformUser {
  id: string;
  name: string;
  email: string;
  role: "Administrator" | "Senior Advisor" | "Advisor" | "Support";
  clients: number;
  status: "Active" | "Invited" | "Suspended";
}

export const platformUsers: PlatformUser[] = [
  { id: "U-01", name: "Naveen Wadhwa", email: "naveen@nwealthcapital.com", role: "Administrator", clients: 42, status: "Active" },
  { id: "U-02", name: "Priya Deshmukh", email: "priya@nwealthcapital.com", role: "Senior Advisor", clients: 68, status: "Active" },
  { id: "U-03", name: "Arjun Kapoor", email: "arjun@nwealthcapital.com", role: "Advisor", clients: 51, status: "Active" },
  { id: "U-04", name: "Meera Raghunathan", email: "meera@nwealthcapital.com", role: "Support", clients: 0, status: "Active" },
  { id: "U-05", name: "Sana Qureshi", email: "sana@nwealthcapital.com", role: "Advisor", clients: 12, status: "Invited" },
];

export const revenueByMonth = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 71 },
  { month: "Mar", value: 88 },
  { month: "Apr", value: 79 },
  { month: "May", value: 94 },
  { month: "Jun", value: 108 },
];

export const leadsBySource = [
  { source: "Website", value: 42 },
  { source: "Referral", value: 31 },
  { source: "LinkedIn", value: 18 },
  { source: "Google Ads", value: 15 },
  { source: "Events", value: 9 },
];
