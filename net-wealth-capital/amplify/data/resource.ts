import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/**
 * NWealth Capital — data model.
 *
 * Models cover the full client journey: public consultation bookings and
 * contact enquiries, client onboarding profiles, and the operational records
 * managed in the admin portal (leads, service requests, consultations,
 * documents, invoices and messages).
 *
 * Authorization:
 *  - guests can create bookings / contact enquiries (public funnels),
 *  - clients own their profile, documents, invoices and messages,
 *  - the ADMIN group manages operational records.
 */
const schema = a.schema({
  ServiceType: a.enum([
    "INVESTMENT_ADVISORY",
    "TAXATION_COMPLIANCE",
    "INSURANCE_ADVISORY",
    "RETIREMENT_PLANNING",
    "ESTATE_PLANNING",
    "NRI_WEALTH",
  ]),

  RiskAppetite: a.enum(["CONSERVATIVE", "MODERATE", "AGGRESSIVE"]),

  ConsultationStatus: a.enum([
    "REQUESTED",
    "CONFIRMED",
    "COMPLETED",
    "CANCELLED",
    "RESCHEDULED",
  ]),

  RequestStatus: a.enum(["NEW", "IN_PROGRESS", "ON_HOLD", "COMPLETED"]),

  LeadStatus: a.enum([
    "NEW",
    "CONTACTED",
    "QUALIFIED",
    "CONVERTED",
    "LOST",
  ]),

  InvoiceStatus: a.enum(["DRAFT", "DUE", "PAID", "OVERDUE"]),

  // Public consultation booking funnel
  Booking: a
    .model({
      fullName: a.string().required(),
      email: a.email().required(),
      phone: a.phone(),
      service: a.ref("ServiceType"),
      preferredDate: a.date(),
      preferredTime: a.string(),
      notes: a.string(),
      status: a.ref("ConsultationStatus"),
    })
    .authorization((allow) => [
      allow.guest().to(["create"]),
      allow.authenticated().to(["create"]),
      allow.groups(["ADMIN"]),
    ]),

  // Public contact enquiries
  Enquiry: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.phone(),
      subject: a.string(),
      message: a.string().required(),
    })
    .authorization((allow) => [
      allow.guest().to(["create"]),
      allow.groups(["ADMIN"]),
    ]),

  // Sales pipeline (admin/advisor)
  Lead: a
    .model({
      name: a.string().required(),
      email: a.email(),
      phone: a.phone(),
      service: a.ref("ServiceType"),
      source: a.string(),
      status: a.ref("LeadStatus"),
      assignedAdvisor: a.string(),
      notes: a.string(),
    })
    .authorization((allow) => [allow.groups(["ADMIN"])]),

  // Client onboarding profile — owned by the client
  ClientProfile: a
    .model({
      fullName: a.string().required(),
      email: a.email(),
      mobile: a.phone(),
      dateOfBirth: a.date(),
      pan: a.string(),
      city: a.string(),
      occupation: a.string(),
      annualIncome: a.string(),
      existingInvestments: a.string(),
      investmentExperience: a.string(),
      riskAppetite: a.ref("RiskAppetite"),
      selectedServices: a.ref("ServiceType").array(),
      goals: a.string().array(),
      onboardingComplete: a.boolean().default(false),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["ADMIN"]).to(["read", "update"]),
    ]),

  // Consultations / meetings
  Consultation: a
    .model({
      service: a.ref("ServiceType"),
      advisor: a.string(),
      scheduledAt: a.datetime(),
      mode: a.string(),
      status: a.ref("ConsultationStatus"),
      notes: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["ADMIN"]),
    ]),

  // Ongoing engagements
  ServiceRequest: a
    .model({
      service: a.ref("ServiceType").required(),
      advisor: a.string(),
      status: a.ref("RequestStatus"),
      progress: a.integer().default(0),
      summary: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["ADMIN"]),
    ]),

  // Secure document metadata (files stored in Amplify Storage)
  Document: a
    .model({
      name: a.string().required(),
      category: a.string(),
      storageKey: a.string(),
      sizeBytes: a.integer(),
      uploadedBy: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["ADMIN"]),
    ]),

  // Billing
  Invoice: a
    .model({
      number: a.string().required(),
      description: a.string(),
      amount: a.integer().required(),
      dueDate: a.date(),
      status: a.ref("InvoiceStatus"),
    })
    .authorization((allow) => [
      allow.owner().to(["read"]),
      allow.groups(["ADMIN"]),
    ]),

  // Client <> advisor messaging
  Message: a
    .model({
      body: a.string().required(),
      senderName: a.string(),
      fromAdvisor: a.boolean().default(false),
      threadId: a.string(),
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(["ADMIN"]),
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    // API key retained for public read where needed during development
    apiKeyAuthorizationMode: { expiresInDays: 30 },
  },
});
