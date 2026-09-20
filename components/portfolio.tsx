'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Brain,
  Check,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  ContactRound,
  Mail,
  MapPin,
  Network,
  Phone,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-react'

type Repo = { name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number }

type Project = {
  name: string
  tech: string
  architecture: string
  problem: string
  fallback: string
}

const projects: Project[] = [
  { name: 'InfraRecord', tech: 'Java · LangChain4j · OpenAI API', architecture: 'Production RAG system covering data ingestion, embedding, and retrieval.', problem: 'Turns fragmented credit data into a reliable, explainable profile.', fallback: 'RAG credit intelligence' },
  { name: 'Telemetry Pipeline', tech: 'Java · Apache Kafka · PostgreSQL', architecture: 'Event-driven telemetry pipeline built for multi-region observability.', problem: 'Makes service health visible before incidents reach customers.', fallback: 'Event telemetry' },
  { name: 'PayFlow APIs', tech: 'Spring Boot · REST · MySQL', architecture: 'Modular payment integration layer with resilient service boundaries.', problem: 'Simplifies secure payment orchestration for fintech platforms.', fallback: 'Payment orchestration' },
  { name: 'NLP Signals', tech: 'Python · NLP · Neural Networks', architecture: 'Text classification workflow for extracting high-signal business intent.', problem: 'Converts unstructured language into actionable product signals.', fallback: 'Language intelligence' },
  { name: 'Cloud Foundry', tech: 'AWS S3 · Kubernetes · Docker', architecture: 'Containerized deployment patterns with durable object storage.', problem: 'Gives teams a repeatable path from local development to cloud.', fallback: 'Cloud infrastructure' },
  { name: 'Network Watch', tech: 'Python · Linux · Networking', architecture: 'Lightweight monitoring toolkit for network performance and uptime.', problem: 'Reduces time-to-diagnosis for connectivity incidents.', fallback: 'Network monitoring' },
]

const experience = [
  { date: 'May 2023 — Present', role: 'Software Engineer Team Lead', company: 'GipperPay Finance', icon: Brain, copy: 'Own architecture for multi-region microservices, built an Apache Kafka telemetry pipeline, and developed a RAG-based credit-profiling service that reduced client onboarding from 3 days to half a day.' },
  { date: 'Nov 2024 — Present', role: 'AI & Robotics Tutor', company: 'Deutsche Schule Nairobi', icon: Sparkles, copy: 'Deliver technical training on algorithm design, robotics, and introductory AI through hands-on learning.' },
  { date: 'June 2022 — March 2023', role: 'Software Engineer', company: 'Pesapal Limited', icon: Network, copy: 'Built REST API payment integrations and optimized database telemetry across PostgreSQL and MySQL.' },
  { date: 'Jan 2020 — May 2020', role: 'Network Associate', company: 'Catholic University of East Africa', icon: ShieldCheck, copy: 'Monitored network device performance, maintained platform uptime, and resolved connectivity incidents supporting remote learning infrastructure.' },
]

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <motion.div initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.55, delay }} className={className}>{children}</motion.div>
}

