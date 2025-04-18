import { RiEdit2Fill } from "react-icons/ri";

export function BuyerNameTag({
    children,
    onEdit,
}: React.HTMLAttributes<HTMLDivElement> & {
    onEdit?: () => void;
}) {
    return (
        <div className="relative inline-block">
            <div className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-black" />
            <div
                className=
                "relative px-3 py-1 font-medium border-2 bg-primary-color-hover border-black flex justify-center items-center gap-3 capitalize"
            >
                <div className="w-2 h-2 bg-default-secondary rounded-full"></div>
                {children}
                <div className="cursor-pointer text-sm" onClick={onEdit}>
                    <RiEdit2Fill />
                </div>
            </div>
        </div>
    )
}
