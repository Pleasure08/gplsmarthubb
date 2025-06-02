import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, ShoppingBag, Phone, Mail, MessageCircle, Star, Users } from "lucide-react"
import { Header } from "@/components/layout/header"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Geometric Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/geometric-bg.jpeg" alt="Geometric Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 to-gray-800/70"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="animate-slide-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-black tracking-wider">
                GPL SmartHub
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto text-gray-100 animate-slide-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Your one-stop platform for finding quality hostels and trading items in the student community. Safe,
              reliable, and built for students.
            </p>
            <div
              className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover-scale shadow-lg"
              >
                <Link href="/hostels">
                  <Building className="h-5 w-5 mr-2" />
                  Find Hostels
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-gray-900 hover-scale shadow-lg"
              >
                <Link href="/marketplace">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Browse Marketplace
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-16 h-16 bg-orange-400/30 rounded-full glass-effect"></div>
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-12 h-12 bg-yellow-400/30 rounded-full glass-effect"></div>
        </div>
        <div className="absolute top-1/2 right-20 animate-float" style={{ animationDelay: "2s" }}>
          <div className="w-8 h-8 bg-red-400/30 rounded-full glass-effect"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Why Choose GPL SmartHub?</h2>
            <p className="text-xl text-gray-600">Discover the features that make us the best choice for students</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="hover-lift animate-slide-in-left overflow-hidden">
              <div className="relative h-64">
                <Image src="/images/hostel-building.jpeg" alt="Quality Hostels" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Building className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-semibold">Quality Hostels</h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Discover verified hostels with detailed information, photos, and direct contact with hostel managers.
                  Find your perfect accommodation with our verification system.
                </p>
                <div className="flex items-center justify-between">
                  <Button asChild className="hover-scale">
                    <Link href="/hostels">Explore Hostels</Link>
                  </Button>
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="h-4 w-4 text-orange-500 mr-1" />
                    <span>Verified Properties</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift animate-slide-in-right overflow-hidden" style={{ animationDelay: "0.2s" }}>
              <div className="relative h-64">
                <Image src="/images/marketplace-bg.jpeg" alt="Student Marketplace" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <ShoppingBag className="h-8 w-8 mb-2" />
                  <h3 className="text-2xl font-semibold">Student Marketplace</h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Buy and sell books, electronics, and accessories within the student community. Safe transactions with
                  verified sellers and secure payment processing.
                </p>
                <div className="flex items-center justify-between">
                  <Button asChild variant="outline" className="hover-scale">
                    <Link href="/marketplace">Visit Marketplace</Link>
                  </Button>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 text-green-500 mr-1" />
                    <span>Active Community</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-slide-in-up">
            <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of students who trust GPL SmartHub</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-500 hover:bg-gray-100 hover-scale">
                <Link href="/hostels" className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Find Your Hostel
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-500 hover-scale"
              >
                <Link href="/listing" className="flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  List Your Property
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="animate-slide-in-left">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                GPL SmartHub
              </h3>
              <p className="text-gray-400 mb-4">
                Student accommodation platform connecting students with verified properties.
              </p>
            </div>

            <div className="animate-slide-in-left" style={{ animationDelay: "0.1s" }}>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/hostels" className="hover:text-white transition-colors">
                    Find Hostels
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white transition-colors">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/listing" className="hover:text-white transition-colors">
                    Listing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-slide-in-left" style={{ animationDelay: "0.2s" }}>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/hostels" className="hover:text-white transition-colors">
                    Student Housing
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white transition-colors">
                    Buy & Sell
                  </Link>
                </li>
                <li>
                  <Link href="/listing" className="hover:text-white transition-colors">
                    List Property
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-slide-in-left" style={{ animationDelay: "0.3s" }}>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center hover-scale">
                  <Mail className="h-4 w-4 mr-2" />
                  <a href="mailto:gplsmarthub@gmail.com" className="hover:text-white transition-colors">
                    gplsmarthub@gmail.com
                  </a>
                </div>
                <div className="flex items-center hover-scale">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:+2348153518887" className="hover:text-white transition-colors">
                    +234 815 351 8887
                  </a>
                </div>
                <div className="flex items-center hover-scale">
                  <Phone className="h-4 w-4 mr-2" />
                  <a href="tel:+2348083169080" className="hover:text-white transition-colors">
                    +234 808 316 9080
                  </a>
                </div>
                <div className="flex items-center hover-scale">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  <a
                    href="https://wa.me/2348153518887?text=Hi! I need help with GPL SmartHub"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-slide-in-up">
            <p>&copy; 2025 GPL SmartHub. Built for students, by students.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
