const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');
const Gig = require('../models/Gig');
const Booking = require('../models/Booking');

dotenv.config();

const usersData = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@campus.edu',
    password: 'password123',
    department: 'Computer Applications (MCA)',
    skills: ['React Native', 'Node.js', 'MongoDB', 'Python'],
    rating: 4.9,
    avatar: 'AS',
    gigsCompleted: 14,
    gigsPosted: 4,
  },
  {
    name: 'Priya Patel',
    email: 'priya.design@campus.edu',
    password: 'password123',
    department: 'Design & Media Arts',
    skills: ['Figma', 'Illustrator', 'Poster Design', 'Canva'],
    rating: 4.8,
    avatar: 'PP',
    gigsCompleted: 21,
    gigsPosted: 3,
  },
  {
    name: 'Rohan Verma',
    email: 'rohan.tech@campus.edu',
    password: 'password123',
    department: 'Information Science',
    skills: ['Python', 'Data Structures', 'SQL', 'FastAPI'],
    rating: 4.7,
    avatar: 'RV',
    gigsCompleted: 9,
    gigsPosted: 2,
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya.content@campus.edu',
    password: 'password123',
    department: 'Humanities & Communications',
    skills: ['Report Proofreading', 'Technical Writing', 'PPT Design'],
    rating: 5.0,
    avatar: 'AI',
    gigsCompleted: 18,
    gigsPosted: 3,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('[Seed] Clearing existing collections...');
    await Booking.deleteMany({});
    await Gig.deleteMany({});
    await User.deleteMany({});

    console.log('[Seed] Inserting Users...');
    const createdUsers = await User.insertMany(usersData);
    const u1 = createdUsers[0];
    const u2 = createdUsers[1];
    const u3 = createdUsers[2];
    const u4 = createdUsers[3];

    const gigsData = [
      {
        title: 'React Native Cross-Platform UI Component Dev',
        category: 'Coding',
        description: 'Clean responsive UI components, navigation integration, and styling tailored for student mobile projects.',
        price: 450,
        deliveryTime: '2 Days',
        owner: u1._id,
        status: 'available',
        rating: 4.9,
        reviewsCount: 16,
        features: [
          'Full TypeScript component code',
          'Responsive React Native styles',
          'Clean props interface',
        ],
      },
      {
        title: 'College Fest Poster & Social Media Graphics',
        category: 'Design',
        description: 'Eye-catching posters, banners, and Instagram promo designs for departmental symposiums and cultural events.',
        price: 300,
        deliveryTime: '24 Hours',
        owner: u2._id,
        status: 'available',
        rating: 4.8,
        reviewsCount: 22,
        features: [
          'High resolution print-ready PDF',
          'Source Canva / Figma file',
          '2 Revision rounds',
        ],
      },
      {
        title: 'Python Lab Debugging & Data Structures Help',
        category: 'Tutoring',
        description: '1-on-1 tutoring session on Trees, Graphs, Sorting, Dynamic Programming, and practical exam lab problem walkthroughs.',
        price: 350,
        deliveryTime: 'Same Day',
        owner: u3._id,
        status: 'available',
        rating: 4.7,
        reviewsCount: 12,
        features: [
          'Line-by-line algorithm debugging',
          'Complexity analysis notes',
          'Example test cases',
        ],
      },
      {
        title: 'Project Synopsis & Dissertation Proofreading',
        category: 'Writing',
        description: 'Grammar review, formatting check according to college guidelines, and clarity improvements for project reports.',
        price: 250,
        deliveryTime: '2 Days',
        owner: u4._id,
        status: 'available',
        rating: 5.0,
        reviewsCount: 19,
        features: [
          'Track-changes document',
          'Academic tone check',
          'Plagiarism check summary',
        ],
      },
      {
        title: 'Pitch Deck & Seminar PPT Presentation',
        category: 'Design',
        description: 'Sleek dark-mode / modern minimalist slide deck designed for maximum audience impact during project viva.',
        price: 500,
        deliveryTime: '2 Days',
        owner: u2._id,
        status: 'available',
        rating: 4.9,
        reviewsCount: 8,
        features: [
          'Custom vector infographics',
          'Animations and slide transitions',
          'Speaker notes support',
        ],
      },
      {
        title: 'Express & MongoDB REST API Setup with CRUD',
        category: 'Coding',
        description: 'Modular Node.js/Express backend setup with Mongoose schemas, controllers, and JSON response handling.',
        price: 600,
        deliveryTime: '3 Days',
        owner: u1._id,
        status: 'available',
        rating: 5.0,
        reviewsCount: 10,
        features: [
          'Clean MVC architecture',
          'Seed script included',
          'Postman / cURL examples',
        ],
      },
    ];

    console.log('[Seed] Inserting Gigs...');
    const createdGigs = await Gig.insertMany(gigsData);

    console.log('[Seed] Inserting Sample Bookings...');
    const bookingsData = [
      {
        gig: createdGigs[0]._id,
        user: u3._id,
        status: 'active',
        notes: 'Need components for campus attendance app module',
      },
      {
        gig: createdGigs[1]._id,
        user: u1._id,
        status: 'completed',
        notes: 'Annual tech symposium branding banner',
      },
    ];
    await Booking.insertMany(bookingsData);

    console.log(`[Seed] Success! Created ${createdUsers.length} users, ${createdGigs.length} gigs, and ${bookingsData.length} bookings.`);
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedDatabase();
