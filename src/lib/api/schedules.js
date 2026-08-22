import { serverFetch } from "../core/serverApi"

export const getDoctorsScheduleById = async ({ doctorId }) => {
    return await serverFetch(`/api/schedules?doctorId=${doctorId}`)
}
