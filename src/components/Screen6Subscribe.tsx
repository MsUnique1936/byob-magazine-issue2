import { useState } from 'react';
import { Mail, Check, Sparkles, BookOpen, Heart, Bell, ShieldCheck, ArrowLeft, Send } from 'lucide-react';
import { ScreenId } from '../types/magazine';
import { playChimeSound, playTickSound } from '../utils/audio';
import subscribeHeroImg from '../assets/images/Subscribe-BYOB.png';

interface Screen6SubscribeProps {
  onNavigate: (screen: ScreenId) => void;
}

export function Screen6Subscribe({ onNavigate }: Screen6SubscribeProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'All Editions' | 'Monthly Digest'>('All Editions');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    playChimeSound();
    setIsSubscribed(true);
  };

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen Header Badge */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-700 font-bold">SCREEN 08 OF 08</span>
          <span aria-hidden="true">·</span>
          <span>BYOB MEMBERSHIP</span>
          <span aria-hidden="true">·</span>
          <span>SUBSCRIBE</span>
          <span aria-hidden="true">·</span>
          <span>BUILD YOUR OWN BELIEF</span>
        </div>
        <button
          onClick={() => {
            playTickSound();
            onNavigate(7);
          }}
          className="text-stone-600 hover:text-stone-900 flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous: Marketplace &amp; Ads</span>
        </button>
      </div>

      {/* 1. High-Resolution Subscribe Image Banner at Top with Matching Rounded Corners */}
      <div className="w-full max-w-2xl mx-auto mb-10 overflow-hidden rounded-2xl border border-stone-200 shadow-xl bg-stone-100 flex justify-center">
        <img
          src={subscribeHeroImg || '/assets/images/Subscribe-BYOB.png'}
          alt="Subscribe to BYOB Magazine — Build Your Own Belief"
          className="w-full h-auto object-contain block"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('Subscribe-BYOB.png')) {
              target.src = '/assets/images/Subscribe-BYOB.png';
            } else if (!target.src.includes('postimg.cc')) {
              target.src = 'https://i.postimg.cc/fMj6nNjf/Subscribe-BYOB.png';
            }
          }}
        />
      </div>

      {/* 2. Inspirational Heading Inviting Readers to Join BYOB Magazine */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold tracking-wide uppercase font-mono">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Official Reader Community</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          Join the Movement: Subscribe to BYOB Magazine
        </h1>

        <p className="font-serif text-lg sm:text-xl text-stone-700 italic">
          “Build Your Own Belief: Transforming passive reading into an active, faith-building journey.”
        </p>

        <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Every issue is created to ignite faith, equip kingdom builders in their everyday calling,
          and celebrate ordinary men and women of extraordinary dedication. Join thousands of readers worldwide.
        </p>
      </div>

      {/* 3. Subscription Form & Member Perks Card */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Form with Email Box and Subscribe Now Button */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-xl border border-stone-300 shadow-sm space-y-5">
          <div className="pb-3 border-b border-stone-200">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Reader Subscription Pass
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Complimentary digital delivery. Enter your email below to start receiving each edition.
            </p>
          </div>

          {isSubscribed ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                You Are Officially Subscribed!
              </h3>
              <p className="text-sm text-stone-700 leading-relaxed">
                Welcome to BYOB Magazine! A confirmation email and your Issue 02 Kingdom Builders companion guide
                have been dispatched to <strong>{email}</strong>.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    playTickSound();
                    onNavigate(2);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-colors"
                >
                  Continue Reading Feature Story
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Full Name (Optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Marshia, Sis. Deborah"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Delivery Frequency
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['All Editions', 'Monthly Digest'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFrequency(opt)}
                      className={`py-2 px-3 text-xs font-semibold rounded-md border text-center transition-colors ${
                        frequency === opt
                          ? 'bg-amber-800 text-white border-amber-800'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                >
                  <Send className="w-4 h-4" />
                  <span>Subscribe Now</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Your information is held in strict privacy. Unsubscribe anytime in one click.</span>
              </div>
            </form>
          )}
        </div>

        {/* Right Column: Subscriber Benefits Breakdown */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              What Subscribers Receive:
            </h3>

            <ul className="space-y-3 text-xs text-stone-700">
              <li className="flex items-start gap-2.5">
                <BookOpen className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong>Full Digital Issues:</strong> Instant access to new releases before public distribution.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong>Scripture Spinner Devotionals:</strong> Printable Kingdom Builder action worksheets and weekly reflections.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong>Community Prayer Network:</strong> Direct submission access to our global prayer team.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Bell className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <span><strong>Exclusive Executive Letters:</strong> Special theological commentary from Marshia Salcedo, Editor-in-Chief.</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-stone-200 text-center">
              <p className="font-serif italic text-xs text-stone-600">
                “Building a better world through faith & action.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
