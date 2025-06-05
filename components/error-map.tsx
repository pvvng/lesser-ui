"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function ErrorMap({
  errors = [],
}: {
  errors: string[] | undefined;
}) {
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errors.length > 0 && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)" }
      );
    }
  }, [errors]);

  return (
    <div ref={errorRef} className="space-y-1.5">
      {errors.map((error, index) => (
        <p key={index} className="text-red-400 text-xs">
          {error}
        </p>
      ))}
    </div>
  );
}
