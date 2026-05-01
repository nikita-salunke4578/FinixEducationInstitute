import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Award, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-4 animate-in fade-in slide-in-from-top duration-500">
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom duration-700">
            About Finix Education
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mb-6 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-200"></div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            Finix Education Institute has been at the forefront of CNC training for 12 years, producing skilled
            professionals who excel in the manufacturing industry.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Institute Overview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">12 Years of Excellence</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Finix Education Institute (Reg. No.: MAH-1883/2014/F-45463/PUNE) is a government-recognized training
                  center specializing in CNC machining, CAD/CAM, and manufacturing technology education. Since our
                  establishment, we have been committed to bridging the gap between education and industry requirements.
                </p>
                <p>
                  Our motto: <strong>"Success comes to those who start doing something with plain dedication."</strong>{" "}
                  This philosophy drives everything we do - from our comprehensive curriculum to our hands-on training
                  approach.
                </p>
                <p>
                  We pride ourselves on maintaining state-of-the-art CNC machines (VTL/HTL turning and VMC/HMC milling)
                  and providing students with real-world experience that employers value. Our instructors are seasoned
                  industry professionals who bring practical insights to every lesson.
                </p>
                <p className="font-medium text-foreground">
                  Located at: Nareshwar Mandir Road, A/P. Sanaswadi, Tal. Shirur, Pune-412208
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {[
                  { number: "12+", label: "Years Excellence" },
                  { number: "1000+", label: "Students Trained" },
                  { number: "6+", label: "Course Programs" },
                  { number: "100%", label: "Practical Training" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden border-2 border-border">
              <img
                src="/images/photo.png"
                alt="Finix Education Institute Building - CNC+VMC Training Center"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  To provide world-class CNC training that transforms individuals into skilled professionals ready to
                  meet the demands of the modern manufacturing industry in India and abroad.
                </p>
                <ul className="space-y-2">
                  {[
                    "Deliver hands-on training with real CNC machines",
                    "Bridge the gap between education and industry",
                    "Maintain affordable fees without compromising quality",
                    "Continuously update curriculum with latest technology",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  To be recognized as the leading CNC training institute in Maharashtra, known for producing highly
                  skilled professionals who drive innovation in manufacturing.
                </p>
                <ul className="space-y-2">
                  {[
                    "Expand our reach to serve more aspiring machinists",
                    "Partner with industries for direct placement",
                    "Introduce advanced manufacturing technologies",
                    "Build a strong alumni network across industries",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tutors Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              Leadership
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Expert Instructor</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-4 rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Learn from an industry veteran with decades of hands-on experience in CNC machining
            </p>
          </div>

          <div className="max-w-xl mx-auto text-center">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <img
                src="/professional-male-cnc-instructor.jpg"
                alt="Lead Instructor"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              Accreditations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Recognition</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our institute is recognized by leading government bodies and skill development organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {[
              "/images/certificate-1.jpg",
              "/images/certificate-2.jpg",
              "/images/certificate-3.jpg"
            ].map((imgSrc, index) => (
              <div key={index} className="relative w-full aspect-[3/4] sm:aspect-[4/3] md:aspect-[3/4]">
                <Image 
                  src={imgSrc} 
                  alt={`Certificate ${index + 1}`} 
                  fill 
                  className="object-contain" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
