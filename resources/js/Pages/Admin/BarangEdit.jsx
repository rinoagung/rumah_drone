import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Barang({ auth, barang, errors, success }) {
    const { data, setData, post, processing } = useForm({
        nama_barang: barang.nama_barang,
        jumlah_barang: barang.jumlah_barang,
        old_jumlah_barang: barang.jumlah_barang,
        stok_minimum: barang.stok_minimum,
        _method: "put",
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(`/barang/${barang.id}`, data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Barang
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
                                    Edit Barang
                                </PrimaryButton>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
