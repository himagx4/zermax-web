"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Package,
  Headphones,
} from "lucide-react";

// ✅ Vite asset import (GitHub Pages / base path sorunlarını bitirir)
import zermaxLogo from "../assets/zermax-logo.png";

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

  // ✅ Public’teki PDF (senin repoda: public/catalog/ZERMAX-2026.pdf)
  const catalogPdf = "/catalog/ZERMAX-2026.pdf";

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000"
            alt="Endüstriyel Üretim"
            className="w-full h-full object-cover opacity-30 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl space-y-8">
            <div className="inline-block border border-[#d9923b] px-4 py-1 rounded-full text-[#d9923b] text-sm font-bold tracking-widest uppercase">
              Endüstriyel Çözüm Ortağınız
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white leading-tight">
              ZERMAX <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d9923b] to-[#f2d272]">
                GÜÇ VE HIZ.
              </span>
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
              Endüstriyel dünyada kesintisiz üretim için ihtiyacınız olan her
              parça ZERMAX güvencesiyle tek tıkla kapınızda.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {/* ✅ SPA geçiş: Link */}
              <Link
                to="/products"
                className="bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-bold px-8 py-4 rounded-sm flex items-center space-x-2 transition-all transform hover:translate-x-1"
              >
                <span>Ürünleri İncele</span>
                <ArrowRight size={20} />
              </Link>

              {/* ✅ Katalog indir: PDF aç (yeni sekme) */}
              <a
                href={catalogPdf}
                target="_blank"
                rel="noreferrer"
                className="border border-zinc-700 hover:border-[#d9923b] text-white font-bold px-8 py-4 rounded-sm transition-all"
              >
                Katalog İndir
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
          <div className="w-1 h-12 bg-gradient-to-b from-[#d9923b] to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Stats / Strong Points */}
      <section className="py-24 bg-[#0d0d0d] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-zinc-950/50 border border-zinc-900 hover:border-[#d9923b]/50 transition-all duration-500 rounded-sm"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#f2bf5e] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-zinc-500 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured CTA */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-sm overflow-hidden p-12 md:p-24 border border-zinc-800">
            <div className="absolute inset-0 bg-[#d9923b]/5 z-0" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Tüm Yedek Parça İhtiyaçlarınız İçin <br />
                  <span className="text-[#d9923b]">Tek Adres.</span>
                </h2>

                <p className="text-zinc-400 text-lg mb-8">
                  ZERMAX kalitesiyle tanışmak ve size özel fiyat teklifleri
                  almak için kataloğumuzu inceleyin.
                </p>

                {/* ✅ SPA geçiş: Link */}
                <Link
                  to="/contact"
                  className="bg-white text-[#0d0d0d] font-bold px-10 py-4 rounded-sm hover:bg-[#f2bf5e] transition-all inline-block"
                >
                  Bize Ulaşın
                </Link>
              </div>

              {/* ✅ Sağ kutu: ZERMAX logo */}
              <div className="w-full md:w-1/3 aspect-square border-4 border-[#d9923b] p-4 rounded-sm rotate-2 hover:rotate-0 transition-transform duration-500 bg-black/20">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={zermaxLogo}
                    alt="ZERMAX Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_35px_rgba(217,146,59,0.45)]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
