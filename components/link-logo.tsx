import { faClover } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function LinkLogo() {
  return (
    <Link href="/" className="text-xl font-partial flex gap-0.5 items-center">
      <span>LESSER</span>
      <span className="text-green-500">UI</span>
      <FontAwesomeIcon icon={faClover} className="text-green-500" />
    </Link>
  );
}
