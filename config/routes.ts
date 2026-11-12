const LIVE_PATHS: Record<string, string> = {
  "/guides": "/blog",
  "/payments/countries": "/payments#countries",
  "/insurance/get-care": "/insurance/policy-terms#claims",
};

export function href(path: string): string {
  if (!path.startsWith("/")) return path;
  const [route, hash] = path.split("#");
  const live = LIVE_PATHS[route];
  if (live) return hash ? `${live.split("#")[0]}#${hash}` : live;
  return path;
}
