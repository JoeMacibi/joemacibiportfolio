import { generateText } from 'ai'
import { NextResponse } from 'next/server'
import { portfolioFallback, retrievePortfolioChunks } from '@/lib/portfolio-knowledge'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()
    const latest = Array.isArray(messages) ? messages.at(-1)?.content : ''
    if (typeof latest !== 'string' || !latest.trim()) return NextResponse.json({ error: 'Ask a question about the portfolio.' }, { status: 400 })
    const context = retrievePortfolioChunks(latest)
    if (!context.length) return NextResponse.json({ answer: portfolioFallback })
    const excerpts = context.map((chunk) => `[${chunk.title}] ${chunk.content}`).join('\n\n')
    try {
      const result = await generateText({
        model: 'openai/gpt-4o-mini',
        system: `You are Ask Joe, a precise portfolio Q&A assistant. Use only the retrieved portfolio excerpts below. Every factual claim in your answer must be directly supported by an excerpt. Do not infer, embellish, merge unrelated facts, or invent missing details. Preserve project names, dates, technologies, organizations, metrics, and capitalization exactly. When the question asks for a list, include every item supported by the excerpts. If the excerpts do not directly answer the question, reply exactly: "${portfolioFallback}". Answer in 1-4 short sentences.\n\nRetrieved portfolio excerpts:\n${excerpts}`,
        prompt: latest,
      })
      return NextResponse.json({ answer: result.text.trim() || portfolioFallback })
    } catch {
      return NextResponse.json({ answer: context[0].content })
    }
  } catch {
    return NextResponse.json({ error: 'The portfolio assistant is temporarily unavailable.' }, { status: 500 })
  }
}
