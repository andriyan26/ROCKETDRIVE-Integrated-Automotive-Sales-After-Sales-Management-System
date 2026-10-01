import React from "react";

export default function FooterSection({ onNavigate }) {
  const whyCards = [
    {
      title: "INVENTARIS FISIK VIN",
      desc: "Setiap unit kendaraan fisik terverifikasi dengan nomor rangka (VIN) terdaftar pabrikan, siap dikirim tanpa antrean inden tak pasti.",
      icon: "🚗"
    },
    {
      title: "PEMBIAYAAN CERDAS",
      desc: "Transparansi simulasi kredit dengan suku bunga multi-leasing bersertifikat OJK, kepastian angsuran ADDM, dan total uang muka (TDP).",
      icon: "💳"
    },
    {
      title: "PENGUNCIAN ATOMIK SPK",
      desc: "Sistem penguncian nomor rangka pesimistik menjamin unit yang Anda pesan tidak akan diduplikasi oleh pembeli atau sales lain.",
      icon: "🔒"
    },
    {
      title: "PASPOR DIGITAL SERVIS",
      desc: "Riwayat perawatan resmi dan klaim garansi pabrikan terekam permanen dalam paspor digital unit kendaraan Anda secara realtime.",
      icon: "🔧"
    }
  ];

  return (
    <div>
      {/* BAGIAN KEUNGGULAN ROCKETDRIVE */}
      <section id="mengapa-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
            <span>// KEUNGGULAN DEALERSHIP TERPADU</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Standar Kemewahan & Keandalan ROCKETDRIVE</h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Membeli kendaraan adalah awal dari perjalanan istimewa Anda. Kami mengintegrasikan seluruh siklus kepemilikan mobil baru dengan teknologi mutakhir dan transparansi tanpa kompromi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-[#071020] border border-slate-800 hover:border-cyan-500/50 shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-base font-black tracking-wider text-white uppercase mb-2 group-hover:text-cyan-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER PUBLIK RESMI DEALER MEWAH */}
      <footer className="bg-[#03060f] border-t border-slate-800/90 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Kolom 1: Brand & Sertifikasi */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
                <svg className="w-6 h-6 text-slate-950 font-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-2xl font-black tracking-wider text-white">ROCKET<span className="text-cyan-400">DRIVE</span></span>
                <p className="text-[9px] uppercase tracking-widest text-slate-400 font-mono">PT ROCKETDRIVE MOTORS INDONESIA</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Jaringan dealer dan showroom otomotif terakreditasi resmi nasional. Menghadirkan pengalaman kepemilikan mobil baru terbaik dengan integrasi penjualan dan layanan purna jual berstandar internasional.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-bold">ISO 9001:2015</span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-bold">DEALER RESMI 2026</span>
            </div>
          </div>

          {/* Kolom 2: Model Kendaraan Populer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase">Kategori Kendaraan</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate("katalog")} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span>›</span> Multi-Purpose Vehicle (MPV)</button></li>
              <li><button onClick={() => onNavigate("katalog")} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span>›</span> Sport Utility Vehicle (SUV)</button></li>
              <li><button onClick={() => onNavigate("katalog")} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span>›</span> City Car & Crossover</button></li>
              <li><button onClick={() => onNavigate("katalog")} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span>›</span> Kendaraan Listrik Murni (EV)</button></li>
              <li><button onClick={() => onNavigate("katalog")} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span>›</span> Hybrid Smart Mobility TSS</button></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Purna Jual & Darurat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase">Layanan & Garansi</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => onNavigate("paspor")} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span>›</span> Paspor Digital Kendaraan (VIN)</button></li>
              <li><button onClick={() => onNavigate("simulasi")} className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"><span>›</span> Simulasi Kredit Multi-Leasing</button></li>
              <li><span className="text-slate-300 flex items-center gap-1.5"><span>›</span> Garansi Pabrikan 5 Tahun / 100rb KM</span></li>
              <li><span className="text-slate-300 flex items-center gap-1.5"><span>›</span> Booking Pit Servis Bengkel Resmi</span></li>
              <li><span className="text-emerald-400 font-bold flex items-center gap-1.5"><span>›</span> Derek Darurat 24 Jam: 1500-888</span></li>
            </ul>
          </div>

          {/* Kolom 4: Jaringan Showroom & Jam Kerja */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono tracking-widest text-cyan-400 uppercase">Showroom Utama</h4>
            <div className="text-xs text-slate-400 space-y-2">
              <p><strong class="text-white block">Pusat Senayan:</strong> Jl. Jend. Sudirman Kav. 22-24, Jakarta Pusat</p>
              <p><strong class="text-white block">Autoplex PIK 2:</strong> Boulevard Pantai Indah Kapuk, Jakarta Utara</p>
              <p className="pt-2 text-cyan-300 font-mono text-[11px]">
                ⏰ Buka Setiap Hari: 08.30 – 20.00 WIB
              </p>
            </div>
          </div>

        </div>

        {/* Partner Pembiayaan & Legal Copyright Resmi */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span>Mitra Pembiayaan Terakreditasi OJK:</span>
            <span className="font-bold text-white">BCA Finance</span>
            <span>•</span>
            <span className="font-bold text-white">Mandiri Tunas Finance</span>
            <span>•</span>
            <span className="font-bold text-white">ACC</span>
            <span>•</span>
            <span className="font-bold text-white">Adira</span>
          </div>
          <p className="font-mono text-[11px] text-slate-400">
            © 2026 PT ROCKETDRIVE MOTORS INDONESIA. Seluruh Hak Cipta Dilindungi Undang-Undang.
          </p>
        </div>
      </footer>
    </div>
  );
}
