import { useState } from 'react';
import { RotateCcw, Send, Heart, MessageSquare, Check, Sparkles, Filter, ShieldCheck, Mail, Phone, User, Youtube, Facebook, Instagram, Linkedin, ExternalLink, ArrowRight, Church } from 'lucide-react';
import { INITIAL_COMMUNITY_POSTS } from '../data/magazineData';
import { CommunityPost, SubmissionType } from '../types/magazine';
import { playChimeSound, playPrayerAmenSound, playTickSound } from '../utils/audio';

interface Screen5ConnectWallProps {
  onBackToCover: () => void;
}

const SUBMISSION_TYPES: SubmissionType[] = ['Prayer Request', 'Testimony', 'Encouragement'];

export function Screen5ConnectWall({ onBackToCover }: Screen5ConnectWallProps) {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);

  // Form State
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [type, setType] = useState<SubmissionType>('Testimony');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Filter State
  const [selectedFilter, setSelectedFilter] = useState<'All' | SubmissionType>('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    playChimeSound();

    setTimeout(() => {
      const newPost: CommunityPost = {
        id: `post-${Date.now()}`,
        author: name.trim(),
        contact: contact.trim() || 'Private Community Member',
        type,
        message: message.trim(),
        timestamp: 'Just now',
        prayerCount: 1,
        userPrayed: true,
      };

      setPosts([newPost, ...posts]);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName('');
      setContact('');
      setMessage('');

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 400);
  };

  const handlePrayForPost = (postId: string) => {
    playPrayerAmenSound();
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const alreadyPrayed = post.userPrayed;
          return {
            ...post,
            prayerCount: alreadyPrayed ? post.prayerCount - 1 : post.prayerCount + 1,
            userPrayed: !alreadyPrayed,
          };
        }
        return post;
      })
    );
  };

  const filteredPosts =
    selectedFilter === 'All'
      ? posts
      : posts.filter((p) => p.type === selectedFilter);

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Screen Header Badge */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="font-mono text-stone-700 font-bold">SCREEN 05 OF 08</span>
          <span aria-hidden="true">·</span>
          <span>CONNECT PAGE</span>
          <span aria-hidden="true">·</span>
          <span>CONTACT & TESTIMONY WALL</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Community Fellowship</span>
          <span aria-hidden="true">·</span>
          <span>{posts.length} Active Posts</span>
        </div>
      </div>

      {/* Main Header & Intro */}
      <div className="max-w-3xl space-y-3 mb-8">
        <div className="text-xs uppercase tracking-widest text-amber-800 font-semibold flex items-center gap-2">
          <Heart className="w-4 h-4 text-amber-700" />
          <span>Interactive Fellowship Hub</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
          Connect & Build Together — Build Your Own Belief
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
          The church is not an audience of passive spectators; it is a fellowship of builders.
          Submit your prayer request so we can lift you up, declare a testimony of God’s provision,
          or offer a word of biblical encouragement to someone in need today.
        </p>
      </div>

      {/* Prominent 'Follow & Connect with Marshia' Social Bar */}
      <section className="mb-10 bg-gradient-to-br from-[#161412] via-[#211d1a] to-[#161412] text-stone-200 rounded-2xl p-6 sm:p-8 border border-amber-900/40 shadow-xl relative overflow-hidden">
        {/* Decorative gold accent border & warm ambient glow */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-800/80">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold flex items-center gap-2 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive Host & Media Ecosystem</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Follow & Connect with Marshia
              </h2>
              <p className="font-serif italic text-amber-200 text-sm sm:text-base mt-1">
                “Join the conversation throughout the week across our social platforms!”
              </p>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              Stay immersed in Kingdom perspectives, leadership insights, community stories, and weekly ReelTalk episodes between magazine editions.
            </p>
          </div>

          {/* 5 Social Media Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 pt-1">
            {/* 1. YouTube */}
            <a
              href="https://www.youtube.com/@MsUnique2.0_friendraiser"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTickSound()}
              className="group p-4 bg-stone-900/90 hover:bg-stone-800/90 rounded-xl border border-stone-800 hover:border-amber-600/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-red-950/70 border border-red-800/60 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                  YouTube
                </div>
                <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors mt-0.5">
                  ReelTalk Show
                </div>
                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  Watch full video podcasts, interviews & features
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800 text-[10px] font-medium text-amber-400/90 group-hover:text-amber-300 flex items-center gap-1">
                <span>Watch & Subscribe</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* 2. Facebook */}
            <a
              href="https://www.facebook.com/marshia.salcedo/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTickSound()}
              className="group p-4 bg-stone-900/90 hover:bg-stone-800/90 rounded-xl border border-stone-800 hover:border-amber-600/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-950/70 border border-blue-800/60 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                  Facebook
                </div>
                <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors mt-0.5">
                  Publisher Marshia
                </div>
                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  Kingdom leadership, encouragement & livestreams
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800 text-[10px] font-medium text-amber-400/90 group-hover:text-amber-300 flex items-center gap-1">
                <span>Connect with Marshia</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* 3. Instagram */}
            <a
              href="https://www.instagram.com/marshia.salcedo/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTickSound()}
              className="group p-4 bg-stone-900/90 hover:bg-stone-800/90 rounded-xl border border-stone-800 hover:border-amber-600/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-pink-950/70 border border-pink-800/60 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                  Instagram
                </div>
                <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors mt-0.5">
                  @marshia.salcedo
                </div>
                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  Behind the scenes, photo reels & uplifting stories
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800 text-[10px] font-medium text-amber-400/90 group-hover:text-amber-300 flex items-center gap-1">
                <span>Follow @marshia.salcedo</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* 4. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/marshiasalcedo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTickSound()}
              className="group p-4 bg-stone-900/90 hover:bg-stone-800/90 rounded-xl border border-stone-800 hover:border-amber-600/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-950/70 border border-sky-800/60 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                  LinkedIn
                </div>
                <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors mt-0.5">
                  Marshia Salcedo
                </div>
                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  Kingdom marketplace leadership & executive network
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800 text-[10px] font-medium text-amber-400/90 group-hover:text-amber-300 flex items-center gap-1">
                <span>Connect Professionally</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>

            {/* 5. Direct Contact Page */}
            <a
              href="https://www.msunique.net/contact"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playTickSound()}
              className="group p-4 bg-stone-900/90 hover:bg-stone-800/90 rounded-xl border border-stone-800 hover:border-amber-600/80 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-950/70 border border-amber-800/60 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                </div>
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
                  Direct Contact
                </div>
                <div className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors mt-0.5 truncate">
                  msunique.net/contact
                </div>
                <p className="text-[11px] text-stone-400 mt-1 leading-snug">
                  Personal prayer requests, media inquiries & speaking bookings
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-stone-800 text-[10px] font-medium text-amber-400/90 group-hover:text-amber-300 flex items-center gap-1">
                <span>Visit Contact Page</span>
                <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </div>

          {/* Dedicated Community Connection Area: Dual Gold-Accented Buttons */}
          <div className="mt-5 pt-4 border-t border-stone-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-stone-950/70 p-4 sm:p-5 rounded-xl border border-amber-900/40">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 sm:mt-0">
                <Church className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-white flex items-center gap-2">
                  <span>Official Fellowship & Community Hubs</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/50">Verified Links</span>
                </div>
                <p className="text-[11px] text-stone-400 mt-0.5">
                  Stay connected with Publisher Marshia Salcedo and fellowship with our Prairie Grove Baptist Church family.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              {/* Button 1: Connect with Publisher Marshia on Facebook */}
              <a
                href="https://www.facebook.com/marshia.salcedo/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTickSound()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-850 text-amber-300 hover:text-amber-200 border border-amber-600/60 hover:border-amber-400 text-xs font-medium transition-all shadow-sm hover:shadow-amber-950/40 group text-center"
              >
                <Facebook className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="font-semibold">Connect with Publisher Marshia on Facebook</span>
                <ExternalLink className="w-3 h-3 text-stone-400 group-hover:text-amber-300 shrink-0" />
              </a>

              {/* Button 2: Spiritual Hub: Prairie Grove Baptist Church */}
              <a
                href="https://www.facebook.com/profile.php?id=61577749932739"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playTickSound()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 hover:from-amber-900/90 hover:to-stone-900 text-amber-200 hover:text-white border border-amber-500/70 hover:border-amber-400 text-xs font-bold transition-all shadow-sm hover:shadow-amber-950/40 group text-center"
              >
                <Church className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform shrink-0" />
                <span>Spiritual Hub: Prairie Grove Baptist Church</span>
                <ExternalLink className="w-3 h-3 text-amber-400 group-hover:text-amber-200 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Layout: Form Submission (Left) & Live Community Wall (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left: Interactive Form Simulation */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xl border border-stone-300 shadow-sm space-y-5">
          <div className="pb-3 border-b border-stone-200">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Submit to Community Wall
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Fill in your details below to place your entry onto the live community board.
            </p>
          </div>

          {submitSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-start gap-3 text-emerald-900">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm">
                <strong>Submission Received & Posted!</strong>
                <p className="text-xs text-emerald-800 mt-0.5">
                  May the Lord hear and answer your petition. Your contribution is now live on the wall for all believers to stand with you.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 1. Name Input */}
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                1. Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sister Deborah, Marcus Reed"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* 2. Email / Phone Number */}
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                2. Email or Phone Number *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. deborah@faith.org or (555) 234-5678"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
              <span className="text-[11px] text-stone-500">
                Used for pastoral follow-up and prayer team notifications.
              </span>
            </div>

            {/* 3. Submission Type: [ Prayer Request ] | [ Testimony ] | [ Encouragement ] */}
            <div className="space-y-1.5">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                3. Submission Type *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SUBMISSION_TYPES.map((t) => {
                  const isSelected = type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        playTickSound();
                        setType(t);
                      }}
                      className={`py-2 px-2 text-xs font-semibold rounded-md border text-center transition-colors whitespace-nowrap ${
                        isSelected
                          ? 'bg-amber-800 text-white border-amber-800 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Message Box */}
            <div className="space-y-1">
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                4. Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your prayer need, celebrate what God has done, or post an encouraging scripture..."
                className="w-full p-3 text-sm bg-stone-50 border border-stone-300 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>

            {/* CTAs */}
            <div className="pt-2 space-y-3">
              {/* Primary CTA: [ SUBMIT TO COMMUNITY WALL ] */}
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !message.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 disabled:opacity-50 rounded-lg shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
              >
                <Send className="w-4 h-4" />
                <span>SUBMIT TO COMMUNITY WALL</span>
              </button>

              {/* Secondary CTA: [ BACK TO COVER ↺ ] */}
              <button
                type="button"
                onClick={() => {
                  playTickSound();
                  onBackToCover();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>BACK TO COVER ↺</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Live Community Wall */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-200">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                The Living Testimony Wall
              </h2>
              <p className="text-xs text-stone-500">
                Real-time prayers, celebrations, and encouragement from fellow Kingdom Builders.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg self-start sm:self-auto border border-stone-200">
              {(['All', 'Prayer Request', 'Testimony', 'Encouragement'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    playTickSound();
                    setSelectedFilter(filter);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedFilter === filter
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-lg border border-stone-200 text-stone-500 text-sm">
                No submissions under this category yet. Be the first to share!
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isPrayed = post.userPrayed;
                return (
                  <article
                    key={post.id}
                    className="p-5 sm:p-6 bg-white border border-stone-200 rounded-xl shadow-xs hover:border-amber-300 transition-colors space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs uppercase font-mono font-bold px-2 py-0.5 rounded-sm ${
                            post.type === 'Testimony'
                              ? 'bg-amber-100 text-amber-900'
                              : post.type === 'Prayer Request'
                              ? 'bg-blue-100 text-blue-900'
                              : 'bg-emerald-100 text-emerald-900'
                          }`}
                        >
                          {post.type}
                        </span>
                        <span className="text-xs text-stone-400 font-sans">·</span>
                        <span className="text-xs text-stone-500">{post.timestamp}</span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <ShieldCheck className="w-3.5 h-3.5 text-stone-400" />
                        <span className="hidden sm:inline">Verified Member</span>
                      </div>
                    </div>

                    <p className="text-stone-800 text-sm sm:text-base leading-relaxed font-serif">
                      “{post.message}”
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <div className="font-semibold text-stone-900">
                        {post.author}
                      </div>

                      <button
                        onClick={() => handlePrayForPost(post.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition-colors ${
                          isPrayed
                            ? 'bg-red-50 text-red-700 border-red-200 font-semibold'
                            : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                        title="Click to pray and stand in agreement"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isPrayed ? 'fill-red-600 text-red-600' : 'text-stone-500'}`} />
                        <span>{isPrayed ? 'Praying with you' : 'Stand in Prayer'}</span>
                        <span className="font-mono ml-0.5 font-bold">({post.prayerCount})</span>
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
