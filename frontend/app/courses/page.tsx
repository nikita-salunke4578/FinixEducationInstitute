import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const courses = [

  {
    id: "cadcam-training",
    title: "CAD/CAM Training",
    description:
      "Master AutoCAD 2D/3D, UNIGRAPHICS, and MASTERCAM with complete part modeling, assembly, and toolpath generation.",

  },
  {
    id: "quality-management",
    title: "Advanced Quality Management System",
    description:
      "Complete quality management training covering ISO 9001, Six Sigma, SPC, PPAP, FMEA, MSA, audits, and quality tools.",

  },

  {
    id: "industrial-automation",
    title: "Industrial Automation",
    description: "Training in PLC programming, robotics, and modern automation systems for manufacturing environments.",

  },
  {
    id: "cnc-maintenance",
    title: "CNC Maintenance",
    description:
      "Learn all types of maintenance work, parameter setting, troubleshooting, and machine calibration procedures.",

  },
]

export default function CoursesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-4 animate-in fade-in slide-in-from-top duration-500">
            Training Programs
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom duration-700">
            Our Courses
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mb-6 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-200"></div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            Comprehensive CNC and manufacturing training programs designed to take you from beginner to industry-ready
            professional. All courses include hands-on practice with real CNC machines.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-primary/10 hover:border-primary/30 overflow-hidden relative">
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
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your CNC Career?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Contact us today to learn more about our courses, schedule a facility tour, or enroll in your chosen
            program.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Enquire for Admission</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/youtube">Watch Free Sample Lectures</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
