import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="border-0 bg-[#f4f4f4] p-4 shadow-none">
      <Skeleton className="aspect-square w-full bg-white" />
      <Skeleton className="mx-auto mt-4 h-4 w-3/4 bg-white" />
      <Skeleton className="mx-auto mt-2 h-3 w-1/3 bg-white" />
      <Skeleton className="mx-auto mt-2 h-4 w-1/4 bg-white" />
      <Skeleton className="mt-4 h-10 w-full bg-white" />
    </Card>
  );
}