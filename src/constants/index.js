export const experiences = [
    {
      title: "Student",
      company_name: "Lancaster University, United Kingdom 🇬🇧",
      icon: "/companies/lancaster.png",
      iconBg: "#383E56",
      date: "October 2023 - Present",
      description: [
        "Pursuing Bachelor's Degree in Computer Software Engineering.",
        "Predicted Grade: 1:1, First Class Honours",
        "Relevant Modules: Operating Systems, Advanced Programming, Human Computer Interactions, Software Design, Database, Networking, Artificial Intelligence, Distributed System",
      ],
    },
    {
      title: "Web Developer Intern",
      company_name: "Logical BI Limited, Lancaster 🇬🇧",
      icon: "/companies/logicalBI.png",
      iconBg: "#E6DEDD",
      date: "November 2024 - Present",
      description: [
        "Designed and developed an interactive community platform, allowing members to participate in events, post content, upload videos, and interact with one another.",
        "Automated user registration, payment processing, and invoicing, significantly reducing manual operations and improving customer experience.",
        "Minimised development costs by exclusively utilising Firebase and Stripe without relying on additional third-party services, optimizing budget efficiency",
      ],
    },
    {
        title: "International Student Ambassador",
        company_name: "Lancaster University, United Kingdom 🇬🇧",
        icon: "/companies/lancaster.png",
        iconBg: "#383E56",
        date: "November 2023 - Present",
        description: [
          "Answered questions and doubts from over 300 prospective students for Lancaster University.",
          "Delivered visitors with over 25 campus and accommodation tours to prospective students.",
          " Coordinated Offer Holder Event’s venue with a team of ambassadors and ensured the seamless execution of the event, accommodating over 5000 visitors.",
        ],
    },
    {
      title: "Robocon Team Member",
      company_name: "H.O.M.E Lab | Sunway University, Malaysia 🇲🇾",
      icon: "/companies/sunway.png",
      iconBg: "#E6DEDD",
      date: "April 2022 - April 2023",
      description: [
        "Contributed and designed a ring tosser robot for 2023 ABU Robocon using Blender.",
        "Conducted research on past competitions to enhance decision making process.",
      ],
    },

];

export const projects = [
    {
      id: 1,
      title: "7 Mantap",
      img: "/projects/7Mantap.png",
      description: [
        "Leveraged REST API to establish connection to the MongoDB.",
        "Integrated with Stripe's API to facilitate secure checkout.",
        "Enhanced UX by interpreting the users' data in the database.",
        "Empowered users with comprehensive post-purchase support, including email confirmations, access to order history for tracking, and the ability to manage personal details seamlessly.",
      ],   
      githubLink: "https://github.com/JIAJUNKK/7Mantap",
      liveDemoLink: "https://7mantap.vercel.app/", 
    },
    {
      id: 2,
      title: "Health Buddy",
      img: "/projects/healthBuddy.png",
      description: [
        "Finalised the UI/UX requirements and implemented those as a design lead of a team of 5",
        "Set up Firebase server for Health Buddy’s backend.",
        "Enable real time update to track users’ progress with maximum delay of 1 second.",
      ],   
      githubLink: "https://github.com/JIAJUNKK/HealthBuddy",
 
    },
    {
      id: 3,
      title: "Tian Ye Cushion",
      img: "/projects/tianye.png",
      description: [
        "Customised a website for a client in Malaysia using React, JS, SCCS and Firebase",
        "Allowed the client to easily update product descriptions, prices, and images using Firebase, minimizing the need for manual intervention.",
      ],   
      liveDemoLink: "https://tianyecushion.vercel.app/",
    },
    {
      id: 4,
      title: "Bomb Sweeper",
      img: "/projects/bombSweeper.png",
      description: [
        "Implemented the famous bomb sweeper game using Java.Swing.",
        "Enhanced the code's efficiency using recursion.",
        "Implemented adaptive difficulty algorithm for a balanced gaming experience, increasing player engagement by 50% and extending average playtime by 30%, catering to all player skill levels.",
      ],    
      githubLink: "https://github.com/JIAJUNKK/BombSweeper",
    },
    {
      id: 5,
      title: "Instagram Follower Tracker",
      img: "/projects/instagram_follower_tracker.png",
      description: [
        "Implemented a Python and Selenium application aimed at identifying individuals who don’t follow back user on Instagram.",
        "Utilised Python file writing function to improve the efficiency by at least 20%.",
      ],    
      githubLink: "https://github.com/JIAJUNKK/instagram_follower_tracker",
    },
    
];
  
export default {experiences, projects}
