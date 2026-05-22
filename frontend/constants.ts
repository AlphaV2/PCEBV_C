import { Shield, Zap, Database, Eye, Radio, Server, Lock, Globe, Cpu, Wifi, Briefcase, BarChart3, Users, FileText, Wrench, Layers, Gauge, CheckCircle, TrendingUp, Code } from 'lucide-react';
import { Service, Product, Testimonial, StatMetric, Project, TeamMember } from './types';

// ===============================================
// 🚨 GLOBAL CONSTANTS (WHATSAPP CENTRALIZATION) 🚨
// ===============================================

export const WHATSAPP_NUMBER = "+31611596812";
export const WHATSAPP_MESSAGE = "Hi, I'm interested in PCE BV engineering and project controls services.";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// ===============================================
// 🚨 SOCIAL MEDIA LINKS (NEW CENTRALIZED DATA) 🚨
// ===============================================

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/in/nishikantchoudharypmp/",
  twitter: "https://twitter.com/",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
};

// ===============================================
// NAVIGATION
// ===============================================

export const NAV_LINKS = [
  { name: 'Home', href: '/', hasDropdown: false, navKey: 'home' },
  { name: 'Services', href: '/services', hasDropdown: true, dropdownKey: 'services', navKey: 'services' },
  { name: 'Products', href: '/services', hasDropdown: true, dropdownKey: 'products', navKey: 'products' },
  { name: 'Projects', href: '/projects', hasDropdown: true, dropdownKey: 'projects', navKey: 'projects' },
  { name: 'About', href: '/about', hasDropdown: true, dropdownKey: 'about', navKey: 'about' },
  { name: 'Contact', href: '/contact', hasDropdown: true, dropdownKey: 'contact', navKey: 'contact' },
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
      src: '/gallery/vertical1.webp', // Your main vertical banner
      title: 'Integrated EPC Support',
      tagline: 'End-to-End Delivery'
    },
    {
      id: 'v2',
      src: '/gallery/vertical2.webp', // Placeholder: Replace with a TALL image
      title: 'Execution Excellence',
      tagline: 'Client Focused',
      decription:' '
    },
    {
      id: 'v3',
      src: '/gallery/vertical4.webp', // Placeholder: Replace with a TALL image
      title: 'Project Controls and Engineering',
      tagline: 'Data Driven',
      description: 'Integrated planning, cost, risk, and discipline engineering support for complex chemical, petrochemical, and energy projects.'
    },
    {
      id: 'v4',
      src: '/gallery/npk_data.jpeg', // Placeholder: Replace with a TALL image
      title: 'Governance and Reporting',
      tagline: 'Assurance Ready',
      decription:' '
    }
  ],

  // 🟡 COLUMN 2 (TOP): COMPANY SOLUTIONS (Landscape Images)
  // Recommended Size: 800w x 600h pixels (Aspect Ratio 4:3)
  engineeringFleet: [
    {
      id: 'fleet1',
      src: '/background/bg1.webp',
      title: 'Project Controls Package',
      tagline: 'Integrated Governance',
      description: 'Cost, schedule, risk, and change controls delivered through one aligned execution framework.'
    },
    {
      id: 'fleet2',
      src: '/background/bg2.webp',
      title: 'Detail Engineering Package',
      tagline: 'Multi-Discipline',
      description: 'Process, piping, mechanical, E&I, and civil/structural engineering support from FEED through IFC.'
    },
    {
      id: 'fleet4',
      src: '/pillar/pillar2.webp',
      title: 'Construction Interface Support',
      tagline: 'Field Linked',
      description: 'Vendor coordination and site-facing engineering support to improve readiness and execution continuity.'
    },
    {
      id: 'fleet5',
      src: '/pillar/pillar3.webp',
      title: 'Program Delivery in Action',
      tagline: 'Execution',
      description: 'Cross-functional coordination model connecting client, PCE BV, and execution teams for reliable outcomes.'
    }
  ],

  // 🟡 COLUMN 2 (BOTTOM): SPECIAL OFFERS (Square/Portrait Images)
  // Recommended Size: 800w x 800h pixels (Aspect Ratio 1:1)
  specialOffers: [
    {
      id: 'offer1',
      src: '/pillar/pillar1.webp',
      title: 'Execution Model Highlight',
      tagline: 'PCE BV + PCE PL',
      description:'European governance paired with Mumbai execution capability for responsive and scalable project delivery.'
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
      src: '/background/bg3.webp',
      title: 'Integrated Baseline Planning',
      tagline: 'Controls Foundation',
      description: 'Robust L3/L4 planning and reporting frameworks aligned with client governance and milestone objectives.'
    },
    {
      id: 'inno2',
      src: '/pillar/pillar4.webp',
      title: 'Vendor and Interface Management',
      tagline: 'Coordination Discipline',
      description: 'Structured management of technical queries, vendor inputs, and interdisciplinary interfaces.'
    },
    {
      id: 'inno3',
      src: '/background/bg2.webp',
      title: 'Risk-Informed Decision Support',
      tagline: 'Predictive Insights',
      description: 'Scenario-based risk and cost analysis supporting faster and better project decisions.'
    }
  ],

  // 🔵 COLUMN 3 (BOTTOM): EXHIBITIONS (Landscape Images)
  // Recommended Size: 800w x 600h pixels (Aspect Ratio 4:3)
  exhibitions: [
   { 
   id: 'ex1', 
   src: '/background/bg1.webp', 
   title: 'PCE Delivery Engagement',
   description:'Representative project delivery snapshot showing integrated controls and engineering coordination.',
   location: 'International Projects' 
 },
 { 
   id: 'ex2', 
   src: '/background/bg3.webp', 
   title: 'Engineering Execution Snapshot',
   description:'Illustrative execution scene from multidisciplinary engineering and construction support operations.',
   location: 'Client Sites' 
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
      src: '/pillar/pillar1.webp',
      title: 'Engineering and Project Controls Capability',
      tagline: 'FULL PROFILE',
      description: 'Overview of PCE BV service capabilities, execution model, and delivery strengths.'
    }
  ]

};


