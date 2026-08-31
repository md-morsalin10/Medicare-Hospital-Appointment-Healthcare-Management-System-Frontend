"use client";

import { getClientToken } from "./tokenClinet";

const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";


export const clientFetch = async (path) => {
    // const { data: tokenData } = await authClient.token();
    // const token = tokenData?.token;

    const res = await fetch(`${baseUrl}${path}`, {
        // headers: {
        //     "authorization": token ? `Bearer ${token}` : ""
        // }
    });
    return res.json();
};

export const clientMutation = async (path, data, method = "POST") => {
    const token = await getClientToken();
    console.log(token, "from clientMutation");

    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

// export const clientPatch = async (path, data) => {
//     const res = await fetch(`${baseUrl}${path}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     });
//     return res.json();
// }