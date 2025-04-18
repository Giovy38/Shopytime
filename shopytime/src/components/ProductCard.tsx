import { RiCloseLargeLine } from "react-icons/ri";
import { useState } from "react";

export function ProductCard({
    productName,
    price,
    initialQuantity = 0,
    onRemove,
    onQuantityChange,
}: React.HTMLAttributes<HTMLDivElement> & {
    productName: string
    price: number
    initialQuantity?: number
    onRemove?: () => void
    onQuantityChange?: (quantity: number) => void
}) {
    const [quantity, setQuantity] = useState(initialQuantity);
    const [showDropdown, setShowDropdown] = useState(false);

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

    return (
        <div className="relative w-full md:w-auto">
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
                        <div className="relative">
                            <div
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="bg-default-secondary text-default-primary px-2 border-default-secondary border-2 font-bold flex justify-end cursor-pointer"
                            >
                                x{quantity}
                            </div>
                            {showDropdown && (
                                <div className="absolute right-0 mt-1 bg-default-third border-2 border-default-secondary">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <div
                                            key={num}
                                            onClick={() => handleQuantitySelect(num)}
                                            className="px-4 py-1 hover:bg-default-secondary cursor-pointer hover:text-default-primary"
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
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
                        <div className="relative">
                            <div
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="bg-default-secondary text-default-primary px-2 border-default-secondary border-2 font-bold flex justify-end cursor-pointer"
                            >
                                x{quantity}
                            </div>
                            {showDropdown && (
                                <div className="absolute right-0 mt-1 bg-default-third border-2 border-default-secondary">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <div
                                            key={num}
                                            onClick={() => handleQuantitySelect(num)}
                                            className="px-4 py-1 hover:bg-default-secondary cursor-pointer hover:text-default-primary"
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {onRemove && (
                        <div onClick={onRemove} className="cursor-pointer">
                            <RiCloseLargeLine />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}