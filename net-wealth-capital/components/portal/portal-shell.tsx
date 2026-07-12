"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  X,
  ChevronDown,
  LogOut,
  ArrowLeft,
  Search,
} from "lucide-react";
import { cn, initials } from "@/lib/utils";
import { portalNav, adminNav } from "@/lib/mock";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Badge } from "@/components/ui/badge";

export function PortalShell({
  variant,
  role,
  user,
  accent = "primary",
  children,
}: {
  variant: "client" | "admin";
  role: string;
  user: { name: string; email: string };
  accent?: "primary" | "gold";
  children: React.ReactNode;
}) {
  const nav = variant === "admin" ? adminNav : portalNav;
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => {
    const base = nav[0]?.href ?? "/";
    if (href === base) return pathname === base;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const active = nav.find((n) => isActive(n.href));

  const SidebarBody = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 shrink-0 items-center border-b border-border px-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3 thin-scroll">
        {nav.map((item) => {
          const Icon = item.icon;
          const activeItem = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                activeItem
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge variant={accent === "gold" ? "gold" : "default"} className="px-1.5 py-0">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {initials(user.name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{role}</p>
          </div>
          <Link href="/" aria-label="Sign out" className="text-muted-foreground hover:text-foreground">
            <LogOut className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-svh bg-muted/40">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="sticky top-0 h-svh">{SidebarBody}</div>
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-card shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 text-muted-foreground"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
            {SidebarBody}
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="glass-nav sticky top-0 z-30 flex h-16 items-center gap-3 px-4 lg:px-6">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex size-9 items-center justify-center rounded-md text-foreground lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <h1 className="truncate text-base font-semibold text-foreground">
              {active?.label ?? "Overview"}
            </h1>
          </div>
          <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground md:flex">
            <Search className="size-4" />
            <span>Search…</span>
          </div>
          <ThemeToggle />
          <button
            className="relative inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" />
          </button>
          <Link
            href="/"
            className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground sm:flex"
          >
            <ArrowLeft className="size-4" />
            Website
          </Link>
          <button className="hidden items-center gap-2 rounded-md px-1.5 py-1 sm:flex" aria-label="Account">
            <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
              {initials(user.name)}
            </span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
        </header>

        <div className="flex-1 p-4 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
