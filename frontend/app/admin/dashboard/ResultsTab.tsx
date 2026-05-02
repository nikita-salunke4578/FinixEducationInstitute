"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Pencil, Search, X, Check } from "lucide-react"

interface Result {
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

export function ResultsTab() {
  const [results, setResults] = useState<Result[]>([])
  const [filtered, setFiltered] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<Partial<Result>>({})
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchResults = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/results?admin=true", { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setResults(data)
        setFiltered(data)
      }
    } catch (e) {
      console.error("Error fetching results:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchResults() }, [fetchResults])

  useEffect(() => {
    const q = search.trim().toLowerCase()
    if (!q) {
      setFiltered(results)
    } else {
      setFiltered(results.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.enrollment_number.toLowerCase().includes(q) ||
        r.course.toLowerCase().includes(q)
      ))
    }
  }, [search, results])

  const startEdit = (r: Result) => { setEditingId(r.id); setEditData({ ...r }) }
  const cancelEdit = () => { setEditingId(null); setEditData({}) }
  const editField = (field: keyof Result, value: string) =>
    setEditData(prev => ({ ...prev, [field]: value }))

  const saveEdit = async () => {
    if (!editingId) return
    setSaving(true)
    try {
      const res = await fetch("/api/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      })
      if (res.ok) { cancelEdit(); fetchResults() }
      else alert("Failed to update result.")
    } catch { alert("Error updating result.") }
    finally { setSaving(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this result permanently?")) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/results?id=${id}`, { method: "DELETE" })
      if (res.ok) fetchResults()
      else alert("Failed to delete result.")
    } catch { alert("Error deleting result.") }
    finally { setDeletingId(null) }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle>All Student Results</CardTitle>
            <CardDescription>
              {loading ? "Loading..." : `${results.length} record${results.length !== 1 ? "s" : ""} saved`}
            </CardDescription>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, enrollment no, course..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        {loading ? (
          <p className="text-center py-12 text-muted-foreground">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">
            {search ? "No results match your search." : "No results saved yet."}
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Enroll. No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Max</TableHead>
                <TableHead>Obtained</TableHead>
                <TableHead>%</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(r => (
                <TableRow key={r.id}>
                  {editingId === r.id ? (
                    <>
                      <TableCell><Input value={editData.enrollment_number ?? ""} onChange={e => editField("enrollment_number", e.target.value)} className="h-8 w-32" /></TableCell>
                      <TableCell><Input value={editData.name ?? ""} onChange={e => editField("name", e.target.value)} className="h-8 w-36" /></TableCell>
                      <TableCell><Input value={editData.course ?? ""} onChange={e => editField("course", e.target.value)} className="h-8 w-36" /></TableCell>
                      <TableCell><Input value={editData.year ?? ""} onChange={e => editField("year", e.target.value)} className="h-8 w-24" /></TableCell>
                      <TableCell><Input value={editData.semester ?? ""} onChange={e => editField("semester", e.target.value)} className="h-8 w-32" /></TableCell>
                      <TableCell><Input value={String(editData.total_max_marks ?? "")} onChange={e => editField("total_max_marks", e.target.value)} className="h-8 w-16" type="number" /></TableCell>
                      <TableCell><Input value={String(editData.total_obtained ?? "")} onChange={e => editField("total_obtained", e.target.value)} className="h-8 w-16" type="number" /></TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {calcPercent(Number(editData.total_obtained), Number(editData.total_max_marks))}
                      </TableCell>
                      <TableCell><Input value={editData.result ?? ""} onChange={e => editField("result", e.target.value)} className="h-8 w-20" /></TableCell>
                      <TableCell><Input value={editData.class_grade ?? ""} onChange={e => editField("class_grade", e.target.value)} className="h-8 w-28" /></TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50" onClick={saveEdit} disabled={saving}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8" onClick={cancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="font-mono text-xs">{r.enrollment_number}</TableCell>
                      <TableCell className="font-medium whitespace-nowrap">{r.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[140px] truncate">{r.course}</TableCell>
                      <TableCell className="text-sm">{r.year}</TableCell>
                      <TableCell className="text-sm whitespace-nowrap">{r.semester}</TableCell>
                      <TableCell className="text-sm">{r.total_max_marks}</TableCell>
                      <TableCell className="text-sm">{r.total_obtained}</TableCell>
                      <TableCell className="text-sm font-medium">{calcPercent(r.total_obtained, r.total_max_marks)}</TableCell>
                      <TableCell>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                          r.result?.toLowerCase() === "pass"
                            ? "bg-green-100 text-green-700"
                            : r.result?.toLowerCase() === "fail"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {r.result}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{r.class_grade || "—"}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-1 justify-end">
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => startEdit(r)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(r.id)} disabled={deletingId === r.id}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
