"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalWrapperProps {
  children: React.ReactNode; // 포탈로 렌더링할 자식 요소들
  selector?: string; // 포탈을 렌더링할 대상 DOM 선택자 (기본값: "#modal-root")
}

/**
 * PortalWrapper 컴포넌트
 *
 * React Portal을 사용해 children을 DOM의 특정 위치(selector)로 렌더링한다.
 * 일반적으로 모달, 알림창 등 레이아웃의 흐름을 벗어나야 하는 컴포넌트에 사용된다.
 *
 * 기본 selector는 "#modal-root"이며, 필요 시 다른 DOM ID도 지정할 수 있다.
 */
export default function PortalWrapper({
  children,
  selector = "#modal-root",
}: PortalWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const root = document.querySelector(selector);
  if (!root) return null;

  // 컴포넌트를 현재 컴포넌트 트리 밖의 DOM 노드에 렌더링할 수 있게 해주는 함수
  return createPortal(
    // 포탈로 보낼 JSX
    children,
    // JSX를 렌더링할지를 지정하는 DOM 요소
    root
  );
}
