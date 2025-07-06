---
title: Next.js 15에서 Hydration Error 이해와 해결
date: 2025-07-06
description: 서버-클라이언트 렌더링 불일치와 useEffect를 활용한 모달 구현
---

Next.js 15(App Router)에서 모달 같은 동적 UI를 구현할 때, hydration error는 흔히 마주치는 문제입니다. 이 오류는 서버와 클라이언트 간 렌더링 결과가 달라 발생하며, 특히 클라이언트 전용 로직(예: 상태 관리, 브라우저 API)을 다룰 때 두드러집니다. 이 글에서는 hydration error의 원인, 발생 예제, 그리고 ModalProvider와 useEffect를 사용해 이를 해결하는 방법을 Next.js 15 기준으로 자세히 설명합니다.

### Hydration Error란?

Next.js 15에서 hydration은 서버에서 렌더링된 HTML(SSR 또는 SSG)을 클라이언트에서 React가 동기화하여 동적인 UI로 만드는 과정입니다. 하지만 서버와 클라이언트의 렌더링 결과가 다르면 hydration error가 발생합니다. 이는 React가 클라이언트에서 서버 HTML과 동일한 DOM 트리를 기대하는데, 실제 DOM이 달라지면서 오류가 나타나는 경우입니다.

```
Warning: Text content did not match. Server: "" Client: "Modal Content"
Hydration failed because the initial UI does not match what was rendered on the server.
```

Hydration error는 모달처럼 클라이언트에서 동적으로 렌더링되는 컴포넌트에서 자주 발생합니다. 예를 들어, 모달의 표시 여부가 클라이언트 상태에 따라 결정되거나, document 같은 브라우저 API를 사용할 때 문제가 됩니다.

### Hydration Error가 발생하는 예제

다음은 모달 구현에서 hydration error를 유발하는 잘못된 코드입니다:

```typescript
// components/Modal.tsx

import { useState } from "react";

export const Modal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false); // 클라이언트 상태

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {children}
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
    </>
  );
};
```

```typescript
// app/page.tsx
import { Modal } from "../components/Modal";

export default function Home() {
  return (
    <div>
      <h1>My App</h1>
      <Modal>
        <p>Modal Content</p>
      </Modal>
    </div>
  );
}
```

- 서버 렌더링: Next.js 15는 서버에서 Modal 컴포넌트를 렌더링합니다. useState의 초기값으로 isOpen: false이므로, 서버는 빈 HTML(<></>)과 <button>Open Modal</button>만 생성합니다.
- 클라이언트 렌더링: 클라이언트에서 Modal이 마운트된 후, 상태가 동적으로 변경(예: setIsOpen(true))되면 모달 HTML(`<div className="modal">...</div>`)이 렌더링됩니다. 이렇게되면 서버에서 생성된 빈 HTML과 클라이언트에서 생성된 모달 HTML이 달라 hydration error가 발생합니다. 또한 모달이 ReactDOM.createPortal이나 document.getElementById 같은 브라우저 API를 사용하면, 서버에서 실행되지 않아 추가적인 불일치를 초래할 수 있습니다.

### 왜 서버 렌더링 시 useEffect가 실행되지 않는가?

useEffect는 hydration error를 해결하는 데 핵심적인 역할을 합니다. 그 이유는 <b>서버 렌더링 시 useEffect가 실행되지 않기 때문입니다.</b>

useEffect는 클라이언트 측에서만 실행되는 React 훅으로, 컴포넌트가 마운트된 후 또는 의존성 배열이 변경될 때 호출됩니다.
서버 렌더링(SSR/SSG)은 Node.js 환경에서 JSX를 HTML로 변환하는 과정으로, render 단계만 실행됩니다. useEffect, useLayoutEffect 같은 클라이언트 전용 훅은 서버에서 호출되지 않습니다.
이유: 서버에는 window, document 같은 DOM API가 없으며, React의 클라이언트 측 라이프사이클(마운트, 업데이트, 언마운트)이 동작하지 않습니다.

