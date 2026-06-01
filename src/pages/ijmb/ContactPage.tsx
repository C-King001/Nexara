import { useState } from "react";
import { motion } from "@/lib/motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/ijmb/Navbar";
import Footer from "@/components/ijmb/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }),
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="absolute inset-0 pattern-geo" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative z-10 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-gold text-xs font-semibold tracking-widest uppercase mb-6">
            Get in Touch
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">
            We're Here to <span className="text-gold-gradient">Help</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-xl mx-auto">
            Questions about IJMB, admissions, or the platform? Our team responds within 2 hours on business days.
          </p>
        </motion.div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto pb-24">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {[
              { icon: Phone, label: "Phone", value: "+234 801 234 5678", sub: "Mon–Fri, 8am–5pm", href: "tel:+2348012345678" },
              { icon: Mail, label: "Email", value: "info@ijmbprogram.ng", sub: "We reply within 2 hours", href: "mailto:info@ijmbprogram.ng" },
              { icon: MapPin, label: "Address", value: "Ahmadu Bello University", sub: "Zaria, Kaduna State, Nigeria", href: "#" },
              { icon: Clock, label: "Office Hours", value: "Monday – Friday", sub: "8:00am – 5:00pm WAT", href: "#" },
            ].map(({ icon: Icon, label, value, sub, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/30 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                  <div className="font-medium text-foreground group-hover:text-gold transition-colors">{value}</div>
                  <div className="text-xs text-muted-foreground">{sub}</div>
                </div>
              </a>
            ))}

            {/* Social */}
            <div className="p-5 rounded-2xl border border-border bg-surface-1">
              <div className="text-sm font-semibold text-foreground mb-3">Follow us</div>
              <div className="flex gap-3">
                {[
                  { label: "Twitter / X", handle: "@ijmbprogram" },
                  { label: "Instagram", handle: "@ijmbprogram" },
                ].map((s) => (
                  <div key={s.label} className="flex-1 p-3 rounded-xl bg-surface-2 border border-border text-center">
                    <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
                    <div className="text-sm font-medium text-gold">{s.handle}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ ...fadeUp, visible: { opacity: 1, y: 0, transition: { delay: 0.2 } } }}
            className="lg:col-span-3"
          >
            <div className="p-8 rounded-3xl border border-border bg-surface-1">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold">Message Received!</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 2 business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="px-6 py-2.5 rounded-xl border border-border text-sm font-medium hover:border-gold/30 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-serif text-2xl font-bold mb-6">Send us a message</h3>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
                          Full Name
                        </label>
                        <input
                          required
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 text-foreground placeholder-muted-foreground text-sm transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
                          Email Address
                        </label>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 text-foreground placeholder-muted-foreground text-sm transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
                        Subject
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 text-foreground text-sm transition-colors"
                      >
                        <option value="">Select a topic</option>
                        <option>Admissions Enquiry</option>
                        <option>Fee Payment Issue</option>
                        <option>Student Portal Help</option>
                        <option>Department Information</option>
                        <option>Results & Grading</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-border focus:border-gold/40 focus:outline-none focus:ring-1 focus:ring-gold/20 text-foreground placeholder-muted-foreground text-sm resize-none transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gold-gradient text-background font-semibold shadow-[0_0_30px_-10px_hsl(43_80%_50%/0.5)] hover:shadow-[0_0_50px_-10px_hsl(43_80%_50%/0.7)] hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          Send Message <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
