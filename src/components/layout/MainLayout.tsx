import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarWidth(0);
      } else {
        setSidebarWidth(280);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background flex w-full">
      <AppSidebar />
      
      <motion.main
        initial={{ marginLeft: 0 }}
        animate={{ marginLeft: sidebarWidth }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col min-h-screen w-full"
      >
        <Header />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex-1 p-6 overflow-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </div>
  );
}
