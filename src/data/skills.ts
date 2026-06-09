export interface SkillGroup {
  category: string;
  skills: { name: string; icon: string; proficiency: number }[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", icon: "SiJavascript", proficiency: 92 },
      { name: "TypeScript", icon: "SiTypescript", proficiency: 90 },
      { name: "Python", icon: "SiPython", proficiency: 75 },
      { name: "C", icon: "SiC", proficiency: 70 }
    ]
  },
  {
    category: "Backend Frameworks",
    skills: [
      { name: "Node.js", icon: "SiNodedotjs", proficiency: 92 },
      { name: "Express.js", icon: "SiExpress", proficiency: 90 },
      { name: "NestJS", icon: "SiNestjs", proficiency: 82 },
      { name: "Koa.js", icon: "SiKoa", proficiency: 78 },
      { name: "Middy.js", icon: "SiNodedotjs", proficiency: 85 }
    ]
  },
  {
    category: "Frontend & Mobile",
    skills: [
      { name: "React.js", icon: "SiReact", proficiency: 90 },
      { name: "React Native", icon: "SiReact", proficiency: 85 },
      { name: "Redux.js", icon: "SiRedux", proficiency: 85 },
      { name: "HTML5", icon: "SiHtml5", proficiency: 90 },
      { name: "CSS3", icon: "SiCss3", proficiency: 85 },
      { name: "Material UI", icon: "SiMui", proficiency: 88 }
    ]
  },
  {
    category: "Cloud & AWS",
    skills: [
      { name: "AWS Lambda", icon: "SiAwslambda", proficiency: 86 },
      { name: "AWS S3", icon: "SiAmazons3", proficiency: 88 },
      { name: "CloudFront", icon: "SiAmazon", proficiency: 80 },
      { name: "API Gateway", icon: "SiAmazon", proficiency: 82 },
      { name: "Elastic Beanstalk", icon: "SiAmazon", proficiency: 72 },
      { name: "Route 53", icon: "SiAmazon", proficiency: 78 },
      { name: "CloudWatch", icon: "SiAmazon", proficiency: 80 }
    ]
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: "SiMongodb", proficiency: 85 },
      { name: "MySQL", icon: "SiMysql", proficiency: 88 },
      { name: "DynamoDB", icon: "SiAmazondynamodb", proficiency: 80 },
      { name: "Redis", icon: "SiRedis", proficiency: 78 }
    ]
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Docker", icon: "SiDocker", proficiency: 80 },
      { name: "Git", icon: "SiGit", proficiency: 88 },
      { name: "Jest", icon: "SiJest", proficiency: 82 },
      { name: "Socket.IO", icon: "SiSocketdotio", proficiency: 85 },
      { name: "Nginx", icon: "SiNginx", proficiency: 75 },
      { name: "Flutter", icon: "SiFlutter", proficiency: 70 }
    ]
  }
];

export const skills = skillGroups.flatMap(g =>
  g.skills.map(s => ({ ...s, category: g.category }))
);
