import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { products } = useSelector(state => state.products);
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg shadow px-4 py-2">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={e => { setQuery(e.target.value); setShowDropdown(true); }}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          placeholder="Search products..."
          className="w-full bg-transparent outline-none text-gray-900 dark:text-white px-2 py-1"
        />
      </div>
      {showDropdown && query && (
        <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="p-4 text-gray-500">No results found.</div>
          ) : (
            filtered.map(product => (
              <div key={product.id} className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.category} • ${product.price}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
