import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

export default function FeliciaFooter() {
  return (
    <footer className="section-dark pattern-adire">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-ff-spice flex items-center justify-center text-ff-cream font-heading font-bold text-lg">
                F
              </div>
              <span className="font-heading text-xl font-semibold text-ff-cream">Felicia Foods</span>
            </div>
            <p className="text-sm text-ff-cream/60 leading-relaxed font-body">
              Kaduna's premier food delivery experience. Authentic flavors, premium quality, delivered to your door.
            </p>
            <div className="flex gap-3">
              <SocialLink href="#" icon={<Instagram size={16} />} />
              <SocialLink href="#" icon={<Facebook size={16} />} />
              <SocialLink href="#" icon={<Twitter size={16} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-semibold text-ff-cream mb-4">Explore</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Browse Menu", href: "/menu" },
                { label: "Track Order", href: "/track" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "Special Offers", href: "/menu" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-ff-cream/60 hover:text-ff-cream transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-heading text-base font-semibold text-ff-cream mb-4">Account</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Sign In", href: "/auth" },
                { label: "Create Account", href: "/auth?tab=register" },
                { label: "My Orders", href: "/account/orders" },
                { label: "Saved Addresses", href: "/account" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-ff-cream/60 hover:text-ff-cream transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold text-ff-cream mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-ff-cream/60 font-body">
                <MapPin size={15} className="text-ff-terracotta mt-0.5 flex-shrink-0" />
                <span>Kaduna State, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-ff-cream/60 font-body">
                <Phone size={15} className="text-ff-terracotta flex-shrink-0" />
                <a href="tel:+2348012345678" className="hover:text-ff-cream transition-colors">
                  +234 801 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-ff-cream/60 font-body">
                <Mail size={15} className="text-ff-terracotta flex-shrink-0" />
                <a href="mailto:hello@feliciafoods.ng" className="hover:text-ff-cream transition-colors">
                  hello@feliciafoods.ng
                </a>
              </li>
            </ul>

            <div className="mt-5 p-3 rounded-xl border border-white/10 bg-white/5">
              <p className="text-xs text-ff-cream/50 font-body">Opening Hours</p>
              <p className="text-sm text-ff-cream/80 font-medium mt-0.5">Mon – Sun: 8:00 AM – 10:00 PM</p>
            </div>
          </div>
        </div>

        <div className="ff-divider mt-12 mb-6" style={{ background: "linear-gradient(90deg, transparent, hsl(36 55% 92% / 0.15), transparent)" }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ff-cream/40 font-body">
          <p>© {new Date().getFullYear()} Felicia Foods. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="#" className="hover:text-ff-cream/70 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-ff-cream/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-8 h-8 rounded-full border border-ff-cream/20 flex items-center justify-center text-ff-cream/60 hover:text-ff-cream hover:border-ff-cream/40 transition-all duration-200"
    >
      {icon}
    </a>
  );
}
