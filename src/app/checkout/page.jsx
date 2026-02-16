"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useCartStore from "@/store/useCartStore";
import { ShieldCheck, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const total = getTotal();
  const kdv = total * 0.2;
  const finalTotal = total + kdv;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (items.length === 0) {
      toast.error("Sepetiniz boş");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          total_amount: finalTotal,
          items: items,
        }),
      });

      if (!response.ok) throw new Error("Sipariş oluşturulamadı");

      const order = await response.json();
      clearCart();
      window.location.href = `/success/${order.order_code}`;
    } catch (error) {
      console.error(error);
      toast.error("Sipariş sırasında bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl text-white mb-8">
          Ödeme yapmak için sepetinizde ürün bulunmalıdır.
        </h1>
        <a
          href="/products"
          className="bg-[#d9923b] text-[#0d0d0d] font-bold px-8 py-4 rounded-sm"
        >
          Ürünlere Git
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <a
        href="/cart"
        className="inline-flex items-center space-x-2 text-zinc-500 hover:text-white mb-12 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="font-bold">Sepete Geri Dön</span>
      </a>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form Section */}
        <div className="space-y-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Sipariş Bilgileri
            </h1>
            <p className="text-zinc-500">
              Lütfen faturanız ve teslimatınız için gerekli bilgileri doldurun.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-zinc-400 text-sm font-bold">
                  Ad Soyad *
                </label>
                <input
                  {...register("customer_name", {
                    required: "Ad Soyad zorunludur",
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm focus:border-[#d9923b] outline-none"
                  placeholder="John Doe"
                />
                {errors.customer_name && (
                  <p className="text-red-500 text-xs">
                    {errors.customer_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-zinc-400 text-sm font-bold">
                  Firma Adı
                </label>
                <input
                  {...register("company_name")}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm focus:border-[#d9923b] outline-none"
                  placeholder="Zermax LTD"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-zinc-400 text-sm font-bold">
                  Telefon *
                </label>
                <input
                  {...register("phone", { required: "Telefon zorunludur" })}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm focus:border-[#d9923b] outline-none"
                  placeholder="05xx xxx xx xx"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-zinc-400 text-sm font-bold">
                  E-Posta *
                </label>
                <input
                  {...register("email", {
                    required: "E-Posta zorunludur",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Geçersiz e-posta",
                    },
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm focus:border-[#d9923b] outline-none"
                  placeholder="email@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-zinc-400 text-sm font-bold">
                Teslimat Adresi *
              </label>
              <textarea
                {...register("address", { required: "Adres zorunludur" })}
                rows={4}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm focus:border-[#d9923b] outline-none resize-none"
                placeholder="Mahalle, Sokak, No, İlçe/İl"
              />
              {errors.address && (
                <p className="text-red-500 text-xs">{errors.address.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-zinc-400 text-sm font-bold">
                Sipariş Notu
              </label>
              <textarea
                {...register("order_note")}
                rows={2}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm focus:border-[#d9923b] outline-none resize-none"
                placeholder="Eklemek istediğiniz özel bir not var mı?"
              />
            </div>

            <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-sm flex items-start space-x-4">
              <CheckCircle className="text-[#d9923b] mt-1 shrink-0" size={24} />
              <div>
                <h4 className="text-white font-bold mb-1">
                  Banka Transferi (EFT/Havale)
                </h4>
                <p className="text-zinc-500 text-sm">
                  Siparişiniz onaylandıktan sonra bir sonraki sayfada belirtilen
                  banka hesap bilgilerine ödemenizi gerçekleştirmeniz
                  gerekmektedir. Ödeme onayından sonra siparişiniz işleme
                  alınacaktır.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#d9923b] hover:bg-[#f2bf5e] disabled:bg-zinc-800 disabled:text-zinc-600 text-[#0d0d0d] font-black py-5 rounded-sm flex items-center justify-center space-x-3 transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>SİPARİŞİ TAMAMLA</span>
              )}
            </button>
          </form>
        </div>

        {/* Order Preview Section */}
        <div className="lg:pl-16">
          <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-sm sticky top-32">
            <h3 className="text-white font-bold text-xl mb-8 flex items-center space-x-2">
              <ShieldCheck className="text-[#d9923b]" />
              <span>Siparişiniz</span>
            </h3>

            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-zinc-900 rounded-sm overflow-hidden">
                      <img
                        src={item.image_url}
                        alt=""
                        className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">
                        {item.name}
                      </h4>
                      <p className="text-zinc-500 text-xs">
                        {item.quantity} Adet
                      </p>
                    </div>
                  </div>
                  <div className="text-zinc-300 font-bold text-sm">
                    {new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    }).format(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-zinc-900">
              <div className="flex justify-between text-zinc-500 text-sm">
                <span>Ara Toplam</span>
                <span>
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(total)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500 text-sm">
                <span>KDV (%20)</span>
                <span>
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(kdv)}
                </span>
              </div>
              <div className="flex justify-between text-[#f2bf5e] font-black text-xl pt-4">
                <span>GENEL TOPLAM</span>
                <span>
                  {new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  }).format(finalTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
