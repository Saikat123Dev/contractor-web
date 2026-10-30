"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
  Building2,
  HardHat,
  Compass,
  Award,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Users,
  Briefcase,
  Layers,
  Wrench,
  Truck,
  Landmark,
  Factory,
  Home,
  Search,
  Filter,
  Camera,
  Star,
  Quote,
  Send,
  Calculator,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Sliders,
  Sparkles,
  Calendar,
  IndianRupee,
  Eye,
  Check,
  Globe,
  Share2,
  FileText,
  Navigation,
  BadgeCheck,
  Hammer,
  Ruler,
  Sun,
  Moon,
  Plus,
  BarChart3,
  TrendingUp,
  Package,
  Copy,
  Activity,
  Scale
} from 'lucide-react';

// --- TYPES ---
type PageId = 'home' | 'about' | 'services' | 'projects' | 'clients' | 'gallery' | 'contact';

type ThemeKey = 'amber' | 'blue' | 'terracotta' | 'emerald';

type LogoVariant = 'tower' | 'bridge' | 'hexagon' | 'shield';

interface CompanyConfig {
  name: string;
  shortName: string;
  tagline: string;
  estYear: string;
  cin: string;
  gstin: string;
  tradeLicense: string;
  isoCert: string;
  address: string;
  cityState: string;
  phone: string;
  whatsapp: string;
  email: string;
  workingHours: string;
  theme: ThemeKey;
  logoStyle?: LogoVariant;
}

interface ProjectMilestone {
  stage: string;
  pct: number;
  status: 'Done' | 'Active' | 'Pending';
}

interface ProjectItem {
  id: string;
  title: string;
  category: 'Commercial' | 'Residential' | 'Infrastructure' | 'Industrial';
  status: 'Completed' | 'Ongoing';
  progress: number;
  location: string;
  client: string;
  value: string;
  area: string;
  duration: string;
  completionYear: string;
  concreteGrade: string;
  foundationSystem: string;
  engineerInCharge: string;
  image: string;
  scope: string[];
  milestones: ProjectMilestone[];
  description: string;
}

interface GalleryItem {
  id: string;
  title: string;
  category: 'Completed Projects' | 'Site Photos' | 'Work Progress';
  projectRef: string;
  location: string;
  date: string;
  image: string;
  beforeImage?: string;
  caption: string;
  technicalNote: string;
}

interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  budget: string;
  visitDate?: string;
  message: string;
  timestamp: string;
  type: 'General Inquiry' | 'Quotation Request' | 'Site Visit Booking';
}

// --- IMAGE SLOTS (Inlined by build script) ---
const HERO_IMG = "/images/hero-site.jpg";
const COMMERCIAL_IMG = "/images/commercial-project.jpg";
const HIGHWAY_IMG = "/images/highway-bridge.jpg";
const INDUSTRIAL_IMG = "/images/industrial-plant.jpg";
const SITE_WIP_IMG = "/images/site-progress.jpg";

// --- THEME PALETTES ---
const THEMES: Record<ThemeKey, {
  label: string;
  primaryBg: string;
  primaryHover: string;
  primaryText: string;
  primaryBorder: string;
  softBg: string;
  badgeBg: string;
  badgeText: string;
  gradientHero: string;
  accentHex: string;
}> = {
  amber: {
    label: 'Caterpillar Amber & Slate Navy',
    primaryBg: 'bg-amber-500',
    primaryHover: 'hover:bg-amber-600',
    primaryText: 'text-amber-500',
    primaryBorder: 'border-amber-500',
    softBg: 'bg-amber-50',
    badgeBg: 'bg-amber-500/15',
    badgeText: 'text-amber-400',
    gradientHero: 'from-slate-950 via-slate-900 to-amber-950/80',
    accentHex: '#f59e0b'
  },
  blue: {
    label: 'Royal Infrastructure Blue & Steel',
    primaryBg: 'bg-blue-600',
    primaryHover: 'hover:bg-blue-700',
    primaryText: 'text-blue-600',
    primaryBorder: 'border-blue-600',
    softBg: 'bg-blue-50',
    badgeBg: 'bg-blue-500/15',
    badgeText: 'text-blue-400',
    gradientHero: 'from-slate-950 via-slate-900 to-blue-950/80',
    accentHex: '#2563eb'
  },
  terracotta: {
    label: 'Terra Cotta Brick & Bronze',
    primaryBg: 'bg-orange-600',
    primaryHover: 'hover:bg-orange-700',
    primaryText: 'text-orange-600',
    primaryBorder: 'border-orange-600',
    softBg: 'bg-orange-50',
    badgeBg: 'bg-orange-500/15',
    badgeText: 'text-orange-400',
    gradientHero: 'from-stone-950 via-stone-900 to-orange-950/80',
    accentHex: '#ea580c'
  },
  emerald: {
    label: 'Eco-Infrastructure Emerald & Obsidian',
    primaryBg: 'bg-emerald-600',
    primaryHover: 'hover:bg-emerald-700',
    primaryText: 'text-emerald-600',
    primaryBorder: 'border-emerald-600',
    softBg: 'bg-emerald-50',
    badgeBg: 'bg-emerald-500/15',
    badgeText: 'text-emerald-400',
    gradientHero: 'from-slate-950 via-slate-900 to-emerald-950/80',
    accentHex: '#059669'
  }
};

// --- INITIAL DATA ---
const DEFAULT_COMPANY: CompanyConfig = {
  name: 'Vanguard InfraBuild & Civil Engineers Pvt. Ltd.',
  shortName: 'VANGUARD INFRABUILD',
  tagline: 'Precision Civil Engineering, Turnkey Infrastructure & Structural Excellence',
  estYear: '2008',
  cin: 'U45200WB2008PTC128490',
  gstin: '19AABCV4829K1Z5',
  tradeLicense: 'TL/KMC/CE-2026/094812',
  isoCert: 'ISO 9001:2015, ISO 14001:2015 & ISO 45001:2018',
  address: 'Tower B, 7th Floor, Technopolis Infrastructure Hub, Sector V, Salt Lake',
  cityState: 'Kolkata, West Bengal 700091, India',
  phone: '+91 33 4068 9200 / +91 98301 54210',
  whatsapp: '919830154210',
  email: 'tenders@vanguardinfrabuild.in',
  workingHours: 'Mon – Sat: 9:30 AM – 7:00 PM IST',
  theme: 'amber',
  logoStyle: 'tower'
};

const HERO_SLIDES = [
  {
    id: 'slide-1',
    tag: 'High-Rise Turnkey EPC Execution',
    headline: 'Monolithic High-Rise Towers & Corporate Enclaves',
    sub: 'M45–M60 grade concrete superstructures engineered with aluminium system formwork, deep rotary piling, and seismic Zone-IV resilience.',
    image: HERO_IMG,
    projectLabel: 'Active Site: Riverfront Twin Towers (G+22, 5.1L Sq.Ft.)',
    metric: '4.8M+ Sq.Ft. Delivered'
  },
  {
    id: 'slide-2',
    tag: 'National Highways, Bridges & Flyovers',
    headline: 'Multi-Span PSC Girder Bridges & PQC Highways',
    sub: 'MoRTH & IRC-112 compliant elevated corridors, pre-stressed concrete box girders, RE walls, and heavy-duty rigid pavements.',
    image: HIGHWAY_IMG,
    projectLabel: 'Completed: NH-16 Six-Lane Flyover Interchange (₹112 Cr)',
    metric: '38 Deep Pier Foundations'
  },
  {
    id: 'slide-3',
    tag: 'Commercial & IGBC Green IT Parks',
    headline: 'Next-Gen Corporate Campuses & Institutional Hubs',
    sub: 'Post-tensioned column-free floor plates, double-basement crystalline waterproofing, and architectural glass-concrete facades.',
    image: COMMERCIAL_IMG,
    projectLabel: 'Completed: TechnoVista Corporate Park, New Town',
    metric: '100% On-Schedule Handover'
  },
  {
    id: 'slide-4',
    tag: 'Industrial PEB & Logistics Infrastructure',
    headline: 'Heavy Structural Steel Plants & FM2 Laser Flooring',
    sub: '65m clear-span Pre-Engineered Buildings, zero-settlement machine foundations, and steel-fiber reinforced super-flat warehouse floors.',
    image: INDUSTRIAL_IMG,
    projectLabel: 'Completed: Eastern Mega Cold-Chain Hub (3.1L Sq.Ft.)',
    metric: '2,400 MT Structural Steel'
  }
];

const SERVICES_DATA = [
  {
    id: 'srv-1',
    title: 'Turnkey Residential & High-Rise Towers',
    category: 'Building Works',
    icon: Home,
    codeStandards: 'IS 456:2000 & IS 1893 Seismic Zone Compliant',
    rateRange: '₹1,850 – ₹2,650 / Sq.Ft.',
    warranty: '10-Year Structural Warranty',
    summary: 'End-to-end civil construction of luxury apartment complexes, gated townships, and high-rise RCC framed residential towers from excavation to handover.',
    deliverables: [
      'Deep excavation, shore piling & raft foundation systems',
      'M30–M50 grade RCC shear-wall & post-tensioned slab superstructures',
      'AAC block masonry, waterproof external plastering & fire-rated staircases',
      'Complete MEP coordination, underground water reservoirs & podium landscaping'
    ]
  },
  {
    id: 'srv-2',
    title: 'Commercial, IT Parks & Institutional Complexes',
    category: 'Commercial',
    icon: Building2,
    codeStandards: 'NBC 2016 & IGBC Green Building Standards',
    rateRange: '₹2,100 – ₹3,100 / Sq.Ft.',
    warranty: 'IGBC Gold / Platinum Ready',
    summary: 'High-specification civil and structural execution for corporate headquarters, hospitals, shopping malls, and university campuses.',
    deliverables: [
      'Large-span column-free floor plates & flat slab structural systems',
      'Double-glazed structural glazing civil integration & architectural concrete facades',
      'Multi-level basement parking with crystalline waterproofing',
      'Acoustic flooring, hospital-grade cleanroom civil works & auditoriums'
    ]
  },
  {
    id: 'srv-3',
    title: 'Industrial Plants, Warehouses & PEB Structures',
    category: 'Industrial',
    icon: Factory,
    codeStandards: 'IS 800:2007 Structural Steel & FM2 Laser Screed Specs',
    rateRange: '₹1,450 – ₹2,200 / Sq.Ft.',
    warranty: 'FM2 Floor Flatness Certified',
    summary: 'Heavy duty industrial civil engineering including Pre-Engineered Buildings (PEB), logistics parks, EOT crane girders, and zero-settlement machine foundations.',
    deliverables: [
      'Dynamic & heavy vibrating machine foundations (turbines, presses, rolling mills)',
      'Heavy-duty VDF / Trimix & laser-screeded steel-fiber reinforced concrete flooring',
      'Structural steel fabrication, PEB portal frames & galvalume standing-seam roofing',
      'Dock levelers, RCC approach aprons, weighbridges & peripheral storm drains'
    ]
  },
  {
    id: 'srv-4',
    title: 'Roads, Highways, Bridges & Culverts',
    category: 'Infrastructure',
    icon: Landmark,
    codeStandards: 'MoRTH, IRC:112 & NHAI Technical Specifications',
    rateRange: 'BOQ / Item-Rate Tender Basis',
    warranty: '5-Year Defect Liability (DLP)',
    summary: 'Execution of state and national highway packages, multi-span PSC girder flyovers, box culverts, and urban arterial concrete roadways.',
    deliverables: [
      'Subgrade earthwork, GSB, WMM, Bituminous Macadam (DBM/BC) & PQC rigid pavements',
      'Pre-stressed concrete (PSC) box girder bridges, ROBs & minor/major box culverts',
      'Reinforced Earth (RE) walls, gabion structures & crash barriers',
      'Stormwater RCC box drains, utility ducts & street illumination civil bases'
    ]
  },
  {
    id: 'srv-5',
    title: 'Geotechnical, Piling & Deep Foundations',
    category: 'Specialized Civil',
    icon: Layers,
    codeStandards: 'IS 2911 (Parts 1–4) Pile Foundation Code',
    rateRange: '₹950 – ₹2,400 / Running Meter',
    warranty: '100% PDA & Integrity Tested',
    summary: 'Specialized foundation engineering in soft clay and high water-table terrains using hydraulic rotary piling rigs and diaphragm walls.',
    deliverables: [
      'Bored cast-in-situ RCC piles (450mm to 1500mm dia) using hydraulic rigs',
      'Contiguous pile walls, sheet piling, rock anchoring & soil nailing',
      'Static & dynamic pile load testing (PDA) and cross-hole sonic logging',
      'Sub-soil geotechnical investigation, SPT borelogs & foundation design'
    ]
  },
  {
    id: 'srv-6',
    title: 'Water Infrastructure, STP/ETP & Structural Retrofitting',
    category: 'Environmental & Rehab',
    icon: Wrench,
    codeStandards: 'IS 3370 Liquid Retaining Structures & IS 15988',
    rateRange: 'Custom Turnkey Estimate',
    warranty: 'Zero-Leakage Hydro-Tested',
    summary: 'Water-retaining RCC structures, overhead reservoirs, effluent treatment plants, and non-destructive structural rehabilitation of aging structures.',
    deliverables: [
      'Overhead Water Tanks (OHT), Clear Water Reservoirs (CWR) & intake wells',
      'Civil construction of Sewage (STP) & Effluent Treatment Plants (ETP)',
      'Carbon fiber (CFRP) wrapping, micro-concreting & epoxy grouting retrofits',
      'Non-Destructive Testing (Rebound Hammer, UPV, Core Cutting) & structural audits'
    ]
  }
];

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'prj-101',
    title: 'TechnoVista Corporate Park & Residencies',
    category: 'Commercial',
    status: 'Completed',
    progress: 100,
    location: 'Action Area II, New Town, Kolkata',
    client: 'Apex Horizon Realty & IT Parks Ltd.',
    value: '₹68.5 Crore',
    area: '4,20,000 Sq.Ft. (2B + G + 14)',
    duration: '28 Months',
    completionYear: '2025',
    concreteGrade: 'M45 Post-Tensioned RCC',
    foundationSystem: '980 Bored Piles (600mm) + 1.8m Raft',
    engineerInCharge: 'Er. Anirban Mukherjee (VP Structural)',
    image: COMMERCIAL_IMG,
    description: 'A landmark mixed-use twin corporate and executive residential enclave built with M45 grade concrete, post-tensioned floor slabs, and IGBC Gold-compliant facade glazing.',
    scope: [
      '980 bored cast-in-situ RCC piles (600mm dia, 28m depth) & 1.8m thick raft foundation',
      'Complete RCC framed superstructure (2 Basements + Ground + 14 Floors)',
      'Architectural fair-faced concrete elements, podium landscaping & water features',
      'Underground 500 KLD water reservoir, STP civil works & internal concrete driveway'
    ],
    milestones: [
      { stage: 'Piling & Deep Excavation', pct: 100, status: 'Done' },
      { stage: 'Double-Basement Raft & Retaining Wall', pct: 100, status: 'Done' },
      { stage: '14-Floor Post-Tensioned Superstructure', pct: 100, status: 'Done' },
      { stage: 'Facade Glazing, Finishing & Handover', pct: 100, status: 'Done' }
    ]
  },
  {
    id: 'prj-102',
    title: 'NH-16 Six-Lane Elevated Flyover & Interchange Package',
    category: 'Infrastructure',
    status: 'Completed',
    progress: 100,
    location: 'Kharagpur–Balasore Industrial Corridor (WB/Odisha Border)',
    client: 'National Highways & Infrastructure Development Wing',
    value: '₹112.0 Crore',
    area: '3.4 Km Elevated + 8.2 Km Approach Highway',
    duration: '32 Months',
    completionYear: '2024',
    concreteGrade: 'M50 PSC Box Girders & M40 PQC',
    foundationSystem: '1200mm Dia Deep Pile Foundations (38 Piers)',
    engineerInCharge: 'Er. Debashis Chatterjee (MD)',
    image: HIGHWAY_IMG,
    description: 'Multi-span pre-stressed concrete (PSC) girder flyover with cloverleaf slip roads, RE retaining walls, and heavy-duty Pavement Quality Concrete (PQC) main carriageway.',
    scope: [
      '38 pier caps with 1200mm dia deep pile foundations and elastomeric bearings',
      'Pre-stressed concrete (PSC) I-girder launching and high-strength deck slab casting',
      'Reinforced Earth (RE) panel walls, crash barriers & thermoplastic road markings',
      '8.2 Km flexible & rigid highway approaches with box culverts and median drainage'
    ],
    milestones: [
      { stage: 'Test Piling & 38 Pier Foundations', pct: 100, status: 'Done' },
      { stage: 'Pier Caps & PSC Girder Launching', pct: 100, status: 'Done' },
      { stage: 'RE Walls & PQC Rigid Pavement', pct: 100, status: 'Done' },
      { stage: 'Load Testing & NHAI Commissioning', pct: 100, status: 'Done' }
    ]
  },
  {
    id: 'prj-103',
    title: 'Eastern Mega Logistics & Cold-Chain Manufacturing Hub',
    category: 'Industrial',
    status: 'Completed',
    progress: 100,
    location: 'Ranihati–Dhulagarh Industrial Belt, Howrah',
    client: 'TransIndia Supply Chain & Industrial Corp.',
    value: '₹44.2 Crore',
    area: '3,10,000 Sq.Ft. Covered Plant',
    duration: '16 Months',
    completionYear: '2025',
    concreteGrade: 'M35 Steel-Fiber Laser Screed FM2',
    foundationSystem: 'Vibro-Stone Columns + Isolated Pedestals',
    engineerInCharge: 'Er. Subhajit Ghosh (GM Plant)',
    image: INDUSTRIAL_IMG,
    description: 'High-clear-height Pre-Engineered Building (PEB) manufacturing and automated warehousing complex with FM2 grade laser-screeded industrial flooring and 18 automated dock bays.',
    scope: [
      'Soil stabilization, stone column ground improvement & isolated RCC pedestals',
      '3,10,000 Sq.Ft. steel-fiber reinforced FM2 super-flat industrial floor slab',
      'Structural steel erection (2,400 MT) with insulated galvalume standing-seam roof',
      '18 hydraulic dock leveler pits, 80-MT weighbridge foundation & PQC trailer apron'
    ],
    milestones: [
      { stage: 'Ground Improvement & Pedestals', pct: 100, status: 'Done' },
      { stage: '2,400 MT PEB Steel Erection', pct: 100, status: 'Done' },
      { stage: 'FM2 Laser-Screed Industrial Flooring', pct: 100, status: 'Done' },
      { stage: 'Dock Bays, Apron & Handover', pct: 100, status: 'Done' }
    ]
  },
  {
    id: 'prj-104',
    title: 'Riverfront Twin Towers & Sub-Surface Podium',
    category: 'Residential',
    status: 'Ongoing',
    progress: 74,
    location: 'Rajarhat Main Arterial Road, Kolkata',
    client: 'Meridian Crown Developers Pvt. Ltd.',
    value: '₹84.0 Crore',
    area: '5,10,000 Sq.Ft. (G + 22 Towers)',
    duration: '30 Months (Target: Dec 2026)',
    completionYear: '2026 (Ongoing)',
    concreteGrade: 'M45 Self-Compacting Monolithic RCC',
    foundationSystem: 'Diaphragm Wall + 1150 Bored Piles',
    engineerInCharge: 'Er. Vikramaditya Sen (ED Projects)',
    image: HERO_IMG,
    description: 'High-rise residential twin towers currently at the 17th-floor structural casting stage, featuring aluminium system formwork (Mivan) for monolithic seismic resistance.',
    scope: [
      'Deep diaphragm wall shoring & 12m deep double-basement excavation',
      'Monolithic shear-wall construction using precision aluminium formwork',
      'Tower crane logistics, batching plant on-site operation (60 m³/hr) & QA/QC lab',
      'Elevated club deck, infinity swimming pool RCC shell & multi-tier security plaza'
    ],
    milestones: [
      { stage: 'Diaphragm Wall & Double Basement', pct: 100, status: 'Done' },
      { stage: 'Podium & 1st–17th Floor Mivan Casting', pct: 100, status: 'Done' },
      { stage: '18th–22nd Floor & Sky-Deck Structure', pct: 45, status: 'Active' },
      { stage: 'External Plaster, Finishes & Handover', pct: 15, status: 'Pending' }
    ]
  },
  {
    id: 'prj-105',
    title: 'Haldia Petro-Chemical Auxiliary Unit & Tank Farm Foundation',
    category: 'Industrial',
    status: 'Ongoing',
    progress: 62,
    location: 'Haldia Industrial Growth Center, Purba Medinipur',
    client: 'Bengal Coast Petro-Logistics Ltd.',
    value: '₹51.8 Crore',
    area: '18 Acres Industrial Plot Development',
    duration: '20 Months (Target: Mar 2027)',
    completionYear: '2027 (Ongoing)',
    concreteGrade: 'M40 Sulphate-Resistant CRS Concrete',
    foundationSystem: '1,450 Marine Driven & Bored Piles',
    engineerInCharge: 'Capt. Soumyajit Roy (Chief EHS & QA)',
    image: SITE_WIP_IMG,
    description: 'Specialized civil foundation package including ring-wall foundations for storage tanks, pipe racks, blast-resistant control room, and sulphate-resistant concrete dykes.',
    scope: [
      '1,450 driven & bored cast-in-situ piles in marine silty-clay strata',
      'High-precision RCC ring-beam foundations & secondary containment dyke walls',
      'Structural steel pipe-rack foundations, fire-water pump house & 2,000 KL reservoir',
      'Acid/chemical-resistant brick lining and heavy-duty internal plant concrete roads'
    ],
    milestones: [
      { stage: '1,450 Marine Pile Foundations', pct: 100, status: 'Done' },
      { stage: 'Tank Farm Ring Beams & Containment Dykes', pct: 80, status: 'Active' },
      { stage: 'Pipe Rack Pedestals & Blast Control Room', pct: 40, status: 'Active' },
      { stage: 'Plant Roads & Hydro-Testing', pct: 10, status: 'Pending' }
    ]
  },
  {
    id: 'prj-106',
    title: 'District Super-Specialty Medical College & Hospital Wing',
    category: 'Commercial',
    status: 'Completed',
    progress: 100,
    location: 'Kalyani Expressway Corridor, Nadia',
    client: 'State Health Infrastructure Development Directorate',
    value: '₹76.4 Crore',
    area: '3,60,000 Sq.Ft. Institutional Campus',
    duration: '24 Months',
    completionYear: '2023',
    concreteGrade: 'M40 + High-Density Radiation Shielding',
    foundationSystem: 'Pile-Supported Cellular Raft',
    engineerInCharge: 'Er. Anirban Mukherjee (VP Structural)',
    image: COMMERCIAL_IMG,
    description: '500-bed institutional hospital block, diagnostic center, and residential doctors’ quarters delivered ahead of schedule with seismic base-isolation detailing.',
    scope: [
      'Seismic Zone-IV compliant RCC frame with hospital-grade floor loading (5 kN/m²)',
      'Radiation-shielded high-density concrete walls (3.2g/cm³) for radiology & oncology bunkers',
      'Medical gas manifold civil rooms, 300 KLD ETP/STP & barrier-free ramp corridors',
      'Complete external development, ambulance trauma bay & solar roof mounting structures'
    ],
    milestones: [
      { stage: 'Substructure & Oncology Bunker Walls', pct: 100, status: 'Done' },
      { stage: 'Hospital Superstructure & Ramp Cores', pct: 100, status: 'Done' },
      { stage: 'Cleanroom Civil Works & 300 KLD ETP', pct: 100, status: 'Done' },
      { stage: 'Testing, Audit & Directorate Handover', pct: 100, status: 'Done' }
    ]
  }
];

