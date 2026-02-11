import { Review } from "@/types";
import shoes8 from "../assets/shoes/shoes8.png";

export const productReviews: Review[] = [
  {
    id: "1",
    userName: "Alice Johnson",
    userEmail: "alice@gmail.com",
    userImage: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    rating: 4.5,
    comment: "Great product, really loved it!",
    date: "2025-01-20",
    images: [shoes8, shoes8, shoes8, shoes8],
  },
];
