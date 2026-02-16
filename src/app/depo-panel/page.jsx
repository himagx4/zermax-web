"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Package,
  ShoppingBag,
  Settings,
  LayoutDashboard,
  ChevronRight,
  Search,
  Plus,
  Edit3,
  Trash2,
  Clock,
  PackageCheck,
  Truck,
  CheckCircle2,
  Lock,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

export default function DepoPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("orders");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const queryClient = useQueryClient();

  const { data: orders, isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      if (!res.ok) throw new Error("Siparişler yüklenemedi");
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Ürünler yüklenemedi");
      return res.json();
    },
    enabled: isAuthenticated,
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Durum güncellenemedi");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Sipariş durumu güncellendi");
    },
  });

  const saveProductMutation = useMutation({
    mutationFn: async (productData) => {
      const url = editingProduct
        ? `/api/products/${editingProduct.id}`
        : "/api/products";
      const method = editingProduct ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      if (!res.ok) throw new Error("Ürün kaydedilemedi");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setIsProductModalOpen(false);
      setEditingProduct(null);
      toast.success("Ürün başarıyla kaydedildi");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "zermax2026") {
      setIsAuthenticated(true);
      toast.success("Depo Paneline Hoş Geldiniz");
    } else {
      toast.error("Hatalı Şifre");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-6">
        <div className="max-w-md w-full bg-zinc-950 border border-zinc-900 p-8 rounded-sm shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-[#d9923b]/10 rounded-full mb-4 text-[#d9923b]">
              <Lock size={40} />
            </div>
            <h1 className="text-2xl font-black text-white">DEPO PANELİ</h1>
            <p className="text-zinc-500 text-sm">
              Giriş yapmak için yetkili şifresini girin.
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre"
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-4 rounded-sm outline-none focus:border-[#d9923b] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black py-4 rounded-sm transition-all"
            >
              GİRİŞ YAP
            </button>
          </form>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "EFT Bekleniyor":
        return <Clock className="text-yellow-500" size={18} />;
      case "Hazırlanıyor":
        return <Package className="text-blue-500" size={18} />;
      case "Hazır":
        return <PackageCheck className="text-purple-500" size={18} />;
      case "Sevk Edildi":
        return <Truck className="text-green-500" size={18} />;
      default:
        return <CheckCircle2 className="text-zinc-500" size={18} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0d0d0d]">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 border-r border-zinc-900 hidden lg:flex flex-col">
        <div className="p-8 border-b border-zinc-900">
          <span className="text-2xl font-black text-[#f2bf5e]">ZERMAX</span>
          <div className="h-0.5 w-full bg-[#d9923b] mt-1"></div>
          <p className="text-[10px] text-zinc-500 mt-2 font-bold tracking-widest uppercase">
            DEPO YÖNETİM SİSTEMİ
          </p>
        </div>
        <nav className="flex-1 py-8 space-y-2 px-4">
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm font-bold transition-all ${activeTab === "orders" ? "bg-[#d9923b] text-[#0d0d0d]" : "text-zinc-500 hover:text-white hover:bg-zinc-900"}`}
          >
            <ShoppingBag size={20} />
            <span>Siparişler</span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm font-bold transition-all ${activeTab === "products" ? "bg-[#d9923b] text-[#0d0d0d]" : "text-zinc-500 hover:text-white hover:bg-zinc-900"}`}
          >
            <Package size={20} />
            <span>Ürün Yönetimi</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-sm font-bold text-zinc-500 hover:text-white hover:bg-zinc-900 transition-all">
            <Settings size={20} />
            <span>Ayarlar</span>
          </button>
        </nav>
        <div className="p-4 border-t border-zinc-900">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="w-full text-zinc-600 hover:text-red-500 text-sm font-bold transition-colors"
          >
            Güvenli Çıkış
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">
                {activeTab === "orders" ? "Gelen Siparişler" : "Ürün Kataloğu"}
              </h2>
              <p className="text-zinc-500 text-sm">
                Operasyonel takip ve stok yönetimi.
              </p>
            </div>
            {activeTab === "products" && (
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black px-6 py-3 rounded-sm flex items-center space-x-2 transition-all"
              >
                <Plus size={20} />
                <span>YENİ ÜRÜN EKLE</span>
              </button>
            )}
          </header>

          {/* Tab Content */}
          {activeTab === "orders" ? (
            <div className="space-y-6">
              {ordersLoading ? (
                <div className="py-24 flex justify-center">
                  <Loader2 className="animate-spin text-[#d9923b]" size={48} />
                </div>
              ) : orders?.length === 0 ? (
                <div className="text-center py-24 border border-dashed border-zinc-800 rounded-sm text-zinc-500">
                  Sipariş bulunamadı.
                </div>
              ) : (
                orders?.map((order) => (
                  <div
                    key={order.id}
                    className="bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden"
                  >
                    <div className="p-6 border-b border-zinc-900 flex flex-wrap justify-between items-center gap-4 bg-zinc-900/30">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-zinc-900 rounded-sm text-[#f2bf5e]">
                          <ShoppingBag size={24} />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">
                            #{order.order_code}
                          </h4>
                          <p className="text-zinc-500 text-xs">
                            {new Date(order.created_at).toLocaleString("tr-TR")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-zinc-500 text-xs font-bold uppercase mb-1">
                            Toplam Tutar
                          </p>
                          <p className="text-[#f2bf5e] font-black text-xl">
                            {new Intl.NumberFormat("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                            }).format(order.total_amount)}
                          </p>
                        </div>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatusMutation.mutate({
                              id: order.id,
                              status: e.target.value,
                            })
                          }
                          className={`px-4 py-2 rounded-sm text-sm font-bold border-none outline-none cursor-pointer ${
                            order.status === "Sevk Edildi"
                              ? "bg-green-500/20 text-green-500"
                              : "bg-[#d9923b]/20 text-[#d9923b]"
                          }`}
                        >
                          <option value="EFT Bekleniyor">EFT Bekleniyor</option>
                          <option value="Hazırlanıyor">Hazırlanıyor</option>
                          <option value="Hazır">Hazır</option>
                          <option value="Sevk Edildi">Sevk Edildi</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <h5 className="text-white font-bold text-sm uppercase tracking-widest border-l-4 border-[#d9923b] pl-4">
                          Müşteri Detayları
                        </h5>
                        <div className="grid grid-cols-2 gap-6 text-sm">
                          <div>
                            <p className="text-zinc-600 mb-1 font-bold">
                              Ad Soyad
                            </p>
                            <p className="text-zinc-300">
                              {order.customer_name}
                            </p>
                          </div>
                          <div>
                            <p className="text-zinc-600 mb-1 font-bold">
                              Firma
                            </p>
                            <p className="text-zinc-300">
                              {order.company_name || "-"}
                            </p>
                          </div>
                          <div>
                            <p className="text-zinc-600 mb-1 font-bold">
                              Telefon
                            </p>
                            <p className="text-zinc-300">{order.phone}</p>
                          </div>
                          <div>
                            <p className="text-zinc-600 mb-1 font-bold">
                              E-Posta
                            </p>
                            <p className="text-zinc-300">{order.email}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-zinc-600 mb-1 font-bold">
                              Adres
                            </p>
                            <p className="text-zinc-300">{order.address}</p>
                          </div>
                          {order.order_note && (
                            <div className="col-span-2 bg-zinc-900/50 p-4 border border-zinc-800 rounded-sm italic text-zinc-400">
                              "{order.order_note}"
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h5 className="text-white font-bold text-sm uppercase tracking-widest border-l-4 border-[#d9923b] pl-4">
                          Ürünler
                        </h5>
                        <div className="space-y-4">
                          {order.items?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between items-center bg-zinc-900/20 p-4 rounded-sm border border-zinc-900"
                            >
                              <div>
                                <h6 className="text-white font-bold text-sm">
                                  {item.product_name}
                                </h6>
                                <p className="text-zinc-500 text-xs">
                                  {item.quantity} Adet x{" "}
                                  {new Intl.NumberFormat("tr-TR", {
                                    style: "currency",
                                    currency: "TRY",
                                  }).format(item.price_at_purchase)}
                                </p>
                              </div>
                              <div className="text-zinc-300 font-bold">
                                {new Intl.NumberFormat("tr-TR", {
                                  style: "currency",
                                  currency: "TRY",
                                }).format(
                                  item.quantity * item.price_at_purchase,
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="bg-zinc-950 border border-zinc-900 rounded-sm overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-zinc-900/50 border-b border-zinc-900">
                  <tr className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                    <th className="px-8 py-4">Ürün</th>
                    <th className="px-8 py-4">Kategori</th>
                    <th className="px-8 py-4">Stok</th>
                    <th className="px-8 py-4">Fiyat</th>
                    <th className="px-8 py-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {productsLoading ? (
                    <tr>
                      <td colSpan="5" className="py-24 text-center">
                        <Loader2 className="animate-spin text-[#d9923b] mx-auto" />
                      </td>
                    </tr>
                  ) : (
                    products?.map((product) => (
                      <tr
                        key={product.id}
                        className="text-sm group hover:bg-zinc-900/30 transition-colors"
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-4">
                            <img
                              src={product.image_url}
                              alt=""
                              className="w-12 h-12 rounded-sm object-cover border border-zinc-800"
                            />
                            <span className="text-white font-bold">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-zinc-400">
                          {product.category}
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock_quantity < 10 ? "bg-red-500/20 text-red-500" : "bg-green-500/20 text-green-500"}`}
                          >
                            {product.stock_quantity} Adet
                          </span>
                        </td>
                        <td className="px-8 py-6 text-[#f2bf5e] font-black">
                          {new Intl.NumberFormat("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                          }).format(product.price)}
                        </td>
                        <td className="px-8 py-6 text-right space-x-4">
                          <button
                            onClick={() => {
                              setEditingProduct(product);
                              setIsProductModalOpen(true);
                            }}
                            className="text-zinc-500 hover:text-[#f2bf5e] transition-colors"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button className="text-zinc-500 hover:text-red-500 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-[#0d0d0d]/90 backdrop-blur-sm"
            onClick={() => setIsProductModalOpen(false)}
          ></div>
          <div className="relative bg-zinc-950 border border-zinc-900 w-full max-w-2xl rounded-sm shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-white mb-8 border-l-4 border-[#d9923b] pl-4 uppercase tracking-tight">
              {editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
            </h3>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = Object.fromEntries(formData);
                saveProductMutation.mutate({
                  ...data,
                  price: parseFloat(data.price),
                  stock_quantity: parseInt(data.stock_quantity),
                });
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase">
                    Ürün Adı *
                  </label>
                  <input
                    name="name"
                    defaultValue={editingProduct?.name}
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm outline-none focus:border-[#d9923b]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase">
                    Kategori *
                  </label>
                  <select
                    name="category"
                    defaultValue={editingProduct?.category || "Yedek Parça"}
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm outline-none focus:border-[#d9923b]"
                  >
                    <option>Yedek Parça</option>
                    <option>Hidrolik Sistemler</option>
                    <option>Rulmanlar</option>
                    <option>Konveyör Sistemleri</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase">
                    Fiyat (TL) *
                  </label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    defaultValue={editingProduct?.price}
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm outline-none focus:border-[#d9923b]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-zinc-500 text-xs font-bold uppercase">
                    Stok Miktarı *
                  </label>
                  <input
                    name="stock_quantity"
                    type="number"
                    defaultValue={editingProduct?.stock_quantity}
                    required
                    className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm outline-none focus:border-[#d9923b]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase">
                  Görsel URL *
                </label>
                <input
                  name="image_url"
                  defaultValue={editingProduct?.image_url}
                  required
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm outline-none focus:border-[#d9923b]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase">
                  Kısa Açıklama
                </label>
                <textarea
                  name="description"
                  rows={3}
                  defaultValue={editingProduct?.description}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm outline-none focus:border-[#d9923b] resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-zinc-500 text-xs font-bold uppercase">
                  Teknik Özellikler
                </label>
                <textarea
                  name="technical_specs"
                  rows={4}
                  defaultValue={editingProduct?.technical_specs}
                  className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-sm outline-none focus:border-[#d9923b] resize-none"
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-8 py-3 text-zinc-500 hover:text-white font-bold transition-colors"
                >
                  İPTAL
                </button>
                <button
                  type="submit"
                  disabled={saveProductMutation.isLoading}
                  className="bg-[#d9923b] hover:bg-[#f2bf5e] text-[#0d0d0d] font-black px-12 py-3 rounded-sm transition-all"
                >
                  {saveProductMutation.isLoading ? "KAYDEDİLİYOR..." : "KAYDET"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
