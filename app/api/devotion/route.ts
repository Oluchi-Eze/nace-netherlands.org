import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get current date context for Amsterdam time zone
    const amsterdamDate = new Date().toLocaleDateString("en-US", {
      timeZone: "Europe/Amsterdam",
      dateStyle: "full"
    })

    // Construct the prompt demanding strict JSON layout structure
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
    Important: Return ONLY the raw JSON object. Do not wrap it in markdown formatting, code blocks, or preamble text.`

    // Replace with your actual LLM provider config (OpenAI, Anthropic, DeepSeek, etc.)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.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}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // fast, stable, cost-effective
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: "json_object" }, // Forces strict JSON parsing safety
        temperature: 0.7
      })
    })

    if (!response.ok) throw new Error("AI engine failed to respond")
    
    const aiData = await response.json()
    const rawJsonString = aiData.choices[0].message.content
    const structuredDevotion = JSON.parse(rawJsonString)

    return NextResponse.json(structuredDevotion)
  } catch (error) {
    console.error("Devotion generation error:", error)
    return NextResponse.json({ error: "Failed to generate dynamic devotion" }, { status: 500 })
  }
}