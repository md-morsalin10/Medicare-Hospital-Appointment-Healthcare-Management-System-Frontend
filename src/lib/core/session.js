import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSeason = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })
    return session?.user || null;
  } catch (error) {
    console.error("Session error:", error.message || error);
    return null;
  }
}