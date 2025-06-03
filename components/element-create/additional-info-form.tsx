import InputWithLabel from "./input-with-label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRocket } from "@fortawesome/free-solid-svg-icons";
import Preview from "../snippet-studio/preview";
import useEditor from "@/lib/hooks/use-editor";
import useStopScoll from "@/lib/hooks/use-stop-scroll";
import CheckBoxWithLabel from "./checkbox-with-label";
import { useState } from "react";

interface AdditionalInfoFormProps {
  codeRef: React.RefObject<{
    html: string;
    css: string;
  }>;
}

export default function AdditionalInfoForm({
  codeRef,
}: AdditionalInfoFormProps) {
  const [nameInput, setNameInput] = useState("");
  const [nameBio, setNameBio] = useState("");
  const [checks, setChecks] = useState({
    own: false,
    accurate: false,
  });

  const isFormValid =
    nameInput !== "" && nameBio !== "" && checks.own && checks.accurate;

  const { previewCode } = useEditor({
    userHtml: codeRef.current.html,
    userCss: codeRef.current.css,
  });

  useStopScoll();

  return (
    <div
      className="inset-0 fixed w-full h-screen bg-black/80 z-100 
      flex justify-center items-center"
    >
      <div className="max-w-screen-lg p-5 grid grid-cols-2 shadow-xl">
        {/* preview */}
        <div className="aspect-square bg-neutral-800 rounded-l-2xl">
          <Preview previewCode={previewCode} />
        </div>
        {/* form */}
        <form className="aspect-square p-5 bg-neutral-900 flex flex-col gap-3 justify-center rounded-r-2xl">
          <p className="text-2xl font-bold mb-3">
            Looks great! Let’s finish it up.
          </p>
          <InputWithLabel
            label="Element Name"
            id="name"
            name="name"
            placeholder="Type your element`s name"
            required
            setValue={setNameInput}
          />
          <InputWithLabel
            label="Element Bio"
            id="bio"
            name="bio"
            placeholder="Type your element`s bio"
            required
            setValue={setNameBio}
          />
          <span className="mt-3">
            <CheckBoxWithLabel
              label="Is this element your own work?"
              onChange={(checked) =>
                setChecks((prev) => ({ ...prev, own: checked }))
              }
            />
          </span>
          <CheckBoxWithLabel
            label="Does the preview UI on the left accurately reflect what you intended to submit?"
            onChange={(checked) =>
              setChecks((prev) => ({ ...prev, accurate: checked }))
            }
          />
          <button
            disabled={!isFormValid}
            className="mt-5 w-full h-10 flex gap-2 justify-center items-center text-sm rounded cursor-pointer font-semibold
            disabled:bg-neutral-600 disabled:cursor-not-allowed
            bg-green-500 hover:bg-green-600 transition-colors"
          >
            <FontAwesomeIcon icon={faRocket} /> Submit to Confirm
          </button>
        </form>
      </div>
    </div>
  );
}
