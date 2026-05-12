"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const SEMESTERS = [
  "First Semester",
  "Second Semester",
  "Third Semester",
  "Fourth Semester",
  "Fifth Semester",
  "Sixth Semester",
]

const CLASS_GRADES = [
  "Distinction",
  "First Class with Distinction",
  "First Class",
  "Higher Second Class",
  "Second Class",
  "Pass Class",
]

const COURSES = [
  "Diploma in Mechanical Engineering",
  "Diploma in Automobile Engineering",
  "Certificate in CNC Programming",
]

const RESULTS = [
  "Pass",
  "Fail",
  "ATKT",
]

export function ResultForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  // Form State
  const [enrollmentNumber, setEnrollmentNumber] = useState("")
  const [name, setName] = useState("")
  const [course, setCourse] = useState("")
  const [year, setYear] = useState("")
  const [semester, setSemester] = useState("")
  const [totalMax, setTotalMax] = useState("")
  const [totalObt, setTotalObt] = useState("")
  const [resultStatus, setResultStatus] = useState("")
  const [classGrade, setClassGrade] = useState("")

  const percentage =
    totalMax && totalObt && Number(totalMax) > 0
      ? ((Number(totalObt) / Number(totalMax)) * 100).toFixed(2) + "%"
      : "—"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    // Use state values directly to guarantee no FormData issues
    const data = {
      enrollment_number: enrollmentNumber.trim(),
      name: name.trim(),
      course: course.trim(),
      year: year.trim(),
      semester: semester,
      total_max_marks: Number(totalMax),
      total_obtained: Number(totalObt),
      result: resultStatus,
      class_grade: classGrade === "none" ? "" : classGrade,
    }

    if (!data.enrollment_number || !data.name || !data.course || !data.year || !data.semester || !data.result) {
      setMessage("Error: Please fill all required fields.")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const resultData = await res.json()

      if (res.ok) {
        setMessage("✓ Result saved successfully!")

        // Reset form
        setEnrollmentNumber("")
        setName("")
        setCourse("")
        setYear("")
        setSemester("")
        setTotalMax("")
        setTotalObt("")
        setResultStatus("")
        setClassGrade("")

        onSuccess?.()
      } else {
        setMessage(`Error: ${resultData.error}`)
      }
    } catch {
      setMessage("Error: Failed to save result")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Add / Update Student Result</CardTitle>
        <CardDescription>Enter semester-wise result details for a student.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Enrollment Number <span className="text-red-500">*</span></Label>
              <Input
                value={enrollmentNumber}
                onChange={(e) => setEnrollmentNumber(e.target.value)}
                required
                placeholder="e.g. 2014F45463XXX"
              />
            </div>
            <div className="space-y-2">
              <Label>Student Name <span className="text-red-500">*</span></Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Surname FirstName MiddleName"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Course <span className="text-red-500">*</span></Label>
            <Select value={course} onValueChange={setCourse} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Course" />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Examination Year <span className="text-red-500">*</span></Label>
              <Input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
                placeholder="e.g. 2021-22"
              />
            </div>
            <div className="space-y-2">
              <Label>Semester <span className="text-red-500">*</span></Label>
              <Select value={semester} onValueChange={setSemester} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {SEMESTERS.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Total Max Marks <span className="text-red-500">*</span></Label>
              <Input
                type="number"
                required
                placeholder="e.g. 650"
                min={0}
                value={totalMax}
                onChange={(e) => setTotalMax(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Total Marks Obtained <span className="text-red-500">*</span></Label>
              <Input
                type="number"
                required
                placeholder="e.g. 365"
                min={0}
                value={totalObt}
                onChange={(e) => setTotalObt(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Percentage (Calculated)</Label>
              <div className="h-10 px-3 py-2 rounded-md border border-input bg-muted text-sm flex items-center font-semibold text-primary">
                {percentage}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Result <span className="text-red-500">*</span></Label>
              <Select value={resultStatus} onValueChange={setResultStatus} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select Result" />
                </SelectTrigger>
                <SelectContent>
                  {RESULTS.map(r => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Class / Grade</Label>
              <Select value={classGrade} onValueChange={setClassGrade}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">— None —</SelectItem>
                  {CLASS_GRADES.map(g => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Result"}
          </Button>

          {message && (
            <p className={`text-sm font-medium ${message.startsWith("✓") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
