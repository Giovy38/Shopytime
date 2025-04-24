import { useState, useEffect } from "react"
import { CalculatorWidget } from "./Calculator"

// Funzione di utilità per arrotondare i numeri
const roundToTwoDecimals = (num: number): number => {
    return Math.round(num * 100) / 100;
}

interface BillInputProps {
    value?: number
    onChange?: (value: number) => void
    min?: number
    max?: number
    disabled?: boolean
}

export function BillInput({
    value = 0,
    onChange,
    min = 0,
    max = 100,
    disabled = false,
}: BillInputProps) {
    const [count, setCount] = useState(value)
    const [inputValue, setInputValue] = useState(value.toString())
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false)
    const [calculatorInitialValue, setCalculatorInitialValue] = useState(0)

    useEffect(() => {
        setCount(value)
        setInputValue(value.toString())
    }, [value])

    const handleIncrement = () => {
        if (!disabled) {
            setCalculatorInitialValue(count)
            setIsCalculatorOpen(true)
        }
    }

    const handleDecrement = () => {
        if (!disabled) {
            setCalculatorInitialValue(count)
            setIsCalculatorOpen(true)
        }
    }

    const handleCalculatorResult = (result: number) => {
        const roundedResult = roundToTwoDecimals(result);
        if (roundedResult >= min && roundedResult <= max) {
            setCount(roundedResult)
            setInputValue(roundedResult.toString())
            onChange?.(roundedResult)
        }
        setIsCalculatorOpen(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)

        const numericValue = parseFloat(newValue)
        if (!isNaN(numericValue)) {
            const roundedValue = roundToTwoDecimals(numericValue)
            if (roundedValue >= min && roundedValue <= max) {
                setCount(roundedValue)
                onChange?.(roundedValue)
            }
        }
    }

    const handleBlur = () => {
        const numericValue = parseFloat(inputValue)
        if (isNaN(numericValue) || numericValue < min) {
            setCount(min)
            setInputValue(min.toString())
            onChange?.(min)
        } else if (numericValue > max) {
            setCount(max)
            setInputValue(max.toString())
            onChange?.(max)
        } else {
            const roundedValue = roundToTwoDecimals(numericValue)
            setCount(roundedValue)
            setInputValue(roundedValue.toString())
            onChange?.(roundedValue)
        }
    }

    return (
        <>
            <div className="relative">
                <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
                <div className="relative flex items-center bg-default-primary border-2 border-default-secondary overflow-hidden">
                    <button
                        type="button"
                        onClick={handleDecrement}
                        className="px-3 py-2 font-bold text-black bg-secondary-color border-r-2 border-black hover:bg-secondary-color-hover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={disabled}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        className="flex-1 text-center font-bold py-2 outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                        min={min}
                        max={max}
                        disabled={disabled}
                    />
                    <button
                        type="button"
                        onClick={handleIncrement}
                        className="px-3 py-2 font-bold text-default-secondary bg-secondary-color border-l-2 border-default-secondary hover:bg-secondary-color-hover cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={disabled}
                    >
                        +
                    </button>
                </div>
            </div>
            {isCalculatorOpen && (
                <CalculatorWidget
                    initialValue={calculatorInitialValue}
                    onClose={() => setIsCalculatorOpen(false)}
                    onResult={handleCalculatorResult}
                    isStandalone={false}
                />
            )}
        </>
    )
}
