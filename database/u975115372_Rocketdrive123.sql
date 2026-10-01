-- ====================================================================
-- ROCKETDRIVE — Integrated Automotive Sales & After-Sales Management System
-- Database Name: u975115372_Rocketdrive123
-- Target Host: Hostinger MySQL / phpMyAdmin (rocketdrive.tplp004.com)
-- Collation: utf8mb4_unicode_ci
-- Generated: 2026-09-30
-- ====================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";

-- --------------------------------------------------------------------
-- 1. Table structure for table `users` (Manajemen Pengguna & Hak Akses)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('SUPER_ADMIN','SALES_EXECUTIVE','SERVICE_ADVISOR','CUSTOMER') NOT NULL DEFAULT 'CUSTOMER',
  `phone` VARCHAR(30) DEFAULT NULL,
  `avatar` VARCHAR(255) DEFAULT NULL,
  `status` ENUM('ACTIVE','INACTIVE') NOT NULL DEFAULT 'ACTIVE',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `users`
INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `phone`, `avatar`, `status`) VALUES
(1, 'Alexander Pratama', 'admin@rocketdrive.test', '$2y$10$xefFjFDpEg.eSbaQVrrBg.7ZSRHTYHZXcNZ.SWTz6JhsqvuHJ5T3O', 'SUPER_ADMIN', '0811-1234-5678', 'AP', 'ACTIVE'),
(2, 'Doni Wijaya', 'sales@rocketdrive.test', '$2y$10$xefFjFDpEg.eSbaQVrrBg.7ZSRHTYHZXcNZ.SWTz6JhsqvuHJ5T3O', 'SALES_EXECUTIVE', '0812-2345-6789', 'DW', 'ACTIVE'),
(3, 'Agus Pratama', 'service@rocketdrive.test', '$2y$10$xefFjFDpEg.eSbaQVrrBg.7ZSRHTYHZXcNZ.SWTz6JhsqvuHJ5T3O', 'SERVICE_ADVISOR', '0813-3456-7890', 'AP', 'ACTIVE'),
(4, 'Budi Santoso', 'customer@rocketdrive.test', '$2y$10$xefFjFDpEg.eSbaQVrrBg.7ZSRHTYHZXcNZ.SWTz6JhsqvuHJ5T3O', 'CUSTOMER', '0814-4567-8901', 'BS', 'ACTIVE');

-- --------------------------------------------------------------------
-- 2. Table structure for table `vehicles` (Katalog Kendaraan 25+ Model)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `vehicles`;
CREATE TABLE `vehicles` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `brand` VARCHAR(50) NOT NULL,
  `model` VARCHAR(100) NOT NULL,
  `category` ENUM('CITY CAR','MPV','SUV','CROSSOVER','EV') NOT NULL,
  `price` BIGINT(20) NOT NULL,
  `fuel` VARCHAR(50) NOT NULL,
  `seats` INT(11) NOT NULL DEFAULT 5,
  `trans` VARCHAR(100) NOT NULL,
  `engine` VARCHAR(100) NOT NULL,
  `warranty` VARCHAR(100) NOT NULL,
  `img` VARCHAR(255) NOT NULL,
  `features` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `vehicles` (25 Model Resmi Sesuai Gambar Fisik)
