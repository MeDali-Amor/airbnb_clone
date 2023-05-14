"use client";

import { useState, useEffect } from "react";

interface RenderClientComponentProps {
    children: React.ReactNode;
}

const RenderClientComponent: React.FC<RenderClientComponentProps> = ({
    children,
}) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
        // return setHasMounted(false);
    }, []);
    if (!hasMounted) return null;

    return <>{children}</>;
};

export default RenderClientComponent;
