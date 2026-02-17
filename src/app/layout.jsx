"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Ürünler", href: "/products" },
    { name: "Katalog", href: "/catalog" },
    { name: "Hakkımızda", href: "/about" },
    { name: "İletişim", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d0d]/95 backdrop-blur-md py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex flex-col group">
          <span className="text-3xl font-bold tracking-tighter text-[#f2bf5e] group-hover:text-[#f2d272] transition-colors">
            ZERMAX
          </span>
          <div className="h-0.5 w-full bg-[#d9923b] transform scale-x-100 group-hover:scale-x-110 transition-transform origin-left"></div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-zinc-300 hover:text-[#f2bf5e] font-medium transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#d9923b] transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="/cart"
            className="relative p-2 text-zinc-300 hover:text-[#f2bf5e] transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d9923b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </a>
          <a
            href="/products"
            className="bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-bold px-6 py-2.5 rounded-sm transition-all transform hover:scale-105"
          >
            Sipariş Ver
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <a href="/cart" className="relative p-2 text-zinc-300">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d9923b] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                {cartCount}
              </span>
            )}
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-300 p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-b border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-zinc-300 hover:text-[#f2bf5e] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/products"
              onClick={() => setIsOpen(false)}
              className="bg-[#d9923b] text-[#0d0d0d] font-bold px-6 py-3 rounded-sm text-center"
            >
              Sipariş Ver
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-zinc-900 pt-20 pb-10">
      {/* ✅ 4 kolondan 3 kolona düşürdük */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        <div className="space-y-6">
          <a href="/" className="flex flex-col inline-block">
            <span className="text-3xl font-bold tracking-tighter text-[#f2bf5e]">
              ZERMAX
            </span>
            <div className="h-0.5 w-full bg-[#d9923b]"></div>
          </a>
          <p className="text-zinc-500 leading-relaxed">
            Endüstriyel yedek parça ve üretim çözümlerinde güvenilir
            partneriniz. Yüksek kalite, stok gücü ve teknik destek ile
            yanınızdayız.
          </p>

          {/* ✅ Sosyal ikonlar kaldırıldı */}
        </div>

        <div>
          <h3 className="text-white font-bold text-lg mb-6">
            Hızlı Bağlantılar
          </h3>
          <ul className="space-y-4 text-zinc-500">
            <li>
              <a
                href="/products"
                className="hover:text-[#f2bf5e] transition-colors"
              >
                Ürünler
              </a>
            </li>
            <li>
              <a
                href="/catalog"
                className="hover:text-[#f2bf5e] transition-colors"
              >
                Katalog
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-[#f2bf5e] transition-colors"
              >
                Hakkımızda
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-[#f2bf5e] transition-colors"
              >
                İletişim
              </a>
            </li>
          </ul>
        </div>

        {/* ✅ Kategoriler kolonu tamamen kaldırıldı */}

        <div>
          <h3 className="text-white font-bold text-lg mb-6">
            İletişim Bilgileri
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3 text-zinc-500">
              <MapPin className="text-[#d9923b] mt-1 shrink-0" size={18} />
              <span>
                Çavuşoğlu Mahallesi Ticarethane Sokak No:14 Yeşilyurt / Malatya
              </span>
            </li>
            <li className="flex items-center space-x-3 text-zinc-500">
              <Phone className="text-[#d9923b] shrink-0" size={18} />
              <span>+90 532 260 06 22</span>
            </li>
            <li className="flex items-center space-x-3 text-zinc-500">
              <Mail className="text-[#d9923b] shrink-0" size={18} />
              <span>zermax@zermax.com.tr</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} ZERMAX Endüstriyel. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-[#0d0d0d] text-zinc-100 selection:bg-[#d9923b] selection:text-[#0d0d0d]">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
          <Toaster position="top-center" richColors theme="dark" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
