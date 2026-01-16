/**
 * County-level 3rd party cost averages for NORMAL version
 * Includes: title insurance, recording fees, survey, pest inspection, lawyer fees
 * NO Hideout-specific fees (Walker fees, etc.)
 */

export interface CountyLevelCosts {
  // Standard closing costs
  inspectionCost: number; // Professional home inspection
  appraisalCost: number; // Appraisal fee
  surveyFee: number; // Property survey (often optional but common)
  pestInspectionCost: number; // Termite/pest inspection
  lawyerFee: number; // Attorney/closing agent fee (varies by state)
  titleInsuranceCost: number; // Title insurance as % of property value (e.g., 0.006 = 0.6%)
  recordingFees: number; // Recording deed and mortgage documents
  creditReportFee: number; // Credit check/report fee
  floodDeterminationFee: number; // Flood zone determination
}

type CountyMap = {
  [county: string]: CountyLevelCosts;
};

type StateMap = {
  [state: string]: CountyMap;
};

// County-level 3rd party cost data (NORMAL version only)
// Values are typical costs in USD for that county (or percentages where noted)
export const COUNTY_THIRD_PARTY_COSTS: StateMap = {
  // PENNSYLVANIA (Title company fees, lawyer-handled closings common)
  PA: {
    'Allegheny County': { 
      inspectionCost: 350, appraisalCost: 450, surveyFee: 400, pestInspectionCost: 120,
      lawyerFee: 600, titleInsuranceCost: 0.006, recordingFees: 150, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Philadelphia County': { 
      inspectionCost: 375, appraisalCost: 500, surveyFee: 450, pestInspectionCost: 130,
      lawyerFee: 700, titleInsuranceCost: 0.007, recordingFees: 175, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Montgomery County': { 
      inspectionCost: 400, appraisalCost: 525, surveyFee: 480, pestInspectionCost: 140,
      lawyerFee: 750, titleInsuranceCost: 0.0075, recordingFees: 200, creditReportFee: 60, floodDeterminationFee: 35
    },
    'Luzerne County': { 
      inspectionCost: 325, appraisalCost: 400, surveyFee: 350, pestInspectionCost: 100,
      lawyerFee: 500, titleInsuranceCost: 0.005, recordingFees: 125, creditReportFee: 45, floodDeterminationFee: 20
    },
    'Westmoreland County': { 
      inspectionCost: 340, appraisalCost: 420, surveyFee: 380, pestInspectionCost: 110,
      lawyerFee: 550, titleInsuranceCost: 0.0055, recordingFees: 135, creditReportFee: 48, floodDeterminationFee: 22
    },
    'Default': { 
      inspectionCost: 350, appraisalCost: 450, surveyFee: 400, pestInspectionCost: 120,
      lawyerFee: 600, titleInsuranceCost: 0.006, recordingFees: 150, creditReportFee: 50, floodDeterminationFee: 25
    },
  },

  // OHIO (Title companies standard, lower survey costs)
  OH: {
    'Cuyahoga County': { 
      inspectionCost: 320, appraisalCost: 425, surveyFee: 350, pestInspectionCost: 100,
      lawyerFee: 400, titleInsuranceCost: 0.0055, recordingFees: 120, creditReportFee: 45, floodDeterminationFee: 20
    },
    'Franklin County': { 
      inspectionCost: 330, appraisalCost: 435, surveyFee: 360, pestInspectionCost: 105,
      lawyerFee: 420, titleInsuranceCost: 0.006, recordingFees: 130, creditReportFee: 48, floodDeterminationFee: 22
    },
    'Hamilton County': { 
      inspectionCost: 340, appraisalCost: 450, surveyFee: 370, pestInspectionCost: 110,
      lawyerFee: 450, titleInsuranceCost: 0.006, recordingFees: 140, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Montgomery County': { 
      inspectionCost: 310, appraisalCost: 410, surveyFee: 340, pestInspectionCost: 95,
      lawyerFee: 380, titleInsuranceCost: 0.0052, recordingFees: 110, creditReportFee: 42, floodDeterminationFee: 18
    },
    'Summit County': { 
      inspectionCost: 315, appraisalCost: 415, surveyFee: 345, pestInspectionCost: 100,
      lawyerFee: 400, titleInsuranceCost: 0.0055, recordingFees: 115, creditReportFee: 44, floodDeterminationFee: 19
    },
    'Default': { 
      inspectionCost: 325, appraisalCost: 430, surveyFee: 355, pestInspectionCost: 102,
      lawyerFee: 410, titleInsuranceCost: 0.0056, recordingFees: 123, creditReportFee: 46, floodDeterminationFee: 21
    },
  },

  // TEXAS (No state income tax, typically lower lawyer fees, survey costs vary)
  TX: {
    'Harris County': { 
      inspectionCost: 400, appraisalCost: 500, surveyFee: 500, pestInspectionCost: 140,
      lawyerFee: 300, titleInsuranceCost: 0.005, recordingFees: 180, creditReportFee: 55, floodDeterminationFee: 35
    },
    'Dallas County': { 
      inspectionCost: 380, appraisalCost: 480, surveyFee: 480, pestInspectionCost: 130,
      lawyerFee: 290, titleInsuranceCost: 0.0048, recordingFees: 170, creditReportFee: 52, floodDeterminationFee: 32
    },
    'Tarrant County': { 
      inspectionCost: 370, appraisalCost: 470, surveyFee: 460, pestInspectionCost: 125,
      lawyerFee: 280, titleInsuranceCost: 0.0048, recordingFees: 160, creditReportFee: 50, floodDeterminationFee: 30
    },
    'Bexar County': { 
      inspectionCost: 360, appraisalCost: 450, surveyFee: 440, pestInspectionCost: 120,
      lawyerFee: 270, titleInsuranceCost: 0.0045, recordingFees: 150, creditReportFee: 48, floodDeterminationFee: 28
    },
    'Travis County': { 
      inspectionCost: 420, appraisalCost: 520, surveyFee: 520, pestInspectionCost: 150,
      lawyerFee: 310, titleInsuranceCost: 0.005, recordingFees: 190, creditReportFee: 58, floodDeterminationFee: 38
    },
    'Default': { 
      inspectionCost: 380, appraisalCost: 480, surveyFee: 480, pestInspectionCost: 130,
      lawyerFee: 290, titleInsuranceCost: 0.0048, recordingFees: 170, creditReportFee: 52, floodDeterminationFee: 32
    },
  },

  // FLORIDA (High appraisal costs, pest inspection common)
  FL: {
    'Miami-Dade County': { 
      inspectionCost: 450, appraisalCost: 550, surveyFee: 600, pestInspectionCost: 180,
      lawyerFee: 400, titleInsuranceCost: 0.006, recordingFees: 200, creditReportFee: 60, floodDeterminationFee: 40
    },
    'Broward County': { 
      inspectionCost: 440, appraisalCost: 540, surveyFee: 580, pestInspectionCost: 170,
      lawyerFee: 390, titleInsuranceCost: 0.006, recordingFees: 190, creditReportFee: 58, floodDeterminationFee: 38
    },
    'Hillsborough County': { 
      inspectionCost: 380, appraisalCost: 480, surveyFee: 500, pestInspectionCost: 140,
      lawyerFee: 350, titleInsuranceCost: 0.0055, recordingFees: 170, creditReportFee: 52, floodDeterminationFee: 32
    },
    'Orange County': { 
      inspectionCost: 360, appraisalCost: 460, surveyFee: 480, pestInspectionCost: 130,
      lawyerFee: 330, titleInsuranceCost: 0.0052, recordingFees: 160, creditReportFee: 50, floodDeterminationFee: 30
    },
    'Duval County': { 
      inspectionCost: 340, appraisalCost: 440, surveyFee: 460, pestInspectionCost: 120,
      lawyerFee: 310, titleInsuranceCost: 0.005, recordingFees: 150, creditReportFee: 48, floodDeterminationFee: 28
    },
    'Default': { 
      inspectionCost: 400, appraisalCost: 500, surveyFee: 540, pestInspectionCost: 150,
      lawyerFee: 370, titleInsuranceCost: 0.0056, recordingFees: 180, creditReportFee: 55, floodDeterminationFee: 35
    },
  },

  // CALIFORNIA (High costs, survey often required)
  CA: {
    'Los Angeles County': { 
      inspectionCost: 600, appraisalCost: 750, surveyFee: 800, pestInspectionCost: 250,
      lawyerFee: 800, titleInsuranceCost: 0.006, recordingFees: 300, creditReportFee: 75, floodDeterminationFee: 50
    },
    'San Diego County': { 
      inspectionCost: 580, appraisalCost: 720, surveyFee: 780, pestInspectionCost: 240,
      lawyerFee: 780, titleInsuranceCost: 0.006, recordingFees: 290, creditReportFee: 72, floodDeterminationFee: 48
    },
    'San Francisco County': { 
      inspectionCost: 700, appraisalCost: 850, surveyFee: 900, pestInspectionCost: 300,
      lawyerFee: 900, titleInsuranceCost: 0.007, recordingFees: 350, creditReportFee: 85, floodDeterminationFee: 55
    },
    'Orange County': { 
      inspectionCost: 550, appraisalCost: 700, surveyFee: 750, pestInspectionCost: 220,
      lawyerFee: 750, titleInsuranceCost: 0.0055, recordingFees: 270, creditReportFee: 68, floodDeterminationFee: 45
    },
    'Sacramento County': { 
      inspectionCost: 480, appraisalCost: 600, surveyFee: 650, pestInspectionCost: 180,
      lawyerFee: 650, titleInsuranceCost: 0.005, recordingFees: 240, creditReportFee: 60, floodDeterminationFee: 40
    },
    'Default': { 
      inspectionCost: 580, appraisalCost: 720, surveyFee: 780, pestInspectionCost: 240,
      lawyerFee: 780, titleInsuranceCost: 0.006, recordingFees: 290, creditReportFee: 72, floodDeterminationFee: 48
    },
  },

  // NEW YORK (High lawyer fees for NYC, title company standard)
  NY: {
    'New York County': { 
      inspectionCost: 650, appraisalCost: 800, surveyFee: 850, pestInspectionCost: 200,
      lawyerFee: 1200, titleInsuranceCost: 0.007, recordingFees: 350, creditReportFee: 85, floodDeterminationFee: 55
    },
    'Kings County': { 
      inspectionCost: 620, appraisalCost: 770, surveyFee: 820, pestInspectionCost: 190,
      lawyerFee: 1100, titleInsuranceCost: 0.0065, recordingFees: 330, creditReportFee: 80, floodDeterminationFee: 52
    },
    'Queens County': { 
      inspectionCost: 580, appraisalCost: 720, surveyFee: 780, pestInspectionCost: 170,
      lawyerFee: 1000, titleInsuranceCost: 0.006, recordingFees: 310, creditReportFee: 75, floodDeterminationFee: 48
    },
    'Bronx County': { 
      inspectionCost: 520, appraisalCost: 660, surveyFee: 720, pestInspectionCost: 150,
      lawyerFee: 900, titleInsuranceCost: 0.0055, recordingFees: 280, creditReportFee: 68, floodDeterminationFee: 42
    },
    'Erie County': { 
      inspectionCost: 380, appraisalCost: 480, surveyFee: 500, pestInspectionCost: 120,
      lawyerFee: 600, titleInsuranceCost: 0.005, recordingFees: 180, creditReportFee: 52, floodDeterminationFee: 30
    },
    'Default': { 
      inspectionCost: 550, appraisalCost: 700, surveyFee: 750, pestInspectionCost: 160,
      lawyerFee: 950, titleInsuranceCost: 0.006, recordingFees: 290, creditReportFee: 72, floodDeterminationFee: 45
    },
  },

  // GEORGIA (Modern closing practices, title company standard)
  GA: {
    'Fulton County': { 
      inspectionCost: 380, appraisalCost: 480, surveyFee: 450, pestInspectionCost: 130,
      lawyerFee: 350, titleInsuranceCost: 0.0055, recordingFees: 140, creditReportFee: 50, floodDeterminationFee: 28
    },
    'DeKalb County': { 
      inspectionCost: 370, appraisalCost: 470, surveyFee: 440, pestInspectionCost: 125,
      lawyerFee: 340, titleInsuranceCost: 0.0055, recordingFees: 135, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Cobb County': { 
      inspectionCost: 360, appraisalCost: 460, surveyFee: 430, pestInspectionCost: 120,
      lawyerFee: 330, titleInsuranceCost: 0.005, recordingFees: 130, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Gwinnett County': { 
      inspectionCost: 350, appraisalCost: 450, surveyFee: 420, pestInspectionCost: 115,
      lawyerFee: 320, titleInsuranceCost: 0.005, recordingFees: 125, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Default': { 
      inspectionCost: 365, appraisalCost: 465, surveyFee: 435, pestInspectionCost: 122,
      lawyerFee: 335, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 47, floodDeterminationFee: 25
    },
  },

  // NORTH CAROLINA (Title companies common, moderate costs)
  NC: {
    'Mecklenburg County': { 
      inspectionCost: 340, appraisalCost: 440, surveyFee: 420, pestInspectionCost: 120,
      lawyerFee: 300, titleInsuranceCost: 0.005, recordingFees: 120, creditReportFee: 45, floodDeterminationFee: 24
    },
    'Wake County': { 
      inspectionCost: 350, appraisalCost: 450, surveyFee: 430, pestInspectionCost: 125,
      lawyerFee: 310, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Guilford County': { 
      inspectionCost: 330, appraisalCost: 430, surveyFee: 410, pestInspectionCost: 115,
      lawyerFee: 290, titleInsuranceCost: 0.005, recordingFees: 115, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Durham County': { 
      inspectionCost: 340, appraisalCost: 440, surveyFee: 420, pestInspectionCost: 120,
      lawyerFee: 300, titleInsuranceCost: 0.005, recordingFees: 120, creditReportFee: 45, floodDeterminationFee: 24
    },
    'Default': { 
      inspectionCost: 340, appraisalCost: 440, surveyFee: 420, pestInspectionCost: 120,
      lawyerFee: 300, titleInsuranceCost: 0.0051, recordingFees: 120, creditReportFee: 45, floodDeterminationFee: 24
    },
  },

  // ARIZONA (Desert state, survey often required, lower lawyer fees)
  AZ: {
    'Maricopa County': { 
      inspectionCost: 420, appraisalCost: 520, surveyFee: 550, pestInspectionCost: 100,
      lawyerFee: 300, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Pima County': { 
      inspectionCost: 380, appraisalCost: 480, surveyFee: 510, pestInspectionCost: 90,
      lawyerFee: 280, titleInsuranceCost: 0.005, recordingFees: 150, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Yavapai County': { 
      inspectionCost: 360, appraisalCost: 460, surveyFee: 490, pestInspectionCost: 80,
      lawyerFee: 260, titleInsuranceCost: 0.005, recordingFees: 140, creditReportFee: 45, floodDeterminationFee: 24
    },
    'Default': { 
      inspectionCost: 390, appraisalCost: 490, surveyFee: 520, pestInspectionCost: 95,
      lawyerFee: 290, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 48, floodDeterminationFee: 26
    },
  },

  // TENNESSEE (Tennessee has unique closing practices, moderate costs)
  TN: {
    'Shelby County': { 
      inspectionCost: 340, appraisalCost: 440, surveyFee: 400, pestInspectionCost: 120,
      lawyerFee: 350, titleInsuranceCost: 0.005, recordingFees: 120, creditReportFee: 45, floodDeterminationFee: 24
    },
    'Davidson County': { 
      inspectionCost: 360, appraisalCost: 460, surveyFee: 420, pestInspectionCost: 130,
      lawyerFee: 370, titleInsuranceCost: 0.0052, recordingFees: 130, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Knox County': { 
      inspectionCost: 330, appraisalCost: 430, surveyFee: 390, pestInspectionCost: 110,
      lawyerFee: 330, titleInsuranceCost: 0.005, recordingFees: 115, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Default': { 
      inspectionCost: 343, appraisalCost: 443, surveyFee: 403, pestInspectionCost: 120,
      lawyerFee: 350, titleInsuranceCost: 0.0051, recordingFees: 121, creditReportFee: 45, floodDeterminationFee: 24
    },
  },

  // COLORADO (Mountain state, survey often required)
  CO: {
    'Denver County': { 
      inspectionCost: 420, appraisalCost: 520, surveyFee: 600, pestInspectionCost: 120,
      lawyerFee: 500, titleInsuranceCost: 0.005, recordingFees: 180, creditReportFee: 55, floodDeterminationFee: 32
    },
    'Arapahoe County': { 
      inspectionCost: 400, appraisalCost: 500, surveyFee: 580, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.005, recordingFees: 170, creditReportFee: 52, floodDeterminationFee: 30
    },
    'El Paso County': { 
      inspectionCost: 380, appraisalCost: 480, surveyFee: 560, pestInspectionCost: 100,
      lawyerFee: 460, titleInsuranceCost: 0.0048, recordingFees: 160, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Default': { 
      inspectionCost: 400, appraisalCost: 500, surveyFee: 580, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0049, recordingFees: 170, creditReportFee: 52, floodDeterminationFee: 30
    },
  },
};

