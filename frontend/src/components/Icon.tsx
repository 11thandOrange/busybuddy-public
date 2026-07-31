interface IconProps {
  /** Raw inline SVG markup (trusted, from the internal widget catalog). */
  svg: string;
  className?: string;
}

/**
 * Renders a trusted inline SVG string. The markup comes exclusively from the
 * bundled widget catalog in `@busybuddy/shared`, never from user input, so
 * dangerouslySetInnerHTML is safe here.
 */
export function Icon({ svg, className }: IconProps) {
  return (
    <span className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />
  );
}

/** Arrow-up-right glyph reused for CTAs and card affordances. */
export function ArrowUpRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <path d="M7 17L17 7M17 7H8M17 7V16" />
    </svg>
  );
}
