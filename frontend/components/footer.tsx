import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <Image
                src="/images/finix-logo-transparent.png"
                alt="Finix Education Logo"
                width={120}
                height={80}
                className="h-auto w-32"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Leading CNC training institute with 12 years of excellence in machining, programming, and manufacturing
              technology education.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">
                  Nareshwar Mandir Road, A/P. Sanaswadi, Tal. Shirur, Pune-412208
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a href="tel:+919922568308" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 9922568308
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm pl-6">
                  <a href="tel:+918668621630" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 8668621630
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:finixeducation@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  finixeducation@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/about", label: "About Us" },
                { href: "/courses", label: "Our Courses" },
                { href: "/result", label: "Check Result" },
                { href: "/blog", label: "Blog" },
                { href: "/youtube", label: "YouTube Lectures" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/ganesh.salunke.9279/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 w-9 flex items-center justify-center rounded border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 flex items-center justify-center rounded border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://www.youtube.com/@Finixcncskills01"
                className="h-9 w-9 flex items-center justify-center rounded border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-4">Reg. No.: MAH-1883/2014/F-45463/PUNE</p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Finix Education Institute. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
