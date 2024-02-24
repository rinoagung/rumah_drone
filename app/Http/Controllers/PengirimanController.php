<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Barang;
use App\Models\Inventaris;
use App\Models\Pengiriman;
use Illuminate\Http\Request;

class PengirimanController extends Controller
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
        return Inertia::render('Staff/Pengiriman', [
            "pengiriman" => Pengiriman::with('barang')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Barang $barang)
    {
        return Inertia::render('Staff/Kirim', [
            "barang" => $barang,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validate = $request->validate([
            'id_barang' => "required|max:255",
            "jumlah_dikirim" => "required|numeric|min:1|max:" . $request->jumlah_barang,
            "no_pesanan" => "required|max:255|unique:pengiriman",
            "tgl_pengiriman" => "required|max:255",
            "status_pengiriman" => "required|max:255",
        ]);

        $inventarisData = [
            'id_barang' => $request->id_barang,
            'status' => 'Keluar',
            'keterangan' => 'Pengiriman',
            'jumlah' => $request->jumlah_dikirim,
            'tanggal' => now(),
        ];

        Pengiriman::create($validate);
        Inventaris::create($inventarisData);

        $updateStok = $request->jumlah_barang - $request->jumlah_dikirim;
        Barang::where('id', $request->id_barang)
            ->update(['jumlah_barang' => $updateStok]);

        return Inertia::render('Admin/Barang', [
            "barang" => Barang::get(),
            "cek_minimum" => $this->cek_minimum
        ])->with("success", "Pengiriman berhasil dicatat!");
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengiriman $pengiriman)
    {
        return $this->index();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengiriman $pengiriman)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pengiriman $pengiriman)
    {

        $validate = $request->validate([
            'status_pengiriman' => "required|max:255",
        ]);

        Pengiriman::where('id', $pengiriman->id)
            ->update($validate);

        return Inertia::render('Staff/Pengiriman', [
            "pengiriman" => Pengiriman::with('barang')->get(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengiriman $pengiriman)
    {
        //
    }
}
