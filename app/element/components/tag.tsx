export default function ElementTag({ tag }: { tag: string }) {
  return (
    <div>
      <span className="inline-block rounded-2xl px-3 py-1 text-sm font-semibold bg-neutral-600">
        # {tag}
      </span>
    </div>
  );
}
