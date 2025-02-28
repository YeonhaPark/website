const sideProjects = [
    {
        title: "Crypto Crossword",
        src: "/crypto-crossword-thumb.png",
        website: "https://crypto-crossword.vercel.app/",
        description: "Test your crypto knowledge solving crossword game. Earn NFT rewards each time you break a quest.",
        usedSkills: ["TypeScript", "Solidity", "Emotion"],
        github: "https://github.com/YeonhaPark/crypto-crossword"
    },
    {
        title: "BistroMap",
        src: "/bistro-map-front.png",
        website: "https://bistro-map.vercel.app/",
        description: "Publish your thoughts and reviews and get rewarded.",
        github: "https://github.com/BCS-5/bistro-map",
        usedSkills: ["TypeScript", "Supabase", "Solidity", "Emotion"]
    },
    {
        title: "Gyrolly",
        description: "This DePIN project is built on mobile platform with objective to platform that blends fitness with the crypto world.",
        src: "/gyrolly.png",
        website: "https://ethglobal.com/showcase/gyrolly-syiqu",
        github: "https://github.com/YeonhaPark/gyrolly",
        usedSkills: ["React-native", "Typescript", "NodeJS", "Solidity"]
    }
]

const about = ["I’ve recently become enchanted by the world of web3, diving into seminars, study groups, and hackathons to explore its possibilities. I enjoy working in an environment where autonomy and collaboration coexist, as I find that it fuels my creativity and passion for development.",
    "As a frontend developer, I’ve had the opportunity to contribute to a healthcare startup, focusing on the development of EMR programs, web apps, and backoffice systems. Throughout my journey, I’ve developed a keen interest in design systems and user experience, which I believe are integral to creating seamless and efficient user interfaces.",
    "Outside of work, I’m all about crafting simple joys in life. I love writing, cooking at home, and spending time with loved ones. Embracing a minimalistic lifestyle, I enjoy exploring new types of tea and occasionally whip up a matcha latte to unwind. I’m always seeking new ways to bring balance and calm into my daily routine."]

const experience = [
        {
            year: '2022-2024',
            role: 'Frontend Engineer | CenacleSoft',
            link: 'https://cle.care/',
            description: 'Conducted development of core services, including an EMR (Electronic Medical Records) system, in-app(service name: Cle) web features, company website, and back-office applications\nEnhanced controlled component performance in user input events by an average of 60% through React Hook Form optimizations.\nOptimized table-based infinite scrolling by 70% using virtualization techniques, significantly improving data rendering efficiency.',
            skills: ["JavaScript", "TypeScript", "React", "Vue", "Next.js", "HTML/CSS"]
        },{
            year: '2020-2021',
            role: 'Frontend Engineer | Ryencatchers',
            link: 'https://www.ryencatchers.com/',
            description: 'Developed the Hwahae (Birdview) admin service application, streamlining operations across order management, bulletin boards, member management, promotions, and system administration.\nImplemented CRUD functionality via REST APIs, ensuring efficient data management and seamless user interactions.\nEstablished team-wide development standards by integrating ESLint, Prettier, and commit conventions, enhancing code consistency and collaboration.',
            skills: ["JavaScript", "TypeScript", "React", "HTML/CSS"]
        },{
            year: '2019-2020',
            role: 'Frontend Engineer | PlayDapp',
            link: 'https://market.playdapp.com/',
            description: 'Developed the frontend for a marketplace platform facilitating transactions between ERC-721 (NFTs) and digital assets.\nIntegrated Web3.js to enable seamless interaction between the frontend and the Ethereum network.\nDesigned and implemented a responsive UI using Bootstrap 4 for a grid-based, mobile-friendly experience.\nOptimized metadata-driven search functionality with Algolia, enhancing discoverability of NFT assets.',
            skills: ["JavaScript", "React", "HTML/CSS"]
        },{
            year: '2017-2019',
            role: 'Supply Specialist | StubHub',
            description:"Optimized ticket inventory by managing event landscapes, pricing, and quantities for maximum revenue.\nAnalyzed sales data to improve projections for annual events.\nEngaged with users and sellers to enhance experience and gather feedback.\nDeveloped partnerships by supporting sellers and promoting the StubHub platform.",
        }
    ]

const skills = [{title: "Programming Languages", description: "JavaScript, TypeScript, HTML, CSS, Sass, Solidity"}, { title: "Libraries & Frameworks", description: "React, Next.js, Vue.js, Tailwind CSS, Emotion , Yup, React-hook-form, React-table, Ethers.js"}]

const education = [
    { year: '2022 - present', title: "Korea National Open University", description: "Bachelor of Computer Science" },
    { year: '2010 - 2015', title: "University of Seoul", description: "Bachelor of Urban Administration & Business Administration" },
    { year: '2013 - 2014', title: "Universidad de Málaga", description: "Grado en Administración y Dirección de Empresas" },
]

const languages = [{ title: "English", description: "Full professional proficiency"},  { title: "Spanish", description: "Full professional proficiency"}, { title: "Korean", description: "Native"}]
// const preferredWorkingCondition = { title: "preferredWorkingCondition", description: ["Hybrid", "Remote"]}
export {
    about,
    experience,
    skills,
    education,
    languages,
    sideProjects,
}