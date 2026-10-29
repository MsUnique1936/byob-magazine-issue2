import { useState } from 'react';
import { ArrowRight, BookOpen, Quote, Sparkles, CheckCircle2, Radio, Headphones, ExternalLink } from 'lucide-react';
import { StoryModal } from './StoryModal';
import { SubscribeBanner } from './SubscribeBanner';
import { ScreenId } from '../types/magazine';
import { playTickSound, playChimeSound } from '../utils/audio';

interface Screen2ArticlesProps {
  onNext: () => void;
  onNavigate?: (screen: ScreenId) => void;
}

export function Screen2Articles({ onNext, onNavigate }: Screen2ArticlesProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [hasReadPreview, setHasReadPreview] = useState(false);

  const handleReadFullStory = () => {
    playChimeSound();
    setHasReadPreview(true);
    setModalOpen(true);
  };

  const handleNextScreen = () => {
    playTickSound();
    onNext();
  };

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen Header Badge */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-700 font-bold">SCREEN 02 OF 05</span>
          <span aria-hidden="true">·</span>
          <span>ARTICLES</span>
          <span aria-hidden="true">·</span>
          <span>WOMEN OF FAITH FEATURE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>By Marshia Salcedo, Editor-In-Chief</span>
          <span aria-hidden="true">·</span>
          <span>Published October 2026</span>
          <span aria-hidden="true">·</span>
          <span>4 min read</span>
        </div>
      </div>

      {/* Full-resolution Grandpreneur Cover Image with Natural Aspect Ratio */}
      <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-10 overflow-hidden rounded-2xl border border-stone-200 shadow-lg bg-stone-100 flex justify-center">
        <img
          src="/src/assets/images/The-VIP-Grandpreneur-Experience.png"
          alt="The VIP Grandpreneur Experience Cover — Women of Faith Feature"
          className="w-full h-auto object-contain block"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.src = "https://i.postimg.cc/dJmzPYm5/The-VIP-Grandpreneur-Experience.png";
          }}
        />
      </div>

      {/* Main Feature Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Documentary Photography & Pull Quote */}
        <div className="lg:col-span-5 space-y-6">
          <div className="relative group rounded-lg overflow-hidden border border-stone-200 bg-stone-100 shadow-md">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/src/assets/images/women_faith_feature_1792624673252.jpg"
                alt="Women of Faith Profile - Ordinary Women, Extraordinary Calling"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              <p className="text-xs font-serif italic text-stone-600">
                Faith in action: Transforming workplace culture, research tables, and living rooms through prayer and integrity.
              </p>
            </div>
          </div>

          {/* Key Scripture Anchor Card */}
          <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-mono tracking-wider text-amber-900 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Key Scripture Anchor</span>
            </div>
            <p className="font-serif text-lg sm:text-xl font-medium text-amber-950 italic leading-snug">
              “Strength and dignity are her clothing, and she laughs at the time to come.”
            </p>
            <div className="text-xs font-semibold text-amber-800 uppercase tracking-widest text-right">
              Proverbs 31:25
            </div>
          </div>

          {/* Quick Stats or Highlights */}
          <div className="p-5 bg-white border border-stone-200 rounded-lg space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              Spheres of Influence Explored
            </div>
            <ul className="space-y-2.5 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong>In Business & Career:</strong> Operating with uncompromising ethics and Christ-like leadership under pressure.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong>In Family & Home:</strong> Cultivating peace, prayer, and spiritual stability that anchors generations.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong>In Community:</strong> Extending hospitality, noticing the forgotten, and meeting practical needs.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Article Headline, Feature Summary, Quote Highlight, CTAs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold font-mono">
              FEATURE ARTICLE: ISSUE 02 · Kingdom Builders Series
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              Ordinary Women, Extraordinary Calling: Building the Kingdom in the Workplace and Home
            </h1>
            <p className="font-serif text-lg sm:text-xl text-stone-700 italic">
              By Marshia Salcedo, Editor-in-Chief
            </p>
          </div>

          {/* Feature Summary */}
          <div className="space-y-4 text-stone-700 text-base sm:text-lg leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900">
              When we think of “Kingdom Builders,” our minds often default to historical heroes, global evangelists,
              or those standing behind a church pulpit. But the true backbone of God’s work in the earth has always been
              built on the quiet, steadfast obedience of ordinary women living out an extraordinary faith.
            </p>
            <p>
              A Kingdom Builder is not defined by the size of her platform, but by the posture of her heart.
              She is the mother praying over her children before the school bus arrives; the executive bringing integrity
              and grace into a tense corporate boardroom; the entrepreneur dedicating her business profits to local outreach;
              and the volunteer serving faithfully when no lights or cameras are flashing.
            </p>
          </div>

          {/* Compact Magazine Embedded Card: Listen to the Latest ReelTalk */}
          <div className="p-4 sm:p-5 bg-[#181614] text-stone-100 rounded-xl border border-amber-900/60 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                <Radio className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                    ReelTalk Podcast Callout
                  </span>
                  <span className="text-xs text-stone-400 font-mono">28 min highlight</span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-white leading-snug">
                  Building Your Next Chapter with Boldness
                </h4>
                <p className="text-xs text-stone-300 leading-relaxed font-sans line-clamp-2 sm:line-clamp-1">
                  Hosted by Marshia Salcedo · Candid conversations on marketplace faith, boardroom integrity, and stepping boldly into kingdom purpose.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
              <button
                type="button"
                onClick={() => {
                  playTickSound();
                  if (onNavigate) {
                    onNavigate(6);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Listen to ReelTalk</span>
              </button>
            </div>
          </div>

          {/* Quote Highlight Box */}
          <div className="p-6 sm:p-8 bg-stone-100/90 rounded-lg border border-stone-300 relative my-6">
            <Quote className="w-8 h-8 text-amber-700/30 absolute top-4 left-4 -z-0" />
            <div className="relative z-10 space-y-2">
              <p className="font-serif text-xl sm:text-2xl italic font-medium text-stone-900 text-center leading-relaxed">
                “Faith isn't reserved for Sunday morning sermons—it is forged in every ordinary, Tuesday-afternoon decision to stand firmly on God’s Word.”
              </p>
              <div className="text-center text-xs tracking-widest uppercase font-sans text-stone-500 font-semibold pt-1">
                — Marshia Salcedo, Editor-in-Chief
              </div>
            </div>
          </div>

          {/* Interactive CTAs as required */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* CTA 1: READ FULL STORY */}
            <button
              onClick={handleReadFullStory}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-stone-900 bg-white hover:bg-stone-50 border-2 border-stone-800 rounded-lg shadow-xs hover:shadow-md transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <BookOpen className="w-4 h-4 text-amber-800" />
              <span>READ FULL STORY</span>
            </button>

            {/* CTA 2: NEXT: SCRIPTURE SPINNER ➔ */}
            <button
              onClick={handleNextScreen}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <span>NEXT: SCRIPTURE SPINNER</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {hasReadPreview && (
            <div className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>You opened the full profile. Ready to spin for your daily challenge!</span>
            </div>
          )}
        </div>
      </div>

      {/* Full-width Subscribe Call-to-Action Banner Card at Bottom of Article */}
      <SubscribeBanner
        onOpenSubscribePage={() => onNavigate && onNavigate(8)}
      />

      {/* Full Story Modal */}
      <StoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onNext={onNext}
        onNavigate={onNavigate as ((screen: 6) => void) | undefined}
      />
    </div>
  );
}
