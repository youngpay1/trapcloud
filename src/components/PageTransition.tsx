import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevPath) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        setPrevPath(location.pathname);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, prevPath]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80"
          >
            <div className="relative flex items-center justify-center">
              <motion.img
                src="/stars.png"
                alt=""
                className="h-36 md:h-40 w-auto mix-blend-screen"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              <img
                src="/trapcloud-logo-small.png"
                alt="Trap Cloud"
                className="absolute w-40 md:w-48 mix-blend-screen"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
