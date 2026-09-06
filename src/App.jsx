import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { StandardsSearchPage } from './pages/StandardsSearchPage';
import { ServicesPage } from './pages/ServicesPage';
import { LabLocatorPage } from './pages/LabLocatorPage';
import { StandardDrawer } from './components/StandardDrawer';
import { GazettePdfModal } from './components/GazettePdfModal';
import { LoginModal } from './components/LoginModal';
import { mockStandards } from './services/mockData';

export function AppContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [drawerStandard, setDrawerStandard] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfModalTitle, setPdfModalTitle] = useState('Gazette Notification S.O. 3192(E)');
  const [activeAssistantQuery, setActiveAssistantQuery] = useState('');
  const [globalScrollProgress, setGlobalScrollProgress] = useState(0);

  // Authentication state: Defaults to Limited Demo Access (No Dr. V. Sharma by default)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    isDemo: true,
    name: 'Guest User',
    role: 'Demo Access (Limited)'
  });

  // Open the cool login modal on first session visit
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('bisync_visited');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setIsLoginModalOpen(true);
        sessionStorage.setItem('bisync_visited', 'true');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Global window scroll progress listener
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setGlobalScrollProgress(progress);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const handleOpenStandardDrawer = (standard) => {
    setDrawerStandard(standard);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOpenPdfModal = (docInfo) => {
    if (docInfo && docInfo.title) {
      setPdfModalTitle(docInfo.title);
    }
    setIsPdfModalOpen(true);
  };

  const handleStartQuery = (queryText) => {
    setActiveAssistantQuery(queryText);
    setActiveTab('assistant');
  };

  const handleAskAboutStandard = (standard) => {
    setIsDrawerOpen(false);
    setActiveAssistantQuery(`What are the certification and testing requirements for ${standard.code} (${standard.title})?`);
    setActiveTab('assistant');
  };

  const handleAskAboutLab = (lab) => {
    setActiveAssistantQuery(`How can I submit samples of ${lab.standards[0] || 'IS 17803:2022'} to ${lab.name} in ${lab.city}?`);
    setActiveTab('assistant');
  };

  const handleLoginSuccess = (userProfile) => {
    if (userProfile) {
      setCurrentUser(userProfile);
    }
  };

  const handleLogout = () => {
    setCurrentUser({
      isDemo: true,
      name: 'Guest User',
      role: 'Demo Access (Limited)'
    });
  };

  return (
    <div className="min-h-screen flex flex-col sketch-canvas relative selection:bg-fuchsia-500 selection:text-white">
      
      {/* Dynamic Global Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-600 to-indigo-600 shadow-md shadow-fuchsia-500/50 transition-all duration-150"
          style={{ width: `${globalScrollProgress}%` }}
        />
      </div>

      {/* Top Navbar with Login Button */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Routed Page Content */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage 
            onNavigate={setActiveTab}
            onStartQuery={handleStartQuery}
            onSelectStandard={handleOpenStandardDrawer}
          />
        )}

        {activeTab === 'assistant' && (
          <AIAssistantPage 
            currentUser={currentUser}
            onOpenLogin={() => setIsLoginModalOpen(true)}
            initialQuery={activeAssistantQuery}
            onOpenDrawer={handleOpenStandardDrawer}
            onOpenPdf={handleOpenPdfModal}
          />
        )}

        {activeTab === 'standards' && (
          <StandardsSearchPage 
            onSelectStandard={handleOpenStandardDrawer}
            onConsultAssistant={handleStartQuery}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage 
            onNavigate={setActiveTab}
            onOpenDrawer={handleOpenStandardDrawer}
            onLaunchAssistant={() => setActiveTab('assistant')}
          />
        )}

        {activeTab === 'labs' && (
          <LabLocatorPage 
            onAskAssistantAboutLab={handleAskAboutLab}
          />
        )}
      </main>

      {/* Slide-over Standard Inspector Drawer */}
      <StandardDrawer 
        standard={drawerStandard}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        onOpenPdf={handleOpenPdfModal}
        onAskAboutStandard={handleAskAboutStandard}
      />

      {/* Official Gazette PDF Certificate Modal */}
      <GazettePdfModal 
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        documentTitle={pdfModalTitle}
      />

      {/* Cool Portal Authentication & Onboarding Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Compliance Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
