import ErrorPage from "@/components/error-page";

export default function Unauthorized() {
  return <ErrorPage errorCode={401} />;
}
