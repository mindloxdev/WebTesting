/**
 * Keystatic renders its own full document shell, so this layout deliberately
 * bypasses the marketing site's <Frame>, fonts and theme wrapper.
 */
export default function KeystaticLayout({ children }: { children: React.ReactNode }) {
  return children;
}
