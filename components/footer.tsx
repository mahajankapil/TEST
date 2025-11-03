import { Mail, Linkedin, Twitter, Github, Youtube } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-background to-background/80">
      <div className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white">
                  <span className="text-xs font-bold">UI</span>
                </div>
                <span className="text-sm font-bold text-foreground">MASTERY</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Learn. Build. Master. From courses to real-world projects.
              </p>
            </div>

            {/* Courses */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Courses</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/all-courses" className="text-sm text-muted-foreground hover:text-primary transition">
                    All Courses
                  </Link>
                </li>
                <li>
                  <Link href="/learning-path" className="text-sm text-muted-foreground hover:text-primary transition">
                    Learning Paths
                  </Link>
                </li>
                <li>
                  <Link href="/trending" className="text-sm text-muted-foreground hover:text-primary transition">
                    Trending Now
                  </Link>
                </li>
                <li>
                  <Link href="/new-releases" className="text-sm text-muted-foreground hover:text-primary transition">
                    New Releases
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/report-bug" className="text-sm text-muted-foreground hover:text-primary transition">
                    Report a Bug
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 UI Mastery. All rights reserved.</p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-primary"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-primary"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:contact@uimastery.com"
                className="p-2 rounded-lg hover:bg-muted transition text-muted-foreground hover:text-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