Next.js 15(App Router)에서 SSR(getServerSideProps) 또는 SSG(getStaticProps)는 서버에서 컴포넌트를 렌더링하여 초기 HTML을 생성합니다.
이 과정에서 useEffect는 무시되며, 클라이언트로 HTML이 전송된 후 hydration 단계에서 useEffect가 처음 실행됩니다.
이는 클라이언트 전용 로직(예: 상태 관리, 브라우저 API 호출)을 서버 렌더링에서 제외하여 불일치를 방지하는 데 유용합니다.

### Hydration Error 해결: ModalProvider

hydration error를 방지하려면 클라이언트에서만 모달 콘텐츠를 렌더링해야 합니다. 이를 해결하는 ModalProvider는 다음과 같습니다:

```typescript
// components/ModalProvider.tsx
"use client";

import { useEffect, useState } from "react";

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 관리 (예시)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // 서버 렌더링 시 아무것도 렌더링하지 않음
  }

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            {children}
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
    </>
  );
};
```

동작 원리:

"use client": Next.js 15의 App Router에서 컴포넌트를 클라이언트 전용으로 지정하여 서버 렌더링 시 클라이언트 전용 로직(예: useState)을 실행하지 않습니다.
useEffect와 isMounted:
서버 렌더링 시 useEffect는 실행되지 않으므로 isMounted는 false를 유지합니다.
따라서 return null이 실행되어 서버에서 HTML을 생성하지 않습니다.
클라이언트에서 컴포넌트가 마운트되면 useEffect가 setIsMounted(true)를 호출해 모달 콘텐츠를 렌더링합니다.

효과: 서버와 클라이언트 간 HTML 불일치를 방지하여 hydration error를 해결합니다.

### 왜 효과적인가?:

- 서버 렌더링 시 아무 HTML도 생성하지 않아 불일치 가능성을 제거합니다.
- useEffect가 클라이언트에서만 실행되므로, 클라이언트 전용 로직(예: 상태 관리, document API)을 안전하게 처리합니다.
- Next.js 15의 최적화된 렌더링 파이프라인과 호환됩니다.

### ModalProvider를 페이지에서 사용하는 방법:

```typescript
// app/page.tsx
import { ModalProvider } from "../components/ModalProvider";

export default function Home() {
  return (
    <div>
      <h1>My App</h1>
      <ModalProvider>
        <p>Modal Content</p>
      </ModalProvider>
    </div>
  );
}
```

ModalProvider는 모달의 표시 여부를 관리하며, 서버 렌더링 시 null을 반환해 hydration error를 방지합니다.

클라이언트에서만 모달 콘텐츠를 렌더링하므로 안정적입니다.

### 대안: 동적 임포트

Next.js 15에서는 next/dynamic을 사용해 클라이언트에서만 컴포넌트를 로드하는 방법도 효과적입니다:

```typescript
// app/page.tsx
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("../components/Modal"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>My App</h1>
      <Modal>
        <p>Modal Content</p>
      </Modal>
    </div>
  );
}
```

{ ssr: false }는 서버 렌더링을 비활성화하여 클라이언트에서만 컴포넌트를 로드합니다.

이 방식은 ModalProvider의 isMounted 패턴과 동일한 효과를 제공하며, 코드가 더 간결할 수 있습니다.

### 결론

Next.js 15에서 hydration error는 서버와 클라이언트 간 렌더링 불일치로 발생하며, 모달처럼 클라이언트 전용 로직에 의존하는 컴포넌트에서 흔히 나타납니다. ModalProvider는 "use client"와 useEffect를 활용해 서버 렌더링 시 HTML을 생성하지 않도록 하여 오류를 방지합니다. useEffect가 서버에서 실행되지 않는 특성은 클라이언트 전용 로직을 안전하게 처리하는 데 핵심적인 역할을 합니다. 대안으로 next/dynamic을 사용하면 간단히 동일한 효과를 얻을 수 있습니다.

이 패턴을 적용하면 Next.js 15에서 안정적이고 효율적인 모달을 구현할 수 있습니다.
