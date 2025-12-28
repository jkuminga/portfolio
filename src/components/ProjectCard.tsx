import type { ProjectMeta } from "../lib/content";
import { Link } from "react-router-dom";

type ProjectCardProps = {
    project: ProjectMeta;
};

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="min-w-[85vw] sm:min-w-[400px] snap-center flex flex-col bg-white dark:bg-[#151c2a] rounded-xl overflow-hidden shadow-sm border border-[#f0f2f4] dark:border-gray-800 group hover:shadow-lg transition-all duration-300">
            <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/0 transition-colors z-10"></div>
                {project.thumbnail ? (
                    <img
                        src={project.thumbnail}
                        alt={`${project.title} cover`}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-gray-400">
                            image
                        </span>
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold text-[#111318] dark:text-white">
                        {project.title}
                    </h3>
                    {/* Link to detail page using slug */}
                    <Link
                        to={`/projects/${project.slug}`}
                        aria-label="View project details"
                        className="text-primary hover:text-blue-600 transition-colors p-1"
                    >
                        <span className="material-symbols-outlined">arrow_outward</span>
                    </Link>
                </div>
                <p className="text-sm text-[#616f89] dark:text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                    {project.summary}
                </p>
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.stack.length > 3 && (
                            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-semibold">
                                +{project.stack.length - 3}
                            </span>
                        )}
                    </div>
                    <Link
                        to={`/projects/${project.slug}`}
                        className="w-full block text-center py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white text-sm font-bold transition-all duration-300"
                    >
                        자세히 보기
                    </Link>
                </div>
            </div>
        </div>
    );
}
