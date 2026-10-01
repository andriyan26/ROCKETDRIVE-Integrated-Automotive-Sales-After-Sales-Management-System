import React, { useState } from "react";

export default function DigitalPassport() {
  const [selectedVin, setSelectedVin] = useState("MHF11BA30001");

  const passports = {
    MHF11BA30001: {
      vin: "MHF11BA30001",
      engine: "2NR-FE-10291",
      brand: "Toyota",
      model: "Toyota Avanza 1.5 G CVT",
      color: "Platinum White Pearl",
      owner: "Budi Santoso",
      nik: "3171092837190002",
      purchaseDate: "15 Jun 2026",
      deliveryDate: "20 Jun 2026",
      salesExecutive: "Doni Wijaya",
      currentMileage: "14.820 KM",
      warrantyStatus: "AKTIF",
      warrantyExpiry: "20 Jun 2029 / 100.000 KM",
      batteryHealth: "N/A (Mesin Bensin)",
      timeline: [
        { title: "UNIT DIBELI (SPK APPROVED)", date: "15 Jun 2026", desc: "SPK-2026-000088 diterbitkan & VIN dikunci permanen", completed: true },
        { title: "SERAH TERIMA KENDARAAN (DELIVERY)", date: "20 Jun 2026", desc: "Serah terima resmi di Showroom Pusat ROCKETDRIVE Jakarta", completed: true },
        { title: "INSPEKSI AWAL 1.000 KM", date: "12 Jul 2026", desc: "Pemeriksaan torsi baut, kondisi pelumas mesin - Kondisi 100% Sempurna", completed: true },
        { title: "SERVIS BERKALA 10.000 KM", date: "28 Agu 2026", desc: "Penggantian oli mesin, filter oli, dan rotasi ban", completed: true },
        { title: "SERVIS BERKALA 20.000 KM", date: "Terjadwal 28 Okt 2026", desc: "Penggantian minyak rem dan filter AC kabin", completed: false },
        { title: "INSPEKSI UTAMA 30.000 KM", date: "Mendatang 2027", desc: "Pemeriksaan busi & diagnostik multi-titik komputer", completed: false }
      ]
    },
    MHF12VH40001: {
      vin: "MHF12VH40001",
      engine: "2NR-VEX-4011",
      brand: "Toyota",
      model: "Toyota Veloz Hybrid Q CVT TSS",
      color: "Dark Red Mica Metallic",
      owner: "Dewi Lestari",
      nik: "3172081290330001",
      purchaseDate: "01 Agu 2026",
      deliveryDate: "08 Agu 2026",
      salesExecutive: "Rian Hidayat",
      currentMileage: "6.200 KM",
      warrantyStatus: "AKTIF",
      warrantyExpiry: "08 Agu 2031 / 150.000 KM",
      batteryHealth: "100% Status Kesehatan Baterai (SOH)",
      timeline: [
        { title: "UNIT DIBELI (SPK APPROVED)", date: "01 Agu 2026", desc: "SPK-2026-000124 disetujui & VIN dikunci", completed: true },
        { title: "SERAH TERIMA RESMI", date: "08 Agu 2026", desc: "Penyerahan kendaraan bersama sertifikasi baterai EV", completed: true },
        { title: "INSPEKSI AWAL 1.000 KM", date: "25 Agu 2026", desc: "Pemeriksaan telemetri sistem penggerak hybrid - Sempurna", completed: true },
        { title: "SERVIS BERKALA 10.000 KM", date: "Mendatang Nov 2026", desc: "Inspeksi cairan pendingin inverter & motor listrik", completed: false }
      ]
    }
  };

  const passport = passports[selectedVin] || passports["MHF11BA30001"];

  return (
    <section id="paspor-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="reveal-init text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
          <span>// INOVASI UNGGULAN OTOMOTIF</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">Paspor Digital Kendaraan</h2>
        <p className="text-slate-400 text-sm mt-2">
          Setiap unit kendaraan yang diserahterimakan memiliki identitas digital permanen berbasis VIN yang mengintegrasikan riwayat servis resmi, garansi pabrikan, dan kepemilikan terverifikasi.
        </p>

        {/* Pemilih VIN Demo */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <span className="text-xs text-slate-400">Pilih Contoh Kendaraan:</span>
          {Object.keys(passports).map((vKey) => (
            <button
              key={vKey}
              onClick={() => setSelectedVin(vKey)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition ${
                selectedVin === vKey
                  ? "bg-sky-500/20 text-cyan-300 border-cyan-400"
                  : "bg-slate-900 text-slate-400 border-slate-700"
              }`}
            >
              {vKey} ({passports[vKey].brand})
            </button>
          ))}
        </div>
      </div>

      <div className="reveal-init delay-100 max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-[#081325] to-[#040914] border-2 border-sky-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          PASPOR RESMI TERVERIFIKASI
        </div>

        <div className="pb-8 border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                PASPOR DIGITAL // VIN: {passport.vin}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">{passport.model}</h3>
              <p className="text-xs text-slate-400 mt-1">Warna: {passport.color} • No. Mesin: {passport.engine}</p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 block">Status Garansi Pabrikan</span>
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30 inline-block mt-1">
                ● {passport.warrantyStatus}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">Berlaku s/d {passport.warrantyExpiry}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-800 text-xs">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-400 block">Pemilik Terdaftar</span>
            <span className="font-bold text-white text-sm mt-0.5 block">{passport.owner}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-400 block">Tanggal Serah Terima</span>
            <span className="font-bold text-white text-sm mt-0.5 block">{passport.deliveryDate}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-400 block">Odometer Saat Ini</span>
            <span className="font-mono font-bold text-cyan-300 text-sm mt-0.5 block">{passport.currentMileage}</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-400 block">Kondisi Dapur Pacu</span>
            <span className="font-mono font-bold text-emerald-400 text-xs mt-1 block">{passport.batteryHealth}</span>
          </div>
        </div>

        <div className="pt-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-6 flex items-center gap-2">
            <span>Garis Waktu Siklus Hidup & Perjalanan Servis Bengkel</span>
            <span className="w-12 h-[1px] bg-cyan-400/40" />
          </h4>

          <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
            {passport.timeline.map((item, index) => (
              <div key={index} className="relative group text-xs">
                <span
                  className={`absolute -left-6 top-1 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                    item.completed
                      ? "bg-cyan-400 border-sky-300 ring-4 ring-cyan-500/20"
                      : "bg-slate-900 border-slate-700"
                  }`}
                />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h5 className={`font-bold ${item.completed ? "text-white" : "text-slate-400"}`}>
                    {item.title}
                  </h5>
                  <span className="font-mono text-cyan-400">{item.date}</span>
                </div>
                <p className="text-slate-400 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
