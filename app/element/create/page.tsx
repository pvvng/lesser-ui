// component
import ElementWorkspace from "@/components/element-workspace/element-workspace";
import { createElementAction } from "./actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI 블록 제작",
  description: "Lesser UI에 새로운 UI 컴포넌트를 제작해보세요.",
};

export default function CreateElement() {
  return <ElementWorkspace type="create" action={createElementAction} />;
}
