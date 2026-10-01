<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\SpkController;
use App\Http\Controllers\Api\CreditSimulationController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\ServiceBookingController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| ROCKETDRIVE RESTful API Routes (Requirement #44)
|--------------------------------------------------------------------------
*/

// Authentication
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');
});

// Vehicle Catalog & Inventory
Route::get('/vehicles', [VehicleController::class, 'index']);
Route::get('/vehicles/{id}', [VehicleController::class, 'show']);
Route::get('/brands', [VehicleController::class, 'brands']);
Route::get('/models', [VehicleController::class, 'models']);
Route::get('/inventory', [VehicleController::class, 'inventoryMatrix']);

// Intelligent Financing & Credit Simulator
Route::post('/credit-simulations/calculate', [CreditSimulationController::class, 'calculate']);
Route::get('/leasing-partners', [CreditSimulationController::class, 'leasingPartners']);

// CRM & Lead Management (Kanban)
Route::get('/leads', [LeadController::class, 'index']);
Route::post('/leads', [LeadController::class, 'store']);
Route::patch('/leads/{id}/status', [LeadController::class, 'updateStatus']);

// Test Drive Requests
Route::post('/test-drives', [LeadController::class, 'bookTestDrive']);

// SPK & Atomic VIN Locking
Route::get('/spks', [SpkController::class, 'index']);
Route::post('/spks/lock-vin', [SpkController::class, 'lockVinAndIssueSpk']);
Route::get('/verify/{spkId}', [SpkController::class, 'verifyPublicQr']);

// After-Sales Service & Capacity Engine
Route::get('/service-slots/capacity', [ServiceBookingController::class, 'checkCapacity']);
Route::get('/service-bookings', [ServiceBookingController::class, 'index']);
Route::post('/service-bookings', [ServiceBookingController::class, 'store']);
Route::get('/service-history/{vin}', [ServiceBookingController::class, 'historyByVin']);

// Vehicle Digital Passport & Warranty
Route::get('/customer-vehicles/passport/{vin}', [VehicleController::class, 'digitalPassport']);
Route::get('/warranties/{vin}', [VehicleController::class, 'warrantyStatus']);

// Executive Dashboard & Analytics
Route::get('/dashboard/kpis', [DashboardController::class, 'kpis']);
Route::get('/dashboard/sales-performance', [DashboardController::class, 'salesPerformance']);
Route::get('/reports/export/{type}', [DashboardController::class, 'exportReport']);
