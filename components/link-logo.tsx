import { faClover } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface LinkLogoProps {
  size?: "xl" | "2xl" | "3xl";
}

export default function LinkLogo({ size = "xl" }: LinkLogoProps) {
  const sizeMap = {
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
  };

  return (
    <Link
      href="/"
      className={`${sizeMap[size]} font-partial flex gap-0.5 items-center`}
    >
      <span>LESSER</span>
      <span className="text-green-500">UI</span>
      <FontAwesomeIcon icon={faClover} className="text-green-500" />
    </Link>
  );
}
