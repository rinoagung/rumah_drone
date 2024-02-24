import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Pengiriman({ auth, pengiriman, success, cek_minimum }) {
    const updatePengiriman = (e, id, status) => {
        e.preventDefault();
        router.post(`/pengiriman/${id}`, {
            status_pengiriman: status,
            _method: "put",
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Pengiriman
                </h2>
            }
        >
            <Head title="Pengiriman" />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="table-responsive col-lg-11">
                        {/* {cek_minimum.length > 0 && (
                            <div
                                className="alert alert-dismissible fade show col-12"
                                style={{ backgroundColor: "#FFD23F" }}
                                role="alert"
                            >
                                Barang{" "}
                                <strong>({cek_minimum.join(", ")})</strong>{" "}
                                berada dalam batas minimum
                            </div>
                        )} */}
                        <table className="table table-striped table-sm mt-3 text-center">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Nama Barang</th>
                                    <th scope="col">Jumlah Dikirim</th>
                                    <th scope="col">No Pesanan</th>
                                    <th scope="col">Tgl Pengiriman</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pengiriman.map((p, index) => (
                                    <tr key={index}>
                                        <td>{++index}</td>
                                        <td>{p.barang.nama_barang}</td>
                                        <td>{p.jumlah_dikirim}</td>
                                        <td>{p.no_pesanan}</td>
                                        <td>{p.tgl_pengiriman}</td>
                                        <td>
                                            {p.status_pengiriman ==
                                            "Selesai" ? (
                                                <span className="badge text-bg-success">
                                                    Selesai
                                                </span>
                                            ) : (
                                                <span className="badge text-bg-warning">
                                                    {p.status_pengiriman}
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            {p.status_pengiriman ==
                                            "Selesai" ? (
                                                <span className="badge bg-transparent border-0 text-success shadow-sm d-inline">
                                                    ---
                                                </span>
                                            ) : (
                                                <button
                                                    className="badge bg-transparent border-0 shadow-sm d-inline"
                                                    onClick={(e) => {
                                                        const status =
                                                            p.status_pengiriman ==
                                                            "Dikirim"
                                                                ? "Selesai"
                                                                : "Dikirim";
                                                        if (
                                                            window.confirm(
                                                                `Anda yakin ingin ${
                                                                    p.status_pengiriman ==
                                                                    "Dikirim"
                                                                        ? "Menyelesaikan"
                                                                        : "Mengirimkan"
                                                                } pesanan ini?`
                                                            )
                                                        ) {
                                                            updatePengiriman(
                                                                e,
                                                                p.id,
                                                                status
                                                            );
                                                        }
                                                    }}
                                                >
                                                    {p.status_pengiriman ==
                                                    "Dikirim" ? (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="limegreen"
                                                            className="bi bi-clipboard2-check-fill"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5" />
                                                            <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5m6.769 6.854-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708" />
                                                        </svg>
                                                    ) : (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="dodgerblue"
                                                            className="bi bi-capslock-fill"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="M7.27 1.047a1 1 0 0 1 1.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816zM4.5 13.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1z" />
                                                        </svg>
                                                    )}
                                                </button>
                                            )}
                                        </td>
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