/**
 * Get 3rd party costs for a specific county
 * Falls back to state default if county not found
 */
export const getCountyThirdPartyCosts = (state: string, county?: string): CountyLevelCosts => {
  const stateCosts = COUNTY_THIRD_PARTY_COSTS[state];
  
  // National average fallback (all 9 fields)
  const nationalAverage: CountyLevelCosts = {
    inspectionCost: 380,
    appraisalCost: 480,
    surveyFee: 450,
    pestInspectionCost: 130,
    lawyerFee: 400,
    titleInsuranceCost: 0.0055,
    recordingFees: 150,
    creditReportFee: 50,
    floodDeterminationFee: 28,
  };

  if (!stateCosts) {
    // Return national average if state not in database
    return nationalAverage;
  }

  if (!county || county.trim() === '') {
    // Use state default
    return stateCosts['Default'] || nationalAverage;
  }

  // Try exact county name first
  if (stateCosts[county]) {
    return stateCosts[county];
  }

  // Fall back to state default
  return stateCosts['Default'] || nationalAverage;
};

/**
 * Get list of counties available for a state
 */
export const getCountiesForState = (state: string): string[] => {
  const stateCosts = COUNTY_THIRD_PARTY_COSTS[state];
  if (!stateCosts) return [];
  
  return Object.keys(stateCosts)
    .filter((county) => county !== 'Default')
    .sort();
};