INSERT INTO `vehicles` (`id`, `brand`, `model`, `category`, `price`, `fuel`, `seats`, `trans`, `engine`, `warranty`, `img`, `features`) VALUES
(1, 'Toyota', 'Toyota Avanza', 'MPV', 244200000, 'Bensin (Petrol)', 7, 'CVT / Manual', '1.5L Dual VVT-i', '3 Tahun / 100.000 KM', 'Toyota Avanza (7 Kursi).jpg', 'Toyota Safety Sense (TSS), Layar Sentuh 9-inci, VSC, 6 Kantung Udara, Kamera Parkir'),
(2, 'Toyota', 'Toyota Veloz Hybrid', 'MPV', 303000000, 'Hybrid', 7, 'e-CVT', '1.5L HEV Atkinson', '5 Tahun / 150.000 KM Garansi Baterai', 'Toyota Veloz Hybrid (7 Kursi).jpg', 'Display Digital TFT 7-inci, TSS Lane Departure Alert, EV Drive Mode, Wireless Charger'),
(3, 'Toyota', 'Toyota Raize', 'SUV', 243500000, 'Bensin (Petrol)', 5, 'CVT', '1.0L Turbo 1KR-VET', '3 Tahun / 100.000 KM', 'Toyota Raize (5 Kursi).jpeg', 'Mesin Turbocharged, Paddle Shift, Blind Spot Monitoring, Head Unit 9-inci'),
(4, 'Toyota', 'Toyota Yaris Cross', 'SUV', 359700000, 'Hybrid / Bensin', 5, 'CVT / e-CVT', '1.5L HEV Dual VVT-i', '5 Tahun / 150.000 KM', 'Toyota Yaris Cross (5 Kursi).jpg', 'Panoramic Glass Roof, Electric Backdoor Kick Sensor, Multi Around Monitor 360'),
(5, 'Toyota', 'Toyota Innova Zenix', 'MPV', 437700000, 'Hybrid / Bensin', 7, 'Direct-Shift CVT', '2.0L M20A-FXS Dynamic Force', '5 Tahun / 160.000 KM', 'Toyota Innova Zenix (7 Kursi).jpg', 'Captain Seat Ottoman, Dual Rear Entertainment 10-inci, Panoramic Retractable Roof, TSS 3.0'),
(6, 'Honda', 'Honda Brio', 'CITY CAR', 167900000, 'Bensin (Petrol)', 5, 'CVT / Manual', '1.2L i-VTEC 90 PS', '3 Tahun / 100.000 KM', 'Honda Brio (5 Kursi).jpg', 'Lampu Utama LED & DRL, Display Audio 7-inci Smartphone Connection, Dual SRS Airbags'),
(7, 'Honda', 'Honda WR-V', 'SUV', 274900000, 'Bensin (Petrol)', 5, 'CVT', '1.5L i-VTEC DOHC 121 PS', '3 Tahun / 100.000 KM', 'Honda WR-V (5 Kursi).jpg', 'Paket Honda SENSING, Walk-Away Auto Lock, Remote Engine Start, Honda LaneWatch'),
(8, 'Honda', 'Honda BR-V', 'SUV', 292900000, 'Bensin (Petrol)', 7, 'CVT', '1.5L i-VTEC DOHC 121 PS', '3 Tahun / 100.000 KM', 'Honda BR-V (7 Kursi).png', '3 Baris Kursi Fleksibel, Honda SENSING, Filter Udara PM2.5, Remote Start Engine'),
(9, 'Honda', 'Honda HR-V', 'SUV', 383900000, 'Hybrid / Bensin', 5, 'CVT', '1.5L VTEC Turbo / e:HEV', '3 Tahun / 100.000 KM', 'Honda HR-V (7 Kursi).jpg', 'Panoramic Glass Roof, Hands-Free Power Tailgate, Honda SENSING Standar Seluruh Varian'),
(10, 'Honda', 'Honda CR-V', 'SUV', 749100000, 'Hybrid / Bensin', 5, 'e-CVT', '2.0L e:HEV Dual Motor', '5 Tahun / 150.000 KM Garansi Baterai', 'Honda CR-V (5 Kursi).png', 'Honda CONNECT Telematika, Bose 12-Speaker Audio, Head-Up Display, Handsfree Tailgate'),
(11, 'Suzuki', 'Suzuki S-Presso', 'CITY CAR', 178100000, 'Bensin (Petrol)', 5, 'AGS / Manual', '1.0L K10C Dualjet Auto Stop', '3 Tahun / 100.000 KM', 'Suzuki S-Presso (5 Kursi).jpg', 'ESP Electronic Stability Program, Hill Hold Control, Layar Sentuh Apple CarPlay'),
(12, 'Suzuki', 'Suzuki Fronx', 'CROSSOVER', 265600000, 'Hybrid', 5, '6-Speed AT', '1.5L K15C Smart Hybrid', '3 Tahun / 100.000 KM', 'Suzuki Fronx (5 Kursi).jpg', 'Kamera 360 All Around, Head-Up Display (HUD), Wireless Charging, Layar 9-inci SmartPlay Pro+'),
(13, 'Suzuki', 'Suzuki XL7 Hybrid', 'MPV', 274300000, 'Hybrid', 7, '4-Speed AT', '1.5L K15B SHVS Mild Hybrid', '5 Tahun Garansi Baterai Lithium', 'Suzuki XL7 Hybrid (7 Kursi).jpeg', 'E-Mirror Digital Rearview Touchscreen, SHVS Mild Hybrid, Cruise Control, Hill Hold Control'),
(14, 'Suzuki', 'Suzuki Jimny', 'SUV', 470500000, 'Bensin (Petrol)', 4, '4WD AllGrip Pro', '1.5L K15B 102 PS', '3 Tahun / 100.000 KM', 'Suzuki Jimny (4 Kursi).jpg', 'Ladder Frame Sasis Kokoh, 4WD AllGrip Pro Low Gear, Brake LSD Traction Control'),
(15, 'Daihatsu', 'Daihatsu Ayla', 'CITY CAR', 141200000, 'Bensin (Petrol)', 5, 'D-CVT', '1.2L WA-VE', '3 Tahun / 100.000 KM', 'Daihatsu Ayla (5 Kursi).jpg', 'Platform DNGA, Push Start Button, Vehicle Stability Control (VSC), Hill Start Assist'),
(16, 'Daihatsu', 'Daihatsu Sigra', 'MPV', 144200000, 'Bensin (Petrol)', 7, '4AT / 5MT', '1.2L 3NR-VE Dual VVT-i', '3 Tahun / 100.000 KM', 'Daihatsu Sigra (7 Kursi).jpg', 'LED Headlamp Smoked, Kamera Parkir Belakang, Dual SRS Airbags, Kabin Luas 7-Penumpang'),
(17, 'Daihatsu', 'Daihatsu Rocky', 'SUV', 215800000, 'Bensin (Petrol)', 5, 'D-CVT', '1.0L Turbo 1KR-VET', '3 Tahun / 100.000 KM', 'Daihatsu Rocky (5 Kursi).jpg', 'A.S.A Advanced Safety Assist, Full Digital Meter Cluster, Subwoofer Audio'),
(18, 'Daihatsu', 'Daihatsu Xenia', 'MPV', 229650000, 'Bensin (Petrol)', 7, 'D-CVT', '1.5L 2NR-VE Dual VVT-i', '3 Tahun / 100.000 KM', 'Daihatsu Xenia (7 Kursi).jpg', 'A.S.A Active Safety, Sofa Mode Seating, 360 Around View Monitor, Keyless Entry'),
(19, 'Daihatsu', 'Daihatsu Terios', 'SUV', 249450000, 'Bensin (Petrol)', 7, '4AT / 5MT', '1.5L 2NR-VE 104 PS', '3 Tahun / 100.000 KM', 'Daihatsu Terios (7 Kursi).jpg', 'Wireless Charger, Around View Monitor 360, 6 SRS Airbags, Eco Idle System'),
(20, 'Hyundai', 'Hyundai Stargazer', 'MPV', 241400000, 'Bensin (Petrol)', 7, 'IVT', 'Smartstream G1.5 MPI', '4 Tahun / 100.000 KM', 'Hyundai Stargazer (7 Kursi).jpg', 'Hyundai SmartSense, Layanan Bluelink Telematics, Hidden Mood Lighting, Captain Seat'),
(21, 'Hyundai', 'Hyundai Creta', 'SUV', 307800000, 'Bensin (Petrol)', 5, 'IVT', 'Smartstream G1.5 115 PS', '4 Tahun / 100.000 KM', 'Hyundai Creta (5 Kursi).jpg', 'Panoramic Sunroof, BOSE Premium 8-Speaker, Ventilated Seats, Hyundai SmartSense ADAS'),
(22, 'Hyundai', 'Hyundai Kona Electric', 'EV', 565300000, 'Listrik (EV)', 5, 'Single-Speed', 'Motor Listrik 160 kW (500+ KM)', '8 Tahun / 160.000 KM Baterai', 'Hyundai Kona Electric (5 Kursi).jpg', 'Baterai Produksi Lokal Indonesia, Vehicle-to-Load (V2L) 3.3kW, OTA Updates, Smart Regenerative'),
(23, 'BYD', 'BYD Dolphin', 'EV', 369000000, 'Listrik (EV)', 5, 'Electric Single Speed', 'Blade Battery 60.48 kWh (204 PS)', '8 Tahun / 160.000 KM Baterai', 'BYD Dolphin (5 Kursi).jpg', 'Baterai Ultra-Aman BYD Blade, Layar Berputar 12.8-inci, DiPilot ADAS, Panoramic Roof'),
(24, 'BYD', 'BYD Atto 3', 'EV', 415000000, 'Listrik (EV)', 5, 'Electric Single Speed', 'Blade Battery 60.48 kWh (310 Nm)', '8 Tahun / 160.000 KM Baterai', 'BYD Atto 3 (5 Kursi).jpg', 'e-Platform 3.0, Interior Sporty Futuristik, Layar Putar Pintar 15.6-inci, Mobile VTOL'),
(25, 'Chery', 'Chery Tiggo Cross', 'CROSSOVER', 264500000, 'Bensin (Petrol)', 5, 'CVT 9-Speed', '1.5L Turbo Acteco 147 PS', '10 Tahun / 1.000.000 KM Mesin', 'Chery Tiggo Cross (5 Kursi).jpg', 'Dual Layar 10.25-inci, Sony 8-Speaker Audio, Level 2 Autonomous ADAS, Kamera Panorama 360');

