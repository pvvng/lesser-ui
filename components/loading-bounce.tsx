export default function LoadingBounce() {
  return (
    <div className="w-full flex flex-row gap-2 items-center justify-center">
      <div className="size-3 rounded-full bg-green-500 animate-bounce [animation-delay:.7s]"></div>
      <div className="size-3 rounded-full bg-green-500 animate-bounce [animation-delay:.3s]"></div>
      <div className="size-3 rounded-full bg-green-500 animate-bounce [animation-delay:.7s]"></div>
    </div>
  );
}
