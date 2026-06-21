import { clsx } from "clsx";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: "a";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent",
  secondary:
    "bg-transparent border border-primary text-primary hover:bg-primary/10",
  ghost:
    "bg-transparent border border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

const Spinner = () => (
  <>
    <svg
      className="animate-spin h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    <span>Sending…</span>
  </>
);

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", loading = false, className, children } = props;

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded font-medium tracking-wide",
    "transition-all duration-100",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:scale-[0.97] active:transition-none",
    "disabled:opacity-40 disabled:pointer-events-none",
    "cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // Anchor variant — a real link that navigates.
  if (props.as === "a") {
    const { as: _as, variant: _v, size: _s, loading: _l, className: _c, children: _ch, ...anchorProps } = props;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  // Button variant.
  const { as: _as, variant: _v, size: _s, loading: _l, className: _c, children: _ch, disabled, ...buttonProps } = props;
  return (
    <button
      disabled={disabled || loading}
      aria-busy={loading}
      className={classes}
      {...buttonProps}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
