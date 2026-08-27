"use server";

import { db } from "@/db";
import { invitations } from "@/db/schema";
import { InvitationDto } from "@/interfaces/InvitationDto";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { eq } from "drizzle-orm";

export async function inviteUser(invitation: InvitationDto): Promise<boolean> {
  const signedUp = await passwordlessSignIn(invitation.email);
  const invited = await addInvitation(invitation);
  console.log(signedUp + " " + invited);
  return signedUp && invited;
}

async function passwordlessSignIn(email: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: "https://sulkabois.vercel.app/auth/magic-callback",
    },
  });
  if (error) {
    console.log(error);
    throw error;
  }
  return data != null;
}

export async function addInvitation(
  invitation: InvitationDto,
): Promise<boolean> {
  if (!invitation.email || !invitation.sessionGroupId) {
    console.log("missing email or sessiongroupid");
    return false;
  }
  try {
    const data = await db
      .insert(invitations)
      .values({
        email: invitation.email,
        session_group_id: invitation.sessionGroupId,
      })
      .returning();
    console.log("invitation sent successfully");
    return data.length > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getInvitations(user: User): Promise<InvitationDto[]> {
  if (!user.email) return [];
  const data = await db.query.invitations.findMany({
    where: { email: user.email },
  });
  return data.map((row) => ({
    email: row.email,
    sessionGroupId: row.session_group_id,
  }));
}

export async function deleteInvitationsByEmail(user: User): Promise<boolean> {
  if (!user.email) return false;
  try {
    await db.delete(invitations).where(eq(invitations.email, user.email));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
