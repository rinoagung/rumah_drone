import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Inventaris({ auth, inventaris, success, cek_minimum }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Inventaris
                </h2>
            }
        >
            <Head title="Inventaris" />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="table-responsive col-lg-11">
                        {cek_minimum.length > 0 && (
                            <div
                                className="alert alert-dismissible fade show col-12"
                                style={{ backgroundColor: "#FFD23F" }}
                                role="alert"
                            >
                                Barang{" "}
                                <strong>({cek_minimum.join(", ")})</strong>{" "}
                                berada dalam batas minimum
                            </div>
                        )}
                        <table className="table table-striped table-sm mt-3 text-center">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Barang</th>
                                    <th scope="col">Jumlah</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Keterangan</th>
                                    <th scope="col">Total Stok</th>
                                    <th scope="col">Stok Minimum</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inventaris.map((i, index) => (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{i.barang.nama_barang}</td>
                                        <td>{i.jumlah}</td>
                                        <td>
                                            {i.status == "Keluar" ? (
                                                <span className="badge text-bg-danger">
                                                    Keluar
                                                </span>
                                            ) : (
                                                <span className="badge text-bg-success">
                                                    {i.status}
                                                </span>
                                            )}
                                        </td>
                                        <td>{i.keterangan}</td>
                                        <td>{i.barang.jumlah_barang}</td>
                                        <td>{i.barang.stok_minimum}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
