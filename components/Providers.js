'use client';

import { ProgressProvider } from '@/lib/ProgressContext';

export default function Providers({ children }) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
