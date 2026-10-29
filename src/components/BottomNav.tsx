import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { ScreenId } from '../types/magazine';
import { playTickSound } from '../utils/audio';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
}

const SCREEN_NAMES: Record<ScreenId, string> = {
  1: 'Issue Cover',
  2: 'Women of Faith Feature',
  3: 'Scripture Spinner',
  4: 'Pastor 29th Anniversary',
  5: 'Connect & Testimony Wall',
  6: 'Media & Outreach',
  7: 'Marketplace & Ads',
  8: 'Subscribe & Join',
};

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const handlePrev = () => {
    if (currentScreen > 1) {
      playTickSound();
      onNavigate((currentScreen - 1) as ScreenId);
    }
  };

  const handleNext = () => {
    if (currentScreen < 8) {
      playTickSound();
      onNavigate((currentScreen + 1) as ScreenId);
    } else {
      playTickSound();
      onNavigate(1);
    }
  };

  return (
    <aside aria-label="Magazine Reading Controls" className="sticky bottom-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200 py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Previous Screen Control */}
        <div className="flex items-center gap-2">
          {currentScreen > 1 ? (
            <button
              onClick={handlePrev}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-md transition-colors whitespace-nowrap"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous:</span>
              <span className="text-stone-900 font-semibold">{SCREEN_NAMES[(currentScreen - 1) as ScreenId]}</span>
            </button>
          ) : (
            <span className="text-xs text-stone-500 font-mono tracking-wider uppercase">
              Screen 01 of 08
            </span>
          )}
        </div>

        {/* Center Progress Pips */}
        <div className="flex items-center gap-2">
          {([1, 2, 3, 4, 5, 6, 7, 8] as ScreenId[]).map((step) => {
            const isActive = currentScreen === step;
            return (
              <button
                key={step}
                onClick={() => {
                  playTickSound();
                  onNavigate(step);
                }}
                title={SCREEN_NAMES[step]}
                className={`transition-all ${
                  isActive
                    ? 'w-7 h-2 bg-amber-700 rounded-full'
                    : 'w-2 h-2 bg-stone-300 hover:bg-stone-400 rounded-full'
                }`}
                aria-label={`Jump to ${SCREEN_NAMES[step]}`}
              />
            );
          })}
        </div>

        {/* Next Screen Control */}
        <div>
          {currentScreen < 8 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-colors shadow-xs whitespace-nowrap"
            >
              <span className="hidden sm:inline">Next:</span>
              <span className="font-semibold">{SCREEN_NAMES[(currentScreen + 1) as ScreenId]}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                playTickSound();
                onNavigate(1);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-stone-900 bg-stone-200 hover:bg-stone-300 rounded-md transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Cover</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
