import ImageEditOverlay from "./image-edit-overlay";

interface ImageInputLabelProps {
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function ImageInputLabel({
  preview,
  onImageChange,
}: ImageInputLabelProps) {
  return (
    <div>
      <label
        htmlFor="avatar"
        className="relative size-42 rounded-full -mt-21 mx-auto bg-neutral-200 group z-10 overflow-hidden
        flex flex-col items-center justify-center text-neutral-600 cursor-pointer bg-center bg-cover"
        style={{ backgroundImage: `url(${preview})` }}
      >
        <ImageEditOverlay />
        {!preview && <p className="text-sm">이미지 없음</p>}
      </label>
      <input
        name="avatar"
        type="file"
        id="avatar"
        className="hidden"
        // 이미지만 받기
        accept="image/*"
        onChange={onImageChange}
      />
    </div>
  );
}
