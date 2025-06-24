export default function TermPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-sm leading-6 text-neutral-300">
      <h1 className="text-2xl font-bold text-white mb-6">이용약관</h1>
      <p className="mb-4">
        본 약관은 Lesser UI(이하 "서비스")의 이용과 관련된 조건을 규정하며, 본
        서비스를 사용하는 모든 이용자는 본 약관에 동의하는 것으로 간주합니다.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-2">
        1. 서비스 개요
      </h2>
      <p className="mb-4">
        Lesser UI는 개발자 및 디자이너가 오픈소스 UI 요소를 생성, 공유, 열람할
        수 있는 플랫폼입니다.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-2">
        2. 계정 및 인증
      </h2>
      <p className="mb-4">
        본 서비스는 GitHub 또는 Google 계정을 통한 소셜 로그인만을 지원하며,
        Supabase Auth를 기반으로 인증을 관리합니다.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-2">
        3. 콘텐츠 업로드 및 라이선스
      </h2>
      <p className="mb-4">
        사용자가 업로드하는 모든 UI 요소는 자동으로 MIT 라이선스를 따르며,
        누구나 자유롭게 사용, 수정, 배포할 수 있습니다.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-2">
        4. 금지된 활동
      </h2>
      <ul className="list-disc list-inside mb-4">
        <li>타인의 권리를 침해하는 콘텐츠 업로드</li>
        <li>스팸 또는 자동화된 접근 시도</li>
        <li>서비스의 안정성을 해치는 행위</li>
      </ul>

      <h2 className="text-lg font-semibold text-white mt-8 mb-2">
        5. 커뮤니티 기능
      </h2>
      <p className="mb-4">
        좋아요, 북마크 등의 기능은 사용자 계정 기준으로 제공되며, 부정 행위 시
        제한될 수 있습니다.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-2">
        6. 면책 조항
      </h2>
      <p className="mb-4">
        사용자가 업로드한 콘텐츠로 인해 발생한 문제에 대해 서비스는 책임지지
        않습니다.
      </p>

      <h2 className="text-lg font-semibold text-white mt-8 mb-2">
        7. 약관 변경
      </h2>
      <p className="mb-8">
        본 약관은 예고 없이 변경될 수 있으며, 변경 시 사이트 내 공지를 통해
        안내됩니다.
      </p>
    </div>
  );
}
