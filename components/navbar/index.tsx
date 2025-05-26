import Link from "next/link";
import LinkLogo from "../link-logo";
import NavbarDropDown from "./dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav
      id="header"
      className="bg-neutral-900 w-full h-16 sticky top-0 left-0
      flex justify-between items-center p-3 z-100"
    >
      <section className="flex gap-5 items-center">
        <LinkLogo />
        <NavbarDropDown />
      </section>
      <section className="flex gap-2 items-center *:font-semibold">
        <Link
          href="/login"
          scroll={false}
          className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 transition-colors font-semibold flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faPlus} className="text-white" />
          Create New
        </Link>
      </section>
    </nav>
  );
}
