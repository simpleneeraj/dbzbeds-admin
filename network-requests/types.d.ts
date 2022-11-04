import React from "react";

type GetAllBedsParams = {
    pageParam: number;
};

interface ProductType {
    name?: string;
    image?: string;
    price?: string;
}

interface AccessoriesTypes {
    color?: ProductType[];
    storage?: ProductType[];
    feet?: ProductType[];
    headboard?: ProductType[];
    mattress?: ProductType[];
}

interface AccessoriesOrderTypes {
    color?: ProductType;
    storage?: ProductType;
    feet?: ProductType;
    headboard?: ProductType;
    mattress?: ProductType;
}
interface VariantsTypes {
    _id?: string;
    image: string | null;
    price: {
        basePrice: number;
        salePrice: number;
    };
    size?: string | number;
    accessories?: AccessoriesTypes;
    createdAt?: string;
    updatedAt?: string;
    isDraft?: boolean;
}

type Bed = {
    image: string;
    _id: string;
    name: string;
    description: string;
    variants: VariantsTypes[];
    categories: string[];
    createdAt: string;
    updatedAt: string;
    isDraft: boolean;
    __v: number;
};

interface BedRequestPayload {
    name: string;
    description: string;
    categories: string[];
    isDraft: boolean;
}

type BedResponse = {
    data: Bed[];
    totalPages: number;
    nextPage: number;
};

type CreateBedVariantResponse = {
    message: string;
    data: VariantsTypes;
};

type UploadBedImage = {
    success: boolean;
    message: string;
    url: string;
};

type BedWithImage = {
    size?: string;
    _id?: string;
    name?: string;
    description?: string;
    isDraft?: boolean;

    categories?: string[];
    createdAt?: string;
    updatedAt?: string;
    image?: string;
    price?: {
        basePrice: number;
        salePrice: number;
    };
    accessories?: AccessoriesTypes;
    // __v: number;
};

type BedWithSize = {
    _id: string;
    name: string;
    description: string;
    categories: string[];
    variants: VariantsTypes[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    availabeSizes: string[];
};

type ColorIcon = {
    label: string;
    value: string;
    image: File;
    type: string;
    size: string;
};
type UpdateColorIcon = {
    id: string;
    label: string;
    value: string;
    image: File;
    type: string;
    size: string;
};

interface Accessories {
    _id: string;
    label: string;
    value: string;
    type: string;
    image: string;
    size: string;
}

export interface OrderItems {
    name: string;
    size: string;
    quantity: number;
    accessories: AccessoriesOrderTypes;
    price: number;
    image: string;
}
interface Order {
    orderId: Number;
    _id: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
    };
    orderItems: OrderItems[];
    shippingAddress?:
        | {
              address?: string | undefined;
              townCity?: string | undefined;
              postalCode?: string | undefined;
              country?: string | undefined;
              companyName?: string | undefined;
          }
        | undefined;
    totalPrice: number;

    payment?:
        | {
              paymentMethod: string;
              status: string;
              paymentResult?:
                  | {
                        id?: string | undefined;
                        status?: string | undefined;
                        update_time?: string | undefined;
                        email_address?: string | undefined;
                    }
                  | undefined;
          }
        | undefined;

    orderNotes?: string | undefined;

    isDelivered?: boolean | undefined;
    deliveredAt?: string | undefined;

    createdAt?: string | undefined;
    updatedAt?: string | undefined;
}
