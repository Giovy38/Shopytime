import { BillInput } from "./BillInput";
import { Button } from "./Button";
import { useState } from "react";
import { NameTag } from "./NameTag";

interface SingleBillCardProps {
    name: string;
    total: number;
    onTotalChange: (value: number) => void;
    sharedAmount: number;
}

export function SingleBillCard({
    name,
    total,
    onTotalChange,
    sharedAmount,
}: SingleBillCardProps) {
    const [isPaid, setIsPaid] = useState(false);

    return (
        <div className="relative w-64">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black" />
            <div className={`relative p-5 border-2 min-h-80 border-black ${isPaid ? 'bg-default-third-disabled' : 'bg-default-third'}`}>
                <div className="pb-3">
                    <NameTag>{name}</NameTag>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="font-medium text-center">Spesa individuale:</label>
                        <BillInput
                            value={total - sharedAmount}
                            onChange={(value) => onTotalChange(value + sharedAmount)}
                            min={0}
                            max={9999999999}
                            disabled={isPaid}
                        />
                    </div>
                    <div className="flex flex-col items-center justify-between px-2">
                        <span className="font-medium">{!isPaid ? 'Totale da pagare:' : 'Pagato:'}</span>
                        <div className={`px-2 py-1 font-bold text-3xl ${isPaid ? 'line-through text-gray-500 text-4xl' : ''}`}>
                            €{total.toFixed(2)}
                        </div>
                    </div>

                    {!isPaid && <div className="flex justify-center">
                        <Button onClick={() => setIsPaid(true)}>Pagato</Button>
                    </div>}

                </div>
            </div>
        </div>
    );
}
