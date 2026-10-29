import { CommunityPost, CongratulatoryNote, SpinnerResult, TimelineMilestone } from '../types/magazine';

export const SPINNER_RESULTS: SpinnerResult[] = [
  {
    id: 'courage',
    label: 'Courage',
    theme: 'Steadfast Boldness',
    color: '#9A3412', // Rich terracotta/bronze
    accentColor: '#FDBA74',
    scripture: 'Nehemiah 2:18',
    reference: '“Let us rise up and build. So they strengthened their hands for this good work.”',
    challenge: 'Identify one person in your workplace or community today and offer a word of biblical encouragement.',
    prayerFocus: '“Father, grant me willing hands and steadfast faith to build Your Kingdom where I am placed today.”',
  },
  {
    id: 'faithfulness',
    label: 'Faithfulness',
    theme: 'Unwavering Trust',
    color: '#115E59', // Deep teal/forest
    accentColor: '#99F6E4',
    scripture: 'Hebrews 11:1',
    reference: '“Now faith is the substance of things hoped for, the evidence of things not seen.”',
    challenge: 'Take one concrete action step toward a goal or decision you have been delaying out of uncertainty.',
    prayerFocus: '“Lord, help me walk by faith and trust Your promises even when I cannot see the full outcome.”',
  },
  {
    id: 'service',
    label: 'Service',
    theme: 'Joyful Endurance',
    color: '#312E81', // Deep indigo/regal navy
    accentColor: '#C7D2FE',
    scripture: 'Galatians 6:9',
    reference: '“And let us not grow weary while doing good, for in due season we shall reap if we do not lose heart.”',
    challenge: 'Perform one anonymous act of kindness or service for a neighbor or colleague today.',
    prayerFocus: '“Jesus, refresh my spirit today so I can serve others with joy and patient endurance.”',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: '1997',
    title: '1997 — Small Beginnings, Mighty Faith',
    tagline: 'Storefront gathering with 12 foundational members',
    description:
      'In 1997, the vision was birthed in a simple storefront gathering with just 12 foundational members. There were no elaborate light displays or large budgets—only an altar, an open Bible, and a conviction that God was preparing a house of refuge and restoration for the community. Great achievements in the Kingdom do not begin with grand facilities; they begin with obedience in the small, unseen moments. Those early prayer meetings laid a spiritual foundation that continues to support everything built today.',
    scriptureAnchor: 'Zechariah 4:10 — “Do not despise these small beginnings, for the Lord rejoices to see the work begin.”',
    impactMetrics: ['12 Charter Members', 'First Weekly Food Basket Ministry', '100% Volunteer Driven'],
    archivalQuote: '“Great achievements in the Kingdom do not begin with grand facilities; they begin with obedience in the small, unseen moments.”',
  },
  {
    year: '2005',
    title: '2005 — Expanding the Canvas: The Debt-Free Sanctuary',
    tagline: 'Moving into a 500-seat facility, debt-free',
    description:
      'As the congregation grew, so did the footprint of the vision. In 2005, through radical generosity, collective prayer, and divine provision, the ministry dedicated a new 500-seat sanctuary—completely debt-free. This milestone was more than a brick-and-mortar achievement; it was a physical monument to God’s financial stewardship and covenant faithfulness. It proved to every member and neighbor that when God commands a move, He provides the resources to complete it.',
    scriptureAnchor: 'Psalm 127:1 — “Unless the Lord builds the house, the builders labor in vain.”',
    impactMetrics: ['500-Seat Sanctuary', '$1.8M Debt-Free Consecration', 'Expanded Free Counseling Services'],
    archivalQuote: '“When God commands a move, He provides the resources to complete it.”',
  },
  {
    year: '2015',
    title: '2015 — Beyond Four Walls: Community Outreach & Youth Empowerment',
    tagline: 'Launch of local food pantry & youth enrichment center',
    description:
      'A true Kingdom builder understands that the church is not a building to gather in, but a movement sent out into the world. In 2015, the ministry expanded its reach beyond the sanctuary doors through the launch of local food pantries, community care initiatives, and youth enrichment programs. By meeting practical needs alongside spiritual guidance, the church became a beacon of hope for families across the city—living out James 2:18: “I will show you my faith by my works.”',
    scriptureAnchor: 'James 2:18 — “I will show you my faith by my works.”',
    impactMetrics: ['45,000+ Families Fed Annually', '180 Youth Mentored Each Semester', '8 College Scholarships Awarded'],
    archivalQuote: '“The church is not a building to gather in, but a movement sent out into the world.”',
  },
  {
    year: '2026',
    title: '2026 — 29 Years and Beyond: Honoring the Past, Building the Future',
    tagline: 'Celebrating 29 years of steadfast leadership and visionary faith (1997–2026)',
    description:
      'Twenty-nine years of pastoral leadership represent thousands of hours spent in prayer, countless counseling sessions, unyielding biblical teaching, and a father’s heart for God’s people. As we mark this 29th Pastoral Anniversary, we do not merely look back at past victories—we look forward with expectation. The foundation is secure, the vision is clear, and the legacy continues to unfold through every life transformed, every family restored, and every believer empowered to step into their calling.',
    scriptureAnchor: 'Hebrews 13:7 — “Remember your leaders, those who spoke to you the word of God. Consider the outcome of their way of life, and imitate their faith.”',
    impactMetrics: ['29 Years of Pastoral Care', '2,400+ Baptisms Celebrated', '14 Active Mission Hubs Globally'],
    archivalQuote: '“The foundation is secure, the vision is clear, and the legacy continues to unfold through every life transformed.”',
  },
];

