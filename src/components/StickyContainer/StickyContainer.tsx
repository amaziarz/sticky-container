import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { clsx } from 'clsx';

interface StickyContainerProps {
  children: ReactNode;
  targetElementRef: RefObject<HTMLElement>;
}

export function StickyContainer({
  children,
  targetElementRef,
}: StickyContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('init');
    if (!targetElementRef.current || !containerRef.current) {
      return;
    }

    function isOverlapping() {
      if (!targetElementRef.current || !containerRef.current) {
        return false;
      }
      const targetPosition = targetElementRef.current.getBoundingClientRect();
      const containerPosition = containerRef.current.getBoundingClientRect();

      const isOverlappingVertical =
        targetPosition.bottom >= containerPosition.top &&
        targetPosition.top <= containerPosition.bottom;

      const isOverlappingHorizontal =
        targetPosition.left <= containerPosition.right &&
        targetPosition.right >= containerPosition.left;

      return isOverlappingVertical && isOverlappingHorizontal;
    }

    function handleScroll() {
      setIsOpen(isOverlapping());
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      console.log('cleanup');
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetElementRef]);

  return (
    <div
      className={clsx(
        'fixed bottom-8 right-8 rounded-md bg-slate-200 p-2 transition-all duration-300',
        isOpen ? 'size-96' : 'size-20',
        !isOpen && 'delay-300',
      )}
      ref={containerRef}
    >
      <div
        className={clsx(
          isOpen ? 'opacity-100' : 'opacity-0',
          'transition-opacity duration-300',
          isOpen && 'delay-300',
        )}
      >
        {children}
      </div>
    </div>
  );
}
