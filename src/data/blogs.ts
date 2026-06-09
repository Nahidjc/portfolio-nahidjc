import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Building Zero-Downtime Deployments with Kubernetes",
    summary: "A deep dive into rolling updates, readiness probes, and PodDisruptionBudgets to achieve truly seamless deployments in production.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Kubernetes", "DevOps", "CI/CD"],
    coverImage: "https://picsum.photos/seed/blog-k8s/800/400",
    url: "#"
  },
  {
    id: "blog-2",
    title: "Event-Driven Architecture: Lessons from Processing 1 Billion Events Daily",
    summary: "What we learned scaling our Kafka-based event pipeline from 1M to 1B daily events — the failures, the wins, and the operational surprises.",
    date: "2023-10-22",
    readTime: "12 min read",
    tags: ["Kafka", "Go", "Architecture"],
    coverImage: "https://picsum.photos/seed/blog-kafka/800/400",
    url: "#"
  },
  {
    id: "blog-3",
    title: "TypeScript Patterns I Wish I Knew Earlier",
    summary: "Discriminated unions, template literal types, conditional types — these advanced TypeScript patterns will change how you think about type safety.",
    date: "2023-07-08",
    readTime: "6 min read",
    tags: ["TypeScript", "Frontend", "Patterns"],
    coverImage: "https://picsum.photos/seed/blog-ts/800/400",
    url: "#"
  },
  {
    id: "blog-4",
    title: "The Hidden Costs of Microservices (And When to Use Them)",
    summary: "Microservices are not a silver bullet. Here's an honest look at the operational overhead, network complexity, and when a modular monolith is the right call.",
    date: "2023-04-19",
    readTime: "10 min read",
    tags: ["Architecture", "Microservices", "Backend"],
    coverImage: "https://picsum.photos/seed/blog-micro/800/400",
    url: "#"
  }
];