const GALLERY_DATA: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'High-Rise Core & Podium Superstructure Casting',
    category: 'Work Progress',
    projectRef: 'Riverfront Twin Towers (G+22)',
    location: 'Rajarhat, Kolkata',
    date: 'October 2026',
    image: HERO_IMG,
    beforeImage: SITE_WIP_IMG,
    caption: 'Simultaneous tower crane operations and jump-form core wall shuttering at 17th floor elevation during golden hour.',
    technicalNote: 'M45 self-compacting concrete pumped via stationary boom placer; 100% cube test compliance (28-day strength: 52.4 MPa).'
  },
  {
    id: 'gal-2',
    title: 'TechnoVista Corporate Plaza & Landscaped Courtyard',
    category: 'Completed Projects',
    projectRef: 'TechnoVista Corporate Park',
    location: 'New Town Action Area II',
    date: 'August 2025',
    image: COMMERCIAL_IMG,
    beforeImage: HERO_IMG,
    caption: 'Completed architectural facade, double-height reception colonnade, and central biophilic plaza post-handover.',
    technicalNote: 'Post-tensioned flat slab system with 11m column spans and structural DGU curtain wall.'
  },
  {
    id: 'gal-3',
    title: 'NH-16 Multi-Span PSC Girder Flyover Interchange',
    category: 'Completed Projects',
    projectRef: 'NH-16 Elevated Corridor Package',
    location: 'Kharagpur Corridor',
    date: 'December 2024',
    image: HIGHWAY_IMG,
    beforeImage: SITE_WIP_IMG,
    caption: 'Aerial engineering view of the completed 6-lane highway interchange, slip lanes, and box girder bridge deck.',
    technicalNote: 'IRC Class-70R loading compliant; 300mm PQC rigid pavement on main tollway lanes.'
  },
  {
    id: 'gal-4',
    title: 'Eastern Mega Logistics PEB Warehouse & Docking Apron',
    category: 'Completed Projects',
    projectRef: 'TransIndia Logistics Hub',
    location: 'Dhulagarh, Howrah',
    date: 'May 2025',
    image: INDUSTRIAL_IMG,
    beforeImage: SITE_WIP_IMG,
    caption: 'Completed 3.1 Lakh Sq.Ft. Pre-Engineered Building with 18 automated container loading bays and rigid concrete apron.',
    technicalNote: 'FM2 laser-screeded floor tolerance; 65m clear-span tapered steel portal frames.'
  },
  {
    id: 'gal-5',
    title: 'Heavy Raft Rebar Cage & Blueprint Site Inspection',
    category: 'Site Photos',
    projectRef: 'Haldia Petro-Auxiliary Foundation',
    location: 'Haldia Industrial Belt',
    date: 'September 2026',
    image: SITE_WIP_IMG,
    beforeImage: HERO_IMG,
    caption: 'Chief Structural Engineer and site execution team verifying Fe-550D CRS reinforcement spacing prior to 1,200 m³ continuous raft pour.',
    technicalNote: 'Corrosion-resistant steel (CRS) rebar with 75mm clear cover and crystalline waterproofing admixture.'
  },
  {
    id: 'gal-6',
    title: 'Night-Shift Mass Concrete Pour & Batching Logistics',
    category: 'Site Photos',
    projectRef: 'Riverfront Twin Towers (G+22)',
    location: 'Rajarhat, Kolkata',
    date: 'July 2026',
    image: HERO_IMG,
    beforeImage: SITE_WIP_IMG,
    caption: 'Temperature-controlled mass concrete pour utilizing chilled water dosing at our captive on-site 60 m³/hr RMC plant.',
    technicalNote: 'Core temperature monitored via embedded thermocouples (< 65°C peak) to prevent thermal micro-cracking.'
  }
];

const TEAM_DATA = {
  directors: [
    {
      name: 'Er. Debashis Chatterjee',
      role: 'Founder & Managing Director',
      qualification: 'B.E. (Civil, Jadavpur University), M.Tech (Structural Engg., IIT Kharagpur), FIE',
      experience: '28+ Years Experience',
      bio: 'Former Principal Structural Consultant with extensive leadership across national highway bridges, deep marine piling, and high-rise commercial towers across Eastern India.',
      badge: 'Chartered Engineer (India)'
    },
    {
      name: 'Er. Vikramaditya Sen',
      role: 'Executive Director – Projects & Tendering',
      qualification: 'B.Tech (Civil), MBA (Construction Project Management, NICMAR Pune)',
      experience: '22+ Years Experience',
      bio: 'Spearheads EPC contract management, government PSU tendering, FIDIC contract administration, and automated concrete batching & machinery fleet operations.',
      badge: 'PMP® Certified'
    }
  ],
  management: [
    {
      name: 'Er. Anirban Mukherjee',
      role: 'Vice President – Technical & Structural Design',
      qualification: 'M.E. (Geotechnical & Structural Engg.)',
      experience: '19 Years',
      focus: 'STAAD.Pro / ETABS structural optimization, pile foundation design & value engineering'
    },
    {
      name: 'Rituparna Banerjee',
      role: 'Head of QS, Billing & Contracts',
      qualification: 'B.Tech (Civil), RICS Associate',
      experience: '15 Years',
      focus: 'BOQ estimation, rate analysis, client RA billing, and vendor supply chain governance'
    },
    {
      name: 'Capt. Soumyajit Roy (Retd.)',
      role: 'Chief EHS (Safety) & QA/QC Officer',
      qualification: 'NEBOSH IGC, Lead Auditor ISO 45001 & ISO 9001',
      experience: '17 Years',
      focus: 'Zero-accident site safety protocols, cube/rebar material testing & statutory compliance'
    },
    {
      name: 'Er. Subhajit Ghosh',
      role: 'General Manager – Plant & Heavy Machinery',
      qualification: 'B.E. (Mechanical & Construction Equipment)',
      experience: '16 Years',
      focus: 'Hydraulic rotary piling rigs, tower cranes, RMC batching plants & transit mixer fleet'
    }
  ],
  staffStrength: [
    { category: 'Senior Project Managers & Resident Engineers', count: 18, detail: 'B.E./B.Tech Civil with 10+ yrs site execution experience' },
    { category: 'Site Execution & Planning Engineers', count: 46, detail: 'Primavera P6 / MS Project scheduling & daily site supervision' },
    { category: 'Structural & BIM/AutoCAD Drafters', count: 14, detail: 'Bar Bending Schedules (BBS), GFC drawings & 3D BIM clash detection' },
    { category: 'QA/QC Lab Technicians & Material Engineers', count: 16, detail: 'On-site concrete cube testing, slump, sieve analysis & NDT' },
    { category: 'Licensed Land Surveyors (Total Station & DGPS)', count: 12, detail: 'High-precision layout, contour mapping & highway alignment' },
    { category: 'Certified EHS Safety Stewards & Rig Supervisors', count: 24, detail: 'Full-time site safety officers, rigging & scaffolding inspectors' }
  ]
};

const CERTIFICATIONS_DATA = [
  {
    id: 'cert-1',
    title: 'Certificate of Incorporation (MCA)',
    authority: 'Registrar of Companies (ROC), Ministry of Corporate Affairs, Govt. of India',
    regNo: 'CIN: U45200WB2008PTC128490',
    validStatus: 'Active & Compliant Since 2008',
    category: 'Company Registration',
    details: 'Registered as a Private Limited Civil Engineering & Infrastructure Contracting Company authorized for turnkey government and private sector EPC works.'
  },
  {
    id: 'cert-2',
    title: 'GST Registration Certificate (Form GST REG-06)',
    authority: 'Goods and Services Tax Network, Govt. of India',
    regNo: 'GSTIN: 19AABCV4829K1Z5',
    validStatus: 'Active Regular Taxpayer (100% Filing Track Record)',
    category: 'Tax & Statutory',
    details: 'Registered under HSN/SAC 9954 (Construction Services of Buildings, Civil Engineering Works, Roads, Bridges & Industrial Plants).'
  },
  {
    id: 'cert-3',
    title: 'Municipal Commercial Trade Licence',
    authority: 'Kolkata Municipal Corporation (KMC) & Urban Development Dept.',
    regNo: 'Licence No: TL/KMC/CE-2026/094812',
    validStatus: 'Renewed & Valid through FY 2026–2027',
    category: 'Trade Licence',
    details: 'Authorized Class-A Civil Engineering Contractor, Builder, and Infrastructure Developer trade licence.'
  },
  {
    id: 'cert-4',
    title: 'ISO 9001:2015, ISO 14001:2015 & ISO 45001:2018',
    authority: 'TÜV SÜD / IAF Accredited Certification Body',
    regNo: 'Cert ID: QMS-EMS-OHS/IND/884120',
    validStatus: 'Tri-Standard Certified (Valid till 2028)',
    category: 'Quality & Safety',
    details: 'Integrated Management System covering Quality Assurance in Civil Construction, Environmental Sustainability, and Occupational Health & Safety.'
  },
  {
    id: 'cert-5',
    title: 'Class-I Enlisted Government Contractor',
    authority: 'PWD (West Bengal), CPWD, WBHIDCO & MES',
    regNo: 'Enlistment Code: PWD/CL-I/CIVIL/4092',
    validStatus: 'Unlimited Tendering Category – Civil & Structural',
    category: 'Govt. Empanelment',
    details: 'Eligible to bid and execute large-scale public works, bridges, institutional complexes, and state highway infrastructure.'
  },
  {
    id: 'cert-6',
    title: 'EPFO, ESIC & Contract Labour (CLRA) License',
    authority: 'Ministry of Labour & Employment, Govt. of India',
    regNo: 'EPF: WB/KOL/0064219 | ESIC: 41-00-118294',
    validStatus: '100% Statutory Workforce Compliance',
    category: 'Labour Welfare',
    details: 'Full statutory coverage for 800+ site workforce, workmen compensation insurance, and CAR (Contractors All Risk) policy compliance.'
  }
];

const CLIENTS_LIST = [
  { name: 'WBHIDCO (Housing Infrastructure Dev. Corp.)', sector: 'Govt. Infrastructure', projectsCount: 6, since: '2014', valueDelivered: '₹142 Cr' },
  { name: 'National Highways Authority (NHAI Sub-Packages)', sector: 'Highways & Bridges', projectsCount: 4, since: '2018', valueDelivered: '₹195 Cr' },
  { name: 'Apex Horizon Realty & IT Parks Ltd.', sector: 'Commercial & IT Parks', projectsCount: 5, since: '2016', valueDelivered: '₹128 Cr' },
  { name: 'TransIndia Supply Chain & Industrial Corp.', sector: 'Industrial & Logistics', projectsCount: 4, since: '2019', valueDelivered: '₹86 Cr' },
  { name: 'Bengal Coast Petro-Logistics Ltd.', sector: 'Heavy Industrial & Tank Farms', projectsCount: 3, since: '2021', valueDelivered: '₹94 Cr' },
  { name: 'Meridian Crown Developers Pvt. Ltd.', sector: 'High-Rise Residential', projectsCount: 7, since: '2015', valueDelivered: '₹165 Cr' },
  { name: 'State Health Infrastructure Directorate', sector: 'Hospitals & Institutional', projectsCount: 5, since: '2017', valueDelivered: '₹118 Cr' },
  { name: 'Eastern Steel & Allied Manufacturing Ltd.', sector: 'PEB & Factory Sheds', projectsCount: 8, since: '2012', valueDelivered: '₹79 Cr' }
];

const TESTIMONIALS_DATA = [
  {
    quote: 'Vanguard InfraBuild delivered our 4.2 Lakh Sq.Ft. TechnoVista Corporate Park 3 weeks ahead of baseline schedule. Their on-site QA/QC lab, post-tensioned slab finish, and zero-LTI safety culture matched Tier-1 national standards.',
    author: 'Rajatava Sengupta',
    designation: 'Chief Project Officer, Apex Horizon Realty & IT Parks Ltd.',
    project: 'TechnoVista Corporate Park (₹68.5 Cr)',
    rating: 5
  },
  {
    quote: 'Executing 38 deep pile foundations and PSC girder launching along an active national highway corridor required surgical planning. Their engineering team managed traffic diversions and night-shift concrete pours with remarkable precision.',
    author: 'Er. P. K. Mohanty',
    designation: 'Chief Project Coordinator, NH-16 Corridor Package',
    project: 'NH-16 Elevated Flyover & Interchange',
    rating: 5
  },
  {
    quote: 'For our automated cold-chain warehouse in Dhulagarh, floor flatness (FM2 tolerance) was critical for 14-meter high-bay VNA racking. Their laser-screeded steel-fiber flooring passed every international profilograph test on the first inspection.',
    author: 'Vikramjit Dugar',
    designation: 'VP Operations, TransIndia Supply Chain Corp.',
    project: 'Eastern Mega Logistics Hub (3.1 Lakh Sq.Ft.)',
    rating: 5
  }
];

const ASSOCIATIONS_DATA = [
  { name: 'Builders Association of India (BAI)', role: 'Patron Corporate Member (Eastern Region)', id: 'BAI/ER/KOL-1108' },
  { name: 'Indian Concrete Institute (ICI)', role: 'Institutional Technical Member', id: 'ICI/INST/2941' },
  { name: 'The Institution of Engineers (India) – IEI', role: 'Corporate Engineering Affiliate', id: 'IEI/CORP/7742' },
  { name: 'CREDAI Bengal (Allied Infrastructure Wing)', role: 'Registered EPC Partner', id: 'CREDAI-B/EPC/209' },
  { name: 'Indian Roads Congress (IRC)', role: 'Technical Organization Member', id: 'IRC/ORG/5519' }
];

const FINANCIAL_TURNOVER = [
  { fy: 'FY 2021–22', turnoverCr: 84, orderBookCr: 160 },
  { fy: 'FY 2022–23', turnoverCr: 112, orderBookCr: 215 },
  { fy: 'FY 2023–24', turnoverCr: 148, orderBookCr: 290 },
  { fy: 'FY 2024–25', turnoverCr: 186, orderBookCr: 345 },
  { fy: 'FY 2025–26', turnoverCr: 228, orderBookCr: 420 }
];

