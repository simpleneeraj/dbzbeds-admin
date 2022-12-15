import React from 'react';

interface VariantType {
    _id?: string;
    name: string;
    price: string;
    image?: string;
}


interface BuildYourBedTypes {
    _id: string;
    general: {
        color: string;
        image: null;
        salePrice: number;
        basePrice: number;
    }
    headboard: VariantType[];
    storage: VariantType[];
    feet: VariantType[];
    mattress: VariantType[]
}

  // color: '',
    // price: 0,
    // image: '',

     // color: string;
    // price?: number;
    // image: string;