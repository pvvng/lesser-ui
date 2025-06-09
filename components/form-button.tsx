import { faRocket, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  isFormValid?: boolean;
  text: string;
}

export default function FormButton({
  isFormValid = true,
  text,
}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={!isFormValid || pending}
      className="mt-5 w-full h-10 flex gap-2 justify-center items-center text-sm rounded cursor-pointer font-semibold
      disabled:bg-neutral-600 disabled:cursor-not-allowed
      bg-green-500 hover:bg-green-600 transition-colors"
    >
      <FontAwesomeIcon
        icon={pending ? faSpinner : faRocket}
        className={`${pending ? "animate-spin" : ""}`}
      />{" "}
      {pending ? "Loading..." : text}
    </button>
  );
}