// ... (Keep ABOUT_SECTION_CONTENT, CONTACT_SECTION_DETAILS, SERVICES, PRODUCTS, PROJECTS, TESTIMONIALS, TEAM, STATS as they are in your file)
// Make sure to include the PRODUCTS array you provided in the previous message.
export const ABOUT_SECTION_CONTENT = [
  "PCE BV is a trusted provider of engineering, procurement, and construction support services, specialized in detail engineering, project controls, and documentation.",
  "Founded and registered with KVK on 30 April 2025, PCE BV is co-founded by Kiran V. Kulkarni and Nishikant V. Choudhary, with strategic execution support from partner company PCE PL Mumbai.",
  "Our mission is to deliver engineering excellence in the simplest and most effective way while ensuring compliance with international standards.",
  "With over three decades of combined EPC and project controls expertise, we support chemicals, petrochemicals, energy, and infrastructure clients with disciplined, high-quality delivery.",
];

export const CONTACT_OFFICES = [
  {
    title: "Registered Office (Netherlands)",
    lines: [
      "Petroleum Consulting Engineers BV (PCE BV)",
      "Ereprijsweg 14",
      "2565 AV The Hague",
      "KVK No. 97146412",
      `Mobile No.: ${WHATSAPP_NUMBER}`,
      "Email: nishikantvc@gmail.com"
    ]
  },
  {
    title: "Partner Engineering Office (India)",
    lines: [
      "PCE PL - Petroleum Consulting Engineers Private Limited",
      "Mumbai, India",
      "Execution and Engineering Delivery Center",
      "Disciplines: Process, Piping, Mechanical, Electrical, Instrumentation, Civil"
    ]
  }
];

// 2. NEW: Digital Communication Channels
export const CONTACT_EMAILS = [
  {
    role: "General Enquiries",
    email: "nishikantvc@gmail.com",
    desc: "Commercial and Service Requests",
    icon: "mail",
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    role: "Project Coordination",
    email: "nishikantvc@gmail.com",
    desc: "Project Planning and Controls",
    icon: "briefcase",
    color: "text-purple-500",
    bg: "bg-purple-50"
  },
  {
    role: "Managing Director",
    email: "nishikantvc@gmail.com",
    desc: "Strategic Partnerships",
    icon: "shield",
    color: "text-yellow-600",
    bg: "bg-yellow-50"
  }
];

