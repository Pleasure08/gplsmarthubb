import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, ShoppingBag, Phone, Mail, MessageCircle, Star, Users, MapPin } from "lucide-react"
import { Header } from "@/components/layout/header"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/images/geometric-bg.jpeg" alt="Geometric Background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/80"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in-up">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent font-black tracking-wider animate-glow">
                GPL SmartHub
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-4xl mx-auto text-gray-100 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              Your one-stop platform for finding quality hostels and trading items in the student community. Safe,
              reliable, and built for students.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 hover-scale shadow-lg animate-float"
              >
                <Link href="/hostels">
                  <Building className="h-5 w-5 mr-2" />
                  Find Hostels
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-4 bg-white text-gray-900 hover:bg-gray-100 hover-scale shadow-lg animate-float"
                style={{ animationDelay: "0.2s" }}
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
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -right-4 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animate-float"></div>
          <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 animate-float"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 animate-float"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 animate-slide-in-up">What We Offer</h2>
            <p className="text-xl text-gray-600 animate-slide-in-up" style={{ animationDelay: "0.2s" }}>Everything you need in one place</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="hover-lift overflow-hidden animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative h-64 group">
                <Image src="/images/hostel-building.jpeg" alt="Quality Hostels" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Building className="h-8 w-8 mb-2 animate-float" />
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
                    <Building className="h-4 w-4 text-orange-500 mr-1 animate-float" />
                    <span>Verified Properties</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift overflow-hidden animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <div className="relative h-64 group">
                <Image src="/images/marketplace-bg.jpeg" alt="Student Marketplace" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <ShoppingBag className="h-8 w-8 mb-2 animate-float" />
                  <h3 className="text-2xl font-semibold">Student Marketplace</h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6">
                  Buy and sell books, electronics, and accessories within the student community. Safe transactions with
                  verified sellers and secure payment processing.
                </p>
                <div className="flex items-center justify-between">
                  <Button asChild className="hover-scale">
                    <Link href="/marketplace">Visit Marketplace</Link>
                  </Button>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="h-4 w-4 text-green-500 mr-1 animate-float" />
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
              <Button asChild size="lg" className="bg-white text-orange-500 hover:bg-gray-100 hover-scale animate-float">
                <Link href="/hostels">
                  <Building className="h-5 w-5 mr-2" />
                  Find Your Hostel
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-500 hover-scale animate-float"
                style={{ animationDelay: "0.2s" }}
              >
                <Link href="/listing">
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
          <div className="grid md:grid-cols-4 gap-8 stagger-children">
            <div className="animate-fade-in">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-glow">
                GPL SmartHub
              </h3>
              <p className="text-gray-400 mb-4">
                Student accommodation platform connecting students with verified properties.
              </p>
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: "0.2s" }}>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/hostels" className="hover:text-white transition-colors hover-scale inline-block">
                    Find Hostels
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white transition-colors hover-scale inline-block">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/listing" className="hover:text-white transition-colors hover-scale inline-block">
                    Listing
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: "0.3s" }}>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/hostels" className="hover:text-white transition-colors hover-scale inline-block">
                    Student Housing
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white transition-colors hover-scale inline-block">
                    Buy & Sell
                  </Link>
                </li>
                <li>
                  <Link href="/listing" className="hover:text-white transition-colors hover-scale inline-block">
                    List Property
                  </Link>
                </li>
              </ul>
            </div>

            <div className="animate-slide-in-up" style={{ animationDelay: "0.4s" }}>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center hover-scale">
                  <Mail className="h-4 w-4 mr-2" />
                  support@gplsmarthub.com
                </li>
                <li className="flex items-center hover-scale">
                  <Phone className="h-4 w-4 mr-2" />
                  +234 815 351 8887
                </li>
                <li className="flex items-center hover-scale">
                  <MapPin className="h-4 w-4 mr-2" />
                  Lagos, Nigeria
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <p>&copy; {new Date().getFullYear()} GPL SmartHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
