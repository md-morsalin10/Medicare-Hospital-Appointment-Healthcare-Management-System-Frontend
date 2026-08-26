"use client";
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
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response from server:", text.slice(0, 200));
        throw new Error(`Server returned non-JSON response (status: ${res.status}). Check if backend is running on ${baseUrl}`);
    }

    return res.json();
};