import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

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

export const verifyRole = async (role) => {
  const user = await getUserSeason();
  // console.log(user, "from verifyRole");

  if (!user) {
    redirect("/login");
  }

  if (user.role !== role) {
    redirect("/unauthorized");
  }
}
