import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerWishlist() {
  const wishlistItems = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: "$89.99",
      originalPrice: "$129.99",
      image: "/placeholder-product.jpg",
      inStock: true,
      onSale: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "/placeholder-product.jpg",
      inStock: true,
      onSale: false,
    },
    {
      id: 3,
      name: "Laptop Stand Adjustable",
      price: "$45.99",
      originalPrice: "$45.99",
      image: "/placeholder-product.jpg",
      inStock: false,
      onSale: false,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Title mainTitle="My Wishlist" />
        <p className="text-muted-foreground">{wishlistItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wishlistItems.map((item) => (
          <Card
            key={item.id}
            className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <CardContent className="p-4">
              <div className="bg-muted mb-4 flex aspect-square items-center justify-center rounded-lg">
                <span className="text-muted-foreground">Product Image</span>
              </div>

              <h3 className="mb-2 font-semibold">{item.name}</h3>

              <div className="mb-4 flex items-center space-x-2">
                <span className="text-primary text-lg font-bold">{item.price}</span>
                {item.onSale && (
                  <span className="text-muted-foreground text-sm line-through">
                    {item.originalPrice}
                  </span>
                )}
                {item.onSale && (
                  <span className="bg-accent text-danger rounded-full px-2 py-1 text-xs">Sale</span>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <Button className="w-full" disabled={!item.inStock}>
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                <Button variant="outline" className="text-primary hover:text-danger w-full">
                  Remove from Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
          <CardContent className="p-4 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="text-muted-foreground h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4">
              Save items you love so you can easily find them later.
            </p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
