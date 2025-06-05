"use client";

// components
import CheckBoxWithLabel from "./checkbox-with-label";
import InputWithLabel from "./input-with-label";
import FormButton from "./form-button";
// etc
import { startTransition, useActionState, useState } from "react";
import { createElementAction } from "@/app/element/create/action";

interface AdditionalInfoFormProps {
  selectedTag: string | null;
  userHtml: string;
  userCss: string;
}

export default function AdditionalInfoForm({
  selectedTag,
  userHtml,
  userCss,
}: AdditionalInfoFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [nameBio, setNameBio] = useState("");
  const [checks, setChecks] = useState({
    own: false,
    accurate: false,
  });

  const isFormValid =
    nameInput !== "" && nameBio !== "" && checks.own && checks.accurate;

  const [state, action] = useActionState(createElementAction, null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return null;

    const formData = new FormData();
    formData.append("name", nameInput);
    formData.append("bio", nameBio);
    formData.append("tag", selectedTag ?? "");
    formData.append("html", userHtml);
    formData.append("css", userCss);

    // 비동기 UI 업데이트를 “덜 급한 작업”으로 처리
    startTransition(() => {
      action(formData);
    });
  };

  console.log(state);

  return (
    <form
      onSubmit={handleSubmit}
      // action={action}
      className="aspect-square p-5 bg-neutral-900 my-auto space-y-3 justify-center rounded-r-2xl overflow-auto"
    >
      <p className="text-2xl font-bold mb-3">
        Looks great! Let’s finish it up.
      </p>
      <InputWithLabel
        label="Element Tag"
        id="tag"
        name="tag"
        defaultValue={selectedTag ?? ""}
        disabled
        required
        errors={state?.fieldErrors.tag}
      />
      <InputWithLabel
        label="Element Name"
        id="name"
        name="name"
        setValue={setNameInput}
        placeholder="Type your element`s name"
        required
        minLength={2}
        maxLength={20}
        errors={state?.fieldErrors.name}
      />
      <InputWithLabel
        label="Element Bio"
        id="bio"
        name="bio"
        setValue={setNameBio}
        minLength={2}
        maxLength={60}
        placeholder="Type your element`s bio"
        required
        errors={state?.fieldErrors.bio}
      />
      <div className="mt-5 space-y-3">
        <CheckBoxWithLabel
          label="Is this element your own work?"
          onChange={(checked) =>
            setChecks((prev) => ({ ...prev, own: checked }))
          }
        />
        <CheckBoxWithLabel
          label="Does the preview UI on the left accurately reflect what you intended to submit?"
          onChange={(checked) =>
            setChecks((prev) => ({ ...prev, accurate: checked }))
          }
        />
        <section className="space-y-1.5">
          {state?.formErrors.map((error) => (
            <p key={error} className="text-red-400 text-xs">
              {error}
            </p>
          ))}
        </section>
      </div>
      <FormButton isFormValid={isFormValid} text="Submit to Confirm" />
    </form>
  );
}
