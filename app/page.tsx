"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AuthModal } from "@/components/auth-modal"
import { DentistRegistrationModal } from "@/components/dentist-registration-modal"
import { BookingModal } from "@/components/booking-modal"
import { MapPin, Star, User } from "lucide-react"



// Fake dentist data
const dentists = [
  {
    id: 1,
    name: "Dr. Sarah Lee",
    city: "London",
    bio: "Expert in cosmetic and pediatric dentistry.",
    treatments: ["Teeth Whitening", "Braces", "Pediatric Dentistry"],
  },
  {
    id: 2,
    name: "Dr. James Patel",
    city: "Manchester",
    bio: "General practitioner with 15 years of experience.",
    treatments: ["Check-up", "Fillings", "Root Canal"],
  },
  {
    id: 3,
    name: "Dr. Maria Gomez",
    city: "Bristol",
    bio: "Specializes in implants and oral surgery.",
    treatments: ["Implants", "Oral Surgery", "Check-up"],
  },
  {
    id: 4,
    name: "Dr. Michael Chen",
    city: "London",
    bio: "Orthodontist specializing in modern alignment solutions.",
    treatments: ["Braces", "Invisalign", "Retainers"],
  },
  {
    id: 5,
    name: "Dr. Emma Wilson",
    city: "Birmingham",
    bio: "Preventive dentistry and family dental care specialist.",
    treatments: ["Check-up", "Cleaning", "Pediatric Dentistry"],
  },
]

const allTreatments = Array.from(new Set(dentists.flatMap((d) => d.treatments)))
const allCities = Array.from(new Set(dentists.map((d) => d.city)))

export default function HomePage() {
  const [user, setUser] = useState<{ email: string; type: "patient" | "dentist" } | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showDentistRegistration, setShowDentistRegistration] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [authPurpose, setAuthPurpose] = useState<"booking" | "dentist-registration">("booking")
  const [selectedDentist, setSelectedDentist] = useState<(typeof dentists)[0] | null>(null)
  const [searchCity, setSearchCity] = useState("All Cities")
  const [searchTreatment, setSearchTreatment] = useState("All Treatments")
  const [filteredDentists, setFilteredDentists] = useState(dentists)
  const router = useRouter();
  
  const handleSearch = () => {
    const filtered = dentists.filter((dentist) => {
      const cityMatch = searchCity === "All Cities" || dentist.city.toLowerCase().includes(searchCity.toLowerCase())
      const treatmentMatch =
        searchTreatment === "All Treatments" ||
        dentist.treatments.some((t) => t.toLowerCase().includes(searchTreatment.toLowerCase()))
      return cityMatch && treatmentMatch
    })
    setFilteredDentists(filtered)
  }

  const handleBookAppointment = (dentist: (typeof dentists)[0]) => {
    if (!user) {
      setAuthPurpose("booking")
      setSelectedDentist(dentist)
      setShowAuthModal(true)
    } else {
      setSelectedDentist(dentist)
      setShowBookingModal(true)
    }
  }

  const handleDentistRegistration = () => {
    if (!user) {
      setAuthPurpose("dentist-registration")
      setShowAuthModal(true)
    } else {
      setShowDentistRegistration(true)
    }
  }

  const handleAuthSuccess = (email: string) => {
    const userType = authPurpose === "dentist-registration" ? "dentist" : "patient"
    setUser({ email, type: userType })
    setShowAuthModal(false)

    if (authPurpose === "dentist-registration") {
      setShowDentistRegistration(true)
    } else if (authPurpose === "booking" && selectedDentist) {
      setShowBookingModal(true)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">DentalConnect</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                  <Button variant="outline" size="sm" onClick={() => setUser(null)}>
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAuthPurpose("booking")
                      setShowAuthModal(true)
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setAuthPurpose("booking")
                      setShowAuthModal(true)
                    }}
                  >
                    Register as Patient
                  </Button>
                  <Button onClick={handleDentistRegistration}>Register as a Dentist</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Dentist</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with qualified dental professionals in your area. Book appointments easily and get the care you
            deserve.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search for Dentists</CardTitle>
            <CardDescription>Find dentists by location and treatment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <Select value={searchCity} onValueChange={setSearchCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Cities">All Cities</SelectItem>
                    {allCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Treatment</label>
                <Select value={searchTreatment} onValueChange={setSearchTreatment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Treatments">All Treatments</SelectItem>
                    {allTreatments.map((treatment) => (
                      <SelectItem key={treatment} value={treatment}>
                        {treatment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full">
                  Search Dentists
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDentists.map((dentist) => (
            <Card key={dentist.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{dentist.name}</CardTitle>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{dentist.city}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{dentist.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dentist.treatments.slice(0, 2).map((treatment) => (
                    <Badge key={treatment} variant="secondary" className="text-xs">
                      {treatment}
                    </Badge>
                  ))}
                  {dentist.treatments.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{dentist.treatments.length - 2} more
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => router.push(`/dentist/${dentist.id}`)}
                  >
                    View Profile
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => handleBookAppointment(dentist)}>
                    Book Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDentists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No dentists found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchCity("All Cities")
                setSearchTreatment("All Treatments")
                setFilteredDentists(dentists)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        purpose={authPurpose}
      />

      <DentistRegistrationModal isOpen={showDentistRegistration} onClose={() => setShowDentistRegistration(false)} />

      <BookingModal isOpen={showBookingModal} onClose={() => setShowBookingModal(false)} dentist={selectedDentist} />
    </div>
  )
}
