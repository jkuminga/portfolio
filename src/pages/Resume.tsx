import { Link } from "react-router-dom";

export default function Resume() {
    return (
        <main className="min-h-screen bg-background-light font-display text-[#111318] dark:bg-background-dark dark:text-white">
            <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col">
                <header className="flex flex-col gap-4 border-b border-[#e3e7ee] bg-white px-5 py-4 dark:border-gray-800 dark:bg-[#151c2a] sm:flex-row sm:items-center sm:justify-between lg:px-8">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            포트폴리오로 돌아가기
                        </Link>
                        <h1 className="mt-3 text-2xl font-extrabold tracking-tight">이력서</h1>
                    </div>
                    <a
                        href="/assets/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-[#d8dee8] px-4 text-sm font-bold text-[#616f89] transition hover:border-primary hover:text-primary dark:border-gray-700 dark:text-gray-300"
                    >
                        새 탭에서 열기
                    </a>
                </header>
                <section className="min-h-0 flex-1 bg-[#f8fafc] p-3 dark:bg-[#101827] sm:p-5">
                    <iframe
                        title="이력서 PDF"
                        src="/assets/resume.pdf"
                        className="h-[calc(100vh-128px)] w-full rounded-lg border border-[#d8dee8] bg-white dark:border-gray-800"
                    />
                </section>
            </div>
        </main>
    );
}
