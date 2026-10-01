import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatRupiah } from "../services/creditCalculator";

export default function VehicleCatalog({ onSelectVehicle, onSimulateCredit, onBookTestDrive }) {
  const { vehicles } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("SEMUA");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { key: "SEMUA", label: "SEMUA" },
    { key: "CITY CAR", label: "CITY CAR" },
    { key: "MPV", label: "MPV" },
    { key: "SUV", label: "SUV" },
    { key: "CROSSOVER", label: "CROSSOVER" },
    { key: "EV", label: "LISTRIK (EV)" },
    { key: "HYBRID", label: "HYBRID" }
  ];

  const filteredVehicles = vehicles.filter((v) => {
    const matchesCategory =
      selectedCategory === "SEMUA" ||
      v.category.toUpperCase().includes(selectedCategory) ||
      (selectedCategory === "HYBRID" && v.fuel.toLowerCase().includes("hybrid")) ||
      (selectedCategory === "EV" && v.fuel.toLowerCase().includes("ev"));

    const matchesSearch =
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.engine.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="katalog-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Bagian */}
      <div className="reveal-init flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
            <span>// KATALOG & INVENTARIS FISIK</span>
            <span className="w-8 h-[1px] bg-cyan-400/50" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Temukan Kendaraan yang Sesuai dengan Perjalanan Anda
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
            Jelajahi 25+ model bersertifikasi resmi. Setiap unit fisik terhubung secara unik dengan pelacakan nomor rangka (VIN) dan harga transparan.
          </p>
        </div>

        {/* Kolom Pencarian */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari Avanza, Jimny, EV..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Filter Kategori */}
      <div className="reveal-init delay-100 flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
              selectedCategory === cat.key
                ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/25 scale-105"
                : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
        <span className="text-xs text-slate-500 ml-auto whitespace-nowrap pl-4">
          Menampilkan {filteredVehicles.length} Model
        </span>
      </div>

      {/* Grid Kartu Kendaraan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.map((car, idx) => {
          const readyCount = car.vins ? car.vins.filter((v) => v.status === "READY").length : 1;
          const bookedCount = car.vins ? car.vins.filter((v) => v.status === "BOOKED").length : 0;

          return (
            <div
              key={car.id}
              className="reveal-init group rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 hover:border-sky-500/50 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/10 hover:-translate-y-1"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-4 bg-slate-950">
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      if (!e.target.dataset.fallback) {
                        e.target.dataset.fallback = 'true';
                        e.target.src = encodeURI(car.image);
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/10">
                      {car.brand}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-sky-500/30 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-sky-400/30">
                      {car.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 font-bold">{readyCount} Unit Siap</span>
                    {bookedCount > 0 && <span className="text-amber-400 font-medium">({bookedCount} Dipesan)</span>}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {car.model}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-xs text-slate-400">Harga OTR Jakarta:</span>
                    <span className="text-lg font-black text-white font-mono">
                      {formatRupiah(car.startingPrice)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-800/80 text-xs text-slate-300 mb-4">
                  <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-800/40">
                    <span className="text-[10px] text-slate-400">Dapur Pacu</span>
                    <span className="font-semibold text-cyan-300 text-center truncate max-w-full">{car.fuel}</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-800/40">
                    <span className="text-[10px] text-slate-400">Kapasitas</span>
                    <span className="font-semibold text-white">{car.seats} Kursi</span>
                  </div>
                  <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-slate-800/40">
                    <span className="text-[10px] text-slate-400">Transmisi</span>
                    <span className="font-semibold text-slate-200 truncate max-w-full">{car.transmission}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => onSelectVehicle(car)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 group-hover:border-sky-500/40 border border-slate-700"
                >
                  <span>Lihat Spesifikasi & Detail</span>
                  <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSimulateCredit(car)}
                    className="py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-cyan-300 border border-sky-500/30 text-[11px] font-semibold transition"
                  >
                    Simulasi Kredit
                  </button>
                  <button
                    onClick={() => onBookTestDrive(car)}
                    className="py-2 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 hover:text-white border border-slate-700 text-[11px] font-semibold transition"
                  >
                    Uji Berkendara
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
