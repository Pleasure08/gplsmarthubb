"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Settings, Clock, Mail, Phone } from "lucide-react"

export function MaintenanceMode() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl animate-scale-in glass-effect">
        <CardContent className="p-12 text-center">
          <div className="animate-pulse-slow mb-8">
            <Settings className="h-24 w-24 text-orange-500 mx-auto mb-6" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 gradient-text">Maintenance in Progress</h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're currently performing scheduled maintenance to improve your experience. GPL SmartHub will be back
            online shortly.
          </p>

          <div className="bg-white/50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center text-orange-600 mb-4">
              <Clock className="h-6 w-6 mr-2" />
              <span className="font-semibold">Expected Duration: 30-60 minutes</span>
            </div>

            <div className="text-sm text-gray-600">
              <p>We apologize for any inconvenience caused.</p>
              <p>Thank you for your patience!</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Need Immediate Assistance?</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center p-4 bg-white/30 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600 mr-2" />
                <div className="text-left">
                  <p className="font-medium text-gray-800">Email Support</p>
                  <a href="mailto:gplsmarthub@gmail.com" className="text-blue-600 hover:underline text-sm">
                    gplsmarthub@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center justify-center p-4 bg-white/30 rounded-lg">
                <Phone className="h-5 w-5 text-green-600 mr-2" />
                <div className="text-left">
                  <p className="font-medium text-gray-800">WhatsApp Support</p>
                  <a
                    href="https://wa.me/2348153518887?text=Hi! I need urgent support during maintenance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline text-sm"
                  >
                    +234 815 351 8887
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            <p>© 2024 GPL SmartHub - Student Platform</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
