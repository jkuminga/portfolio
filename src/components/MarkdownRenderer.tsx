import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type MarkdownRendererProps = {
    content: string;
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
    return (
        <div className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-xl prose-img:shadow-lg prose-headings:font-bold prose-a:text-primary hover:prose-a:text-blue-600 prose-a:transition-colors">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
