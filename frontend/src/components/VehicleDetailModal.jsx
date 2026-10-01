import React, { useState } from "react";
import { formatRupiah } from "../services/creditCalculator";

export default function VehicleDetailModal({ vehicle, onClose, onSimulateCredit, onBookTestDrive, onStartSpk }) {
  if (!vehicle) return null;

  const [selectedVariant, setSelectedVariant] = useState(vehicle.variants ? vehicle.variants[0] : "");
  const [selectedColor, setSelectedColor] = useState(vehicle.colors ? vehicle.colors[0] : "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#0a1628] border border-slate-700/80 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-slate-400 hover:text-white hover:bg-black/90 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header Media Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-950">
          <img
            src={vehicle.image}
            alt={vehicle.model}
            className="w-full h-full object-cover"
            onError={(e) => {
              if (!e.target.dataset.fallback) {
                e.target.dataset.fallback = 'true';
                e.target.src = encodeURI(vehicle.image);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded bg-sky-500/20 text-cyan-400 text-xs font-bold font-mono uppercase tracking-wider border border-sky-400/30">
                {vehicle.brand} • {vehicle.category}
              </span>
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                {vehicle.warranty}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">{vehicle.model}</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-sm text-slate-400">Harga Acuan OTR Jakarta:</span>
              <span className="text-2xl font-black text-cyan-300 font-mono">
                {formatRupiah(vehicle.startingPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Variants & Colors Selector */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Variants */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Pilihan Varian Tersedia
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.variants?.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition ${
                      selectedVariant === v
                        ? "bg-sky-500/20 border-cyan-400 text-cyan-300"
                        : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Pilihan Warna Eksterior
              </label>
              <div className="flex flex-wrap gap-2">
                {vehicle.colors?.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      selectedColor === c
                        ? "bg-sky-500/20 border-cyan-400 text-cyan-300"
                        : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Key Specifications Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
              Spesifikasi Mesin & Teknis Kendaraan
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Dapur Pacu</span>
                <span className="text-xs font-bold text-white mt-1 block">{vehicle.fuel}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Kapasitas Mesin / Motor</span>
                <span className="text-xs font-bold text-white mt-1 block">{vehicle.engine}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Transmisi</span>
                <span className="text-xs font-bold text-white mt-1 block">{vehicle.transmission}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Kapasitas Tempat Duduk</span>
                <span className="text-xs font-bold text-white mt-1 block">{vehicle.seats} Penumpang</span>
              </div>
            </div>
          </div>

          {/* Features & Safety Highlights */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
              Fitur Teknologi & Keamanan Unggulan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {vehicle.features?.map((f, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-300">
                  <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Units in Stock with VIN Numbers (Requirement #2, #8) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Unit Inventaris Fisik (VIN Terverifikasi)
              </h4>
              <span className="text-[11px] text-slate-400 font-mono">
                {vehicle.vins ? vehicle.vins.length : 0} Unit Fisik Terlacak
              </span>
            </div>
            <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              {vehicle.vins?.map((vinItem) => (
                <div key={vinItem.vin} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-mono font-bold text-white">{vinItem.vin}</span>
                    <span className="text-slate-400 ml-2">Mesin: {vinItem.engine}</span>
                    <span className="text-slate-400 ml-2">({vinItem.color})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[11px]">{vinItem.location}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        vinItem.status === "READY"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {vinItem.status === "READY" ? "SIAP JUAL" : "DIPESAN"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => {
                onClose();
                onSimulateCredit(vehicle);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs tracking-wider transition border border-slate-700"
            >
              Simulasi Kredit
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTestDrive(vehicle);
              }}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-white font-bold text-xs tracking-wider transition border border-sky-500/40"
            >
              Uji Berkendara (Test Drive)
            </button>
            <button
              onClick={() => {
                onClose();
                onStartSpk(vehicle, selectedVariant, selectedColor);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-sky-500/25 transition"
            >
              Pesan & Kunci VIN (SPK)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
