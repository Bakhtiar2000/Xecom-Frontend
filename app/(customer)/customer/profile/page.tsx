import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function CustomerProfile() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Profile Settings</h2>
                <Button>Save Changes</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <div className="lg:col-span-2">
                    <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                Update your personal details and contact information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle>Profile Picture</CardTitle>
                            <CardDescription>
                                Upload a profile picture to personalize your account.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
                                <span className="text-4xl text-gray-500">👤</span>
                            </div>
                            <Button variant="outline" className="w-full">
                                Upload New Picture
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Account Security */}
            <Card className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                        Manage your account security and password settings.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Current Password</label>
                        <Input type="password" placeholder="Enter current password" className="mt-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">New Password</label>
                            <Input type="password" placeholder="Enter new password" className="mt-1" />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Confirm Password</label>
                            <Input type="password" placeholder="Confirm new password" className="mt-1" />
                        </div>
                    </div>

                    <Button variant="outline">
                        Update Password
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}