import { clientMutation } from "../core/clientApi";


export const createReview = async (reviewData) => {
  return await clientMutation("/api/reviews", reviewData);
}