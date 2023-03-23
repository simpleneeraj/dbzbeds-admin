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
  SendorderDetails,
  createHeadboard,
  updateHeadboardById,
  createHeadboardVariantById,
  updateHeadboardVariantById,
} from "./api";
import {
  createBuildYourBedVariantById,
  createColorVariantByVariantId,
  updateBuildYourBedVariantById,
  updateBuildYourBedVariantColorById,
} from "./api/build-your-bed";
import { createCoupon, deleteCoupon, updateCoupon } from "./api/coupons";
import { bulkOrderUpdate, OrderUpdateById } from "./api/orders";
import { ApproveReview, DeleteReview, RejectReview } from "./api/reviews";
import { createUser, logout } from "./api/user";
import {
  BedRequestPayload,
  ColorIcon,
  CouponPayload,
  CreateBedVariantResponse,
  IUserRequest,
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
export const useCreateNewHeadboard = () =>
  useMutation(
    (payload: BedRequestPayload): Promise<CreateBedVariantResponse> =>
      createHeadboard(payload)
  );

export const useCreateNewBedVariant = (id: string) =>
  useMutation(
    (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
      createBedVariantById(id, props)
  );

export const useCreateNewHeadboardVariant = (id: string) =>
  useMutation(
    (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
      createHeadboardVariantById(id, props)
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
export const useUpdateHeadboardVariant = (id: string) =>
  useMutation(
    (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
      updateHeadboardVariantById(id, props)
  );

export const useUpdateBed = (id: string) =>
  useMutation(
    (props: BedRequestPayload): Promise<CreateBedVariantResponse> =>
      updateBedById(id, props)
  );
export const useUpdateHeadboard = (id: string) =>
  useMutation(
    (props: BedRequestPayload): Promise<CreateBedVariantResponse> =>
      updateHeadboardById(id, props)
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
export const useUpdateOrder = (_id: string) =>
  useMutation((payload: any): Promise<any> => OrderUpdateById(_id, payload));

//DELETE MUTATION
export const useDeleteBedById = () =>
  useMutation(
    (id: string): Promise<CreateBedVariantResponse> => deleteBedById(id)
  );

export const useDeleteBedVariantById = () =>
  useMutation(
    (id: string): Promise<CreateBedVariantResponse> => deleteBedVariantById(id)
  );

export const useDeleteIconById = () =>
  useMutation(
    (id: string): Promise<CreateBedVariantResponse> => deleteIconById(id)
  );

export const useSendOrderDetails = () =>
  useMutation(({ email, message }: any): any =>
    SendorderDetails(email, message)
  );

export const useApproveReview = () =>
  useMutation(({ id }: any) => ApproveReview(id));

export const useRejectReview = () =>
  useMutation(({ id }: any) => RejectReview(id));

export const useDeleteReview = () =>
  useMutation(({ id }: any) => DeleteReview(id));

export const useCreateUser = () =>
  useMutation(({ name, role, email, password }: IUserRequest) =>
    createUser({ name, role, email, password })
  );

export const useBulkOrderUpdate = () =>
  useMutation(({ ids, status }: any) => bulkOrderUpdate(ids, status));

export const useCreateCoupon = () =>
  useMutation((payload: any): Promise<CouponPayload> => createCoupon(payload));

export const useUpdateCoupon = (id: string) =>
  useMutation(
    (payload: any): Promise<CouponPayload> => updateCoupon(id, payload)
  );

export const useDeleteCoupon = (id: string) =>
  useMutation((): Promise<CouponPayload> => deleteCoupon(id));

export const useLogout = () => {
  return useMutation(() => logout());
};

export const useUpdateBuildYourBedVariantById = (id: string) =>
  useMutation(
    (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
      updateBuildYourBedVariantById(id, props)
  );

export const useUpdateBuildYourBedVariantColorById = (id: string) =>
  useMutation(
    (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
      updateBuildYourBedVariantColorById(id, props)
  );

export const useCreateColorVariantByVariantId = (id: string) =>
  useMutation(
    (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
      createColorVariantByVariantId(id, props)
  );

export const useCreateBuildYourBedVariantById = (id: string) =>
  useMutation(
    (props: VariantsTypes): Promise<CreateBedVariantResponse> =>
      createBuildYourBedVariantById(id, props)
  );
