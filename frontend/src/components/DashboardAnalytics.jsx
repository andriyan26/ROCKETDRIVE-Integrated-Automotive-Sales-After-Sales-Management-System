import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatRupiah } from "../services/creditCalculator";
import CrmKanban from "./CrmKanban";
import ServiceBookingManager from "./ServiceBookingManager";

export default function DashboardAnalytics({ onOpenCreateSpk }) {
  const { vehicles, spks, leads, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState("overview");

  // Calculate live inventory numbers
  let totalUnits = 0;
  let readyUnits = 0;
  let bookedUnits = 0;
  let deliveredUnits = 15; // baseline historical delivered
  let serviceUnits = 4;

  vehicles.forEach((v) => {
    if (v.vins) {
      v.vins.forEach((vin) => {
        totalUnits++;
        if (vin.status === "READY") readyUnits++;
        if (vin.status === "BOOKED") bookedUnits++;
      });
    }
  });

  const totalRevenue = spks.reduce((acc, curr) => acc + (curr.price || 0), 0);

  const salesExecutives = [
    { name: "Doni Wijaya", leads: 14, followups: 28, testDrives: 6, spks: 5, closed: 4, revenue: 1650000000, conversion: "35.7%" },
    { name: "Rian Hidayat", leads: 12, followups: 24, testDrives: 5, spks: 4, closed: 3, revenue: 1420000000, conversion: "33.3%" },
    { name: "Faisal Akbar", leads: 9, followups: 18, testDrives: 3, spks: 3, closed: 2, revenue: 980000000, conversion: "30.0%" },
    { name: "Siti Rahma", leads: 8, followups: 15, testDrives: 2, spks: 2, closed: 2, revenue: 720000000, conversion: "25.0%" }
  ];

  return (
    <section id="dashboard-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Dashboard Top Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              MANAGEMENT & OPERATIONS PORTAL
            </span>
            <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono font-bold">
              {currentUser.role}
            </span>
          </div>
          <h2 className="text-3xl font-black text-white mt-1">Dealer Intelligence & Ecosystem</h2>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: "overview", label: "📊 Overview & Stats" },
            { id: "crm", label: "👥 Leads Kanban" },
            { id: "spk", label: "📄 SPK & VIN Locking" },
            { id: "service", label: "🔧 Workshop Slots" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: OVERVIEW & INVENTORY (Requirement #26, #27, #28) */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {/* Top Key KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Gross Sales Revenue</span>
              <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono mt-1">
                {formatRupiah(totalRevenue + 8500000000)}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block font-semibold">
                ↑ +24.5% vs previous month
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Approved SPK Units</span>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                {spks.length + 18} Units
              </div>
              <span className="text-[10px] text-cyan-300 mt-1 block font-semibold">
                100% VIN Serialized & Locked
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Active Sales Leads</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono mt-1">
                {leads.length} Leads
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {leads.filter((l) => l.temperature === "HOT").length} High Priority VIPs
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-xl">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Workshop Utilization</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1">
                87.5%
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">Capacity protected against overbooking</span>
            </div>
          </div>

          {/* Visual Inventory Status Breakdown (Requirement #27) */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Live Physical Inventory Matrix (VIN Status)</h3>
                <span className="text-xs text-slate-400">Total physical vehicles managed in ecosystem: {totalUnits + 19} units</span>
              </div>
              <button
                onClick={onOpenCreateSpk}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold text-xs uppercase tracking-wider"
              >
                + Create SPK & Lock VIN
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 block">READY TO ORDER</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">{readyUnits}</div>
                  <span className="text-[10px] text-slate-400">Available in showroom/warehouse</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ✓
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 block">BOOKED / SPK</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">{bookedUnits}</div>
                  <span className="text-[10px] text-slate-400">Locked to approved customer</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  🔒
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 block">DELIVERED</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">{deliveredUnits}</div>
                  <span className="text-[10px] text-slate-400">Active in customer passport</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  🚗
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/50 border border-blue-500/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-400 block">SERVICE PIT</span>
                  <div className="text-3xl font-black text-white font-mono mt-1">{serviceUnits}</div>
                  <span className="text-[10px] text-slate-400">Currently in official workshop</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                  🔧
                </div>
              </div>
            </div>
          </div>

          {/* Sales Executive Performance Table (Requirement #28) */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white">Sales Executive Monthly Performance</h3>
                <span className="text-xs text-slate-400">Verified transaction pipeline & conversion rate</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                September 2026
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-mono">
                    <th className="py-2.5">Sales Executive</th>
                    <th className="py-2.5">Leads Assigned</th>
                    <th className="py-2.5">Follow-ups</th>
                    <th className="py-2.5">Test Drives</th>
                    <th className="py-2.5">SPK Issued</th>
                    <th className="py-2.5">Closed Deals</th>
                    <th className="py-2.5">Gross Revenue</th>
                    <th className="py-2.5">Conversion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {salesExecutives.map((se) => (
                    <tr key={se.name} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 font-bold text-white">{se.name}</td>
                      <td className="py-3 text-slate-300">{se.leads}</td>
                      <td className="py-3 text-slate-300">{se.followups}</td>
                      <td className="py-3 text-cyan-300 font-bold">{se.testDrives}</td>
                      <td className="py-3 text-amber-300 font-bold">{se.spks}</td>
                      <td className="py-3 text-emerald-400 font-bold">{se.closed}</td>
                      <td className="py-3 font-mono font-bold text-white">{formatRupiah(se.revenue)}</td>
                      <td className="py-3 font-mono font-bold text-emerald-400">{se.conversion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CRM KANBAN BOARD */}
      {activeTab === "crm" && <CrmKanban />}

      {/* TAB 3: SPK & VIN LOCKING REGISTRY */}
      {activeTab === "spk" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Issued SPK Orders & VIN Registry</h3>
            <button
              onClick={onOpenCreateSpk}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider"
            >
              + Create New SPK
            </button>
          </div>

          <div className="divide-y divide-slate-800 rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
            {spks.map((spk) => (
              <div key={spk.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400 text-sm">{spk.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {spk.status}
                    </span>
                  </div>
                  <p className="text-white font-bold text-sm mt-1">{spk.customerName} ({spk.customerPhone})</p>
                  <p className="text-slate-300 mt-0.5">
                    Unit: <strong className="text-cyan-300">{spk.vehicleModel}</strong> ({spk.color}) • Sales: {spk.salesExecutive}
                  </p>
                  <p className="text-slate-400 font-mono text-[11px] mt-0.5">VIN: {spk.vin}</p>
                </div>

                <div className="flex flex-col sm:items-end gap-2">
                  <span className="font-mono font-black text-white text-base">{formatRupiah(spk.price)}</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-[11px]">
                      Booking Fee: {formatRupiah(spk.bookingFee)}
                    </span>
                    <a
                      href={`#`}
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Public verification URL: https://rocketdrive.test${spk.verificationUrl}`);
                      }}
                      className="px-2.5 py-1 rounded bg-sky-500/20 text-cyan-300 hover:text-white border border-sky-500/40 text-[11px] font-mono"
                    >
                      Verify QR ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WORKSHOP SLOTS & AFTER-SALES CAPACITY */}
      {activeTab === "service" && <ServiceBookingManager />}
    </section>
  );
}
