'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { SummaryResponse } from '@/types';

interface SummaryDisplayProps {
  summary: SummaryResponse | null;
  isLoading: boolean;
  error: string | null;
}

export default function SummaryDisplay({ summary, isLoading, error }: SummaryDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (summary) {
      await copyToClipboard(summary.summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        <div className="flex items-center justify-center space-x-4">
          <div className="relative">
            <div className="w-8 h-8 border-4 border-blue-500/30 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-8 h-8 border-4 border-transparent border-t-blue-400 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <span className="text-blue-300 font-semibold text-lg">Generating summary...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 bg-red-900/20 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-red-400 font-bold text-lg">Error</span>
        </div>
        <p className="text-red-300 mt-3 text-center">{error}</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="w-full p-8 bg-black/30 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl text-center">
        <div className="text-gray-300">
          <div className="mx-auto w-16 h-16 mb-6 bg-gradient-to-r from-blue-500/20 to-slate-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-xl font-bold text-blue-300 mb-2">Ready to Summarize</p>
          <p className="text-gray-400">Enter your text above and click &quot;Summarize&quot; to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black/30 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
      {/* Header with copy button */}
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-blue-500/10 to-slate-500/10">
        <h3 className="text-xl font-bold text-blue-300 uppercase tracking-wide">Summary</h3>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-slate-500 hover:from-blue-600 hover:to-slate-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Summary content */}
      <div className="p-6">
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-100 leading-relaxed whitespace-pre-wrap text-lg">
            {summary.summary}
          </p>
        </div>
      </div>

      {/* Footer with stats */}
      <div className="px-6 py-4 bg-gradient-to-r from-blue-500/10 to-slate-500/10 border-t border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between text-sm text-gray-300 space-y-2 lg:space-y-0">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Model: <span className="text-blue-300 font-semibold">{summary.model}</span></span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
              <span>Cost: <span className="text-slate-300 font-semibold">${summary.cost.toFixed(4)}</span></span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
              <span>Input: <span className="text-sage-300 font-semibold">{summary.tokensUsed.input.toLocaleString()}</span> tokens</span>
            </span>
            <span className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Output: <span className="text-blue-300 font-semibold">{summary.tokensUsed.output.toLocaleString()}</span> tokens</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


