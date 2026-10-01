import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function ServiceBookingManager() {
  const { serviceBookings, bookServiceSlot, vehicles } = useApp();

  const [date, setDate] = useState("2026-10-02");
  const [timeSlot, setTimeSlot] = useState("09:00");
  const [vin, setVin] = useState("MHF11BA30001");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState("Servis Berkala Resmi 10.000 KM");
  const [complaint, setComplaint] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const timeSlots = ["09:00", "10:00", "11:00", "13:30", "14:30", "15:30"];
  const MAX_CAPACITY = 3;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone || !vin) {
      setMessage({ text: "Harap isi nama, telepon, dan pilih VIN kendaraan.", type: "error" });
      return;
    }

    const res = bookServiceSlot({
      customerName,
      phone,
      vin,
      serviceType,
      date,
      timeSlot,
      complaint: complaint || "Perawatan berkala rutin"
    });

    if (!res.success) {
      // Requirement #23: "Slot tidak tersedia."
      setMessage({ text: res.message, type: "error" });
      return;
    }

    setMessage({
      text: `Reservasi berhasil! ID: ${res.booking.id}. Slot jam ${timeSlot} WIB tanggal ${date} telah diamankan.`,
      type: "success"
    });
    setCustomerName("");
    setPhone("");
    setComplaint("");
  };

  return (
    <div className="space-y-8">
      {/* Header Bagian */}
      <div>
        <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
          <span>// LAYANAN PURNA JUAL & KAPASITAS BENGKEL RESMI</span>
        </div>
        <h3 className="text-2xl font-black text-white">Manajemen Slot Kapasitas Servis Bengkel</h3>
        <p className="text-xs text-slate-400 mt-1">
          Sistem manajemen kapasitas bengkel resmi ROCKETDRIVE dengan proteksi overbooking per slot waktu (maksimal 3 unit kendaraan/jam).
        </p>
      </div>

      {/* Matriks Kapasitas Slot Jam Real-Time */}
      <div className="p-6 rounded-2xl bg-[#071020] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="font-bold text-sm text-white">
              Status Ketersediaan Slot Bengkel Resmi ({date})
            </h4>
            <span className="text-[11px] text-slate-400">
              Kapasitas maksimal 3 pit servis per slot jam untuk menjamin standar kualitas mekanik bersertifikat.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Ganti Tanggal:</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {timeSlots.map((slot) => {
            const count = serviceBookings.filter(
              (b) => b.date === date && b.timeSlot === slot
            ).length;
            const isFull = count >= MAX_CAPACITY;

            return (
              <div
                key={slot}
                className={`p-4 rounded-xl border text-center transition ${
                  isFull
                    ? "bg-rose-950/30 border-rose-800/80 text-rose-300"
                    : count === 0
                    ? "bg-slate-900/60 border-slate-800 text-slate-300"
                    : "bg-sky-950/30 border-sky-800/80 text-cyan-300"
                }`}
              >
                <span className="font-mono font-bold text-sm block text-white">{slot} WIB</span>
                <span className="font-mono font-bold text-xs mt-1 block">
                  {count} / {MAX_CAPACITY} Slot
                </span>
                <span
                  className={`text-[10px] mt-1 font-bold block ${
                    isFull ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  {isFull ? "PENUH" : "Tersedia"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulir Tambah Reservasi Servis */}
        <div className="lg:col-span-6 rounded-2xl bg-gradient-to-b from-[#071020] to-[#040813] border border-slate-800 p-6 space-y-4 shadow-xl">
          <h4 className="font-bold text-base text-white">Buat Reservasi Servis Baru</h4>

          {message.text && (
            <div
              className={`p-3.5 rounded-xl text-xs font-medium border ${
                message.type === "error"
                  ? "bg-rose-500/15 border-rose-500/30 text-rose-300"
                  : "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-300 mb-1">Pilih Nomor Rangka (VIN)</label>
              <select
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
              >
                <option value="MHF11BA30001">MHF11BA30001 (Toyota Avanza - Budi Santoso)</option>
                <option value="MHF12VH40001">MHF12VH40001 (Toyota Veloz Hybrid - Dewi Lestari)</option>
                <option value="MHK14JM40001">MHK14JM40001 (Suzuki Jimny - Andi Saputra)</option>
                <option value="MHR09HR40001">MHR09HR40001 (Honda HR-V RS - Hendra Gunawan)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Nama Pemilik / Pelanggan</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Budi Santoso"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Nomor Telepon / WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0812-xxxxxxxx"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Tanggal Rencana Servis</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-300 mb-1">Pilihan Slot Jam</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono"
                >
                  {timeSlots.map((st) => (
                    <option key={st} value={st}>
                      {st} WIB
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Jenis Layanan Perawatan</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              >
                <option>Inspeksi Awal 1.000 KM (Gratis Jasa)</option>
                <option>Servis Berkala Resmi 10.000 KM</option>
                <option>Servis Berkala Resmi 20.000 KM</option>
                <option>Inspeksi Utama 30.000 KM</option>
                <option>Perbaikan Keluhan Khusus (General Repair)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-300 mb-1">Catatan Keluhan Kendaraan</label>
              <textarea
                rows={2}
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="Tuliskan keluhan atau instruksi khusus mekanik..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 transition mt-2"
            >
              Konfirmasi Reservasi Servis
            </button>
          </form>
        </div>

        {/* Daftar Antrean Servis Terkini */}
        <div className="lg:col-span-6 rounded-2xl bg-[#071020] border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h4 className="font-bold text-sm text-white">Antrean Servis Aktif</h4>
            <span className="text-xs font-mono text-cyan-400">{serviceBookings.length} Kendaraan Terjadwal</span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 text-xs">
            {serviceBookings.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-cyan-400">{b.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {b.status}
                  </span>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-bold text-white text-sm">{b.customerName}</h5>
                    <span className="text-slate-400 block">{b.phone}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-white block">{b.timeSlot} WIB</span>
                    <span className="text-[10px] text-slate-400 font-mono block">{b.date}</span>
                  </div>
                </div>
                <div className="p-2 rounded bg-slate-800/80 border border-slate-700/50 text-[11px] text-slate-300">
                  <span className="font-semibold text-white block">{b.serviceType}</span>
                  <span className="text-[10px] text-slate-400">VIN: <strong className="text-cyan-300 font-mono">{b.vin}</strong></span>
                  <p className="text-[10px] text-slate-400 italic mt-0.5">"{b.complaint}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
