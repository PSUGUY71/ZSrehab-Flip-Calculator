/**
 * County-level 3rd party cost averages for NORMAL version
 * Helps users see realistic costs by county
 */

export interface CountyLevelCosts {
  inspectionCost: number;
  appraisalCost: number;
  titleInsuranceCost: number; // Usually ~0.5-1% of property value
}

type CountyMap = {
  [county: string]: CountyLevelCosts;
};

type StateMap = {
  [state: string]: CountyMap;
};

// County-level 3rd party cost data (NORMAL version only)
// Values are typical costs in USD for that county
export const COUNTY_THIRD_PARTY_COSTS: StateMap = {
  // PENNSYLVANIA
  PA: {
    'Allegheny County': { inspectionCost: 350, appraisalCost: 450, titleInsuranceCost: 0.006 },
    'Philadelphia County': { inspectionCost: 375, appraisalCost: 500, titleInsuranceCost: 0.007 },
    'Montgomery County': { inspectionCost: 400, appraisalCost: 525, titleInsuranceCost: 0.0075 },
    'Luzerne County': { inspectionCost: 325, appraisalCost: 400, titleInsuranceCost: 0.005 },
    'Westmoreland County': { inspectionCost: 340, appraisalCost: 420, titleInsuranceCost: 0.0055 },
    'Default': { inspectionCost: 350, appraisalCost: 450, titleInsuranceCost: 0.006 },
  },
  // OHIO
  OH: {
    'Cuyahoga County': { inspectionCost: 320, appraisalCost: 425, titleInsuranceCost: 0.0055 },
    'Franklin County': { inspectionCost: 330, appraisalCost: 435, titleInsuranceCost: 0.006 },
    'Hamilton County': { inspectionCost: 340, appraisalCost: 450, titleInsuranceCost: 0.006 },
    'Montgomery County': { inspectionCost: 310, appraisalCost: 410, titleInsuranceCost: 0.0052 },
    'Summit County': { inspectionCost: 315, appraisalCost: 415, titleInsuranceCost: 0.0055 },
    'Default': { inspectionCost: 325, appraisalCost: 430, titleInsuranceCost: 0.0056 },
  },
  // TEXAS
  TX: {
    'Harris County': { inspectionCost: 400, appraisalCost: 500, titleInsuranceCost: 0.005 },
    'Dallas County': { inspectionCost: 380, appraisalCost: 480, titleInsuranceCost: 0.0048 },
    'Tarrant County': { inspectionCost: 370, appraisalCost: 470, titleInsuranceCost: 0.0048 },
    'Bexar County': { inspectionCost: 360, appraisalCost: 450, titleInsuranceCost: 0.0045 },
    'Travis County': { inspectionCost: 420, appraisalCost: 520, titleInsuranceCost: 0.005 },
    'Default': { inspectionCost: 380, appraisalCost: 480, titleInsuranceCost: 0.0048 },
  },
  // FLORIDA
  FL: {
    'Miami-Dade County': { inspectionCost: 450, appraisalCost: 550, titleInsuranceCost: 0.006 },
    'Broward County': { inspectionCost: 440, appraisalCost: 540, titleInsuranceCost: 0.006 },
    'Hillsborough County': { inspectionCost: 380, appraisalCost: 480, titleInsuranceCost: 0.0055 },
    'Orange County': { inspectionCost: 360, appraisalCost: 460, titleInsuranceCost: 0.0052 },
    'Duval County': { inspectionCost: 340, appraisalCost: 440, titleInsuranceCost: 0.005 },
    'Default': { inspectionCost: 400, appraisalCost: 500, titleInsuranceCost: 0.0056 },
  },
  // CALIFORNIA
  CA: {
    'Los Angeles County': { inspectionCost: 600, appraisalCost: 750, titleInsuranceCost: 0.006 },
    'San Diego County': { inspectionCost: 580, appraisalCost: 720, titleInsuranceCost: 0.006 },
    'San Francisco County': { inspectionCost: 700, appraisalCost: 850, titleInsuranceCost: 0.007 },
    'Orange County': { inspectionCost: 550, appraisalCost: 700, titleInsuranceCost: 0.0055 },
    'Sacramento County': { inspectionCost: 480, appraisalCost: 600, titleInsuranceCost: 0.005 },
    'Default': { inspectionCost: 580, appraisalCost: 720, titleInsuranceCost: 0.006 },
  },
  // NEW YORK
  NY: {
    'New York County': { inspectionCost: 650, appraisalCost: 800, titleInsuranceCost: 0.007 },
    'Kings County': { inspectionCost: 620, appraisalCost: 770, titleInsuranceCost: 0.0065 },
    'Queens County': { inspectionCost: 580, appraisalCost: 720, titleInsuranceCost: 0.006 },
    'Bronx County': { inspectionCost: 520, appraisalCost: 660, titleInsuranceCost: 0.0055 },
    'Erie County': { inspectionCost: 380, appraisalCost: 480, titleInsuranceCost: 0.005 },
    'Default': { inspectionCost: 550, appraisalCost: 700, titleInsuranceCost: 0.006 },
  },
  // GEORGIA
  GA: {
    'Fulton County': { inspectionCost: 380, appraisalCost: 480, titleInsuranceCost: 0.0055 },
    'DeKalb County': { inspectionCost: 370, appraisalCost: 470, titleInsuranceCost: 0.0055 },
    'Cobb County': { inspectionCost: 360, appraisalCost: 460, titleInsuranceCost: 0.005 },
    'Gwinnett County': { inspectionCost: 350, appraisalCost: 450, titleInsuranceCost: 0.005 },
    'Default': { inspectionCost: 365, appraisalCost: 465, titleInsuranceCost: 0.0053 },
  },
  // NORTH CAROLINA
  NC: {
    'Mecklenburg County': { inspectionCost: 340, appraisalCost: 440, titleInsuranceCost: 0.005 },
    'Wake County': { inspectionCost: 350, appraisalCost: 450, titleInsuranceCost: 0.0052 },
    'Guilford County': { inspectionCost: 330, appraisalCost: 430, titleInsuranceCost: 0.005 },
    'Durham County': { inspectionCost: 340, appraisalCost: 440, titleInsuranceCost: 0.005 },
    'Default': { inspectionCost: 340, appraisalCost: 440, titleInsuranceCost: 0.0051 },
  },
  // ARIZONA
  AZ: {
    'Maricopa County': { inspectionCost: 420, appraisalCost: 520, titleInsuranceCost: 0.0055 },
    'Pima County': { inspectionCost: 380, appraisalCost: 480, titleInsuranceCost: 0.005 },
    'Yavapai County': { inspectionCost: 360, appraisalCost: 460, titleInsuranceCost: 0.005 },
    'Default': { inspectionCost: 390, appraisalCost: 490, titleInsuranceCost: 0.0052 },
  },
  // TENNESSEE
  TN: {
    'Shelby County': { inspectionCost: 340, appraisalCost: 440, titleInsuranceCost: 0.005 },
    'Davidson County': { inspectionCost: 360, appraisalCost: 460, titleInsuranceCost: 0.0052 },
    'Knox County': { inspectionCost: 330, appraisalCost: 430, titleInsuranceCost: 0.005 },
    'Default': { inspectionCost: 343, appraisalCost: 443, titleInsuranceCost: 0.0051 },
  },
  // COLORADO
  CO: {
    'Denver County': { inspectionCost: 420, appraisalCost: 520, titleInsuranceCost: 0.005 },
    'Arapahoe County': { inspectionCost: 400, appraisalCost: 500, titleInsuranceCost: 0.005 },
    'El Paso County': { inspectionCost: 380, appraisalCost: 480, titleInsuranceCost: 0.0048 },
    'Default': { inspectionCost: 400, appraisalCost: 500, titleInsuranceCost: 0.0049 },
  },
};

/**
 * Get 3rd party costs for a specific county
 * Falls back to state default if county not found
 */
export const getCountyThirdPartyCosts = (state: string, county?: string): CountyLevelCosts => {
  const stateCosts = COUNTY_THIRD_PARTY_COSTS[state];
  
  if (!stateCosts) {
    // Return national average if state not in database
    return {
      inspectionCost: 380,
      appraisalCost: 480,
      titleInsuranceCost: 0.0055,
    };
  }

  if (!county || county.trim() === '') {
    // Use state default
    return stateCosts['Default'] || {
      inspectionCost: 380,
      appraisalCost: 480,
      titleInsuranceCost: 0.0055,
    };
  }

  // Try exact county name first
  if (stateCosts[county]) {
    return stateCosts[county];
  }

  // Fall back to state default
  return stateCosts['Default'] || {
    inspectionCost: 380,
    appraisalCost: 480,
    titleInsuranceCost: 0.0055,
  };
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
