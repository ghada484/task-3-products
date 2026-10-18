import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import type { Product } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-0 bg-[#f4f4f4] shadow-none">
      <div className="aspect-square w-full p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <CardContent className="flex flex-1 flex-col items-center gap-1 text-center">
        <h3 className="line-clamp-2 text-sm font-medium uppercase tracking-wide">
          {product.title}
        </h3>
        {product.brand && (
          <p className="text-xs uppercase text-muted-foreground">{product.brand}</p>
        )}
        <p className="mt-1 font-semibold">${product.price.toFixed(2)}</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          {product.rating.toFixed(1)}
        </p>
      </CardContent>

      <CardFooter>
  <Link
    to={`/products/${product.id}`}
    className={buttonVariants({ variant: "outline", className: "w-full" })}
  >
    View details
  </Link>
</CardFooter>
    </Card>
  );
}