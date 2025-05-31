"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"
import { BookingModal } from "@/components/booking-modal"
import { ArrowLeft, MapPin, Star, Calendar, Phone, Mail } from "lucide-react"
import { dentists } from "@/data/dentists"

export default function DentistProfile() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; type: "patient" | "dentist" } | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const dentistId = Number.parseInt(params.id as string)
  const dentist = dentists.find((d) => d.id === dentistId)

  if (!dentist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dentist Not Found</h1>
          <Button onClick={() => router.push("/")}>Return to Homepage</Button>
        </div>
      </div>
    )
  }

  const handleBookAppointment = () => {
    if (!user) {
      setShowAuthModal(true)
    } else {
      setShowBookingModal(true)
    }
  }

  const handleAuthSuccess = (email: string) => {
    setUser({ email, type: "patient" })
    setShowAuthModal(false)
    setShowBookingModal(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">DentalConnect</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{user.email}</span>
                  <Button variant="outline" size="sm" onClick={() => setUser(null)}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" onClick={() => setShowAuthModal(true)}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{dentist.name}</CardTitle>
                    <div className="flex items-center text-gray-600 mt-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{dentist.city}</span>
                    </div>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-yellow-500 mr-4">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.9 (127 reviews)</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleBookAppointment} size="lg">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <p className="text-gray-600 leading-relaxed">{dentist.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Treatments Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {dentist.treatments.map((treatment) => (
                        <Badge key={treatment} variant="secondary" className="text-sm py-1 px-3">
                          {treatment}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Education & Experience</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <strong>Experience:</strong> {dentist.experience}
                      </p>
                      <p className="text-gray-600">
                        <strong>Education:</strong> {dentist.education}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-sm">{dentist.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-500" />
                  <span className="text-sm">{dentist.email}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleBookAppointment} className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
                <Button variant="outline" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        purpose="booking"
      />

      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} dentist={dentist} />
    </div>
  )
}
