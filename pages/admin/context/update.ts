
interface ActionType {
    type: string;
    payload: string;
}

interface InputType {
    id: string;
    name?: string;
    image?: string;
    price?: number;
}

interface TT {
    headboard: InputType[];
    storage: InputType[];
    feet: InputType[];
    mattress: InputType[];
}


const OB: InputType[] = [{
    id: 'NX9IF9',
    image: 'fake//',
    name: 'hello',
    price: 0
}]
const initialState: TT = {
    headboard: OB,
    storage: OB,
    feet: OB,
    mattress: OB,
}

const HEADBOARD = 'HEADBOARD'
const STORAGE = 'STORAGE'
const FEET = 'FEET'
const MATTRESS = 'MATTRESS'


const reducer = (state: TT, action: ActionType) => {
    switch (action.type) {
        case HEADBOARD:
            return {
                ...state,
                headboard: action.payload
            }
        case STORAGE:
            return {
                ...state,
                storage: action.payload
            }
        case FEET:
            return {
                ...state,
                feet: action.payload
            }
        case MATTRESS:
            return {
                ...state,
                mattress: action.payload
            }
        default:
            return state
    }
}


const actions = {
    setHeadboardInputs:
        (payload: any) => ({ type: HEADBOARD, payload: payload }),
    setStorageInputs:
        (payload: any) => ({ type: HEADBOARD, payload: payload }),
    setFeetInputs:
        (payload: any) => ({ type: HEADBOARD, payload: payload }),
    setMattressInputs:
        (payload: any) => ({ type: HEADBOARD, payload: payload }),
}
const updateBedSlice = {
    initialState,
    reducer,
    actions
}
export default updateBedSlice




// interface StateType {
//     headboard: BedType[];
//     storage: BedType[];
//     feet: BedType[];
//     mattress: BedType[];
// }


// const init: BedType[] = [
//     {
//         id: "7d24f79a",
//         name: "",
//         image: "",
//         price: 0
//     },
// ];

// const initialState: StateType = {
//     headboard: init,
//     storage: init,
//     feet: init,
//     mattress: init,
// }


// const HEADBOARD = 'HEADBOARD'
// const STORAGE = 'STORAGE'
// const FEET = 'FEET'
// const MATTRESS = 'MATTRESS'

// const updateBedSlice = {
//     initialState: initialState as StateType,
//     reducer: (state: StateType, action: ActionType) => {
//         switch (action.type) {
//             case HEADBOARD:
//                 return {
//                     ...state,
//                     headboard: action.payload
//                 }
//             case STORAGE:
//                 return {
//                     ...state,
//                     storage: action.payload
//                 }
//             case FEET:
//                 return {
//                     ...state,
//                     feet: action.payload
//                 }
//             case MATTRESS:
//                 return {
//                     ...state,
//                     mattress: action.payload
//                 }

//             default:
//                 return state
//         }
//     },
//     actions: {
//         setHeadboardInputs:
//             (payload: any) => ({ type: HEADBOARD, payload: payload }),
//         setStorageInputs:
//             (payload: any) => ({ type: STORAGE, payload: payload }),
//         setFeetInputs:
//             (payload: any) => ({ type: FEET, payload: payload }),
//         setMattressInputs:
//             (payload: any) => ({ type: MATTRESS, payload: payload }),
//     }
// };


// export default updateBedSlice
