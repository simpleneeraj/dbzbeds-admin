import axios from "network-requests/axios";

export const getBuildYourBeds = async (): Promise<any> =>
  await axios
    .get(`/build-your-bed`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getBuildYourBedsById = async (id: string): Promise<any> =>
  await axios
    .get(`/build-your-bed/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getBuildYourBedsVariantsById = async (id: string): Promise<any> =>
  await axios
    .get(`/build-your-bed/${id}/variants`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const updateBuildYourBedVariantById = async (
  id: string,
  payload: any
): Promise<any> =>
  await axios
    .put(`/build-your-bed/${id}/variants`, payload)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteBuildYourBedVariantById = async (id: string): Promise<any> =>
  await axios
    .delete(`/build-your-bed/${id}/variants`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getBuildYourBedVariantColorsById = async (
  id: string
): Promise<any> =>
  await axios
    .get(`/build-your-bed/variants/color/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const updateBuildYourBedVariantColorById = async (
  id: string,
  payload: any
): Promise<any> =>
  await axios
    .put(`/build-your-bed/variants/colors/${id}`, payload)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const deleteBuildYourBedVariantColorById = async (
  id: string
): Promise<any> =>
  await axios
    .delete(`/build-your-bed/variants/colors/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const createBuildYourBedVariantById = async (
  id: string,
  payload: any
): Promise<any> =>
  await axios
    .post(`/build-your-bed/${id}/variants`, payload)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const getColorsVariantsBySizeVariantId = async (
  id: string
): Promise<any> =>
  await axios
    .get(`/build-your-bed/variants/colors/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

export const createColorVariantByVariantId = async (
  id: string,
  payload: any
): Promise<any> =>
  await axios
    .post(`/build-your-bed/variants/colors/${id}`, payload)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
