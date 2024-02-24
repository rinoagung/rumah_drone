import { Link } from "@inertiajs/react";

export default function DangerLink({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                `w-100 btn btn-lg btn-danger mt-5 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Link>
    );
}
