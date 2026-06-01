import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "@/lib/motion";
import { Eye, EyeOff, ArrowRight, CheckCircle2, Upload } from "lucide-react";
import { useAuth } from "@/lib/ijmb-auth";
import { departments } from "@/data/ijmb";

const steps = ["Account", "Personal", "Academic", "Review"];

export default function RegisterPage() {
  const [step, setStep] = useState(0);
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    state: "",
    department: "",
    subjects: [] as string[],
    olevel: "",
    waecYear: "",
  });

  const selectedDept = departments.find((d) => d.id === form.department);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleNext = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
  };
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    await login(form.email, form.password, "student");
    setLoading(false);
    setDone(true);
    setTimeout(() => navigate("/ijmb/dashboard/student"), 2000);
  };

  if (done) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-gold" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-3">Application Submitted!</h1>
          <p className="text-muted-foreground mb-6">
            Your application is under review. We'll notify you within 3-5 working days. Redirecting to your dashboard...
          </p>
          <div className="w-8 h-8 rounded-full border-2 border-gold/30 border-t-gold animate-spin mx-auto" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden bg-surface-1 border-r border-border">
        <div className="absolute inset-0 pattern-geo" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />

        <Link to="/ijmb" className="relative z-10 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center">
            <span className="text-background font-bold text-sm font-serif">IJ</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif font-bold text-foreground text-lg">IJMB</span>
            <span className="text-gold text-[10px] tracking-widest uppercase">.program</span>
          </div>
        </Link>

        <div className="relative z-10">
          <h2 className="font-serif text-4xl font-bold mb-4">
            Start your <br />
            <span className="text-gold-gradient">university journey</span>
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-xs mb-8">
            Complete the registration in 4 simple steps and join 5,000+ students on the path to Nigerian universities.
          </p>
          {/* Progress steps */}
          <div className="flex flex-col gap-3">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    i < step
                      ? "bg-gold text-background"
                      : i === step
                      ? "bg-gold/20 border border-gold text-gold"
                      : "bg-surface-2 border border-border text-muted-foreground"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-sm ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link to="/ijmb/login" className="text-gold hover:underline">
            Sign in
          </Link>
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md"
        >
          {/* Mobile progress */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all ${i <= step ? "bg-gold" : "bg-surface-3"}`}
              />
            ))}
          </div>

          <div className="mb-8">
            <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
              Step {step + 1} of {steps.length}
            </div>
            <h2 className="font-serif text-3xl font-bold">{steps[step]}</h2>
          </div>

          {/* Step 0: Account */}
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground placeholder-muted-foreground transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    required
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full px-4 py-3.5 pr-12 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground placeholder-muted-foreground transition-colors"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Personal */}
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="First name"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground placeholder-muted-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Last name"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground placeholder-muted-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Date of Birth</label>
                  <input
                    type="date"
                    value={form.dob}
                    onChange={(e) => update("dob", e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">State of Origin</label>
                  <input
                    type="text"
                    value={form.state}
                    onChange={(e) => update("state", e.target.value)}
                    placeholder="e.g. Lagos"
                    className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>
              {/* Passport photo upload */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Passport Photo</label>
                <div className="flex items-center justify-center gap-3 py-6 rounded-xl border-2 border-dashed border-border hover:border-gold/30 transition-colors cursor-pointer bg-surface-1">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload (JPG/PNG, max 2MB)</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Department</label>
                <select
                  value={form.department}
                  onChange={(e) => update("department", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground"
                >
                  <option value="">Select your department</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              {selectedDept && (
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-2 block uppercase tracking-wider">
                    Principal Subjects (select 3)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {selectedDept.courses.map((c) => {
                      const isSelected = form.subjects.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            const newSubs = isSelected
                              ? form.subjects.filter((s) => s !== c)
                              : form.subjects.length < 3
                              ? [...form.subjects, c]
                              : form.subjects;
                            setForm((f) => ({ ...f, subjects: newSubs }));
                          }}
                          className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${
                            isSelected
                              ? "border-gold/40 bg-gold/10 text-gold"
                              : "border-border bg-surface-1 text-muted-foreground hover:border-gold/20"
                          }`}
                        >
                          {c}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {form.subjects.length}/3 selected
                  </p>
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">O'Level Type</label>
                <select
                  value={form.olevel}
                  onChange={(e) => update("olevel", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground"
                >
                  <option value="">Select O'Level type</option>
                  <option>WAEC</option>
                  <option>NECO</option>
                  <option>NABTEB</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block uppercase tracking-wider">Examination Year</label>
                <select
                  value={form.waecYear}
                  onChange={(e) => update("waecYear", e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-surface-1 border border-border focus:border-gold/40 focus:outline-none text-sm text-foreground"
                >
                  <option value="">Select year</option>
                  {[2024, 2023, 2022, 2021, 2020].map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="p-5 rounded-2xl bg-surface-1 border border-border flex flex-col gap-3">
                {[
                  { label: "Email", value: form.email },
                  { label: "Name", value: `${form.firstName} ${form.lastName}` },
                  { label: "Phone", value: form.phone },
                  { label: "Department", value: selectedDept?.name ?? "—" },
                  { label: "Subjects", value: form.subjects.join(", ") || "—" },
                  { label: "O'Level", value: `${form.olevel} ${form.waecYear}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
                    <span className="text-sm text-foreground font-medium">{value || "—"}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-gold/6 border border-gold/20 text-sm text-muted-foreground">
                ✅ By submitting, you confirm that all information is accurate. Your application will be reviewed within 3–5 working days.
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 py-3.5 rounded-xl border border-border bg-surface-1 text-foreground font-medium text-sm hover:border-gold/30 transition-colors"
              >
                Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold-gradient text-background font-semibold text-sm hover:scale-[1.01] transition-all shadow-[0_0_25px_-8px_hsl(43_80%_50%/0.5)]"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gold-gradient text-background font-semibold text-sm hover:scale-[1.01] disabled:opacity-70 transition-all shadow-[0_0_25px_-8px_hsl(43_80%_50%/0.5)]"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-background/30 border-t-background animate-spin" />
                ) : (
                  <>Submit Application <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
