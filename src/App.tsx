/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin,  
  Moon, 
  Sun, 
  ArrowRight,
  Search,
  Database,
  Cpu,
  MessageSquare,
  Brain,
  Wrench,
  Zap,
  FileText,
  CheckCircle,
  RefreshCw,
  Play,
  SkipForward,
  Info
} from 'lucide-react';

// --- Components ---

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [dark]);

  return (
    <button 
      onClick={() => setDark(!dark)}
      className="fixed top-8 right-8 z-50 p-2 mix-blend-difference text-[var(--fg)] hover:scale-110 transition-transform"
      aria-label="Toggle Theme"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

const Section = ({ children, className = "", id, noPadding = false }: { children: React.ReactNode; className?: string; id?: string; key?: React.Key; noPadding?: boolean }) => (
  <section id={id} className={`flex flex-col justify-center px-6 md:px-12 lg:px-24 ${noPadding ? '' : 'py-24'} ${className} group/section`}>
    <div className="max-w-5xl w-full mx-auto relative">
      {/* Pretext Scanner Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="absolute -top-12 left-0 w-24 h-[1px] bg-[var(--acc)] origin-left opacity-50"
      />
      {children}
    </div>
  </section>
);

const Reveal = ({ 
  children, 
  delay = 0, 
  duration = 1.2, 
  y = 20,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number; 
  duration?: number; 
  key?: React.Key; 
  y?: number;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px 0px 100px 0px" }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Narrative text loading component (Pretext style).
 * Splits text into words and animates them individually.
 */
const PretextText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <div className="flex flex-wrap gap-x-[0.25em] gap-y-0 text-inherit leading-inherit">
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block leading-tight">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: delay + (i * 0.02),
              ease: [0.33, 1, 0.68, 1]
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

const Mono = ({ children, className = "" }: { children: React.ReactNode; className?: string; key?: React.Key }) => (
  <span className={`font-mono text-sm tracking-tight opacity-60 uppercase ${className}`}>
    {children}
  </span>
);

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete(); // Call immediately
          return 100;
        }
        return prev + 1;
      });
    }, 15); // Faster loading
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] bg-[var(--bg)] flex items-center justify-center p-12"
    >
      <div className="max-w-md w-full font-mono">
        <div className="flex justify-between mb-4">
          <span className="text-[var(--acc)]">BOOTING_CORE_ENGINE</span>
          <span>{percent}%</span>
        </div>
        <div className="w-full h-[1px] bg-geom mb-8 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[var(--acc)]"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="space-y-2 text-[10px] opacity-40">
          <div>[OK] INITIALIZING_GEOMETRIC_COORDINATES</div>
          <div>[OK] SYNCING_NARRATIVE_PIPELINES</div>
          <div>[OK] CALIBRATING_PRETEXT_LAYOUTS</div>
          <div>[..] MOUNTING_INTERACTIVE_CONSOLES</div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Content Data ---

const PROJECTS = [
  {
    title: "Rental Management System",
    role: "Full Stack Lead",
    description: "A comprehensive platform for modern property managers. Beyond just tracking leases, it's an ecosystem for tenant relations and facility maintenance.",
    features: ["Automated Lease Cycles", "Maintenance Dispatch", "Financial Dashboarding"],
    tech: ["Django", "React", "PostgreSQL", "AWS"],
    year: "2024"
  },
  {
    title: "Tenant Screening System",
    role: "Backend Architect",
    description: "Security and trust are the foundations of housing. This system uses advanced background check integrations to ensure quality matches.",
    features: ["API Orchestration", "Document Verification", "Risk Assessment Models"],
    tech: ["Django REST", "React", "S3", "Third-party APIs"],
    year: "2023"
  },
  {
    title: "Automated Payment Gateway",
    role: "Fintech Engineer",
    description: "Handling money requires precision. This module manages complex payment flows, automated invoicing, and transaction reconciliations.",
    features: ["Stripe Integration", "Real-time LEDGER", "PDF Auto-Generation"],
    tech: ["Python", "Django", "React", "Webhooks"],
    year: "2023"
  }
];

const SKILLS = {
  Backend: ["Django", "Python", "DRF", "PostgreSQL", "Redis"],
  Frontend: ["React", "TypeScript", "TailwindCSS", "Motion"],
  Cloud: ["AWS EC2", "S3", "Lambda", "Docker", "CI/CD"],
  Extra: ["Stripe Integration", "System Design", "Microservices"]
};

