import OpenAI from 'openai';
import { SummaryRequest, SummaryResponse } from '@/types';

// Lazy initialization - only create client when needed
let openaiClient: OpenAI | null = null;

const getOpenAIClient = () => {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OPENAI_API_KEY environment variable');
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
};

export const openai = getOpenAIClient();

export async function generateSummary(request: SummaryRequest): Promise<SummaryResponse> {
  const { text, temperature, maxTokens } = request;
  
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates concise, accurate summaries. Focus on the main points and key insights while maintaining clarity and readability.'
        },
        {
          role: 'user',
          content: `Please provide a clear and concise summary of the following text:\n\n${text}`
        }
      ],
      temperature: temperature,
      max_tokens: maxTokens || 500,
    });

    const summary = completion.choices[0]?.message?.content || 'No summary generated';
    const usage = completion.usage;
    
    if (!usage) {
      throw new Error('No usage information received from OpenAI API');
    }
    
    // Calculate cost based on tokens used
    const inputCost = (usage.prompt_tokens / 1000) * 0.0015; // gpt-3.5-turbo input cost
    const outputCost = (usage.completion_tokens / 1000) * 0.002; // gpt-3.5-turbo output cost
    const totalCost = inputCost + outputCost;

    return {
      summary,
      cost: Math.round(totalCost * 100000) / 100000,
      tokensUsed: {
        input: usage.prompt_tokens,
        output: usage.completion_tokens,
        total: usage.total_tokens,
      },
      model: completion.model,
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

