import { slicer } from "mini-state";
import { ActionTypes, ContextType, StateTypes } from "context/variant";

export const init = {
    general: {} as any,
    color: [],
    headboard: [],
    feet: [],
    mattress: [],
    storage: [],
};

const { initialState, reducer, actions } = slicer<ContextType>({
    initialState: init,
    reducer: {
        ["GENERAL"]: (state: StateTypes, action: ActionTypes) => {
            return {
                ...state,
                general: action.payload,
            };
        },
        ["COLOR"]: (state: StateTypes, action: ActionTypes) => {
            return {
                ...state,
                color: action.payload,
            };
        },
        ["HEADBOARD"]: (state: StateTypes, action: ActionTypes) => {
            return {
                ...state,
                headboard: action.payload,
            };
        },
        ["FEET"]: (state: StateTypes, action: ActionTypes) => {
            return {
                ...state,
                feet: action.payload,
            };
        },
        ["MATTRESS"]: (state: StateTypes, action: ActionTypes) => {
            return {
                ...state,
                mattress: action.payload,
            };
        },
        ["STORAGE"]: (state: StateTypes, action: ActionTypes) => {
            return {
                ...state,
                storage: action.payload,
            };
        },
        // ["WHOLESTATE"]: (state: StateTypes, action: ActionTypes) => {
        //     return Object.assign(state, action.payload)
        // },
    },
});

export { initialState, reducer, actions };
