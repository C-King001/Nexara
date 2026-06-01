import { Link } from 'react-router-dom';
import { Zap, Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Shop: [
    { label: 'Smartphones', to: '/catalog?category=smartphone' },
    { label: 'Earbuds', to: '/catalog?category=earbuds' },
    { label: 'Headphones', to: '/catalog?category=headphones' },
    { label: 'Smartwatches', to: '/catalog?category=watch' },
    { label: 'Cases', to: '/catalog?category=case' },
    { label: 'Chargers', to: '/catalog?category=charger' },
  ],
  Support: [
    { label: 'Help Center', to: '#' },
    { label: 'Track Order', to: '/account/orders' },
    { label: 'Returns & Refunds', to: '#' },
    { label: 'Warranty Info', to: '#' },
    { label: 'Contact Us', to: '#' },
  ],
  Company: [
    { label: 'About Us', to: '#' },
    { label: 'Careers', to: '#' },
    { label: 'Press', to: '#' },
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
  ],
};

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function StoreFooter() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#070709] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-12 border-b border-white/[0.07]">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-lime flex items-center justify-center">
                <Zap size={18} className="text-black fill-black" />
              </div>
              <div className="leading-none">
                <div className="font-display font-800 text-xl tracking-tight text-white">SDK</div>
                <div className="font-code text-[9px] text-white/40 tracking-[0.2em] uppercase -mt-0.5">PHONE STORE</div>
              </div>
            </Link>
            <p className="text-sm text-white/45 font-ui leading-relaxed max-w-xs mb-6">
              Premium phones and accessories delivered to your door. The most trusted online destination for mobile technology in Ghana and beyond.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg kure-surface flex items-center justify-center text-white/40 hover:text-lime hover:border-lime/30 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-display font-700 text-sm text-white/90 uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/45 hover:text-white font-ui transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-b border-white/[0.07]">
          {[
            { icon: Phone, text: '+233 20 000 0000', label: 'Call Us' },
            { icon: Mail, text: 'hello@sdkphonestore.com', label: 'Email Us' },
            { icon: MapPin, text: 'Accra, Ghana', label: 'Visit Us' },
          ].map(({ icon: Icon, text, label }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-lime/10 border border-lime/20 flex items-center justify-center shrink-0">
                <Icon size={16} className="text-lime" />
              </div>
              <div>
                <div className="text-[11px] text-white/30 font-code uppercase tracking-wider">{label}</div>
                <div className="text-sm text-white/70 font-ui">{text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-white/30 font-ui">
            © {new Date().getFullYear()} SDK Phone Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/30 font-ui">
            <span>Secure Payments</span>
            <span className="text-white/[0.12]">·</span>
            <span>Fast Delivery</span>
            <span className="text-white/[0.12]">·</span>
            <span>Genuine Products</span>
          </div>
          {/* Payment icons placeholder */}
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'MTN', 'PayPal'].map((pm) => (
              <div key={pm} className="px-2 py-1 rounded kure-surface text-[10px] font-code text-white/40 border border-white/[0.06]">
                {pm}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
