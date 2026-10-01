import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function TestDriveModal({ vehicle, onClose }) {
  const { vehicles, setLeads } = useApp();

  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicle ? vehicle.id : vehicles[0]?.id || 1);
  const [preferredDate, setPreferredDate] = useState("2026-10-05");
  const [preferredTime, setPreferredTime] = useState("10:00");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedCar = vehicles.find((v) => v.id === Number(selectedVehicleId)) || vehicles[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !phone) {
      alert("Mohon lengkapi Nama dan Nomor Telepon.");
      return;
    }

    // Automatically create CRM Lead for Sales (Requirement #14, #15)
    const newLead = {
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      phone,
      email,
      vehicleModel: selectedCar.model,
      source: "Test Drive Booking",
      temperature: "HOT",
      status: "TEST_DRIVE",
      score: 90,
      assignedSales: "Doni Wijaya",
      date: new Date().toISOString().split("T")[0]
    };

    setLeads((prev) => [newLead, ...prev]);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0a1628] border border-slate-700 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white">Test Drive Terjadwal!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Terima kasih, <strong className="text-cyan-400">{customerName}</strong>. Sales Executive kami (Doni Wijaya) akan menghubungi Anda untuk konfirmasi unit <strong>{selectedCar.model}</strong> pada tanggal {preferredDate} pukul {preferredTime}.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs uppercase tracking-wider"
            >
              Selesai
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs text-cyan-400 font-mono font-bold tracking-widest uppercase block mb-1">
                VIP Experience
              </span>
              <h3 className="text-2xl font-black text-white">Schedule Your Test Drive</h3>
              <p className="text-xs text-slate-400 mt-1">
                Rasakan performa mesin, kenyamanan kabin, dan fitur canggih secara langsung.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Selected Vehicle
                </label>
                <select
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.brand} {v.model}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="09:00">09:00 WIB (Pagi)</option>
                    <option value="10:30">10:30 WIB (Pagi)</option>
                    <option value="13:30">13:30 WIB (Siang)</option>
                    <option value="15:00">15:00 WIB (Sore)</option>
                    <option value="16:30">16:30 WIB (Sore)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    WhatsApp / Phone
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0812-xxxx-xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="budi@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Notes / Questions
                </label>
                <textarea
                  rows="2"
                  placeholder="Ingin coba rute jalan tol atau tanjakan..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/25 mt-2"
              >
                Confirm Test Drive Booking
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
