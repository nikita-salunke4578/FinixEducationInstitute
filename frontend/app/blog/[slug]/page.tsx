import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { notFound } from "next/navigation"
import { query } from "@/lib/db"

export const revalidate = 60; // Refresh the cache every 60 seconds

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let post: any = null

  try {
    const results: any = await query("SELECT * FROM blogs WHERE slug = ?", [slug]);
    if (Array.isArray(results) && results.length > 0) {
      post = results[0];
    }
  } catch (error) {
    console.error("Failed to fetch blog post:", error)
  }

  if (!post) {
    notFound()
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" size="sm" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{post.title}</h1>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <article
            className="prose prose-slate max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-ul:text-muted-foreground prose-ul:my-6
              prose-ol:text-muted-foreground prose-ol:my-6
              prose-li:my-2
              prose-strong:text-foreground prose-strong:font-semibold"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>


      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Explore our comprehensive CNC training courses and take your skills to the next level
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/courses">View Courses</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Read More Articles</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
