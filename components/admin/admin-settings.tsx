"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Settings, Database, Cloud, CreditCard, Bell, Globe, Save, RefreshCw } from "lucide-react"

export function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: "GPL SmartHub",
    siteDescription: "Student accommodation platform",
    maintenanceMode: false,
    allowRegistrations: true,
    emailNotifications: true,
    smsNotifications: false,
    autoApproveListings: false,
    maxFileSize: "10",
    supportEmail: "gplsmarthub@gmail.com",
    supportPhone: "+2348153518887",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
  })
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings")
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        toast({
          title: "Settings Saved",
          description: "Your settings have been updated successfully.",
        })
      } else {
        throw new Error("Failed to save settings")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (initialLoading) {
    return (
      <div className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded shimmer"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* General Settings */}
      <Card className="hover-lift animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-orange-500" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleInputChange("siteName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleInputChange("supportEmail", e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={settings.siteDescription}
              onChange={(e) => handleInputChange("siteDescription", e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Platform Settings */}
      <Card className="hover-lift animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-orange-500" />
            Platform Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-gray-600">Temporarily disable the platform for maintenance</p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleInputChange("maintenanceMode", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Allow New Registrations</Label>
              <p className="text-sm text-gray-600">Allow new users to register on the platform</p>
            </div>
            <Switch
              checked={settings.allowRegistrations}
              onCheckedChange={(checked) => handleInputChange("allowRegistrations", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-approve Listings</Label>
              <p className="text-sm text-gray-600">Automatically approve new hostel listings</p>
            </div>
            <Switch
              checked={settings.autoApproveListings}
              onCheckedChange={(checked) => handleInputChange("autoApproveListings", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="hover-lift animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-500" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-gray-600">Send email notifications for important events</p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleInputChange("emailNotifications", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>SMS Notifications</Label>
              <p className="text-sm text-gray-600">Send SMS notifications for urgent matters</p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => handleInputChange("smsNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <Card className="hover-lift animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-orange-500" />
            Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                <span className="font-medium">Google Sheets</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-green-600" />
                <span className="font-medium">Cloudinary</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <span className="font-medium">Paystack</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Connected</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload Settings */}
      <Card className="hover-lift animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-orange-500" />
            File Upload Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleInputChange("maxFileSize", e.target.value)}
              />
            </div>
            <div>
              <Label>Allowed File Types</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">JPG</Badge>
                <Badge variant="outline">PNG</Badge>
                <Badge variant="outline">GIF</Badge>
                <Badge variant="outline">PDF</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="hover-lift animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-orange-500" />
            Social Media Links
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="facebookUrl">Facebook URL</Label>
            <Input
              id="facebookUrl"
              value={settings.facebookUrl}
              onChange={(e) => handleInputChange("facebookUrl", e.target.value)}
              placeholder="https://facebook.com/gplsmarthub"
            />
          </div>
          <div>
            <Label htmlFor="twitterUrl">Twitter URL</Label>
            <Input
              id="twitterUrl"
              value={settings.twitterUrl}
              onChange={(e) => handleInputChange("twitterUrl", e.target.value)}
              placeholder="https://twitter.com/gplsmarthub"
            />
          </div>
          <div>
            <Label htmlFor="instagramUrl">Instagram URL</Label>
            <Input
              id="instagramUrl"
              value={settings.instagramUrl}
              onChange={(e) => handleInputChange("instagramUrl", e.target.value)}
              placeholder="https://instagram.com/gplsmarthub"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <Button onClick={handleSave} disabled={loading} className="hover-scale">
          {loading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
