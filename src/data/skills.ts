export interface SkillGroup {
  category: string;
  skills: { name: string; icon: string }[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", icon: "SiJavascript" },
      { name: "TypeScript", icon: "SiTypescript" },
      { name: "Python", icon: "SiPython" },
      { name: "C", icon: "SiC" }
    ]
  },
  {
    category: "Backend Frameworks",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs" },
      { name: "Express.js", icon: "SiExpress" },
      { name: "NestJS", icon: "SiNestjs" },
      { name: "Koa.js", icon: "SiKoa" },
      { name: "Middy.js", icon: "SiNodedotjs" }
    ]
  },
  {
    category: "Frontend & Mobile",
    skills: [
      { name: "React.js", icon: "SiReact" },
      { name: "React Native", icon: "SiReact" },
      { name: "Redux.js", icon: "SiRedux" },
      { name: "HTML5", icon: "SiHtml5" },
      { name: "CSS3", icon: "SiCss3" },
      { name: "Bootstrap", icon: "SiBootstrap" },
      { name: "Material UI", icon: "SiMui" }
    ]
  },
  {
    category: "Cloud & AWS",
    skills: [
      { name: "AWS Lambda", icon: "SiAwslambda" },
      { name: "AWS S3", icon: "SiAmazons3" },
      { name: "CloudFront", icon: "SiAmazon" },
      { name: "API Gateway", icon: "SiAmazon" },
      { name: "Elastic Beanstalk", icon: "SiAmazon" },
      { name: "Route 53", icon: "SiAmazon" },
      { name: "CloudWatch", icon: "SiAmazon" }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: "SiMongodb" },
      { name: "MySQL", icon: "SiMysql" },
      { name: "DynamoDB", icon: "SiAmazondynamodb" },
      { name: "Redis", icon: "SiRedis" }
    ]
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Docker", icon: "SiDocker" },
      { name: "Git", icon: "SiGit" },
      { name: "Jest", icon: "SiJest" },
      { name: "Socket.IO", icon: "SiSocketdotio" },
      { name: "Nginx", icon: "SiNginx" },
      { name: "Flutter", icon: "SiFlutter" }
    ]
  }
];

export const skills = skillGroups.flatMap(g =>
  g.skills.map(s => ({ ...s, category: g.category, proficiency: 80 }))
);
