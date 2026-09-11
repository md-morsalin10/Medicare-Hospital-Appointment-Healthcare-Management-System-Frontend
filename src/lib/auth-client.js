import { jwtClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

// http://localhost:3000
export const authClient = createAuthClient({
    baseURL: "https://medicare-frontend-blond.vercel.app",
    plugins: [
        jwtClient()
    ]
})
export const { signIn, signUp, useSession } = authClient
