import axios from "../axios";

export const getAllAdminReviews = async (page: number) =>
  axios
    .get(`/reviews/admin?page=${page}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const ApproveReview = async (reviewId: string) =>
  axios
    .put(`/reviews/approve/${reviewId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const RejectReview = async (reviewId: string) =>
  axios
    .put(`/reviews/deny/${reviewId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const DeleteReview = async (reviewId: string) =>
  axios
    .delete(`/reviews/${reviewId}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
