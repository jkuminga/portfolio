import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    width?: "w-full" | "w-fit" | string;
    className?: string;
    delay?: number;
    initialVisible?: boolean;
}

export default function ScrollReveal({
    children,
    width = "w-full",
    className = "",
    delay = 0,
    initialVisible = false,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(initialVisible);

    useEffect(() => {
        if (initialVisible) return;

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

        const element = ref.current;

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [initialVisible]);

    return (
        <div
            ref={ref}
            className={`${width} ${className} transition-all duration-500 ease-out ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
