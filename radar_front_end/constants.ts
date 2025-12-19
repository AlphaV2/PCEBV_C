import { Shield, Zap, Database, Eye, Radio, Server, Lock, Globe, Cpu, Wifi } from 'lucide-react';
import { Service, Product, Testimonial, StatMetric, Project, TeamMember } from './types';

// ===============================================
// 🚨 GLOBAL CONSTANTS (WHATSAPP CENTRALIZATION) 🚨
// ===============================================

export const WHATSAPP_NUMBER = "+919819158929"; 
export const WHATSAPP_MESSAGE = "Hi, I'm interested in Radar Sniper solutions.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// ===============================================
// 🚨 SOCIAL MEDIA LINKS (NEW CENTRALIZED DATA) 🚨
// ===============================================

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/jaykumar-vishnu-choudhary-055b8a382/", 
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/radarsnipers/",
  facebook: "https://www.facebook.com/",
};

// ===============================================
// NAVIGATION
// ===============================================

export const NAV_LINKS = [
  { name: 'Home', href: '#hero', hasDropdown: false },
  { name: 'Services', href: '#services', hasDropdown: true, dropdownKey: 'services' },
  { name: 'Products', href: '#products', hasDropdown: true, dropdownKey: 'products' },
  // 🚨 NEW GALLERY LINK - Note the dropdownKey
  { name: 'Gallery', href: '#gallery', hasDropdown: true,  dropdownKey: 'gallery' },
  { name: 'About', href: '#about', hasDropdown: true, dropdownKey: 'about' },
  { name: 'Contact', href: '#contact', hasDropdown: true, dropdownKey: 'contact' },
];

