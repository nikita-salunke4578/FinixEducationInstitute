"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Youtube, PlayCircle, X } from "lucide-react"


export default function YouTubePage() {
  const [selectedVideo, setSelectedVideo] = useState<{ title: string; videoId: string } | null>(null)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-4 animate-in fade-in slide-in-from-top duration-500">
            Free Learning
          </div>
          <div className="flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-left duration-700">
            <Youtube className="h-10 w-10 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-balance">YouTube Lectures</h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mb-6 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-200"></div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            Access our extensive library of free CNC training videos. Learn at your own pace with tutorials covering
            basics to advanced techniques. Subscribe to our channel for weekly updates!
          </p>
        </div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Featured Video */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-3">
              Most Popular
            </div>
            <h2 className="text-3xl font-bold">Featured Lecture</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border relative group cursor-pointer">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/videoseries?list=PLqz7bzOhwrLq1cdcBseg2hz5RMmmpr-df"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">CNC Training Video</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Watch our comprehensive CNC training videos to learn essential skills in machining, programming, and
                CAD/CAM. Our expert instructors guide you through each concept with clear explanations and practical
                demonstrations.
              </p>
              <Button size="lg" asChild>
                <a href="https://youtube.com/playlist?list=PLqz7bzOhwrLq1cdcBseg2hz5RMmmpr-df" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-5 w-5" />
                  Watch on YouTube
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready for Hands-On Training?</h2>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto leading-relaxed">
                While our YouTube lectures are great for learning theory, nothing beats hands-on experience with real
                CNC machines. Join our offline courses to take your skills to the next level.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/courses">View Our Courses</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
