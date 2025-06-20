"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

/** url parameter 기반 검색 form */
export default function SearchInputButton() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    if (searchValue.trim()) {
      params.set("search", searchValue.trim());
    } else {
      params.delete("search");
    }

    const newQuery = params.toString();
    router.push(`?${newQuery}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-neutral-700 has-[:focus]:w-82 w-64 transition-all duration-500 h-10 rounded-2xl overflow-hidden"
    >
      <input
        className="w-full h-full focus:outline-none px-3 text-sm placeholder:text-sm"
        placeholder="Search Element by name"
        name="search"
        onChange={handleChange}
        maxLength={100}
      />
      <button className="h-full text-green-500 border-none rounded-none px-3 shrink-0 cursor-pointer">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}
