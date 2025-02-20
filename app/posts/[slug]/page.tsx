import { getArticleData } from "@/lib/articles";
import Link from "next/link"
import BlogTemplate from "@/components/blog-template";
import Footer from "@/components/footer";
type Params = Promise<{ slug: string }>
const Article = async ( { params }: { params: Params }  ) => {
    const { slug } = await params;
    const articleData = await getArticleData(slug);
    return  <BlogTemplate>
        <>
        <section className="w-10/12 md:w-full mx-auto mt-20  flex flex-col gap-5">
            <div className="flex justify-between">
        <Link href={"/posts"}>
            <div className={"flex gap-2 items-center"}>
           <span className={"arrow-back font-[family-name:var(--font-gabarito)]"}/>Go back
            </div>
        </Link>
            <span className={"text-sm"}>Published on {articleData.date.toString()}</span>
            </div>
            <h2 className={"mt-10 text-slate-50 text-3xl font-semibold font-[family-name:var(--font-gabarito)] text-center"}>{articleData.title}</h2>
            <article className={"article mt-14 whitespace-pre-line overflow-x-scroll"}
                     dangerouslySetInnerHTML={{__html: articleData.contentHtml}}/>
        </section>
        <Footer /></>
    </BlogTemplate>
}

export default Article;