import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, Star } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/use-products";

export default function ProductDetailsPage() {
  const { id = "" } = useParams();
  const { data: product, isPending, isError, refetch } = useProduct(id);
  const [selected, setSelected] = useState(0);

  return (
    <section className="rounded-xl bg-white p-4 sm:p-6">
      <Link
        to="/products"
        className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-4" })}
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
      </Link>

      {isPending ? (
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="aspect-square w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center" role="alert">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <p className="font-medium">We couldn’t load this product.</p>
          <Button onClick={() => refetch()}>Try again</Button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="aspect-square w-full rounded-lg bg-[#f4f4f4] p-6">
              <img
                src={product.images[selected] ?? product.thumbnail}
                alt={product.title}
                className="h-full w-full object-contain"
              />
            </div>

            {product.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelected(i)}
                    aria-label={`Show image ${i + 1}`}
                    className={`h-16 w-16 shrink-0 rounded-md bg-[#f4f4f4] p-1 ${
                      i === selected ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            {product.brand && (
              <p className="text-sm uppercase text-muted-foreground">{product.brand}</p>
            )}
            <h1 className="text-3xl font-medium sm:text-4xl">{product.title}</h1>

            <p className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {product.rating.toFixed(1)}
              <span className="ml-2 capitalize text-muted-foreground">
                · {product.category}
              </span>
            </p>

            <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="text-sm">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>

            <Button className="mt-2 w-full sm:w-fit" disabled={product.stock === 0}>
              Add to cart
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}