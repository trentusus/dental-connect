"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, CheckCircle } from "lucide-react"
import { useStatsigClient } from "@statsig/react-bindings";

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  dentist: {
    id: number
    name: string
    city: string
    bio: string
    treatments: string[]
  } | null
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
]

export function BookingModal({ isOpen, onClose, dentist }: BookingModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [isBooked, setIsBooked] = useState(false)

  const client = useStatsigClient();

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsBooked(true)
      setTimeout(() => {
        setIsBooked(false)
        onClose()
        setSelectedDate(new Date())
        setSelectedTime("")
      }, 2000)
            // Log event appointment booked with random id
      const randomId = Math.floor(Math.random() * 1000)
      client.logEvent("appointment_booked", randomId, {
        selected_date: selectedDate?.toLocaleDateString(),
        selected_time: selectedTime,
        dentist_name: dentist?.name || "name_missing",
        dentist_city: dentist?.city || "city_missing",
      });
    }
  }

  if (!dentist) return null

  if (isBooked) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-4">
              Your appointment with {dentist.name} has been scheduled for {selectedDate?.toLocaleDateString()} at{" "}
              {selectedTime}.
            </p>
            <p className="text-sm text-gray-500">You will receive a confirmation email shortly.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Book Appointment with {dentist.name}
          </DialogTitle>
          <DialogDescription>Select your preferred date and time</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dentist Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900">{dentist.name}</h4>
            <p className="text-sm text-gray-600">{dentist.city}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {dentist.treatments.map((treatment) => (
                <Badge key={treatment} variant="secondary" className="text-xs">
                  {treatment}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Select Date</h4>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date() || date.getDay() === 0}
                className="rounded-md border"
              />
            </div>

            {/* Time Slots */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Select Time</h4>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className="justify-start"
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {selectedDate && selectedTime && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Appointment Summary</h4>
              <p className="text-blue-800">
                <strong>Date:</strong>{" "}
                {selectedDate.toLocaleDateString("en-GB", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-blue-800">
                <strong>Time:</strong> {selectedTime}
              </p>
              <p className="text-blue-800">
                <strong>Dentist:</strong> {dentist.name}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleBooking} className="flex-1" disabled={!selectedDate || !selectedTime}>
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
