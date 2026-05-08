import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
const heroBackground = "https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop";
const pamLogo = "https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=300&auto=format&fit=crop";
import { CheckCircle, ClipboardList, Gauge, Mail, Phone, Truck, Factory, ShieldCheck, Users, DollarSign } from "lucide-react";

const sections = [
  {
    id: "routing",
    title: "Routing & Delivery Efficiency",
    icon: Truck,
    questions: [
      "Do you track stops per hour or stops per route?",
      "Are delivery routes planned before the day starts instead of built reactively?",
      "Do you review runouts and emergency deliveries every month?",
      "Do you measure gallons delivered per driver or truck?",
      "Do you know where route overlap is costing labor and fuel?"
    ]
  },
  {
    id: "plant",
    title: "Bulk Plant & Storage Operations",
    icon: Factory,
    questions: [
      "Do you track storage utilization by season?",
      "Do you have a clear summer/winter ratio strategy?",
      "Do you review transport supply options before peak demand?",
      "Do you track plant downtime or loading delays?",
      "Do you have a backup plan when supply or weather pressure hits?"
    ]
  },
  {
    id: "safety",
    title: "Safety & Compliance",
    icon: ShieldCheck,
    questions: [
      "Are driver files, inspections, and training records reviewed regularly?",
      "Do you track CETP or job-specific training completion?",
      "Are incidents and near misses reviewed for operational patterns?",
      "Do managers verify daily vehicle and equipment inspections?",
      "Is compliance treated as a daily operating discipline, not a paperwork event?"
    ]
  },
  {
    id: "leadership",
    title: "Staffing & Leadership Execution",
    icon: Users,
    questions: [
      "Does every team member know the key operating goals for the week?",
      "Do you hold short operational meetings during peak season?",
      "Are weak processes addressed before they become emergencies?",
      "Do you cross-train employees for seasonal pressure points?",
      "Is accountability consistent across drivers, office staff, and managers?"
    ]
  },
  {
    id: "financial",
    title: "Financial & Operational Visibility",
    icon: DollarSign,
    questions: [
      "Do you review overtime as an operational warning sign?",
      "Do you know cost per stop or cost per delivery?",
      "Do you review inactive tanks and low-performing accounts?",
      "Do you connect operational decisions to margin impact?",
      "Can you quickly identify where hidden profit leaks are happening?"
    ]
  }
];

const scale = [
  { value: 1, label: "Not in place" },
  { value: 2, label: "Rarely" },
  { value: 3, label: "Sometimes" },
  { value: 4, label: "Usually" },
  { value: 5, label: "Consistently" }
];

function scoreLabel(score) {
  if (score >= 90) return { title: "Elite Operator", message: "Your operation shows strong visibility, discipline, and execution. The next opportunity is refinement and benchmarking." };
  if (score >= 75) return { title: "Strong Operator — Margin May Still Be Leaking", message: "The foundation is there, but a few operating areas may be quietly costing labor, gallons, or margin." };
  if (score >= 60) return { title: "Operational Stress Building", message: "Your operation likely has areas where daily pressure is hiding deeper issues. This is where a second set of eyes can create value." };
  return { title: "Hidden Profit Loss Likely", message: "Your operation may be working hard but losing efficiency through routing, visibility, staffing, or storage gaps." };
}

