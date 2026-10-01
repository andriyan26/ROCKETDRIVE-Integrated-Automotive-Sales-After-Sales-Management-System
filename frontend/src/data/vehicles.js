// Data 25+ Model Kendaraan dengan Harga Acuan OTR Jakarta (September 2026)
export const initialVehicles = [
  // TOYOTA
  {
    id: 1,
    brand: "Toyota",
    model: "Toyota Avanza",
    category: "MPV",
    startingPrice: 244200000,
    fuel: "Bensin (Petrol)",
    seats: 7,
    transmission: "CVT / Manual",
    engine: "1.5L Dual VVT-i",
    image: "/Toyota Avanza (7 Kursi).jpg",
    variants: ["1.3 E M/T", "1.5 G M/T", "1.5 G CVT", "1.5 G CVT TSS"],
    colors: ["Platinum White Pearl", "Silver Metallic", "Black Metallic", "Gray Metallic"],
    status: "READY",
    vins: [
      { vin: "MHF11BA30001", engine: "2NR-FE-10291", color: "Platinum White Pearl", status: "READY", location: "Showroom Pusat Lt. 1" },
      { vin: "MHF11BA30002", engine: "2NR-FE-10292", color: "Silver Metallic", status: "BOOKED", location: "Gudang Logistik Cikarang" },
      { vin: "MHF11BA30003", engine: "2NR-FE-10293", color: "Black Metallic", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Toyota Safety Sense (TSS)", "Layar Sentuh Floating 9-inci", "Vehicle Stability Control", "6 Kantung Udara", "Kamera Parkir Belakang"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 2,
    brand: "Toyota",
    model: "Toyota Veloz Hybrid",
    category: "MPV",
    startingPrice: 303000000,
    fuel: "Hybrid",
    seats: 7,
    transmission: "e-CVT",
    engine: "1.5L HEV Atkinson Cycle",
    image: "/Toyota Veloz Hybrid (7 Kursi).jpg",
    variants: ["Veloz Hybrid Q CVT", "Veloz Hybrid Q CVT TSS"],
    colors: ["Platinum White Pearl", "Dark Red Mica Metallic", "Black Metallic"],
    status: "READY",
    vins: [
      { vin: "MHF12VH40001", engine: "2NR-VEX-4011", color: "Platinum White Pearl", status: "READY", location: "Showroom Pusat Lt. 1" },
      { vin: "MHF12VH40002", engine: "2NR-VEX-4012", color: "Dark Red Mica Metallic", status: "READY", location: "Gudang Logistik Cikarang" }
    ],
    features: ["Display Digital Penuh 7-inci TFT", "TSS dengan Lane Departure Alert", "Mode Penggerak EV Murni", "Pengisi Daya Nirkabel"],
    warranty: "5 Tahun / 150.000 KM Garansi Baterai HEV"
  },
  {
    id: 3,
    brand: "Toyota",
    model: "Toyota Raize",
    category: "SUV",
    startingPrice: 243500000,
    fuel: "Bensin (Petrol)",
    seats: 5,
    transmission: "CVT",
    engine: "1.0L Turbo 1KR-VET",
    image: "/Toyota Raize (5 Kursi).jpeg",
    variants: ["1.2 G CVT", "1.0T G CVT", "1.0T GR Sport TSS"],
    colors: ["Turquoise MM", "Yellow SE Black Roof", "White Black Roof"],
    status: "READY",
    vins: [
      { vin: "MHF13RZ50001", engine: "1KR-VET-3021", color: "Turquoise MM", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Mesin Turbocharged Efisien", "Paddle Shift Sporty", "Blind Spot Monitoring", "Head Unit Layar Sentuh 9-inci"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 4,
    brand: "Toyota",
    model: "Toyota Yaris Cross",
    category: "SUV",
    startingPrice: 359700000,
    fuel: "Hybrid / Bensin",
    seats: 5,
    transmission: "CVT / e-CVT",
    engine: "1.5L HEV & 1.5L Dual VVT-i",
    image: "/Toyota Yaris Cross (5 Kursi).jpg",
    variants: ["1.5 G CVT", "1.5 S CVT TSS", "1.5 S HEV CVT TSS"],
    colors: ["Scarlet MM Black Roof", "Super White", "Silver Metallic"],
    status: "READY",
    vins: [
      { vin: "MHF14YC60001", engine: "2NR-VEX-8812", color: "Scarlet MM Black Roof", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Atap Panoramic Glass dengan Power Sunshade", "Pintu Bagasi Elektrik dengan Kick Sensor", "Multi Around Monitor 360"],
    warranty: "5 Tahun / 150.000 KM"
  },
  {
    id: 5,
    brand: "Toyota",
    model: "Toyota Innova Zenix",
    category: "MPV",
    startingPrice: 437700000,
    fuel: "Hybrid / Bensin",
    seats: 7,
    transmission: "Direct Shift-CVT",
    engine: "2.0L M20A-FXS Dynamic Force",
    image: "/Toyota Innova Zenix (7 Kursi).jpg",
    variants: ["2.0 G CVT", "2.0 V CVT", "2.0 V HEV CVT", "2.0 Q HEV CVT TSS Modellista"],
    colors: ["Attitude Black Mica", "Platinum White Pearl", "Silver Metallic"],
    status: "READY",
    vins: [
      { vin: "MHF15ZX70001", engine: "M20A-FXS-9111", color: "Platinum White Pearl", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Kursi Kapten Ottoman Mewah", "Dual Layar Hiburan Belakang 10-inci", "Atap Panoramic Geser Elektrik", "TSS 3.0 Generasi Terbaru"],
    warranty: "5 Tahun / 160.000 KM"
  },

  // HONDA
  {
    id: 6,
    brand: "Honda",
    model: "Honda Brio",
    category: "CITY CAR",
    startingPrice: 167900000,
    fuel: "Bensin (Petrol)",
    seats: 5,
    transmission: "CVT / Manual",
    engine: "1.2L i-VTEC 90 PS",
    image: "/Honda Brio (5 Kursi).jpg",
    variants: ["Satya S M/T", "Satya E CVT", "RS M/T", "RS CVT"],
    colors: ["Rallye Red", "Crystal Black Pearl", "Electric Lime Metallic", "Taffeta White"],
    status: "READY",
    vins: [
      { vin: "MHR06BR10001", engine: "L12B-4401", color: "Electric Lime Metallic", status: "READY", location: "Gudang Logistik Cikarang" }
    ],
    features: ["Lampu Utama LED & DRL", "Layar Sentuh 7-inci Konektivitas Smartphone", "Dual Front SRS Airbags"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 7,
    brand: "Honda",
    model: "Honda WR-V",
    category: "SUV",
    startingPrice: 274900000,
    fuel: "Bensin (Petrol)",
    seats: 5,
    transmission: "CVT",
    engine: "1.5L i-VTEC DOHC 121 PS",
    image: "/Honda WR-V (5 Kursi).jpg",
    variants: ["E CVT", "RS CVT", "RS CVT with Honda SENSING"],
    colors: ["Ignite Red Metallic Two-Tone", "Meteoroid Gray Metallic", "Taffeta White"],
    status: "READY",
    vins: [
      { vin: "MHR07WR20001", engine: "L15ZF-9901", color: "Ignite Red Metallic Two-Tone", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Paket Honda SENSING", "Walk-Away Auto Lock", "Penyala Mesin Jarak Jauh (Remote Start)", "Honda LaneWatch"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 8,
    brand: "Honda",
    model: "Honda BR-V",
    category: "SUV",
    startingPrice: 292900000,
    fuel: "Bensin (Petrol)",
    seats: 7,
    transmission: "CVT",
    engine: "1.5L i-VTEC DOHC 121 PS",
    image: "/Honda BR-V (7 Kursi).png",
    variants: ["S M/T", "E CVT", "Prestige CVT", "Prestige with Honda SENSING"],
    colors: ["Opal White Pearl", "Crystal Black Pearl", "Modern Steel Metallic"],
    status: "READY",
    vins: [
      { vin: "MHR08BV30001", engine: "L15ZF-1102", color: "Opal White Pearl", status: "READY", location: "Gudang Logistik Cikarang" }
    ],
    features: ["3 Baris Kursi Fleksibel", "Honda SENSING", "Filter Udara Kabin PM2.5", "Remote Engine Start"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 9,
    brand: "Honda",
    model: "Honda HR-V",
    category: "SUV",
    startingPrice: 383900000,
    fuel: "Hybrid / Bensin",
    seats: 5,
    transmission: "CVT",
    engine: "1.5L VTEC Turbo / 1.5L e:HEV",
    image: "/Honda HR-V (7 Kursi).jpg",
    variants: ["S CVT", "E CVT", "SE CVT", "RS Turbo"],
    colors: ["Sand Khaki Pearl Two-Tone", "Ignite Red Metallic", "Platinum White Pearl"],
    status: "READY",
    vins: [
      { vin: "MHR09HR40001", engine: "L15C-3301", color: "Sand Khaki Pearl Two-Tone", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Panoramic Glass Roof", "Hands-Free Access Power Tailgate", "Honda SENSING Standar Seluruh Varian"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 10,
    brand: "Honda",
    model: "Honda CR-V",
    category: "SUV",
    startingPrice: 749100000,
    fuel: "Hybrid / Bensin",
    seats: 5,
    transmission: "e-CVT / CVT",
    engine: "2.0L e:HEV Dual Motor & 1.5L Turbo",
    image: "/Honda CR-V (5 Kursi).png",
    variants: ["1.5L Turbo (7-Seater)", "2.0L RS e:HEV (5-Seater)"],
    colors: ["Canyon River Blue Metallic", "Platinum White Pearl", "Crystal Black"],
    status: "READY",
    vins: [
      { vin: "MHR10CR50001", engine: "LFA1-9011", color: "Canyon River Blue Metallic", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Honda CONNECT Telematika Pintar", "Sistem Audio Premium Bose 12-Speaker", "Heads-Up Display", "Pintu Bagasi Sensor Kaki"],
    warranty: "5 Tahun / 150.000 KM Garansi Baterai HEV"
  },

  // SUZUKI
  {
    id: 11,
    brand: "Suzuki",
    model: "Suzuki S-Presso",
    category: "CITY CAR",
    startingPrice: 178100000,
    fuel: "Bensin (Petrol)",
    seats: 5,
    transmission: "AGS / Manual",
    engine: "1.0L K10C Dualjet with Auto Stop-Start",
    image: "/Suzuki S-Presso (5 Kursi).jpg",
    variants: ["1.0 M/T", "1.0 AGS"],
    colors: ["Sizzle Orange", "Solid Fire Red", "Pearl Starry Blue", "White"],
    status: "READY",
    vins: [
      { vin: "MHK11SP10001", engine: "K10C-1021", color: "Sizzle Orange", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["ESP (Electronic Stability Program)", "Hill Hold Control", "Layar Sentuh Hiburan dengan Apple CarPlay"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 12,
    brand: "Suzuki",
    model: "Suzuki Fronx",
    category: "CROSSOVER",
    startingPrice: 265600000,
    fuel: "Hybrid",
    seats: 5,
    transmission: "6-Speed AT / Manual",
    engine: "1.5L K15C Smart Hybrid (SHVS)",
    image: "/Suzuki Fronx (5 Kursi).jpg",
    variants: ["GL M/T", "GLX AT", "Smart Hybrid Alpha AT"],
    colors: ["Grandeur Gray", "Arctic White", "Opulent Red Black Roof"],
    status: "READY",
    vins: [
      { vin: "MHK12FX20001", engine: "K15C-2231", color: "Opulent Red Black Roof", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Kamera 360 Derajat All Around", "Head Up Display (HUD)", "Wireless Charging", "Layar 9-inci SmartPlay Pro+"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 13,
    brand: "Suzuki",
    model: "Suzuki XL7 Hybrid",
    category: "MPV",
    startingPrice: 274300000,
    fuel: "Hybrid",
    seats: 7,
    transmission: "4-Speed AT / Manual",
    engine: "1.5L K15B SHVS Integrated Starter Generator",
    image: "/Suzuki XL7 Hybrid (7 Kursi).jpeg",
    variants: ["Zeta M/T", "Beta AT Hybrid", "Alpha AT Hybrid Two-Tone"],
    colors: ["Savanna Ivory Black", "Sunrise Orange Black", "Pearl Snow White"],
    status: "READY",
    vins: [
      { vin: "MHK13XL30001", engine: "K15B-6019", color: "Savanna Ivory Black", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Spion Digital E-Mirror Touchscreen", "Sistem SHVS Mild Hybrid", "Cruise Control", "Hill Hold Control"],
    warranty: "5 Tahun Garansi Baterai Lithium-Ion"
  },
  {
    id: 14,
    brand: "Suzuki",
    model: "Suzuki Jimny",
    category: "SUV",
    startingPrice: 470500000,
    fuel: "Bensin (Petrol)",
    seats: 4,
    transmission: "4AT / 5MT AllGrip Pro 4WD",
    engine: "1.5L K15B 102 PS",
    image: "/Suzuki Jimny (4 Kursi).jpg",
    variants: ["3-Door A/T Two-Tone", "5-Door A/T Two-Tone", "5-Door M/T"],
    colors: ["Kinetic Yellow", "Jungle Green", "Brisk Blue Metallic Black"],
    status: "READY",
    vins: [
      { vin: "MHK14JM40001", engine: "K15B-9021", color: "Kinetic Yellow", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Sasis Tangga Ladder Frame Kokoh", "Sistem Penggerak 4WD AllGrip Pro dengan Low Gear", "Brake LSD Traction Control"],
    warranty: "3 Tahun / 100.000 KM"
  },

  // DAIHATSU
  {
    id: 15,
    brand: "Daihatsu",
    model: "Daihatsu Ayla",
    category: "CITY CAR",
    startingPrice: 141200000,
    fuel: "Bensin (Petrol)",
    seats: 5,
    transmission: "D-CVT / Manual",
    engine: "1.0L 1KR-VE & 1.2L WA-VE",
    image: "/Daihatsu Ayla (5 Kursi).jpg",
    variants: ["1.0 M", "1.0 X CVT", "1.2 R CVT", "1.2 R ADS CVT"],
    colors: ["Ruby Red Metallic", "Compagno Red", "Icy White", "Ultra Black Solid"],
    status: "READY",
    vins: [
      { vin: "MHD15AY10001", engine: "WA-VE-0911", color: "Ruby Red Metallic", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Platform DNGA Generasi Terbaru", "Tombol Push Start", "Vehicle Stability Control (VSC)", "Hill Start Assist"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 16,
    brand: "Daihatsu",
    model: "Daihatsu Sigra",
    category: "MPV",
    startingPrice: 144200000,
    fuel: "Bensin (Petrol)",
    seats: 7,
    transmission: "4AT / 5MT",
    engine: "1.0L 1KR-VE & 1.2L 3NR-VE Dual VVT-i",
    image: "/Daihatsu Sigra (7 Kursi).jpg",
    variants: ["1.0 D M/T", "1.0 M M/T", "1.2 X A/T", "1.2 R A/T Deluxe"],
    colors: ["Dark Grey Metallic", "Glittering Silver", "Icy White Solid"],
    status: "READY",
    vins: [
      { vin: "MHD16SG20001", engine: "3NR-VE-4001", color: "Dark Grey Metallic", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Lampu Depan LED Smoked", "Kamera Parkir Belakang", "Dual SRS Airbag"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 17,
    brand: "Daihatsu",
    model: "Daihatsu Rocky",
    category: "SUV",
    startingPrice: 215800000,
    fuel: "Bensin (Petrol)",
    seats: 5,
    transmission: "D-CVT / Manual",
    engine: "1.2L WA-VE & 1.0L Turbo 1KR-VET",
    image: "/Daihatsu Rocky (5 Kursi).jpg",
    variants: ["1.2 M CVT", "1.2 X CVT ADS", "1.0 R Turbo CVT ASA"],
    colors: ["Compagno Red Two-Tone", "Classic Silver", "Shining Red"],
    status: "READY",
    vins: [
      { vin: "MHD17RK30001", engine: "1KR-VET-7711", color: "Compagno Red Two-Tone", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["A.S.A (Advanced Safety Assist)", "Panel Instrumen Digital Penuh", "Subwoofer Audio Kaya Suara"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 18,
    brand: "Daihatsu",
    model: "Daihatsu Xenia",
    category: "MPV",
    startingPrice: 229650000,
    fuel: "Bensin (Petrol)",
    seats: 7,
    transmission: "D-CVT / Manual",
    engine: "1.3L 1NR-VE & 1.5L 2NR-VE Dual VVT-i",
    image: "/Daihatsu Xenia (7 Kursi).jpg",
    variants: ["1.3 M M/T", "1.3 X CVT", "1.5 R CVT", "1.5 R CVT ASA ADS"],
    colors: ["Greenish Gun Metal", "Purplish Silver", "White Solid"],
    status: "READY",
    vins: [
      { vin: "MHD18XN40001", engine: "2NR-VE-5012", color: "Greenish Gun Metal", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Keselamatan Aktif A.S.A", "Mode Kursi Santai Sofa", "Kamera Monitor 360 Sekeliling"],
    warranty: "3 Tahun / 100.000 KM"
  },
  {
    id: 19,
    brand: "Daihatsu",
    model: "Daihatsu Terios",
    category: "SUV",
    startingPrice: 249450000,
    fuel: "Bensin (Petrol)",
    seats: 7,
    transmission: "4AT / 5MT",
    engine: "1.5L 2NR-VE Dual VVT-i 104 PS",
    image: "/Daihatsu Terios (7 Kursi).jpg",
    variants: ["X M/T", "X A/T Deluxe", "R A/T Custom", "R A/T ADS"],
    colors: ["Silver Metallic", "Bronze Metallic", "Midnight Black Metallic"],
    status: "READY",
    vins: [
      { vin: "MHD19TR50001", engine: "2NR-VE-8032", color: "Silver Metallic", status: "READY", location: "Gudang Logistik Cikarang" }
    ],
    features: ["Pengisi Daya Nirkabel", "Monitor Sekeliling 360", "6 SRS Airbags", "Sistem Eco Idle Pintar"],
    warranty: "3 Tahun / 100.000 KM"
  },

  // HYUNDAI
  {
    id: 20,
    brand: "Hyundai",
    model: "Hyundai Stargazer",
    category: "MPV",
    startingPrice: 241400000,
    fuel: "Bensin (Petrol)",
    seats: 7,
    transmission: "IVT",
    engine: "Smartstream G1.5 MPI",
    image: "/Hyundai Stargazer (7 Kursi).jpg",
    variants: ["Active IVT", "Essential IVT", "Prime IVT Captain Seat"],
    colors: ["Magnetic Silver Metallic", "Dragon Red Pearl", "Creamy White Pearl"],
    status: "READY",
    vins: [
      { vin: "KMH20SG10001", engine: "G4FL-1002", color: "Magnetic Silver Metallic", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Hyundai SmartSense", "Layanan Telematika Bluelink", "Lampu Suasana Kabin Tersembunyi", "Pilihan Kursi Kapten"],
    warranty: "4 Tahun / 100.000 KM + Gratis Perawatan 3+1 Tahun"
  },
  {
    id: 21,
    brand: "Hyundai",
    model: "Hyundai Creta",
    category: "SUV",
    startingPrice: 307800000,
    fuel: "Bensin (Petrol)",
    seats: 5,
    transmission: "IVT / Manual",
    engine: "Smartstream G1.5 115 PS",
    image: "/Hyundai Creta (5 Kursi).jpg",
    variants: ["Active", "Trend", "Style", "Prime Two-Tone IVT"],
    colors: ["Titan Gray Metallic", "Galaxy Blue Pearl", "Midnight Black Pearl"],
    status: "READY",
    vins: [
      { vin: "KMH21CR20001", engine: "G4FL-2099", color: "Titan Gray Metallic", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Panoramic Sunroof Mewah", "Sistem Audio BOSE 8-Speaker", "Kursi Depan Berventilasi Udara", "Hyundai SmartSense ADAS"],
    warranty: "4 Tahun / 100.000 KM"
  },
  {
    id: 22,
    brand: "Hyundai",
    model: "Hyundai Kona Electric",
    category: "EV",
    startingPrice: 565300000,
    fuel: "Listrik (EV)",
    seats: 5,
    transmission: "Single Speed Reduction Gear",
    engine: "Permanent Magnet Synchronous Motor (160 kW)",
    image: "/Hyundai Kona Electric (5 Kursi).jpg",
    variants: ["Style Standard Range", "Prime Standard Range", "Signature Long Range (500+ KM)"],
    colors: ["Cyber Gray Metallic", "Optic White", "Abyss Black Pearl"],
    status: "READY",
    vins: [
      { vin: "KMH22KN30001", engine: "EM16-8012", color: "Cyber Gray Metallic", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Paket Baterai Produksi Lokal Indonesia", "Fitur Vehicle-to-Load (V2L) 3.3kW", "Pembaruan Perangkat Lunak Nirkabel (OTA)", "Pengereman Regeneratif Cerdas 2.0"],
    warranty: "8 Tahun / 160.000 KM Garansi Baterai Voltase Tinggi"
  },

  // BYD
  {
    id: 23,
    brand: "BYD",
    model: "BYD Dolphin",
    category: "EV",
    startingPrice: 369000000,
    fuel: "Listrik (EV)",
    seats: 5,
    transmission: "Electric Single Speed",
    engine: "BYD Blade Battery 60.48 kWh (204 PS)",
    image: "/BYD Dolphin (5 Kursi).jpg",
    variants: ["Dynamic Standard (410 KM)", "Premium Extended (490 KM)"],
    colors: ["Maldive Purple", "Coral Pink", "Urban Grey", "Ski White"],
    status: "READY",
    vins: [
      { vin: "BYD23DP10001", engine: "TZ200XSQ-101", color: "Maldive Purple", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Baterai Super Aman BYD Blade Battery", "Layar Sentuh Pintar Berputar 12.8-inci", "DiPilot Sistem Keselamatan ADAS", "Panoramic Glass Roof Luas"],
    warranty: "8 Tahun / 160.000 KM Garansi Baterai Traksi"
  },
  {
    id: 24,
    brand: "BYD",
    model: "BYD Atto 3",
    category: "EV",
    startingPrice: 415000000,
    fuel: "Listrik (EV)",
    seats: 5,
    transmission: "Electric Single Speed",
    engine: "BYD Blade Battery 60.48 kWh (204 PS / 310 Nm)",
    image: "/BYD Atto 3 (5 Kursi).jpg",
    variants: ["Advanced (410 KM)", "Superior (480 KM)"],
    colors: ["Surf Blue", "Boulder Grey", "Forest Green", "Ski White"],
    status: "READY",
    vins: [
      { vin: "BYD24AT20001", engine: "TZ200XSQ-992", color: "Surf Blue", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Platform Cerdas e-Platform 3.0", "Interior Futuristik Bergaya Gym", "Layar Berputar Elektrik 15.6-inci", "Penyalur Daya Bergerak VTOL"],
    warranty: "8 Tahun / 160.000 KM Garansi Baterai Traksi"
  },

  // CHERY
  {
    id: 25,
    brand: "Chery",
    model: "Chery Tiggo Cross",
    category: "CROSSOVER",
    startingPrice: 264500000,
    fuel: "Bensin (Petrol)",
    seats: 5,
    transmission: "CVT 9-Speed Simulation",
    engine: "1.5L Turbo Acteco 147 PS / 210 Nm",
    image: "/Chery Tiggo Cross (5 Kursi).jpg",
    variants: ["Comfort 1.5T", "Champion 1.5T ADAS"],
    colors: ["Bloodstone Red", "Carbon Crystal Black", "Khaki White"],
    status: "READY",
    vins: [
      { vin: "LCH25TC10001", engine: "SQRE4T15C-401", color: "Bloodstone Red", status: "READY", location: "Showroom Pusat Lt. 1" }
    ],
    features: ["Layar Ganda 10.25-inci Terintegrasi", "Sistem Audio Sony 8-Speaker", "Level 2 Autonomous ADAS", "Kamera Panorama 360 HD"],
    warranty: "10 Tahun / 1.000.000 KM Garansi Mesin (Pemilik Pertama)"
  }
];

export const leasingPartners = [
  { id: "mtf", name: "Mandiri Tunas Finance", minDp: 20, adminFee: 2500000, insuranceRate: 0.02, rates: { 12: 0.038, 24: 0.042, 36: 0.046, 48: 0.052, 60: 0.059 } },
  { id: "acc", name: "Astra Credit Companies (ACC)", minDp: 20, adminFee: 2800000, insuranceRate: 0.021, rates: { 12: 0.039, 24: 0.043, 36: 0.047, 48: 0.053, 60: 0.061 } },
  { id: "adira", name: "Adira Finance", minDp: 15, adminFee: 2400000, insuranceRate: 0.019, rates: { 12: 0.041, 24: 0.045, 36: 0.049, 48: 0.055, 60: 0.063 } },
  { id: "bca", name: "BCA Finance", minDp: 20, adminFee: 2200000, insuranceRate: 0.02, rates: { 12: 0.035, 24: 0.039, 36: 0.043, 48: 0.049, 60: 0.056 } },
];
