# 🚀 ROCKETDRIVE — Integrated Automotive Sales & After-Sales Management System

> **"Drive Your Next Journey."**  
> *From First Interest to Every Journey After.*

[![Architecture](https://img.shields.io/badge/Architecture-React%20%7C%20Laravel%20API%20%7C%20MySQL-blue.svg)](#architecture)
[![Tech Stack](https://img.shields.io/badge/Frontend-Vite%20%2B%20TailwindCSS-06b6d4.svg)](#tech-stack)
[![Database](https://img.shields.io/badge/Database-MySQL%208.0%20InnoDB-0284c7.svg)](#database)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)](#features)

---

## 📌 1. Project Overview

**ROCKETDRIVE** adalah ekosistem manajemen digital dealer otomotif modern terintegrasi. Platform ini mengkoneksikan seluruh siklus hidup kendaraan (*Automotive Customer Journey*):

```
Vehicle Inventory (VIN) ➔ Lead & Inquiry ➔ Test Drive ➔ Credit Simulation ➔ SPK & Atomic VIN Lock ➔ Delivery ➔ Vehicle Digital Passport ➔ Warranty ➔ After-Sales Service
```

Aplikasi dirancang dengan standar enterprise UI/UX otomotif premium, animasi micro-interaction responsif, dan proteksi integritas data tingkat tinggi.

---

## ⚡ 2. Core Features Implemented

1. **Animated Car Loading Intro**: Mobil sport SVG animasi bergerak dari kiri ke kanan dengan neon spoke wheels, speed lines, dan progress percentage counter.
2. **Cinematic Hero Showroom**: Hero video carousel full-screen dengan dukungan file lokal MP4 (`/public/videos/hero-01.mp4`, dll.) dan poster fallback anti-error.
3. **25+ Certified Vehicle Seed Catalog**: Toyota, Honda, Suzuki, Daihatsu, Hyundai, BYD, dan Chery dengan harga acuan OTR Jakarta September 2026.
4. **Physical VIN Inventory Tracking**: Setiap unit fisik memiliki status serial `READY`, `BOOKED`, `DELIVERED`, atau `SERVICE`.
5. **Atomic VIN Locking (Anti-Double Booking)**: Transaksi row-locking pesimistik mencegah dua sales mengunci VIN yang sama secara bersamaan.
6. **Intelligent Credit Simulator**: Modul kalkulator pembiayaan cerdas multi-leasing (DP, bunga tahunan, tenor 12-60 bulan, asuransi, TDP, dan angsuran bulanan).
7. **CRM Leads Kanban Pipeline**: Board interaktif dengan tahap `NEW`, `CONTACTED`, `INTERESTED`, `TEST_DRIVE`, `NEGOTIATION`, `SPK`, `CLOSED`, `LOST`.
8. **Signature Vehicle Digital Passport**: Riwayat servis digital permanen terhubung ke VIN dengan timeline siklus kepemilikan.
9. **After-Sales Service Capacity Engine**: Manajemen slot servis bengkel resmi dengan proteksi overbooking maksimal 3 kendaraan per slot jam.
10. **QR Verification System**: Tautan verifikasi dokumen resmi SPK dan invoice publik `/verify/SPK-2026-xxxxxx`.

---

## 🛠️ 3. Tech Stack

- **Frontend**: React 18+, Vite, Tailwind CSS, Lucide Icons, PostCSS.
- **Backend API**: Laravel RESTful API (`/backend`), Services (`CreditCalculationService`, `VinLockingService`).
- **Database**: MySQL 8.0 InnoDB (dengan foreign keys, unique constraint pada VIN, dan row-locking transactions).
- **Environment**: Laragon / Apache / Node.js.

---

## 🔑 4. Demo Login Credentials

Gunakan akun pengujian berikut untuk demonstrasi peran:

| Peran (Role) | Email | Password | Hak Akses |
|---|---|---|---|
| **Super Admin** | `admin@rocketdrive.test` | `admin123` | Akses penuh dashboard, inventory, & konfigurasi |
| **Sales Executive** | `sales@rocketdrive.test` | `sales123` | CRM Leads Kanban, Test Drive, SPK & VIN Locking |
| **Service Advisor** | `service@rocketdrive.test` | `service123` | Slot bengkel, servis berkala, riwayat servis |
| **Customer** | `customer@rocketdrive.test` | `customer123` | Showroom, simulasi kredit, Digital Passport saya |

---

## 🚀 5. How to Run the Project

### A. Instant Preview (No-Config / Direct Launch)
Buka file [`index.html`](file:///c:/laragon/www/ROCKETDRIVE-Integrated%20Automotive%20Sales%20&%20After-Sales%20Management%20System/index.html) langsung di browser Anda, atau akses melalui Laragon Apache di:
```
http://localhost/ROCKETDRIVE-Integrated%20Automotive%20Sales%20&%20After-Sales%20Management%20System/
```

### B. Menjalankan React Frontend (Vite Dev Server)
Masuk ke direktori `frontend`:
```bash
cd frontend
npm run dev
```
Buka browser pada: `http://localhost:5173`

*(Catatan: Script npm telah diperbaiki secara khusus menggunakan `node ./node_modules/vite/bin/vite.js` sehingga **tidak akan bentrok atau crash** pada Windows path yang memiliki karakter `&`).*

### C. Menjalankan Laravel Backend API
Masuk ke direktori `backend`:
```bash
cd backend
php artisan serve
```
Backend API akan aktif di: `http://localhost:8000/api`

---

## 🛡️ 6. Disclaimer

> *ROCKETDRIVE is a conceptual automotive dealership management platform developed for academic and demonstration purposes. Vehicle prices and specifications are indicative and may change according to manufacturer, region, variant, taxes, and dealer policy.*
