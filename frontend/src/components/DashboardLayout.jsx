import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { formatRupiah } from "../services/creditCalculator";
import CrmKanban from "./CrmKanban";
import ServiceBookingManager from "./ServiceBookingManager";
import DigitalPassport from "./DigitalPassport";

export default function DashboardLayout({ onSwitchToLanding, onOpenCreateSpk, onLogout }) {
  const { currentUser, switchDemoRole, vehicles, spks, leads, notifications } = useApp();
  const [activeTab, setActiveTab] = useState("ringkasan");
  const [searchQuery, setSearchQuery] = useState("");
  const [vinFilter, setVinFilter] = useState("SEMUA");

  // Matriks Hak Akses (Role-Based Access Control / RBAC) Menyeluruh Khusus Setiap Role
  const rolePermissions = {
    SUPER_ADMIN: {
      title: "👑 SUPER ADMIN (AKSES PENUH)",
      color: "text-cyan-400",
      allowedTabs: ["ringkasan", "inventaris", "spk", "crm", "bengkel", "paspor"]
    },
    SALES_EXECUTIVE: {
      title: "💼 SALES EKSEKUTIF (PENJUALAN)",
      color: "text-amber-400",
      allowedTabs: ["ringkasan", "inventaris", "spk", "crm"]
    },
    SERVICE_ADVISOR: {
      title: "🔧 SERVICE ADVISOR (KEPALA BENGKEL)",
      color: "text-emerald-400",
      allowedTabs: ["ringkasan", "bengkel", "paspor", "inventaris"]
    },
    CUSTOMER: {
      title: "👤 PELANGGAN TERVERIFIKASI",
      color: "text-purple-400",
      allowedTabs: ["ringkasan", "paspor", "bengkel"]
    }
  };

  const currentPerms = rolePermissions[currentUser.role] || rolePermissions.SUPER_ADMIN;

  // Sinkronisasi Tab Aktif saat Peran Berubah
  useEffect(() => {
    if (!currentPerms.allowedTabs.includes(activeTab)) {
      setActiveTab(currentPerms.allowedTabs[0]);
    }
  }, [currentUser.role]);

  // Perhitungan Inventaris Fisik VIN Real-time
  let totalUnits = 0;
  let readyUnits = 0;
  let bookedUnits = 0;
  let deliveredUnits = 15;
  let serviceUnits = 4;

  const allVins = [];
  vehicles.forEach((v) => {
    if (v.vins) {
      v.vins.forEach((vin) => {
        totalUnits++;
        if (vin.status === "READY") readyUnits++;
        if (vin.status === "BOOKED") bookedUnits++;
        allVins.push({
          ...vin,
          carBrand: v.brand,
          carModel: v.model,
          startingPrice: v.startingPrice
        });
      });
    }
  });

  const totalRevenue = spks.reduce((acc, curr) => acc + (curr.price || 0), 0);

  const filteredVins = allVins.filter((vin) => {
    const matchStatus = vinFilter === "SEMUA" || vin.status === vinFilter;
    const matchSearch =
      vin.vin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vin.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vin.engineNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const salesExecutives = [
    { name: "Doni Wijaya", leads: 14, followups: 28, testDrives: 6, spks: 5, closed: 4, revenue: 1650000000, conversion: "35.7%" },
    { name: "Rian Hidayat", leads: 12, followups: 24, testDrives: 5, spks: 4, closed: 3, revenue: 1420000000, conversion: "33.3%" },
    { name: "Faisal Akbar", leads: 9, followups: 18, testDrives: 3, spks: 3, closed: 2, revenue: 980000000, conversion: "30.0%" },
    { name: "Siti Rahma", leads: 8, followups: 15, testDrives: 2, spks: 2, closed: 2, revenue: 720000000, conversion: "25.0%" }
  ];

  const allSidebarLinks = [
    {
      id: "ringkasan",
      label: "Ringkasan & KPI Eksekutif",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: "inventaris",
      label: "Inventaris Fisik (VIN)",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      id: "spk",
      label: currentUser.role === "CUSTOMER" ? "Status Pemesanan Saya" : "SPK & Penguncian VIN",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: "crm",
      label: "Prospek Pelanggan (CRM)",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      id: "bengkel",
      label: currentUser.role === "CUSTOMER" ? "Booking Servis Mandiri" : "Slot Kapasitas Servis",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      id: "paspor",
      label: currentUser.role === "CUSTOMER" ? "Paspor & Garansi Mobil Saya" : "Paspor Digital Kendaraan",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    }
  ];

  // Filter Tab Sesuai Hak Akses Peran Pengguna Aktif
  const sidebarLinks = allSidebarLinks.filter((link) => currentPerms.allowedTabs.includes(link.id));

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#040813] text-slate-100 font-sans">
      
      {/* ==============================================================
           1. NAVBAR KIRI (SIDEBAR LENGKAP SEMUA FITUR)
      ============================================================== */}
      <aside className="w-full lg:w-72 bg-[#071020] border-r border-slate-800/90 flex flex-col shrink-0 shadow-2xl">
        
        {/* Brand Header */}
        <div className="h-20 px-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/25">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-wider text-white">ROCKET<span className="text-cyan-400">DRIVE</span></span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-sky-500/20 text-sky-400 font-mono font-bold">2026</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono block">PORTAL DEALER RESMI</span>
            </div>
          </div>
        </div>

        {/* Kartu Profil Pengguna Aktif */}
        <div className="p-4 mx-4 mt-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0c1a33] border border-slate-800 flex items-center gap-3 shadow-md">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
            {currentUser.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="overflow-hidden flex-1">
            <h4 className="font-bold text-xs text-white truncate">{currentUser.name}</h4>
            <span className={`text-[10px] ${currentPerms.color} font-mono font-bold uppercase block tracking-wider mt-0.5`}>
              {currentPerms.title}
            </span>
          </div>
        </div>

        {/* Menu Navigasi Samping Kiri (Navbar Kiri Fitur-Fitur Semuanya!) */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase">
            MENU UTAMA DEALERSHIP
          </div>
          {sidebarLinks.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 text-left text-xs font-semibold ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500/20 to-cyan-500/10 text-cyan-300 border-l-4 border-cyan-400 shadow-sm shadow-sky-500/10 font-bold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <div className={`${isActive ? "text-cyan-400" : "text-slate-400"}`}>
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bagian Bawah: Beralih ke Showroom & Logout */}
        <div className="p-4 border-t border-slate-800/80 space-y-2 bg-slate-950/40">
          <button
            onClick={onSwitchToLanding}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Lihat Showroom Publik</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full py-2.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2 transition"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Keluar (Logout)</span>
          </button>
        </div>
      </aside>

      {/* ==============================================================
           2. AREA KONTEN UTAMA + TOPBAR SANGAT PROFESIONAL
      ============================================================== */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOPBAR DASHBOARD LENGKAP */}
        <header className="h-20 bg-[#071020]/95 backdrop-blur-md border-b border-slate-800 px-6 sm:px-8 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
          
          {/* Kolom Pencarian Cepat Global */}
          <div className="relative w-full max-w-md hidden sm:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nomor rangka (VIN), nomor SPK, nama pelanggan..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Status Sistem & Tombol Aksi Cepat Atas */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Status Sistem Operasional Dealer */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistem Operasional: Aktif & Terenkripsi</span>
            </div>

            {/* Quick Switch Role Demo */}
            <select
              value={currentUser.role}
              onChange={(e) => switchDemoRole(e.target.value)}
              className="hidden lg:block px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono font-bold focus:outline-none focus:border-cyan-400"
            >
              <option value="SUPER_ADMIN">👑 Super Admin</option>
              <option value="SALES_EXECUTIVE">💼 Sales Eksekutif</option>
              <option value="SERVICE_ADVISOR">🔧 Service Advisor</option>
              <option value="CUSTOMER">👤 Pelanggan</option>
            </select>

            {/* Tombol Aksi Utama: Terbitkan SPK atau Pesan Unit Baru bagi Pelanggan */}
            {currentUser.role !== "CUSTOMER" ? (
              <button
                onClick={onOpenCreateSpk}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center gap-1.5 transition active:scale-95"
              >
                <span>+ Terbitkan SPK</span>
              </button>
            ) : (
              <button
                onClick={onSwitchToLanding}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 flex items-center gap-1.5 transition active:scale-95"
              >
                <span>+ Pesan Kendaraan Baru</span>
              </button>
            )}
          </div>
        </header>

        {/* KONTEN UTAMA BERDASARKAN TAB AKTIF */}
        <main className="flex-1 p-6 sm:p-8 space-y-8 overflow-y-auto">
          
          {/* TAB 1: RINGKASAN & KPI SESUAI HAK AKSES PERAN (4 TAMPILAN BERBEDA) */}
          {activeTab === "ringkasan" && currentUser.role === "SUPER_ADMIN" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">
                    KONSOL DIREKSI & ANALITIK DEALERSHIP
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    Performa Bisnis & Utilisasi Dealer Bulan Ini
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Konsolidasi menyeluruh penjualan otomotif, kepatuhan inventaris nomor rangka (VIN), dan performa bengkel cabang.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold">
                    👑 Mode: Direksi & Manajemen
                  </span>
                </div>
              </div>

              {/* Kartu Metrik KPI Utama Super Admin */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Gross Revenue Penjualan</span>
                  <div className="text-lg sm:text-xl xl:text-2xl font-black text-cyan-400 font-sans tracking-tight mt-1 whitespace-nowrap overflow-hidden text-ellipsis">
                    {formatRupiah(totalRevenue + 8500000000)}
                  </div>
                  <span className="text-[10px] text-emerald-400 mt-1 block font-semibold">
                    ↑ +24.5% dibanding bulan lalu
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Total Unit SPK Disetujui</span>
                  <div className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight mt-1">
                    {spks.length + 18} Unit
                  </div>
                  <span className="text-[10px] text-cyan-300 mt-1 block font-semibold">
                    100% VIN Terkunci Atomik
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Prospek Aktif (CRM Leads)</span>
                  <div className="text-xl sm:text-2xl font-black text-amber-400 font-sans tracking-tight mt-1">
                    {leads.length} Prospek
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {leads.filter((l) => l.temperature === "HOT").length} Prospek Prioritas Tinggi
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Utilisasi Slot Bengkel</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-sans tracking-tight mt-1">
                    87.5%
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    Proteksi overbooking aktif
                  </span>
                </div>
              </div>

              {/* Matriks Inventaris Fisik (Requirement #27) */}
              <div className="p-6 rounded-2xl bg-[#071020] border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    Matriks Status Inventaris Fisik (Nomor Rangka VIN)
                  </h3>
                  <span className="text-xs font-mono text-cyan-400">Total {totalUnits + deliveredUnits + serviceUnits} Unit Fisik Terdaftar</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-emerald-400 block">READY (Siap Dipesan)</span>
                      <div className="text-3xl font-black text-white font-mono mt-1">{readyUnits}</div>
                      <span className="text-[10px] text-slate-400">Tersedia di showroom / gudang</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400 block">BOOKED (Terkunci SPK)</span>
                      <div className="text-3xl font-black text-white font-mono mt-1">{bookedUnits}</div>
                      <span className="text-[10px] text-slate-400">Telah bayar tanda jadi</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">🔒</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-cyan-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-cyan-400 block">DELIVERED (Diserahkan)</span>
                      <div className="text-3xl font-black text-white font-mono mt-1">{deliveredUnits}</div>
                      <span className="text-[10px] text-slate-400">Paspor Digital aktif</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">🚗</div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-blue-500/30 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-blue-400 block">SERVICE (Di Bengkel)</span>
                      <div className="text-3xl font-black text-white font-mono mt-1">{serviceUnits}</div>
                      <span className="text-[10px] text-slate-400">Perawatan resmi berkala</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">🔧</div>
                  </div>
                </div>
              </div>

              {/* Peringkat Sales Advisor Resmi */}
              <div className="p-6 rounded-2xl bg-[#071020] border border-slate-800 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white">
                  Papan Peringkat Sales Executive & Konversi Penjualan
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                      <tr>
                        <th className="p-3">Nama Sales</th>
                        <th className="p-3">Prospek</th>
                        <th className="p-3">Follow-up</th>
                        <th className="p-3">Test Drive</th>
                        <th className="p-3">SPK Issued</th>
                        <th className="p-3">Closed Won</th>
                        <th className="p-3">Total Nilai Penjualan</th>
                        <th className="p-3">Tingkat Konversi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-sans">
                      {salesExecutives.map((se) => (
                        <tr key={se.name} className="hover:bg-slate-900/50">
                          <td className="p-3 font-bold text-white">{se.name}</td>
                          <td className="p-3 font-mono">{se.leads}</td>
                          <td className="p-3 font-mono">{se.followups}</td>
                          <td className="p-3 font-mono">{se.testDrives}</td>
                          <td className="p-3 font-mono text-cyan-300 font-bold">{se.spks}</td>
                          <td className="p-3 font-mono text-emerald-400 font-bold">{se.closed}</td>
                          <td className="p-3 font-mono text-cyan-400 font-bold">{formatRupiah(se.revenue)}</td>
                          <td className="p-3 font-mono font-bold text-amber-400">{se.conversion}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1 (ROLE 2): DASHBOARD SALES EKSEKUTIF (DONI WIJAYA) */}
          {activeTab === "ringkasan" && currentUser.role === "SALES_EXECUTIVE" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    WORKSPACE PENJUALAN // DONI WIJAYA
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Target & Kinerja Penjualan Pribadi</h2>
                  <p className="text-xs text-slate-400 mt-1">Fokus pada percepatan closing prospek nasabah prioritas, jadwal test drive harian, dan penguncian nomor rangka (VIN).</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold">
                    💼 Divisi Penjualan Showroom
                  </span>
                </div>
              </div>

              {/* 4 Kartu KPI Pribadi Sales Eksekutif */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/30 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Omset Penjualan Pribadi</span>
                  <div className="text-lg sm:text-xl xl:text-2xl font-black text-amber-400 font-sans tracking-tight mt-1 whitespace-nowrap overflow-hidden text-ellipsis">Rp1.650.000.000</div>
                  <span className="text-[10px] text-emerald-400 mt-1 block font-semibold">4 Closed / Target 5 Unit (80%)</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Estimasi Komisi Berjalan</span>
                  <div className="text-lg sm:text-xl xl:text-2xl font-black text-emerald-400 font-sans tracking-tight mt-1 whitespace-nowrap overflow-hidden text-ellipsis">Rp16.500.000</div>
                  <span className="text-[10px] text-amber-300 mt-1 block font-semibold">Peringkat #1 Tim Sales Bulan Ini 🏆</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Prospek Nasabah Aktif</span>
                  <div className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight mt-1">14 Nasabah</div>
                  <span className="text-[10px] text-cyan-300 mt-1 block">6 Siap Test Drive • 4 Negosiasi</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Rasio Closing Sales</span>
                  <div className="text-xl sm:text-2xl font-black text-cyan-400 font-sans tracking-tight mt-1">35,7%</div>
                  <span className="text-[10px] text-emerald-400 mt-1 block font-semibold">↑ Di atas rata-rata dealer (28%)</span>
                </div>
              </div>

              {/* Agenda Follow-Up Prioritas Hari Ini */}
              <div className="p-6 rounded-2xl bg-[#071020] border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Agenda Follow-Up & Test Drive Prioritas Hari Ini</h3>
                    <p className="text-xs text-slate-400">Jadwal interaksi nasabah VIP Doni Wijaya untuk percepatan penerbitan SPK.</p>
                  </div>
                  <button onClick={() => setActiveTab("crm")} className="text-xs text-amber-400 hover:text-amber-300 font-bold">Buka CRM Kanban →</button>
                </div>

                <div className="divide-y divide-slate-800 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 font-mono font-bold text-[10px]">HOT</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">Budi Santoso (0812-8899-1122)</h4>
                        <p className="text-slate-400">Minat: <strong>Toyota Avanza 1.5 G CVT</strong> • Status: Konfirmasi Transfer DP Rp 5.000.000</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-300 font-bold text-xs">⏰ 14:00 WIB</span>
                      <button onClick={onOpenCreateSpk} className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs">Kunci SPK</button>
                    </div>
                  </div>

                  <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/40">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-[10px]">WARM</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">Hendro Gunawan (0811-9988-7766)</h4>
                        <p className="text-slate-400">Minat: <strong>Hyundai Ioniq 5 Signature</strong> • Status: Jadwal Test Drive VIP Showroom Pusat</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-cyan-300 font-bold text-xs">⏰ 16:30 WIB</span>
                      <button onClick={() => alert("Catatan test drive Hendro Gunawan")} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700">Detail Test Drive</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast Moving Ready Stock */}
              <div className="p-6 rounded-2xl bg-[#071020] border border-slate-800 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white">Stok Unit Siap Kirim (Fast-Moving Stock Ready)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white">Toyota Avanza 1.5 G CVT</h4>
                      <p className="text-slate-400">Sisa Stok Gudang: <strong className="text-emerald-400">14 Unit</strong></p>
                    </div>
                    <button onClick={onOpenCreateSpk} className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">Kunci VIN</button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white">Toyota Veloz Hybrid TSS</h4>
                      <p className="text-slate-400">Sisa Stok Gudang: <strong className="text-emerald-400">8 Unit</strong></p>
                    </div>
                    <button onClick={onOpenCreateSpk} className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">Kunci VIN</button>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-white">Suzuki Jimny 5-Door 4WD</h4>
                      <p className="text-slate-400">Sisa Stok Gudang: <strong className="text-amber-400">3 Unit (Hot)</strong></p>
                    </div>
                    <button onClick={onOpenCreateSpk} className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">Kunci VIN</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1 (ROLE 3): DASHBOARD SERVICE ADVISOR (AGUS PRATAMA) */}
          {activeTab === "ringkasan" && currentUser.role === "SERVICE_ADVISOR" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                    PUSAT OPERASIONAL BENGKEL RESMI & PURNA JUAL
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Monitoring Stall & Servis Berkala Hari Ini</h2>
                  <p className="text-xs text-slate-400 mt-1">Pemantauan kapasitas stall bengkel, jadwal servis masuk, klaim garansi APM, dan kesiapan teknisi bersertifikasi.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-mono text-xs font-bold">
                    🔧 Kepala Bengkel & SA
                  </span>
                </div>
              </div>

              {/* 4 Kartu Metrik Operasional Bengkel */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Unit Masuk Servis Hari Ini</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-sans tracking-tight mt-1">18 Mobil</div>
                  <span className="text-[10px] text-emerald-300 mt-1 block font-semibold">12 Selesai • 4 Dikerjakan • 2 Antre</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Utilisasi Stall Bengkel</span>
                  <div className="text-xl sm:text-2xl font-black text-cyan-400 font-sans tracking-tight mt-1">87,5%</div>
                  <span className="text-[10px] text-emerald-400 mt-1 block font-semibold">7 dari 8 Stall Aktif Digunakan</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Kapasitas Booking Terisi</span>
                  <div className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight mt-1">14 / 16 Slot</div>
                  <span className="text-[10px] text-amber-300 mt-1 block font-semibold">Tersisa 2 Slot Sore (Bebas Overbooking)</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Indeks Kepuasan CSI</span>
                  <div className="text-xl sm:text-2xl font-black text-emerald-400 font-sans tracking-tight mt-1">4.92 / 5.0</div>
                  <span className="text-[10px] text-emerald-300 mt-1 block font-semibold">Standar APM Terakreditasi ISO</span>
                </div>
              </div>

              {/* Papan Status Real-time 8 Stall Servis Bengkel Resmi */}
              <div className="p-6 rounded-2xl bg-[#071020] border border-slate-800 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white">Status Real-time 8 Stall Servis Bengkel Resmi</h3>
                    <p className="text-xs text-slate-400">Informasi pekerjaan kendaraan, mekanik penanggung jawab, dan progres pengerjaan.</p>
                  </div>
                  <button onClick={() => setActiveTab("bengkel")} className="text-xs text-emerald-400 hover:text-emerald-300 font-bold">Kelola Slot Bengkel →</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white font-mono">STALL 1 (Quick Service)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">90% Selesai</span>
                    </div>
                    <h4 className="font-bold text-cyan-300">Toyota Avanza (B 1829 RDV)</h4>
                    <p className="text-slate-400 mt-1">Servis Berkala 20.000 KM • Ganti Oli & Filter</p>
                    <span className="text-[10px] text-slate-500 block mt-2">Teknisi: Joko Santoso (Master Tech)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-cyan-500/40">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white font-mono">STALL 2 (General Repair)</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold text-[10px]">Dikerjakan</span>
                    </div>
                    <h4 className="font-bold text-cyan-300">Honda HR-V (B 2044 HR)</h4>
                    <p className="text-slate-400 mt-1">Inspeksi Rem, Spooring & Balancing</p>
                    <span className="text-[10px] text-slate-500 block mt-2">Teknisi: Bambang Sudiro</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-purple-500/40">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white font-mono">STALL 3 (EV & Hybrid Lab)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">Selesai</span>
                    </div>
                    <h4 className="font-bold text-purple-300">Hyundai Ioniq 5 (B 9011 EV)</h4>
                    <p className="text-slate-400 mt-1">Diagnostik Baterai SOH: 100% Sempurna</p>
                    <span className="text-[10px] text-slate-500 block mt-2">Teknisi: Dimas Arya (EV Certified)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-white font-mono">STALL 4 (TSS Calibration)</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">Persiapan</span>
                    </div>
                    <h4 className="font-bold text-amber-300">Toyota Veloz Hybrid</h4>
                    <p className="text-slate-400 mt-1">Kalibrasi Radar & Kamera TSS 3.0</p>
                    <span className="text-[10px] text-slate-500 block mt-2">Teknisi: Rahmat Hidayat</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1 (ROLE 4): DASHBOARD KHUSUS PELANGGAN (BUDI SANTOSO) */}
          {activeTab === "ringkasan" && currentUser.role === "CUSTOMER" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest block mb-1">
                    PORTAL RESMI KEPEMILIKAN MOBIL // BUDI SANTOSO
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">Selamat Datang, Bapak Budi Santoso</h2>
                  <p className="text-xs text-slate-400 mt-1">Informasi terpadu paspor digital kendaraan Anda, riwayat perawatan berkala, garansi APM, dan layanan darurat 24 jam.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-400/30 text-purple-300 font-mono text-xs font-bold">
                    👤 Pemilik Unit Terverifikasi
                  </span>
                </div>
              </div>

              {/* 4 Kartu Informasi Mobil Milik Pelanggan */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Kendaraan Resmi Anda</span>
                  <div className="text-lg sm:text-xl font-black text-white font-sans tracking-tight mt-1 truncate">Toyota Avanza</div>
                  <span className="text-[10px] text-cyan-300 mt-1 block font-semibold truncate">1.5 G CVT • No. Pol: B 1829 RDV</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Garansi Pabrikan APM</span>
                  <div className="text-lg sm:text-xl font-black text-emerald-400 font-sans tracking-tight mt-1">AKTIF</div>
                  <span className="text-[10px] text-emerald-300 mt-1 block font-semibold truncate">Berlaku s/d Jun 2029 / 100.000 KM</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Servis Berkala Berikutnya</span>
                  <div className="text-lg sm:text-xl font-black text-cyan-400 font-sans tracking-tight mt-1">20.000 KM</div>
                  <span className="text-[10px] text-slate-400 mt-1 block truncate">Jadwal: 28 Okt 2026 (28 Hari Lagi)</span>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl overflow-hidden">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Poin Loyalitas Pelanggan</span>
                  <div className="text-lg sm:text-xl font-black text-amber-400 font-sans tracking-tight mt-1">1.500 Poin</div>
                  <span className="text-[10px] text-amber-300 mt-1 block font-semibold truncate">Voucher Diskon Servis 15% Siap Pakai</span>
                </div>
              </div>

              {/* Pelacak Alur Kepemilikan & Status Dokumen */}
              <div className="p-6 rounded-2xl bg-[#071020] border border-cyan-500/30 space-y-5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">Status Kepemilikan & Berkas Legalitas Kendaraan</h3>
                    <p className="text-xs text-slate-400">Seluruh dokumen legal terverifikasi langsung dengan nomor rangka (VIN).</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
                    Unit Telah Diserahterimakan ✓
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs">
                    <span className="text-emerald-400 font-bold block mb-1">1. Pemesanan SPK</span>
                    <p className="text-white font-mono font-bold">SPK-2026-000088</p>
                    <span className="text-[10px] text-emerald-400">✓ Tanda Jadi Lunas</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs">
                    <span className="text-emerald-400 font-bold block mb-1">2. Alokasi Nomor Rangka</span>
                    <p className="text-cyan-300 font-mono font-bold">MHF11BA30001</p>
                    <span className="text-[10px] text-emerald-400">✓ Terkunci Permanen</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs">
                    <span className="text-emerald-400 font-bold block mb-1">3. Faktur & STNK</span>
                    <p className="text-white">B 1829 RDV</p>
                    <span className="text-[10px] text-emerald-400">✓ Selesai Terbit</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs">
                    <span className="text-emerald-400 font-bold block mb-1">4. Serah Terima</span>
                    <p className="text-white">Showroom Pusat Senayan</p>
                    <span className="text-[10px] text-emerald-400">✓ Unit Diterima Konsumen</span>
                  </div>
                </div>
              </div>

              {/* Panel Tombol Aksi Cepat Pelanggan */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 via-[#071020] to-sky-950/30 border border-purple-500/30 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white">Layanan Mandiri Pelanggan ROCKETDRIVE</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button onClick={() => setActiveTab("bengkel")} className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-purple-500/40 text-left transition group">
                    <span className="text-2xl block mb-2">📅</span>
                    <h4 className="font-bold text-white group-hover:text-purple-300 text-xs">Booking Servis Berkala</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Pilih tanggal dan jam servis tanpa perlu antre di bengkel resmi.</p>
                  </button>
                  <button onClick={() => setActiveTab("paspor")} className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-left transition group">
                    <span className="text-2xl block mb-2">📘</span>
                    <h4 className="font-bold text-white group-hover:text-cyan-300 text-xs">Buku Paspor Mobil Saya</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Lihat riwayat perawatan lengkap dan klaim garansi APM kendaraan Anda.</p>
                  </button>
                  <a href="tel:1500888" className="p-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-rose-500/40 text-left transition group">
                    <span className="text-2xl block mb-2">🚨</span>
                    <h4 className="font-bold text-white group-hover:text-rose-300 text-xs">Bantuan Derek Darurat 24 Jam</h4>
                    <p className="text-[11px] text-slate-400 mt-1">Hotline darurat siaga 24 jam gratis untuk pemilik kendaraan resmi: 1500-888.</p>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTARIS FISIK VIN */}
          {activeTab === "inventaris" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-white">
                    Registri Inventaris Fisik & Pelacakan Nomor Rangka (VIN)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Setiap unit fisik kendaraan terverifikasi dengan nomor rangka unik, nomor mesin, dan lokasi penyimpanan resmi.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={vinFilter}
                    onChange={(e) => setVinFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-cyan-300"
                  >
                    <option value="SEMUA">Semua Status</option>
                    <option value="READY">READY (Siap Jual)</option>
                    <option value="BOOKED">BOOKED (Terkunci SPK)</option>
                  </select>
                  <button
                    onClick={onOpenCreateSpk}
                    className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs"
                  >
                    + Kunci Unit VIN
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-[#071020] overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">Nomor VIN</th>
                      <th className="p-3.5">Model Kendaraan</th>
                      <th className="p-3.5">Nomor Mesin</th>
                      <th className="p-3.5">Warna Eksterior</th>
                      <th className="p-3.5">Lokasi Fisik</th>
                      <th className="p-3.5">Status Unit</th>
                      <th className="p-3.5">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-sans">
                    {filteredVins.map((vin) => (
                      <tr key={vin.vin} className="hover:bg-slate-900/50">
                        <td className="p-3.5 font-mono font-bold text-cyan-300">{vin.vin}</td>
                        <td className="p-3.5 font-bold text-white">{vin.carBrand} {vin.carModel}</td>
                        <td className="p-3.5 font-mono text-slate-300">{vin.engineNumber}</td>
                        <td className="p-3.5 text-slate-300">{vin.color}</td>
                        <td className="p-3.5 text-slate-400">{vin.location}</td>
                        <td className="p-3.5">
                          {vin.status === "READY" ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              READY
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              BOOKED (SPK)
                            </span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {vin.status === "READY" ? (
                            <button
                              onClick={onOpenCreateSpk}
                              className="px-2.5 py-1 rounded bg-sky-500/20 text-cyan-300 hover:text-white font-bold text-[10px]"
                            >
                              Kunci SPK
                            </button>
                          ) : (
                            <span className="text-slate-500 font-mono text-[10px]">Terkunci Atomik</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SPK & PENGUNCIAN VIN */}
          {activeTab === "spk" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black text-white">
                    {currentUser.role === "CUSTOMER"
                      ? "Status Pemesanan Kendaraan Anda (SPK Resmi)"
                      : "Registri Surat Pesanan Kendaraan (SPK) & Penguncian VIN"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {currentUser.role === "CUSTOMER"
                      ? "Lacak status pemesanan, verifikasi tanda jadi, alokasi nomor rangka (VIN), dan jadwal pengiriman unit."
                      : "Seluruh dokumen SPK resmi terhubung langsung dengan penguncian nomor rangka (VIN) dan kode QR verifikasi transaksi."}
                  </p>
                </div>
                {currentUser.role !== "CUSTOMER" ? (
                  <button
                    onClick={onOpenCreateSpk}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    + Buat SPK Baru
                  </button>
                ) : (
                  <button
                    onClick={onSwitchToLanding}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider shadow-md"
                  >
                    + Pesan Unit Baru
                  </button>
                )}
              </div>

              {/* Pelacak Progres Pemesanan Khusus Pelanggan */}
              {currentUser.role === "CUSTOMER" && (
                <div className="p-6 rounded-2xl bg-[#071020] border border-cyan-500/30 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono font-bold text-cyan-400">STATUS PEMESANAN AKTIF</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-xs">
                      VIN TERKUNCI & TERALOKASI
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs">
                      <span className="text-emerald-400 font-bold block mb-1">1. Tanda Jadi</span>
                      <p className="text-slate-300">Lunas Rp 5.000.000</p>
                      <span className="text-[10px] text-emerald-400">✓ Terverifikasi</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/40 text-xs">
                      <span className="text-emerald-400 font-bold block mb-1">2. Alokasi VIN</span>
                      <p className="text-cyan-300 font-mono font-bold">MHF11BA30001</p>
                      <span className="text-[10px] text-emerald-400">✓ Terkunci Atomik</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/40 text-xs">
                      <span className="text-cyan-400 font-bold block mb-1">3. Faktur & STNK</span>
                      <p className="text-slate-300">Pemberkasan Polda</p>
                      <span className="text-[10px] text-cyan-400 animate-pulse">● Sedang Berjalan</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs opacity-60">
                      <span className="text-slate-400 font-bold block mb-1">4. Serah Terima</span>
                      <p className="text-slate-400">Estimasi 3 Hari</p>
                      <span className="text-[10px] text-slate-500">Menunggu Jadwal</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="divide-y divide-slate-800 rounded-xl bg-[#071020] border border-slate-800 overflow-hidden text-xs shadow-xl">
                {spks.map((spk) => (
                  <div key={spk.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-900/40">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-cyan-400">{spk.id}</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                          {spk.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm mt-1">{spk.customerName} ({spk.customerPhone})</h4>
                      <p className="text-slate-400 mt-0.5">
                        Unit: {spk.vehicleModel} • VIN: <span className="text-cyan-300 font-mono font-bold">{spk.vin}</span> • Sales: {spk.salesAdvisor}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-base font-black text-white font-mono block">
                        {formatRupiah(spk.price)}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono font-bold">
                        Tanda Jadi: {formatRupiah(spk.bookingFee)} ({spk.paymentStatus})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CRM KANBAN PROSPEK */}
          {activeTab === "crm" && (
            <div className="space-y-6">
              <CrmKanban />
            </div>
          )}

          {/* TAB 5: KAPASITAS BENGKEL */}
          {activeTab === "bengkel" && (
            <div className="space-y-6">
              <ServiceBookingManager />
            </div>
          )}

          {/* TAB 6: PASPOR DIGITAL KENDARAAN */}
          {activeTab === "paspor" && (
            <div className="space-y-6">
              <DigitalPassport />
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
