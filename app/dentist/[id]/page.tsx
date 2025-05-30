"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"
import { BookingModal } from "@/components/booking-modal"
import { ArrowLeft, MapPin, Star, Calendar, Phone, Mail } from "lucide-react"

// Same dentist data as homepage
const dentists = [
  {
    id: 1,
    name: "Dr. Sarah Lee",
    city: "London",
    bio: "Expert in cosmetic and pediatric dentistry with over 12 years of experience. Dr. Lee is passionate about creating beautiful smiles while ensuring patient comfort. She specializes in advanced cosmetic procedures and has a gentle approach that makes her especially popular with children and anxious patients.",
    treatments: ["Teeth Whitening", "Braces", "Pediatric Dentistry"],
    phone: "+44 20 7123 4567",
    email: "sarah.lee@dentalconnect.com",
    experience: "12 years",
    education: "King's College London Dental Institute",
  },
  {
    id: 2,
    name: "Dr. James Patel",
    city: "Manchester",
    bio: "General practitioner with 15 years of experience in comprehensive dental care. Dr. Patel believes in preventive dentistry and takes time to educate patients about oral health. His calm demeanor and thorough approach have earned him a loyal patient base throughout Manchester.",
    treatments: ["Check-up", "Fillings", "Root Canal"],
    phone: "+44 161 234 5678",
    email: "james.patel@dentalconnect.com",
    experience: "15 years",
    education: "University of Manchester School of Dentistry",
  },
  {
    id: 3,
    name: "Dr. Maria Gomez",
    city: "Bristol",
    bio: "Specializes in implants and oral surgery with advanced training in complex dental procedures. Dr. Gomez combines cutting-edge technology with compassionate care to deliver exceptional results. She is known for her precision in surgical procedures and commitment to patient comfort.",
    treatments: ["Implants", "Oral Surgery", "Check-up"],
    phone: "+44 117 345 6789",
    email: "maria.gomez@dentalconnect.com",
    experience: "10 years",
    education: "University of Bristol Dental School",
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    city: "London",
    bio: "Orthodontist specializing in modern alignment solutions including traditional braces and clear aligners. Dr. Chen stays at the forefront of orthodontic technology to provide the most effective and comfortable treatment options for patients of all ages.",
    treatments: ["Braces", "Invisalign", "Retainers"],
    phone: "+44 20 8765 4321",
    email: "michael.chen@dentalconnect.com",
    experience: "8 years",
    education: "Queen Mary University of London",
  },
  {
    id: 5,
    name: "Dr. Emma Wilson",
    city: "Birmingham",
    bio: "Preventive dentistry and family dental care specialist focused on maintaining optimal oral health for patients of all ages. Dr. Wilson creates a welcoming environment for families and emphasizes the importance of regular dental care and education.",
    treatments: ["Check-up", "Cleaning", "Pediatric Dentistry"],
    phone: "+44 121 456 7890",
    email: "emma.wilson@dentalconnect.com",
    experience: "14 years",
    education: "University of Birmingham School of Dentistry",
  },
]

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
