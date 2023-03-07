import { Scroll, ScrollControls } from '@react-three/drei';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import './Experience.css';
import Items from './Item';

function useElementObserverRef(opts: any) {
  const containerRef = useRef<any>(null);
  let observer: any = null;
  const [ isVisible, setIsVisible ] = useState<any>(false);

  const observerFunc = (entries: any[]) => {
    const [ entry ] = entries;

    setIsVisible(entry.isIntersecting);
  }

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
    ...opts
  }

  useEffect(() => {
    observer = new IntersectionObserver(observerFunc, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer?.unobserve(containerRef.current);
    }
  }, [])

  return [containerRef, isVisible];
}

function ObserveredElement({ children, visible, defaultClassName, activeClassName, style }: any, ...props: any) {
  const [ref, isVisible] = useElementObserverRef({ threshold: 0.5 });

  const classNameValue = isVisible || visible ? activeClassName : defaultClassName;

  return (
    <div ref={ref} style={style} className={classNameValue}>
      {children}
    </div>
  );
}



const Experience = () => {
  const isMobile = window.innerWidth < 600;
  let w = window.innerWidth;
  let h = window.innerHeight;

  const scrollStyleProps: any = {
    style: { width: '100%' }
  }

  let maxWidth = Math.min(w, 1800);
  let marginOffset = (w - maxWidth) / 2;

  const xAxisCalc = (n: number) => {
    return marginOffset + (n * w / 100) + 'px';
  }

  const topCalc = (n: number, offsetPx: number = 0) => {
    return  (n * h / 100) + offsetPx + 'px';
  }


  let setup = [
      {
        title: 'Yeti',
        top: '20vh',
        left: xAxisCalc(10)
      },

      {
        title: 'Homes',
        top: '75vh',
        left: xAxisCalc(10)
      },

      {
        title: 'off grid.',
        top: '170vh',
        left: xAxisCalc(10)
      },

      {
        title: 'Modern',
        top: topCalc(250),
        right: xAxisCalc(15)
      },

      {
        title: 'Living.',
        top: topCalc(250, 150),
        right: xAxisCalc(12)
      },

      {
        title: 'Find',
        top: topCalc(355),
        left: xAxisCalc(10)
      },

      {
        title: 'Your',
        top: topCalc(355, 150),
        left: xAxisCalc(11)
      },

      {
        title: 'Home',
        top: topCalc(355, 300),
        left: xAxisCalc(13)
      }
  ];

  if (isMobile) {
    setup = [
      {
        title: 'Yeti',
        top: `65vh`,
        left: '5vw'
      },

      {
        title: 'Homes',
        top: '75vh',
        left: '10vw'
      },

      {
        title: 'off grid.',
        top: '170vh',
        left: '10vw'
      },

      {
        title: 'Modern',
        top: '257vh',
        right: '15vw'
      },

      {
        title: 'Living.',
        top: '267vh',
        right: '12vw'
      },

      {
        title: 'Find',
        top: '382vh',
        left: '5vw'
      },

      {
        title: 'Your',
        top: '392vh',
        left: '5vw'
      },

      {
        title: 'Home',
        top: '402vh',
        left: '5vw'
      }
    ];
  }

  const htmlSections =  useMemo(() => {
    let sections = [];

    for (let i = 0; i < setup.length; i++) {
      const { title, ...props } = setup[i];

      sections.push(
        <ObserveredElement
          key={title}
          visible={isMobile}
          defaultClassName="section"
          activeClassName="section active"
          style={{ position: 'absolute', ...props }}
        >
          <h1>{title}</h1>
        </ObserveredElement>
      );
    }

    return sections;
  }, [setup])

  console.log('Rendering');

  return (
    <>
      <ScrollControls damping={0.3} pages={4.3}>
        <Scroll>
          <Items />
        </Scroll>

        <Scroll html {...scrollStyleProps} >
          {htmlSections}
        </Scroll>
      </ScrollControls>
    </>
  );
}

export default memo(Experience)
