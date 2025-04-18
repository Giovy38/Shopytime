import { TotalCard } from "../TotalCard";

interface Market {
    name: string;
    amount: number;
    participant: string;
}

interface CountSectionProps {
    markets: Market[];
    participants: string[];
}

export function CountSection({ markets, participants }: CountSectionProps) {
    // Calcola il totale di tutti i market
    const totalAmount = markets.reduce((sum, market) => sum + market.amount, 0);

    // Calcola la quota per partecipante
    const quota = totalAmount / participants.length;

    // Calcola quanto ogni partecipante ha speso
    const participantSpent = markets.reduce((acc, market) => {
        if (!acc[market.participant]) {
            acc[market.participant] = 0;
        }
        acc[market.participant] += market.amount;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="space-y-6">
            <div className="relative">
                <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
                <div className="relative flex flex-col gap-3 p-5 bg-primary-color border-2 border-default-secondary">
                    <h2 className="text-2xl font-bold mb-2">Calcolo Quote</h2>
                    <div className="flex items-center justify-between border-b-2 border-default-secondary">
                        <span className="font-medium">Quota per partecipante:</span>
                        <span className="text-2xl font-bold">€{quota.toFixed(2)}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {participants.map(participant => (
                            <TotalCard
                                key={participant}
                                name={participant}
                                total={quota}
                                spent={participantSpent[participant] || 0}
                            />
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
}
