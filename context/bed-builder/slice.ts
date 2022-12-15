import { slicer } from "mini-state";
import { ActionTypes } from "context/variant";
import { BuildYourBedTypes } from "typings/build-your-bed";


export type StateTypes = Partial<BuildYourBedTypes>

export const init: StateTypes = {
    general: {
        "color": "",
        "image": null,
        "salePrice": 0,
        "basePrice": 0
    },
    feet: [{
        name: '',
        price: ''
    }],
    storage: [{
        name: '',
        price: ''
    }],
    mattress: [{
        name: '',
        price: ''
    }],
    headboard: [{
        name: '',
        price: ''
    }],
};

export const { initialState, reducer, actions } = slicer<StateTypes>({
    initialState: init,
    reducer: {
        updateYourBedVariants: (state: StateTypes, action: ActionTypes) => {
            return {
                ...state,
                [action.payload.key]: action.payload.value,
            };
        },
        ["RESET"]: (state: StateTypes) => {
            return { ...state, ...init, };
        },
    },
});

