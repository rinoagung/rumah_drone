<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengiriman extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected $table = "pengiriman";

    public function barang()
    {
        return $this->belongsTo(Barang::class, 'id_barang');
    }
}
