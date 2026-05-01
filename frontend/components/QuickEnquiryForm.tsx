"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

export default function QuickEnquiryForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formTarget = e.currentTarget
    const formData = new FormData(formTarget)
    const name = formData.get("name") as string
    const phone = formData.get("phone") as string
    const course = formData.get("course") as string

    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      setError("Mobile number must be exactly 10 digits")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, course }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit enquiry")
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
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input id="name" name="name" placeholder="Enter your name" required disabled={loading} />
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
              <Label htmlFor="course">Course Interested In *</Label>
              <select
                id="course"
                name="course"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
                disabled={loading}
              >
                <option value="">Select a course</option>
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
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? "Submitting..." : "Submit Enquiry"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-600 mb-2">Success!</DialogTitle>
            <DialogDescription className="text-base">
              Thank you! Your enquiry has been submitted. We'll get back to you within 24 hours.
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
