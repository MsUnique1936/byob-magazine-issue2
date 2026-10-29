import { useState, useRef, useEffect } from 'react';
import { X, Send, Award, Mic, Square, Play, Pause, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import { CongratulatoryNote } from '../types/magazine';
import { playChimeSound, playTickSound } from '../utils/audio';

interface CongratulatoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (note: Omit<CongratulatoryNote, 'id' | 'date'>) => void;
}

const BLESSING_BADGES = [
  'Faithful Shepherd',
  'Visionary Leader',
  'Pillar of Grace',
  'Community Servant',
  'Spiritual Father',
];

export function CongratulatoryModal({ isOpen, onClose, onSubmit }: CongratulatoryModalProps) {
  const [author, setAuthor] = useState('');
  const [roleOrRelation, setRoleOrRelation] = useState('');
  const [message, setMessage] = useState('');
  const [badge, setBadge] = useState(BLESSING_BADGES[0]);
  const [tributeMode, setTributeMode] = useState<'written' | 'voice'>('written');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [recordingError, setRecordingError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (audioElementRef.current) {
        audioElementRef.current.pause();
      }
    };
  }, []);

  if (!isOpen) return null;

  const startVoiceRecording = async () => {
    try {
      setRecordingError(null);
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            audioChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedAudioUrl(audioUrl);
          // Stop stream tracks
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
        setRecordingSeconds(0);

        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = window.setInterval(() => {
          setRecordingSeconds((prev) => {
            if (prev >= 60) {
              stopVoiceRecording();
              return 60;
            }
            return prev + 1;
          });
        }, 1000);
      } else {
        // Fallback simulation for unsupported sandboxes
        setIsRecording(true);
        setRecordingSeconds(0);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = window.setInterval(() => {
          setRecordingSeconds((prev) => prev + 1);
        }, 1000);
      }
    } catch {
      // Fallback if mic permission is denied
      setRecordingError('Microphone access is unavailable or denied. You can record a virtual voice note or type your tribute below.');
      setIsRecording(false);
    }
  };

  const stopVoiceRecording = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    } else {
      // simulated voice note
      setRecordedAudioUrl('simulated-voice-note');
    }
    setIsRecording(false);
    if (!message) {
      setMessage(`Voice tribute recorded (${formatTime(recordingSeconds)}) honoring 29 years of steadfast pastoral service.`);
    }
  };

  const togglePlayAudio = () => {
    if (!recordedAudioUrl) return;
    if (recordedAudioUrl === 'simulated-voice-note') {
      playChimeSound();
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 2000);
      return;
    }

    if (!audioElementRef.current) {
      audioElementRef.current = new Audio(recordedAudioUrl);
      audioElementRef.current.onended = () => setIsPlayingAudio(false);
    }

    if (isPlayingAudio) {
      audioElementRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioElementRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim()) return;
    const finalMessage = message.trim() || (recordedAudioUrl ? `Recorded Voice Tribute (${formatTime(recordingSeconds)})` : '');
    if (!finalMessage) return;

    playChimeSound();
    onSubmit({
      author: author.trim(),
      roleOrRelation: roleOrRelation.trim() || 'Community Member',
      message: finalMessage,
      badge,
      isVoiceMessage: tributeMode === 'voice' && !!recordedAudioUrl,
      voiceAudioUrl: recordedAudioUrl || undefined,
      voiceDuration: recordedAudioUrl ? formatTime(recordingSeconds) : undefined,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-[#FAF8F5] w-full max-w-xl rounded-xl border border-stone-300 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-800" />
            <span className="font-serif text-lg font-bold text-stone-900">
              Leave Your Personal Tribute
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Tribute Inscribed in Anniversary Board!
            </h3>
            <p className="text-sm text-stone-600">
              Thank you for honoring the pastor's 29 years of faithful leadership and spiritual guidance.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
            {/* Pastoral Question Anchor */}
            <div className="p-4 bg-amber-50/70 rounded-lg border border-amber-200/80 space-y-1">
              <div className="text-xs uppercase tracking-wider font-bold text-amber-900">
                Anniversary Reflection Question
              </div>
              <p className="font-serif text-sm sm:text-base italic text-amber-950 font-medium leading-relaxed">
                “How has the pastor's teaching or leadership impacted your faith journey over the years?”
              </p>
            </div>

            {/* Mode Switcher: Written vs Voice Message */}
            <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-lg border border-stone-200">
              <button
                type="button"
                onClick={() => {
                  playTickSound();
                  setTributeMode('written');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  tributeMode === 'written'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Written Tribute / Prayer
              </button>
              <button
                type="button"
                onClick={() => {
                  playTickSound();
                  setTributeMode('voice');
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  tributeMode === 'voice'
                    ? 'bg-white text-amber-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-amber-700" />
                <span>Voice Message Tribute</span>
              </button>
            </div>

            {/* Name Input */}
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Deacon Marcus, Sis. Angela Vance"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Connection Input */}
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                Relationship or Connection
              </label>
              <input
                type="text"
                value={roleOrRelation}
                onChange={(e) => setRoleOrRelation(e.target.value)}
                placeholder="e.g. Member since 2004, Youth Ministry Mentor, Friend"
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Blessing Ribbon */}
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                Anniversary Blessing Ribbon
              </label>
              <select
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
              >
                {BLESSING_BADGES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Voice Recording Panel (If in Voice Mode) */}
            {tributeMode === 'voice' && (
              <div className="p-4 bg-white border border-amber-300 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-amber-700" />
                    <span>Voice Message Recording</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-stone-700">
                    {formatTime(recordingSeconds)} / 1:00
                  </span>
                </div>

                {recordingError && (
                  <p className="text-xs text-amber-800 bg-amber-50 p-2 rounded">
                    {recordingError}
                  </p>
                )}

                <div className="flex items-center justify-center gap-3 py-3">
                  {!isRecording && !recordedAudioUrl && (
                    <button
                      type="button"
                      onClick={startVoiceRecording}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all animate-pulse"
                    >
                      <Mic className="w-4 h-4" />
                      <span>Tap to Record Voice Message</span>
                    </button>
                  )}

                  {isRecording && (
                    <button
                      type="button"
                      onClick={stopVoiceRecording}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all"
                    >
                      <Square className="w-4 h-4 text-red-500 fill-red-500" />
                      <span>Stop Recording ({formatTime(recordingSeconds)})</span>
                    </button>
                  )}

                  {recordedAudioUrl && !isRecording && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={togglePlayAudio}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold"
                      >
                        {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        <span>{isPlayingAudio ? 'Pause' : 'Play Voice Message'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setRecordedAudioUrl(null);
                          setRecordingSeconds(0);
                        }}
                        className="p-2 text-stone-500 hover:text-stone-800 hover:bg-stone-100 rounded-md text-xs"
                        title="Re-record"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Message Box */}
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                {tributeMode === 'voice' ? 'Optional Written Note / Summary' : 'Your Congratulatory Message & Prayer *'}
              </label>
              <textarea
                required={tributeMode === 'written' || !recordedAudioUrl}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share how the pastor's sermon, pastoral prayer, or visionary leadership impacted your walk with God..."
                className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center justify-end gap-3 border-t border-stone-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-stone-700 hover:bg-stone-200/60 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-md transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Post to Anniversary Wall</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
