import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { FaCalculator } from "react-icons/fa6"
import { IoIosArrowForward } from "react-icons/io"

interface CalculatorWidgetProps {
    initialValue?: number
    onClose?: () => void
    onResult?: (result: number) => void
    isStandalone?: boolean
}

export function CalculatorWidget({ initialValue = 0, onClose, onResult, isStandalone = true }: CalculatorWidgetProps) {
    const [isOpen, setIsOpen] = useState(true)
    const [display, setDisplay] = useState(initialValue.toString())
    const [firstOperand, setFirstOperand] = useState<number | null>(null)
    const [operator, setOperator] = useState<string | null>(null)
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

    useEffect(() => {
        setDisplay(initialValue.toString())
    }, [initialValue])

    const toggleCalculator = () => {
        if (isStandalone) {
            setIsOpen((prev) => !prev)
        }
        onClose?.()
    }

    const handleOk = () => {
        const result = parseFloat(display)
        onResult?.(result)
    }

    const clearDisplay = useCallback(() => {
        setDisplay("0")
        setFirstOperand(null)
        setOperator(null)
        setWaitingForSecondOperand(false)
    }, [])

    const inputDigit = useCallback(
        (digit: string) => {
            setDisplay((prev) => (waitingForSecondOperand ? digit : prev === "0" ? digit : prev + digit))
            if (waitingForSecondOperand) setWaitingForSecondOperand(false)
        },
        [waitingForSecondOperand],
    )

    const inputDecimal = useCallback(() => {
        if (waitingForSecondOperand) {
            setDisplay("0.")
            setWaitingForSecondOperand(false)
            return
        }

        setDisplay((prev) => (prev.includes(".") ? prev : prev + "."))
    }, [waitingForSecondOperand])

    const performCalculation = useCallback((op: string, first: number, second: number) => {
        switch (op) {
            case "+":
                return first + second
            case "-":
                return first - second
            case "×":
                return first * second
            case "÷":
                return first / second
            default:
                return second
        }
    }, [])

    const handleOperator = useCallback(
        (nextOperator: string) => {
            const inputValue = Number.parseFloat(display)

            if (firstOperand === null) {
                setFirstOperand(inputValue)
            } else if (operator) {
                const result = performCalculation(operator, firstOperand, inputValue)
                setDisplay(String(result))
                setFirstOperand(result)
            }

            setWaitingForSecondOperand(true)
            setOperator(nextOperator)
        },
        [display, firstOperand, operator, performCalculation],
    )

    const calculateResult = useCallback(() => {
        if (!operator || firstOperand === null) return
        const inputValue = Number.parseFloat(display)
        const result = performCalculation(operator, firstOperand, inputValue)
        setDisplay(String(result))
        setFirstOperand(result)
        setOperator(null)
        setWaitingForSecondOperand(false)
    }, [display, firstOperand, operator, performCalculation])

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (!isOpen) return

            if (/[0-9]/.test(e.key)) {
                inputDigit(e.key)
            } else if (e.key === ".") {
                inputDecimal()
            } else if (["+", "-"].includes(e.key)) {
                handleOperator(e.key)
            } else if (e.key === "*") {
                handleOperator("×")
            } else if (e.key === "/") {
                handleOperator("÷")
            } else if (["Enter", "="].includes(e.key)) {
                calculateResult()
            } else if (e.key === "Escape") {
                clearDisplay()
            }
        },
        [isOpen, inputDigit, inputDecimal, handleOperator, calculateResult, clearDisplay],
    )

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleKeyDown])

    const CalculatorButton = ({
        children,
        onClick,
    }: {
        children: React.ReactNode
        onClick: () => void
    }) => (
        <div className="relative">
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black" />
            <button
                className={`relative w-full h-14 font-bold text-xl border-2 cursor-pointer border-default-secondary transition-transform active:translate-x-0.5 active:translate-y-0.5 ${isStandalone ? 'bg-primary-color hover:bg-primary-color-hover' : 'bg-secondary-color hover:bg-secondary-color-hover'}`}
                onClick={onClick}
            >
                {children}
            </button>
        </div>
    )

    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <div className="relative">
                    <div className="absolute inset-0 translate-x-1 translate-y-1 bg-default-secondary" />
                    <button
                        className="relative flex items-center justify-center w-16 h-16 bg-secondary-color text-default-secondary border-2 border-default-secondary hover:bg-secondary-color-hover transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
                        onClick={toggleCalculator}
                    >
                        {isOpen ? <IoIosArrowForward size={24} /> : <FaCalculator size={24} />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-primary-color/30 transition-transform duration-300 flex flex-col items-center justify-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            toggleCalculator()
                        }
                    }}
                >
                    <div className="relative w-full max-w-md mx-auto p-6">
                        <div className="relative">
                            <div className="absolute inset-0 translate-x-2 translate-y-2 bg-default-secondary" />
                            <div className={`relative ${isStandalone ? 'bg-primary-color-hover' : 'bg-market-name'} p-6`}>
                                <div className="flex justify-end mb-2">
                                    <div className="relative">
                                        <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black" />
                                        <button
                                            className={`relative w-8 h-8 font-bold text-xl border-2 cursor-pointer border-default-secondary transition-transform active:translate-x-0.5 active:translate-y-0.5 ${isStandalone ? 'bg-primary-color hover:bg-primary-color-hover' : 'bg-secondary-color hover:bg-secondary-color-hover'}`}
                                            onClick={toggleCalculator}
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 translate-x-1 translate-y-1 bg-black" />
                                    <div className="relative h-16 bg-default-primary border-2 border-black flex items-center justify-end px-4 overflow-hidden">
                                        <div className="text-3xl font-bold truncate">{display}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    <CalculatorButton onClick={clearDisplay}>C</CalculatorButton>
                                    <CalculatorButton onClick={() => setDisplay(display.slice(0, -1) || "0")}>←</CalculatorButton>
                                    <CalculatorButton onClick={() => handleOperator("%")}>%</CalculatorButton>
                                    <CalculatorButton onClick={() => handleOperator("÷")}>÷</CalculatorButton>
                                    {[..."789×456-123+0.="].map((key, index) => {
                                        const handleClick = () => {
                                            if (/\d/.test(key)) inputDigit(key)
                                            else if (key === ".") inputDecimal()
                                            else if (key === "=") calculateResult()
                                            else handleOperator(key)
                                        }
                                        return <CalculatorButton key={index} onClick={handleClick} children={key} />
                                    })}
                                </div>
                                {!isStandalone && (
                                    <div className="mt-2">
                                        <CalculatorButton onClick={handleOk}>AGGIORNA SPESA</CalculatorButton>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
