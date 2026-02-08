import { verifyOtp } from "@/services/supabase/auth/server";
import {
  deleteInvitationsByEmail as deleteUserInvitations,
  getInvitations,
} from "@/services/supabase/invitations";
import { addUserToSessionGroup } from "@/services/supabase/sessiongroups";
import { User } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("token_hash");
  if (code) {
    const data = await verifyOtp("", code);
    if (data) {
      await assignUserToSessionGroups(data.user!);
      await deleteUserInvitations(data.user!);
      return NextResponse.redirect(
        new URL("/auth/new-player", requestUrl.origin),
      );
    } else
      return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
  }
}

async function assignUserToSessionGroups(user: User) {
  const invitations = await getInvitations(user);
  invitations.forEach((x) => addUserToSessionGroup(user.id, x.sessionGroupId!));
}
