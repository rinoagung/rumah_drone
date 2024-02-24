export default function Authenticated({ user, header, children }) {
    const elements = document.querySelectorAll("[data-page]");
    elements.forEach((element) => {
        element.setAttribute("data-page", "");
    });

    const isiLink = window.location.pathname.split("/");

    return (
        <div>
            {header && (
                <header className="bg-white shadow d-flex justify-content-between">
                    <div className="p-4">{header}</div>
                    {isiLink[1] != "dashboard" && (
                        <div>
                            <a
                                href={
                                    isiLink[2] == undefined
                                        ? "/dashboard"
                                        : isiLink[2] == "form"
                                        ? "/barang"
                                        : `/${isiLink[1]}`
                                }
                                // href="javascript:history.back()"
                                style={{ width: "fit-content" }}
                                className="btn btn-primary m-4 text-decoration-none"
                            >
                                Kembali
                            </a>
                        </div>
                    )}
                    {/* <button
                        className="btn btn-primary m-4"
                        style={{ width: "fit-content" }}
                    >
                        Kembali
                    </button> */}
                </header>
            )}

            <main className="pt-4">{children}</main>
        </div>
    );
}
