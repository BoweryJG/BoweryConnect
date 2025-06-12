export interface Resource {
  id: string;
  name: string;
  category: string;
  description: string;
  address?: string;
  phone?: string;
  website?: string;
  hours?: string;
  services: string[];
  requirements?: string[];
  specialFeatures?: string[];
  accessibility?: string[];
  languages?: string[];
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'friendship',
    title: 'Friendship & Community',
    subtitle: 'Connect with others who understand',
    icon: '🤝',
    color: '#10B981',
    description: 'Safe spaces to meet people, build friendships, and find your community'
  },
  {
    id: 'creative',
    title: 'Creative Expression',
    subtitle: 'Art, music, writing, theater',
    icon: '🎨',
    color: '#8B5CF6',
    description: 'Free programs to express yourself through arts and creativity'
  },
  {
    id: 'learning',
    title: 'Learning & Growth',
    subtitle: 'Education and skill building',
    icon: '📚',
    color: '#3B82F6',
    description: 'Free classes, job training, and educational opportunities'
  },
  {
    id: 'culture',
    title: 'Culture & Museums',
    subtitle: 'Free access to NYC culture',
    icon: '🏛️',
    color: '#F59E0B',
    description: 'Museum passes, cultural events, and free entertainment'
  },
  {
    id: 'tech',
    title: 'Technology Access',
    subtitle: 'Computers, internet, and digital skills',
    icon: '💻',
    color: '#14B8A6',
    description: 'Free computer access, WiFi, and technology training'
  },
  {
    id: 'wellness',
    title: 'Wellness & Self-Care',
    subtitle: 'Physical and mental wellness',
    icon: '🧘',
    color: '#EC4899',
    description: 'Free fitness, meditation, and wellness programs'
  }
];

