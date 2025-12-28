import { useState, useEffect } from "react";

export default function Sidebar() {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const sections = ["projects", "stacks", "about", "contact"];

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -20% 0px", // 화면 중간쯤 왔을 때 더 민감하게 반응하도록 수정
            threshold: 0.1
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const navItems = [
        { id: "projects", label: "프로젝트" },
        { id: "stacks", label: "기술 스택" },
        { id: "about", label: "소개" },
        { id: "contact", label: "연락처" },
    ];

    return (
        <aside className="w-full lg:w-[40%] xl:w-[35%] lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#f0f2f4] dark:border-gray-800 bg-white dark:bg-[#151c2a]">
            <div className="flex flex-col items-start gap-8">
                <div className="flex items-center gap-3 text-primary">
                    <div className="size-10 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm transition-transform hover:scale-105 duration-300">
                        <img
                            src="/assets/logo.jpeg"
                            alt="Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="font-bold text-xl tracking-tight text-[#111318] dark:text-white">
                        JK
                    </span>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-gray-800 shadow-xl"
                        data-alt="Portrait of Alex Developer smiling professionally"
                        style={{
                            backgroundImage:
                                'url("/assets/profile.png")',
                        }}
                    ></div>
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111318] dark:text-white mb-2">
                            도 현 직
                        </h1>
                        <h2 className="text-xl font-medium text-primary mb-4">
                            Full Stack Engineer
                        </h2>
                        <p className="text-base leading-relaxed text-[#616f89] dark:text-gray-400 max-w-md">
                            웹 경험을 만드는 것을 좋아합니다. 직관적인 인터페이스와 확장 가능한 백엔드 시스템 구축에 집중합니다.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-8 mt-8 lg:mt-0">
                <nav className="flex flex-col gap-3">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            className={`group flex items-center gap-3 transition-all duration-300 ${activeSection === item.id
                                ? "text-[#111318] dark:text-white font-bold"
                                : "text-[#616f89] hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                                }`}
                            href={`#${item.id}`}
                        >
                            <span className={`h-px transition-all duration-500 bg-gray-300 group-hover:bg-primary ${activeSection === item.id
                                ? "w-16 bg-primary"
                                : "w-8 group-hover:w-16"
                                }`}></span>
                            <span className="text-sm font-bold uppercase tracking-widest">
                                {item.label}
                            </span>
                        </a>
                    ))}
                </nav>
                <div className="flex flex-wrap items-center gap-3">
                    <a
                        aria-label="GitHub"
                        className="group flex items-center gap-2 p-2 h-10 rounded-full text-[#616f89] hover:text-primary hover:bg-primary/10 transition-all duration-300 dark:text-gray-400 dark:hover:text-primary border border-transparent hover:border-primary/20 bg-white dark:bg-[#151c2a]"
                        href="https://github.com/jkuminga"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="/assets/stacks/github.svg" alt="GitHub" className="w-5 h-5 dark:invert grayscale group-hover:grayscale-0 transition-all" />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold group-hover:max-w-xs transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                            GitHub
                        </span>
                    </a>
                    <a
                        aria-label="LinkedIn"
                        className="group flex items-center gap-2 p-2 h-10 rounded-full text-[#616f89] hover:text-primary hover:bg-primary/10 transition-all duration-300 dark:text-gray-400 dark:hover:text-primary border border-transparent hover:border-primary/20 bg-white dark:bg-[#151c2a]"
                        href="https://www.linkedin.com/in/dohyeonjik"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold group-hover:max-w-xs transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                            LinkedIn
                        </span>
                    </a>
                    <a
                        aria-label="Velog"
                        className="group flex items-center gap-2 p-2 h-10 rounded-full text-[#616f89] hover:text-primary hover:bg-primary/10 transition-all duration-300 dark:text-gray-400 dark:hover:text-primary border border-transparent hover:border-primary/20 bg-white dark:bg-[#151c2a]"
                        href="https://velog.io/@jkuminga"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="material-symbols-outlined text-2xl group-hover:scale-110 transition-transform">article</span>
                        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold group-hover:max-w-xs transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                            Blog
                        </span>
                    </a>
                    <button className="ml-auto flex items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-lg hover:shadow-primary/30 hover:bg-blue-600 transition-all cursor-pointer">
                        이력서
                    </button>
                </div>
            </div>
        </aside>
    );
}
