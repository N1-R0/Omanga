type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function trackEvent(name: string, params: Record<string, string> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, { page_path: window.location.pathname, ...params });
}
