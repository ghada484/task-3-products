import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProduct, getProducts } from "@/lib/api";

export function useProducts(search: string, page: number) {
  return useQuery({
    queryKey: ["products", { search, page }],
    queryFn: () => getProducts({ search, page }),
    placeholderData: keepPreviousData,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: Boolean(id),
  });
}