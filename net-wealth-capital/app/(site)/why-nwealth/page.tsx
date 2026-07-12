import { Award, Handshake, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { generalFaqs, testimonials, whyPillars } from "@/lib/site";

export const metadata = { title: "Why NWealth" };

const pillarIcons = [Award, Handshake, ShieldCheck, Users, Sparkles];

export default function WhyNwealthPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-16 md:py-24">
          <Eyebrow>Why NWealth</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Advice designed for trust, clarity and long-term outcomes.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            We combine experienced specialists, transparent processes and fiduciary discipline
            so your wealth plan remains aligned to what matters most.
          </p>
        </div>
      </section>

      <Section>
        <div className="mb-12">
          <SectionHeading
            eyebrow="Our difference"
            title="Five reasons clients choose NWealth Capital"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyPillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? Sparkles;
            return (
              <Card key={pillar.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <CardTitle className="pt-2">{pillar.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="mb-12">
          <SectionHeading
            align="center"
            eyebrow="The NWealth difference"
            title="A better advisory relationship"
          />
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-muted/60">
            <CardHeader>
              <CardTitle className="text-2xl text-muted-foreground">
                Typical distributor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["Product-first recommendations", "Commissions embedded in products", "Fragmented advice across vendors", "Periodic contact only around transactions", "Limited visibility into portfolio decisions"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 size-1.5 rounded-full bg-muted-foreground" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">NWealth Capital</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-primary-foreground/85">
                {["Goal-first fiduciary advice", "Transparent fees disclosed upfront", "Investments, tax, insurance and estate coordinated", "Structured reviews with a dedicated advisor", "Real-time dashboards and plain-English reporting"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <div className="mb-12">
          <SectionHeading
            align="center"
            eyebrow="Testimonials"
            title="What clients say about working with us"
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
      </Section>

      <FaqSection items={generalFaqs} className="bg-secondary/30" />
      <CtaBand />
    </>
  );
}
