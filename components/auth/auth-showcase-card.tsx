import FloatingDotsGrid from "../floating-dot-grid";
import LinkLogo from "../link-logo";
import SocialLoginButtons from "./login-buttons";

export default function AuthShowcaseCard() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl">
      <FloatingDotsGrid />
      <div className="w-full p-10 *:z-1 bg-neutral-950 flex flex-col gap-8 items-center text-center">
        <LinkLogo size="3xl" />
        <div className="space-y-5">
          <p className="font-bold text-xl">Join The Community</p>
          <p className="text-lg">
            Create beautiful UI elements and share them with 100,000+ developers
          </p>
          <ul className="text-sm text-gray-400 space-y-2 mx-auto">
            <li>
              <span className="text-green-500">✓</span> Create and share
              unlimited UI elements
            </li>
            <li>
              <span className="text-green-500">✓</span> Get inspiration from
              thousands of designs
            </li>
            <li>
              <span className="text-green-500">✓</span> Join a thriving
              community of creators
            </li>
          </ul>
        </div>
        <SocialLoginButtons />
      </div>
    </div>
  );
}
