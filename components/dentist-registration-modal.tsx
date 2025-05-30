"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { UserPlus, CheckCircle } from "lucide-react"

interface DentistRegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

const availableTreatments = [
  "Check-up",
  "Cleaning",
  "Fillings",
  "Root Canal",
  "Teeth Whitening",
  "Braces",
  "Invisalign",
  "Implants",
  "Oral Surgery",
  "Pediatric Dentistry",
  "Retainers",
]

export function DentistRegistrationModal({ isOpen, onClose }: DentistRegistrationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    city: "",
    bio: "",
    treatments: [] as string[],
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({ fullName: "", city: "", bio: "", treatments: [] })
    }, 2000)
  }

  const handleTreatmentChange = (treatment: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      treatments: checked ? [...prev.treatments, treatment] : prev.treatments.filter((t) => t !== treatment),
    }))
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Registration Successful!</h3>
            <p className="text-gray-600">Welcome to DentalConnect! Your profile has been created successfully.</p>
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
            <UserPlus className="h-5 w-5" />
            Register as a Dentist
          </DialogTitle>
          <DialogDescription>Fill out your professional information to join our platform</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="Dr. John Smith"
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="London"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Professional Bio *</Label>
            <Textarea
              id="bio"
              placeholder="Tell patients about your experience, specializations, and approach to dental care..."
              value={formData.bio}
              onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
              rows={4}
              required
            />
          </div>

          <div>
            <Label className="text-base font-medium">Treatments Offered *</Label>
            <p className="text-sm text-gray-600 mb-3">Select all treatments you provide</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableTreatments.map((treatment) => (
                <div key={treatment} className="flex items-center space-x-2">
                  <Checkbox
                    id={treatment}
                    checked={formData.treatments.includes(treatment)}
                    onCheckedChange={(checked) => handleTreatmentChange(treatment, checked as boolean)}
                  />
                  <Label htmlFor={treatment} className="text-sm font-normal cursor-pointer">
                    {treatment}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={formData.treatments.length === 0}>
              Register
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
