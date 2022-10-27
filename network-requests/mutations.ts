import { useMutation } from "react-query";
import {
    createBed,
    createBedVariantById,
    createAccessoriesIcon,
    deleteBedById,
    deleteBedVariantById,
    deleteIconById,
    updateAccessoriesIcon,
    updateBedById,
    updateBedVariantById,
    login,
    updateOrderStatus,
} from "./api";
import {
    BedRequestPayload,
    ColorIcon,
    CreateBedVariantResponse,
    UpdateColorIcon,
    UploadBedImage,
    VariantsTypes,
} from "./types";

//AUTH MUTATIONS
export const useLogin = () => {
    return useMutation(({ email, password }: any) => login(email, password));
};

export const useUpdateOrderStatus = (id: string) => {
    return useMutation(({ status }: any) => updateOrderStatus(id, status));
};

//CREATE MUTATIONS
export const useCreateNewBed = () =>
    useMutation(
        (payload: BedRequestPayload): Promise<CreateBedVariantResponse> =>
            createBed(payload)
    );

export const useCreateNewBedVariant = (id: string) =>
    useMutation(
        (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
            createBedVariantById(id, props)
    );

export const useCreateAccessoriesIcon = () =>
    useMutation(
        (payload: ColorIcon): Promise<UploadBedImage> =>
            createAccessoriesIcon(
                payload.image,
                payload.label,
                payload.value,
                payload.type,
                payload.size
            )
    );

//UPDATE MUTATIONS
export const useUpdateBedVariant = (id: string) =>
    useMutation(
        (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
            updateBedVariantById(id, props)
    );

export const useUpdateBed = (id: string) =>
    useMutation(
        (props: BedRequestPayload): Promise<CreateBedVariantResponse> =>
            updateBedById(id, props)
    );

export const useUpdateAccessoriesIcon = () =>
    useMutation(
        (payload: UpdateColorIcon): Promise<UploadBedImage> =>
            updateAccessoriesIcon(
                payload.id,
                payload.label,
                payload.value,
                payload.type,
                payload?.image
            )
    );

//DELETE MUTATION
export const useDeleteBedById = () =>
    useMutation(
        (id: string): Promise<CreateBedVariantResponse> => deleteBedById(id)
    );

export const useDeleteBedVariantById = () =>
    useMutation(
        (id: string): Promise<CreateBedVariantResponse> =>
            deleteBedVariantById(id)
    );

export const useDeleteIconById = () =>
    useMutation(
        (id: string): Promise<CreateBedVariantResponse> => deleteIconById(id)
    );
