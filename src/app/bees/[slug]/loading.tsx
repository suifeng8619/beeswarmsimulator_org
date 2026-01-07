import { DetailPageSkeleton } from '@/components/ui/skeleton-cards'

export default function BeeDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 to-amber-50">
      <DetailPageSkeleton />
    </div>
  )
}
