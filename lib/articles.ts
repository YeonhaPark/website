import type {ArticleItem} from "@/types";
import fs from "fs";
import { unified } from "unified";
import matter from "gray-matter";
import path from "path";
import moment from "moment";
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import {defaultSchema} from "hast-util-sanitize"
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify'
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

const customSchema = {
    ...defaultSchema, // Using Schema instead of schema
    tagNames: [
        ...(defaultSchema.tagNames || []), // Using Schema instead of schema
        'video', 'source', 'iframe', 'div', 'span', 'a'
    ],
    attributes: {
        ...defaultSchema.attributes, // Using Schema instead of schema
        // Allow additional attributes for video and other tags
        video: [
            'width', 'height', 'controls', 'autoplay', 'muted', 'loop', 'poster', 'preload', 'src'
        ],
        source: ['src', 'type'],
        iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
        div: ['class', 'id', 'style'],
        span: ['class', 'id', 'style'],
        a: ['href', 'target', 'rel']
    }
};


export async function markdownToHtml(markdown: string) {
    const result = await unified()
        .use(remarkParse) // Parse markdown
        .use(remarkGfm) // Support GitHub Flavored Markdown
        .use(remarkBreaks) // Convert line breaks to <br>
        .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML AST, allowing raw HTML
        .use(rehypeRaw) // Parse raw HTML in the markdown
        .use(rehypeSanitize, customSchema) // Sanitize HTML with custom schema
        .use(rehypeStringify) // Convert to HTML string
        .process(markdown);

    return result.toString();
}
export const getArticleData = async (id: string) => {
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const {data: metadata, content} = matter(fileContents);
   const result = await markdownToHtml(content);

    return {
        id,
        contentHtml : result.toString(),
        title: metadata.title,
        date: moment(metadata.date).format("DD MMM, YYYY"),
        description: metadata.description,
    }

}