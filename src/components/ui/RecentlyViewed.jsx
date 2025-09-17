import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

export default function RecentlyViewed() {
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setViewed(items);
  }, []);

  if (!viewed.length) return null;

  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Recently Viewed Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {viewed.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
