export interface SummaryRequest {
  text: string;
  temperature: number;
  maxTokens?: number;
}

export interface SummaryResponse {
  summary: string;
  cost: number;
  tokensUsed: {
    input: number;
    output: number;
    total: number;
  };
  model: string;
}

export interface CostEstimate {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface OpenAIError {
  error: {
    message: string;
    type: string;
    code?: string;
  };
}

