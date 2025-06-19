// component
import ElementWorkspace from "@/components/element-workspace/element-workspace";
import { createElementAction } from "./actions";

export default function CreateElement() {
  return <ElementWorkspace type="create" action={createElementAction} />;
}
