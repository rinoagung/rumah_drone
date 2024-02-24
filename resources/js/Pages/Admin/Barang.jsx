import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Barang({ auth, barang, errors, success, cek_minimum }) {
    const { data, setData, post, processing } = useForm({
        nama_barang: "",
        jumlah_barang: "",
        stok_minimum: "",
    });

    const deleteBarang = (e, id) => {
        // return alert(data.id);
        router.delete(`/barang/${id}`);
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(`/barang`, data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Barang
                </h2>
            }
        >
            <Head title="Barang" />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-5">
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
                        {success && (
                            <div
                                className="alert alert-success alert-dismissible fade show col-12"
                                role="alert"
                            >
                                {success}
                            </div>
                        )}
                        {auth.user.role == "admin" && (
                            <form onSubmit={submit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="nama_barang"
                                        className="form-label"
                                    >
                                        Nama Barang
                                    </label>
                                    <TextInput
                                        id="nama_barang"
                                        type="text"
                                        name="nama_barang"
                                        value={data.nama_barang}
                                        className="form-control rounded-top"
                                        onChange={(e) =>
                                            setData(
                                                "nama_barang",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.nama_barang}
                                        className="mt-2"
                                    />{" "}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="jumlah_barang"
                                        className="form-label"
                                    >
                                        Jumlah Barang
                                    </label>
                                    <TextInput
                                        id="jumlah_barang"
                                        type="number"
                                        name="jumlah_barang"
                                        value={data.jumlah_barang}
                                        className="form-control rounded-top"
                                        onChange={(e) =>
                                            setData(
                                                "jumlah_barang",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.jumlah_barang}
                                        className="mt-2"
                                    />{" "}
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="stok_minimum"
                                        className="form-label"
                                    >
                                        Stok Minimum
                                    </label>
                                    <TextInput
                                        id="stok_minimum"
                                        type="number"
                                        name="stok_minimum"
                                        value={data.stok_minimum}
                                        className="form-control rounded-top"
                                        onChange={(e) =>
                                            setData(
                                                "stok_minimum",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    <InputError
                                        message={errors.stok_minimum}
                                        className="mt-2"
                                    />{" "}
                                </div>

                                <PrimaryButton
                                    disabled={processing}
                                    className="mb-3"
                                >
                                    Tambah Barang
                                </PrimaryButton>
                            </form>
                        )}
                    </div>

                    <table className="table table-striped table-sm mt-5">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Nama Barang</th>
                                <th scope="col">Jumlah</th>
                                <th scope="col">Stok minimum</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {barang.map((b, index) => (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{b.nama_barang}</td>
                                    <td>{b.jumlah_barang}</td>
                                    <td>{b.stok_minimum}</td>
                                    {auth.user.role == "admin" ? (
                                        <td>
                                            <a
                                                href={`/barang/${b.id}/edit`}
                                                className="badge bg-transparent shadow-sm"
                                            >
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    fill="deeppink"
                                                    className="bi bi-pencil-fill"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                                </svg>
                                            </a>
                                            <button
                                                className="badge bg-transparent border-0 shadow-sm d-inline"
                                                onClick={(e) => {
                                                    if (
                                                        window.confirm(
                                                            "Anda yakin ingin menghapus data ini?"
                                                        )
                                                    ) {
                                                        deleteBarang(e, b.id);
                                                    }
                                                }}
                                            >
                                                <svg
                                                    width="16"
                                                    height="16"
                                                    fill="red"
                                                    className="bi bi-trash"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </button>
                                        </td>
                                    ) : (
                                        <td>
                                            <a
                                                href={`/pengiriman/form/${b.id}`}
                                                className="badge bg-transparent shadow-sm"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    fill="#FC6736"
                                                    class="bi bi-truck"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                                                </svg>
                                            </a>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
