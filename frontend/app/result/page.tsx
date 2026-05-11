"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ResultRow {
  id: number
  enrollment_number: string
  name: string
  course: string
  year: string
  semester: string
  total_max_marks: number
  total_obtained: number
  result: string
  class_grade: string
}

function calcPercent(obtained: number, max: number): string {
  if (!max || max === 0) return "—"
  return ((obtained / max) * 100).toFixed(2) + "%"
}

function ResultBadge({ result }: { result: string }) {
  const lower = result?.toLowerCase() ?? ""
  const color = lower === "pass"
    ? "bg-green-100 text-green-800 border-green-200"
    : lower === "fail"
      ? "bg-red-100 text-red-800 border-red-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200"
  return (
    <span className={`inline-block px-3 py-0.5 rounded-full border text-sm font-semibold ${color}`}>
      {result}
    </span>
  )
}

export default function ResultPage() {
  const [enrollmentNumber, setEnrollmentNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ResultRow[]>([])
  const [searched, setSearched] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!enrollmentNumber.trim()) return

    setIsLoading(true)
    setErrorMsg("")
    setSearched(false)
    setResults([])

    try {
      const url = new URL("/api/results", window.location.origin)
      url.searchParams.append("enrollment_number", enrollmentNumber.trim())

      const res = await fetch(url.toString())
      if (!res.ok) throw new Error("Result not found")

      const data = await res.json()
      // Backend returns an array of semester rows
      setResults(Array.isArray(data) ? data : [data])
    } catch {
      setResults([])

    } finally {
      setIsLoading(false)
      setSearched(true)
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container mx-auto px-4 relative">
          <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-4 animate-in fade-in slide-in-from-top duration-500">
            Student Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom duration-700">
            Results
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mb-6 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-200" />
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            Enter your registration details below to view your semester-wise academic performance and marks.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Search Form */}
        <div className="border border-gray-100 p-6 shadow-sm mb-12">
          <form onSubmit={handleSearch} className="max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-5 gap-x-4 items-start">


              {/* Enrollment Number */}
              <div className="font-semibold text-gray-700 md:text-right pt-2">
                Enrollment Number <span className="text-red-500">*</span>
              </div>
              <div>
                <Input
                  className="max-w-sm border-gray-300 rounded-sm focus-visible:ring-0 focus-visible:border-gray-400"
                  placeholder="e.g. 2014F45463XXX"
                  value={enrollmentNumber}
                  onChange={(e) => setEnrollmentNumber(e.target.value)}
                  required
                />
              </div>

              {/* Search Button */}
              <div className="hidden md:block" />
              <div className="pt-1">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 rounded-sm px-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>

            </div>
          </form>
        </div>

        {/* Results */}
        {searched && (
          <div className="mt-4">
            {results.length > 0 ? (
              <>
                {/* Student info header */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6 flex flex-wrap gap-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
                    <p className="font-semibold">{results[0].name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Enrollment No.</p>
                    <p className="font-semibold">{results[0].enrollment_number}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Course</p>
                    <p className="font-semibold">{results[0].course}</p>
                  </div>
                </div>

                {/* Results table */}
                <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-lg">
                  <Table>
                    <TableHeader className="bg-gray-50">
                      <TableRow className="border-b border-gray-200 hover:bg-transparent">
                        <TableHead className="font-bold text-gray-700 border-r border-gray-200">Year</TableHead>
                        <TableHead className="font-bold text-gray-700 border-r border-gray-200">Semester</TableHead>
                        <TableHead className="font-bold text-gray-700 border-r border-gray-200 text-center">Total Max Marks</TableHead>
                        <TableHead className="font-bold text-gray-700 border-r border-gray-200 text-center">Marks Obtained</TableHead>
                        <TableHead className="font-bold text-gray-700 border-r border-gray-200 text-center">Percentage</TableHead>
                        <TableHead className="font-bold text-gray-700 border-r border-gray-200 text-center">Result</TableHead>
                        <TableHead className="font-bold text-gray-700 text-center">Class</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.map((row) => (
                        <TableRow key={row.id} className="bg-white hover:bg-gray-50/50">
                          <TableCell className="border-r border-gray-200 text-gray-600">{row.year}</TableCell>
                          <TableCell className="border-r border-gray-200 text-gray-600 whitespace-nowrap">{row.semester}</TableCell>
                          <TableCell className="border-r border-gray-200 text-gray-600 text-center font-medium">{row.total_max_marks}</TableCell>
                          <TableCell className="border-r border-gray-200 text-gray-600 text-center font-medium">{row.total_obtained}</TableCell>
                          <TableCell className="border-r border-gray-200 text-center font-semibold text-primary">
                            {calcPercent(row.total_obtained, row.total_max_marks)}
                          </TableCell>
                          <TableCell className="border-r border-gray-200 text-center">
                            <ResultBadge result={row.result} />
                          </TableCell>
                          <TableCell className="text-center text-gray-600 whitespace-nowrap">
                            {row.class_grade || "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Summary footer if multiple semesters */}
                {results.length > 1 && (() => {
                  const totalMax = results.reduce((s, r) => s + Number(r.total_max_marks), 0)
                  const totalObt = results.reduce((s, r) => s + Number(r.total_obtained), 0)
                  return (
                    <div className="mt-4 flex gap-8 p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm">
                      <div>
                        <span className="text-muted-foreground">Overall Max: </span>
                        <span className="font-semibold">{totalMax}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Overall Obtained: </span>
                        <span className="font-semibold">{totalObt}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Overall %: </span>
                        <span className="font-semibold text-primary">{calcPercent(totalObt, totalMax)}</span>
                      </div>
                    </div>
                  )
                })()}
              </>
            ) : (
              <div className="p-12 text-center bg-red-50/50 border border-red-100 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-red-800">Result Not Found</h3>
                <p className="text-red-600/80 max-w-md mx-auto">{errorMsg}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