// ===============================================
// 🚨 NEW NESTED GALLERY STRUCTURE 🚨
// ===============================================
export const GALLERY_CONTENT = {
  // 🟢 COLUMN 1: VERTICAL BANNERS (Tall Images)
  // Recommended Size: 600w x 1200h pixels (Aspect Ratio 1:2)
  verticalBanners: [
    {
      id: 'v1',
      src: '/gallery/vertical1.jpeg', // Your main vertical banner
      title: 'Complete Drone Solutions',
      tagline: 'End-to-End Service'
    },
    {
      id: 'v2',
      src: '/gallery/vertical2.jpeg', // Placeholder: Replace with a TALL image
      title: 'Meet The Future Of Pollination',
      tagline: 'AI Powered',
      decription:' '
    },
    {
      id: 'v3',
      src: '/gallery/vertical4.jpeg', // Placeholder: Replace with a TALL image
      title: 'Smart Agriculture Soil Monitoring System ',
      tagline: 'Data Driven',
      description: 'Autonomous, solar-powered IoT assembly with LoRa long-range wireless data. Measures real-time Nitrogen, Phosphorus, and Potassium (NPK) levels deep in the root zone to prevent crop failure.'
    },
    {
      id: 'v4',
      src: '/gallery/npk_data.jpeg', // Placeholder: Replace with a TALL image
      title: 'Smart Agriculture Soil Monitoring System report',
      tagline: 'Data Driven',
      decription:' '
    }
  ],

  // 🟡 COLUMN 2 (TOP): DRONE FLEET (Landscape Images)
  // Recommended Size: 800w x 600h pixels (Aspect Ratio 4:3)
  droneFleet: [
    {
      id: 'fleet1',
      src: '/products/krishi_11l.jpeg',
      title: 'Krishi Sakha 11L',
      tagline: 'Compact',
      description: 'Agile 11-liter spraying drone designed for precision pesticide application on small-to-medium farms.'
    },
    {
      id: 'fleet2',
      src: '/products/survey_drone.jpeg',
      title: 'Survey Drone',
      tagline: 'Demonstration',
      description: 'High-endurance aerial unit for real-time crop health monitoring and topographical field mapping.'
    },
    // {
    //   id: 'fleet3',
    //   src: '/products/soil_sensor.jpeg',
    //   title: 'Krishi Sakha ',
    //   tagline: 'Heavy Duty',
    //   description: ' '
    // },
    {
      id: 'fleet4',
      src: '/gallery/fleet4.jpeg',
      title: 'Future Of Pollination',
      tagline: 'AI Powered',
      description: 'Next-gen autonomous micro-drones mimicking natural pollinators to boost crop yields.'
    },
    {
      id: 'fleet5',
      src: '/gallery/field_demo.jpeg',
      title: 'Fleet Deployment',
      tagline: 'Action',
      description: 'Coordinated drone operations demonstrating rapid deployment for large-scale coverage.'
    }
  ],

  // 🟡 COLUMN 2 (BOTTOM): SPECIAL OFFERS (Square/Portrait Images)
  // Recommended Size: 800w x 800h pixels (Aspect Ratio 1:1)
  specialOffers: [
    {
      id: 'offer1',
      src: '/gallery/offer.jpeg', // Your main offer
      title: 'Limited Time Offer',
      tagline: 'Save ₹100',
      description:'Get ₹100 OFF on your first purchase of Krishi Sakha 11L drone. Elevate your farming with precision and efficiency. Hurry, offer valid while stocks last!'
    },
    // {
    //   id: 'offer2',
    //   src: '/products/npk_senso.jpeg', // Placeholder
    //   title: 'Soil Testing Kit',
    //   tagline: 'Free Demo'
    // }
  ],

  innovations: [
    {
      id: 'inno1',
      src: '/gallery/npk_1.jpeg',
      title: 'Soil Monitoring System',
      tagline: 'Autonomous Unit',
      description: 'Solar-powered assembly with LoRa antenna for long-range, wireless transmission of soil health data.'
    },
    {
      id: 'inno2',
      src: '/products/soil_sensor.jpeg',
      title: 'Deep Root Probe',
      tagline: 'Precision Hardware',
      description: 'Rugged probe designed for deep root-zone insertion to accurately measure Nitrogen, Phosphorus, and Potassium levels.'
    },
    {
      id: 'inno3',
      src: '/gallery/npk_2.jpeg',
      title: 'Data-Driven Benefits',
      tagline: 'Smart Analytics',
      description: 'Real-time nutrient insights that optimize fertilizer usage, reduce waste, and prevent crop deficiency.'
    }
  ],

  // 🔵 COLUMN 3 (BOTTOM): EXHIBITIONS (Landscape Images)
  // Recommended Size: 800w x 600h pixels (Aspect Ratio 4:3)
  exhibitions: [
   { 
   id: 'ex1', 
   src: '/gallery/ex1.jpeg', 
   title: 'KISAN Hyderabad 2025',
   description:'A 3-day agricultural exhibition KISAAN 2025 began at the HITEX exhibition center in Hyderabad on Friday, February 7.',
   location: 'Hyderabad' 
 },
 { 
   id: 'ex2', 
   src: '/gallery/ex2.jpeg', 
   title: 'KISAN Hyderabad 2025',
   description:'The exhibition was inaugurated by Telangana Agriculture Minister Thummala Nageswara Rao, who highlighted the event as a catalyst for sustainable agricultural growth.',
   location: 'Hyderabad' 
 }
    // { 
    //   id: 'ex3', 
    //   src: '/gallery/field_demo.jpeg', 
    //   title: 'Live Field Demo',
    //   // location: 'Nagpur' 
    // }
  ],

  // 🟣 NEW SECTION: PAMPHLET (Single full image)
  // Ideally, crop your big pamphlet image into two halves: Left (Pollination) and Right (Soil)
 pamphlet: [
    {
      id: 'pamphlet-full',
      src: '/gallery/pamphlet.jpeg', // Make sure this single image exists in your folder
      title: 'AI-Powered Drone Pollination & Soil Monitoring',
      tagline: 'FULL SPEC SHEET',
      description: 'Complete technical specifications for our AI pollination drones and IoT soil monitoring systems.'
    }
  ]

};


// ... (Keep ABOUT_SECTION_CONTENT, CONTACT_SECTION_DETAILS, SERVICES, PRODUCTS, PROJECTS, TESTIMONIALS, TEAM, STATS as they are in your file)
// Make sure to include the PRODUCTS array you provided in the previous message.
export const ABOUT_SECTION_CONTENT = [
    "Our mission emphasizes corporate citizenship and solving our customers' and stakeholders' most critical challenges by fostering trust and innovation.",
    "Radar Sniper™ is a security-focused startup pioneering enhanced, next-generation solutions and innovations across Cyber Security, Internet of Things (IoT), and AI-powered Drones development.",
    "We support financial institutions (NBFCs, Banks) with specialized Information Security Consultancy Services, providing budgeted and customized solutions for Compliance, Auditing, and Implementation as per SEBI and RBI guidelines.",
    "The founder is responsible for Global Security Strategy, development and management of the company's technology including Enterprise Security Architecture, Security development and technology operations.",
];

