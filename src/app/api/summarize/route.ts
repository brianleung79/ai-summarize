import { NextRequest, NextResponse } from 'next/server';
import { generateSummary } from '@/lib/openai';
import { calculateCost } from '@/lib/utils';
import { SummaryRequest } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body: SummaryRequest = await request.json();
    const { text, temperature } = body;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text input is required' },
        { status: 400 }
      );
    }

    if (temperature < 0 || temperature > 1) {
      return NextResponse.json(
        { error: 'Temperature must be between 0 and 1' },
        { status: 400 }
      );
    }

    // Calculate proportional summary length (max 400 words)
    const calculateMaxTokens = (textLength: number): number => {
      const wordCount = text.trim().split(/\s+/).length;
      // Proportional: 1 word of summary per 10 words of input, max 400 words
      const proportionalWords = Math.min(Math.ceil(wordCount / 10), 400);
      // Convert to tokens (roughly 1.3 tokens per word)
      return Math.ceil(proportionalWords * 1.3);
    };

    // Estimate cost before making API call
    const estimatedTokens = Math.ceil(text.length / 4); // Rough estimate: 1 token ≈ 4 characters
    const maxOutputTokens = calculateMaxTokens(text.length);
    const estimatedOutputTokens = Math.min(maxOutputTokens, estimatedTokens / 2); // Estimate output tokens
    
    const costEstimate = calculateCost(estimatedTokens, estimatedOutputTokens);
    const maxCost = parseFloat(process.env.NEXT_PUBLIC_MAX_COST || '0.05');

    if (costEstimate.totalCost > maxCost) {
      return NextResponse.json(
        { 
          error: `Estimated cost (${costEstimate.totalCost.toFixed(4)}) exceeds maximum allowed cost ($${maxCost})`,
          estimatedCost: costEstimate.totalCost,
          maxAllowedCost: maxCost
        },
        { status: 400 }
      );
    }

    // Generate summary
    const result = await generateSummary({
      text: text.trim(),
      temperature,
      maxTokens: maxOutputTokens,
    });

    // Verify actual cost doesn't exceed limit
    if (result.cost > maxCost) {
      return NextResponse.json(
        { 
          error: `Actual cost (${result.cost.toFixed(4)}) exceeds maximum allowed cost ($${maxCost})`,
          actualCost: result.cost,
          maxAllowedCost: maxCost
        },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Summarization error:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

