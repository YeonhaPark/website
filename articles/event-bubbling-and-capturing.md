---
title: Event Bubbling and Capturing
date: 2023-01-03
description: What is the difference between event.target and event.currentTarget?
---

### Event Bubbling

Event bubbling occurs when an event is triggered on an element, and instead of stopping there, **the event propagates up to the parent elements, triggering their event handlers as well**. This means that the event "bubbles up" through the DOM tree. The bubbling process continues until it reaches the topmost parent element.

### Does Event Bubbling Occur for All Events?

Whether an event bubbles up depends on its [bubbles property](https://developer.mozilla.org/en-US/docs/Web/API/Event/bubbles). Not all events exhibit bubbling behavior, but **most events do, except for certain ones like `focus` events**.

```html
<style>
  body * {
    margin: 10px;
    border: 1px solid blue;
  }
</style>

<form onclick="alert('form')">
  FORM
  <div onclick="alert('div')">
    DIV
    <button onclick="alert('button')">BUTTON</button>
  </div>
</form>
```

1. The `onclick` handler assigned to the `button` tag is executed.
2. The `onclick` handler assigned to the `div` tag is executed.
3. The `onclick` handler assigned to the `form` tag is executed.
4. The event continues to bubble up until it reaches the `document` object.

### `event.target` vs. `event.currentTarget`

- `event.target` refers to the exact element where the event occurred, providing information about **where** the event was triggered.
- `event.currentTarget` (or `this`) refers to the element to which the event handler is attached, regardless of where the event actually occurred.

### Why Does `event.currentTarget` Become `null` in Asynchronous Console Logs?

[Live Example on CodeSandbox](https://codesandbox.io/s/long-rain-p5ml1?file=/src/index.js:0-383)

```jsx
import './styles.css';

const form = document.querySelector('form');

form.onclick = handleClick;

function handleClick(event) {
  event.preventDefault();

  console.log(event.currentTarget); // <form ...>... </form>
  setTimeout(() => {
    console.log('settimeout:', event.currentTarget); // null
    alert('target = ' + event.target.tagName + ', this=' + this.tagName);
  }, 0);
}
```

`currentTarget` is only accessible **while the event is being handled**. In an asynchronous call, the event has already completed, causing `event.currentTarget` to be lost.

### When Is `event.currentTarget` Useful?

A common use case is handling modal overlays. For example, when clicking outside a modal, we want to close it. However, if the user clicks **inside** the modal, it should remain open. By checking `event.target`, we can determine whether the click occurred inside the modal and prevent it from closing in that case.

```jsx
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from '../Modal';

export const ModalExample: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOverlayClick = (e: MouseEvent) => {
      if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOverlayClick);
    return () => document.removeEventListener('click', handleOverlayClick);
  }, [isOpen]);

  return (
    <Container>
      {isOpen && <ModalOverlay />}
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <Modal ref={ref} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const ModalOverlay = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;
```

### Stopping Event Bubbling

Since bubbling continues up the DOM tree until it reaches the `document` object, it can be stopped using `event.stopPropagation()`, which prevents the event from bubbling up further.

### Difference Between `event.stopPropagation()` and `event.stopImmediatePropagation()`

- `stopPropagation()` prevents the event from bubbling up to parent elements.
- `stopImmediatePropagation()` stops the bubbling **and** prevents other event handlers on the same element from executing.

Example:

```html
<div class="container">
  <h1># stopPropagation</h1>
  <div class="parent">
    <h3>parent</h3>
    <div class="child">
      <h3>child</h3>
      <div class="grand-child">
        <h3>grand child</h3>
      </div>
    </div>
  </div>
</div>
```

```jsx
function sayBye(event) {
  alert(`Bye`);
}

function sayHey(event) {
  alert('Hey');
  event.stopImmediatePropagation(); // Compare with event.stopPropagation()
}

const grandChild = document.querySelector('.grand-child');
grandChild.addEventListener('click', sayHey);
grandChild.addEventListener('click', sayBye);
```

With `stopImmediatePropagation()`, only `sayHey` will execute, while `sayBye` will be ignored.

### Event Capturing

There are three phases in the standard event flow:

1. **Capturing Phase** – The event moves down the DOM tree towards the target.
2. **Target Phase** – The event reaches the target element.
3. **Bubbling Phase** – The event bubbles up the DOM tree.

![How Event Moves](/articles/how-event-moves.png)
<figcaption align="center">Source: https://javascript.info/bubbling-and-capturing</figcaption>  

By default, event handlers listen during the **bubbling phase**, meaning they trigger **after** the event reaches the target.

To listen during the **capturing phase**, set `{ capture: true }` in `addEventListener()`:

```jsx
elem.addEventListener("click", handler, { capture: true });
// This is the same as:
elem.addEventListener("click", handler, true);
```

---

