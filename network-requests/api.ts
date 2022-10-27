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
    Order,
    UploadBedImage,
    VariantsTypes,
} from "./types";

//AUTH API
export const login = (email: string, password: string) => {
    return axios.post("/auth/login", { email, password });
};

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

export const getIconsByType = (
    type: string,
    id: string
): Promise<Accessories[]> =>
    axios
        .get<Accessories[]>(`/icons/accessories/${type}/${id}`)
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

export const getIconAllByType = (type: string): Promise<Accessories[]> =>
    axios
        .get<Accessories[]>(`/icons/accessories/all/${type}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const getIconAllByTypeAndSize = (
    type: string,
    size: string
): Promise<Accessories[]> =>
    axios
        .get<Accessories[]>(`/icons/accessories/all/${type}?size=${size}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const getAllIcons = (): Promise<Accessories[]> =>
    axios
        .get<Accessories[]>(`/icons/accessories`)
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
        .post<UploadBedImage>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/beds/upload-image`,
            formdata,
            {
                withCredentials: false,
            }
        )
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            throw error;
        });
};

//CREATE COLOR ICON
export const createAccessoriesIcon = async (
    image: Blob,
    label: string,
    value: string,
    type: string,
    size: string
): Promise<UploadBedImage> => {
    const formdata = new FormData();
    formdata.append("label", label);
    formdata.append("value", value);
    formdata.append("type", type);
    formdata.append("size", size);
    formdata.append("image", image);

    return await axios
        .postForm<UploadBedImage>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/icons/accessories`,
            formdata,
            {
                withCredentials: false,
            }
        )
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
        .patchForm<UploadBedImage>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/icons/update/${id}`,
            formdata,
            {
                withCredentials: false,
            }
        )
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

export const deleteIconById = (id: string): Promise<CreateBedVariantResponse> =>
    axios
        .delete(`/icons/accessories/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

//get all orders

export const getAllOrders = (): Promise<Order[]> =>
    axios
        .get<Order[]>(`/order`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const getOrderById = (id: string): Promise<Order> =>
    axios
        .get<Order>(`/order/${id}`)
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });

export const updateOrderStatus = (id: string, status: string): Promise<any> =>
    axios
        .patch<CreateBedVariantResponse>(`/order/update-status/${id}`, {
            status,
        })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
