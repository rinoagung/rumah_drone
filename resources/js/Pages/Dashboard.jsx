import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import DangerLink from "@/Components/DangerLink";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div className="container d-flex justify-content-center">
                {auth.user.role === "admin" ? (
                    <>
                        <div
                            className="card mx-2 text-bg-info mb-3"
                            style={{ width: "14rem" }}
                        >
                            <a
                                href="/barang"
                                className="text-decoration-none text-dark"
                            >
                                <div className="card-header">Header</div>
                                <div className="card-body">
                                    <h5 className="card-title">Inventaris</h5>
                                </div>
                            </a>
                        </div>

                        <div
                            className="card mx-2 mb-3"
                            style={{
                                width: "14rem",
                                backgroundColor: "limegreen",
                            }}
                        >
                            <a
                                href="/inventaris"
                                className="text-decoration-none text-dark"
                            >
                                <div className="card-header">Header</div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Manajemen Stok
                                    </h5>
                                </div>
                            </a>
                        </div>

                        <div
                            className="card mx-2 mb-3"
                            style={{
                                width: "14rem",
                                backgroundColor: "#FBA834",
                            }}
                        >
                            <a
                                href="/viewpdf"
                                className="text-decoration-none text-dark"
                            >
                                <div className="card-header">Header</div>
                                <div className="card-body">
                                    <h5 className="card-title">Export PDF</h5>
                                </div>
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="card mx-2 mb-3"
                            style={{
                                width: "14rem",
                                backgroundColor: "#EBF400",
                            }}
                        >
                            <a
                                href="/barang"
                                className="text-decoration-none text-dark"
                            >
                                <div className="card-header">Header</div>
                                <div className="card-body">
                                    <h5 className="card-title">Kirim Barang</h5>
                                </div>
                            </a>
                        </div>

                        <div
                            className="card mx-2 mb-3"
                            style={{
                                width: "14rem",
                                backgroundColor: "#836FFF",
                            }}
                        >
                            <a
                                href="/inventaris"
                                className="text-decoration-none text-dark"
                            >
                                <div className="card-header">Header</div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Manajemen Stok
                                    </h5>
                                </div>
                            </a>
                        </div>
                        <div
                            className="card mx-2 mb-3"
                            style={{
                                width: "14rem",
                                backgroundColor: "#C7C8CC",
                            }}
                        >
                            <a
                                href="/inventaris"
                                className="text-decoration-none text-dark"
                            >
                                <div className="card-header">Header</div>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Status Pengiriman
                                    </h5>
                                </div>
                            </a>
                        </div>
                    </>
                )}
            </div>
            <div className="container">
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <strong>Username Pegawai: </strong>
                                {auth.user.username}
                            </div>
                            <div>
                                <strong>Role: </strong>
                                {auth.user.role}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-3 space-y-1">
                    <DangerLink
                        method="post"
                        href="/logout"
                        style={{ maxWidth: "7rem" }}
                        className="p-1"
                        as="button"
                    >
                        Log Out
                    </DangerLink>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