export const resources: Resource[] = [
  // Friendship & Community Resources
  {
    id: 'coalition-olivieri',
    name: 'Olivieri Drop-In Center',
    category: 'friendship',
    description: '24/7 safe space with meals, showers, and community. No questions asked, just come as you are.',
    address: '257 West 30th Street (between 7th and 8th Avenue)',
    hours: 'Open 24 hours a day, 7 days a week',
    services: [
      'Hot meals 3x daily',
      'Safe place to rest',
      'Showers and hygiene',
      'Case management',
      'Community activities',
      'Mail services'
    ],
    specialFeatures: [
      '24/7 access - never closed',
      'No ID required',
      'Friendly staff who understand',
      'Clean, safe environment'
    ],
    accessibility: ['Wheelchair accessible', 'Service animals welcome']
  },
  {
    id: 'urban-pathways-9th',
    name: '9th Avenue Drop-In Center',
    category: 'friendship',
    description: 'Low-barrier drop-in center focused on building community and connections.',
    address: '9th Avenue, NYC',
    website: 'urbanpathways.org',
    hours: '24/7',
    services: [
      'Community space',
      'Group activities',
      'Peer support',
      'Mental health support',
      'Substance abuse counseling',
      'Housing assistance'
    ],
    specialFeatures: [
      'Housing-first approach',
      'No prerequisites',
      'Peer counselors available'
    ]
  },
  {
    id: 'goddard-riverside',
    name: 'Goddard Riverside Community Center',
    category: 'friendship',
    description: 'Community hub connecting people to resources and each other. Promotes self-advocacy and dignity.',
    address: 'Multiple Upper West Side locations',
    website: 'goddard.org',
    services: [
      'Community programs for all ages',
      'Support groups',
      'Social activities',
      'Legal services',
      'Food pantry',
      'Senior programs'
    ],
    specialFeatures: [
      'Intergenerational programs',
      'LGBTQ+ friendly',
      'Advocacy training'
    ]
  },

  // Creative Expression Resources
  {
    id: 'the-door-arts',
    name: 'The Door - Creative Arts',
    category: 'creative',
    description: 'Daily creative arts programming with performance opportunities. Express yourself through art, music, and theater.',
    address: '555 Broome Street, New York, NY 10013',
    phone: '(212) 941-9090',
    website: 'door.org/arts/',
    hours: 'Monday-Friday, various times',
    services: [
      'Visual arts classes',
      'Music production',
      'Theater workshops',
      'Dance classes',
      'Creative writing',
      'Open mic nights',
      'Art exhibitions'
    ],
    specialFeatures: [
      'Professional artist instructors',
      'Showcase opportunities',
      'All materials provided',
      'No experience needed'
    ],
    requirements: ['Ages 12-24'],
    languages: ['English', 'Spanish']
  },
  {
    id: 'ny-writers-coalition',
    name: 'NY Writers Coalition',
    category: 'creative',
    description: 'Free creative writing workshops specifically for marginalized communities. Your voice matters.',
    website: 'nywriterscoalition.org',
    services: [
      'Weekly writing workshops',
      'Poetry groups',
      'Storytelling circles',
      'Publishing opportunities',
      'Writing supplies provided'
    ],
    specialFeatures: [
      'Workshops in shelters',
      'No writing experience needed',
      'Judgment-free space',
      'Published anthology opportunities'
    ]
  },
  {
    id: 'project-renewal-top',
    name: 'The Other Place (TOP)',
    category: 'creative',
    description: 'Psychosocial day program teaching life skills through art. Creativity as healing.',
    website: 'projectrenewal.org',
    services: [
      'Art therapy groups',
      'Music programs',
      'Creative expression',
      'Life skills through art',
      'Gallery exhibitions'
    ],
    specialFeatures: [
      'Trauma-informed approach',
      'Peer support',
      'Sells participant artwork'
    ]
  },

  // Learning & Growth Resources
  {
    id: 'nypl-classes',
    name: 'New York Public Library - Free Classes',
    category: 'learning',
    description: '92 locations offering free classes, computer training, and educational programs. No library card needed for many programs.',
    website: 'nypl.org',
    hours: 'Varies by location',
    services: [
      'Computer literacy classes',
      'English language learning',
      'Job search assistance',
      'Resume workshops',
      'Technology training',
      'GED preparation',
      'Financial literacy'
    ],
    specialFeatures: [
      'No prerequisites',
      'Outreach to shelters',
      'One-on-one help available',
      'Quiet study spaces'
    ],
    accessibility: ['All locations wheelchair accessible', 'Assistive technology available']
  },
  {
    id: 'project-renewal-culinary',
    name: 'Project Renewal Culinary Arts Training',
    category: 'learning',
    description: 'Professional culinary training program leading to real restaurant jobs. Learn from chef instructors.',
    website: 'projectrenewal.org',
    services: [
      '12-week culinary program',
      'ServSafe certification',
      'Job placement assistance',
      'Paid training stipend',
      'Professional uniforms provided'
    ],
    specialFeatures: [
      'Industry connections',
      'Graduates working in top NYC restaurants',
      'Ongoing support after placement'
    ],
    requirements: ['Must be in recovery or stable housing']
  },
  {
    id: 'coalition-first-step',
    name: 'First Step Job Training',
    category: 'learning',
    description: 'Job training and placement for women. Build confidence and skills for living-wage employment.',
    services: [
      'Skills assessment',
      'Job readiness training',
      'Interview preparation',
      'Professional clothing',
      'Job placement support',
      'Ongoing mentorship'
    ],
    specialFeatures: [
      'Women-only space',
      'Trauma-informed',
      'Living wage focus'
    ],
    requirements: ['Identify as woman']
  },

  // Culture & Museums Resources
  {
    id: 'culture-pass',
    name: 'NYC Culture Pass',
    category: 'culture',
    description: 'Free passes to 100+ museums and cultural institutions with your library card.',
    website: 'culturepass.nyc',
    services: [
      'Museum admissions',
      'Zoo and aquarium passes',
      'Botanical garden access',
      'Historical sites',
      'Cultural center programs'
    ],
    specialFeatures: [
      'Reserve online or by phone',
      'Family passes available',
      'New institutions added regularly'
    ],
    requirements: ['NYC library card (free to get)']
  },
  {
    id: 'idnyc-culture',
    name: 'IDNYC Cultural Memberships',
    category: 'culture',
    description: 'Free one-year memberships to 40+ cultural institutions with IDNYC card.',
    website: 'nyc.gov/idnyc',
    services: [
      'Museum memberships',
      'Zoo memberships',
      'Discounts on events',
      'Member-only hours',
      'Guest passes included'
    ],
    specialFeatures: [
      'No address needed for IDNYC',
      'Accepts shelter address',
      'Multiple language options'
    ]
  },

  // Technology Access Resources
  {
    id: 'library-tech',
    name: 'Library Technology Centers',
    category: 'tech',
    description: 'Free computer and internet access at all library locations. No time limits during off-peak hours.',
    website: 'nypl.org',
    services: [
      'Desktop computers',
      'Free WiFi',
      'Printing services',
      'Scanner access',
      'Tech help desk',
      'Device charging'
    ],
    specialFeatures: [
      'No library card needed for WiFi',
      'Extended computer time available',
      'One-on-one tech help'
    ]
  },
  {
    id: 'linknyc-kiosks',
    name: 'LinkNYC Free WiFi Kiosks',
    category: 'tech',
    description: 'Over 1,800 kiosks providing free WiFi, phone calls, and device charging throughout NYC.',
    services: [
      'Free gigabit WiFi',
      'Free phone calls anywhere in US',
      'USB device charging',
      'Access to city services',
      '911 emergency button'
    ],
    specialFeatures: [
      'Available 24/7',
      'No registration required',
      'Multiple languages',
      'Wheelchair accessible'
    ]
  },

  // Wellness & Self-Care Resources
  {
    id: 'parks-fitness',
    name: 'NYC Parks Free Fitness',
    category: 'wellness',
    description: 'Free fitness classes in parks throughout the city. No equipment or experience needed.',
    website: 'nycgovparks.org/events/free-fitness',
    services: [
      'Yoga classes',
      'Zumba',
      'Tai Chi',
      'Walking groups',
      'Meditation sessions',
      'Senior fitness'
    ],
    specialFeatures: [
      'No registration required',
      'All fitness levels welcome',
      'Seasonal programming'
    ]
  },
  {
    id: 'mindful-harlem',
    name: 'Mindful Harlem',
    category: 'wellness',
    description: 'Free meditation and mindfulness programs. Find peace and reduce stress.',
    services: [
      'Weekly meditation sits',
      'Mindfulness workshops',
      'Stress reduction techniques',
      'Community support'
    ],
    specialFeatures: [
      'No experience needed',
      'Come as you are',
      'Peer-led groups'
    ]
  }
];

// Helper function to get resources by category
export const getResourcesByCategory = (categoryId: string): Resource[] => {
  return resources.filter(resource => resource.category === categoryId);
};

// Helper function to search resources
export const searchResources = (query: string): Resource[] => {
  const lowercaseQuery = query.toLowerCase();
  return resources.filter(resource => 
    resource.name.toLowerCase().includes(lowercaseQuery) ||
    resource.description.toLowerCase().includes(lowercaseQuery) ||
    resource.services.some(service => service.toLowerCase().includes(lowercaseQuery))
  );
};