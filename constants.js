const navLinks = [
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
const myProjects = [
  {
    title: "DexFense Protocol",
    src: "/ingame.png",
    website: "http://134.185.109.88:3000/",
    description:
      "DexFense Protocol is a tower defense game where players defend their base from waves of enemies by strategically placing towers that represent different DeFi protocols. Players can expand the story by DAO mechanism. The game is built using Phaser.js for the game engine and Next.js for the web interface.",
    usedSkills: [
      { name: "TypeScript", path: "/assets/typescript.png" },
      { name: "Next.js", path: "/assets/next.svg" },
      { name: "Phaser.js", path: "/assets/phaser.png" },
    ],
    logoStyle: {
      backgroundColor: "#fff",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    logo: "/assets/dexfense-logo.png",
    spotlight: "/assets/spotlight1.png",
  },
  {
    title: "PersonaChain AI",
    src: "/persona-chain-ai.png",
    website: "https://devfolio.co/projects/personachainai-3961",
    description:
      "PersonaChain AI analyzes wallet activity using on-chain data and classifies wallets into behavioral personas. Based on these personas, the system suggests and automates personalized yield strategies with the help of AI agents. Won the 2nd Prize, awarded by PIN AI at BuidlAI 2025",
    usedSkills: [
      { name: "TypeScript", path: "/assets/typescript.png" },
      { name: "Next.js", path: "/assets/next.svg" },
      { name: "Tailwind-css", path: "/assets/tailwindcss.png" },
      { name: "Node.js", path: "/assets/nodejs.svg" },
      { name: "Solidity", path: "/assets/solidity.svg" },
      { name: "Foundry", path: "/assets/foundry.png" },
    ],
    github: "https://github.com/orgs/lighthouse-buidl2025/repositories",
    logoStyle: {
      backgroundColor: "#e1e1e1",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },

    logo: "/assets/persona-chain-logo.svg",
    spotlight: "/assets/spotlight2.png",
  },
  {
    title: "Solstice",
    src: "/solstice-thumb.png",
    website: "https://solstice-two.vercel.app/",
    description:
      "A simple and intuitive canvas tool to craft and securely store your NFT on-chain on Solana. Solstice's frontend is built with Next.js, Fabric.js and Canvas API",
    usedSkills: [
      { name: "TypeScript", path: "/assets/typescript.png" },
      { name: "Next.js", path: "/assets/next.svg" },
      { name: "Fabric.js", path: "/assets/fabricjs.png" },
      { name: "Tailwind-css", path: "/assets/tailwindcss.png" },
      { name: "Solana(Rust)", path: "/assets/solana.png" },
    ],
    github: "https://github.com/asm9677/solstice",
    logoStyle: {
      backgroundColor: "#7A9CC6",
      border: "0.2px solid #36201D",
      boxShadow: "0px 0px 60px 0px #AA3C304D",
    },
    logo: "/assets/solstice.svg",
    spotlight: "/assets/spotlight3.png",
  },
  // {
  //   title: "Crypto Crossword",
  //   src: "/crypto-crossword-thumb.png",
  //   website: "https://crypto-crossword.vercel.app/",
  //   description:
  //     "Test your crypto knowledge solving crossword game. Earn NFT rewards each time you break a quest.",
  //   usedSkills: [
  //     { name: "TypeScript", path: "/assets/typescript.png" },
  //     { name: "Solidity", path: "/assets/solidity.svg" },
  //     { name: "Emotion", path: "/assets/emotion.png" },
  //   ],
  //   github: "https://github.com/YeonhaPark/crypto-crossword",
  //   logoStyle: {},
  //   logo: "/assets/persona-chain-logo.png",
  // },
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

const experience = [
  {
    year: "2022-2024",
    role: "Frontend Engineer | CenacleSoft",
    link: "https://cle.care/",
    description:
      "Conducted development of core services, including an EMR (Electronic Medical Records) system, in-app(service name: Cle) web features, company website, and back-office applications\nEnhanced controlled component performance in user input events by an average of 60% through React Hook Form optimizations.\nOptimized table-based infinite scrolling by 70% using virtualization techniques, significantly improving data rendering efficiency.",
    skills: ["JavaScript", "TypeScript", "React", "Vue", "Next.js", "HTML/CSS"],
  },
  {
    year: "2020-2021",
    role: "Frontend Engineer | Ryencatchers",
    link: "https://www.ryencatchers.com/",
    description:
      "Developed the Hwahae (Birdview) admin service application, streamlining operations across order management, bulletin boards, member management, promotions, and system administration.\nImplemented CRUD functionality via REST APIs, ensuring efficient data management and seamless user interactions.\nEstablished team-wide development standards by integrating ESLint, Prettier, and commit conventions, enhancing code consistency and collaboration.",
    skills: ["JavaScript", "TypeScript", "React", "HTML/CSS"],
  },
  {
    year: "2019-2020",
    role: "Frontend Engineer | PlayDapp",
    link: "https://market.playdapp.com/",
    description:
      "Developed the frontend for a marketplace platform facilitating transactions between ERC-721 (NFTs) and digital assets.\nIntegrated Web3.js to enable seamless interaction between the frontend and the Ethereum network.\nDesigned and implemented a responsive UI using Bootstrap 4 for a grid-based, mobile-friendly experience.\nOptimized metadata-driven search functionality with Algolia, enhancing discoverability of NFT assets.",
    skills: ["JavaScript", "React", "HTML/CSS"],
  },
  {
    year: "2017-2019",
    role: "Supply Specialist | StubHub",
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

export {
  navLinks,
  about,
  experience,
  skills,
  education,
  languages,
  myProjects,
};
