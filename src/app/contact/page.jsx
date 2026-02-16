"use client";

import React from "react";
import { Mail, Phone, MapPin, Clock, Send, Globe } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.",
    );
    e.target.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="mb-16">
        <h1 className="text-5xl font-black text-white mb-6 uppercase tracking-tight">
          İLETİŞİM
        </h1>
        <p className="text-zinc-500 text-lg max-w-2xl">
          Teknik destek, ürün stok bilgisi veya özel projeleriniz için bizimle
          iletişime geçebilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm text-[#d9923b]">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 uppercase text-sm tracking-widest">
                  Merkez Ofis
                </h4>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  Çavuşoğlu Mahallesi <br />
                  Ticarethane Sokak No:14 <br />
                  Yeşilyurt / Malatya
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm text-[#d9923b]">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 uppercase text-sm tracking-widest">
                  Telefon
                </h4>
                <p className="text-zinc-500 text-sm">
                  +90 532 260 06 22 <br />
                  +90 532 260 06 22
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm text-[#d9923b]">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 uppercase text-sm tracking-widest">
                  E-Posta
                </h4>
                <p className="text-zinc-500 text-sm">
                  zermax@zermax.com.tr <br />
                  zermax@zermax.com.tr
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-sm text-[#d9923b]">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="text-white font-bold mb-2 uppercase text-sm tracking-widest">
                  Çalışma Saatleri
                </h4>
                <p className="text-zinc-500 text-sm">
                  Hafta İçi: 08:30 - 18:00 <br />
                  Cumartesi: 09:00 - 13:00
                </p>
              </div>
            </div>
          </div>

          <div className="h-0.5 w-full bg-zinc-900"></div>

          <div className="flex space-x-4">
            <a
              href="#"
              className="text-zinc-600 hover:text-[#d9923b] transition-colors"
            >
              <Globe size={20} />
            </a>
            <span className="text-zinc-800">|</span>
            <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
              Sosyal Medyada Biz
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-950 border border-zinc-900 p-10 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#d9923b]/5 blur-[100px]"></div>

            <h3 className="text-2xl font-bold text-white mb-8 relative z-10 italic">
              Bize Mesaj Gönderin
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    Ad Soyad
                  </label>
                  <input
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-sm outline-none focus:border-[#d9923b] transition-colors"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    E-Posta
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-sm outline-none focus:border-[#d9923b] transition-colors"
                    placeholder="E-posta adresiniz"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  Konu
                </label>
                <input
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-sm outline-none focus:border-[#d9923b] transition-colors"
                  placeholder="Mesajınızın konusu"
                />
              </div>

              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  Mesajınız
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-sm outline-none focus:border-[#d9923b] transition-colors resize-none"
                  placeholder="Size nasıl yardımcı olabiliriz?"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black px-12 py-5 rounded-sm transition-all flex items-center justify-center space-x-3 shadow-xl shadow-[#d9923b]/10"
              >
                <span>MESAJI GÖNDER</span>
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
