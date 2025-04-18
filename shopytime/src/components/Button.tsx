export function Button({
    className,
    variant,
    children,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline"
}) {
    const getVariantClasses = () => {
        switch (variant) {
            case "primary":
                return "bg-primary-color-hover hover:bg-primary-color text-black"
            case "secondary":
                return "bg-secondary-color hover:bg-secondary-color-hover text-black"
            case "outline":
                return "bg-white hover:bg-gray-100 text-black border-2 border-black"
            default:
                return "bg-secondary-color hover:bg-secondary-color-hover text-black"
        }
    }

    return (
        <div className="relative inline-block">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <button
                className={`relative px-4 py-3 font-bold border-2 cursor-pointer border-default-secondary transition-transform active:translate-x-0.5 active:translate-y-0.5 ${getVariantClasses()} ${className || ''}`}
                {...props}
            >
                {children}
            </button>
        </div>
    )
}