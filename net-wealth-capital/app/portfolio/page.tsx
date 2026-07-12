"use client";

import { useEffect, useRef, useState } from "react";
import {
  PortfolioConnect,
  extractPortfolioSummary,
} from "@cas-parser/connect";
import {
  FileText,
  ShieldCheck,
  Landmark,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  Check,
} from "lucide-react";

const METHODS = [
  { label: "CAS PDF", desc: "Consolidated Account Statement", icon: FileText },
  { label: "CDSL OTP", desc: "Instant OTP verification", icon: ShieldCheck },
  { label: "NSDL CAS", desc: "Import your NSDL statement", icon: Landmark },
  { label: "Gmail Inbox", desc: "Auto-scan statement emails", icon: Mail },
];

// onboarding flow steps — mark current step here
const STEPS = [
  { id: "account", label: "Account" },
  { id: "portfolio", label: "Portfolio" },
  { id: "goals", label: "Goals" },
  { id: "review", label: "Review" },
];
const CURRENT_STEP = "portfolio";

function Stepper() {
  const currentIndex = STEPS.findIndex((s) => s.id === CURRENT_STEP);

  return (
    <div className="mb-10 flex items-center">
      {STEPS.map((step, i) => {
        const isDone = i < currentIndex;
        const isActive = i === currentIndex;

        return (
          <div key={step.id} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  isDone
                    ? "gradient-brand-bg text-white"
                    : isActive
                      ? "border-2 border-brand text-brand"
                      : "border border-border text-muted-foreground"
                }`}
              >
                {isDone ? <Check className="size-3.5" strokeWidth={3} /> : i + 1}
              </div>
              <span
                className={`text-xs whitespace-nowrap ${
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div
                className={`mx-2 h-px flex-1 ${
                  isDone ? "bg-brand" : "bg-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PortfolioPage() {
  const [accessToken, setAccessToken] = useState("");
  const [tokenExpiresAt, setTokenExpiresAt] = useState<number | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const openWidgetRef = useRef<(() => void) | null>(null);
  const openWhenTokenReadyRef = useRef(false);

  // PortfolioConnect reads accessToken from its props. Opening it in the same
  // click handler as setAccessToken can leave its internal API client with an
  // empty token. Wait for the render that supplies the token instead of using
  // a timing-dependent timeout.
  useEffect(() => {
    if (accessToken && openWhenTokenReadyRef.current) {
      openWhenTokenReadyRef.current = false;
      openWidgetRef.current?.();
    }
  }, [accessToken]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ambient brand glow, consistent with the rest of the site */}
      <div className="glow-orb -top-32 left-[8%] h-80 w-80 bg-brand-primary/40" />
      <div className="glow-orb top-40 right-[6%] h-72 w-72 bg-brand-secondary/30" />

      <main className="container-page relative py-16">
        <div className="mx-auto w-full max-w-xl">
          <Stepper />

          <div className="section-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 normal-case tracking-normal">
            <ShieldCheck className="size-3.5 text-brand" />
            Bank-grade, read-only access
          </div>

          <h1 className="mb-2 text-3xl sm:text-4xl">
            Import your <span className="gradient-text-brand">portfolio</span>
          </h1>
          <p className="mb-8 text-[15px] leading-relaxed text-muted-foreground">
            We&apos;ll pull your holdings using whichever source is fastest —
            CAS PDF, CDSL OTP, NSDL, or your Gmail inbox.
          </p>

          {/* method reference — informational, matches what PortfolioConnect supports */}
          <div className="mb-8 grid grid-cols-2 gap-3">
            {METHODS.map(({ label, desc, icon: Icon }) => (
              <div
                key={label}
                className="glass-soft flex items-start gap-3 rounded-2xl px-4 py-3.5"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Icon className="size-4" strokeWidth={1.8} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {label}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <PortfolioConnect
            accessToken={accessToken}
            config={{
              enableCdslFetch: true,
              enableGenerator: true,
              homeLayout: "actions",
            }}
            onSuccess={(data) => {
              console.log(data);

              setResult({
                raw: data,
                summary: extractPortfolioSummary(data),
              });
            }}
            onError={(err) => {
              console.error("Portfolio Connect error", err);
              if (err.code === "AUTHENTICATION") {
                // A token can expire while the user is completing the OTP flow.
                // Force the next attempt to mint a fresh, short-lived token.
                setAccessToken("");
                setTokenExpiresAt(null);
              }
              setError(err.message || err.title || "Portfolio import failed.");
            }}
          >
            {({ open }) => (
              <PortfolioImportButton
                open={open}
                loading={loading}
                setLoading={setLoading}
                accessToken={accessToken}
                setAccessToken={setAccessToken}
                tokenExpiresAt={tokenExpiresAt}
                setTokenExpiresAt={setTokenExpiresAt}
                setError={setError}
                openWidgetRef={openWidgetRef}
                openWhenTokenReadyRef={openWhenTokenReadyRef}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    Import portfolio
                    <ArrowRight className="size-4" />
                  </>
                )}
              </PortfolioImportButton>
            )}
          </PortfolioConnect>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Your credentials are never stored. Data stays encrypted
            end-to-end.
          </p>

          {error && (
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {result && (
            <div className="glass-card mt-8 overflow-hidden rounded-3xl">
              <div className="border-b border-white/15 px-6 py-4">
                <h2 className="text-base font-semibold text-foreground">
                  Portfolio imported successfully
                </h2>
              </div>

              <dl className="divide-y divide-white/10">
                <Row label="Investor">{result.summary.investorName}</Row>
                <Row label="Portfolio value">
                  ₹{result.summary.totalValue?.toLocaleString()}
                </Row>
                <Row label="CAS type">{result.summary.casType}</Row>
                <Row label="MF folios">{result.summary.folios}</Row>
                <Row label="Holdings">{result.summary.holdings}</Row>
                <Row label="Statement date">{result.summary.asOn}</Row>
              </dl>

              {getHoldings(result.raw).length > 0 && (
                <div className="border-t border-white/15 px-6 py-4">
                  <h3 className="mb-3 text-sm font-semibold text-foreground">
                    Holdings
                  </h3>
                  <div className="max-h-80 overflow-auto rounded-xl border border-border">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-muted/50 text-xs text-muted-foreground">
                        <tr>
                          <th className="px-3 py-2 font-medium">Instrument</th>
                          <th className="px-3 py-2 text-right font-medium">Units</th>
                          <th className="px-3 py-2 text-right font-medium">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {getHoldings(result.raw).map((holding, index) => (
                          <tr key={`${holding.isin || holding.name}-${index}`}>
                            <td className="px-3 py-2">
                              <p className="font-medium text-foreground">{holding.name}</p>
                              {holding.isin && (
                                <p className="text-xs text-muted-foreground">{holding.isin}</p>
                              )}
                            </td>
                            <td className="px-3 py-2 text-right text-muted-foreground">
                              {formatNumber(holding.units)}
                            </td>
                            <td className="px-3 py-2 text-right font-medium text-foreground">
                              {formatCurrency(holding.value)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-6 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{children}</dd>
    </div>
  );
}

function PortfolioImportButton({
  open,
  loading,
  setLoading,
  accessToken,
  setAccessToken,
  tokenExpiresAt,
  setTokenExpiresAt,
  setError,
  openWidgetRef,
  openWhenTokenReadyRef,
  children,
}: {
  open: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  accessToken: string;
  setAccessToken: (token: string) => void;
  tokenExpiresAt: number | null;
  setTokenExpiresAt: (expiresAt: number | null) => void;
  setError: (error: string) => void;
  openWidgetRef: React.MutableRefObject<(() => void) | null>;
  openWhenTokenReadyRef: React.MutableRefObject<boolean>;
  children: React.ReactNode;
}) {
  openWidgetRef.current = open;

  const handleClick = async () => {
    try {
      setLoading(true);
      setError("");

      if (accessToken && (!tokenExpiresAt || tokenExpiresAt > Date.now())) {
        open();
        return;
      }

      if (accessToken) {
        setAccessToken("");
        setTokenExpiresAt(null);
      }

      const response = await fetch("/api/casparser-token", { method: "POST" });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || typeof payload.access_token !== "string") {
        throw new Error(payload.error || "Failed to start portfolio import.");
      }

      openWhenTokenReadyRef.current = true;
      setAccessToken(payload.access_token);
      const expiresInSeconds = Number(payload.expires_in);
      setTokenExpiresAt(
        Date.now() + (Number.isFinite(expiresInSeconds) ? expiresInSeconds : 55 * 60) * 1000
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to start portfolio import.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      disabled={loading}
      onClick={handleClick}
      className="gradient-brand-bg shine-border flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[15px] font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

type Holding = {
  isin?: string;
  name: string;
  units?: number;
  value?: number;
};

function getHoldings(data: any): Holding[] {
  const mutualFundHoldings = (data?.mutual_funds || []).flatMap((folio: any) =>
    (folio.schemes || []).map((scheme: any) => ({
      isin: scheme.isin,
      name: scheme.name || folio.amc || "Mutual fund holding",
      units: scheme.units,
      value: scheme.value,
    }))
  );

  const dematHoldings = (data?.demat_accounts || []).flatMap((account: any) =>
    Object.values(account.holdings || {}).flatMap((assetGroup: any) =>
      Array.isArray(assetGroup)
        ? assetGroup.map((holding: any) => ({
            isin: holding.isin,
            name: holding.name || holding.security_name || "Demat holding",
            units: holding.units ?? holding.quantity,
            value: holding.value ?? holding.current_value,
          }))
        : []
    )
  );

  return [...mutualFundHoldings, ...dematHoldings];
}

function formatNumber(value?: number) {
  return typeof value === "number" ? value.toLocaleString("en-IN") : "—";
}

function formatCurrency(value?: number) {
  return typeof value === "number"
    ? `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`
    : "—";
}
