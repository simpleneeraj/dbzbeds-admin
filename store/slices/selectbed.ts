// FOR BED SELECT BY OPTIONS

import { createSlice } from "@reduxjs/toolkit";

interface BedTypes {
    bed: {
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
}

const initialState: BedTypes = {
    bed: {
        size: "",
        name: "",
        image: "",
        price: 0,
    },
    accessories: {
        color: {
            name: "",
            image: "",
        },
        headboard: {
            name: "",
            price: 0,
        },
        storage: {
            name: "",
            price: 0,
        },
        feet: {
            name: "",
            price: 0,
        },
        mattress: {
            name: "",
            price: 0,
        },
    },
    total: 0,
};

const selectbedSlice = createSlice({
    name: "Select Bed",
    initialState: initialState,
    reducers: {
        setBed: (state, action) => {
            state.bed = { ...state.bed, ...action.payload };
        },
        setBedColor: (state, action) => {
            state.accessories.color = {
                ...state.accessories.color,
                ...action.payload,
            };
        },
        setBedHeadBoard: (state, action) => {
            state.accessories.headboard = {
                ...state.accessories.headboard,
                ...action.payload,
            };
        },
        setBedStorage: (state, action) => {
            state.accessories.storage = {
                ...state.accessories.storage,
                ...action.payload,
            };
        },
        setBedFeet: (state, action) => {
            state.accessories.feet = {
                ...state.accessories.feet,
                ...action.payload,
            };
        },
        setBedMatters: (state, action) => {
            state.accessories.mattress = {
                ...state.accessories.mattress,
                ...action.payload,
            };
        },
        setTotalPrice: (state, action) => {
            state.total = action.payload;
        },
    },
});

export default selectbedSlice;
