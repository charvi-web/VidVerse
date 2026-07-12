import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Star,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/services";
import { brand, whyPillars, processSteps, testimonials, generalFaqs } from "@/lib/site";
import { ServiceCard } from "@/components/marketing/service-card";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";

const stats = [
  { label: "Assets advised", value: brand.amc },
  { label: "Families served", value: brand.clients },
  { label: "Years of experience", value: brand.experience },
  { label: "Client retention", value: brand.retention },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="glow-orb left-[-6rem] top-[-4rem] size-[26rem] bg-[var(--brand-primary)]" />
        <div className="glow-orb right-[-8rem] top-[2rem] size-[30rem] bg-[var(--brand-secondary)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-primary/[0.06] to-transparent" />
        <div className="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Badge variant="accent" className="gap-1.5">
              <ShieldCheck className="size-3.5" /> SEBI Registered Investment Advisor
            </Badge>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
              Grow, protect &amp; pass on your{" "}
              <span className="gradient-text-brand">wealth</span> with confidence.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {brand.name} is your independent, fiduciary wealth partner — combining
              personalised advice across investments, tax, insurance, retirement and
              estate planning into one accountable relationship.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/book">
                  Book a Free Consultation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Fee-only advice", "No hidden commissions", "Your assets stay in your name"].map(
                (item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="size-4 text-primary" /> {item}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Hero visual card */}
          <div className="relative">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Portfolio value</p>
                  <p className="mt-1 text-3xl font-semibold text-foreground">
                    ₹1,24,80,000
                  </p>
                </div>
                <Badge variant="success" className="gap-1">
                  <TrendingUp className="size-3.5" /> +14.2%
                </Badge>
              </div>
              <div className="mt-6 flex h-32 items-end gap-2">
                {[40, 55, 48, 62, 70, 66, 82, 78, 92, 88, 100].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary/20 to-primary"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { k: "Equity", v: "58%" },
                  { k: "Debt", v: "32%" },
                  { k: "Alt", v: "10%" },
                ].map((a) => (
                  <div key={a.k} className="rounded-lg bg-secondary p-3 text-center">
                    <p className="text-xs text-muted-foreground">{a.k}</p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground">{a.v}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card p-4 shadow-lg sm:block">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-xs font-medium text-foreground">
                Rated 4.9/5 by {brand.clients} clients
              </p>
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="border-y border-border bg-secondary/40">
          <div className="container-page grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-semibold text-foreground">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company intro */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <SectionHeading
            eyebrow="Who we are"
            title="A modern wealth firm built on trust, not products."
            description={`${brand.name} was founded on a simple belief: financial advice should be personal, transparent and free of conflicts. We are not distributors chasing commissions — we are advisors accountable to your goals.`}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Independent & fiduciary", body: "Advice built around you, never a sales target." },
              { title: "One relationship", body: "Investments, tax, insurance, retirement & estate — unified." },
              { title: "Transparent fees", body: "Clear advisory fees disclosed upfront, always." },
              { title: "Always accessible", body: "A dedicated advisor and a real-time client portal." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-5">
                <CheckCircle2 className="size-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services overview */}
      <Section className="bg-secondary/30">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="What we do"
            title="Comprehensive wealth solutions"
            description="Six integrated services covering every dimension of your financial life."
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/services">
              View all services <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      {/* Why choose */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Why NWealth Capital"
          title="Reasons clients trust us with their future"
          description="We combine two decades of experience with a genuinely client-first, transparent way of working."
          className="mb-12"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyPillars.map((pillar, i) => (
            <div key={pillar.title} className="rounded-xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-semibold text-foreground">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
          <div className="surface-dark flex flex-col justify-between rounded-xl p-6 text-white">
            <p className="text-lg font-medium leading-snug">
              “Advice you can trust, from a partner who is always on your side.”
            </p>
            <Button asChild variant="gold" className="mt-6 self-start">
              <Link href="/why-nwealth">
                Why NWealth <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-secondary/30">
        <SectionHeading
          align="center"
          eyebrow="How it works"
          title="Your journey with us in four simple steps"
          className="mb-12"
        />
        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step, i) => (
            <div key={step.step} className="relative">
              {i < processSteps.length - 1 && (
                <div className="absolute left-12 top-6 hidden h-px w-full bg-border md:block" />
              )}
              <div className="relative flex size-12 items-center justify-center rounded-full border border-primary/20 bg-background text-lg font-semibold text-primary">
                {step.step}
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="Trusted by families, founders and NRIs"
          className="mb-12"
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <FaqSection
        items={generalFaqs}
        description="Everything you need to know about working with NWealth Capital. Can’t find an answer? Reach out any time."
        className="bg-secondary/30"
      />

      {/* CTA */}
      <CtaBand />
    </>
  );
}
