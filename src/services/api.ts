import axios from 'axios';
import type { Keyword } from '../types';

const API_URL = 'https://api.openai.com/v1';

export async function fetchKeywords(niche: string, apiKey: string): Promise<Keyword[]> {
  try {
    const response = await axios.post(
      `${API_URL}/chat/completions`,
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a keyword research expert. Respond only with valid JSON arrays.'
          },
          {
            role: 'user',
            content: `Generate a comprehensive list of SEO keywords for the niche: ${niche}. 
              For each keyword, estimate search volume, difficulty (1-100), and relevance (1-10).
              Format as JSON array with objects containing: keyword, searchVolume, difficulty, relevance.
              Return ONLY the JSON array, no other text.`
          }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch keywords');
    }
    throw error;
  }
}