import { Dispatch, SetStateAction } from "react";

interface InputWithLabelProps {
  label: string;
  id: string;
  name: string;
  errors?: string[];
  setValue?: Dispatch<SetStateAction<string>>;
}

export default function InputWithLabel({
  label,
  id,
  name,
  errors = [],
  setValue,
  ...rest
}: InputWithLabelProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="w-full space-y-1.5">
      <label htmlFor={id} className="text-sm font-semibold cursor-pointer">
        {label}
      </label>
      <input
        id={id}
        className="w-full h-8 bg-neutral-800 ring ring-neutral-600 text-neutral-300 
        focus:ring-2 transition-all px-2 mt-2 rounded focus:outline-none 
        placeholder:text-neutral-500 placeholder:text-sm text-sm"
        name={name}
        onChange={(e) => setValue?.(e.target.value)}
        {...rest}
      />
      {errors.map((error, index) => (
        <p key={index} className="text-red-400 text-xs">
          {error}
        </p>
      ))}
    </div>
  );
}
