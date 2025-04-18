import React, { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";

interface NewMarketFormProps {
    onConfirm: (marketName: string, buyerName: string) => void;
    onCancel: () => void;
    participants: string[];
}

export function NewMarketForm({ onConfirm, onCancel, participants }: NewMarketFormProps) {
    const [marketName, setMarketName] = useState("");
    const [selectedBuyer, setSelectedBuyer] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (marketName.trim() && selectedBuyer) {
            onConfirm(marketName.trim(), selectedBuyer);
            setMarketName("");
            setSelectedBuyer("");
        }
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative p-4 bg-default-third border-2 border-default-secondary">
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
                    <Input
                        placeholder="Inserisci il nome del negozio"
                        value={marketName}
                        onChange={(e) => setMarketName(e.target.value)}
                    />
                    <select
                        value={selectedBuyer}
                        onChange={(e) => setSelectedBuyer(e.target.value)}
                        className="relative w-full md:w-1/2 px-4 py-3 bg-default-primary border-2 border-default-secondary font-medium focus:outline-none focus:ring-2 focus:ring-secondary-color focus:border-default-secondary text-center"
                        required
                    >
                        <option value="">Seleziona a chi addebitare il conto</option>
                        {participants.map((participant) => (
                            <option key={participant} value={participant}>
                                {participant}
                            </option>
                        ))}
                    </select>
                    <div className="flex gap-2">
                        <Button type="button" onClick={onCancel}>
                            Annulla
                        </Button>
                        <Button type="submit" variant="primary" disabled={!marketName.trim() || !selectedBuyer}>
                            Conferma
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
} 