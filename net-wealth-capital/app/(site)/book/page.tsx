"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Steps } from "@/components/ui/steps";
import { Textarea } from "@/components/ui/textarea";
import { Section, SectionHeading } from "@/components/ui/section";
import { serviceNames } from "@/lib/services";

const bookingSteps = [
  { label: "Your Details", description: "Tell us how to reach you" },
  { label: "Service & Schedule", description: "Choose your preferred slot" },
  { label: "Review", description: "Confirm the request" },
];

const timeOptions = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  service: serviceNames[0] ?? "",
  date: "",
  time: timeOptions[0],
  notes: "",
};

type BookingForm = typeof initialForm;

export default function BookPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<BookingForm>(initialForm);

  function updateField(field: keyof BookingForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handlePrimaryAction() {
    if (step === bookingSteps.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep((current) => Math.min(current + 1, bookingSteps.length - 1));
  }

  if (submitted) {
    return (
      <Section containerClassName="max-w-3xl">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-accent/10 text-primary">
              <CheckCircle2 className="size-8" />
            </div>
            <CardTitle className="text-3xl">Booking Confirmed!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mx-auto max-w-xl leading-relaxed text-muted-foreground">
              Thank you, {form.fullName || "there"}. Our team will confirm your preferred slot via email shortly.
            </p>
            <div className="mx-auto mt-8 max-w-md rounded-xl bg-secondary/60 p-5 text-left text-sm">
              <SummaryRow label="Service" value={form.service} />
              <SummaryRow label="Date" value={form.date || "To be confirmed"} />
              <SummaryRow label="Time" value={form.time} />
            </div>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/portal">Go to Client Portal</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    );
  }

  return (
    <Section containerClassName="max-w-3xl">
      <div className="mb-10">
        <SectionHeading
          align="center"
          eyebrow="Book a consultation"
          title="Schedule a free discovery call"
          description="Share a few details and choose your preferred service and time."
        />
      </div>
      <Card>
        <CardHeader>
          <Steps steps={bookingSteps} current={step} />
        </CardHeader>
        <CardContent>
          <div className="min-h-[320px]">
            {step === 0 && (
              <div className="space-y-5">
                <Field label="Full Name" htmlFor="fullName" required>
                  <Input
                    id="fullName"
                    value={form.fullName}
                    onChange={(event) => updateField("fullName", event.target.value)}
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Email" htmlFor="email" required>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                    placeholder="you@example.com"
                  />
                </Field>
                <Field label="Phone Number" htmlFor="phone" required>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    placeholder="+91..."
                  />
                </Field>
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <Field label="Preferred Service" htmlFor="service" required>
                  <Select
                    id="service"
                    value={form.service}
                    onChange={(event) => updateField("service", event.target.value)}
                  >
                    {serviceNames.map((service) => (
                      <option key={service} value={service}>{service}</option>
                    ))}
                  </Select>
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Preferred Date" htmlFor="date" required>
                    <Input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(event) => updateField("date", event.target.value)}
                    />
                  </Field>
                  <Field label="Preferred Time" htmlFor="time" required>
                    <Select
                      id="time"
                      value={form.time}
                      onChange={(event) => updateField("time", event.target.value)}
                    >
                      {timeOptions.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </Select>
                  </Field>
                </div>
                <Field label="Additional Notes" htmlFor="notes" hint="Optional">
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(event) => updateField("notes", event.target.value)}
                    placeholder="Tell us anything we should know before the call."
                    rows={5}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="rounded-xl bg-secondary/60 p-5">
                <SummaryRow label="Full Name" value={form.fullName || "Not provided"} />
                <SummaryRow label="Email" value={form.email || "Not provided"} />
                <SummaryRow label="Phone" value={form.phone || "Not provided"} />
                <SummaryRow label="Preferred Service" value={form.service} />
                <SummaryRow label="Preferred Date" value={form.date || "Not selected"} />
                <SummaryRow label="Preferred Time" value={form.time} />
                <SummaryRow label="Additional Notes" value={form.notes || "None"} />
              </div>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep((current) => Math.max(current - 1, 0))}>
                Back
              </Button>
            ) : (
              <span />
            )}
            <Button onClick={handlePrimaryAction}>
              {step === bookingSteps.length - 1 ? "Confirm Booking" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border py-3 last:border-0 sm:flex-row sm:justify-between sm:gap-4">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm font-semibold text-foreground sm:text-right">{value}</span>
    </div>
  );
}
