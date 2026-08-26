import { serverMutation } from "../core/serverApi";



export const createBookingData = async (bookingData) => {
  return await serverMutation("/api/bookings", bookingData);
}