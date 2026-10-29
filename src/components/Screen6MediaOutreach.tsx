import { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  HeartHandshake, 
  Users, 
  Video, 
  Film, 
  Check, 
  ArrowRight, 
  Volume2, 
  Volume1,
  VolumeX, 
  RotateCcw,
  Headphones,
  Award,
  Youtube
} from 'lucide-react';
import { ScreenId } from '../types/magazine';
import { playChimeSound, playTickSound } from '../utils/audio';

interface Screen6MediaOutreachProps {
  onNavigate: (screen: ScreenId) => void;
}

export function Screen6MediaOutreach({ onNavigate }: Screen6MediaOutreachProps) {
  // Dual-Layer Audio Player: Primary Episode Stream + Ambient Background Bed (25% volume)
  const episodeAudioRef = useRef<HTMLAudioElement | null>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(88);
  const [volume, setVolume] = useState(0.85);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [waveformPhase, setWaveformPhase] = useState(0);
  const [activeEpisodeId, setActiveEpisodeId] = useState(1);
  const [shareToast, setShareToast] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<number | 'custom'>(100);

  const episodes = [
    {
      id: 1,
      title: 'Ep. 01: Friend Breakups — When Seasons Change & Circles Shift',
      host: 'ReelTalk with Marshia Salcedo',
      duration: '1:28',
      durationDisplay: '1:28',
      durationSeconds: 88,
      tags: ['#FriendBreakups', '#Proverbs2717', '#SpiritualAlignment', '#ReelTalk'],
      summary: 'Proverbs 27:17 — When seasons change and circles shift without an argument ever happening. Releasing relationships with grace and stepping into spiritual alignment.',
      audioSrc: '/assets/aistudio/ReelTalk_Ep_01_-_Friend_Breakups_43b05427.mp4'
    },
    {
      id: 2,
      title: 'Ep. 02: Marketplace Ministry — Breaking Sacred vs Secular Silos',
      host: 'ReelTalk with Marshia Salcedo',
      duration: '1:06',
      durationDisplay: '1:06',
      durationSeconds: 66,
      tags: ['#MarketplaceMinistry', '#IntegrityInBusiness', '#PurposeDriven', '#ReelTalk'],
      summary: 'How everyday professionals transform corporate workplaces and 9-to-5 routines into mission fields of grace, innovation, and generational mentorship.',
      audioSrc: '/assets/aistudio/ReelTalk_Ep_02_Marketplace_Ministry_1d7b3ccc.mp4'
    },
    {
      id: 3,
      title: 'Ep. 03: Radical Obedience & Building Debt-Free Foundations',
      host: 'ReelTalk with Marshia Salcedo',
      duration: '1:14',
      durationDisplay: '1:14',
      durationSeconds: 74,
      tags: ['#RadicalObedience', '#Stewardship', '#KingdomFinance', '#ReelTalk'],
      summary: 'An intimate study on trusting God through early small beginnings, sacrificial generosity, and enduring pastoral vision in community building.',
      audioSrc: '/assets/aistudio/ReelTalk_Ep_03_Radical_Obedience_e40f6912.mp4'
    }
  ];

  const currentEpisode = episodes.find(e => e.id === activeEpisodeId) || episodes[0];

  // Sync dual audio element volume and mute states: primary episode at 100%, ambient bed at 25% volume
  useEffect(() => {
    if (episodeAudioRef.current) {
      episodeAudioRef.current.volume = isAudioMuted ? 0 : volume;
      episodeAudioRef.current.muted = isAudioMuted;
    }
    if (ambientAudioRef.current) {
      ambientAudioRef.current.volume = isAudioMuted ? 0 : volume * 0.25;
      ambientAudioRef.current.muted = isAudioMuted;
    }
  }, [volume, isAudioMuted]);

  // Animated Waveform Equalizer ticker when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setWaveformPhase(prev => (prev + 1) % 1000);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Dual-layer audio play / pause toggle
  const handleTogglePlay = async () => {
    if (isPlaying) {
      episodeAudioRef.current?.pause();
      ambientAudioRef.current?.pause();
      setIsPlaying(false);
      playTickSound();
    } else {
      try {
        if (episodeAudioRef.current) {
          episodeAudioRef.current.volume = isAudioMuted ? 0 : volume;
          await episodeAudioRef.current.play();
        }
        if (ambientAudioRef.current) {
          ambientAudioRef.current.volume = isAudioMuted ? 0 : volume * 0.25;
          await ambientAudioRef.current.play();
        }
        setIsPlaying(true);
        playChimeSound();
      } catch (err) {
        console.warn('Playback error, falling back to ambient track:', err);
        // If main episode stream is blocked or slow to buffer, start ambient track softly
        if (ambientAudioRef.current) {
          ambientAudioRef.current.volume = isAudioMuted ? 0 : volume * 0.25;
          ambientAudioRef.current.play().catch(() => {});
        }
        setIsPlaying(true);
        playChimeSound();
      }
    }
  };

  const handleTimeUpdate = () => {
    if (episodeAudioRef.current) {
      setCurrentTime(episodeAudioRef.current.currentTime);
      if (episodeAudioRef.current.duration && !isNaN(episodeAudioRef.current.duration)) {
        setDuration(episodeAudioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (episodeAudioRef.current && episodeAudioRef.current.duration && !isNaN(episodeAudioRef.current.duration)) {
      setDuration(episodeAudioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    ambientAudioRef.current?.pause();
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * (duration || 40);
    
    if (episodeAudioRef.current) {
      episodeAudioRef.current.currentTime = targetTime;
    }
    if (ambientAudioRef.current && ambientAudioRef.current.duration) {
      ambientAudioRef.current.currentTime = targetTime % ambientAudioRef.current.duration;
    }
    setCurrentTime(targetTime);
    playTickSound();
  };

  const handleRestart = () => {
    if (episodeAudioRef.current) {
      episodeAudioRef.current.currentTime = 0;
    }
    if (ambientAudioRef.current) {
      ambientAudioRef.current.currentTime = 0;
    }
    setCurrentTime(0);
    playTickSound();
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (newVol > 0 && isAudioMuted) {
      setIsAudioMuted(false);
    }
  };

  const handleToggleMute = () => {
    playTickSound();
    setIsAudioMuted(!isAudioMuted);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleShareEpisode = async () => {
    playTickSound();
    const shareData = {
      title: 'ReelTalk with Marshia Salcedo',
      text: `${currentEpisode.title} — BYOB Magazine & MsUnique Media`,
      url: 'https://www.youtube.com/@MsUnique2.0_friendraiser',
    };

    if (navigator.share && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`ReelTalk with Marshia Salcedo - ${currentEpisode.title}: https://www.youtube.com/@MsUnique2.0_friendraiser`);
    }
    setShareToast(true);
    setTimeout(() => setShareToast(false), 3500);
  };

  const handleSelectEpisode = async (epId: number) => {
    playTickSound();
    const ep = episodes.find(e => e.id === epId);
    if (!ep) return;

    setActiveEpisodeId(epId);
    setCurrentTime(0);
    setDuration(ep.durationSeconds);

    if (epId === activeEpisodeId && isPlaying) {
      if (episodeAudioRef.current) {
        episodeAudioRef.current.currentTime = 0;
      }
      return;
    }

    setIsPlaying(true);
    setTimeout(async () => {
      try {
        if (episodeAudioRef.current) {
          episodeAudioRef.current.currentTime = 0;
          episodeAudioRef.current.volume = isAudioMuted ? 0 : volume;
          await episodeAudioRef.current.play();
        }
        if (ambientAudioRef.current) {
          ambientAudioRef.current.volume = isAudioMuted ? 0 : volume * 0.25;
          if (ambientAudioRef.current.paused) {
            await ambientAudioRef.current.play();
          }
        }
        playChimeSound();
      } catch (err) {
        console.warn('Playback error upon episode selection:', err);
      }
    }, 60);
  };

  // Pillars of Friend-Raiser
  const pillars = [
    {
      id: 1,
      title: 'Youth & Creator Mentorship',
      icon: Users,
      description: 'Equipping next-generation storytellers, students, and digital creators with hands-on podcasting, ethical media training, and leadership bootcamps.',
      badge: 'Pillar 01',
      metric: '50+ Mentees Empowered'
    },
    {
      id: 2,
      title: 'Small Business Video Showcases',
      icon: Video,
      description: 'Producing cinematic video features and media kits for faith-driven entrepreneurs, community founders, and local small businesses to amplify their voice.',
      badge: 'Pillar 02',
      metric: '30+ Business Spotlights'
    },
    {
      id: 3,
      title: 'Faith-Based Media Production',
      icon: Film,
      description: 'Funding full-color print distribution of BYOB Magazine to community centers, churches, and prisons, paired with transformative digital programming.',
      badge: 'Pillar 03',
      metric: 'Kingdom Distribution'
    }
  ];

  // Calculate playback percentage for scrubber and active waveform
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Primary Episode Audio Stream */}
      <audio
        ref={episodeAudioRef}
        src={currentEpisode.audioSrc}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleAudioEnded}
      />

      {/* Ambient Instrumental Background Bed (Softly plays underneath at 25% volume) */}
      <audio
        ref={ambientAudioRef}
        src="/audio/reeltalk-ambient.wav"
        preload="auto"
        loop
      />

      {/* Screen Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 text-xs text-stone-500 gap-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-700 font-bold">SCREEN 06 OF 07</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-800 font-semibold uppercase tracking-wider">MEDIA &amp; OUTREACH HUB</span>
        </div>
        <div className="flex items-center gap-2">
          <span>MsUnique Media Group</span>
          <span aria-hidden="true">·</span>
          <span>ReelTalk Podcast</span>
          <span aria-hidden="true">·</span>
          <span>Community Friend-Raiser</span>
        </div>
      </div>

      {/* Hero Intro */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/70 border border-amber-300/80 rounded-full text-xs font-semibold text-amber-900 font-mono uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>Parent Ecosystem &amp; Kingdom Storytelling</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          Media in Motion: Amplifying Faith &amp; Community
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          Through <strong className="text-stone-900 font-semibold">MsUnique Media Group</strong>, we transcend the printed page into audio broadcasts, cinematic spotlights, and grassroots creator mentorship. Explore the latest from our podcast and partner with our community mission.
        </p>
      </div>

      {/* SECTION 1: REELTALK WITH MARSHIA PODCAST SHOWCASE */}
      <section aria-labelledby="reeltalk-heading" className="space-y-6">
        <div className="pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
            <Headphones className="w-4 h-4 text-amber-700" />
            <span>Audio Feature Spotlight</span>
          </div>
          <h2 id="reeltalk-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            ReelTalk Podcast: Real Stories, Kingdom Purpose &amp; Business Insights
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Hosted by Marshia Salcedo · Candid conversations with leaders, creators, and entrepreneurs.
          </p>
        </div>

        {/* Interactive Podcast Card (Luxury Black & Gold Editorial Aesthetic) */}
        <div className="relative bg-[#161412] text-stone-100 rounded-2xl border border-amber-900/40 p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
          {/* Subtle gold foil accent gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-600/15 via-amber-800/5 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Episode Details & Metadata */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-600/60 text-amber-300">
                  <Radio className="w-3.5 h-3.5 text-amber-400" />
                  <span>{isPlaying ? 'Live Streaming' : 'Interactive Player'}</span>
                </span>
                <span className="text-xs font-mono text-amber-200/70 bg-stone-900/80 px-2.5 py-1 rounded-md border border-stone-800">
                  {currentEpisode.duration} Episode
                </span>
                {currentEpisode.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono text-stone-400 bg-stone-900/50 px-2.5 py-1 rounded-md border border-stone-800/80">
                    {tag}
                  </span>
                ))}
              </div>

              <div>
                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-wider font-semibold text-amber-400 bg-amber-950/50 border border-amber-800/50 mb-2">
                  Show Host: {currentEpisode.host}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                  {currentEpisode.title}
                </h3>
                <p className="text-stone-300 text-sm sm:text-base leading-relaxed mt-3 font-sans border-l-2 border-amber-500/60 pl-3 italic">
                  {currentEpisode.summary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {/* Gold Button: Watch Teaser on ReelTalk YouTube 🎬 */}
                <a
                  href="https://www.youtube.com/@MsUnique2.0_friendraiser"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playChimeSound()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs sm:text-sm font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg hover:shadow-amber-500/20 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <Youtube className="w-4 h-4 text-stone-950 fill-stone-950" />
                  <span>Watch Teaser on ReelTalk YouTube 🎬</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Secondary Button: Share This Episode */}
                <button
                  type="button"
                  onClick={handleShareEpisode}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg text-xs sm:text-sm font-medium text-stone-200 bg-stone-900/90 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/50 transition-all shadow-xs"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>Share This Episode</span>
                </button>
              </div>

              {shareToast && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Episode link copied to clipboard! Share the inspiration.</span>
                </div>
              )}
            </div>

            {/* Right: Functional Audio Player with Active Animated Equalizer / Waveform & Volume Control */}
            <div className="lg:col-span-5 bg-stone-900/90 border border-amber-900/50 rounded-xl p-5 sm:p-6 shadow-xl space-y-5">
              {/* Player Top Bar: Status & Volume Control */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-stone-600'}`} />
                  <span className="text-xs font-mono tracking-wider uppercase text-amber-200">
                    {isPlaying ? 'Now Playing Stream' : 'Audio Player'}
                  </span>
                </div>

                {/* Volume Slider & Mute Toggle */}
                <div className="flex items-center gap-2 bg-stone-950/70 px-2.5 py-1 rounded-lg border border-stone-800">
                  <button
                    type="button"
                    onClick={handleToggleMute}
                    className="text-stone-400 hover:text-amber-300 transition-colors p-0.5"
                    title={isAudioMuted ? 'Unmute audio' : 'Mute audio'}
                    aria-label={isAudioMuted ? 'Unmute' : 'Mute'}
                  >
                    {isAudioMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-stone-500" />
                    ) : volume < 0.5 ? (
                      <Volume1 className="w-4 h-4 text-amber-400" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-amber-400" />
                    )}
                  </button>

                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isAudioMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-16 sm:w-20 accent-amber-400 cursor-pointer h-1.5 bg-stone-800 rounded-lg appearance-none"
                    aria-label="Volume Slider"
                  />
                  <span className="text-[10px] font-mono text-stone-400 min-w-[24px] text-right">
                    {Math.round((isAudioMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
              </div>

              {/* Active Animated Waveform / Equalizer Visualizer */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-amber-400" />
                    <span>Episode Stream + Ambient Bed (25% vol)</span>
                  </span>
                  <span className="text-amber-300/80">Dual-Layer Audio</span>
                </div>

                <div className="h-18 bg-stone-950/90 rounded-lg p-2.5 flex items-end justify-between gap-1 border border-stone-800/80 overflow-hidden">
                  {Array.from({ length: 28 }).map((_, index) => {
                    const baseHeights = [35, 60, 85, 45, 90, 70, 40, 100, 75, 55, 95, 65, 30, 80, 50, 90, 70, 40, 85, 60, 95, 55, 75, 45, 80, 65, 50, 35];
                    const baseHeight = baseHeights[index % baseHeights.length];

                    // Dynamic wave animation when playing
                    let dynamicHeight = baseHeight * 0.35;
                    if (isPlaying) {
                      const wave = Math.sin((waveformPhase * 0.25) + (index * 0.45));
                      const harmonic = Math.cos((waveformPhase * 0.15) + (index * 0.2));
                      const combined = (wave + harmonic) / 2;
                      dynamicHeight = Math.max(18, Math.min(100, baseHeight * (0.55 + combined * 0.45)));
                    }

                    const isPlayedBar = (index / 28) * 100 <= progressPercent;

                    return (
                      <div
                        key={index}
                        style={{ height: `${dynamicHeight}%` }}
                        className={`w-full rounded-full transition-all duration-150 ${
                          isPlayedBar 
                            ? 'bg-gradient-to-t from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_8px_rgba(245,158,11,0.6)]' 
                            : 'bg-stone-800/80'
                        } ${isPlaying ? 'opacity-100' : 'opacity-60'}`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Scrubber & Time */}
              <div className="space-y-1.5">
                <div 
                  className="relative w-full h-2.5 bg-stone-800 rounded-full cursor-pointer overflow-hidden group"
                  onClick={handleSeek}
                  title="Click to seek"
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={duration}
                  aria-valuenow={currentTime}
                  tabIndex={0}
                >
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 to-amber-300 transition-all rounded-full group-hover:from-amber-400 group-hover:to-amber-200"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                  <span className="text-amber-200">{formatTime(currentTime)}</span>
                  <span className="text-stone-400">{formatTime(duration)}</span>
                </div>
              </div>

              {/* Main Play/Pause Button Controls */}
              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-2 text-stone-400 hover:text-white transition-colors"
                  title="Restart track"
                  aria-label="Restart track"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 hover:from-amber-500 hover:to-amber-300 text-stone-950 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
                  aria-label={isPlaying ? 'Pause episode' : 'Play episode'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-stone-950 text-stone-950" />
                  ) : (
                    <Play className="w-6 h-6 fill-stone-950 text-stone-950 ml-0.5" />
                  )}
                </button>

                <div className="text-xs text-stone-300 font-mono">
                  {isPlaying ? 'Playing Audio' : 'Click Play'}
                </div>
              </div>
            </div>
          </div>

          {/* Episode Selectors */}
          <div className="mt-8 pt-6 border-t border-stone-800/80">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">
              Switch Episode Stream:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {episodes.map((ep) => {
                const isSelected = ep.id === activeEpisodeId;
                return (
                  <button
                    key={ep.id}
                    type="button"
                    onClick={() => handleSelectEpisode(ep.id)}
                    className={`p-3 text-left rounded-lg border transition-all text-xs cursor-pointer ${
                      isSelected
                        ? 'bg-amber-950/70 border-amber-500 text-white shadow-md ring-1 ring-amber-500/40'
                        : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:bg-stone-900 hover:text-stone-200'
                    }`}
                  >
                    <div className="font-semibold text-stone-200 line-clamp-1">{ep.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-amber-300/80 mt-1.5 font-mono">
                      <span>{ep.duration}</span>
                      <span className="flex items-center gap-1 font-sans">
                        {isSelected && isPlaying ? (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            Playing
                          </span>
                        ) : isSelected ? (
                          <span className="text-amber-300 font-medium">Selected</span>
                        ) : (
                          <span className="text-stone-400 group-hover:text-stone-200">Load &amp; Play ▶</span>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMMUNITY "FRIEND-RAISER" CAMPAIGN CARD */}
      <section aria-labelledby="friend-raiser-heading" className="space-y-6">
        <div className="pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-amber-800 font-bold">
            <HeartHandshake className="w-4 h-4 text-amber-700" />
            <span>Community Sponsorship &amp; Partnership</span>
          </div>
          <h2 id="friend-raiser-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Partner With Us: The BYOB Community Friend-Raiser
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            Empowering faith-forward media, youth training, and grassroots business amplification.
          </p>
        </div>

        {/* Friend-Raiser Main Feature Card */}
        <div className="bg-gradient-to-b from-[#FAF8F5] via-white to-amber-50/50 rounded-2xl border-2 border-stone-300 shadow-md p-6 sm:p-8 lg:p-10 space-y-8">
          {/* Mission Statement */}
          <div className="max-w-3xl space-y-3">
            <div className="text-xs uppercase font-mono tracking-widest text-amber-900 font-bold">
              Mission Statement
            </div>
            <blockquote className="font-serif text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
              “Help us amplify voices of faith, mentor rising entrepreneurs, and produce life-changing media for small businesses and ministries.”
            </blockquote>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              MsUnique Media Group believes no worthy story or calling should be silenced due to lack of resources. Through our Friend-Raiser initiative, partners like you directly fund professional production kits, video spotlights for small local ventures, and free printed magazines placed in community hands.
            </p>
          </div>

          {/* Three Impact Pillars (clean 3-column badge layout) */}
          <div className="space-y-3">
            <div className="text-xs uppercase font-mono tracking-wider font-bold text-stone-700 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-800" />
              <span>Three Impact Pillars</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                const isSelected = selectedPillar === pillar.id;

                return (
                  <div
                    key={pillar.id}
                    onClick={() => {
                      playTickSound();
                      setSelectedPillar(isSelected ? null : pillar.id);
                    }}
                    className={`cursor-pointer rounded-xl p-5 border transition-all text-left flex flex-col justify-between space-y-3 group ${
                      isSelected
                        ? 'bg-stone-900 text-white border-amber-600 shadow-lg scale-102'
                        : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded ${
                          isSelected ? 'bg-amber-400 text-stone-950' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {pillar.badge}
                        </span>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-amber-950 text-amber-400' : 'bg-stone-100 text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-900'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className={`font-serif text-lg font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                        {pillar.title}
                      </h3>

                      <p className={`text-xs leading-relaxed ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                        {pillar.description}
                      </p>
                    </div>

                    <div className={`pt-3 border-t text-[11px] font-semibold flex items-center justify-between ${
                      isSelected ? 'border-stone-800 text-amber-300' : 'border-stone-100 text-stone-500'
                    }`}>
                      <span>Verified Focus</span>
                      <span>{pillar.metric}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Seed / Partner Tier Calculator */}
          <div className="bg-stone-100/80 rounded-xl p-5 sm:p-6 border border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider font-bold text-stone-700">
                  Select Your Seed Offering
                </span>
                <p className="text-xs text-stone-500">
                  Choose a partnership level to support community media production.
                </p>
              </div>
              <span className="text-xs text-amber-900 font-serif italic">
                “God loves a cheerful and generous giver.”
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { amount: 25, label: '$25 Seed', desc: 'Magazine distribution' },
                { amount: 50, label: '$50 Advocate', desc: 'Youth workshop kit' },
                { amount: 100, label: '$100 Builder', desc: 'Podcast production grant' },
                { amount: 250, label: '$250 Vision Partner', desc: 'Business spotlight showcase' },
              ].map((tier) => (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => {
                    playTickSound();
                    setPledgeAmount(tier.amount);
                  }}
                  className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                    pledgeAmount === tier.amount
                      ? 'bg-amber-900 text-white border-amber-900 shadow-md transform -translate-y-0.5'
                      : 'bg-white text-stone-800 border-stone-200 hover:border-amber-400'
                  }`}
                >
                  <div className={`text-lg font-bold font-serif ${pledgeAmount === tier.amount ? 'text-amber-200' : 'text-stone-900'}`}>
                    {tier.label}
                  </div>
                  <div className={`text-[11px] mt-0.5 ${pledgeAmount === tier.amount ? 'text-stone-200' : 'text-stone-500'}`}>
                    {tier.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Call to Action Block */}
          <div className="pt-2 flex flex-col items-center text-center space-y-3">
            <a
              href="https://www.msunique.net"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playChimeSound()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <HeartHandshake className="w-5 h-5 text-amber-300" />
              <span>Sow into the Vision / Become a Friend-Raiser Partner</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <p className="text-xs text-stone-600 font-serif italic max-w-lg">
              “Every seed helps expand our community outreach across Texas and beyond.”
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Footer Controls */}
      <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            playTickSound();
            onNavigate(5);
          }}
          className="text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors cursor-pointer"
        >
          ← Previous: Connect &amp; Testimony Wall
        </button>

        <button
          type="button"
          onClick={() => {
            playTickSound();
            onNavigate(7);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-md transition-all group cursor-pointer"
        >
          <span>Next: Marketplace &amp; Ads</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
