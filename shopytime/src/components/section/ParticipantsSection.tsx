import { Button } from "../Button";
import { Input } from "../Input";
import { Tag } from "../Tag";
import { useState } from "react";

export function ParticipantSection() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");

    const onAddParticipant = () => {
        if (inputValue.trim()) {
            setParticipants([...participants, inputValue.trim()]);
            setInputValue("");
        }
    }

    return (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
            <div className="relative p-2 bg-default-third border-2 border-default-secondary">
                <div className='p-3 flex flex-col md:flex-row justify-center items-center gap-5'>
                    <Input
                        placeholder='Inserisci un nome da aggiungere'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button onClick={onAddParticipant}>Aggiungi nome</Button>
                </div>
                <div className='flex flex-wrap justify-center items-center p-3 gap-2 bg-default-third'>
                    {participants.length === 0 ? (
                        <div className="text-center text-lg italic ">Ancora nessun partecipante</div>
                    ) : (
                        participants.map((participant, index) => (
                            <Tag
                                key={index}
                                onRemove={() => {
                                    setParticipants(participants.filter((_, i) => i !== index));
                                }}
                            >
                                {participant}
                            </Tag>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}