import { cn } from "@/lib/utils"

type Variant = "default" | "brand" | "success" | "warning" | "danger" | "muted" | "indigo"

const variants: Record<Variant, string> = {
  default: "bg-secondary text-secondary-foreground",
  brand: "bg-brand-soft text-brand",
  indigo: "bg-[color-mix(in_srgb,var(--indigo)_14%,transparent)] text-indigo",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  muted: "bg-muted text-muted-foreground",
}

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
