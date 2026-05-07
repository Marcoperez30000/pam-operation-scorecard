import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { CheckCircle, ClipboardList, Gauge, Mail, Phone, Truck, Factory, ShieldCheck, Users, DollarSign } from "lucide-react";
import "./styles.css";

const sections = [
  { id: "routing", title: "Routing & Delivery Efficiency", icon: Truck, questions: ["Do you track stops per hour or stops per route?", "Are delivery routes planned before the day starts instead of built reactively?", "Do you review runouts and emergency deliveries every month?", "Do you measure gallons delivered per driver or truck?", "Do you know where route overlap is costing labor and fuel?"] },
  { id: "plant", title: "Bulk Plant & Storage Operations", icon: Factory, questions: ["Do you track storage utilization by season?", "Do you have a clear summer/winter ratio strategy?", "Do you review transport supply options before peak demand?", "Do you track plant downtime or loading delays?", "Do you have a backup plan when supply or weather pressure hits?"] },
  { id: "safety", title: "Safety & Compliance", icon: ShieldCheck, questions: ["Are driver files, inspections, and training records reviewed regularly?", "Do you track CETP or job-specific training completion?", "Are incidents and near misses reviewed for operational patterns?", "Do managers verify daily vehicle and equipment inspections?", "Is compliance treated as a daily operating discipline, not a paperwork event?"] },
  { id: "leadership", title: "Staffing & Leadership Execution", icon: Users, questions: ["Does every team member know the key operating goals for the week?", "Do you hold short operational meetings during peak season?", "Are weak processes addressed before they become emergencies?", "Do you cross-train employees for seasonal pressure points?", "Is accountability consistent across drivers, office staff, and managers?"] },
  { id: "financial", title: "Financial & Operational Visibility", icon: DollarSign, questions: ["Do you review overtime as an operational warning sign?", "Do you know cost per stop or cost per delivery?", "Do you review inactive tanks and low-performing accounts?", "Do you connect operational decisions to margin impact?", "Can you quickly identify where hidden profit leaks are happening?"] }
];

const scale = [
  { value: 1, label: "Not in place" }, { value: 2, label: "Rarely" }, { value: 3, label: "Sometimes" }, { value: 4, label: "Usually" }, { value: 5, label: "Consistently" }
];

function scoreLabel(score) {
  if (score >= 90) return { title: "Elite Operator", message: "Your operation shows strong visibility, discipline, and execution. The next opportunity is refinement and benchmarking." };
  if (score >= 75) return { title: "Strong Operator — Margin May Still Be Leaking", message: "The foundation is there, but a few operating areas may be quietly costing labor, gallons, or margin." };
  if (score >= 60) return { title: "Operational Stress Building", message: "Your operation likely has areas where daily pressure is hiding deeper issues. This is where a second set of eyes can create value." };
  return { title: "Hidden Profit Loss Likely", message: "Your operation may be working hard but losing efficiency through routing, visibility, staffing, or storage gaps." };
}

function App() {
  const allQuestions = sections.flatMap((section) => section.questions.map((question, index) => ({ id: `${section.id}-${index}`, sectionId: section.id, sectionTitle: section.title, question })));
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
  const sectionScores = useMemo(() => sections.map((section) => {
    const values = section.questions.map((_, index) => Number(answers[`${section.id}-${index}`] || 0));
    const raw = values.reduce((sum, value) => sum + value, 0);
    const score = Math.round((raw / (section.questions.length * 5)) * 100) || 0;
    return { ...section, score };
  }), [answers]);
  const result = scoreLabel(totalScore);
  const weakest = [...sectionScores].sort((a, b) => a.score - b.score).slice(0, 2);
  const strongest = [...sectionScores].sort((a, b) => b.score - a.score).slice(0, 2);
  const canSubmit = answeredCount === totalQuestions && lead.name && lead.company && lead.email;

  return <div className="app">
    <section className="hero">
      <div className="heroBg" />
      <div className="container heroGrid">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="brandMark">PAM</div>
          <div className="eyebrow"><Gauge size={16}/> The 30,000-Gallon View</div>
          <h1>Propane Operations Scorecard</h1>
          <p className="heroText">A practical self-assessment for propane owners and managers who want to see where routing, storage, staffing, safety, and financial visibility may be hiding profit leaks.</p>
          <div className="chips"><span>Confidential</span><span>10–15 minutes</span><span>Built by propane operations</span></div>
        </motion.div>
        <div className="card glass">
          <ClipboardList className="amber" size={42}/>
          <h2>Your progress</h2>
          <div className="bar"><div style={{ width: `${progress}%` }} /></div>
          <p>{answeredCount} of {totalQuestions} questions answered</p>
          <div className="scoreBox"><small>Current score</small><strong>{totalScore}</strong><small>out of 100</small></div>
        </div>
      </div>
    </section>
    <main className="container main">
      {sections.map((section) => { const Icon = section.icon; return <div key={section.id} className="card sectionCard">
        <div className="sectionHead"><div className="icon"><Icon size={26}/></div><div><h2>{section.title}</h2><p>Rate each area from 1 to 5.</p></div></div>
        {section.questions.map((question, index) => { const id = `${section.id}-${index}`; return <div className="question" key={id}>
          <p>{question}</p><div className="options">{scale.map((item) => <button key={item.value} onClick={() => setAnswers((prev) => ({ ...prev, [id]: item.value }))} className={answers[id] === item.value ? "selected" : ""}><b>{item.value}</b><span>{item.label}</span></button>)}</div>
        </div>})}
      </div>})}
      <div className="card leadCard"><h2>Receive your scorecard summary</h2><p>Enter your information to view the full result. This is designed as a private operational self-check, not a public grade.</p>
        <div className="form"><input placeholder="Your name" value={lead.name} onChange={(e)=>setLead({...lead,name:e.target.value})}/><input placeholder="Company" value={lead.company} onChange={(e)=>setLead({...lead,company:e.target.value})}/><input placeholder="Email" value={lead.email} onChange={(e)=>setLead({...lead,email:e.target.value})}/><input placeholder="Phone optional" value={lead.phone} onChange={(e)=>setLead({...lead,phone:e.target.value})}/></div>
        <button disabled={!canSubmit} onClick={()=>setSubmitted(true)} className="primary">View My Scorecard Result</button>
      </div>
      {submitted && <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="results">
        <div className="card resultCard"><CheckCircle className="green" size={42}/><small>Your result</small><h2>{result.title}</h2><p>{result.message}</p><div className="scoreBox dark"><small>Final score</small><strong>{totalScore}</strong><small>out of 100</small></div></div>
        <div className="card sectionCard"><h2>Operational view</h2><div className="twoCols"><div className="mini"><b>Strongest areas</b>{strongest.map(item=><p key={item.id}>{item.title}: {item.score}%</p>)}</div><div className="mini"><b>Needs deeper review</b>{weakest.map(item=><p key={item.id}>{item.title}: {item.score}%</p>)}</div></div><div className="cta"><h3>Want a deeper operational breakdown?</h3><p>PAM Enterprises can review the scorecard with you and help identify where routing, storage, staffing, safety, or visibility may be costing margin.</p><a href="mailto:marco.perez@pamenterprisesllc.com"><Mail size={16}/> Email PAM</a><a href="tel:17173443992"><Phone size={16}/> Call PAM</a></div></div>
      </motion.section>}
    </main>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
