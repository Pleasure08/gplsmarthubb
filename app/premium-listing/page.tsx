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
  Video,
  FileText,
  Phone,
  Mail,
  MessageCircle,
  Award,
  TrendingUp,
  Users,
  BarChart3,
  HelpCircle,
  Clock,
  Star,
  Headphones,
} from "lucide-react"
import Link from "next/link"

export default function PremiumListingPage() {
  const handleStartListing = () => {
    const message =
      "Hi! I want to list my hostel as a premium listing on GPL SmartHub. Can you help me get started with the process?"
    const whatsappUrl = `https://wa.me/2348153518887?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleWhatsAppContact = () => {
    const message = "Hi! I have questions about premium listing for my hostel. Can you provide more information?"
    const whatsappUrl = `https://wa.me/2348153518887?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleWhatsAppContact2 = () => {
    const message = "Hi! I have questions about premium listing for my hostel. Can you provide more information?"
    const whatsappUrl = `https://wa.me/2348083169080?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-yellow-500 text-black mb-4">PREMIUM LISTING</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">List Your Premium Hostel</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Showcase your premium student accommodation to thousands of verified students through our exclusive
            platform.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100" onClick={handleStartListing}>
            <MessageCircle className="h-5 w-5 mr-2" />
            Start Premium Listing
          </Button>
        </div>
      </section>

      {/* Premium Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Premium Process</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
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

            <Card className="text-center">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>2. Service Fee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our 10% premium service fee includes marketing, vetting, and platform features.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Transparent pricing</li>
                  <li>• No hidden fees</li>
                  <li>• Payment protection</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>3. Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Fast-track approval with premium support to get your listing live quickly.
                </p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• 24-48 hour review</li>
                  <li>• Quality assurance</li>
                  <li>• Premium badge</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Premium Listing Requirements</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
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

            <Card>
              <CardHeader>
                <Camera className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Media Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• High-quality photos (minimum 8, showing all areas)</li>
                  <li>• Video tour (minimum 2 minutes walkthrough)</li>
                  <li>• Floor plan (recommended)</li>
                  <li>• 360° virtual tour (optional premium feature)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <Video className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Premium Video Tour Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-600">
                <li>• Minimum 2 minute duration showing all areas clearly</li>
                <li>• Should include exterior, rooms, bathrooms, kitchen, and common areas</li>
                <li>• Professional quality preferred (we can recommend videographers)</li>
                <li>• Upload to Google Drive, Dropbox, or WeTransfer</li>
                <li>• Must be recent (within last 2 months)</li>
                <li>• Clear narration or captions preferred</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Premium Listing Benefits</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Verified Badge</h3>
                <p className="text-gray-600 text-sm">Gain trust with our verified host badge on your listing</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Priority Placement</h3>
                <p className="text-gray-600 text-sm">Your listing appears above standard listings in search results</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Professional Photos</h3>
                <p className="text-gray-600 text-sm">Free professional photography service (upon request)</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Dedicated Support</h3>
                <p className="text-gray-600 text-sm">24/7 priority support for all your inquiries</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Marketing Boost</h3>
                <p className="text-gray-600 text-sm">Featured in our premium listings newsletter</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600 text-sm">Access to detailed performance metrics</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Security & Compliance</h2>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  <strong>Data Protection:</strong> Your personal information is encrypted and stored securely in
                  compliance with data protection regulations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  <strong>Transparent Fees:</strong> Our 10% service fee is clearly communicated upfront with no hidden
                  charges.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <p className="text-gray-600">
                  <strong>Accountability:</strong> Providing false information may result in permanent platform ban and
                  legal consequences.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to List Your Premium Hostel?</h2>
          <p className="text-xl mb-8">
            Join our exclusive network of premium student accommodations and get booked faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" onClick={handleStartListing}>
              <MessageCircle className="h-5 w-5 mr-2" />
              Start Premium Listing
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={handleWhatsAppContact}
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat on WhatsApp
            </Button>
          </div>

          <p className="text-sm mt-4 opacity-90">By proceeding, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <HelpCircle className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600">Everything you need to know about premium listings</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 text-primary mr-2" />
                  Why choose premium listing over standard?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Premium listings receive 3x more views, priority placement in search results, and our verified badge
                  which increases trust and booking rates significantly. You also get dedicated support and professional
                  photography services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 text-primary mr-2" />
                  How is the 10% service fee calculated?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  The fee is 10% of the total annual price you set for your hostel. For example, at ₦500,000 per year,
                  the service fee would be ₦50,000 payable upon successful booking. No upfront costs required.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  What's included in the verification process?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We verify property ownership, ID authenticity, and conduct background checks to ensure a safe platform
                  for students and property owners alike. This includes document verification and property inspection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 text-primary mr-2" />
                  Can I upgrade to premium after listing?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, any standard listing can be upgraded to premium by completing the verification process and paying
                  the difference in service fees. Contact us via WhatsApp to upgrade your existing listing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  How long does premium listing last?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Your premium status remains active for 12 months from the date of verification. We'll notify you
                  before expiration for renewal. You can renew at any time to maintain your premium benefits.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Camera className="h-5 w-5 text-primary mr-2" />
                  Do you provide professional photography?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes! Premium listings include free professional photography services upon request. Our photographers
                  will visit your property and capture high-quality images that showcase your hostel in the best light.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  How many students will see my listing?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our platform reaches over 10,000 active students monthly. Premium listings get featured in our
                  newsletter, social media, and appear at the top of search results, ensuring maximum visibility.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 text-primary mr-2" />
                  What analytics do I get access to?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Premium hosts get access to detailed analytics including views, inquiries, booking conversion rates,
                  peak search times, and demographic insights about interested students.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Headphones className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Need Support?</h2>
            <p className="text-gray-600">Our team is here to help you every step of the way</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">WhatsApp Support</h3>
                <p className="text-gray-600 text-sm mb-4">Get instant help via WhatsApp chat</p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" onClick={handleWhatsAppContact} className="w-full">
                    +234 815 351 8887
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleWhatsAppContact2} className="w-full">
                    +234 808 316 9080
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm mb-4">Send us detailed inquiries via email</p>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link href="mailto:gplsmarthub@gmail.com">gplsmarthub@gmail.com</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
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

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Premium Support Benefits</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Priority response within 1 hour
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Dedicated account manager
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    24/7 emergency support
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    Free consultation calls
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">Join hundreds of successful hostel owners on our platform</p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100" onClick={handleStartListing}>
            <MessageCircle className="h-5 w-5 mr-2" />
            Start Your Premium Listing Now
          </Button>
        </div>
      </section>
    </div>
  )
}
