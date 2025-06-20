import LoadingSpinner from "@/components/loader/loading-spinner";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function ElementDetailLoading() {
  return <LoadingSpinner text="UI 컴포넌트 불러오는 중..." />;
}

export function CommentSectionLoading() {
  return (
    <div>
      <p className="font-semibold text-lg flex items-center gap-2">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        Comments
      </p>
      <div className="space-y-3 mt-3 max-h-120 overflow-scroll">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full h-36 bg-neutral-700 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export function UserInfoLoading() {
  return (
    <div className="flex gap-3 items-center">
      <div className="size-14 rounded bg-neutral-600 animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="w-28 h-4 rounded-full bg-neutral-700 animate-pulse"></div>
        <div className="w-34 h-4 rounded-full bg-neutral-700 animate-pulse"></div>
      </div>
    </div>
  );
}

export function LicenseContainerLoading() {
  return (
    <div>
      <p className="font-semibold text-lg flex items-center gap-2">
        <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
        <span>MIT License</span>
      </p>
      <div
        className="max-w-lg w-full h-50 rounded-2xl overflow-auto p-3 px-5
        bg-neutral-700 animate-pulse break-words whitespace-pre-wrap mt-3"
      ></div>
    </div>
  );
}
