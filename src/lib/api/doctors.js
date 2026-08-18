import { serverFetch } from "../core/serverApi"

export const getDoctorsProfileById = async ({ doctorId }) => {
    return await serverFetch(`/api/doctors?doctorId=${doctorId}`)
}