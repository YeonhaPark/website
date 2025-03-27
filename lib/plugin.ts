// plugins/flattenListKeepPrefix.ts
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Root, Element, Text, Content } from "hast";

export const flattenListKeepPrefix: Plugin<[], Root> = () => {
    return (tree) => {
        visit(tree, "element", (node, index, parent) => {
            if (!parent || typeof index !== "number") return;
            if (node.tagName !== "ul" && node.tagName !== "ol") return;

            const isOrdered = node.tagName === "ol";
            let counter = 1;

            const newParagraphs: Element[] = [];

            for (const li of node.children) {
                if (li.type !== "element" || li.tagName !== "li") continue;

                // Create prefix text like "1. " or "- "
                const prefixText: Text = {
                    type: "text",
                    value: isOrdered ? `${counter++}. ` : "- ",
                };

                const paragraph: Element = {
                    type: "element",
                    tagName: "p",
                    properties: {},
                    children: [prefixText, ...li.children],
                };

                newParagraphs.push(paragraph);
            }

            // Replace the original <ul> or <ol> with new <p> elements
            parent.children.splice(index, 1, ...newParagraphs);
        });
    };
};
