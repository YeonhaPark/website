const myProjects = [
  {
    title: "DexFense Protocol",
    src: "/ingame.png",
    website: "http://134.185.109.88:3000/",
    description:
      "DexFense Protocol is a tower defense game where players defend their base from waves of enemies by strategically placing towers that represent different DeFi protocols. Players can expand the story by DAO mechanism.",
    usedSkills: ["TypeScript", "Next.js", "Phaser.js"],
  },
  {
    title: "PersonaChain AI",
    src: "/persona-chain-ai.png",
    website: "https://devfolio.co/projects/personachainai-3961",
    description:
      "Wallet personas categorize wallet owners' behavioral characteristics like MBTI by analyzing on-chain data (transaction patterns, protocols used, activity cycles). Won the 2nd Prize, awarded by PIN AI at BuidlAI 2025",
    usedSkills: [
      "TypeScript",
      "Next.js",
      "Dynamic SDK",
      "Tailwind-css",
      "Node.js",
      "Solidity",
      "Foundry",
      "ElizaOS",
    ],
    github: "https://github.com/orgs/lighthouse-buidl2025/repositories",
  },
  {
    title: "Solstice",
    src: "/solstice-thumb.png",
    website: "https://solstice-two.vercel.app/",
    description:
      "A simple and intuitive canvas tool to craft and securely store your NFT on-chain on Solana",
    usedSkills: [
      "TypeScript",
      "Next.js",
      "Fabric.js",
      "Tailwind-css",
      "Solana(Rust)",
    ],
    github: "https://github.com/asm9677/solstice",
  },
  {
    title: "Crypto Crossword",
    src: "/crypto-crossword-thumb.png",
    website: "https://crypto-crossword.vercel.app/",
    description:
      "Test your crypto knowledge solving crossword game. Earn NFT rewards each time you break a quest.",
    usedSkills: ["TypeScript", "Solidity", "Emotion"],
    github: "https://github.com/YeonhaPark/crypto-crossword",
  },
  // {
  //   title: "BistroMap",
  //   src: "/bistro-map-front.png",
  //   website: "https://bistro-map.vercel.app/",
  //   description: "Publish your thoughts and reviews and get rewarded.",
  //   usedSkills: ["TypeScript", "Supabase", "Solidity", "Emotion"],
  // },
];

const about = [
  "As a frontend developer, I’ve had the opportunity to contribute to a healthcare startup, focusing on the development of EMR programs, web apps, and backoffice systems. Throughout my journey, I’ve developed a keen interest in design systems and user experience, which I believe are integral to creating seamless and efficient user interfaces.",
  "I enjoy working in an environment where autonomy and collaboration coexist, as I find that it fuels my creativity and passion for development.",
  "Outside of work, I’m all about crafting simple joys in life. I love writing, cooking at home, and spending time with loved ones. Embracing a minimalistic lifestyle, I enjoy exploring new types of tea and occasionally whip up a matcha latte to unwind. I’m always seeking new ways to bring balance and calm into my daily routine.",
];

const workExperiences = [
  {
    id: 1,
    name: "CenacleSoft",
    duration: "2022-2024",
    pos: "Frontend Engineer",
    link: "https://cle.care/",
    description:
      "Conducted development of core services, including an EMR (Electronic Medical Records) system, in-app(service name: Cle) web features, company website, and back-office applications\nEnhanced controlled component performance in user input events by an average of 60% through React Hook Form optimizations.\nOptimized table-based infinite scrolling by 70% using virtualization techniques, significantly improving data rendering efficiency.",
    skills: ["JavaScript", "TypeScript", "React", "Vue", "Next.js", "HTML/CSS"],
  },
  {
    id: 2,
    name: "Ryencatchers",
    duration: "2020-2021",
    pos: "Frontend Engineer",
    link: "https://www.ryencatchers.com/",
    description:
      "Developed the Hwahae (Birdview) admin service application, streamlining operations across order management, bulletin boards, member management, promotions, and system administration.\nImplemented CRUD functionality via REST APIs, ensuring efficient data management and seamless user interactions.\nEstablished team-wide development standards by integrating ESLint, Prettier, and commit conventions, enhancing code consistency and collaboration.",
    skills: ["JavaScript", "TypeScript", "React", "HTML/CSS"],
  },
  {
    id: 3,
    name: "PlayDapp",
    duration: "2019-2020",
    pos: "Frontend Engineer",
    link: "https://market.playdapp.com/",
    description:
      "Developed the frontend for a marketplace platform facilitating transactions between ERC-721 (NFTs) and digital assets.\nIntegrated Web3.js to enable seamless interaction between the frontend and the Ethereum network.\nDesigned and implemented a responsive UI using Bootstrap 4 for a grid-based, mobile-friendly experience.\nOptimized metadata-driven search functionality with Algolia, enhancing discoverability of NFT assets.",
    skills: ["JavaScript", "React", "HTML/CSS"],
  },
  {
    id: 4,
    name: "StubHub",
    duration: "2017-2019",
    pos: "Supply Specialist",
    description:
      "Optimized ticket inventory by managing event landscapes, pricing, and quantities for maximum revenue.\nAnalyzed sales data to improve projections for annual events.\nEngaged with users and sellers to enhance experience and gather feedback.\nDeveloped partnerships by supporting sellers and promoting the StubHub platform.",
  },
];

