import Link from "next/link";
import LinkLogo from "./link-logo";

export default function Footer() {
  return (
    <footer className="border-t-2 border-neutral-600 mt-10 px-5 pt-10 pb-20">
      <div className="flex gap-15">
        <div className="space-y-1">
          <LinkLogo />
          <p className="text-sm text-neutral-400">
            © 2025{" "}
            <Link
              href="https://github.com/pvvng"
              target="_blank"
              className="underline"
            >
              pvvng
            </Link>
          </p>
        </div>
        <section>
          <div>
            <p className="font-extrabold mb-2">정보</p>
            <ul className="space-y-1 text-sm *:hover:text-green-500 *:transition-colors">
              <li>
                <Link href="/term">이용약관</Link>
              </li>
              <li>
                <Link href="/privacy">개인정보 보호 정책</Link>
              </li>
            </ul>
          </div>
          <div></div>
        </section>
      </div>
    </footer>
  );
}
