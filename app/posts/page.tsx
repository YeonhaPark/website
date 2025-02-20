import {getSortedArticles} from "@/lib/articles";
import BlogTemplate from "@/components/blog-template";
import Footer from "@/components/footer";
import ArticleList from "@/components/article-list";
export default function Page() {
    const articles = getSortedArticles();
    return <BlogTemplate>
        <>
        <div className={"px-16 w-full"}>
            <h2 className={"mt-14 mb-20 text-4xl font-semibold text-center font-[family-name:var(--font-gabarito)]"}>Blog</h2>
            <ArticleList articles={articles} />
        <Footer />
        </div>
        </>
    </BlogTemplate>
}