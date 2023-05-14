"use client";
import { IconType } from "react-icons/lib";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outlined?: boolean;
    size?: string;
    icon?: IconType;
    color?: string;
    fullWidth?: boolean;
}

const ButtonRegular: React.FC<ButtonProps> = ({
    label,
    onClick,
    disabled,
    outlined,
    size,
    icon: Icon,
    color,
    fullWidth = false,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={` flex flex-row items-center justify-center gap-1 relative disabled:opacity-60 disabled:cursor-not-allowed rounded-md  hover:opacity-80 transition active:scale-95 ${
                fullWidth && "w-full"
            } ${
                color
                    ? buttonColor(color, outlined)
                    : outlined
                    ? "text-rose-600 bg-white border-[1px] border-rose-600"
                    : "bg-rose-600 text-white"
            } ${size ? buttonSize(size) : "text-base py-3 px-4"}`}
        >
            {Icon ? (
                <Icon
                    className="absolute top-[50%] translate-y-[-50%] left-6"
                    size={size === "small" ? 12 : size === "large" ? 24 : 18}
                />
            ) : null}
            {label}
        </button>
    );
};

export default ButtonRegular;

const buttonColor = (color: string, outlined: boolean | any) => {
    switch (color) {
        case "primary":
            return outlined
                ? "text-rose-600 bg-white border-[1px] border-rose-600"
                : "bg-rose-600 text-white";
        case "warning":
            return outlined
                ? "text-yellow-500 bg-white border-[1px] border-yellow-500"
                : "bg-yellow-500 text-white";
        case "error":
            return outlined
                ? "text-red-600 bg-white border-[1px] border-red-600"
                : "bg-red-600 text-white";
        case "info":
            return outlined
                ? "text-sky-500 bg-white border-[1px] border-sky-500"
                : "bg-sky-500 text-white";
        case "contrast":
            return outlined
                ? "text-neutral-800 bg-white border-[1px] border-neutral-800 hover:bg-neutral-100"
                : "text-neutral-800 bg-white border-[1px] border-neutral-800 hover:bg-neutral-100";
        default:
            return outlined
                ? "text-rose-600 bg-white border-[1px] border-rose-600"
                : "bg-rose-600 text-white";
    }
};
const buttonSize = (size: string) => {
    switch (size) {
        case "small":
            return "text-sm py-1 px-2";
        case "medium":
            return "text-base py-3 px-4";
        case "large":
            return " text-lg font-bold py-4 px-4";

        default:
            return "text-base py-3 px-4";
    }
};
