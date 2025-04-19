import { useState } from 'react';
import { BillInput } from '../BillInput';
import { SingleBillCard } from '../SingleBillCard';

interface SeparateBillSectionProps {
    participants: string[];
}

export function SeparateBillSection({ participants }: SeparateBillSectionProps) {
    const [totalBill, setTotalBill] = useState<number>(0);
    const [individualExpenses, setIndividualExpenses] = useState<Record<string, number>>(
        participants.reduce((acc, participant) => ({ ...acc, [participant]: 0 }), {})
    );

    const handleIndividualExpenseChange = (participant: string, value: number) => {
        setIndividualExpenses(prev => ({
            ...prev,
            [participant]: value
        }));
    };

    const calculateIndividualShares = () => {
        const totalParticipants = participants.length;
        const baseShare = totalBill / totalParticipants;

        return participants.map(participant => {
            const individualExpense = individualExpenses[participant] || 0;
            const totalToPay = baseShare + individualExpense;
            return { participant, amount: totalToPay, sharedAmount: baseShare };
        });
    };

    const individualShares = calculateIndividualShares();

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative flex flex-col gap-4 p-4 border-2 border-default-secondary bg-primary-color">
                <h2 className="text-xl font-bold">Conto Separato</h2>

                <div className="flex flex-col gap-2">
                    <label className="font-medium text-center">Conto da dividere:</label>
                    <BillInput
                        value={totalBill}
                        onChange={setTotalBill}
                        min={0}
                        max={1000}
                    />
                </div>

                <div className='border-b-2 border-default-secondary flex justify-between items-end'>
                    <p className='font-bold uppercase pt-3'>totale conto</p>
                    <p className='font-bold uppercase pt-3 text-xl'>
                        {(totalBill + Object.values(individualExpenses).reduce((sum, expense) => sum + expense, 0)).toFixed(2)} €
                    </p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4">
                    {individualShares.map(({ participant, amount, sharedAmount }) => (
                        <SingleBillCard
                            key={participant}
                            name={participant}
                            total={amount}
                            sharedAmount={sharedAmount}
                            onTotalChange={(value) => handleIndividualExpenseChange(participant, value - sharedAmount)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 