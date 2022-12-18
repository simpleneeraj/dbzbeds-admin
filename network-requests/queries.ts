import { useInfiniteQuery, useQuery } from "react-query";
import {
  checkSlugAvailability,
  getAllBeds,
  getAllBedsWithImage,
  getAllBedsWithImageAdmin,
  getAllHeadboardsWithImageAdmin,
  getAllIcons,
  getAllOrders,
  getBedById,
  getBedVariantById,
  getHeadboardById,
  getHeadboardVariantById,
  getIconAllByType,
  getIconAllByTypeAndSize,
  getIconById,
  getIconsByType,
  getOrderById,
} from "./api";
import {
  getBuildYourBeds,
  getBuildYourBedsVariantsById,
  getColorsVariantsBySizeVariantId,
} from "./api/build-your-bed";
import {
  Accessories,
  Bed,
  BedResponse,
  BedWithImage,
  BedWithSize,
  Order,
} from "./types";

export const useFetchAllBeds = () =>
  useInfiniteQuery(
    "beds",
    ({ pageParam = 1 }): Promise<BedResponse> => getAllBeds({ pageParam }),
    {
      refetchOnMount: true,
      getNextPageParam: (lastPage: any) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );

export const useFetchAllBedsWithImage = () =>
  useInfiniteQuery(
    "beds-image",
    ({ pageParam = 1 }): Promise<BedResponse> =>
      getAllBedsWithImage({ pageParam }),
    {
      refetchOnMount: true,
      getNextPageParam: (lastPage: any) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );
export const useFetchAllBedsWithImageAdmin = () =>
  useInfiniteQuery(
    "beds-image-admin",
    ({ pageParam = 1 }): Promise<BedResponse> =>
      getAllBedsWithImageAdmin({ pageParam }),
    {
      refetchOnMount: true,

      getNextPageParam: (lastPage: any) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );

export const useFetchAllHeadboardsWithImageAdmin = () =>
  useInfiniteQuery(
    "headboard-image-admin",
    ({ pageParam = 1 }): Promise<BedResponse> =>
      getAllHeadboardsWithImageAdmin({ pageParam }),
    {
      refetchOnMount: true,

      getNextPageParam: (lastPage: any) => {
        if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
        return undefined;
      },
    }
  );

export const useFetchBedById = (id: string) =>
  useQuery(["bed", id], (): Promise<Bed> => getBedById(id), {
    enabled: !!id,
  });

export const useFetchHeadboardById = (id: string) =>
  useQuery(["headboard", id], (): Promise<Bed> => getHeadboardById(id), {
    enabled: !!id,
  });

export const useFetchHeadboardVariantById = (id: string) =>
  useQuery(
    ["headboard-variant", id],
    (): Promise<Bed> => getHeadboardVariantById(id),
    {
      enabled: !!id,
    }
  );

export const useFetchBedVariantsById = (id: string) =>
  useQuery(
    ["bed-variant", id],
    (): Promise<BedWithImage> => getBedVariantById(id),
    {
      enabled: !!id,
    }
  );

export const useFetchBedVariantsByIdAndSize = (id: string, size: string) =>
  useQuery(
    ["bed-variant", id, size],
    (): Promise<BedWithSize> => getBedVariantById(id, size),
    {
      refetchOnMount: true,
      enabled: !!id && !!size,
    }
  );

export const useFetchIconsByType = (type: string, id: string) =>
  useQuery(
    ["icons", type, id],
    (): Promise<Accessories[]> => getIconsByType(type, id),
    {
      refetchOnMount: true,
      enabled: !!type && !!id,
    }
  );

export const useFetchIconById = (id: string) =>
  useQuery(["icon", id], (): Promise<Accessories> => getIconById(id), {
    refetchOnMount: true,
    enabled: !!id,
  });

export const useFetchAllIconByType = (type: string) =>
  useQuery(
    ["icon-all", type],
    (): Promise<Accessories[]> => getIconAllByType(type),
    {
      refetchOnMount: true,
      enabled: !!type,
    }
  );

export const useFetchAllIconByTypeAndSize = (type: string, size: string) =>
  useQuery(
    ["icon-all", type, size],
    (): Promise<Accessories[]> => getIconAllByTypeAndSize(type, size),
    {
      refetchOnMount: true,
      enabled: !!type && !!size,
    }
  );

export const useFetchAllIcons = () =>
  useQuery("icons", (): Promise<Accessories[]> => getAllIcons(), {
    refetchOnMount: true,
  });

export const useFetchAllOrders = () =>
  useQuery("orders", (): Promise<Order[]> => getAllOrders(), {
    refetchOnMount: false,
  });

export const useFetchOrderById = (id: string) =>
  useQuery(["order", id], (): Promise<Order> => getOrderById(id), {
    refetchOnMount: false,
    enabled: !!id,
  });

export const useCheckSlugAvailability = (slug: string) =>
  useQuery(
    ["slug", slug],
    (): Promise<boolean> => checkSlugAvailability(slug),
    {
      refetchOnMount: false,
      enabled: !!slug,
    }
  );

export const useGetBuildYourBeds = () =>
  useQuery("build-your-beds", (): Promise<Bed[]> => getBuildYourBeds());

export const useGetBuildYourBedsVariantsById = (id: string) =>
  useQuery(
    ["build-your-beds-variants", id],
    (): Promise<BedWithImage> => getBuildYourBedsVariantsById(id),
    {
      enabled: !!id,
    }
  );

export const useGetColorsVariantsBySizeVariantId = (id: string) =>
  useQuery(
    ["colors-variants", id],
    (): Promise<BedWithImage> => getColorsVariantsBySizeVariantId(id),
    {
      enabled: !!id,
    }
  );