export const SERVICES: Service[] = [
  // ============================================
  // PROJECT MANAGEMENT SERVICES
  // ============================================
  {
    id: 'project-controls',
    title: 'Project Controls Leadership',
    shortTitle: 'Project Controls',
    category: 'Project Management',
    description: 'Integrated cost, planning, risk, and change management for complex industrial projects.',
    icon: Briefcase,
    features: ['Cost & Schedule Control', 'Risk Management', 'EAC Forecasting', 'Change Governance'],
    details: {
      intro: 'PCE BV delivers end-to-end project controls leadership across cost, planning, and risk disciplines to improve certainty, reporting quality, and financial outcomes.',
      technicalSpecs: [
        "Schedule Levels: L3/L4",
        "Controls: Cost, Planning, Risk, Change",
        "Forecasting: EAC and Cash Flow",
        "Governance: Contract and Financial",
        "Methods: Scenario and Sensitivity Analysis"
      ],
      flowDiagram: "/products/krishi_11l.jpeg",
      sections: [
        {
          heading: 'Execution Approach',
          type: 'paragraph',
          body: [
            'We establish integrated baselines, progress measurement systems, and reporting cadences aligned to client governance standards.',
            'Our teams provide timely forecast updates, risk reviews, and actionable performance insights to support decisions at every project stage.'
          ]
        },
        {
          heading: 'Key Benefits',
          type: 'list',
          body: [
            'Higher reporting accuracy and improved schedule visibility.',
            'Proactive risk mitigation and faster issue escalation.',
            'Improved financial control through robust EAC discipline.',
            'Consistent governance for multi-stakeholder environments.'
          ]
        }
      ],
      downloadText: 'Download Project Controls Overview',
      downloadLink: '#'
    }
  },
  {
    id: 'planning-scheduling',
    title: 'Planning & Scheduling',
    shortTitle: 'Planning',
    category: 'Project Management',
    description: 'Level 3/Level 4 detail schedules with resource planning and critical path management.',
    icon: BarChart3,
    features: ['L3/L4 Schedules', 'Resource Planning', 'Critical Path Analysis', 'Milestone Tracking'],
    details: {
      intro: 'Strategic and tactical scheduling frameworks that align with project governance and support disciplined delivery.',
      technicalSpecs: [
        "Schedule Development: FEED to Commissioning",
        "Baseline Management: Change and Update Protocols",
        "Resource Allocation: Discipline and Activity Level",
        "Reporting: Monthly Progress and Variance Analysis"
      ],
      sections: [
        {
          heading: 'Deliverables',
          type: 'list',
          body: [
            'Integrated master schedule (IMS)',
            'Discipline-specific schedules',
            'Resource-loaded plans',
            'Earned value tracking'
          ]
        }
      ]
    }
  },
  {
    id: 'cost-controls',
    title: 'Cost & Budget Controls',
    shortTitle: 'Cost Controls',
    category: 'Project Management',
    description: 'Total installed cost estimation, budget management, and variance analysis.',
    icon: Gauge,
    features: ['TIC Estimation', 'Budget Tracking', 'Cost Forecasting', 'Variance Reporting'],
    details: {
      intro: 'Disciplined cost management frameworks ensuring financial targets are met through accurate estimation and ongoing control.',
      technicalSpecs: [
        "Estimation: Conceptual to Detail Level",
        "Controls: Budget vs. Actual",
        "Forecasting: EAC and CTC",
        "Contingency: Risk-Based and Schedule-Based"
      ],
      sections: [
        {
          heading: 'Services',
          type: 'list',
          body: [
            'Pre-bid and bid cost support',
            'Detailed cost estimation',
            'Monthly cost reporting',
            'Trend analysis and forecasts'
          ]
        }
      ]
    }
  },
  {
    id: 'risk-management',
    title: 'Risk & Opportunity Management',
    shortTitle: 'Risk Management',
    category: 'Project Management',
    description: 'Identification, assessment, and mitigation of project risks with opportunity capture.',
    icon: TrendingUp,
    features: ['Risk Identification', 'Mitigation Planning', 'Sensitivity Analysis', 'Opportunity Tracking'],
    details: {
      intro: 'Proactive risk management ensuring early identification and mitigation of delivery threats.',
      technicalSpecs: [
        "Methods: HAZOP, FMEA, and Workshops",
        "Assessment: Qualitative and Quantitative",
        "Reporting: Risk Registers and Heat Maps",
        "Contingency: Scenario Analysis"
      ],
      sections: [
        {
          heading: 'Risk Services',
          type: 'list',
          body: [
            'Risk assessment workshops',
            'Sensitivity and scenario analysis',
            'Monte Carlo simulation',
            'Risk register management'
          ]
        }
      ]
    }
  },
  {
    id: 'change-management',
    title: 'Change & Configuration Management',
    shortTitle: 'Change Management',
    category: 'Project Management',
    description: 'Disciplined change control processes and configuration baseline management.',
    icon: Users,
    features: ['Change Control Boards', 'Baseline Management', 'Impact Analysis', 'Configuration Tracking'],
    details: {
      intro: 'Structured change management protecting project scope and schedule integrity.',
      technicalSpecs: [
        "Framework: CCB and Change Workflow",
        "Tools: Change Registers and Logs",
        "Impact: Schedule and Cost Analysis",
        "Approval: Multi-Stakeholder Review Cycles"
      ],
      sections: [
        {
          heading: 'Change Services',
          type: 'list',
          body: [
            'Change impact assessments',
            'CCB facilitation and support',
            'Baseline updates and releases',
            'Change trend reporting'
          ]
        }
      ]
    }
  },
  {
    id: 'project-governance',
    title: 'Project Governance & Reporting',
    shortTitle: 'Governance',
    category: 'Project Management',
    description: 'Stakeholder reporting, steering committee support, and governance frameworks.',
    icon: Eye,
    features: ['Stakeholder Reports', 'Dashboard Development', 'Steering Support', 'Performance Metrics'],
    details: {
      intro: 'Governance structures and reporting cadences that keep all stakeholders aligned and informed.',
      technicalSpecs: [
        "Reports: Monthly, Quarterly, Milestone",
        "Formats: Executive Summaries and Detail Packs",
        "Dashboards: Real-Time Performance Tracking",
        "Forums: Steering and Review Meetings"
      ],
      sections: [
        {
          heading: 'Governance Deliverables',
          type: 'list',
          body: [
            'Executive status reports',
            'Performance dashboards',
            'Risk and issue escalation',
            'Stakeholder communication packs'
          ]
        }
      ]
    }
  },
  
  // ============================================
  // ENGINEERING SERVICES
  // ============================================
  {
    id: 'detail-engineering',
    title: 'Detail Engineering Services',
    shortTitle: 'Detail Engineering',
    category: 'Engineering',
    description: 'Multi-discipline engineering from FEED through IFC with high-quality deliverables.',
    icon: Database,
    features: ['FEED & Design', 'Multi-Discipline', '3D Modeling', 'IFC Packages'],
    details: {
      intro: 'Our engineering teams support process, piping, mechanical, electrical, instrumentation, and civil/structural scopes for high-quality design delivery.',
      technicalSpecs: [
        "Deliverables: FEED and Detail Design",
        "Tools: Intelligent P&ID and INTOOLS",
        "3D Platforms: PDS, E3D, SP3D",
        "Stress Analysis: Caesar-II",
        "Standards: International Codes Compliance"
      ],
      sections: [
        {
          heading: 'Engineering Activities',
          type: 'list',
          body: [
            'Discipline design and drafting for process, piping, mechanical, E&I, and CSA.',
            'Vendor data incorporation and technical query responses.',
            'Design reviews, HAZOP support, and IFC submission workflows.',
            'Design verification and QA/QC document controls.'
          ]
        }
      ],
      downloadText: 'Download Engineering Capability Sheet',
      downloadLink: '#'
    }
  },
  {
    id: 'process-engineering',
    title: 'Process Engineering',
    shortTitle: 'Process Design',
    category: 'Engineering',
    description: 'Process design, flowsheets, and PID development for chemical and energy projects.',
    icon: Code,
    features: ['Process Design', 'PID Development', 'Material Balance', 'Heat & Mass Transfer'],
    details: {
      intro: 'Expert process engineering support for defining, simulating, and optimizing process schemes.',
      technicalSpecs: [
        "Tools: Aspen HYSYS, Pro/II",
        "Simulation: Steady-State and Dynamic",
        "Documentation: P&IDs and Process Descriptions",
        "Standards: API, ASME Compliance"
      ],
      sections: [
        {
          heading: 'Process Services',
          type: 'list',
          body: [
            'Conceptual process design',
            'FEED flowsheets and PIDs',
            'Detail design and revisions',
            'Process safety and optimization'
          ]
        }
      ]
    }
  },
  {
    id: 'piping-engineering',
    title: 'Piping Engineering & Stress Analysis',
    shortTitle: 'Piping Design',
    category: 'Engineering',
    description: '3D piping models, isometrics, and stress analysis for integrity and safety.',
    icon: Wrench,
    features: ['3D Piping Models', 'Stress Analysis', 'Isometric Drawings', 'Pipe Routing'],
    details: {
      intro: 'Comprehensive piping engineering ensuring safe, economical, and constructible designs.',
      technicalSpecs: [
        "3D Platforms: PDS, E3D, SP3D",
        "Stress Analysis: Caesar-II",
        "Isometrics: Fabrication and Installation",
        "Standards: ASME B31.3, B31.1"
      ],
      sections: [
        {
          heading: 'Piping Deliverables',
          type: 'list',
          body: [
            '3D piping models and routing',
            'Piping stress analysis reports',
            'Isometric drawings for fabrication',
            'Support and hanger design',
            'Hydro test and operational procedures'
          ]
        }
      ]
    }
  },
  {
    id: 'mechanical-engineering',
    title: 'Mechanical Engineering',
    shortTitle: 'Mechanical Design',
    category: 'Engineering',
    description: 'Mechanical equipment design, sizing, and specification for rotating and static equipment.',
    icon: Layers,
    features: ['Equipment Sizing', 'Mechanical Specs', 'Vendor Selection', 'Data Sheets'],
    details: {
      intro: 'Mechanical engineering for process equipment, rotating machinery, and infrastructure systems.',
      technicalSpecs: [
        "Equipment: Pumps, Compressors, Turbines, Reactors",
        "Sizing: Hydraulic, Thermal, and Mechanical",
        "Standards: API, ASME, ISO Compliance",
        "Vendor: RFQ Support and Data Reconciliation"
      ],
      sections: [
        {
          heading: 'Mechanical Services',
          type: 'list',
          body: [
            'Equipment selection and sizing',
            'Mechanical data sheet development',
            'RFQ and vendor evaluation support',
            'Equipment arrangement and coordination'
          ]
        }
      ]
    }
  },
  {
    id: 'electrical-engineering',
    title: 'Electrical & Control Engineering',
    shortTitle: 'Electrical Design',
    category: 'Engineering',
    description: 'Electrical system design, load calculations, and instrumentation & control specifications.',
    icon: Zap,
    features: ['Load Calculations', 'Control Logic', 'Electrical Specs', 'DCS Programming'],
    details: {
      intro: 'Electrical and instrumentation engineering for safe, reliable plant operation.',
      technicalSpecs: [
        "Electrical: Power Distribution and Control",
        "I&C: DCS, Safety Systems, and Instrumentation",
        "Standards: IEC, NFPA, ISA Compliance",
        "Documentation: One-Line Diagrams and Schematics"
      ],
      sections: [
        {
          heading: 'Electrical Services',
          type: 'list',
          body: [
            'Electrical load studies and calculations',
            'Power distribution design',
            'Instrumentation specifications',
            'DCS and control logic design',
            'Safety system specifications'
          ]
        }
      ]
    }
  },
  {
    id: 'civil-structural',
    title: 'Civil & Structural Engineering',
    shortTitle: 'Civil Design',
    category: 'Engineering',
    description: 'Structural design, foundation analysis, and site civil works for industrial facilities.',
    icon: CheckCircle,
    features: ['Structure Design', 'Foundation Analysis', 'Site Layout', 'Civil Works'],
    details: {
      intro: 'Civil and structural engineering ensuring stable, compliant, and cost-effective plant infrastructure.',
      technicalSpecs: [
        "Design: Columns, Beams, Foundations",
        "Analysis: Seismic, Wind, and Load Cases",
        "Standards: Eurocode, IBC Compliance",
        "Software: SAP2000, STAAD Pro"
      ],
      sections: [
        {
          heading: 'Civil Services',
          type: 'list',
          body: [
            'Structural design and analysis',
            'Foundation and pile design',
            'Site layout and civil arrangements',
            'Concrete and steel drawings'
          ]
        }
      ]
    }
  },
  {
    id: '3d-plant-modeling',
    title: '3D Plant Modeling & Visualization',
    shortTitle: '3D Modeling',
    category: 'Engineering',
    description: 'Comprehensive 3D plant models for coordination, clash detection, and constructability review.',
    icon: Layers,
    features: ['Plant Coordination', 'Clash Detection', 'Construction Sequencing', '3D Visualization'],
    details: {
      intro: 'Integrated 3D models enabling better coordination, constructability, and project visualization.',
      technicalSpecs: [
        "Platforms: Plant 3D, CADWorx 3D",
        "Coordination: Multi-Discipline Integration",
        "Clash Detection: Automated and Manual",
        "Visualization: 3D Walkthroughs and Reports"
      ],
      sections: [
        {
          heading: '3D Modeling Services',
          type: 'list',
          body: [
            'Integrated 3D plant coordination',
            'Clash and interference detection',
            'Construction sequence visualization',
            'Operation and maintenance planning'
          ]
        }
      ]
    }
  },
  {
    id: 'procurement-construction',
    title: 'Procurement & Construction Support',
    shortTitle: 'P&C Support',
    category: 'Engineering',
    description: 'Vendor coordination, field engineering, and construction-stage support.',
    icon: Shield,
    features: ['Vendor Coordination', 'Field Support', 'VDRL/SDRL', 'Site Documentation'],
    details: {
      intro: 'We support procurement and construction teams with disciplined interface management and engineering-backed documentation.',
      technicalSpecs: [
        "Support: Procurement and Construction",
        "Controls: VDRL and SDRL Tracking",
        "Documentation: QA/QC and Verification Reports",
        "Staffing: Engineering and Site Manpower Secondment"
      ],
      sections: [
        {
          heading: 'Services Offered',
          type: 'list',
          body: [
            'Vendor coordination and data consolidation',
            'Field engineering and technical support',
            'Construction interface management',
            'QA/QC and inspection support',
            'As-built documentation'
          ]
        }
      ]
    }
  },
  {
    id: 'documentation-governance',
    title: 'Documentation & Governance',
    shortTitle: 'Documentation',
    category: 'Engineering',
    description: 'Document control, technical reporting, and project governance documentation.',
    icon: FileText,
    features: ['Document Control', 'Project Reporting', 'Governance Packs', 'Compliance Assurance'],
    details: {
      intro: 'Our documentation framework ensures that every stage of engineering, procurement, and execution remains auditable and decision-ready.',
      technicalSpecs: [
        "Controls: Document Register and Revisions",
        "Reporting: Progress, Risk, and Change",
        "Outputs: Client and Stakeholder Packs",
        "Standards: International Compliance Alignment"
      ],
      sections: [
        {
          heading: 'Documentation Services',
          type: 'list',
          body: [
            'Document register and tracking',
            'Technical report compilation',
            'Project milestone reporting',
            'Compliance and audit documentation',
            'Handover packages'
          ]
        }
      ]
    }
  },
  {
    id: 'commissioning-support',
    title: 'Commissioning & Start-Up Support',
    shortTitle: 'Commissioning',
    category: 'Engineering',
    description: 'Commissioning planning, readiness support, and start-up assistance.',
    icon: CheckCircle,
    features: ['Commissioning Plans', 'Start-Up Support', 'Performance Testing', 'Training Support'],
    details: {
      intro: 'Professional support ensuring smooth transition from construction to operation.',
      technicalSpecs: [
        "Plans: Commissioning and Pre-Startup Plans",
        "Testing: Pressure, Performance, and Operational",
        "Documentation: COI and Handover Packages",
        "Training: Operational and Maintenance"
      ],
      sections: [
        {
          heading: 'Commissioning Services',
          type: 'list',
          body: [
            'Commissioning plan development',
            'Pre-startup meeting support',
            'Punch list management',
            'Performance testing oversight',
            'Staff training and handover'
          ]
        }
      ]
    }
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'project-controls-package',
    name: 'Integrated Project Controls Package',
    tagline: 'Cost, Planning, Risk, and Change Controls',
    type: 'service',
    image: '/background/bg1.webp', 
    specs: [
      'Integrated L3/L4 Schedule Setup',
      'EAC and Cash Flow Forecasting',
      'Cost and Progress Reporting',
      'Risk and Change Dashboards',
      'Stakeholder Performance Packs'
    ],
    description: 'A complete controls framework for industrial projects that integrates planning, cost, risk, and change into one governance-ready delivery model.'
  },
  {
    id: 'detail-engineering-package',
    name: 'Detail Engineering Delivery Package',
    tagline: 'Multi-Discipline Engineering Services',
    type: 'service',
    image: '/background/bg2.webp',
    specs: [
      'Process, Piping, Mechanical, and CSA',
      'Electrical and Instrumentation Design',
      '3D Model Development and Checks',
      'Vendor Data Integration',
      'IFC Deliverables'
    ],
    description: 'Discipline engineering support from FEED to IFC with strong interface control and document traceability across client and vendor ecosystems.'
  },
  {
    id: 'construction-support-package',
    name: 'Procurement and Construction Support Package',
    tagline: 'Field-Ready Engineering and Coordination',
    type: 'service',
    image: '/pillar/pillar2.webp',
    specs: [
      'VDRL and SDRL Controls',
      'Vendor and Interface Coordination',
      'Site Document Support',
      'Management of Change Support',
      'Discipline-Specific Field Assistance'
    ],
    description: 'A coordinated support model for procurement and construction teams, improving site readiness, communication, and execution continuity.'
  },
  {
  id: 'documentation-governance-package',
  name: 'Documentation and Governance Package',
  tagline: 'Controlled Deliverables and Reporting',
  type: 'service', 
  image: '/pillar/pillar4.webp', 
  specs: [
    'Document Control and Transmittals',
    'Quality Verification Records',
    'Project and Stakeholder Reports',
    'Audit-Ready Data Sets',
    'Compliance-Oriented Workflows'
  ],
  description: 'A structured documentation service to keep project data accurate, current, and decision-ready throughout the full project lifecycle.'
},
  
];

