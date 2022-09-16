import React from "react";

type Both = string | number;
// TYPES FOR BED SIZE
interface ProductDataTypes {
    id?: Both;
    content: any;
    iconUrl?: string;
    imageUrl?: string;
    price: Both;
    image?: string;
    name: string;
}
interface BedSizeProps {
    value: any;
    items: any;
    onClickItem: (value: ProductDataTypes) => void;
}
interface BedTypes {
    bed: {
        id: string;
        size: string;
        name: string;
        image: string;
        price: number;
    };

    accessories: {
        color: {
            name: string;
            image: string;
        };
        storage: {
            name: string;
            price: number;
        };
        feet: {
            name: string;
            price: number;
        };
        headboard: {
            name: string;
            price: number;
        };
        mattress: {
            name: string;
            price: number;
        };
    };
    total: number;
    quantity: number;
}

interface CartProductTypes {
    cartItems: BedTypes[];
    cartTotalQuantity: number;
    cartTotalAmount: number;
}

interface ProductProperties {
    price: string | number;
    size?: number | string;
    content: string;
    imageUrl: string;
    iconUrl: string;
}

// PRODUCT API DATA TYPES
interface SingleProductTypes {
    name: string;
    description: string;
    category: string;
    options: {
        bedSize: ProductProperties[];
        bedColor: ProductProperties[];
        // NO Need Image URL
        bedHeadBoard: ProductProperties[];
        bedStorage: ProductProperties[];
        bedFeet: ProductProperties[];
        bedMatters: ProductProperties[];
    };
}
