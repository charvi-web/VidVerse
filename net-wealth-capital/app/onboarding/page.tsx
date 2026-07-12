"use client";

import * as React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Target,
  PiggyBank,
  Receipt,
  ShieldCheck,
  Landmark,
  LogOut,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "@/lib/services";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Steps } from "@/components/ui/steps";
import { Badge } from "@/components/ui/badge";

const wizardSteps = [
  { label: "Personal", description: "Your details" },
  { label: "Financial", description: "Your profile" },
  { label: "Services", description: "What you need" },
  { label: "Goals", description: "Your priorities" },
  { label: "Review", description: "Confirm & submit" },
];

const incomeRanges = [
  "Up to ₹10,00,000",
  "₹10,00,000 – ₹25,00,000",
  "₹25,00,000 – ₹45,00,000",
  "₹45,00,000 – ₹60,00,000",
  "₹60,00,000 – ₹1,00,00,000",
  "Above ₹1,00,00,000",
];

const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Professional"];

const riskLevels = [
  { key: "Conservative", desc: "Prioritise capital protection over growth." },
  { key: "Moderate", desc: "Balance growth with measured, managed risk." },
  { key: "Aggressive", desc: "Maximise long-term growth, tolerate volatility." },
];

const goalOptions = [
  { key: "Wealth Creation", icon: Target, desc: "Grow your net worth over time." },
  { key: "Retirement", icon: PiggyBank, desc: "Build a corpus for financial freedom." },
  { key: "Tax Saving", icon: Receipt, desc: "Optimise and reduce your tax outgo." },
  { key: "Insurance", icon: ShieldCheck, desc: "Protect your family and income." },
  { key: "Estate Planning", icon: Landmark, desc: "Pass on wealth seamlessly." },
];

type FormState = {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  pan: string;
  city: string;
  occupation: string;
  income: string;
  investments: string;
  experience: string;
  risk: string;
  services: string[];
  goals: string[];
};

const initialForm: FormState = {
  name: "",
  email: "",
  mobile: "",
  dob: "",
  pan: "",
  city: "",
  occupation: "",
  income: "",
  investments: "",
  experience: "",
  risk: "Moderate",
  services: [],
  goals: [],
};