export const INITIAL_CONGRATULATORY_NOTES: CongratulatoryNote[] = [
  {
    id: 'note-1',
    author: 'Deacon Marcus & Sarah Washington',
    roleOrRelation: 'Members since 1998',
    message:
      'Pastor Arthur and First Lady Evelyn, your consistency in preaching truth without compromise has anchored our family through seasons of sorrow and immense joy. Happy 29th Anniversary!',
    date: 'October 18, 2026',
    badge: 'Faithful Shepherd',
  },
  {
    id: 'note-2',
    author: 'Dr. Kimberly Chen',
    roleOrRelation: 'Youth Enrichment Director',
    message:
      'Thank you for championing our young scholars and believing that ordinary children from our district carry extraordinary divine purpose. Your leadership has built a generational legacy.',
    date: 'October 19, 2026',
    badge: 'Visionary Mentor',
    isVoiceMessage: true,
    voiceDuration: '0:28',
    voiceAudioUrl: '/audio/dr-kimberly-chen-voice-tribute.wav',
  },
  {
    id: 'note-3',
    author: 'Elder James O’Connor',
    roleOrRelation: 'Founding Charter Member (1997)',
    message:
      'From those 12 cold metal chairs in 1997 to thousands of souls today, your heart has never wavered. We thank God for your steadfast humility and shepherd’s heart.',
    date: 'October 20, 2026',
    badge: 'Foundational Pillar',
  },
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    author: 'Evelyn Brooks',
    contact: 'evelyn.b@faithbuilders.org',
    type: 'Testimony',
    message:
      'After 8 months of prayer and uncertainty, our family business finally reopened this week! God provided clients before we even advertised. Nehemiah 2:18 became our daily declaration. Glory to God!',
    timestamp: '2 hours ago',
    prayerCount: 24,
    userPrayed: false,
  },
  {
    id: 'post-2',
    author: 'David & Maria Santos',
    contact: 'santosfamily@msn.com',
    type: 'Prayer Request',
    message:
      'Please join us in prayer for our son Caleb as he deploys overseas next Monday. Praying for divine protection, peace that surpasses understanding, and opportunities to be a light for Christ.',
    timestamp: '5 hours ago',
    prayerCount: 42,
    userPrayed: false,
  },
  {
    id: 'post-3',
    author: 'Sister Theresa Jenkins',
    contact: 'tjenkins@commcare.org',
    type: 'Encouragement',
    message:
      'To everyone feeling weary in your everyday calling: Remember that the Lord sees the quiet sacrifices no one else notices. Galatians 6:9 is your promise today—do not lose heart!',
    timestamp: 'Yesterday',
    prayerCount: 31,
    userPrayed: true,
  },
  {
    id: 'post-4',
    author: 'Jordan Miller',
    contact: 'jmiller.arch@gmail.com',
    type: 'Testimony',
    message:
      'Spun the Scripture Spinner on Faithfulness this morning and finally submitted my proposal for the low-income community clinic. I was terrified, but God opened the doors immediately in the review board!',
    timestamp: 'Yesterday',
    prayerCount: 19,
    userPrayed: false,
  },
];
