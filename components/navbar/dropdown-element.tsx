"use client";

import { menuItems } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface DropdownElementProps {
  closeDropdown?: () => void;
}

export function DropdownElement({ closeDropdown }: DropdownElementProps) {
  const getTagLink = (link: string | null) => {
    const tagLink = "/elements";
    if (!link) return tagLink;
    return `${tagLink}?tag=${link}`;
  };

  return menuItems.map((item) => (
    <li key={item.label} role="none">
      <Link
        href={getTagLink(item.link)}
        role="menuitem"
        className="p-3 rounded flex gap-2 items-center text-sm font-semibold 
        bg-neutral-700 hover:bg-neutral-600 transition-colors"
        onClick={closeDropdown}
      >
        <FontAwesomeIcon icon={item.icon} />
        <span>{item.label}</span>
      </Link>
    </li>
  ));
}
