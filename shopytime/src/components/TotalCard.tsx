import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";


export function TotalCard({
    name,
    total,
}: React.HTMLAttributes<HTMLDivElement> & {
    name: string
    total: number
}) {
    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black " />
            <div className="relative p-5 bg-secondary-color border-2 border-black ">
                <h3 className="text-xl font-bold mb-2 capitalize">{name}</h3>
                <div className="flex items-center justify-between gap-2">
                    <span className="font-medium capitalize">{total > 0 ? "rientro euro" : "uscita euro"}</span>
                    <span className="text-2xl font-bold">€{total.toFixed(2)}</span>
                    {total > 0 ? <FiArrowUpRight /> : <FiArrowDownRight />}
                </div>
            </div>
        </div>
    )
}