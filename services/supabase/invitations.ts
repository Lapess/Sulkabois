import { InvitationDto } from "@/interfaces/InvitationDto";
import { createSupabaseClient } from "@/lib/supabase/client";
import { passwordlessSignIn } from "./auth/client";
import { User } from "@supabase/supabase-js";

const supabase = createSupabaseClient();

export async function inviteUser(invitation: InvitationDto): Promise<boolean> {
  const signedUp = await passwordlessSignIn(invitation.email);
  const invited = await addInvitation(invitation);
  console.log(signedUp + " " + invited);
  return signedUp && invited;
}

export async function addInvitation(
  invitation: InvitationDto,
): Promise<boolean> {
  // TODO handle different invitation types
  if (!invitation.email || !invitation.sessionGroupId) {
    console.log("missing email or sessiongroupid");
    return false;
  }
  const { data, error } = await supabase
    .from("invitation")
    .insert({
      email: invitation.email,
      session_group_id: invitation.sessionGroupId,
    })
    .select();
  if (error) console.log(error);
  console.log("invitation sent successfully");
  return data != null;
}

export async function getInvitations(user: User): Promise<InvitationDto[]> {
  const { data, error } = await supabase
    .from("invitation")
    .select("*")
    .eq("email", user.email);
  if (error) throw error;

  return data.map((x) => ({
    email: x.email,
    sessionGroupId: x.session_group_id,
  }));
}

export async function deleteInvitationsByEmail(user: User): Promise<boolean> {
  const { error } = await supabase
    .from("invitation")
    .delete()
    .eq("email", user.email);
  if (error) {
    console.log(error);
    return false;
  }
  return true;
}
