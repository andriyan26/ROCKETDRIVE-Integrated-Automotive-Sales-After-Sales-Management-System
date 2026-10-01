/**
 * Modular Credit Calculation Service (Requirement #54)
 * Calculates Total Down Payment (TDP), Monthly Installment, and Total Financing
 */
export function calculateCreditSimulation({
  otr,
  dpPercent = 20,
  tenorMonths = 36,
  annualInterestRate = 0.045,
  adminFee = 2500000,
  insuranceRate = 0.02, // 2% per year of OTR
  isFirstInstallmentInAdvance = true // ADDB vs ADDM
}) {
  const otrPrice = Number(otr) || 0;
  const dpAmount = Math.round((otrPrice * dpPercent) / 100);
  const principalDebt = otrPrice - dpAmount;

  const tenorYears = tenorMonths / 12;
  const totalInterest = Math.round(principalDebt * annualInterestRate * tenorYears);
  const totalFinancing = principalDebt + totalInterest;
  const monthlyInstallment = Math.round(totalFinancing / tenorMonths);

  // Insurance calculation (All Risk estimated for tenor period)
  const insuranceFee = Math.round(otrPrice * insuranceRate * tenorYears);

  // First installment payment included in TDP if ADDM (Advance)
  const firstInstallment = isFirstInstallmentInAdvance ? monthlyInstallment : 0;

  // Total Down Payment / TDP
  const totalTdp = dpAmount + adminFee + insuranceFee + firstInstallment;

  return {
    otr: otrPrice,
    dpPercent,
    dpAmount,
    principalDebt,
    tenorMonths,
    tenorYears,
    annualInterestRate,
    interestRatePercent: (annualInterestRate * 100).toFixed(2),
    adminFee,
    insuranceFee,
    firstInstallment,
    monthlyInstallment,
    totalTdp,
    totalFinancing,
    disclaimer: "Simulasi bersifat estimasi. Nilai aktual dapat berbeda berdasarkan kebijakan leasing, profil pelanggan, promo, dan persetujuan pembiayaan."
  };
}

export function formatRupiah(value) {
  if (value === null || value === undefined) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
