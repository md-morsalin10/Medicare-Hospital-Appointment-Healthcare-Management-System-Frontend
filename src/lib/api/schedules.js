import { NormalServerFetch, serverFetch } from "../core/serverApi"

export const getDoctorsScheduleById = async ({ doctorId }) => {
    return await NormalServerFetch(`/api/schedules?doctorId=${doctorId}`)
}
