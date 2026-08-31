import { serverFetch } from "../core/serverApi";

export const getAllUsers = async () => {
    return await serverFetch(`/api/users`);
};

export const suspendUser = async (id, isSuspended) => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isSuspended }),
    });
    return res.json();
};

export const deleteUser = async (id) => {
    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:5000";
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
        method: "DELETE",
    });
    return res.json();
};
