export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Freelancer {
  id: string;
  name: string;
  department: string;
  year: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  skills: string[];
  bio: string;
}

export interface Gig {
  id: string;
  _id?: string;
  title: string;
  category: string;
  description: string;
  price: number;
  deliveryTime: string;
  features: string[];
  owner: Freelancer;
  rating: number;
  reviewsCount: number;
  status: 'available' | 'booked';
  createdAt?: string;
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Graphic Design', icon: '🎨' },
  { id: '2', name: 'Content Writing', icon: '✍️' },
  { id: '3', name: 'Web Development', icon: '💻' },
  { id: '4', name: 'Campus Help', icon: '🎒' },
  { id: '5', name: 'Video Editing', icon: '🎬' },
  { id: '6', name: 'Photography', icon: '📸' },
  { id: '7', name: 'Presentation Design', icon: '📊' },
  { id: '8', name: 'Tutoring', icon: '📚' },
];

export const FREELANCERS: Freelancer[] = [
  {
    id: 'f1',
    name: 'Aarav Sharma',
    department: 'Computer Science (MCA)',
    year: '2nd Year',
    avatar: 'AS',
    rating: 4.9,
    reviewCount: 38,
    skills: ['React', 'Node.js', 'UI/UX', 'Python'],
    bio: 'MCA student building high-performance web and mobile apps for campus clubs and student startups.',
  },
  {
    id: 'f2',
    name: 'Priya Patel',
    department: 'Media & Design',
    year: '3rd Year',
    avatar: 'PP',
    rating: 4.8,
    reviewCount: 29,
    skills: ['Figma', 'Illustrator', 'Branding', 'Poster Design'],
    bio: 'Passionate graphic designer creating memorable campus fest identities, club logos, and banners.',
  },
  {
    id: 'f3',
    name: 'Rohan Verma',
    department: 'Mass Communication',
    year: '2nd Year',
    avatar: 'RV',
    rating: 5.0,
    reviewCount: 42,
    skills: ['Premiere Pro', 'After Effects', 'Reels', 'Color Grading'],
    bio: 'Video editor specializing in campus fest reels, YouTube documentaries, and event highlight films.',
  },
  {
    id: 'f4',
    name: 'Ananya Roy',
    department: 'Information Technology',
    year: 'Final Year',
    avatar: 'AR',
    rating: 4.9,
    reviewCount: 51,
    skills: ['Data Structures', 'C++', 'Java', 'Math Tutoring'],
    bio: 'Top-ranked IT scholar passionate about peer-to-peer coding tutoring and exam prep.',
  },
  {
    id: 'f5',
    name: 'Kabir Mehta',
    department: 'Business Administration',
    year: '1st Year MBA',
    avatar: 'KM',
    rating: 4.7,
    reviewCount: 19,
    skills: ['Pitch Decks', 'PowerPoint', 'Case Studies', 'Financial Modeling'],
    bio: 'Creating award-winning pitch decks and presentation slides for business competitions.',
  },
];

export const SAMPLE_GIGS: Gig[] = [
  {
    id: 'g1',
    title: 'Custom Club Website & Portfolio Development',
    category: 'Web Development',
    description:
      'I will build a responsive, clean, modern single-page website or portfolio using React and Vite. Perfect for student clubs, tech fests, or personal academic profiles.',
    price: 1500,
    deliveryTime: '2 Days',
    features: [
      'Responsive mobile & desktop layout',
      'Contact form with email alerts',
      'Clean source code + GitHub deployment',
      '1 free revision session',
    ],
    owner: FREELANCERS[0],
    rating: 4.9,
    reviewsCount: 22,
    status: 'available',
  },
  {
    id: 'g2',
    title: 'Campus Fest Poster & Club Logo Design',
    category: 'Graphic Design',
    description:
      'High-resolution vector logos, print-ready college event posters, and Instagram story templates designed in Figma and Adobe Illustrator.',
    price: 800,
    deliveryTime: '24 Hours',
    features: [
      'High-res PNG & SVG source files',
      'Instagram 9:16 and 1:1 format templates',
      'Print-ready 300 DPI layout',
      'Unlimited revisions until approved',
    ],
    owner: FREELANCERS[1],
    rating: 4.8,
    reviewsCount: 17,
    status: 'available',
  },
  {
    id: 'g3',
    title: 'High-Impact Event Highlight Reel & Reels',
    category: 'Video Editing',
    description:
      'Turn raw campus fest or departmental symposium footage into cinematic, fast-paced Instagram reels and recap videos with trending audio and sound effects.',
    price: 1200,
    deliveryTime: '2 Days',
    features: [
      'Full HD 1080p 60fps export',
      'Beat-matched transitions & color grading',
      'Licensed royalty-free music',
      'Optimized for Instagram & YouTube Shorts',
    ],
    owner: FREELANCERS[2],
    rating: 5.0,
    reviewsCount: 31,
    status: 'available',
  },
  {
    id: 'g4',
    title: '1-on-1 Data Structures & Algorithms Tutoring',
    category: 'Tutoring',
    description:
      'Struggling with Trees, Graphs, or Dynamic Programming? Get targeted, friendly 1-on-1 tutoring sessions tailored for campus placements and semester exams.',
    price: 500,
    deliveryTime: 'Flexible / 1 Hour',
    features: [
      'Live code walkthroughs in C++ or Java',
      'Curated DSA practice problem sheet',
      'Recorded session notes & diagrams',
      'Mock interview questions included',
    ],
    owner: FREELANCERS[3],
    rating: 4.9,
    reviewsCount: 44,
    status: 'available',
  },
  {
    id: 'g5',
    title: 'Investor Pitch Deck & Seminar Presentation',
    category: 'Presentation Design',
    description:
      'Transform boring PowerPoint slides into sleek, convincing investor decks and seminar presentations using custom typography, infographics, and clean data charts.',
    price: 900,
    deliveryTime: '1 Day',
    features: [
      'Up to 15 premium designed slides',
      'Custom vector icons and diagrams',
      'Editable PPTX and PDF versions',
      'Speaker notes formatting',
    ],
    owner: FREELANCERS[4],
    rating: 4.7,
    reviewsCount: 15,
    status: 'available',
  },
  {
    id: 'g6',
    title: 'Academic Research Paper Proofreading & Editing',
    category: 'Content Writing',
    description:
      'Detailed proofreading, grammar corrections, IEEE / APA citation alignment, and plagiarism check for MCA/BTech conference papers and project reports.',
    price: 650,
    deliveryTime: '24 Hours',
    features: [
      'Line-by-line grammar & tone polish',
      'IEEE/APA citation verification',
      'Detailed tracked changes document',
      'Turnitin-friendly rephrasing suggestions',
    ],
    owner: FREELANCERS[1],
    rating: 4.8,
    reviewsCount: 19,
    status: 'available',
  },
];