export const CONTACT_OFFICES = [
  {
    title: "Registered Office (India)",
    lines: [
      "Radar Snipers (OPC) Private Ltd",
      "E 304, Dsk Vidyanagari Phase 2,",
      "Pashan Sus Road, Baner, Survey no 47",
      "PIN: 411045, PUNE, MAHARASHTRA, INDIA.",
      `Mobile No.: ${WHATSAPP_NUMBER}`,
      "Email: info@radarsniper.com"
    ]
  },
  {
    title: "Netherland Branch Office",
    lines: [
      "Ereprijsweg 14",
      "2565 AV Den Haag",
      "The Netherlands",
      "Tel No.: 0031-611596812"
    ]
  }
];

// 2. NEW: Digital Communication Channels
export const CONTACT_EMAILS = [
  {
    role: "General Enquiries",
    email: "info@radarsniper.com",
    desc: "Quotes & Product Specs",
    icon: "mail",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    role: "HR & Careers",
    email: "hr@radarsniper.com",
    desc: "Job Applications",
    icon: "briefcase",
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    role: "Director",
    email: "Jaykc@radarsniper.com",
    desc: "Strategic Partnerships",
    icon: "shield",
    color: "text-yellow-600",
    bg: "bg-yellow-50"
  }
];

export const SERVICES: Service[] = [
  {
    
    id: 'pollination-drones', // Updated ID
    title: 'AI-Powered Pollination & Sensing', // Updated Title
    shortTitle: 'Pollination Drones', // Updated Short Title
    description: 'Autonomous AIML swarm drones designed to tackle cross-pollination and environmental sensing issues for Indian floriculture and agriculture.',
    icon: Radio, // You can change this import to 'Flower' or 'Wind' if available in Lucide
    features: ['VOC Sensing (MICS6814)', 'Swarm Intelligence', 'Precision Pollination'],
    details: {
      intro: 'We aim to fix the labor-intensive problem of hand-done cross-pollination by using self-flying AIML drones and Swarm drones. Our drones leverage nature-inspired robotics to boost agricultural output efficiently.',
      
      technicalSpecs: [
        "Sensor: MICS6814 (VOC)",
        "Tech: Swarm Intelligence",
        "Target: Cross-Pollination",
        "Pattern Recog: Flower Scent",
        "Coverage: Scalable Swarm"
      ],
      
      flowDiagram: "/products/krishi_11l.jpeg", // 📸 You might want to update this image URL to a diagram of your pollination process later
      
      sections: [
        {
          heading: 'How It Works',
          type: 'paragraph',
          body: [
            'Our drones are equipped with advanced VOC (Volatile Organic Compound) sensors like MICS6814 to spot flower scent patterns. This specific technology helps them identify exactly which flowers are ready for pollination.',
            'By using "team-work" plans (Swarm Intelligence), many drones work together to cover big farm areas without doing the same job twice. This brings number-based smarts to pollination for the first time.'
          ]
        },
        {
          heading: 'Key Benefits',
          type: 'list',
          body: [
            'Eliminates the high cost and scarcity of manual labor for pollination.',
            'Increases crop yield through focused, effective pollination.',
            'Scalable solution that works well for both small and large Indian flower and fruit farms.',
            'Provides environmental sensing data alongside pollination services.'
          ]
        },
        {
          heading: 'Target Segments',
          type: 'list',
          body: [
            'Commercial Farmers & Greenhouses',
            'Polyhouses & Growers',
            'Orchards and Plantation Farms',
            'Farmer Producer Organizations (FPOs)',
            'Agri-Tech Service Providers',
            'Agricultural Universities & R&D Bodies',
            'Export-Oriented Farms'
          ]
        }
      ],
      downloadText: 'Download Research Paper',
      downloadLink: '#'
    }
  },
  {
    id: 'iot-security',
    title: 'IoT Security',
    shortTitle: 'IoT Security',
    description: 'Comprehensive protection for connected devices, ensuring data integrity across your entire network ecosystem.',
    icon: Database,
    features: ['Firmware Analysis', 'Network Segmentation', 'Zero Trust'],
    details: {
      intro: 'The Internet of Things (IoT) connects smart machines, but this connectivity introduces risks. Radar Sniper™ specializes in securing sensors and operations that support the world of IoT.',
      technicalSpecs: [
        "Protocol Support: MQTT, CoAP",
        "Encryption: AES-256 GCM",
        "Scanning: DAST / SAST",
        "Latency Impact: < 2ms"
      ],
      sections: [
        {
          heading: 'Industry Context',
          type: 'paragraph',
          body: [
            'IoT is a quickly growing segment. While the internet connects people, IoT connects smart machines. However, the fast expansion of industry-led automation in Smart Cities, Smart Hospitals, and Smart Homes has led to critical security vulnerabilities.',
            'Public warning systems, logistics trackers, and emergency communications rely on this mesh. Securing it is not optional—it is vital for safety.'
          ]
        },
        {
          heading: 'Main Attack Scenarios',
          type: 'list',
          body: [
            'Man-in-the-Middle Attack (MitM): Eavesdropping on communication between devices.',
            'Denial-of-Service (DoS): Disrupting critical IoT services.',
            'Rogue Endpoints: Unauthorized devices injected into the network causing unwanted behavior.',
            'Compromised Endpoints: Vulnerable software allowing system invasion.',
            'Data Leakage: Unprotected data leading to financial and reputational damage.'
          ]
        },
        {
          heading: 'Handling IoT Security',
          type: 'list',
          body: [
            'Determine vulnerability and penetration testing scope.',
            'Keep an eye on standard vulnerabilities (missing patches) and deep ones (lack of encryption).',
            'Create and enforce company policies on Bluetooth and pairing.',
            'Invest in visibility solutions to detect insecure devices immediately.'
          ]
        },
        {
          heading: 'Why Radar Sniper™?',
          type: 'paragraph',
          body: [
            'Our IoT Security testing services cover Sensors, DAST (Dynamic Application Security Scanning), and SAST (Static Application Security Testing). We utilize the latest methodologies like OWASP combined with rigorous verification.',
            'We ensure confidentiality and integrity of data in transit and at rest.'
          ]
        }
      ],
      downloadText: 'Download IoT Security Checklist',
      downloadLink: '#'
    }
  },
  {
    id: 'iso-27001',
    title: 'ISO 27001 Compliance',
    shortTitle: 'ISO 27001',
    description: 'Information Security Management Systems (ISMS) implementation and consultancy for global standards.',
    icon: Shield,
    features: ['Audit Preparation', 'Risk Assessment', 'Policy Framework'],
    details: {
      intro: 'We assist organizations in achieving ISO 27001 certification, ensuring your Information Security Management System (ISMS) meets global standards.',
      technicalSpecs: [
        "Standard: ISO/IEC 27001:2022",
        "Scope: ISMS Audits",
        "Framework: NIST Compatible",
        "Timeline: 3-6 Months"
      ],
      sections: [
        {
          heading: 'Phase I: Assessment',
          type: 'paragraph',
          body: [
            'We assess the maturity of your organization\'s information security and the divergence from best practice. Our security control review covers controls concerning technology, processes, and employees.'
          ]
        },
        {
          heading: 'Phase II: Preparation',
          type: 'paragraph',
          body: [
            'We assist with interpreting standard requirements and developing your ISO 27001 documentation system. We prepare missing documentation, author information security policies, and support risk analysis methodology.',
            'We help minimize risks to an acceptable level and prepare the "Statement of Applicability" for the audit.'
          ]
        },
        {
          heading: 'Phase III: Audit Facilitation',
          type: 'paragraph',
          body: [
            'We facilitate the process of achieving ISO 27001 certification, enabling to prove to external parties that your organization complies with international standards.'
          ]
        },
        {
          heading: 'Our Advantages',
          type: 'list',
          body: [
            'Implementation increases security awareness among employees.',
            'Achieve ISO certifications on-time and within budget.',
            'Best-in-class System/Network security testing included.'
          ]
        }
      ]
    }
  },
  {
    id: 'soc',
    title: 'SOC Operations',
    shortTitle: 'SOC',
    description: '24/7 Security Operating Centre monitoring to detect, analyze, and respond to cybersecurity incidents in real-time.',
    icon: Eye,
    features: ['Threat Hunting', 'Incident Response', 'SIEM Management'],
    details: {
      intro: 'Our Security Operations Center (SOC) provides round-the-clock surveillance of your digital infrastructure, ensuring threats are detected before they become breaches.',
       technicalSpecs: [
        "Monitoring: 24/7/365",
        "Response SLA: 15 Minutes",
        "Log Retention: 1 Year+",
        "Compliance: GDPR, HIPAA"
      ],
      sections: [
        {
          heading: 'Real-Time Monitoring',
          type: 'paragraph',
          body: [
            'We utilize advanced SIEM (Security Information and Event Management) tools to aggregate logs from all your endpoints, analyzing them for suspicious patterns using behavioral analytics.'
          ]
        },
        {
          heading: 'Incident Response',
          type: 'list',
          body: [
            '24/7/365 Eyes on Glass monitoring.',
            'Rapid Triage and Containment of threats.',
            'Forensic Analysis post-incident.',
            'Regular Threat Hunting exercises.'
          ]
        }
      ]
    }
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'krishi-sakha-11l',
    name: 'Krishi Sakha 11L',
    tagline: 'Precision Agriculture Rotorcraft',
    type: 'drone',
    image: '/products/krishi_11l.jpeg', 
    specs: [
      'Tank Capacity: 11 Litres', 
      'Endurance: 18 Minutes', 
      'Range: 2 Km', 
      'Spray Width: 4 Mtrs',
      'Overall Weight: 18 Kgs',
      'Flow Rate: 1.25 Litres/min',
      'Camera: Night Vision Capable',
      'Class: Small Rotorcraft (RPAS)'
    ],
    description: 'The Krishi Sakha 11L is a specialized small-class rotorcraft (RPAS) designed for maximum efficiency in Indian farming conditions. Featuring a carbon-fiber frame for high strength and low weight, it operates with Visual Line of Sight (VLOS). It includes a high-density polymer tank and is capable of spraying up to 60 acres per day.'
  },
  {
    id: 'land-mapping-drone',
    name: 'Terra Mapper Survey Drone',
    tagline: 'High-Precision Aerial Surveying',
    type: 'drone',
    image: '/products/survey_drone.jpeg', // 📸 Make sure to add this image
    specs: [
      'Positioning: RTK/PPK GPS Module',
      'Camera: 20MP High-Res Photogrammetry',
      'Flight Time: 35 Minutes',
      'Mapping Accuracy: Centimeter-Level',
      'Coverage: 100+ Acres/Flight',
      'Software: 3D Terrain Modeling'
    ],
    description: 'Engineered for professional surveyors and land developers. This drone utilizes Real-Time Kinematic (RTK) positioning to deliver centimeter-accurate 3D maps and topographic surveys. Ideal for urban planning, construction site monitoring, and agricultural land leveling analysis.'
  },
  {
    id: 'pollination-drone',
    name: 'Cross-Pollinator Drones',
    tagline: 'AI Swarm Pollination System',
    type: 'drone',
    image: '/products/pollination.jpeg', // 📸 Make sure to add this image
    specs: [
      'Sensors: VOC (MICS6814) Scent Detection',
      'Tech: AI Swarm Intelligence',
      'Target: Floriculture & Orchards',
      'Flight Mode: Autonomous Pattern',
      'Feature: Soft Air-Burst Pollination',
      'Efficiency: 30x Faster than Manual'
    ],
    description: 'A nature-inspired robotic solution solving the global pollinator crisis. Equipped with Volatile Organic Compound (VOC) sensors, these drones autonomously identify flowers ready for pollination via scent patterns. Using swarm intelligence, they ensure 100% crop coverage without duplication, vital for high-yield fruit and flower farming.'
  },
  {
  id: 'smart-soil-monitor',
  name: 'Smart Soil Monitoring System',
  tagline: 'Real-Time Soil Health & Yield Assurance',
  type: 'hardware', 
  image: '/products/npk.jpeg', 
  specs: [
    'Sensors:AQI, Rain & Storm Alert',
    'AI Features: Fertilizer Recs & Disease Risk',
    'Forecast: Rain Probability & Yield Pred',
    'Power: Long-Life Battery',
    'Live Data: Auto-Refresh Cloud Dashboard'
  ],
  description: 'Transform farming from gambling into guaranteed engineering. This all-in-one station goes beyond basic sensing—monitoring Soil NPK, environmental AQI, and real-time storm risks with a blinking alert system. Integrated with a Crop Selector and Fertilizer AI, it predicts disease risks and provides actionable prescriptions before damage occurs, ensuring export-grade quality and protecting against total season financial loss.'
},
  
];

