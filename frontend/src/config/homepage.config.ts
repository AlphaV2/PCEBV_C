/**
 * HOMEPAGE CONFIGURATION
 * Centralized content, colors, typography, and settings
 * Easy to edit without touching component code
 */

export const HOMEPAGE_CONFIG = {
  // ==================== COLOR SYSTEM (60:30:10 Rule) ====================
  colors: {
    primary_white: '#FFFFFF',
    background_light: '#F8FAFC',
    background_lighter: '#F1F5F9',
    primary_blue: '#0071E3',
    primary_blue_dark: '#0056A3',
    accent_orange: '#FF6A2A',
    text_dark: '#1F2937',
    text_gray: '#6B7280',
    text_light: '#9CA3AF',
    border_light: '#E5E7EB',
  },

  // ==================== TYPOGRAPHY SETTINGS ====================
  typography: {
    h1_size: 'clamp(1.8rem, 4vw, 3rem)',
    h1_weight: 900,
    h1_leading: 1.05,

    h2_size: 'clamp(1.3rem, 2.5vw, 2rem)',
    h2_weight: 700,
    h2_leading: 1.2,

    h3_size: 'clamp(1rem, 1.8vw, 1.3rem)',
    h3_weight: 600,
    h3_leading: 1.3,

    body_size: 'clamp(0.9rem, 1.4vw, 1.05rem)',
    body_weight: 400,
    body_leading: 1.6,

    label_size: '0.75rem',
    label_weight: 600,
    label_tracking: '0.18em',

    small_size: '0.875rem',
    small_weight: 500,
  },

  // ==================== SPACING GRID ====================
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
  },

  // ==================== SECTION PADDING ====================
  sections: {
    py_mobile: '2rem',
    py_tablet: '3rem',
    py_desktop: '4rem',
    px_mobile: '1rem',
    px_tablet: '1.5rem',
    px_desktop: '2rem',
  },

  // ==================== 1. HERO SECTION ====================
  hero: {
    label: 'Engineering & Project Execution',
    h1: 'Engineering & Project Execution for Complex EPC Projects',
    h2: 'Netherlands-led precision. India-based execution. Delivering quality and reliability at scale.',
    cta_primary: 'Consult Us',
    cta_secondary: 'Explore Services',
    background_images: [
      {
        src: '/background/bg3.webp',
        alt: 'Industrial refinery plant EPC project',
      },
      {
        src: '/background/bg2.webp',
        alt: 'Engineering team collaboration at worksite',
      },
      {
        src: '/background/bg1.webp',
        alt: 'Industrial plant detail and process equipment',
      },
    ],
    min_height_mobile: '85dvh',
    min_height_desktop: '100dvh',
  },

  // ==================== 2. TICKER STRIP ====================
  ticker: {
    background_color: '#FF6A2A',
    text_color: '#1F2937',
    items: [
      'Project Controls',
      'Engineering Deliverables',
      'DAI & Execution Support',
      'Global EPC Expertise',
      'Process & Piping',
      'Construction & Commissioning',
    ],
    animation_duration: '32s',
  },

  // ==================== 3. ABOUT + METRICS ====================
  about: {
    title: 'Trusted Partner in Engineering Excellence',
    description:
      'With decades of experience delivering complex EPC projects globally, PCEBV combines Netherlands-led client management with India-based engineering excellence to create reliable, scalable solutions for the oil, gas, and chemical industries.',
    metrics: [
      { number: '35+', label: 'Years Experience' },
      { number: '100+', label: 'Projects Delivered' },
      { number: '300+', label: 'Engineers' },
      { number: 'Global', label: 'Presence' },
    ],
  },

  // ==================== 4. SERVICES (3 PILLARS) ====================
  services: {
    title: 'Core Service Offerings',
    subtitle: 'Comprehensive EPC and engineering support across the full project lifecycle',
    items: [
      {
        title: 'Project Controls',
        bullets: [
          'Schedule and cost planning',
          'Risk management and mitigation',
          'Progress tracking and reporting',
          'Change management and controls',
        ],
        link: '/services#pollination-drones',
      },
      {
        title: 'Engineering Deliverables',
        bullets: [
          'Process and piping design',
          'Mechanical and electrical engineering',
          '3D plant modeling and visualization',
          'Construction documentation packages',
        ],
        link: '/services#iot-security',
      },
      {
        title: 'DAI & Execution Support',
        bullets: [
          'Design-Aid-Interface coordination',
          'Vendor management and liaison',
          'Construction support and commissioning',
          'Field-linked execution assistance',
        ],
        link: '/services#iso-27001',
      },
    ],
  },

  // ==================== 5. EXECUTION MODEL ====================
  model: {
    title: 'How We Deliver',
    description: 'A clear organizational split ensures fast, reliable project execution',
    flow: [
      {
        label: 'CLIENT',
        title: 'Your Objectives',
        icon: 'Target',
      },
      {
        label: 'PCEBV (EU Ops)',
        title: 'Commercial & Governance',
        icon: 'Globe',
      },
      {
        label: 'PCEPL (Mumbai)',
        title: 'Engineering & Execution',
        icon: 'Building2',
      },
    ],
  },

  // ==================== 6. PROJECTS CAROUSEL ====================
  projects: {
    title: 'Featured Projects',
    subtitle: 'Representative case studies showcasing our EPC delivery capability',
    items: [
      {
        image: '/background/bg1.jpg',
        name: 'Integrated Processing Plant',
        location: 'Middle East',
      },
      {
        image: '/background/bg2.jpg',
        name: 'Petrochemical Facility',
        location: 'Southeast Asia',
      },
      {
        image: '/background/bg3.jpg',
        name: 'Offshore Platform Upgrade',
        location: 'North Sea',
      },
    ],
  },

  // ==================== 7. CONTACT SECTION ====================
  contact: {
    title: 'Have a Project in Mind?',
    description: "Let's explore how PCEBV can support your next EPC initiative.",
    trust_points: [
      '24-hour response commitment',
      'Confidential project discussions',
      'Expert technical support',
    ],
    form_fields: [
      { label: 'Full Name', name: 'name', type: 'text', required: true },
      { label: 'Email', name: 'email', type: 'email', required: true },
      { label: 'Phone', name: 'phone', type: 'tel', required: true },
      { label: 'Company', name: 'company', type: 'text', required: true },
      {
        label: 'Service Interest',
        name: 'service',
        type: 'select',
        options: ['Project Controls', 'Engineering', 'DAI & Execution', 'Full EPC Support'],
        required: true,
      },
      { label: 'Message', name: 'message', type: 'textarea', required: false },
    ],
    submit_button: 'Schedule Consultation',
  },

  // ==================== 8. FOOTER ====================
  footer: {
    company_line: 'Engineering excellence. Global delivery. Trusted partnership.',
    quick_links: [
      { label: 'Home', href: '#' },
      { label: 'Services', href: '#services' },
      { label: 'Projects', href: '#projects' },
      { label: 'About', href: '#about' },
    ],
    legal_links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
    contact_info: {
      email: 'info@pcebv.com',
      phone: '+31 (0) 6 11 59 68 12',
      address: 'Netherlands',
    },
  },
};

export default HOMEPAGE_CONFIG;
