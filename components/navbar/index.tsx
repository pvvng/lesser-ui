import Link from "next/link";
import LinkLogo from "../link-logo";
import NavbarDropDown from "./dropdown";

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
        <Link href="/login">로그인</Link>
        <span>/</span>
        <Link href="/register">회원가입</Link>
      </section>
    </nav>
  );
}