-- --------------------------------------------------------------------
-- 3. Table structure for table `vehicle_vins` (Inventaris Fisik & Pelacakan VIN)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `vehicle_vins`;
CREATE TABLE `vehicle_vins` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `vehicle_id` INT(11) NOT NULL,
  `vin` VARCHAR(50) NOT NULL UNIQUE,
  `engine_number` VARCHAR(50) NOT NULL,
  `color` VARCHAR(50) NOT NULL,
  `status` ENUM('READY','BOOKED','SOLD') NOT NULL DEFAULT 'READY',
  `location` VARCHAR(100) NOT NULL DEFAULT 'Showroom Pusat Lt. 1',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_vehicle_idx` (`vehicle_id`),
  CONSTRAINT `fk_vehicle_vins_vehicle` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `vehicle_vins`
INSERT INTO `vehicle_vins` (`id`, `vehicle_id`, `vin`, `engine_number`, `color`, `status`, `location`) VALUES
(1, 1, 'MHF11BA30001', '2NR-FE-10291', 'Platinum White Pearl', 'READY', 'Showroom Pusat Lt. 1'),
(2, 1, 'MHF11BA30002', '2NR-FE-10292', 'Silver Metallic', 'BOOKED', 'Gudang Logistik Cikarang'),
(3, 1, 'MHF11BA30003', '2NR-FE-10293', 'Black Metallic', 'READY', 'Showroom Pusat Lt. 1'),
(4, 2, 'MHF12VH40001', '2NR-VEX-4011', 'Platinum White Pearl', 'READY', 'Showroom Pusat Lt. 1'),
(5, 2, 'MHF12VH40002', '2NR-VEX-4012', 'Dark Red Mica Metallic', 'READY', 'Gudang Logistik Cikarang'),
(6, 3, 'MHF13RZ50001', '1KR-VET-3021', 'Turquoise MM', 'READY', 'Showroom Pusat Lt. 1'),
(7, 4, 'MHF14YC60001', '2NR-VEX-8812', 'Scarlet MM Black Roof', 'READY', 'Showroom Pusat Lt. 1'),
(8, 5, 'MHF15ZX70001', 'M20A-FXS-9111', 'Platinum White Pearl', 'READY', 'Showroom Pusat Lt. 1'),
(9, 6, 'MHR06BR10001', 'L12B-4401', 'Electric Lime Metallic', 'READY', 'Gudang Logistik Cikarang'),
(10, 7, 'MHR07WR20001', 'L15ZF-9901', 'Ignite Red Metallic Two-Tone', 'READY', 'Showroom Pusat Lt. 1'),
(11, 8, 'MHR08BV30001', 'L15ZF-1102', 'Opal White Pearl', 'READY', 'Gudang Logistik Cikarang'),
(12, 9, 'MHR09HR40001', 'L15C-3301', 'Sand Khaki Pearl Two-Tone', 'READY', 'Showroom Pusat Lt. 1'),
(13, 10, 'MHR10CR50001', 'LFA1-9011', 'Canyon River Blue Metallic', 'READY', 'Showroom Pusat Lt. 1'),
(14, 11, 'MHK11SP10001', 'K10C-1021', 'Sizzle Orange', 'READY', 'Showroom Pusat Lt. 1'),
(15, 12, 'MHK12FX20001', 'K15C-2231', 'Opulent Red Black Roof', 'READY', 'Showroom Pusat Lt. 1'),
(16, 13, 'MHK13XL30001', 'K15B-6019', 'Savanna Ivory Black', 'READY', 'Showroom Pusat Lt. 1'),
(17, 14, 'MHK14JM40001', 'K15B-9021', 'Kinetic Yellow', 'READY', 'Showroom Pusat Lt. 1'),
(18, 15, 'MHD15AY10001', 'WA-VE-0911', 'Ruby Red Metallic', 'READY', 'Showroom Pusat Lt. 1'),
(19, 16, 'MHD16SG20001', '3NR-VE-4001', 'Dark Grey Metallic', 'READY', 'Showroom Pusat Lt. 1'),
(20, 17, 'MHD17RK30001', '1KR-VET-7711', 'Compagno Red Two-Tone', 'READY', 'Showroom Pusat Lt. 1'),
(21, 18, 'MHD18XN40001', '2NR-VE-5012', 'Greenish Gun Metal', 'READY', 'Showroom Pusat Lt. 1'),
(22, 19, 'MHD19TR50001', '2NR-VE-8032', 'Silver Metallic', 'READY', 'Gudang Logistik Cikarang'),
(23, 20, 'KMH20SG10001', 'G4FL-1002', 'Magnetic Silver Metallic', 'READY', 'Showroom Pusat Lt. 1'),
(24, 21, 'KMH21CR20001', 'G4FL-2099', 'Titan Gray Metallic', 'READY', 'Showroom Pusat Lt. 1'),
(25, 22, 'KMH22KN30001', 'EM16-8012', 'Cyber Gray Metallic', 'READY', 'Showroom Pusat Lt. 1'),
(26, 23, 'BYD23DP10001', 'TZ200XSQ-101', 'Maldive Purple', 'READY', 'Showroom Pusat Lt. 1'),
(27, 24, 'BYD24AT20001', 'TZ200XSQ-992', 'Surf Blue', 'READY', 'Showroom Pusat Lt. 1'),
(28, 25, 'LCH25TC10001', 'SQRE4T15C-401', 'Bloodstone Red', 'READY', 'Showroom Pusat Lt. 1');

-- --------------------------------------------------------------------
-- 4. Table structure for table `leasing_partners` (Mitra Pembiayaan & Suku Bunga)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `leasing_partners`;
CREATE TABLE `leasing_partners` (
  `id` VARCHAR(20) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `min_dp_pct` INT(11) NOT NULL DEFAULT 20,
  `admin_fee` BIGINT(20) NOT NULL DEFAULT 2500000,
  `insurance_rate` DECIMAL(5,3) NOT NULL DEFAULT 0.020,
  `rate_12` DECIMAL(5,3) NOT NULL DEFAULT 0.038,
  `rate_24` DECIMAL(5,3) NOT NULL DEFAULT 0.042,
  `rate_36` DECIMAL(5,3) NOT NULL DEFAULT 0.045,
  `rate_48` DECIMAL(5,3) NOT NULL DEFAULT 0.052,
  `rate_60` DECIMAL(5,3) NOT NULL DEFAULT 0.059,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `leasing_partners`
INSERT INTO `leasing_partners` (`id`, `name`, `min_dp_pct`, `admin_fee`, `insurance_rate`, `rate_12`, `rate_24`, `rate_36`, `rate_48`, `rate_60`) VALUES
('mtf', 'Mandiri Tunas Finance', 20, 2500000, 0.020, 0.038, 0.042, 0.045, 0.052, 0.059),
('acc', 'Astra Credit Companies (ACC)', 20, 2800000, 0.021, 0.039, 0.043, 0.047, 0.053, 0.061),
('adira', 'Adira Finance', 15, 2400000, 0.019, 0.041, 0.045, 0.049, 0.055, 0.063),
('bca', 'BCA Finance', 20, 2200000, 0.020, 0.035, 0.039, 0.042, 0.049, 0.056);

-- --------------------------------------------------------------------
-- 5. Table structure for table `leads` (Pipeline Prospek Pelanggan CRM)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `leads`;
CREATE TABLE `leads` (
  `id` VARCHAR(30) NOT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) DEFAULT NULL,
  `vehicle_model` VARCHAR(100) NOT NULL,
  `source` VARCHAR(50) NOT NULL DEFAULT 'Website Showroom',
  `temperature` ENUM('HOT','WARM','COLD') NOT NULL DEFAULT 'WARM',
  `status` ENUM('NEW','CONTACTED','TEST_DRIVE','NEGOTIATION','SPK') NOT NULL DEFAULT 'NEW',
  `score` INT(11) NOT NULL DEFAULT 80,
  `assigned_sales` VARCHAR(100) NOT NULL DEFAULT 'Doni Wijaya',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `leads`
INSERT INTO `leads` (`id`, `customer_name`, `phone`, `email`, `vehicle_model`, `source`, `temperature`, `status`, `score`, `assigned_sales`) VALUES
('LD-001', 'Budi Santoso', '0812-8899-1122', 'budi@gmail.com', 'Toyota Avanza', 'Website Showroom', 'HOT', 'NEW', 85, 'Doni Wijaya'),
('LD-002', 'Siti Rahma', '0813-7722-3344', 'siti.rahma@yahoo.com', 'Honda HR-V', 'Instagram Ads', 'HOT', 'CONTACTED', 92, 'Rian Hidayat'),
('LD-003', 'Hendro Gunawan', '0811-9988-7766', 'hendro.g@outlook.com', 'Hyundai Kona Electric', 'Walk-in Showroom', 'WARM', 'TEST_DRIVE', 78, 'Doni Wijaya'),
('LD-004', 'Maya Indah', '0815-4433-2211', 'maya.indah@gmail.com', 'BYD Atto 3', 'Credit Simulator', 'HOT', 'NEGOTIATION', 95, 'Faisal Akbar'),
('LD-005', 'Andi Saputra', '0817-2233-5566', 'andi.s@gmail.com', 'Suzuki Jimny', 'Website Showroom', 'WARM', 'SPK', 98, 'Rian Hidayat');

-- --------------------------------------------------------------------
-- 6. Table structure for table `spks` (Pemesanan Surat Pesanan Kendaraan)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `spks`;
CREATE TABLE `spks` (
  `id` VARCHAR(50) NOT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `customer_id_card` VARCHAR(50) DEFAULT NULL,
  `vehicle_model` VARCHAR(100) NOT NULL,
  `vin` VARCHAR(50) NOT NULL,
  `color` VARCHAR(50) NOT NULL,
  `price` BIGINT(20) NOT NULL,
  `payment_type` ENUM('CASH','CREDIT') NOT NULL DEFAULT 'CREDIT',
  `leasing_partner` VARCHAR(100) DEFAULT NULL,
  `tenor_months` INT(11) DEFAULT 36,
  `dp_amount` BIGINT(20) DEFAULT 0,
  `monthly_installment` BIGINT(20) DEFAULT 0,
  `booking_fee` BIGINT(20) NOT NULL DEFAULT 10000000,
  `status` ENUM('DRAFT','SUBMITTED','APPROVED','UNIT_ALLOCATED','DELIVERED') NOT NULL DEFAULT 'APPROVED',
  `sales_executive` VARCHAR(100) NOT NULL DEFAULT 'Doni Wijaya',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `spks`
INSERT INTO `spks` (`id`, `customer_name`, `customer_phone`, `customer_id_card`, `vehicle_model`, `vin`, `color`, `price`, `payment_type`, `leasing_partner`, `tenor_months`, `dp_amount`, `monthly_installment`, `booking_fee`, `status`, `sales_executive`) VALUES
('SPK-2026-000123', 'Andi Saputra', '0817-2233-5566', '3171012345670001', 'Suzuki Jimny', 'MHK14JM40001', 'Kinetic Yellow', 470500000, 'CREDIT', 'BCA Finance', 36, 94100000, 11840000, 10000000, 'APPROVED', 'Rian Hidayat'),
('SPK-2026-000124', 'Budi Santoso', '0812-8899-1122', '3171012345670002', 'Toyota Avanza', 'MHF11BA30002', 'Silver Metallic', 244200000, 'CREDIT', 'Mandiri Tunas Finance', 36, 48840000, 6186400, 10000000, 'APPROVED', 'Doni Wijaya'),
('SPK-2026-000125', 'Maya Indah', '0815-4433-2211', '3171012345670003', 'BYD Atto 3', 'BYD24AT20001', 'Surf Blue', 415000000, 'CASH', 'Tunai Mandiri', 0, 415000000, 0, 25000000, 'UNIT_ALLOCATED', 'Faisal Akbar');

-- --------------------------------------------------------------------
-- 7. Table structure for table `service_bookings` (Monitoring Bengkel & 8 Stall)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `service_bookings`;
CREATE TABLE `service_bookings` (
  `id` VARCHAR(50) NOT NULL,
  `vin` VARCHAR(50) NOT NULL,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_phone` VARCHAR(50) NOT NULL,
  `vehicle_model` VARCHAR(100) NOT NULL,
  `stall_number` INT(11) NOT NULL,
  `service_type` VARCHAR(100) NOT NULL,
  `odometer` INT(11) NOT NULL DEFAULT 0,
  `booking_date` DATE NOT NULL,
  `booking_time` VARCHAR(20) NOT NULL,
  `status` ENUM('SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED') NOT NULL DEFAULT 'SCHEDULED',
  `service_advisor` VARCHAR(100) NOT NULL DEFAULT 'Agus Pratama',
  `notes` TEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `service_bookings`
