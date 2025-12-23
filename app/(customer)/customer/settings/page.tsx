import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CustomerSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>

      {/* Profile Settings */}
      <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <Input placeholder="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <Input placeholder="Doe" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input type="email" placeholder="john.doe@example.com" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input type="tel" placeholder="+1 (555) 123-4567" />
          </div>
          
          <Button>Update Profile</Button>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Password
            </label>
            <Input type="password" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <Input type="password" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <Input type="password" />
          </div>
          
          <Button>Change Password</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email updates about your orders</p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-gray-600">Receive SMS updates about your orders</p>
            </div>
            <Button variant="outline" size="sm">
              Disabled
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing Emails</p>
              <p className="text-sm text-gray-600">Receive promotional emails and newsletters</p>
            </div>
            <Button variant="outline" size="sm">
              Enabled
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Account Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Download Account Data</p>
              <p className="text-sm text-gray-600">Download a copy of your account information</p>
            </div>
            <Button variant="outline">
              Download
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-600">Delete Account</p>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}