import { serverFetch } from "../core/serverApi"

export const getDoctorsProfileById = async ({ doctorId }) => {
    return await serverFetch(`/api/doctors?doctorId=${doctorId}`)
}

export const getAllDoctorsProfile = async()=>{
    return await serverFetch(`/api/doctors`)
}