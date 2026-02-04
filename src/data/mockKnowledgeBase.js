export const knowledgeBase = [
  {
    id: 'doc-001',
    title: 'Archway Design Standards 2024: Workspace Zoning',
    category: 'Design Planning',
    content: `
      Zoning and Circulation:
      - Main corridors: Minimum 1500mm width for high traffic zones (Reception to Cafeteria).
      - Secondary aisles: Minimum 1200mm between workstation clusters.
      - Fire Exit Paths: Must differ by region but generally >1200mm clear width.
      
      Acoustic Zoning:
      - EXECUTIVE ZONES must be acoustically separated from BREAKOUT ZONES.
      - Use baffled ceilings (NRC > 0.8) in open office areas.
      - Meeting rooms require STC 45+ partitions.
    `,
    tags: ['zoning', 'circulation', 'acoustics', 'corridor', 'meeting room', 'fire exit'],
    version: '1.2'
  },
  {
    id: 'doc-005',
    title: 'Lighting & Ambiance Guidelines',
    category: 'Design Planning',
    content: `
      Lux Levels (Target):
      - Workstations: 350-500 Lux at desk height.
      - Corridors: 150 Lux.
      - Meeting Rooms: 500 Lux (dimmable).
      
      Color Temperature:
      - Work areas: 4000K (Cool White).
      - Breakout/Relaxation: 3000K (Warm White).
    `,
    tags: ['lighting', 'lux', 'ambiance', 'color temperature', 'standards'],
    version: '1.0'
  },
  {
    id: 'doc-002',
    title: 'Approved BOQ Rates - Q1 2025 (India Region)',
    category: 'BOQ & Costing',
    content: `
      Flooring Works:
      - Vitrified Tile (600x600, Kajaria/Somany): ₹150 - ₹220 / sqft (Material Only).
      - Carpet Tiles (Nylon 6, Interface/Shaw): ₹85 - ₹150 / sqft.
      - Vinyl Flooring (2mm, LG/Gerflor): ₹75 - ₹120 / sqft.
      
      Civil Works:
      - Brickwork (4.5"): ₹80 / sqft.
      - Plastering (12mm): ₹45 / sqft.
    `,
    tags: ['boq', 'rates', 'flooring', 'civil', 'cost', 'tile', 'carpet'],
    version: '2.1'
  },
  {
    id: 'doc-006',
    title: 'Glass Partition Cost Sheet',
    category: 'BOQ & Costing',
    content: `
      Partitions:
      - Toughened Glass (10mm, Patch Fitting): ₹650 - ₹850 / sqft (Supply + Install).
      - Toughened Glass (12mm, Patch Fitting): ₹850 - ₹1100 / sqft.
      - Acoustic Glazed Partition (Double Glazed): ₹1800 - ₹2500 / sqft.
      - Frosted Film application: ₹45 / sqft.
    `,
    tags: ['partition', 'glass', 'cost', 'rates', 'boq'],
    version: '2.0'
  },
  {
    id: 'doc-003',
    title: 'Standard Finishes Compilation v4',
    category: 'Elements Library',
    content: `
      Wood Finishes:
      - Natural Walnut Veneer: Archway Std Polish #402 (Matte).
      - Oak Veneer: Light Oak Wash #104.
      - Laminates: 1mm Merino/Greenlam, suede finish for internal cabinetry.
      
      Paints:
      - General Walling: Royal Emulsion (Asian Paints), Low VOC.
      - Ceiling (Exposed): RAL 7016 (Anthracite Grey) or Black.
    `,
    tags: ['finishes', 'wood', 'veneer', 'laminate', 'paint', 'materials'],
    version: '4.0'
  },
  {
    id: 'doc-007',
    title: 'Ceiling Systems Specification',
    category: 'Elements Library',
    content: `
      Grid Ceiling:
      - 600x600 Mineral Fiber Tile (Armstrong/Daikin).
      - 15mm Micro-look grid.
      - NRC 0.7 minimum.
      
      Baffle Ceiling:
      - Polyester Fiber Baffles (100mm depth, 50mm width).
      - Spacing: 300mm c/c.
    `,
    tags: ['ceiling', 'grid', 'baffle', 'specification', 'elements'],
    version: '1.5'
  },
  {
    id: 'doc-004',
    title: 'Internal SOPs: Proposal & Documentation',
    category: 'SOPs & Ops',
    content: `
      Proposal Structure:
      1. Cover Page (Project Name, Date, Version).
      2. Executive Summary.
      3. Design Concept (Moodboards, Layouts).
      4. Commercial Offer (Summary + Detailed BOQ).
      5. Timeline & Exclusions.
      
      File Naming Convention:
      - PROJ_Year_Type_Version (e.g., ARCH_2025_Proposal_v1).
    `,
    tags: ['sop', 'proposal', 'documentation', 'naming'],
    version: '1.1'
  },
  {
    id: 'doc-008',
    title: 'Site Measurement & QA Checklist',
    category: 'SOPs & Ops',
    content: `
      Pre-Design Site Survey:
      - Measure all clear heights (Beam bottom vs Slab bottom).
      - Locate all existing electrical points and HVAC ducts.
      - Check for wall dampness or structural cracks.
      
      QA During Execution:
      - partition framing check before cladding.
      - Level check for flooring sub-base.
    `,
    tags: ['site', 'measurement', 'survey', 'qa', 'quality', 'checklist'],
    version: '1.0'
  },
  {
    id: 'doc-009',
    title: 'Standard Office Furniture Dimensions 2025',
    category: 'Design Planning',
    content: `
      Desks and Workstations:
      - Standard Width: 1200mm to 1800mm (4ft to 6ft).
      - Standard Depth: 600mm to 750mm (2ft to 2.5ft).
      - Fixed Height: 750mm.
      - Standing Desk Range: 600mm to 1250mm.
      
      Ergonomic Chairs:
      - Seat Height: 400mm to 530mm.
      - Seat Width: Minimum 450mm.
      - Armrest Gap: 480mm to 660mm.
      
      Meeting Tables:
      - 6-Person Table: 1800mm x 900mm.
      - 10-Person Table: 3000mm x 1200mm.
    `,
    tags: ['furniture', 'dimensions', 'desk', 'chair', 'meeting table', 'ergonomics'],
    version: '2025.1'
  },
  {
    id: 'doc-010',
    title: 'National Building Code (NBC) India 2016: Fire Safety',
    category: 'SOPs & Ops',
    content: `
      Fire Safety Requirements (Group E - Business):
      - External Staircase Width: Minimum 1250mm for business buildings.
      - Internal Corridor Width: Minimum 1500mm for high occupancy.
      - Final Discharge Exit: Minimum 2000mm clear width.
      - Compartmentation: Building should be divided into fire-resistant sections using 2-hour rated walls.
      - Refuge Area: Required for buildings above 24m height, at every 7th floor.
      
      Fire Protection Systems:
      - Sprinklers: Mandatory for basement parking and high-rise offices.
      - Fire Alarms: Addressable systems preferred for large campuses.
    `,
    tags: ['nbc', 'india', 'fire safety', 'staircase', 'exit', 'code', 'regulation'],
    version: 'NBC-2016'
  },
  {
    id: 'doc-011',
    title: 'Modern Office Zoning & Space Allocation 2025',
    category: 'Design Planning',
    content: `
      Space Allocation per Employee:
      - High Density: 100 sqft per person.
      - Standard: 150 sqft per person.
      - Premium: 250 sqft per person.
      
      Circulation Rules:
      - Main Access Paths: 1500mm to 1800mm wide.
      - Between Desk Rows: 900mm to 1200mm wide.
      - Chair Clearance: Minimum 900mm behind the desk to allow movement.
    `,
    tags: ['zoning', 'space planning', 'circulation', 'occupancy', 'square feet', 'employee'],
    version: '2025.2'
  }
];

export const mockChatHistory = [
  {
    id: 'chat-1',
    title: 'Office Layout Planning',
    date: '2025-05-10',
    messages: []
  }
];
