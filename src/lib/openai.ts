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

// Export a function that gets the client when called, not when imported
export const getOpenAI = () => getOpenAIClient();

export async function generateSummary(request: SummaryRequest): Promise<SummaryResponse> {
  const { text, temperature, maxTokens } = request;
  
  try {
    const openai = getOpenAI();
    
    // Automatically select model based on text length
    // Rough estimate: 1 token ≈ 4 characters
    const estimatedTokens = Math.ceil(text.length / 4);
    let model = 'gpt-3.5-turbo';
    let inputCostRate = 0.0015;
    let outputCostRate = 0.002;
    
    // Use GPT-4o-mini for longer text (better context length and cost)
    if (estimatedTokens > 8000) { // If estimated > 8K tokens, use GPT-4o-mini
      model = 'gpt-4o-mini';
      inputCostRate = 0.00015;
      outputCostRate = 0.0006;
    }
    
    const completion = await openai.chat.completions.create({
      model: model,
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
    
    // Calculate cost based on tokens used (using dynamic rates based on selected model)
    const inputCost = (usage.prompt_tokens / 1000) * inputCostRate;
    const outputCost = (usage.completion_tokens / 1000) * outputCostRate;
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

