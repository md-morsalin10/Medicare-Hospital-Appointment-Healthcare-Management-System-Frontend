import { clientMutation } from "../core/clientApi";


export const createDoctorSchedules = async (doctorData) => {
  return await clientMutation("/api/schedules", doctorData);
}