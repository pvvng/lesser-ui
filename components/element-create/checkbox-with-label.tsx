import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CheckBoxWithLabelProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

export default function CheckBoxWithLabel({
  label,
  defaultChecked = false,
  onChange,
}: CheckBoxWithLabelProps) {
  const iconRef = useRef(null);
  const [checked, setChecked] = useState(defaultChecked);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setChecked(isChecked);
    onChange?.(isChecked);
  };

  useEffect(() => {
    if (checked) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0, opacity: 0, rotate: -180 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        }
      );
    } else {
      gsap.to(iconRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [checked]);

  return (
    <label className="w-full flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        className="peer absolute opacity-0 w-4 h-4"
        defaultChecked={defaultChecked}
        onChange={handleCheck}
      />
      <div className="peer-focus:ring-green-500 ring ring-transparent size-4 flex-shrink-0 rounded-full flex items-center justify-center bg-neutral-700">
        <FontAwesomeIcon
          ref={iconRef}
          icon={faCheck}
          className="text-green-500 text-xs"
          style={{ transform: "scale(0)", opacity: 0 }}
        />
      </div>
      <span className="text-sm font-semibold">{label}</span>
    </label>
  );
}
