import { Review } from "@/types";
import shoes8 from "../assets/shoes/shoes8.png";
import shoes7 from "../assets/shoes/shoes5.png";
import shoes5 from "../assets/shoes/shoes8.png";
import shoes2 from "../assets/shoes/shoes2.jpg";

export const productReviews: Review[] = [
  {
    id: "1",
    userName: "Alice Johnson",
    userEmail: "alice@gmail.com",
    userImage: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe",
    rating: 4.5,
    comment: "Great product, really loved it!",
    date: "2025-01-20",
    images: [shoes7, shoes5, shoes2, shoes8],
  },
];
