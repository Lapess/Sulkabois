import { InvitationDto } from "@/interfaces/InvitationDto";
import { createSupabaseClient } from "@/lib/supabase/client";
import { passwordlessSignIn } from "./auth/session";
import { User } from "@supabase/supabase-js";

const supabase = createSupabaseClient();

export async function inviteUser(invitation: InvitationDto) {
  if (await addInvitation(invitation))
    await passwordlessSignIn(invitation.email);
}

export async function addInvitation(
  invitation: InvitationDto,
): Promise<boolean> {
  if (!invitation.email || !invitation.sessionGroupId) return false;
  const { error } = await supabase.from("invitation").insert({
    email: invitation.email,
    session_group_id: invitation.sessionGroupId,
  });
  return error == null;
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
