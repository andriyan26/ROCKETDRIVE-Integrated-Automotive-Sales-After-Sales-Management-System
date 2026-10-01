import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext";
import { calculateCreditSimulation, formatRupiah } from "../services/creditCalculator";

export default function CreditSimulator({ preselectedVehicle, onProceedToSpk }) {
  const { vehicles, leasingPartners } = useApp();

  const [selectedVehicleId, setSelectedVehicleId] = useState(
    preselectedVehicle ? preselectedVehicle.id : vehicles[0]?.id || 1
  );
  const [dpPercent, setDpPercent] = useState(20);
  const [tenorMonths, setTenorMonths] = useState(36);
  const [selectedLeasingId, setSelectedLeasingId] = useState(leasingPartners[0]?.id || "mtf");

  const currentVehicle = vehicles.find((v) => v.id === Number(selectedVehicleId)) || vehicles[0];
  const currentLeasing = leasingPartners.find((l) => l.id === selectedLeasingId) || leasingPartners[0];

  const interestRate = currentLeasing.rates[tenorMonths] || 0.045;

  const calculation = useMemo(() => {
    return calculateCreditSimulation({
      otr: currentVehicle.startingPrice,
      dpPercent,
      tenorMonths,
      annualInterestRate: interestRate,
      adminFee: currentLeasing.adminFee,
      insuranceRate: currentLeasing.insuranceRate,
      isFirstInstallmentInAdvance: true
    });
  }, [currentVehicle, dpPercent, tenorMonths, interestRate, currentLeasing]);

  return (
    <section id="simulasi-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800">
      <div className="reveal-init text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-2">
          <span>// SIMULASI PEMBIAYAAN CERDAS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white">Kalkulator Simulasi Kredit Otomotif</h2>
        <p className="text-slate-400 text-sm mt-2">
          Perhitungan pembiayaan transparan dengan proyeksi suku bunga multi-leasing dan rincian Total Pembayaran Pertama (TDP).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Panel Input (7 Kolom) */}
        <div className="reveal-init delay-100 lg:col-span-7 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Pilih Kendaraan
            </label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400"
            >
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.brand} {v.model} — {formatRupiah(v.startingPrice)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Pilih Lembaga Pembiayaan / Leasing
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {leasingPartners.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setSelectedLeasingId(l.id)}
                  className={`p-3 rounded-xl text-xs font-semibold border transition text-center ${
                    selectedLeasingId === l.id
                      ? "bg-sky-500/20 border-cyan-400 text-cyan-300 shadow-md shadow-sky-500/10"
                      : "bg-slate-800/60 border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Uang Muka (DP %): <span className="text-cyan-400 font-mono text-sm">{dpPercent}%</span>
              </label>
              <span className="text-xs font-mono font-bold text-slate-200">
                {formatRupiah(calculation.dpAmount)}
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="50"
              step="5"
              value={dpPercent}
              onChange={(e) => setDpPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between gap-2 mt-2">
              {[15, 20, 25, 30, 40, 50].map((pct) => (
                <button
                  key={pct}
                  onClick={() => setDpPercent(pct)}
                  className={`px-3 py-1 rounded text-[11px] font-mono font-medium border ${
                    dpPercent === pct ? "bg-cyan-500/20 text-cyan-300 border-cyan-400" : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Jangka Waktu Pembiayaan (Tenor)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[12, 24, 36, 48, 60].map((m) => (
                <button
                  key={m}
                  onClick={() => setTenorMonths(m)}
                  className={`py-3 rounded-xl text-center border transition ${
                    tenorMonths === m
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold border-cyan-400 shadow-md shadow-sky-500/20"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                  }`}
                >
                  <span className="block text-sm font-mono font-bold">{m} Bln</span>
                  <span className="block text-[10px] text-slate-300">{m / 12} Thn</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Hasil Perhitungan (5 Kolom) */}
        <div className="reveal-init delay-200 lg:col-span-5 rounded-2xl bg-gradient-to-b from-slate-900 to-[#081325] border border-sky-500/40 p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400">Ringkasan Simulasi</span>
              <h3 className="text-lg font-black text-white mt-0.5">{currentVehicle.model}</h3>
            </div>
            <span className="px-2.5 py-1 rounded bg-sky-500/20 text-cyan-300 text-xs font-mono font-bold">
              {calculation.interestRatePercent}% p.a.
            </span>
          </div>

          <div className="p-5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">
              Estimasi Angsuran Bulanan
            </span>
            <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono mt-1">
              {formatRupiah(calculation.monthlyInstallment)}
              <span className="text-xs text-slate-400 font-normal"> / bulan</span>
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Selama {calculation.tenorMonths} bulan ({calculation.tenorYears} tahun)
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Harga Acuan OTR Jakarta</span>
              <span className="font-mono font-bold text-white">{formatRupiah(calculation.otr)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Uang Muka (DP {calculation.dpPercent}%)</span>
              <span className="font-mono font-semibold text-cyan-300">{formatRupiah(calculation.dpAmount)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Biaya Administrasi</span>
              <span className="font-mono text-slate-300">{formatRupiah(calculation.adminFee)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Premi Asuransi All Risk ({calculation.tenorYears} Thn)</span>
              <span className="font-mono text-slate-300">{formatRupiah(calculation.insuranceFee)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/80">
              <span className="text-slate-400">Angsuran Pertama (ADDM)</span>
              <span className="font-mono text-slate-300">{formatRupiah(calculation.firstInstallment)}</span>
            </div>
            <div className="flex justify-between py-2 border-t border-slate-700 font-bold text-sm bg-slate-800/40 px-2 rounded-lg">
              <span className="text-white">TOTAL TDP (Total Pembayaran Pertama)</span>
              <span className="font-mono text-cyan-400 text-base">{formatRupiah(calculation.totalTdp)}</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 leading-relaxed italic border-t border-slate-800 pt-3">
            "{calculation.disclaimer}"
          </p>

          <button
            onClick={() => onProceedToSpk(currentVehicle, calculation)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs tracking-wider uppercase transition shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
          >
            <span>Lanjutkan ke Pemesanan SPK / Kunci VIN</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
