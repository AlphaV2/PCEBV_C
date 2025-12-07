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
  linkedin: "https://www.linkedin.com/in/jaykumar-vishnu-choudhary-055b8a382/", // Update with actual company link
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/radarsnipers/",
  facebook: "https://www.facebook.com/",
};

// ===============================================
// NAVIGATION
// ===============================================

export const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services', hasDropdown: true, dropdownKey: 'services' },
  { name: 'Products', href: '#products', hasDropdown: true, dropdownKey: 'products' },
  { name: 'Projects', href: '#projects' },
  { name: 'About', href: '#about', hasDropdown: true, dropdownKey: 'about' },
  { name: 'Contact', href: '#contact', hasDropdown: true, dropdownKey: 'contact' },
];

// ===============================================
// ABOUT SECTION CONTENT (Refined for consistency)
// ===============================================

export const ABOUT_SECTION_CONTENT = [
    // Consolidated Mission (Used in Navbar dropdown)
    "Our mission emphasizes corporate citizenship and solving our customers' and stakeholders' most critical challenges by fostering trust and innovation.",

    // Company Pillars (Used in About.tsx left column)
    "Radar Sniper™ is a security-focused startup pioneering enhanced, next-generation solutions and innovations across Cyber Security, Internet of Things (IoT), and AI-powered Drones development.",
    "We support financial institutions (NBFCs, Banks) with specialized Information Security Consultancy Services, providing budgeted and customized solutions for Compliance, Auditing, and Implementation as per SEBI and RBI guidelines.",
    
    // Original quote retained for Navbar About Mega Menu quote block
    "The founder is responsible for Global Security Strategy, development and management of the company's technology including Enterprise Security Architecture, Security development and technology operations.",
];

// ===============================================
// CONTACT SECTION DETAILS (Updated Addresses)
// ===============================================

