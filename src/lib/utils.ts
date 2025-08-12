import { CostEstimate } from '@/types';

// OpenAI pricing (as of 2024 - adjust as needed)
const PRICING = {
  'gpt-3.5-turbo': {
    input: 0.0015, // per 1K tokens
    output: 0.002, // per 1K tokens
  },
  'gpt-4': {
    input: 0.03, // per 1K tokens
    output: 0.06, // per 1K tokens
  },
  'gpt-4-turbo': {
    input: 0.01, // per 1K tokens
    output: 0.03, // per 1K tokens
  },
};

export function calculateCost(
  inputTokens: number,
  outputTokens: number,
  model: string = 'gpt-3.5-turbo'
): CostEstimate {
  const modelPricing = PRICING[model as keyof typeof PRICING] || PRICING['gpt-3.5-turbo'];
  
  const inputCost = (inputTokens / 1000) * modelPricing.input;
  const outputCost = (outputTokens / 1000) * modelPricing.output;
  const totalCost = inputCost + outputCost;
  
  return {
    inputCost: Math.round(inputCost * 100000) / 100000, // Round to 5 decimal places
    outputCost: Math.round(outputCost * 100000) / 100000,
    totalCost: Math.round(totalCost * 100000) / 100000,
    inputTokens,
    outputTokens,
    totalTokens: inputTokens + outputTokens,
  };
}

export function formatCost(cost: number): string {
  return `$${cost.toFixed(4)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  }
  // Fallback for older browsers
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
  document.body.removeChild(textArea);
  return Promise.resolve();
}

