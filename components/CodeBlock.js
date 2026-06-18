'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  {
    ssr: false,
    loading: () => (
      <pre className="flex-1 p-5 text-sm text-gray-300">
        <code>Loading...</code>
      </pre>
    ),
  }
);

export default function CodeBlock({ code, language = 'python' }) {
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState(null);

  useEffect(() => {
    import('react-syntax-highlighter/dist/esm/styles/prism').then((mod) => {
      setStyle(mod.vscDarkPlus);
    });
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable
    }
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className="code-block-wrapper relative mt-4 overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]">
      <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 rounded-md bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary">
            Python
          </span>
        </div>
        <motion.button
          type="button"
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg px-3 py-1 text-xs font-medium text-muted transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={copied ? 'Code copied' : 'Copy code to clipboard'}
        >
          {copied ? 'Copied!' : 'Copy'}
        </motion.button>
      </div>
      <div className="flex overflow-x-auto">
        <div
          className="select-none border-r border-white/10 bg-[#1e1e1e] py-5 pr-3 text-right font-mono text-xs text-gray-500"
          aria-hidden="true"
        >
          {lines.map((_, i) => (
            <div key={i} className="leading-[1.6]">
              {i + 1}
            </div>
          ))}
        </div>
        {style ? (
          <SyntaxHighlighter
            language={language}
            style={style}
            showLineNumbers={false}
            customStyle={{
              margin: 0,
              padding: '1.25rem 1rem',
              background: 'transparent',
              fontSize: '0.875rem',
              lineHeight: '1.6',
              minWidth: '100%',
            }}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <pre className="flex-1 p-5 text-sm text-gray-300">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