const METRICS = [
  { label: "Uptime Monitored", value: "99.99%", detail: "Mission-critical systems" },
  { label: "Requests Orchestrated", value: "2.4M+", detail: "Across cloud clusters" },
  { label: "Deployment Velocity", value: "10-min", detail: "End-to-end CI/CD" }
];

// --- AI Pipeline Components ---

const PipelineDiagram = ({ pipeline }: { pipeline: any }) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimStep, setCurrentAnimStep] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentAnimStep((prev) => {
          if (prev >= pipeline.steps.length - 1) {
            setIsAnimating(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
    } else {
      setCurrentAnimStep(0);
    }
    return () => clearInterval(interval);
  }, [isAnimating, pipeline.steps.length]);

  return (
    <div className="w-full bg-[var(--aside-bg)] border border-geom rounded-2xl p-8 premium-shadow relative overflow-hidden group">
      {/* Play Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-20">
        <div className="flex bg-[var(--bg)] border border-geom rounded-full p-1 shadow-sm">
          <button 
            onClick={() => {
              setIsAnimating(false);
              setCurrentAnimStep((prev) => (prev > 0 ? prev - 1 : prev));
              setActiveStep(currentAnimStep > 0 ? currentAnimStep - 1 : currentAnimStep);
            }}
            className="p-1.5 hover:bg-[var(--aside-bg)] rounded-full transition-colors text-[var(--muted)] hover:text-[var(--acc)]"
            title="Previous Step"
          >
            <SkipForward size={12} className="rotate-180" />
          </button>
          <button 
            onClick={() => setIsAnimating(!isAnimating)}
            className={`px-4 py-1.5 rounded-full text-[9px] font-mono font-bold uppercase flex items-center gap-2 transition-all ${isAnimating ? 'bg-[var(--acc)] text-white' : 'hover:bg-[var(--aside-bg)] text-[var(--muted)]'}`}
          >
            {isAnimating ? <RefreshCw size={10} className="animate-spin" /> : <Play size={10} />}
            {isAnimating ? "Simulating" : "Start Simulation"}
          </button>
          <button 
            onClick={() => {
              setIsAnimating(false);
              setCurrentAnimStep((prev) => (prev < pipeline.steps.length - 1 ? prev + 1 : prev));
              setActiveStep(currentAnimStep < pipeline.steps.length - 1 ? currentAnimStep + 1 : currentAnimStep);
            }}
            className="p-1.5 hover:bg-[var(--aside-bg)] rounded-full transition-colors text-[var(--muted)] hover:text-[var(--acc)]"
            title="Next Step"
          >
            <SkipForward size={12} />
          </button>
        </div>
        
        <div className="hidden sm:flex border-l border-geom h-4 mx-1" />
        
        <button 
          onClick={() => {
            setIsAnimating(false);
            setCurrentAnimStep(0);
            setActiveStep(null);
          }}
          className="text-[9px] font-mono font-bold uppercase text-[var(--muted)] hover:text-[var(--acc)] transition-colors px-2 underline underline-offset-4"
        >
          Reset
        </button>
      </div>

      {/* Diagram Area */}
      <div className="relative flex flex-col md:flex-row justify-between items-center gap-4 py-20">
        {pipeline.steps.map((step: any, idx: number) => {
          const Icon = step.icon;
          const isActive = activeStep === idx || (isAnimating && currentAnimStep === idx);
          const isNext = isAnimating && currentAnimStep === idx - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step Node */}
              <div 
                className="relative z-10 flex flex-col items-center gap-4 group/step cursor-help"
                onMouseEnter={() => !isAnimating && setActiveStep(idx)}
                onMouseLeave={() => !isAnimating && setActiveStep(null)}
              >
                <div 
                  className={`w-14 h-14 rounded-xl border flex items-center justify-center transition-all duration-500 scale-100 ${isActive ? 'border-[var(--acc)] bg-[var(--acc)] bg-opacity-10 scale-110 shadow-[0_0_20px_rgba(224,62,26,0.2)]' : 'border-geom bg-[var(--bg)]'}`}
                >
                  <Icon size={24} className={isActive ? 'text-[var(--acc)]' : 'text-[var(--muted)]'} />
                </div>
                <div className="text-center">
                  <span className={`font-mono text-[9px] uppercase font-bold tracking-widest block transition-colors ${isActive ? 'text-[var(--acc)]' : 'text-[var(--muted)]'}`}>
                    {step.label}
                  </span>
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {(activeStep === idx || (isAnimating && currentAnimStep === idx)) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 p-4 bg-[var(--bg)] border border-geom rounded-lg shadow-xl z-30 pointer-events-none"
                    >
                      <div className="flex items-center gap-2 mb-2 text-[var(--acc)]">
                        <Info size={12} />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{step.label}</span>
                      </div>
                      <p className="text-[10px] leading-relaxed text-[var(--muted)] font-medium">
                        {step.detail}
                      </p>
                      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--bg)] border-t border-l border-geom rotate-45" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Connecting Line / Arrow */}
              {idx < pipeline.steps.length - 1 && (
                <div className="hidden md:block flex-1 h-[1px] bg-geom relative overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-[var(--acc)] to-transparent opacity-0 transition-opacity ${isActive || isNext ? 'opacity-100' : ''}`} 
                    style={{ 
                      animation: (isActive || isNext) ? 'flow 1.5s linear infinite' : 'none' 
                    }} 
                  />
                  {/* Flow Particle */}
                  {(isAnimating && currentAnimStep === idx) && (
                    <motion.div 
                      initial={{ left: "0%" }}
                      animate={{ left: "100%" }}
                      transition={{ duration: 1.5, ease: "linear" }}
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--acc)] rounded-full blur-[2px]"
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <style>{`
        @keyframes flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

const AI_PIPELINES = [
  {
    id: "rag",
    title: "RAG Pipeline Architectures",
    description: "Architecting semantic retrieval systems that augment LLMs with private, real-time knowledge bases for hallucination-free output.",
    steps: [
      { id: "query", label: "Query", icon: Search, detail: "Captured user input is pre-processed for retrieval optimization." },
      { id: "embed", label: "Embedding", icon: Cpu, detail: "Input is transformed into a high-dimensional vector representation." },
      { id: "vector", label: "Vector Store", icon: Database, detail: "Semantic similarity search across massive encoded document clusters." },
      { id: "retrieve", label: "Augment", icon: ArrowRight, detail: "Top relevant chunks are injected into the LLM context window." },
      { id: "llm", label: "LLM Sync", icon: Brain, detail: "Context + Instruction is synthesized to generate verified responses." },
      { id: "response", label: "Delivery", icon: MessageSquare, detail: "Final output is parsed, filtered, and served to the client." }
    ]
  },
  {
    id: "agent",
    title: "Multi-Agent Orchestration",
    description: "Developing Server-Side autonomous systems that can decompose complex goals into discrete, tool-enabled tasks.",
    steps: [
      { id: "goal", label: "Goal Input", icon: Zap, detail: "High-level objective defined by the user or system trigger." },
      { id: "planner", label: "Planner", icon: Brain, detail: "LLM decomposes the goal into a sequence of actionable steps." },
      { id: "tools", label: "Tools Hub", icon: Wrench, detail: "Execution of API calls, code snippets, or database operations." },
      { id: "reflect", label: "Reflector", icon: RefreshCw, detail: "System evaluates output against the goal for self-correction." },
      { id: "complete", label: "Final State", icon: CheckCircle, detail: "Validated objective completion with a structured report." }
    ]
  },
  {
    id: "docai",
    title: "Document Intelligence",
    description: "End-to-end data extraction pipelines that transform unstructered documents into verified, relational data points.",
    steps: [
      { id: "scan", label: "OCR Scan", icon: FileText, detail: "Raw visual data is converted into machine-readable text blocks." },
      { id: "extract", label: "Extraction", icon: Cpu, detail: "Named Entity Recognition fetches keys, values, and table structures." },
      { id: "validate", label: "Validation", icon: CheckCircle, detail: "Automatic confidence scoring + Human-in-the-loop verification." },
      { id: "sync", label: "ERP Sync", icon: RefreshCw, detail: "Clean data is mapped and synchronized with legacy database clusters." }
    ]
  }
];

// --- Main App ---

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="relative min-h-screen bg-[var(--bg)] selection:bg-[var(--fg)] selection:text-[var(--bg)] font-sans flex flex-col lg:grid lg:grid-cols-[80px_1fr_340px] lg:grid-rows-[1fr_auto]">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--acc)] z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <ThemeToggle />

      {/* Sidebar - Geometric Labeling */}
      <nav className="hidden lg:flex sidebar border-r border-geom flex-col justify-between items-center py-12 sticky top-0 h-screen z-20">
        <div className="w-2 h-2 rounded-full bg-[var(--acc)] animate-pulse" />
        <div className="sidebar-label font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--muted)] opacity-50">
          Engineering Console v2.0
        </div>
        <div className="sidebar-label font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--acc)] font-bold">
          System Operational
        </div>
      </nav>

      {/* Main Content Column */}
      <main className="lg:border-b border-geom overflow-x-hidden relative">
        {/* Background Visual Ornament */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--acc)] opacity-[0.03] blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        {/* Hero Section */}
        <Section className="relative lg:!py-32 overflow-hidden">
          <Reveal y={50}>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-geom rounded-full mb-8 glass shadow-sm">
              <motion.span 
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Mono className="text-[9px] font-bold !opacity-100">Narrative System Ready</Mono>
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-sans font-bold leading-[0.85] tracking-[-0.05em] mb-8">
              <PretextText text="HEMANTH." />
            </h1>
          </Reveal>
          
          <Reveal delay={0.4}>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-[var(--acc)] mb-12 uppercase tracking-[0.15em] font-medium border-l-2 border-[var(--acc)] pl-6 py-1">
              <span>Full Stack</span>
              <span className="opacity-20">//</span>
              <span>Django</span>
              <span className="opacity-20">//</span>
              <span>React</span>
              <span className="opacity-20">//</span>
              <span>AWS</span>
            </div>
          </Reveal>
          
          <div className="text-2xl md:text-3xl font-light leading-tight text-balance max-w-2xl text-[var(--fg)] mb-16">
            <PretextText delay={0.6} text="Engineering resilient pipelines and cloud architectures that transform abstract ideas into production-grade SaaS ecosystems." />
          </div>

          <div className="flex flex-wrap gap-8 items-center border-t border-geom pt-12">
            {METRICS.map((metric, i) => (
              <Reveal key={i} delay={1 + (i * 0.1)} y={10}>
                <div className="flex flex-col gap-1 pr-12 last:pr-0 border-r border-geom last:border-0 border-opacity-30">
                  <span className="text-3xl font-mono font-bold">{metric.value}</span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--acc)] font-bold">{metric.label}</span>
                  <span className="text-[10px] text-[var(--muted)]">{metric.detail}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Philosophy Grid - Premium Cards */}
        <Section className="bg-[var(--aside-bg)] border-y border-geom !py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: "01", t: "Architecture First", d: "I believe in building systems where scalability is not an afterthought, but the core foundation of every module." },
              { icon: "02", t: "DevOps Integration", d: "Zero-downtime deployments and automated CI/CD pipelines are essential requirements, not just optional features." },
              { icon: "03", t: "Security by Design", d: "Protecting user data and ensuring system integrity is handled at the source code level with enterprise standards." }
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 0.1} y={20}>
                <div className="p-8 border border-geom bg-[var(--bg)] rounded-xl premium-shadow group hover:border-[var(--acc)] transition-all h-full">
                  <span className="text-[var(--acc)] font-mono text-xs font-bold mb-4 block group-hover:translate-x-1 transition-transform">{item.icon} // STRATEGY</span>
                  <h3 className="text-xl font-bold mb-4">{item.t}</h3>
                  <div className="text-sm text-[var(--muted)] leading-relaxed">
                    <PretextText delay={idx * 0.1} text={item.d} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Narrative Section */}
        <Section id="about" className="lg:!py-32">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="lg:w-1/3">
              <Reveal>
                <Mono className="mb-8 block text-[var(--acc)] font-bold">The Perspective</Mono>
                <h2 className="text-4xl md:text-5xl font-sans font-bold tracking-tight leading-[0.9]">
                  Backend is <br/>the heart of <br/>product.
                </h2>
              </Reveal>
            </div>
            <div className="lg:w-2/3 space-y-10">
              <Reveal delay={0.2} duration={1.5}>
                <div className="prose prose-xl dark:prose-invert font-sans leading-relaxed text-[var(--muted)] max-w-none">
                  <div className="text-3xl font-light text-[var(--fg)] leading-snug mb-8">
                    <PretextText delay={0.4} text="I build architectures that don't just solve today's problems, but anticipate tomorrow's load." />
                  </div>
                  <div className="mb-6">
                    <PretextText delay={0.8} text="Specializing in the Django & Python ecosystem, I've delivered mission-critical tools ranging from end-to-end property governance platforms to secure Fintech modules." />
                  </div>
                  <div>
                    <PretextText delay={1.2} text="My approach is defined by Operational Excellence. Every commit is evaluated for performance impacts, ensuring that the cloud resources (AWS) are utilized with maximum efficiency and minimum cost." />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* AI Intelligence Systems */}
        <Section id="intelligence" className="bg-[var(--bg)] border-t border-geom !py-32">
          <Reveal>
            <div className="mb-20">
              <Mono className="text-[var(--acc)] font-bold mb-6 block">Intelligence Systems</Mono>
              <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tighter mb-8 leading-[0.9]">
                Interactive <br />AI Architecture.
              </h2>
              <p className="text-xl text-[var(--muted)] max-w-2xl leading-relaxed">
                Visualizing the complex logic behind modern AI-driven backend systems. Hover over nodes to inspect processes or simulate the data flow.
              </p>
            </div>
          </Reveal>

          <div className="space-y-32">
            {AI_PIPELINES.map((pipeline, pIdx) => (
              <div key={pipeline.id} className="space-y-12">
                <Reveal delay={pIdx * 0.1}>
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="max-w-xl">
                      <Mono className="text-[9px] mb-3 !opacity-40">Pipeline v0{pIdx + 1}</Mono>
                      <h3 className="text-3xl font-bold mb-4 tracking-tight">{pipeline.title}</h3>
                      <p className="text-[var(--muted)] leading-relaxed">{pipeline.description}</p>
                    </div>
                  </div>
                  <PipelineDiagram pipeline={pipeline} />
                </Reveal>
              </div>
            ))}
          </div>
        </Section>

        {/* Performance & Skills Section */}
        <div className="lg:px-24">
          <Section className="!min-h-0 py-24 border-t border-geom bg-[var(--bg)] relative overflow-hidden">
             {/* Decorative Background for Section */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, var(--acc) 1px, transparent 1px), linear-gradient(-45deg, var(--acc) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <Reveal y={0}>
              <h3 className="text-6xl font-bold mb-16 tracking-tighter">Stack Intelligence.</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
                {Object.entries(SKILLS).map(([category, items], idx) => (
                  <div key={category} className="space-y-6 group">
                    <h3 className="font-mono text-[11px] text-[var(--acc)] uppercase font-bold tracking-[0.2em] flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-[var(--acc)]" />
                      {category}
                    </h3>
                    <div className="text-lg font-medium flex flex-wrap gap-x-6 gap-y-3">
                      {items.map((item, i) => (
                        <span key={i} className="hover:text-[var(--acc)] transition-colors cursor-default">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>

          {PROJECTS.map((project, idx) => (
            <Section key={idx} className="!min-h-0 py-32 border-t border-geom group">
              <Reveal>
                <div className="flex flex-col lg:flex-row gap-12">
                   <div className="lg:w-1/2">
                      <div className="flex items-center gap-4 mb-6">
                        <Mono className="!opacity-30">Case Study 0{idx + 1}</Mono>
                        <div className="h-[1px] flex-1 bg-geom" />
                        <Mono>{project.year}</Mono>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold mb-8 group-hover:text-[var(--acc)] transition-colors tracking-tight">{project.title}</h3>
                      <p className="text-lg text-[var(--muted)] font-light leading-relaxed mb-8">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map(t => (
                          <span key={t} className="font-mono text-[9px] px-3 py-1 border border-geom text-[var(--muted)] uppercase font-bold group-hover:border-[var(--acc)] group-hover:text-[var(--fg)] transition-all">
                            {t}
                          </span>
                        ))}
                      </div>
                   </div>
                   <div className="lg:w-1/2 bg-[var(--aside-bg)] p-8 rounded-2xl border border-geom border-opacity-30 relative overflow-hidden group-hover:translate-y-[-4px] transition-transform duration-500">
                      <div className="relative z-10">
                        <Mono className="text-[10px] mb-6 block text-[var(--acc)] font-bold">Technical Implementation</Mono>
                        <ul className="space-y-4">
                          {project.features.map((f, i) => (
                            <li key={i} className="text-sm border-l-2 border-[var(--acc)] pl-4 py-1 leading-relaxed font-medium">
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {/* Subtle SVG illustration placeholder for SaaS look */}
                      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none">
                        <svg viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="40" /><path d="M50 10L50 90M10 50L90 50" /></svg>
                      </div>
                   </div>
                </div>
              </Reveal>
            </Section>
          ))}
        </div>
      </main>

      {/* Right Column - Case Studies (Condensed Navigation) */}
      <aside className="bg-[var(--aside-bg)] border-l border-geom p-10 hidden lg:flex flex-col gap-10 overflow-y-auto sticky top-0 h-screen z-10 glass">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] border-b border-geom pb-4 mb-2 font-bold text-[var(--acc)]">
          // Selection v2.0
        </div>
        
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="flex flex-col gap-3 group cursor-pointer border-b border-geom border-opacity-30 pb-8 last:border-0 hover:bg-white dark:hover:bg-neutral-900 -mx-4 px-4 rounded-lg transition-all duration-300">
            <Mono className="opacity-30 text-[9px]">Case Study v0{idx + 1}</Mono>
            <h4 className="text-xl font-bold group-hover:text-[var(--acc)] transition-colors tracking-tight leading-none">{project.title}</h4>
            <p className="text-xs leading-relaxed text-[var(--muted)] line-clamp-3 font-medium">
              {project.description}
            </p>
            <div className="flex gap-2 mt-2">
              <button className="text-[10px] font-mono uppercase font-bold text-[var(--acc)] flex items-center gap-2 group/btn">
                Read Metrics <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-auto pt-10 border-t border-geom">
          <Mono className="text-[11px] block mb-6 text-[var(--acc)] font-bold tracking-widest uppercase">Connection Panel</Mono>
          <div className="flex flex-col gap-4">
            <a href="mailto:hemanthrockzzzz199@gmail.com" className="text-sm font-bold hover:text-[var(--acc)] transition-colors border-b border-geom border-opacity-0 hover:border-opacity-100 pb-1 w-fit">EMAIL_PRIMARY</a>
            <a href="#" className="text-sm font-bold hover:text-[var(--acc)] transition-colors border-b border-geom border-opacity-0 hover:border-opacity-100 pb-1 w-fit">SOURCE_GITHUB</a>
            <a href="#" className="text-sm font-bold hover:text-[var(--acc)] transition-colors border-b border-geom border-opacity-0 hover:border-opacity-100 pb-1 w-fit">NETWORK_LINKEDIN</a>
          </div>
        </div>
      </aside>

      {/* Bottom Information (Mobile Footer / Desktop Extra) */}
      <footer className="lg:col-start-2 lg:col-span-2 border-t border-geom bg-[var(--bg)] p-12 lg:px-24 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-[var(--acc)] uppercase block font-bold tracking-[0.2em]">Strategy</span>
            <span className="text-xs font-bold leading-none">Scalable Systems</span>
          </div>
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-[var(--acc)] uppercase block font-bold tracking-[0.2em]">Deployment</span>
            <span className="text-xs font-bold leading-none">CI/CD Excellence</span>
          </div>
          <div className="space-y-3">
            <span className="font-mono text-[9px] text-[var(--acc)] uppercase block font-bold tracking-[0.2em]">Core Stack</span>
            <span className="text-xs font-bold leading-none">Django + Cloud</span>
          </div>
        </div>
        
        <div className="flex gap-8 items-center">
           <div className="flex flex-col items-end">
             <Mono className="text-[9px] font-bold">Build v2.0.4</Mono>
             <Mono className="text-[9px]">© 2026 Hemanth</Mono>
           </div>
           <div className="w-8 h-8 rounded-full border border-geom flex items-center justify-center group cursor-pointer hover:bg-[var(--fg)] hover:border-[var(--fg)] transition-all">
              <Github size={14} className="group-hover:text-[var(--bg)] transition-colors" />
           </div>
        </div>
      </footer>

      {/* Contact Trigger (Mobile) */}
      <div className="lg:hidden p-12 bg-[var(--aside-bg)] border-t border-geom">
          <Mono className="block mb-4 text-[var(--acc)] font-bold">Connection</Mono>
          <div className="flex flex-col gap-4">
            <a href="mailto:hemanthrockzzzz199@gmail.com" className="text-lg font-bold hover:text-[var(--acc)] decoration-[var(--acc)] decoration-1 underline-offset-4 underline">hemanthrockzzzz199@gmail.com</a>
            <div className="flex gap-6 mt-2">
              <a href="#" className="font-mono text-xs uppercase font-bold text-[var(--muted)]">GitHub</a>
              <a href="#" className="font-mono text-xs uppercase font-bold text-[var(--muted)]">LinkedIn</a>
            </div>
          </div>
      </div>
      </div>
    </>
  );
}
