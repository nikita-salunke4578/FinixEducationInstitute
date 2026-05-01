"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function ResultForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const data = {
      cert_number: formData.get("cert_number"),
      name: formData.get("name"),
      course: formData.get("course"),
      fy_marks: formData.get("fy_marks") || "-",
      sy_marks: formData.get("sy_marks") || "-",
      ty_marks: formData.get("ty_marks") || "-",
      result: formData.get("result"),
    }

    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const resultData = await res.json()

      if (res.ok) {
        setMessage("Success: Result saved!")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setMessage(`Error: ${resultData.error}`)
      }
    } catch (err: any) {
      setMessage(`Error: Failed to save result`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add / Update Student Result</CardTitle>
        <CardDescription>Enter marks for a student.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Certification Number</Label>
              <Input name="cert_number" required placeholder="e.g. M201530689" />
            </div>
            <div className="space-y-2">
              <Label>Student Name</Label>
              <Input name="name" required placeholder="Full Name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Course</Label>
            <Input name="course" required placeholder="Diploma in Mechanical Engineering" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>FY Marks</Label>
              <Input name="fy_marks" placeholder="1147" />
            </div>
            <div className="space-y-2">
              <Label>SY Marks</Label>
              <Input name="sy_marks" placeholder="1180" />
            </div>
            <div className="space-y-2">
              <Label>TY Marks</Label>
              <Input name="ty_marks" placeholder="1191" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Final Result</Label>
            <Input name="result" required placeholder="Pass / Fail / Distinction" />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Result"}
          </Button>
          {message && <p className="text-sm font-medium text-blue-600">{message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
