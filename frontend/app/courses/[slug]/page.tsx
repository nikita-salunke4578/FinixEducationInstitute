import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Briefcase } from "lucide-react"
import { notFound } from "next/navigation"

const coursesData: Record<string, any> = {

  "cnc-turning-milling": {
    title: "CNC Turning & Milling",
    description:
      "Comprehensive training covering CNC Turning (VTL/HTL) and Milling (VMC/HMC) operations from operator level to advanced programming. This is our flagship course designed to make you industry-ready.",
    whatYouLearn: [
      "Operator Training - Drawing study, operating system, tool management",
      "Setter Skills - Work holder & tool holder selection, speed & feed calculation",
      "Programming - New product development, linear industrial part programming",
      "Canned cycle programming for all types of operations",
      "Advanced Programming - Parameter setting, profile & cycle time calculation",
      "Macro programming techniques",
      "All types of maintenance work",
      "Scaling, Mirroring, Rotating, Plane selection",
      "Rigid tapping and automatic corner override",
      "Local work coordinates and single direction positioning",
    ],
    curriculum: [
      { module: "Level 1", topic: "Operator Training - Machine basics and operations" },
      { module: "Level 2", topic: "Setter - Setup, fixtures, and tool management" },
      { module: "Level 3", topic: "Programmer - G codes, M codes, and programming cycles" },
      { module: "Level 4", topic: "Advanced Programming - Macros, optimization, and maintenance" },
    ],
    careerOpportunities: [
      "CNC Machine Operator",
      "CNC Setter/Setup Technician",
      "CNC Programmer",
      "Manufacturing Engineer",
      "Production Supervisor",
    ],
  },
  "cadcam-training": {
    title: "CAD/CAM Training",
    description:
      "Master AutoCAD, UNIGRAPHICS, and MASTERCAM with complete training in 2D drafting, 3D modeling, assembly, and toolpath generation. Includes direct machine training.",
    whatYouLearn: [
      "AutoCAD - 2D drafting, 3D modeling, solid editing, rendering",
      "UNIGRAPHICS - Part modeling, assembly, drafting & detailing",
      "Manufacturing module - Cavity & contour milling, drilling, tapping",
      "MASTERCAM - 2D/3D drawings, toolpath creation",
      "Surface machining - Pocket, contour, parallel, flow line milling",
      "Turning operations - Facing, turning, boring, threading, grooving",
      "Toolpath verification and gouge checking",
      "Post-processing and program editing",
      "Direct machine training with real CNC equipment",
      "Code generation and program transfer to machines",
    ],
    curriculum: [
      { module: "AutoCAD", topic: "2D Drafting and 3D Modeling fundamentals" },
      { module: "UNIGRAPHICS", topic: "Part modeling, assembly, and manufacturing" },
      { module: "MASTERCAM", topic: "2D/3D modeling and toolpath generation" },
      { module: "Machine Training", topic: "Hands-on practice with actual CNC machines" },
    ],
    careerOpportunities: [
      "CAD/CAM Programmer",
      "Design Engineer",
      "Manufacturing Engineer",
      "CNC Programmer",
      "Process Engineer",
    ],
  },
  "quality-management": {
    title: "Advanced Quality Management System",
    description:
      "Comprehensive quality management training covering ISO standards, Six Sigma, statistical process control, FMEA, audits, and quality tools essential for manufacturing excellence.",
    whatYouLearn: [
      "Process Quality - Drawing interpretation, measuring instruments, sampling methods",
      "Product Quality control and assurance",
      "ISO 9000 Quality Management Principles and ISO 9001 awareness",
      "Six Sigma methodology and implementation",
      "Total Quality Management (TQM) tools and application",
      "Problem Solving using 8D Approach and QC Story Approach",
      "Poke Yoke (error-proofing) techniques",
      "Statistical Process Control (SPC)",
      "PPAP, DFMEA, PFMEA procedures",
      "Process flow diagrams and control plans",
      "MSA (R&R, Cp, Cpk) measurement system analysis",
      "Internal, external, customer, and supplier audits",
      "Safety protocols and 5S implementation",
      "Soft skills for quality professionals",
    ],
    curriculum: [
      { module: "Week 1", topic: "Quality fundamentals, ISO 9001, and Six Sigma" },
      { module: "Week 2", topic: "Quality tools, SPC, and problem solving" },
      { module: "Week 3", topic: "FMEA, PPAP, MSA, and control plans" },
      { module: "Week 4", topic: "Audits, safety, 5S, and soft skills" },
    ],
    careerOpportunities: [
      "Quality Control Manager",
      "Quality Assurance Engineer",
      "Six Sigma Professional",
      "Process Improvement Specialist",
      "Quality Auditor",
    ],
  },
  "advanced-diploma-manufacturing": {
    title: "Advanced Diploma Manufacturing",
    description:
      "The most comprehensive program covering all aspects of modern manufacturing - CNC turning, milling, CAD/CAM software, and quality management systems. Perfect for those seeking complete industry readiness.",
    whatYouLearn: [
      "Complete CNC Turning training (Operator to Advanced Programmer)",
      "Complete CNC Milling training (Operator to Advanced Programmer)",
      "AutoCAD - All aspects from fundamentals to 3D modeling",
      "UNIGRAPHICS - Part modeling, assembly, drafting, and manufacturing",
      "MASTERCAM - 2D/3D drawings, toolpaths, surface, and turning",
      "Quality Management System - Process, product, and tools quality",
      "ISO 9000 Quality Management Principles",
      "Poke Yoke and audit procedures",
      "Safety protocols and 5S methodology",
      "Professional soft skills development",
    ],
    curriculum: [
      { module: "Months 1-2", topic: "CNC Turning & Milling - All levels" },
      { module: "Months 3-4", topic: "AutoCAD, UNIGRAPHICS, and MASTERCAM" },
      { module: "Months 5-6", topic: "Quality Management and soft skills" },
    ],
    careerOpportunities: [
      "Manufacturing Engineer",
      "Production Manager",
      "CNC Programming Lead",
      "Quality & Process Engineer",
      "Technical Training Manager",
    ],
  },
  "industrial-automation": {
    title: "Industrial Automation",
    description:
      "Training in basic electrical, electronics, PLC programming, robotics, and modern automation systems for manufacturing environments.",
    whatYouLearn: [
      "Basic electrical and electronics fundamentals",
      "PLC (Programmable Logic Controller) programming",
      "Industrial robotics training",
      "Automation system design and implementation",
      "Sensor technology and integration",
      "Human-Machine Interface (HMI) programming",
      "Industrial networking and communication protocols",
      "Troubleshooting automated systems",
    ],
    curriculum: [
      { module: "Module 1", topic: "Electrical and electronics basics" },
      { module: "Module 2", topic: "PLC programming and applications" },
      { module: "Module 3", topic: "Robotics and automation systems" },
      { module: "Module 4", topic: "Integration and troubleshooting" },
    ],
    careerOpportunities: [
      "Automation Engineer",
      "PLC Programmer",
      "Robotics Technician",
      "Industrial Controls Engineer",
      "Maintenance Engineer",
    ],
  },
  "cnc-maintenance": {
    title: "CNC Maintenance",
    description:
      "Learn all types of CNC maintenance work, parameter setting, troubleshooting, and machine calibration to keep machines running at peak performance.",
    whatYouLearn: [
      "All types of preventive maintenance procedures",
      "Parameter setting and configuration",
      "Machine calibration and alignment",
      "Electrical system troubleshooting",
      "Mechanical component maintenance",
      "Hydraulic and pneumatic system care",
      "Spindle maintenance and repair",
      "Ball screw and guide way maintenance",
      "Control system diagnostics",
      "Emergency repair procedures",
    ],
    curriculum: [
      { module: "Module 1", topic: "Maintenance fundamentals and safety" },
      { module: "Module 2", topic: "Mechanical systems and components" },
      { module: "Module 3", topic: "Electrical and control systems" },
      { module: "Module 4", topic: "Advanced troubleshooting and repairs" },
    ],
    careerOpportunities: [
      "CNC Maintenance Technician",
      "Machine Tool Service Engineer",
      "Field Service Technician",
      "Maintenance Supervisor",
      "Technical Support Specialist",
    ],
  },
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = coursesData[slug]

  if (!course) {
    notFound()
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{course.title}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">{course.description}</p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.whatYouLearn.map((item: string, index: number) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Course Curriculum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.curriculum.map((item: any, index: number) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{item.module}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.topic}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
                <Briefcase className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Career Paths</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Career Opportunities</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Upon completing this course, you'll be qualified for various roles in the manufacturing industry across
                India and abroad. Finix Education has strong industry connections to support your career growth.
              </p>
              <ul className="space-y-3">
                {course.careerOpportunities.map((career: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-muted-foreground">{career}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-2xl">Ready to Enroll?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-primary-foreground/90 leading-relaxed">
                  Start your journey in CNC machining today with 12 years of excellence. Our admissions team is ready to
                  answer your questions and help you get started.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>12 years of excellence in training</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Hands-on practice with real machines</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Government recognized institute</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>Industry-expert instructors</span>
                  </div>
                </div>
                <Button size="lg" variant="secondary" asChild className="w-full mt-4">
                  <Link href="/contact">Enquire for Admission</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore More Courses</h2>
          <div className="flex justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
