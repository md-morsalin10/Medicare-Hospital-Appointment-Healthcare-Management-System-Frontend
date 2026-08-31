import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("Medicare");

const getAuthBaseUrl = () =>
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const auth = betterAuth({
    baseURL: getAuthBaseUrl(),
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,
                defaultValue: "patient",
                input: true,
            },
            isSuspended: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false
            }
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 60 * 60 * 24 * 7, // 7 days, in seconds
        }
    },

    plugins: [
        jwt()
    ]
});