import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/ScrollToTop';
import PageTransition from '@/components/PageTransition';
import Index from './pages/Index';
import Shows from './pages/Shows';
import Archive from './pages/Archive';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Imprint from './pages/Imprint';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Layout>
            <PageTransition>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shows" element={<Shows />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/imprint" element={<Imprint />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            </PageTransition>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
