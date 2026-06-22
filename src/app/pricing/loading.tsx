import { Skeleton } from "@/components/ui/skeleton";

export default function PricingLoading() {
  return (
    <div className="container max-w-screen-xl px-4 py-16">
      <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center">
        <Skeleton className="mx-auto h-9 w-48" />
        <Skeleton className="mx-auto h-5 w-72" />
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-96 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
