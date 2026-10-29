import { useState } from 'react';
import { X, Volume2, VolumeX, Bookmark, Check, Share2, Radio, Headphones, ExternalLink } from 'lucide-react';
import { playChimeSound, playTickSound } from '../utils/audio';
import grandpreneurCoverImg from '../assets/images/The-VIP-Grandpreneur-Experience.png';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onNavigate?: (screen: 6) => void;
}

export function StoryModal({ isOpen, onClose, onNext, onNavigate }: StoryModalProps) {
  const [isReading, setIsReading] = useState(false);
  const [reflectionText, setReflectionText] = useState('');
  const [savedReflection, setSavedReflection] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  if (!isOpen) return null;

  const toggleNarrator = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      window.speechSynthesis.cancel();
      const articleText =
        'Ordinary Women, Extraordinary Calling: Building the Kingdom in the Workplace and Home. By Marshia Salcedo, Editor-in-Chief. Key Scripture Anchor: Proverbs 31:25: Strength and dignity are her clothing, and she laughs at the time to come. The true backbone of God’s work in the earth has always been built on the quiet, steadfast obedience of ordinary women living out an extraordinary faith. Faith is not reserved for Sunday morning sermons—it is forged in every ordinary, Tuesday-afternoon decision to stand firmly on God’s Word.';
      const utterance = new SpeechSynthesisUtterance(articleText);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  const handleSaveReflection = () => {
    playChimeSound();
    setSavedReflection(true);
    setTimeout(() => setSavedReflection(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-[#FAF8F5] w-full max-w-4xl rounded-xl border border-stone-300 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-widest text-amber-800 font-bold">
              Full Feature Story
            </span>
            <span className="text-stone-300">|</span>
            <span className="text-xs text-stone-500 hidden sm:inline">6 min read</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-white border border-stone-200 rounded-md hover:bg-stone-100"
              title="Toggle reading font size"
            >
              Aa {fontSize === 'normal' ? 'Large' : 'Normal'}
            </button>

            <button
              onClick={toggleNarrator}
              className="p-1.5 text-stone-700 hover:text-stone-950 bg-white border border-stone-200 rounded-md hover:bg-stone-100"
              title={isReading ? 'Stop Narration' : 'Listen to Audio Narration'}
            >
              {isReading ? <VolumeX className="w-4 h-4 text-amber-700" /> : <Volume2 className="w-4 h-4 text-stone-600" />}
            </button>

            <button
              onClick={() => {
                if (isReading && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                onClose();
              }}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200/60 transition-colors"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Grandpreneur Cover Image Banner at Top of Article */}
          <div className="w-full max-w-xl mx-auto overflow-hidden rounded-xl border border-stone-200 shadow-md bg-stone-100 flex justify-center">
            <img
              src={grandpreneurCoverImg || '/assets/images/The-VIP-Grandpreneur-Experience.png'}
              alt="The VIP Grandpreneur Experience Cover — Women of Faith Feature"
              className="w-full h-auto object-contain block"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                if (!target.src.includes('The-VIP-Grandpreneur-Experience.png')) {
                  target.src = '/assets/images/The-VIP-Grandpreneur-Experience.png';
                } else if (!target.src.includes('postimg.cc')) {
                  target.src = "https://i.postimg.cc/dJmzPYm5/The-VIP-Grandpreneur-Experience.png";
                }
              }}
            />
          </div>

          {/* Article Header */}
          <div className="space-y-3 pb-6 border-b border-stone-200">
            <div className="text-xs uppercase tracking-widest text-amber-800 font-sans font-semibold">
              FEATURE ARTICLE: ISSUE 02 · Kingdom Builders Series
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
              Ordinary Women, Extraordinary Calling: Building the Kingdom in the Workplace and Home
            </h2>
            <div className="text-sm font-serif italic text-stone-700">
              By Marshia Salcedo, Editor-in-Chief
            </div>
            <div className="text-xs text-stone-500 font-sans">
              BYOB Magazine — Issue 02 | Kingdom Builders Series · October 2026 Edition
            </div>
          </div>

          {/* Key Scripture Anchor Banner */}
          <div className="p-6 bg-stone-100 rounded-lg border border-stone-200">
            <div className="text-xs uppercase tracking-widest font-mono text-amber-800 font-bold mb-1">
              Key Scripture Anchor
            </div>
            <p className="font-serif text-xl sm:text-2xl font-medium text-stone-900 italic">
              “Strength and dignity are her clothing, and she laughs at the time to come.”
            </p>
            <div className="text-right text-xs uppercase tracking-wider text-stone-500 mt-2 font-sans font-semibold">
              — Proverbs 31:25
            </div>
          </div>

          {/* Article Body */}
          <div className={`space-y-6 text-stone-800 leading-relaxed ${fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
            <h3 className="font-serif text-2xl font-bold text-stone-900 pt-2">
              The Unseen Altar of Everyday Life
            </h3>
            <p className="first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-amber-900">
              When we think of “Kingdom Builders,” our minds often default to historical heroes, global evangelists, or those standing behind a church pulpit. But the true backbone of God’s work in the earth has always been built on the quiet, steadfast obedience of ordinary women living out an extraordinary faith. A Kingdom Builder is not defined by the size of her platform, but by the posture of her heart. She is the mother praying over her children before the school bus arrives; the executive bringing integrity and grace into a tense corporate boardroom; the entrepreneur dedicating her business profits to local outreach; and the volunteer serving faithfully when no lights or cameras are flashing.
            </p>

            <blockquote className="my-8 py-5 px-6 border-y border-stone-300 text-center font-serif text-xl sm:text-2xl italic text-amber-950 bg-amber-50/50">
              “Faith isn’t reserved for Sunday morning sermons—it is forged in every ordinary, Tuesday-afternoon decision to stand firmly on God’s Word.”
            </blockquote>

            <h3 className="font-serif text-2xl font-bold text-stone-900 pt-3">
              1. Faith in the Daily Grind: Redefining Ministry
            </h3>
            <p>
              Too often, women feel a tension between sacred calling and secular responsibilities. We split our lives into silos: “church work” on one side, and “daily survival” on the other. But in God’s blueprint, every space you occupy is a mission field.
            </p>
            <p>
              When you walk into your workplace, your home, or your neighborhood with the Holy Spirit inside you, the atmosphere changes. Your professional excellence becomes your testimony. Your patience in crisis becomes an invitation for others to seek the peace you carry.
            </p>
            <ul className="space-y-2.5 pl-4 border-l-2 border-amber-700/40 my-4 text-stone-800">
              <li>
                <strong>In Business & Career:</strong> Operating with uncompromising ethics, mentoring younger colleagues, and demonstrating Christ-like leadership under pressure.
              </li>
              <li>
                <strong>In Family & Home:</strong> Cultivating an atmosphere of peace, prayer, and spiritual stability that anchors the next generation.
              </li>
              <li>
                <strong>In Community:</strong> Extending hospitality, noticing the forgotten, and meeting practical needs with generous hands.
              </li>
            </ul>

            {/* Compact Callout Card: Listen to the Latest ReelTalk */}
            <div className="my-6 p-4 sm:p-5 bg-[#181614] text-stone-100 rounded-xl border border-amber-900/60 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/60">
                      ReelTalk Podcast Callout
                    </span>
                    <span className="text-xs text-stone-400 font-mono">28 min episode</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white leading-snug">
                    Building Your Next Chapter with Boldness
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans line-clamp-1">
                    Hosted by Marshia Salcedo · Candid conversations on marketplace faith and leadership.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                <button
                  type="button"
                  onClick={() => {
                    playTickSound();
                    if (isReading && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                    onClose();
                    if (onNavigate) {
                      onNavigate(6);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-xs"
                >
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Listen to ReelTalk</span>
                </button>
              </div>
            </div>

            <h3 className="font-serif text-2xl font-bold text-stone-900 pt-3">
              2. Clothed in Strength & Dignity
            </h3>
            <p>
              Proverbs 31:25 offers a striking portrait of a woman of faith: <em>“Strength and dignity are her clothing, and she laughs at the time to come.”</em>
            </p>
            <p>
              To laugh at the future is not to ignore life’s realities or pretend challenges do not exist. It is the holy confidence of a woman who knows who holds her future.
            </p>
            <p>
              In a world plagued by anxiety, fear, and constant comparison, a woman anchored in God stands out. Her strength does not come from self-sufficiency or striving; it flows directly from her intimacy with the Father. When storms hit, she does not panic—she prays. When resources seem scarce, she remembers the Provider.
            </p>

            <h3 className="font-serif text-2xl font-bold text-stone-900 pt-3">
              3. The Power of an Extraordinary “Yes”
            </h3>
            <p>
              Throughout biblical history, ordinary women stepped into extraordinary purpose simply by saying “yes” to God:
            </p>
            <ul className="space-y-2.5 pl-4 border-l-2 border-amber-700/40 my-4 text-stone-800">
              <li>
                <strong>Hannah</strong> surrendered her personal grief in prayer, trusting God with a promise that birthed a prophet (1 Samuel 1).
              </li>
              <li>
                <strong>Deborah</strong> stepped up with bold counsel and strategic leadership when her nation needed direction (Judges 4).
              </li>
              <li>
                <strong>Lydia</strong> dedicated her successful business in purple cloth to open her home and support the early Church (Acts 16).
              </li>
            </ul>
            <p>
              None of these women started as famous figures. They were ordinary women who allowed God to use their current skills, resources, and prayers to build something far bigger than themselves.
            </p>

            {/* Kingdom Builder Reflection & Action Step */}
            <div className="mt-8 p-6 bg-stone-100 rounded-lg border border-stone-300 space-y-4">
              <div className="flex items-center gap-2 text-stone-900">
                <Bookmark className="w-5 h-5 text-amber-800" />
                <h4 className="font-serif text-xl font-bold">
                  Kingdom Builder Reflection & Action Step
                </h4>
              </div>
              <p className="text-sm text-stone-700">
                As you read this issue of BYOB Magazine, take a moment to evaluate your own sphere of influence:
              </p>
              <div className="space-y-2 text-sm text-stone-800">
                <div className="p-3 bg-white rounded border border-stone-200">
                  <strong>1. Identify Your Ground:</strong> What “ordinary” setting has God placed you in right now (your job, family, school, community)?
                </div>
                <div className="p-3 bg-white rounded border border-stone-200">
                  <strong>2. Offer Your Tools:</strong> What gifts, skills, or resources can you dedicate to God’s service today?
                </div>
                <div className="p-3 bg-white rounded border border-stone-200">
                  <strong>3. Take One Action Step:</strong> Reach out to one woman in your circle this week—encourage her, pray with her, or support her in her journey.
                </div>
              </div>

              {/* Personal Reader Journal Box */}
              <div className="pt-2 space-y-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Your Personal Journal & Commitment:
                </label>
                <textarea
                  value={reflectionText}
                  onChange={(e) => setReflectionText(e.target.value)}
                  placeholder="Record your sphere of influence, tools, or the person you will reach out to this week..."
                  rows={3}
                  className="w-full p-3 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    {savedReflection ? 'Reflection saved to your journal.' : 'Private to your session.'}
                  </span>
                  <button
                    onClick={handleSaveReflection}
                    disabled={!reflectionText.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 disabled:opacity-50 rounded-md transition-colors"
                  >
                    {savedReflection ? <Check className="w-4 h-4" /> : null}
                    <span>{savedReflection ? 'Saved to Journal' : 'Save Reflection'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Editor-in-Chief Sign-Off Quote */}
            <div className="my-8 p-6 bg-amber-50 rounded-lg border border-amber-200 text-center space-y-2">
              <p className="font-serif text-lg sm:text-xl italic font-medium text-amber-950">
                “You are not just holding down a job or managing a home—you are actively constructing a legacy of faith that will outlive you. Keep building.”
              </p>
              <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold pt-1">
                — Marshia Salcedo, Editor-in-Chief
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-stone-200 bg-stone-50">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 text-xs sm:text-sm font-medium text-stone-700 bg-white border border-stone-300 hover:bg-stone-100 rounded-md"
          >
            Back to Feature Overview
          </button>
          <button
            onClick={() => {
              if (isReading && typeof window !== 'undefined' && 'speechSynthesis' in window) {
                window.speechSynthesis.cancel();
              }
              onClose();
              playTickSound();
              onNext();
            }}
            className="w-full sm:w-auto px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-colors"
          >
            NEXT: SCRIPTURE SPINNER ➔
          </button>
        </div>
      </div>
    </div>
  );
}
