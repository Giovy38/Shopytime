export function ProductCard({
    productName,
    price,
    quantity,
}: React.HTMLAttributes<HTMLDivElement> & {
    productName: string
    price: number
    quantity: number
}) {
    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative p-2 bg-default-third border-2 border-default-secondary">
                <div className="flex gap-15 mb-2">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold capitalize">{productName}</h3>
                        <div className="flex gap-7 justify-end px-1 items-center font-bold cursor-pointer">
                            <p>-</p>
                            <p>+</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xl font-bold">€{price.toFixed(2)}</p>
                        <div className="bg-default-secondary text-default-primary px-2 border-default-secondary border-2 font-bold flex justify-end">x{quantity}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}