export default function OperationsScorecardApp() {
  const allQuestions = sections.flatMap((section) =>
    section.questions.map((question, index) => ({
      id: `${section.id}-${index}`,
      sectionId: section.id,
      sectionTitle: section.title,
      question
    }))
  );

  const [answers, setAnswers] = useState({});
  const [lead, setLead] = useState({ name: "", company: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = allQuestions.length;
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const totalScore = useMemo(() => {
    const max = totalQuestions * 5;
    const raw = Object.values(answers).reduce((sum, value) => sum + Number(value), 0);
    return Math.round((raw / max) * 100) || 0;
  }, [answers, totalQuestions]);

  const sectionScores = useMemo(() => {
    return sections.map((section) => {
      const values = section.questions.map((_, index) => Number(answers[`${section.id}-${index}`] || 0));
      const raw = values.reduce((sum, value) => sum + value, 0);
      const score = Math.round((raw / (section.questions.length * 5)) * 100) || 0;
      return { ...section, score };
    });
  }, [answers]);

  const result = scoreLabel(totalScore);
  const weakest = [...sectionScores].sort((a, b) => a.score - b.score).slice(0, 2);
  const strongest = [...sectionScores].sort((a, b) => b.score - a.score).slice(0, 2);

  const canSubmit = answeredCount === totalQuestions && lead.name && lead.company && lead.email;

  return (
    <div
  className="min-h-screen text-white"
  style={{
   backgroundImage: "linear-gradient(rgba(2,6,23,0.70), rgba(2,6,23,0.85)), url('https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1600&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
      <section
        className="relative overflow-hidden px-4 py-10 md:px-8 md:py-16"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_35%)]" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between rounded-3xl border border-white/10 bg-black/30 px-6 py-4 backdrop-blur">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1513828583688-c52646db42da?q=80&w=300&auto=format&fit=crop"
                alt="PAM Enterprises"
                className="h-16 w-16 rounded-2xl object-cover ring-2 ring-amber-300/40"
              />
              <div>
                <p className="text-2xl font-bold tracking-wide text-white">PAM Enterprises LLC</p>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Built by Propane Operations</p>
              </div>
            </div>

            <div className="hidden rounded-2xl border border-amber-300/20 bg-amber-300/10 px-5 py-3 text-right md:block">
              <p className="text-sm text-slate-300">The 30,000-Gallon View</p>
              <p className="font-semibold text-white">Operational Intelligence Platform</p>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                <Gauge className="h-4 w-4" /> The 30,000-Gallon View
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
                Propane Operations Scorecard
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
                A practical self-assessment for propane owners and managers who want to see where routing, storage, staffing, safety, and financial visibility may be hiding profit leaks.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full bg-white/10 px-4 py-2">Confidential</span>
                <span className="rounded-full bg-white/10 px-4 py-2">10–15 minutes</span>
                <span className="rounded-full bg-white/10 px-4 py-2">Built by propane operations</span>
              </div>
            </div>

            <Card className="border-white/10 bg-white/10 text-white shadow-2xl backdrop-blur">
              <CardContent className="p-6">
                <ClipboardList className="mb-4 h-10 w-10 text-amber-300" />
                <h2 className="text-2xl font-semibold">Your progress</h2>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full rounded-full bg-amber-400 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-3 text-slate-300">{answeredCount} of {totalQuestions} questions answered</p>
                <div className="mt-6 rounded-2xl bg-slate-900/80 p-5">
                  <p className="text-sm text-slate-400">Current score</p>
                  <p className="mt-1 text-5xl font-bold text-amber-300">{totalScore}</p>
                  <p className="mt-1 text-sm text-slate-400">out of 100</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 pb-16 md:px-8">
        <div className="grid gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.id} className="border-slate-800 bg-slate-900/80 text-white shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-2xl bg-amber-400/15 p-3 text-amber-300"><Icon className="h-6 w-6" /></div>
                    <div>
                      <h2 className="text-2xl font-semibold">{section.title}</h2>
                      <p className="text-sm text-slate-400">Rate each area from 1 to 5.</p>
                    </div>
                  </div>
                  <div className="grid gap-5">
                    {section.questions.map((question, index) => {
                      const id = `${section.id}-${index}`;
                      return (
                        <div key={id} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                          <p className="font-medium text-slate-100">{question}</p>
                          <div className="mt-4 grid gap-2 sm:grid-cols-5">
                            {scale.map((item) => (
                              <button
                                key={item.value}
                                onClick={() => setAnswers((prev) => ({ ...prev, [id]: item.value }))}
                                className={`rounded-xl border px-3 py-3 text-left text-sm transition ${answers[id] === item.value ? "border-amber-300 bg-amber-300 text-slate-950" : "border-slate-700 bg-slate-900 text-slate-300 hover:border-amber-300/70"}`}
                              >
                                <span className="block text-base font-bold">{item.value}</span>
                                <span>{item.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 border-amber-300/30 bg-amber-300/10 text-white shadow-xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold">Receive your scorecard summary</h2>
            <p className="mt-2 text-slate-300">Enter your information to view the full result. This is designed as a private operational self-check, not a public grade.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300" placeholder="Your name" value={lead.name} onChange={(e) => setLead({ ...lead, name: e.target.value })} />
              <input className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300" placeholder="Company" value={lead.company} onChange={(e) => setLead({ ...lead, company: e.target.value })} />
              <input className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300" placeholder="Email" value={lead.email} onChange={(e) => setLead({ ...lead, email: e.target.value })} />
              <input className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-300" placeholder="Phone optional" value={lead.phone} onChange={(e) => setLead({ ...lead, phone: e.target.value })} />
            </div>
            <Button disabled={!canSubmit} onClick={() => setSubmitted(true)} className="mt-6 rounded-xl bg-amber-400 px-6 py-6 text-base font-bold text-slate-950 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-50">
              View My Scorecard Result
            </Button>
          </CardContent>
        </Card>

        {submitted && (
          <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mt-8 grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
            <Card className="border-white/10 bg-white text-slate-950 shadow-2xl">
              <CardContent className="p-6">
                <CheckCircle className="mb-4 h-10 w-10 text-emerald-600" />
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Your result</p>
                <h2 className="mt-2 text-3xl font-bold">{result.title}</h2>
                <p className="mt-4 text-slate-700">{result.message}</p>
                <div className="mt-6 rounded-2xl bg-slate-950 p-6 text-white">
                  <p className="text-sm text-slate-400">Final score</p>
                  <p className="mt-1 text-6xl font-bold text-amber-300">{totalScore}</p>
                  <p className="text-sm text-slate-400">out of 100</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-900 text-white shadow-2xl">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold">Operational view</h3>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-slate-950 p-5">
                    <p className="font-semibold text-amber-300">Strongest areas</p>
                    <ul className="mt-3 space-y-2 text-slate-300">
                      {strongest.map((item) => <li key={item.id}>{item.title}: {item.score}%</li>)}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-slate-950 p-5">
                    <p className="font-semibold text-amber-300">Needs deeper review</p>
                    <ul className="mt-3 space-y-2 text-slate-300">
                      {weakest.map((item) => <li key={item.id}>{item.title}: {item.score}%</li>)}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5">
                  <h4 className="text-xl font-semibold">Want a deeper operational breakdown?</h4>
                  <p className="mt-2 text-slate-300">PAM Enterprises can review the scorecard with you and help identify where routing, storage, staffing, safety, or visibility may be costing margin.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href="mailto:marco.perez@pamenterprisesllc.com" className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-3 font-bold text-slate-950 hover:bg-amber-300"><Mail className="h-4 w-4" /> Email PAM</a>
                    <a href="tel:17173443992" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-3 font-bold text-white hover:border-amber-300"><Phone className="h-4 w-4" /> Call PAM</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}
      </main>
    </div>
  );
}
