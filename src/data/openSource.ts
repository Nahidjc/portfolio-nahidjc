import { OpenSourceProject } from '../types';

export const openSourceProjects: OpenSourceProject[] = [
  {
    id: "os-1",
    name: "bd-pay-app",
    description: "A scalable fintech mobile app with Stripe wallet, QR payments, biometric auth, and microservices on AWS Lambda. Built with React Native and Node.js.",
    stars: "0",
    forks: "0",
    tech: ["React Native", "Node.js", "AWS Lambda", "MongoDB", "Stripe"],
    url: "https://github.com/nahidjc/bd-pay-app"
  },
  {
    id: "os-2",
    name: "graphql-backend-node",
    description: "Production-ready GraphQL API with Node.js featuring DataLoader for N+1 elimination, JWT auth, role-based authorization, and modular resolver architecture.",
    stars: "0",
    forks: "0",
    tech: ["Node.js", "GraphQL", "MongoDB", "JWT", "DataLoader"],
    url: "https://github.com/nahidjc/graphql-backend-node"
  },
  {
    id: "os-3",
    name: "fs-payment-service",
    description: "A standalone microservice for payment processing with webhook verification, idempotency keys, and audit logging — designed for safe integration into larger platforms.",
    stars: "0",
    forks: "0",
    tech: ["Node.js", "Express", "MongoDB", "Webhooks"],
    url: "https://github.com/nahidjc/fs-payment-service"
  },
  {
    id: "os-4",
    name: "system-design-bangla",
    description: "Contributing to a community-driven resource explaining system design concepts in Bangla — making distributed systems knowledge accessible to Bengali developers worldwide.",
    stars: "0",
    forks: "0",
    tech: ["System Design", "Distributed Systems", "Bangla"],
    url: "https://github.com/nahidjc/system-design-bangla"
  }
];
