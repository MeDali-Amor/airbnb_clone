"use client";

import { SafeUserType } from "@/app/types";
import Container from "../container/Container";
import Logo from "../logo/Logo";
import UserMenu from "../menus/UserMenu";
import Searchbar from "../searchbar/Searchbar";
import Categories from "./Categories";

interface NavbarProps {
    currentUser?: SafeUserType | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className="w-full fixed bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-1">
                        <Logo />
                        <Searchbar />
                        <UserMenu user={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
};

export default Navbar;
