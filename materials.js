// Materials dataset (global) — defined as window.MATERIALS so the site works
// when opened locally (file://) and when hosted remotely.
//
// rho: density in kg/m³
// E: Young's modulus in GPa
// usdkg: approximate cost in USD per kg
// src: array of sources where the information came from

window.MATERIALS = [
  {
    id: "steel_mild",
    name: "Steel (mild)",
    cat: "Metals",
    rho: 7850,
    E: 210, // CORRECTED: was 200 GPa, should be 210 GPa
    usdkg: 1.2,
    src: [
      "K Metals (2024) - Mild Steel Properties: Density 7850 kg/m³, Modulus of Elasticity 210 GPa",
      "Engineering ToolBox - Steel: General Properties",
      "Metals4u Technical Guide - Mild Steel: 210 GPa Young's Modulus",
    ],
  },

  {
    id: "steel_stainless",
    name: "Steel (stainless 304)",
    cat: "Metals",
    rho: 8000,
    E: 193,
    usdkg: 3.8,
    src: [
      "ASSDA Stainless Steel Grade 304: Density 8000 kg/m³, Elastic modulus 193 GPa",
      "SS Malloys (2025) - Stainless Steel 304: 7930 kg/m³, 193 GPa",
      "Atlas Steels 304 Grade Datasheet",
    ],
  },

  {
    id: "al_6061",
    name: "Aluminium (6061)",
    cat: "Metals",
    rho: 2700,
    E: 69,
    usdkg: 4.8,
    src: [
      "TZR Metal - 6061 vs 7075 Comparison: Density 2700 kg/m³, Young's Modulus 68.9 GPa",
      "Chalco Aluminum - 6061 Aluminum Alloy: 2.7 g/cm³, 68.9 GPa",
      "Make It From material database - 6061-T6 Aluminum",
    ],
  },

  {
    id: "al_7075",
    name: "Aluminium (7075)",
    cat: "Metals",
    rho: 2810,
    E: 72,
    usdkg: 7.5,
    src: [
      "TZR Metal - 7075 vs 6061 Comparison: Density 2810 kg/m³, Young's Modulus 71.7 GPa",
      "Chalco Aluminum - 7075 Aluminum Alloy Properties",
      "Make It From material database - 7075-T6 Aluminum",
    ],
  },

  {
    id: "cast_iron",
    name: "Cast iron",
    cat: "Metals",
    rho: 7200,
    E: 110,
    usdkg: 1.5,
    src: [
      "Beam Dimensions - Gray Cast Irons ASTM Class 35: 7150 kg/m³, 114 GPa",
      "Make It From - Ductile Cast Iron: 170 GPa typical",
      "MatWeb - Cast Iron Overview: density 7230 kg/m³ average",
    ],
  },

  {
    id: "copper",
    name: "Copper",
    cat: "Metals",
    rho: 8960,
    E: 110,
    usdkg: 10.5,
    src: [
      "MatWeb - Copper (C11000): Density 8960 kg/m³, Young's Modulus 110 GPa",
      "Part Mfg - Copper Properties: 110 GPa elastic modulus",
      "Alumeco - Pure Copper: 8.9 g/cm³ density, 110 GPa modulus",
    ],
  },

  {
    id: "brass",
    name: "Brass",
    cat: "Metals",
    rho: 8500,
    E: 100,
    usdkg: 9.0,
    src: [
      "MatWeb/Alumeco - Brass (CW614N): 8470 kg/m³, 97-110 GPa",
      "Sequoia Brass & Copper - C36000 Brass: 117 GPa elastic modulus",
      "Australia Wright - C26000 70-30 Brass: 110 GPa @ 20°C",
    ],
  },

  {
    id: "bronze",
    name: "Bronze",
    cat: "Metals",
    rho: 8800,
    E: 110,
    usdkg: 11.5,
    src: [
      "Alumeco - Bronze (CC493K): 8830 kg/m³, 101-120 GPa",
      "Part Mfg - Bronze vs Copper: 95-120 GPa elastic modulus range",
      "Wikipedia - Bronze elastic properties",
    ],
  },

  {
    id: "titanium",
    name: "Titanium (Grade 5)",
    cat: "Metals",
    rho: 4430,
    E: 114,
    usdkg: 45,
    src: [
      "Bach Industry - Ti-6Al-4V Grade 5: Density 4.43 g/cm³, Young's Modulus 114 GPa",
      "Kyocera SGS Tool - Grade 5 Titanium: 4.43 g/cm³, 114 GPa",
      "Make It From - Grade 5 Ti-6Al-4V: 110 GPa typical range",
    ],
  },

  {
    id: "magnesium",
    name: "Magnesium (AZ31)",
    cat: "Metals",
    rho: 1770,
    E: 45,
    usdkg: 9.5,
    src: [
      "Beam Dimensions - Magnesium AZ31B: 1770 kg/m³, 45 GPa",
      "Make It From - AZ31B Magnesium: 45 GPa Young's Modulus",
      "AZoM - Magnesium AZ31B Alloy: 1.77 g/cm³, 45 GPa",
    ],
  },

  {
    id: "zinc",
    name: "Zinc",
    cat: "Metals",
    rho: 7140,
    E: 108,
    usdkg: 3.2,
    src: [
      "MatWeb - Zinc: 7140 kg/m³ density, 100-110 GPa range",
      "Engineering ToolBox - Zinc properties database",
      "Standard material property tables",
    ],
  },

  {
    id: "nickel",
    name: "Nickel",
    cat: "Metals",
    rho: 8900,
    E: 200,
    usdkg: 22,
    src: [
      "Special Metals - Nickel 200: 8900 kg/m³, 207 GPa @ 20°C",
      "Australia Wright Alloys - Nickel: 8110-8470 kg/m³, 200-214 GPa",
      "NIST Metal Properties Database - Pure Nickel",
    ],
  },

  {
    id: "lead",
    name: "Lead",
    cat: "Metals",
    rho: 11340,
    E: 16,
    usdkg: 3.0,
    src: [
      "MatWeb - Lead: 11340 kg/m³, 16 GPa",
      "Engineering ToolBox - Lead mechanical properties",
      "ASTM standards for lead",
    ],
  },

  {
    id: "tin",
    name: "Tin",
    cat: "Metals",
    rho: 7310,
    E: 50,
    usdkg: 30,
    src: [
      "MatWeb - Tin: 7310 kg/m³, 50 GPa typical",
      "Engineering ToolBox - Tin properties",
      "CRC Materials Science and Engineering Handbook",
    ],
  },

  {
    id: "tungsten",
    name: "Tungsten",
    cat: "Metals",
    rho: 19250,
    E: 400,
    usdkg: 85,
    src: [
      "Takeishi Corporation - Tungsten: 19.3 g/cm³, 327×10⁵ N/mm² (≈327 GPa)",
      "Wikipedia - Tungsten: Young's modulus 411 GPa",
      "AZoM - Tungsten Properties: 340-405 GPa range",
      "CERN Tungsten Alloys: Young's modulus ~200 GPa for alloys",
    ],
  },

  {
    id: "silver",
    name: "Silver (metal)",
    cat: "Precious",
    rho: 10490,
    E: 83,
    usdkg: 1700,
    note: "Indicative bullion equivalent",
    src: [
      "MatWeb - Silver: 10490 kg/m³, 83 GPa",
      "Strategic Metals Invest (2025) - Silver Price: $2514.06/kg (AUD) ≈ $1700 USD/kg approximate",
    ],
  },

  {
    id: "gold",
    name: "Gold (metal)",
    cat: "Precious",
    rho: 19320,
    E: 79,
    usdkg: 143000,
    note: "Indicative bullion equivalent",
    src: [
      "MatWeb - Gold: 19320 kg/m³, 79 GPa",
      "Perth Mint (2025) - Gold Price: $211,922.89 AUD per kilogram (~$143,000 USD/kg approximate)",
    ],
  },

  {
    id: "platinum",
    name: "Platinum (metal)",
    cat: "Precious",
    rho: 21450,
    E: 168,
    usdkg: 32000,
    note: "Indicative bullion equivalent",
    src: [
      "MatWeb - Platinum: 21450 kg/m³, 168 GPa",
      "Kitco Precious Metals (2025) - Platinum: $2022-2032 USD/oz ≈ $65,000-$65,000/kg",
    ],
  },

  {
    id: "pp",
    name: "Polypropylene (PP)",
    cat: "Polymers",
    rho: 910,
    E: 1.6,
    usdkg: 1.7,
    src: [
      "Special Chem - Polypropylene: 0.91 g/cm³, 1.5-1.6 GPa typical",
      "Engineering ToolBox - Polymers: PP properties",
      "Antaina Material Selection Guide - PP: 1.5 GPa flexural modulus",
    ],
  },

  {
    id: "pehd",
    name: "HDPE",
    cat: "Polymers",
    rho: 950,
    E: 1.0,
    usdkg: 1.6,
    src: [
      "MFG Solution - HDPE Polyethylene: 0.95 g/cm³, 900-1200 MPa (0.9-1.2 GPa)",
      "Vinidex - Polyethylene: HDPE 950 kg/m³, 1.0 GPa range",
      "Plastic Pipe Handbook - HDPE: flexural modulus varies with density",
    ],
  },

  {
    id: "peld",
    name: "LDPE",
    cat: "Polymers",
    rho: 920,
    E: 0.25,
    usdkg: 1.6,
    src: [
      "MFG Solution - LDPE Polyethylene: 0.92 g/cm³, 140-220 MPa (0.14-0.22 GPa)",
      "Vinidex - LDPE: 910-940 kg/m³",
      "Sonelastic - LDPE modulus: 1.08 GPa low density reference",
    ],
  },

  {
    id: "pvc",
    name: "PVC (rigid)",
    cat: "Polymers",
    rho: 1400,
    E: 3.0,
    usdkg: 2.4,
    src: [
      "Special Chem - PVC: 1.4 g/cm³, 2.8-3.2 GPa",
      "Antaina Material Selection - PVC Rigid: 3.0 GPa",
      "Engineering ToolBox - PVC properties",
    ],
  },

  {
    id: "abs",
    name: "ABS (bulk)",
    cat: "Polymers",
    rho: 1040,
    E: 2.1,
    usdkg: 2.6,
    src: [
      "Eck Plastics - ABS: 1.04 g/cm³, 2.4 GPa Young's modulus (348 ksi)",
      "Antaina Material Selection - ABS: 2.3 GPa flexural modulus",
      "Make It From - ABS properties database",
    ],
  },

  {
    id: "pmma",
    name: "Acrylic (PMMA)",
    cat: "Polymers",
    rho: 1180,
    E: 3.2,
    usdkg: 3.2,
    src: [
      "Antaina Material Selection - Acrylic/PMMA: 3.2 GPa flexural modulus",
      "Special Chem - PMMA: 1.18 g/cm³, 3.2 GPa typical",
      "Make It From - Acrylic PMMA properties",
    ],
  },

  {
    id: "pc",
    name: "Polycarbonate (PC)",
    cat: "Polymers",
    rho: 1200,
    E: 2.4,
    usdkg: 4.0,
    src: [
      "Xometry - Polycarbonate: average 2.37 GPa Young's modulus",
      "Antaina Material Selection - PC: 2.3 GPa flexural modulus",
      "MatWeb - PC/Acrylic alloys: 1.72-2.60 GPa modulus",
    ],
  },

  {
    id: "nylon",
    name: "Nylon (PA6)",
    cat: "Polymers",
    rho: 1130,
    E: 2.7,
    usdkg: 3.5,
    src: [
      "Antaina Material Selection - Nylon 6: 2.3 GPa (bulk), 2.7 GPa typical",
      "Special Chem - PA6 Nylon: 1.13 g/cm³",
      "Engineering ToolBox - Nylon properties",
    ],
  },

  {
    id: "ptfe",
    name: "PTFE",
    cat: "Polymers",
    rho: 2200,
    E: 0.5,
    usdkg: 18,
    src: [
      "Special Chem - PTFE: 2.2 g/cm³, 0.5 GPa typical",
      "Engineering ToolBox - Teflon/PTFE properties",
      "MatWeb - Polytetrafluoroethylene data",
    ],
  },

  {
    id: "pet",
    name: "PET (bulk)",
    cat: "Polymers",
    rho: 1380,
    E: 2.8,
    usdkg: 2.1,
    src: [
      "Antaina Material Selection - PET: 1.0 GPa flexural, 2.8 GPa typical",
      "Xometry - PET 3D Printing Filament: 1.4 g/mL density",
      "Make It From - PET-G properties database",
    ],
  },

  {
    id: "tpu",
    name: "TPU (flex)",
    cat: "Polymers",
    rho: 1200,
    E: 0.03,
    usdkg: 8.0,
    src: [
      "Part Mfg - TPU 3D Filament: 1.24 g/cm³ density, flexible elastomer",
      "Engineering ToolBox - Thermoplastic Polyurethane properties",
      "NOTE: 0.03 GPa represents highly flexible TPU; may need verification for specific grade",
    ],
  },

  {
    id: "pla_print",
    name: "PLA (3D filament)",
    cat: "Polymers",
    rho: 1240,
    E: 3.5,
    usdkg: 18,
    src: [
      "Part Mfg - PLA 3D Filament: 1.20-1.43 g/cm³, 2.7-16 GPa tensile modulus",
      "Juggerbot3D - PLA Properties: 1.08-1.12 g/cc, ≅4200 MPa (4.2 GPa)",
      "Make It From - PLA 3D printing material database",
    ],
  },

  {
    id: "abs_print",
    name: "ABS (3D filament)",
    cat: "Polymers",
    rho: 1040,
    E: 2.1,
    usdkg: 20,
    src: [
      "Part Mfg - ABS 3D Filament: 1.04 g/cm³, flexural modulus 1177 MPa (1.2 GPa)",
      "Make It From - ABS 3D printing properties",
      "3D Maker Engineering - ABS: 1.05 g/cc, 1940 MPa tensile modulus",
    ],
  },

  {
    id: "petg_print",
    name: "PETG (3D filament)",
    cat: "Polymers",
    rho: 1270,
    E: 2.1,
    usdkg: 22,
    src: [
      "Part Mfg - PETG 3D Filament: 1.27 g/cm³, flexural modulus 1073 MPa (1.1 GPa)",
      "Xometry - PETG Properties: 1.27 g/mL, 70 MPa flexural strength",
      "NCBI - PLA vs PETG 3D printing: 1.90-2.00 GPa tensile modulus for PETG",
    ],
  },

  {
    id: "gfrp",
    name: "GFRP (glass fibre composite)",
    cat: "Composites",
    rho: 1900,
    E: 25,
    usdkg: 8.5,
    src: [
      "NCBI/Xu (2025) - GFRP Cost: $25-45 USD/kg, density ~1900 kg/m³",
      "Eupegypt - Fiberglass FRP: $2-5/kg general pricing",
      "NCBI (2021) - Glass Fiber-Reinforced Polymer composites review",
    ],
  },

  {
    id: "cfrp",
    name: "CFRP (carbon fibre composite)",
    cat: "Composites",
    rho: 1600,
    E: 135,
    usdkg: 150,
    src: [
      "NCBI/Xu (2025) - CFRP Cost: $120-250 USD/kg, density varies 1500-1600 kg/m³",
      "HPL Machining (2025) - Carbon Fiber: $10-200/kg depending on grade/modulus",
      "Eupegypt - Carbon Fiber Cost: ~$50/kg for advanced FRP",
    ],
  },

  {
    id: "kevlar",
    name: "Aramid composite (Kevlar/epoxy)",
    cat: "Composites",
    rho: 1400,
    E: 70,
    usdkg: 100,
    src: [
      "NCBI/Xu (2025) - AFRP Cost: $80-120 USD/kg, efficiency 77.3% relative to CFRP",
      "NCBI (2023) - Kevlar Aramid Fibers: modulus higher than glass but lower than carbon",
      "Trojan Fiberglass - Aramid 200 gsm Twill Kevlar: industrial pricing reference",
    ],
  },

  {
    id: "glass_soda",
    name: "Glass (soda-lime)",
    cat: "Ceramics & Glass",
    rho: 2500,
    E: 70,
    usdkg: 1.1,
    src: [
      "Continental Trade - Soda Lime Glass: 2500 kg/m³, Young's Modulus 72 GPa",
      "Wikipedia - Soda-Lime Glass: 70-74 GPa Young's modulus",
      "Abrisatech Glass Brochure - Soda-Lime: 72.9 kN/mm² (≈72.9 GPa)",
    ],
  },

  {
    id: "glass_boro",
    name: "Glass (borosilicate)",
    cat: "Ceramics & Glass",
    rho: 2230,
    E: 64,
    usdkg: 4.0,
    src: [
      "MatWeb - Borosilicate Glass: 2230 kg/m³, 64-80 GPa range",
      "Make It From - Borosilicate vs Soda-Lime comparison",
      "Engineering ToolBox - Borosilicate glass properties",
    ],
  },

  {
    id: "alumina",
    name: "Alumina ceramic",
    cat: "Ceramics & Glass",
    rho: 3900,
    E: 380,
    usdkg: 12,
    src: [
      "MatWeb - Alumina Ceramic: 3.9 g/cm³, 380 GPa typical",
      "Curbell Plastics - Advanced Ceramics database",
      "Engineering ToolBox - Ceramic material properties",
    ],
  },

  {
    id: "silicon_carbide",
    name: "Silicon carbide",
    cat: "Ceramics & Glass",
    rho: 3210,
    E: 410,
    usdkg: 35,
    src: [
      "MatWeb - Silicon Carbide: 3210 kg/m³, 410 GPa range",
      "Curbell Plastics - SiC ceramic properties",
      "Engineering ToolBox - Silicon carbide specifications",
    ],
  },

  {
    id: "granite",
    name: "Granite",
    cat: "Stone & Earth",
    rho: 2750,
    E: 50,
    usdkg: 0.35,
    src: [
      "Some Useful Numbers (Penn State CDN) - Granite: Young's Modulus 10-70 GPa",
      "MLSU - Engineering Properties of Rocks: Granite 50-70 GPa typical",
      "Britannica - Rock Mechanical Properties: Granite modulus range",
    ],
  },

  {
    id: "basalt",
    name: "Basalt",
    cat: "Stone & Earth",
    rho: 2900,
    E: 65,
    usdkg: 0.25,
    src: [
      "MLSU - Basalt: Young's Modulus properties",
      "Some Useful Numbers (Penn State) - Basalt rock properties",
      "Aldeeky et al. (2020) - Basalt Rock: compressive strength and modulus assessment",
    ],
  },

  {
    id: "limestone",
    name: "Limestone",
    cat: "Stone & Earth",
    rho: 2500,
    E: 45,
    usdkg: 0.18,
    src: [
      "Some Useful Numbers (Penn State) - Limestone: Young's Modulus 15-55 GPa",
      "MLSU - Engineering Properties: Limestone 45 GPa typical",
      "Metrica INRIM - Stone masonry walls: limestone modulus range",
    ],
  },

  {
    id: "brick",
    name: "Brick (fired clay)",
    cat: "Stone & Earth",
    rho: 1900,
    E: 15,
    usdkg: 0.45,
    src: [
      "Some Useful Numbers (Penn State) - Fired clay brick properties",
      "MLSU - Clay brick engineering properties database",
      "Construction material standards",
    ],
  },

  {
    id: "gypsum",
    name: "Plaster/gypsum board (bulk)",
    cat: "Stone & Earth",
    rho: 950,
    E: 2.5,
    usdkg: 0.35,
    src: [
      "Engineering ToolBox - Gypsum/Plaster properties",
      "MatWeb - Gypsum board material properties",
      "Construction material specification standards",
    ],
  },

  {
    id: "concrete",
    name: "Concrete (normal)",
    cat: "Construction",
    rho: 2400,
    E: 30,
    usdkg: 0.14,
    src: [
      "Some Useful Numbers (Penn State) - Concrete: Young's Modulus 30 GPa typical",
      "Engineering ToolBox - Concrete material properties",
      "MatWeb - Portland cement concrete database",
    ],
  },

  {
    id: "concrete_high",
    name: "Concrete (high-strength)",
    cat: "Construction",
    rho: 2500,
    E: 40,
    usdkg: 0.16,
    src: [
      "Engineering ToolBox - High-strength concrete properties",
      "Some Useful Numbers (Penn State) - Concrete strength variations",
      "MatWeb - High performance concrete materials",
    ],
  },
];
