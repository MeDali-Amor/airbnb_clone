"use client";
import React from "react";

interface DividerProps {
    text?: string;
    // color?: string;
    width?: number;
    marginBlock?: number;
}

const RegularDivider: React.FC<DividerProps> = ({
    text,
    // color,
    width,
    marginBlock,
}) => {
    return (
        <div
            className={` relative flex flex-row items-center ${
                width ? `w-[${width}px]` : "w-full"
            } ${marginBlock ? `my-[${marginBlock}px]` : "py-4"}`}
        >
            <div
                className={`border-b-2 border-neutral-300
                 ${width ? `w-[${width}px]` : "w-full"}
      `}
            ></div>
            {text ? (
                <div className="absolute top-[7px] left-[50%] translate-x-[-50%] bg-white text-sm font-extralight text-neutral-800  text-center px-4">
                    {text}
                </div>
            ) : null}
            {/* <div
                className={`border-b-2 border-neutral-200 max-w-[50%]
      `}
            ></div> */}
        </div>
    );
};

export default RegularDivider;
