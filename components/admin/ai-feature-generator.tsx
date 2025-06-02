"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Sparkles,
  Code,
  Zap,
  Lightbulb,
  Rocket,
  Copy,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface GeneratedFeature {
  id: string
  title: string
  description: string
  code: string
  files: Array<{
    name: string
    content: string
    type: "component" | "api" | "page" | "utility"
  }>
  instructions: string[]
  estimatedTime: string
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
}

export function AIFeatureGenerator() {
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [generatedFeature, setGeneratedFeature] = useState<GeneratedFeature | null>(null)
  const { toast } = useToast()

  const examplePrompts = [
    "Add a user profile system where students can create profiles with their university, course, and preferences",
    "Create a review and rating system for hostels with 5-star ratings and written reviews",
    "Add a chat system between buyers and sellers in the marketplace",
    "Implement email notifications for new hostel listings and marketplace items",
    "Create a favorites/wishlist system for hostels and marketplace items",
    "Add a booking system for hostel visits with calendar integration",
    "Implement a referral program where users get rewards for inviting friends",
    "Create an advanced search with filters for amenities, distance from university, etc.",
    "Add a photo gallery feature for hostels with multiple images and virtual tours",
    "Implement a payment escrow system for marketplace transactions",
  ]

  const generateFeature = async () => {
    if (!description.trim()) {
      toast({
        title: "Error",
        description: "Please describe the feature you want to add.",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // Simulate AI generation (replace with actual AI API call)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock generated feature based on description
      const mockFeature: GeneratedFeature = {
        id: `feature_${Date.now()}`,
        title: extractFeatureTitle(description),
        description: description,
        code: generateMockCode(description),
        files: generateMockFiles(description),
        instructions: generateMockInstructions(description),
        estimatedTime: "2-4 hours",
        difficulty: "Medium",
        category: detectCategory(description),
      }

      setGeneratedFeature(mockFeature)

      toast({
        title: "Feature Generated!",
        description: "Your custom feature has been generated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate feature. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const extractFeatureTitle = (desc: string): string => {
    if (desc.toLowerCase().includes("profile")) return "User Profile System"
    if (desc.toLowerCase().includes("review") || desc.toLowerCase().includes("rating")) return "Review & Rating System"
    if (desc.toLowerCase().includes("chat") || desc.toLowerCase().includes("message")) return "Chat System"
    if (desc.toLowerCase().includes("notification") || desc.toLowerCase().includes("email"))
      return "Notification System"
    if (desc.toLowerCase().includes("favorite") || desc.toLowerCase().includes("wishlist")) return "Favorites System"
    if (desc.toLowerCase().includes("booking") || desc.toLowerCase().includes("appointment")) return "Booking System"
    if (desc.toLowerCase().includes("referral") || desc.toLowerCase().includes("reward")) return "Referral Program"
    if (desc.toLowerCase().includes("search") || desc.toLowerCase().includes("filter")) return "Advanced Search"
    if (desc.toLowerCase().includes("photo") || desc.toLowerCase().includes("gallery")) return "Photo Gallery"
    if (desc.toLowerCase().includes("payment") || desc.toLowerCase().includes("escrow")) return "Payment System"
    return "Custom Feature"
  }

  const detectCategory = (desc: string): string => {
    if (desc.toLowerCase().includes("user") || desc.toLowerCase().includes("profile")) return "User Management"
    if (desc.toLowerCase().includes("payment") || desc.toLowerCase().includes("transaction")) return "Payments"
    if (desc.toLowerCase().includes("chat") || desc.toLowerCase().includes("message")) return "Communication"
    if (desc.toLowerCase().includes("search") || desc.toLowerCase().includes("filter")) return "Search & Discovery"
    if (desc.toLowerCase().includes("notification") || desc.toLowerCase().includes("email")) return "Notifications"
    return "General"
  }

  const generateMockCode = (desc: string): string => {
    return `// Generated feature code for: ${extractFeatureTitle(desc)}
// This is a mock implementation - replace with actual AI-generated code

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ${extractFeatureTitle(desc).replace(/\s+/g, "")}() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Initialize feature
    initializeFeature()
  }, [])

  const initializeFeature = async () => {
    setLoading(true)
    try {
      // Feature logic here
      console.log('Feature initialized')
    } catch (error) {
      console.error('Error initializing feature:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>${extractFeatureTitle(desc)}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Feature implementation goes here...</p>
        {loading && <p>Loading...</p>}
      </CardContent>
    </Card>
  )
}
`
  }

  const generateMockFiles = (desc: string): GeneratedFeature["files"] => {
    const featureName = extractFeatureTitle(desc).toLowerCase().replace(/\s+/g, "-")

    return [
      {
        name: `components/${featureName}/${featureName}.tsx`,
        content: generateMockCode(desc),
        type: "component",
      },
      {
        name: `app/api/${featureName}/route.ts`,
        content: `// API route for ${extractFeatureTitle(desc)}
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // API logic here
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}`,
        type: "api",
      },
      {
        name: `lib/${featureName}-utils.ts`,
        content: `// Utility functions for ${extractFeatureTitle(desc)}
export function ${featureName.replace(/-/g, "")}Helper() {
  // Helper functions here
  return true
}`,
        type: "utility",
      },
    ]
  }

  const generateMockInstructions = (desc: string): string[] => {
    return [
      "Copy the generated files to your project structure",
      "Install any required dependencies (check package.json)",
      "Update your database schema if needed",
      "Add the new routes to your navigation",
      "Test the feature thoroughly",
      "Update your environment variables if required",
      "Deploy and monitor for any issues",
    ]
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Code copied to clipboard.",
    })
  }

  const downloadFiles = () => {
    if (!generatedFeature) return

    // Create a simple text file with all the code
    const content = generatedFeature.files.map((file) => `// File: ${file.name}\n${file.content}\n\n`).join("")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${generatedFeature.title.toLowerCase().replace(/\s+/g, "-")}-feature.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "Downloaded!",
      description: "Feature files downloaded successfully.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="hover-lift animate-fade-in bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-500" />
            AI Feature Generator
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              BETA
            </Badge>
          </CardTitle>
          <p className="text-gray-600">
            Describe any feature you want to add to GPL SmartHub, and our AI will generate the complete code
            implementation for you.
          </p>
        </CardHeader>
      </Card>

      {/* Input Section */}
      <Card className="hover-lift animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-orange-500" />
            Describe Your Feature
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="feature-description">Feature Description</Label>
            <Textarea
              id="feature-description"
              placeholder="Describe the feature you want to add in detail. For example: 'Add a user profile system where students can create profiles with their university, course, and preferences. Include profile pictures, bio, and contact information.'"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Example Prompts:</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
              {examplePrompts.slice(0, 6).map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setDescription(prompt)}
                  className="text-left text-xs p-2 bg-gray-50 hover:bg-orange-50 hover:text-orange-600 rounded transition-colors border"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={generateFeature}
            disabled={loading || !description.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating Feature...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate Feature
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Generated Feature */}
      {generatedFeature && (
        <div className="space-y-6 animate-slide-in-up">
          {/* Feature Overview */}
          <Card className="hover-lift border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                {generatedFeature.title}
                <Badge variant="outline" className="ml-auto">
                  {generatedFeature.category}
                </Badge>
              </CardTitle>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>⏱️ {generatedFeature.estimatedTime}</span>
                <span>📊 {generatedFeature.difficulty}</span>
                <span>📁 {generatedFeature.files.length} files</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 mb-4">{generatedFeature.description}</p>
              <div className="flex gap-2">
                <Button onClick={downloadFiles} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Files
                </Button>
                <Button onClick={() => copyToClipboard(generatedFeature.code)} variant="outline" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Main Code
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Implementation Instructions */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-blue-500" />
                Implementation Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {generatedFeature.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full min-w-[24px] text-center">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Generated Files */}
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-purple-500" />
                Generated Files
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {generatedFeature.files.map((file, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {file.type}
                        </Badge>
                        <span className="font-mono text-sm text-gray-700">{file.name}</span>
                      </div>
                      <Button onClick={() => copyToClipboard(file.content)} variant="ghost" size="sm">
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto max-h-40">
                      <code>{file.content}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="pt-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800">Important Notes</h4>
                  <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                    <li>• This is AI-generated code and may require adjustments</li>
                    <li>• Always test thoroughly before deploying to production</li>
                    <li>• Review the code for security best practices</li>
                    <li>• Backup your project before implementing new features</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
