import { serverFetch } from "../core/serverApi"

export const getPrescriptionsByDoctorId = async ({ doctorId }) => {
    return await serverFetch(`/api/prescriptions?doctorId=${doctorId}`)
}

export const getPrescriptionsByPatientId = async ({ patientId }) => {
    return await serverFetch(`/api/prescriptions?patientId=${patientId}`)
}