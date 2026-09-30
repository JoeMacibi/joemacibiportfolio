import { generateText, gateway } from 'ai'
import { NextResponse } from 'next/server'

const chunks = [
  'Portfolio overview: Joseph Macibi is a Senior Backend & AI Engineer in Nairobi, Kenya. He designs production-grade Java and Spring Boot microservices and works with RAG architectures, NLP, and neural networks for fintech platforms.',
  'Project InfraRecord: TypeScript, Kafka, and AI optimization. It is an infrastructure observability and governance platform for hybrid cloud environments. It creates audit trails, ingests live metrics, and surfaces AI-driven resource optimization.',
  'Project Chess3D: TypeScript, Three.js, and Webpack. It is an interactive browser chess game with custom Blender models and a Web Worker game AI. It brings a responsive 3D chess experience to the browser without blocking the main thread.',
  'Project NyumbaSmart: AI, M-Pesa, and property operations. It is an AI-powered apartment and facility management platform for African real estate operations. It unifies tenant portals, rent payments, maintenance automation, analytics, and AI insights.',
  'Project Beckwam stores: PHP, POS, and inventory management. It is a point-of-sale and inventory management system for store operations. It keeps sales and stock workflows organized in one practical retail system.',
  'Project car-rental-project: PHP, MySQL, and an admin dashboard. It is a car-rental application with separate customer and administrator interfaces. Customers can reserve vehicles while admins manage reservations and fleet operations.',
  'Project saas-landing-page-design: Next.js 16, React 19, and Tailwind CSS. It is a v0-built SaaS landing page in a modern Next.js App Router project, providing a polished, deployable marketing surface for a SaaS product.',
  'Experience at GipperPay Finance, May 2023 to Present: Software Engineer Team Lead. Owns architecture for multi-region microservices, built an Apache Kafka telemetry pipeline, and developed a RAG-based credit-profiling service that reduced client onboarding from 3 days to half a day.',
  'Experience at Deutsche Schule Nairobi, November 2024 to Present: AI & Robotics Tutor. Delivers technical training on algorithm design, robotics, and introductory AI through hands-on learning.',
  'Experience at Pesapal Limited, June 2022 to March 2023: Software Engineer. Built REST API payment integrations and optimized database telemetry across PostgreSQL and MySQL.',
  'Experience at Catholic University of East Africa, January 2020 to May 2020: Network Associate. Monitored network device performance, maintained platform uptime, and resolved connectivity incidents supporting remote learning infrastructure.',
  'Credentials: BSc in Information Technology from JKUAT with a Departmental Merit Prize. The portfolio also lists CISA, CCNA, a GRC Credential with Distinction, PrivacyOps & AI Security from Securiti AI, and Deep Learning & NLP.',
  'Contact: Nairobi, Kenya. GitHub is github.com/JoeMacibi, LinkedIn is linkedin.com/in/joseph-macibi-3697b9198/, and email is joe.macibi@gmail.com.',
]

function retrieve(query: string) {
  const terms = query.toLowerCase().split(/[^a-z0-9]+/).filter((term) => term.length > 2)
  return chunks
    .map((chunk) => ({ chunk, score: terms.reduce((score, term) => score + (chunk.toLowerCase().includes(term) ? 1 : 0), 0) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ chunk }) => chunk)
}

export async function POST(request: Request) {
  try {
    const { question } = await request.json()
    if (typeof question !== 'string' || question.trim().length < 2 || question.length > 500) {
      return NextResponse.json({ error: 'Please ask a short question about the portfolio.' }, { status: 400 })
    }
    const context = retrieve(question)
    if (!context.length) return NextResponse.json({ answer: "I don't have that information on this portfolio." })
    const result = await generateText({
      model: gateway('anthropic/claude-haiku-4.5'),
      temperature: 0,
      system: 'You are Ask Joe, a portfolio RAG assistant. Answer only from the supplied portfolio context. Do not infer, embellish, combine facts incorrectly, or claim information that is absent. Preserve names, dates, technologies, and numbers exactly. If the context does not answer the question, say: I don\'t have that information on this portfolio. Keep answers concise and cite the relevant project or role by name in plain language.',
      prompt: `Portfolio context:\n${context.join('\n')}\n\nQuestion: ${question}`,
    })
    return NextResponse.json({ answer: result.text })
  } catch {
    return NextResponse.json({ error: 'Ask Joe is temporarily unavailable.' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
export const maxDuration = 30
