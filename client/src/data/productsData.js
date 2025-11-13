import img1 from "../assets/images/product_20ml.jpeg";
import img2 from "../assets/images/product_50ml.jpeg";
import img3 from "../assets/images/product_110ml.jpeg";
import img4 from "../assets/images/product_210ml.jpeg";
import img5 from "../assets/images/product_300ml.jpeg";

// Helper to get current discount
const getCurrentDiscount = () => {
    const claimed = localStorage.getItem("offerClaimed") === "yes";
    return claimed
        ? Number(localStorage.getItem("userClaimedDiscount")) || 15 // claimed discount
        : 10; // default 10% if not claimed
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
        originalPrice: 36,
        basePrice: 36,
        isAvailable: false,
        images: [img1, img2, img3],
        sizes: [
            { label: "20ml", multiplier: 1 },
            // { label: "50ml", multiplier: 2.3 },
            // { label: "210ml", multiplier: 8.5 },
            // { label: "300ml", multiplier: 11 },
        ],
        whatsOnPack: {
            mrp: "₹36 (incl. all taxes)",
            netQty: "20ml",
            batchNo: "AL2025B07",
            mfg: "Aug 2025",
            exp: "Jul 2027",
            manufacturer: "Chirveda Naturals Pvt. Ltd., Baramati, India",
        },
    },
    {
        id: 2,
        image: img2,
        title: "Pure Aloe Vera Gel",
        description: "Deeply nourishes your skin, keeping it soft and glowing.",
        rating: 4.8,
        reviews: "852",
        originalPrice: 66,
        basePrice: 66,
        isAvailable: true,
        images: [img2, img1, img3],
        sizes: [
            { label: "20ml", multiplier: 1 },
            // { label: "50ml", multiplier: 2.3 },
            // { label: "210ml", multiplier: 8.5 },
            // { label: "300ml", multiplier: 11 },
        ],
        whatsOnPack: {
            mrp: "₹66 (incl. all taxes)",
            netQty: "20ml",
            batchNo: "AL2025B07",
            mfg: "Aug 2025",
            exp: "Jul 2027",
            manufacturer: "Chirveda Naturals Pvt. Ltd., Baramati, India",
        },
    },
    {
        id: 3,
        image: img3,
        title: "Pure Aloe Vera Gel",
        description: "Gently cleanses scalp and strengthens hair naturally.",
        rating: 4.5,
        reviews: "603",
        sizes: [
            // { label: "20ml", multiplier: 1 },
            { label: "110ml", multiplier: 2.8 },
            // { label: "210ml", multiplier: 8.5 },
            // { label: "300ml", multiplier: 11 },
        ],
        originalPrice: 122,
        basePrice: 122,
        images: [img3, img2, img1],
        isAvailable: true,
        whatsOnPack: {
            mrp: "₹122 (incl. all taxes)",
            netQty: "110ml",
            batchNo: "AL2025B07",
            mfg: "Aug 2025",
            exp: "Jul 2027",
            manufacturer: "Chirveda Naturals Pvt. Ltd., Baramati, India",
        },
    },


    {
        id: 4,
        image: img4,
        title: "Pure Aloe Vera Gel",
        description:
            "Removes impurities while maintaining natural moisture balance.",
        rating: 4.7,
        reviews: "921",
        sizes: [
            // { label: "20ml", multiplier: 1 },
            // { label: "110ml", multiplier: 2.8 },
            { label: "210ml", multiplier: 4.2 },
            // { label: "300ml", multiplier: 11 },
        ],
        originalPrice: 216,
        basePrice: 216,
        images: [img4, img2, img1],
        isAvailable: true,
        whatsOnPack: {
            mrp: "₹216 (incl. all taxes)",
            netQty: "210ml",
            batchNo: "AL2025B07",
            mfg: "Aug 2025",
            exp: "Jul 2027",
            manufacturer: "Chirveda Naturals Pvt. Ltd., Baramati, India",
        },
    },


    {
        id: 5,
        image: img5,
        title: "Pure Aloe Vera Gel",
        description:
            "Removes impurities while maintaining natural moisture balance.",
        rating: 4.7,
        reviews: "921",
        sizes: [
            // { label: "20ml", multiplier: 1 },
            // { label: "110ml", multiplier: 2.3 },
            // { label: "210ml", multiplier: 4.2 },
            { label: "300ml", multiplier: 6.0 },
        ],
        originalPrice: 349,
        basePrice: 349,
        images: [img5, img2, img1],
        isAvailable: true,
        whatsOnPack: {
            mrp: "₹349 (incl. all taxes)",
            netQty: "300ml",
            batchNo: "AL2025B07",
            mfg: "Aug 2025",
            exp: "Jul 2027",
            manufacturer: "Chirveda Naturals Pvt. Ltd., Baramati, India",
        },
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
