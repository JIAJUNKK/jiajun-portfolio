export const experiences = [
    {
      title: "Student",
      company_name: "Lancaster University, United Kingdom 🇬🇧",
      icon: "/companies/lancaster.png",
      iconBg: "#383E56",
      date: "October 2023 - Present",
      description: [
        "Pursuing Bachelor's Degree in Computer Software Engineering.",
        "Relevant Modules: Operating Systems, Advanced Programming, Human Computer Interactions, Software Design, Database, Networking",
      ],
    },
    {
        title: "International Student Ambassador",
        company_name: "Lancaster University, United Kingdom 🇬🇧",
        icon: "/companies/lancaster.png",
        iconBg: "#E6DEDD",
        date: "November 2023 - Present",
        description: [
          "Answered questions and doubts from over 300 prospective students for Lancaster University.",
          "Delivered visitors with over 25 campus and accommodation tours to prospective students.",
          " Coordinated Offer Holder Event’s venue with a team of ambassadors and ensured the seamless execution of the event, accommodating over 5000 visitors.",
        ],
    },
    {
      title: "Robocon Team Member",
      company_name: "HUMAC | Sunway University, Malaysia 🇲🇾",
      icon: "/companies/sunway.png",
      iconBg: "#383E56",
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
      img: "/7Mantap.png",
      description: [
        "Leveraged REST API to establish connection to the MongoDB.",
        "Integrated with Stripe's API to facilitate secure checkout.",
        "Enhanced UX by interpreting the users' data in the database.",
        "Empowered users with comprehensive post-purchase support, including email confirmations, access to order history for tracking, and the ability to manage personal details seamlessly.",
      ],   
      githubLink: "https://github.com/JIAJUNKK/7Mantap",
    },
    {
      id: 2,
      title: "Health Buddy",
      img: "/healthBuddy.png",
      description: [
        "Finalised the UI/UX requirements and implemented those as a design lead of a team of 5",
        "Set up Firebase server for Health Buddy’s backend.",
        "Enable real time update to track users’ progress with maximum delay of 1 second.",
      ],   
      githubLink: "https://github.com/JIAJUNKK/HealthBuddy",
 
    },
    {
      id: 3,
      title: "Instagram Follower Tracker",
      img: "https://images.pexels.com/photos/6894528/pexels-photo-6894528.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      description: [
        "Implemented a Python and Selenium application aimed at identifying individuals who don’t follow back user on Instagram.",
        "Utilised Python file writing function to improve the efficiency by at least 20%.",
      ],    
      githubLink: "https://github.com/JIAJUNKK/instagram_follower_tracker",
    },
    
];
  
export default {experiences, projects}