import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { formatRupiah } from "../services/creditCalculator";

export default function SpkModal({ initialVehicle, onClose, onSuccess }) {
  const { vehicles, lockVinForSpk, currentUser } = useApp();

  const [selectedVehicleId, setSelectedVehicleId] = useState(
    initialVehicle ? initialVehicle.id : vehicles[0]?.id || 1
  );
  const selectedCar = vehicles.find((v) => v.id === Number(selectedVehicleId)) || vehicles[0];

  const availableVins = selectedCar.vins || [];
  const [selectedVin, setSelectedVin] = useState(availableVins[0]?.vin || "");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNik, setCustomerNik] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentType, setPaymentType] = useState("CREDIT");
  const [bookingFee, setBookingFee] = useState(10000000);
  const [salesName, setSalesName] = useState(currentUser.name || "Doni Wijaya");

  // Confirmation modal state (Requirement #42)
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [createdSpk, setCreatedSpk] = useState(null);

  const handleTriggerSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !selectedVin) {
      alert("Harap lengkapi data pemesan dan pastikan VIN dipilih.");
      return;
    }
    setErrorMessage("");
    setShowConfirmModal(true);
  };

  const handleConfirmLock = () => {
    setShowConfirmModal(false);

    // Call atomic VIN locking service (Requirement #10 & #53)
    const result = lockVinForSpk(selectedVin, {
      customerName,
      customerPhone,
      customerNik,
      customerAddress,
      vehicleModel: selectedCar.model,
      brand: selectedCar.brand,
      color: availableVins.find((v) => v.vin === selectedVin)?.color || "Standard",
      price: selectedCar.startingPrice,
      paymentType,
      bookingFee: Number(bookingFee),
      salesExecutive: salesName
    });

    if (!result.success) {
      setErrorMessage(result.message); // e.g. "Unit ini baru saja dipesan oleh Sales lain."
      return;
    }

    setCreatedSpk(result.spk);
    if (onSuccess) onSuccess(result.spk);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0a1628] border border-slate-700 shadow-2xl p-6 sm:p-8 my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {createdSpk ? (
          // Success & SPK Generated Screen with QR Code Verification (Requirement #18, #19)
          <div className="py-4 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-mono font-bold tracking-widest uppercase">
                  TRANSACTION APPROVED & ATOMICALLY LOCKED
                </span>
                <h3 className="text-xl font-black text-white">Surat Pesanan Kendaraan (SPK) Generated</h3>
              </div>
            </div>

            {/* Official SPK Preview Card */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-700/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div>
                  <span className="text-xs text-slate-400">Document No:</span>
                  <p className="text-base font-mono font-bold text-cyan-400">{createdSpk.id}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Date:</span>
                  <p className="text-xs font-mono text-white">{createdSpk.createdAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Customer Name</span>
                  <span className="font-bold text-white text-sm">{createdSpk.customerName}</span>
                  <span className="text-slate-400 block mt-0.5">{createdSpk.customerPhone}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vehicle Model</span>
                  <span className="font-bold text-cyan-300 text-sm">{createdSpk.vehicleModel}</span>
                  <span className="text-slate-300 block font-mono">VIN: {createdSpk.vin}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Vehicle Price (OTR)</span>
                  <span className="font-mono font-bold text-white">{formatRupiah(createdSpk.price)}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Booking Fee (Tanda Jadi)</span>
                  <span className="font-mono font-bold text-emerald-400">{formatRupiah(createdSpk.bookingFee)}</span>
                </div>
              </div>

              {/* QR Code Verification Section (Requirement #19) */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Visual QR Code Representation */}
                  <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center shrink-0">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://rocketdrive.test${createdSpk.verificationUrl}`}
                      alt="SPK QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white block">Official Verification QR Code</span>
                    <span className="text-[10px] text-cyan-400 font-mono block">
                      https://rocketdrive.test{createdSpk.verificationUrl}
                    </span>
                    <span className="text-[9px] text-slate-400">Scan to authenticate document with ROCKETDRIVE blockchain ledger</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs border border-emerald-500/30">
                  VIN LOCKED
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-2 border border-slate-700"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print Official SPK PDF</span>
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold uppercase tracking-wider"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                <span>// SALES MANAGEMENT & SPK GENERATOR</span>
              </div>
              <h3 className="text-2xl font-black text-white">Create SPK & Lock Vehicle VIN</h3>
              <p className="text-xs text-slate-400 mt-1">
                Penerbitan Surat Pesanan Kendaraan resmi dan penguncian unit fisik untuk mencegah double booking antar Sales Executive.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
                <svg className="w-5 h-5 text-rose-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-semibold">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleTriggerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Vehicle Model
                  </label>
                  <select
                    value={selectedVehicleId}
                    onChange={(e) => {
                      setSelectedVehicleId(e.target.value);
                      const target = vehicles.find((v) => v.id === Number(e.target.value));
                      if (target && target.vins && target.vins.length > 0) {
                        setSelectedVin(target.vins[0].vin);
                      }
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.brand} {v.model} ({formatRupiah(v.startingPrice)})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Physical VIN Selection (Requirement #10) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Select Physical VIN Unit <span className="text-cyan-400 font-normal">(Atomic Lock)</span>
                  </label>
                  <select
                    value={selectedVin}
                    onChange={(e) => setSelectedVin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    {availableVins.map((vinItem) => (
                      <option key={vinItem.vin} value={vinItem.vin}>
                        {vinItem.vin} — {vinItem.color} [{vinItem.status}]
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Customer Details */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">
                  Customer & Identity Details
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Nama Lengkap (Sesuai KTP)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Hendra Kusuma"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Nomor Telepon / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812-xxxxxxxx"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Nomor NIK KTP</label>
                    <input
                      type="text"
                      placeholder="3171xxxxxxxxxxxx"
                      value={customerNik}
                      onChange={(e) => setCustomerNik(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Alamat Domisili KTP</label>
                    <input
                      type="text"
                      placeholder="Jl. Thamrin No. 45, Jakarta Pusat"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Payment & Sales Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Payment Method
                  </label>
                  <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="CREDIT">Kredit (Leasing)</option>
                    <option value="CASH">Tunai (Cash Bertahap/Lunas)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Tanda Jadi (Booking Fee)
                  </label>
                  <select
                    value={bookingFee}
                    onChange={(e) => setBookingFee(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                  >
                    <option value={5000000}>Rp5.000.000 (Reguler)</option>
                    <option value={10000000}>Rp10.000.000 (Prioritas)</option>
                    <option value={20000000}>Rp20.000.000 (Premium/EV)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Sales Executive
                  </label>
                  <input
                    type="text"
                    value={salesName}
                    onChange={(e) => setSalesName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/25 mt-4"
              >
                Validate & Request VIN Lock
              </button>
            </form>
          </div>
        )}

        {/* Confirmation Modal (Requirement #42) */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-sky-500/40 p-6 text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 text-cyan-400 flex items-center justify-center mx-auto border border-sky-400/30">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-white">Apakah Anda yakin ingin mengunci VIN ini?</h4>
              <p className="text-xs text-slate-300">
                Unit fisik VIN <strong className="font-mono text-cyan-300">{selectedVin}</strong> akan diubah statusnya menjadi <strong>BOOKED</strong> dan dicegah dari pemesanan oleh sales lain.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLock}
                  className="py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider"
                >
                  Confirm Lock
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
