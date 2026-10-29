import { 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Heart, 
  Award, 
  ExternalLink, 
  Radio, 
  Store, 
  Quote, 
  Milestone, 
  ChevronRight, 
  CheckCircle2, 
  ArrowDown, 
  Layers 
} from 'lucide-react';
import { ScreenId } from '../types/magazine';
import { playChimeSound, playTickSound } from '../utils/audio';
import coverArtImg from '../assets/images/magazine_cover_art_1792624672951.jpg';

interface Screen1CoverProps {
  onStartJourney: () => void;
  onNavigate: (screen: ScreenId) => void;
}

export function Screen1Cover({ onStartJourney, onNavigate }: Screen1CoverProps) {
  const handleStart = () => {
    playChimeSound();
    onStartJourney();
  };

  const handleNavigateToChapter = (screen: ScreenId) => {
    playChimeSound();
    onNavigate(screen);
  };

  const timelineSteps: {
    step: string;
    stepNumber: string;
    title: string;
    description: string;
    screen: ScreenId;
    icon: typeof BookOpen;
    tag: string;
  }[] = [
    {
      step: 'Step 01',
      stepNumber: '01',
      title: 'Women of Faith',
      description: 'Discover stories of courage, influence, and purpose.',
      screen: 2,
      icon: BookOpen,
      tag: 'Cover Feature',
    },
    {
      step: 'Step 02',
      stepNumber: '02',
      title: 'Scripture Spinner',
      description: 'Receive a Kingdom challenge, scripture, and prayer focus.',
      screen: 3,
      icon: Compass,
      tag: 'Interactive Tool',
    },
    {
      step: 'Step 03',
      stepNumber: '03',
      title: 'Pastor Legacy',
      description: 'Celebrate faithful leadership and lasting impact.',
      screen: 4,
      icon: Award,
      tag: '29th Anniversary',
    },
    {
      step: 'Step 04',
      stepNumber: '04',
      title: 'Connect & Testify',
      description: 'Share prayer requests, testimonies, and community victories.',
      screen: 5,
      icon: Heart,
      tag: 'Community Wall',
    },
    {
      step: 'Step 05',
      stepNumber: '05',
      title: 'Media & Outreach',
      description: 'Explore podcasts, storytelling, and community engagement.',
      screen: 6,
      icon: Radio,
      tag: 'ReelTalk Hub',
    },
    {
      step: 'Step 06',
      stepNumber: '06',
      title: 'Kingdom Marketplace',
      description: 'Connect with faith-driven businesses and ministries.',
      screen: 7,
      icon: Store,
      tag: 'Marketplace Directory',
    },
    {
      step: 'Step 07',
      stepNumber: '07',
      title: 'Subscribe & Grow',
      description: 'Continue the journey beyond this issue.',
      screen: 8,
      icon: Sparkles,
      tag: 'Kingdom Community',
    },
  ];

  const tableOfContents: { screen: ScreenId; title: string; subtitle: string; icon: typeof BookOpen }[] = [
    {
      screen: 2,
      title: 'Women of Faith Feature',
      subtitle: 'Ordinary Women, Extraordinary Calling in Workplace & Home',
      icon: BookOpen,
    },
    {
      screen: 3,
      title: 'Scripture Spinner',
      subtitle: 'Interactive Word Wheel: Courage, Faithfulness, and Service',
      icon: Compass,
    },
    {
      screen: 4,
      title: 'Pastor Feature & Timeline',
      subtitle: 'Celebrating 29 Years of Faithfulness & Community Impact (1997–2026)',
      icon: Award,
    },
    {
      screen: 5,
      title: 'Contact & Testimony Wall',
      subtitle: 'Connect, Submit Prayer Requests & Celebrate Community Miracles',
      icon: Heart,
    },
    {
      screen: 6,
      title: 'Media & Outreach Hub',
      subtitle: 'ReelTalk Podcast with Marshia & Community Friend-Raiser',
      icon: Radio,
    },
    {
      screen: 7,
      title: 'Marketplace & Ads',
      subtitle: 'Kingdom Marketplace, Partner Showcase & Sponsorship Tiers',
      icon: Store,
    },
    {
      screen: 8,
      title: 'Subscribe to BYOB',
      subtitle: 'Complimentary Digital Pass, Weekly Word & Reader Perks',
      icon: Sparkles,
    },
  ];

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen Header Badge */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-700 font-bold">SCREEN 01 OF 08</span>
          <span aria-hidden="true">·</span>
          <span>ISSUE COVER</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Est. 2024</span>
          <span aria-hidden="true">·</span>
          <span>Issue 02</span>
          <span aria-hidden="true">·</span>
          <span>Fall / Winter 2026</span>
          <span aria-hidden="true">·</span>
          <span>Interactive Digital Experience</span>
        </div>
      </div>

      {/* Main Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Magazine Cover Showcase */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative group w-full max-w-md">
            {/* Ambient gold glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-600/20 via-amber-400/25 to-stone-400/20 rounded-xl blur-lg group-hover:blur-xl transition duration-500 opacity-70 group-hover:opacity-100" />

            {/* Magazine Cover Frame */}
            <div className="relative bg-[#FBF9F5] rounded-lg overflow-hidden border border-amber-900/15 shadow-2xl transition-transform duration-300 group-hover:-translate-y-1">
              {/* Cover Image with Fallback */}
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                <img
                  src={coverArtImg || '/assets/images/magazine_cover_art_1792624672951.jpg'}
                  alt="BYOB Magazine Issue 02 Cover Art - Kingdom Builders: Ordinary People. Extraordinary Faith."
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-102"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('magazine_cover_art_1792624672951.jpg')) {
                      target.src = '/assets/images/magazine_cover_art_1792624672951.jpg';
                    } else if (!target.src.includes('unsplash.com')) {
                      target.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80';
                    }
                  }}
                />

                {/* Subdued foil overlay reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-amber-200/10 pointer-events-none" />

                {/* Cover Live Overlays */}
                <div className="absolute top-6 left-7 right-7 sm:top-7 sm:left-8 sm:right-8 flex justify-between items-center text-amber-50 text-[10px] sm:text-[11px] font-sans font-bold tracking-wider sm:tracking-widest uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] z-10 pointer-events-none">
                  <span className="bg-stone-900/40 px-2 py-0.5 rounded-xs backdrop-blur-xs">Issue No. 02</span>
                  <span className="bg-stone-900/40 px-2 py-0.5 rounded-xs backdrop-blur-xs">Fall / Winter 2026</span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                  <div className="text-xs uppercase tracking-widest font-sans text-amber-300 font-semibold mb-1">
                    Theme Feature
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
                    Kingdom Builders
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 mt-1 italic font-serif">
                    “Ordinary People. Extraordinary Faith.”
                  </p>
                </div>
              </div>

              {/* Cover Card Footer */}
              <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span className="font-medium">Curated Faith Journey</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playTickSound();
                    document.getElementById('publisher-welcome')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="font-mono text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1 cursor-pointer group/pw"
                  title="Scroll to Publisher Welcome section"
                >
                  <span>Publisher Welcome</span>
                  <span className="group-hover/pw:translate-y-0.5 transition-transform">↓</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Editorial Overview & Primary CTA */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold font-mono">
              Est. 2024 | Published: Fall/Winter 2026 Edition | Interactive Digital Experience
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-[1.1]">
              BYOB Magazine <span className="text-stone-700 font-normal block text-2xl sm:text-3xl mt-1 font-sans">— Build Your Own Belief</span>
            </h1>

            {/* Sub-Header Brand Line */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-600 font-medium">
              <span>A MsUnique Media Publication <span className="text-stone-300 mx-1">|</span> Transforming Faith, Business & Community</span>
              <a
                href="https://www.msunique.net"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-200 border border-amber-300/80 px-2.5 py-0.5 rounded-full transition-all shadow-2xs group"
                title="Visit MsUnique.net"
              >
                <span>MsUnique.net</span>
                <ExternalLink className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="py-2.5 border-y border-stone-200 space-y-1">
              <p className="font-display text-lg sm:text-xl font-bold text-stone-900 tracking-wide">
                “Kingdom Builders: Ordinary People. Extraordinary Faith.”
              </p>
              <p className="text-xs uppercase tracking-wider text-amber-900 font-semibold font-sans">
                Executive Leadership: Marshia Salcedo, Editor-in-Chief
              </p>
            </div>

            <p className="text-stone-600 text-base sm:text-lg leading-relaxed pt-1">
              Transforming passive reading into an interactive, faith-building journey.
              Explore inspiring profiles of women leading in executive and domestic callings, spin the living Scripture Wheel for your personal daily challenge, celebrate 29 years of steadfast pastoral legacy, and connect on the community wall.
            </p>
          </div>

          {/* Primary Call to Action */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 cursor-pointer"
            >
              <span>START JOURNEY</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                playTickSound();
                document.getElementById('kingdom-journey')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-amber-950 bg-amber-100 hover:bg-amber-200/90 border border-amber-300 rounded-lg transition-colors cursor-pointer shadow-2xs group"
            >
              <span>Explore Kingdom Journey</span>
              <ArrowDown className="w-4 h-4 text-amber-800 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-stone-500">
            Transform passive reading into an active, faith-building journey.
          </p>

          {/* Quick Page Jump Navigation */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-stone-400 font-sans">Quick Jump:</span>
            <button
              type="button"
              onClick={() => {
                playTickSound();
                document.getElementById('publisher-welcome')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-2.5 py-1 bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-400 rounded text-amber-900 font-semibold cursor-pointer transition-colors shadow-2xs"
            >
              Publisher Welcome ↓
            </button>
            <button
              type="button"
              onClick={() => {
                playTickSound();
                document.getElementById('kingdom-journey')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-2.5 py-1 bg-amber-100/80 hover:bg-amber-200 border border-amber-300 rounded text-amber-950 font-bold cursor-pointer transition-colors shadow-2xs"
            >
              Kingdom Builders Journey ↓
            </button>
            <button
              type="button"
              onClick={() => {
                playTickSound();
                document.getElementById('itinerary-chapters')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-2.5 py-1 bg-white hover:bg-amber-50 border border-stone-200 hover:border-amber-400 rounded text-stone-700 cursor-pointer transition-colors shadow-2xs"
            >
              All Chapters Index ↓
            </button>
          </div>
        </div>
      </div>

      {/* SECTION: PUBLISHER WELCOME */}
      <section
        id="publisher-welcome"
        aria-labelledby="publisher-welcome-heading"
        className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t-2 border-stone-200 space-y-6"
      >
        {/* Section Header Anchor */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>Executive Letter · Issue 02</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span>BYOB Magazine</span>
            <span aria-hidden="true">·</span>
            <span>Est. 2024</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-800 font-semibold">Fall / Winter 2026</span>
          </div>
        </div>

        {/* Warm Editorial Welcome Card with Elegant Typography & Subtle Gold Accent Styling */}
        <div className="relative bg-gradient-to-br from-[#FCFBF8] via-[#FAF7F0] to-amber-50/60 rounded-2xl border-2 border-amber-900/15 shadow-md p-6 sm:p-10 lg:p-12 overflow-hidden">
          {/* Subtle gold foil / light ray decorative accents */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-200/30 via-amber-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/5 rounded-full blur-2xl pointer-events-none" />

          {/* Delicate Gold Corner Accents */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500/40 pointer-events-none" />

          {/* Large decorative quotation watermark */}
          <Quote className="absolute top-6 right-6 sm:top-8 sm:right-10 w-16 h-16 sm:w-24 sm:h-24 text-amber-700/10 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Section Header & Publisher Seal */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold text-amber-900 bg-amber-100/90 border border-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>Publisher Welcome</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
                  WELCOME TO ISSUE 02
                </div>
                <h2 id="publisher-welcome-heading" className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                  Kingdom Builders
                </h2>
              </div>

              {/* Publisher Seal & Executive Identity Card */}
              <div className="p-5 bg-white/95 rounded-xl border border-amber-900/15 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-500 text-white flex items-center justify-center font-display font-bold text-lg shadow-sm ring-2 ring-amber-400/40">
                    MS
                  </div>
                  <div>
                    <div className="font-serif text-base font-bold text-stone-900">
                      Marshia Salcedo
                    </div>
                    <div className="text-xs text-amber-800 font-semibold tracking-wide">
                      Publisher &amp; Executive Editor
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      MsUnique Media Group
                    </div>
                  </div>
                </div>

                <div className="text-xs text-stone-600 leading-relaxed border-t border-amber-100 pt-3">
                  “Empowering voices of purpose, marketplace leaders, and ordinary people doing extraordinary Kingdom work.”
                </div>
              </div>

              {/* Quick Begin Journey Button */}
              <div className="hidden lg:block pt-2">
                <button
                  type="button"
                  onClick={handleStart}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  <span>Begin Reading Issue 02</span>
                  <ArrowRight className="w-4 h-4 text-amber-800" />
                </button>
              </div>
            </div>

            {/* Right Column: Editorial Body & Personal Letter */}
            <div className="lg:col-span-8 space-y-5 text-stone-700 leading-relaxed">
              {/* Editorial Lead Paragraph with Gold Accent Bar */}
              <blockquote className="font-serif text-xl sm:text-2xl text-stone-900 font-medium italic leading-snug border-l-4 border-amber-500 pl-4 sm:pl-5 py-1 text-balance">
                “Every great movement begins with people who are willing to build what others only imagine.”
              </blockquote>

              <div className="space-y-4 text-base sm:text-lg text-stone-700 font-sans leading-relaxed">
                <p>
                  In this issue, we celebrate ordinary people doing extraordinary work through faith, leadership, service, business, community outreach, and Kingdom purpose.
                </p>

                <p>
                  As you explore these pages, I invite you to reflect on how God may be calling you to build something meaningful in your own sphere of influence.
                </p>

                <p>
                  Thank you for being part of the BYOB Magazine community.
                </p>
              </div>

              {/* Callout Benediction with Subtle Gold Accent Styling */}
              <div className="py-4 px-5 my-2 border-y border-amber-900/15 bg-amber-100/40 rounded-lg shadow-2xs">
                <p className="font-serif text-lg sm:text-xl font-bold text-amber-900 italic tracking-wide">
                  Together, let us rise, build, and believe.
                </p>
              </div>

              {/* Signature Block */}
              <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className="font-serif text-2xl font-bold text-stone-900 italic tracking-tight">
                    — Marshia Salcedo
                  </div>
                  <div className="text-xs sm:text-sm uppercase font-mono tracking-wider font-semibold text-amber-900">
                    Publisher &amp; Executive Editor
                  </div>
                  <div className="text-xs text-stone-500 font-sans">
                    BYOB Magazine (Build Your Own Belief) · MsUnique Media
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleStart}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <span>EXPLORE ARTICLES</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: THE KINGDOM BUILDERS JOURNEY (EDITORIAL TIMELINE)
          Directly below Publisher Welcome & above Issue 02 Itinerary & Chapters
          ========================================================================= */}
      <section
        id="kingdom-journey"
        aria-labelledby="kingdom-journey-heading"
        className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t-2 border-stone-200 space-y-10"
      >
        {/* Section Header Anchor Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
            <Milestone className="w-4 h-4 text-amber-700" />
            <span>Interactive Editorial Roadmap</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span>7 Kingdom Milestones</span>
            <span aria-hidden="true">·</span>
            <span>Guided Pathway</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-800 font-semibold">Issue 02</span>
          </div>
        </div>

        {/* Section Headline & Editorial Subtitle */}
        <div className="space-y-3 max-w-4xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold text-amber-900 bg-amber-100/90 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Curated Reader Pathway</span>
          </div>
          <h2
            id="kingdom-journey-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight uppercase font-display"
          >
            THE KINGDOM BUILDERS JOURNEY
          </h2>
          <p className="text-stone-700 text-base sm:text-xl font-medium leading-relaxed font-serif italic text-amber-950/80">
            A guided interactive experience designed to inspire faith, leadership, service, and community impact.
          </p>
        </div>

        {/* Introduction Card with Warm Editorial Branding */}
        <div className="relative bg-gradient-to-br from-[#FAF8F5] via-white to-amber-50/50 rounded-2xl border-2 border-amber-900/15 p-6 sm:p-8 lg:p-10 shadow-sm space-y-4 overflow-hidden">
          {/* Subtle gold glow & corner accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-200/25 via-amber-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-amber-500/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-amber-500/40 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-900 font-bold">
              <BookOpen className="w-4 h-4 text-amber-700" />
              <span>Welcome to the Kingdom Builders Journey</span>
            </div>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-sans">
              Every section in this issue represents a different dimension of building a life of purpose. From courageous women of faith and spiritual growth challenges to ministry legacy, community outreach, entrepreneurship, and Kingdom service, each chapter invites readers to engage, reflect, and take action.
            </p>

            <blockquote className="font-serif text-lg sm:text-xl font-bold text-stone-900 italic border-l-4 border-amber-500 pl-4 py-1">
              “This experience is designed to move beyond reading and into transformation.”
            </blockquote>
          </div>
        </div>

        {/* Milestone Quick-Jump Bar (Smooth Scroll Anchor Links) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-500">
            <span className="uppercase tracking-wider font-semibold text-amber-900 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-700" />
              <span>Smooth Scroll Milestone Navigator:</span>
            </span>
            <span className="hidden sm:inline text-stone-400">Click any step to scroll or enter</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pb-2">
            {timelineSteps.map((step) => (
              <button
                key={step.step}
                type="button"
                onClick={() => {
                  playTickSound();
                  document.getElementById(`timeline-${step.stepNumber}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-full text-xs font-mono font-semibold bg-white hover:bg-amber-100/90 border border-stone-200 hover:border-amber-400 text-stone-700 hover:text-amber-950 transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
                title={`Scroll to ${step.step}: ${step.title}`}
              >
                <span className="text-amber-700 font-bold">{step.stepNumber}</span>
                <span className="hidden md:inline font-sans">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Gold-Accent Editorial Timeline */}
        <div className="relative pt-4 pb-8">
          {/* Central / Responsive Vertical Gold Spine Line */}
          <div 
            aria-hidden="true" 
            className="absolute left-6 sm:left-8 lg:left-1/2 top-6 bottom-12 w-1 bg-gradient-to-b from-amber-600 via-amber-400 to-amber-700/30 transform -translate-x-1/2 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.3)] pointer-events-none" 
          />

          <div className="space-y-8 sm:space-y-12">
            {timelineSteps.map((item, index) => {
              const IconComponent = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.step}
                  id={`timeline-${item.stepNumber}`}
                  className="relative flex flex-col lg:flex-row items-start lg:items-center group"
                >
                  {/* Central Milestone Node on the Spine */}
                  <div className="absolute left-6 sm:left-8 lg:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div 
                      onClick={() => handleNavigateToChapter(item.screen)}
                      title={`Jump to ${item.step}: ${item.title}`}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-amber-700 via-amber-600 to-amber-400 text-white font-mono font-bold text-xs sm:text-sm flex items-center justify-center shadow-md ring-4 ring-[#FAF8F5] group-hover:scale-115 group-hover:ring-amber-300 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-all duration-300 cursor-pointer"
                    >
                      {item.stepNumber}
                    </div>
                  </div>

                  {/* Responsive Timeline Card: Left on desktop if even, Right on desktop if odd */}
                  <div
                    className={`w-full pl-14 sm:pl-18 lg:pl-0 ${
                      isEven 
                        ? 'lg:w-1/2 lg:pr-14 lg:text-right' 
                        : 'lg:w-1/2 lg:pl-14 lg:ml-auto lg:text-left'
                    }`}
                  >
                    <div
                      onClick={() => handleNavigateToChapter(item.screen)}
                      className={`relative bg-gradient-to-br from-white via-[#FCFBF8] to-amber-50/40 rounded-2xl border-2 border-stone-200/90 group-hover:border-amber-400 p-5 sm:p-6 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden ${
                        isEven ? 'lg:border-r-4 lg:hover:border-r-amber-500' : 'lg:border-l-4 lg:hover:border-l-amber-500'
                      }`}
                    >
                      {/* Subtle gold foil shine corner */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-300/20 transition-colors" />

                      <div className={`relative z-10 flex flex-col ${isEven ? 'lg:items-end' : 'lg:items-start'} gap-3`}>
                        {/* Top Meta Bar: Step & Category Tag */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 font-mono text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-full shadow-2xs">
                            <Milestone className="w-3 h-3 text-amber-700" />
                            <span>{item.step}</span>
                          </span>
                          <span className="font-mono text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
                            {item.tag}
                          </span>
                        </div>

                        {/* Title & Interactive Icon */}
                        <div className={`flex items-center gap-3 w-full ${isEven ? 'lg:flex-row-reverse' : 'flex-row'}`}>
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-amber-700 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 group-hover:ring-2 group-hover:ring-amber-300 transition-all duration-300">
                            <IconComponent className="w-5 h-5" />
                          </div>

                          <div className="flex-1">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors tracking-tight leading-snug">
                              {item.title}
                            </h3>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans">
                          {item.description}
                        </p>

                        {/* Action CTA Button */}
                        <div className="pt-2 w-full flex items-center justify-between border-t border-stone-100">
                          <span className="text-xs font-mono text-amber-800 font-semibold flex items-center gap-1 group-hover:text-amber-950">
                            <span>Screen 0{item.screen}</span>
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigateToChapter(item.screen);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-900 group-hover:text-white bg-amber-100/90 group-hover:bg-amber-800 border border-amber-300 group-hover:border-amber-900 px-3 py-1.5 rounded-md transition-all duration-200 shadow-2xs cursor-pointer"
                          >
                            <span>Enter Chapter</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Journey Bottom Callout Banner */}
        <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-stone-900 text-amber-50 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 border border-amber-800/50">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ready for Spiritual &amp; Leadership Impact?</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Begin Your Kingdom Builders Journey
            </h3>
            <p className="text-amber-100/80 text-sm sm:text-base font-sans">
              Start with Step 01: Women of Faith, or jump straight into the full chapter index below.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNavigateToChapter(2)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-stone-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 hover:from-amber-200 hover:to-amber-100 rounded-lg shadow-md hover:scale-102 transition-all cursor-pointer font-sans"
            >
              <span>Begin at Step 01</span>
              <ArrowRight className="w-4 h-4 text-stone-950" />
            </button>

            <button
              type="button"
              onClick={() => {
                playTickSound();
                document.getElementById('itinerary-chapters')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-mono uppercase tracking-wider text-amber-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors cursor-pointer"
            >
              <span>View Chapter Index ↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: ISSUE 02 ITINERARY & CHAPTERS
          Directly below The Kingdom Builders Journey
          ========================================================================= */}
      <section
        id="itinerary-chapters"
        aria-labelledby="itinerary-chapters-heading"
        className="mt-14 sm:mt-20 pt-10 sm:pt-14 border-t-2 border-stone-200 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-200 gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
            <Layers className="w-4 h-4 text-amber-700" />
            <span>Complete Issue Directory</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span>7 Interactive Stops</span>
            <span aria-hidden="true">·</span>
            <span>Fast-Travel Index</span>
          </div>
        </div>

        <div className="space-y-2">
          <h2
            id="itinerary-chapters-heading"
            className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight"
          >
            Issue 02 Itinerary &amp; Chapters
          </h2>
          <p className="text-stone-600 text-sm sm:text-base">
            Select any chapter below to jump directly to that interactive digital experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
          {tableOfContents.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.screen}
                type="button"
                onClick={() => handleNavigateToChapter(item.screen)}
                className="p-4 text-left bg-white hover:bg-amber-50/60 border border-stone-200 hover:border-amber-400 rounded-xl transition-all duration-200 group shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-800 group-hover:text-white transition-all">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Screen 0{item.screen}
                    </span>
                  </div>

                  <div className="text-base font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </div>

                  <div className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.subtitle}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-amber-800 group-hover:text-amber-950">
                  <span>Open Chapter</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
