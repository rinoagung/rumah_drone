<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Barang;
use App\Models\Inventaris;
use App\Models\Pengiriman;
use App\Http\Requests\StoreBarangRequest;
use App\Http\Requests\UpdateBarangRequest;

class BarangController extends Controller
{
    protected $cek_minimum;

    public function __construct()
    {
        $barangs = Barang::whereColumn('jumlah_barang', '<=', 'stok_minimum')->get();
        $this->cek_minimum = $barangs->pluck('nama_barang')->toArray();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Barang', [
            "barang" => Barang::get(),
            "cek_minimum" => $this->cek_minimum
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarangRequest $request)
    {
        $validate = $request->validate([
            'nama_barang' => "required|max:255",
            "jumlah_barang" => "required|max:255",
            "stok_minimum" => "required|max:255",
        ]);

        $barang =  Barang::create($validate);

        $inventarisData = [
            'id_barang' => $barang->id,
            'status' => 'Masuk',
            'keterangan' => 'Ditambahkan Admin',
            'jumlah' => $validate['jumlah_barang'],
            'tanggal' => now(),
        ];

        Inventaris::create($inventarisData);

        return Inertia::render('Admin/Barang', [
            "barang" => Barang::get(),
            "cek_minimum" => $this->cek_minimum
        ])->with("success", "Barang baru berhasil ditambahkan!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Barang $barang)
    {
        return $this->index();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang)
    {

        return Inertia::render('Admin/BarangEdit', [
            "barang" => $barang,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBarangRequest $request, Barang $barang)
    {

        $validate = $request->validate([
            'nama_barang' => "required|max:255",
            "jumlah_barang" => "required|max:255",
            "stok_minimum" => "required|max:255",
        ]);

        $status = "-";
        if ($request['jumlah_barang'] > $request['old_jumlah_barang']) {
            $status = "Masuk";
        } elseif ($request['jumlah_barang'] < $request['old_jumlah_barang']) {
            $status = "Keluar";
        }

        $inventarisData = [
            'id_barang' => $barang->id,
            'status' => $status,
            'keterangan' => 'Diupdate Admin',
            'jumlah' => $validate['jumlah_barang'],
            'tanggal' => now(),
        ];

        $barang = Barang::where('id', $barang->id)
            ->update($validate);

        Inventaris::create($inventarisData);

        return Inertia::render('Admin/Barang', [
            "barang" => Barang::get(),
            "cek_minimum" => $this->cek_minimum
        ])->with("success", "Barang berhasil diupdate!");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barang $barang)
    {

        $barang->delete();
        $barang->inventaris()->delete();
        $barang->pengiriman()->delete();

        return Inertia::render('Admin/Barang', [
            "barang" => Barang::get(),
            "cek_minimum" => $this->cek_minimum
        ])->with("success", "Barang dan data terkait berhasil dihapus!");
    }

    public function viewPDF()
    {
        $barang = Barang::get();
        $inventaris = Inventaris::with('barang')->get();
        $pengiriman = Pengiriman::with('barang')->get();

        return Inertia::render('Admin/ViewPDF', [
            "barang" => $barang,
            "inventaris" => $inventaris,
            "pengiriman" => $pengiriman,
        ]);
    }
}
