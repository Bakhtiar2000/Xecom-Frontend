import Title from "@/components/sections/shared/Title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CustomerProfile() {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Title mainTitle="Profile Settings" />
        <Button>Save Changes</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input placeholder="John" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input placeholder="Doe" className="mt-1" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="john.doe@example.com" className="mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <Input placeholder="+1 (555) 123-4567" className="mt-1" />
              </div>

              <div>
                <label className="text-sm font-medium">Date of Birth</label>
                <Input type="date" className="mt-1" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Picture */}
        <div>
          <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
              <CardDescription>
                Upload a profile picture to personalize your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-center">
              <div className="bg-muted mx-auto flex h-32 w-32 items-center justify-center rounded-full">
                <span className="text-muted-foreground text-4xl">👤</span>
              </div>
              <Button variant="outline" className="w-full">
                Upload New Picture
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Account Security */}
      <Card className="bg-background border-border rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg">
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>Manage your account security and password settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <label className="text-sm font-medium">Current Password</label>
            <Input type="password" placeholder="Enter current password" className="mt-1" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">New Password</label>
              <Input type="password" placeholder="Enter new password" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm Password</label>
              <Input type="password" placeholder="Confirm new password" className="mt-1" />
            </div>
          </div>

          <Button variant="outline">Update Password</Button>
        </CardContent>
      </Card>
    </div>
  );
}
