"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    
    const data = {
      title,
      slug,
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      author_name: formData.get("author_name") || "Finix CNC Training",
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const resultData = await res.json()

      if (res.ok) {
        setMessage("Success: Blog saved!")
        ;(e.target as HTMLFormElement).reset()
      } else {
        setMessage(`Error: ${resultData.error}`)
      }
    } catch (err: any) {
      setMessage(`Error: Failed to save blog`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Blog Post</CardTitle>
        <CardDescription>Publish a new blog to the website.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input name="title" required placeholder="Blog Title" />
          </div>
          <div className="space-y-2">
            <Label>Author Name</Label>
            <Input name="author_name" placeholder="Finix CNC Training" defaultValue="Finix CNC Training" />
          </div>
          <div className="space-y-2">
            <Label>Excerpt</Label>
            <Textarea name="excerpt" placeholder="Short description..." />
          </div>
          <div className="space-y-2">
            <Label>Content (Markdown or HTML)</Label>
            <Textarea name="content" required placeholder="Full blog content..." className="min-h-[200px]" />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Publish Blog"}
          </Button>
          {message && <p className="text-sm font-medium text-blue-600">{message}</p>}
        </form>
      </CardContent>
    </Card>
  )
}
