import type {ArticleItem} from "@/types";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import {remark} from "remark";
import moment from "moment";
import html from "remark-html"
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";


const articlesDirectory = path.join(process.cwd(), "articles");
export const getSortedArticles = ():ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames.map((fileName: string) => {
        const id = fileName.replace(/\.md$/, "")

        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");

        const matterResult = matter(fileContents);
        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            description: matterResult.data.description,
        }
    })

    return allArticlesData.sort((a, b) => {
        const dateA = moment(a.date);
        const dateB = moment(b.date);
        if (dateA.isBefore(dateB)) {
            return 1;
        } else if (dateA.isAfter(dateB)) {
            return -1;
        } else {
            return 0;
        }

    }).map(data => {
        data.date = moment(data.date).format("DD MMM, YYYY");
        return data;
    })
}

export const getArticleData = async (id: string) => {
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResult = matter(fileContents);
    const processedContent = await remark().use(remarkGfm).use(remarkBreaks).use(html).process(matterResult.content);

    const contentHtml = processedContent.toString();
    return {
        id,
        contentHtml,
        title: matterResult.data.title,
        date: moment(matterResult.data.date).format("DD MMM, YYYY"),
        description: matterResult.data.description,
    }

}