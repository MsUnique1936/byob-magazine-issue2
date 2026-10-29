export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type SpinnerResultType = 'courage' | 'faithfulness' | 'service';

export interface SpinnerResult {
  id: SpinnerResultType;
  label: string;
  theme: string;
  color: string;
  accentColor: string;
  scripture: string;
  reference: string;
  challenge: string;
  prayerFocus: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  tagline: string;
  description: string;
  scriptureAnchor: string;
  impactMetrics: string[];
  archivalQuote: string;
}

export interface CongratulatoryNote {
  id: string;
  author: string;
  roleOrRelation: string;
  message: string;
  date: string;
  badge: string;
  isVoiceMessage?: boolean;
  voiceAudioUrl?: string;
  voiceDuration?: string;
}

export type SubmissionType = 'Prayer Request' | 'Testimony' | 'Encouragement';

export interface CommunityPost {
  id: string;
  author: string;
  contact: string;
  type: SubmissionType;
  message: string;
  timestamp: string;
  prayerCount: number;
  userPrayed?: boolean;
}
