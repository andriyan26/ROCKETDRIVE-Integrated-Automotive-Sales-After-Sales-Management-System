import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function CrmKanban() {
  const { leads, setLeads } = useApp();

  const pipelineStages = [
    { key: "NEW", label: "Prospek Baru", color: "border-sky-500" },
    { key: "CONTACTED", label: "Sudah Dihubungi", color: "border-blue-500" },
    { key: "INTERESTED", label: "Berminat Tinggi", color: "border-indigo-500" },
    { key: "TEST_DRIVE", label: "Uji Berkendara", color: "border-cyan-500" },
    { key: "NEGOTIATION", label: "Tahap Negosiasi", color: "border-amber-500" },
    { key: "SPK", label: "SPK Diterbitkan", color: "border-emerald-500" },
    { key: "CLOSED", label: "Selesai (Menang)", color: "border-green-600" },
    { key: "LOST", label: "Gugur / Batal", color: "border-rose-600" }
  ];

  const updateLeadStatus = (leadId, newStatus) => {
    setLeads((prev) =>
      prev.map((ld) => (ld.id === leadId ? { ...ld, status: newStatus } : ld))
    );
  };

  const getTempBadge = (temp) => {
    switch (temp) {
      case "HOT":
        return "bg-rose-500/20 text-rose-300 border-rose-500/30";
      case "WARM":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30";
      default:
        return "bg-sky-500/20 text-sky-300 border-sky-500/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header CRM & Kartu Metrik */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Total Prospek Aktif</span>
          <div className="text-2xl font-black text-white mt-1">{leads.length} Pelanggan</div>
          <span className="text-[10px] text-emerald-400 font-medium">↑ +18% dari minggu lalu</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Prospek Prioritas (HOT)</span>
          <div className="text-2xl font-black text-rose-400 mt-1">
            {leads.filter((l) => l.temperature === "HOT").length} VIP
          </div>
          <span className="text-[10px] text-slate-400">Peluang closing tinggi</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Dalam Uji Berkendara</span>
          <div className="text-2xl font-black text-cyan-400 mt-1">
            {leads.filter((l) => l.status === "TEST_DRIVE").length} Unit
          </div>
          <span className="text-[10px] text-cyan-300">Unit demo aktif</span>
        </div>
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-mono text-slate-400 uppercase">Rasio Konversi Lead-to-SPK</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">28.4%</div>
          <span className="text-[10px] text-emerald-400">Target tercapai (&gt;25%)</span>
        </div>
      </div>

      {/* Papan Kanban Pipeline Horisontal */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1200px]">
          {pipelineStages.map((stage) => {
            const stageLeads = leads.filter((l) => l.status === stage.key);
            return (
              <div
                key={stage.key}
                className="w-72 shrink-0 rounded-2xl bg-gradient-to-b from-[#071020] to-[#040813] border border-slate-800 p-4 flex flex-col shadow-lg"
              >
                {/* Judul Kolom */}
                <div className={`flex items-center justify-between pb-3 border-b-2 ${stage.color} mb-3`}>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200">
                    {stage.label}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-slate-800 text-xs font-mono font-bold text-cyan-400">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Kartu Prospek */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-1">
                  {stageLeads.length === 0 ? (
                    <div className="text-center py-8 text-slate-600 text-xs italic">
                      Tidak ada prospek pada tahap ini
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700/60 hover:border-cyan-400/50 transition shadow-sm space-y-2.5 text-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h5 className="font-bold text-white text-sm">{lead.name}</h5>
                            <span className="text-[11px] text-slate-400 block">{lead.phone}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${getTempBadge(
                              lead.temperature
                            )}`}
                          >
                            {lead.temperature}
                          </span>
                        </div>

                        <div className="p-2 rounded bg-slate-800/80 border border-slate-700/40">
                          <span className="text-[10px] text-slate-400 block">Minat Kendaraan:</span>
                          <span className="font-bold text-cyan-300 text-xs">{lead.interestedCar}</span>
                        </div>

                        <div className="text-[10px] text-slate-400 flex items-center justify-between">
                          <span>Sales: <strong className="text-slate-300">{lead.assignedSales}</strong></span>
                          <span className="font-mono text-slate-500">{lead.source}</span>
                        </div>

                        {/* Opsi Pindah Tahap Cepat */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                          <span className="text-[10px] text-slate-400">Pindah ke:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                            className="text-[10px] bg-slate-800 text-cyan-300 border border-slate-700 rounded px-1.5 py-0.5 focus:outline-none focus:border-cyan-400"
                          >
                            {pipelineStages.map((st) => (
                              <option key={st.key} value={st.key}>
                                {st.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
