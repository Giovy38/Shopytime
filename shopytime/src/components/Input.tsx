

export function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    return (
        <div className="relative w-full md:w-1/2">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black" />
            <input
                type={type}
                className={
                    "relative w-full px-4 py-3 bg-default-primary border-2 border-default-secondary font-medium focus:outline-none focus:ring-2 focus:ring-secondary-color focus:border-default-secondary text-center"
                }
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    )
}