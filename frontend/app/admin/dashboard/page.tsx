import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { getSession } from "@/lib/auth"
import { LogoutButton } from "./LogoutButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResultForm } from "./ResultForm"
import { BlogForm } from "./BlogForm"
import { DeleteBlogButton } from "./DeleteBlogButton"


export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const user = await getSession()
  let allPosts: any[] = []
  
  try {
    const res = await fetch("http://localhost:5000/api/blogs?admin=true", { cache: "no-store" })
    if (res.ok) {
      allPosts = await res.json()
    }
  } catch (e) {
    console.error("Error fetching blogs for admin:", e)
  }

  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
              FE
            </div>
            <div>
              <h1 className="font-bold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage Content</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Blogs</CardDescription>
              <CardTitle className="text-3xl">{allPosts.length}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Tabs defaultValue="results" className="space-y-4">
          <TabsList>
            <TabsTrigger value="results">Student Results</TabsTrigger>
            <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results">
            <ResultForm />
          </TabsContent>

          <TabsContent value="blogs">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BlogForm />
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Blog Posts</CardTitle>
                    <CardDescription>View your hardcoded blog content</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {allPosts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No blog posts available.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
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
                          <DeleteBlogButton id={post.id} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
