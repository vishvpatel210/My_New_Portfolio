import { useEffect } from 'react';

const useRevealOnScroll = () => {
  useEffect(() => {
    const revObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => revObserver.observe(el));

    return () => {
      revealElements.forEach((el) => revObserver.unobserve(el));
    };
  }, []);
};

export default useRevealOnScroll;
