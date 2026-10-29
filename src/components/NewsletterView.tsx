import { useState, useRef } from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Printer, 
  Share2, 
  ExternalLink, 
  Heart, 
  Mic, 
  Play, 
  Pause, 
  Check, 
  Send, 
  Mail, 
  BookOpen, 
  Award, 
  Radio, 
  Store, 
  Compass, 
  Youtube, 
  Facebook, 
  Instagram, 
  Calendar,
  Clock,
  Quote,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { playChimeSound, playTickSound } from '../utils/audio';

interface NewsletterViewProps {
  onBackToMagazine: () => void;
}

export function NewsletterView({ onBackToMagazine }: NewsletterViewProps) {
  // Voice Tribute Audio State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  // Interactive Newsletter Subscription
  const [subscriberEmail, setSubscriberEmail] = useState('');
  const [subscriberName, setSubscriberName] = useState('');
  const [subscribedToast, setSubscribedToast] = useState(false);

  // Prayer Submission inside newsletter
  const [prayerName, setPrayerName] = useState('');
  const [prayerText, setPrayerText] = useState('');
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);

  // Share Toast
  const [shareToast, setShareToast] = useState(false);

  // Toggle voice tribute playback
  const handleToggleVoice = () => {
    playTickSound();
    if (isPlayingAudio) {
      voiceAudioRef.current?.pause();
      setIsPlayingAudio(false);
    } else {
      if (!voiceAudioRef.current) {
        voiceAudioRef.current = new Audio('/audio/dr-kimberly-chen-voice-tribute.wav');
        voiceAudioRef.current.onended = () => setIsPlayingAudio(false);
        voiceAudioRef.current.onerror = () => setIsPlayingAudio(false);
      }
      voiceAudioRef.current.play().then(() => {
        setIsPlayingAudio(true);
        playChimeSound();
      }).catch((err) => {
        console.warn('Voice tribute playback error:', err);
        setIsPlayingAudio(false);
      });
    }
  };

  const handlePrint = () => {
    playTickSound();
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleShare = async () => {
    playTickSound();
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.msunique.net';
    const shareData = {
      title: 'BYOB Community Newsletter — Issue 02: Kingdom Builders',
      text: 'Read the latest BYOB (Build Your Own Belief) Community Newsletter: faith, leadership, and kingdom inspiration.',
      url: shareUrl,
    };

    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`BYOB Community Newsletter: ${shareUrl}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3500);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscriberEmail.trim()) return;
    playChimeSound();
    setSubscribedToast(true);
    setSubscriberEmail('');
    setSubscriberName('');
    setTimeout(() => setSubscribedToast(false), 6000);
  };

  const handlePrayerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerText.trim()) return;
    playChimeSound();
    setPrayerSubmitted(true);
    setPrayerName('');
    setPrayerText('');
    setTimeout(() => setPrayerSubmitted(false), 6000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 print:bg-white print:text-black">
      {/* Top Floating Control Bar (Hidden during Print) */}
      <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 border-b border-amber-900/40 shadow-md backdrop-blur-md print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playTickSound();
                onBackToMagazine();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-200 transition-colors font-semibold cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Magazine</span>
            </button>
            <span className="hidden sm:inline text-stone-400 font-mono">|</span>
            <span className="hidden sm:inline text-amber-400/90 font-mono font-medium">
              BYOB Community Newsletter · Issue 02
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer"
              title="Print newsletter or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-800 hover:bg-amber-700 text-white transition-colors cursor-pointer"
              title="Share this newsletter"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </header>

      {/* Share Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-lg border border-amber-500 shadow-xl flex items-center gap-2 animate-fadeIn print:hidden">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Newsletter link copied to clipboard!</span>
        </div>
      )}

      {/* Main Newsletter Editorial Sheet */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
        
        {/* =========================================================================
            NEWSLETTER MASTHEAD & HEADER BANNER
            ========================================================================= */}
        <section className="bg-gradient-to-b from-white via-[#FCFBF8] to-[#FAF7F0] rounded-2xl border-2 border-amber-900/20 shadow-md p-6 sm:p-10 text-center relative overflow-hidden">
          {/* Subtle gold foil / sunburst aura */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-amber-200/30 via-amber-400/10 to-transparent blur-3xl pointer-events-none" />
          
          {/* Delicate corner brackets */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-500/50 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-500/50 pointer-events-none" />

          <div className="relative z-10 space-y-4">
            {/* Top metadata strip */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono uppercase tracking-widest text-amber-900 border-b border-amber-900/15 pb-2.5 gap-2">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                <span>MsUnique Media Group</span>
              </span>
              <span>Volume II · Companion Dispatch</span>
              <span className="font-semibold text-stone-700">Fall / Winter 2026</span>
            </div>

            {/* Masthead Title */}
            <div className="space-y-1.5 pt-2">
              <div className="text-xs uppercase tracking-[0.25em] font-mono text-amber-800 font-bold">
                Build Your Own Belief
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight uppercase leading-tight drop-shadow-xs">
                THE BYOB DISPATCH
              </h1>
              <p className="font-serif text-base sm:text-xl font-medium text-amber-950 italic">
                “Community Voice, Marketplace Faith &amp; Kingdom Purpose”
              </p>
            </div>

            {/* Dateline & Theme Box */}
            <div className="pt-2">
              <div className="inline-block bg-amber-100/80 border border-amber-300 px-4 py-1.5 rounded-full text-xs font-mono text-amber-950 font-bold uppercase tracking-wider shadow-2xs">
                Theme: Kingdom Builders — Ordinary People. Extraordinary Faith.
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: PUBLISHER'S LETTER TO THE COMMUNITY
            ========================================================================= */}
        <section className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
              <Quote className="w-4 h-4 text-amber-700" />
              <span>Publisher's Letter · Marshia Salcedo</span>
            </div>
            <span className="text-xs font-mono text-stone-500">Executive Editorial</span>
          </div>

          <div className="space-y-4 text-stone-700 leading-relaxed font-sans text-base sm:text-lg">
            <p className="font-serif text-xl sm:text-2xl text-stone-900 font-semibold italic border-l-4 border-amber-500 pl-4 py-0.5 leading-snug">
              “Every great movement begins with people who are willing to build what others only imagine.”
            </p>

            <p>
              Dear BYOB Community,
            </p>
            <p>
              Welcome to the official companion newsletter of <strong>BYOB Magazine (Issue 02)</strong>. As we navigate rapid seasons of change in leadership, family, and marketplace culture, one thing remains immutable: God is searching for faithful, ordinary hands willing to do extraordinary work.
            </p>
            <p>
              In this edition, we honor our trailblazing women of faith, commemorate 29 years of steadfast pastoral legacy, and explore how business integrity can be our most vocal sermon. As you digest these reflections, take a moment to ask: <em>What is God calling you to build in your sphere of influence today?</em>
            </p>
          </div>

          {/* Signature Block */}
          <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="font-serif text-2xl font-bold text-stone-900 italic tracking-tight">
                — Marshia Salcedo
              </div>
              <div className="text-xs uppercase font-mono tracking-wider font-semibold text-amber-900">
                Publisher &amp; Executive Editor · MsUnique Media Group
              </div>
            </div>
            <a
              href="https://www.msunique.net/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-100/70 hover:bg-amber-200 border border-amber-300 px-3 py-1.5 rounded-lg transition-colors self-start sm:self-auto"
            >
              <span>Connect with Marshia</span>
              <ExternalLink className="w-3 h-3 text-amber-800" />
            </a>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: ISSUE 02 EDITORIAL HIGHLIGHTS (3-COLUMN SPREAD)
            ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Issue 02 Curated Highlights &amp; Insights</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Column 1: Women of Faith */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Feature 01
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">Proverbs 31:25</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  Ordinary Women, Extraordinary Calling
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  From executive boardroom decisions to silent household sacrifices, explore how Christian women build enduring kingdoms in the marketplace and home.
                </p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-xs font-semibold text-amber-800">
                <span>Key takeaway: Faith is forged on ordinary Tuesday afternoons.</span>
              </div>
            </div>

            {/* Column 2: 29th Pastoral Milestone */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Feature 02
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">1997–2026</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  29 Years of Steadfast Pastoral Legacy
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  Celebrating Pastor Arthur’s Silver-Plus Jubilee: starting with twelve cold folding chairs in 1997 to impacting thousands of lives across three decades.
                </p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-xs font-semibold text-amber-800">
                <span>Key takeaway: Never despise the day of small beginnings.</span>
              </div>
            </div>

            {/* Column 3: Marketplace Ministry */}
            <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:border-amber-400 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Feature 03
                  </span>
                  <span className="text-stone-400 font-mono text-[11px]">ReelTalk Audio</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                  Breaking Sacred vs Secular Silos
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  How faith-driven founders and corporate professionals turn ordinary 9-to-5 desks into sanctuaries of mentorship, fairness, and Kingdom innovation.
                </p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-xs font-semibold text-amber-800">
                <span>Key takeaway: Your workplace is an intentional mission field.</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: INTERACTIVE VOICE TRIBUTE SPOTLIGHT (DR. KIMBERLY CHEN)
            ========================================================================= */}
        <section className="bg-gradient-to-br from-[#1C1917] via-[#241F1C] to-stone-900 text-stone-100 rounded-2xl border border-amber-900/50 p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold">
              <Mic className="w-4 h-4 text-amber-400" />
              <span>Audio Highlight: Visionary Mentor Voice Tribute (0:28)</span>
            </div>
            <span className="text-xs font-mono text-stone-400">Dr. Kimberly Chen · Youth Enrichment Director</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <p className="font-serif text-base sm:text-lg text-stone-200 italic leading-relaxed">
                “Thank you for championing our young scholars and believing that ordinary children from our district carry extraordinary divine purpose. Your leadership has built a generational legacy.”
              </p>
              <div className="text-xs text-amber-300/80 font-mono">
                Spoken audio tribute recorded for Pastor Arthur's 29th Anniversary.
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-2">
              <button
                type="button"
                onClick={handleToggleVoice}
                className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-stone-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                title={isPlayingAudio ? "Pause Voice Message" : "Play Voice Message (0:28)"}
              >
                {isPlayingAudio ? (
                  <Pause className="w-6 h-6 fill-stone-950 text-stone-950" />
                ) : (
                  <Play className="w-6 h-6 fill-stone-950 text-stone-950 ml-0.5" />
                )}
              </button>

              <div className="text-center">
                <div className="text-xs font-mono font-semibold text-amber-200">
                  {isPlayingAudio ? 'Playing Tribute (0:28)' : 'Click to Listen'}
                </div>
                <div className="text-[11px] text-stone-400 font-sans">
                  Authentic Community Audio
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: SCRIPTURE ANCHOR & 3-DAY KINGDOM BUILDER CHALLENGE
            ========================================================================= */}
        <section className="bg-gradient-to-br from-[#FAF8F5] via-white to-amber-50/60 rounded-2xl border-2 border-amber-900/15 p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
              <Compass className="w-4 h-4 text-amber-700" />
              <span>Scripture Anchor &amp; Weekly Action Challenge</span>
            </div>
            <span className="text-xs font-mono text-amber-900 font-bold">Nehemiah 2:18</span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-amber-900/15 shadow-2xs space-y-2">
            <div className="text-xs uppercase font-mono tracking-wider font-semibold text-amber-900">
              Scripture Anchor
            </div>
            <blockquote className="font-serif text-lg sm:text-xl font-bold text-stone-900 italic leading-snug">
              “Then I told them of the hand of my God which was good upon me... And they said, Let us rise up and build. So they strengthened their hands for this good work.”
            </blockquote>
            <div className="text-xs text-stone-500 font-mono text-right">— Nehemiah 2:18 (KJV)</div>
          </div>

          {/* 3 Action Steps */}
          <div className="space-y-3">
            <div className="text-xs uppercase font-mono tracking-widest text-stone-600 font-bold">
              This Week’s 3 Kingdom Actions:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1">
                <div className="font-mono text-amber-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Action 01: Mentorship</span>
                </div>
                <p className="text-stone-600">
                  Encourage one younger professional, creator, or student in your sphere this week.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1">
                <div className="font-mono text-amber-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Action 02: Prayer Wall</span>
                </div>
                <p className="text-stone-600">
                  Lift up a local ministry, small business founder, or pastoral family by name in prayer.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-lg border border-stone-200 space-y-1">
                <div className="font-mono text-amber-800 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Action 03: Generosity</span>
                </div>
                <p className="text-stone-600">
                  Patronize or share a local faith-driven enterprise to build grassroots momentum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: COMMUNITY TESTIMONY HIGHLIGHTS
            ========================================================================= */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
              <Heart className="w-4 h-4 text-amber-700" />
              <span>Community Miracles &amp; Testimonies</span>
            </div>
            <span className="text-xs font-mono text-stone-500">Live Community Wall</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 font-sans">Evelyn Brooks</span>
                <span className="text-emerald-700 font-mono text-[11px] font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Praise Report
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic font-serif">
                “After 8 months of prayer and uncertainty, our family business finally reopened this week! God provided clients before we even advertised.”
              </p>
              <div className="text-[11px] text-stone-400 font-mono pt-1 border-t border-stone-100 flex items-center justify-between">
                <span>Faith Builders Fellowship</span>
                <span className="text-red-600">♥ 24 Amens</span>
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900 font-sans">Jordan Miller</span>
                <span className="text-amber-800 font-mono text-[11px] font-semibold bg-amber-50 px-2 py-0.5 rounded">
                  Answered Prayer
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 italic font-serif">
                “Spun the Scripture Spinner on Faithfulness and submitted my proposal for the low-income community clinic. God opened the doors immediately!”
              </p>
              <div className="text-[11px] text-stone-400 font-mono pt-1 border-t border-stone-100 flex items-center justify-between">
                <span>Civic Architecture Guild</span>
                <span className="text-red-600">♥ 19 Amens</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: SUBMIT A PRAYER OR PRAISE (INTERACTIVE FORM)
            ========================================================================= */}
        <section className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <div className="text-xs uppercase font-mono tracking-wider font-bold text-amber-900 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-amber-700" />
              <span>Submit a Prayer Request or Testimony</span>
            </div>
            <span className="text-xs text-stone-500 font-sans">Confidential &amp; Fellowship Sharing</span>
          </div>

          {prayerSubmitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <strong>Thank you!</strong> Your request has been received. Our intercessory prayer team stands in agreement with you.
              </div>
            </div>
          ) : (
            <form onSubmit={handlePrayerSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Family Name"
                  value={prayerName}
                  onChange={(e) => setPrayerName(e.target.value)}
                  className="px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <input
                  type="text"
                  placeholder="City / Ministry or Business Name"
                  className="px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <textarea
                rows={2}
                required
                placeholder="Share your prayer request, milestone celebration, or testimony with us..."
                value={prayerText}
                onChange={(e) => setPrayerText(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-stone-500 font-sans">
                  Encouraging believers across the BYOB network.
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request</span>
                </button>
              </div>
            </form>
          )}
        </section>

        {/* =========================================================================
            SECTION 7: REELTALK PODCAST EPISODE GUIDE
            ========================================================================= */}
        <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 space-y-5 border border-amber-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800 pb-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-400 font-bold">
              <Radio className="w-4 h-4 text-amber-400" />
              <span>ReelTalk Podcast with Marshia Salcedo</span>
            </div>
            <a
              href="https://www.youtube.com/@MsUnique2.0_friendraiser"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-white transition-colors"
            >
              <span>Watch on YouTube 🎬</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-2">
              <div className="font-mono text-amber-400 font-bold">Ep. 01 · 1:28</div>
              <h4 className="font-serif text-sm font-bold text-white">Friend Breakups</h4>
              <p className="text-stone-400 leading-relaxed">
                When seasons change &amp; circles shift without an argument. Releasing relationships with spiritual grace.
              </p>
            </div>

            <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-2">
              <div className="font-mono text-amber-400 font-bold">Ep. 02 · 1:06</div>
              <h4 className="font-serif text-sm font-bold text-white">Marketplace Ministry</h4>
              <p className="text-stone-400 leading-relaxed">
                Transforming corporate workspaces and everyday businesses into Kingdom mission fields of integrity.
              </p>
            </div>

            <div className="p-4 bg-stone-950/80 rounded-xl border border-stone-800 space-y-2">
              <div className="font-mono text-amber-400 font-bold">Ep. 03 · 1:14</div>
              <h4 className="font-serif text-sm font-bold text-white">Radical Obedience</h4>
              <p className="text-stone-400 leading-relaxed">
                Building debt-free foundations, sacrificial generosity, and enduring pastoral vision in community building.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: WEEKLY DISPATCH SUBSCRIPTION BOX
            ========================================================================= */}
        <section className="bg-gradient-to-tr from-amber-900 via-amber-800 to-amber-700 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-semibold bg-white/15 text-amber-200 border border-white/20">
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>Complimentary Digital Enrollment</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Receive the BYOB Community Newsletter Weekly
            </h3>

            <p className="text-amber-100 text-sm sm:text-base font-sans leading-relaxed">
              Join faith-driven entrepreneurs, community leaders, and believers who receive our curated weekly reflections, podcast teasers, and Kingdom growth tools directly in their inbox.
            </p>

            {subscribedToast ? (
              <div className="p-4 bg-white/20 backdrop-blur-md border border-white/40 rounded-xl text-white text-xs sm:text-sm flex items-center gap-2 animate-fadeIn">
                <Check className="w-5 h-5 text-emerald-300 shrink-0" />
                <span>
                  <strong>Hallelujah &amp; Welcome!</strong> You are enrolled to receive the BYOB Community Newsletter.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your best email address..."
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-xs sm:text-sm text-stone-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300 placeholder-stone-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-stone-950 bg-amber-300 hover:bg-amber-200 rounded-lg shadow-sm transition-all cursor-pointer font-sans whitespace-nowrap"
                >
                  Subscribe Free
                </button>
              </form>
            )}

            <div className="flex items-center gap-4 text-xs text-amber-200/80 pt-1 font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>100% Free · No Spam Ever</span>
              </span>
              <span>·</span>
              <span>Unsubscribe Anytime</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            NEWSLETTER FOOTER & OFFICIAL LINKS
            ========================================================================= */}
        <footer className="pt-8 border-t border-stone-200 text-center space-y-5 text-stone-600 text-xs">
          <div className="flex justify-center items-center gap-4 text-stone-700">
            <a
              href="https://www.youtube.com/@MsUnique2.0_friendraiser"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white hover:bg-amber-100 rounded-full border border-stone-200 transition-colors"
              title="YouTube"
            >
              <Youtube className="w-4 h-4 text-amber-800" />
            </a>
            <a
              href="https://www.facebook.com/marshia.salcedo/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white hover:bg-amber-100 rounded-full border border-stone-200 transition-colors"
              title="Facebook"
            >
              <Facebook className="w-4 h-4 text-amber-800" />
            </a>
            <a
              href="https://www.instagram.com/marshia.salcedo/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white hover:bg-amber-100 rounded-full border border-stone-200 transition-colors"
              title="Instagram"
            >
              <Instagram className="w-4 h-4 text-amber-800" />
            </a>
            <a
              href="https://www.msunique.net/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white hover:bg-amber-100 rounded-full border border-stone-200 transition-colors"
              title="Contact Page"
            >
              <Mail className="w-4 h-4 text-amber-800" />
            </a>
          </div>

          <div className="space-y-1">
            <div className="font-serif font-bold text-stone-900 text-sm">
              BYOB Magazine · Build Your Own Belief
            </div>
            <p>
              A MsUnique Media Group Publication · Produced by Marshia Salcedo, Publisher &amp; Executive Editor
            </p>
            <p className="text-stone-500 font-mono text-[11px]">
              &copy; 2026 MsUnique Media. All rights reserved.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                playTickSound();
                onBackToMagazine();
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-950 underline decoration-amber-400 underline-offset-4 cursor-pointer"
            >
              <span>← Return to BYOB Magazine Interactive Reader</span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
}
