"use client";

import React from "react";
import { CheckCircle, Copy, Landmark, Info, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function SuccessPage({ params }) {
  const { orderCode } = params;

  const bankInfo = {
    bank: "Garanti BBVA",
    receiver: "ZERMAX ENDÜSTRİYEL DIŞ TİCARET LTD. ŞTİ.",
    iban: "TR00 0000 0000 0000 0000 0000 00",
    explanation: orderCode,
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} kopyalandı`);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-24 text-center">
      <div className="mb-12 flex justify-center">
        <div className="p-6 bg-green-500/10 rounded-full animate-pulse">
          <CheckCircle className="text-green-500" size={80} />
        </div>
      </div>

      <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
        Siparişiniz Alındı!
      </h1>
      <p className="text-zinc-500 text-lg mb-12">
        Sipariş kodunuz:{" "}
        <span className="text-[#f2bf5e] font-bold">#{orderCode}</span>. <br />
        Ödemeniz onaylandığında siparişiniz işleme alınacaktır.
      </p>

      {/* EFT Info Card */}
      <div className="bg-zinc-950 border border-[#d9923b]/30 p-8 rounded-sm text-left mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Landmark size={120} />
        </div>

        <h3 className="text-white font-bold text-xl mb-6 flex items-center space-x-2">
          <Landmark className="text-[#d9923b]" />
          <span>Banka Hesap Bilgileri</span>
        </h3>

        <div className="space-y-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-900 pb-4">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                Banka
              </p>
              <p className="text-white font-bold">{bankInfo.bank}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-900 pb-4">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                Alıcı Adı
              </p>
              <p className="text-white font-bold">{bankInfo.receiver}</p>
            </div>
            <button
              onClick={() => copyToClipboard(bankInfo.receiver, "Alıcı Adı")}
              className="text-[#d9923b] hover:text-[#f2bf5e] transition-colors flex items-center space-x-2 text-sm"
            >
              <Copy size={16} />
              <span>Kopyala</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-zinc-900 pb-4">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                IBAN
              </p>
              <p className="text-white font-bold font-mono tracking-tighter">
                {bankInfo.iban}
              </p>
            </div>
            <button
              onClick={() => copyToClipboard(bankInfo.iban, "IBAN")}
              className="text-[#d9923b] hover:text-[#f2bf5e] transition-colors flex items-center space-x-2 text-sm"
            >
              <Copy size={16} />
              <span>Kopyala</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                Açıklama (Sipariş Kodu)
              </p>
              <p className="text-[#f2bf5e] font-black">
                {bankInfo.explanation}
              </p>
            </div>
            <button
              onClick={() =>
                copyToClipboard(bankInfo.explanation, "Sipariş Kodu")
              }
              className="text-[#d9923b] hover:text-[#f2bf5e] transition-colors flex items-center space-x-2 text-sm"
            >
              <Copy size={16} />
              <span>Kopyala</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900/50 p-6 rounded-sm flex items-start space-x-4 text-left border border-zinc-800 mb-12">
        <Info className="text-zinc-400 mt-1 shrink-0" size={24} />
        <p className="text-zinc-400 text-sm leading-relaxed">
          Ödemenizi yaparken açıklama kısmına{" "}
          <span className="text-white font-bold">#{orderCode}</span> kodunu
          eklemeyi unutmayın. Ödemeniz bize ulaştığında kayıtlı e-posta
          adresinize bilgilendirme yapılacaktır.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="/products"
          className="bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black px-10 py-4 rounded-sm transition-all"
        >
          ALIŞVERİŞE DEVAM ET
        </a>
        <a
          href="/"
          className="text-zinc-500 hover:text-white font-bold transition-colors flex items-center space-x-2"
        >
          <span>Ana Sayfaya Dön</span>
          <ArrowRight size={18} />
        </a>
      </div>
    </div>
  );
}
