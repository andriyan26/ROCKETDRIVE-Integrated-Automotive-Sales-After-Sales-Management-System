import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const { switchDemoRole } = useApp();
  const [email, setEmail] = useState("admin@rocketdrive.test");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    let detectedRole = "SUPER_ADMIN";

    if (cleanEmail.includes("sales") || cleanEmail.includes("doni")) {
      detectedRole = "SALES_EXECUTIVE";
    } else if (cleanEmail.includes("service") || cleanEmail.includes("agus") || cleanEmail.includes("bengkel")) {
      detectedRole = "SERVICE_ADVISOR";
    } else if (cleanEmail.includes("customer") || cleanEmail.includes("budi") || cleanEmail.includes("pelanggan")) {
      detectedRole = "CUSTOMER";
    } else {
      detectedRole = "SUPER_ADMIN";
    }

    switchDemoRole(detectedRole);
    onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#09152b] via-[#060e1d] to-[#030712] border border-cyan-500/35 shadow-[0_0_65px_rgba(14,165,233,0.28)] p-6 sm:p-9 my-4 transition-all">
        {/* Tombol Tutup */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition border border-slate-700/60"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header Portal Resmi Dealer */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono font-bold tracking-widest uppercase mb-3 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            PORTAL DEALER RESMI TERAKREDITASI
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/30 text-slate-950 font-black">
              <svg className="w-7 h-7 text-slate-950 font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-wider text-white">
                ROCKET<span className="text-cyan-400">DRIVE</span>
              </span>
              <span className="block text-[10px] text-slate-400 font-mono tracking-widest uppercase font-semibold">
                Dealer Management System
              </span>
            </div>
          </div>

          <h3 className="text-lg font-black text-slate-100 mt-3">Masuk ke Portal Operasional</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Silakan masukkan kredensial resmi Anda untuk mengakses sistem dealer terpadu.
          </p>
        </div>

        {/* Formulir Masuk Mewah */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
              </svg>
              <span>Alamat Email Resmi</span>
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@rocketdrive.test"
                className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition"
              />
              <div className="absolute right-3.5 top-3.5 text-slate-500 pointer-events-none">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Kata Sandi (Password)</span>
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-4 pr-11 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 font-mono transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 p-0.5 text-slate-400 hover:text-cyan-300 transition"
                title={showPassword ? "Sembunyikan Kata Sandi" : "Lihat Kata Sandi"}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {showPassword ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-slate-400 hover:text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0 cursor-pointer"
              />
              <span>Ingat saya di perangkat ini</span>
            </label>
            <button
              type="button"
              onClick={() => alert("Silakan hubungi IT Helpdesk Dealer di (021) 8899-7700 untuk reset kredensial akun Anda.")}
              className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold hover:underline"
            >
              Lupa kata sandi?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 mt-2"
          >
            <span>Masuk ke Sistem Operasional Dealer →</span>
          </button>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span>🔒</span> Enkripsi 256-Bit SSL APM Terverifikasi
            </span>
            <span className="font-mono text-cyan-400">Hotline 24 Jam: 1500-888</span>
          </div>
        </form>
      </div>
    </div>
  );
}
