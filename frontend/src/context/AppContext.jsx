import React, { createContext, useContext, useState, useEffect } from "react";
import { initialVehicles, leasingPartners } from "../data/vehicles";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Global Vehicles State (with live VIN inventory tracking)
  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem("rocketdrive_vehicles");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((v) => {
          const init = initialVehicles.find((iv) => iv.id === v.id);
          if (init && (v.image?.includes("unsplash") || !v.image)) {
            return { ...v, image: init.image };
          }
          return v;
        });
      } catch (e) {
        return initialVehicles;
      }
    }
    return initialVehicles;
  });

  // Current User / Role State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("rocketdrive_user");
    return saved ? JSON.parse(saved) : {
      id: "usr_admin",
      name: "Alexander Pratama",
      email: "admin@rocketdrive.test",
      role: "SUPER_ADMIN",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
    };
  });

  // CRM Leads
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("rocketdrive_leads");
    return saved ? JSON.parse(saved) : [
      { id: "LD-001", customerName: "Budi Santoso", phone: "0812-8899-1122", email: "budi@gmail.com", vehicleModel: "Toyota Avanza", source: "Website Showroom", temperature: "HOT", status: "NEW", score: 85, assignedSales: "Doni Wijaya", date: "2026-09-28" },
      { id: "LD-002", customerName: "Siti Rahma", phone: "0813-7722-3344", email: "siti.rahma@yahoo.com", vehicleModel: "Honda HR-V", source: "Instagram Ads", temperature: "HOT", status: "CONTACTED", score: 92, assignedSales: "Rian Hidayat", date: "2026-09-29" },
      { id: "LD-003", customerName: "Hendro Gunawan", phone: "0811-9988-7766", email: "hendro.g@outlook.com", vehicleModel: "Hyundai Ioniq / Kona", source: "Walk-in Showroom", temperature: "WARM", status: "TEST_DRIVE", score: 78, assignedSales: "Doni Wijaya", date: "2026-09-29" },
      { id: "LD-004", customerName: "Maya Indah", phone: "0815-4433-2211", email: "maya.indah@gmail.com", vehicleModel: "BYD Atto 3", source: "Credit Simulator", temperature: "HOT", status: "NEGOTIATION", score: 95, assignedSales: "Faisal Akbar", date: "2026-09-30" },
      { id: "LD-005", customerName: "Andi Saputra", phone: "0817-2233-5566", email: "andi.s@gmail.com", vehicleModel: "Suzuki Jimny", source: "Website Showroom", temperature: "WARM", status: "SPK", score: 98, assignedSales: "Rian Hidayat", date: "2026-09-30" }
    ];
  });

  // SPK Orders
  const [spks, setSpks] = useState(() => {
    const saved = localStorage.getItem("rocketdrive_spks");
    return saved ? JSON.parse(saved) : [
      {
        id: "SPK-2026-000123",
        customerName: "Andi Saputra",
        customerPhone: "0817-2233-5566",
        vehicleModel: "Suzuki Jimny",
        vin: "MHK14JM40001",
        color: "Kinetic Yellow",
        price: 470500000,
        paymentType: "CREDIT",
        leasingPartner: "BCA Finance",
        bookingFee: 10000000,
        status: "APPROVED",
        salesExecutive: "Rian Hidayat",
        createdAt: "2026-09-28",
        verificationUrl: "/verify/SPK-2026-000123"
      },
      {
        id: "SPK-2026-000124",
        customerName: "Dewi Lestari",
        customerPhone: "0819-3344-5511",
        vehicleModel: "Toyota Veloz Hybrid",
        vin: "MHF12VH40001",
        color: "Platinum White Pearl",
        price: 303000000,
        paymentType: "CASH",
        leasingPartner: "-",
        bookingFee: 5000000,
        status: "APPROVED",
        salesExecutive: "Doni Wijaya",
        createdAt: "2026-09-29",
        verificationUrl: "/verify/SPK-2026-000124"
      }
    ];
  });

  // Service Slots & Bookings
  const [serviceBookings, setServiceBookings] = useState(() => {
    const saved = localStorage.getItem("rocketdrive_service_bookings");
    return saved ? JSON.parse(saved) : [
      { id: "SB-2026-01", customerName: "Ahmad Dahlan", phone: "0812-3344-5566", vin: "MHF11BA30001", vehicleModel: "Toyota Avanza", serviceType: "Periodic Maintenance 10,000 KM", date: "2026-10-02", timeSlot: "09:00", complaint: "Ganti oli dan general check-up berkala", status: "CONFIRMED" },
      { id: "SB-2026-02", customerName: "Rina Kusuma", phone: "0813-8899-7711", vin: "MHR09HR40001", vehicleModel: "Honda HR-V", serviceType: "Periodic Maintenance 20,000 KM", date: "2026-10-02", timeSlot: "09:00", complaint: "AC kurang dingin pada siang hari", status: "CONFIRMED" },
      { id: "SB-2026-03", customerName: "Bambang Tri", phone: "0818-4455-6677", vin: "KMH20SG10001", vehicleModel: "Hyundai Stargazer", serviceType: "Periodic Maintenance 30,000 KM", date: "2026-10-02", timeSlot: "10:00", complaint: "Pembersihan rem dan rotasi ban", status: "CONFIRMED" },
      { id: "SB-2026-04", customerName: "Jessica Wong", phone: "0819-2233-1100", vin: "MHK13XL30001", vehicleModel: "Suzuki XL7 Hybrid", serviceType: "Battery & Electrical Inspection", date: "2026-10-02", timeSlot: "10:00", complaint: "Pengecekan baterai ISG", status: "CONFIRMED" },
      { id: "SB-2026-05", customerName: "Denny Setiawan", phone: "0812-7766-5544", vin: "MHD17RK30001", vehicleModel: "Daihatsu Rocky", serviceType: "Engine Tune-Up", date: "2026-10-02", timeSlot: "10:00", complaint: "Check engine light indicator", status: "CONFIRMED" }
    ];
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New lead assigned: Budi Santoso (Toyota Avanza)", time: "10 min ago", unread: true },
    { id: 2, text: "SPK-2026-000124 approved. VIN MHF12VH40001 successfully locked.", time: "1 hour ago", unread: true },
    { id: 3, text: "Slot service 10:00 for 2026-10-02 is now fully booked (3/3).", time: "2 hours ago", unread: false }
  ]);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("rocketdrive_vehicles", JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem("rocketdrive_leads", JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem("rocketdrive_spks", JSON.stringify(spks));
  }, [spks]);

  useEffect(() => {
    localStorage.setItem("rocketdrive_service_bookings", JSON.stringify(serviceBookings));
  }, [serviceBookings]);

  useEffect(() => {
    localStorage.setItem("rocketdrive_user", JSON.stringify(currentUser));
  }, [currentUser]);

  // VIN LOCKING SERVICE (Requirement #10 & #53)
  // Atomic simulation to lock a VIN to BOOKED
  const lockVinForSpk = (selectedVin, spkData) => {
    let targetVehicle = null;
    let targetVinObj = null;

    for (const v of vehicles) {
      const match = v.vins.find((item) => item.vin === selectedVin);
      if (match) {
        targetVehicle = v;
        targetVinObj = match;
        break;
      }
    }

    if (!targetVinObj) {
      return { success: false, message: "VIN tidak ditemukan di sistem database." };
    }

    // Row Lock Simulation: check status
    if (targetVinObj.status !== "READY") {
      return {
        success: false,
        message: "Unit ini baru saja dipesan oleh Sales lain." // Requirement #10
      };
    }

    // Atomic update
    const updatedVehicles = vehicles.map((v) => {
      if (v.id === targetVehicle.id) {
        const newVins = v.vins.map((item) => {
          if (item.vin === selectedVin) {
            return { ...item, status: "BOOKED" };
          }
          return item;
        });
        return { ...v, vins: newVins };
      }
      return v;
    });

    setVehicles(updatedVehicles);

    const newSpk = {
      id: `SPK-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      ...spkData,
      vin: selectedVin,
      status: "APPROVED",
      createdAt: new Date().toISOString().split("T")[0],
      verificationUrl: `/verify/SPK-2026-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setSpks((prev) => [newSpk, ...prev]);

    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `SPK ${newSpk.id} dibuat! VIN ${selectedVin} berhasil di-lock (BOOKED).`,
        time: "Just now",
        unread: true
      },
      ...prev
    ]);

    return { success: true, spk: newSpk };
  };

  // SERVICE SLOT BOOKING WITH CAPACITY CONTROL (Requirement #23)
  // Prevents overbooking: max 3 slots per hour
  const bookServiceSlot = (bookingData) => {
    const { date, timeSlot } = bookingData;
    const existingForSlot = serviceBookings.filter(
      (b) => b.date === date && b.timeSlot === timeSlot && b.status !== "CANCELLED"
    );

    const MAX_SLOT_CAPACITY = 3;
    if (existingForSlot.length >= MAX_SLOT_CAPACITY) {
      return {
        success: false,
        message: "Slot tidak tersedia." // Requirement #23
      };
    }

    const newBooking = {
      id: `SB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      ...bookingData,
      status: "CONFIRMED"
    };

    setServiceBookings((prev) => [newBooking, ...prev]);

    setNotifications((prev) => [
      {
        id: Date.now(),
        text: `Booking Service terkonfirmasi untuk VIN ${bookingData.vin} pada ${date} jam ${timeSlot}.`,
        time: "Just now",
        unread: true
      },
      ...prev
    ]);

    return { success: true, booking: newBooking };
  };

  // Switch demo user
  const switchDemoRole = (role) => {
    const roles = {
      SUPER_ADMIN: {
        id: "usr_admin",
        name: "Alexander Pratama",
        email: "admin@rocketdrive.test",
        role: "SUPER_ADMIN",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      },
      SALES_EXECUTIVE: {
        id: "usr_sales",
        name: "Doni Wijaya",
        email: "sales@rocketdrive.test",
        role: "SALES_EXECUTIVE",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      },
      SERVICE_ADVISOR: {
        id: "usr_service",
        name: "Agus Pratama",
        email: "service@rocketdrive.test",
        role: "SERVICE_ADVISOR",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
      },
      CUSTOMER: {
        id: "usr_cust",
        name: "Andi Saputra",
        email: "customer@rocketdrive.test",
        role: "CUSTOMER",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      }
    };
    if (roles[role]) {
      setCurrentUser(roles[role]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        setVehicles,
        currentUser,
        setCurrentUser,
        switchDemoRole,
        leads,
        setLeads,
        spks,
        lockVinForSpk,
        serviceBookings,
        bookServiceSlot,
        notifications,
        leasingPartners
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
