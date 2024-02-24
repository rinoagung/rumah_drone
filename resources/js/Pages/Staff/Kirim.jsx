import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Barang({ auth, barang, errors, success }) {
    const { data, setData, post, processing } = useForm({
        nama_barang: barang.nama_barang,
        jumlah_barang: barang.jumlah_barang,
        jumlah_dikirim: "",
        no_pesanan: "",
        tgl_pengiriman: "",
        status_pengiriman: "",
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(`/pengiriman`, data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pengiriman Barang
                </h2>
            }
        >
            <Head title="Barang" />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-5">
                        {success && (
                            <div
                                className="alert alert-success alert-dismissible fade show col-12"
                                role="alert"
                            >
                                {success}
                            </div>
                        )}
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
                                        setData("nama_barang", e.target.value)
                                    }
                                    disabled
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
                                    Jumlah Barang (Tidak boleh lebih dari{" "}
                                    {data.jumlah_barang})
                                </label>
                                <TextInput
                                    id="jumlah_barang"
                                    type="number"
                                    name="jumlah_barang"
                                    value={data.jumlah_dikirim}
                                    className="form-control rounded-top"
                                    onChange={(e) =>
                                        setData("jumlah_barang", e.target.value)
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
                                    htmlFor="no_pesanan"
                                    className="form-label"
                                >
                                    No Pesanan
                                </label>
                                <TextInput
                                    id="no_pesanan"
                                    type="number"
                                    name="no_pesanan"
                                    value={data.no_pesanan}
                                    className="form-control rounded-top"
                                    onChange={(e) =>
                                        setData("no_pesanan", e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.no_pesanan}
                                    className="mt-2"
                                />{" "}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="tgl_pengiriman"
                                    className="form-label"
                                >
                                    Tanggal Pengiriman
                                </label>
                                <TextInput
                                    id="tgl_pengiriman"
                                    type="number"
                                    name="tgl_pengiriman"
                                    value={data.tgl_pengiriman}
                                    className="form-control rounded-top"
                                    onChange={(e) =>
                                        setData(
                                            "tgl_pengiriman",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.tgl_pengiriman}
                                    className="mt-2"
                                />{" "}
                            </div>
                            <div className="mb-3">
                                <label
                                    htmlFor="status_pengiriman"
                                    className="form-label"
                                >
                                    Status Pengiriman
                                </label>
                                <select
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={data.status_pengiriman}
                                    onChange={(e) =>
                                        setData(
                                            "status_pengiriman",
                                            e.target.value
                                        )
                                    }
                                    required
                                >
                                    <option defaultValue={""}>Pilih</option>
                                    <option value="Pengemasan">
                                        Pengemasan
                                    </option>
                                    <option value="Dikirim">Dikirim</option>
                                    <option value="Selesai">Selesai</option>
                                </select>
                                <InputError
                                    message={errors.status_pengiriman}
                                    className="mt-2"
                                />{" "}
                            </div>

                            <PrimaryButton
                                disabled={processing}
                                className="mb-3"
                            >
                                Kirim Barang
                            </PrimaryButton>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
