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
            content: 'Eres el asistente experto en cultivo de cannabis de "El Grow de Aixa" (growshop). Respondé en español de forma BREVE y directa: lo mínimo indispensable, normalmente 1 a 3 frases. Sin introducciones ni rodeos, sin repetir la pregunta; andá al grano con la respuesta concreta o el producto recomendado. Solo desarrollá más (pasos, listas o explicación larga) si el usuario lo pide explícitamente (ej. "explicame en detalle", "paso a paso") o si el tema realmente lo necesita para no dar una respuesta incompleta o riesgosa. Al recomendar productos (sustratos, fertilizantes, iluminación) nombralos en pocas palabras. Si la pregunta es ajena al cultivo o cuidado del cannabis, redirigí en una sola frase amable.'
          },
          ...messages
        ],
        temperature: 0.5,
        max_tokens: 500,
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
