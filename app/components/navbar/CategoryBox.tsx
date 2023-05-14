"use client";

import { IconType } from "react-icons/lib";
import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    label,
    icon: Icon,
    selected,
}) => {
    const router = useRouter();
    const params = useSearchParams();
    const handleSelect = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };
        if (params?.get("category") === label) {
            delete updatedQuery.category;
        }
        const url = qs.stringifyUrl(
            {
                url: "/",
                query: updatedQuery,
            },
            { skipNull: true, skipEmptyString: true }
        );
        router.push(url);
    }, [label, params, router]);
    return (
        <div
            onClick={handleSelect}
            className={`
                        group
                        flex flex-col  items-center gap-2 px-4  ${
                            selected ? "text-neutral-800" : "text-neutral-500"
                        }
                        hover:text-neutral-800
                        cursor-pointer
                        transition
                        `}
        >
            <Icon size={26} />
            <div className="text-[12px] font-semibold break-keep whitespace-nowrap">
                {label}
            </div>
            <div
                className={`w-[100%] h-[2px] ${
                    selected ? "bg-neutral-800" : "bg-transparent"
                } group-hover:bg-neutral-300 transition`}
            ></div>
        </div>
    );
};

export default CategoryBox;
