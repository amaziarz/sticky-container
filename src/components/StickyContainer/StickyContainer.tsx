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
  /**
   * A reference element that triggers the open state when it overlaps with the container
   */
  targetElementRef: RefObject<HTMLElement>;
  /**
   * Sticky container position relative to the viewport
   */
  position: Partial<Pick<CSSProperties, 'top' | 'bottom' | 'left' | 'right'>>;
  /**
   * Styles applied to both the open and collapsed states
   */
  className?: string;
  /**
   * Styles applied to the open state, can be used to override the size of the open container
   */
  openClassName?: string;
  /**
   * Styles applied to the collapsed state, can be used to override the size of the collapsed container
   */
  collapsedClassName?: string;
}

export function StickyContainer({
  children,
  targetElementRef,
  position,
  className,
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
        'fixed rounded-md transition-all duration-300',
        !isOpen && 'delay-300',
        className,
        isOpen
          ? [
              openClassName ?? 'h-[50vh] w-[80vw] sm:h-96 sm:w-96',
              'overflow-auto',
            ]
          : [collapsedClassName ?? 'size-20 sm:size-24', 'overflow-hidden'],
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
