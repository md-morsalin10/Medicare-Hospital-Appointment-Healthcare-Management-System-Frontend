import { authClient } from "../auth-client"

export const getUserFromClient = () => {
    const { data: session, isPending } = authClient.useSession()
    return session?.user || null
}