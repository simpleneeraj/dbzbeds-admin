// SIZE ARRAY
// COLOR ARRAY
// 'black crushed',
// 'black leather',
// 'black linen',
// 'blue plush',
// 'champain crushed',
// 'cream chenille',
// 'grey linen',
// 'grey plush',
// 'gun grey',
// 'pink crushed',
// 'silver crushed',
// 'white crushed'

export const colorArrayWithImages = [
  {
    "colorName": "Black Crushed Velvet",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/black-crushed-velvet-150x150.jpg"
  },
  {
    "colorName": "Black Leather",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/black-leather-150x150.jpg"
  },
  {
    "colorName": "Blue Plush Velvet",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/blue-plush-velvet-150x150.jpg"
  },
  {
    "colorName": "Champagne Crushed",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/cream-crushed-velvet-150x150.jpg"
  },
  {
    "colorName": "Charcoal Chenille",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/charcoal-chenille-150x150.jpg"
  },
  {
    "colorName": "Cream Chenille",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/cream-chenille-150x150.jpg"
  },
  {
    "colorName": "Grey Linen",
    "value": "grey linen",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/index-150x150"
  },
  {
    "colorName": "Pink Crushed Velvet",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2022/05/Light-Pink-And-Pale-Pink-Crushed-Velour-Fabric-Stretch-Material.jpg"
  },
  {
    "colorName": "Silver Crushed",
    "value": "silver crushed",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/silver-chrushed-valvet-150x150"
  },
  {
    "colorName": "Steel Plush Velvet",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/Steel-Plush-Velvet-3-150x150.jpg"
  },
  {
    "colorName": "White Crushed",
    "imageUrl": "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img/https://www.bedsdivans.co.uk/wp-content/uploads/2021/02/41N4mADNGvL._AC_-150x150.jpg"
  }
]

export const colorArray = [
  {
    "text": "Black Crushed",
    "value": "black crushed"
  },
  {
    "text": "Black Leather",
    "value": "black leather"
  },
  {
    "text": "Black Linen",
    "value": "black linen"
  },
  {
    "text": "Blue Plush",
    "value": "blue plush"
  },
  {
    "text": "Champain Crushed",
    "value": "champain crushed"
  },
  {
    "text": "Cream Chenille",
    "value": "cream chenille"
  },
  {
    "text": "Grey Linen",
    "value": "grey linen"
  },
  {
    "text": "Grey Plush",
    "value": "grey plush"
  },
  {
    "text": "Gun Grey",
    "value": "gun grey"
  },
  {
    "text": "Pink Crushed",
    "value": "pink crushed"
  },
  {
    "text": "Select Bed Color",
    "value": ""
  },
  {
    "text": "Silver Crushed",
    "value": "silver crushed"
  },
  {
    "text": "White Crushed",
    "value": "white crushed"
  }
]

// export const colorArray = [
//   {
//     text: "Select Bed Color",
//     value: "",
//   },
//   {
//     text: "Color One",
//     value: "Color One",
//   },
//   {
//     text: "Color Two",
//     value: "Color Two",
//   },
//   {
//     text: "Color Three",
//     value: "Color Three",
//   },
//   {
//     text: "Color Four",
//     value: "Color Four",
//   },
// ];

export const bedSizeArray = [
  {
    text: `Available Sizes`,
    value: null,
  },
  {
    text: `(2'6 x 6)- Small Single`,
    value: 2,
  },
  {
    text: `(3 x 6'3)- Single`,
    value: 3,
  },
  {
    text: `(4' x 6'3) - Small Double`,
    value: 4,
  },
  {
    text: `(4' x 6'3) - Double`,
    value: 5,
  },
  {
    text: `(5' x 6'6) - King`,
    value: 6,
  },
  {
    text: `(6' x 6'6) - Super King`,
    value: 7,
  },
];

export const HeadboardArray = [
  {
    text: `No Headboard`,
    value: ``,
  },
  {
    text: `26 Inch Diamond Button Cube Headboard- £45`,
    get value() {
      return this.text;
    },
  },
  {
    text: `26 Inch Matching Button Cube Headboard- £45`,
    get value() {
      return this.text;
    },
  },
  {
    text: `48 Inch Floor Standing Diamond Cube Headboard- £125`,
    get value() {
      return this.text;
    },
  },
  {
    text: `48 Inch Floor Standing Matching Button Cube Headboard- £125`,
    get value() {
      return this.text;
    },
  },
];
export const StorageArray = [
  {
    text: `No Drawers`,
    value: ``,
  },
  {
    text: `2 Drawers – £45`,
    get value() {
      return this.text;
    },
  },
];
export const FeetArray = [
  {
    text: `No Feet`,
    value: ``,
  },
  {
    text: `Free Castor Wheels`,
    get value() {
      return this.text;
    },
  },
  {
    text: `Chrome Gliders – £10`,
    get value() {
      return this.text;
    },
  },
];
export const MattressArray = [
  {
    text: `No Mattress`,
    value: ``

  },
  {
    text: `2FT 6″ – Memory Foam Mattress – £89`,
    get value() {
      return this.text
    }
  },
]
