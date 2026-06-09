import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "doctel",
    title: "Doctel — Telemedicine App",
    category: "Full Stack",
    description: "Cross-platform telehealth system for doctor-patient video consultations with real-time communication, emergency call routing, and digital prescriptions.",
    coverImage: "https://picsum.photos/seed/doctel-tele/800/450",
    tech: ["Express.js", "MySQL", "Sequelize", "React Native", "React.js", "Socket.IO", "Jitsi", "AWS S3"],
    status: "Live",
    githubUrl: "https://github.com/nahidjc",
    liveUrl: undefined,
    featured: true,
    overview: "Doctel is a comprehensive cross-platform telemedicine application enabling secure, real-time video consultations between patients and doctors. Built with React Native for the patient mobile app and React.js for the doctor web app, it includes OTP authentication, subscription plans, emergency call routing, and digital prescription management.",
    problem: "Access to quality healthcare in Bangladesh is limited by geography and availability of doctors. Patients needed a way to consult doctors instantly from their mobile devices, and doctors needed a professional platform to manage consultations and prescriptions digitally.",
    solution: "Built a full-stack telemedicine platform with a Node.js/Express backend, MySQL database, and Socket.IO for real-time doctor-patient connectivity. Jitsi was integrated for seamless in-app video conferencing, while AWS S3 handles secure prescription document storage.",
    features: [
      "Cross-platform patient mobile app (React Native) and doctor web app (React.js)",
      "Phone number authentication with OTP verification",
      "Real-time doctor-patient connection via Socket.IO",
      "Emergency call system with auto-routing to available doctors",
      "Intelligent call forwarding if doctor rejects within 30 seconds",
      "Jitsi video conferencing integrated natively in-app",
      "Digital prescription creation and SMS delivery to patients",
      "Weekly/monthly health subscription plan management",
      "AWS S3 secure storage for prescription documents"
    ],
    architecture: "React Native (patient) + React.js (doctor) → Express.js API → MySQL/Sequelize → Socket.IO real-time layer → Jitsi video → AWS S3",
    challenges: [
      "Implementing reliable emergency call auto-routing logic that gracefully handles doctor unavailability and missed calls.",
      "Ensuring Jitsi video conferencing worked seamlessly inside React Native without performance degradation.",
      "Designing the Socket.IO event architecture to handle concurrent consultations across many doctor-patient pairs."
    ],
    lessons: [
      "Socket.IO room-based architecture cleanly isolates doctor-patient sessions and scales horizontally.",
      "OTP-based phone authentication is more accessible than email-based auth for the target user demographic.",
      "Auto-forwarding calls with a timeout creates a much better user experience than simple rejection flows."
    ],
    screenshots: [
      "https://picsum.photos/seed/doctel-1/800/500",
      "https://picsum.photos/seed/doctel-2/800/500"
    ]
  },
  {
    id: "proj-2",
    slug: "quizzy",
    title: "Quizzy — Quiz & Campaign App",
    category: "Full Stack / Mobile",
    description: "Cross-platform quiz app with Flutter mobile frontend, React.js admin panel, AWS Lambda microservices backend, hourly campaigns, leaderboards, and coin-based rewards.",
    coverImage: "https://picsum.photos/seed/quizzy-app/800/450",
    tech: ["Node.js", "Middy.js", "AWS Lambda", "AWS S3", "CloudFront", "API Gateway", "MongoDB", "Flutter", "React.js"],
    status: "Live",
    githubUrl: "https://github.com/nahidjc",
    liveUrl: undefined,
    featured: true,
    overview: "Quizzy is a feature-rich cross-platform quiz application built on a serverless microservices architecture. Users take quizzes, compete in hourly campaigns, climb leaderboards, and earn coins to unlock premium content. The system is built for scalability using AWS Lambda and a microservices pattern.",
    problem: "Quiz apps often suffer from slow performance during traffic spikes (campaign launches) and high infrastructure costs. A serverless approach was needed to handle variable traffic efficiently.",
    solution: "Adopted a microservices architecture on AWS Lambda with Middy middleware for clean handler code. Flutter was chosen for the cross-platform mobile app for its performance, and React.js was used for the admin panel.",
    features: [
      "Serverless backend with Node.js, Middy, and AWS Lambda microservices",
      "Cross-platform Flutter mobile app for iOS and Android",
      "React.js admin panel for content and campaign management",
      "Hourly campaign feature with dynamic questions and real-time leaderboards",
      "Notification system for quiz and campaign updates",
      "Coin-based system to unlock premium quizzes and rewards",
      "Top users and weekly achievers display",
      "Secure user authentication and profile management"
    ],
    architecture: "Flutter App + React Admin → API Gateway → AWS Lambda microservices (per domain) → MongoDB Atlas → CloudFront/S3 for assets",
    challenges: [
      "Managing Lambda cold starts during high-traffic campaign launches without affecting user experience.",
      "Designing the leaderboard system to update in near-real-time for thousands of concurrent participants.",
      "Keeping the microservices independently deployable while sharing common business logic."
    ],
    lessons: [
      "Middy middleware pattern dramatically reduces Lambda handler boilerplate and makes cross-cutting concerns like auth and validation composable.",
      "Pre-warming Lambda functions before scheduled campaign launches eliminates cold-start latency at critical moments.",
      "MongoDB aggregation pipelines are well-suited for real-time leaderboard computation."
    ],
    screenshots: [
      "https://picsum.photos/seed/quizzy-1/800/500",
      "https://picsum.photos/seed/quizzy-2/800/500"
    ]
  },
  {
    id: "proj-3",
    slug: "bd-pay-app",
    title: "BD Pay — Fintech Mobile App",
    category: "Mobile / Fintech",
    description: "A scalable fintech app enabling secure money transfers, Stripe wallet integration, QR code payments, real-time updates, and biometric authentication.",
    coverImage: "https://picsum.photos/seed/bdpay-fin/800/450",
    tech: ["Node.js", "AWS Lambda", "React Native", "MongoDB", "Stripe", "Middy.js", "MMKV"],
    status: "Live",
    githubUrl: "https://github.com/nahidjc/bd-pay-app",
    liveUrl: undefined,
    featured: false,
    overview: "BD Pay is a mobile-first fintech application for the Bangladeshi market, enabling peer-to-peer money transfers, QR-based payments, and digital wallet management backed by a serverless microservices architecture.",
    problem: "Many users in Bangladesh lack access to fast, digital payment solutions. A secure, mobile-first app was needed to bridge this gap.",
    solution: "Built a React Native mobile app with serverless Node.js microservices on AWS Lambda. Each domain is an independent service, and Stripe handles wallet top-ups securely.",
    features: [
      "Peer-to-peer money transfers with real-time balance sync",
      "Stripe wallet integration for card-based top-ups",
      "QR code generation and scanning for in-person payments",
      "Biometric authentication via MMKV secure storage",
      "Microservices architecture on AWS Lambda"
    ],
    architecture: "React Native → AWS API Gateway → Lambda microservices → MongoDB Atlas",
    challenges: [
      "Ensuring payment idempotency across microservices to prevent duplicate transactions.",
      "Syncing real-time wallet balance across concurrent active sessions."
    ],
    lessons: [
      "Idempotency keys should be a first-class design concern in payment APIs from day one.",
      "MMKV significantly outperforms AsyncStorage for storing sensitive auth tokens on device."
    ],
    screenshots: []
  },
  {
    id: "proj-4",
    slug: "graphql-backend-node",
    title: "GraphQL Backend API",
    category: "Backend",
    description: "Production-ready GraphQL API with Node.js, DataLoader for N+1 elimination, JWT auth, role-based authorization, and modular resolver architecture.",
    coverImage: "https://picsum.photos/seed/graphql-node/800/450",
    tech: ["Node.js", "GraphQL", "MongoDB", "JWT", "DataLoader", "JavaScript"],
    status: "Live",
    githubUrl: "https://github.com/nahidjc/graphql-backend-node",
    liveUrl: undefined,
    featured: false,
    overview: "A schema-first GraphQL API built with Node.js, demonstrating best practices for resolver design, query optimization, and secure authentication.",
    problem: "REST APIs over-fetch or under-fetch data, requiring multiple round trips. Teams needed a flexible, type-safe API that lets clients request exactly what they need.",
    solution: "Implemented a schema-first GraphQL API with DataLoader for batching database queries per-request, eliminating N+1 problems and reducing database load significantly.",
    features: [
      "Schema-first GraphQL API with custom scalar types",
      "JWT authentication with role-based resolver authorization",
      "DataLoader batching and caching — eliminates N+1 queries",
      "Modular resolver architecture organized by domain",
      "Input validation and descriptive error handling"
    ],
    architecture: "Client → GraphQL Gateway → Domain Resolvers → DataLoader → MongoDB",
    challenges: [
      "Scoping DataLoader instances correctly per-request to prevent data leakage between users."
    ],
    lessons: [
      "DataLoader must be instantiated inside the request context — never as a singleton.",
      "Schema-first design forces API contract clarity before any implementation."
    ],
    screenshots: []
  }
];
