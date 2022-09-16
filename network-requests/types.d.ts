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
interface VariantsTypes {
    _id?: string;
    image: string | null;
    price: {
        basePrice: number;
        salePrice: number;
    };
    size?: string | number;
    accessories?: AccessoriesTypes;
}

type Bed = {
    _id: string;
    name: string;
    description: string;
    variants: VariantsTypes[];
    categories: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
};

interface BedRequestPayload {
    name: string;
    description: string;
    categories: string[];
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
};
type UpdateColorIcon = {
    id: string;
    label: string;
    value: string;
    image: File;
    type: string;
};

interface Accessories {
    _id: string;
    label: string;
    value: string;
    type: string;
    image: string;
}
