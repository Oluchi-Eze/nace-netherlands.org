import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET() {
  try {
    const amsterdamDate = new Date().toLocaleDateString("en-US", {
      timeZone: "Europe/Amsterdam",
      dateStyle: "full"
    })

    const prompt = `You are a pastoral theologian generating a highly encouraging, deeply reflective Daily Devotion for ${amsterdamDate}. 
    Return a valid JSON object matching this exact TypeScript structure:
    {
      "reference": "Single specific bible reference string (e.g., Romans 12:1-2)",
      "text": "The exact full scriptural text corresponding to that reference",
      "focus": "A short 2-3 word thematic category (e.g., Grace, Courage, Renewal)",
      "title": "An engaging, thoughtful subtitle for the day's reflection",
      "writeup": "A deep, inspiring 3-4 sentence meditation paragraph applying this verse to modern life.",
      "action": "One specific, highly practical daily challenge action step based on the writing."
    }
    Important: Return ONLY the raw JSON object.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.7,
    })

    const rawJsonString = completion.choices[0].message.content

    if (!rawJsonString) {
      throw new Error("No content received from AI engine")
    }

    const structuredDevotion = JSON.parse(rawJsonString)

    return NextResponse.json(structuredDevotion)
  } catch (error) {
    console.error("Devotion generation error:", error)
    return NextResponse.json({ error: "Failed to generate dynamic devotion" }, { status: 500 })
  }
}