import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { PiMoneyFill } from "react-icons/pi";

import { Button } from "./Button";
import { useState } from "react";
import { MarketNameTag } from "./MarketNameTag";
import { NameTag } from "./NameTag";

export function TotalCard({
    name,
    total,
    spent = 0,
}: React.HTMLAttributes<HTMLDivElement> & {
    name: string
    total: number
    spent?: number
}) {
    const balance = spent - total;
    const isPositive = balance > 0;

    const [isPaidWithCard, setIsPaidWithCard] = useState(false)
    const [isPaidWithMoney, setIsPaidWithMoney] = useState(false)
    const [isPaid, setIsPaid] = useState(false);
    const [showError, setShowError] = useState(false);

    const onPayWithCard = () => {
        if (isPaid) {
            return
        }
        setIsPaidWithCard(!isPaidWithCard);
        setIsPaidWithMoney(false);
        setShowError(false)
    }

    const onPayWithMoney = () => {
        if (isPaid) {
            return
        }
        setIsPaidWithMoney(!isPaidWithMoney)
        setIsPaidWithCard(false);
        setShowError(false)
    }

    const onPay = () => {
        if (isPaidWithCard == false && isPaidWithMoney == false) {
            setShowError(true)
            return
        }
        if (isPaid) {
            return
        }
        setIsPaid(true)
    }

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black " />
            <div className={`${isPaid ? 'bg-default-third-disabled' : 'bg-default-third'} relative p-5 border-2 border-black min-h-82 md:min-h-70`}>
                <div className="pb-3">
                    <NameTag>{name}</NameTag>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between bg-primary-color px-2">
                        <span className="font-medium">Speso:</span>
                        <div className="w-24 px-2 py-1 font-bold">
                            €{spent.toFixed(2)}
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-b-2 border-default-secondary gap-2">
                        <span className="font-medium capitalize">
                            {isPositive ? "deve ricevere" : "deve uscire"}
                        </span>
                        <div className={`flex gap-2 justify-center ${isPositive ? ' items-start' : 'items-end'}`}>
                            <span className={`text-2xl font-bold ${isPaid ? 'line-through text-gray-500' : isPositive ? 'text-green-400' : 'text-red-400'} `}>€{Math.abs(balance).toFixed(2)}</span>
                            {isPositive ? <div className="text-green-400 font-bold text-xl"><FiArrowUpRight /></div> : <div className="text-red-400 font-bold text-xl"><FiArrowDownRight /></div>}
                        </div>
                    </div>
                    <p className="italic">Seleziona il metodo di pagamento:</p>
                    <div className="flex justify-between">
                        <div className="text-2xl flex flex-col items-center justify-center gap-1">
                            <div onClick={onPayWithCard} className={`flex justify-center items-center gap-3 cursor-pointer ${isPaidWithCard ? 'opacity-100' : 'opacity-50'}`}>
                                <BsCreditCard />
                                <div className={`h-3 w-3 border-2 border-default-secondary rounded-full ${isPaidWithCard ? 'bg-default-secondary' : 'bg-default-primary'}`}></div>
                            </div>
                            <div onClick={onPayWithMoney} className={`flex justify-center items-center gap-3 cursor-pointer ${isPaidWithMoney ? 'opacity-100' : 'opacity-50'}`}>
                                <PiMoneyFill />
                                <div className={`h-3 w-3 border-2 border-default-secondary rounded-full  ${isPaidWithMoney ? 'bg-default-secondary' : 'bg-default-primary'}`}></div>
                            </div>
                        </div>
                        {!isPaid && (<Button onClick={onPay}>Paga</Button>)}
                    </div>
                    {showError && (
                        <div className="flex justify-start items-center text-red-500">
                            <p className="font-bold">Seleziona prima un metodo di pagamento</p>
                        </div>
                    )}
                    {isPaid && (
                        <MarketNameTag name={`pagato ${isPaidWithCard ? 'con carta' : 'in contanti'}`} />
                    )}
                </div>
            </div>
        </div>
    )
}