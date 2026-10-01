import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Navbar({ activeSection, onNavigate, isLoggedIn, onOpenLogin, onLogout }) {
  const { currentUser, notifications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const navLinks = [
    { id: "hero", label: "Beranda" },
    { id: "katalog", label: "Katalog Kendaraan" },
    { id: "simulasi", label: "Simulasi Kredit" },
    { id: "paspor", label: "Paspor Digital" },
    { id: "mengapa", label: "Keunggulan" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#040914]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-wider text-white">ROCKET<span className="text-cyan-400">DRIVE</span></span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400 font-mono font-semibold">2026</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider">Drive Your Next Journey</p>
          </div>
        </div>

        {/* Menu Navigasi Desktop */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 transition-colors"
            >
              {item.label}
            </button>
          ))}
          {isLoggedIn && (
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-3.5 py-2 rounded-lg text-sm font-bold text-cyan-400 bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20 transition-all"
            >
              Portal Operasional
            </button>
          )}
        </div>

        {/* Area Aksi Kanan */}
        <div className="flex items-center gap-3">
          {/* Tombol Notifikasi */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white border border-slate-700/50 relative transition"
              title="Notifikasi"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>

            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h4 className="font-semibold text-sm text-white">Notifikasi Terkini</h4>
                  <span className="text-xs text-sky-400 font-mono">{notifications.length} pemberitahuan</span>
                </div>
                <div className="mt-2 space-y-2 max-h-60 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-xs">
                      <p className="text-slate-200">{n.text}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tombol Masuk atau Profil Pengguna */}
          {!isLoggedIn ? (
            <button
              onClick={onOpenLogin}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/25 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>Masuk / Login</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate("dashboard")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-sky-500/40"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-white leading-tight">{currentUser.name}</p>
                  <span className="text-[10px] text-cyan-400 font-mono font-medium block">
                    {currentUser.role.replace("_", " ")}
                  </span>
                </div>
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-slate-700 transition"
                title="Keluar (Logout)"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          )}

          {/* Hamburger Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu Drawer Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-slate-900 border-b border-slate-800 space-y-1">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              {item.label}
            </button>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => {
                onNavigate("dashboard");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-cyan-400 bg-sky-500/10"
            >
              Portal Operasional
            </button>
          ) : (
            <button
              onClick={() => {
                onOpenLogin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-bold text-sky-400"
            >
              Masuk / Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
