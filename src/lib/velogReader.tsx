import { useEffect, useState } from "react";

interface VelogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail?: string;
}

const VELOG_RSS_URL = "https://v2.velog.io/rss/@jkuminga";
const VELOG_CACHE_KEY = "velog-posts-cache";
const FETCH_TIMEOUT_MS = 7000;

type RssItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

function formatDate(pubDateRaw: string) {
  const date = new Date(pubDateRaw);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function parsePost(item: RssItem): VelogPost {
  const imgMatch = item.description.match(/<img[^>]+src=["']([^"']+)["']/);
  const thumbnail = imgMatch ? imgMatch[1] : undefined;
  const plainDescription = item.description.replace(/<[^>]*>/g, "").trim();

  return {
    title: item.title,
    link: item.link,
    pubDate: formatDate(item.pubDate),
    description: `${plainDescription.slice(0, 100)}${plainDescription.length > 100 ? "..." : ""}`,
    thumbnail,
  };
}

function parseRssXml(text: string) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "text/xml");

  if (xml.querySelector("parsererror")) {
    throw new Error("XML parsing failed");
  }

  return Array.from(xml.querySelectorAll("item"))
    .slice(0, 4)
    .map((item) =>
      parsePost({
        title: item.querySelector("title")?.textContent || "",
        link: item.querySelector("link")?.textContent || "",
        pubDate: item.querySelector("pubDate")?.textContent || "",
        description: item.querySelector("description")?.textContent || "",
      }),
    );
}

function readCachedPosts() {
  try {
    const cached = localStorage.getItem(VELOG_CACHE_KEY);
    if (!cached) return [];

    const posts = JSON.parse(cached);
    return Array.isArray(posts) ? (posts as VelogPost[]) : [];
  } catch {
    return [];
  }
}

function cachePosts(posts: VelogPost[]) {
  try {
    localStorage.setItem(VELOG_CACHE_KEY, JSON.stringify(posts));
  } catch {
    // Cache is best-effort only.
  }
}

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    return response;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function fetchFromRssXml(url: string) {
  const response = await fetchWithTimeout(url);
  return parseRssXml(await response.text());
}

async function fetchFromRss2Json() {
  const response = await fetchWithTimeout(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(VELOG_RSS_URL)}`);
  const data = await response.json();

  if (data.status !== "ok" || !Array.isArray(data.items)) {
    throw new Error("rss2json parsing failed");
  }

  return data.items.slice(0, 4).map((item: Record<string, string>) =>
    parsePost({
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate || "",
      description: item.description || "",
    }),
  );
}

async function fetchVelogPosts() {
  const fetchers = [
    () => fetchFromRssXml(VELOG_RSS_URL),
    () => fetchFromRssXml(`https://api.allorigins.win/raw?url=${encodeURIComponent(VELOG_RSS_URL)}`),
    fetchFromRss2Json,
  ];

  for (const fetcher of fetchers) {
    try {
      const posts = await fetcher();
      if (posts.length > 0) return posts;
    } catch (error) {
      console.warn("Velog feed source failed:", error);
    }
  }

  throw new Error("All Velog feed sources failed");
}

export default function VelogPosts() {
  const [posts, setPosts] = useState<VelogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const parsedPosts = await fetchVelogPosts();
        cachePosts(parsedPosts);
        setPosts(parsedPosts);
      } catch (err) {
        console.error("Failed to fetch Velog posts:", err);
        const cachedPosts = readCachedPosts();
        if (cachedPosts.length > 0) {
          setPosts(cachedPosts);
        } else {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-[#151c2a] rounded-xl border border-[#f0f2f4] dark:border-gray-800 overflow-hidden h-full flex flex-col">
            {/* Thumbnail Skeleton */}
            <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 animate-pulse" />

            <div className="p-5 flex flex-col gap-3">
              {/* Date Skeleton */}
              <div className="w-24 h-3 bg-primary/20 rounded animate-pulse" />

              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                <div className="w-2/3 h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
              </div>

              {/* Description Skeleton */}
              <div className="space-y-2 mt-1">
                <div className="w-full h-3 bg-gray-50 dark:bg-gray-800/50 rounded animate-pulse" />
                <div className="w-full h-3 bg-gray-50 dark:bg-gray-800/50 rounded animate-pulse" />
                <div className="w-4/5 h-3 bg-gray-50 dark:bg-gray-800/50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error || posts.length === 0) {
    return (
      <div className="p-8 text-center bg-white dark:bg-[#151c2a] rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
        <p className="text-gray-500">블로그 포스트를 불러올 수 없습니다. <br /> <a href="https://velog.io/@jkuminga" target="_blank" className="text-primary hover:underline mt-2 inline-block">Velog에서 직접 보기</a></p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
      {posts.map((post, idx) => (
        <a
          key={idx}
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group bg-white dark:bg-[#151c2a] rounded-xl border border-[#f0f2f4] dark:border-gray-800 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col"
        >
          {post.thumbnail && (
            <div className="w-full h-40 overflow-hidden">
              <img
                src={post.thumbnail}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}
          <div className="p-5 flex flex-col flex-1">
            <span className="text-xs font-bold text-primary mb-2">{post.pubDate}</span>
            <h3 className="font-bold text-[#111318] dark:text-white text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-[#616f89] dark:text-gray-400 line-clamp-3 leading-relaxed">
              {post.description}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