export const PROJECTS: Project[] = [
  {
    id: 'jurong-thailand-2015',
    title: 'Design Engineering Services for Power Plant (Thailand)',
    category: 'Detail Engineering',
    description: 'Design and detail engineering services including 3D modeling up to as-built support for Jurong Engineering projects.',
    metrics: ['Duration: 12 Months', 'Value: EUR 428,380', 'Completed: May 2015'],
    image: '/gallery/ex1.jpeg',
    fullDetails: {
      client: 'Jurong Engineering Limited',
      location: 'Thailand / Singapore',
      duration: '12 Months',
      challenge: 'Required multidisciplinary design support with deliverables aligned to project construction timelines.',
      solution: [
        'Delivered integrated discipline engineering and 3D model support.',
        'Maintained timely issue-resolution cycles with client engineering teams.',
        'Supported as-built closeout documentation.'
      ],
      impact: [
        'On-time completion of engineering package.',
        'Improved design handover readiness for construction.',
        'Established repeat engagement confidence.'
      ]
    }
  },
  {
    id: 'fintech-reliance-2019',
    title: 'Engineering and Fabrication Services for Reliance Scope',
    category: 'Engineering Services',
    description: 'Comprehensive engineering and fabrication support executed through Fintech Corporation for major petrochemical works.',
    metrics: ['Duration: 24 Months', 'Value: EUR 1,450,737', 'Completed: May 2019'],
    image: '/gallery/ex2.jpeg',
    fullDetails: {
      client: 'Fintech Corporation Private Limited (for Reliance)',
      location: 'India',
      duration: '24 Months',
      challenge: 'Large-scope engineering support needed sustained controls over deliverables and fabrication interfaces.',
      solution: [
        'Established project controls for deliverable and milestone tracking.',
        'Coordinated engineering outputs with fabrication requirements.',
        'Maintained progress and quality reporting discipline.'
      ],
      impact: [
        'Stable engineering workflow across project phases.',
        'Improved visibility into scope and schedule status.',
        'Consistent client communication and reporting quality.'
      ]
    }
  },
  {
    id: 'thyssenkrupp-ongoing',
    title: 'Enquiry and Engineering Support for TKIS Ongoing Projects',
    category: 'Project Controls and Estimation',
    description: 'Ongoing enquiry and engineering support for multiple projects including pre-bid and execution support.',
    metrics: ['Status: Ongoing', 'Planned Through: Dec 2025', 'Value: Multi-Contract'],
    image: '/gallery/field_demo.jpeg',
    fullDetails: {
      client: 'Thyssenkrupp Industrial Solutions India',
      location: 'Mumbai, India',
      duration: 'Ongoing',
      challenge: 'Multiple parallel project enquiries required fast-response estimation and engineering alignment.',
      solution: [
        'Provided enquiry-phase engineering and estimation support.',
        'Supported bid-stage coordination and scope clarification.',
        'Enabled continuity between enquiry and delivery functions.'
      ],
      impact: [
        'Faster turnaround for proposal and estimate cycles.',
        'Improved pre-bid data quality and planning confidence.',
        'Sustained support across ongoing project streams.'
      ]
    }
  },
  {
    id: 'jacobs-3d-services',
    title: '3D Engineering Services for Jacobs Projects',
    category: '3D Engineering',
    description: '3D-based engineering support on various projects with value tied to progressive billing outputs.',
    metrics: ['Status: Ongoing', 'Value: EUR 1,708,368', 'Latest: Jul 2024'],
    image: '/gallery/fleet4.jpeg',
    fullDetails: {
      client: 'Jacobs Engineering India Private Limited',
      location: 'India',
      duration: 'Ongoing',
      challenge: 'Continuous 3D engineering support across varied project scopes demanded adaptable delivery planning.',
      solution: [
        'Delivered model-centric engineering support for active projects.',
        'Aligned outputs with client quality and revision control standards.',
        'Maintained flexible resource coordination for changing priorities.'
      ],
      impact: [
        'Reliable delivery for ongoing client project needs.',
        'Reduced friction in model and document exchange cycles.',
        'Improved continuity in engineering execution support.'
      ]
    }
  }
];

