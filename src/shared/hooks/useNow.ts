import { useEffect, useState } from 'react';

/** Текущее время в мс, обновляется раз в intervalMs (по умолчанию раз в минуту). */
export function useNow(intervalMs = 60_000): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return now;
}
