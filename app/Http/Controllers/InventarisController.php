<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Barang;
use App\Models\Inventaris;
use Illuminate\Http\Request;

class InventarisController extends Controller
{
    public function index()
    {

        $inventaris = Inventaris::with('barang')->get();

        $barangs = Barang::whereColumn('jumlah_barang', '<=', 'stok_minimum')->get();

        $cek_minimum = $barangs->pluck('nama_barang')->toArray();


        return Inertia::render('Admin/Inventaris', [
            "inventaris" => $inventaris,
            "cek_minimum" => $cek_minimum
        ]);
    }
}
