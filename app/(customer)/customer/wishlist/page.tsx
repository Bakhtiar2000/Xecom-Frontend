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
      onSale: true
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "/placeholder-product.jpg",
      inStock: true,
      onSale: false
    },
    {
      id: 3,
      name: "Laptop Stand Adjustable",
      price: "$45.99",
      originalPrice: "$45.99",
      image: "/placeholder-product.jpg",
      inStock: false,
      onSale: false
    }
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">My Wishlist</h1>
        <p className="text-muted-foreground">{wishlistItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="bg-background rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                <span className="text-muted-foreground">Product Image</span>
              </div>

              <h3 className="font-semibold mb-2">{item.name}</h3>

              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold text-primary">{item.price}</span>
                {item.onSale && (
                  <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                )}
                {item.onSale && (
                  <span className="text-xs bg-accent text-danger px-2 py-1 rounded-full">
                    Sale
                  </span>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <Button
                  className="w-full"
                  disabled={!item.inStock}
                >
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>

                <Button variant="outline" className="w-full text-primary hover:text-danger">
                  Remove from Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <Card className="bg-background rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
          <CardContent className="p-4 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-muted-foreground mb-4">Save items you love so you can easily find them later.</p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}