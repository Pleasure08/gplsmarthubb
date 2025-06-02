"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import {
  AdminHostelForm,
  AdminMarketplaceForm,
  AdminDashboard,
  AdminSettings,
  AdminManagement,
  AIFeatureGenerator,
} from "@/components/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, Plus, BarChart3, Settings, Trash2, ShoppingBag, Sparkles } from "lucide-react"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Check against the environment variable
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "Pleasure2025"

    if (password === adminPassword) {
      setAuthenticated(true)
    } else {
      alert("Invalid password")
    }
    setLoading(false)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <Card className="w-full max-w-md animate-scale-in glass-effect">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4 animate-pulse-slow" />
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-gray-600">Enter your credentials to access the admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="transition-all duration-300 focus:scale-105"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full hover-scale bg-gradient-to-r from-orange-500 to-red-500"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                  </div>
                ) : (
                  "Access Admin Panel"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage your GPL SmartHub platform</p>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7 animate-slide-up">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="add-hostel" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Hostel
              </TabsTrigger>
              <TabsTrigger value="add-marketplace" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Add Item
              </TabsTrigger>
              <TabsTrigger value="ai-features" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                AI Features
              </TabsTrigger>
              <TabsTrigger value="manage" className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
                Manage
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="animate-fade-in">
              <AdminDashboard />
            </TabsContent>

            <TabsContent value="add-hostel" className="animate-fade-in">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5 text-orange-500" />
                    Add New Hostel
                  </CardTitle>
                  <p className="text-gray-600">Add a new hostel to the platform (1-4 images)</p>
                </CardHeader>
                <CardContent>
                  <AdminHostelForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add-marketplace" className="animate-fade-in">
              <Card className="hover-lift">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-orange-500" />
                    Add New Marketplace Item
                  </CardTitle>
                  <p className="text-gray-600">Add a new item to the marketplace (1-4 images)</p>
                </CardHeader>
                <CardContent>
                  <AdminMarketplaceForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-features" className="animate-fade-in">
              <AIFeatureGenerator />
            </TabsContent>

            <TabsContent value="manage" className="animate-fade-in">
              <AdminManagement />
            </TabsContent>

            <TabsContent value="analytics" className="animate-fade-in">
              <div className="grid gap-6">
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle>Platform Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Detailed analytics coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="animate-fade-in">
              <AdminSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
