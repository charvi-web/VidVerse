import { CheckCircle2, Eye, Sparkles, Target } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { brand, coreValues, leadership } from "@/lib/site";

export const metadata = { title: "About" };

const stats = [
  { label: "Years of experience", value: brand.experience },
  { label: "Client families", value: brand.clients },
  { label: "Assets advised", value: brand.amc },
  { label: "Client retention", value: brand.retention },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-secondary/30">
        <div className="absolute inset-0 opacity-40" />
        <div className="container-page relative py-16 md:py-24">
          <Eyebrow>About Us</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Independent wealth advice built around your life.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {brand.description}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
                <p className="text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <SectionHeading
            eyebrow="Company overview"
            title="A fiduciary partner for every chapter of wealth."
          />
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              {brand.name} is an independent wealth-management firm serving individuals,
              families, founders and NRIs who want advice that is coordinated, transparent
              and free from product pressure.
            </p>
            <p>
              As fiduciaries, we place your interests first. Our recommendations are shaped by
              your goals, cash flows, risk appetite and family priorities — not by commissions
              or sales targets.
            </p>
            <p>
              From investments and tax to insurance, retirement and estate planning, we bring
              each moving part into one accountable relationship so your financial life feels
              simpler and more deliberate.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Target className="size-5" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                To help clients make confident financial decisions through independent,
                research-backed advice that protects what they have built and funds what
                matters most.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Eye className="size-5" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">
                To be the most trusted fiduciary wealth partner for Indian families globally —
                recognised for clarity, integrity and long-term stewardship.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="mb-12">
          <SectionHeading
            eyebrow="Core values"
            title="Principles that guide every recommendation"
            description="Our culture is shaped by trust, transparency and accountability to client outcomes."
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((value, index) => (
            <Card key={value.title}>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  {index % 2 === 0 ? <CheckCircle2 className="size-5" /> : <Sparkles className="size-5" />}
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Leadership"
            title="Experienced specialists, one accountable team"
            description="Meet the people responsible for your strategy, execution and ongoing support."
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {leadership.map((member) => (
            <Card key={member.name}>
              <CardHeader>
                <Avatar name={member.name} />
                <CardTitle className="mt-4">{member.name}</CardTitle>
                <p className="text-sm font-medium text-primary">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="surface-dark rounded-3xl p-8 text-white md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <Eyebrow>Client commitment</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                We promise advice that is clear, conflict-free and accountable.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
                Every plan is designed to preserve your confidence through changing markets,
                tax rules and life events.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-white/85">
              {["Your interests come first in every recommendation", "Fees and risks are explained before action", "Your assets remain in your name with regulated custodians", "Your advisor remains accessible through reviews and life events"].map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-neutral-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
