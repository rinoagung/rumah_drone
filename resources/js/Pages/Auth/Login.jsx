import { useEffect } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Login({ errors, canResetPassword }) {
    const { data, setData, post, processing, reset } = useForm({
        username: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="container">
                <div className="row justify-content-center align-items-center vh-100">
                    <div className="col-lg-5">
                        <main>
                            {(errors.password || errors.username) && (
                                <div
                                    className="d-flex align-items-center alert alert-dark alert-dismissible fade show p-2 text-white"
                                    role="alert"
                                    style={{
                                        backgroundColor: "#FF004D",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
                                    </svg>
                                    &ensp;ID atau password salah
                                </div>
                            )}

                            <form onSubmit={submit}>
                                <h1 className="h3 mb-3 fw-normal text-center">
                                    Login
                                </h1>
                                <div className="form-floating">
                                    <TextInput
                                        id="username"
                                        type="text"
                                        name="username"
                                        value={data.username}
                                        className="form-control rounded-top"
                                        onChange={(e) =>
                                            setData("username", e.target.value)
                                        }
                                        required
                                    />

                                    <label htmlFor="username">
                                        Username Pegawai
                                    </label>
                                </div>
                                <div className="form-floating">
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="form-control rounded-top"
                                        autoComplete="new-password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                                <PrimaryButton disabled={processing}>
                                    Log in
                                </PrimaryButton>
                                <div id="emailHelp" className="form-text">
                                    Sistem ini otomatis mengarahkan sesuai role
                                    di setiap akun karyawan yang terdaftar.
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
