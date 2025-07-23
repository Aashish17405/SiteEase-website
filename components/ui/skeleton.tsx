import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  disableAnimation?: boolean;
  variant?: 'default' | 'card' | 'text' | 'circular';
}

function Skeleton({
  className,
  width,
  height,
  disableAnimation = false,
  variant = 'default',
  style,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    default: "rounded-md",
    card: "rounded-lg",
    text: "rounded-sm",
    circular: "rounded-full"
  }

  return (
    <div
      className={cn(
        "bg-muted",
        variantClasses[variant],
        !disableAnimation && "animate-pulse",
        className
      )}
      style={{
        width: width,
        height: height,
        ...style
      }}
      {...props}
    />
  )
}

export { Skeleton }
export type { SkeletonProps }