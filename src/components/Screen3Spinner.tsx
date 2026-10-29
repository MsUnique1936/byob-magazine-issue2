import { useState, useRef, useEffect } from 'react';
import { ArrowRight, RotateCw, CheckCircle, Sparkles, Copy, Check, Heart, Shield, Award } from 'lucide-react';
import { SPINNER_RESULTS } from '../data/magazineData';
import { SpinnerResult } from '../types/magazine';
import { playTickSound, playChimeSound } from '../utils/audio';

interface Screen3SpinnerProps {
  onNext: () => void;
}

export function Screen3Spinner({ onNext }: Screen3SpinnerProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentResult, setCurrentResult] = useState<SpinnerResult | null>(null);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [commandInput, setCommandInput] = useState('');
  const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);
  const [completedNote, setCompletedNote] = useState('');
  const [copiedPrayer, setCopiedPrayer] = useState(false);
  const [totalSpins, setTotalSpins] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const rotationRef = useRef(0);
  const spinIntervalRef = useRef<number | null>(null);

  // Wheel slice geometry
  // 3 equal slices of 120 degrees each:
  // Slice 0: Courage (0° to 120°)
  // Slice 1: Faithfulness (120° to 240°)
  // Slice 2: Service (240° to 360°)
  // The pointer is at top (270° in standard Cartesian, or 0° at 12 o'clock).
  // If pointer is at 12 o'clock (0°), a rotation angle R points to slice index:
  // targetIndex = 0 (Courage), 1 (Faithfulness), 2 (Service)

  const triggerSpin = (forcedIndex?: number) => {
    if (isSpinning) return;

    setIsSpinning(true);
    setIsChallengeCompleted(false);

    // Pick random result if not forced
    const targetIdx = forcedIndex !== undefined
      ? forcedIndex
      : Math.floor(Math.random() * SPINNER_RESULTS.length);
    const selected = SPINNER_RESULTS[targetIdx];

    // Segment centers relative to 12 o'clock pointer:
    // Slices: 0 -> Courage (center at 60°), 1 -> Faithfulness (center at 180°), 2 -> Service (center at 300°)
    // To land on targetIdx at the top (0°), the wheel needs to rotate such that (360 - center) aligns with top:
    const sliceCenters = [60, 180, 300];
    const targetCenter = sliceCenters[targetIdx];
    // Add jitter within segment (+/- 25 deg)
    const jitter = (Math.random() - 0.5) * 40;
    const finalAngle = (360 - targetCenter + jitter + 360) % 360;

    // Minimum 5 full rotations (1800°) + current rotation baseline
    const fullSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const currentBase = rotationRef.current - (rotationRef.current % 360);
    const destinationRotation = currentBase + fullSpins + finalAngle;

    rotationRef.current = destinationRotation;
    setWheelRotation(destinationRotation);

    // Play periodic tick sounds during spin
    let tickCount = 0;
    if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    spinIntervalRef.current = window.setInterval(() => {
      tickCount++;
      if (tickCount < 25) {
        playTickSound();
      }
    }, 120);

    // Spin duration is 3.5 seconds
    setTimeout(() => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
      setIsSpinning(false);
      setCurrentResult(selected);
      setTotalSpins((prev) => prev + 1);
      playChimeSound();
    }, 3600);
  };

  useEffect(() => {
    return () => {
      if (spinIntervalRef.current) clearInterval(spinIntervalRef.current);
    };
  }, []);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = commandInput.trim().toUpperCase();
    if (clean === 'SPIN' || clean === 'SPIN WHEEL') {
      triggerSpin();
      setCommandInput('');
    } else if (clean === 'COURAGE') {
      triggerSpin(0);
      setCommandInput('');
    } else if (clean === 'FAITHFULNESS') {
      triggerSpin(1);
      setCommandInput('');
    } else if (clean === 'SERVICE') {
      triggerSpin(2);
      setCommandInput('');
    }
  };

  const handleCompleteChallenge = () => {
    playChimeSound();
    setIsChallengeCompleted(true);
    setCompletedCount((prev) => prev + 1);
  };

  const handleCopyPrayer = () => {
    if (!currentResult) return;
    navigator.clipboard.writeText(`${currentResult.prayerFocus} — Scripture: ${currentResult.scripture}`);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2500);
  };

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen Header Badge */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-700 font-bold">SCREEN 03 OF 05</span>
          <span aria-hidden="true">·</span>
          <span>INTERACTIVE COMPONENT</span>
          <span aria-hidden="true">·</span>
          <span>THE WORD WHEEL / SCRIPTURE SPINNER</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Active Journey</span>
          <span aria-hidden="true">·</span>
          <span>Spins: {totalSpins}</span>
          <span aria-hidden="true">·</span>
          <span>Completed: {completedCount}</span>
        </div>
      </div>

      {/* Title & Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold">
          Daily Interactive Spiritual Anchor
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          The Scripture Spinner
        </h1>
        <p className="text-sm sm:text-base text-stone-600">
          Click the spin trigger or type <code className="font-mono text-amber-800 bg-amber-50 px-1 py-0.5 rounded text-xs font-semibold">SPIN</code> to
          receive your randomized Kingdom Builder directive, daily challenge, and focused prayer.
        </p>
      </div>

      {/* Main Spinner Area: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Interactive Word Wheel */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 max-w-full flex items-center justify-center">
            {/* Top Needle Indicator */}
            <div className="absolute -top-3 z-20 flex flex-col items-center pointer-events-none drop-shadow-lg">
              <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-amber-600" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-800 -mt-1 ring-2 ring-white" />
            </div>

            {/* Rotating SVG Wheel */}
            <div
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transition: isSpinning
                  ? 'transform 3.6s cubic-bezier(0.15, 0.9, 0.25, 1)'
                  : 'none',
              }}
              className="w-full h-full rounded-full shadow-2xl border-4 border-stone-800 overflow-hidden bg-stone-900 select-none cursor-pointer"
              onClick={() => !isSpinning && triggerSpin()}
              role="button"
              tabIndex={0}
              aria-label="Spin the Word Wheel"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  triggerSpin();
                }
              }}
            >
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <defs>
                  <filter id="inner-shadow">
                    <feComponentTransfer in="SourceAlpha">
                      <feFuncA type="linear" slope="0.7" />
                    </feComponentTransfer>
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feOffset dx="0" dy="2" />
                    <feComposite operator="out" in2="SourceGraphic" />
                  </filter>
                </defs>

                {/* Segment 0: Courage (0 deg to 120 deg) */}
                <path
                  d="M 200 200 L 200 10 A 190 190 0 0 1 364.5 295 Z"
                  fill="#9A3412"
                  stroke="#FAF8F5"
                  strokeWidth="3"
                />
                {/* Segment 1: Faithfulness (120 deg to 240 deg) */}
                <path
                  d="M 200 200 L 364.5 295 A 190 190 0 0 1 35.5 295 Z"
                  fill="#115E59"
                  stroke="#FAF8F5"
                  strokeWidth="3"
                />
                {/* Segment 2: Service (240 deg to 360 deg) */}
                <path
                  d="M 200 200 L 35.5 295 A 190 190 0 0 1 200 10 Z"
                  fill="#312E81"
                  stroke="#FAF8F5"
                  strokeWidth="3"
                />

                {/* Slice Labels & Icons rendered along radial arcs */}
                {/* Courage Label (center at 60 deg) */}
                <g transform="rotate(60, 200, 200)">
                  <text
                    x="200"
                    y="75"
                    fill="#FDF6EE"
                    textAnchor="middle"
                    className="font-serif font-bold text-[22px] tracking-wider uppercase drop-shadow-sm"
                  >
                    COURAGE
                  </text>
                  <text
                    x="200"
                    y="98"
                    fill="#FDBA74"
                    textAnchor="middle"
                    className="font-sans font-medium text-[12px] tracking-widest uppercase"
                  >
                    Nehemiah 2:18
                  </text>
                </g>

                {/* Faithfulness Label (center at 180 deg) */}
                <g transform="rotate(180, 200, 200)">
                  <text
                    x="200"
                    y="75"
                    fill="#F0FDF4"
                    textAnchor="middle"
                    className="font-serif font-bold text-[20px] tracking-wider uppercase drop-shadow-sm"
                  >
                    FAITHFULNESS
                  </text>
                  <text
                    x="200"
                    y="98"
                    fill="#99F6E4"
                    textAnchor="middle"
                    className="font-sans font-medium text-[12px] tracking-widest uppercase"
                  >
                    Hebrews 11:1
                  </text>
                </g>

                {/* Service Label (center at 300 deg) */}
                <g transform="rotate(300, 200, 200)">
                  <text
                    x="200"
                    y="75"
                    fill="#EEF2FF"
                    textAnchor="middle"
                    className="font-serif font-bold text-[22px] tracking-wider uppercase drop-shadow-sm"
                  >
                    SERVICE
                  </text>
                  <text
                    x="200"
                    y="98"
                    fill="#C7D2FE"
                    textAnchor="middle"
                    className="font-sans font-medium text-[12px] tracking-widest uppercase"
                  >
                    Galatians 6:9
                  </text>
                </g>

                {/* Inner Center Hub */}
                <circle cx="200" cy="200" r="48" fill="#1C1917" stroke="#FAF8F5" strokeWidth="4" />
                <circle cx="200" cy="200" r="38" fill="#B45309" />
                <circle cx="200" cy="200" r="32" fill="#78350F" />
                <text
                  x="200"
                  y="196"
                  fill="#FEF3C7"
                  textAnchor="middle"
                  className="font-serif font-bold text-[11px] tracking-widest uppercase"
                >
                  BYOB
                </text>
                <text
                  x="200"
                  y="212"
                  fill="#FFFFFF"
                  textAnchor="middle"
                  className="font-sans font-bold text-[12px] tracking-wider uppercase"
                >
                  WHEEL
                </text>
              </svg>
            </div>
          </div>

          {/* Primary Spin Button */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm">
            <button
              onClick={() => triggerSpin()}
              disabled={isSpinning}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-bold text-white bg-amber-800 hover:bg-amber-900 disabled:opacity-60 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-98 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>(( SPIN WHEEL ))</span>
            </button>
          </div>

          {/* Text Command Input Option (as requested: "When the user enters SPIN...") */}
          <form onSubmit={handleCommandSubmit} className="mt-3 w-full max-w-sm flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                placeholder="Or type 'SPIN' & press Enter"
                className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700 font-mono uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={isSpinning || !commandInput.trim()}
              className="px-3 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md disabled:opacity-50 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>

        {/* Right Column: Generated Kingdom Builder Result */}
        <div className="lg:col-span-6 space-y-6">
          {!currentResult ? (
            <div className="p-8 sm:p-10 bg-white border-2 border-dashed border-stone-300 rounded-xl text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Ready to Seek Your Directive?
              </h3>
              <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                The Scripture Spinner will land on one of three foundational Kingdom Builder pillars:
                <strong> Courage</strong> (Nehemiah 2:18), <strong>Faithfulness</strong> (Hebrews 11:1), or
                <strong> Service</strong> (Galatians 6:9). Click <em>(( SPIN WHEEL ))</em> to discover what
                God is calling you to activate right now.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => triggerSpin()}
                  disabled={isSpinning}
                  className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 rounded-md transition-colors"
                >
                  Trigger First Spin
                </button>
              </div>
            </div>
          ) : (
            <div
              className="p-6 sm:p-8 bg-white border border-stone-300 rounded-xl shadow-lg space-y-6 transition-all duration-300"
              style={{ borderTop: `6px solid ${currentResult.color}` }}
            >
              {/* Header result badge */}
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  {currentResult.id === 'courage' && <Shield className="w-5 h-5 text-amber-700" />}
                  {currentResult.id === 'faithfulness' && <Award className="w-5 h-5 text-teal-700" />}
                  {currentResult.id === 'service' && <Heart className="w-5 h-5 text-indigo-700" />}
                  <span className="text-xs uppercase font-mono tracking-widest font-bold text-stone-900">
                    Pillar: {currentResult.label} · {currentResult.theme}
                  </span>
                </div>
                <button
                  onClick={() => triggerSpin()}
                  disabled={isSpinning}
                  className="text-xs font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1 hover:underline"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Spin Again</span>
                </button>
              </div>

              {/* 1. SCRIPTURE */}
              <div className="space-y-1.5">
                <div className="text-xs uppercase tracking-wider font-semibold text-stone-500">
                  Scripture Anchor
                </div>
                <blockquote className="font-serif text-xl sm:text-2xl font-bold text-stone-900 italic leading-snug">
                  {currentResult.reference}
                </blockquote>
                <div className="text-sm font-semibold text-amber-800 uppercase tracking-widest">
                  — {currentResult.scripture}
                </div>
              </div>

              {/* 2. CHALLENGE */}
              <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-wider font-bold text-stone-700 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                    <span>Your Kingdom Challenge</span>
                  </div>
                  {isChallengeCompleted && (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Completed!</span>
                    </span>
                  )}
                </div>
                <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                  {currentResult.challenge}
                </p>
              </div>

              {/* 3. PRAYER FOCUS */}
              <div className="p-4 bg-amber-50/60 rounded-lg border border-amber-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="text-xs uppercase tracking-wider font-bold text-amber-900">
                    Prayer Focus
                  </div>
                  <button
                    onClick={handleCopyPrayer}
                    className="text-xs font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1 hover:underline"
                    title="Copy prayer to clipboard"
                  >
                    {copiedPrayer ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedPrayer ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="font-serif text-base sm:text-lg text-amber-950 italic leading-relaxed">
                  {currentResult.prayerFocus}
                </p>
              </div>

              {/* Interactive Challenge Completion Note & Button */}
              <div className="pt-2 space-y-3">
                {!isChallengeCompleted ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={completedNote}
                      onChange={(e) => setCompletedNote(e.target.value)}
                      placeholder="Optional: How will you fulfill this challenge today?"
                      className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                    />
                    <button
                      onClick={handleCompleteChallenge}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-md transition-all shadow-xs"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>COMPLETE CHALLENGE</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-medium">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Hallelujah! You committed to this challenge. “{completedNote || 'A willing heart builds the Kingdom.'}”
                    </span>
                  </div>
                )}
              </div>

              {/* Primary Navigation CTA */}
              <div className="pt-2 border-t border-stone-200 flex justify-end">
                <button
                  onClick={onNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-md hover:shadow-lg transition-all group"
                >
                  <span>NEXT: PASTOR FEATURE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
