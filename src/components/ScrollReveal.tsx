import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "w-full" | "w-fit" | string;
    className?: string;
    delay?: number;
}

export default function ScrollReveal({
    children,
    width = "w-full",
    className = "",
    delay = 0
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1, // Reveal when 10% of the element is visible
                rootMargin: "0px 0px -50px 0px" // Slight offset for better feel
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`${width} ${className} transition-all duration-700 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
