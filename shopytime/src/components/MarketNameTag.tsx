export function MarketNameTag({ name }: { name: string }) {
    return (
        <div className="relative inline-block">
            <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-black" />
            <div
                className=
                "relative px-3 py-1 border-2 bg-market-name font-bold border-black flex justify-center items-center gap-3 uppercase"
            >
                {name}
            </div>
        </div>
    )
}