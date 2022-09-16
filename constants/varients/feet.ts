import { sizes } from "."
import { PayloadType } from "./varients"


export const FeetArray = (size: string) => {
    switch (size) {
        case sizes["2.6 FEET"]:
            return [
                {
                    key: '',
                    text: '',
                    value: ''
                },
            ] as PayloadType
        case sizes["3 FEET"]:
            return [
                {
                    key: '',
                    text: '',
                    value: ''
                },
            ] as PayloadType
        case sizes["4 FEET"]:
            return [
                {
                    key: '',
                    text: '',
                    value: ''
                },
            ] as PayloadType
        case sizes["4.6 FEET"]:
            return [
                {
                    key: '',
                    text: '',
                    value: ''
                },
            ] as PayloadType
        case sizes["5 FEET"]:
            return [
                {
                    key: '',
                    text: '',
                    value: ''
                },
            ] as PayloadType
        case sizes["6 FEET"]:
            return [
                {
                    key: '',
                    text: '',
                    value: ''
                },
            ] as PayloadType
        default:
            return null
    }
}

export default FeetArray;