import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Award, Users, Briefcase, Settings, TrendingUp, Youtube, BookOpen } from "lucide-react"
import QuickEnquiryForm from "@/components/QuickEnquiryForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Finix Education Institute | Best CNC & VMC Training in Pune",
  description:
    "Join the best CNC & VMC training institute in Sanaswadi, Pune. 12+ years of experience, 100% practical training, and industry-recognized certification.",
  alternates: {
    canonical: "https://finixeducationinstitute.com",
  },
}

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-secondary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-left duration-700">
              <div className="inline-flex items-center bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                </span>
                12+ Years of Excellence in CNC & VMC Training
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-balance leading-tight tracking-tight">
                Finix Education Institute <br />
                <span className="text-accent">Best CNC & VMC Training</span> in Pune
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 leading-relaxed font-medium">
                Get industry-focused practical training in CNC, VMC, HMC Operating & Programming, and CAD/CAM at Finix Education Institute, Pune. Learn real-world machining skills through hands-on practice on advanced equipment, along with dedicated placement support to help you build a successful career.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="cursor-pointer text-base bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all animate-in fade-in slide-in-from-bottom duration-700 delay-200"
                >
                  <Link href="/contact">Enquire Now</Link>
                </Button>
                <Button
                  size="lg"
                  asChild
                  className="cursor-pointer text-base bg-primary-foreground text-primary font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all hover:bg-primary-foreground/90 animate-in fade-in slide-in-from-bottom duration-700 delay-300"
                >
                  <Link href="/youtube">
                    <Youtube className="mr-2 h-5 w-5" />
                    Watch Demo Classes
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="order-1 lg:order-2 animate-in fade-in slide-in-from-right duration-700">
              <div className="relative max-w-sm mx-auto lg:max-w-md xl:max-w-lg">
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-foreground/20 hover:border-primary-foreground/30 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/images/institute main photo.png"
                    alt="Modern CNC Machine in Operation"
                    width={600}
                    height={450}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* Floating Stats Cards */}
                <div className="absolute -bottom-4 -left-4 bg-primary-foreground text-primary p-4 rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom duration-700 delay-500 z-20">
                  <div className="text-3xl font-bold">12+</div>
                  <div className="text-sm font-medium">Years Experience</div>
                </div>

                <div className="absolute -bottom-4 -right-8 bg-accent text-accent-foreground p-4 rounded-xl shadow-xl animate-in fade-in slide-in-from-top duration-700 delay-500 z-20">
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm font-medium">Practical Training</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Decorative Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none -z-10" />
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4 animate-in fade-in duration-500">
              Our Advantages
            </div>
            <h2 className="text-[31px] md:text-[37px] font-bold mb-4 animate-in fade-in duration-500 delay-100">
              Why Choose Finix Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mx-auto mb-4 rounded-full animate-in fade-in duration-500 delay-200"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in duration-500 delay-300">
              We provide industry-leading training in CNC Operating, Programming, and CAD/CAM with a focus on practical skills and career outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Award,
                title: "12 Years of Excellence",
                description: "Proven track record of training successful CNC professionals since 2012",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: Settings,
                title: "Real Machine Training",
                description: "Hands-on practice with actual CNC turning (VTL/HTL) and milling machines (VMC/HMC)",
                gradient: "from-purple-500 to-pink-500",
              },
              {
                icon: Users,
                title: "Expert Instructors",
                description: "Learn from industry professionals with extensive manufacturing experience",
                gradient: "from-orange-500 to-red-500",
              },
              {
                icon: BookOpen,
                title: "Comprehensive Courses",
                description: "From operator training to advanced programming and CAD/CAM software",
                gradient: "from-green-500 to-emerald-500",
              },
              {
                icon: Briefcase,
                title: "Industry Recognition",
                description: "Government recognized institute with MSBVEE and Skill India affiliation",
                gradient: "from-indigo-500 to-blue-500",
              },
              {
                icon: TrendingUp,
                title: "Career Advancement",
                description: "Build skills for high-demand manufacturing careers across India and abroad",
                gradient: "from-amber-500 to-orange-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg group relative overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="relative">
                  {/* Improved icon container with gradient background */}
                  <div
                    className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                  </div>
                  <CardTitle className="text-[21px] font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground leading-relaxed text-[15px]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              Training Programs
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Courses</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive training programs from operator level to advanced programming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                id: "cnc-training",
                title: "CNC Operating & Programming",
                description:
                  "Complete training in CNC Turning (VTL/HTL) operations, G-code/M-code programming, and machine setup.",
              },
              {
                id: "vmc-training",
                title: "VMC Operating & Programming",
                description:
                  "Hands-on training in Vertical Machining Center (VMC) operations and 3-axis programming.",
              },
              {
                id: "hmc-training",
                title: "HMC Operating & Programming",
                description:
                  "Advanced training in Horizontal Machining Center (HMC) operations and pallet changing systems.",
              },
              {
                id: "cadcam-training",
                title: "CAD/CAM Training",
                description: "Master AutoCAD 2D/3D, UNIGRAPHICS, and MASTERCAM for automated toolpath generation.",
              },
              {
                id: "mechanical-diploma",
                title: "Mechanical Engineering Diploma",
                description: "Comprehensive diploma program covering technical drawing and practical industrial skills.",
              },
              {
                id: "industrial-automation",
                title: "Industrial Automation",
                description: "Training in PLC, robotics, and modern manufacturing automation systems.",
              },
            ]
              .map((course, index) => (
                <Card key={index} className="flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-primary/10 hover:border-primary/30 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 relative z-10">{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 relative z-10">
                    <p className="text-muted-foreground leading-relaxed">{course.description}</p>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              Our Facilities
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Gallery</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Take a look at our state-of-the-art facilities, CNC machines, and practical training sessions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                src: "/images/gallery-1.jpg",
                alt: "CNC Machine Operation Training",
                title: "Hands-on CNC Operation",
              },
              {
                src: "/images/gallery-2.jpg",
                alt: "CAD/CAM Software Training",
                title: "CAD/CAM Training Session",
              },
              {
                src: "/images/certificate-given.png",
                alt: "Workshop Practical Training",
                title: "Certificate given to students",
              },
              {
                src: "/images/gallery-4.jpg",
                alt: "CNC Programming Training",
                title: "Machine Programming Session",
              },
              {
                src: "/images/gallery-5.jpg",
                alt: "CNC Control Panel Training",
                title: "Control Panel Training",
              },
              {
                src: "/images/gallery-6.jpg",
                alt: "Classroom Theory Session",
                title: "Theory Class Session",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="aspect-[4/3] bg-muted rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all cursor-pointer group shadow-sm hover:shadow-lg"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">Visit our institute to see our facilities in person</p>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
                Free Resources
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Free YouTube Lectures</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Get a taste of our teaching quality with free CNC tutorial videos on YouTube. Learn basics, tips, and
                tricks from our expert instructors.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  "CNC machine operations and safety",
                  "G-code and M-code programming",
                  "CAD/CAM software tutorials",
                  "Practical machining techniques",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" asChild>
                <Link href="/youtube">
                  <Youtube className="mr-2 h-5 w-5" />
                  Watch Free Lectures
                </Link>
              </Button>
            </div>
            <div className="aspect-video bg-muted rounded-lg overflow-hidden border-2 border-border">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/videoseries?list=PLqz7bzOhwrLq1cdcBseg2hz5RMmmpr-df"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Enquiry Form */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
                Get Started
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Enquiry</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
              <p className="text-muted-foreground leading-relaxed">
                Interested in our courses? Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <QuickEnquiryForm />
          </div>
        </div>
      </section>
    </div>
  )
}
