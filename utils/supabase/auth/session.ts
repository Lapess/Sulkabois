"use server";
import { cache } from "react";
import { cookies } from "next/headers";
import { decryptAndValidate, encrypt } from "@/utils/crypto";

// Cached helper methods makes it easy to get the same value in many places
// without manually passing it around. This discourages passing it from Server
// Component to Server Component which minimizes risk of passing it to a Client
// Component.
export const getAccessToken = cache(async () => {
  const token = (await cookies()).get("AUTH_TOKEN");
  return await decryptAndValidate(token?.value!);
});

export const setAccessToken = cache(async (accessToken: string) => {
  console.log("Setting token");
  (await cookies()).set("AUTH_TOKEN", accessToken);
  console.log("Token set");
});
