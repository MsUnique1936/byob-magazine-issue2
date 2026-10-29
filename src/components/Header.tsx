import { useState } from 'react';
import { Volume2, VolumeX, BookOpen, Menu, X, ExternalLink, Youtube, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { ScreenId } from '../types/magazine';
import { getSoundMuted, setSoundMuted, playTickSound } from '../utils/audio';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

export function Header({ currentScreen, onNavigate }: HeaderProps) {
  const [muted, setMutedState] = useState(getSoundMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    setSoundMuted(next);
    if (!next) {
      playTickSound();
    }
  };

  const navItems: { id: ScreenId; label: string }[] = [
    { id: 1, label: 'Issue Cover' },
    { id: 2, label: 'Women of Faith' },
    { id: 3, label: 'Scripture Spinner' },
    { id: 4, label: 'Pastor 29th' },
    { id: 5, label: 'Connect & Pray' },
    { id: 6, label: 'Media & Outreach' },
    { id: 7, label: 'Marketplace & Ads' },
    { id: 8, label: 'Subscribe' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-8 min-h-16 py-2">
          {/* Zone 1: Single Brand Wordmark & Sub-Header Brand Line */}
          <div className="flex flex-col justify-center min-w-0">
            <button
              onClick={() => onNavigate(1)}
              className="flex items-center gap-2 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 rounded-sm"
            >
              <span className="font-display text-lg sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors whitespace-nowrap shrink-0">
                BYOB MAGAZINE
              </span>
              <span className="text-xs uppercase tracking-widest text-stone-600 font-sans font-semibold hidden sm:inline whitespace-nowrap">
                · BUILD YOUR OWN BELIEF
              </span>
              <span className="text-[10px] font-mono uppercase bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-semibold hidden lg:inline">
                Issue 02
              </span>
            </button>

            {/* Sub-Header Brand Line */}
            <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-stone-500 font-medium tracking-tight mt-0.5">
              <span className="truncate">
                A MsUnique Media Publication <span className="text-stone-300 mx-0.5 sm:mx-1">|</span> Transforming Faith, Business & Community
              </span>
              <a
                href="https://www.msunique.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-900 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-200 border border-amber-300/70 px-2 py-0.5 rounded-full transition-all shrink-0 shadow-2xs group"
                title="Visit MsUnique.net"
              >
                <span>MsUnique.net</span>
                <ExternalLink className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-medium tracking-wide text-stone-600">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                    isActive
                      ? 'text-stone-950 border-amber-700 font-semibold'
                      : 'border-transparent hover:text-stone-900 hover:border-stone-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Social Media Links & Audio chime toggle & mobile menu trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            {/* Minimalist Gold-Accented Social Media Icon Row */}
            <div className="hidden sm:flex items-center gap-1 text-stone-600 border-r border-stone-200 pr-2">
              <a
                href="https://www.youtube.com/@MsUnique2.0_friendraiser"
                target="_blank"
                rel="noopener noreferrer"
                title="ReelTalk on YouTube"
                aria-label="ReelTalk on YouTube"
                className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100/80 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/marshia.salcedo/"
                target="_blank"
                rel="noopener noreferrer"
                title="Publisher Marshia on Facebook"
                aria-label="Publisher Marshia on Facebook"
                className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100/80 transition-colors"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.instagram.com/marshia.salcedo/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram @marshia.salcedo"
                aria-label="Instagram @marshia.salcedo"
                className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100/80 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/marshiasalcedo"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn - Marshia Salcedo"
                aria-label="LinkedIn - Marshia Salcedo"
                className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100/80 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.msunique.net/contact"
                target="_blank"
                rel="noopener noreferrer"
                title="Direct Contact - msunique.net/contact"
                aria-label="Direct Contact - msunique.net/contact"
                className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100/80 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
            </div>

            <button
              onClick={toggleMute}
              title={muted ? 'Unmute tactile audio' : 'Mute tactile audio'}
              aria-label={muted ? 'Unmute tactile audio' : 'Mute tactile audio'}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              {muted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                  <span className="hidden md:inline">Audio Off</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span className="hidden md:inline">Audio</span>
                </>
              )}
            </button>

            {currentScreen !== 1 && (
              <button
                onClick={() => onNavigate(1)}
                className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>Cover</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#FAF8F5] px-4 pt-3 pb-4 space-y-1 shadow-lg">
          <div className="text-xs uppercase tracking-widest text-stone-500 font-sans px-3 py-1">
            Magazine Journey Navigation
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md text-left transition-colors ${
                currentScreen === item.id
                  ? 'bg-amber-100/70 text-stone-950 font-semibold'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-xs text-stone-500 font-mono">0{item.id}</span>
            </button>
          ))}

          <div className="pt-2 mt-2 border-t border-stone-200 space-y-2">
            <a
              href="https://www.msunique.net"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-xs font-medium text-stone-700 bg-amber-50/70 hover:bg-amber-100/80 border border-amber-200/80 px-3 py-2 rounded-lg transition-colors"
            >
              <span className="truncate text-stone-600">A MsUnique Media Publication</span>
              <span className="inline-flex items-center gap-1 font-semibold text-amber-900 shrink-0 ml-2">
                <span>MsUnique.net</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </a>

            {/* Mobile Social Row */}
            <div className="flex items-center justify-between pt-3 px-1">
              <span className="text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.youtube.com/@MsUnique2.0_friendraiser"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ReelTalk on YouTube"
                  className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/marshia.salcedo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Publisher Marshia on Facebook"
                  className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/marshia.salcedo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @marshia.salcedo"
                  className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/marshiasalcedo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn - Marshia Salcedo"
                  className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://www.msunique.net/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Direct Contact - msunique.net/contact"
                  aria-label="Direct Contact - msunique.net/contact"
                  className="p-1.5 rounded-full text-stone-600 hover:text-amber-800 hover:bg-amber-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
