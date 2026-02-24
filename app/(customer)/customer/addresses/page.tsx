import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Title from "@/components/sections/shared/Title";

export default function CustomerAddresses() {
  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "John Doe",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10016",
      phone: "+1 (555) 987-6543",
      isDefault: false,
    },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Title mainTitle="My Addresses" />
        <Button>Add New Address</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <span>{address.type}</span>
                  {address.isDefault && (
                    <span className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                      Default
                    </span>
                  )}
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 space-y-2">
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

      <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
        <CardContent className="border-border border-2 border-dashed p-4 text-center">
          <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <svg
              className="text-muted-foreground h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <h3 className="mb-2 font-semibold">Add New Address</h3>
          <p className="text-muted-foreground mb-4">Add a new delivery address to your account</p>
          <Button>Add Address</Button>
        </CardContent>
      </Card>
    </div>
  );
}