INSERT INTO `service_bookings` (`id`, `vin`, `customer_name`, `customer_phone`, `vehicle_model`, `stall_number`, `service_type`, `odometer`, `booking_date`, `booking_time`, `status`, `service_advisor`, `notes`) VALUES
('SRV-2026-0901', 'MHF11BA30001', 'Budi Santoso', '0812-8899-1122', 'Toyota Avanza 1.5 G CVT', 1, 'Servis Berkala 10.000 KM', 10120, '2026-09-30', '09:00 WIB', 'COMPLETED', 'Agus Pratama', 'Ganti oli mesin 0W-20, filter oli, rotasi ban, kondisi sempurna.'),
('SRV-2026-0902', 'MHR09HR40001', 'Siti Rahma', '0813-7722-3344', 'Honda HR-V RS Turbo', 2, 'Servis Berkala 20.000 KM', 19850, '2026-09-30', '10:30 WIB', 'IN_PROGRESS', 'Agus Pratama', 'Pemeriksaan rem dan spooring balancing roda depan.'),
('SRV-2026-0903', 'MHK14JM40001', 'Andi Saputra', '0817-2233-5566', 'Suzuki Jimny 4WD', 3, 'Klaim Garansi & Recall ECU', 5400, '2026-09-30', '13:00 WIB', 'SCHEDULED', 'Agus Pratama', 'Pembaruan firmware modul penggerak AllGrip Pro.'),
('SRV-2026-0904', 'BYD24AT20001', 'Maya Indah', '0815-4433-2211', 'BYD Atto 3 EV', 4, 'Inspeksi Baterai Traksi EV 15.000 KM', 14900, '2026-09-30', '14:30 WIB', 'SCHEDULED', 'Agus Pratama', 'Pemeriksaan SOH (State of Health) Baterai Blade 99.8%.');

