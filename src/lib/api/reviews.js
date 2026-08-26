import { serverFetch } from "../core/serverApi"

export const getReviewsByPatientId = async ({ patientId }) => {
    return await serverFetch(`/api/reviews?patientId=${patientId}`)
}