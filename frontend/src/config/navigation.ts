import { COMPANY } from './company';

export const PRIMARY_NAVIGATION = [
  { navKey: 'home', label: 'Home', href: COMPANY.routes.home, hasDropdown: false },
  { navKey: 'services', label: 'Services', href: COMPANY.routes.services, hasDropdown: true, dropdownKey: 'services' },
  { navKey: 'projects', label: 'Projects', href: COMPANY.routes.projects, hasDropdown: true, dropdownKey: 'projects' },
  { navKey: 'about', label: 'About', href: COMPANY.routes.about, hasDropdown: true, dropdownKey: 'about' },
  { navKey: 'contact', label: 'Contact', href: COMPANY.routes.contact, hasDropdown: true, dropdownKey: 'contact' },
] as const;

export const SERVICE_PILLAR_LINKS = [
  {
    id: 'project-controls',
    href: `${COMPANY.routes.services}#project-controls`,
    title: 'Project Controls',
    description: 'Cost, planning, risk, and change governance.',
  },
  {
    id: 'detail-engineering',
    href: `${COMPANY.routes.services}#detail-engineering`,
    title: 'Detail Engineering',
    description: 'Multi-discipline design and deliverables.',
  },
  {
    id: 'procurement-construction',
    href: `${COMPANY.routes.services}#procurement-construction`,
    title: 'Execution Support',
    description: 'Vendor, site, and construction-stage support.',
  },
] as const;
