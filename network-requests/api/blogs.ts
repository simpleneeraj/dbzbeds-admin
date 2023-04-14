import axios from "../axios";
import { CreateBlogTypes } from "network-requests/types";

export const getAllBlogs = () =>
  axios
    .get("/blogs")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
export const getBlogsById = (id: string) =>
  axios
    .get(`/blogs/${id}/id`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });

export const updateBlogs = (id: string, payload: CreateBlogTypes) =>
  axios
    .put(`/blogs/${id}`, payload)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
export const deleteBlogs = (id: string) =>
  axios
    .delete(`/blogs/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
