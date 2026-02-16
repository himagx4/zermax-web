"use client";

import React from "react";
import useCartStore from "@/store/useCartStore";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  const handleUpdateQuantity = (id, q) => {
    updateQuantity(id, q);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 flex flex-col items-center justify-center space-y-8">
        <div className="p-10 bg-zinc-950 border border-zinc-900 rounded-full text-[#d9923b]">
          <ShoppingBag size={80} strokeWidth={1} />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Sepetiniz Boş</h1>
          <p className="text-zinc-500 max-w-md mx-auto">
            Henüz sepetinize bir ürün eklemediniz. Katalog sayfamızdan
            ürünlerimizi inceleyebilir ve sipariş oluşturabilirsiniz.
          </p>
        </div>
        <a
          href="/products"
          className="bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black px-12 py-5 rounded-sm transition-all"
        >
          ALIŞVERİŞE BAŞLA
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">Alışveriş Sepeti</h1>
        <p className="text-zinc-500">
          Siparişinizi tamamlamak için ürünlerinizi kontrol edin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-900 p-6 rounded-sm flex flex-col md:flex-row gap-6 items-center"
            >
              <div className="w-24 h-24 shrink-0 rounded-sm overflow-hidden border border-zinc-900">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-white font-bold text-lg mb-1">
                  {item.name}
                </h3>
                <p className="text-zinc-500 text-sm mb-4">{item.category}</p>
                <div className="text-[#f2bf5e] font-black">
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(item.price)}
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center border border-zinc-800 rounded-sm">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="p-2 text-zinc-500 hover:text-white transition-colors border-r border-zinc-800"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-6 text-white font-bold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="p-2 text-zinc-500 hover:text-white transition-colors border-l border-zinc-800"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    removeItem(item.id);
                    toast.error("Ürün sepetten çıkarıldı");
                  }}
                  className="text-zinc-600 hover:text-red-500 transition-colors p-2"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-sm sticky top-32">
            <h3 className="text-white font-bold text-xl mb-8 border-b border-zinc-900 pb-4">
              Sipariş Özeti
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-zinc-500">
                <span>Ara Toplam</span>
                <span>
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(total)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>KDV (%20)</span>
                <span>
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(total * 0.2)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Kargo</span>
                <span className="text-green-500">Ücretsiz</span>
              </div>
              <div className="pt-4 border-t border-zinc-900 flex justify-between items-end">
                <span className="text-white font-bold">Genel Toplam</span>
                <span className="text-3xl font-black text-[#f2bf5e]">
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(total * 1.2)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href="/checkout"
                className="w-full bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black py-4 rounded-sm flex items-center justify-center space-x-2 transition-all shadow-lg shadow-[#d9923b]/10"
              >
                <span>ÖDEME ADIMINA GEÇ</span>
                <ArrowRight size={20} />
              </a>
              <div className="flex items-center justify-center space-x-2 text-zinc-600 text-xs">
                <CreditCard size={14} />
                <span>Güvenli Banka Transferi (EFT/Havale)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
