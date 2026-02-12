import { useEffect } from "react";

interface HeadProps {
    title: string;
}

export default function Head({ title }: HeadProps) {
    useEffect(() => {
        document.title = title ;
    }, [title ]);

    return null;
}