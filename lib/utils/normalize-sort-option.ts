import { SortOptions } from "@/types/core";
import capitalizeFirstLetter from "./capitalize-first-letter";

export function normalizeSortOption(raw: string | null): SortOptions {
  const cleaned = capitalizeFirstLetter(raw ?? "");
  return (["Recent", "Oldest", "View", "Marked"] as const).includes(
    cleaned as SortOptions
  )
    ? (cleaned as SortOptions)
    : "Recent";
}
