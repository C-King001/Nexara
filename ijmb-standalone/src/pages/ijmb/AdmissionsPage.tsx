import { motion } from "@/lib/motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import Navbar from "@/components/ijmb/Navbar";
import Footer from "@/components/ijmb/Footer";
import { admissionSteps } from "@/data/ijmb";

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] } }) };

const requirements = [
  { dept: "All Departments", color: "#D4A017", items: ["Minimum of 5 credits in O'Level (WAEC/NECO/NABTEB)","Credit pass in English Language (required for all)","Not older than 25 years at time of application","Valid means of identification","Passport photograph (recent, white background)"] },
  { dept: "Sciences", color: "#1A6338", items: ["Credit in Mathematics","Credit in at least two of: Biology, Chemistry, Physics","For Medicine/Nursing: credits in Biology, Chemistry, and Physics"] },
  { dept: "Arts & Humanities", color: "#C4501A", items: ["Credit in Literature in English or any relevant Arts subject","Credit in any Social Science subject (Government, History, etc.)"] },
  { dept: "Commercial Studies", color: "#8B5E3C", items: ["Credit in Mathematics","Credit in Commerce or Economics","At least one Business/Social Science subject"] },
];

const fees = [
  { label: "Application Fee", amount: "₦5,000", note: "Non-refundable", highlight: false },
  { label: "Tuition Fee (Full)", amount: "₦225,000", note: "Per session", highlight: true },
  { label: "1st Installment", amount: "₦75,000", note: "Due at enrollment", highlight: false },
  { label: "2nd Installment", amount: "₦75,000", note: "Due Month 4", highlight: false },
  { label: "3rd Installment", amount: "₦75,000", note: "Due Month 7", highlight: false },
];

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pattern-geo" />
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/8 text-gold text-xs font-semibold tracking-widest uppercase mb-6 animate-gold-pulse"><span className="w-1.5 h-1.5 rounded-full bg-gold" />Applications Open — 2025/2026</div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold leading-tight mb-6">Begin Your <span className="text-gold-gradient">Application</span></h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">Your university dream is closer than you think. Complete your IJMB application in under 20 minutes.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/ijmb/register" className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-gradient text-background font-semibold hover:scale-[1.02] transition-all">Apply Now <ArrowRight className="w-4 h-4" /></Link>
            <Link to="/ijmb/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Have questions? Contact us →</Link>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4">Application <span className="text-gold-gradient">Process</span></h2>
          <p className="text-muted-foreground text-lg">Five steps from start to enrollment.</p>
        </motion.div>
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {admissionSteps.map((step, i) => (
            <motion.div key={step.step} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08} variants={fadeUp} className="flex items-start gap-5 p-5 rounded-2xl border border-border bg-surface-1 hover:border-gold/25 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-xl flex-shrink-0">{step.icon}</div>
              <div>
                <div className="flex items-center gap-2 mb-1"><span className="text-gold text-xs font-bold tracking-widest">STEP {step.step}</span></div>
                <h3 className="font-semibold text-foreground text-base mb-1">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 bg-surface-1/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4">Entry <span className="text-gold-gradient">Requirements</span></h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5">
            {requirements.map((req, i) => (
              <motion.div key={req.dept} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fadeUp} className="p-6 rounded-2xl border border-border bg-surface-1">
                <div className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-full mb-4" style={{ background: `${req.color}15`, color: req.color, border: `1px solid ${req.color}25` }}>{req.dept}</div>
                <ul className="flex flex-col gap-2.5">
                  {req.items.map((item) => (<li key={item} className="flex items-start gap-2.5"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: req.color }} /><span className="text-sm text-foreground/85">{item}</span></li>))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold mb-4">Program <span className="text-gold-gradient">Fees</span></h2>
          <p className="text-muted-foreground text-lg">Transparent pricing with flexible installment options.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {fees.map((fee, i) => (
            <motion.div key={fee.label} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.07} variants={fadeUp} className={`p-5 rounded-2xl border transition-colors ${fee.highlight ? "border-gold/40 bg-gold/6" : "border-border bg-surface-1"}`}>
              {fee.highlight && <div className="text-[10px] font-bold text-gold tracking-widest uppercase mb-2">Best Value</div>}
              <div className="text-muted-foreground text-sm mb-1">{fee.label}</div>
              <div className={`font-serif text-2xl font-bold mb-1 ${fee.highlight ? "text-gold" : "text-foreground"}`}>{fee.amount}</div>
              <div className="text-muted-foreground text-xs">{fee.note}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-1 border border-border text-sm">
          <AlertCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <p className="text-muted-foreground">All fees are payable securely via <strong className="text-foreground">Paystack</strong> (card or bank transfer).</p>
        </div>
      </section>

      <section className="py-20 px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl font-bold mb-4">Ready to <span className="text-gold-gradient">Apply?</span></h2>
          <p className="text-muted-foreground text-lg mb-8">Create your account and start your application in minutes.</p>
          <Link to="/ijmb/register" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gold-gradient text-background font-semibold hover:scale-[1.02] transition-all">Start Application <ArrowRight className="w-4 h-4" /></Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