export const TESTIMONIALS: Testimonial[] = []; 

export const TEAM: TeamMember[] = [
  {
    id: 'founder-nishikant',
    name: 'Nishikant V. Choudhary',
    shortName: 'Nishikant',
    role: 'Managing Director - EU Operations',
    title: 'Project Controls & Governance Lead',
    credentials: 'CCE, MBA, PMP, BE Civil',
    bio: 'Accomplished project controls and program management leader with 32+ years of expertise in planning, risk, cost, and change management for major energy, chemicals, and infrastructure projects across Europe, the Middle East, and Asia.',
    expertise: ['Project Controls Leadership', 'Program Management', 'Risk & Cost Governance', 'Contract Management'],
    image: '/founderprofile/founder_image.webp',
  },
  {
    id: 'founder-kiran',
    name: 'Kiran V. Kulkarni',
    shortName: 'Kiran',
    role: 'Technical Director - Engineering Execution',
    title: 'Engineering & Operations Lead',
    credentials: 'BE Mechanical, Technical Expertise',
    bio: 'Strategic engineering leader with deep expertise in multi-discipline execution, process engineering, and project delivery. Leads PCE PL Mumbai operations and coordinates execution excellence across EPC programs.',
    expertise: ['Multi-Discipline Engineering', 'Project Execution', 'Process Design', 'Engineering Coordination'],
    image: '/founderprofile/founder_image2.webp',
  }
];

export const STATS: StatMetric[] = [
  { label: 'Industry Experience', value: '34+ Years', change: 'Established', isPositive: true },
  { label: 'Project Controls Leadership', value: '32+ Years', change: 'Global Delivery', isPositive: true },
  { label: 'Operational Footprint', value: 'EU + India', change: 'Execution Model', isPositive: true },
];