import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface NewProductFormProps {
    onSubmit: (product: { name: string; price: number; quantity: number }) => void;
    onCancel: () => void;
}

export function NewProductForm({ onSubmit, onCancel }: NewProductFormProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState("");

    const isFormValid = () => {
        return name.trim() !== "" && price !== "" && parseFloat(price) >= 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const priceValue = parseFloat(price);
        const quantityValue = quantity === "" ? 1 : parseInt(quantity);

        if (priceValue < 0 || quantityValue < 0) {
            setError("I valori non possono essere negativi");
            return;
        }

        setError("");
        onSubmit({
            name: name.trim(),
            price: priceValue,
            quantity: quantityValue
        });
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || parseFloat(value) >= 0) {
            setPrice(value);
            setError("");
        }
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === "" || parseInt(value) >= 0) {
            setQuantity(value);
            setError("");
        }
    };

    return (
        <div className="p-5">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 p-4 bg-default-third border-2 border-default-secondary">
                <p className="font-bold capitalize italic">nome prodotto</p>
                <Input
                    placeholder="Nome Prodotto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <p className="font-bold capitalize italic">prezzo unitario</p>
                <Input
                    placeholder="Prezzo Unitario"
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={handlePriceChange}
                    required
                />
                <p className="font-bold capitalize italic">quantità</p>
                <Input
                    placeholder="Quantità"
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex gap-2 ">
                    <div className="w-1/2">
                        <Button variant="secondary" onClick={onCancel}>
                            Annulla
                        </Button>
                    </div>
                    <div className="w-1/2">
                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Aggiungi
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
} 