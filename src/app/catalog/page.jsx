"use client";

import React from "react";
import { FileText, Download, Eye } from "lucide-react";

export default function CatalogPage() {
  // ✅ Senin repodaki dosya: public/catalog/ZERMAX-2026.pdf
  const pdfPath = "/catalog/ZERMAX-2026.pdf";

  const catalog = {
    title: "ZERMAX 2026 Genel Katalog",
    description:
      "Tüm ürün gruplarımızı kapsayan, teknik detayların yer aldığı ana kataloğumuz.",
    fileSize: "24.5 MB",
    updatedAt: "01.02.2026",
    icon: <FileText size={40} className="text-[#d9923b]" />,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16 text-center max-w-2xl mx-auto">
        <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tight">
          DİJİTAL KATALOG
        </h1>
        <p className="text-zinc-500 text-lg">
          Ürünlerimize ait tüm teknik dökümanlara, ölçülere ve uygulama
          alanlarına aşağıdaki kataloğumuzdan ulaşabilirsiniz.
        </p>
      </div>

      {/* ✅ Tek katalog, ortalı */}
      <div className="flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="group bg-zinc-950 border border-zinc-900 p-10 rounded-sm hover:border-[#d9923b]/50 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Download size={140} />
            </div>

            <div className="mb-8">{catalog.icon}</div>

            <h3 className="text-3xl font-black text-white mb-4 group-hover:text-[#f2bf5e] transition-colors">
              {catalog.title}
            </h3>
            <p className="text-zinc-500 mb-10 leading-relaxed text-lg">
              {catalog.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-10 text-xs font-bold text-zinc-600 uppercase tracking-widest">
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#d9923b] rounded-full"></div>
                <span>Boyut: {catalog.fileSize}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-[#d9923b] rounded-full"></div>
                <span>Güncelleme: {catalog.updatedAt}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* ✅ Önizle: PDF yeni sekmede */}
              <a
                href={pdfPath}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-4 rounded-sm flex items-center justify-center space-x-2 transition-all"
              >
                <Eye size={20} />
                <span>Önizle</span>
              </a>

              {/* ✅ İndir: PDF indir */}
              <a
                href={pdfPath}
                download
                className="flex-1 bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black py-4 rounded-sm flex items-center justify-center space-x-2 transition-all"
              >
                <Download size={20} />
                <span>İndir (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
