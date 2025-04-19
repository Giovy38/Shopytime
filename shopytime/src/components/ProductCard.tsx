import { RiCloseLargeLine } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";

export function ProductCard({
    productName,
    price,
    initialQuantity = 0,
    onRemove,
    onQuantityChange,
}: React.HTMLAttributes<HTMLDivElement> & {
    productName: string;
    price: number;
    initialQuantity?: number;
    onRemove?: () => void;
    onQuantityChange?: (quantity: number) => void;
}) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleQuantityChange = (delta: number) => {
        const newQuantity = Math.max(1, quantity + delta);
        setQuantity(newQuantity);
        onQuantityChange?.(newQuantity);
    };

    const handleQuantitySelect = (newQuantity: number) => {
        setQuantity(newQuantity);
        setShowDropdown(false);
        onQuantityChange?.(newQuantity);
    };

    const totalPrice = price * quantity;

    const QuantityDropdown = () => (
        <div
            className={`absolute right-0 mt-1 bg-default-third border-2 border-default-secondary z-50 max-h-[5.5rem] overflow-y-auto origin-top-right transform transition-transform duration-200 ${showDropdown ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                }`}
            style={{
                minWidth: "4rem",
                scrollbarWidth: "thin",
                scrollbarColor: "black transparent",
            }}
        >
            <style>
                {`
                    div::-webkit-scrollbar {
                        width: 4px;
                    }
                    div::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    div::-webkit-scrollbar-thumb {
                        background-color: black;
                        border-radius: 2px;
                    }
                `}
            </style>
            {[...Array(100)].map((_, index) => {
                const num = index + 1;
                return (
                    <div
                        key={num}
                        onClick={() => handleQuantitySelect(num)}
                        className="px-4 py-1 hover:bg-default-secondary cursor-pointer hover:text-default-primary"
                    >
                        {num}
                    </div>
                );
            })}
        </div>
    );

    const QuantityControl = () => (
        <div className="relative z-50" ref={wrapperRef}>
            <div
                onClick={() => setShowDropdown((prev) => !prev)}
                className="bg-default-secondary text-default-primary px-2 border-default-secondary border-2 font-bold flex justify-end cursor-pointer"
            >
                x{quantity}
            </div>
            <QuantityDropdown />
        </div>
    );

    return (
        <div className="relative w-full md:w-auto z-0">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative p-2 bg-default-third border-2 border-default-secondary">
                {/* Mobile Layout */}
                <div className="flex flex-col gap-2 md:hidden">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold capitalize truncate max-w-[90%]">{productName}</h3>
                        {onRemove && (
                            <div onClick={onRemove} className="cursor-pointer">
                                <RiCloseLargeLine />
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <QuantityControl />
                        <div className="flex gap-7 items-center font-bold">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="cursor-pointer hover:text-default-secondary"
                            >
                                -
                            </button>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="cursor-pointer hover:text-default-secondary"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <p className="text-xl font-bold text-right">€{totalPrice.toFixed(2)}</p>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:flex justify-between gap-5 mb-2 max-w-[90vw]">
                    <div className="flex flex-col gap-2 min-w-0 flex-1">
                        <h3 className="text-lg font-bold capitalize truncate">{productName}</h3>
                        <div className="flex gap-7 justify-end px-1 items-center font-bold">
                            <button
                                onClick={() => handleQuantityChange(-1)}
                                className="cursor-pointer hover:text-default-secondary"
                            >
                                -
                            </button>
                            <button
                                onClick={() => handleQuantityChange(1)}
                                className="cursor-pointer hover:text-default-secondary"
                            >
                                +
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 shrink-0">
                        <p className="text-xl font-bold">€{totalPrice.toFixed(2)}</p>
                        <QuantityControl />
                    </div>
                    {onRemove && (
                        <div onClick={onRemove} className="cursor-pointer">
                            <RiCloseLargeLine />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
