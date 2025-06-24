"use client";

import InputWithLabel from "../form/input-with-label";
import CheckBoxWithLabel from "../form/checkbox-with-label";
import ErrorMap from "../error-map";
import FormButton from "../form/form-button";
import { startTransition, useActionState, useState } from "react";
import { WorkspaceActionResult } from "@/types/core";

interface AdditionalInfoFormProps {
  selectedTag: string | null;
  isCreateMode: boolean;
  userHtml: string;
  userCss: string;
  name?: string;
  bio?: string | null;
  elementId?: string;
  action: (_: unknown, formData: FormData) => Promise<WorkspaceActionResult>;
}

export default function AdditionalInfoForm({
  selectedTag,
  userHtml,
  userCss,
  name,
  bio,
  elementId,
  isCreateMode,
  action: formAction,
}: AdditionalInfoFormProps) {
  const [nameInput, setNameInput] = useState<string>(name || "");
  const [nameBio, setNameBio] = useState<string>(bio || "");
  const [checks, setChecks] = useState({
    own: false,
    accurate: false,
  });

  const isFormValid =
    nameInput !== "" && nameBio !== "" && checks.own && checks.accurate;

  const [state, action] = useActionState(formAction, null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return null;

    const formData = new FormData();
    formData.append("name", nameInput);
    formData.append("bio", nameBio);
    formData.append("tag", selectedTag ?? "");
    formData.append("html", userHtml);
    formData.append("css", userCss);
    if (elementId && !isCreateMode) {
      formData.append("elementId", elementId);
    }

    // 비동기 UI 업데이트를 “덜 급한 작업”으로 처리
    startTransition(() => {
      action(formData);
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="aspect-square p-5 bg-neutral-900 my-auto space-y-3 justify-center rounded-r-2xl overflow-auto"
    >
      <p className="text-2xl font-bold mb-3">
        {isCreateMode ? "좋아요! 마무리해볼까요?" : "UI 블럭 수정하기"}
      </p>
      <InputWithLabel
        label="UI 블럭 태그"
        id="tag"
        name="tag"
        defaultValue={selectedTag ?? ""}
        disabled
        required
        errors={state?.fieldErrors.tag}
      />
      <InputWithLabel
        label="UI 블럭 이름"
        id="name"
        name="name"
        setValue={setNameInput}
        placeholder="UI 블럭의 이름을 입력하세요"
        required
        defaultValue={name}
        minLength={2}
        maxLength={40}
        errors={state?.fieldErrors.name}
      />
      <InputWithLabel
        label="UI 블럭 설명"
        id="bio"
        name="bio"
        setValue={setNameBio}
        minLength={2}
        maxLength={100}
        defaultValue={bio || ""}
        placeholder="어디에 쓰이는지, 어떤 특징이 있는지 적어보세요"
        required
        errors={state?.fieldErrors.bio}
      />
      <div className="mt-5 space-y-3">
        <CheckBoxWithLabel
          label="이 UI 블럭이 본인의 작업물이 맞나요?"
          onChange={(checked) =>
            setChecks((prev) => ({ ...prev, own: checked }))
          }
        />
        <CheckBoxWithLabel
          label="미리보기 UI가 제출하려는 내용과 정확히 일치하나요?"
          onChange={(checked) =>
            setChecks((prev) => ({ ...prev, accurate: checked }))
          }
        />
        <ErrorMap errors={state?.formErrors} />
      </div>
      <FormButton
        isFormValid={isFormValid}
        text={isCreateMode ? "제출하여 등록하기" : "UI 블럭 수정하기"}
      />
    </form>
  );
}
