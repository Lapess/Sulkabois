import { ReactNode } from "react";
import { getUser } from "@/services/supabase/auth/server";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

async function RestrictedRender({ children }: Props) {
  const user = await getUser();
  if (user == null) redirect("/auth/login");

  return <>{children}</>;
}

export default RestrictedRender;
