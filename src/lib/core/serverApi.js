import { getTokenServer } from "./tokenServer";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export const serverFetch = async (path) => {
    const token = await getTokenServer();
    // console.log(token, "from token server fetch")
    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            "authorization": `Bearer ${token}`
        },
        cache: 'no-store'
    })
    return res.json();
}

export const NormalServerFetch = async (path) => {
    
    const res = await fetch(`${baseUrl}${path}`, {
        headers: {
            // "authorization": `Bearer ${token}`
        },
        cache: 'no-store'
    })
    return res.json();
}

export const serverMutation = async (path, data) => {
    const token = await getTokenServer();
    // console.log(token, "from token server mutation")

    const res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    return res.json();
}