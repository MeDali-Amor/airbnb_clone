"use client";
import { IoIosBed, IoMdSnow } from "react-icons/io";
import {
    TbBeach,
    TbCaravan,
    TbPool,
    TbSailboat,
    TbTent,
    TbUfo,
} from "react-icons/tb";
import { CiMountain1 } from "react-icons/ci";
import { BiWater } from "react-icons/bi";
import { VscKey } from "react-icons/vsc";
import { HiOutlineFire } from "react-icons/hi";
import { IoDiamondOutline } from "react-icons/io5";
import {
    MdOutlineCabin,
    MdOutlineCastle,
    MdOutlineSportsGolf,
    MdOutlineVilla,
} from "react-icons/md";
import {
    GiAncientRuins,
    GiDesert,
    GiGrapes,
    GiIsland,
    GiPalmTree,
    GiSkis,
    GiSurfBoard,
    GiWindmill,
} from "react-icons/gi";
import Container from "../container/Container";
import { useState } from "react";

import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get("category");
    const pathname = usePathname();
    const isHomePage = pathname === "/";

    if (!isHomePage) return null;

    return (
        <Container>
            <div className="flex flex-row items-center justify-between overflow-x-auto scrollbar-hide w-full pt-4  gap-4 shadow-x-fuzzy ">
                {categories.map((el) => (
                    <CategoryBox
                        label={el.label}
                        icon={el.icon}
                        key={el.label}
                        selected={el.label === category}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;

export const categories = [
    {
        label: "Chambres",
        icon: IoIosBed,
    },
    {
        label: "Bateaux",
        icon: TbSailboat,
    },
    {
        label: "Bord de mer",
        icon: BiWater,
    },
    {
        label: "Désert",
        icon: GiDesert,
    },
    {
        label: "Îles",
        icon: GiIsland,
    },

    {
        label: "Sous les tropiques",
        icon: GiPalmTree,
    },
    {
        label: "Wow!",
        icon: TbUfo,
    },
    {
        label: "Toit du monde",
        icon: CiMountain1,
    },
    {
        label: "Moderne",
        icon: MdOutlineVilla,
    },
    {
        label: "Patrimoine",
        icon: GiAncientRuins,
    },
    {
        label: "Piscines",
        icon: TbPool,
    },
    {
        label: "Nouveautés",
        icon: VscKey,
    },
    {
        label: "Tendance",
        icon: HiOutlineFire,
    },
    {
        label: "Vignobles",
        icon: GiGrapes,
    },
    {
        label: "Cabanes",
        icon: MdOutlineCabin,
    },
    {
        label: "Luxe",
        icon: IoDiamondOutline,
    },
    {
        label: "Camping",
        icon: TbTent,
    },
    {
        label: "Ski",
        icon: GiSkis,
    },
    {
        label: "Caravanes",
        icon: TbCaravan,
    },
    {
        label: "Arctique",
        icon: IoMdSnow,
    },

    {
        label: "Surf",
        icon: GiSurfBoard,
    },
    {
        label: "Golf",
        icon: MdOutlineSportsGolf,
    },
    {
        label: "Chateaux",
        icon: MdOutlineCastle,
    },
    {
        label: "Hanoks",
        icon: IoIosBed,
    },
    {
        label: "Moulins à vent",
        icon: GiWindmill,
    },
    {
        label: "Plages",
        icon: TbBeach,
    },
];
