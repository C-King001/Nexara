import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = {
  Program: [
    { label: "About IJMB", href: "/ijmb/about" },
    { label: "Departments", href: "/ijmb/departments" },
    { label: "Admissions", href: "/ijmb/admissions" },
    { label: "FAQ", href: "/ijmb/faq" },
  ],
  "Student Resources": [
    { label: "Student Portal", href: "/ijmb/login" },
    { label: "Course Materials", href: "/ijmb/login" },
    { label: "Past Questions", href: "/ijmb/login" },
    { label: "Academic Calendar", href: "/ijmb/login" },
  ],
  Contact: [
    { label: "Contact Us", href: "/ijmb/contact" },
    { label: "Apply Online", href: "/ijmb/apply" },
    { label: "News & Updates", href: "/ijmb/about" },
    { label: "Scholarships", href: "/ijmb/admissions" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface-1 border-t border-border relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-border">
          <div className="lg:col-span-2">
            <Link to="/ijmb" className="flex items-center gap-2.5 group w-fit mb-6">
              <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center shadow-[0_0_20px_-5px_hsl(43_80%_50%/0.5)]">
                <span className="text-background font-bold text-sm font-serif">IJ</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif font-bold text-foreground text-lg tracking-tight">IJMB</span>
                <span className="text-gold text-[10px] font-sans font-medium tracking-widest uppercase">.program</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              Nigeria's premier digital campus for IJMB Advanced Level studies. Your gateway to direct university admission.
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                <span>Ahmadu Bello University, Zaria, Kaduna State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                <a href="tel:+2348012345678" className="hover:text-foreground transition-colors">+234 801 234 5678</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                <a href="mailto:info@ijmbprogram.ng" className="hover:text-foreground transition-colors">info@ijmbprogram.ng</a>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-foreground font-semibold text-sm mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© 2025 IJMB.program. All rights reserved.</p>
          <div className="flex items-center gap-1">
            {[
              { icon: Twitter, label: "Twitter" },
              { icon: Instagram, label: "Instagram" },
              { icon: Youtube, label: "YouTube" },
            ].map(({ icon: Icon, label }) => (
              <button key={label} aria-label={label} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-gold hover:bg-gold/5 transition-all">
                <Icon className="w-4 h-4" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
