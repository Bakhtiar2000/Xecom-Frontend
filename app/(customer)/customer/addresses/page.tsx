import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CustomerAddresses() {
  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      isDefault: true
    },
    {
      id: 2,
      type: "Office",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10016",
      phone: "+1 (555) 987-6543",
      isDefault: false
    }
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">My Addresses</h1>
        <Button>Add New Address</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.map((address) => (
          <Card key={address.id} className="bg-background rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center space-x-2">
                  <span>{address.type}</span>
                  {address.isDefault && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="font-medium">{address.name}</p>
                <p className="text-muted-foreground">{address.address}</p>
                <p className="text-muted-foreground">{address.city}</p>
                <p className="text-muted-foreground">{address.phone}</p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Delete
                </Button>
                {!address.isDefault && (
                  <Button variant="outline" size="sm" className="flex-1">
                    Set Default
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-background rounded-lg shadow-md border border-border hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-4 text-center border-2 border-dashed border-border">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h3 className="font-semibold mb-2">Add New Address</h3>
          <p className="text-muted-foreground mb-4">Add a new delivery address to your account</p>
          <Button>Add Address</Button>
        </CardContent>
      </Card>
    </div>
  );
}