export function Portfolio() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [openProject, setOpenProject] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/users/JoeMacibi/repos?sort=updated&per_page=12')
      .then((response) => response.ok ? response.json() : [])
      .then((data: Repo[]) => setRepos(data))
      .catch(() => setRepos([]))
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#071018] text-[#ecf4f1] selection:bg-[#b7f34b] selection:text-[#071018]">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#071018]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="font-mono text-sm font-bold tracking-tight"><span className="text-[#b7f34b]">JM</span> / engineer</a>
          <div className="hidden items-center gap-7 text-xs font-medium text-white/55 md:flex"><a href="#work" className="transition hover:text-white">work</a><a href="#experience" className="transition hover:text-white">experience</a><a href="#credentials" className="transition hover:text-white">credentials</a></div>
          <a href="mailto:joe.macibi@gmail.com" className="flex items-center gap-2 text-xs font-semibold text-[#b7f34b] transition hover:text-white"><span className="hidden sm:inline">Let&apos;s connect</span><ArrowUpRight size={15} /></a>
        </div>
      </nav>

      <main id="top">
        <section className="relative mx-auto flex min-h-[90vh] max-w-6xl items-center px-5 pb-20 pt-36 lg:px-8">
          <div className="pointer-events-none absolute -right-40 top-20 size-[520px] rounded-full bg-[#173c43]/35 blur-3xl" />
          <div className="relative max-w-4xl">
            <Reveal><div className="mb-7 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#b7f34b]"><span className="size-2 rounded-full bg-[#b7f34b] shadow-[0_0_15px_#b7f34b]" /> Nairobi, Kenya · available for impact</div></Reveal>
            <Reveal delay={0.08}><h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] sm:text-7xl lg:text-[6.7rem]">Senior Backend<br /><span className="text-white/35">&amp; AI Engineer.</span></h1></Reveal>
            <Reveal delay={0.15}><p className="mt-8 max-w-2xl text-base leading-7 text-white/55 sm:text-lg">I design production-grade Java and Spring Boot microservices — then push the boundary with RAG architectures, NLP, and neural networks for fintech platforms.</p></Reveal>
            <Reveal delay={0.22}><div className="mt-9 flex flex-wrap items-center gap-4"><a href="#work" className="group inline-flex items-center gap-3 rounded-full bg-[#b7f34b] px-5 py-3 text-sm font-bold text-[#071018] transition hover:bg-white">View projects <ArrowUpRight size={16} className="transition group-hover:rotate-45" /></a><a href="#experience" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/40 hover:text-white">Read my story <ChevronDown size={15} /></a></div></Reveal>
            <Reveal delay={0.3}><div className="mt-20 flex gap-8 border-t border-white/10 pt-5 text-xs text-white/40"><span><strong className="block text-2xl font-semibold text-white">4+</strong> years building</span><span><strong className="block text-2xl font-semibold text-white">AI</strong> fintech focus</span><span><strong className="block text-2xl font-semibold text-white">01</strong> curious mind</span></div></Reveal>
          </div>
        </section>

        <section id="work" className="mx-auto max-w-6xl px-5 py-24 lg:px-8"><Reveal><div className="mb-12 flex items-end justify-between gap-5"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#b7f34b]">01 / selected work</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Built to move<br /><span className="text-white/35">systems forward.</span></h2></div><Code2 className="hidden text-[#b7f34b] sm:block" size={34} /></div></Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, index) => { const repo = repos[index]; const isOpen = openProject === project.name; return <Reveal key={project.name} delay={index * 0.04}><motion.article whileHover={{ y: -5 }} className="group flex min-h-[295px] cursor-pointer flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-[#b7f34b]/45 hover:bg-[#b7f34b]/[0.06]" onClick={() => setOpenProject(isOpen ? null : project.name)}><div><div className="mb-8 flex items-center justify-between"><span className="font-mono text-xs text-white/30">0{index + 1}</span><div className="flex gap-2 text-white/25"><Database size={16} /><ArrowUpRight size={16} className="transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#b7f34b]" /></div></div><h3 className="text-xl font-semibold">{repo?.name ?? project.name}</h3><p className="mt-2 font-mono text-[11px] leading-5 text-[#b7f34b]">{project.tech}</p><p className="mt-5 text-sm leading-6 text-white/55">{project.architecture}</p></div><div className="mt-6 border-t border-white/10 pt-4"><p className="text-xs uppercase tracking-[0.12em] text-white/30">Problem solved</p><p className="mt-1 text-sm text-white/75">{isOpen ? (repo?.description ?? project.problem) : project.problem}</p>{repo && <a href={repo.html_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#b7f34b]" onClick={(event) => event.stopPropagation()}>View on GitHub <ExternalLink size={12} /></a>}</div></motion.article></Reveal> })}</div>
        </section>

        <section id="experience" className="border-y border-white/10 bg-[#0a161d]"><div className="mx-auto max-w-6xl px-5 py-24 lg:px-8"><Reveal><div className="mb-14"><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#b7f34b]">02 / the trajectory</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Backend roots.<br /><span className="text-white/35">AI horizon.</span></h2></div></Reveal><div className="relative ml-3 border-l border-white/15 pl-8 sm:ml-8 sm:pl-12">{experience.map((item, index) => { const Icon = item.icon; return <Reveal key={item.company} delay={index * 0.08} className="relative mb-12 last:mb-0"><div className="absolute -left-[49px] top-0 flex size-8 items-center justify-center rounded-full border border-[#b7f34b]/50 bg-[#0a161d] text-[#b7f34b] sm:-left-[65px]"><Icon size={14} /></div><p className="font-mono text-xs text-[#b7f34b]">{item.date}</p><h3 className="mt-2 text-xl font-semibold">{item.role}</h3><p className="mt-1 text-sm font-medium text-white/40">{item.company}</p><p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">{item.copy}</p></Reveal> })}</div></div></section>

        <section id="credentials" className="mx-auto max-w-6xl px-5 py-24 lg:px-8"><Reveal><div className="mb-12"><p className="font-mono text-xs uppercase tracking-[0.2em] text-[#b7f34b]">03 / credentials</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">Proof of<br /><span className="text-white/35">practice.</span></h2></div></Reveal><div className="grid gap-4 md:grid-cols-3"><Reveal className="rounded-2xl border border-[#b7f34b]/25 bg-[#b7f34b]/[0.06] p-6 md:col-span-2"><p className="font-mono text-xs uppercase tracking-[0.16em] text-[#b7f34b]">Education</p><h3 className="mt-6 text-2xl font-semibold">BSc in Information Technology</h3><p className="mt-1 text-white/45">JKUAT · Departmental Merit Prize</p><p className="mt-5 max-w-xl text-sm leading-6 text-white/60">Excellence in Predictive Data Infrastructure Modeling.</p></Reveal><Reveal delay={0.08} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6"><p className="font-mono text-xs uppercase tracking-[0.16em] text-[#b7f34b]">Core</p><div className="mt-6 flex flex-col gap-4 text-sm font-medium text-white/75"><span className="flex items-start gap-3"><Check size={16} className="mt-0.5 text-[#b7f34b]" /> CISA</span><span className="flex items-start gap-3"><Check size={16} className="mt-0.5 text-[#b7f34b]" /> CCNA</span><span className="flex items-start gap-3"><Check size={16} className="mt-0.5 text-[#b7f34b]" /> GRC Credential with Distinction</span></div></Reveal><Reveal delay={0.12} className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 md:col-span-3"><p className="font-mono text-xs uppercase tracking-[0.16em] text-[#b7f34b]">AI &amp; cloud badges</p><div className="mt-6 grid gap-5 sm:grid-cols-3"><span className="text-sm text-white/70">PrivacyOps &amp; AI Security <strong className="mt-1 block text-xs font-normal text-white/35">Securiti AI</strong></span><span className="text-sm text-white/70">Deep Learning &amp; NLP <strong className="mt-1 block text-xs font-normal text-white/35">Great Learning</strong></span><span className="text-sm text-white/70">AWS S3 / Kubernetes Essentials <strong className="mt-1 block text-xs font-normal text-white/35">IBM</strong></span></div></Reveal></div></section>
      </main>

      <footer className="border-t border-white/10"><div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 lg:px-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-sm font-bold"><span className="text-[#b7f34b]">JM</span> / engineer</p><p className="mt-3 max-w-xs text-sm leading-6 text-white/35">Building resilient systems today. Teaching the next generation to build what&apos;s next.</p><p className="mt-5 flex items-center gap-2 text-xs text-white/30"><MapPin size={13} /> Nairobi, Kenya</p></div><div className="flex flex-wrap gap-3"><a aria-label="GitHub" href="https://github.com/JoeMacibi" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-[#b7f34b] hover:text-[#b7f34b]"><GitBranch size={17} /></a><a aria-label="LinkedIn" href="https://www.linkedin.com/in/joseph-macibi-3697b9198/" target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-[#b7f34b] hover:text-[#b7f34b]"><ContactRound size={17} /></a><a aria-label="Email" href="mailto:joe.macibi@gmail.com" className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-[#b7f34b] hover:text-[#b7f34b]"><Mail size={17} /></a><a aria-label="Phone" href="tel:0713094742" className="rounded-full border border-white/10 p-3 text-white/50 transition hover:border-[#b7f34b] hover:text-[#b7f34b]"><Phone size={17} /></a></div></div></footer>
    </div>
  )
}

export default Portfolio
