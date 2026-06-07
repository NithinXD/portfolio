export const projects = [
  {
    id: 1,
    title: 'Multi-Agent Swarm with Voice I/O',
    description: 'Built a voice-enabled AI bot for a spa: agents query PostgreSQL, confirm bookings, and handle FAQs via spoken conversation.',
    imageUrl: '',
    techStack: ['Python', 'Langchain', 'PostgreSQL', 'FastAPI'],
    howItWasDone: 'Designed a multi-agent orchestration architecture where specialized AI agents cooperate. One handles semantic search over spa packages, another manages live booking state via PostgreSQL. Integrated Speech-to-Text and Text-to-Speech endpoints for seamless phone interactions with real customers.'
  },
  {
    id: 2,
    title: 'Book.ai — AI Ebook Reader',
    description: "Context-aware AI assistant answering questions without revealing plot points beyond the reader's current page.",
    imageUrl: '/Work/Book.ai/result.jpg',
    techStack: ['React Native', 'Node.js', 'OpenAI', 'Pinecone'],
    howItWasDone: 'Implemented a sliding context window based on the user\'s reading progress. By calculating token limits up to the current page boundary, the RAG (Retrieval-Augmented Generation) pipeline dynamically prevents spoiler leakage while providing deep contextual character analysis.'
  },
  {
    id: 3,
    title: 'Dropso Connect',
    description: 'Architected a double-sided services marketplace: Node.js/Express backend, React Native mobile app, and React dashboard.',
    imageUrl: '',
    techStack: ['React Native', 'Node.js', 'Express', 'MongoDB'],
    howItWasDone: 'Developed a dual-portal architecture with synchronized WebSockets for real-time service tracking. Engineered a robust matching algorithm connecting localized service providers with users based on proximity and rating heuristics.'
  },
  {
    id: 4,
    title: 'Mini PM System',
    description: 'Full-stack multi-tenant PM app with Django + GraphQL backend and React/TypeScript + Apollo Client frontend.',
    imageUrl: '',
    techStack: ['Django', 'GraphQL', 'React', 'TypeScript', 'Apollo'],
    howItWasDone: 'Utilized Django multi-tenancy schemas for strict data isolation between corporate accounts. Replaced traditional REST endpoints with GraphQL to optimize payload sizes and enable rapid frontend iteration using Apollo Client caching.'
  },
  {
    id: 5,
    title: 'Yimeiren — Cosmetics E-Commerce',
    description: 'Full-featured cosmetics marketplace with microservices architecture, integrated payments, in-app credit wallets.',
    imageUrl: '/Work/Yimeiren/company.JPG',
    techStack: ['Flutter', 'Microservices', 'Payment Gateway', 'Redis'],
    howItWasDone: 'Transitioned a monolithic legacy system to domain-driven microservices. Implemented distributed transactions for the in-app credit wallet to ensure ledger consistency during high-traffic flash sales. Built cross-platform mobile interfaces in Flutter.'
  },
  {
    id: 6,
    title: 'Truxen',
    description: 'Flutter-based cross-platform fleet-tracking app providing traders and factory owners live driver visibility.',
    imageUrl: '/Work/Truxen/result.JPG',
    techStack: ['Flutter', 'Google Maps API', 'Firebase', 'WebSockets'],
    howItWasDone: 'Integrated background geolocation services natively via Flutter platform channels. Used Firebase Realtime Database for high-frequency location updates and optimized battery consumption by adjusting GPS polling rates based on accelerometer data.'
  }
];
