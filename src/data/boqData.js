export const structuredBOQ = [
    {
        category: 'Flooring',
        items: [
            {
                code: 'FL-01',
                description: 'Vitrified Tile Flooring (600x600mm)',
                unit: 'SQFT',
                minRate: 150,
                typRate: 180,
                maxRate: 220,
                brands: ['Kajaria', 'Somany', 'Simpolo'],
                notes: 'Includes 1:4 cement mortar bedding and spacer grouting.'
            },
            {
                code: 'FL-02',
                description: 'Nylon 6 Carpet Tiles',
                unit: 'SQFT',
                minRate: 85,
                typRate: 110,
                maxRate: 150,
                brands: ['Interface', 'Shaw', 'Unitex'],
                notes: 'Pressure sensitive adhesive installation.'
            },
            {
                code: 'FL-03',
                description: 'Engineered Wood Flooring',
                unit: 'SQFT',
                minRate: 350,
                typRate: 450,
                maxRate: 600,
                brands: ['Pergo', 'Span', 'Action Tesa'],
                notes: 'Includes underlayment and transition profiles.'
            }
        ]
    },
    {
        category: 'Partitions',
        items: [
            {
                code: 'PT-01',
                description: '10mm Toughened Glass Partition',
                unit: 'SQFT',
                minRate: 650,
                typRate: 750,
                maxRate: 900,
                brands: ['Saint Gobain', 'ModiGuard'],
                notes: 'Includes top and bottom aluminum channels and silicone filling.'
            },
            {
                code: 'PT-02',
                description: 'Full height Gypsum Partition (Twin Skin)',
                unit: 'SQFT',
                minRate: 180,
                typRate: 210,
                maxRate: 250,
                brands: ['Gyproc', 'USG Boral'],
                notes: 'Includes GI framework and glass wool insulation.'
            }
        ]
    },
    {
        category: 'Ceiling',
        items: [
            {
                code: 'CL-01',
                description: 'Mineral Fiber Grid Ceiling (600x600)',
                unit: 'SQFT',
                minRate: 95,
                typRate: 110,
                maxRate: 135,
                brands: ['Armstrong', 'USG Boral'],
                notes: 'Includes 15mm silhouette grid system.'
            },
            {
                code: 'CL-02',
                description: 'Gypsum Board False Ceiling',
                unit: 'SQFT',
                minRate: 110,
                typRate: 130,
                maxRate: 160,
                brands: ['Gyproc'],
                notes: 'Includes perimeter channels and finishing with putty.'
            }
        ]
    }
];

export const projectTypologies = [
    {
        name: 'Standard Office',
        elements: ['FL-02', 'PT-01', 'PT-02', 'CL-01'],
        quantitiesPerSqft: {
            'FL-02': 1.0,  // 100% carpet
            'PT-01': 0.15, // Approx glass partition area
            'PT-02': 0.2,  // Approx gypsum partition area
            'CL-01': 1.0   // 100% ceiling
        }
    },
    {
        name: 'Premium Experience Center',
        elements: ['FL-03', 'PT-01', 'CL-02'],
        quantitiesPerSqft: {
            'FL-03': 1.0,
            'PT-01': 0.25,
            'CL-02': 1.0
        }
    }
];
