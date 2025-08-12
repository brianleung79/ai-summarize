'use client';

import React, { useState } from 'react';
import TextInput from '@/components/TextInput';
import TemperatureSlider from '@/components/TemperatureSlider';
import CostEstimator from '@/components/CostEstimator';
import SummaryDisplay from '@/components/SummaryDisplay';
import { SummaryResponse } from '@/types';

export default function Home() {
  const [text, setText] = useState('');
  const [temperature, setTemperature] = useState(0.3);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text.trim(),
          temperature,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate summary');
      }

      setSummary(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const canSummarize = text.trim().length > 0 && !isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-slate-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Header */}
      <header className="relative bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-300 to-sage-300 animate-pulse">
              AI Text Summarizer
            </h1>
            <p className="mt-4 text-gray-200 text-lg font-light">
              Intelligent text summarization with OpenAI • Cost capped at $0.05 per query
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input and Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Text Input */}
            <TextInput
              value={text}
              onChange={setText}
              disabled={isLoading}
            />

            {/* Temperature Slider */}
            <TemperatureSlider
              value={temperature}
              onChange={setTemperature}
              disabled={isLoading}
            />

            {/* Summarize Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSummarize}
                disabled={!canSummarize}
                className="relative px-10 py-5 bg-gradient-to-r from-blue-500 via-slate-500 to-sage-500 hover:from-blue-600 hover:via-slate-600 hover:to-sage-600 text-white font-bold rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
              >
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-slate-400 to-sage-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                <div className="relative z-10 flex items-center space-x-3">
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>Summarize</span>
                    </div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Right Column - Cost Estimator */}
          <div className="lg:col-span-1">
            <CostEstimator text={text} maxCost={0.05} />
          </div>
        </div>

        {/* Summary Display */}
        <div className="mt-8">
          <SummaryDisplay
            summary={summary}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-black/20 backdrop-blur-xl border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-300 text-sm">
            <p>Built with Next.js, OpenAI, and Tailwind CSS</p>
            <p className="mt-1">Cost protection ensures you never spend more than $0.05 per query</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


