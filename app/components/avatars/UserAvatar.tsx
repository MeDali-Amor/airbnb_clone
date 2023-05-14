"use client";

import Image from "next/image";

import { FaUserCircle } from "react-icons/fa";

interface AvatarProps {
    img?: string | null | undefined;
}

const UserAvatar: React.FC<AvatarProps> = ({ img }) => {
    return (
        <div>
            {img ? (
                <Image
                    className="rounded-full"
                    height={28}
                    width={28}
                    src={img}
                    alt="avatar"
                />
            ) : (
                <FaUserCircle size={28} />
            )}
        </div>
    );
};

export default UserAvatar;
