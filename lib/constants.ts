import {
  faBook,
  faBookmark,
  faBrush,
  faCircleDot,
  faCircleInfo,
  faFile,
  faKeyboard,
  faSpinner,
  faSquareCaretRight,
  faSquareCheck,
  faTableList,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";

/** menu nav item */
export const menuItems = [
  { icon: faBook, label: "All", link: "elements" },
  { icon: faSquareCaretRight, label: "Buttons", link: "buttons" },
  { icon: faSquareCheck, label: "Check Boxes", link: "check-boxes" },
  { icon: faToggleOn, label: "Toggle Switches", link: "toggle-switches" },
  { icon: faFile, label: "Cards", link: "card" },
  { icon: faSpinner, label: "Loaders", link: "loaders" },
  { icon: faKeyboard, label: "Inputs", link: "inputs" },
  { icon: faCircleDot, label: "Radio Buttons", link: "radio-buttons" },
  { icon: faTableList, label: "Form", link: "form" },
  { icon: faBrush, label: "Patterns", link: "patterns" },
  { icon: faCircleInfo, label: "Tooltips", link: "tooltips" },
  { icon: faBookmark, label: "Favorites", link: "favorites" },
] as const;
