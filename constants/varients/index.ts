
// HeadboardArray
// StorageArray
// FeetArray
// MattressArray

import { PayloadType } from "./varients"

// BED SIZES
export const sizes = {
    // '2 FEET': '2',
    '2.6 FEET': '2.6',
    '3 FEET': '3',
    '4 FEET': '4',
    '4.6 FEET': '4.6',
    '5 FEET': '5',
    '6 FEET': '6',
}

export const bedSizeArray = [
    {
        key: '',
        text: `Available Sizes`,
        value: null,
    },
    {
        key: '2.6 FEET',
        text: `(2'6 x 6)- Small Single`,
        value: sizes["2.6 FEET"],
    },
    {
        key: '3 FEET',
        text: `(3 x 6'3)- Single`,
        value: sizes["3 FEET"],
    },
    {
        key: '4 FEET',
        text: `(4' x 6'3) - Small Double`,
        value: sizes["4 FEET"],
    },
    {
        key: '4.6 FEET',
        text: `(4' x 6'3) - Double`,
        value: sizes["4.6 FEET"],
    },
    {
        key: '5 FEET',
        text: `(5' x 6'6) - King`,
        value: sizes["5 FEET"],
    },
    {
        key: '6 FEET',
        text: `(6' x 6'6) - Super King`,
        value: sizes["6 FEET"],
    },
] as PayloadType[]
