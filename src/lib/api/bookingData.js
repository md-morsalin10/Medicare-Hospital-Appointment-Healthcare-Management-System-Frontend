import { serverFetch } from "../core/serverApi"

export const getBookingDataByPatientId = async ({ patientId }) => {
    return await serverFetch(`/api/bookings?patientId=${patientId}`)
}