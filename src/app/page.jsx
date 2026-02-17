"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Package,
  Headphones,
  FileText,
  PhoneCall,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      title: "Yüksek Kalite",
      description:
        "Tüm ürünlerimiz uluslararası standartlarda ve en yüksek kalite kontrol süreçlerinden geçerek size ulaşır.",
      icon: <ShieldCheck className="text-[#d9923b]" size={32} />,
    },
    {
      title: "Hızlı Teslimat",
      description:
        "Stok gücümüz sayesinde siparişlerinizi en kısa sürede hazırlayıp sevkiyata hazır hale getiriyoruz.",
      icon: <Zap className="text-[#d9923b]" size={32} />,
    },
    {
      title: "Geniş Stok Gücü",
      description:
        "Binlerce kalem endüstriyel yedek parça ve ekipman stoklarımızda her an emrinize amade.",
      icon: <Package className="text-[#d9923b]" size={32} />,
    },
    {
      title: "Teknik Destek",
      description:
        "Uzman kadromuzla ürün seçimi ve teknik detaylar konusunda her zaman yanınızdayız.",
      icon: <Headphones className="text-[#d9923b]" size={32} />,
    },
  ];

  const catalogPdf = "/catalog/ZERMAX-2026.pdf";

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/* arka plan glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-[#d9923b]/10 blur-[120px]" />
          <div className="absolute -bottom-56 -right-56 w-[620px] h-[620px] bg-[#f2bf5e]/10 blur-[140px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#d9923b]/40 text-[#f2bf5e] text-xs font-black tracking-widest uppercase mb-8">
              Endüstriyel çözüm ortağınız
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
              Endüstriyel yedek parça
              <br />
              <span className="text-[#f2bf5e]">ve ekipman çözümleri</span>
            </h1>

            <p className="text-zinc-400 text-lg mt-6 max-w-2xl leading-relaxed">
              Ürün kataloğumuzu inceleyin, ihtiyacınıza uygun parçaları hızlıca bulun.
              Teklif ve teknik detaylar için bizimle iletişime geçin.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link
                to="/products"
                className="bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black px-7 py-4 rounded-sm flex items-center gap-2 transition-all"
              >
                Ürünleri İncele <ArrowRight size={18} />
              </Link>

              <a
                href={catalogPdf}
                target="_blank"
                rel="noreferrer"
                className="bg-zinc-900/70 hover:bg-zinc-800 text-white font-bold px-7 py-4 rounded-sm flex items-center gap-2 transition-all border border-zinc-800"
              >
                Katalog İndir <FileText size={18} />
              </a>

              <Link
                to="/contact"
                className="border border-zinc-800 hover:border-zinc-600 text-white font-bold px-7 py-4 rounded-sm flex items-center gap-2 transition-all"
              >
                İletişim <PhoneCall size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 hover:border-[#d9923b]/40 transition-all"
            >
              <div className="mb-6">{f.icon}</div>
              <h3 className="text-xl font-black text-white mb-3">{f.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / TEKLIF */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-zinc-800 rounded-sm p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Teklif alın, doğru ürünü hızlı seçin.
            </h2>
            <p className="text-zinc-500 max-w-2xl leading-relaxed">
              İhtiyacınızı yazın; ürün alternatifi, teknik detay ve fiyat teklifini hızlıca iletelim.
              Kataloğu da inceleyerek doğru seçim yapabilirsiniz.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="bg-white text-[#0d0d0d] font-black px-8 py-4 rounded-sm hover:bg-[#f2bf5e] transition-all"
            >
              Bize Ulaşın
            </Link>
            <Link
              to="/catalog"
              className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-sm border border-zinc-800 transition-all"
            >
              Kataloğu Aç
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