export default function OnboardingPage() {
  const [step, setStep] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(initialForm);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggle = (key: "services" | "goals", value: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(value)
        ? f[key].filter((v) => v !== value)
        : [...f[key], value],
    }));

  const next = () => setStep((s) => Math.min(wizardSteps.length - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  if (submitted) {
    return (
      <div className="flex min-h-svh flex-col bg-muted/40">
        <TopBar />
        <main className="flex flex-1 items-center justify-center px-4 py-16">
          <Card className="w-full max-w-lg p-8 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/12 text-primary">
              <CheckCircle2 className="size-9" />
            </span>
            <h1 className="mt-6 text-2xl font-semibold text-foreground">
              You’re all set, {form.name.split(" ")[0] || "there"}!
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your onboarding is complete. Your dedicated advisor will review your profile and
              reach out within 24 hours to schedule your first consultation.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-secondary/40 p-4 text-left">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Selected services
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {(form.services.length
                  ? form.services.map((s) => services.find((x) => x.slug === s)?.name ?? s)
                  : ["To be discussed"]
                ).map((s) => (
                  <Badge key={s} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="flex-1">
                <Link href="/portal">
                  Go to Dashboard <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/book">Book Consultation</Link>
              </Button>
            </div>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col bg-muted/40">
      <TopBar />
      <main className="flex-1 px-4 py-8 md:py-12">
        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold text-foreground md:text-3xl">
              Let’s set up your account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A few quick steps so we can tailor your wealth plan.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm md:p-6">
            <Steps steps={wizardSteps} current={step} />
          </div>

          <Card className="mt-6 p-6 md:p-8">
            {step === 0 && (
              <StepBlock
                title="Personal Information"
                description="Tell us who you are. This helps us verify your identity and personalise your plan."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Full Name" required>
                    <Input
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Aarav Sharma"
                    />
                  </Field>
                  <Field label="Email" required>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field label="Mobile Number" required>
                    <Input
                      value={form.mobile}
                      onChange={(e) => update("mobile", e.target.value)}
                      placeholder="+91 98765 43210"
                    />
                  </Field>
                  <Field label="Date of Birth">
                    <Input
                      type="date"
                      value={form.dob}
                      onChange={(e) => update("dob", e.target.value)}
                    />
                  </Field>
                  <Field label="PAN Number" hint="Required for investment & tax services">
                    <Input
                      value={form.pan}
                      onChange={(e) => update("pan", e.target.value.toUpperCase())}
                      placeholder="ABCPS1234K"
                      maxLength={10}
                    />
                  </Field>
                  <Field label="City">
                    <Input
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      placeholder="Pune"
                    />
                  </Field>
                </div>
              </StepBlock>
            )}

            {step === 1 && (
              <StepBlock
                title="Financial Profile"
                description="Understanding your finances helps us recommend a suitable, goal-based strategy."
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Occupation">
                    <Input
                      value={form.occupation}
                      onChange={(e) => update("occupation", e.target.value)}
                      placeholder="e.g. Product Manager"
                    />
                  </Field>
                  <Field label="Annual Income">
                    <Select
                      value={form.income}
                      onChange={(e) => update("income", e.target.value)}
                    >
                      <option value="">Select range</option>
                      {incomeRanges.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Investment Experience">
                    <Select
                      value={form.experience}
                      onChange={(e) => update("experience", e.target.value)}
                    >
                      <option value="">Select level</option>
                      {experienceLevels.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="Existing Investments" className="sm:col-span-2">
                    <Textarea
                      value={form.investments}
                      onChange={(e) => update("investments", e.target.value)}
                      placeholder="e.g. Mutual funds ₹15L, EPF ₹8L, direct equity ₹5L, FDs ₹10L…"
                    />
                  </Field>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground">Risk Appetite</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {riskLevels.map((r) => (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => update("risk", r.key)}
                        className={cn(
                          "rounded-xl border p-4 text-left transition-colors",
                          form.risk === r.key
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <span className="text-sm font-semibold text-foreground">{r.key}</span>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {r.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </StepBlock>
            )}

            {step === 2 && (
              <StepBlock
                title="Select Required Services"
                description="Choose the services you’re interested in. You can always add more later."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => {
                    const Icon = service.icon;
                    const selected = form.services.includes(service.slug);
                    return (
                      <button
                        key={service.slug}
                        type="button"
                        onClick={() => toggle("services", service.slug)}
                        className={cn(
                          "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
                          selected
                            ? "border-primary bg-primary/5 ring-1 ring-primary"
                            : "border-border hover:border-primary/40"
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-10 shrink-0 items-center justify-center rounded-lg",
                            selected ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className="flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-foreground">
                              {service.name}
                            </span>
                            {selected && <CheckCircle2 className="size-4 text-primary" />}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                            {service.tagline}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </StepBlock>
            )}

            {step === 3 && (
              <StepBlock
                title="Financial Goals"
                description="What matters most to you? This shapes how we prioritise your plan."
              >
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {goalOptions.map((goal) => {
                    const Icon = goal.icon;
                    const selected = form.goals.includes(goal.key);
                    return (
                      <button
                        key={goal.key}
                        type="button"
                        onClick={() => toggle("goals", goal.key)}
                        className={cn(
                          "flex flex-col rounded-xl border p-5 text-left transition-colors",
                          selected
                            ? "border-accent bg-accent/5 ring-1 ring-accent"
                            : "border-border hover:border-accent/40"
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-10 items-center justify-center rounded-lg",
                            selected ? "bg-accent text-accent-foreground" : "bg-accent/10 text-primary"
                          )}
                        >
                          <Icon className="size-5" />
                        </span>
                        <span className="mt-3 text-sm font-semibold text-foreground">
                          {goal.key}
                        </span>
                        <span className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {goal.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </StepBlock>
            )}

            {step === 4 && (
              <StepBlock
                title="Review & Submit"
                description="Please confirm your details before we set up your account."
              >
                <div className="space-y-5">
                  <ReviewGroup
                    title="Personal Information"
                    onEdit={() => setStep(0)}
                    rows={[
                      ["Full Name", form.name],
                      ["Email", form.email],
                      ["Mobile", form.mobile],
                      ["Date of Birth", form.dob],
                      ["PAN", form.pan],
                      ["City", form.city],
                    ]}
                  />
                  <ReviewGroup
                    title="Financial Profile"
                    onEdit={() => setStep(1)}
                    rows={[
                      ["Occupation", form.occupation],
                      ["Annual Income", form.income],
                      ["Experience", form.experience],
                      ["Risk Appetite", form.risk],
                      ["Existing Investments", form.investments],
                    ]}
                  />
                  <ReviewGroup
                    title="Services"
                    onEdit={() => setStep(2)}
                    chips={
                      form.services.map(
                        (s) => services.find((x) => x.slug === s)?.name ?? s
                      )
                    }
                  />
                  <ReviewGroup
                    title="Goals"
                    onEdit={() => setStep(3)}
                    chips={form.goals}
                  />
                </div>
              </StepBlock>
            )}

            {/* Footer nav */}
            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={back}
                className={cn(step === 0 && "invisible")}
              >
                <ArrowLeft className="size-4" /> Back
              </Button>
              <p className="text-xs text-muted-foreground">
                Step {step + 1} of {wizardSteps.length}
              </p>
              {step < wizardSteps.length - 1 ? (
                <Button type="button" onClick={next}>
                  Continue <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button type="button" variant="accent" onClick={() => setSubmitted(true)}>
                  <CheckCircle2 className="size-4" /> Complete Onboarding
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <header className="border-b border-border bg-card">
      <div className="container-page flex h-16 items-center justify-between">
        <Logo />
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Save &amp; exit <LogOut className="size-4" />
        </Link>
      </div>
    </header>
  );
}

function StepBlock({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function ReviewGroup({
  title,
  onEdit,
  rows,
  chips,
}: {
  title: string;
  onEdit: () => void;
  rows?: [string, string][];
  chips?: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-secondary/30 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-medium text-primary hover:underline"
        >
          Edit
        </button>
      </div>
      {rows && (
        <dl className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
          {rows.map(([k, v]) => (
            <div key={k} className="flex flex-col">
              <dt className="text-xs text-muted-foreground">{k}</dt>
              <dd className="text-sm text-foreground">{v || "—"}</dd>
            </div>
          ))}
        </dl>
      )}
      {chips && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {chips.length ? (
            chips.map((c) => (
              <Badge key={c} variant="secondary">
                {c}
              </Badge>
            ))
          ) : (
            <span className="text-sm text-muted-foreground">None selected</span>
          )}
        </div>
      )}
    </div>
  );
}
