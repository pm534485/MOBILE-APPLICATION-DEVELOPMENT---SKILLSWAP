const http = require('http');

const PORT = process.env.BASIC_PORT || 5001;

const sampleGigsBasic = [
  {
    id: 'basic-1',
    title: 'Python Lab Debugging & Unit Tests',
    category: 'Tutoring',
    price: 350,
    freelancerName: 'Aditi Rao',
    rating: 4.9,
    description: 'Assistance with Python algorithms, data structures, and lab assignment debugging.',
  },
  {
    id: 'basic-2',
    title: 'Modern PPT & Pitch Deck Design',
    category: 'Design',
    price: 500,
    freelancerName: 'Rohan Verma',
    rating: 4.8,
    description: 'High-impact presentation deck design for seminar and project reviews.',
  },
  {
    id: 'basic-3',
    title: 'React Native Mobile App UI Review',
    category: 'Coding',
    price: 650,
    freelancerName: 'Kavya Nair',
    rating: 5.0,
    description: 'Code review, component styling fixes, and architecture consultation.',
  },
];

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const { method, url } = req;

  if (method === 'GET' && url === '/api/status') {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        status: 'ok',
        serverType: 'Pure Node.js http.createServer',
        uptimeSeconds: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
        greeting: 'Welcome to SkillSwap Basic Server (Phase 8)',
      })
    );
  } else if (method === 'GET' && url === '/api/gigs-basic') {
    res.writeHead(200);
    res.end(
      JSON.stringify({
        count: sampleGigsBasic.length,
        gigs: sampleGigsBasic,
      })
    );
  } else {
    res.writeHead(404);
    res.end(
      JSON.stringify({
        error: 'Not Found',
        message: `Route ${method} ${url} does not exist on basic server`,
        availableRoutes: ['GET /api/status', 'GET /api/gigs-basic'],
      })
    );
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[SkillSwap Basic Server] Running on http://localhost:${PORT}`);
});

module.exports = server;
