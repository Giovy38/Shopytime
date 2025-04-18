import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface NewMarketFormProps {
    onConfirm: (marketName: string) => void;
    onCancel: () => void;
}

export function NewMarketForm({ onConfirm, onCancel }: NewMarketFormProps) {
    const [marketName, setMarketName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (marketName.trim()) {
            onConfirm(marketName.trim());
            setMarketName("");
        }
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative p-4 bg-default-third border-2 border-default-secondary">
                <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <Input
                        placeholder="Inserisci il nome del negozio"
                        value={marketName}
                        onChange={(e) => setMarketName(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <Button type="submit" variant="primary">
                            Conferma
                        </Button>
                        <Button type="button" onClick={onCancel}>
                            Annulla
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
} 