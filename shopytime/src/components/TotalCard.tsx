import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

export function TotalCard({
    name,
    total,
    spent = 0,
}: React.HTMLAttributes<HTMLDivElement> & {
    name: string
    total: number
    spent?: number
}) {
    const balance = spent - total;
    const isPositive = balance > 0;

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black " />
            <div className="relative p-5 bg-default-third border-2 border-black ">
                <h3 className="text-xl font-bold mb-2 capitalize">{name}</h3>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between bg-primary-color-hover px-2">
                        <span className="font-medium">Speso:</span>
                        <div className="w-24 px-2 py-1 font-bold">
                            €{spent.toFixed(2)}
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-b-2 border-default-secondary gap-2">
                        <span className="font-medium capitalize">
                            {isPositive ? "deve ricevere" : "deve uscire"}
                        </span>
                        <div className={`flex gap-2 justify-center ${isPositive ? ' items-start' : 'items-end'}`}>
                            <span className={`text-2xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>€{Math.abs(balance).toFixed(2)}</span>
                            {isPositive ? <div className="text-green-400 font-bold text-xl"><FiArrowUpRight /></div> : <div className="text-red-400 font-bold text-xl"><FiArrowDownRight /></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}