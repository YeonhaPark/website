---
title: Optimizing React Hook Form Rendering Performance
date: 2023-07-17
description: React Hook Form Optimization
---

I work with forms that include various types of input and select tags, and like many developers, I am very thankful for the `react-hook-form` library. One of the main advantages of React Hook Form is that it works based on `ref`, which means it does not trigger re-renders every time, thus providing good performance and a smooth user experience. Unfortunately, when input A and input B are filled, and the result C of A x B needs to be inserted into input C, we cannot track this with just the `ref`. We would need to either watch or perform logic on every `onChange` event (From here on, I will refer to input elements like input, select, and textarea as `input` elements).

The `watch` API monitors specific elements every time an interaction happens, and React users depend on these elements in `useEffect` dependencies to update information and trigger re-renders based on user input. The problem with this is that whenever a change occurs in any input element being watched, **all items** within the form's scope will be re-rendered. If there are dozens of input text fields and checkboxes on the same screen, you can easily realize that your application's response speed will be slow without even opening the developer tools, simply because **each input element re-renders** every time the user types in an input field. (Generally, if one keyboard input event takes more than 50ms, it's objectively considered slow.)

[watch API](https://react-hook-form.com/docs/useform/watch)

### The Alternative is `useWatch`
If your service contains dozens of input elements on a single page, you can use `useWatch` to reduce the headache of excessive re-renders. The functionality of `useWatch` is the same as `watch`, but the key difference is that `useWatch` triggers re-renders at the component level, which can significantly improve performance by preventing the entire form from re-rendering. The syntax changes slightly, as shown below.

```js
const firstName = watch('firstName')

const [strawberry, banana, apple] = watch(['strawberry', 'banana', 'apple'])
```

```js
const firstName = useWatch({name: 'firstName'})

const [strawberry, banana, apple] = useWatch({name: ['strawberry', 'banana', 'apple']})
```

When using `watch`, all areas of the form are re-rendered as shown below, but with `useWatch`, only the specific components where `useWatch` is used will re-render.

![watch usage](/articles/before.png)

![useWatch usage](/articles/after.png)


<div>
    <a href="https://codesandbox.io/s/react-hook-form-performance-improvement-rhz425?file=/src/PersonalInfo.js" target="_blank" rel="noopener noreferrer">Check it out on CodeSandbox </a>
</div>


While several teammates are working on the same page and components, the `watch` API provided an easier way to track and trigger inputs. However, `watch` triggers the entire inputs sharing the same `FormProvider`.
Our page wasn't atomic, and some input components were made with some unrecognizable names and unused props, mostly added by each developer fixing bugs or adding small functions week by week.

### `onChange` Callback
Improving performance isn't only about using `useWatch`. The difference between `useWatch` and `watch` is that `useWatch` triggers re-renders at the component level, but it still triggers re-renders for all input elements within its scope. Ideally, the best approach is to trigger re-renders only for the input element where user interaction occurs or to avoid triggering re-renders altogether. The `onChange` callback provided by the [register](https://react-hook-form.com/docs/useform/register) API allows you to subscribe to change events, and using it enables you to set values for other input elements via `setValue` without triggering a re-render.

<div align="center">
<video width="600" height="560" controls>
  <source src="/articles/norender.mov" type="video/mp4">
</video>
<figcaption align="center">
<small>Change events of select elements do not trigger re-renders.</small>
</figcaption></div>

As a result, unnecessary `watch` calls were refactored to use the `onChange` callback of the `register` API or the `onChange` of `Controller`. Where using `useWatch` was unavoidable due to complex component control with multiple dependencies, we switched to `useWatch` and achieved over 50% optimization in interaction performance. While it’s true that I often work without enough time, users of my service don't consider that. When writing code, I need to be aware of how the functions I use, or the APIs of libraries, work at least in terms of how they behave.