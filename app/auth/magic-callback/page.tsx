import { exchangeCodeForSession, getUser } from "@/services/supabase/auth/user";
import { getInvitations } from "@/services/supabase/invitations";
import { addUserToSessionGroup } from "@/services/supabase/sessiongroups";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{ code?: string }>;
}
async function MagicCallBack({ searchParams }: Props) {
  const { code } = await searchParams;
  if (code) {
    const success = await exchangeCodeForSession(code);
    console.log("session established");
    if (success) {
      const user = await getUser();
      // grant access to session groups of the invitations
      const invitations = await getInvitations(user!);
      console.log("invitations count " + invitations.length);
      invitations.forEach((x) =>
        addUserToSessionGroup(user!, x.sessionGroupId),
      );
      console.log("done granting access");
      revalidatePath("/", "layout"); // Clear cache
      return redirect("/");
    }
  }
}

export default MagicCallBack;
