import { useState, useEffect } from 'react';
import { ScreenId } from './types/magazine';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Screen1Cover } from './components/Screen1Cover';
import { Screen2Articles } from './components/Screen2Articles';
import { Screen3Spinner } from './components/Screen3Spinner';
import { Screen4PastorTimeline } from './components/Screen4PastorTimeline';
import { Screen5ConnectWall } from './components/Screen5ConnectWall';
import { Screen6MediaOutreach } from './components/Screen6MediaOutreach';
import { Screen7Marketplace } from './components/Screen7Marketplace';
import { Screen6Subscribe } from './components/Screen6Subscribe';
import { NewsletterView } from './components/NewsletterView';
import { Footer } from './components/Footer';

export default function App() {
  const isNewsletterRoute = (): boolean => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      return hash.includes('newsletter') || search.includes('newsletter');
    }
    return false;
  };

  const getInitialScreen = (): ScreenId => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('8') || hash.includes('subscribe')) return 8;
      if (hash.includes('7') || hash.includes('marketplace') || hash.includes('sponsor') || hash.includes('ads')) return 7;
      if (hash.includes('6') || hash.includes('media') || hash.includes('outreach') || hash.includes('podcast') || hash.includes('reeltalk')) return 6;
      if (hash.includes('2') || hash.includes('article') || hash.includes('women')) return 2;
      if (hash.includes('3') || hash.includes('spinner') || hash.includes('wheel')) return 3;
      if (hash.includes('4') || hash.includes('pastor') || hash.includes('anniversary')) return 4;
      if (hash.includes('5') || hash.includes('connect') || hash.includes('testimony')) return 5;
      const params = new URLSearchParams(window.location.search);
      const s = parseInt(params.get('screen') || '', 10);
      if (s >= 1 && s <= 8) return s as ScreenId;
    }
    return 1;
  };

  const [isNewsletter, setIsNewsletter] = useState<boolean>(isNewsletterRoute);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(getInitialScreen);

  // Scroll to top on screen change & sync hash
  const navigateTo = (screen: ScreenId) => {
    setIsNewsletter(false);
    setCurrentScreen(screen);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#screen-${screen}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation and hash change listener
  useEffect(() => {
    const handleHashChange = () => {
      const isNews = isNewsletterRoute();
      setIsNewsletter(isNews);
      if (!isNews) {
        setCurrentScreen(getInitialScreen());
      }
    };
    window.addEventListener('hashchange', handleHashChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (isNewsletter) return;

      if (e.key === 'ArrowRight' && currentScreen < 8) {
        navigateTo((currentScreen + 1) as ScreenId);
      } else if (e.key === 'ArrowLeft' && currentScreen > 1) {
        navigateTo((currentScreen - 1) as ScreenId);
      } else if (e.key >= '1' && e.key <= '8') {
        navigateTo(parseInt(e.key, 10) as ScreenId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [currentScreen, isNewsletter]);

  if (isNewsletter) {
    return (
      <NewsletterView
        onBackToMagazine={() => {
          if (typeof window !== 'undefined') {
            window.location.hash = '#screen-1';
          }
          setIsNewsletter(false);
          setCurrentScreen(1);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-amber-200 selection:text-amber-950">
      {/* Editorial Top Bar Contract */}
      <Header
        currentScreen={currentScreen}
        onNavigate={navigateTo}
      />

      {/* Main Magazine Reading Experience */}
      <main className="flex-1 w-full" id="main-content">
        {currentScreen === 1 && (
          <Screen1Cover
            onStartJourney={() => navigateTo(2)}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 2 && (
          <Screen2Articles
            onNext={() => navigateTo(3)}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 3 && (
          <Screen3Spinner
            onNext={() => navigateTo(4)}
          />
        )}

        {currentScreen === 4 && (
          <Screen4PastorTimeline
            onNext={() => navigateTo(5)}
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 5 && (
          <Screen5ConnectWall
            onBackToCover={() => navigateTo(1)}
          />
        )}

        {currentScreen === 6 && (
          <Screen6MediaOutreach
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 7 && (
          <Screen7Marketplace
            onNavigate={navigateTo}
          />
        )}

        {currentScreen === 8 && (
          <Screen6Subscribe
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* App Global Footer: MsUnique Media Group & Ecosystem */}
      <Footer onNavigate={navigateTo} />

      {/* Magazine Reading Controls */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={navigateTo}
      />
    </div>
  );
}
