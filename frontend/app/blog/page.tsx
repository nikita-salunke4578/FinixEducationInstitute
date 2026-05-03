import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { query } from "@/lib/db"

export const revalidate = 60; // Refresh the cache every 60 seconds

export default async function BlogPage() {
  let blogPosts: any[] = []
  
  try {
    const results = await query("SELECT * FROM blogs ORDER BY created_at DESC");
    blogPosts = Array.isArray(results) ? results : [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
  }


  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-4 animate-in fade-in slide-in-from-top duration-500">
            Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom duration-700">
            Blogs
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mb-6 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-200"></div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            Expert insights, tutorials, and industry news from our experienced CNC instructors. Stay updated with the
            latest trends in CNC machining and manufacturing.
          </p>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="flex flex-col hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="text-xl leading-snug">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex items-center justify-end pt-4 border-t">

                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>

                        Read More
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Learn More?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            These blog posts are just the beginning. Join our courses for comprehensive hands-on training and take your
            CNC skills to professional level.
          </p>
          <Button size="lg" asChild>
            <Link href="/courses">Explore Our Courses</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
