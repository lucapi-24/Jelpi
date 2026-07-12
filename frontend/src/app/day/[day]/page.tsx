import DayDetail from "@/components/DayDetail";

export default async function DayPage({
  params,
}: {
  params: Promise<{ day: string }>;
}) {
  const { day } = await params;
  return <DayDetail day={parseInt(day)} />;
}
