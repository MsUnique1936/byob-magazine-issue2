import { useState, useRef } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  ArrowRight, 
  Mail, 
  Radio, 
  Layers, 
  Check, 
  Store, 
  Users, 
  ChevronRight,
  BadgeCheck,
  Megaphone
} from 'lucide-react';
import { ScreenId } from '../types/magazine';
import { playChimeSound, playTickSound } from '../utils/audio';

interface Screen7MarketplaceProps {
  onNavigate: (screen: ScreenId) => void;
}

interface SponsorPackage {
  id: string;
  tierNumber: number;
  tierName: string;
  badge: string;
  tagline: string;
  description: string;
  bestFor: string;
  features: string[];
  highlightColor: string;
  popular?: boolean;
}

interface DirectoryListing {
  id: string;
  name: string;
  category: 'Business & Services' | 'Ministries & Non-Profits' | 'Creative & Media';
  tagline: string;
  description: string;
  website: string;
  location: string;
  founder: string;
}

const SPONSOR_PACKAGES: SponsorPackage[] = [
  {
    id: 'directory',
    tierNumber: 1,
    tierName: 'Community Directory Listing',
    badge: 'Tier 1 · Community Core',
    tagline: 'Logo + 2-sentence feature + direct website link',
    description: 'Establish your presence in our verified Kingdom Builder business and ministry directory with direct reader access.',
    bestFor: 'Local service providers & ministry bulletins',
    features: [
      'Official business or ministry logo placement',
      'Curated 2-sentence editorial profile',
      'Direct one-click outbound link to your website or booking page',
      'Categorized under the Kingdom Directory in all digital editions',
      'Inclusion in the BYOB digital resource index',
    ],
    highlightColor: 'border-stone-300 hover:border-amber-500',
  },
  {
    id: 'featured_article',
    tierNumber: 2,
    tierName: 'Featured Article Partner',
    badge: 'Tier 2 · Most Popular',
    tagline: 'Half-page digital display card inside a magazine feature + social media mention',
    description: 'Integrate directly into the reading flow of our top-read editorial features with branded editorial presence.',
    bestFor: 'Boutiques, authors, coaches & small businesses',
    popular: true,
    features: [
      'Prominent half-page styled digital display card embedded in a feature article',
      'Editorial endorsement callout with high-resolution brand visuals',
      'Dedicated social media partner spotlight across MsUnique channels',
      'Priority placement in the BYOB Marketplace directory',
      'Direct link tracking & reader engagement analytics report',
    ],
    highlightColor: 'border-amber-600/80 shadow-lg ring-1 ring-amber-500/30',
  },
  {
    id: 'premier_multimedia',
    tierNumber: 3,
    tierName: 'Premier Multimedia Sponsor',
    badge: 'Tier 3 · Executive Leadership',
    tagline: 'Full magazine showcase banner + 30-sec shout-out on ReelTalk Podcast + feature on MsUnique.net',
    description: 'Comprehensive cross-platform ecosystem takeover spanning the digital magazine, audio podcast, and web headquarters.',
    bestFor: 'Established brands, churches & corporate kingdom builders',
    features: [
      'Full-width luxury digital showcase banner across all magazine issues',
      '30-second host-read audio spotlight on ReelTalk Podcast with Marshia',
      'Permanent partner feature and backlink on MsUnique.net media hub',
      'Co-branded email newsletter spotlight to our subscriber community',
      'VIP guest invitation consideration for future ReelTalk podcast panels',
    ],
    highlightColor: 'border-amber-500 shadow-xl ring-2 ring-amber-500/40',
  },
];