-- --------------------------------------------------------------------
-- 8. Table structure for table `service_records` (Histori Riwayat Servis Fisik)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `service_records`;
CREATE TABLE `service_records` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `vin` VARCHAR(50) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `service_date` DATE NOT NULL,
  `odometer` INT(11) NOT NULL,
  `technician` VARCHAR(100) NOT NULL DEFAULT 'Bengkel Resmi ROCKETDRIVE',
  `description` TEXT NOT NULL,
  `cost` BIGINT(20) NOT NULL DEFAULT 0,
  `status` VARCHAR(50) NOT NULL DEFAULT 'COMPLETED',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_record_vin` (`vin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `service_records`
INSERT INTO `service_records` (`id`, `vin`, `title`, `service_date`, `odometer`, `technician`, `description`, `cost`, `status`) VALUES
(1, 'MHF11BA30001', 'SERVIS PERTAMA (1.000 KM)', '2026-07-10', 1050, 'Tim Mekanik Master ROCKETDRIVE', 'Inspeksi baut roda, cek level fluida rem dan pendingin mesin.', 0, 'COMPLETED'),
(2, 'MHF11BA30001', 'SERVIS BERKALA 10.000 KM', '2026-09-28', 10120, 'Tim Mekanik Master ROCKETDRIVE', 'Penggantian oli mesin Synthetic 0W-20, filter oli OEM, rotasi 4 roda, dan cek sistem kelistrikan.', 650000, 'COMPLETED');

