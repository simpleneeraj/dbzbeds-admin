import axios from "../axios";
import { CouponPayload } from "network-requests/types";

export const createCoupon = (payload: CouponPayload) =>
  axios
    .post("/coupons/create", payload)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const updateCoupon = (id: string, payload: CouponPayload) =>
  axios
    .put(`/coupons/${id}`, payload)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const getAllCoupons = () =>
  axios
    .get("/coupons")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const deleteCoupon = (id: string) =>
  axios
    .delete(`/coupons/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const getCouponById = (id: string) =>
  axios
    .get(`/coupons/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
