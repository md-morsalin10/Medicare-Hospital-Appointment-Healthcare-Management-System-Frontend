import { clientMutation } from "../core/clientApi";


export const createDoctorProfile = async (doctorData) => {
  return await clientMutation("/api/books", doctorData);
}