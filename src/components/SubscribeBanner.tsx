import { useState } from 'react';
import { Mail, Check, Sparkles, ArrowRight } from 'lucide-react';
import { playChimeSound, playTickSound } from '../utils/audio';

interface SubscribeBannerProps {
  onOpenSubscribePage?: () => void;
}

export function SubscribeBanner({ onOpenSubscribePage }: SubscribeBannerProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    playChimeSound();
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <section className="mt-12 sm:mt-16 w-full overflow-hidden rounded-2xl border border-amber-900/15 bg-gradient-to-br from-amber-50/80 via-white to-stone-100 p-6 sm:p-10 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Subscribe Image Artwork */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-stone-200/90 shadow-md bg-stone-900 group">
            <img
              src="/src/assets/images/Subscribe-BYOB.png"
              alt="Subscribe to BYOB Magazine — Build Your Own Belief"
              className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-102"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = 'https://i.postimg.cc/fMj6nNjf/Subscribe-BYOB.png';
              }}
            />
          </div>
        </div>

        {/* Right Column: Inspirational Heading, Invitation & Email Input Box */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-900 font-semibold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Join the Kingdom Builders Community</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
            Subscribe to BYOB Magazine
          </h3>

          <p className="font-serif italic text-base sm:text-lg text-amber-950/80 font-medium">
            “Build Your Own Belief — Transforming passive reading into an active, faith-building journey.”
          </p>

          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
            Never miss an issue. Receive digital editions, exclusive pastoral interviews, printable prayer journals,
            and weekly scripture challenges delivered directly to your inbox.
          </p>

          {isSubscribed ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-900 animate-fadeIn">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs sm:text-sm">
                <strong>Welcome to the BYOB Fellowship!</strong>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Your confirmation has been sent. Check your inbox for your digital reader welcome package!
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row gap-2 max-w-lg">
                <div className="relative flex-1">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-9 pr-3 py-3 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors shadow-sm whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
                >
                  Subscribe Now
                </button>
              </div>
              <div className="flex items-center justify-between text-[11px] text-stone-500 max-w-lg">
                <span>Free digital subscription · No spam ever</span>
                {onOpenSubscribePage && (
                  <button
                    type="button"
                    onClick={() => {
                      playTickSound();
                      onOpenSubscribePage();
                    }}
                    className="text-amber-800 font-semibold hover:underline inline-flex items-center gap-1"
                  >
                    <span>View full member benefits</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
