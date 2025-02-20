---
title: Improving Slow Performance of React-table Using React Virtuoso
date: 2023-06-10
description: Enhance React-table's performance by using virtualization techniques to reduce excessive rendering
---

React Table is a useful library for rendering tables, offering various APIs and features such as useRowSelect for row-level data selection and checkboxes. These functionalities make it a great choice for handling diverse table interactions.

However, while using React Table in a project, I encountered some drawbacks. The project fetches data, processes it in multiple ways, and renders it using React Table while providing users with various interactive features. Since a single table contained numerous functionalities, performance degradation became significantly noticeable even for regular users. The product being developed implements infinite scrolling, initially loading 50 items and appending 50 more with each subsequent fetch request. As a result, the number of rendered rows increased exponentially with every fetch, causing a severe decline in loading speed proportional to the list size.

A significant factor contributing to this performance degradation is React Table’s rendering mechanism. Even if a user clicks on a single cell, all rows in the table re-render. React Table explains this behavior as an intentional mechanism to keep all cells in sync rather than an issue that needs fixing.

![react-table only](/articles/react-table-only.png)
https://github.com/TanStack/table/issues/1496

To demonstrate how React Table works, I created an example using CodeSandbox. By enabling the rerender highlight feature in the React DevTools Profiler tab, you can observe the behavior.


https://codesandbox.io/s/react-table-only-v74rko

Although the table's height is set to 400px, all fetched data is rendered, consuming resources even for areas that are not visible on the screen. When using the Cell property to process data inside React Table's columns, every cell is included in the re-rendering process, making the issue more pronounced.

Due to this behavior, React Table itself suggests using virtualization techniques such as react-window as an alternative on its official documentation. (https://react-table-v7.tanstack.com/docs/examples/virtualized-rows)

List Virtualization:

List virtualization, also known as windowing, is a technique that renders only the portion of the list that is visible to the user.

Since react-window does not support <table> elements, I opted for react-virtuoso instead.

By using react-virtuoso, only the rows within the specified height are rendered, and any elements beyond the viewport are not rendered at all. Even when the number of items exceeds 1000 or 2000, the number of rendered rows remains constant within the visible area. This makes it highly effective for optimizing performance when rendering large datasets. In my case, while the dataset itself was not massive, each table cell (<td>) contained complex logic and UI components, making performance optimization crucial. By implementing virtualization with react-virtuoso, I successfully mitigated the issue where infinite scrolling caused a slowdown as the number of pages increased.

https://codesandbox.io/s/react-table-with-react-virtuoso-hgps2p?file=/src/Table.js

For more details on using React Table and react-virtuoso, refer to the attached CodeSandbox links.

References:

https://web.dev/virtualize-long-lists-react-window/

