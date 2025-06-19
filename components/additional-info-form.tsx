import { startTransition, useActionState, useState } from "react";
import { editElementAction } from "@/app/element/[id]/edit/actions";
import { createElementAction } from "@/app/element/create/actions";
import InputWithLabel from "./form/input-with-label";
import CheckBoxWithLabel from "./form/checkbox-with-label";
import ErrorMap from "./error-map";
import FormButton from "./form/form-button";

interface AdditionalInfoFormProps {
  selectedTag: string | null;
  userHtml: string;
  userCss: string;
  name?: string;
  bio?: string | null;
  elementId?: string;
  isCreateMode: boolean;
}

export default function AdditionalInfoForm({
  selectedTag,
  userHtml,
  userCss,
  name,
  bio,
  elementId,
  isCreateMode,
}: AdditionalInfoFormProps) {
  const [nameInput, setNameInput] = useState<string>(name || "");
  const [nameBio, setNameBio] = useState<string>(bio || "");
  const [checks, setChecks] = useState({
    own: false,
    accurate: false,
  });

  const isFormValid =
    nameInput !== "" && nameBio !== "" && checks.own && checks.accurate;

  const [state, action] = useActionState(
    isCreateMode ? createElementAction : editElementAction,
    null
  );

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
        {isCreateMode
          ? "Looks great! Let’s finish it up."
          : "Edit your Element"}
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
        defaultValue={name}
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
        defaultValue={bio || ""}
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
        <ErrorMap errors={state?.formErrors} />
      </div>
      <FormButton
        isFormValid={isFormValid}
        text={isCreateMode ? "Submit to Confirm" : "Edit this Element"}
      />
    </form>
  );
}
