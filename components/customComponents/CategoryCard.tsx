// components/category/CategoryCard.tsx
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Category } from "@/types";

type Props = {
  category: Category;
  active?: boolean;
};

export default function CategoryCard({ category, active }: Props) {
  return (
    <Card
      className={`
        relative flex flex-col items-center justify-center
       max-w-65 lg:h-85 h-55 lg:my-10 my-5
        rounded-full border-0 shadow-md
        transition-all duration-300
        ${active ? "ring-4 ring-primary " : ""}
      `}
    >
      <Image
        src={category.image}
        alt={category.title}
        fill
        className={`rounded-full object-cover h-full w-full ${active ? "hover:shadow-2xl cursor-pointer" : ""}`}
      />
      <p className="z-100 absolute bottom-5 lg:bottom-10 text-xl font-semibold text-white tracking-wide">{category.title}</p>
    </Card>
  );
}

// import Image from "next/image";
// import { Card } from "@/components/ui/card";
// import { Category } from "@/types";

// type Props = {
//   category: Category;
//   active?: boolean;
// };

// export default function CategoryCard({ category, active }: Props) {
//   return (
//     <Card
//       className={`
//         group relative overflow-hidden
//         w-full max-w-sm mx-auto
//         rounded-2xl border-0
//         bg-linear-to-br ${category.bg}
//         transition-all duration-300
//         ${active ? "ring-4 ring-primary scale-105" : "hover:scale-105"}
//       `}
//     >
//       {/* IMAGE */}
//       <div className="relative w-full aspect-[4/3]">
//         <Image
//           src={category.image}
//           alt={category.title}
//           fill
//           priority
//           className="
//             object-contain
//             transition-transform duration-300
//             group-hover:scale-110
//           "
//         />

//         {/* Optional overlay */}
//         <div className="absolute inset-0 bg-black/5" />
//       </div>

//       {/* TITLE */}
//       <div className="p-4 text-center">
//         <p className="font-semibold text-white tracking-wide">
//           {category.title}
//         </p>
//       </div>
//     </Card>
//   );
// }
