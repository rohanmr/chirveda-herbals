import img1 from "../assets/images/imgtwo.jpeg"
import img2 from "../assets/images/imagefive.jpeg"
import img3 from "../assets/images/imgfor.jpeg"
import img4 from "../assets/images/imgthree.jpeg"


const products = [
    {
        id: 1,
        image: img1,
        title: "Pure Aloe Vera Gel",
        description: "Instantly hydrates & soothes dry or irritated skin.",
        rating: 4.6,
        reviews: "1,245",
        originalPrice: 350,
        discountedPrice: 299,
        offerText: "Save ₹50",
        discountPercent: "15%",
        isAvailable: true,
    },
    {
        id: 2,
        image: img2,
        title: "Aloe Vera Moisturizing Cream",
        description: "Deeply nourishes your skin, keeping it soft and glowing.",
        rating: 4.8,
        reviews: "852",
        originalPrice: 499,
        discountedPrice: 424,
        offerText: "Save ₹75",
        discountPercent: "15%",
        isAvailable: true,
    },
    {
        id: 3,
        image: img3,
        title: "Aloe Vera Shampoo",
        description: "Gently cleanses scalp and strengthens hair naturally.",
        rating: 4.5,
        reviews: "603",
        originalPrice: 599,
        discountedPrice: 499,
        offerText: "Save ₹100",
        discountPercent: "17%",
        isAvailable: false,
    },
    {
        id: 4,
        image: img4,
        title: "Aloe Vera Gel EL",
        description:
            "Removes impurities while maintaining natural moisture balance.",
        rating: 4.7,
        reviews: "921",
        originalPrice: 499,
        discountedPrice: 379,
        offerText: "Save ₹120",
        discountPercent: "24%",
        isAvailable: false,
    },
];

export default products;
