import { useEffect, useRef } from 'react';

function useInterval(minutes: number, callback: () => void) {
  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    intervalRef.current = setInterval(callback, minutes * 60 * 1000);

    return () => {
      intervalRef.current ? clearInterval(intervalRef.current) : null;
    };
  }, [minutes, callback]);

  return {
    start: () => {
      intervalRef.current = setInterval(callback, minutes * 60 * 1000);
    },
    clear: () => (intervalRef.current ? clearInterval(intervalRef.current) : null),
  };
}

export default useInterval;
