"use client";

import React from "react";
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function CatalogPage() {
  const catalogs = [
    {
      title: "ZERMAX 2026 Genel Katalog",
      description:
        "Tüm ürün gruplarımızı kapsayan, teknik detayların yer aldığı ana kataloğumuz.",
      fileSize: "24.5 MB",
      updatedAt: "01.02.2026",
      icon: <FileText size={40} className="text-[#d9923b]" />,
    },
    {
      title: "Hidrolik Sistemler Kataloğu",
      description:
        "Hidrolik pompa, motor ve valf gruplarımız için hazırlanmış özel teknik katalog.",
      fileSize: "12.2 MB",
      updatedAt: "15.01.2026",
      icon: <ShieldCheck size={40} className="text-[#d9923b]" />,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tight">
          DİJİTAL KATALOG
        </h1>
        <p className="text-zinc-500 text-lg">
          Ürünlerimize ait tüm teknik dökümanlara, ölçülere ve uygulama
          alanlarına aşağıdaki kataloglarımızdan ulaşabilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {catalogs.map((catalog, idx) => (
          <div
            key={idx}
            className="group bg-zinc-950 border border-zinc-900 p-8 rounded-sm hover:border-[#d9923b]/50 transition-all duration-500 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Download size={120} />
            </div>

            <div className="mb-8">{catalog.icon}</div>

            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#f2bf5e] transition-colors">
              {catalog.title}
            </h3>
            <p className="text-zinc-500 mb-8 leading-relaxed">
              {catalog.description}
            </p>

            <div className="flex items-center space-x-6 mb-8 text-xs font-bold text-zinc-600 uppercase tracking-widest">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#d9923b] rounded-full"></div>
                <span>Boyut: {catalog.fileSize}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#d9923b] rounded-full"></div>
                <span>Güncelleme: {catalog.updatedAt}</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 rounded-sm flex items-center justify-center space-x-2 transition-all">
                <Eye size={20} />
                <span>Önizle</span>
              </button>
              <button className="flex-1 bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black py-4 rounded-sm flex items-center justify-center space-x-2 transition-all">
                <Download size={20} />
                <span>İndir (PDF)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Online Catalogue Promo */}
      <div className="mt-24 p-12 bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4 italic">
            Dijital Katalog Sipariş Sistemi
          </h2>
          <p className="text-zinc-500 max-w-xl">
            Kataloğumuzda yer alan ürünleri doğrudan sitemiz üzerinden sepete
            ekleyebilir ve hızlıca sipariş oluşturabilirsiniz. Üyelik
            gerektirmez.
          </p>
        </div>
        <a
          href="/products"
          className="bg-white text-[#0d0d0d] font-black px-10 py-5 rounded-sm hover:bg-[#f2bf5e] transition-all flex items-center space-x-2 shrink-0"
        >
          <span>ÜRÜNLERE GİT</span>
          <ExternalLink size={20} />
        </a>
      </div>
    </div>
  );
}
