import { ReactNode } from "react";
import { getUser } from "@/services/supabase/auth/user";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

async function RestrictedRender({ children }: Props) {
  const user = await getUser();

  if (!user) redirect("/auth/login");

  return <>{children}</>;
}

export default RestrictedRender;
