import { Skeleton } from "./skeleton"

export function HeroSkeleton() {
  return (
    <div className="space-y-6 py-10">
      <Skeleton variant="text" className="h-12 w-3/4 max-w-2xl" />
      <Skeleton variant="text" className="h-6 w-2/3 max-w-xl" />
      <Skeleton variant="default" className="h-12 w-40" />
    </div>
  )
}

export function FeatureCardSkeleton() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton variant="circular" className="h-12 w-12" />
      <Skeleton variant="text" className="h-6 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
    </div>
  )
}

export function FeatureGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <FeatureCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function NavbarSkeleton() {
  return (
    <div className="flex items-center justify-between p-4">
      <Skeleton variant="default" className="h-8 w-32" />
      <div className="flex space-x-4">
        <Skeleton variant="default" className="h-8 w-20" />
        <Skeleton variant="default" className="h-8 w-20" />
      </div>
    </div>
  )
}