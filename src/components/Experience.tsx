import { Scroll, ScrollControls } from '@react-three/drei'
import { useEffect, useMemo, useRef, useState } from 'react'
import './Experience.css'
import Items from './Item'

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

  let setup = [
      {
        title: 'Yeti',
        top: `20vh`,
        left: '10vw'
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
        top: '250vh',
        right: '15vw'
      },

      {
        title: 'Living.',
        top: '260vh',
        right: '12vw'
      },

      {
        title: 'Find',
        top: '340vh',
        left: '10vw'
      },

      {
        title: 'Your',
        top: '350vh',
        left: '11vw'
      },

      {
        title: 'Home',
        top: '360vh',
        left: '13vw'
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
        top: '255vh',
        right: '15vw'
      },

      {
        title: 'Living.',
        top: '265vh',
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

  return (
    <>
      {/* <Perf /> */}
      <ScrollControls damping={0} pages={4.3}>

        <Scroll>
          <Items />
        </Scroll>

        <Scroll html style={{ width: '100%' }}>
          {htmlSections}
        </Scroll>
      </ScrollControls>
    </>
  );
}

export default Experience
