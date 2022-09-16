import { nanoid } from "@reduxjs/toolkit";

const ADD = `ADD`
const REMOVE = `REMOVE`
const UPDATE = `UPDATE`


interface ActionTypes {
    type: string;
    payload: any;
    [key: string]: any
}

interface StateTypes {
    id: string;
    color: any
    image: any
    [key: string]: any
}

const initialState: StateTypes[] = [
    {
        id: 'g6s3yG',
        color: 'blue-plus',
        image: 'base64'
    },
]

const inputfieldSlice = {
    initialState,
    reducer: (state: StateTypes[], action: ActionTypes) => {
        switch (action.type) {
            case ADD:
                return [...state, action.payload];
            case REMOVE:
                return state.filter((data) => data.id !== action.payload)
            case UPDATE:
                const finder = state.find((data) => data.id === action.payload.id)
                if (finder) {
                    finder.color = action.payload.color
                    finder.image = action.payload.image
                }
                else {
                    return [...state, action.payload];

                }
            default:
                return state;
        }
    },
    actions: {
        addField: () => ({ type: ADD, payload: { id: nanoid(6) } }),
        removeField: (payload: any) => ({ type: REMOVE, payload: payload }),
        updateField: (payload: any) => ({ type: UPDATE, payload: payload }),
    },
};

export default inputfieldSlice
