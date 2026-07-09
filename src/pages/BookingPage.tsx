import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { addDays, format, isBefore, startOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BOOKING, isBookingBackendLive } from "@/config/booking";

type Step = "date" | "time" | "details" | "success";

interface Details {
  name: string;
  email: string;
  business: string;
  phone: string;
  goal: string;
}

const emptyDetails: Details = { name: "", email: "", business: "", phone: "", goal: "" };

const visitorTimezone =
  Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

// Demo slots for previewing the flow before the n8n backend is wired up.
// Generates 9:00–16:00 local, every 30 min, for the given date.
const demoSlots = (date: Date): string[] => {
  const out: string[] = [];
  for (let h = 9; h < 16; h++) {
    for (const m of [0, 30]) {
      const d = new Date(date);
      d.setHours(h, m, 0, 0);
      out.push(d.toISOString());
    }
  }
  return out;
};

const BookingPage = () => {
  const [step, setStep] = useState<Step>("date");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [details, setDetails] = useState<Details>(emptyDetails);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const live = isBookingBackendLive();

  const disabledDays = useMemo(
    () => [
      { before: addDays(startOfDay(new Date()), 1) },
      { after: addDays(startOfDay(new Date()), BOOKING.bookingWindowDays) },
      { dayOfWeek: [...BOOKING.disabledWeekdays] },
    ],
    [],
  );

  const fmtTime = (iso: string) =>
    new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      timeZone: visitorTimezone,
    }).format(new Date(iso));

  const tzLabel = visitorTimezone.replace(/_/g, " ");

  const loadSlots = async (chosen: Date) => {
    setLoadingSlots(true);
    setSlotError(null);
    setSlots([]);
    try {
      if (!live) {
        await new Promise((r) => setTimeout(r, 500));
        setSlots(demoSlots(chosen));
        return;
      }
      const res = await fetch(BOOKING.availabilityUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(chosen, "yyyy-MM-dd"),
          timezone: visitorTimezone,
        }),
      });
      if (!res.ok) throw new Error("availability request failed");
      const data = await res.json();
      const got: string[] = Array.isArray(data?.slots) ? data.slots : [];
      setSlots(got);
    } catch {
      setSlotError("We couldn't load times for that day. Please try another day.");
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateSelect = (d: Date | undefined) => {
    if (!d) return;
    if (isBefore(d, startOfDay(new Date()))) return;
    setDate(d);
    setSelectedSlot(null);
    setStep("time");
    loadSlots(d);
  };

  const validDetails =
    details.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email);

  const submitBooking = async () => {
    if (!selectedSlot || !validDetails) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      if (!live) {
        await new Promise((r) => setTimeout(r, 900));
        setStep("success");
        return;
      }
      const res = await fetch(BOOKING.bookingUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: selectedSlot,
          timezone: visitorTimezone,
          ...details,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || "booking failed");
      }
      setStep("success");
    } catch {
      setSubmitError(
        "That time was just taken or something went wrong. Please pick another slot.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const stepIndex = { date: 0, time: 1, details: 2, success: 3 }[step];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-24 px-6 relative overflow-hidden">
        {/* ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <div className="relative max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="font-mono text-xs text-primary tracking-widest uppercase block mb-4">
              // Book Your Free Audit
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Grab a {BOOKING.callLengthMin}-minute slot
            </h1>
            <p className="text-muted-foreground">
              No pitch — we map your lead flow and find where revenue is leaking. We build it
              first, you pay after 7 days of results.
            </p>
            {!live && (
              <span className="inline-block mt-4 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 font-mono text-[10px] tracking-widest uppercase text-accent">
                Preview mode · live scheduling connects soon
              </span>
            )}
          </div>

          {/* Progress */}
          {step !== "success" && (
            <div className="flex items-center justify-center gap-2 mb-10">
              {["Date", "Time", "Details"].map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
                      i === stepIndex
                        ? "border-primary text-primary bg-primary/10"
                        : i < stepIndex
                        ? "border-primary/40 text-primary/70"
                        : "border-border text-dim"
                    }`}
                  >
                    <span>{i < stepIndex ? "✓" : i + 1}</span>
                    {label}
                  </div>
                  {i < 2 && <span className="w-4 h-px bg-border" />}
                </div>
              ))}
            </div>
          )}

          <div className="module-border bg-surface-1 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* STEP 1 — DATE */}
              {step === "date" && (
                <motion.div
                  key="date"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col items-center"
                >
                  <p className="font-display font-semibold text-foreground mb-5">Pick a day</p>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    disabled={disabledDays}
                    className="rounded-lg border border-border bg-surface-2"
                  />
                  <p className="mt-4 font-mono text-xs text-dim">
                    Times shown in your timezone · {tzLabel}
                  </p>
                </motion.div>
              )}

              {/* STEP 2 — TIME */}
              {step === "time" && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        {date && format(date, "EEEE, MMMM d")}
                      </p>
                      <p className="font-mono text-xs text-dim">{tzLabel}</p>
                    </div>
                    <button
                      onClick={() => setStep("date")}
                      className="font-mono text-xs text-primary hover:underline"
                    >
                      ← Change day
                    </button>
                  </div>

                  {loadingSlots ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="h-11 rounded-md bg-surface-2 animate-pulse" />
                      ))}
                    </div>
                  ) : slotError ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground text-sm mb-4">{slotError}</p>
                      <button
                        onClick={() => setStep("date")}
                        className="font-mono text-xs text-primary hover:underline"
                      >
                        Pick another day
                      </button>
                    </div>
                  ) : slots.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground text-sm mb-4">
                        No open times that day. Try another.
                      </p>
                      <button
                        onClick={() => setStep("date")}
                        className="font-mono text-xs text-primary hover:underline"
                      >
                        Pick another day
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {slots.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setSelectedSlot(s);
                            setStep("details");
                          }}
                          className="h-11 rounded-md border border-border bg-surface-2 font-mono text-sm text-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                          {fmtTime(s)}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 3 — DETAILS */}
              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="font-display font-semibold text-foreground">
                        {selectedSlot && date && `${format(date, "EEE, MMM d")} · ${fmtTime(selectedSlot)}`}
                      </p>
                      <p className="font-mono text-xs text-dim">
                        {BOOKING.callLengthMin} min · {tzLabel}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep("time")}
                      className="font-mono text-xs text-primary hover:underline"
                    >
                      ← Change time
                    </button>
                  </div>

                  <div className="space-y-4">
                    <Field
                      label="Your name"
                      required
                      value={details.name}
                      onChange={(v) => setDetails({ ...details, name: v })}
                      placeholder="Jane Doe"
                    />
                    <Field
                      label="Email"
                      required
                      type="email"
                      value={details.email}
                      onChange={(v) => setDetails({ ...details, email: v })}
                      placeholder="jane@business.com"
                      autoComplete="email"
                    />
                    <Field
                      label="Business name"
                      value={details.business}
                      onChange={(v) => setDetails({ ...details, business: v })}
                      placeholder="Acme HVAC"
                    />
                    <Field
                      label="Phone (optional)"
                      type="tel"
                      value={details.phone}
                      onChange={(v) => setDetails({ ...details, phone: v })}
                      placeholder="+1 555 123 4567"
                      autoComplete="tel"
                    />
                    <div>
                      <label className="font-mono text-xs text-dim tracking-wide block mb-2">
                        What do you want to automate?
                      </label>
                      <textarea
                        value={details.goal}
                        onChange={(e) => setDetails({ ...details, goal: e.target.value })}
                        rows={3}
                        placeholder="e.g. we miss calls during jobs and lose the lead"
                        className="w-full rounded-md border border-border bg-surface-2 px-4 py-3 text-sm text-foreground placeholder:text-dim focus:border-primary focus:outline-none resize-none"
                      />
                    </div>

                    {submitError && (
                      <p className="text-sm text-destructive" role="alert">
                        {submitError}
                      </p>
                    )}

                    <button
                      onClick={submitBooking}
                      disabled={!validDetails || submitting}
                      className="w-full h-12 rounded-md bg-primary text-primary-foreground font-display font-semibold hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {submitting ? "Booking…" : "Confirm my call"}
                    </button>
                    <p className="text-center font-mono text-[11px] text-dim">
                      You'll get a confirmation email + calendar invite instantly.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 4 — SUCCESS */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-3">
                    You're booked{details.name ? `, ${details.name.split(" ")[0]}` : ""}.
                  </h2>
                  <p className="text-muted-foreground mb-2">
                    {selectedSlot && date && (
                      <>
                        <span className="text-foreground font-medium">
                          {format(date, "EEEE, MMMM d")} · {fmtTime(selectedSlot)}
                        </span>{" "}
                        ({tzLabel})
                      </>
                    )}
                  </p>
                  <p className="text-muted-foreground text-sm mb-8">
                    A confirmation email and calendar invite are on their way. See you then.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-md font-display font-medium text-foreground hover:border-primary/50 transition-colors"
                  >
                    ← Back to home
                  </Link>
                  {!live && (
                    <p className="mt-6 font-mono text-[10px] text-dim tracking-widest uppercase">
                      Preview only — no real booking was made
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Fallback path always available */}
          {step !== "success" && (
            <p className="text-center mt-6 font-mono text-xs text-dim">
              Prefer Calendly?{" "}
              <a
                href={BOOKING.fallbackCalendly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Book there instead
              </a>
            </p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}

const Field = ({ label, value, onChange, placeholder, type = "text", required, autoComplete }: FieldProps) => (
  <div>
    <label className="font-mono text-xs text-dim tracking-wide block mb-2">
      {label}
      {required && <span className="text-primary"> *</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full h-11 rounded-md border border-border bg-surface-2 px-4 text-sm text-foreground placeholder:text-dim focus:border-primary focus:outline-none"
    />
  </div>
);

export default BookingPage;
