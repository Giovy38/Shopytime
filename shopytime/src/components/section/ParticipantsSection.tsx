import { Button } from "../Button";
import { Input } from "../Input";
import { Tag } from "../Tag";
import { useState, useEffect } from "react";

interface ParticipantSectionProps {
    onParticipantsChange: (participants: string[]) => void;
    assignedBuyers: string[];
}

export function ParticipantSection({ onParticipantsChange, assignedBuyers }: ParticipantSectionProps) {
    const [participants, setParticipants] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [warningMessage, setWarningMessage] = useState("");
    const [showInfo, setShowInfo] = useState(true);

    useEffect(() => {
        onParticipantsChange(participants);
        if (participants.length >= 2) {
            setShowInfo(false);
        } else {
            setShowInfo(true);
        }
    }, [participants, onParticipantsChange]);

    const onAddParticipant = () => {
        const trimmedValue = inputValue.trim();
        if (trimmedValue) {
            if (participants.some(p => p.toLowerCase() === trimmedValue.toLowerCase())) {
                const capitalizedName = trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
                setWarningMessage(`"${capitalizedName}" è già presente nella lista`);
                setShowWarning(true);
                setTimeout(() => setShowWarning(false), 3000);
                return;
            }
            setParticipants([...participants, trimmedValue]);
            setInputValue("");
        }
    }

    const handleRemoveParticipant = (index: number) => {
        const participantToRemove = participants[index];
        if (assignedBuyers.includes(participantToRemove)) {
            const capitalizedName = participantToRemove.charAt(0).toUpperCase() + participantToRemove.slice(1);
            setWarningMessage(`Non puoi cancellare ${capitalizedName} perché è assegnato ad un negozio`);
            setShowWarning(true);
            setTimeout(() => setShowWarning(false), 3000);
            return;
        }
        setParticipants(participants.filter((_, i) => i !== index));
    };

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative p-2 bg-default-third border-2 border-default-secondary">
                <div className='p-3 flex flex-col md:flex-row justify-center items-center gap-5'>
                    <Input
                        placeholder='Inserisci un nome'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button onClick={onAddParticipant}>Aggiungi nome</Button>
                </div>
                <div className='flex flex-wrap justify-center items-center p-3 gap-2 '>
                    {participants.length === 0 ? (
                        <div className="text-center text-lg italic ">Ancora nessun partecipante</div>
                    ) : (
                        participants.map((participant, index) => (
                            <Tag
                                key={index}
                                onRemove={() => handleRemoveParticipant(index)}
                            >
                                {participant}
                            </Tag>
                        ))
                    )}
                </div>
                {showWarning ? (
                    <div className="text-center h-15 md:h-8 text-red-500 font-bold">
                        {warningMessage}
                    </div>
                ) : showInfo ? (
                    <div className="text-center h-15 md:h-8 text-red-500 font-bold">
                        Aggiungi almeno 2 partecipanti per proseguire
                    </div>
                ) : (
                    <div className="md:h-8 h-15"></div>
                )}
            </div>
        </div>
    )
}