export const PROJECTS: Project[] = [
  // {
  //   id: 'smart-city',
  //   title: 'Smart City Grid Defense',
  //   category: 'IoT Security',
  //   description: 'Secured the IoT infrastructure for a major metropolitan smart grid, protecting over 50,000 connected nodes.',
  //   metrics: ['50k+ Nodes Secured', '0 Breaches', '99.99% Uptime'],
  //   image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800&h=600',
  //   fullDetails: {
  //     client: 'Metro Grid Authority',
  //     location: 'Singapore',
  //     duration: '18 Months',
  //     challenge: 'The client faced persistent DDoS attacks on their smart metering infrastructure, causing blackouts and data discrepancies. Traditional firewalls were unable to handle the sheer volume of IoT traffic.',
  //     solution: [
  //       'Implemented Aegis IoT Shield nodes at key distribution centers.',
  //       'Deployed a custom AI model to differentiate between normal usage spikes and malicious traffic.',
  //       'Established a dedicated SOC channel for real-time grid monitoring.'
  //     ],
  //     impact: [
  //       'Zero successful breaches in the 12 months following deployment.',
  //       'Reduced false-positive alerts by 94%.',
  //       'Achieved ISO 27001 certification for the entire grid network.'
  //     ]
  //   }
  // },
  // {
  //   id: 'airport-defense',
  //   title: 'Intl. Airport Perimeter',
  //   category: 'Drone Defense',
  //   description: 'Deployed a multi-layered drone interception system for a high-traffic international airport.',
  //   metrics: ['10km Radius', 'Auto-Neutralization', '24/7 Monitoring'],
  //   image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800&h=600',
  //   fullDetails: {
  //     client: 'Global Aviation Corp',
  //     location: 'Dubai, UAE',
  //     duration: '8 Months',
  //     challenge: 'Unauthorized recreational drones were entering flight paths, causing expensive delays and safety hazards. Manual spotting was ineffective at night.',
  //     solution: [
  //       'Installed Sky Sentry Pro units for 24/7 thermal perimeter monitoring.',
  //       'Integrated Phantom X1 Interceptors for autonomous neutralization of hostile UAVs.',
  //       'Created a centralized command dashboard for air traffic controllers.'
  //     ],
  //     impact: [
  //       'Eliminated flight delays caused by drone activity.',
  //       'Successfully intercepted 14 unauthorized drones in the first quarter.',
  //       'Enhanced passenger safety and confidence ratings.'
  //     ]
  //   }
  // },
  // {
  //   id: 'bank-iso',
  //   title: 'Global Bank Compliance',
  //   category: 'ISO 27001',
  //   description: 'Guided a multinational banking institution through complete ISO 27001 certification and SOC 2 implementation.',
  //   metrics: ['100% Compliance', '6 Month Timeline', 'Global Standard'],
  //   image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=800&h=600',
  //   fullDetails: {
  //     client: 'NeoBank Financial',
  //     location: 'London, UK',
  //     duration: '6 Months',
  //     challenge: 'The bank needed to expand into new markets but lacked the required ISO 27001 and SOC 2 certifications. Their existing legacy systems made audit trails difficult.',
  //     solution: [
  //       'Conducted a gap analysis of existing IT infrastructure.',
  //       'Implemented automated compliance logging tools.',
  //       'Trained staff on new security protocols and social engineering awareness.'
  //     ],
  //     impact: [
  //       'Achieved ISO 27001 certification on the first audit attempt.',
  //       'Opened markets in 3 new regulatory jurisdictions.',
  //       'Reduced insurance premiums by 25% due to improved risk posture.'
  //     ]
  //   }
  // }
];

export const TESTIMONIALS: Testimonial[] = []; 

export const TEAM: TeamMember[] = [
  {
    id: 'founder',
    name: 'Jaykumar Vishnu Choudhary',
    role: 'Founder ',
    bio: 'Vision: A visionary Technocrat revolutionizing the skies with AI-driven Drones for Agriculture, Land Mapping, and Cross-Pollination. With 19+ years of experience in Global Security Strategy, Jaykumar integrates military-grade Cybersecurity into autonomous aerial systems, ensuring that our drone solutions are not only efficient but secure by design.',
    image: '/team/founder_profile.jpg',
  }
];

export const STATS: StatMetric[] = [
  { label: 'Avg. Response Time', value: '2.4s', change: '-15%', isPositive: true },
  { label: 'Threats Neutralized', value: '14k+', change: '+145%', isPositive: true },
  { label: 'Uptime Guarantee', value: '99.9%', change: 'Stable', isPositive: true },
];