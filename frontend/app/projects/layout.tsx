import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  if (!session) return null;

  return <>{children}</>;
}