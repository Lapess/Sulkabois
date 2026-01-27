import {
  exchangeCodeForSession,
  verifyOtp,
} from "@/services/supabase/auth/server";
import { getInvitations } from "@/services/supabase/invitations";
import { addUserToSessionGroup } from "@/services/supabase/sessiongroups";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("token_hash");
  console.log(code);
  console.log(code?.substring(5));
  if (code) {
    const data = await verifyOtp("", code);
    if (data) {
      console.log("session established");
      // grant access to session groups of the invitations
      const invitations = await getInvitations(data.user!);
      console.log("invitations count " + invitations.length);
      invitations.forEach((x) =>
        addUserToSessionGroup(data.user!, x.sessionGroupId),
      );
      return NextResponse.redirect(new URL("/", requestUrl.origin));
    } else
      return NextResponse.redirect(new URL("/auth/login", requestUrl.origin));
  }
}
