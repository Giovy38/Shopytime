import { useState } from "react";
import { Button } from "../Button";
import { MarketNameTag } from "../MarketNameTag";
import { RiCloseLargeLine } from "react-icons/ri";
import { ProductCard } from "../ProductCard";
import { NewProductForm } from "../NewProductForm";

interface Product {
    name: string;
    price: number;
    quantity: number;
}

interface MarketSectionProps {
    marketName: string;
    onRemove?: () => void;
}

export function MarketSection({ marketName, onRemove }: MarketSectionProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [showForm, setShowForm] = useState(false);

    const handleAddProduct = (product: Product) => {
        setProducts([...products, product]);
        setShowForm(false);
    };

    const handleQuantityChange = (index: number, newQuantity: number) => {
        setProducts(products.map((product, i) =>
            i === index ? { ...product, quantity: newQuantity } : product
        ));
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative p-2 bg-default-third border-2 border-default-secondary">
                <div className="flex justify-between">
                    <MarketNameTag name={marketName} />
                    <div onClick={onRemove} className="cursor-pointer">
                        <RiCloseLargeLine />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <Button variant="primary" onClick={() => setShowForm(true)}>Aggiungi prodotto</Button>
                </div>
                {showForm && (
                    <NewProductForm
                        onSubmit={handleAddProduct}
                        onCancel={() => setShowForm(false)}
                    />
                )}
                <div className='flex flex-wrap justify-center items-center p-3 gap-2 bg-default-third'>
                    {products.length === 0 ? (
                        <div className="text-center text-lg italic">Ancora nessun prodotto</div>
                    ) : (
                        products.map((product, index) => (
                            <ProductCard
                                key={index}
                                productName={product.name}
                                price={product.price}
                                initialQuantity={product.quantity}
                                onRemove={() => {
                                    setProducts(products.filter((_, i) => i !== index));
                                }}
                                onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
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