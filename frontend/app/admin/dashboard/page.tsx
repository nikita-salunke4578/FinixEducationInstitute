import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { LogoutButton } from "./LogoutButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResultForm } from "./ResultForm"
import { ResultsTab } from "./ResultsTab"
import { BlogsTab } from "./BlogsTab"

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage() {
  const user = await getSession()

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
        <Tabs defaultValue="add-result" className="space-y-4">
          <TabsList>
            <TabsTrigger value="add-result">Add Result</TabsTrigger>
            <TabsTrigger value="manage-results">Manage Results</TabsTrigger>
            <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="add-result">
            <ResultForm />
          </TabsContent>

          <TabsContent value="manage-results">
            <ResultsTab />
          </TabsContent>

          <TabsContent value="blogs">
            <BlogsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
