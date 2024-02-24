import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
export default function viewPDF({ auth, barang, inventaris, pengiriman }) {
    const generatePDF = () => {
        const report = document.querySelector("#report");

        html2canvas(report).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const doc = new JsPDF("l", "mm", "a4");
            const componentWidth = doc.internal.pageSize.width;
            const componentHeight = doc.internal.pageSize.height;
            doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
            doc.save("Pelaporan Inventaris Gudang.pdf");
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Informasi
                </h2>
            }
        >
            <Head title="Customer" />

            <div className="container my-5">
                <button
                    onClick={generatePDF}
                    type="button"
                    className="btn btn-info my-3"
                >
                    Export PDF
                </button>
                <div id="report" className="row justify-content-center pb-5">
                    <h3 className="text-center my-2">Data Barang</h3>

                    <table className="table table-striped table-sm mt-5 text-center">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Barang</th>
                                <th scope="col">Jumlah</th>
                                <th scope="col">Stok minimum</th>
                            </tr>
                        </thead>
                        <tbody>
                            {barang.map((b, index) => (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{b.nama_barang}</td>
                                    <td>{b.jumlah_barang}</td>
                                    <td>{b.stok_minimum}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 className="text-center my-3">Data Inventaris</h3>

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
                    <h3 className="text-center my-3">Data Pengiriman</h3>

                    <table className="table table-striped table-sm mt-3 text-center">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Barang</th>
                                <th scope="col">Jumlah Dikirim</th>
                                <th scope="col">No Pesanan</th>
                                <th scope="col">Tgl Pengiriman</th>
                                <th scope="col">Status</th>
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
                                        {p.status_pengiriman == "Selesai" ? (
                                            <span className="badge text-bg-success">
                                                Selesai
                                            </span>
                                        ) : (
                                            <span className="badge text-bg-warning">
                                                {p.status_pengiriman}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

if (document.getElementById("loadpdf")) {
    var data = document.getElementById("loadpdf").getAttribute("data");
    ReactDOM.render(
        <viewPDF data={data} />,
        document.getElementById("loadpdf")
    );
}
