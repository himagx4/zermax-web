"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ShoppingCart,
  ArrowLeft,
  Plus,
  Minus,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
} from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { toast } from "sonner";

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${id}`);
      if (!res.ok) throw new Error("Ürün bulunamadı");
      return res.json();
    },
  });

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`${quantity} adet ${product.name} sepete eklendi`);
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-500">
        Yükleniyor...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Hata: {error.message}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <a
        href="/products"
        className="inline-flex items-center space-x-2 text-zinc-500 hover:text-[#f2bf5e] mb-12 transition-colors group"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="font-bold">Ürünlere Dön</span>
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image Section */}
        <div className="space-y-6">
          <div className="aspect-square rounded-sm overflow-hidden border border-zinc-900 bg-zinc-950">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-sm overflow-hidden border border-zinc-900 bg-zinc-950 opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <img
                  src={product.image_url}
                  alt=""
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-[#d9923b] font-bold tracking-widest uppercase text-sm mb-4 block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {product.name}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="text-4xl font-black text-white">
              {new Intl.NumberFormat("tr-TR", {
                style: "currency",
                currency: "TRY",
              }).format(product.price)}
            </div>
          </div>

          <div className="border-y border-zinc-900 py-8 mb-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 font-bold">Miktar Seçin</span>
              <div className="flex items-center border border-zinc-800 rounded-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-zinc-400 hover:text-white transition-colors border-r border-zinc-800"
                >
                  <Minus size={20} />
                </button>
                <span className="px-8 text-white font-bold text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-zinc-400 hover:text-white transition-colors border-l border-zinc-800"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black py-5 rounded-sm flex items-center justify-center space-x-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#d9923b]/10"
            >
              <ShoppingCart size={24} />
              <span className="text-lg uppercase tracking-wider">
                Sepete Ekle
              </span>
            </button>
          </div>

          {/* Product Highlights */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="flex items-center space-x-3 text-zinc-400 text-sm">
              <CheckCircle2 size={20} className="text-[#d9923b]" />
              <span>Orijinal Ürün</span>
            </div>
            <div className="flex items-center space-x-3 text-zinc-400 text-sm">
              <Package size={20} className="text-[#d9923b]" />
              <span>Stoktan Teslim</span>
            </div>
            <div className="flex items-center space-x-3 text-zinc-400 text-sm">
              <Truck size={20} className="text-[#d9923b]" />
              <span>Hızlı Sevkiyat</span>
            </div>
            <div className="flex items-center space-x-3 text-zinc-400 text-sm">
              <ShieldCheck size={20} className="text-[#d9923b]" />
              <span>Teknik Garanti</span>
            </div>
          </div>

          {/* Technical Specs */}
          {product.technical_specs && (
            <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-sm">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center space-x-2">
                <div className="w-1 h-5 bg-[#d9923b]"></div>
                <span>Teknik Özellikler</span>
              </h3>
              <div className="text-zinc-500 text-sm leading-relaxed whitespace-pre-line">
                {product.technical_specs}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
