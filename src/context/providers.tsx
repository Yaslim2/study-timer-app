'use client';

import { TimerProvider } from './timerContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TimerProvider>{children}</TimerProvider>;
}
