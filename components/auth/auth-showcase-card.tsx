import FloatingDotsGrid from "../floating-dot-grid";
import LinkLogo from "../link-logo";
import SocialLoginButtons from "./login-buttons";

export default function AuthShowcaseCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl">
      <FloatingDotsGrid />
      <div className="w-full p-10 *:z-1 bg-neutral-950 flex flex-col gap-8 items-center text-center">
        <LinkLogo size="3xl" />
        <div className="space-y-5">
          <p className="font-bold text-xl">
            같이 만드는 UI, 같이 나누는 디자인
          </p>
          <div className="text-sm">
            <p>Lesser UI에 당신의 감각을 더해보세요.</p>
            <p>
              수많은 개발자·디자이너와 함께 UI 블럭을 만들고, 영감을 주고받는
              커뮤니티에 참여할 수 있어요.
            </p>
          </div>
          <ul className="text-xs text-gray-400 space-y-2 mx-auto mt-7">
            <li>
              <span className="text-green-500">✓</span> 무제한으로 UI 블럭을
              제작하고 공유할 수 있어요.
            </li>
            <li>
              <span className="text-green-500">✓</span> 다양한 디자인에서
              아이디어를 얻어보세요.
            </li>
            <li>
              <span className="text-green-500">✓</span> 함께 성장하는 제작자
              커뮤니티에 참여해보세요.
            </li>
          </ul>
        </div>
        <SocialLoginButtons />
      </div>
    </div>
  );
}
