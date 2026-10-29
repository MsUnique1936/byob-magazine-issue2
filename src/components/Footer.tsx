import { useState } from 'react';
import { ExternalLink, Radio, HeartHandshake, Globe, Sparkles, X, ChevronRight, BookOpen, Youtube, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import { ScreenId } from '../types/magazine';
import { playChimeSound, playTickSound } from '../utils/audio';

interface FooterProps {
  onNavigate: (screen: ScreenId) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const [activeModal, setActiveModal] = useState<'podcast' | 'friendRaiser' | null>(null);

  const openModal = (type: 'podcast' | 'friendRaiser') => {
    playTickSound();
    setActiveModal(type);
  };

  const closeModal = () => {
    playTickSound();
    setActiveModal(null);
  };

  return (
    <>
      <footer className="w-full bg-[#121110] text-stone-300 border-t border-amber-900/30 pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle decorative gold gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />
        
        {/* Ambient subtle warm glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-stone-800/80">
            {/* Column 1: Parent Brand & Mission */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
                  BYOB MAGAZINE
                </span>
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-semibold px-2 py-0.5 rounded-sm bg-amber-950/60 border border-amber-800/50">
                  Issue 02
                </span>
              </div>

              <p className="font-serif text-sm sm:text-base text-amber-100/90 italic leading-relaxed">
                “Empowering Kingdom Entrepreneurs, Leadership Development & Community Storytelling.”
              </p>

              <p className="text-xs text-stone-400 leading-relaxed max-w-md">
                BYOB (Build Your Own Belief) Magazine is an interactive digital publication dedicated to spotlighting believers transforming culture in executive boardrooms, family rooms, and grassroots community altars.
              </p>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href="https://www.msunique.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:text-white bg-amber-950/50 hover:bg-amber-900/60 border border-amber-700/60 rounded-full transition-all group shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  <span>Visit MsUnique.net</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Minimalist Gold-Accented Social Media Row right beside Visit MsUnique.net */}
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://www.youtube.com/@MsUnique2.0_friendraiser"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="ReelTalk on YouTube"
                    aria-label="ReelTalk on YouTube"
                    className="p-1.5 rounded-full text-stone-400 hover:text-amber-300 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-700/60 transition-all"
                  >
                    <Youtube className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.facebook.com/people/Prairie-Grove-Baptist-Church/61577749932739/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Prairie Grove Baptist Church on Facebook"
                    aria-label="Prairie Grove Baptist Church on Facebook"
                    className="p-1.5 rounded-full text-stone-400 hover:text-amber-300 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-700/60 transition-all"
                  >
                    <Facebook className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.instagram.com/marshia.salcedo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram @marshia.salcedo"
                    aria-label="Instagram @marshia.salcedo"
                    className="p-1.5 rounded-full text-stone-400 hover:text-amber-300 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-700/60 transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/marshiasalcedo"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn - Marshia Salcedo"
                    aria-label="LinkedIn - Marshia Salcedo"
                    className="p-1.5 rounded-full text-stone-400 hover:text-amber-300 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-700/60 transition-all"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.msunique.net/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Direct Contact - msunique.net/contact"
                    aria-label="Direct Contact - msunique.net/contact"
                    className="p-1.5 rounded-full text-stone-400 hover:text-amber-300 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-700/60 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Ecosystem Quick Links */}
            <div className="md:col-span-4 space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>MsUnique Ecosystem & Media</span>
              </h3>

              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.msunique.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-stone-300 hover:text-amber-300 text-xs sm:text-sm group transition-colors"
                  >
                    <Globe className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold flex items-center gap-1">
                        <span>Visit MsUnique.net</span>
                        <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <span className="text-[11px] text-stone-400">Parent media company & executive ministry hub</span>
                    </div>
                  </a>
                </li>

                <li>
                  <button
                    onClick={() => openModal('podcast')}
                    className="flex items-start gap-2 text-left text-stone-300 hover:text-amber-300 text-xs sm:text-sm group transition-colors w-full"
                  >
                    <Radio className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold flex items-center gap-1">
                        <span>ReelTalk Podcast</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <span className="text-[11px] text-stone-400">Conversations on faith, marketplace leadership & breaking cycles</span>
                    </div>
                  </button>
                </li>

                <li>
                  <button
                    onClick={() => openModal('friendRaiser')}
                    className="flex items-start gap-2 text-left text-stone-300 hover:text-amber-300 text-xs sm:text-sm group transition-colors w-full"
                  >
                    <HeartHandshake className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold flex items-center gap-1">
                        <span>Support Our Friend-Raiser</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <span className="text-[11px] text-stone-400">Partner with us to expand Kingdom media & community impact</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Issue Navigation */}
            <div className="md:col-span-3 space-y-4">
              <h3 className="text-xs uppercase tracking-widest font-mono text-amber-400 font-bold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Issue 02 Navigation</span>
              </h3>

              <div className="grid grid-cols-1 gap-1.5 text-xs text-stone-300">
                <button
                  onClick={() => onNavigate(1)}
                  className="text-left py-1 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>Issue Cover</span>
                  <span className="text-[10px] font-mono text-stone-400">01</span>
                </button>
                <button
                  onClick={() => onNavigate(2)}
                  className="text-left py-1 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>Women of Faith Feature</span>
                  <span className="text-[10px] font-mono text-stone-400">02</span>
                </button>
                <button
                  onClick={() => onNavigate(3)}
                  className="text-left py-1 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>Scripture Spinner</span>
                  <span className="text-[10px] font-mono text-stone-400">03</span>
                </button>
                <button
                  onClick={() => onNavigate(4)}
                  className="text-left py-1 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>Pastor 29th Anniversary</span>
                  <span className="text-[10px] font-mono text-stone-400">04</span>
                </button>
                <button
                  onClick={() => onNavigate(5)}
                  className="text-left py-1 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>Connect & Testimony Wall</span>
                  <span className="text-[10px] font-mono text-stone-400">05</span>
                </button>
                <button
                  onClick={() => onNavigate(6)}
                  className="text-left py-1 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>Media & Outreach Hub</span>
                  <span className="text-[10px] font-mono text-stone-400">06</span>
                </button>
                <button
                  onClick={() => onNavigate(7)}
                  className="text-left py-1 hover:text-amber-300 transition-colors flex items-center justify-between"
                >
                  <span>Marketplace & Ads</span>
                  <span className="text-[10px] font-mono text-stone-400">07</span>
                </button>
                <button
                  onClick={() => onNavigate(8)}
                  className="text-left py-1 text-amber-300 hover:text-amber-200 transition-colors flex items-center justify-between font-semibold"
                >
                  <span>Subscribe to BYOB</span>
                  <span className="text-[10px] font-mono text-amber-400">08</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Masthead Credit */}
          <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-stone-400">
            <div>
              <p className="font-medium text-stone-300">
                © 2026 BYOB Magazine · Produced by MsUnique Media Group
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                All rights reserved. Published in Fall / Winter 2026 Edition.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <span className="text-stone-300 font-serif italic">
                Marshia Salcedo, Editor-in-Chief
              </span>
              <span className="text-stone-700 hidden sm:inline">|</span>
              <a
                href="https://www.msunique.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300 underline underline-offset-2 transition-colors"
              >
                www.msunique.net
              </a>
              <span className="text-stone-700 hidden sm:inline">|</span>
              <div className="flex items-center gap-2 text-stone-400">
                <a
                  href="https://www.youtube.com/@MsUnique2.0_friendraiser"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="hover:text-amber-400 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.facebook.com/people/Prairie-Grove-Baptist-Church/61577749932739/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Prairie Grove Baptist Church on Facebook"
                  className="hover:text-amber-400 transition-colors"
                  title="Prairie Grove Baptist Church on Facebook"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/marshia.salcedo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram @marshia.salcedo"
                  className="hover:text-amber-400 transition-colors"
                  title="Instagram @marshia.salcedo"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/marshiasalcedo"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-amber-400 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.msunique.net/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct Contact - msunique.net/contact"
                  className="hover:text-amber-400 transition-colors"
                  title="Direct Contact: msunique.net/contact"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* ReelTalk Podcast Modal */}
      {activeModal === 'podcast' && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-[#181614] border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-200 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-mono text-amber-400 font-semibold">
                    MsUnique Media
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    ReelTalk Podcast
                  </h3>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans">
              <p>
                Hosted by <strong>Marshia Salcedo</strong>, the <span className="text-amber-300 font-semibold">ReelTalk Podcast</span> is where authentic faith meets real-world leadership. We unpack raw testimonies, marketplace challenges, and kingdom strategies for leaders building generational impact.
              </p>
              <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-xl space-y-1.5 text-xs text-stone-300">
                <div className="font-semibold text-amber-200 uppercase tracking-wider text-[10px]">
                  Featured Topics
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-400">
                  <li>Faith in the Boardroom & Kingdom Entrepreneurship</li>
                  <li>Overcoming Spiritual Burnout & Rebuilding Calling</li>
                  <li>Generational Healing & Mentorship in Families</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors"
              >
                Close
              </button>
              <a
                href="https://www.youtube.com/@MsUnique2.0_friendraiser"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playChimeSound()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md group"
              >
                <Youtube className="w-4 h-4" />
                <span>Listen on YouTube Channel</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Support Our Friend-Raiser Modal */}
      {activeModal === 'friendRaiser' && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg bg-[#181614] border border-amber-900/50 rounded-2xl p-6 sm:p-8 shadow-2xl text-stone-200 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-mono text-amber-400 font-semibold">
                    Community Partnership
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Support Our Friend-Raiser
                  </h3>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans">
              <p>
                Our <strong>Friend-Raiser Campaign</strong> fuels the mission of MsUnique Media Group: creating uplifting faith-based journalism, offering media literacy grants for aspiring young creators, and providing free print & digital editions of BYOB Magazine to community centers and prisons.
              </p>
              <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-xl space-y-2 text-xs text-stone-300">
                <div className="font-semibold text-amber-200 uppercase tracking-wider text-[10px]">
                  Where Your Partnership Goes
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-400">
                  <div className="p-2 rounded bg-stone-800/60">
                    <strong className="text-stone-200 block text-xs">Youth Media Grants</strong>
                    Training next-gen storytellers
                  </div>
                  <div className="p-2 rounded bg-stone-800/60">
                    <strong className="text-stone-200 block text-xs">Community Distribution</strong>
                    Free magazines to ministries
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-lg transition-colors"
              >
                Close
              </button>
              <a
                href="https://www.msunique.net"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playChimeSound()}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Partner with MsUnique.net</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
