import { serverFetch } from "../core/serverApi"

export const getReviewsByPatientId = async ({ patientId }) => {
    return await serverFetch(`/api/reviews?patientId=${patientId}`)
}
export const getReviewsByDoctorId = async ({ doctorId }) => {
    return await serverFetch(`/api/reviews?doctorId=${doctorId}`)
}