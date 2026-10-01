import React, { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import CarLoadingScreen from "./components/CarLoadingScreen";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import VehicleCatalog from "./components/VehicleCatalog";
import VehicleDetailModal from "./components/VehicleDetailModal";
import CreditSimulator from "./components/CreditSimulator";
import TestDriveModal from "./components/TestDriveModal";
import SpkModal from "./components/SpkModal";
import DigitalPassport from "./components/DigitalPassport";
import FooterSection from "./components/FooterSection";
import LoginModal from "./components/LoginModal";
import DashboardLayout from "./components/DashboardLayout";

function MainAppContent() {
  const { currentUser } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  // State Autentikasi & Pemisahan Tampilan (Strict Separation: Landing Page vs Dashboard)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("landing"); // "landing" | "dashboard"

  // Observer Efek Scroll Reveal (Data Muncul Secara Perlahan Saat Dibuka & Saat Di-scroll)
  useEffect(() => {
    if (isLoading) return;

    const observerCallback = (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    const elements = document.querySelectorAll(".reveal-init");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [viewMode, isLoading]);

  // State Modal-Modal
  const [selectedVehicleForDetail, setSelectedVehicleForDetail] = useState(null);
  const [vehicleForTestDrive, setVehicleForTestDrive] = useState(null);
  const [vehicleForSpk, setVehicleForSpk] = useState(null);
  const [preselectedSimulatorCar, setPreselectedSimulatorCar] = useState(null);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (sectionId === "katalog") {
      document.getElementById("katalog-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "simulasi") {
      document.getElementById("simulasi-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "paspor") {
      document.getElementById("paspor-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "mengapa") {
      document.getElementById("mengapa-section")?.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "dashboard") {
      if (!isLoggedIn) {
        setIsLoginModalOpen(true);
      } else {
        setViewMode("dashboard");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleProceedToSpk = (car) => {
    if (!isLoggedIn) {
      alert("Silakan masuk (login) terlebih dahulu untuk memproses pemesanan SPK dan penguncian nomor rangka (VIN).");
      setIsLoginModalOpen(true);
      return;
    }
    setVehicleForSpk(car);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setViewMode("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setViewMode("landing");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#040813] text-slate-100 flex flex-col font-sans">
      {/* 1. Animasi Mobil Sport Berjalan di Awal Loading (Permintaan Khusus User) */}
      {isLoading && <CarLoadingScreen onFinished={() => setIsLoading(false)} />}

      {/* ==============================================================
           VIEW A: DASHBOARD INTERNAL LENGKAP (SETELAH LOGIN)
           Memiliki NAVBAR KIRI (Sidebar) + TOPBAR + CONTENT MULTI-TAB
      ============================================================== */}
      {viewMode === "dashboard" && isLoggedIn ? (
        <DashboardLayout
          onSwitchToLanding={() => {
            setViewMode("landing");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onOpenCreateSpk={() => setVehicleForSpk({})}
          onLogout={handleLogout}
        />
      ) : (
        /* ==============================================================
             VIEW B: HALAMAN LUAR / LANDING PAGE PUBLIK SHOWROOM
             Murni Showroom Pengunjung: Hero, 25+ Mobil, Simulasi, Paspor
        ============================================================== */
        <div className="flex flex-col min-h-screen">
          
          {/* Banner Status Mode Pratinjau Jika Sedang Login */}
          {isLoggedIn && (
            <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 border-b border-sky-500/30 px-4 py-2 text-xs flex items-center justify-between z-50 sticky top-0 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-slate-300">
                  Anda sedang melihat <strong>Pratinjau Showroom Publik</strong> sebagai <span className="text-cyan-400 font-bold">{currentUser.name}</span> ({currentUser.role.replace("_", " ")}).
                </span>
              </div>
              <button
                onClick={() => setViewMode("dashboard")}
                className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
              >
                <span>Kembali ke Portal Dealer (Navbar Kiri) →</span>
              </button>
            </div>
          )}

          {/* Bilah Pengumuman Dealer Resmi & Hotline Darurat 24 Jam */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 py-2 px-4 sm:px-8 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest animate-pulse">
                DEALER RESMI
              </span>
              <span className="text-white font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                PT ROCKETDRIVE MOTORS INDONESIA
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-300 hidden md:inline">Jaminan Garansi APM 5 Tahun & Layanan Darurat 24 Jam</span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <span className="animate-pulse">📞</span>
                <span>Hotline 24 Jam: 1500-888</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 text-slate-300 hidden sm:flex">
                <span>📍 Jakarta • Surabaya • Medan • Bali</span>
              </div>
            </div>
          </div>

          {/* Navbar Publik */}
          <Navbar
            activeSection={activeSection}
            onNavigate={handleNavigate}
            isLoggedIn={isLoggedIn}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            onLogout={handleLogout}
            onOpenDashboard={() => setViewMode("dashboard")}
          />

          <main className="flex-1 pt-20">
            {/* 1. Hero Section Sinematik */}
            <HeroSection
              onExploreVehicles={() => handleNavigate("katalog")}
              onCalculatePayment={() => handleNavigate("simulasi")}
            />

            {/* 2. Katalog Kendaraan 25+ Mobil Indonesia */}
            <VehicleCatalog
              onSelectVehicle={(car) => setSelectedVehicleForDetail(car)}
              onSimulateCredit={(car) => {
                setPreselectedSimulatorCar(car);
                handleNavigate("simulasi");
              }}
              onBookTestDrive={(car) => setVehicleForTestDrive(car)}
            />

            {/* 3. Simulator Kredit Interaktif Multi-Leasing */}
            <CreditSimulator
              preselectedVehicle={preselectedSimulatorCar}
              onProceedToSpk={handleProceedToSpk}
            />

            {/* 4. Paspor Digital Kendaraan */}
            <DigitalPassport />

            {/* 5. Bagian Keunggulan & Footer Resmi */}
            <FooterSection onNavigate={handleNavigate} />
          </main>
        </div>
      )}

      {/* ==============================================================
           MODAL & DIALOG GLOBAL
      ============================================================== */}
      {/* Modal Masuk / Login dengan Auto-fill Demo Akun */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Modal Detail Spesifikasi Kendaraan */}
      <VehicleDetailModal
        vehicle={selectedVehicleForDetail}
        onClose={() => setSelectedVehicleForDetail(null)}
        onSimulate={(car) => {
          setSelectedVehicleForDetail(null);
          setPreselectedSimulatorCar(car);
          handleNavigate("simulasi");
        }}
        onProceedToSpk={(car) => {
          setSelectedVehicleForDetail(null);
          handleProceedToSpk(car);
        }}
        onBookTestDrive={(car) => {
          setSelectedVehicleForDetail(null);
          setVehicleForTestDrive(car);
        }}
      />

      {/* Modal Uji Berkendara (Test Drive) */}
      <TestDriveModal
        vehicle={vehicleForTestDrive}
        onClose={() => setVehicleForTestDrive(null)}
      />

      {/* Modal Penerbitan SPK & Penguncian Atomik Nomor Rangka (VIN) */}
      <SpkModal
        vehicle={vehicleForSpk}
        onClose={() => setVehicleForSpk(null)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
