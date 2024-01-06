import { useState, useEffect } from "react";

export const useScrollTop = (threshold = 10) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(()=>{
        const scrollHandler = () => window.scrollY > threshold ? setScrolled(true) : setScrolled(false);

        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);

    }, [threshold]);

    return scrolled;
}