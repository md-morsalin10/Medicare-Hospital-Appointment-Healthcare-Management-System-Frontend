import { serverFetch } from "../core/serverApi"

export const getBookingDataByPatientId = async ({ patientId }) => {
    return await serverFetch(`/api/bookings?patientId=${patientId}`)
}

export const getBookingDataByDoctorId = async ({ doctorId }) => {
    return await serverFetch(`/api/bookings?doctorId=${doctorId}`)
}
export const getBookingData = async () => {
    return await serverFetch(`/api/bookings`)
}

