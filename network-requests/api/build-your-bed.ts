import axios from "network-requests/axios";

export const getBuildYourBeds = async (): Promise<any> =>
    await axios
        .get(`/build-your-bed`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const getBuildYourBedsVariantsById = async (id: string): Promise<any> =>
    await axios
        .get(`/build-your-bed/${id}`)
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

