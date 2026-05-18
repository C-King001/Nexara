import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="font-display font-bold text-2xl tracking-tight mb-3 block">
              <span className="text-gradient">Nexara</span>
            </Link>
            <p className="font-mono text-xs text-dim mb-2">Built to scale. Wired to win.</p>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              We build the revenue infrastructure that lets your business run — even when you log out.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Services</p>
            <div className="flex flex-col gap-2">
              <Link to="/automation" className="text-sm text-muted-foreground hover:text-primary transition-colors">Automation Systems</Link>
              <Link to="/social-media" className="text-sm text-muted-foreground hover:text-primary transition-colors">Social Media</Link>
              <a href="#cases" className="text-sm text-muted-foreground hover:text-primary transition-colors">Case Studies</a>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Connect</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://calendly.com/faithfulnyama/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Book a System Audit
              </a>
              <a href="mailto:faithfulnyama@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                faithfulnyama@gmail.com
              </a>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Nexara</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-dim">
            © {new Date().getFullYear()} Nexara. All rights reserved.
          </p>
          <p className="font-mono text-xs text-dim">
            Revenue Systems · Automation · Social Media
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
