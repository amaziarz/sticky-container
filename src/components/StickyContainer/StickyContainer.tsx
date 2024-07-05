import {
  type CSSProperties,
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
  position: Partial<Pick<CSSProperties, 'top' | 'bottom' | 'left' | 'right'>>;
  className?: string;
  openClassName?: string;
  collapsedClassName?: string;
}

export function StickyContainer({
  children,
  targetElementRef,
  position,
  openClassName,
  collapsedClassName,
}: StickyContainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetElementRef]);

  return (
    <div
      className={clsx(
        'fixed rounded-md bg-slate-200 transition-all duration-300',
        !isOpen && 'delay-300',
        isOpen
          ? [openClassName ?? 'size-96', 'overflow-auto']
          : [collapsedClassName ?? 'size-20', 'overflow-hidden'],
      )}
      style={position}
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
