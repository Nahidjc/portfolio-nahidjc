import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "C3bit",
    logo: "SiNodedotjs",
    role: "Full Stack Engineer",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
    startDate: "2025-01",
    endDate: null,
    responsibilities: [
      "Lead backend and frontend engineering teams to build scalable telemedicine and video banking platforms serving thousands of active users daily.",
      "Architect and deploy CI/CD automation pipelines that streamline Node.js and React.js releases to production servers.",
      "Drive technical innovation by researching new technologies, designing system architecture, and transforming complex requirements into development roadmaps.",
      "Build high-performance real-time infrastructure with Jitsi video integration, WebSocket messaging, Redis caching, and Nginx reverse proxy.",
      "Perform thorough code reviews and develop end-to-end test cases to maintain high code quality and system reliability."
    ],
    achievements: [
      "Built real-time telemedicine platform with Jitsi video, serving thousands of daily active users.",
      "Reduced deployment cycle time significantly through CI/CD automation pipelines.",
      "Architected WebSocket + Redis infrastructure for instant doctor-patient connectivity."
    ],
    impact: "Leading the engineering of critical healthcare and banking platforms, enabling thousands of users to access telemedicine and video banking services daily.",
    tech: ["Node.js", "React.js", "Jitsi", "WebSocket", "Redis", "Nginx", "CI/CD", "MySQL"]
  },
  {
    id: "exp-2",
    company: "Spring Rain Private Limited",
    logo: "SiAmazon",
    role: "Software Engineer",
    type: "Full-time",
    location: "Dhaka, Bangladesh",
    startDate: "2022-05",
    endDate: "2024-12",
    responsibilities: [
      "Contributed to backend microservices for the fintech application, enhancing user, membership, and gift card services.",
      "Designed and implemented a reliable monthly recurring subscription module for seamless user subscription management.",
      "Worked on Subi Super Admin web application, implementing AWS SNS topic notifications for enhanced communication.",
      "Developed interactive graphs using Chart.js for web views, providing visual insights into data trends.",
      "Explored AWS services including EC2, S3, Route 53, CloudFront, Elastic Beanstalk, and Lambda.",
      "Wrote comprehensive unit tests across services ensuring code accuracy, functionality, and resilience.",
      "Utilized Docker to containerize multiple services."
    ],
    achievements: [
      "Designed and shipped a recurring subscription module handling seamless subscription lifecycle management.",
      "Implemented AWS SNS notifications in Subi Super Admin, improving system alerting and communication.",
      "Built Chart.js data visualization features providing actionable insights for admin users.",
      "Achieved high test coverage across critical fintech services using Jest."
    ],
    impact: "Strengthened the fintech platform's reliability and user experience, contributing to robust subscription revenue and improved user retention.",
    tech: ["Node.js", "React.js", "AWS Lambda", "AWS SNS", "AWS S3", "Docker", "MongoDB", "Chart.js", "Jest"]
  }
];
