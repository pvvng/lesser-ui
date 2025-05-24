"use client";
import { LanguageMode } from "@/types/core";
import { useEffect, useMemo, useRef, useState } from "react";
import createDOMPurify from "dompurify";

interface UseEditorProps {
  userHtml: string;
  userCss: string;
}

// XSS 방지를 위한 DOMPurify 옵션
const SANITIZE_OPTIONS = {
  // ALLOWED_ATTR: ["class", "href", "src", "alt", "title", "style"], // 허용할 옵션
  FORBID_TAGS: ["script", "iframe", "object", "embed"], // 제거할 태그
  FORBID_ATTR: ["onerror", "onclick", "onload"], // 이벤트 핸들러
};

export default function useEditor({ userHtml, userCss }: UseEditorProps) {
  /** 현재 코드 모드 (HTML 또는 CSS) */
  const [nowMode, setNowMode] = useState<LanguageMode>("CSS");
  /** 사용자 입력 코드 상태 */
  const [htmlCode, setHtmlCode] = useState(userHtml);
  const [cssCode, setCssCode] = useState(userCss);
  /** 코드 카피 추적 플래그 */
  const [isCopied, setIsCopied] = useState(false);
  /** DOMPurify 인스턴스를 저장할 ref (초기 1회만 생성) */
  const DOMPurify = useRef<ReturnType<typeof createDOMPurify>>(null);
  /** DOMPurify 준비 완료 추적 플래그 */
  const [isPurifierReady, setIsPurifierReady] = useState(false);

  /** DOMPurify 초기화 */
  useEffect(() => {
    if (typeof window !== "undefined") {
      DOMPurify.current = createDOMPurify(window);
      setIsPurifierReady(true); // 플래그 변경
    }
  }, []);

  /** **sanitize된 코드로 변환된 미리보기 HTML string**
   *
   * useMemo로 code 변경 및 DOMPurify의 변경이 없으면 캐싱된 값 사용
   */
  const previewCode = useMemo(() => {
    const purifier = DOMPurify.current;
    if (!purifier || !isPurifierReady) return "";
    const safeHtml = purifier.sanitize(htmlCode, SANITIZE_OPTIONS);
    const safeCss = purifier.sanitize(cssCode, SANITIZE_OPTIONS);

    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }
      button {
        font-family: inherit;
      }
      ${safeCss}
    </style>
  </head>
  <body>
    ${safeHtml}
  </body>
</html>`;
  }, [htmlCode, cssCode, isPurifierReady]);

  /** 현재 선택된 모드의 코드 반환 함수 */
  const getCurrentCode = () => (nowMode === "HTML" ? htmlCode : cssCode);

  /** 현재 모드에 맞는 코드 업데이트 함수 */
  const setCurrentCode = (value: string) => {
    nowMode === "HTML" ? setHtmlCode(value) : setCssCode(value);
  };

  /** 코드 편집 모드 변경 함수 */
  const changeLangaugeMode = (mode: LanguageMode) => setNowMode(mode);

  /** 코드 카피 함수 */
  const handleCopy = async () => {
    const text = getCurrentCode();
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      // 2초 뒤 플래그 변경
      const cancelId = setTimeout(() => {
        setIsCopied(false);
      }, 1500);

      return () => clearTimeout(cancelId);
    } catch (e) {
      console.error("복사 실패:", e);
    }
  };

  return {
    nowMode,
    previewCode,
    isCopied,
    getCurrentCode,
    setCurrentCode,
    changeLangaugeMode,
    handleCopy,
  };
}
