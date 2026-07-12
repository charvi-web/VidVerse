"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Authenticator,
  useAuthenticator,
  ThemeProvider as AmplifyThemeProvider,
} from "@aws-amplify/ui-react";
import { useTheme } from "next-themes";
import { ArrowLeft, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { brand, testimonials } from "@/lib/site";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";

const formFields = {
  signUp: {
    name: {
      order: 1,
      label: "Full name",
      placeholder: "Enter your full name",
      isRequired: true,
    },
    email: { order: 2, label: "Email", placeholder: "you@example.com" },
    password: { order: 3 },
    confirm_password: { order: 4 },
  },
};

const stats = [
  { value: brand.amc, label: "Assets advised" },
  { value: brand.clients, label: "Families served" },
  { value: brand.experience, label: "Experience" },
  { value: brand.retention, label: "Client retention" },
];

const trust = [
  { icon: ShieldCheck, label: "Bank-grade security" },
  { icon: Lock, label: "Encrypted end-to-end" },
];

function RedirectOnAuth() {
  const { authStatus } = useAuthenticator((c) => [c.authStatus]);
  const router = useRouter();
  React.useEffect(() => {
    if (authStatus === "authenticated") router.push("/onboarding");
  }, [authStatus, router]);
  return null;
}

export default function AuthPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const colorMode = (mounted && resolvedTheme === "dark" ? "dark" : "light") as
    | "light"
    | "dark";

  const testimonial = testimonials[1] ?? testimonials[0];

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <RedirectOnAuth />

      {/* Brand panel */}
      <aside className="relative hidden flex-col justify-between overflow-hidden surface-dark p-10 text-white lg:flex xl:p-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)" }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <Logo variant="light" />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" /> Back to site
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight">
            Your wealth,
            <br /> expertly managed.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/70">
            One secure portal for your investments, tax, insurance, retirement and estate —
            with a dedicated advisor by your side.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-semibold tracking-tight">{s.value}</dt>
                <dd className="mt-1 text-sm text-white/60">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure className="relative z-10 max-w-md border-t border-white/10 pt-6">
          <blockquote className="text-sm leading-relaxed text-white/80">
            “{testimonial.quote}”
          </blockquote>
          <figcaption className="mt-3 text-sm font-medium">
            {testimonial.name}
            <span className="font-normal text-white/50">
              {" "}
              · {testimonial.role}, {testimonial.location}
            </span>
          </figcaption>
        </figure>
      </aside>

      {/* Auth panel */}
      <main className="relative flex flex-col bg-background">
        <div className="flex items-center justify-between p-4 sm:p-6">
          <Logo className="lg:invisible" />
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              <ArrowLeft className="size-4" /> Back
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-4 pb-12 sm:px-6">
          <div className="w-full max-w-sm">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Welcome to {brand.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to your client portal, or create an account to get started.
              </p>
            </div>

            <div className="nw-auth">
              <AmplifyThemeProvider colorMode={colorMode}>
                <Authenticator
                  initialState="signIn"
                  loginMechanisms={["email"]}
                  signUpAttributes={["name"]}
                  formFields={formFields}
                >
                  {() => (
                    <div className="space-y-2 py-6 text-center">
                      <CheckCircle2 className="mx-auto size-8 text-foreground" />
                      <p className="text-base font-medium text-foreground">You’re signed in.</p>
                      <p className="text-sm text-muted-foreground">
                        Taking you to your onboarding…
                      </p>
                    </div>
                  )}
                </Authenticator>
              </AmplifyThemeProvider>
            </div>

            <div className="mt-8 flex items-center justify-center gap-5">
              {trust.map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <t.icon className="size-3.5" /> {t.label}
                </span>
              ))}
            </div>

            <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
              By continuing you agree to our{" "}
              <Link href="/terms" className="text-foreground underline-offset-4 hover:underline">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-foreground underline-offset-4 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
