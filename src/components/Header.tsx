import { Link } from "react-router-dom";
import { Gem, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/products", label: "Shop" },
  { to: "#", label: "Collections" },
  { to: "#", label: "Contact" },
  { to: "#", label: "About" },
];

export default function Header() {
  return (
    <header className="mb-3 flex items-center gap-3">
      <Link
        to="/products"
        className="flex h-12 items-center gap-2 rounded-lg bg-white px-5 font-semibold"
      >
        <Gem className="h-4 w-4" /> crystal.
      </Link>

      <nav className="hidden flex-1 gap-2 md:flex">
        {links.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className="flex h-12 flex-1 items-center justify-center rounded-lg bg-white text-sm hover:bg-white/70"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto md:ml-0">
        <Button className="h-12 gap-2 rounded-lg px-6">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">VIEW CART</span>
        </Button>
      </div>
    </header>
  );
}