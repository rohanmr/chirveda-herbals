import img1 from "../assets/images/imgtwo.jpeg";
import img2 from "../assets/images/imagefive.jpeg";
import img3 from "../assets/images/imgfor.jpeg";
import img4 from "../assets/images/imgthree.jpeg";

// Helper to get current discount
const getCurrentDiscount = () => {
    const claimed = localStorage.getItem("offerClaimed") === "yes";
    return claimed
        ? Number(localStorage.getItem("userClaimedDiscount")) || 15 // claimed discount
        : 5; // default 5% if not claimed
};

// Helper to calculate discounted price and offer text
const calculateDiscount = (basePrice) => {
    const discountPercent = getCurrentDiscount();
    const discountedPrice = Math.round(basePrice * (1 - discountPercent / 100));
    return {
        discountedPrice,
        discountPercent: `${discountPercent}%`,
        offerText: `Save ₹${basePrice - discountedPrice}`,
    };
};

const products = [
    {
        id: 1,
        image: img1,
        title: "Pure Aloe Vera Gel",
        description: "Instantly hydrates & soothes dry or irritated skin.",
        rating: 4.6,
        reviews: "1,245",
        originalPrice: 350,
        basePrice: 499,
        isAvailable: true,
        images: [img1, img2, img3],
        sizes: [
            { label: "50g", multiplier: 1 },
            { label: "100g", multiplier: 1.8 },
            { label: "250g", multiplier: 4.2 },
        ],
        whatsOnPack: {
            mrp: "₹499 (incl. all taxes)",
            netQty: "100g",
            batchNo: "AL2025B07",
            mfg: "Aug 2025",
            exp: "Jul 2027",
            manufacturer: "Chirveda Naturals Pvt. Ltd., Baramati, India",
        },
    },
    {
        id: 2,
        image: img2,
        title: "Aloe Vera Moisturizing Cream",
        description: "Deeply nourishes your skin, keeping it soft and glowing.",
        rating: 4.8,
        reviews: "852",
        originalPrice: 499,
        basePrice: 499,
        isAvailable: true,
        images: [img1, img2, img3],
        sizes: [
            { label: "50g", multiplier: 1 },
            { label: "100g", multiplier: 1.8 },
            { label: "250g", multiplier: 4.2 },
        ],
        whatsOnPack: {
            mrp: "₹499 (incl. all taxes)",
            netQty: "100g",
            batchNo: "AL2025B07",
            mfg: "Aug 2025",
            exp: "Jul 2027",
            manufacturer: "Chirveda Naturals Pvt. Ltd., Baramati, India",
        },
    },
    {
        id: 3,
        image: img3,
        title: "Aloe Vera Shampoo",
        description: "Gently cleanses scalp and strengthens hair naturally.",
        rating: 4.5,
        reviews: "603",
        originalPrice: 599,
        basePrice: 599,
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
        basePrice: 499,
        isAvailable: false,
    },
];

// Apply dynamic discount for all products
const productsWithDynamicDiscount = products.map((product) => {
    const { discountedPrice, discountPercent, offerText } = calculateDiscount(
        product.basePrice
    );
    return {
        ...product,
        discountedPrice,
        discountPercent,
        offerText,
    };
});

export default productsWithDynamicDiscount;
