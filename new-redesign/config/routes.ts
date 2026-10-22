/**
 * Where the new redesign lives while it is being built.
 *
 * The live site keeps serving `/`, `/payments`, `/insurance` and the rest from
 * `app/(redesign)`. The new redesign is served under `/new` from
 * `app/(new-redesign)`, so both can be open side by side.
 *
 * Every internal link in `new-redesign/` goes through `href()`. At cutover the
 * routes move to the site root, `REDESIGN_BASE` becomes "", and no component
 * has to change.
 */
export const REDESIGN_BASE = "/new";

/** Prefix an internal path with the preview base. `href("/")` is the new home. */
export function href(path: string): string {
  if (!path.startsWith("/")) return path;
  if (path === "/") return REDESIGN_BASE || "/";
  return `${REDESIGN_BASE}${path}`;
}
