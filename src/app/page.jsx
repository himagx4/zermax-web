"use client";

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, BookOpen, PhoneCall } from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* HERO */}
      <div className="rounded-sm border border-zinc-900 bg-zinc-950 p-8 md:p-12">
        <div className="max-w-2xl">
          <div className="text-sm font-bold text-[#f2bf5e] mb-3">ZERMAX</div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Endüstriyel yedek parça ve ekipman çözümleri
          </h1>
          <p className="text-zinc-400 mt-4 leading-relaxed">
            Ürün kataloğumuzu inceleyin, ihtiyacınıza uygun parçaları hızlıca bulun.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-bold px-5 py-3 rounded-sm transition-all"
            >
              Ürünleri İncele <ArrowRight size={18} />
            </Link>

            <Link
              to="/catalog"
              className="inline-flex items-center gap-2 border border-zinc-800 hover:border-zinc-700 text-white/90 px-5 py-3 rounded-sm transition-all"
            >
              Kataloğu Aç <BookOpen size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-zinc-800 hover:border-zinc-700 text-white/90 px-5 py-3 rounded-sm transition-all"
            >
              İletişim <PhoneCall size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <Link
          to="/products"
          className="group bg-zinc-950 border border-zinc-900 hover:border-[#d9923b]/50 transition-all rounded-sm p-6"
        >
          <div className="flex items-center gap-3 text-white font-bold">
            <ShoppingCart className="text-[#f2bf5e]" />
            Ürün Kataloğu
          </div>
          <p className="text-zinc-500 mt-3">
            Kategorilere göre filtrele, hızlı arama ile ürünü bul.
          </p>
          <div className="text-[#f2bf5e] mt-4 font-bold group-hover:translate-x-1 transition-transform">
            Aç →
          </div>
        </Link>

        <Link
          to="/catalog"
          className="group bg-zinc-950 border border-zinc-900 hover:border-[#d9923b]/50 transition-all rounded-sm p-6"
        >
          <div className="flex items-center gap-3 text-white font-bold">
            <BookOpen className="text-[#f2bf5e]" />
            PDF Katalog
          </div>
          <p className="text-zinc-500 mt-3">
            Elindeki PDF kataloğu sayfada görüntüle/indir.
          </p>
          <div className="text-[#f2bf5e] mt-4 font-bold group-hover:translate-x-1 transition-transform">
            Aç →
          </div>
        </Link>

        <Link
          to="/contact"
          className="group bg-zinc-950 border border-zinc-900 hover:border-[#d9923b]/50 transition-all rounded-sm p-6"
        >
          <div className="flex items-center gap-3 text-white font-bold">
            <PhoneCall className="text-[#f2bf5e]" />
            Teklif / İletişim
          </div>
          <p className="text-zinc-500 mt-3">
            Hızlı iletişim için form veya iletişim bilgileri.
          </p>
          <div className="text-[#f2bf5e] mt-4 font-bold group-hover:translate-x-1 transition-transform">
            Aç →
          </div>
        </Link>
      </div>
    </div>
  );
}
