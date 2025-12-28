export default function Sidebar() {
    return (
        <aside className="w-full lg:w-[40%] xl:w-[35%] lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#f0f2f4] dark:border-gray-800 bg-white dark:bg-[#151c2a]">
            <div className="flex flex-col items-start gap-8">
                <div className="flex items-center gap-3 text-primary">
                    <div className="size-8">
                        <svg
                            className="w-full h-full"
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_6_319)">
                                <path
                                    d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                                    fill="currentColor"
                                ></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_6_319">
                                    <rect fill="white" height="48" width="48"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <span className="font-bold text-xl tracking-tight text-[#111318] dark:text-white">
                        DoHyeon
                    </span>
                </div>
                <div className="flex flex-col gap-6 mt-4">
                    <div
                        className="bg-center bg-no-repeat bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-gray-800 shadow-xl"
                        data-alt="Portrait of Alex Developer smiling professionally"
                        // TODO: Replace with real user image if available, or keep placeholder
                        style={{
                            backgroundImage:
                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjANiGWnIhOblDOfgSh67b6oF-hD7e5TNoLBUJJkMjTmAddpSdWL9S54dftmoPdCoabmudGobITmjZSc1g1C9WjLemAXkAK5OgWGvRKyhWscrvdQYH8MZWKhhi0SDofkCPWT0HCSLlT3tDFbt17R4uXxYMxgMH7jaVl76NcBqyQBPjNHxBphEt9xKuz_41LPKXgtzAbkfCLGpOZG5Sgt2fviEziEcNzjPuVp7LzeD1SXCoaPHCOkrIPDnJorYStkyzw2LTY5YO3RIt")',
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
                    <a
                        className="group flex items-center gap-3 text-[#616f89] hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                        href="#about"
                    >
                        <span className="h-px w-8 bg-gray-300 group-hover:bg-primary group-hover:w-16 transition-all duration-300"></span>
                        <span className="text-sm font-bold uppercase tracking-widest">
                            소개
                        </span>
                    </a>
                    <a
                        className="group flex items-center gap-3 text-[#111318] dark:text-white font-bold"
                        href="#projects"
                    >
                        <span className="h-px w-16 bg-primary transition-all duration-300"></span>
                        <span className="text-sm font-bold uppercase tracking-widest">
                            프로젝트
                        </span>
                    </a>
                    <a
                        className="group flex items-center gap-3 text-[#616f89] hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                        href="#contact"
                    >
                        <span className="h-px w-8 bg-gray-300 group-hover:bg-primary group-hover:w-16 transition-all duration-300"></span>
                        <span className="text-sm font-bold uppercase tracking-widest">
                            연락처
                        </span>
                    </a>
                </nav>
                <div className="flex flex-wrap items-center gap-4">
                    <a
                        aria-label="GitHub"
                        className="p-2 rounded-full text-[#616f89] hover:text-primary hover:bg-primary/10 transition-colors dark:text-gray-400 dark:hover:text-primary"
                        href="#"
                    >
                        <span className="material-symbols-outlined text-2xl">code</span>
                    </a>
                    <a
                        aria-label="LinkedIn"
                        className="p-2 rounded-full text-[#616f89] hover:text-primary hover:bg-primary/10 transition-colors dark:text-gray-400 dark:hover:text-primary"
                        href="#"
                    >
                        <span className="material-symbols-outlined text-2xl">work</span>
                    </a>
                    <a
                        aria-label="Twitter"
                        className="p-2 rounded-full text-[#616f89] hover:text-primary hover:bg-primary/10 transition-colors dark:text-gray-400 dark:hover:text-primary"
                        href="#"
                    >
                        <span className="material-symbols-outlined text-2xl">
                            flutter_dash
                        </span>
                    </a>
                    <button className="ml-auto flex items-center justify-center rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold shadow-lg hover:shadow-primary/30 hover:bg-blue-600 transition-all cursor-pointer">
                        이력서
                    </button>
                </div>
            </div>
        </aside>
    );
}
