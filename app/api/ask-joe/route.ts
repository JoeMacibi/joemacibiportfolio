import { generateText } from 'ai'
import { NextResponse } from 'next/server'

const portfolioChunks = [
  `Joseph Macibi is a Senior Backend and AI Engineer based in Nairobi, Kenya. He designs production-grade Java and Spring Boot microservices and works with RAG architectures, NLP, and neural networks for fintech platforms. The portfolio says he has 4+ years building and an AI fintech focus.`,
  `Selected work: InfraRecord is an infrastructure observability and governance platform for hybrid cloud environments. It uses TypeScript, Kafka, and AI optimization to create audit trails, ingest live metrics, and surface AI-driven resource optimization.`,
  `Selected work: Chess3D is an interactive browser chess game with custom Blender models and a Web Worker game AI. It uses TypeScript, Three.js, and Webpack, bringing a responsive 3D chess experience to the browser without blocking the main thread.`,
  `Selected work: NyumbaSmart is an AI-powered apartment and facility management platform for African real estate operations. It includes tenant portals, rent payments, maintenance automation, analytics, and AI insights. Its listed technologies are AI, M-Pesa, and property operations.`,
  `Selected work: Beckwam stores is a point-of-sale and inventory management system for store operations. It uses PHP, POS, and inventory management to keep sales and stock workflows organized in one practical retail system.`,
  `Selected work: car-rental-project is a PHP and MySQL car-rental application with an admin dashboard and separate customer and administrator interfaces. Customers can reserve vehicles while admins manage reservations and fleet operations.`,
  `Selected work: saas-landing-page-design is a v0-built SaaS landing page in a modern Next.js App Router project. It uses Next.js 16, React 19, and Tailwind CSS, providing a polished, deployable marketing surface for a SaaS product.`,
  `Other work listed includes Telemetry Pipeline, an event-driven Java, Apache Kafka, and PostgreSQL telemetry pipeline for multi-region observability; PayFlow APIs, a Spring Boot, REST, and MySQL payment integration layer; and NLP Signals, a Python, NLP, and neural networks text classification workflow for extracting business intent.`,
  `Experience: May 2023 to Present, Software Engineer Team Lead at GipperPay Finance. Joseph owns architecture for multi-region microservices, built an Apache Kafka telemetry pipeline, and developed a RAG-based credit-profiling service that reduced client onboarding from 3 days to half a day.`,
  `Experience: November 2024 to Present, AI and Robotics Tutor at Deutsche Schule Nairobi, delivering technical training on algorithm design, robotics, and introductory AI through hands-on learning. June 2022 to March 2023, Software Engineer at Pesapal Limited, building REST API payment integrations and optimizing database telemetry across PostgreSQL and MySQL. January 2020 to May 2020, Network Associate at Catholic University of East Africa, monitoring network device performance, maintaining uptime, and resolving connectivity incidents supporting remote learning infrastructure.`,
  `Credentials: BSc in Information Technology from JKUAT, with a Departmental Merit Prize for excellence in Predictive Data Infrastructure Modeling. Core credentials listed are CISA, CCNA, and a GRC Credential with Distinction. AI and cloud badges include PrivacyOps and AI Security from Securiti AI, plus Deep Learning and NLP.`,
  `Contact shown on the portfolio: Nairobi, Kenya; email joe.macibi@gmail.com; GitHub github.com/JoeMacibi; LinkedIn linkedin.com/in/joseph-macibi-3697b9198/.`,
]

function retrieve(question: string) {
  const terms = question.toLowerCase().split(/[^a-z0-9]+/).filter((term) => term.length > 2)
  return portfolioChunks
    .map((chunk) => ({ chunk, score: terms.reduce((score, term) => score + (chunk.toLowerCase().includes(term) ? 1 : 0), 0) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(({ chunk }) => chunk)
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const latest = Array.isArray(messages) ? messages.at(-1)?.content : ''
    if (typeof latest !== 'string' || !latest.trim()) return NextResponse.json({ error: 'Ask a question about the portfolio.' }, { status: 400 })
    const context = retrieve(latest)
    if (!context.length) return NextResponse.json({ answer: "I don't see that information on Joe's portfolio." })
    try {
      const result = await generateText({
        model: 'openai/gpt-4o-mini',
        system: `You are Ask Joe, a portfolio Q&A assistant. Answer only from the supplied portfolio excerpts. Never infer, embellish, combine uncertain details, or invent facts. If the answer is not explicitly in the excerpts, say: "I don't see that information on Joe's portfolio." Preserve names, dates, technologies, metrics, and wording accurately. Keep answers concise.\n\nRetrieved portfolio excerpts:\n${context.join('\n\n')}`,
        prompt: latest,
      })
      return NextResponse.json({ answer: result.text })
    } catch {
      return NextResponse.json({ answer: context[0] })
    }
  } catch {
    return NextResponse.json({ error: 'The portfolio assistant is temporarily unavailable.' }, { status: 500 })
  }
}
