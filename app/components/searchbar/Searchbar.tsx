"use client";

import { BiSearch } from "react-icons/bi";

const Searchbar = () => {
    return (
        <div className="border-[1px]  md:w-auto  py-2 rounded-full shadow hover:shadow-md transition flex flex-row items-center justify-between cursor-pointer">
            <div className="text-sm font-bold ml-2 px-4 py-0 border-r-[1px] border-gray-200 truncate">
                {"N'importe ou"}
            </div>
            <div className="hidden md:block text-sm font-bold px-4 py-0 border-r-[1px] border-gray-200 truncate">
                Une semaine
            </div>
            <div className="text-sm font-normal  py-0 flex flex-row items-center gap-3 ">
                <div className="text-gray-500 px-4 truncate">
                    Ajouter des voyageurs
                </div>
                <div className="p-2 mr-2 bg-rose-500 rounded-full text-white ">
                    <BiSearch size={16} />
                </div>
            </div>
        </div>
    );
};

export default Searchbar;
