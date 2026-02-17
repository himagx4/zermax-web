"use client";

import React from "react";
import { ArrowRight, BookOpen, Phone } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">

      {/* HERO */}
      <div className="max-w-4xl">
        <p className="text-[#d9923b] font-bold mb-6 tracking-widest">
          ZERMAX
        </p>

        <h1 className="text-6xl font-black text-white leading-tight mb-8">
          Endüstriyel yedek parça
          <br />
          ve ekipman çözümleri
        </h1>

        <p className="text-zinc-500 text-lg mb-12 max-w-2xl">
          Ürün kataloğumuzu inceleyin, ihtiyacınıza uygun parçaları hızlıca bulun.
        </p>

        <div className="flex flex-wrap gap-4">

          <Link
            to="/products"
            className="bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black px-8 py-4 rounded-sm flex items-center gap-2 transition-all"
          >
            Ürünleri İncele
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/catalog"
            className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-sm flex items-center gap-2 transition-all"
          >
            Kataloğu Aç
            <BookOpen size={18} />
          </Link>

          <Link
            to="/contact"
            className="border border-zinc-800 hover:border-zinc-600 text-white font-bold px-8 py-4 rounded-sm flex items-center gap-2 transition-all"
          >
            İletişim
            <Phone size={18} />
          </Link>

        </div>
      </div>

    </div>
  );
}
