interface UserDashBoardProps {
  params: Promise<{ userId: string }>;
}

export default async function UserDashBoard({ params }: UserDashBoardProps) {
  const userId = (await params).userId;
  return <div>{userId}</div>;
}