-- --------------------------------------------------------------------
-- 9. Table structure for table `digital_passports` (Paspor Digital Kendaraan)
-- --------------------------------------------------------------------
DROP TABLE IF EXISTS `digital_passports`;
CREATE TABLE `digital_passports` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `vin` VARCHAR(50) NOT NULL UNIQUE,
  `plate_number` VARCHAR(30) NOT NULL,
  `owner_name` VARCHAR(100) NOT NULL,
  `owner_phone` VARCHAR(50) DEFAULT NULL,
  `vehicle_model` VARCHAR(100) NOT NULL,
  `engine_number` VARCHAR(50) NOT NULL,
  `color` VARCHAR(50) NOT NULL,
  `purchase_date` DATE NOT NULL,
  `delivery_date` DATE NOT NULL,
  `current_odometer` INT(11) NOT NULL DEFAULT 0,
  `warranty_status` VARCHAR(100) NOT NULL DEFAULT 'AKTIF (3 Thn / 100.000 KM)',
  `warranty_expiry_date` DATE DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Seed data for table `digital_passports`
INSERT INTO `digital_passports` (`id`, `vin`, `plate_number`, `owner_name`, `owner_phone`, `vehicle_model`, `engine_number`, `color`, `purchase_date`, `delivery_date`, `current_odometer`, `warranty_status`, `warranty_expiry_date`) VALUES
(1, 'MHF11BA30001', 'B 1829 RDV', 'Budi Santoso', '0812-8899-1122', 'Toyota Avanza 1.5 G CVT', '2NR-FE-10291', 'Platinum White Pearl', '2026-06-15', '2026-06-20', 14820, 'AKTIF (3 Thn / 100.000 KM)', '2029-06-20'),
(2, 'MHK14JM40001', 'B 4411 JMY', 'Andi Saputra', '0817-2233-5566', 'Suzuki Jimny 4WD AllGrip', 'K15B-9021', 'Kinetic Yellow', '2026-08-01', '2026-08-05', 5400, 'AKTIF (3 Thn / 100.000 KM)', '2029-08-05');

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
