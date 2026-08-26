import { serverFetch } from "../core/serverApi"

export const getPrescriptionsByDoctorId = async ({ doctorId }) => {
    return await serverFetch(`/api/prescriptions?doctorId=${doctorId}`)
}