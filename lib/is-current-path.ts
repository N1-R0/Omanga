/**
 * Whether a navigation destination is the page currently being viewed.
 *
 * Kept out of the component because it is the one piece of navigation logic
 * with edge cases worth testing on its own, and because two components
 * (`Navigation` on the desktop bar and in the mobile panel) must agree on the
 * answer exactly — two copies of this would eventually disagree.
 *
 * Section pages count as their parent being current: `/insurance/silver` marks
 * "Insurance" as the current page, which is what a user reading the nav
 * expects. The root is the exception and must match exactly, or every path on
 * the site would mark "Home" as current too.
 *
 * Trailing slashes are normalised because a link written `/about/` and a
 * pathname of `/about` are the same page, and a mismatch here shows up as a
 * nav that never highlights anything.
 */
export function isCurrentPath(pathname: string, href: string): boolean {
  // Fragment and off-site destinations are never "the current page".
  if (href.startsWith("#") || href.includes("://") || href.startsWith("mailto:")) {
    return false;
  }

  const normalise = (value: string): string =>
    value.length > 1 && value.endsWith("/") ? value.slice(0, -1) : value;

  const target = normalise(href);
  const current = normalise(pathname);

  if (target === "/") {
    return current === "/";
  }

  return current === target || current.startsWith(`${target}/`);
}
