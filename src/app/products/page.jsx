"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, ShoppingCart, Info, Loader2 } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const addItem = useCartStore((state) => state.addItem);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products-json"],
    queryFn: async () => {
      // ✅ GitHub Pages’te backend yok → public dosyadan çek
      const res = await fetch("/api/products.json", { cache: "no-store" });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
  });

  const categories = [
    "Hepsi",
  ];

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase().trim();

    return (products || [])
      .filter((p) => {
        if (selectedCategory === "Hepsi") return true;
        return (p.category || "") === selectedCategory;
      })
      .filter((p) => {
        const name = (p.name || "").toLowerCase();
        const desc = (p.description || "").toLowerCase();
        return name.includes(q) || desc.includes(q);
      });
  }, [products, search, selectedCategory]);

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success(`${product.name} sepete eklendi`);
  };

  const hasAnyProducts = (products || []).length > 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Ürün Kataloğu</h1>
        <p className="text-zinc-500">
          Endüstriyel yedek parça ve ekipman çözümlerimizi inceleyin.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-white pl-12 pr-4 py-3 rounded-sm focus:border-[#d9923b] outline-none transition-colors"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-sm text-sm font-bold transition-all ${
                selectedCategory === cat
                  ? "bg-[#d9923b] text-[#0d0d0d]"
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="animate-spin text-[#d9923b]" size={48} />
          <p className="text-zinc-500">Ürünler yükleniyor...</p>
        </div>
      ) : !hasAnyProducts ? (
        // ✅ Şirket istediği: ürünler şimdilik boş
        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-sm">
          <h2 className="text-2xl font-bold text-white mb-3">Ürünler yakında</h2>
          <p className="text-zinc-500">
            Ürün listemiz güncelleniyor. Kısa süre içinde eklenecek.
          </p>
        </div>
      ) : filteredProducts.length === 0 ? (
        // ✅ Ürün var ama filtre/arama sonucu yok
        <div className="text-center py-24 border border-dashed border-zinc-800 rounded-sm">
          <p className="text-zinc-500">
            Aradığınız kriterlere uygun ürün bulunamadı.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-zinc-950 border border-zinc-900 hover:border-[#d9923b]/50 transition-all duration-300 rounded-sm overflow-hidden flex flex-col"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={product.image_url || product.image || "/images/sample.png"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-[#0d0d0d]/80 backdrop-blur-md text-[#f2bf5e] px-3 py-1 text-xs font-bold rounded-full">
                    {product.category || "Kategori"}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#f2bf5e] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-zinc-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <div className="text-2xl font-black text-white mb-6">
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    }).format(Number(product.price || 0))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex items-center justify-center space-x-2 border border-zinc-800 hover:border-zinc-700 text-zinc-400 py-2.5 rounded-sm transition-all"
                    >
                      <Info size={18} />
                      <span className="text-sm">Detay</span>
                    </Link>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center justify-center space-x-2 bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-bold py-2.5 rounded-sm transition-all"
                    >
                      <ShoppingCart size={18} />
                      <span className="text-sm">Ekle</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
