<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;
use Exception;

class VinLockingService
{
    /**
     * Atomically lock a physical VIN for an approved SPK (Requirement #10 & #53)
     *
     * @param string $vin
     * @param array $spkData
     * @return array
     * @throws Exception
     */
    public function lockVinAndCreateSpk(string $vin, array $spkData): array
    {
        return DB::transaction(function () use ($vin, $spkData) {
            // 1. Find vehicle with pessimistic row lock (Requirement #53)
            $vehicle = DB::table('vehicles')
                ->where('vin', $vin)
                ->lockForUpdate()
                ->first();

            if (!$vehicle) {
                throw new Exception("Kendaraan dengan VIN {$vin} tidak ditemukan.");
            }

            // 2. Check current status: must be READY
            if ($vehicle->status !== 'READY') {
                // Requirement #10: "Unit ini baru saja dipesan oleh Sales lain."
                throw new Exception("Unit ini baru saja dipesan oleh Sales lain.");
            }

            // 3. Generate SPK ID
            $spkId = 'SPK-' . date('Y') . '-' . str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);

            // 4. Create SPK record
            DB::table('spks')->insert([
                'id' => $spkId,
                'vehicle_id' => $vehicle->id,
                'vin' => $vin,
                'customer_name' => $spkData['customer_name'],
                'customer_phone' => $spkData['customer_phone'],
                'payment_type' => $spkData['payment_type'] ?? 'CREDIT',
                'booking_fee' => $spkData['booking_fee'] ?? 10000000,
                'sales_executive_id' => $spkData['sales_executive_id'] ?? null,
                'status' => 'APPROVED',
                'verification_url' => "/verify/{$spkId}",
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // 5. Update vehicle status from READY -> BOOKED
            DB::table('vehicles')
                ->where('id', $vehicle->id)
                ->update([
                    'status' => 'BOOKED',
                    'updated_at' => now()
                ]);

            // 6. Record Audit Log (Requirement #32)
            DB::table('audit_logs')->insert([
                'user_id' => $spkData['user_id'] ?? null,
                'action' => 'VIN_LOCKED',
                'module' => 'SPK_MANAGEMENT',
                'record_id' => $spkId,
                'details' => json_encode(['vin' => $vin, 'previous_status' => 'READY', 'new_status' => 'BOOKED']),
                'ip_address' => request()->ip() ?? '127.0.0.1',
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return [
                'success' => true,
                'spk_id' => $spkId,
                'vin' => $vin,
                'status' => 'BOOKED',
                'verification_url' => "/verify/{$spkId}"
            ];
        });
    }
}
