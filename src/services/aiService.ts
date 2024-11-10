import OpenAI from 'openai';

export type AIModel = 'local' | 'openai';

export interface AIConfig {
  model: AIModel;
  localUrl: string;
  localModel: string;
  openaiKey: string;
  openaiModel: string;
}

export async function generateKeywords(
  niche: string,
  config: AIConfig
): Promise<string> {
  const prompt = `Generate a comprehensive list of SEO keywords for the niche: ${niche}. 
    For each keyword, estimate search volume, difficulty (1-100), and relevance (1-10).
    Format as JSON array with objects containing: keyword, searchVolume, difficulty, relevance.
    Return ONLY the JSON array, no other text.`;

  if (config.model === 'local') {
    const response = await fetch(`${config.localUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: config.localModel,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to connect to local AI server');
    }

    const data = await response.json();
    return data.response;
  }

  if (config.model === 'openai') {
    if (!config.openaiKey) {
      throw new Error('OpenAI API key is required');
    }

    const openai = new OpenAI({
      apiKey: config.openaiKey,
      dangerouslyAllowBrowser: true
    });

    const response = await openai.chat.completions.create({
      model: config.openaiModel,
      messages: [
        {
          role: 'system',
          content: 'You are a keyword research expert. Respond only with valid JSON arrays.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || '[]';
  }

  throw new Error('Invalid AI model configuration');
}