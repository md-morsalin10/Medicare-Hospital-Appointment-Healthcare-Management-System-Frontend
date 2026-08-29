import { NormalServerFetch, serverFetch } from "../core/serverApi"

export const getDoctorsProfileById = async ({ doctorId }) => {
    return await serverFetch(`/api/doctors?doctorId=${doctorId}`)
}

export const getAllDoctorsProfile = async()=>{
    return await NormalServerFetch(`/api/doctors`)
}