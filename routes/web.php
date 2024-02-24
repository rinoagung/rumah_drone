<?php

use App\Http\Controllers\BarangController;
use App\Http\Controllers\InventarisController;
use App\Http\Controllers\PengirimanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Auth/Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('admin')->group(function () {
    Route::resource('/barang', BarangController::class);
});
Route::middleware('auth')->group(function () {
    Route::get("/barang", [BarangController::class, 'index'])->name('barang');
    Route::get("/inventaris", [InventarisController::class, 'index'])->name('inventaris');
});

Route::middleware('staff')->group(function () {
    Route::resource('/pengiriman', PengirimanController::class);
    Route::get("/pengiriman/form/{barang}", [PengirimanController::class, 'index'])->name('pengiriman.form');
});

require __DIR__ . '/auth.php';