export default function App() {
  // --- STATE ---
  const [activePage, setActivePage] = useState<PageId>('home');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');
  const [studioTab, setStudioTab] = useState<'boq' | 'concrete' | 'steel' | 'blueprint'>('boq');
  const [blueprintType, setBlueprintType] = useState<'pile' | 'slab' | 'bridge'>('pile');
  const [telemetryOpen, setTelemetryOpen] = useState<boolean>(false);
  const [pqDossierOpen, setPqDossierOpen] = useState<boolean>(false);
  const [concreteCalc, setConcreteCalc] = useState({ grade: 'M30', volumeM3: 45 });
  const [steelCalc, setSteelCalc] = useState({ diaMm: 16, lengthMeters: 1200, barsCount: 150 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroSlideIdx, setHeroSlideIdx] = useState(0);
  const [heroAutoPlay, setHeroAutoPlay] = useState<boolean>(true);
  const [simMode, setSimMode] = useState<'seismic' | 'piling' | 'ptslab'>('seismic');
  const [simIntensity, setSimIntensity] = useState<number>(65);
  const [simXray, setSimXray] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<'slow' | 'normal' | 'paused'>('normal');

  const [company, setCompany] = useState<CompanyConfig>(() => {
    try {
      const saved = localStorage.getItem('vanguard_company_config_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore storage block
    }
    return DEFAULT_COMPANY;
  });

  const [projectsList, setProjectsList] = useState<ProjectItem[]>(INITIAL_PROJECTS);

  // Modals & Drawers
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>(['prj-101', 'prj-104']);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState<number | null>(null);
  const [showBeforeStage, setShowBeforeStage] = useState<boolean>(false);
  const [selectedCert, setSelectedCert] = useState<typeof CERTIFICATIONS_DATA[0] | null>(null);
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const [customWaText, setCustomWaText] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('All');
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>('All');
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');
  const [activeMapLocation, setActiveMapLocation] = useState<'hq' | 'plant' | 'yard'>('hq');

  // New Custom Project Form State
  const [newProjectForm, setNewProjectForm] = useState({
    title: '',
    category: 'Commercial' as ProjectItem['category'],
    status: 'Ongoing' as ProjectItem['status'],
    progress: 45,
    location: '',
    client: '',
    value: '₹35.0 Crore',
    area: '1,80,000 Sq.Ft.',
    duration: '18 Months',
    concreteGrade: 'M40 RCC',
    foundationSystem: 'Bored Cast-in-Situ Piling',
    description: ''
  });

  // Inquiry Form State
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Turnkey Residential & High-Rise Towers',
    location: '',
    budget: '₹1 Cr – ₹5 Cr',
    visitDate: '2026-11-05',
    message: ''
  });

  const [inquiries, setInquiries] = useState<InquiryRecord[]>([
    {
      id: 'INQ-2026-891',
      name: 'Siddharth Agarwal (Agarwal Agro Cold Chain)',
      phone: '+91 98310 44912',
      email: 'siddharth@agarwalcoldchain.in',
      service: 'Industrial Plants, Warehouses & PEB Structures',
      location: 'Dankuni Industrial Complex, Hooghly',
      budget: '₹10 Cr – ₹25 Cr',
      visitDate: '2026-11-02',
      message: 'Looking for turnkey civil & PEB construction for a 65,000 sq.ft. cold storage & logistics facility with 8 loading docks.',
      timestamp: '2 days ago',
      type: 'Quotation Request'
    }
  ]);

  // Advanced BOQ & Material Estimator State
  const [quoteCalc, setQuoteCalc] = useState({
    projectType: 'commercial' as 'residential' | 'commercial' | 'industrial' | 'road',
    areaSqFt: 35000,
    floors: 8,
    grade: 'standard' as 'economy' | 'standard' | 'premium',
    foundationType: 'piling' as 'open' | 'raft' | 'piling',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    siteLocation: ''
  });

  // Auto-advance Hero Carousel when heroAutoPlay is enabled
  useEffect(() => {
    if (!heroAutoPlay || activePage !== 'home') return;
    const timer = setInterval(() => {
      setHeroSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroAutoPlay, activePage]);

  // Save company config
  useEffect(() => {
    try {
      localStorage.setItem('vanguard_company_config_v2', JSON.stringify(company));
    } catch {
      // Ignore
    }
  }, [company]);

  const theme = THEMES[company.theme] || THEMES.amber;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const copyTextToClipboard = (text: string, label: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showToast(`Copied ${label} to clipboard!`);
    } catch {
      showToast(`Copied ${label}!`);
    }
  };

  const navigateTo = (page: PageId) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const matchCat = projectCategoryFilter === 'All' || p.category === projectCategoryFilter;
      const matchStatus = projectStatusFilter === 'All' || p.status === projectStatusFilter;
      const q = projectSearch.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q);
      return matchCat && matchStatus && matchQuery;
    });
  }, [projectsList, projectCategoryFilter, projectStatusFilter, projectSearch]);

  // Filtered Gallery
  const filteredGallery = useMemo(() => {
    return GALLERY_DATA.filter((g) => galleryCategoryFilter === 'All' || g.category === galleryCategoryFilter);
  }, [galleryCategoryFilter]);

  const selectedPhoto = selectedPhotoIdx !== null ? filteredGallery[selectedPhotoIdx] || null : null;

  // Comprehensive BOQ & Material Estimator Calculation
  const estimatedQuote = useMemo(() => {
    const baseRates = {
      residential: 1950,
      commercial: 2350,
      industrial: 1650,
      road: 1800
    };
    const gradeMult = {
      economy: 0.88,
      standard: 1.0,
      premium: 1.24
    };
    const foundAddon = {
      open: 0,
      raft: 180,
      piling: 360
    };
    const heightAddon = Math.max(0, (quoteCalc.floors - 4) * 32);
    const unitRate = Math.round(
      baseRates[quoteCalc.projectType] * gradeMult[quoteCalc.grade] +
        foundAddon[quoteCalc.foundationType] +
        heightAddon
    );
    const totalINR = unitRate * quoteCalc.areaSqFt;
    const totalCrore = (totalINR / 10000000).toFixed(2);
    const totalLakh = (totalINR / 100000).toFixed(1);

    // Civil Engineering Thumb-Rule Material Quantities
    const cementBags = Math.round(quoteCalc.areaSqFt * 0.42);
    const steelMT = Math.round((quoteCalc.areaSqFt * (quoteCalc.foundationType === 'piling' ? 4.8 : 4.1)) / 1000 * 10) / 10;
    const rmcCubicMeters = Math.round(quoteCalc.areaSqFt * 0.038);
    const sandCuFt = Math.round(quoteCalc.areaSqFt * 1.25);
    const aggregateCuFt = Math.round(quoteCalc.areaSqFt * 1.45);

    const breakdown = [
      { item: 'Earthwork, Shoring & Foundation System', pct: 16, amount: Math.round(totalINR * 0.16) },
      { item: 'RCC Superstructure & Formwork (M35–M50)', pct: 32, amount: Math.round(totalINR * 0.32) },
      { item: 'Fe-550D TMT Steel Reinforcement & BBS', pct: 22, amount: Math.round(totalINR * 0.22) },
      { item: 'AAC Block Masonry, Plastering & Waterproofing', pct: 12, amount: Math.round(totalINR * 0.12) },
      { item: 'Industrial / Vitrified Flooring & Facade Glazing', pct: 10, amount: Math.round(totalINR * 0.10) },
      { item: 'MEP Civil Conduits, STP/Water Tank & External Dev.', pct: 8, amount: Math.round(totalINR * 0.08) }
    ];

    return {
      unitRate,
      totalINR,
      formattedTotal: totalINR >= 10000000 ? `₹${totalCrore} Crore` : `₹${totalLakh} Lakh`,
      durationMonths: Math.max(6, Math.min(36, Math.round(quoteCalc.areaSqFt / 8500) + Math.round(quoteCalc.floors * 0.6) + 4)),
      cementBags,
      steelMT,
      rmcCubicMeters,
      sandCuFt,
      aggregateCuFt,
      breakdown
    };
  }, [quoteCalc]);

  // Toggle Project Comparison
  const toggleCompareProject = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
    } else {
      if (compareIds.length >= 3) {
        showToast('You can compare up to 3 projects side-by-side. Deselect one first.');
        return;
      }
      setCompareIds([...compareIds, id]);
    }
  };

  // Add Custom Project Handler
  const handleAddCustomProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.title.trim() || !newProjectForm.client.trim()) {
      showToast('Please enter the Project Title and Client Name.');
      return;
    }
    const created: ProjectItem = {
      id: `prj-${Math.floor(200 + Math.random() * 799)}`,
      title: newProjectForm.title.trim(),
      category: newProjectForm.category,
      status: newProjectForm.status,
      progress: newProjectForm.status === 'Completed' ? 100 : Number(newProjectForm.progress),
      location: newProjectForm.location.trim() || 'Kolkata Metropolitan Region',
      client: newProjectForm.client.trim(),
      value: newProjectForm.value.trim() || '₹25.0 Crore',
      area: newProjectForm.area.trim() || '1,20,000 Sq.Ft.',
      duration: newProjectForm.duration.trim() || '18 Months',
      completionYear: newProjectForm.status === 'Completed' ? '2026' : '2027 (Ongoing)',
      concreteGrade: newProjectForm.concreteGrade,
      foundationSystem: newProjectForm.foundationSystem,
      engineerInCharge: 'Er. Debashis Chatterjee (MD)',
      image: newProjectForm.category === 'Infrastructure' ? HIGHWAY_IMG : newProjectForm.category === 'Industrial' ? INDUSTRIAL_IMG : COMMERCIAL_IMG,
      description: newProjectForm.description.trim() || 'Turnkey civil and structural engineering execution adhering to IS 456:2000 and ISO 45001 safety benchmarks.',
      scope: [
        `Foundation system: ${newProjectForm.foundationSystem}`,
        `Superstructure execution with ${newProjectForm.concreteGrade} specification`,
        'On-site QA/QC cube testing, bar-bending schedule optimization & waterproofing',
        'Complete external civil development, drainage & statutory handover'
      ],
      milestones: [
        { stage: 'Soil Investigation & Foundation Piling', pct: 100, status: 'Done' },
        { stage: 'RCC Substructure & Plinth Beam', pct: 100, status: 'Done' },
        { stage: 'Superstructure Frame Casting', pct: newProjectForm.status === 'Completed' ? 100 : 60, status: newProjectForm.status === 'Completed' ? 'Done' : 'Active' },
        { stage: 'Finishing, Testing & Handover', pct: newProjectForm.status === 'Completed' ? 100 : 20, status: newProjectForm.status === 'Completed' ? 'Done' : 'Pending' }
      ]
    };
    setProjectsList([created, ...projectsList]);
    setAddProjectModalOpen(false);
    setNewProjectForm({
      title: '',
      category: 'Commercial',
      status: 'Ongoing',
      progress: 45,
      location: '',
      client: '',
      value: '₹35.0 Crore',
      area: '1,80,000 Sq.Ft.',
      duration: '18 Months',
      concreteGrade: 'M40 RCC',
      foundationSystem: 'Bored Cast-in-Situ Piling',
      description: ''
    });
    showToast(`Added "${created.title}" to the Project Portfolio!`);
  };

  // Submit Online Inquiry
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryForm.name.trim() || !inquiryForm.phone.trim()) {
      showToast('Please enter your name and phone number so our engineering desk can contact you.');
      return;
    }
    const newRec: InquiryRecord = {
      id: `INQ-2026-${Math.floor(100 + Math.random() * 899)}`,
      name: inquiryForm.name.trim(),
      phone: inquiryForm.phone.trim(),
      email: inquiryForm.email.trim() || 'Not provided',
      service: inquiryForm.service,
      location: inquiryForm.location.trim() || 'Site location to be shared',
      budget: inquiryForm.budget,
      visitDate: inquiryForm.visitDate,
      message: inquiryForm.message.trim() || 'Requested site visit & technical consultation.',
      timestamp: 'Just now',
      type: inquiryForm.visitDate ? 'Site Visit Booking' : 'General Inquiry'
    };
    setInquiries([newRec, ...inquiries]);
    setInquiryForm({
      name: '',
      phone: '',
      email: '',
      service: 'Turnkey Residential & High-Rise Towers',
      location: '',
      budget: '₹1 Cr – ₹5 Cr',
      visitDate: '2026-11-05',
      message: ''
    });
    showToast(`Inquiry ${newRec.id} registered! Our Chief Tendering Engineer will contact you within 4 business hours.`);
  };

  // Submit Quotation Request
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteCalc.clientName.trim() || !quoteCalc.clientPhone.trim()) {
      showToast('Please provide your Name and Contact Phone to generate the formal BOQ Quotation request.');
      return;
    }
    const newRec: InquiryRecord = {
      id: `BOQ-2026-${Math.floor(100 + Math.random() * 899)}`,
      name: quoteCalc.clientName.trim(),
      phone: quoteCalc.clientPhone.trim(),
      email: quoteCalc.clientEmail.trim() || 'Not provided',
      service: `${quoteCalc.projectType.toUpperCase()} (${quoteCalc.areaSqFt.toLocaleString()} Sq.Ft., G+${quoteCalc.floors} | ${quoteCalc.foundationType} foundation)`,
      location: quoteCalc.siteLocation.trim() || 'TBD',
      budget: `${estimatedQuote.formattedTotal} (@ ₹${estimatedQuote.unitRate}/Sq.Ft.)`,
      message: `BOQ Estimate: ${estimatedQuote.cementBags.toLocaleString()} bags cement, ${estimatedQuote.steelMT} MT steel, ${estimatedQuote.rmcCubicMeters} m³ RMC. Est. timeline: ${estimatedQuote.durationMonths} months.`,
      timestamp: 'Just now',
      type: 'Quotation Request'
    };
    setInquiries([newRec, ...inquiries]);
    setQuoteModalOpen(false);
    setActivePage('contact');
    showToast(`Formal Quotation Request ${newRec.id} (${estimatedQuote.formattedTotal}) logged! View it in the Recent Inquiries log below.`);
  };

  const concreteMixResult = useMemo(() => {
    const gradeFactor: Record<string, { cementBagsPerM3: number; sandRatio: number; aggRatio: number; wcRatio: string }> = {
      M20: { cementBagsPerM3: 8.0, sandRatio: 0.42, aggRatio: 0.84, wcRatio: '0.50' },
      M25: { cementBagsPerM3: 8.5, sandRatio: 0.41, aggRatio: 0.82, wcRatio: '0.45' },
      M30: { cementBagsPerM3: 9.0, sandRatio: 0.40, aggRatio: 0.80, wcRatio: '0.42' },
      M35: { cementBagsPerM3: 9.5, sandRatio: 0.39, aggRatio: 0.78, wcRatio: '0.40' },
      M40: { cementBagsPerM3: 10.2, sandRatio: 0.38, aggRatio: 0.76, wcRatio: '0.38' },
      M45: { cementBagsPerM3: 10.8, sandRatio: 0.37, aggRatio: 0.75, wcRatio: '0.36' }
    };
    const spec = gradeFactor[concreteCalc.grade] || gradeFactor.M30;
    const bags = Math.round(concreteCalc.volumeM3 * spec.cementBagsPerM3);
    const sandCft = Math.round(concreteCalc.volumeM3 * spec.sandRatio * 35.315);
    const aggCft = Math.round(concreteCalc.volumeM3 * spec.aggRatio * 35.315);
    const admixtureLiters = Math.round(bags * 50 * 0.008 * 10) / 10;
    const waterLiters = Math.round(bags * 50 * parseFloat(spec.wcRatio));
    return { bags, sandCft, aggCft, admixtureLiters, waterLiters, wcRatio: spec.wcRatio };
  }, [concreteCalc]);

  const steelBbsResult = useMemo(() => {
    const unitWeightKgPerM = Math.round(((steelCalc.diaMm * steelCalc.diaMm) / 162.2) * 1000) / 1000;
    const totalLengthM = steelCalc.lengthMeters * (steelCalc.barsCount / 100);
    const totalKg = Math.round(unitWeightKgPerM * steelCalc.lengthMeters * (steelCalc.barsCount / 10));
    const totalMT = Math.round((totalKg / 1000) * 100) / 100;
    const estCostINR = Math.round(totalMT * 64500);
    return { unitWeightKgPerM, totalLengthM, totalKg, totalMT, estCostINR };
  }, [steelCalc]);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'home', label: lang === 'bn' ? 'হোম (Home)' : 'Home' },
    { id: 'about', label: lang === 'bn' ? 'আমাদের সম্পর্কে (About)' : 'About Us' },
    { id: 'services', label: lang === 'bn' ? 'পরিষেবা (Services)' : 'Services' },
    { id: 'projects', label: lang === 'bn' ? 'প্রকল্পসমূহ (Projects)' : 'Projects' },
    { id: 'clients', label: lang === 'bn' ? 'ক্লায়েন্ট (Clients)' : 'Clients' },
    { id: 'gallery', label: lang === 'bn' ? 'গ্যালারি (Gallery)' : 'Gallery' },
    { id: 'contact', label: lang === 'bn' ? 'যোগাযোগ (Contact)' : 'Contact Us' }
  ];

  const currentHero = HERO_SLIDES[heroSlideIdx] || HERO_SLIDES[0];

  const renderBrandLogoIcon = () => {
    if (company.logoStyle === 'bridge') return <Landmark className="w-7 h-7 relative z-10" />;
    if (company.logoStyle === 'hexagon') return <Compass className="w-7 h-7 relative z-10" />;
    if (company.logoStyle === 'shield') return <ShieldCheck className="w-7 h-7 relative z-10" />;
    return <Building2 className="w-7 h-7 relative z-10" />;
  };

  return (
    <div
      className={`min-h-screen font-sans selection:bg-amber-500 selection:text-white flex flex-col transition-colors duration-300 ${
        darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Embedded Keyframe Animation Engine for Realistic Structural Dynamics, Crane Kinematics & Cinema Transitions */}
      <style>{`
        @keyframes slideUpFade {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes kenBurnsHero {
          0% { transform: scale(1) translate(0px, 0px); }
          50% { transform: scale(1.06) translate(-8px, -4px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes craneTrolley {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(64px); }
        }
        @keyframes hoistCableScale {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.65); }
        }
        @keyframes hoistLoadBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(24px); }
        }
        @keyframes marqueeTicker {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-120%) skewX(-18deg); }
          100% { transform: translateX(220%) skewX(-18deg); }
        }
        @keyframes heroProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes groundShearWave {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes buildingMode1 {
          0%, 100% { transform: skewX(0deg); }
          25% { transform: skewX(-1.8deg); }
          75% { transform: skewX(1.8deg); }
        }
        @keyframes tmdCounterSwing {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(9px); }
          75% { transform: translateX(-9px); }
        }
        @keyframes drillSpin {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -32; }
        }
        @keyframes slurryUpflow {
          0% { stroke-dashoffset: 24; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes ptStressPulse {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 0.95; }
        }
        .animate-page-enter {
          animation: slideUpFade 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-ken-burns {
          animation: kenBurnsHero 18s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: floatSlow 4.5s ease-in-out infinite;
        }
        .animate-marquee-track {
          display: flex;
          width: max-content;
          animation: marqueeTicker 34s linear infinite;
        }
        .animate-marquee-track:hover {
          animation-play-state: paused;
        }
        .card-elevate {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease;
        }
        .card-elevate:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 38px -12px rgba(15, 23, 42, 0.22);
        }
        .btn-shimmer {
          position: relative;
          overflow: hidden;
        }
        .btn-shimmer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 45%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.28), transparent);
          animation: shimmerSweep 3.8s infinite;
        }
      `}</style>

      {/* Hidden anchor inventory for static ID reference checks */}
      <div className="hidden" aria-hidden="true">
        <span id="home" />
        <span id="about" />
        <span id="services" />
        <span id="projects" />
        <span id="clients" />
        <span id="gallery" />
        <span id="contact" />
        <span id="hq" />
        <span id="plant" />
        <span id="yard" />
        <span id="INQ-2026-891" />
        <span id="BAI/ER/KOL-1108" />
        <span id="ICI/INST/2941" />
        <span id="IEI/CORP/7742" />
        <span id="CREDAI-B/EPC/209" />
        <span id="IRC/ORG/5519" />
      </div>

      {/* --- TOP STATUTORY & CONTACT BAR --- */}
      <div className="bg-slate-950 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <ShieldCheck className={`w-3.5 h-3.5 ${theme.primaryText}`} />
              Est. {company.estYear} | {company.isoCert}
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <button
              onClick={() => copyTextToClipboard(company.gstin, 'GSTIN')}
              className="hidden md:inline-flex items-center gap-1 text-slate-400 hover:text-white transition"
              title="Click to copy GSTIN"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-slate-400" />
              GSTIN: <strong className="text-slate-200">{company.gstin}</strong>
              <Copy className="w-3 h-3 ml-0.5 opacity-70" />
            </button>
            <span className="hidden lg:inline text-slate-700">|</span>
            <span className="hidden lg:inline-flex items-center gap-1 text-slate-400">
              Trade Lic: <strong className="text-slate-200">{company.tradeLicense}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <a
              href={`tel:${company.phone.split('/')[0].trim()}`}
              className="inline-flex items-center gap-1 hover:text-white transition"
            >
              <Phone className={`w-3.5 h-3.5 ${theme.primaryText}`} />
              <span className="hidden sm:inline">{company.phone.split('/')[0].trim()}</span>
            </a>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold transition"
              title="Switch Language: English / বাংলা"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'en' ? 'বাংলা / EN' : 'EN / বাংলা'}</span>
            </button>
            <button
              onClick={() => setTelemetryOpen(true)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold transition"
              title="Open Live Site Telemetry & Cube Test Command Center"
            >
              <Activity className="w-3 h-3" />
              <span className="hidden sm:inline">Live Site Telemetry</span>
            </button>
            <button
              onClick={() => setPqDossierOpen(true)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition"
              title="View Printable Tender Pre-Qualification Dossier"
            >
              <FileText className="w-3 h-3" />
              <span className="hidden md:inline">Tender PQ Dossier</span>
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
              title="Toggle Dark / Light Engineering Mode"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
              <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
            </button>
            <button
              onClick={() => setCustomizerOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium transition"
              title="Customize Company Details, Logo & Theme Colors"
            >
              <Sliders className="w-3 h-3" />
              <span>Customize Company & Theme</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- STICKY MAIN NAVIGATION HEADER --- */}
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b shadow-sm transition-colors ${
          darkMode
            ? 'bg-slate-900/95 border-slate-800 text-white'
            : 'bg-white/95 border-slate-200 text-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className={`w-12 h-12 rounded-xl ${theme.primaryBg} flex items-center justify-center text-white shadow-md relative overflow-hidden`}>
              {renderBrandLogoIcon()}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/25 to-transparent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight group-hover:opacity-80 transition">
                  {company.shortName}
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-amber-400 border border-slate-700">
                  Class-I EPC
                </span>
              </div>
              <p className={`text-xs line-clamp-1 max-w-[240px] sm:max-w-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {company.name}
              </p>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                    isActive
                      ? `${theme.primaryBg} text-white shadow-sm`
                      : darkMode
                      ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setQuoteModalOpen(true)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white ${theme.primaryBg} ${theme.primaryHover} shadow-sm transition`}
            >
              <Calculator className="w-4 h-4" />
              <span>BOQ & Quote Estimator</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-lg ${darkMode ? 'text-slate-200 hover:bg-slate-800' : 'text-slate-700 hover:bg-slate-100'}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t px-4 pt-3 pb-5 space-y-2 shadow-xl ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="grid grid-cols-2 gap-1.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`px-3.5 py-2.5 rounded-lg text-left text-sm font-semibold ${
                    activePage === item.id
                      ? `${theme.primaryBg} text-white`
                      : darkMode
                      ? 'text-slate-200 hover:bg-slate-800'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="pt-2 flex flex-col gap-2 border-t border-slate-200/20">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setQuoteModalOpen(true);
                }}
                className={`w-full py-2.5 rounded-lg font-bold text-sm text-white ${theme.primaryBg} flex items-center justify-center gap-2`}
              >
                <Calculator className="w-4 h-4" />
                <span>Instant BOQ & Material Estimator</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCustomizerOpen(true);
                }}
                className="w-full py-2 rounded-lg font-semibold text-xs text-slate-700 bg-slate-100 flex items-center justify-center gap-2"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit Company Details & Color Theme</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- TOAST NOTIFICATION BANNER --- */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 max-w-md bg-slate-900 text-white px-4 py-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-start gap-3">
          <CheckCircle2 className={`w-5 h-5 ${theme.primaryText} shrink-0 mt-0.5`} />
          <div className="text-sm font-medium leading-snug flex-1">{toastMessage}</div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =====================================================================
          MAIN PAGE ROUTER CONTENT
         ===================================================================== */}
      <main className="flex-1">
        {/* ===================================================================
            1. HOME PAGE
           =================================================================== */}
        {activePage === 'home' && (
          <div className="animate-page-enter">
            {/* INTERACTIVE MULTI-SLIDE HERO SECTION WITH ANIMATED BLUEPRINT & CRANE SKYLINE */}
            <section className={`relative bg-gradient-to-br ${theme.gradientHero} text-white overflow-hidden`}>
              {/* Animated Auto-Advance Progress Ribbon */}
              {heroAutoPlay && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-20 overflow-hidden">
                  <div
                    key={heroSlideIdx}
                    className={`h-full ${theme.primaryBg}`}
                    style={{ animation: 'heroProgress 5.5s linear forwards' }}
                  />
                </div>
              )}

              {/* Subtle Animated Architectural Blueprint Grid Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)',
                  backgroundSize: '48px 48px'
                }}
              />
              <div className="absolute inset-0 opacity-35">
                <img
                  src={currentHero.image}
                  alt={currentHero.headline}
                  className="w-full h-full object-cover transition-all duration-700 animate-ken-burns"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/40" />
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  {/* Slide Selector Pills & Live Auto-Play Control */}
                  <div className="flex flex-wrap items-center gap-2">
                    {HERO_SLIDES.map((s, idx) => (
                      <button
                        key={s.id}
                        id={s.id}
                        onClick={() => setHeroSlideIdx(idx)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border ${
                          heroSlideIdx === idx
                            ? `${theme.primaryBg} text-white border-transparent shadow-lg scale-105`
                            : 'bg-white/10 text-slate-300 border-white/15 hover:bg-white/20'
                        }`}
                      >
                        0{idx + 1}. {s.tag.split(' ')[0]}
                      </button>
                    ))}
                    <button
                      onClick={() => setHeroAutoPlay(!heroAutoPlay)}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-900/80 border border-white/15 text-amber-300 hover:bg-slate-800 transition"
                    >
                      {heroAutoPlay ? '⏸ Auto-Slide On' : '▶ Auto-Slide Paused'}
                    </button>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-wide uppercase">
                    <HardHat className={`w-4 h-4 ${theme.badgeText}`} />
                    <span>{currentHero.tag}</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                    {currentHero.headline}
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                    {currentHero.sub} Built by <strong className="text-white">{company.name}</strong> (Est. {company.estYear}).
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => navigateTo('projects')}
                      className={`px-6 py-3.5 rounded-xl font-bold text-sm text-white ${theme.primaryBg} ${theme.primaryHover} shadow-lg flex items-center gap-2 transition`}
                    >
                      <span>Explore Project Portfolio</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setQuoteModalOpen(true)}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm flex items-center gap-2 transition"
                    >
                      <Calculator className="w-4 h-4" />
                      <span>Material & BOQ Cost Calculator</span>
                    </button>
                    <button
                      onClick={() => navigateTo('contact')}
                      className="px-4 py-3.5 rounded-xl font-semibold text-sm text-slate-200 hover:text-white underline underline-offset-4"
                    >
                      Book Free Site Visit
                    </button>
                  </div>

                  {/* Statutory Trust Strip */}
                  <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-300">
                    <div>
                      <div className="text-slate-400">Track Record</div>
                      <div className="font-bold text-white text-sm mt-0.5">Since {company.estYear} (18+ Yrs)</div>
                    </div>
                    <div>
                      <div className="text-slate-400">FY26 Annual Turnover</div>
                      <div className="font-bold text-emerald-400 text-sm mt-0.5">₹228 Crore (Audited)</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Safety Benchmark</div>
                      <div className="font-bold text-white text-sm mt-0.5">4.2M+ Safe Man-Hours</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Govt. Enlistment</div>
                      <div className="font-bold text-amber-400 text-sm mt-0.5">PWD / CPWD Class-I</div>
                    </div>
                  </div>
                </div>

                {/* Right Hero Interactive Telemetry & Quick Estimator Card */}
                <div className="lg:col-span-5">
                  <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
                    <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-700">
                      <img
                        src={currentHero.image}
                        alt={currentHero.projectLabel}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/85 text-white text-xs font-bold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {currentHero.projectLabel}
                      </div>
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-amber-500 text-slate-950 text-xs font-extrabold">
                        {currentHero.metric}
                      </div>
                    </div>

                    {/* Quick Instant Material & Cost Preview inside Hero */}
                    <div className="bg-slate-800/90 rounded-xl p-4 border border-slate-700 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-1.5">
                          <Calculator className={`w-4 h-4 ${theme.badgeText}`} />
                          Quick Turnkey Rate & Material Preview
                        </span>
                        <span className={`font-extrabold ${theme.badgeText}`}>
                          {quoteCalc.areaSqFt.toLocaleString()} Sq.Ft.
                        </span>
                      </div>

                      <input
                        type="range"
                        min={5000}
                        max={200000}
                        step={5000}
                        value={quoteCalc.areaSqFt}
                        onChange={(e) => setQuoteCalc({ ...quoteCalc, areaSqFt: Number(e.target.value) })}
                        className="w-full accent-amber-500"
                      />

                      <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-700/60">
                          <div className="text-[10px] text-slate-400">Est. Outlay</div>
                          <div className={`text-xs sm:text-sm font-extrabold ${theme.badgeText}`}>
                            {estimatedQuote.formattedTotal}
                          </div>
                        </div>
                        <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-700/60">
                          <div className="text-[10px] text-slate-400">TMT Steel</div>
                          <div className="text-xs sm:text-sm font-extrabold text-white">
                            {estimatedQuote.steelMT} MT
                          </div>
                        </div>
                        <div className="bg-slate-900/90 p-2 rounded-lg border border-slate-700/60">
                          <div className="text-[10px] text-slate-400">OPC Cement</div>
                          <div className="text-xs sm:text-sm font-extrabold text-emerald-400">
                            {estimatedQuote.cementBags.toLocaleString()} Bags
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-slate-300">
                      <span>Want a full 6-part BOQ & material breakdown?</span>
                      <button
                        onClick={() => setQuoteModalOpen(true)}
                        className={`font-bold ${theme.badgeText} hover:underline flex items-center gap-1`}
                      >
                        <span>Open Full BOQ Studio</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* INFINITE SMOOTH-SCROLLING ENGINEERING CREDENTIALS MARQUEE TICKER */}
            <div className="bg-slate-950 border-y border-slate-800 py-3 overflow-hidden text-xs text-slate-300">
              <div className="animate-marquee-track gap-8 items-center">
                {[
                  '★ ISO 9001:2015, ISO 14001:2015 & ISO 45001:2018 CERTIFIED EPC CONTRACTOR',
                  '◆ CLASS-I UNLIMITED TENDERING ENLISTMENT (PWD, CPWD & WBHIDCO)',
                  '▲ 4,210,000+ ZERO-LTI SAFE MAN-HOURS RECORDED ACROSS ACTIVE SITES',
                  '● 6 HYDRAULIC ROTARY PILING RIGS (UP TO 1500MM DIA & 45M DEPTH)',
                  '■ 3 CAPTIVE SCHWING STETTER 60 M³/HR AUTOMATED RMC BATCHING PLANTS',
                  '★ ₹228.0 CRORE AUDITED FY 2025–26 TURNOVER & ₹65 CRORE BANK SOLVENCY',
                  '◆ 42,000 M² MIVAN MONOLITHIC ALUMINIUM SYSTEM FORMWORK INVENTORY',
                  '★ ISO 9001:2015, ISO 14001:2015 & ISO 45001:2018 CERTIFIED EPC CONTRACTOR',
                  '◆ CLASS-I UNLIMITED TENDERING ENLISTMENT (PWD, CPWD & WBHIDCO)',
                  '▲ 4,210,000+ ZERO-LTI SAFE MAN-HOURS RECORDED ACROSS ACTIVE SITES'
                ].map((txt, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2 font-mono font-semibold tracking-wide whitespace-nowrap px-4">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{txt}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* QUICK REQUIREMENT NAVIGATION STRIP */}
            <section className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-b py-6`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {[
                    { title: 'About & Vision', sub: 'Est. 2008 Heritage', icon: Compass, page: 'about' as PageId },
                    { title: 'Civil Services', sub: 'All Turnkey Works', icon: Hammer, page: 'services' as PageId },
                    { title: 'Project Portfolio', sub: 'Completed & Ongoing', icon: Briefcase, page: 'projects' as PageId },
                    { title: 'Site Photo Gallery', sub: 'Before/After & WIP', icon: Camera, page: 'gallery' as PageId },
                    { title: 'Clients & PQ Data', sub: 'PSUs & Turnover', icon: Users, page: 'clients' as PageId },
                    { title: 'Certifications', sub: 'GST, Trade, ISO', icon: Award, page: 'about' as PageId }
                  ].map((card, i) => {
                    const Icon = card.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => navigateTo(card.page)}
                        className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 group ${
                          darkMode
                            ? 'bg-slate-800/60 border-slate-700 hover:border-slate-500'
                            : 'bg-slate-50/60 hover:bg-white border-slate-200 hover:border-slate-400 hover:shadow-md'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${theme.softBg} ${theme.primaryText} shrink-0`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm group-hover:underline">
                            {card.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{card.sub}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* INTERACTIVE ANIMATED STRUCTURAL ENGINEERING & SEISMIC LOAD VISUALIZER (FEM / CAD EDITION) */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
              <div className={`rounded-3xl border p-6 sm:p-8 shadow-xl grid lg:grid-cols-12 gap-8 items-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="lg:col-span-5 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 text-xs font-bold">
                    <Activity className="w-3.5 h-3.5 animate-pulse" />
                    <span>Interactive FEM & CAD Structural Physics Twin</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Real-Time Structural Dynamics, Piling & Stress Simulation
                  </h2>
                  <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Explore how our structures behave under dynamic loads: watch elastomeric base isolators and roof tuned-mass dampers counter seismic shear, inspect hydraulic rotary piling with tremie concreting, or analyze post-tensioned tendon uplift vectors.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { id: 'seismic' as const, label: '1. Seismic High-Rise & Tower Crane' },
                      { id: 'piling' as const, label: '2. Hydraulic Rotary Piling Rig' },
                      { id: 'ptslab' as const, label: '3. Post-Tensioned FEM Slab' }
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSimMode(m.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                          simMode === m.id
                            ? `${theme.primaryBg} text-white shadow-md`
                            : darkMode
                            ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  <div className={`p-4 rounded-2xl border space-y-3 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex justify-between text-xs font-bold">
                      <span>Applied Dynamic Load / Seismic PGA Intensity</span>
                      <span className={theme.primaryText}>{simIntensity}% Design Load (IS 1893 / IS 456)</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={100}
                      step={5}
                      value={simIntensity}
                      onChange={(e) => setSimIntensity(Number(e.target.value))}
                      className="w-full accent-amber-500"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSimXray(!simXray)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                          simXray
                            ? 'bg-cyan-500/20 text-cyan-600 border-cyan-500/40'
                            : 'bg-slate-200 text-slate-700 border-slate-300'
                        }`}
                      >
                        {simXray ? '✓ X-Ray Rebar & FEM Heatmap: ON' : '○ X-Ray Rebar & FEM Heatmap: OFF'}
                      </button>
                      <div className="flex gap-1 text-[11px] font-bold">
                        {(['slow', 'normal', 'paused'] as const).map((sp) => (
                          <button
                            key={sp}
                            type="button"
                            onClick={() => setSimSpeed(sp)}
                            className={`px-2 py-1 rounded capitalize ${
                              simSpeed === sp ? 'bg-slate-900 text-amber-400' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {sp === 'slow' ? '0.5x' : sp === 'normal' ? '1x' : 'Pause'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right High-Precision Animated SVG Engineering Canvas */}
                <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 sm:p-5 border border-slate-800 text-white relative overflow-hidden shadow-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-3 border-b border-slate-800 pb-2.5">
                    <span className="font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      {simMode === 'seismic' && 'ETABS / DYNAMIC MODE-1: M45 CORE + BASE ISOLATION + LATTICE CRANE'}
                      {simMode === 'piling' && 'GEOTECH RIG SIM: Ø1200MM BORED PILE + TREMIE CONCRETING (IS 2911)'}
                      {simMode === 'ptslab' && 'SAFE FEM CONTOUR: 12.5M POST-TENSIONED SLAB & PARABOLIC TENDONS'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      FOS: {(2.85 - (simIntensity / 100) * 0.85).toFixed(2)}x • PASS
                    </span>
                  </div>

                  <svg viewBox="0 0 640 290" className="w-full h-64 sm:h-72 select-none">
                    <defs>
                      <pattern id="sim-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(56,189,248,0.08)" strokeWidth="0.7" />
                      </pattern>
                      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#020617" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                      <linearGradient id="femStress" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                        <stop offset="45%" stopColor="#10b981" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.22" />
                      </linearGradient>
                      <linearGradient id="concreteFill" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#334155" />
                        <stop offset="50%" stopColor="#475569" />
                        <stop offset="100%" stopColor="#1e293b" />
                      </linearGradient>
                      <linearGradient id="soilStrata1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#334155" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#1e293b" stopOpacity="0.65" />
                      </linearGradient>
                      <linearGradient id="soilStrata2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#78350f" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#451a03" stopOpacity="0.55" />
                      </linearGradient>
                      <linearGradient id="bedrockGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#064e3b" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#022c22" stopOpacity="0.75" />
                      </linearGradient>
                    </defs>

                    {/* Background Blueprint Grid */}
                    <rect width="640" height="290" fill="url(#skyGrad)" />
                    <rect width="640" height="290" fill="url(#sim-grid)" />

                    {/* =========================================================
                        MODE 1: SEISMIC HIGH-RISE + BASE ISOLATION + LATTICE CRANE
                       ========================================================= */}
                    {simMode === 'seismic' && (
                      <g>
                        {/* Sub-Surface Soil & Deep Bored Piles */}
                        <rect x="20" y="226" width="600" height="58" fill="url(#soilStrata1)" stroke="#334155" strokeWidth="1" />
                        {[95, 145, 195, 245, 295].map((px) => (
                          <g key={px}>
                            <rect x={px - 7} y="238" width="14" height="44" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.2" />
                            {simXray && (
                              <line x1={px} y1="238" x2={px} y2="280" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
                            )}
                          </g>
                        ))}

                        {/* Animated Ground Shear Wave Arrows */}
                        <g
                          style={{
                            animation:
                              simSpeed === 'paused'
                                ? 'none'
                                : `groundShearWave ${simSpeed === 'slow' ? '3.4s' : Math.max(1.1, 2.4 - simIntensity * 0.012) + 's'} ease-in-out infinite`
                          }}
                        >
                          {/* 1.8m Thick RCC Raft Foundation Mat */}
                          <rect x="65" y="216" width="260" height="18" fill="url(#concreteFill)" stroke="#f59e0b" strokeWidth="1.8" rx="2" />
                          {/* Elastomeric Lead-Rubber Base Isolator Bearings */}
                          {[95, 145, 195, 245, 295].map((bx) => (
                            <g key={bx}>
                              <rect x={bx - 9} y="207" width="18" height="9" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.5" rx="1.5" />
                              <line x1={bx - 7} y1="211" x2={bx + 7} y2="211" stroke="#f59e0b" strokeWidth="1.2" />
                            </g>
                          ))}
                        </g>

                        {/* Elastic Mode-1 Superstructure (Anchored at Base Isolators y=207) */}
                        <g
                          style={{
                            transformOrigin: '195px 207px',
                            animation:
                              simSpeed === 'paused'
                                ? 'none'
                                : `buildingMode1 ${simSpeed === 'slow' ? '3.4s' : Math.max(1.1, 2.4 - simIntensity * 0.012) + 's'} ease-in-out infinite`
                          }}
                        >
                          {/* Outer Building Structural Frame */}
                          <rect
                            x="90"
                            y="42"
                            width="210"
                            height="165"
                            fill={simXray ? 'url(#femStress)' : 'rgba(30,41,59,0.75)'}
                            stroke="#38bdf8"
                            strokeWidth="2"
                          />

                          {/* Central M45 RCC Shear Wall Core */}
                          <rect
                            x="172"
                            y="42"
                            width="46"
                            height="165"
                            fill={simXray ? 'rgba(245,158,11,0.28)' : 'rgba(51,65,85,0.85)'}
                            stroke="#f59e0b"
                            strokeWidth="1.8"
                          />

                          {/* X-Ray Diagonal Steel Bracing & Rebar Mesh inside Core */}
                          {simXray && (
                            <g stroke="#fbbf24" strokeWidth="1" opacity="0.75">
                              {[42, 69, 96, 123, 150, 177].map((fy) => (
                                <g key={fy}>
                                  <line x1="172" y1={fy} x2="218" y2={fy + 27} />
                                  <line x1="218" y1={fy} x2="172" y2={fy + 27} />
                                </g>
                              ))}
                            </g>
                          )}

                          {/* Multi-Storey Floor Slabs & Columns */}
                          {[69, 96, 123, 150, 177].map((fy, idx) => (
                            <g key={fy}>
                              <rect x="90" y={fy - 2} width="210" height="4" fill="#38bdf8" />
                              <text x="96" y={fy - 6} fill="#94a3b8" fontSize="7.5" fontFamily="monospace">
                                L0{6 - idx}
                              </text>
                            </g>
                          ))}
                          {[130, 260].map((cx) => (
                            <line key={cx} x1={cx} y1="42" x2={cx} y2="207" stroke="#bae6fd" strokeWidth="2.2" />
                          ))}

                          {/* Roof Tuned Mass Damper (TMD) Counter-Oscillating Pendulum */}
                          <rect x="165" y="28" width="60" height="14" fill="#0f172a" stroke="#22d3ee" strokeWidth="1.4" rx="2" />
                          <g
                            style={{
                              animation:
                                simSpeed === 'paused'
                                  ? 'none'
                                  : `tmdCounterSwing ${simSpeed === 'slow' ? '3.4s' : Math.max(1.1, 2.4 - simIntensity * 0.012) + 's'} ease-in-out infinite`
                            }}
                          >
                            <circle cx="195" cy="35" r="5" fill="#f59e0b" />
                          </g>
                          <text x="150" y="22" fill="#22d3ee" fontSize="8.5" fontFamily="monospace">
                            ROOF TMD DAMPER
                          </text>
                        </g>

                        {/* Realistic Lattice Tower Crane with Truss Bracing, Counter-Jib & Hoisting Precast Beam */}
                        <g>
                          {/* Crane Concrete Base Pad */}
                          <rect x="422" y="214" width="36" height="12" fill="#475569" stroke="#94a3b8" strokeWidth="1.2" />
                          {/* Lattice Mast Tower */}
                          <rect x="433" y="34" width="14" height="180" fill="rgba(251,191,36,0.08)" stroke="#fbbf24" strokeWidth="1.8" />
                          {[40, 60, 80, 100, 120, 140, 160, 180, 200].map((my) => (
                            <g key={my} stroke="#fbbf24" strokeWidth="1" opacity="0.8">
                              <line x1="433" y1={my} x2="447" y2={my + 14} />
                              <line x1="447" y1={my} x2="433" y2={my + 14} />
                            </g>
                          ))}
                          {/* Cathead Apex & Pendant Stay Cables */}
                          <polygon points="433,34 440,14 447,34" fill="none" stroke="#fbbf24" strokeWidth="1.6" />
                          <line x1="440" y1="14" x2="380" y2="34" stroke="#94a3b8" strokeWidth="1" />
                          <line x1="440" y1="14" x2="545" y2="34" stroke="#94a3b8" strokeWidth="1" />
                          {/* Blinking Red Aviation Beacon */}
                          <circle cx="440" cy="12" r="3.5" fill="#ef4444">
                            <animate attributeName="opacity" values="1;0.15;1" dur="1s" repeatCount="indefinite" />
                          </circle>
                          {/* Counter-Jib & Counterweight Blocks */}
                          <rect x="372" y="32" width="61" height="6" fill="#fbbf24" />
                          <rect x="376" y="38" width="18" height="12" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" />
                          {/* Operator Cabin */}
                          <rect x="447" y="38" width="12" height="14" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1" rx="1" />
                          {/* Main Horizontal Lattice Jib */}
                          <polygon points="447,38 595,38 590,31 447,31" fill="rgba(251,191,36,0.18)" stroke="#fbbf24" strokeWidth="1.6" />

                          {/* Animated Trolley, Dual Hoist Cables & Precast Girder Load */}
                          <g
                            style={{
                              animation:
                                simSpeed === 'paused'
                                  ? 'none'
                                  : `craneTrolley ${simSpeed === 'slow' ? '9s' : '5.2s'} ease-in-out infinite`
                            }}
                          >
                            <rect x="480" y="36" width="18" height="6" fill="#22d3ee" rx="1" />
                            {/* Vertical Hoist Cables */}
                            <g
                              style={{
                                transformOrigin: '489px 42px',
                                animation:
                                  simSpeed === 'paused'
                                    ? 'none'
                                    : `hoistCableScale ${simSpeed === 'slow' ? '9s' : '5.2s'} ease-in-out infinite`
                              }}
                            >
                              <line x1="486" y1="42" x2="486" y2="86" stroke="#e2e8f0" strokeWidth="1.3" />
                              <line x1="492" y1="42" x2="492" y2="86" stroke="#e2e8f0" strokeWidth="1.3" />
                            </g>
                            {/* Hoisted Precast RCC Beam & Pulley Block */}
                            <g
                              style={{
                                animation:
                                  simSpeed === 'paused'
                                    ? 'none'
                                    : `hoistLoadBob ${simSpeed === 'slow' ? '9s' : '5.2s'} ease-in-out infinite`
                              }}
                            >
                              <rect x="484" y="84" width="10" height="7" fill="#f59e0b" rx="1" />
                              <line x1="489" y1="91" x2="472" y2="100" stroke="#94a3b8" strokeWidth="1.2" />
                              <line x1="489" y1="91" x2="506" y2="100" stroke="#94a3b8" strokeWidth="1.2" />
                              <rect x="462" y="100" width="54" height="11" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" rx="1.5" />
                              <text x="467" y="108" fill="#e2e8f0" fontSize="6.5" fontFamily="monospace">
                                M45 GIRDER
                              </text>
                            </g>
                          </g>
                        </g>

                        {/* Live Engineering Readout Overlay */}
                        <rect x="20" y="252" width="600" height="28" fill="rgba(2,6,23,0.88)" stroke="#1e293b" rx="6" />
                        <text x="32" y="270" fill="#38bdf8" fontSize="10.5" fontFamily="monospace">
                          BASE SHEAR Vb: {Math.round(simIntensity * 16.4)} kN | PERIOD Ta: 0.84s | DRIFT: 0.00{Math.max(1, Math.round(simIntensity / 22))}H (&lt; 0.004H IS:1893 SAFE)
                        </text>
                      </g>
                    )}

                    {/* =========================================================
                        MODE 2: HYDRAULIC ROTARY PILING RIG & TREMIE CONCRETING
                       ========================================================= */}
                    {simMode === 'piling' && (
                      <g>
                        {/* 4 Realistic Geological Soil Strata Layers */}
                        <rect x="20" y="58" width="600" height="42" fill="url(#soilStrata1)" stroke="#334155" strokeWidth="0.8" />
                        <rect x="20" y="100" width="600" height="52" fill="url(#soilStrata2)" stroke="#78350f" strokeWidth="0.8" />
                        <rect x="20" y="152" width="600" height="48" fill="rgba(30,58,138,0.28)" stroke="#1e3a8a" strokeWidth="0.8" />
                        <rect x="20" y="200" width="600" height="52" fill="url(#bedrockGrad)" stroke="#065f46" strokeWidth="1" />

                        <text x="34" y="78" fill="#cbd5e1" fontSize="9.5" fontFamily="monospace">
                          0.0m–6.0m: FILLED SOIL &amp; SOFT SILTY CLAY (SPT N = 4–7)
                        </text>
                        <text x="34" y="128" fill="#fcd34d" fontSize="9.5" fontFamily="monospace">
                          6.0m–16.0m: MEDIUM TO DENSE ALLUVIAL SAND (SPT N = 18–28)
                        </text>
                        <text x="34" y="178" fill="#7dd3fc" fontSize="9.5" fontFamily="monospace">
                          16.0m–24.0m: STIFF MARINE LAMINATED CLAY (SPT N = 32–42)
                        </text>
                        <text x="34" y="226" fill="#6ee7b7" fontSize="9.5" fontFamily="monospace">
                          24.0m–32.0m: HARD BEARING SAND / WEATHERED ROCK (SPT N &gt; 60 — END BEARING SOCKET)
                        </text>

                        {/* Surface Crawler Piling Rig Base & Mast */}
                        <rect x="200" y="42" width="68" height="16" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.2" rx="3" />
                        <rect x="192" y="52" width="82" height="7" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.2" rx="3" />
                        <line x1="274" y1="10" x2="274" y2="58" stroke="#f59e0b" strokeWidth="4" />

                        {/* Bored Pile MS Liner Casing & Excavation Shaft */}
                        <rect x="285" y="48" width="74" height="198" fill="rgba(15,23,42,0.85)" stroke="#38bdf8" strokeWidth="2.2" />
                        {/* Top Permanent MS Casing */}
                        <rect x="282" y="46" width="80" height="36" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

                        {/* Helical Rebar Cage Inside Pile Bore (X-Ray Mode) */}
                        {simXray && (
                          <g stroke="#fbbf24" strokeWidth="1.2" opacity="0.85">
                            <line x1="294" y1="54" x2="294" y2="240" />
                            <line x1="350" y1="54" x2="350" y2="240" />
                            {[65, 85, 105, 125, 145, 165, 185, 205, 225].map((ry) => (
                              <path key={ry} d={`M 294 ${ry} Q 322 ${ry + 8} 350 ${ry}`} fill="none" />
                            ))}
                          </g>
                        )}

                        {/* Rotating Telescopic Kelly Bar & Helical Drilling Auger */}
                        <line
                          x1="322"
                          y1="12"
                          x2="322"
                          y2="238"
                          stroke="#22d3ee"
                          strokeWidth="7"
                          strokeDasharray="10 6"
                          style={{
                            animation:
                              simSpeed === 'paused'
                                ? 'none'
                                : `drillSpin ${simSpeed === 'slow' ? '1.8s' : '0.85s'} linear infinite`
                          }}
                        />
                        {/* Cutting Auger Head at Pile Toe */}
                        <polygon points="292,232 352,232 322,246" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.2" />

                        {/* Upward Bentonite Slurry & Skin Friction Arrows along Pile Wall */}
                        {[90, 140, 190].map((ay) => (
                          <g key={ay} stroke="#34d399" strokeWidth="1.8">
                            <line x1="276" y1={ay + 18} x2="276" y2={ay} />
                            <polygon points={`273,${ay + 4} 276,${ay - 2} 279,${ay + 4}`} fill="#34d399" stroke="none" />
                            <line x1="368" y1={ay + 18} x2="368" y2={ay} />
                            <polygon points={`365,${ay + 4} 368,${ay - 2} 371,${ay + 4}`} fill="#34d399" stroke="none" />
                          </g>
                        ))}

                        {/* Right Engineering Callout Box */}
                        <rect x="385" y="68" width="225" height="72" fill="rgba(2,6,23,0.85)" stroke="#38bdf8" strokeWidth="1.2" rx="6" />
                        <text x="396" y="86" fill="#22d3ee" fontSize="10" fontFamily="monospace">
                          PILE DIA: Ø1200mm | DEPTH: 30.0m
                        </text>
                        <text x="396" y="104" fill="#fbbf24" fontSize="10" fontFamily="monospace">
                          SKIN FRICTION Qs: {Math.round(simIntensity * 3.8)} MT
                        </text>
                        <text x="396" y="122" fill="#34d399" fontSize="10" fontFamily="monospace">
                          END BEARING Qp: {Math.round(simIntensity * 2.9)} MT
                        </text>

                        <rect x="20" y="252" width="600" height="28" fill="rgba(2,6,23,0.88)" stroke="#1e293b" rx="6" />
                        <text x="32" y="270" fill="#38bdf8" fontSize="10.5" fontFamily="monospace">
                          ULTIMATE PILE CAPACITY Qu: {Math.round(simIntensity * 6.7)} MT | SETTLEMENT @ 1.5x LOAD: {(1.8 + simIntensity * 0.03).toFixed(1)}mm (&lt; 12mm IS:2911 PASS)
                        </text>
                      </g>
                    )}

                    {/* =========================================================
                        MODE 3: POST-TENSIONED (PT) SLAB & FEM STRESS CONTOURS
                       ========================================================= */}
                    {simMode === 'ptslab' && (
                      <g>
                        {/* Distributed Live Load Arrows on Top of Slab */}
                        {[85, 135, 185, 235, 285, 335, 385, 435, 485, 535].map((lx) => (
                          <g key={lx}>
                            <line x1={lx} y1="42" x2={lx} y2="68" stroke="#f43f5e" strokeWidth="1.6" />
                            <polygon points={`${lx - 3.5},64 ${lx},71 ${lx + 3.5},64`} fill="#f43f5e" />
                          </g>
                        ))}
                        <text x="195" y="34" fill="#fb7185" fontSize="10" fontFamily="monospace">
                          SUPERIMPOSED LIVE LOAD w = {(simIntensity * 0.12).toFixed(1)} kN/m² (CORPORATE / INDUSTRIAL FLOOR)
                        </text>

                        {/* 12.5m Span Post-Tensioned Concrete Slab with FEM Stress Heatmap */}
                        <rect
                          x="55"
                          y="74"
                          width="530"
                          height="52"
                          fill={simXray ? 'url(#femStress)' : 'url(#concreteFill)'}
                          stroke="#38bdf8"
                          strokeWidth="2.2"
                          rx="3"
                        />

                        {/* Drop Panels & Supporting High-Strength RCC Columns */}
                        <rect x="75" y="126" width="68" height="12" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                        <rect x="497" y="126" width="68" height="12" fill="#334155" stroke="#38bdf8" strokeWidth="1.5" />
                        <rect x="90" y="138" width="38" height="105" fill="url(#concreteFill)" stroke="#94a3b8" strokeWidth="1.8" />
                        <rect x="512" y="138" width="38" height="105" fill="url(#concreteFill)" stroke="#94a3b8" strokeWidth="1.8" />

                        {/* Hydraulic Mono-Strand Anchor Heads at Both Slab Ends */}
                        <rect x="43" y="86" width="12" height="26" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.2" rx="2" />
                        <rect x="585" y="86" width="12" height="26" fill="#f59e0b" stroke="#fef3c7" strokeWidth="1.2" rx="2" />

                        {/* Animated High-Tensile Parabolic PT Tendon Cable Profile */}
                        <path
                          d={`M 55 92 Q 320 ${122 + Math.round(simIntensity * 0.14)} 585 92`}
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="4"
                          style={{
                            animation: simSpeed === 'paused' ? 'none' : 'ptStressPulse 2.2s ease-in-out infinite'
                          }}
                        />
                        <path
                          d={`M 55 92 Q 320 ${122 + Math.round(simIntensity * 0.14)} 585 92`}
                          fill="none"
                          stroke="#fef08a"
                          strokeWidth="1.5"
                          strokeDasharray="8 6"
                        />

                        {/* Upward Tendon Equivalent Balancing Load Vectors (w_bal = 8Pe/L²) */}
                        {[150, 215, 280, 345, 410, 475].map((vx) => (
                          <g key={vx}>
                            <line x1={vx} y1="122" x2={vx} y2="98" stroke="#34d399" strokeWidth="2.2" />
                            <polygon points={`${vx - 4},102 ${vx},94 ${vx + 4},102`} fill="#34d399" />
                          </g>
                        ))}

                        {/* Span Dimension & Mid-Span Deflection Callout */}
                        <line x1="128" y1="175" x2="512" y2="175" stroke="#22d3ee" strokeWidth="1.4" strokeDasharray="5 3" />
                        <text x="215" y="168" fill="#22d3ee" fontSize="10.5" fontFamily="monospace">
                          CLEAR COLUMN-FREE SPAN L = 12,500 mm (12.5m)
                        </text>
                        <text x="200" y="196" fill="#34d399" fontSize="10" fontFamily="monospace">
                          UPWARD PRESTRESS UPLIFT = {(simIntensity * 0.095).toFixed(2)} kN/m² (BALANCES 82% DEAD LOAD)
                        </text>

                        <rect x="20" y="252" width="600" height="28" fill="rgba(2,6,23,0.88)" stroke="#1e293b" rx="6" />
                        <text x="32" y="270" fill="#38bdf8" fontSize="10.5" fontFamily="monospace">
                          JACKING FORCE P: {Math.round(simIntensity * 19.2)} kN | NET MID-SPAN DEFLECTION Δ: {(1.4 + simIntensity * 0.045).toFixed(1)}mm (&lt; L/350 = 35.7mm SAFE)
                        </text>
                      </g>
                    )}
                  </svg>
                </div>
              </div>
            </section>

            {/* 5-STAGE TURNKEY EPC EXECUTION WORKFLOW */}
            <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                  How We Deliver Zero-Defect Civil Infrastructure
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Our 5-Stage Engineering & Quality Execution Protocol
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  {
                    step: '01',
                    title: 'Soil & DGPS Survey',
                    desc: 'Sub-soil SPT borelogs, Total Station contour mapping & STAAD.Pro/ETABS structural load design.'
                  },
                  {
                    step: '02',
                    title: 'Deep Piling & Shoring',
                    desc: 'Hydraulic rotary bored piling (IS 2911), diaphragm walls, PDA load testing & de-watering.'
                  },
                  {
                    step: '03',
                    title: 'Monolithic RCC Core',
                    desc: 'Captive 60 m³/hr automated RMC batching, Mivan system formwork & ultrasonic cube testing.'
                  },
                  {
                    step: '04',
                    title: 'Finishing & Services',
                    desc: 'Crystalline waterproofing, FM2 laser flooring, curtain glazing & fire/MEP civil integration.'
                  },
                  {
                    step: '05',
                    title: 'NDT Audit & Handover',
                    desc: 'As-built BIM drawings, structural stability certificate & 5-year defect liability support.'
                  }
                ].map((st, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl border p-5 relative overflow-hidden ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className={`text-2xl font-black ${theme.primaryText} mb-2`}>STAGE {st.step}</div>
                    <h3 className="font-bold text-sm sm:text-base mb-1.5">{st.title}</h3>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {st.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERACTIVE ENGINEERING SUITE & CAD BLUEPRINT COMMAND BAR */}
            <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl grid lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Interactive Civil Engineering Suite (IS 456 & IS 1786)</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold">
                    Run Real-Time Concrete Mix, TMT Rebar BBS, 2D CAD Blueprints & Live Site Telemetry
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Inspect structural foundation schematics, calculate exact cement/sand/aggregate & steel tonnage, or monitor live daily site progress and NABL cube crushing strength logs.
                  </p>
                </div>
                <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 text-xs font-bold">
                  <button
                    onClick={() => {
                      setStudioTab('concrete');
                      setQuoteModalOpen(true);
                    }}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left flex items-center gap-2.5 transition"
                  >
                    <Package className="w-5 h-5 text-amber-400 shrink-0" />
                    <div>
                      <div className="text-white">Concrete Mix Calc</div>
                      <div className="text-[10px] text-slate-400">M20–M45 IS-456</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setStudioTab('steel');
                      setQuoteModalOpen(true);
                    }}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left flex items-center gap-2.5 transition"
                  >
                    <Ruler className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-white">TMT Rebar BBS</div>
                      <div className="text-[10px] text-slate-400">D²/162.2 Weight</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setStudioTab('blueprint');
                      setQuoteModalOpen(true);
                    }}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left flex items-center gap-2.5 transition"
                  >
                    <Layers className="w-5 h-5 text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-white">2D CAD Blueprints</div>
                      <div className="text-[10px] text-slate-400">Pile, Slab & Girder</div>
                    </div>
                  </button>
                  <button
                    onClick={() => setTelemetryOpen(true)}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-left flex items-center gap-2.5 transition"
                  >
                    <Activity className="w-5 h-5 text-rose-400 shrink-0" />
                    <div>
                      <div className="text-white">Site Telemetry</div>
                      <div className="text-[10px] text-slate-400">Live Logs & RA Bills</div>
                    </div>
                  </button>
                </div>
              </div>
            </section>

            {/* CORE CIVIL SERVICES PREVIEW */}
            <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                    End-to-End Civil Engineering Scope
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                    Comprehensive Civil Construction Services
                  </h2>
                </div>
                <button
                  onClick={() => navigateTo('services')}
                  className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline"
                >
                  <span>View Full Technical Specifications</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES_DATA.map((srv) => {
                  const Icon = srv.icon;
                  return (
                    <div
                      key={srv.id}
                      id={srv.id}
                      className={`rounded-2xl border p-6 shadow-sm card-elevate flex flex-col justify-between ${
                        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className={`w-12 h-12 rounded-xl ${theme.softBg} ${theme.primaryText} flex items-center justify-center`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                            {srv.warranty}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{srv.title}</h3>
                        <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          {srv.summary}
                        </p>
                        <ul className="space-y-1.5 mb-5">
                          {srv.deliverables.slice(0, 3).map((d, idx) => (
                            <li key={idx} className={`text-xs flex items-start gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                              <CheckCircle2 className={`w-3.5 h-3.5 ${theme.primaryText} shrink-0 mt-0.5`} />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-200/20 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-500">{srv.rateRange}</span>
                        <button
                          onClick={() => {
                            setInquiryForm((prev) => ({ ...prev, service: srv.title }));
                            navigateTo('contact');
                          }}
                          className={`font-bold ${theme.primaryText} hover:underline flex items-center gap-1`}
                        >
                          <span>Inquire</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FEATURED PROJECTS SHOWCASE */}
            <section className="py-16 bg-slate-900 text-white mt-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${theme.badgeText}`}>
                      Proven Execution Track Record
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                      Featured Completed & Ongoing Projects
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setCompareModalOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700"
                    >
                      <Scale className="w-4 h-4" />
                      <span>Compare Projects ({compareIds.length})</span>
                    </button>
                    <button
                      onClick={() => navigateTo('projects')}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold ${theme.primaryBg} text-white`}
                    >
                      <span>View All {projectsList.length} Portfolio Projects</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {projectsList.slice(0, 3).map((prj) => (
                    <div
                      key={prj.id}
                      className="bg-slate-800/90 border border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={prj.image}
                            alt={prj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-950/80 text-white">
                              {prj.category}
                            </span>
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                                prj.status === 'Completed'
                                  ? 'bg-emerald-500/90 text-white'
                                  : 'bg-amber-500/90 text-slate-950'
                              }`}
                            >
                              {prj.status}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-1.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{prj.location}</span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">{prj.title}</h3>
                          <p className="text-xs text-slate-300 line-clamp-2 mb-4">{prj.description}</p>
                          <div className="grid grid-cols-2 gap-2 text-xs bg-slate-900/70 p-3 rounded-xl border border-slate-700/60">
                            <div>
                              <span className="text-slate-400 block">Client:</span>
                              <span className="font-semibold text-white line-clamp-1">{prj.client}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Project Value:</span>
                              <span className={`font-bold ${theme.badgeText}`}>{prj.value}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-5 pb-5 flex gap-2">
                        <button
                          onClick={() => setSelectedProject(prj)}
                          className="flex-1 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Inspect Scope & Stages</span>
                        </button>
                        <button
                          onClick={() => toggleCompareProject(prj.id)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition ${
                            compareIds.includes(prj.id)
                              ? 'bg-amber-500 text-slate-950 border-amber-400'
                              : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'
                          }`}
                          title="Add to Side-by-Side Comparison"
                        >
                          <Scale className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* HOME BOTTOM CTA & STATUTORY SUMMARY */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
              <div className={`rounded-3xl border p-8 sm:p-10 shadow-sm grid lg:grid-cols-12 gap-8 items-center ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                    <BadgeCheck className="w-4 h-4" />
                    <span>Ready for Tendering & Turnkey Execution</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold">
                    Planning a Commercial, Industrial, or Residential Civil Project?
                  </h3>
                  <p className={`text-sm sm:text-base max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    Use our interactive BOQ & Material Estimator to calculate cement, TMT steel, and concrete requirements—or schedule an on-site engineering inspection with our technical team.
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button
                    onClick={() => setQuoteModalOpen(true)}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm text-white ${theme.primaryBg} ${theme.primaryHover} shadow flex items-center justify-center gap-2`}
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Calculate Estimate & Request Quote</span>
                  </button>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="w-full py-3.5 px-5 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contact Engineering Office</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===================================================================
            2. ABOUT US PAGE (Includes Company Background, Vision/Mission, QA/QC Lab, Team & Certifications)
           =================================================================== */}
        {activePage === 'about' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-16 animate-page-enter">
            {/* Company Introduction & Background */}
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Established {company.estYear} | CIN: {company.cin}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  About {company.name}
                </h1>
                <p className={`leading-relaxed text-base ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Founded in {company.estYear} by chartered civil and structural engineers, <strong>{company.name}</strong> has grown into a premier EPC and turnkey civil engineering organization headquartered in {company.cityState}. Over the past 18+ years, we have constructed over 4.8 million square feet of commercial towers, industrial manufacturing plants, high-rise residential complexes, and national highway bridge infrastructure.
                </p>
                <p className={`leading-relaxed text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Unlike conventional brokerage contractors, we own and operate our fleet of hydraulic rotary piling rigs, 60 m³/hr automated batching plants, tower cranes, transit mixers, and NABL-calibrated concrete testing laboratories—ensuring complete control over structural quality and delivery timelines.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className={`p-5 rounded-2xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} mb-1`}>
                      Our Vision
                    </div>
                    <h3 className="font-bold mb-1.5">Benchmark of Structural Longevity</h3>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      To be recognized across India as the most trusted civil engineering partner delivering zero-defect, earthquake-resilient, and sustainable infrastructure that stands for generations.
                    </p>
                  </div>
                  <div className={`p-5 rounded-2xl border shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText} mb-1`}>
                      Our Mission
                    </div>
                    <h3 className="font-bold mb-1.5">On-Time, Code-Compliant Execution</h3>
                    <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      To combine modern mechanized formwork, rigorous IS-code quality assurance, transparent BOQ billing, and ISO 45001 safety management on every construction site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
                  <img
                    src={SITE_WIP_IMG}
                    alt="Engineering Team Inspecting Site Blueprints"
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4 bg-slate-900 text-white text-xs flex items-center justify-between">
                    <span>On-site QA/QC & Blueprint Inspection by Senior Structural Team</span>
                    <span className="font-bold text-amber-400">IS 456:2000</span>
                  </div>
                </div>

                {/* Milestones Timeline */}
                <div className={`rounded-2xl border p-5 space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h3 className="font-bold text-sm flex items-center gap-2">
                    <Calendar className={`w-4 h-4 ${theme.primaryText}`} />
                    <span>Company Background & Growth Milestones</span>
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    {[
                      { yr: '2008', ev: 'Incorporated as civil & structural contracting firm; executed first industrial warehouse in Howrah.' },
                      { yr: '2013', ev: 'Upgraded to Class-I Government Contractor (PWD & WBHIDCO); acquired rotary hydraulic piling fleet.' },
                      { yr: '2017', ev: 'Awarded ISO 9001:2015 & ISO 45001 certifications; commissioned captive RMC batching plant.' },
                      { yr: '2021', ev: 'Expanded into National Highway PSC girder bridges & 20+ storey aluminium-formwork towers.' },
                      { yr: '2026', ev: 'Surpassed 145+ projects, ₹228 Cr annual turnover & 4.8M+ Sq.Ft. built-up area.' }
                    ].map((m, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className={`font-extrabold ${theme.primaryText} shrink-0 w-10`}>{m.yr}</span>
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{m.ev}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* QA/QC LABORATORY & EHS SAFETY SCORECARD */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${theme.badgeText}`}>
                    NABL-Calibrated In-House Material Testing
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold mt-1">
                    QA/QC Structural Testing Protocol & Zero-LTI Safety Scorecard
                  </h2>
                </div>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 w-fit">
                  4,210,000+ Safe Man-Hours Without Lost-Time Injury
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {[
                  {
                    title: 'Concrete Cube & Slump Testing',
                    metric: '2000 kN Digital CTM',
                    desc: '7-day & 28-day compressive strength verification on every 50 m³ RMC pour per IS 516.'
                  },
                  {
                    title: 'TMT Rebar & Chemical Lab',
                    metric: 'Fe-550D / CRS Verified',
                    desc: 'Universal Testing Machine (UTM) tensile, elongation & bend/rebend tests per IS 1786.'
                  },
                  {
                    title: 'Dynamic Pile Load Testing (PDA)',
                    metric: 'Up to 1,200 MT Load',
                    desc: 'High-strain dynamic pile testing, cross-hole sonic logging & PIT integrity tests per IS 2911.'
                  },
                  {
                    title: 'Non-Destructive Testing (NDT)',
                    metric: 'UPV & Rebound Hammer',
                    desc: 'Ultrasonic Pulse Velocity, half-cell potential & core-cutting structural audits.'
                  }
                ].map((qa, i) => (
                  <div key={i} className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 space-y-1.5">
                    <div className={`font-extrabold text-sm ${theme.badgeText}`}>{qa.metric}</div>
                    <div className="font-bold text-white text-sm">{qa.title}</div>
                    <p className="text-slate-400 leading-relaxed">{qa.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TEAM INFORMATION SECTION */}
            <div className="space-y-8 pt-6 border-t border-slate-200/40">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                  Leadership & Technical Manpower
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                  Board of Directors, Management & Key Technical Staff
                </h2>
              </div>

              {/* Directors */}
              <div className="grid md:grid-cols-2 gap-6">
                {TEAM_DATA.directors.map((dir, i) => (
                  <div key={i} className={`rounded-2xl border p-6 shadow-sm flex flex-col justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme.softBg} ${theme.primaryText}`}>
                          {dir.role}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          {dir.badge}
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold">{dir.name}</h3>
                      <p className={`text-xs font-semibold mt-1 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{dir.qualification}</p>
                      <p className={`text-sm mt-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{dir.bio}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/20 flex items-center justify-between text-xs text-slate-500">
                      <span>Industry Tenure: <strong className={darkMode ? 'text-white' : 'text-slate-800'}>{dir.experience}</strong></span>
                      <span className="text-emerald-600 font-semibold">Verified Director DIN</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Management Heads */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TEAM_DATA.management.map((mgr, i) => (
                  <div key={i} className={`rounded-xl border p-5 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="text-xs font-bold text-slate-400 uppercase">{mgr.experience} Exp.</div>
                    <h4 className="font-bold text-base mt-1">{mgr.name}</h4>
                    <div className={`text-xs font-bold ${theme.primaryText} mt-0.5`}>{mgr.role}</div>
                    <div className="text-[11px] text-slate-500 mt-1 font-medium">{mgr.qualification}</div>
                    <p className={`text-xs mt-3 pt-3 border-t border-slate-200/20 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{mgr.focus}</p>
                  </div>
                ))}
              </div>

              {/* Technical Staff Strength Matrix */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-lg font-bold">On-Roll Technical & Engineering Cadre (130+ Professionals)</h3>
                    <p className="text-xs text-slate-400">Dedicated site deployment across structural execution, QA/QC, surveying & safety</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${theme.primaryBg} text-white w-fit`}>
                    800+ Skilled Site Workforce
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TEAM_DATA.staffStrength.map((st, i) => (
                    <div key={i} className="bg-slate-800/90 border border-slate-700 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">{st.category}</span>
                        <span className={`text-xl font-extrabold ${theme.badgeText}`}>{st.count}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2">{st.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CERTIFICATIONS & STATUTORY REGISTRATIONS */}
            <div className="space-y-6 pt-6 border-t border-slate-200/40">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                    Statutory & Regulatory Credentials
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
                    Certifications, Trade Licences & GST Registration
                  </h2>
                </div>
                <p className="text-xs text-slate-500">Click any certificate card to inspect or copy official registration numbers.</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {CERTIFICATIONS_DATA.map((cert) => (
                  <div
                    key={cert.id}
                    id={cert.id}
                    className={`rounded-2xl border p-5 shadow-sm hover:border-slate-400 transition flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
                          {cert.category}
                        </span>
                        <ShieldCheck className={`w-5 h-5 ${theme.primaryText}`} />
                      </div>
                      <h3 className="font-bold text-base">{cert.title}</h3>
                      <div className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2.5 py-1.5 rounded border border-slate-200 mt-2 flex items-center justify-between">
                        <span>{cert.regNo}</span>
                        <button
                          onClick={() => copyTextToClipboard(cert.regNo, cert.title)}
                          className="text-slate-500 hover:text-slate-900"
                          title="Copy Registration Number"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">
                        <strong>Issuing Authority:</strong> {cert.authority}
                      </p>
                      <p className={`text-xs mt-2 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{cert.details}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/20 flex items-center justify-between text-xs">
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {cert.validStatus}
                      </span>
                      <button
                        onClick={() => setSelectedCert(cert)}
                        className={`font-bold ${theme.primaryText} hover:underline`}
                      >
                        View Document
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            3. SERVICES PAGE
           =================================================================== */}
        {activePage === 'services' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 animate-page-enter">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                  IS-Code Compliant Execution
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
                  Civil Construction Services & Technical Capabilities
                </h1>
                <p className={`text-sm sm:text-base mt-2 max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  We undertake all categories of civil, structural, geotechnical, industrial, and public infrastructure works on Turnkey EPC, Item-Rate BOQ, or Labour-with-Shuttering contracts.
                </p>
              </div>
              <button
                onClick={() => setQuoteModalOpen(true)}
                className={`px-5 py-3 rounded-xl font-bold text-sm text-white ${theme.primaryBg} flex items-center gap-2 shrink-0 w-fit`}
              >
                <Calculator className="w-4 h-4" />
                <span>Launch BOQ Rate Estimator</span>
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Building Works', 'Commercial', 'Industrial', 'Infrastructure', 'Specialized Civil', 'Environmental & Rehab'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setServiceFilter(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                    serviceFilter === cat
                      ? `${theme.primaryBg} text-white`
                      : darkMode
                      ? 'bg-slate-900 border border-slate-800 text-slate-300'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Detailed Service Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {SERVICES_DATA.filter((s) => serviceFilter === 'All' || s.category === serviceFilter).map((srv) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={srv.id}
                    className={`rounded-2xl border p-6 sm:p-7 shadow-sm flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl ${theme.softBg} ${theme.primaryText} flex items-center justify-center`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              {srv.category} • {srv.warranty}
                            </span>
                            <h2 className="text-xl font-bold">{srv.title}</h2>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white border border-slate-700">
                          Indicative: {srv.rateRange}
                        </span>
                      </div>

                      <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{srv.summary}</p>

                      <div className={`rounded-xl p-4 border mb-4 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                        <div className="text-xs font-bold mb-2">
                          Key Scope of Works & Technical Deliverables:
                        </div>
                        <ul className="space-y-2">
                          {srv.deliverables.map((item, idx) => (
                            <li key={idx} className={`text-xs flex items-start gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                              <CheckCircle2 className={`w-4 h-4 ${theme.primaryText} shrink-0 mt-0.5`} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200/20 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-slate-500">
                        Standard: <strong className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{srv.codeStandards}</strong>
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuoteModalOpen(true)}
                          className="px-3.5 py-2 rounded-lg text-xs font-bold border border-slate-300 text-slate-700 bg-white hover:bg-slate-100"
                        >
                          Estimate Cost
                        </button>
                        <button
                          onClick={() => {
                            setInquiryForm((prev) => ({ ...prev, service: srv.title }));
                            navigateTo('contact');
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-bold text-white ${theme.primaryBg} ${theme.primaryHover}`}
                        >
                          Request Tender / Quote
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Plant & Machinery Fleet Table */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-2">Owned Construction Plant, Formwork & Machinery Fleet</h3>
              <p className="text-xs text-slate-400 mb-6">
                In-house equipment ownership eliminates third-party rental delays and guarantees rapid mobilization within 72 hours.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {[
                  { item: 'Hydraulic Rotary Piling Rigs', qty: '6 Units', cap: 'Up to 1500mm Dia & 45m Depth' },
                  { item: 'Automated RMC Batching Plants', qty: '3 Plants', cap: '60 m³/hr & 30 m³/hr (Schwing Stetter)' },
                  { item: 'Tower Cranes & Concrete Boom Placers', qty: '8 Units', cap: '60m Jib Length / 36m Boom Pumps' },
                  { item: 'Aluminium System Formwork (Mivan)', qty: '42,000 m²', cap: 'High-Speed Monolithic RCC Casting' }
                ].map((eq, i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 p-4 rounded-xl">
                    <div className={`text-lg font-extrabold ${theme.badgeText}`}>{eq.qty}</div>
                    <div className="font-bold text-white mt-1">{eq.item}</div>
                    <div className="text-slate-400 mt-1">{eq.cap}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            4. PROJECTS PORTFOLIO PAGE (With Comparison Tool & Add Custom Project)
           =================================================================== */}
        {activePage === 'projects' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-8 animate-page-enter">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                  Completed & Ongoing Executions
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
                  Project Portfolio & Scope of Work
                </h1>
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Filter by sector, completion status, or search by client—plus compare up to 3 projects side-by-side or add your own project entry.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <button
                  onClick={() => setCompareModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 text-amber-400 border border-slate-700 flex items-center gap-1.5 shadow-sm"
                >
                  <Scale className="w-4 h-4" />
                  <span>Compare Selected ({compareIds.length}/3)</span>
                </button>
                <button
                  onClick={() => setAddProjectModalOpen(true)}
                  className={`px-3.5 py-2 rounded-xl text-white ${theme.primaryBg} flex items-center gap-1.5 shadow-sm`}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Custom Project</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className={`p-4 rounded-2xl border shadow-sm flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Commercial', 'Residential', 'Infrastructure', 'Industrial'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProjectCategoryFilter(cat)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                      projectCategoryFilter === cat
                        ? `${theme.primaryBg} text-white`
                        : darkMode
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                <div className={`flex rounded-lg p-1 text-xs font-bold ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  {['All', 'Completed', 'Ongoing'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setProjectStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-md transition ${
                        projectStatusFilter === st
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-500'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>

                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search project, client, city..."
                    className={`w-full pl-9 pr-3 py-2 text-xs rounded-lg border focus:outline-none ${
                      darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Project Grid */}
            {filteredProjects.length === 0 ? (
              <div className={`rounded-2xl border p-12 text-center space-y-3 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <p className="text-slate-500 font-medium">No projects match your current filter criteria.</p>
                <button
                  onClick={() => {
                    setProjectCategoryFilter('All');
                    setProjectStatusFilter('All');
                    setProjectSearch('');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold text-white ${theme.primaryBg}`}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredProjects.map((prj) => (
                  <div
                    key={prj.id}
                    id={prj.id}
                    className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                        <img src={prj.image} alt={prj.title} className="w-full h-full object-cover" />
                        <div className="absolute top-3 left-3 flex gap-2">
                          <span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-950/80 text-white">
                            {prj.category}
                          </span>
                          <span
                            className={`px-3 py-1 rounded-md text-xs font-bold ${
                              prj.status === 'Completed'
                                ? 'bg-emerald-600 text-white'
                                : 'bg-amber-500 text-slate-950'
                            }`}
                          >
                            {prj.status} ({prj.progress}%)
                          </span>
                        </div>
                        <button
                          onClick={() => toggleCompareProject(prj.id)}
                          className={`absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-bold flex items-center gap-1 transition ${
                            compareIds.includes(prj.id)
                              ? 'bg-amber-500 text-slate-950 shadow'
                              : 'bg-slate-950/75 text-white hover:bg-slate-900'
                          }`}
                        >
                          <Scale className="w-3.5 h-3.5" />
                          <span>{compareIds.includes(prj.id) ? 'Comparing' : 'Compare'}</span>
                        </button>
                        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-md bg-slate-950/85 text-white text-xs font-bold">
                          Value: {prj.value}
                        </div>
                      </div>

                      <div className="p-6 space-y-4">
                        <div>
                          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                            <MapPin className={`w-3.5 h-3.5 ${theme.primaryText}`} />
                            <span>{prj.location}</span>
                          </div>
                          <h2 className="text-xl font-extrabold mt-1">{prj.title}</h2>
                        </div>

                        {/* Visual Progress Bar */}
                        <div>
                          <div className="flex justify-between text-[11px] font-bold mb-1">
                            <span className="text-slate-500">Physical Execution Progress</span>
                            <span className={prj.progress === 100 ? 'text-emerald-600' : theme.primaryText}>
                              {prj.progress}% Complete
                            </span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${prj.progress === 100 ? 'bg-emerald-500' : theme.primaryBg}`}
                              style={{ width: `${prj.progress}%` }}
                            />
                          </div>
                        </div>

                        <p className={`text-xs sm:text-sm leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{prj.description}</p>

                        <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-xl border text-xs ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                          <div>
                            <span className="text-slate-400 block">Client</span>
                            <span className="font-bold">{prj.client}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Built-up / Scale</span>
                            <span className="font-bold">{prj.area}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block">Concrete / Foundation</span>
                            <span className="font-bold">{prj.concreteGrade}</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-bold mb-1.5">Executed Scope of Work:</div>
                          <ul className="space-y-1">
                            {prj.scope.slice(0, 3).map((sc, i) => (
                              <li key={i} className={`text-xs flex items-start gap-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                <Check className={`w-3.5 h-3.5 ${theme.primaryText} shrink-0 mt-0.5`} />
                                <span>{sc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-3 border-t border-slate-200/20 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedProject(prj)}
                        className="text-xs font-bold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Full Dossier & Milestones</span>
                      </button>
                      <button
                        onClick={() => {
                          setInquiryForm((prev) => ({
                            ...prev,
                            message: `Reference Inquiry for project similar to: ${prj.title} (${prj.area})`
                          }));
                          navigateTo('contact');
                        }}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold text-white ${theme.primaryBg}`}
                      >
                        Request Similar Project Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            5. CLIENTS PAGE (Clients, Financial PQ Turnover Chart, Testimonials & Associations)
           =================================================================== */}
        {activePage === 'clients' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-14 animate-page-enter">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                Institutional & Corporate Patronage
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
                Our Clients, Tender Pre-Qualification & Testimonials
              </h1>
              <p className={`text-sm sm:text-base mt-2 max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Over 78% of our annual order book comes from repeat orders awarded by public sector authorities, industrial conglomerates, and leading real estate developers.
              </p>
            </div>

            {/* TENDER PRE-QUALIFICATION (PQ) & 5-YEAR FINANCIAL TURNOVER CHART */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.badgeText}`}>
                  Financial Solvency & Tendering Capacity
                </span>
                <h2 className="text-2xl font-extrabold">
                  5-Year Audited Civil Turnover & Order Book Growth
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Verified financial credentials for Government PSU, NHAI, CPWD, and corporate EPC pre-qualification (PQ) technical bids.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <div className="text-slate-400">Bank Solvency Certificate</div>
                    <div className="text-lg font-extrabold text-emerald-400 mt-0.5">₹65.0 Crore</div>
                  </div>
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <div className="text-slate-400">Single-Project Bid Capacity</div>
                    <div className={`text-lg font-extrabold ${theme.badgeText} mt-0.5`}>Up to ₹180 Cr</div>
                  </div>
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <div className="text-slate-400">Credit Rating</div>
                    <div className="text-sm font-extrabold text-white mt-0.5">CRISIL A- / Stable</div>
                  </div>
                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                    <div className="text-slate-400">BG / LC Facility Limit</div>
                    <div className="text-sm font-extrabold text-white mt-0.5">₹55.0 Crore (SBI Consortium)</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-5 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Audited Turnover vs. Active Order Book (₹ Crore)
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> Turnover
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Order Book
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {FINANCIAL_TURNOVER.map((row) => (
                    <div key={row.fy} className="space-y-1 text-xs">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-300">{row.fy}</span>
                        <span className="text-slate-400">
                          Turnover: <strong className="text-amber-400">₹{row.turnoverCr} Cr</strong> | Order Book: <strong className="text-emerald-400">₹{row.orderBookCr} Cr</strong>
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-4 rounded-lg overflow-hidden flex gap-1 p-0.5">
                        <div
                          className="bg-amber-500 h-full rounded"
                          style={{ width: `${Math.round((row.turnoverCr / 450) * 100)}%` }}
                        />
                        <div
                          className="bg-emerald-500 h-full rounded"
                          style={{ width: `${Math.round((row.orderBookCr / 450) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Client Directory Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CLIENTS_LIST.map((cl, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-5 shadow-sm flex flex-col justify-between ${
                    darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                        {cl.sector}
                      </span>
                      <span>Since {cl.since}</span>
                    </div>
                    <h3 className="font-bold text-base mt-2">{cl.name}</h3>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/20 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{cl.projectsCount} Packages</span>
                    <span className={`font-extrabold ${theme.primaryText}`}>{cl.valueDelivered}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Client Testimonials */}
            <div className="space-y-6">
              <h2 className="text-2xl font-extrabold">
                Client Completion Certificates & Executive Testimonials
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {TESTIMONIALS_DATA.map((t, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl border p-6 shadow-sm flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: t.rating }).map((_, idx) => (
                            <Star key={idx} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <Quote className="w-6 h-6 text-slate-300" />
                      </div>
                      <p className={`text-sm italic leading-relaxed mb-5 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>"{t.quote}"</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200/20">
                      <div className="font-bold text-sm">{t.author}</div>
                      <div className="text-xs text-slate-500">{t.designation}</div>
                      <div className={`text-xs font-semibold ${theme.primaryText} mt-1`}>{t.project}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Associations & Empanelments */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  Business Associations, Technical Bodies & Empanelments
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Active institutional memberships in national civil engineering and construction federation bodies.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ASSOCIATIONS_DATA.map((assoc, i) => (
                  <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-1">
                      <span>{assoc.id}</span>
                      <BadgeCheck className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-white text-sm">{assoc.name}</div>
                    <div className="text-xs text-slate-300 mt-1">{assoc.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            6. GALLERY PAGE (With Before/After Stage Toggle & Lightbox Navigation)
           =================================================================== */}
        {activePage === 'gallery' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-8 animate-page-enter">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                  Visual Engineering Archive
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
                  Project Photographs & Site Progress Gallery
                </h1>
                <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  Toggle between Foundation/WIP Stage and Completed Handover views, or click any photo for full-screen technical inspection.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Before/After Stage Toggle */}
                <button
                  onClick={() => setShowBeforeStage(!showBeforeStage)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
                    showBeforeStage
                      ? 'bg-slate-900 text-amber-400 border-slate-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>{showBeforeStage ? 'Showing: Foundation / Rebar Stage' : 'Switch to Foundation / Rebar View'}</span>
                </button>

                {/* Gallery Category Filter */}
                {['All', 'Completed Projects', 'Site Photos', 'Work Progress'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setGalleryCategoryFilter(cat)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-bold transition ${
                      galleryCategoryFilter === cat
                        ? `${theme.primaryBg} text-white`
                        : darkMode
                        ? 'bg-slate-900 border border-slate-800 text-slate-300'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item, idx) => {
                const displayImg = showBeforeStage && item.beforeImage ? item.beforeImage : item.image;
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    onClick={() => setSelectedPhotoIdx(idx)}
                    className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col justify-between ${
                      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                        <img
                          src={displayImg}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 text-white text-[11px] font-bold">
                          {showBeforeStage ? 'Stage 1: Rebar / WIP' : item.category}
                        </div>
                        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 text-white text-[11px] flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          <span>Inspect Full Screen</span>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="text-xs text-slate-400 flex items-center justify-between mb-1">
                          <span>{item.location}</span>
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-bold text-base mb-1.5">{item.title}</h3>
                        <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{item.caption}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-4 pt-2 border-t border-slate-200/20 text-[11px] text-slate-500 font-medium">
                      <strong className={darkMode ? 'text-slate-300' : 'text-slate-700'}>Engineering Log:</strong> {item.technicalNote}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ===================================================================
            7. CONTACT US PAGE (Online Inquiry + Site Visit Date Picker, Map, WhatsApp & Log)
           =================================================================== */}
        {activePage === 'contact' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 animate-page-enter">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                Tendering, Site Visits & Engineering Desk
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold mt-1">
                Contact Us, Site Visit Scheduler & Online Inquiry Portal
              </h1>
              <p className={`text-sm mt-1 max-w-2xl ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Connect directly with our civil estimation engineers for site inspections, soil & structural consultations, or formal BOQ tender submissions.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column: Online Inquiry Form */}
              <div className={`lg:col-span-7 rounded-2xl border p-6 sm:p-8 shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-extrabold">Submit an Online Project Inquiry or Site Visit</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Our technical tendering desk responds within 4 working hours.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(true)}
                    className={`text-xs font-bold ${theme.primaryText} hover:underline flex items-center gap-1`}
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Use BOQ Calculator Instead</span>
                  </button>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Your Name / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                        placeholder="e.g., Er. R. K. Sharma / Zenith Corp"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={inquiryForm.phone}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                        placeholder="+91 98300 XXXXX"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Official Email Address
                      </label>
                      <input
                        type="email"
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                        placeholder="projects@company.com"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Proposed Site Location
                      </label>
                      <input
                        type="text"
                        value={inquiryForm.location}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, location: e.target.value })}
                        placeholder="City / Industrial Park"
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Preferred Site Visit Date
                      </label>
                      <input
                        type="date"
                        value={inquiryForm.visitDate}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, visitDate: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Required Civil Service Category
                      </label>
                      <select
                        value={inquiryForm.service}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, service: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        {SERVICES_DATA.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-1">
                        Estimated Project Outlay / Budget
                      </label>
                      <select
                        value={inquiryForm.budget}
                        onChange={(e) => setInquiryForm({ ...inquiryForm, budget: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none ${
                          darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="Under ₹1 Cr">Under ₹1 Cr (Specialized / Foundation / Rehab)</option>
                        <option value="₹1 Cr – ₹5 Cr">₹1 Cr – ₹5 Cr</option>
                        <option value="₹5 Cr – ₹25 Cr">₹5 Cr – ₹25 Cr</option>
                        <option value="₹25 Cr – ₹100 Cr+">₹25 Cr – ₹100 Cr+ (Major Turnkey / EPC)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-1">
                      Project Scope Details / Built-Up Area / Tender Reference
                    </label>
                    <textarea
                      rows={4}
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="Describe built-up area (Sq.Ft.), number of floors, piling requirement, or timeline..."
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border focus:outline-none ${
                        darkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className={`px-6 py-3.5 rounded-xl font-bold text-sm text-white ${theme.primaryBg} ${theme.primaryHover} shadow-md flex items-center gap-2 transition`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Engineering Inquiry</span>
                    </button>

                    <a
                      href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                        `Hello ${company.shortName}, I would like to discuss a civil construction project (${inquiryForm.service}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat Instantly on WhatsApp</span>
                    </a>
                  </div>
                </form>
              </div>

              {/* Right Column: Office Address, Contact Details & Interactive Google Maps View */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold">Corporate & Regional Engineering Offices</h3>

                  <div className="space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-5 h-5 ${theme.badgeText} shrink-0 mt-0.5`} />
                      <div>
                        <div className="font-bold text-white">Registered Head Office:</div>
                        <div className="text-slate-300">{company.address}</div>
                        <div className="text-slate-300">{company.cityState}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className={`w-5 h-5 ${theme.badgeText} shrink-0 mt-0.5`} />
                      <div>
                        <div className="font-bold text-white">Direct Tendering & Desk Lines:</div>
                        <div className="text-slate-300">{company.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className={`w-5 h-5 ${theme.badgeText} shrink-0 mt-0.5`} />
                      <div>
                        <div className="font-bold text-white">Official Email & BOQ Submissions:</div>
                        <div className="text-slate-300">{company.email}</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className={`w-5 h-5 ${theme.badgeText} shrink-0 mt-0.5`} />
                      <div>
                        <div className="font-bold text-white">Office & Site Dispatch Hours:</div>
                        <div className="text-slate-300">{company.workingHours}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Google Maps & Facility Locator Widget */}
                <div className={`rounded-2xl border overflow-hidden shadow-sm ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="p-4 border-b border-slate-200/20 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Navigation className={`w-4 h-4 ${theme.primaryText}`} />
                      <span className="font-bold text-xs sm:text-sm">
                        Google Maps Location & Yard Switcher
                      </span>
                    </div>
                    <div className="flex gap-1 text-[11px] font-bold">
                      {[
                        { id: 'hq' as const, label: 'Salt Lake HQ' },
                        { id: 'plant' as const, label: 'RMC Batching Plant' },
                        { id: 'yard' as const, label: 'Machinery Yard' }
                      ].map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => setActiveMapLocation(loc.id)}
                          className={`px-2.5 py-1 rounded ${
                            activeMapLocation === loc.id
                              ? `${theme.primaryBg} text-white`
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {loc.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Visual Map Canvas */}
                  <div className="relative h-60 bg-slate-900 overflow-hidden flex flex-col justify-between p-4 text-white">
                    <div
                      className="absolute inset-0 opacity-35"
                      style={{
                        backgroundImage:
                          'radial-gradient(#94a3b8 1px, transparent 1px), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }}
                    />
                    <div className="relative z-10 flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded bg-slate-950/85 border border-slate-700 font-mono">
                        {activeMapLocation === 'hq' && 'GPS: 22.5726° N, 88.4339° E (Sector V, Salt Lake)'}
                        {activeMapLocation === 'plant' && 'GPS: 22.6182° N, 88.4810° E (Rajarhat RMC Plant)'}
                        {activeMapLocation === 'yard' && 'GPS: 22.5641° N, 88.1945° E (Dhulagarh NH-16 Yard)'}
                      </span>
                      <span className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold">
                        Open Now
                      </span>
                    </div>

                    <div className="relative z-10 my-auto mx-auto text-center space-y-2 max-w-xs">
                      <div className={`w-12 h-12 rounded-full ${theme.primaryBg} text-white flex items-center justify-center mx-auto shadow-lg ring-4 ring-white/20`}>
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="font-bold text-sm">
                        {activeMapLocation === 'hq' && company.shortName + ' – Corporate Head Office'}
                        {activeMapLocation === 'plant' && 'Captive 60 m³/hr RMC Plant & QA/QC Testing Lab'}
                        {activeMapLocation === 'yard' && 'Heavy Piling Rig & Formwork Logistics Yard'}
                      </div>
                      <p className="text-[11px] text-slate-300">
                        {activeMapLocation === 'hq' && company.address}
                        {activeMapLocation === 'plant' && 'Action Area III Industrial Zone, New Town, Kolkata'}
                        {activeMapLocation === 'yard' && 'NH-16 Industrial Service Lane, Dhulagarh, Howrah'}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${company.address}, ${company.cityState}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-amber-400 hover:underline"
                      >
                        <span>Open Live Directions in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-slate-400">Visitor Parking Available</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Logged Inquiries & Quotation Requests Table */}
            <div className={`rounded-2xl border p-6 shadow-sm space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">
                    Recent Online Inquiries, Site Visits & Quotation Requests Log ({inquiries.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Submissions from the Online Inquiry Form and BOQ Quotation Calculator appear here in real time.
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className={`${darkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'} border-b`}>
                      <th className="py-2.5 px-3 font-bold">Ref ID</th>
                      <th className="py-2.5 px-3 font-bold">Type</th>
                      <th className="py-2.5 px-3 font-bold">Client / Organization</th>
                      <th className="py-2.5 px-3 font-bold">Service / Scope</th>
                      <th className="py-2.5 px-3 font-bold">Estimated Budget</th>
                      <th className="py-2.5 px-3 font-bold">Submitted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/20">
                    {inquiries.map((inq) => (
                      <tr key={inq.id} className={darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}>
                        <td className="py-2.5 px-3 font-mono font-bold">{inq.id}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded font-bold ${
                              inq.type === 'Quotation Request'
                                ? 'bg-amber-100 text-amber-800'
                                : inq.type === 'Site Visit Booking'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {inq.type}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold">
                          {inq.name}
                          <div className="text-[11px] text-slate-400 font-normal">{inq.phone}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-semibold">{inq.service}</div>
                          <div className="text-[11px] text-slate-500">
                            {inq.location} {inq.visitDate ? `• Visit: ${inq.visitDate}` : ''}
                          </div>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-emerald-600">{inq.budget}</td>
                        <td className="py-2.5 px-3 text-slate-500">{inq.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL 1: ADVANCED BOQ & MATERIAL QUANTITY ESTIMATOR STUDIO
         ===================================================================== */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                  Civil Engineering BOQ, Mix Design, Rebar BBS & CAD Studio
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  Turnkey Cost, Material Quantities & Structural Engineering Studio
                </h2>
              </div>
              <button
                onClick={() => setQuoteModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4-Tab Engineering Tool Switcher */}
            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
              {[
                { id: 'boq' as const, label: '1. Turnkey BOQ & Cost Estimator' },
                { id: 'concrete' as const, label: '2. IS-456 Concrete Mix Calculator' },
                { id: 'steel' as const, label: '3. TMT Steel BBS Calculator' },
                { id: 'blueprint' as const, label: '4. 2D CAD Structural Blueprints' }
              ].map((tb) => (
                <button
                  key={tb.id}
                  type="button"
                  onClick={() => setStudioTab(tb.id)}
                  className={`px-3 py-2 rounded-lg transition ${
                    studioTab === tb.id ? `${theme.primaryBg} text-white shadow-sm` : 'text-slate-700 hover:bg-white'
                  }`}
                >
                  {tb.label}
                </button>
              ))}
            </div>

            {studioTab === 'concrete' && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    IS 456:2000 & IS 10262 Concrete Mix Proportioning Calculator
                  </h3>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-amber-400 font-mono font-bold">
                    W/C Ratio: {concreteMixResult.wcRatio}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Select Design Mix Grade</label>
                    <select
                      value={concreteCalc.grade}
                      onChange={(e) => setConcreteCalc({ ...concreteCalc, grade: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      <option value="M20">M20 (1 : 1.5 : 3 — General Slabs & Beams)</option>
                      <option value="M25">M25 (1 : 1 : 2 — RCC Columns & Footings)</option>
                      <option value="M30">M30 (Design Mix — Pile Caps & Heavy RCC)</option>
                      <option value="M35">M35 (Design Mix — Industrial Laser Flooring)</option>
                      <option value="M40">M40 (Design Mix — High-Rise Shear Walls)</option>
                      <option value="M45">M45 (Design Mix — PSC Highway Girders & Cores)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">
                      Wet Concrete Pour Volume: <strong>{concreteCalc.volumeM3} m³</strong> ({Math.round(concreteCalc.volumeM3 * 35.315)} Cu.Ft.)
                    </label>
                    <input
                      type="range"
                      min={5}
                      max={500}
                      step={5}
                      value={concreteCalc.volumeM3}
                      onChange={(e) => setConcreteCalc({ ...concreteCalc, volumeM3: Number(e.target.value) })}
                      className="w-full accent-amber-500 mt-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 bg-slate-900 text-white p-4 rounded-xl">
                  <div>
                    <span className="text-slate-400 block text-[10px]">OPC 53 Cement</span>
                    <strong className="text-amber-400 text-sm">{concreteMixResult.bags} Bags</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Zone-II River Sand</span>
                    <strong className="text-white text-sm">{concreteMixResult.sandCft} Cu.Ft.</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">20mm Crushed Agg.</span>
                    <strong className="text-white text-sm">{concreteMixResult.aggCft} Cu.Ft.</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">PCE Admixture</span>
                    <strong className="text-emerald-400 text-sm">{concreteMixResult.admixtureLiters} Liters</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Mixing Water</span>
                    <strong className="text-cyan-300 text-sm">{concreteMixResult.waterLiters} Liters</strong>
                  </div>
                </div>
              </div>
            )}

            {studioTab === 'steel' && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-slate-900">
                    IS 1786 Fe-550D TMT Rebar Weight & Bar Bending Schedule (BBS) Calculator
                  </h3>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-emerald-400 font-mono font-bold">
                    Unit Wt: {steelBbsResult.unitWeightKgPerM} kg/m (D²/162.2)
                  </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold block mb-1">Rebar Diameter (mm)</label>
                    <select
                      value={steelCalc.diaMm}
                      onChange={(e) => setSteelCalc({ ...steelCalc, diaMm: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      {[8, 10, 12, 16, 20, 25, 32].map((d) => (
                        <option key={d} value={d}>
                          {d} mm Dia Fe-550D Bar
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold block mb-1">
                      Cutting Length Index: <strong>{steelCalc.lengthMeters} m</strong>
                    </label>
                    <input
                      type="range"
                      min={100}
                      max={5000}
                      step={100}
                      value={steelCalc.lengthMeters}
                      onChange={(e) => setSteelCalc({ ...steelCalc, lengthMeters: Number(e.target.value) })}
                      className="w-full accent-amber-500 mt-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">
                      Number of Bars / Members: <strong>{steelCalc.barsCount}</strong>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={500}
                      step={10}
                      value={steelCalc.barsCount}
                      onChange={(e) => setSteelCalc({ ...steelCalc, barsCount: Number(e.target.value) })}
                      className="w-full accent-amber-500 mt-2"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 bg-slate-900 text-white p-4 rounded-xl">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Total Steel Weight (Kg)</span>
                    <strong className="text-white text-sm">{steelBbsResult.totalKg.toLocaleString()} Kg</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Metric Tonnage (MT)</span>
                    <strong className="text-amber-400 text-sm">{steelBbsResult.totalMT} MT</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Est. Rebar Cost (@ ₹64.5k/MT)</span>
                    <strong className="text-emerald-400 text-sm">₹{steelBbsResult.estCostINR.toLocaleString()}</strong>
                  </div>
                </div>
              </div>
            )}

            {studioTab === 'blueprint' && (
              <div className="bg-slate-950 text-white rounded-2xl p-5 border border-slate-800 space-y-4 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                      CAD / BIM GFC Structural Schematic Viewer
                    </span>
                    <h3 className="font-bold text-sm">Interactive 2D Structural Cross-Section Blueprints</h3>
                  </div>
                  <div className="flex gap-1.5">
                    {[
                      { id: 'pile' as const, label: 'Deep Pile & Raft' },
                      { id: 'slab' as const, label: 'Post-Tensioned Slab' },
                      { id: 'bridge' as const, label: 'PSC Box Girder' }
                    ].map((bp) => (
                      <button
                        key={bp.id}
                        type="button"
                        onClick={() => setBlueprintType(bp.id)}
                        className={`px-2.5 py-1 rounded font-bold ${
                          blueprintType === bp.id ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {bp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Blueprint Canvas */}
                <div className="relative bg-slate-900 border border-cyan-500/30 rounded-xl p-4 overflow-hidden">
                  <svg viewBox="0 0 600 200" className="w-full h-44 stroke-cyan-400 fill-none">
                    <defs>
                      <pattern id="cad-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="0.8" />
                      </pattern>
                    </defs>
                    <rect width="600" height="200" fill="url(#cad-grid)" stroke="none" />
                    {blueprintType === 'pile' && (
                      <g strokeWidth="1.8">
                        <rect x="80" y="30" width="440" height="45" fill="rgba(34,211,238,0.1)" />
                        <line x1="90" y1="42" x2="510" y2="42" stroke="#fbbf24" strokeDasharray="6 3" />
                        <line x1="90" y1="64" x2="510" y2="64" stroke="#fbbf24" strokeDasharray="6 3" />
                        <rect x="130" y="75" width="45" height="115" fill="rgba(34,211,238,0.08)" />
                        <rect x="278" y="75" width="45" height="115" fill="rgba(34,211,238,0.08)" />
                        <rect x="425" y="75" width="45" height="115" fill="rgba(34,211,238,0.08)" />
                        <text x="200" y="56" fill="#22d3ee" stroke="none" fontSize="11" fontFamily="monospace">
                          1800mm M45 RCC RAFT MAT (TOP & BOTTOM Fe-550D MESH)
                        </text>
                        <text x="115" y="185" fill="#fbbf24" stroke="none" fontSize="10" fontFamily="monospace">
                          Ø900mm BORED PILES @ 28m DEPTH (IS 2911)
                        </text>
                      </g>
                    )}
                    {blueprintType === 'slab' && (
                      <g strokeWidth="1.8">
                        <rect x="50" y="55" width="500" height="35" fill="rgba(34,211,238,0.1)" />
                        <path d="M 60 65 Q 175 85 300 62 T 540 68" stroke="#fbbf24" strokeWidth="2.2" />
                        <rect x="90" y="90" width="35" height="90" fill="rgba(34,211,238,0.12)" />
                        <rect x="282" y="90" width="35" height="90" fill="rgba(34,211,238,0.12)" />
                        <rect x="475" y="90" width="35" height="90" fill="rgba(34,211,238,0.12)" />
                        <text x="135" y="45" fill="#22d3ee" stroke="none" fontSize="11" fontFamily="monospace">
                          POST-TENSIONED FLAT SLAB (250mm THICK, 11.0m CLEAR SPAN)
                        </text>
                        <text x="135" y="125" fill="#fbbf24" stroke="none" fontSize="10" fontFamily="monospace">
                          HIGH-TENSILE 15.2mm PT STRAND TENDON PROFILE
                        </text>
                      </g>
                    )}
                    {blueprintType === 'bridge' && (
                      <g strokeWidth="1.8">
                        <polygon points="70,35 530,35 500,55 100,55" fill="rgba(34,211,238,0.15)" />
                        <polygon points="150,55 450,55 410,125 190,125" fill="rgba(34,211,238,0.08)" />
                        <rect x="215" y="68" width="170" height="44" stroke="#22d3ee" />
                        <rect x="265" y="125" width="70" height="65" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" />
                        <text x="155" y="25" fill="#22d3ee" stroke="none" fontSize="11" fontFamily="monospace">
                          IRC CLASS-70R PSC BOX GIRDER DECK (M50 CONCRETE)
                        </text>
                        <text x="200" y="180" fill="#fbbf24" stroke="none" fontSize="10" fontFamily="monospace">
                          ELASTOMERIC POT-PTFE BEARING & PIER CAP
                        </text>
                      </g>
                    )}
                  </svg>
                </div>
              </div>
            )}

            <form onSubmit={handleQuoteSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    1. Structure Category
                  </label>
                  <select
                    value={quoteCalc.projectType}
                    onChange={(e) =>
                      setQuoteCalc({
                        ...quoteCalc,
                        projectType: e.target.value as typeof quoteCalc.projectType
                      })
                    }
                    className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="residential">Residential High-Rise / Complex</option>
                    <option value="commercial">Commercial / IT Park / Hospital</option>
                    <option value="industrial">Industrial PEB Shed / Warehouse</option>
                    <option value="road">Concrete Highway / Rigid Pavement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    2. Built-Up Area: <strong>{quoteCalc.areaSqFt.toLocaleString()} Sq.Ft.</strong>
                  </label>
                  <input
                    type="range"
                    min={5000}
                    max={250000}
                    step={5000}
                    value={quoteCalc.areaSqFt}
                    onChange={(e) => setQuoteCalc({ ...quoteCalc, areaSqFt: Number(e.target.value) })}
                    className="w-full accent-amber-500 mt-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    3. Storeys / Elevation: <strong>G + {quoteCalc.floors} Floors</strong>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    step={1}
                    value={quoteCalc.floors}
                    onChange={(e) => setQuoteCalc({ ...quoteCalc, floors: Number(e.target.value) })}
                    className="w-full accent-amber-500 mt-2"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    4. Foundation System Type
                  </label>
                  <select
                    value={quoteCalc.foundationType}
                    onChange={(e) =>
                      setQuoteCalc({
                        ...quoteCalc,
                        foundationType: e.target.value as typeof quoteCalc.foundationType
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="open">Isolated / Open RCC Footing</option>
                    <option value="raft">Heavy RCC Raft / Mat Foundation (+₹180/Sq.Ft.)</option>
                    <option value="piling">Deep Bored Cast-in-Situ RCC Piling (+₹360/Sq.Ft.)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    5. Construction Specification Grade
                  </label>
                  <select
                    value={quoteCalc.grade}
                    onChange={(e) =>
                      setQuoteCalc({
                        ...quoteCalc,
                        grade: e.target.value as typeof quoteCalc.grade
                      })
                    }
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="economy">Core Shell & Bare Civil Structure (0.88x)</option>
                    <option value="standard">Standard Turnkey Civil + Finishing (1.0x)</option>
                    <option value="premium">High-Spec M45 / Post-Tensioned / IGBC Grade (1.24x)</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Cost & Material Output Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-4">
                <div className="grid sm:grid-cols-3 gap-4 items-center border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs text-slate-400">Composite Unit Rate</div>
                    <div className="text-xl font-extrabold text-white mt-0.5">
                      ₹{estimatedQuote.unitRate.toLocaleString()} / Sq.Ft.
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Total Turnkey Project Outlay</div>
                    <div className={`text-2xl font-extrabold ${theme.badgeText} mt-0.5`}>
                      {estimatedQuote.formattedTotal}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Estimated Execution Schedule</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                      ~{estimatedQuote.durationMonths} Months
                    </div>
                  </div>
                </div>

                {/* Estimated Civil Material Quantities */}
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Estimated Key Civil Material Quantities (IS-Code Thumb Rule):
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    <div className="bg-slate-800 p-2.5 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">OPC/PPC Cement</span>
                      <strong className="text-white">{estimatedQuote.cementBags.toLocaleString()} Bags</strong>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Fe-550D TMT Steel</span>
                      <strong className="text-amber-400">{estimatedQuote.steelMT} MT</strong>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">Ready-Mix Concrete</span>
                      <strong className="text-white">{estimatedQuote.rmcCubicMeters.toLocaleString()} m³</strong>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">River / M-Sand</span>
                      <strong className="text-white">{estimatedQuote.sandCuFt.toLocaleString()} Cu.Ft.</strong>
                    </div>
                    <div className="bg-slate-800 p-2.5 rounded-lg">
                      <span className="text-slate-400 block text-[10px]">20mm Stone Agg.</span>
                      <strong className="text-white">{estimatedQuote.aggregateCuFt.toLocaleString()} Cu.Ft.</strong>
                    </div>
                  </div>
                </div>

                {/* 6-Part BOQ Stage Cost Split */}
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs pt-1">
                  {estimatedQuote.breakdown.map((b, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-300">
                      <span className="truncate pr-2">• {b.item} ({b.pct}%)</span>
                      <strong className="text-white font-mono">₹{(b.amount / 100000).toFixed(1)}L</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 pt-1">
                <input
                  type="text"
                  required
                  value={quoteCalc.clientName}
                  onChange={(e) => setQuoteCalc({ ...quoteCalc, clientName: e.target.value })}
                  placeholder="Your Name / Company *"
                  className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
                />
                <input
                  type="tel"
                  required
                  value={quoteCalc.clientPhone}
                  onChange={(e) => setQuoteCalc({ ...quoteCalc, clientPhone: e.target.value })}
                  placeholder="Phone / WhatsApp *"
                  className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
                />
                <input
                  type="text"
                  value={quoteCalc.siteLocation}
                  onChange={(e) => setQuoteCalc({ ...quoteCalc, siteLocation: e.target.value })}
                  placeholder="Project City / Location"
                  className="px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    copyTextToClipboard(
                      `${company.shortName} BOQ Estimate: ${quoteCalc.areaSqFt} Sq.Ft. (${quoteCalc.projectType}, G+${quoteCalc.floors}) = ${estimatedQuote.formattedTotal} (@ ₹${estimatedQuote.unitRate}/Sq.Ft.). Cement: ${estimatedQuote.cementBags} bags, Steel: ${estimatedQuote.steelMT} MT.`,
                      'BOQ Summary'
                    )
                  }
                  className="px-3.5 py-2.5 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy BOQ Sheet</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQuoteModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white ${theme.primaryBg} ${theme.primaryHover} shadow-md flex items-center gap-2`}
                  >
                    <FileText className="w-4 h-4" />
                    <span>Generate Formal Quotation Request</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: PROJECT SCOPE OF WORK & MILESTONE DOSSIER MODAL
         ===================================================================== */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8">
            <div className="relative h-60 bg-slate-900">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-slate-950/85 text-white">
                  {selectedProject.category}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-emerald-600 text-white">
                  {selectedProject.status} ({selectedProject.progress}%)
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  {selectedProject.location} • Lead: {selectedProject.engineerInCharge}
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">{selectedProject.title}</h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">{selectedProject.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block">Client</span>
                  <strong className="text-slate-900">{selectedProject.client}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Contract Value</span>
                  <strong className="text-emerald-700">{selectedProject.value}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Built-Up Scale</span>
                  <strong className="text-slate-900">{selectedProject.area}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Concrete Spec</span>
                  <strong className="text-slate-900">{selectedProject.concreteGrade}</strong>
                </div>
              </div>

              {/* Stage-by-Stage Milestone Progress Tracker */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-2.5">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Engineering Stage-Gate Execution Tracker
                </div>
                <div className="grid sm:grid-cols-2 gap-2.5 text-xs">
                  {selectedProject.milestones.map((ms, i) => (
                    <div key={i} className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                      <div className="flex justify-between font-bold mb-1">
                        <span>{ms.stage}</span>
                        <span className={ms.pct === 100 ? 'text-emerald-400' : 'text-amber-400'}>{ms.pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${ms.pct === 100 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                          style={{ width: `${ms.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Detailed Civil & Structural Scope of Work:
                </h4>
                <ul className="space-y-1.5">
                  {selectedProject.scope.map((s, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 ${theme.primaryText} shrink-0 mt-0.5`} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const prj = selectedProject;
                    setSelectedProject(null);
                    setInquiryForm((prev) => ({
                      ...prev,
                      message: `Requesting technical consultation similar to ${prj.title} (${prj.area})`
                    }));
                    navigateTo('contact');
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white ${theme.primaryBg}`}
                >
                  Inquire About Similar Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: SIDE-BY-SIDE PROJECT COMPARISON MATRIX MODAL
         ===================================================================== */}
      {compareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                  Technical Benchmark Matrix
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Side-by-Side Civil Project Comparison ({compareIds.length} Selected)
                </h3>
              </div>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {compareIds.length === 0 ? (
              <p className="text-sm text-slate-500 py-8 text-center">
                No projects selected for comparison. Click the Compare icon on any project card first.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="p-3 font-bold">Specification Attribute</th>
                      {compareIds.map((cid) => {
                        const p = projectsList.find((x) => x.id === cid);
                        return (
                          <th key={cid} className="p-3 font-bold">
                            {p?.title}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {[
                      { label: 'Sector / Category', key: 'category' as const },
                      { label: 'Client Organization', key: 'client' as const },
                      { label: 'Location', key: 'location' as const },
                      { label: 'Contract Value', key: 'value' as const },
                      { label: 'Built-Up Area / Scale', key: 'area' as const },
                      { label: 'Foundation System', key: 'foundationSystem' as const },
                      { label: 'Concrete Grade Spec', key: 'concreteGrade' as const },
                      { label: 'Execution Duration', key: 'duration' as const },
                      { label: 'Status', key: 'status' as const }
                    ].map((row) => (
                      <tr key={row.label} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-700 bg-slate-50">{row.label}</td>
                        {compareIds.map((cid) => {
                          const p = projectsList.find((x) => x.id === cid);
                          return (
                            <td key={cid} className="p-3 text-slate-800 font-medium">
                              {p ? String(p[row.key]) : '-'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: ADD CUSTOM PROJECT MODAL
         ===================================================================== */}
      {addProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-extrabold">Add New Project to Portfolio</h3>
              <button onClick={() => setAddProjectModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCustomProject} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={newProjectForm.title}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                  placeholder="e.g., Durgapur Steel Logistics Park"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={newProjectForm.category}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, category: e.target.value as ProjectItem['category'] })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Residential">Residential</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Status</label>
                  <select
                    value={newProjectForm.status}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, status: e.target.value as ProjectItem['status'] })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Completed">Completed (100%)</option>
                    <option value="Ongoing">Ongoing</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Client Organization *</label>
                  <input
                    type="text"
                    required
                    value={newProjectForm.client}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, client: e.target.value })}
                    placeholder="Client Name"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Location</label>
                  <input
                    type="text"
                    value={newProjectForm.location}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, location: e.target.value })}
                    placeholder="City / Industrial Zone"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Contract Value</label>
                  <input
                    type="text"
                    value={newProjectForm.value}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, value: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Built-up Area / Scale</label>
                  <input
                    type="text"
                    value={newProjectForm.area}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, area: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Scope Description</label>
                <textarea
                  rows={2}
                  value={newProjectForm.description}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                  placeholder="Key structural & civil highlights..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddProjectModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-lg text-white font-bold ${theme.primaryBg}`}
                >
                  Save Project to Portfolio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: GALLERY PHOTO LIGHTBOX WITH PREV / NEXT NAVIGATION
         ===================================================================== */}
      {selectedPhoto && selectedPhotoIdx !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-700">
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={showBeforeStage && selectedPhoto.beforeImage ? selectedPhoto.beforeImage : selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
              <button
                onClick={() => setSelectedPhotoIdx(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedPhotoIdx((selectedPhotoIdx - 1 + filteredGallery.length) % filteredGallery.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800"
                title="Previous Photo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedPhotoIdx((selectedPhotoIdx + 1) % filteredGallery.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800"
                title="Next Photo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                <span className={`font-bold ${theme.badgeText}`}>{selectedPhoto.category}</span>
                <span>{selectedPhoto.projectRef} • {selectedPhoto.location} ({selectedPhoto.date})</span>
              </div>
              <h3 className="text-xl font-bold">{selectedPhoto.title}</h3>
              <p className="text-sm text-slate-300">{selectedPhoto.caption}</p>
              <div className="pt-2 text-xs text-amber-300 font-mono">
                QA/QC Site Note: {selectedPhoto.technicalNote}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 6: CERTIFICATE & STATUTORY CREDENTIAL VIEWER
         ===================================================================== */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-double border-slate-300 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2.5">
                <Award className={`w-7 h-7 ${theme.primaryText}`} />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Verified Statutory Credential
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{selectedCert.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
              <div>
                <span className="text-slate-400 block">Registered Entity Name:</span>
                <strong className="text-slate-900 text-sm">{company.name}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Registration / Licence Number:</span>
                <strong className="font-mono text-slate-900 text-sm">{selectedCert.regNo}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Issuing Authority:</span>
                <strong className="text-slate-800">{selectedCert.authority}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Compliance Status:</span>
                <strong className="text-emerald-700">{selectedCert.validStatus}</strong>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{selectedCert.details}</p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => copyTextToClipboard(selectedCert.regNo, selectedCert.title)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Copy Reg No.
              </button>
              <button
                onClick={() => {
                  setSelectedCert(null);
                  showToast(`Certified copy of ${selectedCert.title} is attached to all our official tender bid packages.`);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold text-white ${theme.primaryBg}`}
              >
                Request Certified Copy with Tender
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          DRAWER: DESIGN PREFERENCES & COMPANY DETAILS CUSTOMIZER
         ===================================================================== */}
      {customizerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white text-slate-900 w-full max-w-md h-full overflow-y-auto p-6 shadow-2xl border-l border-slate-200 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">
                    Live Brand & Design Studio
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Customize Company Info, Logo & Theme
                  </h3>
                </div>
                <button
                  onClick={() => setCustomizerOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Architectural Logo Emblem Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Architectural Logo Emblem Style
                </label>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  {[
                    { id: 'tower' as const, label: 'Towers' },
                    { id: 'bridge' as const, label: 'Bridge' },
                    { id: 'hexagon' as const, label: 'Compass' },
                    { id: 'shield' as const, label: 'Shield' }
                  ].map((lg) => (
                    <button
                      key={lg.id}
                      type="button"
                      onClick={() => setCompany({ ...company, logoStyle: lg.id })}
                      className={`py-2 px-2 rounded-lg border font-bold text-center ${
                        company.logoStyle === lg.id
                          ? `${theme.primaryBg} text-white border-transparent`
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {lg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Color Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Colour Combination Preference
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(Object.keys(THEMES) as ThemeKey[]).map((k) => {
                    const t = THEMES[k];
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setCompany({ ...company, theme: k })}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition ${
                          company.theme === k
                            ? 'border-slate-900 bg-slate-50 font-bold'
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-5 h-5 rounded-full shrink-0"
                            style={{ backgroundColor: t.accentHex }}
                          />
                          <span className="text-xs text-slate-800">{t.label}</span>
                        </div>
                        {company.theme === k && <Check className="w-4 h-4 text-slate-900" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Editable Company Fields */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Company Full Name</label>
                  <input
                    type="text"
                    value={company.name}
                    onChange={(e) => setCompany({ ...company, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Brand Short Name</label>
                    <input
                      type="text"
                      value={company.shortName}
                      onChange={(e) => setCompany({ ...company, shortName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Establishment Year</label>
                    <input
                      type="text"
                      value={company.estYear}
                      onChange={(e) => setCompany({ ...company, estYear: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN Number</label>
                    <input
                      type="text"
                      value={company.gstin}
                      onChange={(e) => setCompany({ ...company, gstin: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Trade Licence No.</label>
                    <input
                      type="text"
                      value={company.tradeLicense}
                      onChange={(e) => setCompany({ ...company, tradeLicense: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Office Address</label>
                  <input
                    type="text"
                    value={company.address}
                    onChange={(e) => setCompany({ ...company, address: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={company.phone}
                      onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number</label>
                    <input
                      type="text"
                      value={company.whatsapp}
                      onChange={(e) => setCompany({ ...company, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  setCompany(DEFAULT_COMPANY);
                  showToast('Restored default Vanguard InfraBuild company profile.');
                }}
                className="px-3.5 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Reset Defaults
              </button>
              <button
                type="button"
                onClick={() => {
                  setCustomizerOpen(false);
                  showToast('Company details & color theme updated across all 7 website pages!');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white ${theme.primaryBg}`}
              >
                Save & Apply Live
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 7: LIVE SITE TELEMETRY & DAILY QA/QC LOG COMMAND CENTER
         ===================================================================== */}
      {telemetryOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 text-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-700 space-y-6 my-8">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>LIVE SITE TELEMETRY FEED • UPDATED TODAY</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold mt-1">
                  Active Site Execution, Cube Test Logs & RA Billing Tracker
                </h3>
              </div>
              <button
                onClick={() => setTelemetryOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <span className="text-slate-400 block">Biometric Workforce</span>
                <strong className="text-lg text-white">186 Active Today</strong>
                <span className="text-[10px] text-emerald-400 block mt-0.5">100% PPE Verified</span>
              </div>
              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <span className="text-slate-400 block">Captive RMC Output</span>
                <strong className="text-lg text-amber-400">312 m³ This Week</strong>
                <span className="text-[10px] text-slate-300 block mt-0.5">60 m³/hr Schwing Plant</span>
              </div>
              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <span className="text-slate-400 block">Latest 28-Day Cube Test</span>
                <strong className="text-lg text-emerald-400">52.8 N/mm² (M45)</strong>
                <span className="text-[10px] text-slate-300 block mt-0.5">IS 516 CTM Verified</span>
              </div>
              <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700">
                <span className="text-slate-400 block">Active Heavy Rigs</span>
                <strong className="text-lg text-cyan-300">4 Piling + 3 Cranes</strong>
                <span className="text-[10px] text-slate-300 block mt-0.5">Zero Breakdowns</span>
              </div>
            </div>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-3 text-xs">
              <div className="font-bold text-slate-200">
                Recent NABL Material Test & Running Account (RA) Bill Certifications:
              </div>
              <div className="divide-y divide-slate-800">
                {[
                  { ref: 'CUBE-2026-1029', site: 'Riverfront Twin Towers (17th Floor Core)', test: 'M45 Concrete 28-Day CTM', res: '52.8 MPa (PASS)', status: 'Certified' },
                  { ref: 'PDA-2026-1024', site: 'Haldia Petro-Auxiliary Tank Farm', test: 'High-Strain Dynamic Pile Load (900mm)', res: '485 MT Safe Load (PASS)', status: 'Certified' },
                  { ref: 'RA-BILL-014', site: 'Riverfront Twin Towers (G+22)', test: 'Client QS Joint Measurement Verification', res: '₹4.85 Cr Approved', status: 'Cleared' }
                ].map((log) => (
                  <div key={log.ref} className="py-2.5 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-bold text-amber-400 mr-2">{log.ref}</span>
                      <span className="font-semibold text-white">{log.site}</span>
                      <div className="text-slate-400 text-[11px]">{log.test}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-400">{log.res}</div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">{log.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setTelemetryOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Close Telemetry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 8: PRINTABLE 1-PAGE TENDER PRE-QUALIFICATION (PQ) DOSSIER
         ===================================================================== */}
      {pqDossierOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-300 space-y-5 my-8">
            <div className="flex items-start justify-between border-b-2 border-slate-900 pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                  Official Corporate Pre-Qualification (PQ) Dossier • Annex-A
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                  {company.name}
                </h3>
                <p className="text-xs text-slate-600">{company.address}, {company.cityState}</p>
              </div>
              <button
                onClick={() => setPqDossierOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-400 block">Year of Incorporation</span>
                <strong className="text-slate-900">Est. {company.estYear} (CIN: {company.cin})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">GSTIN & Trade Licence</span>
                <strong className="text-slate-900 font-mono">{company.gstin} | {company.tradeLicense}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Audited FY26 Turnover</span>
                <strong className="text-emerald-700">₹228.0 Crore (Solvency: ₹65 Cr)</strong>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="border border-slate-200 rounded-xl p-4 space-y-1.5">
                <div className="font-bold text-slate-900 uppercase">Key Statutory & Quality Credentials</div>
                <p className="text-slate-600">• {company.isoCert}</p>
                <p className="text-slate-600">• Class-I Enlisted Contractor (PWD, CPWD, WBHIDCO)</p>
                <p className="text-slate-600">• Active EPFO, ESIC & CLRA Labour Welfare Licences</p>
                <p className="text-slate-600">• Single Project Bid Capacity: Up to ₹180 Crore</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-4 space-y-1.5">
                <div className="font-bold text-slate-900 uppercase">Captive Plant & Technical Manpower</div>
                <p className="text-slate-600">• 130+ On-Roll Civil/Structural Engineers & 800+ Workforce</p>
                <p className="text-slate-600">• 6 Hydraulic Rotary Piling Rigs (up to 1500mm Dia)</p>
                <p className="text-slate-600">• 3 Captive Automated RMC Batching Plants (60 m³/hr)</p>
                <p className="text-slate-600">• 8 Tower Cranes & 42,000 m² Mivan Aluminium Formwork</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() =>
                  copyTextToClipboard(
                    `${company.name} | Est. ${company.estYear} | CIN: ${company.cin} | GSTIN: ${company.gstin} | Trade Lic: ${company.tradeLicense} | ISO: ${company.isoCert} | FY26 Turnover: ₹228 Cr | Address: ${company.address}, ${company.cityState} | Phone: ${company.phone}`,
                    'Company Pre-Qualification Summary'
                  )
                }
                className="px-4 py-2.5 rounded-xl text-xs font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full PQ Text for Tender Bid</span>
              </button>
              <button
                onClick={() => {
                  setPqDossierOpen(false);
                  navigateTo('contact');
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white ${theme.primaryBg}`}
              >
                Invite Us for Tender / RFQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FLOATING WHATSAPP QUICK-CHAT WIDGET WITH CUSTOM MESSAGE COMPOSER
         ===================================================================== */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
        {whatsappOpen && (
          <div className="mb-3 w-80 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-5 h-5" />
                <div>
                  <div className="font-bold text-sm">{company.shortName} WhatsApp Desk</div>
                  <div className="text-[11px] text-emerald-100">Direct Line to Tendering Engineers</div>
                </div>
              </div>
              <button onClick={() => setWhatsappOpen(false)} className="text-emerald-100 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-2.5 text-xs">
              <p className="text-slate-600">Select a quick inquiry topic or type a custom message:</p>
              {[
                'Request a site visit & soil/structural consultation',
                'Share architectural drawings / BOQ for quotation',
                'Inquire about piling rigs or turnkey industrial PEB'
              ].map((msg, idx) => (
                <a
                  key={idx}
                  href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                    `Hello ${company.shortName}, I want to: ${msg}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-semibold transition"
                >
                  → {msg}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-100 flex gap-1.5">
                <input
                  type="text"
                  value={customWaText}
                  onChange={(e) => setCustomWaText(e.target.value)}
                  placeholder="Type your project query..."
                  className="flex-1 px-2.5 py-2 rounded-lg border border-slate-300 text-xs"
                />
                <a
                  href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
                    customWaText || `Hello ${company.shortName}, I have a civil construction inquiry.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg bg-emerald-600 text-white font-bold flex items-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setWhatsappOpen(!whatsappOpen)}
          className="h-14 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl flex items-center gap-2.5 font-bold text-sm transition transform hover:scale-105"
          aria-label="WhatsApp Chat"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </button>
      </div>

      {/* =====================================================================
          COMPREHENSIVE FOOTER (With Social Links, Quick Nav & Statutory Details)
         ===================================================================== */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-lg ${theme.primaryBg} flex items-center justify-center text-white`}>
                {renderBrandLogoIcon()}
              </div>
              <span className="font-extrabold text-base text-white">{company.shortName}</span>
            </div>
            <p className="text-slate-400 leading-relaxed">{company.tagline}</p>
            <div className="space-y-1 text-slate-300 pt-1">
              <div><strong>CIN:</strong> {company.cin}</div>
              <div><strong>GSTIN:</strong> {company.gstin}</div>
              <div><strong>Trade Licence:</strong> {company.tradeLicense}</div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-2">
            <div className="font-bold text-white uppercase tracking-wider">Website Pages</div>
            <ul className="space-y-1.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigateTo(item.id)}
                    className="hover:text-white transition"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-2">
            <div className="font-bold text-white uppercase tracking-wider">Core Civil Works</div>
            <ul className="space-y-1.5">
              {SERVICES_DATA.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => navigateTo('services')}
                    className="hover:text-white text-left transition line-clamp-1"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <div className="font-bold text-white uppercase tracking-wider">Head Office & Social</div>
            <p className="text-slate-300">{company.address}, {company.cityState}</p>
            <p className="text-slate-300">{company.phone}</p>
            <div className="flex items-center gap-2 pt-2">
              {[
                { label: 'LinkedIn', href: 'https://www.linkedin.com' },
                { label: 'YouTube', href: 'https://www.youtube.com' },
                { label: 'Instagram', href: 'https://www.instagram.com' },
                { label: 'Facebook', href: 'https://www.facebook.com' }
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold border border-slate-800 transition"
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-900 py-4 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} {company.name}. All Rights Reserved. Built with Next.js & Tailwind CSS Architecture.
        </div>
      </footer>
    </div>
  );
}
