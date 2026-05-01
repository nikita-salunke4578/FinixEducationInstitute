import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import ContactForm from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="inline-block px-4 py-1.5 bg-primary/10 backdrop-blur-sm rounded-full text-sm font-semibold text-primary mb-4 animate-in fade-in slide-in-from-top duration-500">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance animate-in fade-in slide-in-from-bottom duration-700">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-secondary to-accent mb-6 rounded-full animate-in fade-in slide-in-from-left duration-700 delay-200"></div>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed animate-in fade-in slide-in-from-bottom duration-700 delay-300">
            Have questions about our courses? Need more information? We're here to help! Reach out to us through any of
            the channels below.
          </p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="mb-8">
                <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-3">
                  Contact Information
                </div>
                <h2 className="text-3xl font-bold">Get in Touch</h2>
              </div>

              <div className="space-y-6 mb-8">
                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-[17px] mb-2">Our Location</CardTitle>
                        <p className="text-[15px] text-muted-foreground leading-relaxed">
                          Finix Education Institute
                          <br />
                          Nareshwar Mandir Road
                          <br />
                          A/P. Sanaswadi, Tal. Shirur
                          <br />
                          Pune - 412208, Maharashtra
                          <br />
                          India
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-[17px] mb-2">Phone</CardTitle>
                        <p className="text-[15px] text-muted-foreground">
                          <a href="tel:+918668621630" className="hover:text-primary transition-colors">
                            +91 8668621630
                          </a>
                          <br />
                          <a href="tel:+919922568308" className="hover:text-primary transition-colors">
                            +91 9922568308
                          </a>
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-[17px] mb-2">Email</CardTitle>
                        <p className="text-[15px] text-muted-foreground">
                          <a href="mailto:finixeducation@gmail.com" className="hover:text-primary transition-colors">
                            finixeducation@gmail.com
                          </a>
                          <br />
                          <span className="text-xs">Visit: www.finixeducation.com</span>
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-[17px] mb-2">Course Timings</CardTitle>
                        <p className="text-[15px] text-muted-foreground leading-relaxed">
                          Full Time: 9:30 AM - 4:30 PM
                          <br />
                          Part Time: 3 hours/day (Flexible timing)
                          <br />
                          <span className="text-[11px] mt-2 block">Contact us to discuss your preferred schedule</span>
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* WhatsApp Button */}
              <Card className="bg-accent text-accent-foreground">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <MessageCircle className="h-8 w-8 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Quick WhatsApp Support</h3>
                      <p className="text-sm text-accent-foreground/80 mb-3">Get instant answers to your questions</p>
                      <Button size="sm" asChild>
                        <a href="https://wa.me/9922568308" target="_blank" rel="noopener noreferrer">
                          Chat on WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enquiry Form */}
            <div>
              <div className="mb-8">
                <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-3">
                  Send Message
                </div>
                <h2 className="text-3xl font-bold">Send us a Message</h2>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-sm font-semibold text-primary mb-4">
              Our Location
            </div>
            <h2 className="text-3xl font-bold mb-4">Find Us on Map</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
          </div>

          <div className="max-w-5xl mx-auto mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-3 shadow-sm">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Nareshwar Mandir Road, Sanaswadi, Tal. Shirur, Pune - 412208, Maharashtra, India
              </span>
            </div>
          </div>

          <div className="aspect-video max-w-5xl mx-auto rounded-lg overflow-hidden border-2 border-border shadow-lg">
            <iframe
              src="https://www.google.com/maps?q=18.6718844,74.1002106&z=17&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Finix CNC Cad Cam Training Center Location"
            ></iframe>
          </div>

        </div>
      </section>
    </div>
  )
}
