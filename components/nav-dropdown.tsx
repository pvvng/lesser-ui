"use client";

import gsap from "gsap";
import {
  faAngleDown,
  faAngleUp,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const dropdownItems = [
  { icon: faBook, label: "All" },
  { icon: faSquareCaretRight, label: "Buttons" },
  { icon: faSquareCheck, label: "Check Boxes" },
  { icon: faToggleOn, label: "Toggle Switches" },
  { icon: faFile, label: "Cards" },
  { icon: faSpinner, label: "Loaders" },
  { icon: faKeyboard, label: "Inputs" },
  { icon: faCircleDot, label: "Radio Buttons" },
  { icon: faTableList, label: "Form" },
  { icon: faBrush, label: "Patterns" },
  { icon: faCircleInfo, label: "Tooltips" },
  { icon: faBookmark, label: "Favorites" },
];

export default function NavbarDropDown() {
  const [show, setShow] = useState(false);
  const gridRef = useRef<HTMLUListElement>(null);

  // toggle function
  const toggleMenu = () => setShow((prev) => !prev);

  // label url link 형식으로 변경
  const getLinkLabel = (label: string) => {
    return label.toLowerCase().replaceAll(" ", "-");
  };

  useEffect(() => {
    if (show && gridRef.current) {
      // grid box의 childrens (list items)
      const items = Array.from(gridRef.current.children);
      // 각 item에 animation 적용
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.8, y: 10 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.3,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [show]);

  return (
    <div className="relative">
      <div
        role="button"
        aria-haspopup="menu"
        aria-expanded={show}
        aria-controls="dropdown-menu"
        onClick={toggleMenu}
        className="ml-5 flex gap-1 items-center font-semibold cursor-pointer"
      >
        <FontAwesomeIcon icon={show ? faAngleUp : faAngleDown} />
        <span>Elements</span>
      </div>

      {show && (
        <nav className="absolute top-full mt-5 left-5 bg-neutral-800 p-3 rounded z-50 shadow-2xl">
          <ul
            ref={gridRef}
            aria-label="컴포넌트 탐색 메뉴"
            className="w-xl grid grid-cols-3 gap-2"
          >
            {dropdownItems.map((item) => (
              <li key={item.label} role="none">
                <Link
                  href={`/elements/${getLinkLabel(item.label)}`}
                  role="menuitem"
                  className="p-2 rounded flex gap-2 items-center
                text-sm bg-neutral-700 hover:bg-neutral-600 transition-colors"
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
