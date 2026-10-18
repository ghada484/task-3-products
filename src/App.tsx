import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import ProductsPage from "@/pages/ProductsPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";

function DetailsRoute() {
  const { id } = useParams();
  return <ProductDetailsPage key={id} />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<DetailsRoute />} />
      </Route>
    </Routes>
  );
}