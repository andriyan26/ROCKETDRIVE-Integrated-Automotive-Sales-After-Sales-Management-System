<?php

namespace App\Services;

class CreditCalculationService
{
    /**
     * Calculate comprehensive credit simulation (Requirement #54)
     *
     * @param float $otr
     * @param float $dpPercent
     * @param int $tenorMonths
     * @param float $annualInterestRate
     * @param float $adminFee
     * @param float $insuranceRate
     * @param bool $isFirstInstallmentInAdvance
     * @return array
     */
    public function calculate(
        float $otr,
        float $dpPercent = 20.0,
        int $tenorMonths = 36,
        float $annualInterestRate = 0.045,
        float $adminFee = 2500000.0,
        float $insuranceRate = 0.02,
        bool $isFirstInstallmentInAdvance = true
    ): array {
        $dpAmount = round(($otr * $dpPercent) / 100);
        $principalDebt = $otr - $dpAmount;

        $tenorYears = $tenorMonths / 12;
        $totalInterest = round($principalDebt * $annualInterestRate * $tenorYears);
        $totalFinancing = $principalDebt + $totalInterest;
        $monthlyInstallment = round($totalFinancing / $tenorMonths);

        $insuranceFee = round($otr * $insuranceRate * $tenorYears);
        $firstInstallment = $isFirstInstallmentInAdvance ? $monthlyInstallment : 0;

        $totalTdp = $dpAmount + $adminFee + $insuranceFee + $firstInstallment;

        return [
            'otr' => $otr,
            'dp_percent' => $dpPercent,
            'dp_amount' => $dpAmount,
            'principal_debt' => $principalDebt,
            'tenor_months' => $tenorMonths,
            'tenor_years' => $tenorYears,
            'annual_interest_rate' => $annualInterestRate,
            'admin_fee' => $adminFee,
            'insurance_fee' => $insuranceFee,
            'first_installment' => $firstInstallment,
            'total_tdp' => $totalTdp,
            'monthly_installment' => $monthlyInstallment,
            'total_financing' => $totalFinancing,
            'disclaimer' => 'Simulasi bersifat estimasi. Nilai aktual dapat berbeda berdasarkan kebijakan leasing, profil pelanggan, promo, dan persetujuan pembiayaan.'
        ];
    }
}
