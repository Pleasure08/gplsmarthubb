"use client"

import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  CreditCard,
  CheckCircle,
  Camera,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  Award,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  Headphones,
} from "lucide-react"
import Link from "next/link"

export default function ListingPage() {
  const handleStartListing = () => {
    const message = "Hi! I want to list my hostel on GPL SmartHub. Can you help me get started with the process?"
    const whatsappUrl = `https://wa.me/2348153518887?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleWhatsAppContact = () => {
    const message = "Hi! I have questions about listing my hostel. Can you provide more information?"
    const whatsappUrl = `https://wa.me/2348153518887?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleWhatsAppContact2 = () => {
    const message = "Hi! I have questions about listing my hostel. Can you provide more information?"
    const whatsappUrl = `https://wa.me/2348083169080?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-yellow-500 text-black mb-4 animate-bounce-in">VERIFIED LISTING</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">List Your Hostel</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Showcase your student accommodation to thousands of verified students through our exclusive platform.
          </p>
          <Button
            size="lg"
            className="bg-white text-orange-500 hover:bg-gray-100 animate-bounce-in hover-scale"
            style={{ animationDelay: "0.4s" }}
            onClick={handleStartListing}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            Start Listing
          </Button>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold mb-4">Our Listing Process</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-animation">
            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 1 } as any}>
              <CardHeader>
                <Shield className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>1. Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complete our secure identity verification to ensure trust and safety for all parties.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• ID verification</li>
                  <li>• Background check</li>
                  <li>• Secure data handling</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 2 } as any}>
              <CardHeader>
                <CreditCard className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>2. Service Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our 10% service fee includes marketing, vetting, and platform features.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Transparent pricing</li>
                  <li>• No hidden fees</li>
                  <li>• Payment protection</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 3 } as any}>
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <CardTitle>3. Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Fast-track approval with support to get your listing live quickly.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 24-48 hour review</li>
                  <li>• Quality assurance</li>
                  <li>• Verified badge</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Listing Requirements</h2>

          <div className="grid md:grid-cols-2 gap-8 stagger-animation">
            <Card className="hover-lift animate-slide-in-left" style={{ "--stagger": 1 } as any}>
              <CardHeader>
                <FileText className="h-8 w-8 text-orange-500 mb-2" />
                <CardTitle>Essential Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• Valid government-issued ID (Driver's license, National ID, or Passport)</li>
                  <li>• Proof of ownership or authorization to list</li>
                  <li>• Recent utility bill (not older than 3 months)</li>
                  <li>• Tax identification number (optional)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-slide-in-right" style={{ "--stagger": 2 } as any}>
              <CardHeader>
                <Camera className="h-8 w-8 text-orange-500 mb-2" />
                <CardTitle>Media Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• High-quality photos (minimum 8, showing all areas)</li>
                  <li>• Video tour (minimum 2 minutes walkthrough)</li>
                  <li>• Floor plan (recommended)</li>
                  <li>• 360° virtual tour (optional feature)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Listing Benefits</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 1 } as any}>
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Verified Badge</h3>
                <p className="text-gray-600 text-sm">Gain trust with our verified host badge on your listing</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 2 } as any}>
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Priority Placement</h3>
                <p className="text-gray-600 text-sm">Your listing appears above standard listings in search results</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 3 } as any}>
              <CardContent className="pt-6">
                <Camera className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Professional Photos</h3>
                <p className="text-gray-600 text-sm">Free professional photography service (upon request)</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 4 } as any}>
              <CardContent className="pt-6">
                <Phone className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Dedicated Support</h3>
                <p className="text-gray-600 text-sm">24/7 priority support for all your inquiries</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 5 } as any}>
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Marketing Boost</h3>
                <p className="text-gray-600 text-sm">Featured in our listings newsletter</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 6 } as any}>
              <CardContent className="pt-6">
                <BarChart3 className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 text-sm">Access to detailed performance metrics</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in">Ready to List Your Hostel?</h2>
          <p className="text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Join our exclusive network of student accommodations and get booked faster.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100 hover-scale"
              onClick={handleStartListing}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Listing
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 hover-scale"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>

          <p className="text-sm mt-4 opacity-90">By proceeding, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Headphones className="h-12 w-12 text-orange-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Need Support?</h2>
            <p className="text-gray-600">Our team is here to help you every step of the way</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto stagger-animation">
            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 1 } as any}>
              <CardContent className="pt-6">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">WhatsApp Support</h3>
                <p className="text-gray-600 text-sm mb-4">Get instant help via WhatsApp chat</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" onClick={handleWhatsAppContact} className="w-full hover-scale">
                    +234 815 351 8887
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleWhatsAppContact2} className="w-full hover-scale">
                    +234 808 316 9080
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 2 } as any}>
              <CardContent className="pt-6">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">Send us detailed inquiries via email</p>
                <Button variant="outline" size="sm" asChild className="w-full hover-scale">
                  <Link href="mailto:gplsmarthub@gmail.com">gplsmarthub@gmail.com</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover-lift animate-scale-in" style={{ "--stagger": 3 } as any}>
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-gray-600 text-sm mb-4">We respond to all inquiries quickly</p>
                <div className="text-sm text-gray-500">
                  <p>WhatsApp: Instant</p>
                  <p>Email: Within 24 hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
