'use client';

import React from 'react';
import { calculateCost, formatCost } from '@/lib/utils';

interface CostEstimatorProps {
  text: string;
  maxCost?: number;
}

export default function CostEstimator({ text, maxCost = 0.05 }: CostEstimatorProps) {
  // Estimate tokens (rough approximation: 1 token ≈ 4 characters)
  const estimatedInputTokens = Math.ceil(text.length / 4);
  
  // Calculate proportional summary length based on input text
  const calculateMaxTokens = (textLength: number): number => {
    const wordCount = text.trim().split(/\s+/).length;
    // Proportional: 1 word of summary per 10 words of input, max 2000 words
    const proportionalWords = Math.min(Math.ceil(wordCount / 10), 2000);
    // Convert to tokens (roughly 1.3 tokens per word)
    return Math.ceil(proportionalWords * 1.3);
  };
  
  const maxOutputTokens = calculateMaxTokens(text.length);
  const estimatedOutputTokens = Math.min(maxOutputTokens, Math.ceil(estimatedInputTokens / 2));
  
  const costEstimate = calculateCost(estimatedInputTokens, estimatedOutputTokens);
  const isOverLimit = costEstimate.totalCost > maxCost;
  
  return (
    <div className="w-full p-6 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
      <h3 className="text-xl font-bold text-blue-300 mb-4 uppercase tracking-wide">Cost Estimate</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Input Tokens:</span>
          <span className="text-gray-200">{estimatedInputTokens.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Output Tokens:</span>
          <span className="text-gray-200">{estimatedOutputTokens.toLocaleString()}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Total Tokens:</span>
          <span className="text-gray-200">{costEstimate.totalTokens.toLocaleString()}</span>
        </div>
        
        <hr className="border-gray-600" />
        
        <div className="flex justify-between">
          <span className="text-gray-400">Input Cost:</span>
          <span className="text-gray-200">{formatCost(costEstimate.inputCost)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Output Cost:</span>
          <span className="text-gray-200">{formatCost(costEstimate.outputCost)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Total Cost:</span>
          <span className={`font-semibold ${isOverLimit ? 'text-red-400' : 'text-green-400'}`}>
            {formatCost(costEstimate.totalCost)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Max Allowed:</span>
          <span className="text-gray-200">${maxCost.toFixed(2)}</span>
        </div>
      </div>
      
      {isOverLimit && (
        <div className="mt-3 p-2 bg-red-900/20 border border-red-600 rounded text-red-400 text-sm">
          ⚠️ Estimated cost exceeds limit. Please shorten your text.
        </div>
      )}
      
      {!isOverLimit && costEstimate.totalCost > maxCost * 0.8 && (
        <div className="mt-3 p-2 bg-yellow-900/20 border border-yellow-600 rounded text-yellow-400 text-sm">
          ⚠️ Cost is approaching the limit.
        </div>
      )}
    </div>
  );
}


