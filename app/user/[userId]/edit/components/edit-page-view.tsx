"use client";

import { editUserdata, getUploadUrl } from "@/app/user/[userId]/edit/actions";
import FormButton from "@/components/form/form-button";
import ErrorMap from "@/components/error-map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useActionState, useState } from "react";

const MAX_FILE_SIZE_MB = 2;

interface EditUserdataViewProps {
  avatar: string | null;
  nickname: string;
  userId: string;
}

export default function EditUserdataView({
  avatar,
  nickname,
  userId,
}: EditUserdataViewProps) {
  const [preview, setPreview] = useState<string | null>(avatar);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length == 0) {
      // 취소버튼 클릭하면 초기화 시켜야함
      setPreview(null);
      setImageId(null);
      return;
    }

    const file = files[0];

    if (!file.type.startsWith("image")) {
      return alert("이미지 파일만 업로드 할 수 있습니다.");
    }

    if (MAX_FILE_SIZE_MB < file.size / (1024 * 1024)) {
      return alert(
        `최대 ${MAX_FILE_SIZE_MB}MB의 이미지만 업로드 할 수 있습니다.`
      );
    }

    const url = URL.createObjectURL(file);
    setPreview(url);

    const { success, result } = await getUploadUrl();

    if (!success) {
      return alert("이미지 업로드에 실패했습니다.");
    }

    const { id, uploadURL } = result;
    setUploadUrl(uploadURL);
    setImageId(id);
  };

  const interceptAction = async (_: unknown, formData: FormData) => {
    formData.set("userId", userId);

    // 이미지에 변화가 없을때
    if (preview === avatar) {
      formData.set("avatar", preview || "");

      return editUserdata(_, formData);
    }

    // upload image
    const file = formData.get("avatar");

    if (!file || !uploadUrl) {
      return alert("이미지를 확인하지 못했습니다.");
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);

    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });

    if (response.status !== 200) {
      alert("이미지 업로드에 실패했습니다. 새로고침 후 다시 시도해주세요.");
      return;
    }

    // replace photo in formdata
    const accountHash = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
    const photoUrl = `https://imagedelivery.net/${accountHash}/${imageId}/public`;
    formData.set("avatar", photoUrl);

    // call uploadProduct Action
    return editUserdata(_, formData);
  };

  const [state, action] = useActionState(interceptAction, null);

  return (
    <form action={action} className="space-y-5 p-5">
      {/* background */}
      <section className="w-full h-72 bg-neutral-800"></section>
      <ImageInputLabel preview={preview} onImageChange={onImageChange} />
      {/* name */}
      <div className="w-full mt-10 space-y-5 max-w-screen-md mx-auto">
        <div
          className="grid grid-cols-3 items-center h-10 rounded overflow-hidden 
          ring-0 has-[:focus]:ring-1 ring-neutral-500 transition-all"
        >
          <label
            className="h-full bg-neutral-600 font-semibold flex justify-center items-center text-sm px-3"
            htmlFor="nickname"
          >
            Nickname
          </label>
          <input
            id="nickname"
            className="h-full col-span-2 bg-neutral-700 px-3 
            focus:outline-none text-sm placeholder:text-sm"
            name="nickname"
            placeholder="Enter Your New Nickname"
            required
            defaultValue={nickname}
            minLength={2}
            maxLength={20}
          />
        </div>
        <ErrorMap errors={state ?? []} />
        <div className="mt-5">
          <FormButton text="수정 완료" />
        </div>
      </div>
    </form>
  );
}

interface ImageInputLabelProps {
  preview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

function ImageInputLabel({ preview, onImageChange }: ImageInputLabelProps) {
  return (
    <div>
      <label
        htmlFor="avatar"
        className="size-42 rounded-full -mt-21 mx-auto bg-neutral-200 border-2 border-dashed border-neutral-500
        flex flex-col items-center justify-center text-neutral-600 cursor-pointer bg-center bg-cover"
        style={{ backgroundImage: `url(${preview})` }}
      >
        {!preview && (
          <>
            <FontAwesomeIcon icon={faCamera} className="text-2xl" />
            <div className="text-neural-400 text-sm"></div>
          </>
        )}
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
