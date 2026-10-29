const LIVE_PATHS: Record<string, string> = {
  "/insurance/plans": "/plans",
  "/guides": "/blog",
  "/help": "/contact",
  "/payments/countries": "/payments#countries",
  "/rates": "/rates/pounds-to-naira",
  "/insurance/get-care": "/policy-terms#claims",
};

export function href(path: string): string {
  if (!path.startsWith("/")) return path;
  const [route, hash] = path.split("#");
  const live = LIVE_PATHS[route];
  if (live) return hash ? `${live.split("#")[0]}#${hash}` : live;
  return path;
}