export const CONTACT_SECTION_DETAILS = [
  {
    title: "Registered Office (India)",
    lines: [
      "Radar Snipers (OPC) Private Ltd",
      "E 304, Dsk Vidyanagari Phase 2,",
      "Pashan Sus Road, Baner, Survey no 47",
      `PIN: 411045, PUNE, MAHARASHTRA, INDIA.`,
      `Mobile No.: ${WHATSAPP_NUMBER}`,
      "Email ID: info@radarsnipers.com"
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

// ===============================================
// SERVICES
// ===============================================

export const SERVICES: Service[] = [
  {
    id: 'drone-snipers',
    title: 'AI-Powered Drone Defence',
    shortTitle: 'Drone Defence',
    description: 'Advanced aerial surveillance and counter-drone neutralization systems designed for critical infrastructure defense.',
    icon: Radio,
    features: ['Signal Jamming', 'Kinetic Interception', 'AI Recognition'],
    details: {
      intro: 'Radar Sniper TM is preparing the world for highly sophisticated drone technology with Artificial Intelligence. We design systems using renewable energy for extended flight times.',
      technicalSpecs: [
        "Reaction Time: < 0.5 seconds",
        "Detection Range: 15km+",
        "Neutralization: Soft & Kinetic",
        "AI Architecture: Neural Edge",
        "Autonomy: Level 4"
      ],
      flowDiagram: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=400",
      sections: [
        {
          heading: 'Defense & AI Integration',
          type: 'paragraph',
          body: [
            'Mostly, our technology is prepared and used for Defence Purposes. The "Mother Drone" has the increased capacity to carry "Child Drones", each of which is AI-enabled for autonomous decision making.',
            'The drone has been calculated for optimized power consumption, ensuring flying time exceeds standard market capabilities. We are continuously innovating in aerial endurance and payload management.'
          ]
        }
      ],
      downloadText: 'Download Technical Presentation',
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
    id: 'phantom-x1',
    name: 'Phantom X1 Interceptor',
    tagline: 'Autonomous Counter-UAV System',
    specs: ['Range: 5km', 'Speed: 120km/h', 'AI Target Locking'],
    image: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800&h=600',
    type: 'drone',
    description: 'The Phantom X1 is our flagship interceptor drone, capable of autonomously detecting and neutralizing unauthorized UAVs in restricted airspace.'
  },
  {
    id: 'aegis-shield',
    name: 'Aegis IoT Shield',
    tagline: 'Network Defense Node',
    specs: ['Zero-Trust Arch', 'Real-time Analytics', 'Edge Computing'],
    image: 'https://images.unsplash.com/photo-1558494949-ef526b004297?auto=format&fit=crop&q=80&w=800&h=600',
    type: 'software',
    description: 'A hardware-agnostic security layer that sits between your IoT devices and the cloud, filtering malicious traffic instantly.'
  },
  {
    id: 'sky-sentry',
    name: 'Sky Sentry Pro',
    tagline: 'Long-Endurance Surveillance',
    specs: ['Flight Time: 4hrs', 'Thermal Imaging', 'Encrypted Comms'],
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=800&h=600',
    type: 'drone',
    description: 'Designed for perimeter monitoring, the Sky Sentry Pro offers extended flight times and military-grade thermal optics for night operations.'
  },
  {
    id: 'cyber-wall',
    name: 'CyberWall SOC',
    tagline: 'AI-Powered Threat Detection',
    specs: ['Predictive AI', 'Auto-Remediation', '24/7 Uptime'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=600',
    type: 'software',
    description: 'Our proprietary SOC platform aggregates data from thousands of endpoints to predict attacks before they happen.'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'smart-city',
    title: 'Smart City Grid Defense',
    category: 'IoT Security',
    description: 'Secured the IoT infrastructure for a major metropolitan smart grid, protecting over 50,000 connected nodes.',
    metrics: ['50k+ Nodes Secured', '0 Breaches', '99.99% Uptime'],
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800&h=600',
    fullDetails: {
      client: 'Metro Grid Authority',
      location: 'Singapore',
      duration: '18 Months',
      challenge: 'The client faced persistent DDoS attacks on their smart metering infrastructure, causing blackouts and data discrepancies. Traditional firewalls were unable to handle the sheer volume of IoT traffic.',
      solution: [
        'Implemented Aegis IoT Shield nodes at key distribution centers.',
        'Deployed a custom AI model to differentiate between normal usage spikes and malicious traffic.',
        'Established a dedicated SOC channel for real-time grid monitoring.'
      ],
      impact: [
        'Zero successful breaches in the 12 months following deployment.',
        'Reduced false-positive alerts by 94%.',
        'Achieved ISO 27001 certification for the entire grid network.'
      ]
    }
  },
  {
    id: 'airport-defense',
    title: 'Intl. Airport Perimeter',
    category: 'Drone Defense',
    description: 'Deployed a multi-layered drone interception system for a high-traffic international airport.',
    metrics: ['10km Radius', 'Auto-Neutralization', '24/7 Monitoring'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800&h=600',
    fullDetails: {
      client: 'Global Aviation Corp',
      location: 'Dubai, UAE',
      duration: '8 Months',
      challenge: 'Unauthorized recreational drones were entering flight paths, causing expensive delays and safety hazards. Manual spotting was ineffective at night.',
      solution: [
        'Installed Sky Sentry Pro units for 24/7 thermal perimeter monitoring.',
        'Integrated Phantom X1 Interceptors for autonomous neutralization of hostile UAVs.',
        'Created a centralized command dashboard for air traffic controllers.'
      ],
      impact: [
        'Eliminated flight delays caused by drone activity.',
        'Successfully intercepted 14 unauthorized drones in the first quarter.',
        'Enhanced passenger safety and confidence ratings.'
      ]
    }
  },
  {
    id: 'bank-iso',
    title: 'Global Bank Compliance',
    category: 'ISO 27001',
    description: 'Guided a multinational banking institution through complete ISO 27001 certification and SOC 2 implementation.',
    metrics: ['100% Compliance', '6 Month Timeline', 'Global Standard'],
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&q=80&w=800&h=600',
    fullDetails: {
      client: 'NeoBank Financial',
      location: 'London, UK',
      duration: '6 Months',
      challenge: 'The bank needed to expand into new markets but lacked the required ISO 27001 and SOC 2 certifications. Their existing legacy systems made audit trails difficult.',
      solution: [
        'Conducted a gap analysis of existing IT infrastructure.',
        'Implemented automated compliance logging tools.',
        'Trained staff on new security protocols and social engineering awareness.'
      ],
      impact: [
        'Achieved ISO 27001 certification on the first audit attempt.',
        'Opened markets in 3 new regulatory jurisdictions.',
        'Reduced insurance premiums by 25% due to improved risk posture.'
      ]
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Gupta',
    role: 'CTO',
    company: 'FinTech Secure Ltd',
    content: 'Radar Sniper transformed our SOC capabilities. Their ISO 27001 guidance was instrumental in our recent audit success.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 't2',
    name: 'Sarah Vanderberg',
    role: 'Head of Security',
    company: 'EuroPort Logistics',
    content: 'The drone surveillance systems provided by Radar Sniper gave us complete visibility over our 50-acre facility. Absolutely cutting-edge.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 't3',
    name: 'Michael Chen',
    role: 'Director of Ops',
    company: 'SmartGrid Solutions',
    content: 'We needed a partner who understood both hardware and software security. Radar Sniper\'s IoT team delivered beyond expectations.',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  }
];

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

// New WhatsApp Constants placeholder:
// export const WHATSAPP_NUMBER = "+919819158929"; 
// export const WHATSAPP_MESSAGE = "Hi, I'm interested in Radar Sniper solutions.";
// export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;