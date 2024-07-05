import { useRef } from 'react';
import { StickyContainer } from './components/StickyContainer';

export function App() {
  const targetElementRef = useRef<HTMLDivElement>(null);

  return (
    // height set to 300vh to make the page scrollable for testing purposes
    <main className="relative h-[300vh] p-8">
      <p className="text-2xl">Scroll down to test</p>
      <div className="absolute right-0 top-1/3 flex w-full justify-end">
        <div
          className="mx-4 h-96 w-[48rem] rounded-md bg-gray-500 p-4 sm:mx-16"
          ref={targetElementRef}
        >
          target element
        </div>
      </div>
      <StickyContainer
        targetElementRef={targetElementRef}
        position={{
          bottom: '2rem',
          right: '2rem',
        }}
        openClassName="bg-slate-200 size-96"
        collapsedClassName="bg-amber-200 size-20"
      >
        <p className="p-4 text-base">
          In a galaxy far, far away, where stars gleam like diamonds in the
          cosmic ocean and planets dance in celestial waltz, there exists a
          realm of infinite possibilities. It is a realm where heroes rise from
          the dust of obscurity, where destinies entwine like threads in a
          tapestry woven by time itself. Amidst the nebulae and supernovas,
          amidst the quiet whispers of solar winds, there lies a story waiting
          to be told—a story of courage, of love, and of the eternal struggle
          between light and darkness. This is a tale that spans galaxies, where
          each constellation holds secrets yet to be discovered, where the pulse
          of the universe beats in harmony with the beating hearts of those who
          dare to dream beyond the stars.
        </p>
      </StickyContainer>
    </main>
  );
}