const SAMPLE_DIRECTORY_LISTINGS: DirectoryListing[] = [
  {
    id: 'dir-1',
    name: 'The Grandpreneur Experience',
    category: 'Business & Services',
    tagline: 'Empowering seasoned leaders to launch generational ventures with clarity.',
    description: 'Providing bespoke coaching, digital business frameworks, and media development for senior entrepreneurs and kingdom executives.',
    website: 'https://www.msunique.net',
    location: 'Houston, TX & Virtual',
    founder: 'Marshia Salcedo',
  },
  {
    id: 'dir-2',
    name: 'Grace & Salt Heritage Goods',
    category: 'Creative & Media',
    tagline: 'Scripture-inspired home decor, journals, and intentional lifestyle wares.',
    description: 'Handcrafted artisan goods that spark gospel conversations at the kitchen table and workplace desk.',
    website: 'https://www.msunique.net',
    location: 'Dallas, TX',
    founder: 'Eleanor Vance',
  },
  {
    id: 'dir-3',
    name: 'Covenant Hope Outreach Ministries',
    category: 'Ministries & Non-Profits',
    tagline: 'Bridging pastoral care, food relief, and youth empowerment across Texas.',
    description: 'Serving over 500 families monthly through emergency pantry reserves, student tutoring, and community prayer fellowships.',
    website: 'https://www.msunique.net',
    location: 'San Antonio, TX',
    founder: 'Pastor Arthur & Team',
  },
  {
    id: 'dir-4',
    name: 'Kingdom Counsel & Strategic Accounting',
    category: 'Business & Services',
    tagline: 'Tax planning, 501(c)(3) compliance, and CFO advisory for church ministries.',
    description: 'Equipping faith-based organizations and entrepreneurs with ethical stewardship practices and sustainable capital strategies.',
    website: 'https://www.msunique.net',
    location: 'Austin, TX',
    founder: 'Marcus Sterling, CPA',
  },
];

