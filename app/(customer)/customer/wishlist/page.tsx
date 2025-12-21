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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
        <p className="text-gray-600">{wishlistItems.length} items</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="card-elevated">
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-400">Product Image</span>
              </div>

              <h3 className="font-semibold mb-2">{item.name}</h3>

              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold text-primary">{item.price}</span>
                {item.onSale && (
                  <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                )}
                {item.onSale && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
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

                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  Remove from Wishlist
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {wishlistItems.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-4">Save items you love so you can easily find them later.</p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}