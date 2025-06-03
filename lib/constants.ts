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

// TODO: tag set 만들기 + tag Enum 만들기

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
  { icon: faTableList, label: "Form", link: "form" },
  { icon: faBrush, label: "Patterns", link: "patterns" },
  { icon: faCircleInfo, label: "Tooltips", link: "tooltips" },
  { icon: faBookmark, label: "Favorites", link: "favorites" },
] as const;

export const exampleCode = {
  userHtml: `<!-- This is just an example. Feel free to delete and create your own element! -->
<button class="clover-button">
  🍀 Lesser UI
</button>
`,
  userCss: `/* This is just an example. Feel free to delete and create your own element! */
.clover-button {
  color: #22c55e;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.clover-button:hover {
  color: white;
  transform: scale(1.05);
  background-color: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.3);
}
`,
};
