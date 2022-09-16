import { randomBytes } from "crypto";

const firstScreenProduct = [
  {
    id: randomBytes(8).toString("hex"),
    heading: `DBZBeds Grey Linen Divan Bed Set With 3 Panel Headboard`,
    // price: `179`,
    // imageUrl: `/product/color4ft/greylinen.png`,
    description: `Our range of beds come in single, double, king and super
                        king sizes are crafted with superior memory foam that
                        cradles your head and keeps your head and neck aligned
                        even while you sleep on your side and prevents the head
                        from sinking.`,
    content: `(2'6" x 6')- Small Single`,
    iconUrl:
      "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2.6ft_Single.jpg?v=1637690357&width=200&height=200",
    imageUrl: "/product/color/greylinen.png",
    price: `£89`,
    size: 2.6,
    bedColor: [
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/blue-plush-velvet-150x150.jpg",
        content: "blue plush",
        imageUrl: "/product/color/blueplush.png",
        price: `£900`,
      },
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/index-150x150.png",
        content: "grey linen",
        imageUrl: "/product/color/greylinen.png",
        price: `£900`,
      },
    ],
    bedHeadBoard: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/headboard-icon-02.jpg?v=1638187185&width=200&height=200",
        content: "26 Inch Headboard",
        imageUrl: "",
        price: `£78`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/floor-standing-headboard-icon-02.png?v=1641389356&width=200&height=200",
        content: "48 Inch Floor Standing Headboard",
        imageUrl: "",
        price: `£78`,
      },
    ],
    bedStorage: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/No-Storage-01.jpg?v=1639489840&width=200&height=200",
        content: `No Storage`,
        imageUrl: "",
        price: `£0`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2Foot_Side.jpg?v=1637688660&width=200&height=200",
        content: `2 Drawers Same side`,
        imageUrl: "",
        price: `£72`,
      },
    ],
    bedFeet: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/feets-02.png?v=1638533030&width=200&height=200",
        content: `Free Castor Wheels`,
        imageUrl: "",
        price: `free`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/feets-01.png?v=1638533030&width=200&height=200",
        content: `Chrome Gliders `,
        imageUrl: "",
        price: `£20`,
      },
    ],
    bedMatters: [
      {
        content: `No Mattress`,
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/no-mattress-01.jpg?v=1638250016&width=200&height=200",
        imageUrl: "",
        price: `Free`,
      },
      {
        content: `2FT 6″ – Memory Foam Mattress – £89`,
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
        imageUrl: "",
        price: `£900`,
      },
    ],
  },
  {
    id: randomBytes(8).toString("hex"),
    heading: `DBZBeds Blue Plush Divan Bed Set With 3 Panel Headboard`,
    // price: `179`,
    // imageUrl: `/product/color4ft/blueplush.png`,
    description: `Memory foam Mattress topper provides an additional cushioning
                    to your regular memory foam mattress. The topper is made from
                    one inch gel foam which is to be placed above the memory foam
                    mattress.`,

    content: `(2'6" x 6')- Small Single`,
    iconUrl:
      "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2.6ft_Single.jpg?v=1637690357&width=200&height=200",
    imageUrl: "/product/color/blueplush.png",
    price: `£89`,
    size: 2.6,
    bedColor: [
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/blue-plush-velvet-150x150.jpg",
        content: "blue plush",
        imageUrl: "/product/color/blueplush.png",
        price: `£900`,
      },
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/index-150x150.png",
        content: "grey linen",
        imageUrl: "/product/color/greylinen.png",
        price: `£900`,
      },
    ],
    bedHeadBoard: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/headboard-icon-02.jpg?v=1638187185&width=200&height=200",
        content: "26 Inch Headboard",
        imageUrl: "",
        price: `£78`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/floor-standing-headboard-icon-02.png?v=1641389356&width=200&height=200",
        content: "48 Inch Floor Standing Headboard",
        imageUrl: "",
        price: `£78`,
      },
    ],
    bedStorage: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/No-Storage-01.jpg?v=1639489840&width=200&height=200",
        content: `No Storage`,
        imageUrl: "",
        price: `£0`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2Foot_Side.jpg?v=1637688660&width=200&height=200",
        content: `2 Drawers Same side`,
        imageUrl: "",
        price: `£72`,
      },
      // {
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Same_Side.jpg?v=1637688660&width=200&height=200",
      //     content: `2 Drawers Foot End`,
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/4_Drawer.jpg?v=1637688660&width=200&height=200",
      //     content: `4 Drawers `,
      //     imageUrl: "",
      //     price: `£900`,
      // },
    ],
    bedFeet: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/feets-02.png?v=1638533030&width=200&height=200",
        content: `Free Castor Wheels`,
        imageUrl: "",
        price: `free`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/feets-01.png?v=1638533030&width=200&height=200",
        content: `Chrome Gliders `,
        imageUrl: "",
        price: `£20`,
      },
    ],
    bedMatters: [
      {
        content: `No Mattress`,
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/no-mattress-01.jpg?v=1638250016&width=200&height=200",
        imageUrl: "",
        price: `Free`,
      },
      {
        content: `2FT 6″ – Memory Foam Mattress – £89`,
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
        imageUrl: "",
        price: `£900`,
      },
      // {
      //     content: `(4' x 6'3") - Small Double`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(4'6 x 6'3") - Small Double`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(5' x 6'6") - King`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/4image.jpg?v=1638181411&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(6' x 6'6") - Super King`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/3image.jpg?v=1638181411&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
    ],
  },
  {
    id: randomBytes(8).toString("hex"),
    heading: `DBZBeds Black Crushed Divan Bed Set With 3 Panel Headboard`,
    // price: `179`,
    // imageUrl: `/product/color4ft/blackcrushed.png`,
    description: `Our range of beds come in single, double, king and super king
                    sizes are crafted with superior memory foam that cradles your
                    head and keeps your head and neck aligned even while you sleep
                    on your side and prevents the head from sinking.`,

    content: `(2'6" x 6')- Small Single`,
    iconUrl:
      "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2.6ft_Single.jpg?v=1637690357&width=200&height=200",
    imageUrl: "/product/color/blackcrushed.png",
    price: `£89`,
    size: 2.6,
    bedColor: [
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/blue-plush-velvet-150x150.jpg",
        content: "blue plush",
        imageUrl: "/product/color/blueplush.png",
        price: `£900`,
      },
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/index-150x150.png",
        content: "grey linen",
        imageUrl: "/product/color/greylinen.png",
        price: `£900`,
      },
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/black-crushed-velvet-150x150.jpg",
        content: "black crushed",
        imageUrl: "/product/color/blackcrushed.png",
        price: `£900`,
      },
    ],
    bedHeadBoard: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/headboard-icon-02.jpg?v=1638187185&width=200&height=200",
        content: "26 Inch Headboard",
        imageUrl: "",
        price: `£78`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/floor-standing-headboard-icon-02.png?v=1641389356&width=200&height=200",
        content: "48 Inch Floor Standing Headboard",
        imageUrl: "",
        price: `£78`,
      },
    ],
    bedStorage: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/No-Storage-01.jpg?v=1639489840&width=200&height=200",
        content: `No Storage`,
        imageUrl: "",
        price: `£0`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2Foot_Side.jpg?v=1637688660&width=200&height=200",
        content: `2 Drawers Same side`,
        imageUrl: "",
        price: `£72`,
      },
      // {
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Same_Side.jpg?v=1637688660&width=200&height=200",
      //     content: `2 Drawers Foot End`,
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/4_Drawer.jpg?v=1637688660&width=200&height=200",
      //     content: `4 Drawers `,
      //     imageUrl: "",
      //     price: `£900`,
      // },
    ],
    bedFeet: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/feets-02.png?v=1638533030&width=200&height=200",
        content: `Free Castor Wheels`,
        imageUrl: "",
        price: `free`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/feets-01.png?v=1638533030&width=200&height=200",
        content: `Chrome Gliders `,
        imageUrl: "",
        price: `£20`,
      },
    ],
    bedMatters: [
      {
        content: `No Mattress`,
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/no-mattress-01.jpg?v=1638250016&width=200&height=200",
        imageUrl: "",
        price: `Free`,
      },
      {
        content: `2FT 6″ – Memory Foam Mattress – £89`,
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
        imageUrl: "",
        price: `£900`,
      },
      // {
      //     content: `(4' x 6'3") - Small Double`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(4'6 x 6'3") - Small Double`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(5' x 6'6") - King`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/4image.jpg?v=1638181411&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(6' x 6'6") - Super King`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/3image.jpg?v=1638181411&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
    ],
  },
  {
    id: randomBytes(8).toString("hex"),
    heading: `DBZBeds Cream Chanille Divan Bed Set With 3 Panel Headboard`,
    // price: `179`,
    // imageUrl: `/product/color4ft/creamchenille.png`,
    description: ` Our range of beds come in single, double, king and super king
                    sizes are crafted with superior memory foam that cradles your
                    head and keeps your head and neck aligned even while you sleep
                    on your side and prevents the head from sinking.`,

    content: `(2'6" x 6')- Small Single`,
    iconUrl:
      "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2.6ft_Single.jpg?v=1637690357&width=200&height=200",
    imageUrl: "/product/color/creamchanille.png",
    price: `£89`,
    size: 2.6,
    bedColor: [
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/blue-plush-velvet-150x150.jpg",
        content: "blue plush",
        imageUrl: "/product/color/blueplush.png",
        price: `£900`,
      },
      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/index-150x150.png",
        content: "grey linen",
        imageUrl: "/product/color/greylinen.png",
        price: `£900`,
      },

      {
        iconUrl:
          "https://www.bedsdivans.co.uk/wp-content/uploads/2021/01/cream-chenille-150x150.jpg",
        content: "cream chillien",
        imageUrl: "/product/color/creamchanille.png",
        price: `£900`,
      },
    ],
    bedHeadBoard: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/headboard-icon-02.jpg?v=1638187185&width=200&height=200",
        content: "26 Inch Headboard",
        imageUrl: "",
        price: `£78`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/floor-standing-headboard-icon-02.png?v=1641389356&width=200&height=200",
        content: "48 Inch Floor Standing Headboard",
        imageUrl: "",
        price: `£78`,
      },
    ],
    bedStorage: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/No-Storage-01.jpg?v=1639489840&width=200&height=200",
        content: `No Storage`,
        imageUrl: "",
        price: `£0`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2Foot_Side.jpg?v=1637688660&width=200&height=200",
        content: `2 Drawers Same side`,
        imageUrl: "",
        price: `£72`,
      },
      // {
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Same_Side.jpg?v=1637688660&width=200&height=200",
      //     content: `2 Drawers Foot End`,
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/4_Drawer.jpg?v=1637688660&width=200&height=200",
      //     content: `4 Drawers `,
      //     imageUrl: "",
      //     price: `£900`,
      // },
    ],
    bedFeet: [
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/feets-02.png?v=1638533030&width=200&height=200",
        content: `Free Castor Wheels`,
        imageUrl: "",
        price: `free`,
      },
      {
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/feets-01.png?v=1638533030&width=200&height=200",
        content: `Chrome Gliders `,
        imageUrl: "",
        price: `£20`,
      },
    ],
    bedMatters: [
      {
        content: `No Mattress`,
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/no-mattress-01.jpg?v=1638250016&width=200&height=200",
        imageUrl: "",
        price: `Free`,
      },
      {
        content: `2FT 6″ – Memory Foam Mattress – £89`,
        iconUrl:
          "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
        imageUrl: "",
        price: `£900`,
      },
      // {
      //     content: `(4' x 6'3") - Small Double`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(4'6 x 6'3") - Small Double`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/2_Pocket_Tinsel_Top_Mattres.png?v=1643459671&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(5' x 6'6") - King`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/4image.jpg?v=1638181411&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
      // {
      //     content: `(6' x 6'6") - Super King`,
      //     iconUrl:
      //         "https://cdn.shopify.com/s/files/1/0550/6315/0851/files/3image.jpg?v=1638181411&width=200&height=200",
      //     imageUrl: "",
      //     price: `£900`,
      // },
    ],
  },
];

export default firstScreenProduct;
