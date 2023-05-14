"use client";

import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { BiGlobe } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUserType } from "@/app/types";
import UserAvatar from "../avatars/UserAvatar";
import useCreatePropertyModal from "@/app/hooks/usePropertyModal";

interface UserMenuProps {
    user?: SafeUserType | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const propertyModal = useCreatePropertyModal();

    const [isOpen, setIsOpen] = useState(false);
    const dropRef = useRef() as MutableRefObject<HTMLDivElement>;
    useEffect(() => {
        const handler = (e: any) => {
            if (!dropRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    const toggleMenu = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    const handleOpenCreatePropertyModal = useCallback(() => {
        if (!user) return loginModal.onOpen();
        return propertyModal.onOpen();
    }, [user, loginModal, propertyModal]);

    return (
        <div className="relative flex flex-row items-center ">
            <div
                onClick={handleOpenCreatePropertyModal}
                className=" hidden lg:block text-gray-800 text-sm tracking-wide font-bold py-3 px-4 rounded-full hover:bg-gray-100 transition cursor-pointer truncate"
            >
                Mettre mon logement sur Airbnb
            </div>
            <div className="hidden md:block text-gray-800 text-sm py-3 px-3 rounded-full hover:bg-gray-100 transition cursor-pointer">
                <BiGlobe size={18} />
            </div>
            <div
                onClick={toggleMenu}
                ref={dropRef}
                className="flex flex-row items-center py-2 px-2 gap-3 rounded-full border-[1px] text-gray-600 cursor-pointer hover:shadow-md"
            >
                <div className="hidden md:block px-1">
                    <RxHamburgerMenu size={16} />
                </div>
                <UserAvatar img={user?.image} />
                {isOpen ? (
                    <div className="absolute rounded-xl py-2 shadow-xl w-[245px]  bg-white overflow-hidden top-12 right-0 text-sm ">
                        {user ? (
                            <>
                                <MenuItem
                                    label="Mes excursions"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Mes favrois"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Mes reservations"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Mes propriétés"
                                    onClick={() => {}}
                                />
                                <MenuItem
                                    label="Mettre mon logement sur Airbnb"
                                    onClick={handleOpenCreatePropertyModal}
                                />
                                <div className="w-full border-b-[1px] border-gray-200 my-2"></div>
                                <MenuItem
                                    label="Logout"
                                    onClick={() => signOut()}
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    label="S'identifier"
                                    onClick={loginModal.onOpen}
                                />
                                <MenuItem
                                    label="S'inscrire"
                                    onClick={registerModal.onOpen}
                                />
                                <div className="w-full border-b-[1px] border-gray-200 my-2"></div>
                                <MenuItem label="Aide" onClick={() => {}} />
                            </>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default UserMenu;
