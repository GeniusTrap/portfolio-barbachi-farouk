import React, { useEffect, useRef, useState } from 'react';

const ScrollAnimation = ({ children, delay = 0, direction = 'up', duration = 500 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-500 ease-out';
    
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `${baseClass} transform translate-y-8 opacity-0`;
        case 'down':
          return `${baseClass} transform -translate-y-8 opacity-0`;
        case 'left':
          return `${baseClass} transform translate-x-8 opacity-0`;
        case 'right':
          return `${baseClass} transform -translate-x-8 opacity-0`;
        case 'fade':
          return `${baseClass} opacity-0`;
        default:
          return `${baseClass} transform translate-y-8 opacity-0`;
      }
    }
    
    return `${baseClass} transform translate-x-0 translate-y-0 opacity-100`;
  };

  return (
    <div ref={ref} className={getAnimationClass()} style={{ transitionDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};

export default ScrollAnimation;