import { getAllProjects } from "../lib/content";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
    const projects = getAllProjects();

    const scrollCarousel = (direction: "left" | "right") => {
        const carousel = document.getElementById("project-carousel");
        if (carousel) {
            const scrollAmount = direction === "left" ? -350 : 350;
            carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col lg:flex-row max-w-[1440px] mx-auto bg-background-light dark:bg-background-dark font-display text-[#111318] dark:text-white transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 w-full p-6 lg:p-12 xl:p-20 overflow-y-auto">
                <div className="lg:hidden mb-12" id="about">
                    <h3 className="text-2xl font-bold text-[#111318] dark:text-white mb-4">
                        자기 소개
                    </h3>
                    <p className="text-[#616f89] dark:text-gray-400 leading-relaxed">
                        백엔드 개발과 데이터 모델링에 강점이 있는 풀스택 엔지니어입니다.
                        복잡한 문제를 기술로 해결하는 것을 즐기며, 사용자에게 가치 있는 경험을 전달하기 위해 끊임없이 고민합니다.
                    </p>
                </div>

                <div className="max-w-[900px]">
                    <div
                        className="flex items-center justify-between mb-8 pt-4"
                        id="projects"
                    >
                        <h2 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight">
                            주요 프로젝트
                        </h2>
                        <div className="flex gap-2">
                            <button
                                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer"
                                onClick={() => scrollCarousel("left")}
                            >
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <button
                                className="h-10 w-10 flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-500 hover:text-primary hover:border-primary transition-all cursor-pointer"
                                onClick={() => scrollCarousel("right")}
                            >
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>

                    <div className="relative -mx-6 px-6 lg:-mx-12 lg:px-12 xl:-mx-20 xl:px-20 overflow-hidden">
                        <div
                            className="flex gap-6 overflow-x-auto scrollbar-hide pb-8 snap-x snap-mandatory"
                            id="project-carousel"
                        >
                            {projects.map((project) => (
                                <ProjectCard key={project.slug} project={project} />
                            ))}
                        </div>
                    </div>

                    <div
                        className="mt-12 pt-12 border-t border-[#f0f2f4] dark:border-gray-800"
                        id="contact"
                    >
                        <h2 className="text-[#111318] dark:text-white text-3xl font-bold tracking-tight mb-6">
                            함께 프로젝트를 만들어보아요
                        </h2>
                        <p className="text-[#616f89] dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
                            새로운 기회를 찾고 있습니다. 프로젝트 문의나 궁금한 점이 있으시면 언제든지 연락주세요. 최선을 다해 답변해 드리겠습니다!
                        </p>
                        <button className="flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg hover:bg-blue-600 hover:shadow-primary/40 transition-all">
                            <span className="truncate">메일 보내기</span>
                        </button>
                    </div>

                    <footer className="mt-24 pb-8 text-sm text-[#616f89] dark:text-gray-500">
                        <p>
                            Designed in Figma and coded in Visual Studio Code. Built with
                            Tailwind CSS and Plus Jakarta Sans.
                            <br />© 2025 DoHyeon. All rights reserved.
                        </p>
                    </footer>
                </div>
            </main>
        </div>
    );
}
