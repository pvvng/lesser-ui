import createDOMPurify from "dompurify";
import { SANITIZE_OPTIONS } from "../constants";

interface GeneratePreviewCodeProps {
  html: string;
  css: string;
}

/** preview code 생성 함수 */
export function generatePreviewCode({
  html,
  css,
}: GeneratePreviewCodeProps): string {
  if (typeof window === "undefined") return "";

  const DOMPurify = createDOMPurify(window);
  const safeHtml = DOMPurify.sanitize(html, SANITIZE_OPTIONS);
  const safeCss = DOMPurify.sanitize(css, SANITIZE_OPTIONS);

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
}
