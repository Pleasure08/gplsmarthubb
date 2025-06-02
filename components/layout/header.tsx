"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building, ShoppingBag, Star, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Hostels", href: "/hostels", icon: Building },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { name: "Listing", href: "/listing", icon: Star },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-500">
              <Home className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent tracking-wider">
              GPL SmartHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                      : "text-gray-600 hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="relative">
                <div className={`hamburger ${isOpen ? "open" : ""}`}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] mobile-menu-slide">
              <SheetTitle>Navigation Menu</SheetTitle>
              <div className="flex flex-col space-y-4 mt-8">
                <div className="text-center mb-6 animate-slide-in-down">
                  <h2 className="text-xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                    GPL SmartHub
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Student Platform</p>
                </div>

                {navigation.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 animate-slide-in-right ${
                        pathname === item.href
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                          : "text-gray-600 hover:text-orange-500 hover:bg-orange-50 hover:translate-x-2"
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}

                <div
                  className="mt-8 pt-6 border-t border-gray-200 animate-slide-in-up"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-4">Need help?</p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    >
                      <a
                        href="https://wa.me/2348153518887?text=Hi! I need help with GPL SmartHub"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact Support
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
