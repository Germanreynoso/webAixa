import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: 'API Key not configured' }, { status: 500 });
    }
    const { messages } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'Eres un experto en el cultivo de cannabis. Tu misión es responder preguntas sobre el cultivo de cannabis, sus diferentes etapas (germinación, vegetativo, floración), y recomendar productos específicos (sustratos, fertilizantes, iluminación) para que las plantas crezcan sanas y produzcan buenos resultados. Si te preguntan algo fuera de este tema, debes redirigir la conversación amablemente hacia el cultivo y cuidado del cannabis.'
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Groq API Error Response:', data);
      return NextResponse.json({ error: data.error?.message || 'Error from Groq API' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Unexpected Error in Chat Route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