export function Screen7Marketplace({ onNavigate }: Screen7MarketplaceProps) {
  // Form State
  const [businessName, setBusinessName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedInterest, setSelectedInterest] = useState('Premier Multimedia Sponsor');
  const [optionalMessage, setOptionalMessage] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('featured_article');
  
  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    interest: string;
  } | null>(null);

  // Directory filter state
  const [directoryFilter, setDirectoryFilter] = useState<'All' | 'Business & Services' | 'Ministries & Non-Profits' | 'Creative & Media'>('All');

  const inquiryFormRef = useRef<HTMLDivElement>(null);

  const handleSelectPackage = (pkg: SponsorPackage) => {
    playTickSound();
    setSelectedPackageId(pkg.id);
    setSelectedInterest(pkg.tierName);
    
    // Smoothly scroll to the inquiry box
    if (inquiryFormRef.current) {
      inquiryFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !contactEmail.trim()) return;

    setIsSubmitting(true);
    playChimeSound();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({
        name: businessName,
        email: contactEmail,
        interest: selectedInterest,
      });
    }, 400);
  };

  const handleResetForm = () => {
    playTickSound();
    setSubmittedData(null);
    setBusinessName('');
    setContactEmail('');
    setOptionalMessage('');
  };

  const filteredDirectory = directoryFilter === 'All'
    ? SAMPLE_DIRECTORY_LISTINGS
    : SAMPLE_DIRECTORY_LISTINGS.filter((item) => item.category === directoryFilter);

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Editorial Header & Section Metadata */}
      <div className="border-b border-stone-200 pb-8 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <span className="font-mono text-stone-700 font-bold uppercase tracking-wider">
              SCREEN 07 OF 08
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-800 font-semibold uppercase">SPONSOR & ADVERTISING SHOWCASE</span>
          </div>

          <div className="flex items-center gap-2 text-stone-500">
            <span>Issue 02 Edition</span>
            <span aria-hidden="true">·</span>
            <span>Now Booking: Issue 03 & Q4 Campaigns</span>
          </div>
        </div>

        {/* Headline & Tagline requested */}
        <div className="pt-2">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            The BYOB Kingdom Marketplace & Partner Showcase
          </h1>
          <p className="font-serif text-lg sm:text-xl text-amber-900 font-medium italic mt-2">
            “Promote your business, ministry, or initiative to an engaged, faith-driven audience.”
          </p>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-3xl mt-3 font-sans">
            Connecting readers with values-aligned services, local Texas entrepreneurs, and Kingdom enterprises.
            Whether you operate a burgeoning local ministry, an established family boutique, or an executive advisory firm, 
            BYOB Magazine puts your mission directly into the hands of faith-rooted leaders.
          </p>
        </div>
      </div>

      {/* 3 Sponsor Packages (Interactive 3-Tier Grid) */}
      <section aria-labelledby="packages-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Partnership Tiers</span>
            </div>
            <h2 id="packages-heading" className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Select Your Advertising & Sponsorship Package
            </h2>
          </div>
          <p className="text-xs text-stone-500 max-w-xs sm:text-right">
            Click any package to auto-fill the inquiry form below and reserve your space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SPONSOR_PACKAGES.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 border ${
                  pkg.popular ? 'bg-gradient-to-b from-amber-50/40 via-white to-white' : ''
                } ${pkg.highlightColor} ${
                  isSelected ? 'ring-2 ring-amber-600 scale-[1.01]' : 'hover:shadow-md'
                }`}
              >
                {/* Popularity or Tier Flag */}
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-800 text-white font-mono text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-xs">
                      Editor’s Choice
                    </span>
                  </div>
                )}

                <div className="space-y-5">
                  {/* Tier Header */}
                  <div>
                    <div className="text-xs font-mono font-bold tracking-wider text-amber-800">
                      {pkg.badge}
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                      {pkg.tierName}
                    </h3>
                    <p className="text-xs font-semibold text-amber-900/90 font-mono mt-2 bg-amber-50/70 p-2 rounded-md border border-amber-200/60">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {pkg.description}
                  </p>

                  {/* Best For Box */}
                  <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/70 space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-stone-500 block">
                      Best For:
                    </span>
                    <span className="text-xs font-semibold text-stone-800">
                      {pkg.bestFor}
                    </span>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-stone-400">
                      Package Includes:
                    </span>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 leading-snug">
                          <Check className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Button */}
                <div className="pt-6 mt-6 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-amber-800 text-white shadow-md'
                        : 'bg-stone-100 hover:bg-amber-100 text-stone-900 border border-stone-200'
                    }`}
                  >
                    <span>{isSelected ? 'Tier Selected' : `Select ${pkg.tierName}`}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Directory Preview Showcase */}
      <section aria-labelledby="directory-heading" className="bg-[#181615] text-stone-200 rounded-2xl p-6 sm:p-8 lg:p-10 border border-amber-900/40 space-y-8 relative overflow-hidden">
        {/* Subtle decorative gold gradient */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              <Store className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </div>
            <h2 id="directory-heading" className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Sample BYOB Kingdom Marketplace Directory
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 max-w-2xl leading-relaxed">
              Explore how your brand, non-profit, or ministry is presented to readers across Texas and national digital subscribers.
            </p>
          </div>

          {/* Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-900 rounded-lg border border-stone-800 shrink-0">
            {(['All', 'Business & Services', 'Ministries & Non-Profits', 'Creative & Media'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  playTickSound();
                  setDirectoryFilter(filter);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  directoryFilter === filter
                    ? 'bg-amber-500 text-stone-950 font-semibold shadow-xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {filter === 'All' ? 'All Partners' : filter.replace(' & ', '/')}
              </button>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredDirectory.map((listing) => (
            <div
              key={listing.id}
              className="p-5 rounded-xl bg-stone-900/80 border border-stone-800 hover:border-amber-700/60 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                        {listing.name}
                      </h3>
                      <span title="Verified Kingdom Partner" className="inline-flex items-center">
                        <BadgeCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 font-mono mt-0.5">
                      <span>{listing.category}</span>
                      <span>·</span>
                      <span>{listing.location}</span>
                    </div>
                  </div>

                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold px-2 py-0.5 rounded-sm bg-amber-950/80 text-amber-300 border border-amber-800/60 shrink-0">
                    Directory Partner
                  </span>
                </div>

                <p className="text-xs font-serif italic text-amber-200/90 leading-snug">
                  “{listing.tagline}”
                </p>

                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {listing.description}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400 font-mono">
                  Founder: <span className="text-stone-300">{listing.founder}</span>
                </span>
                <a
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold group/link"
                >
                  <span>Visit Partner Website</span>
                  <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action / Inquiry Form & Direct Contact Box */}
      <div 
        ref={inquiryFormRef} 
        className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-sm space-y-8"
      >
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-800 font-bold">
            <Send className="w-3.5 h-3.5" />
            <span>Partnership Inquiry</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            Request Media Kit & Reserve Your Ad Placement
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Fill in your details to receive our comprehensive 2026 Rate Card, distribution analytics, and creative submission deadlines for upcoming editions.
          </p>
        </div>

        {submittedData ? (
          <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-xl space-y-4 animate-fadeIn">
            <div className="flex items-center gap-3 text-amber-900">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <h3 className="font-serif text-lg font-bold">Inquiry Received with Appreciation</h3>
                <p className="text-xs text-stone-600 mt-0.5">
                  Thank you, <strong className="text-stone-900">{submittedData.name}</strong>. Our editorial partnership coordinator has logged your request for the <strong className="text-stone-900">{submittedData.interest}</strong> package.
                </p>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg border border-amber-200/60 text-xs space-y-2 text-stone-700">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="font-mono text-stone-500 uppercase">Contact Email</span>
                <span className="font-semibold text-stone-900">{submittedData.email}</span>
              </div>
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="font-mono text-stone-500 uppercase">Selected Interest</span>
                <span className="font-semibold text-amber-900">{submittedData.interest}</span>
              </div>
              <p className="text-[11px] text-stone-500 pt-1 leading-relaxed">
                A copy of the BYOB Media Kit has been queued for your inbox. Marshia Salcedo or our media desk will follow up within 24–48 business hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:marshia@msunique.net?subject=BYOB%20Magazine%20Advertising%20Inquiry%20-%20${encodeURIComponent(submittedData.name)}&body=Hello%20Marshia,%0D%0A%0D%0AI%20am%20interested%20in%20the%20${encodeURIComponent(submittedData.interest)}%20for%20${encodeURIComponent(submittedData.name)}.%20Please%20send%20over%20the%20complete%20Rate%20Card.%0D%0A%0D%0AContact:%20${encodeURIComponent(submittedData.email)}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 transition-colors shadow-xs"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Send Direct Email to Marshia</span>
              </a>

              <button
                type="button"
                onClick={handleResetForm}
                className="px-4 py-2.5 rounded-lg text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 transition-colors"
              >
                Submit Another Inquiry
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitInquiry} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Field 1: Business / Ministry Name */}
              <div className="space-y-2">
                <label htmlFor="business-name" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono">
                  Business / Ministry Name <span className="text-amber-700">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="business-name"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g., Kingdom Leaders Fellowship or Salt & Light Boutique"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Field 2: Contact Email */}
              <div className="space-y-2">
                <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono">
                  Contact Email <span className="text-amber-700">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="partner@yourministry.org"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Field 3: Select Interest Dropdown */}
            <div className="space-y-2">
              <label htmlFor="sponsor-interest" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono">
                Select Interest <span className="text-amber-700">*</span>
              </label>
              <div className="relative">
                <Layers className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="sponsor-interest"
                  value={selectedInterest}
                  onChange={(e) => {
                    setSelectedInterest(e.target.value);
                    const match = SPONSOR_PACKAGES.find(p => p.tierName === e.target.value);
                    if (match) setSelectedPackageId(match.id);
                  }}
                  className="w-full pl-10 pr-10 py-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-colors appearance-none cursor-pointer"
                >
                  <option value="Community Directory Listing">Community Directory Listing (Tier 1)</option>
                  <option value="Featured Article Partner">Featured Article Partner (Tier 2)</option>
                  <option value="Premier Multimedia Sponsor">Premier Multimedia Sponsor (Tier 3)</option>
                  <option value="Custom Kingdom Bundle">Custom Kingdom Bundle / Multi-Issue Sponsorship</option>
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Optional Notes */}
            <div className="space-y-2">
              <label htmlFor="optional-notes" className="block text-xs font-semibold uppercase tracking-wider text-stone-700 font-mono">
                Project Vision or Target Timeline <span className="text-stone-400 lowercase">(optional)</span>
              </label>
              <textarea
                id="optional-notes"
                rows={2}
                value={optionalMessage}
                onChange={(e) => setOptionalMessage(e.target.value)}
                placeholder="Tell us briefly about your target audience, launch dates, or specific questions..."
                className="w-full px-4 py-3 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 focus:bg-white transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 active:scale-[0.99] rounded-lg shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 disabled:opacity-60 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Processing Request...' : 'Request Media Kit & Ad Rates'}</span>
              </button>

              <span className="text-xs text-stone-500 font-sans">
                🔒 Privacy guaranteed. No spam, ever.
              </span>
            </div>
          </form>
        )}

        {/* Direct Note requested */}
        <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-600 bg-stone-50/70 p-4 rounded-xl border border-stone-200/80">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-amber-800 shrink-0" />
            <p>
              Questions? Contact Marshia at{' '}
              <a
                href="mailto:marshia@msunique.net"
                className="font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-2 transition-colors"
              >
                marshia@msunique.net
              </a>{' '}
              or visit{' '}
              <a
                href="https://www.msunique.net"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-2 inline-flex items-center gap-0.5 transition-colors"
              >
                <span>www.msunique.net</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              .
            </p>
          </div>
          <span className="text-[11px] font-mono text-stone-500">
            MsUnique Media Group · Houston, TX
          </span>
        </div>
      </div>

      {/* Navigation Footer Controls */}
      <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            playTickSound();
            onNavigate(6);
          }}
          className="text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-950 transition-colors"
        >
          ← Previous: Media & Outreach
        </button>

        <button
          type="button"
          onClick={() => {
            playTickSound();
            onNavigate(8);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-md transition-all group"
        >
          <span>Next: Subscribe to BYOB Magazine</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
