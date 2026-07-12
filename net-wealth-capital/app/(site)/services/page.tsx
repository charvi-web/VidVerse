import { CheckCircle2 } from "lucide-react";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/marketing/service-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { services } from "@/lib/services";
import { generalFaqs, processSteps } from "@/lib/site";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page py-16 md:py-24">
          <Eyebrow>Our Services</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Integrated wealth solutions for every financial decision.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            From portfolio strategy to tax, insurance, retirement, estate and NRI support,
            our services work together as one coordinated wealth plan.
          </p>
        </div>
      </section>

      <Section>
        <div className="mb-12">
          <SectionHeading
            eyebrow="What we offer"
            title="Advice across the full wealth lifecycle"
            description="Choose a focused service or work with us across your complete financial life."
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="mb-12">
          <SectionHeading
            align="center"
            eyebrow="How we work"
            title="A structured process from discovery to ongoing review"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((step) => (
            <div key={step.step} className="rounded-xl border border-border bg-card p-6">
              <div className="flex size-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {step.step}
              </div>
              <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          {["Fiduciary advice", "Transparent fees", "Quarterly reviews"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4 text-primary" /> {item}
            </span>
          ))}
        </div>
      </Section>

      <FaqSection items={generalFaqs} className="bg-background" />
      <CtaBand />
    </>
  );
}
