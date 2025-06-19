import {
  faBook,
  faBrush,
  faCircleDot,
  faCircleInfo,
  faFile,
  faKeyboard,
  faSpinner,
  faSquareCaretRight,
  faSquareCheck,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";

/** XSS 방지를 위한 DOMPurify 옵션 */
export const SANITIZE_OPTIONS = {
  // ALLOWED_ATTR: ["class", "href", "src", "alt", "title", "style"], // 허용할 옵션
  FORBID_TAGS: ["script", "iframe", "object", "embed"], // 제거할 태그
  FORBID_ATTR: ["onerror", "onclick", "onload"], // 이벤트 핸들러
};

/** menu nav item */
export const menuItems = [
  { icon: faBook, label: "All", link: null },
  { icon: faSquareCaretRight, label: "Buttons", link: "buttons" },
  { icon: faSquareCheck, label: "Check Boxes", link: "check-boxes" },
  { icon: faToggleOn, label: "Toggle Switches", link: "toggle-switches" },
  { icon: faFile, label: "Cards", link: "card" },
  { icon: faSpinner, label: "Loaders", link: "loaders" },
  { icon: faKeyboard, label: "Inputs", link: "inputs" },
  { icon: faCircleDot, label: "Radio Buttons", link: "radio-buttons" },
  { icon: faCircleInfo, label: "Tooltips", link: "tooltips" },
] as const;

/** tag item과 icon */
export const tagItems = [
  { icon: faSquareCaretRight, tag: "buttons" },
  { icon: faSquareCheck, tag: "check-boxes" },
  { icon: faToggleOn, tag: "toggle-switches" },
  { icon: faFile, tag: "card" },
  { icon: faSpinner, tag: "loaders" },
  { icon: faKeyboard, tag: "inputs" },
  { icon: faCircleDot, tag: "radio-buttons" },
  { icon: faCircleInfo, tag: "tooltips" },
] as const;

/** tag set */
export const tagSet: Set<string> = new Set(tagItems.map((item) => item.tag));
