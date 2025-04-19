import { useState } from 'react';

interface SelectorProps {
    onSelectionChange: (option: 'divisore' | 'conto') => void;
}

export function Selector({ onSelectionChange }: SelectorProps) {
    const [selectedOption, setSelectedOption] = useState<'divisore' | 'conto'>('divisore');

    const handleOptionChange = (option: 'divisore' | 'conto') => {
        setSelectedOption(option);
        onSelectionChange(option);
    };

    return (
        <div className="relative w-full">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black" />
            <div className="relative flex gap-3 w-full px-4 py-3 bg-primary-color border-2 border-default-secondary font-medium text-center uppercase">
                <button
                    onClick={() => handleOptionChange('divisore')}
                    className={`flex-1 py-2 transition-colors cursor-pointer relative ${selectedOption === 'divisore' ? 'bg-primary-color-hover' : ''
                        }`}
                >
                    {selectedOption === 'divisore' && (
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black" />
                            <div className="absolute inset-0 bg-primary-color-hover" />
                        </div>
                    )}
                    <span className="relative">Divisore Spese</span>
                </button>
                <button
                    onClick={() => handleOptionChange('conto')}
                    className={`flex-1 py-2 transition-colors cursor-pointer relative ${selectedOption === 'conto' ? 'bg-primary-color-hover' : ''
                        }`}
                >
                    {selectedOption === 'conto' && (
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black" />
                            <div className="absolute inset-0 bg-primary-color-hover" />
                        </div>
                    )}
                    <span className="relative">Conto Separato</span>
                </button>
            </div>
        </div>
    );
}