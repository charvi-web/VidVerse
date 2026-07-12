import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { brand } from "@/lib/site";

export const metadata = { title: "Contact" };

const contactCards = [
  {
    title: "Office",
    value: `${brand.address.line1}\n${brand.address.line2}`,
    icon: MapPin,
  },
  { title: "Phone", value: brand.phone, icon: Phone, href: brand.phoneHref },
  { title: "Email", value: brand.email, icon: Mail, href: `mailto:${brand.email}` },
  { title: "Hours", value: brand.hours, icon: Clock },
];

export default function ContactPage() {
  return (
    <>
      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Talk to a wealth advisor.
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Reach out with a question, request a consultation or tell us how we can support
              your wealth journey.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactCards.map((item) => {
                const Icon = item.icon;
                const content = item.value.split("\n").map((line) => <span key={line}>{line}</span>);
                return (
                  <Card key={item.title}>
                    <CardHeader>
                      <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon className="size-5" />
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {item.href ? (
                        <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground">
                          {item.value}
                        </Link>
                      ) : (
                        <p className="flex flex-col text-sm leading-relaxed text-muted-foreground">
                          {content}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <p className="mt-6 rounded-xl bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
              Your first consultation is a no-obligation conversation to understand your goals
              and explain how our advisory process works.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-5">
                <Field label="Full Name" htmlFor="name" required>
                  <Input id="name" name="name" placeholder="Your full name" />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Email" htmlFor="email" required>
                    <Input id="email" name="email" type="email" placeholder="you@example.com" />
                  </Field>
                  <Field label="Phone" htmlFor="phone">
                    <Input id="phone" name="phone" type="tel" placeholder="+91..." />
                  </Field>
                </div>
                <Field label="Subject" htmlFor="subject">
                  <Select id="subject" name="subject" defaultValue="General enquiry">
                    <option>General enquiry</option>
                    <option>Book consultation</option>
                    <option>Existing client support</option>
                    <option>Partnership</option>
                  </Select>
                </Field>
                <Field label="Message" htmlFor="message" required>
                  <Textarea id="message" name="message" placeholder="How can we help?" rows={5} />
                </Field>
                <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
              </form>
              <p className="mt-5 text-sm text-muted-foreground">
                Prefer to talk? Call us at <Link href={brand.phoneHref} className="font-medium text-foreground">{brand.phone}</Link>.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section className="bg-secondary/30" containerClassName="max-w-4xl">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <SectionHeading
            align="center"
            eyebrow="Structured consultation"
            title="Prefer to choose a service and time slot?"
            description="Use our guided booking flow to share your details and preferred meeting time."
          />
          <Button asChild className="mt-8">
            <Link href="/book">Book a Consultation</Link>
          </Button>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
