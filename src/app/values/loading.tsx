import { Skeleton } from '@/components/ui/skeleton'
import { TableSkeleton } from '@/components/ui/skeleton-cards'

export default function ValuesLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-10 w-48 mb-4" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Table */}
      <TableSkeleton rows={10} />
    </div>
  )
}
