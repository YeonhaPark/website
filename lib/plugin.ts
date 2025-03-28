// plugins/flattenListKeepPrefix.ts
import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Root, Element, Text } from "hast";

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
export const minifyWhitespaceBeforeTable: Plugin<[], Root> = () => {
    return (tree) => {
        visit(tree, "element", (node) => {
            if (node.tagName === "table") {
                node.children = node.children.filter(
                    (child) =>
                        !(child.type === "text" && /^\s*$/.test(child.value))
                );
                // thead, tbody 등 내부도 재귀 처리
                for (const section of node.children) {
                    if (section.type === "element") {
                        section.children = section.children.filter(
                            (child) =>
                                !(child.type === "text" && /^\s*$/.test(child.value))
                        );
                        for (const tr of section.children) {
                            if (tr.type === "element" && tr.tagName === "tr") {
                                tr.children = tr.children.filter(
                                    (child) =>
                                        !(child.type === "text" && /^\s*$/.test(child.value))
                                );
                            }
                        }
                    }
                }
            }
        });
    };
};