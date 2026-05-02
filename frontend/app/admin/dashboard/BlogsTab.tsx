"use client"

import { useState, useEffect, useCallback } from "react"
import { FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlogForm } from "./BlogForm"
import { DeleteBlogButton } from "./DeleteBlogButton"

interface BlogPost {
  id: number
  title: string
  created_at: string
}

export function BlogsTab() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = useCallback(async () => {
    try {
      // Use relative URL so it goes through the Next.js proxy rewrite (avoids CORS in the browser)
      const res = await fetch(`/api/blogs?admin=true`, { cache: "no-store" })
      if (res.ok) {
        const data = await res.json()
        setPosts(data)
      }
    } catch (e) {
      console.error("Error fetching blogs:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <div className="space-y-6">
      {/* Stat card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Blogs</CardDescription>
            <CardTitle className="text-3xl">
              {loading ? "—" : posts.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* BlogForm calls onSuccess after a successful save */}
      <BlogForm onSuccess={fetchPosts} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>View your published blog content from the database</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Loading...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No blog posts available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{post.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="text-green-600">Published</span>
                        <span>• {new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <DeleteBlogButton id={post.id} onSuccess={fetchPosts} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  )
}
