"use client";

import gsap from "gsap";
import { menuItems } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarDropDown() {
  const [show, setShow] = useState(false);
  const gridRef = useRef<HTMLUListElement>(null);
  // dropdown nav 감지 ref
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // toggle function
  const toggleMenu = () => setShow((prev) => !prev);

  // dropdown 이외 부분 클릭시 dropdown 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        show &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  // path 변경시 dropdown 닫기
  useEffect(() => {
    setShow(false);
  }, [pathname]);

  // link 요소 애니메이션
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
    <div ref={containerRef} className="relative">
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
            <DropdownElement />
          </ul>
        </nav>
      )}
    </div>
  );
}

function DropdownElement() {
  return menuItems.map((item) => (
    <li key={item.label} role="none">
      <Link
        href={`/${item.link}`}
        role="menuitem"
        className="p-3 rounded flex gap-2 items-center
        text-sm font-semibold bg-neutral-700 hover:bg-neutral-600 transition-colors"
      >
        <FontAwesomeIcon icon={item.icon} />
        <span>{item.label}</span>
      </Link>
    </li>
  ));
}
