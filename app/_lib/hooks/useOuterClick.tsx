import { useEffect, useRef } from 'react';

export const useOuterClick = (callback: Function) => {
  const innerRef = useRef<Element>(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick, true);
    return () => document.removeEventListener('mousedown', handleClick, true);
  }, [callback, innerRef]);

  return innerRef;
};
