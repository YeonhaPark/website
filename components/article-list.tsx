import type {ArticleItem} from "@/types";
import Link from "next/link";

export default function ArticleList({ articles }: {articles: ArticleItem[] }) {
    return <ul className={"article-list"}>
            {articles.map((article: ArticleItem) => <li key={article.id} className={"py-8"}>
                <Link href={"/posts/" + article.id}>
                    <h2 className={"font-semibold text-2xl"}>{article.title}</h2>
                    <h5 className={"my-4 text-sm font-[family-name:var(--font-wix-madefor-text)] "}>Published
                        on {article.date}</h5>
                    <p className={"text-lg"}>{article.description}</p>
                </Link>
            </li>)}
        </ul>
}