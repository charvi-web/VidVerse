import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { ServiceCard } from "@/components/marketing/service-card";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  return { title: service?.name ?? "Service" };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);

  if (!service) notFound();

  const Icon = service.icon;
  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="container-page grid gap-10 py-16 md:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="flex size-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <Icon className="size-9" />
          </div>
          <div>
            <Eyebrow>{service.shortName}</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              {service.name}
            </h1>
            <p className="mt-4 text-xl text-primary">{service.tagline}</p>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
              {service.overview}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/book">
                  Book Consultation <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to an advisor</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="mb-12">
          <SectionHeading
            eyebrow="Benefits"
            title={`What ${service.name.toLowerCase()} helps you achieve`}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((benefit) => (
            <Card key={benefit} className="p-5">
              <CheckCircle2 className="size-5 text-primary" />
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{benefit}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/30">
        <div className="mb-12">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="A clear path from assessment to ongoing support"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {service.process.map((step, index) => (
            <div key={step.title} className="relative rounded-xl border border-border bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mb-12">
          <SectionHeading eyebrow="Other services" title="Explore more ways we can help" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherServices.map((item) => (
            <ServiceCard key={item.slug} service={item} />
          ))}
        </div>
      </Section>

      <FaqSection items={service.faqs} className="bg-secondary/30" />
      <CtaBand title={`Interested in ${service.name}?`} />
    </>
  );
}
