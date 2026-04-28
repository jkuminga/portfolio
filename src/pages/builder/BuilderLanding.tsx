import { Link } from "react-router-dom";

const cards = [
  {
    to: "/md-builder/main-project",
    icon: "view_carousel",
    title: "메인 프로젝트",
    description: "정식 포트폴리오 프로젝트 Markdown을 생성합니다.",
  },
  {
    to: "/md-builder/side-project",
    icon: "science",
    title: "사이드 프로젝트",
    description: "개인 실험, 연구, 작은 프로젝트용 Markdown을 생성합니다.",
  },
  {
    to: "/md-builder/stack",
    icon: "data_object",
    title: "기술 스택",
    description: "stacks.json에 추가할 기술 스택 JSON을 생성합니다.",
  },
];

export default function BuilderLanding() {
  return (
    <div className="min-h-screen bg-background-light px-5 py-8 font-display text-[#111318] dark:bg-background-dark dark:text-white lg:px-8">
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-[1120px] flex-col justify-center gap-10">
        <header className="max-w-3xl">
          <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            포트폴리오로 이동
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">Markdown Builder</h1>
          <p className="mt-4 text-base leading-7 text-[#616f89] dark:text-gray-400 md:text-lg">
            포트폴리오 콘텐츠를 현재 코드베이스 포맷에 맞춰 생성하는 작업 도구입니다. 생성된 결과는 복사하거나 파일로 다운로드해서 레포에 저장합니다.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <Link
              key={card.to}
              to={card.to}
              className="group flex min-h-56 flex-col justify-between rounded-xl border border-[#d8dee8] bg-white p-6 transition hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-primary/10 dark:border-gray-800 dark:bg-[#151c2a]"
            >
              <span className="material-symbols-outlined text-4xl text-primary transition group-hover:scale-110">{card.icon}</span>
              <div>
                <h2 className="text-2xl font-extrabold">{card.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#616f89] dark:text-gray-400">{card.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                시작하기
                <span className="material-symbols-outlined text-lg transition group-hover:translate-x-1">arrow_forward</span>
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
