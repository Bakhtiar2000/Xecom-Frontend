import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CustomerSettings() {
  return (
    <div>
      <Title mainTitle="Account Settings" />

      {/* Profile Settings */}
      <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-muted-foreground mb-2 block text-sm font-medium">
                First Name
              </label>
              <Input placeholder="John" />
            </div>
            <div>
              <label className="text-muted-foreground mb-2 block text-sm font-medium">
                Last Name
              </label>
              <Input placeholder="Doe" />
            </div>
          </div>

          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium">
              Email Address
            </label>
            <Input type="email" placeholder="john.doe@example.com" />
          </div>

          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium">
              Phone Number
            </label>
            <Input type="tel" placeholder="+1 (555) 123-4567" />
          </div>

          <Button>Update Profile</Button>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium">
              Current Password
            </label>
            <Input type="password" />
          </div>

          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium">
              New Password
            </label>
            <Input type="password" />
          </div>

          <div>
            <label className="text-muted-foreground mb-2 block text-sm font-medium">
              Confirm New Password
            </label>
            <Input type="password" />
          </div>

          <Button>Change Password</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-muted-foreground text-sm">
                Receive email updates about your orders
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-muted-foreground text-sm">Receive SMS updates about your orders</p>
            </div>
            <Button variant="outline" size="sm">
              Disabled
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-muted-foreground text-sm">
                Receive promotional emails and newsletters
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Download Account Data</p>
              <p className="text-muted-foreground text-sm">
                Download a copy of your account information
              </p>
            </div>
            <Button variant="outline">Download</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary font-medium">Delete Account</p>
              <p className="text-muted-foreground text-sm">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="outline" className="text-primary border-danger hover:bg-danger-light">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
