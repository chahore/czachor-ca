import { Skeleton } from '@/components/ui/skeleton'

export function EntrySkeleton() {
  return (
    <div className="flex items-center space-x-2 pt-5">
      <Skeleton className="h-4 w-4 rounded-full" />
      <Skeleton className="h-3 w-[100px]" />
      <Skeleton className="h-3 w-[300px]" />
    </div>
  )
}
