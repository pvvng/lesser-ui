export default function ElementTitle({
  name,
  bio,
}: {
  name: string;
  bio: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-2xl font-semibold break-words">{name}</p>
      <p className="text-neutral-300 break-words">{bio}</p>
    </div>
  );
}
