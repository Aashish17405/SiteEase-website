import { HeroSkeleton, FeatureGridSkeleton, NavbarSkeleton } from "@/components/ui/loading-states"

export default function Loading() {
  return (
    <div className="container mx-auto px-4">
      <NavbarSkeleton />
      <HeroSkeleton />
      <FeatureGridSkeleton />
    </div>
  )
}