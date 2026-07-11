import clsx from "clsx";

// =========================
// Classname merge helper
// =========================
export function cn(...inputs) {
  return clsx(inputs);
}

// =========================
// Format seconds -> "12:34"
// =========================
export function formatDuration(seconds = 0) {
  const total = Math.floor(Number(seconds) || 0);

  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  return `${mins}:${String(secs).padStart(2, "0")}`;
}

// =========================
// Format view count -> "1.2K views"
// =========================
export function formatViews(count = 0) {
  const n = Number(count) || 0;

  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M views`;
  }

  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K views`;
  }

  return `${n} view${n === 1 ? "" : "s"}`;
}

// =========================
// Format count only -> "1.2K"
// =========================
export function formatCount(count = 0) {
  const n = Number(count) || 0;

  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }

  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return `${n}`;
}

// =========================
// Relative time -> "3 days ago"
// =========================
export function timeAgo(date) {
  if (!date) return "";

  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now - then) / 1000);

  const intervals = [
    { label: "year", secs: 31536000 },
    { label: "month", secs: 2592000 },
    { label: "week", secs: 604800 },
    { label: "day", secs: 86400 },
    { label: "hour", secs: 3600 },
    { label: "minute", secs: 60 },
  ];

  for (const { label, secs } of intervals) {
    const value = Math.floor(seconds / secs);

    if (value >= 1) {
      return `${value} ${label}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}
