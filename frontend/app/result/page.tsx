"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ResultPage() {
  const [certNumber, setCertNumber] = useState("")
  const [name, setName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const [searched, setSearched] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!certNumber.trim() && !name.trim()) return

    setIsLoading(true)
    setErrorMsg("")
    setSearched(false)
    
    try {
      const url = new URL("/api/results", window.location.origin)
      if (certNumber) url.searchParams.append("certNumber", certNumber)
      if (name) url.searchParams.append("name", name)

      const res = await fetch(url.toString())
      if (!res.ok) {
        throw new Error("Result not found")
      }
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setResult(null)
      setErrorMsg("We couldn't find any results associated with these details. Please check the information and try again, or contact administration if you believe this is an error.")
    } finally {
      setIsLoading(false)
      setSearched(true)
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-4 animate-in fade-in slide-in-from-top duration-500">
            Student Portal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom duration-700">
            Results
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mb-6 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-200"></div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            Enter your registration details below to view your academic performance, subject-wise marks, and certification status.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Form Container */}
        <div className="border border-gray-100 p-6 shadow-sm mb-12">
          <form onSubmit={handleSearch} className="max-w-3xl">
            {/* We use a CSS grid to match the exact weird layout of the screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-4 gap-x-4 items-center">
              
              {/* Row 1 */}
              <div className="font-semibold text-gray-700 md:text-right">Show results for</div>
              <div>
                <select className="border border-gray-300 p-2 w-full max-w-sm rounded bg-white text-gray-700 focus:outline-none focus:border-gray-400">
                  <option>Select</option>
                  <option>Diploma Exams</option>
                  <option>Certificate Courses</option>
                </select>
              </div>

              {/* Row 2 (Empty label, text input for Name) */}
              <div className="hidden md:block"></div>
              <div>
                <Input 
                  className="max-w-sm border-gray-300 rounded-sm focus-visible:ring-0 focus-visible:border-gray-400" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Row 3 (Name label, Helper text) */}
              <div className="font-semibold text-gray-700 md:text-right self-start pt-1">Name</div>
              <div className="text-sm text-gray-500">
                [Note: Please enter Full Name in the order "Surname FirstName MiddleName"] OR
              </div>

              {/* Row 4 (Certification Number) */}
              <div className="font-semibold text-gray-700 md:text-right">Certification Number</div>
              <div>
                <Input 
                  className="max-w-sm border-gray-300 rounded-sm focus-visible:ring-0 focus-visible:border-gray-400" 
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  required={!name}
                />
              </div>

              {/* Row 5 (Search Button) */}
              <div className="hidden md:block"></div>
              <div className="pt-2">
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

        {/* Results Table */}
        {searched && (
          <div className="overflow-x-auto border border-gray-200 shadow-sm mt-8">
            {result ? (
              <Table>
                <TableHeader className="bg-white">
                  <TableRow className="border-b border-gray-200 hover:bg-transparent">
                    <TableHead className="font-bold text-gray-700 border-r border-gray-200 h-14">Certification Number</TableHead>
                    <TableHead className="font-bold text-gray-700 border-r border-gray-200">Name</TableHead>
                    <TableHead className="font-bold text-gray-700 border-r border-gray-200">Course</TableHead>
                    <TableHead className="font-bold text-gray-700 border-r border-gray-200">FY Marks</TableHead>
                    <TableHead className="font-bold text-gray-700 border-r border-gray-200">SY Marks</TableHead>
                    <TableHead className="font-bold text-gray-700 border-r border-gray-200">TY Marks</TableHead>
                    <TableHead className="font-bold text-gray-700">Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="bg-white hover:bg-gray-50/50">
                    <TableCell className="border-r border-gray-200 text-gray-600">{result.cert_number}</TableCell>
                    <TableCell className="border-r border-gray-200 text-gray-600">{result.name}</TableCell>
                    <TableCell className="border-r border-gray-200 text-gray-600">{result.course}</TableCell>
                    <TableCell className="border-r border-gray-200 text-gray-600">{result.fy_marks}</TableCell>
                    <TableCell className="border-r border-gray-200 text-gray-600">{result.sy_marks}</TableCell>
                    <TableCell className="border-r border-gray-200 text-gray-600">{result.ty_marks}</TableCell>
                    <TableCell className="text-gray-600">{result.result}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <div className="p-12 text-center bg-red-50/50 border border-red-100">
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
