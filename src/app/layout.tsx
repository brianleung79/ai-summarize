import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Text Summarizer',
  description: 'Intelligent text summarization with OpenAI, cost capped at $0.10 per query',
  keywords: ['AI', 'summarizer', 'OpenAI', 'text processing', 'NLP'],
  authors: [{ name: 'AI Text Summarizer Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}


