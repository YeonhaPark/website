import type { ArticleItem } from "@/types";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import moment from "moment";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { defaultSchema } from "hast-util-sanitize";
import {flattenListKeepPrefix, minifyWhitespaceBeforeTable} from "./plugin"
import rehypeRaw from "rehype-raw";
const articlesDirectory = path.join(process.cwd(), "articles");

export const getSortedArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDirectory);
    const allArticlesData = fileNames.map((fileName: string) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(articlesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf-8");
        const matterResult = matter(fileContents);

        return {
            id,
            title: matterResult.data.title,
            date: matterResult.data.date,
            description: matterResult.data.description,
        };
    });

    return allArticlesData
        .sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf())
        .map((data) => {
            data.date = moment(data.date).format("DD MMM, YYYY");
            return data;
        });
};

const customSchema = {
    ...defaultSchema,
    tagNames: [
        ...(defaultSchema.tagNames || []),
        "video",
        "source",
        "iframe",
        "img",
        "div",
        "span",
        "a",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "code",
        "pre",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6"
    ],
    attributes: {
        ...defaultSchema.attributes,
        video: [
            "width",
            "height",
            "controls",
            "autoplay",
            "muted",
            "loop",
            "poster",
            "preload",
            "src",
        ],
        source: ["src", "type"],
        iframe: ["src", "width", "height", "frameborder", "allowfullscreen"],
        div: ["class", "id", "style"],
        span: ["class", "id", "style"],
        a: ["href", "target", "rel"],
        img: ["src", "alt", "width", "height", "title", "style", "class"],
        table: ["class"],
        th: ["colspan", "rowspan", "scope"],
        td: ["colspan", "rowspan", "class", "style"],
        code: ["class"],
        pre: ["class"]
    },
    clobberPrefix: "",
    ancestors: {
        code: ["tr", "thead", "tbody", "td", "p", "div", "span"]
    }
};

export async function markdownToHtml(markdown: string) {
    const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, customSchema)
        .use(minifyWhitespaceBeforeTable)
        .use(rehypeRaw)
        .use(flattenListKeepPrefix)
        .use(rehypeSanitize)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(markdown);

    return result.toString();
}

export const getArticleData = async (id: string) => {
    const fullPath = path.join(articlesDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const { data: metadata, content } = matter(fileContents);
    const result = await markdownToHtml(content);

    return {
        id,
        contentHtml: result.toString(),
        title: metadata.title,
        date: moment(metadata.date).format("DD MMM, YYYY"),
        description: metadata.description,
    };
};