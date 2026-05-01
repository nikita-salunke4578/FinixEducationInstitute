"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formTarget = e.currentTarget
    const formData = new FormData(formTarget)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const course = formData.get("course") as string
    const message = formData.get("message") as string

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setError("Mobile number must be exactly 10 digits")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, phone, course, message }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit message")
      }

      setShowSuccessDialog(true)
      formTarget.reset()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          {error && <div className="mb-4 p-4 text-sm text-red-800 bg-red-100 rounded-lg">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" name="firstName" placeholder="John" required disabled={loading} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input id="lastName" name="lastName" placeholder="Doe" required disabled={loading} />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={loading} />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="e.g. 9876543210"
                required
                disabled={loading}
                minLength={10}
                maxLength={10}
                pattern="\d{10}"
                inputMode="numeric"
              />
            </div>

            <div>
              <Label htmlFor="course">Course Interested In</Label>
              <select
                id="course"
                name="course"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                <option value="">Select a course (optional)</option>
                <option value="CNC Turning & Milling">CNC Turning & Milling</option>
                <option value="CAD/CAM Training">CAD/CAM Training</option>
                <option value="Advanced Quality Management">Advanced Quality Management</option>
                <option value="Advanced Diploma Manufacturing">Advanced Diploma Manufacturing</option>
                <option value="Diploma in Mechanical Engineering">Diploma in Mechanical Engineering</option>
                <option value="Diploma in Electronic Engineering">Diploma in Electronic Engineering</option>
                <option value="Industrial Automation">Industrial Automation</option>
                <option value="CNC Maintenance">CNC Maintenance</option>
              </select>
            </div>

            <div>
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us more about your requirements..."
                rows={5}
                required
                disabled={loading}
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Sending..." : "Send Enquiry"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We'll respond to your enquiry within 24 hours
            </p>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-600 mb-2">Message Sent!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you for reaching out! We have received your message and will contact you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowSuccessDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
