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
  { name: 'Gallery', href: '#gallery', hasDropdown: false },
  { name: 'About', href: '#about', hasDropdown: true, dropdownKey: 'about' },
  { name: 'Contact', href: '#contact', hasDropdown: true, dropdownKey: 'contact' },
];

// ===============================================
// 🚨 NEW NESTED GALLERY STRUCTURE 🚨
// ===============================================
export const GALLERY_CONTENT = {
  // Collections for the main grid cards (internal slideshows)
  collections: [
    {
      id: 'col-11l',
      title: 'Krishi Sakha 11L',
      tagline: 'Compact & Efficient',
      media: [
        { type: 'image', src: '/products/krishi_11l.jpeg', alt: '11L Drone View 1' },
        // Add more views of the 11L drone here
        { type: 'image', src: '/gallery/krishi_11l_2.jpeg', alt: 'View 2' },
      ]
    },
    {
      id: 'col-16l',
      title: 'Krishi Sakha 16L',
      tagline: 'Precision Farming',
      media: [
        { type: 'image', src: '/products/krishi_16l.jpeg', alt: 'Autopilot Interface' }, // Use image_7.png here
        { type: 'image', src: '/gallery/krishi_16l_2.jpeg', alt: 'Flight Path Planning' } // Use image_11.png here
      ]
    },
    {
      id: 'NPK_SENSOR',
      title: 'SMART AGRICULTURE SOIL MONITORING SYSTEM',
      tagline: 'Built to Last',
      media: [
        { type: 'image', src: '/gallery/npk_1.jpeg', alt: 'Animated_sensor' }, // Use image_6.png
        { type: 'image', src: '/gallery/npk_2.jpeg', alt: 'Animated_sensor' }, // Use image_6.png  
          { type: 'image', src: '/gallery/npk_sensor_live.jpeg', alt: 'Key Features Icons' }, // Use image_6.png
        { type: 'image', src: '/gallery/npk_dashboard.jpeg', alt: 'Internal Components' } // Use image_13.png
      ]
    }
  ],
  // Flat list for the sidebar column
  exhibitions: [
    { 
      id: 101, 
      src: '/gallery/ex1.jpeg', 
      title: 'Tech Expo ',
      // location: 'New Delhi' 
    },
    { 
      id: 102, 
      src: '/gallery/ex2.jpeg', 
      title: 'Tech Expo',
      // location: 'Pune' 
    },
    
    // Add more if needed for scrolling
    { 
      id: 103, 
      src: '/gallery/field_demo.jpeg', 
      title: 'Live Field Demo',
      // location: 'Nagpur' 
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

export const CONTACT_SECTION_DETAILS = [
  {
    title: "Registered Office",
    lines: [
      "Radar Sniper TM",
      "22, Mezzanine Floor, Mona Shopping Centre,",
      "Near Navrang Cinema, JP Road,",
      "Andheri West, Mumbai - 400 058.",
      "INDIA.",
      "Tel No.: +91 90041 12868",
      "Email ID: info@radarsniper.com"
    ]
  },
  {
    title: "Netherland Branch Office",
    lines: [
      "Ereprijsweg 14",
      "2565 AJ",
      "Den Haag",
      "The Netherlands",
      "Tel No.: 0031-611596812"
    ]
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
    id: 'krishi-sakha-16l',
    name: 'Krishi Sakha 16L',
    tagline: 'High-Capacity Smart Drone',
    type: 'drone',
    image: '/products/krishi_16l.jpeg', 
    specs: [
      'Tank Capacity: 16 Litres', 
      'Flight Time: 25 Mins', 
      'Spray Time: 5 to 7 min/acre',
      'GPS: Dual GPS System',
      'Connectivity: Wi-Fi Enabled',
      'Battery: 2 Units Included',
      'Range: 2 Km'
    ],
    description: 'Built for larger operations, the 16L base model offers extended flight time and greater holding capacity. With integrated Wi-Fi, you get better connectivity and access to real-time farm information. It is designed to fulfill all heavy-duty spraying needs with a robust build quality.'
  },
  {
    id: 'smart-soil-monitor',
    name: 'Smart Soil NPK Monitor',
    tagline: 'Real-Time Soil Health & Yield Assurance',
    type: 'hardware', 
    image: '/products/npk_sensor.jpeg', // 📸 Ensure you have this image
    specs: [
      'Detects: NPK, Moisture, Temp',
      'Response: Pre-damage Alert',
      'Lifespan: 20-30 Years Soil Safety',
      'Connectivity: Cloud Dashboard',
      'Coverage: 1 Unit / Acre' // 🚨 UPDATE THIS with real coverage area
    ],
    description: 'Transform farming from gambling into guaranteed engineering. Unlike standard sensors that report damage after it happens, our system detects nutrient imbalances at the root stage before yield collapse. It prevents irreversible soil poisoning, ensures export-grade crop quality, and acts as insurance against total season financial loss.'
  },
  // {
  //   id: 'krishi-components',
  //   name: 'Advanced Drone Components',
  //   tagline: 'Engineered for Performance',
  //   type: 'hardware', 
  //   image: '/products/krishi_features.jpg', 
  //   specs: [
  //     'Controller: JIYI K++ V2 (Indian Made)', 
  //     'Battery: 44000mAh Li-Po', 
  //     'Motor: Hobbywing X6 Plus', 
  //     'Radar: Collision Avoidance',
  //     'Tank: Solid Seed Spreader Compatible'
  //   ],
  //   description: 'Our drones are built with top-tier components: A fully Indian-made flight control system for stability, Thermal Foggers for crop protection, and a smart Lithium Polymer battery system. Features include Obstacle Avoidance radars, Terrain Following, and Autonomous Flight path planning.'
  // },
  
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
    role: 'Founder & Chief Security Strategist',
    bio: 'Vision: A leading Cyber Forensics Specialist and Technocrat with 19+ years of experience spearheading global security programs. Expert in designing Enterprise Security Architectures, pioneering new cryptography algorithms, and ensuring regulatory compliance (ISO 27001, PCI DSS, SOX).',
    image: '/team/founder_profile.jpg',
  }
];

export const STATS: StatMetric[] = [
  { label: 'Avg. Response Time', value: '2.4s', change: '-15%', isPositive: true },
  { label: 'Threats Neutralized', value: '14k+', change: '+145%', isPositive: true },
  { label: 'Uptime Guarantee', value: '99.9%', change: 'Stable', isPositive: true },
];