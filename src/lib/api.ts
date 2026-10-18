const BASE_URL = "https://dummyjson.com";

export const PAGE_SIZE = 12;

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function getProducts({
  search,
  page,
}: {
  search?: string;
  page: number;
}): Promise<ProductsResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    skip: String(skip),
  });
  const keyword = search?.trim();

  if (keyword) {
    params.set("q", keyword);
    return request<ProductsResponse>(`${BASE_URL}/products/search?${params}`);
  }
  return request<ProductsResponse>(`${BASE_URL}/products?${params}`);
}

export function getProduct(id: number | string): Promise<Product> {
  return request<Product>(`${BASE_URL}/products/${id}`);
}