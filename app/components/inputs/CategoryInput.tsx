"use client";

import { IconType } from "react-icons/lib";

interface CategoryInputProps {
    label: string;
    icon: IconType;
    onClick: (value: string) => void;
    selected: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    label,
    icon: Icon,
    selected,
    onClick,
}) => {
    return (
        <div
            onClick={() => onClick(label)}
            className={`
    rounded-xl border-2 p-4 flex flex-col gap-4 hover:border-neutral-800 cursor-pointer transition 
text-neutral-800   ${
                selected
                    ? " border-neutral-800 bg-neutral-100"
                    : "border-neutral-200"
            }
    `}
        >
            <Icon size={32} />
            <div className="font-semibold">{label}</div>
        </div>
    );
};

export default CategoryInput;
