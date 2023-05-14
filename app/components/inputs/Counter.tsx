"use client";
import React, { use, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    title: string;
    value: number;
    onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
    title,

    value,
    onChange,
}) => {
    const increment = useCallback(() => {
        onChange(value + 1);
    }, [value, onChange]);

    const decrement = useCallback(() => {
        if (value <= 1) return;
        onChange(value - 1);
    }, [value, onChange]);

    return (
        <div className="flex flex-row items-center justify-between py-4">
            <div className="text-lg  text-neutral-800">{title}</div>
            <div className="flex flex-row gap-3 items-center">
                <div
                    onClick={decrement}
                    className="w-8
            h-8
            rounded-full
            border-[1px]
            border-neutral-500
            flex
            font-bold
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:border-neutral-900 hover:text-neutral-900
            transition
          "
                >
                    <AiOutlineMinus />
                </div>
                <div className="text-lg  text-neutral-800">{value}</div>
                <div
                    onClick={increment}
                    className="
            w-8
            h-8
            rounded-full
            border-[1px]
            border-neutral-500
            flex
            font-bold
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:border-neutral-900 hover:text-neutral-900
            transition
          "
                >
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
};

export default Counter;
