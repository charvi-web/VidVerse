import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBand({
  title = "Ready to take control of your wealth?",
  description = "Book a free, no-obligation consultation with a senior advisor and get a personalised plan built around your goals.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-page">
        <div className="surface-dark relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white md:px-16">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 ring-1 ring-white/20">
              <CalendarCheck className="size-3.5 text-neutral-300" /> Free 30-minute discovery call
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75">
              {description}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="/book">
                  Book a Consultation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/contact">Talk to Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
