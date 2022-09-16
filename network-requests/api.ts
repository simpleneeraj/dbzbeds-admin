import axios from "./axios";
import {
    Accessories,
    AccessoriesTypes,
    Bed,
    BedRequestPayload,
    BedResponse,
    BedWithImage,
    BedWithSize,
    CreateBedVariantResponse,
    GetAllBedsParams,
    UploadBedImage,
    VariantsTypes,
} from "./types";

//GET REQUESTS

export const getAllBeds = ({
    pageParam = 1,
}: GetAllBedsParams): Promise<BedResponse> =>
    axios
        .get<BedResponse>(`/beds?page=${pageParam}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

//Beds With No Variants is not Returned Here
export const getAllBedsWithImage = ({
    pageParam = 1,
}: GetAllBedsParams): Promise<BedResponse> =>
    axios
        .get<BedResponse>(
            `/beds/get-all-beds-with-base-image?page=${pageParam}`
        )
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

//Beds With No Variants is Also Returned Here
export const getAllBedsWithImageAdmin = ({
    pageParam = 1,
}: GetAllBedsParams): Promise<BedResponse> =>
    axios
        .get<BedResponse>(
            `/beds/get-all-beds-with-base-image-admin?page=${pageParam}`
        )
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const getBedById = (id: string): Promise<Bed> =>
    axios
        .get<Bed>(`/beds/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const getBedVariantById = (
    id: string,
    size?: string | undefined
): Promise<BedWithSize> => {
    if (size)
        return axios
            .get<BedWithSize>(`/beds/get-bed-variant/${id}?size=${size}`)
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
    else
        return axios
            .get<BedWithSize>(`/beds/get-bed-variant/${id}`)
            .then((response) => response.data)
            .catch((error) => {
                throw error;
            });
};

export const getIconsByType = (type: string): Promise<Accessories[]> =>
    axios
        .get<Accessories[]>(`/icons/accessories/${type}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const getIconById = (id: string): Promise<Accessories> =>
    axios
        .get<Accessories>(`/icons/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

//POST REQUESTS
export const createBed = (
    payload: BedRequestPayload
): Promise<CreateBedVariantResponse> =>
    axios
        .post<CreateBedVariantResponse>(`/beds/create`, payload)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const createBedVariantById = (
    id: string,
    payload: VariantsTypes
): Promise<CreateBedVariantResponse> =>
    axios
        .post<CreateBedVariantResponse>(`/beds/add-bed/${id}`, payload)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const uploadBedImage = async (image: Blob): Promise<UploadBedImage> => {
    const formdata = new FormData();
    formdata.append("image", image);
    return await axios
        .post<UploadBedImage>(`/beds/upload-image`, formdata)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

//CREATE COLOR ICON
export const createColorIcon = async (
    image: Blob,
    label: string,
    value: string,
    type: string
): Promise<UploadBedImage> => {
    const formdata = new FormData();
    formdata.append("label", label);
    formdata.append("value", value);
    formdata.append("type", type);
    formdata.append("image", image);

    return await axios
        .postForm<UploadBedImage>(`/icons/accessories`, formdata)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

//PATCH REQUESTS
export const updateBedVariantById = (
    id: string,
    payload: VariantsTypes
): Promise<CreateBedVariantResponse> =>
    axios
        .patch<CreateBedVariantResponse>(
            `/beds/update-bed-variant/${id}`,
            payload
        )
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const updateBedById = (
    id: string,
    payload: BedRequestPayload
): Promise<CreateBedVariantResponse> =>
    axios
        .patch<CreateBedVariantResponse>(`/beds/update-bed/${id}`, payload)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const updateAccessoriesIcon = async (
    id: string,
    label: string,
    value: string,
    type: string,
    image?: Blob
): Promise<UploadBedImage> => {
    const formdata = new FormData();
    formdata.append("label", label);
    formdata.append("value", value);
    formdata.append("type", type);
    image && formdata.append("image", image);

    return await axios
        .patchForm<UploadBedImage>(`/icons/update/${id}`, formdata)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

//DELETE REQUESTS
export const deleteBedById = (id: string): Promise<CreateBedVariantResponse> =>
    axios
        .delete(`/beds/delete-bed/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const deleteBedVariantById = (
    id: string
): Promise<CreateBedVariantResponse> =>
    axios
        .delete(`/beds/delete-bed-variant/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