const skills = [
  {
    title: "Programming Languages",
    description: "JavaScript, TypeScript, HTML, CSS, Sass, Solidity",
  },
  {
    title: "Libraries & Frameworks",
    description:
      "React, Next.js, Vue.js, Node.js, Tailwind CSS, Foundry, Emotion, Yup, React-hook-form, React-table",
  },
];

const education = [
  {
    year: "2022 - present",
    title: "Korea National Open University",
    description: "Bachelor of Computer Science",
  },
  {
    year: "2010 - 2015",
    title: "University of Seoul",
    description: "Bachelor of Urban Administration & Business Administration",
  },
  {
    year: "2013 - 2014",
    title: "Universidad de Málaga",
    description: "Grado en Administración y Dirección de Empresas",
  },
];

const languages = [
  { title: "English", description: "Full professional proficiency" },
  { title: "Spanish", description: "Full professional proficiency" },
  { title: "Korean", description: "Native" },
];

export const navLinks = [
  {
    id: 1,
    name: "Home",
    href: "#home",
  },
  {
    id: 2,
    name: "About",
    href: "#about",
  },
  {
    id: 3,
    name: "Work",
    href: "#work",
  },
  {
    id: 4,
    name: "Contact",
    href: "#contact",
  },
];

// export const myProjects = [
//   {
//     title: "Podcastr - AI Podcast Platform",
//     desc: "Podcastr is a revolutionary Software-as-a-Service platform that transforms the way podcasts are created. With advanced AI-powered features like text-to-multiple-voices functionality, it allows creators to generate diverse voiceovers from a single text input.",
//     subdesc:
//       "Built as a unique Software-as-a-Service app with Next.js 14, Tailwind CSS, TypeScript, Framer Motion and Convex, Podcastr is designed for optimal performance and scalability.",
//     href: "https://www.youtube.com/watch?v=zfAb95tJvZQ",
//     texture: "/textures/project/project1.mp4",
//     logo: "/assets/project-logo1.png",
//     logoStyle: {
//       backgroundColor: "#2A1816",
//       border: "0.2px solid #36201D",
//       boxShadow: "0px 0px 60px 0px #AA3C304D",
//     },
//     spotlight: "/assets/spotlight1.png",
//     tags: [
//       {
//         id: 1,
//         name: "React.js",
//         path: "/assets/react.svg",
//       },
//       {
//         id: 2,
//         name: "TailwindCSS",
//         path: "assets/tailwindcss.png",
//       },
//       {
//         id: 3,
//         name: "TypeScript",
//         path: "/assets/typescript.png",
//       },
//       {
//         id: 4,
//         name: "Framer Motion",
//         path: "/assets/framer.png",
//       },
//     ],
//   },
//   {
//     title: "LiveDoc - Real-Time Google Docs Clone",
//     desc: "LiveDoc is a powerful collaborative app that elevates the capabilities of real-time document editing. As an enhanced version of Google Docs, It supports millions of collaborators simultaneously, ensuring that every change is captured instantly and accurately.",
//     subdesc:
//       "With LiveDoc, users can experience the future of collaboration, where multiple contributors work together in real time without any lag, by using Next.js and Liveblocks newest features.",
//     href: "https://www.youtube.com/watch?v=y5vE8y_f_OM",
//     texture: "/textures/project/project2.mp4",
//     logo: "/assets/project-logo2.png",
//     logoStyle: {
//       backgroundColor: "#13202F",
//       border: "0.2px solid #17293E",
//       boxShadow: "0px 0px 60px 0px #2F6DB54D",
//     },
//     spotlight: "/assets/spotlight2.png",
//     tags: [
//       {
//         id: 1,
//         name: "React.js",
//         path: "/assets/react.svg",
//       },
//       {
//         id: 2,
//         name: "TailwindCSS",
//         path: "assets/tailwindcss.png",
//       },
//       {
//         id: 3,
//         name: "TypeScript",
//         path: "/assets/typescript.png",
//       },
//       {
//         id: 4,
//         name: "Framer Motion",
//         path: "/assets/framer.png",
//       },
//     ],
//   },
//   {
//     title: "CarePulse - Health Management System",
//     desc: "An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.",
//     subdesc:
//       "With a focus on efficiency, CarePulse integrantes complex forms and SMS notifications, by using Next.js, Appwrite, Twillio and Sentry that enhance operational workflows.",
//     href: "https://www.youtube.com/watch?v=lEflo_sc82g",
//     texture: "/textures/project/project3.mp4",
//     logo: "/assets/project-logo3.png",
//     logoStyle: {
//       backgroundColor: "#60f5a1",
//       background:
//         "linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)",
//       border: "0.2px solid rgba(208, 213, 221, 1)",
//       boxShadow: "0px 0px 60px 0px rgba(35, 131, 96, 0.3)",
//     },
//     spotlight: "/assets/spotlight3.png",
//     tags: [
//       {
//         id: 1,
//         name: "React.js",
//         path: "/assets/react.svg",
//       },
//       {
//         id: 2,
//         name: "TailwindCSS",
//         path: "assets/tailwindcss.png",
//       },
//       {
//         id: 3,
//         name: "TypeScript",
//         path: "/assets/typescript.png",
//       },
//       {
//         id: 4,
//         name: "Framer Motion",
//         path: "/assets/framer.png",
//       },
//     ],
//   },
//   {
//     title: "Horizon - Online Banking Platform",
//     desc: "Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.",
//     subdesc:
//       "Built with Next.js 14 Appwrite, Dwolla and Plaid, Horizon ensures a smooth and secure banking experience, tailored to meet the needs of modern consumers.",
//     href: "https://www.youtube.com/watch?v=PuOVqP_cjkE",
//     texture: "/textures/project/project4.mp4",
//     logo: "/assets/project-logo4.png",
//     logoStyle: {
//       backgroundColor: "#0E1F38",
//       border: "0.2px solid #0E2D58",
//       boxShadow: "0px 0px 60px 0px #2F67B64D",
//     },
//     spotlight: "/assets/spotlight4.png",
//     tags: [
//       {
//         id: 1,
//         name: "React.js",
//         path: "/assets/react.svg",
//       },
//       {
//         id: 2,
//         name: "TailwindCSS",
//         path: "assets/tailwindcss.png",
//       },
//       {
//         id: 3,
//         name: "TypeScript",
//         path: "/assets/typescript.png",
//       },
//       {
//         id: 4,
//         name: "Framer Motion",
//         path: "/assets/framer.png",
//       },
//     ],
//   },
//   {
//     title: "Imaginify - AI Photo Manipulation App",
//     desc: "Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.",
//     subdesc:
//       "Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business.",
//     href: "https://www.youtube.com/watch?v=Ahwoks_dawU",
//     texture: "/textures/project/project5.mp4",
//     logo: "/assets/project-logo5.png",
//     logoStyle: {
//       backgroundColor: "#1C1A43",
//       border: "0.2px solid #252262",
//       boxShadow: "0px 0px 60px 0px #635BFF4D",
//     },
//     spotlight: "/assets/spotlight5.png",
//     tags: [
//       {
//         id: 1,
//         name: "React.js",
//         path: "/assets/react.svg",
//       },
//       {
//         id: 2,
//         name: "TailwindCSS",
//         path: "assets/tailwindcss.png",
//       },
//       {
//         id: 3,
//         name: "TypeScript",
//         path: "/assets/typescript.png",
//       },
//       {
//         id: 4,
//         name: "Framer Motion",
//         path: "/assets/framer.png",
//       },
//     ],
//   },
// ];

const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall
      ? [4, -5, 0]
      : isMobile
      ? [5, -5, 0]
      : isTablet
      ? [5, -5, 0]
      : [9, -5.5, 0],
    reactLogoPosition: isSmall
      ? [3, 4, 0]
      : isMobile
      ? [5, 4, 0]
      : isTablet
      ? [5, 4, 0]
      : [12, 3, 0],
    ringPosition: isSmall
      ? [-5, 7, 0]
      : isMobile
      ? [-10, 10, 0]
      : isTablet
      ? [-12, 10, 0]
      : [-24, 10, 0],
    targetPosition: isSmall
      ? [-5, -10, -10]
      : isMobile
      ? [-9, -10, -10]
      : isTablet
      ? [-11, -7, -10]
      : [-13, -13, -10],
  };
};

// const preferredWorkingCondition = { title: "preferredWorkingCondition", description: ["Hybrid", "Remote"]}
export {
  about,
  workExperiences,
  skills,
  education,
  languages,
  myProjects,
  calculateSizes,
};
