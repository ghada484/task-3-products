import { useState } from "react";
import { AlertCircle, Search, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Pagination from "@/components/Pagination";
import { useProducts } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import { PAGE_SIZE } from "@/lib/api";

export default function ProductsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const search = useDebounce(searchInput, 400);

  const { data, isPending, isError, isFetching, isPlaceholderData, refetch } =
    useProducts(search, page);

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;

  return (
    <section className="rounded-xl bg-white p-4 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-medium tracking-tight sm:text-6xl">Products</h1>

        <div className="relative w-full sm:max-w-xs">
          <Input
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              setPage(1);
            }}
            placeholder="Search products..."
            aria-label="Search products"
            className="pr-10"
          />
          <Search className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {isPending ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center" role="alert">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <p className="font-medium">Something went wrong while loading products.</p>
          <p className="text-sm text-muted-foreground">
            Please check your connection and try again.
          </p>
          <Button onClick={() => refetch()}>Try again</Button>
        </div>
      ) : data.products.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" />
          <p className="font-medium">No products found for “{search}”.</p>
          <p className="text-sm text-muted-foreground">Try a different keyword.</p>
        </div>
      ) : (
        <>
          <div
            className={`grid grid-cols-1 gap-3 transition-opacity sm:grid-cols-2 lg:grid-cols-4 ${
              isPlaceholderData && isFetching ? "opacity-60" : ""
            }`}
          >
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            disabled={isPlaceholderData}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}
    </section>
  );
}