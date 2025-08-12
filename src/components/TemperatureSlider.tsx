'use client';

import React from 'react';

interface TemperatureSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

export default function TemperatureSlider({ 
  value, 
  onChange, 
  disabled = false 
}: TemperatureSliderProps) {
  const getTemperatureLabel = (temp: number) => {
    if (temp <= 0.2) return 'Factual';
    if (temp <= 0.5) return 'Balanced';
    if (temp <= 0.8) return 'Creative';
    return 'Very Creative';
  };

  const getTemperatureColor = (temp: number) => {
    if (temp <= 0.2) return 'text-green-400';
    if (temp <= 0.5) return 'text-yellow-400';
    if (temp <= 0.8) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="temperature" className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
          AI Creativity
        </label>
        <span className={`text-sm font-bold px-3 py-1 rounded-full ${getTemperatureColor(value)} bg-black/20 backdrop-blur-sm border border-white/10`}>
          {getTemperatureLabel(value)}
        </span>
      </div>
      
      <div className="relative">
        <input
          id="temperature"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          disabled={disabled}
          className="w-full h-3 bg-gradient-to-r from-blue-500 to-slate-500 to-sage-500 rounded-full appearance-none cursor-pointer slider disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #64748b ${value * 50}%, #84cc16 ${value * 100}%)`
          }}
        />
        
        <div className="flex justify-between text-xs text-gray-300 mt-2">
          <span className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
            <span>0.0</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
            <span>0.5</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-1.5 h-1.5 bg-sage-400 rounded-full"></div>
            <span>1.0</span>
          </span>
        </div>
      </div>
      
      <div className="text-center">
        <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-slate-500/20 rounded-full text-blue-300 font-bold text-lg">
          {value.toFixed(1)}
        </span>
      </div>
    </div>
  );
}


