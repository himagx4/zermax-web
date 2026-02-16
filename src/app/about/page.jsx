"use client";

import React from "react";
import { Target, Users, Award, History, Factory, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="py-24 bg-[#080808] border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            Hakkımızda
          </h1>
          <p className="text-[#d9923b] font-bold tracking-widest uppercase text-sm mb-12">
            ENDÜSTRİYEL GÜCÜN MERKEZİ
          </p>
          <div className="max-w-3xl mx-auto h-0.5 bg-gradient-to-r from-transparent via-[#d9923b] to-transparent"></div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white leading-tight italic">
              20 Yıllık Tecrübe, <br />
              <span className="text-[#f2bf5e]">Sınırsız Güven.</span>
            </h2>
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>
                ZERMAX, 2006 yılında Malatya'da endüstriyel yedek parça
                tedariği ve teknik servis hizmetleri sağlamak amacıyla
                kurulmuştur. Kuruluşumuzdan bu yana temel ilkemiz;
                müşterilerimize en kaliteli ürünleri, en hızlı şekilde ve teknik
                destek güvencesiyle sunmaktır.
              </p>
              <p>
                Bugün İMES Sanayi Sitesi'ndeki merkezimiz ve geniş stok
                kapasitemizle, Türkiye'nin dört bir yanındaki üretim
                tesislerine, maden ocaklarına ve fabrikalara kesintisiz hizmet
                vermekteyiz.
              </p>
              <p>
                Gelişen teknolojiyi yakından takip ederek, dijital dönüşümümüzü
                tamamladık ve siz değerli iş ortaklarımıza artık web sitemiz
                üzerinden de hızlı sipariş imkanı tanıyoruz.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#d9923b]/10 rounded-full blur-3xl"></div>
            <div className="relative rounded-sm overflow-hidden border-4 border-zinc-900 rotate-2 group hover:rotate-0 transition-transform duration-700">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200"
                alt="Zermax Factory"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-[#080808] border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-[#d9923b]/50 transition-all">
              <Target className="text-[#d9923b] mb-6" size={48} />
              <h3 className="text-xl font-bold text-white mb-4 uppercase italic">
                Vizyonumuz
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Endüstriyel yedek parça sektöründe, dijital çözümlerle birleşmiş
                en hızlı ve güvenilir tedarik zinciri lideri olmak.
              </p>
            </div>
            <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-[#d9923b]/50 transition-all">
              <Award className="text-[#d9923b] mb-6" size={48} />
              <h3 className="text-xl font-bold text-white mb-4 uppercase italic">
                Misyonumuz
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Müşterilerimizin üretim süreçlerindeki duruş sürelerini minimize
                etmek için yüksek kaliteli parçaları teknik uzmanlıkla sunmak.
              </p>
            </div>
            <div className="p-8 bg-zinc-950 border border-zinc-900 rounded-sm hover:border-[#d9923b]/50 transition-all">
              <Users className="text-[#d9923b] mb-6" size={48} />
              <h3 className="text-xl font-bold text-white mb-4 uppercase italic">
                Değerlerimiz
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Dürüstlük, teknik mükemmeliyetçilik, müşteri odaklılık ve
                yenilikçi yaklaşım ZERMAX'ın temel taşlarını oluşturur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div className="space-y-2">
            <div className="text-5xl font-black text-[#f2bf5e]">20+</div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Yıllık Tecrübe
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-black text-[#f2bf5e]">10k+</div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Ürün Kalemi
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-black text-[#f2bf5e]">500+</div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Kurumsal Müşteri
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-5xl font-black text-[#f2bf5e]">24/7</div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Teknik Destek
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
