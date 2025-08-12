import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TextInput({ value, onChange, disabled = false }: TextInputProps) {
  return (
    <div className="space-y-4">
      <label htmlFor="text-input" className="block text-sm font-semibold text-blue-300 uppercase tracking-wide">
        Text to Summarize
      </label>
      <div className="relative">
        <textarea
          id="text-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Paste or type the text you want to summarize here..."
          className="w-full h-48 px-6 py-4 bg-black/30 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl"
        />
        {/* Glow effect on focus */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-slate-500/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>
      <div className="flex justify-between text-sm text-gray-300">
        <span className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>Characters: {value.length}</span>
        </span>
        <span className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
          <span>Words: {value.trim() ? value.trim().split(/\s+/).length : 0}</span>
        </span>
      </div>
    </div>
  );
}
