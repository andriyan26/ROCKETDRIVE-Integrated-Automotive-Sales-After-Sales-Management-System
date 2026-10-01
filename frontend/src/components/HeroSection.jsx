import React, { useState, useEffect } from "react";

export default function HeroSection({ onExploreVehicles, onCalculatePayment }) {
  const videoScenes = [
    {
      id: 1,
      videoSrc: "/videos/hero-01.mp4",
      poster: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=80",
      headline: "Mengemudi Menuju Masa Depan Anda.",
      subhead: "Temukan kendaraan baru impian Anda, jelajahi pembiayaan kredit cerdas, jadwalkan uji berkendara, dan kelola seluruh perjalanan kendaraan dalam satu ekosistem terpadu."
    },
    {
      id: 2,
      videoSrc: "/videos/hero-02.mp4",
      poster: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
      headline: "Presisi Teknologi & Pembiayaan Cerdas.",
      subhead: "Simulasi kredit transparan, kalkulasi multi-leasing otomatis, dan penguncian nomor rangka (VIN) instan di ujung jari Anda."
    },
    {
      id: 3,
      videoSrc: "/videos/hero-03.mp4",
      poster: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1920&q=80",
      headline: "Dari Minat Pertama hingga Setiap Perjalanan Setelahnya.",
      subhead: "Paspor Digital Kendaraan, pelacakan garansi pabrikan sinkron, dan penjadwalan servis bengkel resmi secara langsung."
    }
  ];

  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % videoScenes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [videoScenes.length]);

  const active = videoScenes[currentScene];

  return (
    <section id="hero-section" className="relative h-[88vh] min-h-[580px] flex items-center justify-center overflow-hidden">
      {/* Background Media (Video Lokal dengan Poster Fallback) */}
      <div className="absolute inset-0 z-0">
        <video
          key={active.videoSrc}
          autoPlay
          muted
          loop
          playsInline
          poster={active.poster}
          className="w-full h-full object-cover transition-opacity duration-1000"
        >
          <source src={active.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#040914] via-[#040914]/70 to-[#040914]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#040914]/50 to-[#040914]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-8">
        <div className="reveal-init delay-100 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-cyan-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-lg shadow-sky-500/20">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          DEALER RESMI TERAKREDITASI APM • STANDAR MEWAH
        </div>

        <h1 className="reveal-init delay-200 text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight sm:leading-none mb-6">
          ROCKET<span className="bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-transparent">DRIVE</span>
          <span className="block text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-200 mt-2 font-light">
            {active.headline}
          </span>
        </h1>

        <p className="reveal-init delay-300 max-w-2xl text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-normal">
          {active.subhead}
        </p>

        <div className="reveal-init delay-400 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
          <button
            onClick={onExploreVehicles}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-sky-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Jelajahi Kendaraan</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={onCalculatePayment}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-cyan-300 hover:text-white border border-slate-700 font-semibold text-sm tracking-wide transition-all backdrop-blur-md flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Hitung Simulasi Kredit</span>
          </button>
        </div>

        {/* 4 Kartu Metrik Keunggulan (Scroll Reveal Efek Mewah) */}
        <div className="reveal-init delay-500 grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-4xl">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-center hover:border-cyan-500/40 transition">
            <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono block">25+</span>
            <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">Model Mobil Resmi</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-center hover:border-cyan-500/40 transition">
            <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono block">4.50%</span>
            <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">Bunga p.a. Multi-Leasing</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-center hover:border-cyan-500/40 transition">
            <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono block">5 Thn</span>
            <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">Garansi APM Resmi</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-center hover:border-cyan-500/40 transition">
            <span className="text-xl sm:text-2xl font-black text-sky-400 font-mono block">100%</span>
            <span className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider">Alokasi VIN Asli</span>
          </div>
        </div>

        {/* Indikator Titik Carousel */}
        <div className="flex items-center gap-2 mt-8">
          {videoScenes.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentScene(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentScene === idx ? "w-8 bg-cyan-400 shadow-md shadow-cyan-400/50" : "w-2 bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
