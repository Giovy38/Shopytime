import { useState } from "react";
import { Button } from "../Button";
import { MarketNameTag } from "../MarketNameTag";
import { RiCloseLargeLine } from "react-icons/ri";
import { ProductCard } from "../ProductCard";
import { NewProductForm } from "../NewProductForm";
import { BuyerNameTag } from "../BuyerNameTag";

interface Product {
    name: string;
    price: number;
    quantity: number;
}

interface MarketSectionProps {
    marketName: string;
    buyerName: string;
    participants: string[];
    products: Product[];
    onRemove?: () => void;
    onBuyerChange?: (newBuyer: string) => void;
    onAddProduct?: (product: Product) => void;
    onRemoveProduct?: (productIndex: number) => void;
    onQuantityChange?: (productIndex: number, newQuantity: number) => void;
}

export function MarketSection({
    marketName,
    buyerName,
    participants,
    products,
    onRemove,
    onBuyerChange,
    onAddProduct,
    onRemoveProduct,
    onQuantityChange
}: MarketSectionProps) {
    const [showForm, setShowForm] = useState(false);
    const [showBuyerSelect, setShowBuyerSelect] = useState(false);

    const handleAddProduct = (product: Product) => {
        onAddProduct?.(product);
        setShowForm(false);
    };

    const handleBuyerChange = (newBuyer: string) => {
        onBuyerChange?.(newBuyer);
        setShowBuyerSelect(false);
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative p-2 bg-default-third border-2 border-default-secondary">
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <MarketNameTag name={marketName} />
                        {showBuyerSelect ? (
                            <select
                                value={buyerName}
                                onChange={(e) => handleBuyerChange(e.target.value)}
                                className="relative px-4 py-1 bg-default-primary border-2 border-default-secondary font-medium focus:outline-none focus:ring-2 focus:ring-secondary-color focus:border-default-secondary text-center"
                            >
                                {participants.map((participant) => (
                                    <option key={participant} value={participant}>
                                        {participant}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <BuyerNameTag onEdit={() => setShowBuyerSelect(true)}>
                                {buyerName}
                            </BuyerNameTag>
                        )}
                    </div>
                    <div onClick={onRemove} className="cursor-pointer">
                        <RiCloseLargeLine />
                    </div>
                </div>
                <div className='flex justify-center mt-4'>
                    <Button variant="primary" onClick={() => setShowForm(true)}>Aggiungi prodotto</Button>
                </div>
                {showForm && (
                    <NewProductForm
                        onSubmit={handleAddProduct}
                        onCancel={() => setShowForm(false)}
                    />
                )}
                <div className='flex flex-wrap justify-center items-center p-3 gap-2 bg-default-third mt-4'>
                    {products.length === 0 ? (
                        <div className="text-center text-lg italic">Ancora nessun prodotto</div>
                    ) : (
                        products.map((product, index) => (
                            <ProductCard
                                key={index}
                                productName={product.name}
                                price={product.price}
                                initialQuantity={product.quantity}
                                onRemove={() => onRemoveProduct?.(index)}
                                onQuantityChange={(newQuantity) => onQuantityChange?.(index, newQuantity)}
                            />
                        ))
                    )}
                </div>
                <div className="flex flex-col justify-center px-2 pt-10">
                    <div className="flex justify-between">
                        <p className="uppercase font-bold">tot</p>
                        <p className="uppercase font-bold">€{products.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}</p>
                    </div>
                    <div className="h-1 w-full bg-default-secondary"></div>
                </div>
            </div>
        </div>
    );
}