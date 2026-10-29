import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Award, Calendar, Check, Heart, MessageSquare, Quote, Sparkles, ChevronRight, Mic, Volume2, Play, Pause } from 'lucide-react';
import { TIMELINE_MILESTONES, INITIAL_CONGRATULATORY_NOTES } from '../data/magazineData';
import { CongratulatoryNote, ScreenId } from '../types/magazine';
import { CongratulatoryModal } from './CongratulatoryModal';
import { SubscribeBanner } from './SubscribeBanner';
import { playTickSound, playChimeSound } from '../utils/audio';
import multimediaBundleImg from '../assets/images/The-Multimedia-Spotlight-Bundle.png';
import pastorAnniversaryImg from '../assets/images/pastor_anniversary_1792624673820.jpg';

interface Screen4PastorTimelineProps {
  onNext: () => void;
  onNavigate?: (screen: ScreenId) => void;
}

export function Screen4PastorTimeline({ onNext, onNavigate }: Screen4PastorTimelineProps) {
  const [selectedMilestoneYear, setSelectedMilestoneYear] = useState<string>('2026');
  const [notes, setNotes] = useState<CongratulatoryNote[]>(INITIAL_CONGRATULATORY_NOTES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedNoteIds, setLikedNoteIds] = useState<Record<string, boolean>>({});
  const [playingNoteId, setPlayingNoteId] = useState<string | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
        voiceAudioRef.current = null;
      }
    };
  }, []);

  const handleToggleVoiceMessage = (note: CongratulatoryNote) => {
    playTickSound();
    if (playingNoteId === note.id) {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      setPlayingNoteId(null);
      return;
    }

    if (note.voiceAudioUrl) {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      const audio = new Audio(note.voiceAudioUrl);
      voiceAudioRef.current = audio;
      audio.onended = () => {
        setPlayingNoteId(null);
      };
      audio.onerror = () => {
        setPlayingNoteId(null);
      };
      audio.play().then(() => {
        setPlayingNoteId(note.id);
      }).catch((err) => {
        console.warn('Voice message playback error:', err);
        setPlayingNoteId(null);
      });
    } else {
      playChimeSound();
      setPlayingNoteId(note.id);
      setTimeout(() => setPlayingNoteId(null), 3500);
    }
  };

  const activeMilestone =
    TIMELINE_MILESTONES.find((m) => m.year === selectedMilestoneYear) || TIMELINE_MILESTONES[3];

  const handleOpenModal = () => {
    playChimeSound();
    setIsModalOpen(true);
  };

  const handleAddNote = (newNoteData: Omit<CongratulatoryNote, 'id' | 'date'>) => {
    const newNote: CongratulatoryNote = {
      id: `note-${Date.now()}`,
      author: newNoteData.author,
      roleOrRelation: newNoteData.roleOrRelation,
      message: newNoteData.message,
      badge: newNoteData.badge,
      date: 'Just now',
      isVoiceMessage: newNoteData.isVoiceMessage,
      voiceAudioUrl: newNoteData.voiceAudioUrl,
      voiceDuration: newNoteData.voiceDuration,
    };
    setNotes([newNote, ...notes]);
  };

  const toggleLikeNote = (id: string) => {
    playTickSound();
    setLikedNoteIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen Header Badge */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-700 font-bold">SCREEN 04 OF 05</span>
          <span aria-hidden="true">·</span>
          <span>PASTOR FEATURE</span>
          <span aria-hidden="true">·</span>
          <span>29TH ANNIVERSARY TIMELINE</span>
        </div>
        <div className="flex items-center gap-2">
          <span>1997–2026</span>
          <span aria-hidden="true">·</span>
          <span>Silver-Plus Jubilee</span>
          <span aria-hidden="true">·</span>
          <span>{notes.length} Congratulatory Notes</span>
        </div>
      </div>

      {/* Multimedia Spotlight Bundle Full-Width Header Image */}
      <div className="w-full max-w-2xl mx-auto mb-8 sm:mb-10 overflow-hidden rounded-2xl border border-stone-200 shadow-lg bg-stone-100 flex justify-center">
        <img
          src={multimediaBundleImg || '/assets/images/The-Multimedia-Spotlight-Bundle.png'}
          alt="The Multimedia Spotlight Bundle — Pastor 29th Anniversary Feature"
          className="w-full h-auto object-contain block"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.src.includes('The-Multimedia-Spotlight-Bundle.png')) {
              target.src = '/assets/images/The-Multimedia-Spotlight-Bundle.png';
            } else if (!target.src.includes('postimg.cc')) {
              target.src = "https://i.postimg.cc/Fhg254gD/The-Multimedia-Spotlight-Bundle.png";
            }
          }}
        />
      </div>

      {/* Main Feature Header */}
      <div className="max-w-4xl space-y-3 mb-8">
        <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold font-mono flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-700" />
          <span>FEATURE ARTICLE: ISSUE 02 · Kingdom Builders Series</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          Celebrating 29 Years of Faithfulness: A Legacy of Extraordinary Faith
        </h1>
        <div className="text-sm sm:text-base font-serif italic text-stone-700">
          By Marshia Salcedo, Editor-in-Chief
        </div>
        <div className="text-xs text-stone-500 font-sans">
          BYOB Magazine — Issue 02 | Kingdom Builders Series · Honoring Pastoral Leadership & Community Impact (1997–2026)
        </div>
      </div>

      {/* Hero Documentary Media & Anniversary Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
        <div className="lg:col-span-7">
          <div className="relative rounded-lg overflow-hidden border border-stone-300 shadow-lg bg-stone-900">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={pastorAnniversaryImg || '/assets/images/pastor_anniversary_1792624673820.jpg'}
                alt="Celebrating 29 Years of Faithful Ministry - Pastor and Congregation"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('pastor_anniversary_1792624673820.jpg')) {
                    target.src = '/assets/images/pastor_anniversary_1792624673820.jpg';
                  } else if (!target.src.includes('unsplash.com')) {
                    target.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80";
                  }
                }}
              />
            </div>
            <div className="p-4 bg-stone-900/90 text-stone-200 text-xs flex justify-between items-center border-t border-stone-800">
              <span className="font-serif italic">Sanctuary Thanksgiving Service · Silver-Plus Jubilee Celebration</span>
              <span className="font-mono text-amber-400">1997 – 2026</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 bg-white border border-stone-200 rounded-lg shadow-xs space-y-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-500">
              The Shepherd’s Heart: 29 Years of Steadfast Servant Leadership
            </div>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              True Kingdom building is rarely an overnight success; it is a lifetime of quiet obedience, relentless prayer,
              and unwavering devotion. As we celebrate 29 years of pastoral ministry, we honor a journey that exemplifies
              what happens when an ordinary servant yields entirely to an extraordinary God.
            </p>
            <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
              For nearly three decades, our pastor has led not merely with words, but through an enduring example of faith,
              integrity, and sacrificial love. From modest storefront beginnings to a thriving ministry ecosystem, the story of
              this ministry is a testament to God's promise: “He who began a good work in you will carry it on to completion.”
            </p>
            <div className="p-4 bg-amber-50/60 rounded-md border border-amber-200/70 space-y-1">
              <div className="text-xs uppercase tracking-wider font-bold text-amber-900">
                Scripture Anchor
              </div>
              <p className="font-serif text-sm sm:text-base italic text-amber-950 font-medium">
                “Remember your leaders, those who spoke to you the word of God. Consider the outcome of their way of life, and imitate their faith.”
              </p>
              <div className="text-right text-xs text-amber-800 font-semibold pt-1">
                — Hebrews 13:7
              </div>
            </div>
          </div>

          {/* Leave Your Personal Tribute Callout */}
          <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-200/90 space-y-1.5 shadow-xs">
            <div className="text-xs uppercase tracking-wider font-bold text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Leave Your Personal Tribute</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic">
              “How has the pastor's teaching or leadership impacted your faith journey over the years? Tap <strong className="font-semibold text-stone-900">[ LEAVE A CONGRATULATORY NOTE ]</strong> in the app to record your tribute, voice message, or prayer for the anniversary wall.”
            </p>
          </div>

          {/* Interactive CTAs Bar as specified */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            <button
              onClick={handleOpenModal}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-900 bg-white hover:bg-stone-50 border-2 border-stone-800 rounded-lg shadow-xs hover:shadow-md transition-all"
            >
              <MessageSquare className="w-4 h-4 text-amber-800" />
              <span>LEAVE A CONGRATULATORY NOTE</span>
            </button>

            <button
              onClick={() => {
                playTickSound();
                onNext();
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-md hover:shadow-lg transition-all group"
            >
              <span>NEXT: CONNECT & PRAY</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Section */}
      <section className="mb-14">
        <div className="flex items-center justify-between pb-3 mb-6 border-b border-stone-200">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Interactive 29-Year Chronicle
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Select any year to explore archival photographs, testimonies, and impact metrics.
            </p>
          </div>
          <span className="text-xs uppercase tracking-widest text-stone-500 font-mono hidden sm:inline">
            1997 · 2005 · 2015 · 2026
          </span>
        </div>

        {/* Milestone Buttons Rail */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {TIMELINE_MILESTONES.map((m) => {
            const isSelected = selectedMilestoneYear === m.year;
            return (
              <button
                key={m.year}
                onClick={() => {
                  playTickSound();
                  setSelectedMilestoneYear(m.year);
                }}
                className={`p-4 text-left rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-amber-900 text-white border-amber-900 shadow-md transform -translate-y-0.5'
                    : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400 hover:bg-amber-50/30'
                }`}
              >
                <div className={`text-2xl font-serif font-bold ${isSelected ? 'text-amber-200' : 'text-amber-800'}`}>
                  {m.year}
                </div>
                <div className={`text-xs font-semibold mt-1 line-clamp-1 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                  {m.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Milestone Display Card */}
        <div className="p-6 sm:p-8 bg-white border border-stone-200 rounded-xl shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-800 font-mono font-bold">
                Year {activeMilestone.year} Milestone
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-0.5">
                {activeMilestone.title}
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium italic">
              • {activeMilestone.tagline}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
                {activeMilestone.description}
              </p>

              <blockquote className="p-4 bg-stone-50 rounded-lg border-l-3 border-amber-700 text-sm font-serif italic text-stone-800">
                {activeMilestone.archivalQuote}
              </blockquote>

              <div className="text-xs text-stone-500 font-medium">
                <strong>Scripture Anchor:</strong> {activeMilestone.scriptureAnchor}
              </div>
            </div>

            <div className="lg:col-span-5 bg-stone-50 p-5 rounded-lg border border-stone-200 space-y-3">
              <div className="text-xs uppercase tracking-wider font-bold text-stone-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Verified Historical Impact</span>
              </div>
              <ul className="space-y-2.5">
                {activeMilestone.impactMetrics.map((metric, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-stone-800">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Congratulatory Tribute & Community Reflection */}
      <div className="my-10 p-6 sm:p-8 bg-amber-50 rounded-xl border border-amber-200 text-center space-y-3">
        <div className="text-xs uppercase tracking-widest font-mono text-amber-900 font-bold">
          Congratulatory Tribute & Community Reflection
        </div>
        <p className="font-serif text-lg sm:text-xl italic font-medium text-amber-950 max-w-3xl mx-auto leading-relaxed">
          “Pastoral leadership is not about title or position; it is about pouring out one's life so others may drink deeply from the well of God's Word. Thank you for 29 years of faithful service, visionary leadership, and unwavering faith.”
        </p>
        <div className="text-xs uppercase tracking-widest text-amber-900 font-semibold pt-1">
          — Marshia Salcedo, Editor-in-Chief
        </div>
      </div>

      {/* Congratulatory Notes Board (Guestbook) */}
      <section className="mt-10 p-6 sm:p-8 bg-stone-100/70 border border-stone-200 rounded-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-300">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-800" />
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Anniversary Guestbook & Congratulatory Notes
              </h3>
            </div>
            <p className="text-xs text-stone-600 mt-1">
              Read community tributes or add your own personal blessing for Pastor Arthur.
            </p>
          </div>

          <button
            onClick={handleOpenModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>Add Congratulatory Note</span>
          </button>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => {
            const isLiked = !!likedNoteIds[note.id];
            return (
              <div
                key={note.id}
                className="p-5 bg-white border border-stone-200 rounded-lg shadow-xs flex flex-col justify-between space-y-4 hover:border-amber-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-mono text-amber-800 font-semibold">{note.badge}</span>
                    <span>{note.date}</span>
                  </div>

                  {note.isVoiceMessage && (
                    <div className="p-2.5 bg-amber-50 rounded-md border border-amber-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleVoiceMessage(note)}
                          className="w-7 h-7 rounded-full bg-amber-800 hover:bg-amber-900 text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                          title={playingNoteId === note.id ? "Pause voice message" : "Play voice message"}
                          aria-label={playingNoteId === note.id ? "Pause voice message" : "Play voice message"}
                        >
                          {playingNoteId === note.id ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                        </button>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-950">
                          <Mic className="w-3.5 h-3.5 text-amber-700" />
                          <span>Voice Message ({note.voiceDuration || '0:28'})</span>
                        </div>
                      </div>

                      {playingNoteId === note.id && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-amber-800 font-semibold uppercase">Playing</span>
                          <span className="flex items-center gap-0.5 text-amber-700">
                            <span className="w-1 h-3 bg-amber-700 animate-pulse rounded-full" />
                            <span className="w-1 h-4 bg-amber-700 animate-pulse delay-75 rounded-full" />
                            <span className="w-1 h-2 bg-amber-700 animate-pulse delay-150 rounded-full" />
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-stone-800 font-serif italic leading-relaxed">
                    “{note.message}”
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">{note.author}</div>
                    <div className="text-[11px] text-stone-500">{note.roleOrRelation}</div>
                  </div>
                  <button
                    onClick={() => toggleLikeNote(note.id)}
                    className="p-1.5 text-stone-400 hover:text-red-600 transition-colors"
                    title="Send heartfelt Amen"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600 text-red-600' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* In-Article Sponsor Invitation Card */}
      <section aria-label="Sponsor Invitation" className="p-5 sm:p-6 rounded-xl bg-[#181615] text-stone-200 border border-amber-900/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
        
        <div className="space-y-1 sm:max-w-xl">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            <Sparkles className="w-3 h-3" />
            <span>Kingdom Builders Partner Network</span>
          </div>
          <p className="font-serif text-sm sm:text-base text-white leading-snug">
            “Looking to reach our community? Reserve your spotlight in BYOB Magazine Issue 03. Tap 'Marketplace &amp; Ads' to view opportunities.”
          </p>
          <p className="text-xs text-stone-400">
            Open advertising slots for Texas businesses, ministries, and media partners.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playTickSound();
            if (onNavigate) onNavigate(7);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-sm shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <span>Marketplace &amp; Ads</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* Full-width Subscribe Call-to-Action Banner Card at Bottom of Article */}
      <SubscribeBanner
        onOpenSubscribePage={() => onNavigate && onNavigate(8)}
      />

      {/* Modal for adding congratulatory note */}
      <CongratulatoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddNote}
      />
    </div>
  );
}
