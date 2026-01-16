/**
 * County-level 3rd party cost averages for NORMAL version
 * Includes: inspection, appraisal, survey, pest, lawyer fees, title insurance, recording, credit, flood
 * Automatically generated from US county database with realistic NORMAL version fees
 * NO Hideout-specific fees (Walker fees, acquisition fees, etc.)
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
// Values are realistic costs in USD for that county (or percentages for title insurance)
export const COUNTY_THIRD_PARTY_COSTS: StateMap = {
  // ALASKA
  'AK': {
    'Default': {
      inspectionCost: 600, appraisalCost: 775, surveyFee: 750, pestInspectionCost: 230,
      lawyerFee: 875, titleInsuranceCost: 0.0065, recordingFees: 260, creditReportFee: 62, floodDeterminationFee: 40
    },
  },
  // ALABAMA
  'AL': {
    'Autauga County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Baldwin County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Barbour County': {
      inspectionCost: 349, appraisalCost: 426, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 533, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Bibb County': {
      inspectionCost: 353, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 539, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Blount County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 367, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Bullock County': {
      inspectionCost: 365, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 558, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Butler County': {
      inspectionCost: 354, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Calhoun County': {
      inspectionCost: 370, appraisalCost: 452, surveyFee: 360, pestInspectionCost: 133,
      lawyerFee: 565, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Chambers County': {
      inspectionCost: 362, appraisalCost: 442, surveyFee: 352, pestInspectionCost: 130,
      lawyerFee: 553, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Cherokee County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Chilton County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Choctaw County': {
      inspectionCost: 348, appraisalCost: 426, surveyFee: 339, pestInspectionCost: 125,
      lawyerFee: 532, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Clarke County': {
      inspectionCost: 355, appraisalCost: 434, surveyFee: 345, pestInspectionCost: 128,
      lawyerFee: 543, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Clay County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Cleburne County': {
      inspectionCost: 362, appraisalCost: 443, surveyFee: 352, pestInspectionCost: 131,
      lawyerFee: 554, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Coffee County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Colbert County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Conecuh County': {
      inspectionCost: 370, appraisalCost: 452, surveyFee: 360, pestInspectionCost: 133,
      lawyerFee: 565, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Coosa County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 367, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Covington County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 527, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Crenshaw County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 561, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Cullman County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Dale County': {
      inspectionCost: 362, appraisalCost: 443, surveyFee: 352, pestInspectionCost: 130,
      lawyerFee: 553, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Dallas County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'DeKalb County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 347, pestInspectionCost: 128,
      lawyerFee: 545, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Elmore County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 568, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Escambia County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 124,
      lawyerFee: 524, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Etowah County': {
      inspectionCost: 347, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 125,
      lawyerFee: 531, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Fayette County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Franklin County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Geneva County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Greene County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 535, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Hale County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Henry County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 560, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Houston County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Jackson County': {
      inspectionCost: 358, appraisalCost: 437, surveyFee: 348, pestInspectionCost: 129,
      lawyerFee: 547, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Jefferson County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Lamar County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 538, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Lauderdale County': {
      inspectionCost: 357, appraisalCost: 437, surveyFee: 347, pestInspectionCost: 129,
      lawyerFee: 546, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Lawrence County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Lee County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Limestone County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Lowndes County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 133,
      lawyerFee: 563, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Macon County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 133,
      lawyerFee: 563, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Madison County': {
      inspectionCost: 370, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 133,
      lawyerFee: 566, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Marengo County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 344, pestInspectionCost: 128,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Marion County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Marshall County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 538, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Mobile County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 345, pestInspectionCost: 128,
      lawyerFee: 542, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Monroe County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Montgomery County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Morgan County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Perry County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Pickens County': {
      inspectionCost: 362, appraisalCost: 442, surveyFee: 352, pestInspectionCost: 130,
      lawyerFee: 553, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Pike County': {
      inspectionCost: 349, appraisalCost: 426, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 533, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Randolph County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 539, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Russell County': {
      inspectionCost: 371, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Shelby County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'St. Clair County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 549, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Sumter County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 332, pestInspectionCost: 123,
      lawyerFee: 522, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Talladega County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 535, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Tallapoosa County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Tuscaloosa County': {
      inspectionCost: 375, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Walker County': {
      inspectionCost: 346, appraisalCost: 423, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 529, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Washington County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Wilcox County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 124,
      lawyerFee: 524, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Winston County': {
      inspectionCost: 367, appraisalCost: 448, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 561, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0055, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
  // ARKANSAS
  'AR': {
    'Arkansas County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Ashley County': {
      inspectionCost: 320, appraisalCost: 397, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 485, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Baxter County': {
      inspectionCost: 324, appraisalCost: 402, surveyFee: 314, pestInspectionCost: 112,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Benton County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Boone County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Bradley County': {
      inspectionCost: 319, appraisalCost: 397, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Calhoun County': {
      inspectionCost: 339, appraisalCost: 421, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Carroll County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Chicot County': {
      inspectionCost: 335, appraisalCost: 416, surveyFee: 325, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Clark County': {
      inspectionCost: 317, appraisalCost: 394, surveyFee: 307, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Clay County': {
      inspectionCost: 316, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Cleburne County': {
      inspectionCost: 332, appraisalCost: 413, surveyFee: 322, pestInspectionCost: 115,
      lawyerFee: 504, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Cleveland County': {
      inspectionCost: 336, appraisalCost: 418, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Columbia County': {
      inspectionCost: 341, appraisalCost: 424, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Conway County': {
      inspectionCost: 313, appraisalCost: 389, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 475, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 20
    },
    'Craighead County': {
      inspectionCost: 331, appraisalCost: 412, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Crawford County': {
      inspectionCost: 343, appraisalCost: 427, surveyFee: 333, pestInspectionCost: 119,
      lawyerFee: 521, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Crittenden County': {
      inspectionCost: 317, appraisalCost: 394, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 481, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Cross County': {
      inspectionCost: 318, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 483, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Dallas County': {
      inspectionCost: 335, appraisalCost: 417, surveyFee: 325, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Desha County': {
      inspectionCost: 339, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Drew County': {
      inspectionCost: 316, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Faulkner County': {
      inspectionCost: 335, appraisalCost: 417, surveyFee: 325, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Franklin County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Fulton County': {
      inspectionCost: 340, appraisalCost: 423, surveyFee: 330, pestInspectionCost: 118,
      lawyerFee: 516, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Garland County': {
      inspectionCost: 316, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Grant County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Greene County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Hempstead County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Hot Spring County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Howard County': {
      inspectionCost: 314, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 20
    },
    'Independence County': {
      inspectionCost: 316, appraisalCost: 393, surveyFee: 307, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Izard County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Jackson County': {
      inspectionCost: 328, appraisalCost: 407, surveyFee: 318, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Jefferson County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Johnson County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Lafayette County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Lawrence County': {
      inspectionCost: 335, appraisalCost: 416, surveyFee: 325, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Lee County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Lincoln County': {
      inspectionCost: 334, appraisalCost: 415, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Little River County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Logan County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 490, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Lonoke County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 501, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Madison County': {
      inspectionCost: 339, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Marion County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Miller County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Mississippi County': {
      inspectionCost: 326, appraisalCost: 405, surveyFee: 316, pestInspectionCost: 113,
      lawyerFee: 495, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Monroe County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 501, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Montgomery County': {
      inspectionCost: 315, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 478, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Nevada County': {
      inspectionCost: 331, appraisalCost: 412, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 503, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Newton County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Ouachita County': {
      inspectionCost: 345, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 523, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 23
    },
    'Perry County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Phillips County': {
      inspectionCost: 341, appraisalCost: 424, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 518, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Pike County': {
      inspectionCost: 320, appraisalCost: 397, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 485, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Poinsett County': {
      inspectionCost: 313, appraisalCost: 389, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 475, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 20
    },
    'Polk County': {
      inspectionCost: 341, appraisalCost: 423, surveyFee: 330, pestInspectionCost: 118,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Pope County': {
      inspectionCost: 345, appraisalCost: 429, surveyFee: 335, pestInspectionCost: 120,
      lawyerFee: 524, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 23
    },
    'Prairie County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Pulaski County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 485, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Randolph County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 490, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Saline County': {
      inspectionCost: 325, appraisalCost: 403, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Scott County': {
      inspectionCost: 324, appraisalCost: 402, surveyFee: 314, pestInspectionCost: 112,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Searcy County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Sebastian County': {
      inspectionCost: 319, appraisalCost: 397, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Sevier County': {
      inspectionCost: 314, appraisalCost: 390, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 476, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 20
    },
    'Sharp County': {
      inspectionCost: 326, appraisalCost: 405, surveyFee: 316, pestInspectionCost: 113,
      lawyerFee: 494, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 21
    },
    'St. Francis County': {
      inspectionCost: 318, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 483, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 21
    },
    'Stone County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Union County': {
      inspectionCost: 325, appraisalCost: 403, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Van Buren County': {
      inspectionCost: 324, appraisalCost: 403, surveyFee: 314, pestInspectionCost: 113,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Washington County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
    'White County': {
      inspectionCost: 344, appraisalCost: 427, surveyFee: 333, pestInspectionCost: 119,
      lawyerFee: 521, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 22
    },
    'Woodruff County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 512, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 22
    },
    'Yell County': {
      inspectionCost: 325, appraisalCost: 404, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 493, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 21
    },
    'Default': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.005, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 22
    },
  },
  // ARIZONA
  'AZ': {
    'Apache County': {
      inspectionCost: 461, appraisalCost: 574, surveyFee: 605, pestInspectionCost: 117,
      lawyerFee: 436, titleInsuranceCost: 0.0056, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Cochise County': {
      inspectionCost: 461, appraisalCost: 574, surveyFee: 604, pestInspectionCost: 117,
      lawyerFee: 435, titleInsuranceCost: 0.0056, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Coconino County': {
      inspectionCost: 464, appraisalCost: 578, surveyFee: 609, pestInspectionCost: 118,
      lawyerFee: 439, titleInsuranceCost: 0.0056, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Gila County': {
      inspectionCost: 429, appraisalCost: 534, surveyFee: 563, pestInspectionCost: 109,
      lawyerFee: 405, titleInsuranceCost: 0.0055, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Graham County': {
      inspectionCost: 455, appraisalCost: 566, surveyFee: 597, pestInspectionCost: 116,
      lawyerFee: 430, titleInsuranceCost: 0.0056, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Greenlee County': {
      inspectionCost: 457, appraisalCost: 569, surveyFee: 600, pestInspectionCost: 116,
      lawyerFee: 432, titleInsuranceCost: 0.0056, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 26
    },
    'La Paz County': {
      inspectionCost: 442, appraisalCost: 551, surveyFee: 580, pestInspectionCost: 113,
      lawyerFee: 418, titleInsuranceCost: 0.0055, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Maricopa County': {
      inspectionCost: 438, appraisalCost: 545, surveyFee: 574, pestInspectionCost: 112,
      lawyerFee: 413, titleInsuranceCost: 0.0055, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Mohave County': {
      inspectionCost: 441, appraisalCost: 548, surveyFee: 578, pestInspectionCost: 112,
      lawyerFee: 416, titleInsuranceCost: 0.0055, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Navajo County': {
      inspectionCost: 468, appraisalCost: 582, surveyFee: 613, pestInspectionCost: 119,
      lawyerFee: 442, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Pima County': {
      inspectionCost: 467, appraisalCost: 581, surveyFee: 612, pestInspectionCost: 119,
      lawyerFee: 441, titleInsuranceCost: 0.0056, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Pinal County': {
      inspectionCost: 441, appraisalCost: 548, surveyFee: 578, pestInspectionCost: 112,
      lawyerFee: 416, titleInsuranceCost: 0.0055, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Santa Cruz County': {
      inspectionCost: 432, appraisalCost: 538, surveyFee: 567, pestInspectionCost: 110,
      lawyerFee: 408, titleInsuranceCost: 0.0055, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Yavapai County': {
      inspectionCost: 451, appraisalCost: 561, surveyFee: 591, pestInspectionCost: 115,
      lawyerFee: 426, titleInsuranceCost: 0.0056, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Yuma County': {
      inspectionCost: 444, appraisalCost: 553, surveyFee: 582, pestInspectionCost: 113,
      lawyerFee: 419, titleInsuranceCost: 0.0056, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Default': {
      inspectionCost: 450, appraisalCost: 560, surveyFee: 590, pestInspectionCost: 115,
      lawyerFee: 425, titleInsuranceCost: 0.0058, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 26
    },
  },
  // CALIFORNIA
  'CA': {
    'Alameda County': {
      inspectionCost: 595, appraisalCost: 768, surveyFee: 744, pestInspectionCost: 248,
      lawyerFee: 992, titleInsuranceCost: 0.0058, recordingFees: 322, creditReportFee: 67, floodDeterminationFee: 47
    },
    'Alpine County': {
      inspectionCost: 586, appraisalCost: 757, surveyFee: 733, pestInspectionCost: 244,
      lawyerFee: 978, titleInsuranceCost: 0.0057, recordingFees: 317, creditReportFee: 66, floodDeterminationFee: 46
    },
    'Amador County': {
      inspectionCost: 576, appraisalCost: 744, surveyFee: 720, pestInspectionCost: 240,
      lawyerFee: 960, titleInsuranceCost: 0.0057, recordingFees: 312, creditReportFee: 65, floodDeterminationFee: 46
    },
    'Butte County': {
      inspectionCost: 613, appraisalCost: 792, surveyFee: 766, pestInspectionCost: 255,
      lawyerFee: 1022, titleInsuranceCost: 0.0058, recordingFees: 332, creditReportFee: 69, floodDeterminationFee: 49
    },
    'Calaveras County': {
      inspectionCost: 580, appraisalCost: 749, surveyFee: 725, pestInspectionCost: 241,
      lawyerFee: 967, titleInsuranceCost: 0.0057, recordingFees: 314, creditReportFee: 65, floodDeterminationFee: 46
    },
    'Colusa County': {
      inspectionCost: 624, appraisalCost: 806, surveyFee: 780, pestInspectionCost: 260,
      lawyerFee: 1040, titleInsuranceCost: 0.0058, recordingFees: 338, creditReportFee: 70, floodDeterminationFee: 49
    },
    'Contra Costa County': {
      inspectionCost: 588, appraisalCost: 760, surveyFee: 735, pestInspectionCost: 245,
      lawyerFee: 981, titleInsuranceCost: 0.0057, recordingFees: 318, creditReportFee: 66, floodDeterminationFee: 47
    },
    'Del Norte County': {
      inspectionCost: 602, appraisalCost: 778, surveyFee: 753, pestInspectionCost: 251,
      lawyerFee: 1004, titleInsuranceCost: 0.0058, recordingFees: 326, creditReportFee: 68, floodDeterminationFee: 48
    },
    'El Dorado County': {
      inspectionCost: 629, appraisalCost: 812, surveyFee: 786, pestInspectionCost: 262,
      lawyerFee: 1049, titleInsuranceCost: 0.0058, recordingFees: 340, creditReportFee: 71, floodDeterminationFee: 50
    },
    'Fresno County': {
      inspectionCost: 580, appraisalCost: 750, surveyFee: 726, pestInspectionCost: 242,
      lawyerFee: 968, titleInsuranceCost: 0.0057, recordingFees: 314, creditReportFee: 65, floodDeterminationFee: 46
    },
    'Glenn County': {
      inspectionCost: 623, appraisalCost: 805, surveyFee: 779, pestInspectionCost: 259,
      lawyerFee: 1039, titleInsuranceCost: 0.0058, recordingFees: 337, creditReportFee: 70, floodDeterminationFee: 49
    },
    'Humboldt County': {
      inspectionCost: 605, appraisalCost: 781, surveyFee: 756, pestInspectionCost: 252,
      lawyerFee: 1008, titleInsuranceCost: 0.0058, recordingFees: 327, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Imperial County': {
      inspectionCost: 573, appraisalCost: 740, surveyFee: 716, pestInspectionCost: 238,
      lawyerFee: 955, titleInsuranceCost: 0.0057, recordingFees: 310, creditReportFee: 64, floodDeterminationFee: 45
    },
    'Inyo County': {
      inspectionCost: 628, appraisalCost: 811, surveyFee: 785, pestInspectionCost: 261,
      lawyerFee: 1047, titleInsuranceCost: 0.0058, recordingFees: 340, creditReportFee: 71, floodDeterminationFee: 50
    },
    'Kern County': {
      inspectionCost: 589, appraisalCost: 761, surveyFee: 736, pestInspectionCost: 245,
      lawyerFee: 982, titleInsuranceCost: 0.0057, recordingFees: 319, creditReportFee: 66, floodDeterminationFee: 47
    },
    'Kings County': {
      inspectionCost: 610, appraisalCost: 788, surveyFee: 763, pestInspectionCost: 254,
      lawyerFee: 1018, titleInsuranceCost: 0.0058, recordingFees: 330, creditReportFee: 69, floodDeterminationFee: 48
    },
    'Lake County': {
      inspectionCost: 582, appraisalCost: 752, surveyFee: 728, pestInspectionCost: 242,
      lawyerFee: 971, titleInsuranceCost: 0.0057, recordingFees: 315, creditReportFee: 66, floodDeterminationFee: 46
    },
    'Lassen County': {
      inspectionCost: 611, appraisalCost: 789, surveyFee: 764, pestInspectionCost: 254,
      lawyerFee: 1018, titleInsuranceCost: 0.0058, recordingFees: 331, creditReportFee: 69, floodDeterminationFee: 48
    },
    'Los Angeles County': {
      inspectionCost: 610, appraisalCost: 788, surveyFee: 763, pestInspectionCost: 254,
      lawyerFee: 1018, titleInsuranceCost: 0.0058, recordingFees: 330, creditReportFee: 69, floodDeterminationFee: 48
    },
    'Madera County': {
      inspectionCost: 583, appraisalCost: 753, surveyFee: 729, pestInspectionCost: 243,
      lawyerFee: 972, titleInsuranceCost: 0.0057, recordingFees: 315, creditReportFee: 66, floodDeterminationFee: 46
    },
    'Marin County': {
      inspectionCost: 629, appraisalCost: 812, surveyFee: 786, pestInspectionCost: 262,
      lawyerFee: 1049, titleInsuranceCost: 0.0058, recordingFees: 340, creditReportFee: 71, floodDeterminationFee: 50
    },
    'Mariposa County': {
      inspectionCost: 608, appraisalCost: 786, surveyFee: 761, pestInspectionCost: 253,
      lawyerFee: 1014, titleInsuranceCost: 0.0058, recordingFees: 329, creditReportFee: 69, floodDeterminationFee: 48
    },
    'Mendocino County': {
      inspectionCost: 605, appraisalCost: 781, surveyFee: 756, pestInspectionCost: 252,
      lawyerFee: 1008, titleInsuranceCost: 0.0058, recordingFees: 327, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Merced County': {
      inspectionCost: 601, appraisalCost: 776, surveyFee: 751, pestInspectionCost: 250,
      lawyerFee: 1002, titleInsuranceCost: 0.0058, recordingFees: 325, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Modoc County': {
      inspectionCost: 627, appraisalCost: 809, surveyFee: 783, pestInspectionCost: 261,
      lawyerFee: 1045, titleInsuranceCost: 0.0058, recordingFees: 339, creditReportFee: 71, floodDeterminationFee: 50
    },
    'Mono County': {
      inspectionCost: 576, appraisalCost: 744, surveyFee: 720, pestInspectionCost: 240,
      lawyerFee: 961, titleInsuranceCost: 0.0057, recordingFees: 312, creditReportFee: 65, floodDeterminationFee: 46
    },
    'Monterey County': {
      inspectionCost: 601, appraisalCost: 777, surveyFee: 752, pestInspectionCost: 250,
      lawyerFee: 1002, titleInsuranceCost: 0.0058, recordingFees: 325, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Napa County': {
      inspectionCost: 620, appraisalCost: 801, surveyFee: 775, pestInspectionCost: 258,
      lawyerFee: 1034, titleInsuranceCost: 0.0058, recordingFees: 336, creditReportFee: 70, floodDeterminationFee: 49
    },
    'Nevada County': {
      inspectionCost: 603, appraisalCost: 779, surveyFee: 754, pestInspectionCost: 251,
      lawyerFee: 1006, titleInsuranceCost: 0.0058, recordingFees: 326, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Orange County': {
      inspectionCost: 624, appraisalCost: 806, surveyFee: 780, pestInspectionCost: 260,
      lawyerFee: 1040, titleInsuranceCost: 0.0058, recordingFees: 338, creditReportFee: 70, floodDeterminationFee: 49
    },
    'Placer County': {
      inspectionCost: 616, appraisalCost: 796, surveyFee: 771, pestInspectionCost: 257,
      lawyerFee: 1028, titleInsuranceCost: 0.0058, recordingFees: 334, creditReportFee: 69, floodDeterminationFee: 49
    },
    'Plumas County': {
      inspectionCost: 591, appraisalCost: 764, surveyFee: 739, pestInspectionCost: 246,
      lawyerFee: 986, titleInsuranceCost: 0.0057, recordingFees: 320, creditReportFee: 67, floodDeterminationFee: 47
    },
    'Riverside County': {
      inspectionCost: 573, appraisalCost: 740, surveyFee: 717, pestInspectionCost: 239,
      lawyerFee: 956, titleInsuranceCost: 0.0057, recordingFees: 310, creditReportFee: 65, floodDeterminationFee: 45
    },
    'Sacramento County': {
      inspectionCost: 604, appraisalCost: 781, surveyFee: 756, pestInspectionCost: 252,
      lawyerFee: 1008, titleInsuranceCost: 0.0058, recordingFees: 327, creditReportFee: 68, floodDeterminationFee: 48
    },
    'San Benito County': {
      inspectionCost: 576, appraisalCost: 744, surveyFee: 720, pestInspectionCost: 240,
      lawyerFee: 961, titleInsuranceCost: 0.0057, recordingFees: 312, creditReportFee: 65, floodDeterminationFee: 46
    },
    'San Bernardino County': {
      inspectionCost: 593, appraisalCost: 766, surveyFee: 741, pestInspectionCost: 247,
      lawyerFee: 989, titleInsuranceCost: 0.0057, recordingFees: 321, creditReportFee: 67, floodDeterminationFee: 47
    },
    'San Diego County': {
      inspectionCost: 581, appraisalCost: 750, surveyFee: 726, pestInspectionCost: 242,
      lawyerFee: 969, titleInsuranceCost: 0.0057, recordingFees: 314, creditReportFee: 65, floodDeterminationFee: 46
    },
    'San Francisco County': {
      inspectionCost: 611, appraisalCost: 789, surveyFee: 764, pestInspectionCost: 254,
      lawyerFee: 1018, titleInsuranceCost: 0.0058, recordingFees: 331, creditReportFee: 69, floodDeterminationFee: 48
    },
    'San Joaquin County': {
      inspectionCost: 583, appraisalCost: 754, surveyFee: 729, pestInspectionCost: 243,
      lawyerFee: 973, titleInsuranceCost: 0.0057, recordingFees: 316, creditReportFee: 66, floodDeterminationFee: 46
    },
    'San Luis Obispo County': {
      inspectionCost: 586, appraisalCost: 757, surveyFee: 732, pestInspectionCost: 244,
      lawyerFee: 977, titleInsuranceCost: 0.0057, recordingFees: 317, creditReportFee: 66, floodDeterminationFee: 46
    },
    'San Mateo County': {
      inspectionCost: 597, appraisalCost: 771, surveyFee: 746, pestInspectionCost: 248,
      lawyerFee: 995, titleInsuranceCost: 0.0058, recordingFees: 323, creditReportFee: 67, floodDeterminationFee: 47
    },
    'Santa Barbara County': {
      inspectionCost: 587, appraisalCost: 758, surveyFee: 734, pestInspectionCost: 244,
      lawyerFee: 979, titleInsuranceCost: 0.0057, recordingFees: 318, creditReportFee: 66, floodDeterminationFee: 46
    },
    'Santa Clara County': {
      inspectionCost: 600, appraisalCost: 775, surveyFee: 750, pestInspectionCost: 250,
      lawyerFee: 1000, titleInsuranceCost: 0.0058, recordingFees: 325, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Santa Cruz County': {
      inspectionCost: 577, appraisalCost: 745, surveyFee: 721, pestInspectionCost: 240,
      lawyerFee: 962, titleInsuranceCost: 0.0057, recordingFees: 312, creditReportFee: 65, floodDeterminationFee: 46
    },
    'Shasta County': {
      inspectionCost: 605, appraisalCost: 781, surveyFee: 756, pestInspectionCost: 252,
      lawyerFee: 1008, titleInsuranceCost: 0.0058, recordingFees: 327, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Sierra County': {
      inspectionCost: 605, appraisalCost: 781, surveyFee: 756, pestInspectionCost: 252,
      lawyerFee: 1008, titleInsuranceCost: 0.0058, recordingFees: 327, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Siskiyou County': {
      inspectionCost: 618, appraisalCost: 798, surveyFee: 772, pestInspectionCost: 257,
      lawyerFee: 1030, titleInsuranceCost: 0.0058, recordingFees: 334, creditReportFee: 70, floodDeterminationFee: 49
    },
    'Solano County': {
      inspectionCost: 616, appraisalCost: 796, surveyFee: 771, pestInspectionCost: 257,
      lawyerFee: 1028, titleInsuranceCost: 0.0058, recordingFees: 334, creditReportFee: 69, floodDeterminationFee: 49
    },
    'Sonoma County': {
      inspectionCost: 610, appraisalCost: 788, surveyFee: 762, pestInspectionCost: 254,
      lawyerFee: 1016, titleInsuranceCost: 0.0058, recordingFees: 330, creditReportFee: 69, floodDeterminationFee: 48
    },
    'Stanislaus County': {
      inspectionCost: 583, appraisalCost: 754, surveyFee: 729, pestInspectionCost: 243,
      lawyerFee: 973, titleInsuranceCost: 0.0057, recordingFees: 316, creditReportFee: 66, floodDeterminationFee: 46
    },
    'Sutter County': {
      inspectionCost: 591, appraisalCost: 763, surveyFee: 738, pestInspectionCost: 246,
      lawyerFee: 985, titleInsuranceCost: 0.0057, recordingFees: 320, creditReportFee: 66, floodDeterminationFee: 47
    },
    'Tehama County': {
      inspectionCost: 593, appraisalCost: 766, surveyFee: 741, pestInspectionCost: 247,
      lawyerFee: 989, titleInsuranceCost: 0.0057, recordingFees: 321, creditReportFee: 67, floodDeterminationFee: 47
    },
    'Trinity County': {
      inspectionCost: 571, appraisalCost: 738, surveyFee: 714, pestInspectionCost: 238,
      lawyerFee: 953, titleInsuranceCost: 0.0057, recordingFees: 309, creditReportFee: 64, floodDeterminationFee: 45
    },
    'Tulare County': {
      inspectionCost: 610, appraisalCost: 788, surveyFee: 762, pestInspectionCost: 254,
      lawyerFee: 1016, titleInsuranceCost: 0.0058, recordingFees: 330, creditReportFee: 69, floodDeterminationFee: 48
    },
    'Tuolumne County': {
      inspectionCost: 604, appraisalCost: 781, surveyFee: 756, pestInspectionCost: 252,
      lawyerFee: 1008, titleInsuranceCost: 0.0058, recordingFees: 327, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Ventura County': {
      inspectionCost: 586, appraisalCost: 757, surveyFee: 732, pestInspectionCost: 244,
      lawyerFee: 977, titleInsuranceCost: 0.0057, recordingFees: 317, creditReportFee: 66, floodDeterminationFee: 46
    },
    'Yolo County': {
      inspectionCost: 585, appraisalCost: 756, surveyFee: 732, pestInspectionCost: 244,
      lawyerFee: 976, titleInsuranceCost: 0.0057, recordingFees: 317, creditReportFee: 66, floodDeterminationFee: 46
    },
    'Yuba County': {
      inspectionCost: 602, appraisalCost: 778, surveyFee: 753, pestInspectionCost: 251,
      lawyerFee: 1004, titleInsuranceCost: 0.0058, recordingFees: 326, creditReportFee: 68, floodDeterminationFee: 48
    },
    'Default': {
      inspectionCost: 600, appraisalCost: 775, surveyFee: 750, pestInspectionCost: 250,
      lawyerFee: 1000, titleInsuranceCost: 0.006, recordingFees: 325, creditReportFee: 68, floodDeterminationFee: 48
    },
  },
  // COLORADO
  'CO': {
    'Adams County': {
      inspectionCost: 465, appraisalCost: 579, surveyFee: 610, pestInspectionCost: 144,
      lawyerFee: 569, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Alamosa County': {
      inspectionCost: 456, appraisalCost: 568, surveyFee: 598, pestInspectionCost: 142,
      lawyerFee: 558, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Arapahoe County': {
      inspectionCost: 444, appraisalCost: 552, surveyFee: 582, pestInspectionCost: 138,
      lawyerFee: 542, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Archuleta County': {
      inspectionCost: 451, appraisalCost: 561, surveyFee: 591, pestInspectionCost: 140,
      lawyerFee: 551, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Baca County': {
      inspectionCost: 455, appraisalCost: 567, surveyFee: 597, pestInspectionCost: 141,
      lawyerFee: 557, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Bent County': {
      inspectionCost: 469, appraisalCost: 584, surveyFee: 615, pestInspectionCost: 146,
      lawyerFee: 574, titleInsuranceCost: 0.0056, recordingFees: 198, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Boulder County': {
      inspectionCost: 461, appraisalCost: 574, surveyFee: 605, pestInspectionCost: 143,
      lawyerFee: 564, titleInsuranceCost: 0.0056, recordingFees: 194, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Broomfield County': {
      inspectionCost: 434, appraisalCost: 540, surveyFee: 569, pestInspectionCost: 135,
      lawyerFee: 531, titleInsuranceCost: 0.0055, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Chaffee County': {
      inspectionCost: 454, appraisalCost: 565, surveyFee: 595, pestInspectionCost: 141,
      lawyerFee: 554, titleInsuranceCost: 0.0056, recordingFees: 191, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Cheyenne County': {
      inspectionCost: 460, appraisalCost: 572, surveyFee: 603, pestInspectionCost: 143,
      lawyerFee: 562, titleInsuranceCost: 0.0056, recordingFees: 194, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Clear Creek County': {
      inspectionCost: 452, appraisalCost: 563, surveyFee: 593, pestInspectionCost: 140,
      lawyerFee: 553, titleInsuranceCost: 0.0056, recordingFees: 191, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Conejos County': {
      inspectionCost: 440, appraisalCost: 547, surveyFee: 577, pestInspectionCost: 136,
      lawyerFee: 537, titleInsuranceCost: 0.0055, recordingFees: 185, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Costilla County': {
      inspectionCost: 459, appraisalCost: 572, surveyFee: 602, pestInspectionCost: 143,
      lawyerFee: 562, titleInsuranceCost: 0.0056, recordingFees: 194, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Crowley County': {
      inspectionCost: 465, appraisalCost: 579, surveyFee: 610, pestInspectionCost: 144,
      lawyerFee: 569, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Custer County': {
      inspectionCost: 456, appraisalCost: 568, surveyFee: 598, pestInspectionCost: 142,
      lawyerFee: 558, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Delta County': {
      inspectionCost: 431, appraisalCost: 537, surveyFee: 565, pestInspectionCost: 134,
      lawyerFee: 527, titleInsuranceCost: 0.0055, recordingFees: 182, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Denver County': {
      inspectionCost: 458, appraisalCost: 570, surveyFee: 600, pestInspectionCost: 142,
      lawyerFee: 559, titleInsuranceCost: 0.0056, recordingFees: 193, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Dolores County': {
      inspectionCost: 470, appraisalCost: 585, surveyFee: 616, pestInspectionCost: 146,
      lawyerFee: 574, titleInsuranceCost: 0.0056, recordingFees: 198, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Douglas County': {
      inspectionCost: 463, appraisalCost: 577, surveyFee: 608, pestInspectionCost: 144,
      lawyerFee: 567, titleInsuranceCost: 0.0056, recordingFees: 195, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Eagle County': {
      inspectionCost: 464, appraisalCost: 577, surveyFee: 608, pestInspectionCost: 144,
      lawyerFee: 567, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'El Paso County': {
      inspectionCost: 449, appraisalCost: 559, surveyFee: 589, pestInspectionCost: 139,
      lawyerFee: 549, titleInsuranceCost: 0.0056, recordingFees: 189, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Elbert County': {
      inspectionCost: 469, appraisalCost: 584, surveyFee: 615, pestInspectionCost: 146,
      lawyerFee: 574, titleInsuranceCost: 0.0056, recordingFees: 198, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Fremont County': {
      inspectionCost: 462, appraisalCost: 575, surveyFee: 605, pestInspectionCost: 143,
      lawyerFee: 564, titleInsuranceCost: 0.0056, recordingFees: 195, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Garfield County': {
      inspectionCost: 461, appraisalCost: 574, surveyFee: 605, pestInspectionCost: 143,
      lawyerFee: 564, titleInsuranceCost: 0.0056, recordingFees: 194, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Gilpin County': {
      inspectionCost: 438, appraisalCost: 545, surveyFee: 574, pestInspectionCost: 136,
      lawyerFee: 535, titleInsuranceCost: 0.0055, recordingFees: 185, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Grand County': {
      inspectionCost: 471, appraisalCost: 586, surveyFee: 618, pestInspectionCost: 146,
      lawyerFee: 576, titleInsuranceCost: 0.0056, recordingFees: 199, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Gunnison County': {
      inspectionCost: 453, appraisalCost: 563, surveyFee: 594, pestInspectionCost: 140,
      lawyerFee: 553, titleInsuranceCost: 0.0056, recordingFees: 191, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Hinsdale County': {
      inspectionCost: 433, appraisalCost: 539, surveyFee: 568, pestInspectionCost: 134,
      lawyerFee: 529, titleInsuranceCost: 0.0055, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Huerfano County': {
      inspectionCost: 447, appraisalCost: 557, surveyFee: 587, pestInspectionCost: 139,
      lawyerFee: 547, titleInsuranceCost: 0.0056, recordingFees: 189, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Jackson County': {
      inspectionCost: 447, appraisalCost: 557, surveyFee: 587, pestInspectionCost: 139,
      lawyerFee: 547, titleInsuranceCost: 0.0056, recordingFees: 189, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Jefferson County': {
      inspectionCost: 451, appraisalCost: 562, surveyFee: 592, pestInspectionCost: 140,
      lawyerFee: 552, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Kiowa County': {
      inspectionCost: 436, appraisalCost: 543, surveyFee: 572, pestInspectionCost: 135,
      lawyerFee: 534, titleInsuranceCost: 0.0055, recordingFees: 184, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Kit Carson County': {
      inspectionCost: 447, appraisalCost: 557, surveyFee: 587, pestInspectionCost: 139,
      lawyerFee: 547, titleInsuranceCost: 0.0056, recordingFees: 189, creditReportFee: 50, floodDeterminationFee: 27
    },
    'La Plata County': {
      inspectionCost: 442, appraisalCost: 551, surveyFee: 580, pestInspectionCost: 137,
      lawyerFee: 541, titleInsuranceCost: 0.0055, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Lake County': {
      inspectionCost: 436, appraisalCost: 543, surveyFee: 572, pestInspectionCost: 135,
      lawyerFee: 534, titleInsuranceCost: 0.0055, recordingFees: 184, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Larimer County': {
      inspectionCost: 427, appraisalCost: 532, surveyFee: 561, pestInspectionCost: 133,
      lawyerFee: 523, titleInsuranceCost: 0.0055, recordingFees: 180, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Las Animas County': {
      inspectionCost: 464, appraisalCost: 577, surveyFee: 608, pestInspectionCost: 144,
      lawyerFee: 567, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Lincoln County': {
      inspectionCost: 456, appraisalCost: 567, surveyFee: 598, pestInspectionCost: 141,
      lawyerFee: 557, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Logan County': {
      inspectionCost: 441, appraisalCost: 548, surveyFee: 578, pestInspectionCost: 137,
      lawyerFee: 539, titleInsuranceCost: 0.0055, recordingFees: 186, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Mesa County': {
      inspectionCost: 453, appraisalCost: 563, surveyFee: 594, pestInspectionCost: 140,
      lawyerFee: 553, titleInsuranceCost: 0.0056, recordingFees: 191, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Mineral County': {
      inspectionCost: 430, appraisalCost: 535, surveyFee: 564, pestInspectionCost: 133,
      lawyerFee: 526, titleInsuranceCost: 0.0055, recordingFees: 181, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Moffat County': {
      inspectionCost: 439, appraisalCost: 546, surveyFee: 575, pestInspectionCost: 136,
      lawyerFee: 536, titleInsuranceCost: 0.0055, recordingFees: 185, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Montezuma County': {
      inspectionCost: 444, appraisalCost: 553, surveyFee: 582, pestInspectionCost: 138,
      lawyerFee: 543, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Montrose County': {
      inspectionCost: 446, appraisalCost: 555, surveyFee: 585, pestInspectionCost: 138,
      lawyerFee: 545, titleInsuranceCost: 0.0056, recordingFees: 188, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Morgan County': {
      inspectionCost: 456, appraisalCost: 567, surveyFee: 598, pestInspectionCost: 141,
      lawyerFee: 557, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Otero County': {
      inspectionCost: 465, appraisalCost: 579, surveyFee: 610, pestInspectionCost: 144,
      lawyerFee: 568, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Ouray County': {
      inspectionCost: 468, appraisalCost: 582, surveyFee: 613, pestInspectionCost: 145,
      lawyerFee: 572, titleInsuranceCost: 0.0056, recordingFees: 197, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Park County': {
      inspectionCost: 439, appraisalCost: 547, surveyFee: 576, pestInspectionCost: 136,
      lawyerFee: 537, titleInsuranceCost: 0.0055, recordingFees: 185, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Phillips County': {
      inspectionCost: 466, appraisalCost: 580, surveyFee: 611, pestInspectionCost: 145,
      lawyerFee: 569, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 29
    },
    'Pitkin County': {
      inspectionCost: 452, appraisalCost: 563, surveyFee: 593, pestInspectionCost: 140,
      lawyerFee: 553, titleInsuranceCost: 0.0056, recordingFees: 191, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Prowers County': {
      inspectionCost: 464, appraisalCost: 577, surveyFee: 608, pestInspectionCost: 144,
      lawyerFee: 567, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Pueblo County': {
      inspectionCost: 455, appraisalCost: 566, surveyFee: 597, pestInspectionCost: 141,
      lawyerFee: 556, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Rio Blanco County': {
      inspectionCost: 463, appraisalCost: 577, surveyFee: 608, pestInspectionCost: 144,
      lawyerFee: 567, titleInsuranceCost: 0.0056, recordingFees: 195, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Rio Grande County': {
      inspectionCost: 448, appraisalCost: 557, surveyFee: 587, pestInspectionCost: 139,
      lawyerFee: 547, titleInsuranceCost: 0.0056, recordingFees: 189, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Routt County': {
      inspectionCost: 471, appraisalCost: 586, surveyFee: 617, pestInspectionCost: 146,
      lawyerFee: 575, titleInsuranceCost: 0.0056, recordingFees: 198, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Saguache County': {
      inspectionCost: 469, appraisalCost: 584, surveyFee: 615, pestInspectionCost: 146,
      lawyerFee: 573, titleInsuranceCost: 0.0056, recordingFees: 198, creditReportFee: 53, floodDeterminationFee: 29
    },
    'San Juan County': {
      inspectionCost: 447, appraisalCost: 556, surveyFee: 586, pestInspectionCost: 139,
      lawyerFee: 546, titleInsuranceCost: 0.0056, recordingFees: 188, creditReportFee: 50, floodDeterminationFee: 27
    },
    'San Miguel County': {
      inspectionCost: 463, appraisalCost: 576, surveyFee: 607, pestInspectionCost: 144,
      lawyerFee: 566, titleInsuranceCost: 0.0056, recordingFees: 195, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Sedgwick County': {
      inspectionCost: 442, appraisalCost: 550, surveyFee: 579, pestInspectionCost: 137,
      lawyerFee: 540, titleInsuranceCost: 0.0055, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Summit County': {
      inspectionCost: 452, appraisalCost: 562, surveyFee: 592, pestInspectionCost: 140,
      lawyerFee: 552, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Teller County': {
      inspectionCost: 451, appraisalCost: 561, surveyFee: 591, pestInspectionCost: 140,
      lawyerFee: 551, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Washington County': {
      inspectionCost: 451, appraisalCost: 562, surveyFee: 592, pestInspectionCost: 140,
      lawyerFee: 552, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Weld County': {
      inspectionCost: 451, appraisalCost: 562, surveyFee: 592, pestInspectionCost: 140,
      lawyerFee: 552, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Yuma County': {
      inspectionCost: 444, appraisalCost: 553, surveyFee: 582, pestInspectionCost: 138,
      lawyerFee: 543, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Default': {
      inspectionCost: 450, appraisalCost: 560, surveyFee: 590, pestInspectionCost: 140,
      lawyerFee: 550, titleInsuranceCost: 0.0058, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
  },
  // CONNECTICUT
  'CT': {
    'Default': {
      inspectionCost: 525, appraisalCost: 600, surveyFee: 500, pestInspectionCost: 200,
      lawyerFee: 1000, titleInsuranceCost: 0.007, recordingFees: 200, creditReportFee: 50, floodDeterminationFee: 28
    },
  },
  // DISTRICT OF COLUMBIA
  'DC': {
    'Default': {
      inspectionCost: 600, appraisalCost: 700, surveyFee: 625, pestInspectionCost: 205,
      lawyerFee: 1100, titleInsuranceCost: 0.007, recordingFees: 250, creditReportFee: 60, floodDeterminationFee: 32
    },
  },
  // DELAWARE
  'DE': {
    'Kent County': {
      inspectionCost: 410, appraisalCost: 489, surveyFee: 395, pestInspectionCost: 138,
      lawyerFee: 692, titleInsuranceCost: 0.0057, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'New Castle County': {
      inspectionCost: 422, appraisalCost: 503, surveyFee: 407, pestInspectionCost: 142,
      lawyerFee: 712, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Sussex County': {
      inspectionCost: 414, appraisalCost: 494, surveyFee: 399, pestInspectionCost: 139,
      lawyerFee: 699, titleInsuranceCost: 0.0058, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Default': {
      inspectionCost: 415, appraisalCost: 495, surveyFee: 400, pestInspectionCost: 140,
      lawyerFee: 700, titleInsuranceCost: 0.006, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // FLORIDA
  'FL': {
    'Alachua County': {
      inspectionCost: 483, appraisalCost: 610, surveyFee: 600, pestInspectionCost: 183,
      lawyerFee: 762, titleInsuranceCost: 0.0058, recordingFees: 203, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Baker County': {
      inspectionCost: 479, appraisalCost: 605, surveyFee: 595, pestInspectionCost: 181,
      lawyerFee: 756, titleInsuranceCost: 0.0058, recordingFees: 201, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Bay County': {
      inspectionCost: 490, appraisalCost: 619, surveyFee: 609, pestInspectionCost: 185,
      lawyerFee: 774, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Bradford County': {
      inspectionCost: 498, appraisalCost: 629, surveyFee: 618, pestInspectionCost: 188,
      lawyerFee: 786, titleInsuranceCost: 0.0058, recordingFees: 209, creditReportFee: 57, floodDeterminationFee: 41
    },
    'Brevard County': {
      inspectionCost: 473, appraisalCost: 598, surveyFee: 588, pestInspectionCost: 179,
      lawyerFee: 747, titleInsuranceCost: 0.0058, recordingFees: 199, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Broward County': {
      inspectionCost: 461, appraisalCost: 582, surveyFee: 572, pestInspectionCost: 174,
      lawyerFee: 728, titleInsuranceCost: 0.0057, recordingFees: 194, creditReportFee: 53, floodDeterminationFee: 38
    },
    'Calhoun County': {
      inspectionCost: 488, appraisalCost: 617, surveyFee: 607, pestInspectionCost: 185,
      lawyerFee: 771, titleInsuranceCost: 0.0058, recordingFees: 205, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Charlotte County': {
      inspectionCost: 472, appraisalCost: 596, surveyFee: 586, pestInspectionCost: 178,
      lawyerFee: 745, titleInsuranceCost: 0.0058, recordingFees: 198, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Citrus County': {
      inspectionCost: 498, appraisalCost: 629, surveyFee: 618, pestInspectionCost: 188,
      lawyerFee: 786, titleInsuranceCost: 0.0058, recordingFees: 209, creditReportFee: 57, floodDeterminationFee: 41
    },
    'Clay County': {
      inspectionCost: 455, appraisalCost: 574, surveyFee: 565, pestInspectionCost: 172,
      lawyerFee: 718, titleInsuranceCost: 0.0057, recordingFees: 191, creditReportFee: 52, floodDeterminationFee: 38
    },
    'Collier County': {
      inspectionCost: 467, appraisalCost: 591, surveyFee: 581, pestInspectionCost: 177,
      lawyerFee: 738, titleInsuranceCost: 0.0057, recordingFees: 197, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Columbia County': {
      inspectionCost: 491, appraisalCost: 621, surveyFee: 610, pestInspectionCost: 186,
      lawyerFee: 776, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'DeSoto County': {
      inspectionCost: 485, appraisalCost: 613, surveyFee: 603, pestInspectionCost: 184,
      lawyerFee: 767, titleInsuranceCost: 0.0058, recordingFees: 204, creditReportFee: 56, floodDeterminationFee: 40
    },
    'Dixie County': {
      inspectionCost: 476, appraisalCost: 601, surveyFee: 591, pestInspectionCost: 180,
      lawyerFee: 752, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Duval County': {
      inspectionCost: 495, appraisalCost: 625, surveyFee: 615, pestInspectionCost: 187,
      lawyerFee: 782, titleInsuranceCost: 0.0058, recordingFees: 208, creditReportFee: 57, floodDeterminationFee: 41
    },
    'Escambia County': {
      inspectionCost: 453, appraisalCost: 572, surveyFee: 562, pestInspectionCost: 171,
      lawyerFee: 715, titleInsuranceCost: 0.0057, recordingFees: 190, creditReportFee: 52, floodDeterminationFee: 38
    },
    'Flagler County': {
      inspectionCost: 466, appraisalCost: 589, surveyFee: 579, pestInspectionCost: 176,
      lawyerFee: 736, titleInsuranceCost: 0.0057, recordingFees: 196, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Franklin County': {
      inspectionCost: 463, appraisalCost: 585, surveyFee: 575, pestInspectionCost: 175,
      lawyerFee: 732, titleInsuranceCost: 0.0057, recordingFees: 195, creditReportFee: 53, floodDeterminationFee: 39
    },
    'Gadsden County': {
      inspectionCost: 490, appraisalCost: 619, surveyFee: 609, pestInspectionCost: 185,
      lawyerFee: 774, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Gilchrist County': {
      inspectionCost: 497, appraisalCost: 628, surveyFee: 618, pestInspectionCost: 188,
      lawyerFee: 786, titleInsuranceCost: 0.0058, recordingFees: 209, creditReportFee: 57, floodDeterminationFee: 41
    },
    'Glades County': {
      inspectionCost: 491, appraisalCost: 620, surveyFee: 610, pestInspectionCost: 186,
      lawyerFee: 775, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Gulf County': {
      inspectionCost: 489, appraisalCost: 618, surveyFee: 608, pestInspectionCost: 185,
      lawyerFee: 773, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Hamilton County': {
      inspectionCost: 451, appraisalCost: 570, surveyFee: 561, pestInspectionCost: 171,
      lawyerFee: 713, titleInsuranceCost: 0.0057, recordingFees: 190, creditReportFee: 52, floodDeterminationFee: 38
    },
    'Hardee County': {
      inspectionCost: 488, appraisalCost: 617, surveyFee: 607, pestInspectionCost: 185,
      lawyerFee: 771, titleInsuranceCost: 0.0058, recordingFees: 205, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Hendry County': {
      inspectionCost: 479, appraisalCost: 606, surveyFee: 595, pestInspectionCost: 181,
      lawyerFee: 757, titleInsuranceCost: 0.0058, recordingFees: 202, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Hernando County': {
      inspectionCost: 451, appraisalCost: 570, surveyFee: 561, pestInspectionCost: 171,
      lawyerFee: 713, titleInsuranceCost: 0.0057, recordingFees: 190, creditReportFee: 52, floodDeterminationFee: 38
    },
    'Highlands County': {
      inspectionCost: 460, appraisalCost: 582, surveyFee: 572, pestInspectionCost: 174,
      lawyerFee: 727, titleInsuranceCost: 0.0057, recordingFees: 194, creditReportFee: 53, floodDeterminationFee: 38
    },
    'Hillsborough County': {
      inspectionCost: 460, appraisalCost: 581, surveyFee: 571, pestInspectionCost: 174,
      lawyerFee: 726, titleInsuranceCost: 0.0057, recordingFees: 193, creditReportFee: 53, floodDeterminationFee: 38
    },
    'Holmes County': {
      inspectionCost: 475, appraisalCost: 600, surveyFee: 590, pestInspectionCost: 180,
      lawyerFee: 750, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Indian River County': {
      inspectionCost: 492, appraisalCost: 622, surveyFee: 611, pestInspectionCost: 186,
      lawyerFee: 777, titleInsuranceCost: 0.0058, recordingFees: 207, creditReportFee: 57, floodDeterminationFee: 41
    },
    'Jackson County': {
      inspectionCost: 472, appraisalCost: 597, surveyFee: 587, pestInspectionCost: 179,
      lawyerFee: 746, titleInsuranceCost: 0.0058, recordingFees: 199, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Jefferson County': {
      inspectionCost: 476, appraisalCost: 602, surveyFee: 592, pestInspectionCost: 180,
      lawyerFee: 753, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Lafayette County': {
      inspectionCost: 480, appraisalCost: 607, surveyFee: 597, pestInspectionCost: 182,
      lawyerFee: 759, titleInsuranceCost: 0.0058, recordingFees: 202, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Lake County': {
      inspectionCost: 461, appraisalCost: 582, surveyFee: 572, pestInspectionCost: 174,
      lawyerFee: 728, titleInsuranceCost: 0.0057, recordingFees: 194, creditReportFee: 53, floodDeterminationFee: 38
    },
    'Lee County': {
      inspectionCost: 475, appraisalCost: 600, surveyFee: 590, pestInspectionCost: 180,
      lawyerFee: 750, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Leon County': {
      inspectionCost: 472, appraisalCost: 597, surveyFee: 587, pestInspectionCost: 179,
      lawyerFee: 746, titleInsuranceCost: 0.0058, recordingFees: 199, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Levy County': {
      inspectionCost: 466, appraisalCost: 589, surveyFee: 579, pestInspectionCost: 176,
      lawyerFee: 736, titleInsuranceCost: 0.0057, recordingFees: 196, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Liberty County': {
      inspectionCost: 454, appraisalCost: 574, surveyFee: 564, pestInspectionCost: 172,
      lawyerFee: 717, titleInsuranceCost: 0.0057, recordingFees: 191, creditReportFee: 52, floodDeterminationFee: 38
    },
    'Madison County': {
      inspectionCost: 489, appraisalCost: 618, surveyFee: 607, pestInspectionCost: 185,
      lawyerFee: 772, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Manatee County': {
      inspectionCost: 489, appraisalCost: 618, surveyFee: 607, pestInspectionCost: 185,
      lawyerFee: 772, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Marion County': {
      inspectionCost: 480, appraisalCost: 606, surveyFee: 596, pestInspectionCost: 181,
      lawyerFee: 758, titleInsuranceCost: 0.0058, recordingFees: 202, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Martin County': {
      inspectionCost: 490, appraisalCost: 619, surveyFee: 608, pestInspectionCost: 185,
      lawyerFee: 774, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Miami-Dade County': {
      inspectionCost: 480, appraisalCost: 607, surveyFee: 597, pestInspectionCost: 182,
      lawyerFee: 759, titleInsuranceCost: 0.0058, recordingFees: 202, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Monroe County': {
      inspectionCost: 475, appraisalCost: 601, surveyFee: 591, pestInspectionCost: 180,
      lawyerFee: 751, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Nassau County': {
      inspectionCost: 486, appraisalCost: 614, surveyFee: 604, pestInspectionCost: 184,
      lawyerFee: 768, titleInsuranceCost: 0.0058, recordingFees: 204, creditReportFee: 56, floodDeterminationFee: 40
    },
    'Okaloosa County': {
      inspectionCost: 454, appraisalCost: 573, surveyFee: 564, pestInspectionCost: 172,
      lawyerFee: 717, titleInsuranceCost: 0.0057, recordingFees: 191, creditReportFee: 52, floodDeterminationFee: 38
    },
    'Okeechobee County': {
      inspectionCost: 473, appraisalCost: 597, surveyFee: 587, pestInspectionCost: 179,
      lawyerFee: 747, titleInsuranceCost: 0.0058, recordingFees: 199, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Orange County': {
      inspectionCost: 494, appraisalCost: 624, surveyFee: 613, pestInspectionCost: 187,
      lawyerFee: 780, titleInsuranceCost: 0.0058, recordingFees: 208, creditReportFee: 57, floodDeterminationFee: 41
    },
    'Osceola County': {
      inspectionCost: 488, appraisalCost: 617, surveyFee: 607, pestInspectionCost: 185,
      lawyerFee: 771, titleInsuranceCost: 0.0058, recordingFees: 205, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Palm Beach County': {
      inspectionCost: 475, appraisalCost: 600, surveyFee: 590, pestInspectionCost: 180,
      lawyerFee: 750, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Pasco County': {
      inspectionCost: 488, appraisalCost: 616, surveyFee: 606, pestInspectionCost: 185,
      lawyerFee: 771, titleInsuranceCost: 0.0058, recordingFees: 205, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Pinellas County': {
      inspectionCost: 462, appraisalCost: 584, surveyFee: 574, pestInspectionCost: 175,
      lawyerFee: 730, titleInsuranceCost: 0.0057, recordingFees: 194, creditReportFee: 53, floodDeterminationFee: 38
    },
    'Polk County': {
      inspectionCost: 491, appraisalCost: 620, surveyFee: 610, pestInspectionCost: 186,
      lawyerFee: 775, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Putnam County': {
      inspectionCost: 484, appraisalCost: 611, surveyFee: 601, pestInspectionCost: 183,
      lawyerFee: 764, titleInsuranceCost: 0.0058, recordingFees: 203, creditReportFee: 56, floodDeterminationFee: 40
    },
    'Santa Rosa County': {
      inspectionCost: 493, appraisalCost: 623, surveyFee: 613, pestInspectionCost: 187,
      lawyerFee: 779, titleInsuranceCost: 0.0058, recordingFees: 207, creditReportFee: 57, floodDeterminationFee: 41
    },
    'Sarasota County': {
      inspectionCost: 465, appraisalCost: 588, surveyFee: 578, pestInspectionCost: 176,
      lawyerFee: 735, titleInsuranceCost: 0.0057, recordingFees: 196, creditReportFee: 53, floodDeterminationFee: 39
    },
    'Seminole County': {
      inspectionCost: 471, appraisalCost: 595, surveyFee: 585, pestInspectionCost: 178,
      lawyerFee: 744, titleInsuranceCost: 0.0058, recordingFees: 198, creditReportFee: 54, floodDeterminationFee: 39
    },
    'St. Johns County': {
      inspectionCost: 482, appraisalCost: 609, surveyFee: 599, pestInspectionCost: 182,
      lawyerFee: 762, titleInsuranceCost: 0.0058, recordingFees: 203, creditReportFee: 55, floodDeterminationFee: 40
    },
    'St. Lucie County': {
      inspectionCost: 476, appraisalCost: 601, surveyFee: 591, pestInspectionCost: 180,
      lawyerFee: 752, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Sumter County': {
      inspectionCost: 451, appraisalCost: 570, surveyFee: 560, pestInspectionCost: 171,
      lawyerFee: 712, titleInsuranceCost: 0.0057, recordingFees: 190, creditReportFee: 52, floodDeterminationFee: 38
    },
    'Suwannee County': {
      inspectionCost: 491, appraisalCost: 621, surveyFee: 610, pestInspectionCost: 186,
      lawyerFee: 776, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Taylor County': {
      inspectionCost: 491, appraisalCost: 621, surveyFee: 610, pestInspectionCost: 186,
      lawyerFee: 776, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 56, floodDeterminationFee: 41
    },
    'Union County': {
      inspectionCost: 467, appraisalCost: 591, surveyFee: 581, pestInspectionCost: 177,
      lawyerFee: 738, titleInsuranceCost: 0.0057, recordingFees: 197, creditReportFee: 54, floodDeterminationFee: 39
    },
    'Volusia County': {
      inspectionCost: 475, appraisalCost: 600, surveyFee: 590, pestInspectionCost: 180,
      lawyerFee: 750, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Wakulla County': {
      inspectionCost: 495, appraisalCost: 625, surveyFee: 615, pestInspectionCost: 187,
      lawyerFee: 782, titleInsuranceCost: 0.0058, recordingFees: 208, creditReportFee: 57, floodDeterminationFee: 41
    },
    'Walton County': {
      inspectionCost: 485, appraisalCost: 613, surveyFee: 602, pestInspectionCost: 183,
      lawyerFee: 766, titleInsuranceCost: 0.0058, recordingFees: 204, creditReportFee: 56, floodDeterminationFee: 40
    },
    'Washington County': {
      inspectionCost: 476, appraisalCost: 602, surveyFee: 592, pestInspectionCost: 180,
      lawyerFee: 753, titleInsuranceCost: 0.0058, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
    'Default': {
      inspectionCost: 475, appraisalCost: 600, surveyFee: 590, pestInspectionCost: 180,
      lawyerFee: 750, titleInsuranceCost: 0.006, recordingFees: 200, creditReportFee: 55, floodDeterminationFee: 40
    },
  },
  // GEORGIA
  'GA': {
    'Appling County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 393, pestInspectionCost: 145,
      lawyerFee: 656, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Atkinson County': {
      inspectionCost: 417, appraisalCost: 521, surveyFee: 402, pestInspectionCost: 149,
      lawyerFee: 670, titleInsuranceCost: 0.0058, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Bacon County': {
      inspectionCost: 410, appraisalCost: 513, surveyFee: 396, pestInspectionCost: 146,
      lawyerFee: 660, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Baker County': {
      inspectionCost: 423, appraisalCost: 529, surveyFee: 408, pestInspectionCost: 151,
      lawyerFee: 681, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Baldwin County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 415, pestInspectionCost: 153,
      lawyerFee: 692, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Banks County': {
      inspectionCost: 399, appraisalCost: 498, surveyFee: 384, pestInspectionCost: 142,
      lawyerFee: 641, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Barrow County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 394, pestInspectionCost: 145,
      lawyerFee: 656, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Bartow County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 410, pestInspectionCost: 151,
      lawyerFee: 683, titleInsuranceCost: 0.0059, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Ben Hill County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 401, pestInspectionCost: 148,
      lawyerFee: 668, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Berrien County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 393, pestInspectionCost: 145,
      lawyerFee: 656, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Bibb County': {
      inspectionCost: 412, appraisalCost: 515, surveyFee: 397, pestInspectionCost: 147,
      lawyerFee: 662, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Bleckley County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 405, pestInspectionCost: 150,
      lawyerFee: 675, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Brantley County': {
      inspectionCost: 399, appraisalCost: 498, surveyFee: 384, pestInspectionCost: 142,
      lawyerFee: 641, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Brooks County': {
      inspectionCost: 403, appraisalCost: 504, surveyFee: 389, pestInspectionCost: 144,
      lawyerFee: 648, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Bryan County': {
      inspectionCost: 423, appraisalCost: 529, surveyFee: 408, pestInspectionCost: 151,
      lawyerFee: 681, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Bulloch County': {
      inspectionCost: 432, appraisalCost: 540, surveyFee: 416, pestInspectionCost: 154,
      lawyerFee: 694, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Burke County': {
      inspectionCost: 415, appraisalCost: 519, surveyFee: 400, pestInspectionCost: 148,
      lawyerFee: 668, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Butts County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 405, pestInspectionCost: 150,
      lawyerFee: 675, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Calhoun County': {
      inspectionCost: 432, appraisalCost: 540, surveyFee: 416, pestInspectionCost: 154,
      lawyerFee: 694, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Camden County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 401, pestInspectionCost: 148,
      lawyerFee: 669, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Candler County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 423, pestInspectionCost: 156,
      lawyerFee: 705, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Carroll County': {
      inspectionCost: 404, appraisalCost: 506, surveyFee: 390, pestInspectionCost: 144,
      lawyerFee: 650, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Catoosa County': {
      inspectionCost: 410, appraisalCost: 512, surveyFee: 395, pestInspectionCost: 146,
      lawyerFee: 659, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Charlton County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 392, pestInspectionCost: 145,
      lawyerFee: 654, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Chatham County': {
      inspectionCost: 405, appraisalCost: 507, surveyFee: 391, pestInspectionCost: 144,
      lawyerFee: 652, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Chattahoochee County': {
      inspectionCost: 414, appraisalCost: 518, surveyFee: 399, pestInspectionCost: 148,
      lawyerFee: 666, titleInsuranceCost: 0.0058, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Chattooga County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 405, pestInspectionCost: 150,
      lawyerFee: 675, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Cherokee County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 395, pestInspectionCost: 146,
      lawyerFee: 658, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Clarke County': {
      inspectionCost: 414, appraisalCost: 518, surveyFee: 400, pestInspectionCost: 148,
      lawyerFee: 666, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Clay County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 387, pestInspectionCost: 143,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Clayton County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 409, pestInspectionCost: 151,
      lawyerFee: 683, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Clinch County': {
      inspectionCost: 434, appraisalCost: 542, surveyFee: 418, pestInspectionCost: 155,
      lawyerFee: 697, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Cobb County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 423, pestInspectionCost: 156,
      lawyerFee: 705, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Coffee County': {
      inspectionCost: 429, appraisalCost: 536, surveyFee: 413, pestInspectionCost: 153,
      lawyerFee: 689, titleInsuranceCost: 0.0059, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Colquitt County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 405, pestInspectionCost: 150,
      lawyerFee: 675, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Columbia County': {
      inspectionCost: 434, appraisalCost: 543, surveyFee: 419, pestInspectionCost: 155,
      lawyerFee: 698, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Cook County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 409, pestInspectionCost: 151,
      lawyerFee: 683, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Coweta County': {
      inspectionCost: 429, appraisalCost: 537, surveyFee: 414, pestInspectionCost: 153,
      lawyerFee: 690, titleInsuranceCost: 0.0059, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Crawford County': {
      inspectionCost: 437, appraisalCost: 547, surveyFee: 422, pestInspectionCost: 156,
      lawyerFee: 703, titleInsuranceCost: 0.0059, recordingFees: 171, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Crisp County': {
      inspectionCost: 414, appraisalCost: 517, surveyFee: 399, pestInspectionCost: 147,
      lawyerFee: 665, titleInsuranceCost: 0.0058, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Dade County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 387, pestInspectionCost: 143,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Dawson County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 401, pestInspectionCost: 148,
      lawyerFee: 669, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'DeKalb County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 401, pestInspectionCost: 148,
      lawyerFee: 669, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Decatur County': {
      inspectionCost: 417, appraisalCost: 521, surveyFee: 402, pestInspectionCost: 149,
      lawyerFee: 670, titleInsuranceCost: 0.0058, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Dodge County': {
      inspectionCost: 438, appraisalCost: 547, surveyFee: 422, pestInspectionCost: 156,
      lawyerFee: 704, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Dooly County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 387, pestInspectionCost: 143,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Dougherty County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 387, pestInspectionCost: 143,
      lawyerFee: 645, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Douglas County': {
      inspectionCost: 433, appraisalCost: 541, surveyFee: 417, pestInspectionCost: 154,
      lawyerFee: 695, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Early County': {
      inspectionCost: 418, appraisalCost: 522, surveyFee: 403, pestInspectionCost: 149,
      lawyerFee: 672, titleInsuranceCost: 0.0059, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Echols County': {
      inspectionCost: 431, appraisalCost: 539, surveyFee: 416, pestInspectionCost: 154,
      lawyerFee: 693, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Effingham County': {
      inspectionCost: 422, appraisalCost: 527, surveyFee: 407, pestInspectionCost: 150,
      lawyerFee: 678, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Elbert County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 422, pestInspectionCost: 156,
      lawyerFee: 704, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Emanuel County': {
      inspectionCost: 411, appraisalCost: 513, surveyFee: 396, pestInspectionCost: 146,
      lawyerFee: 660, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Evans County': {
      inspectionCost: 439, appraisalCost: 549, surveyFee: 424, pestInspectionCost: 157,
      lawyerFee: 706, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Fannin County': {
      inspectionCost: 437, appraisalCost: 547, surveyFee: 422, pestInspectionCost: 156,
      lawyerFee: 703, titleInsuranceCost: 0.0059, recordingFees: 171, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Fayette County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 395, pestInspectionCost: 146,
      lawyerFee: 658, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Floyd County': {
      inspectionCost: 421, appraisalCost: 527, surveyFee: 406, pestInspectionCost: 150,
      lawyerFee: 677, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Forsyth County': {
      inspectionCost: 417, appraisalCost: 521, surveyFee: 402, pestInspectionCost: 149,
      lawyerFee: 670, titleInsuranceCost: 0.0058, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Franklin County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 395, pestInspectionCost: 146,
      lawyerFee: 658, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Fulton County': {
      inspectionCost: 433, appraisalCost: 542, surveyFee: 418, pestInspectionCost: 154,
      lawyerFee: 697, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Gilmer County': {
      inspectionCost: 433, appraisalCost: 541, surveyFee: 417, pestInspectionCost: 154,
      lawyerFee: 696, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Glascock County': {
      inspectionCost: 440, appraisalCost: 550, surveyFee: 424, pestInspectionCost: 157,
      lawyerFee: 708, titleInsuranceCost: 0.0059, recordingFees: 173, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Glynn County': {
      inspectionCost: 412, appraisalCost: 515, surveyFee: 397, pestInspectionCost: 147,
      lawyerFee: 662, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Gordon County': {
      inspectionCost: 409, appraisalCost: 511, surveyFee: 394, pestInspectionCost: 146,
      lawyerFee: 657, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Grady County': {
      inspectionCost: 409, appraisalCost: 511, surveyFee: 394, pestInspectionCost: 146,
      lawyerFee: 657, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Greene County': {
      inspectionCost: 409, appraisalCost: 511, surveyFee: 394, pestInspectionCost: 146,
      lawyerFee: 657, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Gwinnett County': {
      inspectionCost: 422, appraisalCost: 528, surveyFee: 407, pestInspectionCost: 151,
      lawyerFee: 679, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Habersham County': {
      inspectionCost: 417, appraisalCost: 522, surveyFee: 402, pestInspectionCost: 149,
      lawyerFee: 671, titleInsuranceCost: 0.0058, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Hall County': {
      inspectionCost: 433, appraisalCost: 542, surveyFee: 418, pestInspectionCost: 154,
      lawyerFee: 697, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Hancock County': {
      inspectionCost: 427, appraisalCost: 534, surveyFee: 412, pestInspectionCost: 152,
      lawyerFee: 687, titleInsuranceCost: 0.0059, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Haralson County': {
      inspectionCost: 417, appraisalCost: 521, surveyFee: 402, pestInspectionCost: 148,
      lawyerFee: 670, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Harris County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 385, pestInspectionCost: 142,
      lawyerFee: 643, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Hart County': {
      inspectionCost: 435, appraisalCost: 544, surveyFee: 419, pestInspectionCost: 155,
      lawyerFee: 699, titleInsuranceCost: 0.0059, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Heard County': {
      inspectionCost: 436, appraisalCost: 545, surveyFee: 420, pestInspectionCost: 155,
      lawyerFee: 701, titleInsuranceCost: 0.0059, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Henry County': {
      inspectionCost: 427, appraisalCost: 534, surveyFee: 412, pestInspectionCost: 152,
      lawyerFee: 687, titleInsuranceCost: 0.0059, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Houston County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 423, pestInspectionCost: 156,
      lawyerFee: 705, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Irwin County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 415, pestInspectionCost: 153,
      lawyerFee: 691, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Jackson County': {
      inspectionCost: 417, appraisalCost: 522, surveyFee: 402, pestInspectionCost: 149,
      lawyerFee: 671, titleInsuranceCost: 0.0058, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Jasper County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 415, pestInspectionCost: 153,
      lawyerFee: 692, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Jeff Davis County': {
      inspectionCost: 412, appraisalCost: 516, surveyFee: 398, pestInspectionCost: 147,
      lawyerFee: 663, titleInsuranceCost: 0.0058, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Jefferson County': {
      inspectionCost: 421, appraisalCost: 527, surveyFee: 406, pestInspectionCost: 150,
      lawyerFee: 677, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Jenkins County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 401, pestInspectionCost: 148,
      lawyerFee: 668, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Johnson County': {
      inspectionCost: 429, appraisalCost: 536, surveyFee: 413, pestInspectionCost: 153,
      lawyerFee: 689, titleInsuranceCost: 0.0059, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Jones County': {
      inspectionCost: 428, appraisalCost: 535, surveyFee: 413, pestInspectionCost: 153,
      lawyerFee: 688, titleInsuranceCost: 0.0059, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Lamar County': {
      inspectionCost: 411, appraisalCost: 513, surveyFee: 396, pestInspectionCost: 146,
      lawyerFee: 660, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Lanier County': {
      inspectionCost: 422, appraisalCost: 527, surveyFee: 407, pestInspectionCost: 150,
      lawyerFee: 678, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Laurens County': {
      inspectionCost: 399, appraisalCost: 499, surveyFee: 385, pestInspectionCost: 142,
      lawyerFee: 642, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lee County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 405, pestInspectionCost: 150,
      lawyerFee: 675, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Liberty County': {
      inspectionCost: 401, appraisalCost: 502, surveyFee: 387, pestInspectionCost: 143,
      lawyerFee: 645, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lincoln County': {
      inspectionCost: 425, appraisalCost: 532, surveyFee: 410, pestInspectionCost: 152,
      lawyerFee: 684, titleInsuranceCost: 0.0059, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Long County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 386, pestInspectionCost: 143,
      lawyerFee: 643, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lowndes County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 415, pestInspectionCost: 153,
      lawyerFee: 691, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Lumpkin County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 415, pestInspectionCost: 153,
      lawyerFee: 692, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Macon County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 415, pestInspectionCost: 153,
      lawyerFee: 691, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Madison County': {
      inspectionCost: 432, appraisalCost: 540, surveyFee: 417, pestInspectionCost: 154,
      lawyerFee: 695, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Marion County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 409, pestInspectionCost: 151,
      lawyerFee: 682, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'McDuffie County': {
      inspectionCost: 413, appraisalCost: 516, surveyFee: 398, pestInspectionCost: 147,
      lawyerFee: 664, titleInsuranceCost: 0.0058, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'McIntosh County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 415, pestInspectionCost: 153,
      lawyerFee: 691, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Meriwether County': {
      inspectionCost: 419, appraisalCost: 523, surveyFee: 404, pestInspectionCost: 149,
      lawyerFee: 673, titleInsuranceCost: 0.0059, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Miller County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 423, pestInspectionCost: 156,
      lawyerFee: 705, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Mitchell County': {
      inspectionCost: 403, appraisalCost: 504, surveyFee: 388, pestInspectionCost: 144,
      lawyerFee: 648, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Monroe County': {
      inspectionCost: 420, appraisalCost: 526, surveyFee: 405, pestInspectionCost: 150,
      lawyerFee: 676, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Montgomery County': {
      inspectionCost: 401, appraisalCost: 502, surveyFee: 387, pestInspectionCost: 143,
      lawyerFee: 645, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Morgan County': {
      inspectionCost: 425, appraisalCost: 532, surveyFee: 410, pestInspectionCost: 152,
      lawyerFee: 684, titleInsuranceCost: 0.0059, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Murray County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 401, pestInspectionCost: 148,
      lawyerFee: 668, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Muscogee County': {
      inspectionCost: 439, appraisalCost: 549, surveyFee: 423, pestInspectionCost: 156,
      lawyerFee: 706, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Newton County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 409, pestInspectionCost: 151,
      lawyerFee: 681, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Oconee County': {
      inspectionCost: 411, appraisalCost: 513, surveyFee: 396, pestInspectionCost: 146,
      lawyerFee: 660, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Oglethorpe County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 386, pestInspectionCost: 143,
      lawyerFee: 643, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Paulding County': {
      inspectionCost: 425, appraisalCost: 532, surveyFee: 410, pestInspectionCost: 152,
      lawyerFee: 684, titleInsuranceCost: 0.0059, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Peach County': {
      inspectionCost: 425, appraisalCost: 532, surveyFee: 410, pestInspectionCost: 152,
      lawyerFee: 684, titleInsuranceCost: 0.0059, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Pickens County': {
      inspectionCost: 422, appraisalCost: 528, surveyFee: 407, pestInspectionCost: 150,
      lawyerFee: 679, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Pierce County': {
      inspectionCost: 405, appraisalCost: 506, surveyFee: 390, pestInspectionCost: 144,
      lawyerFee: 651, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Pike County': {
      inspectionCost: 407, appraisalCost: 509, surveyFee: 392, pestInspectionCost: 145,
      lawyerFee: 654, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Polk County': {
      inspectionCost: 434, appraisalCost: 542, surveyFee: 418, pestInspectionCost: 155,
      lawyerFee: 697, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Pulaski County': {
      inspectionCost: 407, appraisalCost: 509, surveyFee: 393, pestInspectionCost: 145,
      lawyerFee: 655, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Putnam County': {
      inspectionCost: 427, appraisalCost: 534, surveyFee: 412, pestInspectionCost: 152,
      lawyerFee: 687, titleInsuranceCost: 0.0059, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Quitman County': {
      inspectionCost: 438, appraisalCost: 547, surveyFee: 422, pestInspectionCost: 156,
      lawyerFee: 704, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Rabun County': {
      inspectionCost: 418, appraisalCost: 523, surveyFee: 403, pestInspectionCost: 149,
      lawyerFee: 672, titleInsuranceCost: 0.0059, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Randolph County': {
      inspectionCost: 411, appraisalCost: 514, surveyFee: 396, pestInspectionCost: 147,
      lawyerFee: 661, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Richmond County': {
      inspectionCost: 440, appraisalCost: 550, surveyFee: 424, pestInspectionCost: 157,
      lawyerFee: 707, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Rockdale County': {
      inspectionCost: 436, appraisalCost: 545, surveyFee: 420, pestInspectionCost: 155,
      lawyerFee: 701, titleInsuranceCost: 0.0059, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Schley County': {
      inspectionCost: 409, appraisalCost: 511, surveyFee: 394, pestInspectionCost: 146,
      lawyerFee: 657, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Screven County': {
      inspectionCost: 419, appraisalCost: 523, surveyFee: 404, pestInspectionCost: 149,
      lawyerFee: 673, titleInsuranceCost: 0.0059, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Seminole County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 401, pestInspectionCost: 148,
      lawyerFee: 669, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Spalding County': {
      inspectionCost: 439, appraisalCost: 549, surveyFee: 423, pestInspectionCost: 156,
      lawyerFee: 706, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Stephens County': {
      inspectionCost: 404, appraisalCost: 506, surveyFee: 390, pestInspectionCost: 144,
      lawyerFee: 650, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Stewart County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 415, pestInspectionCost: 153,
      lawyerFee: 692, titleInsuranceCost: 0.0059, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Sumter County': {
      inspectionCost: 399, appraisalCost: 498, surveyFee: 384, pestInspectionCost: 142,
      lawyerFee: 641, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Talbot County': {
      inspectionCost: 426, appraisalCost: 532, surveyFee: 411, pestInspectionCost: 152,
      lawyerFee: 685, titleInsuranceCost: 0.0059, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Taliaferro County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 409, pestInspectionCost: 151,
      lawyerFee: 681, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Tattnall County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 386, pestInspectionCost: 143,
      lawyerFee: 644, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Taylor County': {
      inspectionCost: 434, appraisalCost: 543, surveyFee: 419, pestInspectionCost: 155,
      lawyerFee: 698, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Telfair County': {
      inspectionCost: 420, appraisalCost: 526, surveyFee: 405, pestInspectionCost: 150,
      lawyerFee: 676, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Terrell County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 409, pestInspectionCost: 151,
      lawyerFee: 682, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Thomas County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 401, pestInspectionCost: 148,
      lawyerFee: 668, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Tift County': {
      inspectionCost: 437, appraisalCost: 546, surveyFee: 421, pestInspectionCost: 156,
      lawyerFee: 702, titleInsuranceCost: 0.0059, recordingFees: 171, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Toombs County': {
      inspectionCost: 412, appraisalCost: 516, surveyFee: 398, pestInspectionCost: 147,
      lawyerFee: 663, titleInsuranceCost: 0.0058, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Towns County': {
      inspectionCost: 402, appraisalCost: 503, surveyFee: 388, pestInspectionCost: 143,
      lawyerFee: 647, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Treutlen County': {
      inspectionCost: 436, appraisalCost: 546, surveyFee: 421, pestInspectionCost: 156,
      lawyerFee: 702, titleInsuranceCost: 0.0059, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Troup County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 409, pestInspectionCost: 151,
      lawyerFee: 681, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Turner County': {
      inspectionCost: 399, appraisalCost: 499, surveyFee: 385, pestInspectionCost: 142,
      lawyerFee: 641, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Twiggs County': {
      inspectionCost: 426, appraisalCost: 533, surveyFee: 411, pestInspectionCost: 152,
      lawyerFee: 685, titleInsuranceCost: 0.0059, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Union County': {
      inspectionCost: 413, appraisalCost: 517, surveyFee: 398, pestInspectionCost: 147,
      lawyerFee: 664, titleInsuranceCost: 0.0058, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Upson County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 392, pestInspectionCost: 145,
      lawyerFee: 654, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Walker County': {
      inspectionCost: 404, appraisalCost: 505, surveyFee: 390, pestInspectionCost: 144,
      lawyerFee: 650, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Walton County': {
      inspectionCost: 429, appraisalCost: 536, surveyFee: 413, pestInspectionCost: 153,
      lawyerFee: 689, titleInsuranceCost: 0.0059, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Ware County': {
      inspectionCost: 415, appraisalCost: 519, surveyFee: 400, pestInspectionCost: 148,
      lawyerFee: 667, titleInsuranceCost: 0.0058, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Warren County': {
      inspectionCost: 419, appraisalCost: 523, surveyFee: 404, pestInspectionCost: 149,
      lawyerFee: 673, titleInsuranceCost: 0.0059, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Washington County': {
      inspectionCost: 421, appraisalCost: 527, surveyFee: 406, pestInspectionCost: 150,
      lawyerFee: 677, titleInsuranceCost: 0.0059, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Wayne County': {
      inspectionCost: 433, appraisalCost: 541, surveyFee: 417, pestInspectionCost: 154,
      lawyerFee: 695, titleInsuranceCost: 0.0059, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Webster County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 423, pestInspectionCost: 156,
      lawyerFee: 705, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Wheeler County': {
      inspectionCost: 411, appraisalCost: 514, surveyFee: 396, pestInspectionCost: 147,
      lawyerFee: 661, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'White County': {
      inspectionCost: 438, appraisalCost: 547, surveyFee: 422, pestInspectionCost: 156,
      lawyerFee: 704, titleInsuranceCost: 0.0059, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Whitfield County': {
      inspectionCost: 427, appraisalCost: 533, surveyFee: 411, pestInspectionCost: 152,
      lawyerFee: 686, titleInsuranceCost: 0.0059, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Wilcox County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 386, pestInspectionCost: 143,
      lawyerFee: 643, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Wilkes County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 409, pestInspectionCost: 151,
      lawyerFee: 681, titleInsuranceCost: 0.0059, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Wilkinson County': {
      inspectionCost: 403, appraisalCost: 504, surveyFee: 388, pestInspectionCost: 144,
      lawyerFee: 648, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Worth County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 387, pestInspectionCost: 143,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Default': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 405, pestInspectionCost: 150,
      lawyerFee: 675, titleInsuranceCost: 0.0061, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
  },
  // HAWAII
  'HI': {
    'Hawaii County': {
      inspectionCost: 679, appraisalCost: 922, surveyFee: 849, pestInspectionCost: 291,
      lawyerFee: 1068, titleInsuranceCost: 0.0067, recordingFees: 364, creditReportFee: 82, floodDeterminationFee: 63
    },
    'Honolulu County': {
      inspectionCost: 713, appraisalCost: 968, surveyFee: 891, pestInspectionCost: 305,
      lawyerFee: 1120, titleInsuranceCost: 0.0067, recordingFees: 382, creditReportFee: 86, floodDeterminationFee: 66
    },
    'Kalawao County': {
      inspectionCost: 723, appraisalCost: 982, surveyFee: 904, pestInspectionCost: 310,
      lawyerFee: 1137, titleInsuranceCost: 0.0068, recordingFees: 387, creditReportFee: 87, floodDeterminationFee: 67
    },
    'Kauai County': {
      inspectionCost: 672, appraisalCost: 912, surveyFee: 840, pestInspectionCost: 288,
      lawyerFee: 1056, titleInsuranceCost: 0.0067, recordingFees: 360, creditReportFee: 81, floodDeterminationFee: 62
    },
    'Maui County': {
      inspectionCost: 667, appraisalCost: 906, surveyFee: 834, pestInspectionCost: 286,
      lawyerFee: 1049, titleInsuranceCost: 0.0067, recordingFees: 357, creditReportFee: 81, floodDeterminationFee: 62
    },
    'Default': {
      inspectionCost: 700, appraisalCost: 950, surveyFee: 875, pestInspectionCost: 300,
      lawyerFee: 1100, titleInsuranceCost: 0.007, recordingFees: 375, creditReportFee: 85, floodDeterminationFee: 65
    },
  },
  // IOWA
  'IA': {
    'Adair County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Adams County': {
      inspectionCost: 341, appraisalCost: 424, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Allamakee County': {
      inspectionCost: 338, appraisalCost: 420, surveyFee: 328, pestInspectionCost: 117,
      lawyerFee: 512, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Appanoose County': {
      inspectionCost: 331, appraisalCost: 412, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 503, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Audubon County': {
      inspectionCost: 319, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Benton County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Black Hawk County': {
      inspectionCost: 332, appraisalCost: 412, surveyFee: 322, pestInspectionCost: 115,
      lawyerFee: 503, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Boone County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Bremer County': {
      inspectionCost: 324, appraisalCost: 403, surveyFee: 314, pestInspectionCost: 113,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Buchanan County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Buena Vista County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Butler County': {
      inspectionCost: 324, appraisalCost: 403, surveyFee: 314, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Calhoun County': {
      inspectionCost: 339, appraisalCost: 421, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Carroll County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Cass County': {
      inspectionCost: 335, appraisalCost: 416, surveyFee: 325, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Cedar County': {
      inspectionCost: 343, appraisalCost: 426, surveyFee: 332, pestInspectionCost: 119,
      lawyerFee: 520, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Cerro Gordo County': {
      inspectionCost: 327, appraisalCost: 406, surveyFee: 317, pestInspectionCost: 113,
      lawyerFee: 495, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Cherokee County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Chickasaw County': {
      inspectionCost: 316, appraisalCost: 393, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Clarke County': {
      inspectionCost: 326, appraisalCost: 405, surveyFee: 316, pestInspectionCost: 113,
      lawyerFee: 494, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Clay County': {
      inspectionCost: 316, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Clayton County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Clinton County': {
      inspectionCost: 346, appraisalCost: 430, surveyFee: 335, pestInspectionCost: 120,
      lawyerFee: 524, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Crawford County': {
      inspectionCost: 343, appraisalCost: 427, surveyFee: 333, pestInspectionCost: 119,
      lawyerFee: 521, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Dallas County': {
      inspectionCost: 335, appraisalCost: 417, surveyFee: 325, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Davis County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Decatur County': {
      inspectionCost: 328, appraisalCost: 407, surveyFee: 318, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Delaware County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Des Moines County': {
      inspectionCost: 314, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Dickinson County': {
      inspectionCost: 315, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Dubuque County': {
      inspectionCost: 325, appraisalCost: 403, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Emmet County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Fayette County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Floyd County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Franklin County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Fremont County': {
      inspectionCost: 338, appraisalCost: 421, surveyFee: 328, pestInspectionCost: 118,
      lawyerFee: 513, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Greene County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Grundy County': {
      inspectionCost: 315, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Guthrie County': {
      inspectionCost: 315, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Hamilton County': {
      inspectionCost: 313, appraisalCost: 389, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 475, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Hancock County': {
      inspectionCost: 336, appraisalCost: 417, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Hardin County': {
      inspectionCost: 327, appraisalCost: 406, surveyFee: 317, pestInspectionCost: 114,
      lawyerFee: 496, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Harrison County': {
      inspectionCost: 319, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 483, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Henry County': {
      inspectionCost: 336, appraisalCost: 417, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Howard County': {
      inspectionCost: 314, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Humboldt County': {
      inspectionCost: 332, appraisalCost: 413, surveyFee: 322, pestInspectionCost: 116,
      lawyerFee: 504, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Ida County': {
      inspectionCost: 336, appraisalCost: 418, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Iowa County': {
      inspectionCost: 335, appraisalCost: 416, surveyFee: 325, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Jackson County': {
      inspectionCost: 328, appraisalCost: 407, surveyFee: 318, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Jasper County': {
      inspectionCost: 338, appraisalCost: 420, surveyFee: 328, pestInspectionCost: 117,
      lawyerFee: 513, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Jefferson County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Johnson County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Jones County': {
      inspectionCost: 336, appraisalCost: 418, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Keokuk County': {
      inspectionCost: 313, appraisalCost: 389, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 475, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Kossuth County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Lee County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Linn County': {
      inspectionCost: 334, appraisalCost: 415, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Louisa County': {
      inspectionCost: 339, appraisalCost: 421, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Lucas County': {
      inspectionCost: 340, appraisalCost: 423, surveyFee: 330, pestInspectionCost: 118,
      lawyerFee: 516, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Lyon County': {
      inspectionCost: 338, appraisalCost: 421, surveyFee: 328, pestInspectionCost: 118,
      lawyerFee: 513, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Madison County': {
      inspectionCost: 339, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Mahaska County': {
      inspectionCost: 317, appraisalCost: 394, surveyFee: 307, pestInspectionCost: 110,
      lawyerFee: 481, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Marion County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Marshall County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Mills County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Mitchell County': {
      inspectionCost: 316, appraisalCost: 393, surveyFee: 307, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Monona County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Monroe County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 501, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Montgomery County': {
      inspectionCost: 315, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 478, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Muscatine County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'O\'Brien County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Osceola County': {
      inspectionCost: 339, appraisalCost: 421, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Page County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Palo Alto County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Plymouth County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Pocahontas County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Polk County': {
      inspectionCost: 341, appraisalCost: 423, surveyFee: 330, pestInspectionCost: 118,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Pottawattamie County': {
      inspectionCost: 338, appraisalCost: 420, surveyFee: 328, pestInspectionCost: 117,
      lawyerFee: 513, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Poweshiek County': {
      inspectionCost: 334, appraisalCost: 415, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Ringgold County': {
      inspectionCost: 329, appraisalCost: 408, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 498, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Sac County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 512, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Scott County': {
      inspectionCost: 324, appraisalCost: 402, surveyFee: 314, pestInspectionCost: 112,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Shelby County': {
      inspectionCost: 345, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 523, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Sioux County': {
      inspectionCost: 338, appraisalCost: 420, surveyFee: 328, pestInspectionCost: 117,
      lawyerFee: 512, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Story County': {
      inspectionCost: 317, appraisalCost: 394, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 481, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Tama County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 501, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Taylor County': {
      inspectionCost: 341, appraisalCost: 424, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Union County': {
      inspectionCost: 325, appraisalCost: 403, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Van Buren County': {
      inspectionCost: 324, appraisalCost: 403, surveyFee: 314, pestInspectionCost: 113,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Wapello County': {
      inspectionCost: 338, appraisalCost: 421, surveyFee: 328, pestInspectionCost: 118,
      lawyerFee: 513, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Warren County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Washington County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Wayne County': {
      inspectionCost: 340, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Webster County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Winnebago County': {
      inspectionCost: 339, appraisalCost: 421, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Winneshiek County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Woodbury County': {
      inspectionCost: 331, appraisalCost: 412, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 503, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Worth County': {
      inspectionCost: 316, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Wright County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Default': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.005, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
  },
  // IDAHO
  'ID': {
    'Ada County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 450, pestInspectionCost: 117,
      lawyerFee: 435, titleInsuranceCost: 0.0049, recordingFees: 158, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Adams County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 455, pestInspectionCost: 119,
      lawyerFee: 439, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Bannock County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 461, pestInspectionCost: 120,
      lawyerFee: 445, titleInsuranceCost: 0.0049, recordingFees: 162, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Bear Lake County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 419, pestInspectionCost: 109,
      lawyerFee: 405, titleInsuranceCost: 0.0048, recordingFees: 147, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Benewah County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 421, pestInspectionCost: 110,
      lawyerFee: 407, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Bingham County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 451, pestInspectionCost: 117,
      lawyerFee: 436, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Blaine County': {
      inspectionCost: 358, appraisalCost: 437, surveyFee: 437, pestInspectionCost: 114,
      lawyerFee: 422, titleInsuranceCost: 0.0049, recordingFees: 154, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Boise County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 112,
      lawyerFee: 414, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Bonner County': {
      inspectionCost: 358, appraisalCost: 438, surveyFee: 438, pestInspectionCost: 114,
      lawyerFee: 423, titleInsuranceCost: 0.0049, recordingFees: 154, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Bonneville County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 436, pestInspectionCost: 114,
      lawyerFee: 421, titleInsuranceCost: 0.0049, recordingFees: 153, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Boundary County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 459, pestInspectionCost: 120,
      lawyerFee: 444, titleInsuranceCost: 0.0049, recordingFees: 161, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Butte County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 449, pestInspectionCost: 117,
      lawyerFee: 434, titleInsuranceCost: 0.0049, recordingFees: 158, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Camas County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 440, pestInspectionCost: 115,
      lawyerFee: 425, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Canyon County': {
      inspectionCost: 362, appraisalCost: 443, surveyFee: 443, pestInspectionCost: 115,
      lawyerFee: 427, titleInsuranceCost: 0.0049, recordingFees: 156, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Caribou County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 421, pestInspectionCost: 110,
      lawyerFee: 407, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Cassia County': {
      inspectionCost: 372, appraisalCost: 454, surveyFee: 454, pestInspectionCost: 118,
      lawyerFee: 439, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Clark County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 422, pestInspectionCost: 110,
      lawyerFee: 408, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Clearwater County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 440, pestInspectionCost: 115,
      lawyerFee: 425, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Custer County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 446, pestInspectionCost: 116,
      lawyerFee: 431, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Elmore County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 454, pestInspectionCost: 118,
      lawyerFee: 439, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Franklin County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 112,
      lawyerFee: 414, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Fremont County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 451, pestInspectionCost: 118,
      lawyerFee: 436, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Gem County': {
      inspectionCost: 375, appraisalCost: 459, surveyFee: 459, pestInspectionCost: 120,
      lawyerFee: 443, titleInsuranceCost: 0.0049, recordingFees: 161, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Gooding County': {
      inspectionCost: 346, appraisalCost: 423, surveyFee: 423, pestInspectionCost: 110,
      lawyerFee: 408, titleInsuranceCost: 0.0049, recordingFees: 149, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Idaho County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 451, pestInspectionCost: 117,
      lawyerFee: 436, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Jefferson County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 441, pestInspectionCost: 115,
      lawyerFee: 426, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Jerome County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 444, pestInspectionCost: 116,
      lawyerFee: 429, titleInsuranceCost: 0.0049, recordingFees: 156, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Kootenai County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 450, pestInspectionCost: 117,
      lawyerFee: 435, titleInsuranceCost: 0.0049, recordingFees: 158, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Latah County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 461, pestInspectionCost: 120,
      lawyerFee: 445, titleInsuranceCost: 0.0049, recordingFees: 162, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Lemhi County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 421, pestInspectionCost: 110,
      lawyerFee: 407, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lewis County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 427, pestInspectionCost: 111,
      lawyerFee: 413, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lincoln County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 446, pestInspectionCost: 116,
      lawyerFee: 430, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Madison County': {
      inspectionCost: 370, appraisalCost: 453, surveyFee: 453, pestInspectionCost: 118,
      lawyerFee: 437, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Minidoka County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 433, pestInspectionCost: 113,
      lawyerFee: 419, titleInsuranceCost: 0.0049, recordingFees: 152, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Nez Perce County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 436, pestInspectionCost: 114,
      lawyerFee: 422, titleInsuranceCost: 0.0049, recordingFees: 153, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Oneida County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 440, pestInspectionCost: 115,
      lawyerFee: 425, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Owyhee County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 455, pestInspectionCost: 119,
      lawyerFee: 440, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Payette County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 441, pestInspectionCost: 115,
      lawyerFee: 426, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Power County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 441, pestInspectionCost: 115,
      lawyerFee: 426, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Shoshone County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 418, pestInspectionCost: 109,
      lawyerFee: 404, titleInsuranceCost: 0.0048, recordingFees: 147, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Teton County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 445, pestInspectionCost: 116,
      lawyerFee: 430, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Twin Falls County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 418, pestInspectionCost: 109,
      lawyerFee: 403, titleInsuranceCost: 0.0048, recordingFees: 147, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Valley County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 460, pestInspectionCost: 120,
      lawyerFee: 444, titleInsuranceCost: 0.0049, recordingFees: 162, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Washington County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 441, pestInspectionCost: 115,
      lawyerFee: 426, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 440, pestInspectionCost: 115,
      lawyerFee: 425, titleInsuranceCost: 0.0051, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
  // ILLINOIS
  'IL': {
    'Adams County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 698, titleInsuranceCost: 0.0056, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Alexander County': {
      inspectionCost: 360, appraisalCost: 447, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 649, titleInsuranceCost: 0.0055, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Bond County': {
      inspectionCost: 372, appraisalCost: 461, surveyFee: 362, pestInspectionCost: 139,
      lawyerFee: 670, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Boone County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 683, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Brown County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 686, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Bureau County': {
      inspectionCost: 360, appraisalCost: 447, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 649, titleInsuranceCost: 0.0055, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Calhoun County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 694, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Carroll County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 650, titleInsuranceCost: 0.0055, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Cass County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 685, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Champaign County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 663, titleInsuranceCost: 0.0055, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Christian County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Clark County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 648, titleInsuranceCost: 0.0055, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Clay County': {
      inspectionCost: 359, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 134,
      lawyerFee: 646, titleInsuranceCost: 0.0055, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 22
    },
    'Clinton County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 708, titleInsuranceCost: 0.0056, recordingFees: 173, creditReportFee: 51, floodDeterminationFee: 25
    },
    'Coles County': {
      inspectionCost: 390, appraisalCost: 483, surveyFee: 379, pestInspectionCost: 145,
      lawyerFee: 702, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Cook County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 683, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Crawford County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 703, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 51, floodDeterminationFee: 25
    },
    'Cumberland County': {
      inspectionCost: 384, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 692, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'De Witt County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 685, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'DeKalb County': {
      inspectionCost: 372, appraisalCost: 461, surveyFee: 362, pestInspectionCost: 138,
      lawyerFee: 669, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Douglas County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 695, titleInsuranceCost: 0.0056, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 24
    },
    'DuPage County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 689, titleInsuranceCost: 0.0056, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Edgar County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 691, titleInsuranceCost: 0.0056, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Edwards County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 656, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Effingham County': {
      inspectionCost: 376, appraisalCost: 467, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 678, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Fayette County': {
      inspectionCost: 366, appraisalCost: 453, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 658, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Ford County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 694, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Franklin County': {
      inspectionCost: 366, appraisalCost: 453, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 658, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Fulton County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 697, titleInsuranceCost: 0.0056, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Gallatin County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 676, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Greene County': {
      inspectionCost: 365, appraisalCost: 452, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 657, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Grundy County': {
      inspectionCost: 358, appraisalCost: 444, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 644, titleInsuranceCost: 0.0055, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 22
    },
    'Hamilton County': {
      inspectionCost: 356, appraisalCost: 442, surveyFee: 347, pestInspectionCost: 133,
      lawyerFee: 641, titleInsuranceCost: 0.0055, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 22
    },
    'Hancock County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 687, titleInsuranceCost: 0.0056, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Hardin County': {
      inspectionCost: 372, appraisalCost: 461, surveyFee: 362, pestInspectionCost: 138,
      lawyerFee: 669, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Henderson County': {
      inspectionCost: 389, appraisalCost: 482, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 700, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Henry County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 687, titleInsuranceCost: 0.0056, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Iroquois County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 673, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Jackson County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 671, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Jasper County': {
      inspectionCost: 384, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 692, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Jefferson County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 677, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Jersey County': {
      inspectionCost: 357, appraisalCost: 443, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 643, titleInsuranceCost: 0.0055, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 22
    },
    'Jo Daviess County': {
      inspectionCost: 379, appraisalCost: 471, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 683, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Johnson County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 689, titleInsuranceCost: 0.0056, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Kane County': {
      inspectionCost: 370, appraisalCost: 459, surveyFee: 360, pestInspectionCost: 138,
      lawyerFee: 666, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Kankakee County': {
      inspectionCost: 384, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 692, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Kendall County': {
      inspectionCost: 389, appraisalCost: 482, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 700, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Knox County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 684, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'LaSalle County': {
      inspectionCost: 378, appraisalCost: 469, surveyFee: 368, pestInspectionCost: 141,
      lawyerFee: 681, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Lake County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 655, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Lawrence County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 686, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Lee County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Livingston County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 684, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Logan County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 661, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Macon County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 691, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Macoupin County': {
      inspectionCost: 386, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 695, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Madison County': {
      inspectionCost: 386, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 695, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Marion County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 682, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Marshall County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 660, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Mason County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 686, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Massac County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 685, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'McDonough County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 683, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 24
    },
    'McHenry County': {
      inspectionCost: 391, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 146,
      lawyerFee: 704, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 25
    },
    'McLean County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 650, titleInsuranceCost: 0.0055, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Menard County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 656, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Mercer County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 685, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Monroe County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 676, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Montgomery County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 645, titleInsuranceCost: 0.0055, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 22
    },
    'Morgan County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 684, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Moultrie County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 668, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Ogle County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 659, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Peoria County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Perry County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 656, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Piatt County': {
      inspectionCost: 385, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 693, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Pike County': {
      inspectionCost: 363, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 654, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Pope County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 707, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 25
    },
    'Pulaski County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 655, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Putnam County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 687, titleInsuranceCost: 0.0056, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Randolph County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 661, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Richland County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 645, titleInsuranceCost: 0.0055, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 22
    },
    'Rock Island County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 682, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Saline County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 664, titleInsuranceCost: 0.0056, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Sangamon County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 648, titleInsuranceCost: 0.0055, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Schuyler County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 659, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Scott County': {
      inspectionCost: 368, appraisalCost: 456, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 662, titleInsuranceCost: 0.0055, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Shelby County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 381, pestInspectionCost: 146,
      lawyerFee: 706, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 25
    },
    'St. Clair County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 674, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Stark County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 677, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Stephenson County': {
      inspectionCost: 377, appraisalCost: 468, surveyFee: 367, pestInspectionCost: 140,
      lawyerFee: 679, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Tazewell County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 689, titleInsuranceCost: 0.0056, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Union County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 664, titleInsuranceCost: 0.0056, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Vermilion County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 677, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Wabash County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Warren County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 673, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 23
    },
    'Washington County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 677, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Wayne County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 695, titleInsuranceCost: 0.0056, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 24
    },
    'White County': {
      inspectionCost: 391, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 146,
      lawyerFee: 704, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 25
    },
    'Whiteside County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 703, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 51, floodDeterminationFee: 25
    },
    'Will County': {
      inspectionCost: 357, appraisalCost: 443, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 643, titleInsuranceCost: 0.0055, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 22
    },
    'Williamson County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 677, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
    'Winnebago County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 694, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 24
    },
    'Woodford County': {
      inspectionCost: 365, appraisalCost: 453, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 658, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 23
    },
    'Default': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0058, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 24
    },
  },
  // INDIANA
  'IN': {
    'Adams County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 569, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Allen County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 344, pestInspectionCost: 128,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Bartholomew County': {
      inspectionCost: 357, appraisalCost: 437, surveyFee: 347, pestInspectionCost: 129,
      lawyerFee: 546, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Benton County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Blackford County': {
      inspectionCost: 362, appraisalCost: 443, surveyFee: 352, pestInspectionCost: 130,
      lawyerFee: 553, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Boone County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Brown County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Carroll County': {
      inspectionCost: 347, appraisalCost: 424, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 530, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Cass County': {
      inspectionCost: 365, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 558, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Clark County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 336, pestInspectionCost: 124,
      lawyerFee: 528, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Clay County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Clinton County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 367, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Crawford County': {
      inspectionCost: 375, appraisalCost: 458, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 573, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Daviess County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'DeKalb County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 347, pestInspectionCost: 128,
      lawyerFee: 545, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Dearborn County': {
      inspectionCost: 361, appraisalCost: 442, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Decatur County': {
      inspectionCost: 357, appraisalCost: 437, surveyFee: 347, pestInspectionCost: 129,
      lawyerFee: 546, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Delaware County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Dubois County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Elkhart County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Fayette County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Floyd County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Fountain County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Franklin County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Fulton County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 568, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Gibson County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Grant County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Greene County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 535, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Hamilton County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 332, pestInspectionCost: 123,
      lawyerFee: 523, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Hancock County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 560, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Harrison County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 125,
      lawyerFee: 531, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Hendricks County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 347, pestInspectionCost: 128,
      lawyerFee: 545, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Henry County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 560, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Howard County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 124,
      lawyerFee: 524, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Huntington County': {
      inspectionCost: 362, appraisalCost: 443, surveyFee: 352, pestInspectionCost: 131,
      lawyerFee: 554, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Jackson County': {
      inspectionCost: 358, appraisalCost: 437, surveyFee: 348, pestInspectionCost: 129,
      lawyerFee: 547, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Jasper County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Jay County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 123,
      lawyerFee: 524, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Jefferson County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Jennings County': {
      inspectionCost: 375, appraisalCost: 458, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 573, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Johnson County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Knox County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Kosciusko County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 125,
      lawyerFee: 531, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'LaGrange County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 367, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'LaPorte County': {
      inspectionCost: 373, appraisalCost: 456, surveyFee: 363, pestInspectionCost: 134,
      lawyerFee: 570, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Lake County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lawrence County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Madison County': {
      inspectionCost: 370, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 133,
      lawyerFee: 566, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Marion County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Marshall County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 538, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Martin County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Miami County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 336, pestInspectionCost: 124,
      lawyerFee: 528, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Monroe County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Montgomery County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Morgan County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Newton County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 555, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Noble County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Ohio County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Orange County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 572, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Owen County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Parke County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 333, pestInspectionCost: 123,
      lawyerFee: 523, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Perry County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Pike County': {
      inspectionCost: 349, appraisalCost: 426, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 533, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Porter County': {
      inspectionCost: 344, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 525, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Posey County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 332, pestInspectionCost: 123,
      lawyerFee: 523, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Pulaski County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Putnam County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 560, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Randolph County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 539, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Ripley County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 569, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Rush County': {
      inspectionCost: 373, appraisalCost: 456, surveyFee: 363, pestInspectionCost: 134,
      lawyerFee: 570, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Scott County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Shelby County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Spencer County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'St. Joseph County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Starke County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 569, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Steuben County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Sullivan County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Switzerland County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 527, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Tippecanoe County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Tipton County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Union County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 344, pestInspectionCost: 128,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Vanderburgh County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Vermillion County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Vigo County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 332, pestInspectionCost: 123,
      lawyerFee: 523, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Wabash County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Warren County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 548, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Warrick County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Washington County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Wayne County': {
      inspectionCost: 371, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Wells County': {
      inspectionCost: 344, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 525, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'White County': {
      inspectionCost: 375, appraisalCost: 458, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 573, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Whitley County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0055, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
  // KANSAS
  'KS': {
    'Allen County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Anderson County': {
      inspectionCost: 381, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Atchison County': {
      inspectionCost: 357, appraisalCost: 442, surveyFee: 347, pestInspectionCost: 133,
      lawyerFee: 595, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Barber County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Barton County': {
      inspectionCost: 391, appraisalCost: 485, surveyFee: 381, pestInspectionCost: 146,
      lawyerFee: 652, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Bourbon County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Brown County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Butler County': {
      inspectionCost: 369, appraisalCost: 457, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Chase County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Chautauqua County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Cherokee County': {
      inspectionCost: 366, appraisalCost: 453, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Cheyenne County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 639, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Clark County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Clay County': {
      inspectionCost: 359, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 134,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Cloud County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 632, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Coffey County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Comanche County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Cowley County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 372, pestInspectionCost: 142,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Crawford County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Decatur County': {
      inspectionCost: 372, appraisalCost: 462, surveyFee: 362, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Dickinson County': {
      inspectionCost: 358, appraisalCost: 444, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Doniphan County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Douglas County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Edwards County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Elk County': {
      inspectionCost: 369, appraisalCost: 457, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Ellis County': {
      inspectionCost: 359, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 134,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Ellsworth County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Finney County': {
      inspectionCost: 363, appraisalCost: 450, surveyFee: 353, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Ford County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Franklin County': {
      inspectionCost: 366, appraisalCost: 453, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Geary County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 632, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Gove County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 602, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Graham County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 632, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Grant County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 611, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Gray County': {
      inspectionCost: 363, appraisalCost: 450, surveyFee: 353, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Greeley County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 372, pestInspectionCost: 142,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Greenwood County': {
      inspectionCost: 361, appraisalCost: 447, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 601, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Hamilton County': {
      inspectionCost: 356, appraisalCost: 442, surveyFee: 347, pestInspectionCost: 133,
      lawyerFee: 594, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Harper County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Harvey County': {
      inspectionCost: 359, appraisalCost: 445, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 599, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Haskell County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Hodgeman County': {
      inspectionCost: 389, appraisalCost: 482, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Jackson County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Jefferson County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Jewell County': {
      inspectionCost: 363, appraisalCost: 450, surveyFee: 353, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Johnson County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Kearny County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Kingman County': {
      inspectionCost: 370, appraisalCost: 459, surveyFee: 360, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Kiowa County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Labette County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 143,
      lawyerFee: 642, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Lane County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Leavenworth County': {
      inspectionCost: 372, appraisalCost: 461, surveyFee: 362, pestInspectionCost: 138,
      lawyerFee: 620, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Lincoln County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Linn County': {
      inspectionCost: 379, appraisalCost: 471, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Logan County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Lyon County': {
      inspectionCost: 385, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Marion County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 631, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Marshall County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 611, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'McPherson County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Meade County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Miami County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Mitchell County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Montgomery County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Morris County': {
      inspectionCost: 358, appraisalCost: 444, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Morton County': {
      inspectionCost: 387, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Nemaha County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Neosho County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 611, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Ness County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Norton County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Osage County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 624, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Osborne County': {
      inspectionCost: 381, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Ottawa County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Pawnee County': {
      inspectionCost: 379, appraisalCost: 471, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Phillips County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 647, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Pottawatomie County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Pratt County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 654, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Rawlins County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Reno County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Republic County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Rice County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Riley County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Rooks County': {
      inspectionCost: 357, appraisalCost: 443, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Rush County': {
      inspectionCost: 389, appraisalCost: 482, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Russell County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Saline County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Scott County': {
      inspectionCost: 368, appraisalCost: 456, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sedgwick County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Seward County': {
      inspectionCost: 368, appraisalCost: 456, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Shawnee County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sheridan County': {
      inspectionCost: 365, appraisalCost: 452, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 608, titleInsuranceCost: 0.0053, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Sherman County': {
      inspectionCost: 358, appraisalCost: 444, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 597, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Smith County': {
      inspectionCost: 357, appraisalCost: 443, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Stafford County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 647, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Stanton County': {
      inspectionCost: 360, appraisalCost: 447, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 601, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Stevens County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Sumner County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 381, pestInspectionCost: 146,
      lawyerFee: 653, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Thomas County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 619, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Trego County': {
      inspectionCost: 373, appraisalCost: 463, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 622, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Wabaunsee County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Wallace County': {
      inspectionCost: 360, appraisalCost: 447, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 601, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Washington County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Wichita County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 624, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Wilson County': {
      inspectionCost: 378, appraisalCost: 468, surveyFee: 367, pestInspectionCost: 141,
      lawyerFee: 630, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Woodson County': {
      inspectionCost: 387, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Wyandotte County': {
      inspectionCost: 357, appraisalCost: 442, surveyFee: 347, pestInspectionCost: 133,
      lawyerFee: 595, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0055, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // KENTUCKY
  'KY': {
    'Adair County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Allen County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 344, pestInspectionCost: 128,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Anderson County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Ballard County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 345, pestInspectionCost: 128,
      lawyerFee: 542, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Barren County': {
      inspectionCost: 362, appraisalCost: 442, surveyFee: 352, pestInspectionCost: 130,
      lawyerFee: 553, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Bath County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 336, pestInspectionCost: 124,
      lawyerFee: 528, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Bell County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 336, pestInspectionCost: 124,
      lawyerFee: 528, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Boone County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Bourbon County': {
      inspectionCost: 358, appraisalCost: 437, surveyFee: 348, pestInspectionCost: 129,
      lawyerFee: 547, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Boyd County': {
      inspectionCost: 375, appraisalCost: 458, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 573, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Boyle County': {
      inspectionCost: 343, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 525, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Bracken County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Breathitt County': {
      inspectionCost: 373, appraisalCost: 456, surveyFee: 363, pestInspectionCost: 134,
      lawyerFee: 570, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Breckinridge County': {
      inspectionCost: 343, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 525, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Bullitt County': {
      inspectionCost: 374, appraisalCost: 458, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 572, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Butler County': {
      inspectionCost: 354, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Caldwell County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Calloway County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 367, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Campbell County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 572, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Carlisle County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Carroll County': {
      inspectionCost: 347, appraisalCost: 424, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 530, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Carter County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Casey County': {
      inspectionCost: 362, appraisalCost: 442, surveyFee: 352, pestInspectionCost: 130,
      lawyerFee: 553, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Christian County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Clark County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 336, pestInspectionCost: 124,
      lawyerFee: 528, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Clay County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Clinton County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 367, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Crittenden County': {
      inspectionCost: 346, appraisalCost: 423, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 529, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Cumberland County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Daviess County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Edmonson County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 549, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Elliott County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 332, pestInspectionCost: 123,
      lawyerFee: 523, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Estill County': {
      inspectionCost: 346, appraisalCost: 423, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 529, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Fayette County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Fleming County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Floyd County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Franklin County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Fulton County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 568, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Gallatin County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Garrard County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 569, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Grant County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Graves County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Grayson County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 569, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Green County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Greenup County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Hancock County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 560, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Hardin County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 347, pestInspectionCost: 128,
      lawyerFee: 545, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Harlan County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Harrison County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 125,
      lawyerFee: 531, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Hart County': {
      inspectionCost: 373, appraisalCost: 456, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 570, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Henderson County': {
      inspectionCost: 373, appraisalCost: 456, surveyFee: 363, pestInspectionCost: 134,
      lawyerFee: 570, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Henry County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 560, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Hickman County': {
      inspectionCost: 362, appraisalCost: 443, surveyFee: 352, pestInspectionCost: 131,
      lawyerFee: 554, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Hopkins County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Jackson County': {
      inspectionCost: 358, appraisalCost: 437, surveyFee: 348, pestInspectionCost: 129,
      lawyerFee: 547, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Jefferson County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Jessamine County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Johnson County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Kenton County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 347, pestInspectionCost: 129,
      lawyerFee: 546, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Knott County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Knox County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Larue County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 539, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Laurel County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 336, pestInspectionCost: 124,
      lawyerFee: 528, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lawrence County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Lee County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Leslie County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Letcher County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Lewis County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lincoln County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Livingston County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Logan County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 539, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Lyon County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Madison County': {
      inspectionCost: 370, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 133,
      lawyerFee: 566, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Magoffin County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Marion County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Marshall County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 538, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Martin County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Mason County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'McCracken County': {
      inspectionCost: 373, appraisalCost: 456, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 570, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'McCreary County': {
      inspectionCost: 370, appraisalCost: 452, surveyFee: 360, pestInspectionCost: 133,
      lawyerFee: 565, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'McLean County': {
      inspectionCost: 347, appraisalCost: 424, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 530, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Meade County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 548, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Menifee County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Mercer County': {
      inspectionCost: 365, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 558, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Metcalfe County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Monroe County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Montgomery County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Morgan County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Muhlenberg County': {
      inspectionCost: 375, appraisalCost: 458, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 573, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Nelson County': {
      inspectionCost: 347, appraisalCost: 424, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 530, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Nicholas County': {
      inspectionCost: 362, appraisalCost: 442, surveyFee: 352, pestInspectionCost: 130,
      lawyerFee: 553, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Ohio County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Oldham County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 123,
      lawyerFee: 524, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Owen County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Owsley County': {
      inspectionCost: 371, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Pendleton County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 125,
      lawyerFee: 531, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Perry County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Pike County': {
      inspectionCost: 349, appraisalCost: 426, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 533, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Powell County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Pulaski County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Robertson County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Rockcastle County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Rowan County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Russell County': {
      inspectionCost: 371, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Scott County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Shelby County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Simpson County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 123,
      lawyerFee: 524, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Spencer County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Taylor County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 569, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Todd County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 363, pestInspectionCost: 135,
      lawyerFee: 571, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Trigg County': {
      inspectionCost: 344, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 525, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Trimble County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 568, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Union County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 344, pestInspectionCost: 128,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Warren County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 548, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Washington County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Wayne County': {
      inspectionCost: 371, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Webster County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Whitley County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Wolfe County': {
      inspectionCost: 343, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 525, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Woodford County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Default': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0055, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
  // LOUISIANA
  'LA': {
    'Default': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0055, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 35
    },
  },
  // MASSACHUSETTS
  'MA': {
    'Barnstable County': {
      inspectionCost: 543, appraisalCost: 621, surveyFee: 517, pestInspectionCost: 206,
      lawyerFee: 1035, titleInsuranceCost: 0.0068, recordingFees: 206, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Berkshire County': {
      inspectionCost: 533, appraisalCost: 609, surveyFee: 508, pestInspectionCost: 203,
      lawyerFee: 1016, titleInsuranceCost: 0.0067, recordingFees: 203, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Bristol County': {
      inspectionCost: 540, appraisalCost: 617, surveyFee: 514, pestInspectionCost: 205,
      lawyerFee: 1029, titleInsuranceCost: 0.0068, recordingFees: 205, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Dukes County': {
      inspectionCost: 513, appraisalCost: 587, surveyFee: 489, pestInspectionCost: 195,
      lawyerFee: 979, titleInsuranceCost: 0.0067, recordingFees: 195, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Essex County': {
      inspectionCost: 508, appraisalCost: 581, surveyFee: 484, pestInspectionCost: 193,
      lawyerFee: 969, titleInsuranceCost: 0.0067, recordingFees: 193, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Franklin County': {
      inspectionCost: 512, appraisalCost: 585, surveyFee: 488, pestInspectionCost: 195,
      lawyerFee: 976, titleInsuranceCost: 0.0067, recordingFees: 195, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Hampden County': {
      inspectionCost: 532, appraisalCost: 608, surveyFee: 507, pestInspectionCost: 202,
      lawyerFee: 1014, titleInsuranceCost: 0.0067, recordingFees: 202, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Hampshire County': {
      inspectionCost: 513, appraisalCost: 586, surveyFee: 489, pestInspectionCost: 195,
      lawyerFee: 978, titleInsuranceCost: 0.0067, recordingFees: 195, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Middlesex County': {
      inspectionCost: 547, appraisalCost: 625, surveyFee: 521, pestInspectionCost: 208,
      lawyerFee: 1043, titleInsuranceCost: 0.0068, recordingFees: 208, creditReportFee: 52, floodDeterminationFee: 29
    },
    'Nantucket County': {
      inspectionCost: 511, appraisalCost: 584, surveyFee: 487, pestInspectionCost: 194,
      lawyerFee: 974, titleInsuranceCost: 0.0067, recordingFees: 194, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Norfolk County': {
      inspectionCost: 509, appraisalCost: 582, surveyFee: 485, pestInspectionCost: 194,
      lawyerFee: 971, titleInsuranceCost: 0.0067, recordingFees: 194, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Plymouth County': {
      inspectionCost: 525, appraisalCost: 600, surveyFee: 500, pestInspectionCost: 200,
      lawyerFee: 1000, titleInsuranceCost: 0.0067, recordingFees: 200, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Suffolk County': {
      inspectionCost: 508, appraisalCost: 581, surveyFee: 484, pestInspectionCost: 193,
      lawyerFee: 969, titleInsuranceCost: 0.0067, recordingFees: 193, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Worcester County': {
      inspectionCost: 535, appraisalCost: 612, surveyFee: 510, pestInspectionCost: 204,
      lawyerFee: 1020, titleInsuranceCost: 0.0067, recordingFees: 204, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Default': {
      inspectionCost: 525, appraisalCost: 600, surveyFee: 500, pestInspectionCost: 200,
      lawyerFee: 1000, titleInsuranceCost: 0.007, recordingFees: 200, creditReportFee: 50, floodDeterminationFee: 28
    },
  },
  // MARYLAND
  'MD': {
    'Allegany County': {
      inspectionCost: 451, appraisalCost: 537, surveyFee: 442, pestInspectionCost: 156,
      lawyerFee: 760, titleInsuranceCost: 0.0062, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Anne Arundel County': {
      inspectionCost: 477, appraisalCost: 568, surveyFee: 467, pestInspectionCost: 165,
      lawyerFee: 804, titleInsuranceCost: 0.0062, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Baltimore County': {
      inspectionCost: 478, appraisalCost: 568, surveyFee: 468, pestInspectionCost: 166,
      lawyerFee: 805, titleInsuranceCost: 0.0062, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Calvert County': {
      inspectionCost: 493, appraisalCost: 587, surveyFee: 483, pestInspectionCost: 171,
      lawyerFee: 831, titleInsuranceCost: 0.0063, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Caroline County': {
      inspectionCost: 480, appraisalCost: 571, surveyFee: 470, pestInspectionCost: 166,
      lawyerFee: 808, titleInsuranceCost: 0.0063, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Carroll County': {
      inspectionCost: 457, appraisalCost: 544, surveyFee: 448, pestInspectionCost: 159,
      lawyerFee: 771, titleInsuranceCost: 0.0062, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Cecil County': {
      inspectionCost: 478, appraisalCost: 568, surveyFee: 468, pestInspectionCost: 166,
      lawyerFee: 805, titleInsuranceCost: 0.0062, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Charles County': {
      inspectionCost: 472, appraisalCost: 562, surveyFee: 462, pestInspectionCost: 164,
      lawyerFee: 796, titleInsuranceCost: 0.0062, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Dorchester County': {
      inspectionCost: 472, appraisalCost: 562, surveyFee: 462, pestInspectionCost: 164,
      lawyerFee: 796, titleInsuranceCost: 0.0062, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Frederick County': {
      inspectionCost: 484, appraisalCost: 575, surveyFee: 473, pestInspectionCost: 168,
      lawyerFee: 815, titleInsuranceCost: 0.0063, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Garrett County': {
      inspectionCost: 487, appraisalCost: 579, surveyFee: 477, pestInspectionCost: 169,
      lawyerFee: 820, titleInsuranceCost: 0.0063, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Harford County': {
      inspectionCost: 475, appraisalCost: 565, surveyFee: 465, pestInspectionCost: 165,
      lawyerFee: 800, titleInsuranceCost: 0.0062, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Howard County': {
      inspectionCost: 453, appraisalCost: 539, surveyFee: 443, pestInspectionCost: 157,
      lawyerFee: 763, titleInsuranceCost: 0.0062, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Kent County': {
      inspectionCost: 469, appraisalCost: 558, surveyFee: 459, pestInspectionCost: 163,
      lawyerFee: 791, titleInsuranceCost: 0.0062, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Montgomery County': {
      inspectionCost: 454, appraisalCost: 540, surveyFee: 445, pestInspectionCost: 157,
      lawyerFee: 765, titleInsuranceCost: 0.0062, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Prince George\'s County': {
      inspectionCost: 487, appraisalCost: 580, surveyFee: 477, pestInspectionCost: 169,
      lawyerFee: 821, titleInsuranceCost: 0.0063, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Queen Anne\'s County': {
      inspectionCost: 477, appraisalCost: 567, surveyFee: 467, pestInspectionCost: 165,
      lawyerFee: 803, titleInsuranceCost: 0.0062, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Somerset County': {
      inspectionCost: 454, appraisalCost: 540, surveyFee: 445, pestInspectionCost: 157,
      lawyerFee: 765, titleInsuranceCost: 0.0062, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 24
    },
    'St. Mary\'s County': {
      inspectionCost: 493, appraisalCost: 586, surveyFee: 482, pestInspectionCost: 171,
      lawyerFee: 830, titleInsuranceCost: 0.0063, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Talbot County': {
      inspectionCost: 482, appraisalCost: 573, surveyFee: 471, pestInspectionCost: 167,
      lawyerFee: 811, titleInsuranceCost: 0.0063, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Washington County': {
      inspectionCost: 476, appraisalCost: 567, surveyFee: 466, pestInspectionCost: 165,
      lawyerFee: 803, titleInsuranceCost: 0.0062, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Wicomico County': {
      inspectionCost: 462, appraisalCost: 550, surveyFee: 452, pestInspectionCost: 160,
      lawyerFee: 779, titleInsuranceCost: 0.0062, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Worcester County': {
      inspectionCost: 484, appraisalCost: 576, surveyFee: 474, pestInspectionCost: 168,
      lawyerFee: 816, titleInsuranceCost: 0.0063, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Default': {
      inspectionCost: 475, appraisalCost: 565, surveyFee: 465, pestInspectionCost: 165,
      lawyerFee: 800, titleInsuranceCost: 0.0065, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 26
    },
  },
  // MAINE
  'ME': {
    'Androscoggin County': {
      inspectionCost: 441, appraisalCost: 519, surveyFee: 389, pestInspectionCost: 145,
      lawyerFee: 804, titleInsuranceCost: 0.0058, recordingFees: 150, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Aroostook County': {
      inspectionCost: 440, appraisalCost: 518, surveyFee: 388, pestInspectionCost: 145,
      lawyerFee: 803, titleInsuranceCost: 0.0058, recordingFees: 150, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Cumberland County': {
      inspectionCost: 436, appraisalCost: 513, surveyFee: 384, pestInspectionCost: 143,
      lawyerFee: 795, titleInsuranceCost: 0.0058, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Franklin County': {
      inspectionCost: 414, appraisalCost: 488, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 756, titleInsuranceCost: 0.0057, recordingFees: 141, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Hancock County': {
      inspectionCost: 433, appraisalCost: 509, surveyFee: 382, pestInspectionCost: 142,
      lawyerFee: 789, titleInsuranceCost: 0.0058, recordingFees: 147, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Kennebec County': {
      inspectionCost: 414, appraisalCost: 488, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 756, titleInsuranceCost: 0.0057, recordingFees: 141, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Knox County': {
      inspectionCost: 430, appraisalCost: 507, surveyFee: 380, pestInspectionCost: 141,
      lawyerFee: 785, titleInsuranceCost: 0.0058, recordingFees: 147, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Lincoln County': {
      inspectionCost: 430, appraisalCost: 507, surveyFee: 380, pestInspectionCost: 141,
      lawyerFee: 785, titleInsuranceCost: 0.0058, recordingFees: 147, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Oxford County': {
      inspectionCost: 425, appraisalCost: 501, surveyFee: 375, pestInspectionCost: 140,
      lawyerFee: 776, titleInsuranceCost: 0.0058, recordingFees: 145, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Penobscot County': {
      inspectionCost: 439, appraisalCost: 517, surveyFee: 388, pestInspectionCost: 144,
      lawyerFee: 802, titleInsuranceCost: 0.0058, recordingFees: 150, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Piscataquis County': {
      inspectionCost: 409, appraisalCost: 482, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 747, titleInsuranceCost: 0.0057, recordingFees: 139, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Sagadahoc County': {
      inspectionCost: 420, appraisalCost: 494, surveyFee: 370, pestInspectionCost: 138,
      lawyerFee: 766, titleInsuranceCost: 0.0057, recordingFees: 143, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Somerset County': {
      inspectionCost: 406, appraisalCost: 478, surveyFee: 358, pestInspectionCost: 133,
      lawyerFee: 741, titleInsuranceCost: 0.0057, recordingFees: 138, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Waldo County': {
      inspectionCost: 427, appraisalCost: 503, surveyFee: 377, pestInspectionCost: 140,
      lawyerFee: 779, titleInsuranceCost: 0.0058, recordingFees: 145, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Washington County': {
      inspectionCost: 426, appraisalCost: 502, surveyFee: 376, pestInspectionCost: 140,
      lawyerFee: 778, titleInsuranceCost: 0.0058, recordingFees: 145, creditReportFee: 42, floodDeterminationFee: 22
    },
    'York County': {
      inspectionCost: 440, appraisalCost: 518, surveyFee: 388, pestInspectionCost: 145,
      lawyerFee: 803, titleInsuranceCost: 0.0058, recordingFees: 150, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 425, appraisalCost: 500, surveyFee: 375, pestInspectionCost: 140,
      lawyerFee: 775, titleInsuranceCost: 0.006, recordingFees: 145, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
  // MICHIGAN
  'MI': {
    'Alcona County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Alger County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 619, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Allegan County': {
      inspectionCost: 357, appraisalCost: 442, surveyFee: 347, pestInspectionCost: 133,
      lawyerFee: 595, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Alpena County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Antrim County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Arenac County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Baraga County': {
      inspectionCost: 364, appraisalCost: 452, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 608, titleInsuranceCost: 0.0053, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Barry County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Bay County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Benzie County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Berrien County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Branch County': {
      inspectionCost: 391, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 146,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Calhoun County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Cass County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Charlevoix County': {
      inspectionCost: 373, appraisalCost: 463, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Cheboygan County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 372, pestInspectionCost: 142,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Chippewa County': {
      inspectionCost: 379, appraisalCost: 471, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Clare County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Clinton County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Crawford County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Delta County': {
      inspectionCost: 359, appraisalCost: 445, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 599, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Dickinson County': {
      inspectionCost: 358, appraisalCost: 444, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Eaton County': {
      inspectionCost: 369, appraisalCost: 457, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Emmet County': {
      inspectionCost: 391, appraisalCost: 485, surveyFee: 381, pestInspectionCost: 146,
      lawyerFee: 653, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Genesee County': {
      inspectionCost: 389, appraisalCost: 482, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Gladwin County': {
      inspectionCost: 386, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Gogebic County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 634, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Grand Traverse County': {
      inspectionCost: 387, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Gratiot County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Hillsdale County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Houghton County': {
      inspectionCost: 391, appraisalCost: 485, surveyFee: 381, pestInspectionCost: 146,
      lawyerFee: 652, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Huron County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 619, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Ingham County': {
      inspectionCost: 385, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Ionia County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 624, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Iosco County': {
      inspectionCost: 377, appraisalCost: 468, surveyFee: 367, pestInspectionCost: 140,
      lawyerFee: 629, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Iron County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Isabella County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 352, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Jackson County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Kalamazoo County': {
      inspectionCost: 363, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Kalkaska County': {
      inspectionCost: 377, appraisalCost: 467, surveyFee: 367, pestInspectionCost: 140,
      lawyerFee: 628, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Kent County': {
      inspectionCost: 370, appraisalCost: 459, surveyFee: 360, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Keweenaw County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Lake County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Lapeer County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Leelanau County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Lenawee County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 138,
      lawyerFee: 616, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Livingston County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Luce County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Mackinac County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Macomb County': {
      inspectionCost: 370, appraisalCost: 458, surveyFee: 360, pestInspectionCost: 138,
      lawyerFee: 616, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Manistee County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 379, pestInspectionCost: 145,
      lawyerFee: 650, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Marquette County': {
      inspectionCost: 369, appraisalCost: 457, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Mason County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Mecosta County': {
      inspectionCost: 356, appraisalCost: 441, surveyFee: 346, pestInspectionCost: 133,
      lawyerFee: 593, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Menominee County': {
      inspectionCost: 384, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Midland County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Missaukee County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 647, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Monroe County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Montcalm County': {
      inspectionCost: 358, appraisalCost: 444, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 597, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Montmorency County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 639, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Muskegon County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Newaygo County': {
      inspectionCost: 387, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Oakland County': {
      inspectionCost: 358, appraisalCost: 444, surveyFee: 348, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Oceana County': {
      inspectionCost: 356, appraisalCost: 441, surveyFee: 346, pestInspectionCost: 133,
      lawyerFee: 593, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Ogemaw County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Ontonagon County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 654, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Osceola County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Oscoda County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Otsego County': {
      inspectionCost: 391, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 146,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Ottawa County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Presque Isle County': {
      inspectionCost: 363, appraisalCost: 450, surveyFee: 353, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Roscommon County': {
      inspectionCost: 363, appraisalCost: 450, surveyFee: 353, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Saginaw County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Sanilac County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Schoolcraft County': {
      inspectionCost: 377, appraisalCost: 468, surveyFee: 367, pestInspectionCost: 140,
      lawyerFee: 629, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Shiawassee County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'St. Clair County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 624, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'St. Joseph County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Tuscola County': {
      inspectionCost: 370, appraisalCost: 459, surveyFee: 360, pestInspectionCost: 138,
      lawyerFee: 617, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Van Buren County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Washtenaw County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Wayne County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Wexford County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Default': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0055, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // MINNESOTA
  'MN': {
    'Aitkin County': {
      inspectionCost: 401, appraisalCost: 504, surveyFee: 391, pestInspectionCost: 144,
      lawyerFee: 694, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Anoka County': {
      inspectionCost: 389, appraisalCost: 489, surveyFee: 379, pestInspectionCost: 139,
      lawyerFee: 673, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Becker County': {
      inspectionCost: 388, appraisalCost: 488, surveyFee: 378, pestInspectionCost: 139,
      lawyerFee: 672, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Beltrami County': {
      inspectionCost: 377, appraisalCost: 473, surveyFee: 367, pestInspectionCost: 135,
      lawyerFee: 652, titleInsuranceCost: 0.0055, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Benton County': {
      inspectionCost: 379, appraisalCost: 476, surveyFee: 369, pestInspectionCost: 136,
      lawyerFee: 656, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Big Stone County': {
      inspectionCost: 383, appraisalCost: 482, surveyFee: 373, pestInspectionCost: 137,
      lawyerFee: 664, titleInsuranceCost: 0.0055, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Blue Earth County': {
      inspectionCost: 387, appraisalCost: 487, surveyFee: 377, pestInspectionCost: 139,
      lawyerFee: 670, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Brown County': {
      inspectionCost: 396, appraisalCost: 498, surveyFee: 386, pestInspectionCost: 142,
      lawyerFee: 686, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Carlton County': {
      inspectionCost: 382, appraisalCost: 481, surveyFee: 373, pestInspectionCost: 137,
      lawyerFee: 662, titleInsuranceCost: 0.0055, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Carver County': {
      inspectionCost: 399, appraisalCost: 502, surveyFee: 389, pestInspectionCost: 143,
      lawyerFee: 691, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Cass County': {
      inspectionCost: 396, appraisalCost: 497, surveyFee: 386, pestInspectionCost: 142,
      lawyerFee: 685, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Chippewa County': {
      inspectionCost: 395, appraisalCost: 496, surveyFee: 384, pestInspectionCost: 141,
      lawyerFee: 683, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Chisago County': {
      inspectionCost: 404, appraisalCost: 508, surveyFee: 394, pestInspectionCost: 145,
      lawyerFee: 700, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Clay County': {
      inspectionCost: 373, appraisalCost: 469, surveyFee: 364, pestInspectionCost: 134,
      lawyerFee: 646, titleInsuranceCost: 0.0055, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 23
    },
    'Clearwater County': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 380, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Cook County': {
      inspectionCost: 394, appraisalCost: 495, surveyFee: 384, pestInspectionCost: 141,
      lawyerFee: 683, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Cottonwood County': {
      inspectionCost: 393, appraisalCost: 494, surveyFee: 383, pestInspectionCost: 141,
      lawyerFee: 681, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Crow Wing County': {
      inspectionCost: 382, appraisalCost: 481, surveyFee: 373, pestInspectionCost: 137,
      lawyerFee: 662, titleInsuranceCost: 0.0055, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Dakota County': {
      inspectionCost: 408, appraisalCost: 513, surveyFee: 397, pestInspectionCost: 146,
      lawyerFee: 706, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 26
    },
    'Dodge County': {
      inspectionCost: 406, appraisalCost: 511, surveyFee: 396, pestInspectionCost: 146,
      lawyerFee: 704, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 26
    },
    'Douglas County': {
      inspectionCost: 402, appraisalCost: 505, surveyFee: 391, pestInspectionCost: 144,
      lawyerFee: 695, titleInsuranceCost: 0.0056, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Faribault County': {
      inspectionCost: 378, appraisalCost: 475, surveyFee: 368, pestInspectionCost: 135,
      lawyerFee: 654, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Fillmore County': {
      inspectionCost: 394, appraisalCost: 495, surveyFee: 384, pestInspectionCost: 141,
      lawyerFee: 682, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Freeborn County': {
      inspectionCost: 407, appraisalCost: 511, surveyFee: 396, pestInspectionCost: 146,
      lawyerFee: 704, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 26
    },
    'Goodhue County': {
      inspectionCost: 404, appraisalCost: 508, surveyFee: 394, pestInspectionCost: 145,
      lawyerFee: 699, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Grant County': {
      inspectionCost: 381, appraisalCost: 479, surveyFee: 371, pestInspectionCost: 136,
      lawyerFee: 660, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Hennepin County': {
      inspectionCost: 386, appraisalCost: 486, surveyFee: 376, pestInspectionCost: 138,
      lawyerFee: 669, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Houston County': {
      inspectionCost: 407, appraisalCost: 512, surveyFee: 397, pestInspectionCost: 146,
      lawyerFee: 705, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 26
    },
    'Hubbard County': {
      inspectionCost: 397, appraisalCost: 499, surveyFee: 387, pestInspectionCost: 142,
      lawyerFee: 688, titleInsuranceCost: 0.0056, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Isanti County': {
      inspectionCost: 384, appraisalCost: 483, surveyFee: 374, pestInspectionCost: 138,
      lawyerFee: 665, titleInsuranceCost: 0.0056, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Itasca County': {
      inspectionCost: 386, appraisalCost: 485, surveyFee: 376, pestInspectionCost: 138,
      lawyerFee: 668, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Jackson County': {
      inspectionCost: 388, appraisalCost: 487, surveyFee: 378, pestInspectionCost: 139,
      lawyerFee: 671, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Kanabec County': {
      inspectionCost: 405, appraisalCost: 509, surveyFee: 395, pestInspectionCost: 145,
      lawyerFee: 702, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Kandiyohi County': {
      inspectionCost: 377, appraisalCost: 474, surveyFee: 368, pestInspectionCost: 135,
      lawyerFee: 654, titleInsuranceCost: 0.0055, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Kittson County': {
      inspectionCost: 378, appraisalCost: 475, surveyFee: 368, pestInspectionCost: 135,
      lawyerFee: 654, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Koochiching County': {
      inspectionCost: 386, appraisalCost: 486, surveyFee: 376, pestInspectionCost: 138,
      lawyerFee: 669, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Lac qui Parle County': {
      inspectionCost: 405, appraisalCost: 509, surveyFee: 395, pestInspectionCost: 145,
      lawyerFee: 702, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Lake County': {
      inspectionCost: 378, appraisalCost: 475, surveyFee: 368, pestInspectionCost: 135,
      lawyerFee: 655, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Lake of the Woods County': {
      inspectionCost: 376, appraisalCost: 472, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 651, titleInsuranceCost: 0.0055, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Le Sueur County': {
      inspectionCost: 389, appraisalCost: 489, surveyFee: 379, pestInspectionCost: 139,
      lawyerFee: 673, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Lincoln County': {
      inspectionCost: 395, appraisalCost: 496, surveyFee: 385, pestInspectionCost: 141,
      lawyerFee: 684, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Lyon County': {
      inspectionCost: 400, appraisalCost: 503, surveyFee: 390, pestInspectionCost: 143,
      lawyerFee: 693, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Mahnomen County': {
      inspectionCost: 370, appraisalCost: 465, surveyFee: 361, pestInspectionCost: 133,
      lawyerFee: 641, titleInsuranceCost: 0.0055, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 23
    },
    'Marshall County': {
      inspectionCost: 381, appraisalCost: 479, surveyFee: 372, pestInspectionCost: 137,
      lawyerFee: 660, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Martin County': {
      inspectionCost: 402, appraisalCost: 505, surveyFee: 392, pestInspectionCost: 144,
      lawyerFee: 696, titleInsuranceCost: 0.0056, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 25
    },
    'McLeod County': {
      inspectionCost: 380, appraisalCost: 477, surveyFee: 370, pestInspectionCost: 136,
      lawyerFee: 658, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Meeker County': {
      inspectionCost: 396, appraisalCost: 497, surveyFee: 386, pestInspectionCost: 142,
      lawyerFee: 685, titleInsuranceCost: 0.0056, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Mille Lacs County': {
      inspectionCost: 394, appraisalCost: 495, surveyFee: 384, pestInspectionCost: 141,
      lawyerFee: 682, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Morrison County': {
      inspectionCost: 394, appraisalCost: 495, surveyFee: 384, pestInspectionCost: 141,
      lawyerFee: 683, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Mower County': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 380, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Murray County': {
      inspectionCost: 386, appraisalCost: 485, surveyFee: 376, pestInspectionCost: 138,
      lawyerFee: 668, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Nicollet County': {
      inspectionCost: 376, appraisalCost: 472, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 651, titleInsuranceCost: 0.0055, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Nobles County': {
      inspectionCost: 387, appraisalCost: 486, surveyFee: 377, pestInspectionCost: 139,
      lawyerFee: 670, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Norman County': {
      inspectionCost: 378, appraisalCost: 475, surveyFee: 368, pestInspectionCost: 135,
      lawyerFee: 654, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Olmsted County': {
      inspectionCost: 392, appraisalCost: 493, surveyFee: 382, pestInspectionCost: 140,
      lawyerFee: 679, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Otter Tail County': {
      inspectionCost: 389, appraisalCost: 489, surveyFee: 379, pestInspectionCost: 139,
      lawyerFee: 673, titleInsuranceCost: 0.0056, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Pennington County': {
      inspectionCost: 379, appraisalCost: 477, surveyFee: 370, pestInspectionCost: 136,
      lawyerFee: 657, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Pine County': {
      inspectionCost: 381, appraisalCost: 479, surveyFee: 371, pestInspectionCost: 136,
      lawyerFee: 660, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Pipestone County': {
      inspectionCost: 408, appraisalCost: 513, surveyFee: 397, pestInspectionCost: 146,
      lawyerFee: 706, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 26
    },
    'Polk County': {
      inspectionCost: 403, appraisalCost: 506, surveyFee: 392, pestInspectionCost: 144,
      lawyerFee: 697, titleInsuranceCost: 0.0056, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Pope County': {
      inspectionCost: 408, appraisalCost: 513, surveyFee: 398, pestInspectionCost: 146,
      lawyerFee: 707, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 26
    },
    'Ramsey County': {
      inspectionCost: 400, appraisalCost: 503, surveyFee: 390, pestInspectionCost: 143,
      lawyerFee: 693, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Red Lake County': {
      inspectionCost: 380, appraisalCost: 477, surveyFee: 370, pestInspectionCost: 136,
      lawyerFee: 658, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Redwood County': {
      inspectionCost: 385, appraisalCost: 484, surveyFee: 375, pestInspectionCost: 138,
      lawyerFee: 667, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Renville County': {
      inspectionCost: 377, appraisalCost: 473, surveyFee: 367, pestInspectionCost: 135,
      lawyerFee: 652, titleInsuranceCost: 0.0055, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Rice County': {
      inspectionCost: 381, appraisalCost: 478, surveyFee: 371, pestInspectionCost: 136,
      lawyerFee: 659, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Rock County': {
      inspectionCost: 374, appraisalCost: 470, surveyFee: 365, pestInspectionCost: 134,
      lawyerFee: 648, titleInsuranceCost: 0.0055, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Roseau County': {
      inspectionCost: 403, appraisalCost: 507, surveyFee: 393, pestInspectionCost: 144,
      lawyerFee: 698, titleInsuranceCost: 0.0056, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Scott County': {
      inspectionCost: 382, appraisalCost: 481, surveyFee: 373, pestInspectionCost: 137,
      lawyerFee: 662, titleInsuranceCost: 0.0055, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Sherburne County': {
      inspectionCost: 383, appraisalCost: 482, surveyFee: 373, pestInspectionCost: 137,
      lawyerFee: 664, titleInsuranceCost: 0.0055, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Sibley County': {
      inspectionCost: 373, appraisalCost: 468, surveyFee: 363, pestInspectionCost: 133,
      lawyerFee: 645, titleInsuranceCost: 0.0055, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 23
    },
    'St. Louis County': {
      inspectionCost: 400, appraisalCost: 503, surveyFee: 390, pestInspectionCost: 143,
      lawyerFee: 693, titleInsuranceCost: 0.0056, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Stearns County': {
      inspectionCost: 386, appraisalCost: 485, surveyFee: 376, pestInspectionCost: 138,
      lawyerFee: 668, titleInsuranceCost: 0.0056, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Steele County': {
      inspectionCost: 370, appraisalCost: 465, surveyFee: 361, pestInspectionCost: 133,
      lawyerFee: 641, titleInsuranceCost: 0.0055, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 23
    },
    'Stevens County': {
      inspectionCost: 406, appraisalCost: 510, surveyFee: 395, pestInspectionCost: 145,
      lawyerFee: 703, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 51, floodDeterminationFee: 26
    },
    'Swift County': {
      inspectionCost: 382, appraisalCost: 480, surveyFee: 372, pestInspectionCost: 137,
      lawyerFee: 662, titleInsuranceCost: 0.0055, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 24
    },
    'Todd County': {
      inspectionCost: 405, appraisalCost: 509, surveyFee: 394, pestInspectionCost: 145,
      lawyerFee: 701, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Traverse County': {
      inspectionCost: 392, appraisalCost: 492, surveyFee: 382, pestInspectionCost: 140,
      lawyerFee: 679, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Wabasha County': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 380, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Wadena County': {
      inspectionCost: 392, appraisalCost: 493, surveyFee: 382, pestInspectionCost: 140,
      lawyerFee: 679, titleInsuranceCost: 0.0056, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Waseca County': {
      inspectionCost: 380, appraisalCost: 477, surveyFee: 370, pestInspectionCost: 136,
      lawyerFee: 658, titleInsuranceCost: 0.0055, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Washington County': {
      inspectionCost: 391, appraisalCost: 491, surveyFee: 381, pestInspectionCost: 140,
      lawyerFee: 677, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Watonwan County': {
      inspectionCost: 405, appraisalCost: 509, surveyFee: 394, pestInspectionCost: 145,
      lawyerFee: 701, titleInsuranceCost: 0.0056, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 25
    },
    'Wilkin County': {
      inspectionCost: 374, appraisalCost: 470, surveyFee: 365, pestInspectionCost: 134,
      lawyerFee: 648, titleInsuranceCost: 0.0055, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Winona County': {
      inspectionCost: 376, appraisalCost: 472, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 651, titleInsuranceCost: 0.0055, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Wright County': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 380, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0056, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 25
    },
    'Yellow Medicine County': {
      inspectionCost: 406, appraisalCost: 511, surveyFee: 396, pestInspectionCost: 146,
      lawyerFee: 704, titleInsuranceCost: 0.0056, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 26
    },
    'Default': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 380, pestInspectionCost: 140,
      lawyerFee: 675, titleInsuranceCost: 0.0058, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 25
    },
  },
  // MISSOURI
  'MO': {
    'Adair County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Andrew County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 538, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Atchison County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 333, pestInspectionCost: 123,
      lawyerFee: 523, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Audrain County': {
      inspectionCost: 375, appraisalCost: 458, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 573, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Barry County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 539, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Barton County': {
      inspectionCost: 375, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Bates County': {
      inspectionCost: 370, appraisalCost: 452, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 565, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Benton County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Bollinger County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Boone County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Buchanan County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 555, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Butler County': {
      inspectionCost: 354, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Caldwell County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Callaway County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 527, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Camden County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 347, pestInspectionCost: 128,
      lawyerFee: 545, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Cape Girardeau County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 549, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Carroll County': {
      inspectionCost: 347, appraisalCost: 424, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 530, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Carter County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Cass County': {
      inspectionCost: 365, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 558, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Cedar County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 572, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Chariton County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 367, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Christian County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Clark County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 336, pestInspectionCost: 124,
      lawyerFee: 528, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Clay County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Clinton County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 367, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Cole County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Cooper County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 355, pestInspectionCost: 131,
      lawyerFee: 558, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Crawford County': {
      inspectionCost: 375, appraisalCost: 458, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 573, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Dade County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Dallas County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Daviess County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'DeKalb County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 347, pestInspectionCost: 128,
      lawyerFee: 545, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Dent County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Douglas County': {
      inspectionCost: 371, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Dunklin County': {
      inspectionCost: 365, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 558, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Franklin County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Gasconade County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 535, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Gentry County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Greene County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 535, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Grundy County': {
      inspectionCost: 343, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 525, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Harrison County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 125,
      lawyerFee: 531, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Henry County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 560, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Hickory County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Holt County': {
      inspectionCost: 354, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Howard County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 124,
      lawyerFee: 524, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Howell County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 535, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Iron County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Jackson County': {
      inspectionCost: 358, appraisalCost: 437, surveyFee: 348, pestInspectionCost: 129,
      lawyerFee: 547, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Jasper County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Jefferson County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Johnson County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Knox County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Laclede County': {
      inspectionCost: 347, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 125,
      lawyerFee: 531, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lafayette County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Lawrence County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 559, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Lewis County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lincoln County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Linn County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Livingston County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Macon County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 133,
      lawyerFee: 563, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Madison County': {
      inspectionCost: 370, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 133,
      lawyerFee: 566, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Maries County': {
      inspectionCost: 354, appraisalCost: 432, surveyFee: 344, pestInspectionCost: 127,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Marion County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 556, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'McDonald County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 332, pestInspectionCost: 123,
      lawyerFee: 522, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Mercer County': {
      inspectionCost: 365, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 132,
      lawyerFee: 558, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Miller County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Mississippi County': {
      inspectionCost: 356, appraisalCost: 435, surveyFee: 346, pestInspectionCost: 128,
      lawyerFee: 544, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Moniteau County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 568, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Monroe County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Montgomery County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 334, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Morgan County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 131,
      lawyerFee: 557, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'New Madrid County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Newton County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 131,
      lawyerFee: 555, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Nodaway County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 548, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Oregon County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Osage County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 549, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Ozark County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 551, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Pemiscot County': {
      inspectionCost: 355, appraisalCost: 434, surveyFee: 345, pestInspectionCost: 128,
      lawyerFee: 543, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Perry County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Pettis County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 357, pestInspectionCost: 132,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Phelps County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Pike County': {
      inspectionCost: 349, appraisalCost: 426, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 533, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Platte County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 126,
      lawyerFee: 536, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Polk County': {
      inspectionCost: 372, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 568, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Pulaski County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 339, pestInspectionCost: 126,
      lawyerFee: 534, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Putnam County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 132,
      lawyerFee: 560, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Ralls County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 123,
      lawyerFee: 524, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 40, floodDeterminationFee: 20
    },
    'Randolph County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 539, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Ray County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 136, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Reynolds County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 527, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Ripley County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 362, pestInspectionCost: 134,
      lawyerFee: 569, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Saline County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 344, pestInspectionCost: 128,
      lawyerFee: 541, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Schuyler County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Scotland County': {
      inspectionCost: 347, appraisalCost: 424, surveyFee: 337, pestInspectionCost: 125,
      lawyerFee: 530, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Scott County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 343, pestInspectionCost: 127,
      lawyerFee: 540, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Shannon County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Shelby County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 366, pestInspectionCost: 135,
      lawyerFee: 575, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 23
    },
    'St. Charles County': {
      inspectionCost: 346, appraisalCost: 423, surveyFee: 336, pestInspectionCost: 125,
      lawyerFee: 529, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 21
    },
    'St. Clair County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 549, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'St. Francois County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'St. Louis County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 359, pestInspectionCost: 133,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Ste. Genevieve County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 332, pestInspectionCost: 123,
      lawyerFee: 523, titleInsuranceCost: 0.0052, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Stoddard County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Stone County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 548, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Sullivan County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Taney County': {
      inspectionCost: 375, appraisalCost: 458, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 573, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Texas County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Vernon County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 127,
      lawyerFee: 537, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Warren County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 129,
      lawyerFee: 548, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Washington County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 130,
      lawyerFee: 552, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Wayne County': {
      inspectionCost: 371, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 134,
      lawyerFee: 567, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Webster County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 135,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Worth County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 124,
      lawyerFee: 526, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Wright County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 130,
      lawyerFee: 550, titleInsuranceCost: 0.0055, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
  // MISSISSIPPI
  'MS': {
    'Adams County': {
      inspectionCost: 341, appraisalCost: 424, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Alcorn County': {
      inspectionCost: 325, appraisalCost: 404, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 493, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Amite County': {
      inspectionCost: 324, appraisalCost: 402, surveyFee: 314, pestInspectionCost: 112,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Attala County': {
      inspectionCost: 339, appraisalCost: 421, surveyFee: 328, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Benton County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Bolivar County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Calhoun County': {
      inspectionCost: 339, appraisalCost: 421, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Carroll County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Chickasaw County': {
      inspectionCost: 316, appraisalCost: 393, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Choctaw County': {
      inspectionCost: 319, appraisalCost: 397, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Claiborne County': {
      inspectionCost: 339, appraisalCost: 421, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Clarke County': {
      inspectionCost: 326, appraisalCost: 405, surveyFee: 316, pestInspectionCost: 113,
      lawyerFee: 494, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Clay County': {
      inspectionCost: 316, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Coahoma County': {
      inspectionCost: 345, appraisalCost: 429, surveyFee: 335, pestInspectionCost: 120,
      lawyerFee: 523, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Copiah County': {
      inspectionCost: 332, appraisalCost: 413, surveyFee: 322, pestInspectionCost: 115,
      lawyerFee: 504, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Covington County': {
      inspectionCost: 316, appraisalCost: 393, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'DeSoto County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Forrest County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Franklin County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'George County': {
      inspectionCost: 327, appraisalCost: 406, surveyFee: 317, pestInspectionCost: 114,
      lawyerFee: 496, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Greene County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Grenada County': {
      inspectionCost: 340, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Hancock County': {
      inspectionCost: 336, appraisalCost: 417, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Harrison County': {
      inspectionCost: 319, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 483, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Hinds County': {
      inspectionCost: 330, appraisalCost: 411, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 501, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Holmes County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Humphreys County': {
      inspectionCost: 342, appraisalCost: 425, surveyFee: 332, pestInspectionCost: 119,
      lawyerFee: 519, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Issaquena County': {
      inspectionCost: 344, appraisalCost: 427, surveyFee: 333, pestInspectionCost: 119,
      lawyerFee: 521, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Itawamba County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 485, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Jackson County': {
      inspectionCost: 328, appraisalCost: 407, surveyFee: 318, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Jasper County': {
      inspectionCost: 338, appraisalCost: 420, surveyFee: 328, pestInspectionCost: 117,
      lawyerFee: 513, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Jefferson County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Jefferson Davis County': {
      inspectionCost: 327, appraisalCost: 406, surveyFee: 317, pestInspectionCost: 114,
      lawyerFee: 496, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Jones County': {
      inspectionCost: 336, appraisalCost: 418, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Kemper County': {
      inspectionCost: 320, appraisalCost: 397, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 485, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Lafayette County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Lamar County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Lauderdale County': {
      inspectionCost: 328, appraisalCost: 407, surveyFee: 318, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Lawrence County': {
      inspectionCost: 335, appraisalCost: 416, surveyFee: 325, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Leake County': {
      inspectionCost: 340, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Lee County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Leflore County': {
      inspectionCost: 325, appraisalCost: 404, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 493, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Lincoln County': {
      inspectionCost: 334, appraisalCost: 415, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Lowndes County': {
      inspectionCost: 338, appraisalCost: 420, surveyFee: 328, pestInspectionCost: 117,
      lawyerFee: 512, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Madison County': {
      inspectionCost: 339, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Marion County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Marshall County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Monroe County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 501, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Montgomery County': {
      inspectionCost: 315, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 478, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Neshoba County': {
      inspectionCost: 318, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 483, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Newton County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Noxubee County': {
      inspectionCost: 317, appraisalCost: 394, surveyFee: 307, pestInspectionCost: 110,
      lawyerFee: 481, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Oktibbeha County': {
      inspectionCost: 335, appraisalCost: 416, surveyFee: 325, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Panola County': {
      inspectionCost: 317, appraisalCost: 394, surveyFee: 307, pestInspectionCost: 110,
      lawyerFee: 481, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Pearl River County': {
      inspectionCost: 314, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Perry County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Pike County': {
      inspectionCost: 320, appraisalCost: 397, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 485, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Pontotoc County': {
      inspectionCost: 336, appraisalCost: 417, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Prentiss County': {
      inspectionCost: 321, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Quitman County': {
      inspectionCost: 344, appraisalCost: 427, surveyFee: 333, pestInspectionCost: 119,
      lawyerFee: 521, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Rankin County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Scott County': {
      inspectionCost: 324, appraisalCost: 402, surveyFee: 314, pestInspectionCost: 112,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Sharkey County': {
      inspectionCost: 341, appraisalCost: 424, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 518, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Simpson County': {
      inspectionCost: 314, appraisalCost: 390, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 476, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Smith County': {
      inspectionCost: 314, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Stone County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Sunflower County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Tallahatchie County': {
      inspectionCost: 334, appraisalCost: 416, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Tate County': {
      inspectionCost: 335, appraisalCost: 416, surveyFee: 325, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Tippah County': {
      inspectionCost: 326, appraisalCost: 405, surveyFee: 316, pestInspectionCost: 113,
      lawyerFee: 494, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Tishomingo County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Tunica County': {
      inspectionCost: 325, appraisalCost: 404, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 493, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Union County': {
      inspectionCost: 325, appraisalCost: 403, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Walthall County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Warren County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Washington County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Wayne County': {
      inspectionCost: 340, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Webster County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Wilkinson County': {
      inspectionCost: 316, appraisalCost: 393, surveyFee: 307, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Winston County': {
      inspectionCost: 336, appraisalCost: 418, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Yalobusha County': {
      inspectionCost: 342, appraisalCost: 425, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 518, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Yazoo County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Default': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.005, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
  },
  // MONTANA
  'MT': {
    'Beaverhead County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 421, pestInspectionCost: 95,
      lawyerFee: 407, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Big Horn County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 97,
      lawyerFee: 414, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Blaine County': {
      inspectionCost: 358, appraisalCost: 437, surveyFee: 437, pestInspectionCost: 99,
      lawyerFee: 422, titleInsuranceCost: 0.0049, recordingFees: 154, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Broadwater County': {
      inspectionCost: 362, appraisalCost: 442, surveyFee: 442, pestInspectionCost: 100,
      lawyerFee: 427, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Carbon County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 418, pestInspectionCost: 95,
      lawyerFee: 404, titleInsuranceCost: 0.0048, recordingFees: 147, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Carter County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 445, pestInspectionCost: 101,
      lawyerFee: 430, titleInsuranceCost: 0.0049, recordingFees: 156, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Cascade County': {
      inspectionCost: 346, appraisalCost: 423, surveyFee: 423, pestInspectionCost: 96,
      lawyerFee: 408, titleInsuranceCost: 0.0049, recordingFees: 149, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Chouteau County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 460, pestInspectionCost: 104,
      lawyerFee: 444, titleInsuranceCost: 0.0049, recordingFees: 162, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Custer County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 446, pestInspectionCost: 101,
      lawyerFee: 431, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Daniels County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 451, pestInspectionCost: 102,
      lawyerFee: 436, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Dawson County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 436, pestInspectionCost: 99,
      lawyerFee: 421, titleInsuranceCost: 0.0049, recordingFees: 153, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Deer Lodge County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 427, pestInspectionCost: 97,
      lawyerFee: 412, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Fallon County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 418, pestInspectionCost: 95,
      lawyerFee: 404, titleInsuranceCost: 0.0048, recordingFees: 147, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Fergus County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 97,
      lawyerFee: 415, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Flathead County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 461, pestInspectionCost: 104,
      lawyerFee: 445, titleInsuranceCost: 0.0049, recordingFees: 162, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Gallatin County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 440, pestInspectionCost: 100,
      lawyerFee: 425, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Garfield County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 451, pestInspectionCost: 102,
      lawyerFee: 436, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Glacier County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 455, pestInspectionCost: 103,
      lawyerFee: 439, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Golden Valley County': {
      inspectionCost: 362, appraisalCost: 443, surveyFee: 443, pestInspectionCost: 100,
      lawyerFee: 427, titleInsuranceCost: 0.0049, recordingFees: 156, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Granite County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 449, pestInspectionCost: 102,
      lawyerFee: 433, titleInsuranceCost: 0.0049, recordingFees: 158, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Hill County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 454, pestInspectionCost: 103,
      lawyerFee: 438, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Jefferson County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 441, pestInspectionCost: 100,
      lawyerFee: 426, titleInsuranceCost: 0.0049, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Judith Basin County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 428, pestInspectionCost: 97,
      lawyerFee: 413, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lake County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 427, pestInspectionCost: 97,
      lawyerFee: 412, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lewis and Clark County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 428, pestInspectionCost: 97,
      lawyerFee: 413, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Liberty County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 421, pestInspectionCost: 95,
      lawyerFee: 406, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lincoln County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 446, pestInspectionCost: 101,
      lawyerFee: 430, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Madison County': {
      inspectionCost: 370, appraisalCost: 453, surveyFee: 453, pestInspectionCost: 103,
      lawyerFee: 437, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'McCone County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 422, pestInspectionCost: 96,
      lawyerFee: 408, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Meagher County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 457, pestInspectionCost: 103,
      lawyerFee: 441, titleInsuranceCost: 0.0049, recordingFees: 161, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Mineral County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 421, pestInspectionCost: 95,
      lawyerFee: 406, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Missoula County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 97,
      lawyerFee: 415, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Musselshell County': {
      inspectionCost: 373, appraisalCost: 456, surveyFee: 456, pestInspectionCost: 103,
      lawyerFee: 441, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Park County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 97,
      lawyerFee: 415, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Petroleum County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 431, pestInspectionCost: 98,
      lawyerFee: 416, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Phillips County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 455, pestInspectionCost: 103,
      lawyerFee: 440, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Pondera County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 450, pestInspectionCost: 102,
      lawyerFee: 435, titleInsuranceCost: 0.0049, recordingFees: 158, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Powder River County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 454, pestInspectionCost: 103,
      lawyerFee: 439, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Powell County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 432, pestInspectionCost: 98,
      lawyerFee: 417, titleInsuranceCost: 0.0049, recordingFees: 152, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Prairie County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 459, pestInspectionCost: 104,
      lawyerFee: 444, titleInsuranceCost: 0.0049, recordingFees: 161, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Ravalli County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 97,
      lawyerFee: 414, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Richland County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 421, pestInspectionCost: 95,
      lawyerFee: 406, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Roosevelt County': {
      inspectionCost: 358, appraisalCost: 438, surveyFee: 438, pestInspectionCost: 99,
      lawyerFee: 423, titleInsuranceCost: 0.0049, recordingFees: 154, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Rosebud County': {
      inspectionCost: 355, appraisalCost: 434, surveyFee: 434, pestInspectionCost: 98,
      lawyerFee: 419, titleInsuranceCost: 0.0049, recordingFees: 152, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Sanders County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 432, pestInspectionCost: 98,
      lawyerFee: 417, titleInsuranceCost: 0.0049, recordingFees: 152, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Sheridan County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 428, pestInspectionCost: 97,
      lawyerFee: 413, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Silver Bow County': {
      inspectionCost: 346, appraisalCost: 423, surveyFee: 423, pestInspectionCost: 96,
      lawyerFee: 409, titleInsuranceCost: 0.0049, recordingFees: 149, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Stillwater County': {
      inspectionCost: 356, appraisalCost: 436, surveyFee: 436, pestInspectionCost: 99,
      lawyerFee: 421, titleInsuranceCost: 0.0049, recordingFees: 153, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Sweet Grass County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 455, pestInspectionCost: 103,
      lawyerFee: 439, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Teton County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 445, pestInspectionCost: 101,
      lawyerFee: 430, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Toole County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 425, pestInspectionCost: 96,
      lawyerFee: 410, titleInsuranceCost: 0.0049, recordingFees: 149, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Treasure County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 455, pestInspectionCost: 103,
      lawyerFee: 440, titleInsuranceCost: 0.0049, recordingFees: 160, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Valley County': {
      inspectionCost: 376, appraisalCost: 460, surveyFee: 460, pestInspectionCost: 104,
      lawyerFee: 444, titleInsuranceCost: 0.0049, recordingFees: 162, creditReportFee: 43, floodDeterminationFee: 23
    },
    'Wheatland County': {
      inspectionCost: 377, appraisalCost: 461, surveyFee: 461, pestInspectionCost: 104,
      lawyerFee: 445, titleInsuranceCost: 0.0049, recordingFees: 162, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Wibaux County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 457, pestInspectionCost: 104,
      lawyerFee: 442, titleInsuranceCost: 0.0049, recordingFees: 161, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Yellowstone County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 446, pestInspectionCost: 101,
      lawyerFee: 430, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 440, pestInspectionCost: 100,
      lawyerFee: 425, titleInsuranceCost: 0.0051, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
  // NORTH CAROLINA
  'NC': {
    'Alamance County': {
      inspectionCost: 402, appraisalCost: 499, surveyFee: 392, pestInspectionCost: 142,
      lawyerFee: 637, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Alexander County': {
      inspectionCost: 379, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 134,
      lawyerFee: 601, titleInsuranceCost: 0.0057, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Alleghany County': {
      inspectionCost: 377, appraisalCost: 467, surveyFee: 367, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Anson County': {
      inspectionCost: 399, appraisalCost: 495, surveyFee: 389, pestInspectionCost: 141,
      lawyerFee: 631, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Ashe County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 133,
      lawyerFee: 595, titleInsuranceCost: 0.0057, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Avery County': {
      inspectionCost: 395, appraisalCost: 490, surveyFee: 385, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Beaufort County': {
      inspectionCost: 377, appraisalCost: 467, surveyFee: 367, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Bertie County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0057, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Bladen County': {
      inspectionCost: 408, appraisalCost: 507, surveyFee: 398, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Brunswick County': {
      inspectionCost: 401, appraisalCost: 497, surveyFee: 391, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Buncombe County': {
      inspectionCost: 408, appraisalCost: 506, surveyFee: 398, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Burke County': {
      inspectionCost: 391, appraisalCost: 485, surveyFee: 381, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0057, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Cabarrus County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 373, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0057, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Caldwell County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 376, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0057, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Camden County': {
      inspectionCost: 391, appraisalCost: 486, surveyFee: 381, pestInspectionCost: 138,
      lawyerFee: 620, titleInsuranceCost: 0.0058, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Carteret County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 376, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0057, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Caswell County': {
      inspectionCost: 402, appraisalCost: 498, surveyFee: 391, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Catawba County': {
      inspectionCost: 396, appraisalCost: 491, surveyFee: 386, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Chatham County': {
      inspectionCost: 381, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0057, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Cherokee County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0057, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Chowan County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0057, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Clay County': {
      inspectionCost: 378, appraisalCost: 469, surveyFee: 368, pestInspectionCost: 134,
      lawyerFee: 598, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Cleveland County': {
      inspectionCost: 402, appraisalCost: 499, surveyFee: 392, pestInspectionCost: 142,
      lawyerFee: 637, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Columbus County': {
      inspectionCost: 406, appraisalCost: 504, surveyFee: 396, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Craven County': {
      inspectionCost: 398, appraisalCost: 494, surveyFee: 388, pestInspectionCost: 141,
      lawyerFee: 630, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Cumberland County': {
      inspectionCost: 405, appraisalCost: 502, surveyFee: 395, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Currituck County': {
      inspectionCost: 403, appraisalCost: 500, surveyFee: 393, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Dare County': {
      inspectionCost: 406, appraisalCost: 503, surveyFee: 395, pestInspectionCost: 143,
      lawyerFee: 642, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Davidson County': {
      inspectionCost: 406, appraisalCost: 504, surveyFee: 396, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Davie County': {
      inspectionCost: 377, appraisalCost: 468, surveyFee: 368, pestInspectionCost: 133,
      lawyerFee: 597, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Duplin County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 134,
      lawyerFee: 601, titleInsuranceCost: 0.0057, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Durham County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 138,
      lawyerFee: 617, titleInsuranceCost: 0.0057, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Edgecombe County': {
      inspectionCost: 402, appraisalCost: 498, surveyFee: 391, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Forsyth County': {
      inspectionCost: 392, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0058, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Franklin County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0057, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Gaston County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Gates County': {
      inspectionCost: 376, appraisalCost: 467, surveyFee: 367, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0057, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Graham County': {
      inspectionCost: 399, appraisalCost: 495, surveyFee: 389, pestInspectionCost: 141,
      lawyerFee: 632, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Granville County': {
      inspectionCost: 407, appraisalCost: 505, surveyFee: 397, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Greene County': {
      inspectionCost: 384, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 136,
      lawyerFee: 608, titleInsuranceCost: 0.0057, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Guilford County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Halifax County': {
      inspectionCost: 396, appraisalCost: 491, surveyFee: 386, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Harnett County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0057, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Haywood County': {
      inspectionCost: 378, appraisalCost: 469, surveyFee: 368, pestInspectionCost: 134,
      lawyerFee: 598, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Henderson County': {
      inspectionCost: 410, appraisalCost: 508, surveyFee: 399, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Hertford County': {
      inspectionCost: 399, appraisalCost: 495, surveyFee: 389, pestInspectionCost: 141,
      lawyerFee: 631, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Hoke County': {
      inspectionCost: 397, appraisalCost: 492, surveyFee: 387, pestInspectionCost: 140,
      lawyerFee: 628, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Hyde County': {
      inspectionCost: 395, appraisalCost: 490, surveyFee: 385, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Iredell County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 382, pestInspectionCost: 139,
      lawyerFee: 620, titleInsuranceCost: 0.0058, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Jackson County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 383, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0058, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Johnston County': {
      inspectionCost: 413, appraisalCost: 513, surveyFee: 403, pestInspectionCost: 146,
      lawyerFee: 654, titleInsuranceCost: 0.0058, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Jones County': {
      inspectionCost: 402, appraisalCost: 499, surveyFee: 392, pestInspectionCost: 142,
      lawyerFee: 637, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lee County': {
      inspectionCost: 395, appraisalCost: 490, surveyFee: 385, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lenoir County': {
      inspectionCost: 404, appraisalCost: 501, surveyFee: 394, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Lincoln County': {
      inspectionCost: 400, appraisalCost: 496, surveyFee: 390, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0058, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Macon County': {
      inspectionCost: 404, appraisalCost: 502, surveyFee: 394, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Madison County': {
      inspectionCost: 406, appraisalCost: 504, surveyFee: 396, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Martin County': {
      inspectionCost: 407, appraisalCost: 505, surveyFee: 397, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'McDowell County': {
      inspectionCost: 410, appraisalCost: 509, surveyFee: 400, pestInspectionCost: 145,
      lawyerFee: 650, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Mecklenburg County': {
      inspectionCost: 399, appraisalCost: 495, surveyFee: 389, pestInspectionCost: 141,
      lawyerFee: 632, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Mitchell County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Montgomery County': {
      inspectionCost: 378, appraisalCost: 468, surveyFee: 368, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Moore County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0057, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Nash County': {
      inspectionCost: 403, appraisalCost: 500, surveyFee: 393, pestInspectionCost: 142,
      lawyerFee: 638, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'New Hanover County': {
      inspectionCost: 378, appraisalCost: 468, surveyFee: 368, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Northampton County': {
      inspectionCost: 388, appraisalCost: 482, surveyFee: 378, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0057, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Onslow County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 374, pestInspectionCost: 136,
      lawyerFee: 608, titleInsuranceCost: 0.0057, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Orange County': {
      inspectionCost: 410, appraisalCost: 509, surveyFee: 400, pestInspectionCost: 145,
      lawyerFee: 650, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Pamlico County': {
      inspectionCost: 402, appraisalCost: 499, surveyFee: 392, pestInspectionCost: 142,
      lawyerFee: 637, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Pasquotank County': {
      inspectionCost: 412, appraisalCost: 512, surveyFee: 402, pestInspectionCost: 146,
      lawyerFee: 653, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Pender County': {
      inspectionCost: 397, appraisalCost: 493, surveyFee: 387, pestInspectionCost: 140,
      lawyerFee: 629, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Perquimans County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 383, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0058, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Person County': {
      inspectionCost: 396, appraisalCost: 492, surveyFee: 386, pestInspectionCost: 140,
      lawyerFee: 628, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Pitt County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 366, pestInspectionCost: 133,
      lawyerFee: 594, titleInsuranceCost: 0.0057, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Polk County': {
      inspectionCost: 408, appraisalCost: 506, surveyFee: 398, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Randolph County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0057, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Richmond County': {
      inspectionCost: 413, appraisalCost: 513, surveyFee: 403, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0058, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Robeson County': {
      inspectionCost: 398, appraisalCost: 494, surveyFee: 388, pestInspectionCost: 141,
      lawyerFee: 631, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Rockingham County': {
      inspectionCost: 378, appraisalCost: 469, surveyFee: 368, pestInspectionCost: 134,
      lawyerFee: 598, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Rowan County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 378, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0057, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Rutherford County': {
      inspectionCost: 391, appraisalCost: 485, surveyFee: 381, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0057, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sampson County': {
      inspectionCost: 410, appraisalCost: 509, surveyFee: 400, pestInspectionCost: 145,
      lawyerFee: 649, titleInsuranceCost: 0.0058, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Scotland County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0057, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Stanly County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0057, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Stokes County': {
      inspectionCost: 408, appraisalCost: 507, surveyFee: 398, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Surry County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 134,
      lawyerFee: 601, titleInsuranceCost: 0.0057, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Swain County': {
      inspectionCost: 409, appraisalCost: 508, surveyFee: 399, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0058, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Transylvania County': {
      inspectionCost: 385, appraisalCost: 477, surveyFee: 375, pestInspectionCost: 136,
      lawyerFee: 609, titleInsuranceCost: 0.0057, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Tyrrell County': {
      inspectionCost: 377, appraisalCost: 467, surveyFee: 367, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0057, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Union County': {
      inspectionCost: 389, appraisalCost: 482, surveyFee: 379, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0057, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Vance County': {
      inspectionCost: 398, appraisalCost: 494, surveyFee: 388, pestInspectionCost: 141,
      lawyerFee: 630, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Wake County': {
      inspectionCost: 393, appraisalCost: 488, surveyFee: 383, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0058, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Warren County': {
      inspectionCost: 394, appraisalCost: 489, surveyFee: 384, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0058, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Washington County': {
      inspectionCost: 396, appraisalCost: 491, surveyFee: 386, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Watauga County': {
      inspectionCost: 387, appraisalCost: 481, surveyFee: 378, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0057, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Wayne County': {
      inspectionCost: 407, appraisalCost: 505, surveyFee: 396, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0058, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Wilkes County': {
      inspectionCost: 398, appraisalCost: 494, surveyFee: 388, pestInspectionCost: 141,
      lawyerFee: 631, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Wilson County': {
      inspectionCost: 398, appraisalCost: 493, surveyFee: 388, pestInspectionCost: 141,
      lawyerFee: 630, titleInsuranceCost: 0.0058, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Yadkin County': {
      inspectionCost: 396, appraisalCost: 491, surveyFee: 386, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Yancey County': {
      inspectionCost: 404, appraisalCost: 502, surveyFee: 394, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0058, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Default': {
      inspectionCost: 395, appraisalCost: 490, surveyFee: 385, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.006, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // NORTH DAKOTA
  'ND': {
    'Adams County': {
      inspectionCost: 305, appraisalCost: 388, surveyFee: 300, pestInspectionCost: 103,
      lawyerFee: 439, titleInsuranceCost: 0.0044, recordingFees: 108, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Barnes County': {
      inspectionCost: 283, appraisalCost: 360, surveyFee: 278, pestInspectionCost: 96,
      lawyerFee: 408, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Benson County': {
      inspectionCost: 305, appraisalCost: 387, surveyFee: 299, pestInspectionCost: 103,
      lawyerFee: 439, titleInsuranceCost: 0.0044, recordingFees: 108, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Billings County': {
      inspectionCost: 306, appraisalCost: 390, surveyFee: 301, pestInspectionCost: 104,
      lawyerFee: 442, titleInsuranceCost: 0.0044, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Bottineau County': {
      inspectionCost: 289, appraisalCost: 368, surveyFee: 285, pestInspectionCost: 98,
      lawyerFee: 417, titleInsuranceCost: 0.0043, recordingFees: 103, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Bowman County': {
      inspectionCost: 305, appraisalCost: 388, surveyFee: 300, pestInspectionCost: 103,
      lawyerFee: 440, titleInsuranceCost: 0.0044, recordingFees: 108, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Burke County': {
      inspectionCost: 292, appraisalCost: 371, surveyFee: 287, pestInspectionCost: 99,
      lawyerFee: 420, titleInsuranceCost: 0.0043, recordingFees: 103, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Burleigh County': {
      inspectionCost: 281, appraisalCost: 357, surveyFee: 276, pestInspectionCost: 95,
      lawyerFee: 405, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Cass County': {
      inspectionCost: 299, appraisalCost: 381, surveyFee: 294, pestInspectionCost: 101,
      lawyerFee: 431, titleInsuranceCost: 0.0043, recordingFees: 106, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Cavalier County': {
      inspectionCost: 296, appraisalCost: 376, surveyFee: 291, pestInspectionCost: 100,
      lawyerFee: 427, titleInsuranceCost: 0.0043, recordingFees: 105, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Dickey County': {
      inspectionCost: 301, appraisalCost: 383, surveyFee: 296, pestInspectionCost: 102,
      lawyerFee: 434, titleInsuranceCost: 0.0043, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Divide County': {
      inspectionCost: 302, appraisalCost: 384, surveyFee: 297, pestInspectionCost: 102,
      lawyerFee: 436, titleInsuranceCost: 0.0043, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Dunn County': {
      inspectionCost: 283, appraisalCost: 360, surveyFee: 278, pestInspectionCost: 96,
      lawyerFee: 408, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Eddy County': {
      inspectionCost: 306, appraisalCost: 390, surveyFee: 301, pestInspectionCost: 104,
      lawyerFee: 442, titleInsuranceCost: 0.0044, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Emmons County': {
      inspectionCost: 293, appraisalCost: 372, surveyFee: 288, pestInspectionCost: 99,
      lawyerFee: 422, titleInsuranceCost: 0.0043, recordingFees: 104, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Foster County': {
      inspectionCost: 290, appraisalCost: 369, surveyFee: 285, pestInspectionCost: 98,
      lawyerFee: 418, titleInsuranceCost: 0.0043, recordingFees: 103, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Golden Valley County': {
      inspectionCost: 297, appraisalCost: 377, surveyFee: 292, pestInspectionCost: 100,
      lawyerFee: 427, titleInsuranceCost: 0.0043, recordingFees: 105, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Grand Forks County': {
      inspectionCost: 282, appraisalCost: 358, surveyFee: 277, pestInspectionCost: 95,
      lawyerFee: 406, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Grant County': {
      inspectionCost: 288, appraisalCost: 366, surveyFee: 283, pestInspectionCost: 97,
      lawyerFee: 415, titleInsuranceCost: 0.0043, recordingFees: 102, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Griggs County': {
      inspectionCost: 293, appraisalCost: 373, surveyFee: 288, pestInspectionCost: 99,
      lawyerFee: 423, titleInsuranceCost: 0.0043, recordingFees: 104, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Hettinger County': {
      inspectionCost: 284, appraisalCost: 361, surveyFee: 279, pestInspectionCost: 96,
      lawyerFee: 409, titleInsuranceCost: 0.0043, recordingFees: 101, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Kidder County': {
      inspectionCost: 282, appraisalCost: 358, surveyFee: 277, pestInspectionCost: 95,
      lawyerFee: 406, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'LaMoure County': {
      inspectionCost: 295, appraisalCost: 376, surveyFee: 290, pestInspectionCost: 100,
      lawyerFee: 426, titleInsuranceCost: 0.0043, recordingFees: 105, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Logan County': {
      inspectionCost: 289, appraisalCost: 367, surveyFee: 284, pestInspectionCost: 98,
      lawyerFee: 416, titleInsuranceCost: 0.0043, recordingFees: 102, creditReportFee: 35, floodDeterminationFee: 14
    },
    'McHenry County': {
      inspectionCost: 307, appraisalCost: 391, surveyFee: 302, pestInspectionCost: 104,
      lawyerFee: 443, titleInsuranceCost: 0.0044, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'McIntosh County': {
      inspectionCost: 302, appraisalCost: 384, surveyFee: 297, pestInspectionCost: 102,
      lawyerFee: 435, titleInsuranceCost: 0.0043, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'McKenzie County': {
      inspectionCost: 280, appraisalCost: 356, surveyFee: 275, pestInspectionCost: 95,
      lawyerFee: 404, titleInsuranceCost: 0.0043, recordingFees: 99, creditReportFee: 34, floodDeterminationFee: 14
    },
    'McLean County': {
      inspectionCost: 284, appraisalCost: 361, surveyFee: 279, pestInspectionCost: 96,
      lawyerFee: 409, titleInsuranceCost: 0.0043, recordingFees: 101, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Mercer County': {
      inspectionCost: 299, appraisalCost: 381, surveyFee: 294, pestInspectionCost: 101,
      lawyerFee: 431, titleInsuranceCost: 0.0043, recordingFees: 106, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Morton County': {
      inspectionCost: 304, appraisalCost: 387, surveyFee: 299, pestInspectionCost: 103,
      lawyerFee: 438, titleInsuranceCost: 0.0043, recordingFees: 108, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Mountrail County': {
      inspectionCost: 306, appraisalCost: 389, surveyFee: 301, pestInspectionCost: 103,
      lawyerFee: 441, titleInsuranceCost: 0.0044, recordingFees: 108, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Nelson County': {
      inspectionCost: 284, appraisalCost: 361, surveyFee: 279, pestInspectionCost: 96,
      lawyerFee: 410, titleInsuranceCost: 0.0043, recordingFees: 101, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Oliver County': {
      inspectionCost: 289, appraisalCost: 367, surveyFee: 284, pestInspectionCost: 98,
      lawyerFee: 416, titleInsuranceCost: 0.0043, recordingFees: 103, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Pembina County': {
      inspectionCost: 295, appraisalCost: 375, surveyFee: 290, pestInspectionCost: 100,
      lawyerFee: 425, titleInsuranceCost: 0.0043, recordingFees: 105, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Pierce County': {
      inspectionCost: 284, appraisalCost: 361, surveyFee: 279, pestInspectionCost: 96,
      lawyerFee: 410, titleInsuranceCost: 0.0043, recordingFees: 101, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Ramsey County': {
      inspectionCost: 303, appraisalCost: 385, surveyFee: 298, pestInspectionCost: 102,
      lawyerFee: 436, titleInsuranceCost: 0.0043, recordingFees: 107, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Ransom County': {
      inspectionCost: 294, appraisalCost: 374, surveyFee: 289, pestInspectionCost: 99,
      lawyerFee: 424, titleInsuranceCost: 0.0043, recordingFees: 104, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Renville County': {
      inspectionCost: 285, appraisalCost: 362, surveyFee: 280, pestInspectionCost: 96,
      lawyerFee: 410, titleInsuranceCost: 0.0043, recordingFees: 101, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Richland County': {
      inspectionCost: 282, appraisalCost: 358, surveyFee: 277, pestInspectionCost: 95,
      lawyerFee: 406, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Rolette County': {
      inspectionCost: 299, appraisalCost: 380, surveyFee: 294, pestInspectionCost: 101,
      lawyerFee: 430, titleInsuranceCost: 0.0043, recordingFees: 106, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Sargent County': {
      inspectionCost: 282, appraisalCost: 359, surveyFee: 277, pestInspectionCost: 95,
      lawyerFee: 407, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Sheridan County': {
      inspectionCost: 287, appraisalCost: 365, surveyFee: 282, pestInspectionCost: 97,
      lawyerFee: 413, titleInsuranceCost: 0.0043, recordingFees: 102, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Sioux County': {
      inspectionCost: 302, appraisalCost: 384, surveyFee: 297, pestInspectionCost: 102,
      lawyerFee: 435, titleInsuranceCost: 0.0043, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Slope County': {
      inspectionCost: 306, appraisalCost: 389, surveyFee: 301, pestInspectionCost: 103,
      lawyerFee: 441, titleInsuranceCost: 0.0044, recordingFees: 108, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Stark County': {
      inspectionCost: 296, appraisalCost: 376, surveyFee: 291, pestInspectionCost: 100,
      lawyerFee: 426, titleInsuranceCost: 0.0043, recordingFees: 105, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Steele County': {
      inspectionCost: 280, appraisalCost: 356, surveyFee: 275, pestInspectionCost: 95,
      lawyerFee: 403, titleInsuranceCost: 0.0043, recordingFees: 99, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Stutsman County': {
      inspectionCost: 283, appraisalCost: 360, surveyFee: 278, pestInspectionCost: 96,
      lawyerFee: 408, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Towner County': {
      inspectionCost: 301, appraisalCost: 383, surveyFee: 296, pestInspectionCost: 102,
      lawyerFee: 434, titleInsuranceCost: 0.0043, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Traill County': {
      inspectionCost: 281, appraisalCost: 358, surveyFee: 276, pestInspectionCost: 95,
      lawyerFee: 405, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Walsh County': {
      inspectionCost: 283, appraisalCost: 360, surveyFee: 278, pestInspectionCost: 96,
      lawyerFee: 408, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Ward County': {
      inspectionCost: 286, appraisalCost: 364, surveyFee: 281, pestInspectionCost: 97,
      lawyerFee: 412, titleInsuranceCost: 0.0043, recordingFees: 101, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Wells County': {
      inspectionCost: 282, appraisalCost: 358, surveyFee: 277, pestInspectionCost: 95,
      lawyerFee: 406, titleInsuranceCost: 0.0043, recordingFees: 100, creditReportFee: 34, floodDeterminationFee: 14
    },
    'Williams County': {
      inspectionCost: 289, appraisalCost: 367, surveyFee: 284, pestInspectionCost: 98,
      lawyerFee: 416, titleInsuranceCost: 0.0043, recordingFees: 103, creditReportFee: 35, floodDeterminationFee: 14
    },
    'Default': {
      inspectionCost: 295, appraisalCost: 375, surveyFee: 290, pestInspectionCost: 100,
      lawyerFee: 425, titleInsuranceCost: 0.0045, recordingFees: 105, creditReportFee: 36, floodDeterminationFee: 15
    },
  },
  // NEBRASKA
  'NE': {
    'Adams County': {
      inspectionCost: 326, appraisalCost: 408, surveyFee: 320, pestInspectionCost: 119,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Antelope County': {
      inspectionCost: 330, appraisalCost: 414, surveyFee: 325, pestInspectionCost: 120,
      lawyerFee: 524, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Arthur County': {
      inspectionCost: 307, appraisalCost: 385, surveyFee: 302, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Banner County': {
      inspectionCost: 301, appraisalCost: 377, surveyFee: 296, pestInspectionCost: 109,
      lawyerFee: 478, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Blaine County': {
      inspectionCost: 313, appraisalCost: 393, surveyFee: 308, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Boone County': {
      inspectionCost: 318, appraisalCost: 399, surveyFee: 313, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Box Butte County': {
      inspectionCost: 304, appraisalCost: 382, surveyFee: 300, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Boyd County': {
      inspectionCost: 328, appraisalCost: 411, surveyFee: 323, pestInspectionCost: 119,
      lawyerFee: 521, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Brown County': {
      inspectionCost: 320, appraisalCost: 401, surveyFee: 315, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Buffalo County': {
      inspectionCost: 302, appraisalCost: 378, surveyFee: 297, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Burt County': {
      inspectionCost: 313, appraisalCost: 392, surveyFee: 308, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Butler County': {
      inspectionCost: 309, appraisalCost: 388, surveyFee: 305, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Cass County': {
      inspectionCost: 320, appraisalCost: 401, surveyFee: 314, pestInspectionCost: 116,
      lawyerFee: 508, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Cedar County': {
      inspectionCost: 327, appraisalCost: 410, surveyFee: 322, pestInspectionCost: 119,
      lawyerFee: 520, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Chase County': {
      inspectionCost: 301, appraisalCost: 378, surveyFee: 296, pestInspectionCost: 110,
      lawyerFee: 478, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Cherry County': {
      inspectionCost: 304, appraisalCost: 382, surveyFee: 300, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Cheyenne County': {
      inspectionCost: 322, appraisalCost: 404, surveyFee: 317, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Clay County': {
      inspectionCost: 301, appraisalCost: 378, surveyFee: 296, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Colfax County': {
      inspectionCost: 309, appraisalCost: 388, surveyFee: 304, pestInspectionCost: 113,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Cuming County': {
      inspectionCost: 302, appraisalCost: 379, surveyFee: 297, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Custer County': {
      inspectionCost: 319, appraisalCost: 400, surveyFee: 314, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Dakota County': {
      inspectionCost: 329, appraisalCost: 413, surveyFee: 324, pestInspectionCost: 120,
      lawyerFee: 523, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Dawes County': {
      inspectionCost: 306, appraisalCost: 384, surveyFee: 301, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Dawson County': {
      inspectionCost: 312, appraisalCost: 391, surveyFee: 307, pestInspectionCost: 114,
      lawyerFee: 496, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Deuel County': {
      inspectionCost: 304, appraisalCost: 381, surveyFee: 299, pestInspectionCost: 111,
      lawyerFee: 483, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Dixon County': {
      inspectionCost: 304, appraisalCost: 381, surveyFee: 299, pestInspectionCost: 111,
      lawyerFee: 483, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Dodge County': {
      inspectionCost: 328, appraisalCost: 411, surveyFee: 323, pestInspectionCost: 119,
      lawyerFee: 521, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Douglas County': {
      inspectionCost: 324, appraisalCost: 407, surveyFee: 319, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Dundy County': {
      inspectionCost: 303, appraisalCost: 381, surveyFee: 299, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Fillmore County': {
      inspectionCost: 318, appraisalCost: 399, surveyFee: 313, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Franklin County': {
      inspectionCost: 307, appraisalCost: 385, surveyFee: 302, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Frontier County': {
      inspectionCost: 329, appraisalCost: 412, surveyFee: 323, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Furnas County': {
      inspectionCost: 315, appraisalCost: 395, surveyFee: 310, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Gage County': {
      inspectionCost: 301, appraisalCost: 378, surveyFee: 296, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Garden County': {
      inspectionCost: 305, appraisalCost: 382, surveyFee: 300, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Garfield County': {
      inspectionCost: 323, appraisalCost: 405, surveyFee: 318, pestInspectionCost: 117,
      lawyerFee: 513, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Gosper County': {
      inspectionCost: 302, appraisalCost: 379, surveyFee: 297, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Grant County': {
      inspectionCost: 308, appraisalCost: 386, surveyFee: 303, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Greeley County': {
      inspectionCost: 321, appraisalCost: 403, surveyFee: 316, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Hall County': {
      inspectionCost: 325, appraisalCost: 408, surveyFee: 320, pestInspectionCost: 118,
      lawyerFee: 516, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Hamilton County': {
      inspectionCost: 299, appraisalCost: 375, surveyFee: 294, pestInspectionCost: 109,
      lawyerFee: 475, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Harlan County': {
      inspectionCost: 307, appraisalCost: 385, surveyFee: 302, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Hayes County': {
      inspectionCost: 311, appraisalCost: 391, surveyFee: 306, pestInspectionCost: 113,
      lawyerFee: 495, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Hitchcock County': {
      inspectionCost: 317, appraisalCost: 398, surveyFee: 312, pestInspectionCost: 115,
      lawyerFee: 504, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Holt County': {
      inspectionCost: 309, appraisalCost: 388, surveyFee: 305, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Hooker County': {
      inspectionCost: 326, appraisalCost: 410, surveyFee: 321, pestInspectionCost: 119,
      lawyerFee: 519, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Howard County': {
      inspectionCost: 300, appraisalCost: 376, surveyFee: 295, pestInspectionCost: 109,
      lawyerFee: 477, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Jefferson County': {
      inspectionCost: 316, appraisalCost: 396, surveyFee: 311, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Johnson County': {
      inspectionCost: 321, appraisalCost: 403, surveyFee: 316, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Kearney County': {
      inspectionCost: 312, appraisalCost: 391, surveyFee: 307, pestInspectionCost: 114,
      lawyerFee: 496, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Keith County': {
      inspectionCost: 307, appraisalCost: 385, surveyFee: 302, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Keya Paha County': {
      inspectionCost: 306, appraisalCost: 383, surveyFee: 301, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Kimball County': {
      inspectionCost: 319, appraisalCost: 400, surveyFee: 314, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Knox County': {
      inspectionCost: 319, appraisalCost: 400, surveyFee: 314, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Lancaster County': {
      inspectionCost: 311, appraisalCost: 390, surveyFee: 306, pestInspectionCost: 113,
      lawyerFee: 494, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Lincoln County': {
      inspectionCost: 319, appraisalCost: 400, surveyFee: 314, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Logan County': {
      inspectionCost: 308, appraisalCost: 387, surveyFee: 303, pestInspectionCost: 112,
      lawyerFee: 490, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Loup County': {
      inspectionCost: 314, appraisalCost: 394, surveyFee: 309, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Madison County': {
      inspectionCost: 324, appraisalCost: 406, surveyFee: 319, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'McPherson County': {
      inspectionCost: 328, appraisalCost: 411, surveyFee: 323, pestInspectionCost: 119,
      lawyerFee: 521, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Merrick County': {
      inspectionCost: 305, appraisalCost: 383, surveyFee: 301, pestInspectionCost: 111,
      lawyerFee: 485, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Morrill County': {
      inspectionCost: 308, appraisalCost: 387, surveyFee: 303, pestInspectionCost: 112,
      lawyerFee: 490, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Nance County': {
      inspectionCost: 313, appraisalCost: 393, surveyFee: 308, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Nemaha County': {
      inspectionCost: 320, appraisalCost: 402, surveyFee: 315, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Nuckolls County': {
      inspectionCost: 303, appraisalCost: 381, surveyFee: 299, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Otoe County': {
      inspectionCost: 327, appraisalCost: 410, surveyFee: 322, pestInspectionCost: 119,
      lawyerFee: 519, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Pawnee County': {
      inspectionCost: 319, appraisalCost: 400, surveyFee: 314, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Perkins County': {
      inspectionCost: 327, appraisalCost: 410, surveyFee: 322, pestInspectionCost: 119,
      lawyerFee: 519, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Phelps County': {
      inspectionCost: 329, appraisalCost: 412, surveyFee: 323, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Pierce County': {
      inspectionCost: 303, appraisalCost: 381, surveyFee: 299, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Platte County': {
      inspectionCost: 307, appraisalCost: 385, surveyFee: 302, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Polk County': {
      inspectionCost: 325, appraisalCost: 408, surveyFee: 320, pestInspectionCost: 118,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Red Willow County': {
      inspectionCost: 315, appraisalCost: 395, surveyFee: 310, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Richardson County': {
      inspectionCost: 323, appraisalCost: 406, surveyFee: 318, pestInspectionCost: 118,
      lawyerFee: 514, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Rock County': {
      inspectionCost: 302, appraisalCost: 379, surveyFee: 297, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Saline County': {
      inspectionCost: 310, appraisalCost: 389, surveyFee: 305, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Sarpy County': {
      inspectionCost: 302, appraisalCost: 379, surveyFee: 297, pestInspectionCost: 110,
      lawyerFee: 480, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Saunders County': {
      inspectionCost: 308, appraisalCost: 387, surveyFee: 303, pestInspectionCost: 112,
      lawyerFee: 490, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Scotts Bluff County': {
      inspectionCost: 306, appraisalCost: 383, surveyFee: 301, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Seward County': {
      inspectionCost: 309, appraisalCost: 387, surveyFee: 304, pestInspectionCost: 112,
      lawyerFee: 491, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Sheridan County': {
      inspectionCost: 306, appraisalCost: 384, surveyFee: 301, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Sherman County': {
      inspectionCost: 301, appraisalCost: 377, surveyFee: 296, pestInspectionCost: 109,
      lawyerFee: 478, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Sioux County': {
      inspectionCost: 322, appraisalCost: 404, surveyFee: 317, pestInspectionCost: 117,
      lawyerFee: 512, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Stanton County': {
      inspectionCost: 303, appraisalCost: 379, surveyFee: 298, pestInspectionCost: 110,
      lawyerFee: 481, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Thayer County': {
      inspectionCost: 316, appraisalCost: 397, surveyFee: 311, pestInspectionCost: 115,
      lawyerFee: 503, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Thomas County': {
      inspectionCost: 312, appraisalCost: 391, surveyFee: 307, pestInspectionCost: 113,
      lawyerFee: 495, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Thurston County': {
      inspectionCost: 301, appraisalCost: 378, surveyFee: 296, pestInspectionCost: 110,
      lawyerFee: 478, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Valley County': {
      inspectionCost: 329, appraisalCost: 413, surveyFee: 324, pestInspectionCost: 120,
      lawyerFee: 523, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Washington County': {
      inspectionCost: 316, appraisalCost: 396, surveyFee: 311, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Wayne County': {
      inspectionCost: 324, appraisalCost: 407, surveyFee: 319, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Webster County': {
      inspectionCost: 329, appraisalCost: 412, surveyFee: 323, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Wheeler County': {
      inspectionCost: 308, appraisalCost: 387, surveyFee: 303, pestInspectionCost: 112,
      lawyerFee: 490, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'York County': {
      inspectionCost: 326, appraisalCost: 409, surveyFee: 321, pestInspectionCost: 119,
      lawyerFee: 518, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Default': {
      inspectionCost: 315, appraisalCost: 395, surveyFee: 310, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.005, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
  },
  // NEW HAMPSHIRE
  'NH': {
    'Belknap County': {
      inspectionCost: 450, appraisalCost: 535, surveyFee: 435, pestInspectionCost: 160,
      lawyerFee: 875, titleInsuranceCost: 0.0062, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Carroll County': {
      inspectionCost: 433, appraisalCost: 515, surveyFee: 419, pestInspectionCost: 154,
      lawyerFee: 843, titleInsuranceCost: 0.0062, recordingFees: 159, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Cheshire County': {
      inspectionCost: 461, appraisalCost: 548, surveyFee: 445, pestInspectionCost: 164,
      lawyerFee: 896, titleInsuranceCost: 0.0063, recordingFees: 169, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Coos County': {
      inspectionCost: 444, appraisalCost: 528, surveyFee: 429, pestInspectionCost: 157,
      lawyerFee: 863, titleInsuranceCost: 0.0062, recordingFees: 162, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Grafton County': {
      inspectionCost: 441, appraisalCost: 525, surveyFee: 427, pestInspectionCost: 157,
      lawyerFee: 859, titleInsuranceCost: 0.0062, recordingFees: 162, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Hillsborough County': {
      inspectionCost: 436, appraisalCost: 518, surveyFee: 421, pestInspectionCost: 155,
      lawyerFee: 847, titleInsuranceCost: 0.0062, recordingFees: 159, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Merrimack County': {
      inspectionCost: 461, appraisalCost: 548, surveyFee: 445, pestInspectionCost: 164,
      lawyerFee: 896, titleInsuranceCost: 0.0063, recordingFees: 169, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Rockingham County': {
      inspectionCost: 431, appraisalCost: 512, surveyFee: 416, pestInspectionCost: 153,
      lawyerFee: 838, titleInsuranceCost: 0.0062, recordingFees: 158, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Strafford County': {
      inspectionCost: 454, appraisalCost: 539, surveyFee: 438, pestInspectionCost: 161,
      lawyerFee: 882, titleInsuranceCost: 0.0063, recordingFees: 166, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Sullivan County': {
      inspectionCost: 439, appraisalCost: 522, surveyFee: 424, pestInspectionCost: 156,
      lawyerFee: 854, titleInsuranceCost: 0.0062, recordingFees: 161, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Default': {
      inspectionCost: 450, appraisalCost: 535, surveyFee: 435, pestInspectionCost: 160,
      lawyerFee: 875, titleInsuranceCost: 0.0065, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // NEW JERSEY
  'NJ': {
    'Atlantic County': {
      inspectionCost: 545, appraisalCost: 633, surveyFee: 571, pestInspectionCost: 187,
      lawyerFee: 1090, titleInsuranceCost: 0.0063, recordingFees: 238, creditReportFee: 57, floodDeterminationFee: 32
    },
    'Bergen County': {
      inspectionCost: 547, appraisalCost: 635, surveyFee: 573, pestInspectionCost: 187,
      lawyerFee: 1094, titleInsuranceCost: 0.0063, recordingFees: 239, creditReportFee: 57, floodDeterminationFee: 32
    },
    'Burlington County': {
      inspectionCost: 534, appraisalCost: 621, surveyFee: 560, pestInspectionCost: 183,
      lawyerFee: 1069, titleInsuranceCost: 0.0063, recordingFees: 234, creditReportFee: 56, floodDeterminationFee: 31
    },
    'Camden County': {
      inspectionCost: 520, appraisalCost: 605, surveyFee: 545, pestInspectionCost: 178,
      lawyerFee: 1041, titleInsuranceCost: 0.0062, recordingFees: 228, creditReportFee: 54, floodDeterminationFee: 30
    },
    'Cape May County': {
      inspectionCost: 542, appraisalCost: 630, surveyFee: 568, pestInspectionCost: 185,
      lawyerFee: 1084, titleInsuranceCost: 0.0063, recordingFees: 237, creditReportFee: 56, floodDeterminationFee: 32
    },
    'Cumberland County': {
      inspectionCost: 538, appraisalCost: 625, surveyFee: 564, pestInspectionCost: 184,
      lawyerFee: 1077, titleInsuranceCost: 0.0063, recordingFees: 235, creditReportFee: 56, floodDeterminationFee: 31
    },
    'Essex County': {
      inspectionCost: 508, appraisalCost: 591, surveyFee: 532, pestInspectionCost: 174,
      lawyerFee: 1017, titleInsuranceCost: 0.0062, recordingFees: 222, creditReportFee: 53, floodDeterminationFee: 30
    },
    'Gloucester County': {
      inspectionCost: 548, appraisalCost: 636, surveyFee: 574, pestInspectionCost: 187,
      lawyerFee: 1096, titleInsuranceCost: 0.0063, recordingFees: 240, creditReportFee: 57, floodDeterminationFee: 32
    },
    'Hudson County': {
      inspectionCost: 508, appraisalCost: 590, surveyFee: 532, pestInspectionCost: 174,
      lawyerFee: 1016, titleInsuranceCost: 0.0062, recordingFees: 222, creditReportFee: 53, floodDeterminationFee: 30
    },
    'Hunterdon County': {
      inspectionCost: 550, appraisalCost: 639, surveyFee: 576, pestInspectionCost: 188,
      lawyerFee: 1100, titleInsuranceCost: 0.0063, recordingFees: 241, creditReportFee: 57, floodDeterminationFee: 32
    },
    'Mercer County': {
      inspectionCost: 533, appraisalCost: 619, surveyFee: 558, pestInspectionCost: 182,
      lawyerFee: 1066, titleInsuranceCost: 0.0063, recordingFees: 233, creditReportFee: 55, floodDeterminationFee: 31
    },
    'Middlesex County': {
      inspectionCost: 547, appraisalCost: 636, surveyFee: 573, pestInspectionCost: 187,
      lawyerFee: 1095, titleInsuranceCost: 0.0063, recordingFees: 239, creditReportFee: 57, floodDeterminationFee: 32
    },
    'Monmouth County': {
      inspectionCost: 517, appraisalCost: 601, surveyFee: 542, pestInspectionCost: 177,
      lawyerFee: 1035, titleInsuranceCost: 0.0062, recordingFees: 226, creditReportFee: 54, floodDeterminationFee: 30
    },
    'Morris County': {
      inspectionCost: 501, appraisalCost: 582, surveyFee: 525, pestInspectionCost: 171,
      lawyerFee: 1002, titleInsuranceCost: 0.0062, recordingFees: 219, creditReportFee: 52, floodDeterminationFee: 29
    },
    'Ocean County': {
      inspectionCost: 531, appraisalCost: 617, surveyFee: 557, pestInspectionCost: 182,
      lawyerFee: 1063, titleInsuranceCost: 0.0063, recordingFees: 232, creditReportFee: 55, floodDeterminationFee: 31
    },
    'Passaic County': {
      inspectionCost: 504, appraisalCost: 585, surveyFee: 528, pestInspectionCost: 172,
      lawyerFee: 1008, titleInsuranceCost: 0.0062, recordingFees: 220, creditReportFee: 52, floodDeterminationFee: 29
    },
    'Salem County': {
      inspectionCost: 539, appraisalCost: 626, surveyFee: 564, pestInspectionCost: 184,
      lawyerFee: 1078, titleInsuranceCost: 0.0063, recordingFees: 236, creditReportFee: 56, floodDeterminationFee: 31
    },
    'Somerset County': {
      inspectionCost: 502, appraisalCost: 583, surveyFee: 526, pestInspectionCost: 172,
      lawyerFee: 1004, titleInsuranceCost: 0.0062, recordingFees: 220, creditReportFee: 52, floodDeterminationFee: 29
    },
    'Sussex County': {
      inspectionCost: 524, appraisalCost: 609, surveyFee: 549, pestInspectionCost: 179,
      lawyerFee: 1048, titleInsuranceCost: 0.0062, recordingFees: 229, creditReportFee: 54, floodDeterminationFee: 30
    },
    'Union County': {
      inspectionCost: 517, appraisalCost: 600, surveyFee: 541, pestInspectionCost: 177,
      lawyerFee: 1034, titleInsuranceCost: 0.0062, recordingFees: 226, creditReportFee: 54, floodDeterminationFee: 30
    },
    'Warren County': {
      inspectionCost: 523, appraisalCost: 608, surveyFee: 548, pestInspectionCost: 179,
      lawyerFee: 1047, titleInsuranceCost: 0.0062, recordingFees: 229, creditReportFee: 54, floodDeterminationFee: 30
    },
    'Default': {
      inspectionCost: 525, appraisalCost: 610, surveyFee: 550, pestInspectionCost: 180,
      lawyerFee: 1050, titleInsuranceCost: 0.0065, recordingFees: 230, creditReportFee: 55, floodDeterminationFee: 31
    },
  },
  // NEW MEXICO
  'NM': {
    'Bernalillo County': {
      inspectionCost: 363, appraisalCost: 451, surveyFee: 451, pestInspectionCost: 126,
      lawyerFee: 412, titleInsuranceCost: 0.0052, recordingFees: 160, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Catron County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 474, pestInspectionCost: 132,
      lawyerFee: 433, titleInsuranceCost: 0.0053, recordingFees: 168, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Chaves County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 476, pestInspectionCost: 133,
      lawyerFee: 435, titleInsuranceCost: 0.0053, recordingFees: 169, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Cibola County': {
      inspectionCost: 391, appraisalCost: 484, surveyFee: 484, pestInspectionCost: 135,
      lawyerFee: 443, titleInsuranceCost: 0.0053, recordingFees: 172, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Colfax County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 457, pestInspectionCost: 127,
      lawyerFee: 417, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Curry County': {
      inspectionCost: 356, appraisalCost: 442, surveyFee: 442, pestInspectionCost: 123,
      lawyerFee: 404, titleInsuranceCost: 0.0052, recordingFees: 156, creditReportFee: 43, floodDeterminationFee: 22
    },
    'De Baca County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 470, pestInspectionCost: 131,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 166, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Doña Ana County': {
      inspectionCost: 370, appraisalCost: 458, surveyFee: 458, pestInspectionCost: 128,
      lawyerFee: 419, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Eddy County': {
      inspectionCost: 390, appraisalCost: 483, surveyFee: 483, pestInspectionCost: 135,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 171, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Grant County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 454, pestInspectionCost: 127,
      lawyerFee: 415, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Guadalupe County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 455, pestInspectionCost: 127,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Harding County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 465, pestInspectionCost: 130,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Hidalgo County': {
      inspectionCost: 369, appraisalCost: 457, surveyFee: 457, pestInspectionCost: 127,
      lawyerFee: 418, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Lea County': {
      inspectionCost: 364, appraisalCost: 452, surveyFee: 452, pestInspectionCost: 126,
      lawyerFee: 413, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Lincoln County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 471, pestInspectionCost: 131,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 167, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Los Alamos County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 487, pestInspectionCost: 136,
      lawyerFee: 445, titleInsuranceCost: 0.0053, recordingFees: 173, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Luna County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 486, pestInspectionCost: 135,
      lawyerFee: 444, titleInsuranceCost: 0.0053, recordingFees: 172, creditReportFee: 48, floodDeterminationFee: 25
    },
    'McKinley County': {
      inspectionCost: 373, appraisalCost: 463, surveyFee: 463, pestInspectionCost: 129,
      lawyerFee: 423, titleInsuranceCost: 0.0053, recordingFees: 164, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Mora County': {
      inspectionCost: 366, appraisalCost: 453, surveyFee: 453, pestInspectionCost: 126,
      lawyerFee: 414, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Otero County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 480, pestInspectionCost: 134,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 170, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Quay County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 474, pestInspectionCost: 132,
      lawyerFee: 433, titleInsuranceCost: 0.0053, recordingFees: 168, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Rio Arriba County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 465, pestInspectionCost: 130,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Roosevelt County': {
      inspectionCost: 373, appraisalCost: 463, surveyFee: 463, pestInspectionCost: 129,
      lawyerFee: 423, titleInsuranceCost: 0.0053, recordingFees: 164, creditReportFee: 45, floodDeterminationFee: 23
    },
    'San Juan County': {
      inspectionCost: 372, appraisalCost: 462, surveyFee: 462, pestInspectionCost: 129,
      lawyerFee: 422, titleInsuranceCost: 0.0053, recordingFees: 164, creditReportFee: 45, floodDeterminationFee: 23
    },
    'San Miguel County': {
      inspectionCost: 386, appraisalCost: 478, surveyFee: 478, pestInspectionCost: 133,
      lawyerFee: 437, titleInsuranceCost: 0.0053, recordingFees: 169, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Sandoval County': {
      inspectionCost: 389, appraisalCost: 483, surveyFee: 483, pestInspectionCost: 135,
      lawyerFee: 441, titleInsuranceCost: 0.0053, recordingFees: 171, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Santa Fe County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 455, pestInspectionCost: 127,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sierra County': {
      inspectionCost: 378, appraisalCost: 469, surveyFee: 469, pestInspectionCost: 131,
      lawyerFee: 428, titleInsuranceCost: 0.0053, recordingFees: 166, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Socorro County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 448, pestInspectionCost: 125,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 159, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Taos County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 484, pestInspectionCost: 135,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 171, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Torrance County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 471, pestInspectionCost: 131,
      lawyerFee: 431, titleInsuranceCost: 0.0053, recordingFees: 167, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Union County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 458, pestInspectionCost: 128,
      lawyerFee: 418, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Valencia County': {
      inspectionCost: 378, appraisalCost: 468, surveyFee: 468, pestInspectionCost: 131,
      lawyerFee: 428, titleInsuranceCost: 0.0053, recordingFees: 166, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Default': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 465, pestInspectionCost: 130,
      lawyerFee: 425, titleInsuranceCost: 0.0055, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // NEVADA
  'NV': {
    'Churchill County': {
      inspectionCost: 403, appraisalCost: 486, surveyFee: 496, pestInspectionCost: 111,
      lawyerFee: 413, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 21
    },
    'Clark County': {
      inspectionCost: 398, appraisalCost: 480, surveyFee: 490, pestInspectionCost: 110,
      lawyerFee: 408, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 47, floodDeterminationFee: 21
    },
    'Douglas County': {
      inspectionCost: 427, appraisalCost: 515, surveyFee: 525, pestInspectionCost: 118,
      lawyerFee: 438, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 22
    },
    'Elko County': {
      inspectionCost: 427, appraisalCost: 514, surveyFee: 524, pestInspectionCost: 118,
      lawyerFee: 437, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 22
    },
    'Esmeralda County': {
      inspectionCost: 424, appraisalCost: 512, surveyFee: 522, pestInspectionCost: 117,
      lawyerFee: 435, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 22
    },
    'Eureka County': {
      inspectionCost: 406, appraisalCost: 489, surveyFee: 499, pestInspectionCost: 112,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 47, floodDeterminationFee: 21
    },
    'Humboldt County': {
      inspectionCost: 418, appraisalCost: 504, surveyFee: 514, pestInspectionCost: 116,
      lawyerFee: 428, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 22
    },
    'Lander County': {
      inspectionCost: 415, appraisalCost: 501, surveyFee: 511, pestInspectionCost: 115,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 22
    },
    'Lincoln County': {
      inspectionCost: 420, appraisalCost: 507, surveyFee: 517, pestInspectionCost: 116,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 22
    },
    'Lyon County': {
      inspectionCost: 426, appraisalCost: 513, surveyFee: 523, pestInspectionCost: 118,
      lawyerFee: 436, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 22
    },
    'Mineral County': {
      inspectionCost: 397, appraisalCost: 478, surveyFee: 488, pestInspectionCost: 110,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 21
    },
    'Nye County': {
      inspectionCost: 421, appraisalCost: 508, surveyFee: 518, pestInspectionCost: 116,
      lawyerFee: 431, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 22
    },
    'Pershing County': {
      inspectionCost: 429, appraisalCost: 517, surveyFee: 527, pestInspectionCost: 118,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 22
    },
    'Storey County': {
      inspectionCost: 394, appraisalCost: 475, surveyFee: 485, pestInspectionCost: 109,
      lawyerFee: 404, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 20
    },
    'Washoe County': {
      inspectionCost: 400, appraisalCost: 483, surveyFee: 492, pestInspectionCost: 111,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 21
    },
    'White Pine County': {
      inspectionCost: 407, appraisalCost: 491, surveyFee: 501, pestInspectionCost: 113,
      lawyerFee: 417, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 21
    },
    'Default': {
      inspectionCost: 415, appraisalCost: 500, surveyFee: 510, pestInspectionCost: 115,
      lawyerFee: 425, titleInsuranceCost: 0.0055, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 22
    },
  },
  // NEW YORK
  'NY': {
    'Albany County': {
      inspectionCost: 606, appraisalCost: 727, surveyFee: 703, pestInspectionCost: 194,
      lawyerFee: 1164, titleInsuranceCost: 0.0067, recordingFees: 266, creditReportFee: 60, floodDeterminationFee: 33
    },
    'Allegany County': {
      inspectionCost: 594, appraisalCost: 713, surveyFee: 689, pestInspectionCost: 190,
      lawyerFee: 1141, titleInsuranceCost: 0.0067, recordingFees: 261, creditReportFee: 58, floodDeterminationFee: 33
    },
    'Bronx County': {
      inspectionCost: 624, appraisalCost: 749, surveyFee: 724, pestInspectionCost: 199,
      lawyerFee: 1198, titleInsuranceCost: 0.0067, recordingFees: 274, creditReportFee: 61, floodDeterminationFee: 34
    },
    'Broome County': {
      inspectionCost: 629, appraisalCost: 755, surveyFee: 730, pestInspectionCost: 201,
      lawyerFee: 1208, titleInsuranceCost: 0.0067, recordingFees: 276, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Cattaraugus County': {
      inspectionCost: 631, appraisalCost: 758, surveyFee: 732, pestInspectionCost: 202,
      lawyerFee: 1213, titleInsuranceCost: 0.0067, recordingFees: 278, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Cayuga County': {
      inspectionCost: 638, appraisalCost: 765, surveyFee: 740, pestInspectionCost: 204,
      lawyerFee: 1225, titleInsuranceCost: 0.0067, recordingFees: 280, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Chautauqua County': {
      inspectionCost: 643, appraisalCost: 771, surveyFee: 746, pestInspectionCost: 205,
      lawyerFee: 1234, titleInsuranceCost: 0.0068, recordingFees: 282, creditReportFee: 63, floodDeterminationFee: 36
    },
    'Chemung County': {
      inspectionCost: 644, appraisalCost: 773, surveyFee: 747, pestInspectionCost: 206,
      lawyerFee: 1237, titleInsuranceCost: 0.0068, recordingFees: 283, creditReportFee: 63, floodDeterminationFee: 36
    },
    'Chenango County': {
      inspectionCost: 635, appraisalCost: 762, surveyFee: 736, pestInspectionCost: 203,
      lawyerFee: 1219, titleInsuranceCost: 0.0067, recordingFees: 279, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Clinton County': {
      inspectionCost: 655, appraisalCost: 786, surveyFee: 760, pestInspectionCost: 209,
      lawyerFee: 1258, titleInsuranceCost: 0.0068, recordingFees: 288, creditReportFee: 65, floodDeterminationFee: 36
    },
    'Columbia County': {
      inspectionCost: 646, appraisalCost: 776, surveyFee: 750, pestInspectionCost: 206,
      lawyerFee: 1242, titleInsuranceCost: 0.0068, recordingFees: 284, creditReportFee: 64, floodDeterminationFee: 36
    },
    'Cortland County': {
      inspectionCost: 606, appraisalCost: 727, surveyFee: 703, pestInspectionCost: 194,
      lawyerFee: 1164, titleInsuranceCost: 0.0067, recordingFees: 266, creditReportFee: 60, floodDeterminationFee: 33
    },
    'Delaware County': {
      inspectionCost: 638, appraisalCost: 766, surveyFee: 740, pestInspectionCost: 204,
      lawyerFee: 1226, titleInsuranceCost: 0.0068, recordingFees: 281, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Dutchess County': {
      inspectionCost: 636, appraisalCost: 763, surveyFee: 738, pestInspectionCost: 203,
      lawyerFee: 1221, titleInsuranceCost: 0.0067, recordingFees: 279, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Erie County': {
      inspectionCost: 622, appraisalCost: 747, surveyFee: 722, pestInspectionCost: 199,
      lawyerFee: 1195, titleInsuranceCost: 0.0067, recordingFees: 273, creditReportFee: 61, floodDeterminationFee: 34
    },
    'Essex County': {
      inspectionCost: 605, appraisalCost: 726, surveyFee: 702, pestInspectionCost: 193,
      lawyerFee: 1162, titleInsuranceCost: 0.0067, recordingFees: 266, creditReportFee: 60, floodDeterminationFee: 33
    },
    'Franklin County': {
      inspectionCost: 610, appraisalCost: 732, surveyFee: 707, pestInspectionCost: 195,
      lawyerFee: 1171, titleInsuranceCost: 0.0067, recordingFees: 268, creditReportFee: 60, floodDeterminationFee: 34
    },
    'Fulton County': {
      inspectionCost: 645, appraisalCost: 774, surveyFee: 748, pestInspectionCost: 206,
      lawyerFee: 1239, titleInsuranceCost: 0.0068, recordingFees: 284, creditReportFee: 64, floodDeterminationFee: 36
    },
    'Genesee County': {
      inspectionCost: 648, appraisalCost: 778, surveyFee: 752, pestInspectionCost: 207,
      lawyerFee: 1245, titleInsuranceCost: 0.0068, recordingFees: 285, creditReportFee: 64, floodDeterminationFee: 36
    },
    'Greene County': {
      inspectionCost: 608, appraisalCost: 730, surveyFee: 706, pestInspectionCost: 194,
      lawyerFee: 1168, titleInsuranceCost: 0.0067, recordingFees: 267, creditReportFee: 60, floodDeterminationFee: 34
    },
    'Hamilton County': {
      inspectionCost: 594, appraisalCost: 713, surveyFee: 689, pestInspectionCost: 190,
      lawyerFee: 1141, titleInsuranceCost: 0.0067, recordingFees: 261, creditReportFee: 58, floodDeterminationFee: 33
    },
    'Herkimer County': {
      inspectionCost: 593, appraisalCost: 712, surveyFee: 688, pestInspectionCost: 190,
      lawyerFee: 1140, titleInsuranceCost: 0.0066, recordingFees: 261, creditReportFee: 58, floodDeterminationFee: 33
    },
    'Jefferson County': {
      inspectionCost: 627, appraisalCost: 753, surveyFee: 727, pestInspectionCost: 200,
      lawyerFee: 1204, titleInsuranceCost: 0.0067, recordingFees: 276, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Kings County': {
      inspectionCost: 636, appraisalCost: 763, surveyFee: 738, pestInspectionCost: 203,
      lawyerFee: 1221, titleInsuranceCost: 0.0067, recordingFees: 279, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Lewis County': {
      inspectionCost: 607, appraisalCost: 729, surveyFee: 704, pestInspectionCost: 194,
      lawyerFee: 1166, titleInsuranceCost: 0.0067, recordingFees: 267, creditReportFee: 60, floodDeterminationFee: 34
    },
    'Livingston County': {
      inspectionCost: 633, appraisalCost: 760, surveyFee: 735, pestInspectionCost: 202,
      lawyerFee: 1216, titleInsuranceCost: 0.0067, recordingFees: 278, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Madison County': {
      inspectionCost: 643, appraisalCost: 772, surveyFee: 746, pestInspectionCost: 206,
      lawyerFee: 1236, titleInsuranceCost: 0.0068, recordingFees: 283, creditReportFee: 63, floodDeterminationFee: 36
    },
    'Monroe County': {
      inspectionCost: 626, appraisalCost: 751, surveyFee: 726, pestInspectionCost: 200,
      lawyerFee: 1202, titleInsuranceCost: 0.0067, recordingFees: 275, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Montgomery County': {
      inspectionCost: 598, appraisalCost: 717, surveyFee: 693, pestInspectionCost: 191,
      lawyerFee: 1148, titleInsuranceCost: 0.0067, recordingFees: 263, creditReportFee: 59, floodDeterminationFee: 33
    },
    'Nassau County': {
      inspectionCost: 640, appraisalCost: 768, surveyFee: 742, pestInspectionCost: 204,
      lawyerFee: 1228, titleInsuranceCost: 0.0068, recordingFees: 281, creditReportFee: 63, floodDeterminationFee: 35
    },
    'New York County': {
      inspectionCost: 616, appraisalCost: 740, surveyFee: 715, pestInspectionCost: 197,
      lawyerFee: 1184, titleInsuranceCost: 0.0067, recordingFees: 271, creditReportFee: 61, floodDeterminationFee: 34
    },
    'Niagara County': {
      inspectionCost: 596, appraisalCost: 715, surveyFee: 691, pestInspectionCost: 190,
      lawyerFee: 1144, titleInsuranceCost: 0.0067, recordingFees: 262, creditReportFee: 59, floodDeterminationFee: 33
    },
    'Oneida County': {
      inspectionCost: 626, appraisalCost: 751, surveyFee: 726, pestInspectionCost: 200,
      lawyerFee: 1202, titleInsuranceCost: 0.0067, recordingFees: 275, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Onondaga County': {
      inspectionCost: 612, appraisalCost: 735, surveyFee: 710, pestInspectionCost: 196,
      lawyerFee: 1176, titleInsuranceCost: 0.0067, recordingFees: 269, creditReportFee: 60, floodDeterminationFee: 34
    },
    'Ontario County': {
      inspectionCost: 652, appraisalCost: 783, surveyFee: 756, pestInspectionCost: 208,
      lawyerFee: 1252, titleInsuranceCost: 0.0068, recordingFees: 287, creditReportFee: 64, floodDeterminationFee: 36
    },
    'Orange County': {
      inspectionCost: 650, appraisalCost: 780, surveyFee: 754, pestInspectionCost: 208,
      lawyerFee: 1248, titleInsuranceCost: 0.0068, recordingFees: 286, creditReportFee: 64, floodDeterminationFee: 36
    },
    'Orleans County': {
      inspectionCost: 628, appraisalCost: 754, surveyFee: 729, pestInspectionCost: 201,
      lawyerFee: 1207, titleInsuranceCost: 0.0067, recordingFees: 276, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Oswego County': {
      inspectionCost: 621, appraisalCost: 746, surveyFee: 721, pestInspectionCost: 199,
      lawyerFee: 1194, titleInsuranceCost: 0.0067, recordingFees: 273, creditReportFee: 61, floodDeterminationFee: 34
    },
    'Otsego County': {
      inspectionCost: 651, appraisalCost: 782, surveyFee: 756, pestInspectionCost: 208,
      lawyerFee: 1251, titleInsuranceCost: 0.0068, recordingFees: 286, creditReportFee: 64, floodDeterminationFee: 36
    },
    'Putnam County': {
      inspectionCost: 636, appraisalCost: 764, surveyFee: 738, pestInspectionCost: 203,
      lawyerFee: 1222, titleInsuranceCost: 0.0067, recordingFees: 280, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Queens County': {
      inspectionCost: 595, appraisalCost: 714, surveyFee: 690, pestInspectionCost: 190,
      lawyerFee: 1142, titleInsuranceCost: 0.0067, recordingFees: 261, creditReportFee: 59, floodDeterminationFee: 33
    },
    'Rensselaer County': {
      inspectionCost: 603, appraisalCost: 723, surveyFee: 699, pestInspectionCost: 193,
      lawyerFee: 1158, titleInsuranceCost: 0.0067, recordingFees: 265, creditReportFee: 59, floodDeterminationFee: 33
    },
    'Richmond County': {
      inspectionCost: 655, appraisalCost: 786, surveyFee: 759, pestInspectionCost: 209,
      lawyerFee: 1257, titleInsuranceCost: 0.0068, recordingFees: 288, creditReportFee: 64, floodDeterminationFee: 36
    },
    'Rockland County': {
      inspectionCost: 641, appraisalCost: 769, surveyFee: 743, pestInspectionCost: 205,
      lawyerFee: 1231, titleInsuranceCost: 0.0068, recordingFees: 282, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Saratoga County': {
      inspectionCost: 638, appraisalCost: 766, surveyFee: 740, pestInspectionCost: 204,
      lawyerFee: 1226, titleInsuranceCost: 0.0068, recordingFees: 281, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Schenectady County': {
      inspectionCost: 605, appraisalCost: 726, surveyFee: 701, pestInspectionCost: 193,
      lawyerFee: 1161, titleInsuranceCost: 0.0067, recordingFees: 266, creditReportFee: 60, floodDeterminationFee: 33
    },
    'Schoharie County': {
      inspectionCost: 616, appraisalCost: 739, surveyFee: 714, pestInspectionCost: 197,
      lawyerFee: 1183, titleInsuranceCost: 0.0067, recordingFees: 271, creditReportFee: 61, floodDeterminationFee: 34
    },
    'Schuyler County': {
      inspectionCost: 610, appraisalCost: 732, surveyFee: 708, pestInspectionCost: 195,
      lawyerFee: 1172, titleInsuranceCost: 0.0067, recordingFees: 268, creditReportFee: 60, floodDeterminationFee: 34
    },
    'Seneca County': {
      inspectionCost: 612, appraisalCost: 735, surveyFee: 710, pestInspectionCost: 196,
      lawyerFee: 1176, titleInsuranceCost: 0.0067, recordingFees: 269, creditReportFee: 60, floodDeterminationFee: 34
    },
    'St. Lawrence County': {
      inspectionCost: 610, appraisalCost: 732, surveyFee: 708, pestInspectionCost: 195,
      lawyerFee: 1172, titleInsuranceCost: 0.0067, recordingFees: 268, creditReportFee: 60, floodDeterminationFee: 34
    },
    'Steuben County': {
      inspectionCost: 641, appraisalCost: 770, surveyFee: 744, pestInspectionCost: 205,
      lawyerFee: 1232, titleInsuranceCost: 0.0068, recordingFees: 282, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Suffolk County': {
      inspectionCost: 605, appraisalCost: 726, surveyFee: 702, pestInspectionCost: 193,
      lawyerFee: 1162, titleInsuranceCost: 0.0067, recordingFees: 266, creditReportFee: 60, floodDeterminationFee: 33
    },
    'Sullivan County': {
      inspectionCost: 610, appraisalCost: 732, surveyFee: 708, pestInspectionCost: 195,
      lawyerFee: 1172, titleInsuranceCost: 0.0067, recordingFees: 268, creditReportFee: 60, floodDeterminationFee: 34
    },
    'Tioga County': {
      inspectionCost: 635, appraisalCost: 762, surveyFee: 737, pestInspectionCost: 203,
      lawyerFee: 1220, titleInsuranceCost: 0.0067, recordingFees: 279, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Tompkins County': {
      inspectionCost: 641, appraisalCost: 769, surveyFee: 743, pestInspectionCost: 205,
      lawyerFee: 1231, titleInsuranceCost: 0.0068, recordingFees: 282, creditReportFee: 63, floodDeterminationFee: 35
    },
    'Ulster County': {
      inspectionCost: 610, appraisalCost: 732, surveyFee: 707, pestInspectionCost: 195,
      lawyerFee: 1171, titleInsuranceCost: 0.0067, recordingFees: 268, creditReportFee: 60, floodDeterminationFee: 34
    },
    'Warren County': {
      inspectionCost: 623, appraisalCost: 748, surveyFee: 723, pestInspectionCost: 199,
      lawyerFee: 1197, titleInsuranceCost: 0.0067, recordingFees: 274, creditReportFee: 61, floodDeterminationFee: 34
    },
    'Washington County': {
      inspectionCost: 627, appraisalCost: 753, surveyFee: 727, pestInspectionCost: 200,
      lawyerFee: 1204, titleInsuranceCost: 0.0067, recordingFees: 276, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Wayne County': {
      inspectionCost: 644, appraisalCost: 773, surveyFee: 747, pestInspectionCost: 206,
      lawyerFee: 1237, titleInsuranceCost: 0.0068, recordingFees: 283, creditReportFee: 63, floodDeterminationFee: 36
    },
    'Westchester County': {
      inspectionCost: 628, appraisalCost: 754, surveyFee: 729, pestInspectionCost: 201,
      lawyerFee: 1207, titleInsuranceCost: 0.0067, recordingFees: 276, creditReportFee: 62, floodDeterminationFee: 35
    },
    'Wyoming County': {
      inspectionCost: 596, appraisalCost: 715, surveyFee: 691, pestInspectionCost: 190,
      lawyerFee: 1144, titleInsuranceCost: 0.0067, recordingFees: 262, creditReportFee: 59, floodDeterminationFee: 33
    },
    'Yates County': {
      inspectionCost: 595, appraisalCost: 714, surveyFee: 690, pestInspectionCost: 190,
      lawyerFee: 1142, titleInsuranceCost: 0.0067, recordingFees: 261, creditReportFee: 59, floodDeterminationFee: 33
    },
    'Default': {
      inspectionCost: 625, appraisalCost: 750, surveyFee: 725, pestInspectionCost: 200,
      lawyerFee: 1200, titleInsuranceCost: 0.007, recordingFees: 275, creditReportFee: 62, floodDeterminationFee: 35
    },
  },
  // OHIO
  'OH': {
    'Adams County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Allen County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Ashland County': {
      inspectionCost: 364, appraisalCost: 452, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 608, titleInsuranceCost: 0.0053, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Ashtabula County': {
      inspectionCost: 388, appraisalCost: 482, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Athens County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 352, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Auglaize County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 138,
      lawyerFee: 616, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Belmont County': {
      inspectionCost: 377, appraisalCost: 467, surveyFee: 367, pestInspectionCost: 140,
      lawyerFee: 628, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Brown County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Butler County': {
      inspectionCost: 369, appraisalCost: 457, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Carroll County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 602, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Champaign County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Clark County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Clermont County': {
      inspectionCost: 370, appraisalCost: 458, surveyFee: 360, pestInspectionCost: 138,
      lawyerFee: 616, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Clinton County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Columbiana County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 372, pestInspectionCost: 142,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Coshocton County': {
      inspectionCost: 362, appraisalCost: 449, surveyFee: 352, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Crawford County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Cuyahoga County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Darke County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Defiance County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Delaware County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Erie County': {
      inspectionCost: 373, appraisalCost: 463, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 622, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Fairfield County': {
      inspectionCost: 383, appraisalCost: 475, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Fayette County': {
      inspectionCost: 366, appraisalCost: 453, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Franklin County': {
      inspectionCost: 366, appraisalCost: 453, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Fulton County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Gallia County': {
      inspectionCost: 385, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Geauga County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Greene County': {
      inspectionCost: 365, appraisalCost: 452, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 608, titleInsuranceCost: 0.0053, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Guernsey County': {
      inspectionCost: 388, appraisalCost: 482, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Hamilton County': {
      inspectionCost: 356, appraisalCost: 442, surveyFee: 347, pestInspectionCost: 133,
      lawyerFee: 594, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Hancock County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Hardin County': {
      inspectionCost: 372, appraisalCost: 461, surveyFee: 362, pestInspectionCost: 138,
      lawyerFee: 620, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Harrison County': {
      inspectionCost: 362, appraisalCost: 449, surveyFee: 352, pestInspectionCost: 135,
      lawyerFee: 604, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Henry County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Highland County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 372, pestInspectionCost: 142,
      lawyerFee: 637, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Hocking County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Holmes County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Huron County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 619, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Jackson County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Jefferson County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Knox County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lake County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Lawrence County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Licking County': {
      inspectionCost: 365, appraisalCost: 453, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 609, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Logan County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Lorain County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Lucas County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Madison County': {
      inspectionCost: 386, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Mahoning County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 611, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Marion County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 631, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Medina County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Meigs County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 634, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Mercer County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Miami County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Monroe County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Montgomery County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Morgan County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Morrow County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 138,
      lawyerFee: 616, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Muskingum County': {
      inspectionCost: 382, appraisalCost: 474, surveyFee: 372, pestInspectionCost: 142,
      lawyerFee: 638, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Noble County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 381, pestInspectionCost: 146,
      lawyerFee: 653, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Ottawa County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 373, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Paulding County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Perry County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Pickaway County': {
      inspectionCost: 372, appraisalCost: 461, surveyFee: 362, pestInspectionCost: 138,
      lawyerFee: 620, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Pike County': {
      inspectionCost: 363, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Portage County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Preble County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Putnam County': {
      inspectionCost: 382, appraisalCost: 473, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Richland County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Ross County': {
      inspectionCost: 372, appraisalCost: 462, surveyFee: 362, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sandusky County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Scioto County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Seneca County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Shelby County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 381, pestInspectionCost: 146,
      lawyerFee: 653, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Stark County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Summit County': {
      inspectionCost: 376, appraisalCost: 467, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 628, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Trumbull County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 624, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Tuscarawas County': {
      inspectionCost: 371, appraisalCost: 460, surveyFee: 361, pestInspectionCost: 138,
      lawyerFee: 619, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Union County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Van Wert County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Vinton County': {
      inspectionCost: 393, appraisalCost: 487, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Warren County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Washington County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Wayne County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Williams County': {
      inspectionCost: 367, appraisalCost: 456, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Wood County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Wyandot County': {
      inspectionCost: 365, appraisalCost: 453, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 609, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Default': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0055, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // OKLAHOMA
  'OK': {
    'Adair County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 311, pestInspectionCost: 111,
      lawyerFee: 486, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Alfalfa County': {
      inspectionCost: 332, appraisalCost: 413, surveyFee: 322, pestInspectionCost: 115,
      lawyerFee: 504, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Atoka County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Beaver County': {
      inspectionCost: 336, appraisalCost: 418, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Beckham County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Blaine County': {
      inspectionCost: 328, appraisalCost: 407, surveyFee: 318, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Bryan County': {
      inspectionCost: 332, appraisalCost: 413, surveyFee: 322, pestInspectionCost: 116,
      lawyerFee: 504, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Caddo County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Canadian County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Carter County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Cherokee County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 488, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Choctaw County': {
      inspectionCost: 319, appraisalCost: 397, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Cimarron County': {
      inspectionCost: 340, appraisalCost: 423, surveyFee: 330, pestInspectionCost: 118,
      lawyerFee: 516, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Cleveland County': {
      inspectionCost: 336, appraisalCost: 418, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Coal County': {
      inspectionCost: 326, appraisalCost: 405, surveyFee: 316, pestInspectionCost: 113,
      lawyerFee: 494, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Comanche County': {
      inspectionCost: 340, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Cotton County': {
      inspectionCost: 342, appraisalCost: 425, surveyFee: 332, pestInspectionCost: 119,
      lawyerFee: 519, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Craig County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Creek County': {
      inspectionCost: 325, appraisalCost: 404, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 493, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Custer County': {
      inspectionCost: 334, appraisalCost: 416, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Delaware County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Dewey County': {
      inspectionCost: 340, appraisalCost: 423, surveyFee: 330, pestInspectionCost: 118,
      lawyerFee: 516, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Ellis County': {
      inspectionCost: 316, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 479, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Garfield County': {
      inspectionCost: 338, appraisalCost: 420, surveyFee: 328, pestInspectionCost: 117,
      lawyerFee: 513, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Garvin County': {
      inspectionCost: 341, appraisalCost: 424, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 518, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Grady County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Grant County': {
      inspectionCost: 322, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Greer County': {
      inspectionCost: 325, appraisalCost: 403, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Harmon County': {
      inspectionCost: 341, appraisalCost: 424, surveyFee: 331, pestInspectionCost: 119,
      lawyerFee: 517, titleInsuranceCost: 0.0048, recordingFees: 124, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Harper County': {
      inspectionCost: 345, appraisalCost: 429, surveyFee: 335, pestInspectionCost: 120,
      lawyerFee: 524, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Haskell County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 511, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Hughes County': {
      inspectionCost: 330, appraisalCost: 411, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 501, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Jackson County': {
      inspectionCost: 328, appraisalCost: 407, surveyFee: 318, pestInspectionCost: 114,
      lawyerFee: 497, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Jefferson County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Johnston County': {
      inspectionCost: 345, appraisalCost: 429, surveyFee: 335, pestInspectionCost: 120,
      lawyerFee: 523, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Kay County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Kingfisher County': {
      inspectionCost: 336, appraisalCost: 418, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 510, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Kiowa County': {
      inspectionCost: 320, appraisalCost: 398, surveyFee: 310, pestInspectionCost: 111,
      lawyerFee: 485, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Latimer County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Le Flore County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Lincoln County': {
      inspectionCost: 334, appraisalCost: 415, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Logan County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 490, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Love County': {
      inspectionCost: 340, appraisalCost: 422, surveyFee: 329, pestInspectionCost: 118,
      lawyerFee: 515, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Major County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Marshall County': {
      inspectionCost: 323, appraisalCost: 401, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 489, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Mayes County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 117, creditReportFee: 37, floodDeterminationFee: 17
    },
    'McClain County': {
      inspectionCost: 324, appraisalCost: 403, surveyFee: 314, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'McCurtain County': {
      inspectionCost: 319, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 484, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 36, floodDeterminationFee: 17
    },
    'McIntosh County': {
      inspectionCost: 338, appraisalCost: 420, surveyFee: 328, pestInspectionCost: 117,
      lawyerFee: 512, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Murray County': {
      inspectionCost: 327, appraisalCost: 406, surveyFee: 317, pestInspectionCost: 113,
      lawyerFee: 495, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Muskogee County': {
      inspectionCost: 314, appraisalCost: 390, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 476, titleInsuranceCost: 0.0048, recordingFees: 114, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Noble County': {
      inspectionCost: 345, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 523, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Nowata County': {
      inspectionCost: 331, appraisalCost: 412, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 503, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Okfuskee County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Oklahoma County': {
      inspectionCost: 335, appraisalCost: 417, surveyFee: 325, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Okmulgee County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Osage County': {
      inspectionCost: 329, appraisalCost: 409, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 499, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Ottawa County': {
      inspectionCost: 337, appraisalCost: 419, surveyFee: 327, pestInspectionCost: 117,
      lawyerFee: 512, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Pawnee County': {
      inspectionCost: 334, appraisalCost: 415, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 506, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Payne County': {
      inspectionCost: 340, appraisalCost: 423, surveyFee: 330, pestInspectionCost: 118,
      lawyerFee: 516, titleInsuranceCost: 0.0048, recordingFees: 123, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Pittsburg County': {
      inspectionCost: 332, appraisalCost: 413, surveyFee: 322, pestInspectionCost: 115,
      lawyerFee: 504, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Pontotoc County': {
      inspectionCost: 336, appraisalCost: 417, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Pottawatomie County': {
      inspectionCost: 336, appraisalCost: 417, surveyFee: 326, pestInspectionCost: 117,
      lawyerFee: 509, titleInsuranceCost: 0.0048, recordingFees: 122, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Pushmataha County': {
      inspectionCost: 333, appraisalCost: 414, surveyFee: 323, pestInspectionCost: 116,
      lawyerFee: 505, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Roger Mills County': {
      inspectionCost: 334, appraisalCost: 416, surveyFee: 324, pestInspectionCost: 116,
      lawyerFee: 507, titleInsuranceCost: 0.0048, recordingFees: 121, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Rogers County': {
      inspectionCost: 325, appraisalCost: 404, surveyFee: 315, pestInspectionCost: 113,
      lawyerFee: 493, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Seminole County': {
      inspectionCost: 327, appraisalCost: 406, surveyFee: 317, pestInspectionCost: 114,
      lawyerFee: 496, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Sequoyah County': {
      inspectionCost: 321, appraisalCost: 399, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 487, titleInsuranceCost: 0.0048, recordingFees: 116, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Stephens County': {
      inspectionCost: 318, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 110,
      lawyerFee: 482, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Texas County': {
      inspectionCost: 344, appraisalCost: 428, surveyFee: 334, pestInspectionCost: 120,
      lawyerFee: 522, titleInsuranceCost: 0.0048, recordingFees: 125, creditReportFee: 39, floodDeterminationFee: 18
    },
    'Tillman County': {
      inspectionCost: 318, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 483, titleInsuranceCost: 0.0048, recordingFees: 115, creditReportFee: 36, floodDeterminationFee: 17
    },
    'Tulsa County': {
      inspectionCost: 329, appraisalCost: 408, surveyFee: 319, pestInspectionCost: 114,
      lawyerFee: 498, titleInsuranceCost: 0.0048, recordingFees: 119, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Wagoner County': {
      inspectionCost: 330, appraisalCost: 411, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 501, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Washington County': {
      inspectionCost: 331, appraisalCost: 411, surveyFee: 321, pestInspectionCost: 115,
      lawyerFee: 502, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Washita County': {
      inspectionCost: 324, appraisalCost: 403, surveyFee: 314, pestInspectionCost: 113,
      lawyerFee: 492, titleInsuranceCost: 0.0048, recordingFees: 118, creditReportFee: 37, floodDeterminationFee: 17
    },
    'Woods County': {
      inspectionCost: 332, appraisalCost: 413, surveyFee: 322, pestInspectionCost: 115,
      lawyerFee: 504, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Woodward County': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.0048, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
    'Default': {
      inspectionCost: 330, appraisalCost: 410, surveyFee: 320, pestInspectionCost: 115,
      lawyerFee: 500, titleInsuranceCost: 0.005, recordingFees: 120, creditReportFee: 38, floodDeterminationFee: 18
    },
  },
  // OREGON
  'OR': {
    'Baker County': {
      inspectionCost: 454, appraisalCost: 565, surveyFee: 514, pestInspectionCost: 151,
      lawyerFee: 554, titleInsuranceCost: 0.0056, recordingFees: 191, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Benton County': {
      inspectionCost: 437, appraisalCost: 544, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 534, titleInsuranceCost: 0.0055, recordingFees: 184, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Clackamas County': {
      inspectionCost: 457, appraisalCost: 568, surveyFee: 518, pestInspectionCost: 152,
      lawyerFee: 558, titleInsuranceCost: 0.0056, recordingFees: 193, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Clatsop County': {
      inspectionCost: 427, appraisalCost: 532, surveyFee: 485, pestInspectionCost: 142,
      lawyerFee: 523, titleInsuranceCost: 0.0055, recordingFees: 180, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Columbia County': {
      inspectionCost: 465, appraisalCost: 579, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 569, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Coos County': {
      inspectionCost: 444, appraisalCost: 552, surveyFee: 503, pestInspectionCost: 148,
      lawyerFee: 542, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Crook County': {
      inspectionCost: 443, appraisalCost: 552, surveyFee: 502, pestInspectionCost: 147,
      lawyerFee: 542, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Curry County': {
      inspectionCost: 427, appraisalCost: 532, surveyFee: 485, pestInspectionCost: 142,
      lawyerFee: 523, titleInsuranceCost: 0.0055, recordingFees: 180, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Deschutes County': {
      inspectionCost: 450, appraisalCost: 561, surveyFee: 511, pestInspectionCost: 150,
      lawyerFee: 551, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Douglas County': {
      inspectionCost: 463, appraisalCost: 577, surveyFee: 525, pestInspectionCost: 154,
      lawyerFee: 567, titleInsuranceCost: 0.0056, recordingFees: 195, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Gilliam County': {
      inspectionCost: 429, appraisalCost: 534, surveyFee: 486, pestInspectionCost: 143,
      lawyerFee: 524, titleInsuranceCost: 0.0055, recordingFees: 181, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Grant County': {
      inspectionCost: 440, appraisalCost: 547, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 537, titleInsuranceCost: 0.0055, recordingFees: 185, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Harney County': {
      inspectionCost: 466, appraisalCost: 580, surveyFee: 528, pestInspectionCost: 155,
      lawyerFee: 570, titleInsuranceCost: 0.0056, recordingFees: 197, creditReportFee: 52, floodDeterminationFee: 29
    },
    'Hood River County': {
      inspectionCost: 471, appraisalCost: 586, surveyFee: 533, pestInspectionCost: 157,
      lawyerFee: 575, titleInsuranceCost: 0.0056, recordingFees: 198, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Jackson County': {
      inspectionCost: 447, appraisalCost: 557, surveyFee: 507, pestInspectionCost: 149,
      lawyerFee: 547, titleInsuranceCost: 0.0056, recordingFees: 189, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Jefferson County': {
      inspectionCost: 451, appraisalCost: 562, surveyFee: 512, pestInspectionCost: 150,
      lawyerFee: 552, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Josephine County': {
      inspectionCost: 443, appraisalCost: 552, surveyFee: 502, pestInspectionCost: 147,
      lawyerFee: 542, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Klamath County': {
      inspectionCost: 451, appraisalCost: 561, surveyFee: 511, pestInspectionCost: 150,
      lawyerFee: 551, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Lake County': {
      inspectionCost: 436, appraisalCost: 543, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 534, titleInsuranceCost: 0.0055, recordingFees: 184, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Lane County': {
      inspectionCost: 450, appraisalCost: 560, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 550, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Lincoln County': {
      inspectionCost: 456, appraisalCost: 567, surveyFee: 517, pestInspectionCost: 152,
      lawyerFee: 557, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Linn County': {
      inspectionCost: 455, appraisalCost: 567, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 557, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Malheur County': {
      inspectionCost: 443, appraisalCost: 552, surveyFee: 502, pestInspectionCost: 147,
      lawyerFee: 542, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Marion County': {
      inspectionCost: 454, appraisalCost: 566, surveyFee: 515, pestInspectionCost: 151,
      lawyerFee: 556, titleInsuranceCost: 0.0056, recordingFees: 192, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Morrow County': {
      inspectionCost: 443, appraisalCost: 552, surveyFee: 502, pestInspectionCost: 147,
      lawyerFee: 542, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Multnomah County': {
      inspectionCost: 448, appraisalCost: 557, surveyFee: 507, pestInspectionCost: 149,
      lawyerFee: 547, titleInsuranceCost: 0.0056, recordingFees: 189, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Polk County': {
      inspectionCost: 465, appraisalCost: 579, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 568, titleInsuranceCost: 0.0056, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Sherman County': {
      inspectionCost: 430, appraisalCost: 535, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 525, titleInsuranceCost: 0.0055, recordingFees: 181, creditReportFee: 48, floodDeterminationFee: 26
    },
    'Tillamook County': {
      inspectionCost: 441, appraisalCost: 549, surveyFee: 500, pestInspectionCost: 147,
      lawyerFee: 539, titleInsuranceCost: 0.0055, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Umatilla County': {
      inspectionCost: 439, appraisalCost: 547, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 537, titleInsuranceCost: 0.0055, recordingFees: 185, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Union County': {
      inspectionCost: 443, appraisalCost: 551, surveyFee: 502, pestInspectionCost: 147,
      lawyerFee: 541, titleInsuranceCost: 0.0056, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Wallowa County': {
      inspectionCost: 442, appraisalCost: 550, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 540, titleInsuranceCost: 0.0055, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Wasco County': {
      inspectionCost: 453, appraisalCost: 564, surveyFee: 514, pestInspectionCost: 151,
      lawyerFee: 554, titleInsuranceCost: 0.0056, recordingFees: 191, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Washington County': {
      inspectionCost: 451, appraisalCost: 562, surveyFee: 512, pestInspectionCost: 150,
      lawyerFee: 552, titleInsuranceCost: 0.0056, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
    'Wheeler County': {
      inspectionCost: 441, appraisalCost: 548, surveyFee: 499, pestInspectionCost: 147,
      lawyerFee: 539, titleInsuranceCost: 0.0055, recordingFees: 186, creditReportFee: 49, floodDeterminationFee: 27
    },
    'Yamhill County': {
      inspectionCost: 433, appraisalCost: 539, surveyFee: 491, pestInspectionCost: 144,
      lawyerFee: 529, titleInsuranceCost: 0.0055, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Default': {
      inspectionCost: 450, appraisalCost: 560, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 550, titleInsuranceCost: 0.0058, recordingFees: 190, creditReportFee: 51, floodDeterminationFee: 28
    },
  },
  // PENNSYLVANIA
  'PA': {
    'Adams County': {
      inspectionCost: 455, appraisalCost: 543, surveyFee: 439, pestInspectionCost: 155,
      lawyerFee: 776, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Allegheny County': {
      inspectionCost: 448, appraisalCost: 534, surveyFee: 433, pestInspectionCost: 152,
      lawyerFee: 764, titleInsuranceCost: 0.0061, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Armstrong County': {
      inspectionCost: 445, appraisalCost: 531, surveyFee: 430, pestInspectionCost: 151,
      lawyerFee: 759, titleInsuranceCost: 0.0061, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Beaver County': {
      inspectionCost: 449, appraisalCost: 536, surveyFee: 433, pestInspectionCost: 153,
      lawyerFee: 765, titleInsuranceCost: 0.0061, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Bedford County': {
      inspectionCost: 448, appraisalCost: 535, surveyFee: 433, pestInspectionCost: 153,
      lawyerFee: 765, titleInsuranceCost: 0.0061, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Berks County': {
      inspectionCost: 447, appraisalCost: 533, surveyFee: 432, pestInspectionCost: 152,
      lawyerFee: 762, titleInsuranceCost: 0.0061, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Blair County': {
      inspectionCost: 459, appraisalCost: 548, surveyFee: 444, pestInspectionCost: 156,
      lawyerFee: 783, titleInsuranceCost: 0.0061, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Bradford County': {
      inspectionCost: 461, appraisalCost: 550, surveyFee: 445, pestInspectionCost: 157,
      lawyerFee: 786, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Bucks County': {
      inspectionCost: 442, appraisalCost: 527, surveyFee: 427, pestInspectionCost: 150,
      lawyerFee: 753, titleInsuranceCost: 0.0061, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Butler County': {
      inspectionCost: 432, appraisalCost: 516, surveyFee: 418, pestInspectionCost: 147,
      lawyerFee: 738, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Cambria County': {
      inspectionCost: 425, appraisalCost: 507, surveyFee: 410, pestInspectionCost: 145,
      lawyerFee: 725, titleInsuranceCost: 0.006, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Cameron County': {
      inspectionCost: 439, appraisalCost: 523, surveyFee: 424, pestInspectionCost: 149,
      lawyerFee: 748, titleInsuranceCost: 0.006, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Carbon County': {
      inspectionCost: 418, appraisalCost: 499, surveyFee: 404, pestInspectionCost: 142,
      lawyerFee: 713, titleInsuranceCost: 0.006, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Centre County': {
      inspectionCost: 449, appraisalCost: 536, surveyFee: 434, pestInspectionCost: 153,
      lawyerFee: 766, titleInsuranceCost: 0.0061, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Chester County': {
      inspectionCost: 433, appraisalCost: 517, surveyFee: 418, pestInspectionCost: 147,
      lawyerFee: 738, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Clarion County': {
      inspectionCost: 447, appraisalCost: 533, surveyFee: 431, pestInspectionCost: 152,
      lawyerFee: 762, titleInsuranceCost: 0.0061, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Clearfield County': {
      inspectionCost: 420, appraisalCost: 501, surveyFee: 406, pestInspectionCost: 143,
      lawyerFee: 717, titleInsuranceCost: 0.006, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Clinton County': {
      inspectionCost: 461, appraisalCost: 550, surveyFee: 445, pestInspectionCost: 157,
      lawyerFee: 786, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Columbia County': {
      inspectionCost: 455, appraisalCost: 543, surveyFee: 439, pestInspectionCost: 155,
      lawyerFee: 776, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Crawford County': {
      inspectionCost: 458, appraisalCost: 547, surveyFee: 442, pestInspectionCost: 156,
      lawyerFee: 781, titleInsuranceCost: 0.0061, recordingFees: 171, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Cumberland County': {
      inspectionCost: 451, appraisalCost: 538, surveyFee: 436, pestInspectionCost: 153,
      lawyerFee: 769, titleInsuranceCost: 0.0061, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Dauphin County': {
      inspectionCost: 424, appraisalCost: 506, surveyFee: 410, pestInspectionCost: 144,
      lawyerFee: 723, titleInsuranceCost: 0.006, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Delaware County': {
      inspectionCost: 449, appraisalCost: 536, surveyFee: 434, pestInspectionCost: 153,
      lawyerFee: 766, titleInsuranceCost: 0.0061, recordingFees: 168, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Elk County': {
      inspectionCost: 432, appraisalCost: 516, surveyFee: 418, pestInspectionCost: 147,
      lawyerFee: 738, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Erie County': {
      inspectionCost: 438, appraisalCost: 522, surveyFee: 423, pestInspectionCost: 149,
      lawyerFee: 747, titleInsuranceCost: 0.006, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Fayette County': {
      inspectionCost: 429, appraisalCost: 512, surveyFee: 414, pestInspectionCost: 146,
      lawyerFee: 732, titleInsuranceCost: 0.006, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Forest County': {
      inspectionCost: 422, appraisalCost: 504, surveyFee: 408, pestInspectionCost: 144,
      lawyerFee: 720, titleInsuranceCost: 0.006, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Franklin County': {
      inspectionCost: 429, appraisalCost: 512, surveyFee: 414, pestInspectionCost: 146,
      lawyerFee: 732, titleInsuranceCost: 0.006, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Fulton County': {
      inspectionCost: 454, appraisalCost: 542, surveyFee: 439, pestInspectionCost: 154,
      lawyerFee: 774, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Greene County': {
      inspectionCost: 428, appraisalCost: 511, surveyFee: 413, pestInspectionCost: 146,
      lawyerFee: 730, titleInsuranceCost: 0.006, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Huntingdon County': {
      inspectionCost: 428, appraisalCost: 511, surveyFee: 413, pestInspectionCost: 146,
      lawyerFee: 730, titleInsuranceCost: 0.006, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Indiana County': {
      inspectionCost: 453, appraisalCost: 541, surveyFee: 438, pestInspectionCost: 154,
      lawyerFee: 773, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Jefferson County': {
      inspectionCost: 441, appraisalCost: 527, surveyFee: 426, pestInspectionCost: 150,
      lawyerFee: 753, titleInsuranceCost: 0.0061, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Juniata County': {
      inspectionCost: 454, appraisalCost: 541, surveyFee: 438, pestInspectionCost: 154,
      lawyerFee: 774, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Lackawanna County': {
      inspectionCost: 428, appraisalCost: 510, surveyFee: 413, pestInspectionCost: 145,
      lawyerFee: 729, titleInsuranceCost: 0.006, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Lancaster County': {
      inspectionCost: 434, appraisalCost: 518, surveyFee: 419, pestInspectionCost: 148,
      lawyerFee: 741, titleInsuranceCost: 0.006, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Lawrence County': {
      inspectionCost: 447, appraisalCost: 533, surveyFee: 432, pestInspectionCost: 152,
      lawyerFee: 762, titleInsuranceCost: 0.0061, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Lebanon County': {
      inspectionCost: 423, appraisalCost: 505, surveyFee: 409, pestInspectionCost: 144,
      lawyerFee: 722, titleInsuranceCost: 0.006, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Lehigh County': {
      inspectionCost: 420, appraisalCost: 501, surveyFee: 406, pestInspectionCost: 143,
      lawyerFee: 717, titleInsuranceCost: 0.006, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Luzerne County': {
      inspectionCost: 448, appraisalCost: 534, surveyFee: 433, pestInspectionCost: 152,
      lawyerFee: 764, titleInsuranceCost: 0.0061, recordingFees: 168, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Lycoming County': {
      inspectionCost: 420, appraisalCost: 501, surveyFee: 405, pestInspectionCost: 143,
      lawyerFee: 716, titleInsuranceCost: 0.006, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'McKean County': {
      inspectionCost: 432, appraisalCost: 516, surveyFee: 418, pestInspectionCost: 147,
      lawyerFee: 738, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Mercer County': {
      inspectionCost: 447, appraisalCost: 533, surveyFee: 431, pestInspectionCost: 152,
      lawyerFee: 762, titleInsuranceCost: 0.0061, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Mifflin County': {
      inspectionCost: 452, appraisalCost: 540, surveyFee: 437, pestInspectionCost: 154,
      lawyerFee: 771, titleInsuranceCost: 0.0061, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Monroe County': {
      inspectionCost: 440, appraisalCost: 526, surveyFee: 425, pestInspectionCost: 150,
      lawyerFee: 751, titleInsuranceCost: 0.0061, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Montgomery County': {
      inspectionCost: 421, appraisalCost: 502, surveyFee: 406, pestInspectionCost: 143,
      lawyerFee: 717, titleInsuranceCost: 0.006, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Montour County': {
      inspectionCost: 436, appraisalCost: 520, surveyFee: 421, pestInspectionCost: 148,
      lawyerFee: 743, titleInsuranceCost: 0.006, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Northampton County': {
      inspectionCost: 432, appraisalCost: 516, surveyFee: 418, pestInspectionCost: 147,
      lawyerFee: 738, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Northumberland County': {
      inspectionCost: 458, appraisalCost: 547, surveyFee: 443, pestInspectionCost: 156,
      lawyerFee: 782, titleInsuranceCost: 0.0061, recordingFees: 172, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Perry County': {
      inspectionCost: 427, appraisalCost: 510, surveyFee: 413, pestInspectionCost: 145,
      lawyerFee: 729, titleInsuranceCost: 0.006, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Philadelphia County': {
      inspectionCost: 422, appraisalCost: 504, surveyFee: 408, pestInspectionCost: 144,
      lawyerFee: 720, titleInsuranceCost: 0.006, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Pike County': {
      inspectionCost: 426, appraisalCost: 509, surveyFee: 412, pestInspectionCost: 145,
      lawyerFee: 727, titleInsuranceCost: 0.006, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Potter County': {
      inspectionCost: 450, appraisalCost: 538, surveyFee: 435, pestInspectionCost: 153,
      lawyerFee: 768, titleInsuranceCost: 0.0061, recordingFees: 169, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Schuylkill County': {
      inspectionCost: 457, appraisalCost: 545, surveyFee: 441, pestInspectionCost: 155,
      lawyerFee: 779, titleInsuranceCost: 0.0061, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Snyder County': {
      inspectionCost: 435, appraisalCost: 519, surveyFee: 420, pestInspectionCost: 148,
      lawyerFee: 742, titleInsuranceCost: 0.006, recordingFees: 163, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Somerset County': {
      inspectionCost: 421, appraisalCost: 502, surveyFee: 406, pestInspectionCost: 143,
      lawyerFee: 717, titleInsuranceCost: 0.006, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Sullivan County': {
      inspectionCost: 429, appraisalCost: 512, surveyFee: 415, pestInspectionCost: 146,
      lawyerFee: 732, titleInsuranceCost: 0.006, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Susquehanna County': {
      inspectionCost: 454, appraisalCost: 541, surveyFee: 438, pestInspectionCost: 154,
      lawyerFee: 774, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Tioga County': {
      inspectionCost: 447, appraisalCost: 533, surveyFee: 432, pestInspectionCost: 152,
      lawyerFee: 762, titleInsuranceCost: 0.0061, recordingFees: 167, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Union County': {
      inspectionCost: 433, appraisalCost: 517, surveyFee: 418, pestInspectionCost: 147,
      lawyerFee: 738, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Venango County': {
      inspectionCost: 443, appraisalCost: 529, surveyFee: 428, pestInspectionCost: 151,
      lawyerFee: 756, titleInsuranceCost: 0.0061, recordingFees: 166, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Warren County': {
      inspectionCost: 439, appraisalCost: 523, surveyFee: 424, pestInspectionCost: 149,
      lawyerFee: 748, titleInsuranceCost: 0.006, recordingFees: 164, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Washington County': {
      inspectionCost: 441, appraisalCost: 527, surveyFee: 426, pestInspectionCost: 150,
      lawyerFee: 753, titleInsuranceCost: 0.0061, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Wayne County': {
      inspectionCost: 453, appraisalCost: 541, surveyFee: 438, pestInspectionCost: 154,
      lawyerFee: 773, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Westmoreland County': {
      inspectionCost: 454, appraisalCost: 541, surveyFee: 438, pestInspectionCost: 154,
      lawyerFee: 774, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Wyoming County': {
      inspectionCost: 419, appraisalCost: 500, surveyFee: 405, pestInspectionCost: 143,
      lawyerFee: 715, titleInsuranceCost: 0.006, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'York County': {
      inspectionCost: 456, appraisalCost: 544, surveyFee: 440, pestInspectionCost: 155,
      lawyerFee: 777, titleInsuranceCost: 0.0061, recordingFees: 171, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Default': {
      inspectionCost: 440, appraisalCost: 525, surveyFee: 425, pestInspectionCost: 150,
      lawyerFee: 750, titleInsuranceCost: 0.0063, recordingFees: 165, creditReportFee: 49, floodDeterminationFee: 26
    },
  },
  // RHODE ISLAND
  'RI': {
    'Bristol County': {
      inspectionCost: 488, appraisalCost: 581, surveyFee: 478, pestInspectionCost: 185,
      lawyerFee: 951, titleInsuranceCost: 0.0063, recordingFees: 180, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Kent County': {
      inspectionCost: 469, appraisalCost: 558, surveyFee: 459, pestInspectionCost: 178,
      lawyerFee: 914, titleInsuranceCost: 0.0062, recordingFees: 173, creditReportFee: 45, floodDeterminationFee: 24
    },
    'Newport County': {
      inspectionCost: 458, appraisalCost: 545, surveyFee: 449, pestInspectionCost: 173,
      lawyerFee: 893, titleInsuranceCost: 0.0062, recordingFees: 169, creditReportFee: 44, floodDeterminationFee: 24
    },
    'Providence County': {
      inspectionCost: 466, appraisalCost: 554, surveyFee: 456, pestInspectionCost: 176,
      lawyerFee: 908, titleInsuranceCost: 0.0062, recordingFees: 171, creditReportFee: 45, floodDeterminationFee: 24
    },
    'Washington County': {
      inspectionCost: 476, appraisalCost: 567, surveyFee: 466, pestInspectionCost: 180,
      lawyerFee: 928, titleInsuranceCost: 0.0062, recordingFees: 175, creditReportFee: 46, floodDeterminationFee: 25
    },
    'Default': {
      inspectionCost: 475, appraisalCost: 565, surveyFee: 465, pestInspectionCost: 180,
      lawyerFee: 925, titleInsuranceCost: 0.0065, recordingFees: 175, creditReportFee: 46, floodDeterminationFee: 25
    },
  },
  // SOUTH CAROLINA
  'SC': {
    'Abbeville County': {
      inspectionCost: 376, appraisalCost: 463, surveyFee: 366, pestInspectionCost: 130,
      lawyerFee: 579, titleInsuranceCost: 0.0055, recordingFees: 144, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Aiken County': {
      inspectionCost: 391, appraisalCost: 481, surveyFee: 381, pestInspectionCost: 135,
      lawyerFee: 602, titleInsuranceCost: 0.0056, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Allendale County': {
      inspectionCost: 395, appraisalCost: 487, surveyFee: 385, pestInspectionCost: 137,
      lawyerFee: 608, titleInsuranceCost: 0.0056, recordingFees: 152, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Anderson County': {
      inspectionCost: 397, appraisalCost: 488, surveyFee: 386, pestInspectionCost: 137,
      lawyerFee: 610, titleInsuranceCost: 0.0056, recordingFees: 152, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Bamberg County': {
      inspectionCost: 381, appraisalCost: 469, surveyFee: 372, pestInspectionCost: 132,
      lawyerFee: 587, titleInsuranceCost: 0.0055, recordingFees: 146, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Barnwell County': {
      inspectionCost: 403, appraisalCost: 496, surveyFee: 392, pestInspectionCost: 139,
      lawyerFee: 620, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 45, floodDeterminationFee: 22
    },
    'Beaufort County': {
      inspectionCost: 372, appraisalCost: 458, surveyFee: 362, pestInspectionCost: 128,
      lawyerFee: 573, titleInsuranceCost: 0.0055, recordingFees: 143, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Berkeley County': {
      inspectionCost: 372, appraisalCost: 458, surveyFee: 362, pestInspectionCost: 128,
      lawyerFee: 573, titleInsuranceCost: 0.0055, recordingFees: 143, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Calhoun County': {
      inspectionCost: 401, appraisalCost: 493, surveyFee: 391, pestInspectionCost: 138,
      lawyerFee: 617, titleInsuranceCost: 0.0056, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 22
    },
    'Charleston County': {
      inspectionCost: 380, appraisalCost: 468, surveyFee: 370, pestInspectionCost: 131,
      lawyerFee: 585, titleInsuranceCost: 0.0055, recordingFees: 146, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Cherokee County': {
      inspectionCost: 380, appraisalCost: 468, surveyFee: 370, pestInspectionCost: 131,
      lawyerFee: 585, titleInsuranceCost: 0.0055, recordingFees: 146, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Chester County': {
      inspectionCost: 384, appraisalCost: 472, surveyFee: 374, pestInspectionCost: 132,
      lawyerFee: 591, titleInsuranceCost: 0.0056, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Chesterfield County': {
      inspectionCost: 389, appraisalCost: 479, surveyFee: 379, pestInspectionCost: 134,
      lawyerFee: 599, titleInsuranceCost: 0.0056, recordingFees: 149, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Clarendon County': {
      inspectionCost: 387, appraisalCost: 477, surveyFee: 377, pestInspectionCost: 134,
      lawyerFee: 596, titleInsuranceCost: 0.0056, recordingFees: 149, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Colleton County': {
      inspectionCost: 391, appraisalCost: 482, surveyFee: 381, pestInspectionCost: 135,
      lawyerFee: 602, titleInsuranceCost: 0.0056, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Darlington County': {
      inspectionCost: 384, appraisalCost: 472, surveyFee: 374, pestInspectionCost: 132,
      lawyerFee: 591, titleInsuranceCost: 0.0056, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Dillon County': {
      inspectionCost: 389, appraisalCost: 479, surveyFee: 379, pestInspectionCost: 134,
      lawyerFee: 599, titleInsuranceCost: 0.0056, recordingFees: 149, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Dorchester County': {
      inspectionCost: 388, appraisalCost: 477, surveyFee: 378, pestInspectionCost: 134,
      lawyerFee: 597, titleInsuranceCost: 0.0056, recordingFees: 149, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Edgefield County': {
      inspectionCost: 380, appraisalCost: 468, surveyFee: 370, pestInspectionCost: 131,
      lawyerFee: 585, titleInsuranceCost: 0.0055, recordingFees: 146, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Fairfield County': {
      inspectionCost: 398, appraisalCost: 490, surveyFee: 388, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0056, recordingFees: 153, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Florence County': {
      inspectionCost: 384, appraisalCost: 473, surveyFee: 374, pestInspectionCost: 133,
      lawyerFee: 591, titleInsuranceCost: 0.0056, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Georgetown County': {
      inspectionCost: 383, appraisalCost: 472, surveyFee: 373, pestInspectionCost: 132,
      lawyerFee: 590, titleInsuranceCost: 0.0055, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Greenville County': {
      inspectionCost: 386, appraisalCost: 475, surveyFee: 376, pestInspectionCost: 133,
      lawyerFee: 594, titleInsuranceCost: 0.0056, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Greenwood County': {
      inspectionCost: 375, appraisalCost: 462, surveyFee: 365, pestInspectionCost: 130,
      lawyerFee: 577, titleInsuranceCost: 0.0055, recordingFees: 144, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Hampton County': {
      inspectionCost: 396, appraisalCost: 488, surveyFee: 386, pestInspectionCost: 137,
      lawyerFee: 610, titleInsuranceCost: 0.0056, recordingFees: 152, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Horry County': {
      inspectionCost: 373, appraisalCost: 459, surveyFee: 364, pestInspectionCost: 129,
      lawyerFee: 574, titleInsuranceCost: 0.0055, recordingFees: 143, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Jasper County': {
      inspectionCost: 400, appraisalCost: 492, surveyFee: 389, pestInspectionCost: 138,
      lawyerFee: 615, titleInsuranceCost: 0.0056, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 22
    },
    'Kershaw County': {
      inspectionCost: 406, appraisalCost: 500, surveyFee: 396, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0056, recordingFees: 156, creditReportFee: 45, floodDeterminationFee: 22
    },
    'Lancaster County': {
      inspectionCost: 385, appraisalCost: 474, surveyFee: 375, pestInspectionCost: 133,
      lawyerFee: 592, titleInsuranceCost: 0.0056, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Laurens County': {
      inspectionCost: 371, appraisalCost: 456, surveyFee: 361, pestInspectionCost: 128,
      lawyerFee: 571, titleInsuranceCost: 0.0055, recordingFees: 142, creditReportFee: 41, floodDeterminationFee: 20
    },
    'Lee County': {
      inspectionCost: 390, appraisalCost: 480, surveyFee: 380, pestInspectionCost: 135,
      lawyerFee: 600, titleInsuranceCost: 0.0056, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Lexington County': {
      inspectionCost: 407, appraisalCost: 502, surveyFee: 397, pestInspectionCost: 141,
      lawyerFee: 627, titleInsuranceCost: 0.0056, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 23
    },
    'Marion County': {
      inspectionCost: 394, appraisalCost: 485, surveyFee: 384, pestInspectionCost: 136,
      lawyerFee: 606, titleInsuranceCost: 0.0056, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Marlboro County': {
      inspectionCost: 374, appraisalCost: 460, surveyFee: 364, pestInspectionCost: 129,
      lawyerFee: 576, titleInsuranceCost: 0.0055, recordingFees: 144, creditReportFee: 42, floodDeterminationFee: 21
    },
    'McCormick County': {
      inspectionCost: 409, appraisalCost: 503, surveyFee: 398, pestInspectionCost: 141,
      lawyerFee: 629, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 23
    },
    'Newberry County': {
      inspectionCost: 393, appraisalCost: 484, surveyFee: 383, pestInspectionCost: 136,
      lawyerFee: 606, titleInsuranceCost: 0.0056, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Oconee County': {
      inspectionCost: 381, appraisalCost: 469, surveyFee: 372, pestInspectionCost: 132,
      lawyerFee: 587, titleInsuranceCost: 0.0055, recordingFees: 146, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Orangeburg County': {
      inspectionCost: 374, appraisalCost: 461, surveyFee: 365, pestInspectionCost: 129,
      lawyerFee: 576, titleInsuranceCost: 0.0055, recordingFees: 144, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Pickens County': {
      inspectionCost: 392, appraisalCost: 482, surveyFee: 382, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0056, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Richland County': {
      inspectionCost: 373, appraisalCost: 459, surveyFee: 363, pestInspectionCost: 129,
      lawyerFee: 574, titleInsuranceCost: 0.0055, recordingFees: 143, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Saluda County': {
      inspectionCost: 373, appraisalCost: 459, surveyFee: 364, pestInspectionCost: 129,
      lawyerFee: 574, titleInsuranceCost: 0.0055, recordingFees: 143, creditReportFee: 42, floodDeterminationFee: 21
    },
    'Spartanburg County': {
      inspectionCost: 392, appraisalCost: 482, surveyFee: 382, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0056, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Sumter County': {
      inspectionCost: 370, appraisalCost: 456, surveyFee: 361, pestInspectionCost: 128,
      lawyerFee: 570, titleInsuranceCost: 0.0055, recordingFees: 142, creditReportFee: 41, floodDeterminationFee: 20
    },
    'Union County': {
      inspectionCost: 384, appraisalCost: 472, surveyFee: 374, pestInspectionCost: 132,
      lawyerFee: 591, titleInsuranceCost: 0.0056, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 21
    },
    'Williamsburg County': {
      inspectionCost: 390, appraisalCost: 480, surveyFee: 380, pestInspectionCost: 135,
      lawyerFee: 600, titleInsuranceCost: 0.0056, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 22
    },
    'York County': {
      inspectionCost: 404, appraisalCost: 497, surveyFee: 394, pestInspectionCost: 139,
      lawyerFee: 622, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 45, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 390, appraisalCost: 480, surveyFee: 380, pestInspectionCost: 135,
      lawyerFee: 600, titleInsuranceCost: 0.0058, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 22
    },
  },
  // SOUTH DAKOTA
  'SD': {
    'Aurora County': {
      inspectionCost: 298, appraisalCost: 376, surveyFee: 293, pestInspectionCost: 105,
      lawyerFee: 440, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Beadle County': {
      inspectionCost: 308, appraisalCost: 390, surveyFee: 303, pestInspectionCost: 109,
      lawyerFee: 455, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Bennett County': {
      inspectionCost: 308, appraisalCost: 388, surveyFee: 303, pestInspectionCost: 109,
      lawyerFee: 454, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Bon Homme County': {
      inspectionCost: 308, appraisalCost: 389, surveyFee: 303, pestInspectionCost: 109,
      lawyerFee: 454, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Brookings County': {
      inspectionCost: 297, appraisalCost: 374, surveyFee: 292, pestInspectionCost: 105,
      lawyerFee: 438, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Brown County': {
      inspectionCost: 310, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 457, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Brule County': {
      inspectionCost: 291, appraisalCost: 368, surveyFee: 286, pestInspectionCost: 103,
      lawyerFee: 430, titleInsuranceCost: 0.0046, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Buffalo County': {
      inspectionCost: 292, appraisalCost: 369, surveyFee: 287, pestInspectionCost: 103,
      lawyerFee: 431, titleInsuranceCost: 0.0046, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Butte County': {
      inspectionCost: 311, appraisalCost: 393, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 459, titleInsuranceCost: 0.0046, recordingFees: 114, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Campbell County': {
      inspectionCost: 317, appraisalCost: 400, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 468, titleInsuranceCost: 0.0046, recordingFees: 116, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Charles Mix County': {
      inspectionCost: 318, appraisalCost: 402, surveyFee: 313, pestInspectionCost: 112,
      lawyerFee: 470, titleInsuranceCost: 0.0047, recordingFees: 117, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Clark County': {
      inspectionCost: 293, appraisalCost: 369, surveyFee: 288, pestInspectionCost: 103,
      lawyerFee: 432, titleInsuranceCost: 0.0046, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Clay County': {
      inspectionCost: 292, appraisalCost: 368, surveyFee: 287, pestInspectionCost: 103,
      lawyerFee: 431, titleInsuranceCost: 0.0046, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Codington County': {
      inspectionCost: 300, appraisalCost: 378, surveyFee: 295, pestInspectionCost: 106,
      lawyerFee: 442, titleInsuranceCost: 0.0046, recordingFees: 110, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Corson County': {
      inspectionCost: 305, appraisalCost: 385, surveyFee: 300, pestInspectionCost: 108,
      lawyerFee: 450, titleInsuranceCost: 0.0046, recordingFees: 112, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Custer County': {
      inspectionCost: 309, appraisalCost: 390, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 456, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Davison County': {
      inspectionCost: 314, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 463, titleInsuranceCost: 0.0046, recordingFees: 115, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Day County': {
      inspectionCost: 301, appraisalCost: 380, surveyFee: 296, pestInspectionCost: 106,
      lawyerFee: 444, titleInsuranceCost: 0.0046, recordingFees: 110, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Deuel County': {
      inspectionCost: 294, appraisalCost: 372, surveyFee: 290, pestInspectionCost: 104,
      lawyerFee: 435, titleInsuranceCost: 0.0046, recordingFees: 108, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Dewey County': {
      inspectionCost: 314, appraisalCost: 397, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 464, titleInsuranceCost: 0.0046, recordingFees: 115, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Douglas County': {
      inspectionCost: 314, appraisalCost: 396, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 463, titleInsuranceCost: 0.0046, recordingFees: 115, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Edmunds County': {
      inspectionCost: 315, appraisalCost: 397, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 464, titleInsuranceCost: 0.0046, recordingFees: 115, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Fall River County': {
      inspectionCost: 316, appraisalCost: 399, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 467, titleInsuranceCost: 0.0046, recordingFees: 116, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Faulk County': {
      inspectionCost: 294, appraisalCost: 371, surveyFee: 289, pestInspectionCost: 104,
      lawyerFee: 434, titleInsuranceCost: 0.0046, recordingFees: 108, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Grant County': {
      inspectionCost: 298, appraisalCost: 376, surveyFee: 293, pestInspectionCost: 105,
      lawyerFee: 440, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Gregory County': {
      inspectionCost: 298, appraisalCost: 376, surveyFee: 293, pestInspectionCost: 105,
      lawyerFee: 440, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Haakon County': {
      inspectionCost: 308, appraisalCost: 390, surveyFee: 303, pestInspectionCost: 109,
      lawyerFee: 455, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Hamlin County': {
      inspectionCost: 308, appraisalCost: 389, surveyFee: 303, pestInspectionCost: 109,
      lawyerFee: 454, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Hand County': {
      inspectionCost: 294, appraisalCost: 371, surveyFee: 289, pestInspectionCost: 104,
      lawyerFee: 433, titleInsuranceCost: 0.0046, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Hanson County': {
      inspectionCost: 303, appraisalCost: 383, surveyFee: 298, pestInspectionCost: 107,
      lawyerFee: 447, titleInsuranceCost: 0.0046, recordingFees: 111, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Harding County': {
      inspectionCost: 305, appraisalCost: 385, surveyFee: 300, pestInspectionCost: 108,
      lawyerFee: 450, titleInsuranceCost: 0.0046, recordingFees: 112, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Hughes County': {
      inspectionCost: 305, appraisalCost: 386, surveyFee: 300, pestInspectionCost: 108,
      lawyerFee: 451, titleInsuranceCost: 0.0046, recordingFees: 112, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Hutchinson County': {
      inspectionCost: 308, appraisalCost: 389, surveyFee: 303, pestInspectionCost: 109,
      lawyerFee: 455, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Hyde County': {
      inspectionCost: 305, appraisalCost: 385, surveyFee: 300, pestInspectionCost: 108,
      lawyerFee: 450, titleInsuranceCost: 0.0046, recordingFees: 112, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Jackson County': {
      inspectionCost: 303, appraisalCost: 383, surveyFee: 298, pestInspectionCost: 107,
      lawyerFee: 447, titleInsuranceCost: 0.0046, recordingFees: 111, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Jerauld County': {
      inspectionCost: 306, appraisalCost: 386, surveyFee: 301, pestInspectionCost: 108,
      lawyerFee: 452, titleInsuranceCost: 0.0046, recordingFees: 112, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Jones County': {
      inspectionCost: 311, appraisalCost: 392, surveyFee: 306, pestInspectionCost: 110,
      lawyerFee: 459, titleInsuranceCost: 0.0046, recordingFees: 114, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Kingsbury County': {
      inspectionCost: 308, appraisalCost: 389, surveyFee: 303, pestInspectionCost: 109,
      lawyerFee: 455, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Lake County': {
      inspectionCost: 296, appraisalCost: 373, surveyFee: 291, pestInspectionCost: 104,
      lawyerFee: 436, titleInsuranceCost: 0.0046, recordingFees: 108, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Lawrence County': {
      inspectionCost: 310, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 457, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Lincoln County': {
      inspectionCost: 309, appraisalCost: 390, surveyFee: 304, pestInspectionCost: 109,
      lawyerFee: 456, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Lyman County': {
      inspectionCost: 315, appraisalCost: 397, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 464, titleInsuranceCost: 0.0046, recordingFees: 115, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Marshall County': {
      inspectionCost: 298, appraisalCost: 376, surveyFee: 293, pestInspectionCost: 105,
      lawyerFee: 440, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'McCook County': {
      inspectionCost: 305, appraisalCost: 385, surveyFee: 300, pestInspectionCost: 108,
      lawyerFee: 450, titleInsuranceCost: 0.0046, recordingFees: 112, creditReportFee: 38, floodDeterminationFee: 16
    },
    'McPherson County': {
      inspectionCost: 317, appraisalCost: 401, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 468, titleInsuranceCost: 0.0046, recordingFees: 116, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Meade County': {
      inspectionCost: 304, appraisalCost: 384, surveyFee: 299, pestInspectionCost: 107,
      lawyerFee: 449, titleInsuranceCost: 0.0046, recordingFees: 111, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Mellette County': {
      inspectionCost: 298, appraisalCost: 376, surveyFee: 293, pestInspectionCost: 105,
      lawyerFee: 440, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Miner County': {
      inspectionCost: 316, appraisalCost: 400, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 467, titleInsuranceCost: 0.0046, recordingFees: 116, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Minnehaha County': {
      inspectionCost: 297, appraisalCost: 375, surveyFee: 292, pestInspectionCost: 105,
      lawyerFee: 439, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Moody County': {
      inspectionCost: 292, appraisalCost: 368, surveyFee: 287, pestInspectionCost: 103,
      lawyerFee: 431, titleInsuranceCost: 0.0046, recordingFees: 107, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Oglala Lakota County': {
      inspectionCost: 310, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 457, titleInsuranceCost: 0.0046, recordingFees: 113, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Pennington County': {
      inspectionCost: 297, appraisalCost: 374, surveyFee: 292, pestInspectionCost: 105,
      lawyerFee: 438, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Perkins County': {
      inspectionCost: 316, appraisalCost: 400, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 467, titleInsuranceCost: 0.0046, recordingFees: 116, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Potter County': {
      inspectionCost: 312, appraisalCost: 394, surveyFee: 307, pestInspectionCost: 110,
      lawyerFee: 461, titleInsuranceCost: 0.0046, recordingFees: 114, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Roberts County': {
      inspectionCost: 317, appraisalCost: 401, surveyFee: 312, pestInspectionCost: 112,
      lawyerFee: 468, titleInsuranceCost: 0.0046, recordingFees: 116, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Sanborn County': {
      inspectionCost: 313, appraisalCost: 395, surveyFee: 308, pestInspectionCost: 111,
      lawyerFee: 462, titleInsuranceCost: 0.0046, recordingFees: 115, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Spink County': {
      inspectionCost: 299, appraisalCost: 378, surveyFee: 294, pestInspectionCost: 106,
      lawyerFee: 441, titleInsuranceCost: 0.0046, recordingFees: 109, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Stanley County': {
      inspectionCost: 302, appraisalCost: 381, surveyFee: 297, pestInspectionCost: 107,
      lawyerFee: 446, titleInsuranceCost: 0.0046, recordingFees: 111, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Sully County': {
      inspectionCost: 306, appraisalCost: 386, surveyFee: 301, pestInspectionCost: 108,
      lawyerFee: 451, titleInsuranceCost: 0.0046, recordingFees: 112, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Todd County': {
      inspectionCost: 316, appraisalCost: 400, surveyFee: 311, pestInspectionCost: 112,
      lawyerFee: 467, titleInsuranceCost: 0.0046, recordingFees: 116, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Tripp County': {
      inspectionCost: 303, appraisalCost: 383, surveyFee: 298, pestInspectionCost: 107,
      lawyerFee: 447, titleInsuranceCost: 0.0046, recordingFees: 111, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Turner County': {
      inspectionCost: 290, appraisalCost: 366, surveyFee: 285, pestInspectionCost: 102,
      lawyerFee: 427, titleInsuranceCost: 0.0046, recordingFees: 106, creditReportFee: 36, floodDeterminationFee: 15
    },
    'Union County': {
      inspectionCost: 300, appraisalCost: 379, surveyFee: 295, pestInspectionCost: 106,
      lawyerFee: 443, titleInsuranceCost: 0.0046, recordingFees: 110, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Walworth County': {
      inspectionCost: 314, appraisalCost: 397, surveyFee: 309, pestInspectionCost: 111,
      lawyerFee: 464, titleInsuranceCost: 0.0046, recordingFees: 115, creditReportFee: 39, floodDeterminationFee: 16
    },
    'Yankton County': {
      inspectionCost: 310, appraisalCost: 391, surveyFee: 305, pestInspectionCost: 109,
      lawyerFee: 458, titleInsuranceCost: 0.0046, recordingFees: 114, creditReportFee: 38, floodDeterminationFee: 16
    },
    'Ziebach County': {
      inspectionCost: 302, appraisalCost: 381, surveyFee: 297, pestInspectionCost: 107,
      lawyerFee: 446, titleInsuranceCost: 0.0046, recordingFees: 111, creditReportFee: 37, floodDeterminationFee: 15
    },
    'Default': {
      inspectionCost: 305, appraisalCost: 385, surveyFee: 300, pestInspectionCost: 108,
      lawyerFee: 450, titleInsuranceCost: 0.0048, recordingFees: 112, creditReportFee: 38, floodDeterminationFee: 16
    },
  },
  // TENNESSEE
  'TN': {
    'Anderson County': {
      inspectionCost: 397, appraisalCost: 498, surveyFee: 381, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Bedford County': {
      inspectionCost: 397, appraisalCost: 499, surveyFee: 382, pestInspectionCost: 142,
      lawyerFee: 637, titleInsuranceCost: 0.0056, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Benton County': {
      inspectionCost: 379, appraisalCost: 476, surveyFee: 364, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Bledsoe County': {
      inspectionCost: 375, appraisalCost: 472, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 602, titleInsuranceCost: 0.0055, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Blount County': {
      inspectionCost: 409, appraisalCost: 514, surveyFee: 393, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0056, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Bradley County': {
      inspectionCost: 377, appraisalCost: 474, surveyFee: 363, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Campbell County': {
      inspectionCost: 405, appraisalCost: 509, surveyFee: 390, pestInspectionCost: 145,
      lawyerFee: 650, titleInsuranceCost: 0.0056, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Cannon County': {
      inspectionCost: 397, appraisalCost: 499, surveyFee: 382, pestInspectionCost: 142,
      lawyerFee: 637, titleInsuranceCost: 0.0056, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Carroll County': {
      inspectionCost: 375, appraisalCost: 472, surveyFee: 361, pestInspectionCost: 134,
      lawyerFee: 602, titleInsuranceCost: 0.0055, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Carter County': {
      inspectionCost: 394, appraisalCost: 495, surveyFee: 379, pestInspectionCost: 141,
      lawyerFee: 632, titleInsuranceCost: 0.0056, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Cheatham County': {
      inspectionCost: 398, appraisalCost: 500, surveyFee: 383, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0056, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Chester County': {
      inspectionCost: 384, appraisalCost: 482, surveyFee: 369, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0056, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Claiborne County': {
      inspectionCost: 401, appraisalCost: 504, surveyFee: 385, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0056, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Clay County': {
      inspectionCost: 373, appraisalCost: 469, surveyFee: 359, pestInspectionCost: 134,
      lawyerFee: 598, titleInsuranceCost: 0.0055, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Cocke County': {
      inspectionCost: 386, appraisalCost: 485, surveyFee: 371, pestInspectionCost: 138,
      lawyerFee: 619, titleInsuranceCost: 0.0056, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Coffee County': {
      inspectionCost: 398, appraisalCost: 500, surveyFee: 383, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0056, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Crockett County': {
      inspectionCost: 377, appraisalCost: 474, surveyFee: 363, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Cumberland County': {
      inspectionCost: 400, appraisalCost: 502, surveyFee: 384, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0056, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Davidson County': {
      inspectionCost: 401, appraisalCost: 504, surveyFee: 386, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0056, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'DeKalb County': {
      inspectionCost: 386, appraisalCost: 486, surveyFee: 372, pestInspectionCost: 138,
      lawyerFee: 620, titleInsuranceCost: 0.0056, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Decatur County': {
      inspectionCost: 387, appraisalCost: 487, surveyFee: 372, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0056, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Dickson County': {
      inspectionCost: 403, appraisalCost: 507, surveyFee: 388, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0056, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Dyer County': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 375, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Fayette County': {
      inspectionCost: 380, appraisalCost: 478, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0055, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Fentress County': {
      inspectionCost: 381, appraisalCost: 479, surveyFee: 367, pestInspectionCost: 137,
      lawyerFee: 611, titleInsuranceCost: 0.0055, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Franklin County': {
      inspectionCost: 380, appraisalCost: 478, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0055, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Gibson County': {
      inspectionCost: 378, appraisalCost: 475, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Giles County': {
      inspectionCost: 395, appraisalCost: 496, surveyFee: 380, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Grainger County': {
      inspectionCost: 398, appraisalCost: 500, surveyFee: 382, pestInspectionCost: 142,
      lawyerFee: 638, titleInsuranceCost: 0.0056, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Greene County': {
      inspectionCost: 379, appraisalCost: 477, surveyFee: 365, pestInspectionCost: 136,
      lawyerFee: 608, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Grundy County': {
      inspectionCost: 372, appraisalCost: 467, surveyFee: 358, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0055, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Hamblen County': {
      inspectionCost: 385, appraisalCost: 484, surveyFee: 370, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0056, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Hamilton County': {
      inspectionCost: 370, appraisalCost: 465, surveyFee: 356, pestInspectionCost: 133,
      lawyerFee: 594, titleInsuranceCost: 0.0055, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Hancock County': {
      inspectionCost: 397, appraisalCost: 499, surveyFee: 382, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Hardeman County': {
      inspectionCost: 374, appraisalCost: 469, surveyFee: 359, pestInspectionCost: 134,
      lawyerFee: 599, titleInsuranceCost: 0.0055, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Hardin County': {
      inspectionCost: 386, appraisalCost: 486, surveyFee: 372, pestInspectionCost: 138,
      lawyerFee: 620, titleInsuranceCost: 0.0056, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Hawkins County': {
      inspectionCost: 381, appraisalCost: 478, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0055, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Haywood County': {
      inspectionCost: 373, appraisalCost: 469, surveyFee: 359, pestInspectionCost: 134,
      lawyerFee: 598, titleInsuranceCost: 0.0055, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Henderson County': {
      inspectionCost: 404, appraisalCost: 508, surveyFee: 389, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0056, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Henry County': {
      inspectionCost: 397, appraisalCost: 499, surveyFee: 382, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Hickman County': {
      inspectionCost: 393, appraisalCost: 493, surveyFee: 378, pestInspectionCost: 141,
      lawyerFee: 630, titleInsuranceCost: 0.0056, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Houston County': {
      inspectionCost: 407, appraisalCost: 512, surveyFee: 391, pestInspectionCost: 146,
      lawyerFee: 653, titleInsuranceCost: 0.0056, recordingFees: 161, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Humphreys County': {
      inspectionCost: 404, appraisalCost: 508, surveyFee: 389, pestInspectionCost: 145,
      lawyerFee: 648, titleInsuranceCost: 0.0056, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Jackson County': {
      inspectionCost: 388, appraisalCost: 487, surveyFee: 373, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0056, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Jefferson County': {
      inspectionCost: 391, appraisalCost: 491, surveyFee: 376, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Johnson County': {
      inspectionCost: 398, appraisalCost: 500, surveyFee: 383, pestInspectionCost: 143,
      lawyerFee: 638, titleInsuranceCost: 0.0056, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Knox County': {
      inspectionCost: 395, appraisalCost: 496, surveyFee: 380, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lake County': {
      inspectionCost: 378, appraisalCost: 475, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Lauderdale County': {
      inspectionCost: 387, appraisalCost: 487, surveyFee: 372, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0056, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Lawrence County': {
      inspectionCost: 396, appraisalCost: 498, surveyFee: 381, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lewis County': {
      inspectionCost: 379, appraisalCost: 476, surveyFee: 364, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Lincoln County': {
      inspectionCost: 395, appraisalCost: 496, surveyFee: 380, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Loudon County': {
      inspectionCost: 405, appraisalCost: 509, surveyFee: 389, pestInspectionCost: 145,
      lawyerFee: 649, titleInsuranceCost: 0.0056, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Macon County': {
      inspectionCost: 399, appraisalCost: 502, surveyFee: 384, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0056, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Madison County': {
      inspectionCost: 401, appraisalCost: 504, surveyFee: 386, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0056, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Marion County': {
      inspectionCost: 394, appraisalCost: 495, surveyFee: 379, pestInspectionCost: 141,
      lawyerFee: 631, titleInsuranceCost: 0.0056, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Marshall County': {
      inspectionCost: 381, appraisalCost: 479, surveyFee: 367, pestInspectionCost: 137,
      lawyerFee: 611, titleInsuranceCost: 0.0055, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Maury County': {
      inspectionCost: 400, appraisalCost: 502, surveyFee: 384, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0056, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'McMinn County': {
      inspectionCost: 370, appraisalCost: 465, surveyFee: 356, pestInspectionCost: 133,
      lawyerFee: 593, titleInsuranceCost: 0.0055, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'McNairy County': {
      inspectionCost: 386, appraisalCost: 485, surveyFee: 371, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0056, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Meigs County': {
      inspectionCost: 395, appraisalCost: 497, surveyFee: 380, pestInspectionCost: 142,
      lawyerFee: 634, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Monroe County': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 375, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Montgomery County': {
      inspectionCost: 373, appraisalCost: 468, surveyFee: 358, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0055, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Moore County': {
      inspectionCost: 378, appraisalCost: 475, surveyFee: 364, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Morgan County': {
      inspectionCost: 395, appraisalCost: 496, surveyFee: 380, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Obion County': {
      inspectionCost: 388, appraisalCost: 488, surveyFee: 373, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0056, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Overton County': {
      inspectionCost: 377, appraisalCost: 474, surveyFee: 363, pestInspectionCost: 135,
      lawyerFee: 605, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Perry County': {
      inspectionCost: 379, appraisalCost: 476, surveyFee: 364, pestInspectionCost: 136,
      lawyerFee: 607, titleInsuranceCost: 0.0055, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Pickett County': {
      inspectionCost: 397, appraisalCost: 499, surveyFee: 382, pestInspectionCost: 142,
      lawyerFee: 637, titleInsuranceCost: 0.0056, recordingFees: 158, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Polk County': {
      inspectionCost: 403, appraisalCost: 506, surveyFee: 387, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0056, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Putnam County': {
      inspectionCost: 397, appraisalCost: 499, surveyFee: 382, pestInspectionCost: 142,
      lawyerFee: 636, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Rhea County': {
      inspectionCost: 408, appraisalCost: 513, surveyFee: 393, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0056, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Roane County': {
      inspectionCost: 372, appraisalCost: 467, surveyFee: 358, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0055, recordingFees: 148, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Robertson County': {
      inspectionCost: 395, appraisalCost: 496, surveyFee: 379, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0056, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Rutherford County': {
      inspectionCost: 386, appraisalCost: 485, surveyFee: 371, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0056, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Scott County': {
      inspectionCost: 382, appraisalCost: 481, surveyFee: 368, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0055, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sequatchie County': {
      inspectionCost: 408, appraisalCost: 513, surveyFee: 393, pestInspectionCost: 146,
      lawyerFee: 655, titleInsuranceCost: 0.0056, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Sevier County': {
      inspectionCost: 371, appraisalCost: 466, surveyFee: 357, pestInspectionCost: 133,
      lawyerFee: 595, titleInsuranceCost: 0.0055, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Shelby County': {
      inspectionCost: 407, appraisalCost: 512, surveyFee: 392, pestInspectionCost: 146,
      lawyerFee: 653, titleInsuranceCost: 0.0056, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Smith County': {
      inspectionCost: 372, appraisalCost: 467, surveyFee: 357, pestInspectionCost: 133,
      lawyerFee: 596, titleInsuranceCost: 0.0055, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Stewart County': {
      inspectionCost: 400, appraisalCost: 502, surveyFee: 384, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0056, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Sullivan County': {
      inspectionCost: 381, appraisalCost: 478, surveyFee: 366, pestInspectionCost: 136,
      lawyerFee: 610, titleInsuranceCost: 0.0055, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Sumner County': {
      inspectionCost: 407, appraisalCost: 512, surveyFee: 392, pestInspectionCost: 146,
      lawyerFee: 653, titleInsuranceCost: 0.0056, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Tipton County': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 375, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Trousdale County': {
      inspectionCost: 405, appraisalCost: 510, surveyFee: 390, pestInspectionCost: 145,
      lawyerFee: 650, titleInsuranceCost: 0.0056, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Unicoi County': {
      inspectionCost: 400, appraisalCost: 503, surveyFee: 385, pestInspectionCost: 143,
      lawyerFee: 642, titleInsuranceCost: 0.0056, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Union County': {
      inspectionCost: 384, appraisalCost: 482, surveyFee: 369, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0056, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Van Buren County': {
      inspectionCost: 383, appraisalCost: 481, surveyFee: 368, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0055, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Warren County': {
      inspectionCost: 389, appraisalCost: 489, surveyFee: 374, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0056, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Washington County': {
      inspectionCost: 391, appraisalCost: 491, surveyFee: 376, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Wayne County': {
      inspectionCost: 402, appraisalCost: 505, surveyFee: 386, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0056, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Weakley County': {
      inspectionCost: 391, appraisalCost: 492, surveyFee: 376, pestInspectionCost: 140,
      lawyerFee: 628, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'White County': {
      inspectionCost: 406, appraisalCost: 511, surveyFee: 391, pestInspectionCost: 146,
      lawyerFee: 651, titleInsuranceCost: 0.0056, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Williamson County': {
      inspectionCost: 391, appraisalCost: 491, surveyFee: 376, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0056, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Wilson County': {
      inspectionCost: 393, appraisalCost: 493, surveyFee: 378, pestInspectionCost: 141,
      lawyerFee: 630, titleInsuranceCost: 0.0056, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Default': {
      inspectionCost: 390, appraisalCost: 490, surveyFee: 375, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0058, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // TEXAS
  'TX': {
    'Anderson County': {
      inspectionCost: 427, appraisalCost: 534, surveyFee: 519, pestInspectionCost: 152,
      lawyerFee: 432, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Andrews County': {
      inspectionCost: 412, appraisalCost: 516, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 417, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Angelina County': {
      inspectionCost: 433, appraisalCost: 542, surveyFee: 526, pestInspectionCost: 154,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Aransas County': {
      inspectionCost: 430, appraisalCost: 537, surveyFee: 522, pestInspectionCost: 153,
      lawyerFee: 435, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Archer County': {
      inspectionCost: 419, appraisalCost: 524, surveyFee: 509, pestInspectionCost: 149,
      lawyerFee: 424, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Armstrong County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Atascosa County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Austin County': {
      inspectionCost: 431, appraisalCost: 539, surveyFee: 523, pestInspectionCost: 154,
      lawyerFee: 436, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Bailey County': {
      inspectionCost: 417, appraisalCost: 522, surveyFee: 507, pestInspectionCost: 149,
      lawyerFee: 422, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Bandera County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Bastrop County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Baylor County': {
      inspectionCost: 437, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Bee County': {
      inspectionCost: 422, appraisalCost: 528, surveyFee: 513, pestInspectionCost: 151,
      lawyerFee: 427, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Bell County': {
      inspectionCost: 403, appraisalCost: 504, surveyFee: 489, pestInspectionCost: 144,
      lawyerFee: 408, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Bexar County': {
      inspectionCost: 422, appraisalCost: 528, surveyFee: 513, pestInspectionCost: 151,
      lawyerFee: 427, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Blanco County': {
      inspectionCost: 410, appraisalCost: 513, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 415, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Borden County': {
      inspectionCost: 410, appraisalCost: 512, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 415, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Bosque County': {
      inspectionCost: 423, appraisalCost: 529, surveyFee: 514, pestInspectionCost: 151,
      lawyerFee: 428, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Bowie County': {
      inspectionCost: 437, appraisalCost: 546, surveyFee: 530, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Brazoria County': {
      inspectionCost: 402, appraisalCost: 503, surveyFee: 489, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Brazos County': {
      inspectionCost: 428, appraisalCost: 535, surveyFee: 520, pestInspectionCost: 153,
      lawyerFee: 433, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Brewster County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Briscoe County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Brooks County': {
      inspectionCost: 403, appraisalCost: 504, surveyFee: 490, pestInspectionCost: 144,
      lawyerFee: 408, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Brown County': {
      inspectionCost: 427, appraisalCost: 533, surveyFee: 518, pestInspectionCost: 152,
      lawyerFee: 432, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Burleson County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 486, pestInspectionCost: 143,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Burnet County': {
      inspectionCost: 440, appraisalCost: 550, surveyFee: 534, pestInspectionCost: 157,
      lawyerFee: 445, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Caldwell County': {
      inspectionCost: 410, appraisalCost: 512, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 415, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Calhoun County': {
      inspectionCost: 432, appraisalCost: 540, surveyFee: 524, pestInspectionCost: 154,
      lawyerFee: 437, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Callahan County': {
      inspectionCost: 440, appraisalCost: 550, surveyFee: 534, pestInspectionCost: 157,
      lawyerFee: 445, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Cameron County': {
      inspectionCost: 419, appraisalCost: 523, surveyFee: 508, pestInspectionCost: 149,
      lawyerFee: 424, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Camp County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 494, pestInspectionCost: 145,
      lawyerFee: 411, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Carson County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 532, pestInspectionCost: 156,
      lawyerFee: 444, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Cass County': {
      inspectionCost: 426, appraisalCost: 533, surveyFee: 518, pestInspectionCost: 152,
      lawyerFee: 431, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Castro County': {
      inspectionCost: 405, appraisalCost: 507, surveyFee: 492, pestInspectionCost: 144,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Chambers County': {
      inspectionCost: 422, appraisalCost: 528, surveyFee: 513, pestInspectionCost: 150,
      lawyerFee: 427, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Cherokee County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 497, pestInspectionCost: 146,
      lawyerFee: 414, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Childress County': {
      inspectionCost: 405, appraisalCost: 506, surveyFee: 492, pestInspectionCost: 144,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Clay County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Cochran County': {
      inspectionCost: 414, appraisalCost: 518, surveyFee: 503, pestInspectionCost: 148,
      lawyerFee: 419, titleInsuranceCost: 0.0053, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Coke County': {
      inspectionCost: 436, appraisalCost: 546, surveyFee: 530, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Coleman County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 522, pestInspectionCost: 153,
      lawyerFee: 435, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Collin County': {
      inspectionCost: 417, appraisalCost: 521, surveyFee: 506, pestInspectionCost: 148,
      lawyerFee: 422, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Collingsworth County': {
      inspectionCost: 410, appraisalCost: 512, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 415, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Colorado County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Comal County': {
      inspectionCost: 425, appraisalCost: 532, surveyFee: 517, pestInspectionCost: 152,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Comanche County': {
      inspectionCost: 433, appraisalCost: 541, surveyFee: 525, pestInspectionCost: 154,
      lawyerFee: 438, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Concho County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 532, pestInspectionCost: 156,
      lawyerFee: 444, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Cooke County': {
      inspectionCost: 417, appraisalCost: 521, surveyFee: 506, pestInspectionCost: 149,
      lawyerFee: 422, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Coryell County': {
      inspectionCost: 439, appraisalCost: 549, surveyFee: 533, pestInspectionCost: 156,
      lawyerFee: 444, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Cottle County': {
      inspectionCost: 436, appraisalCost: 545, surveyFee: 529, pestInspectionCost: 155,
      lawyerFee: 441, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Crane County': {
      inspectionCost: 404, appraisalCost: 506, surveyFee: 491, pestInspectionCost: 144,
      lawyerFee: 409, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Crockett County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 494, pestInspectionCost: 145,
      lawyerFee: 411, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Crosby County': {
      inspectionCost: 432, appraisalCost: 540, surveyFee: 524, pestInspectionCost: 154,
      lawyerFee: 437, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Culberson County': {
      inspectionCost: 410, appraisalCost: 513, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 415, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Dallam County': {
      inspectionCost: 412, appraisalCost: 516, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 417, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Dallas County': {
      inspectionCost: 427, appraisalCost: 534, surveyFee: 519, pestInspectionCost: 152,
      lawyerFee: 432, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Dawson County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'DeWitt County': {
      inspectionCost: 435, appraisalCost: 543, surveyFee: 528, pestInspectionCost: 155,
      lawyerFee: 440, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Deaf Smith County': {
      inspectionCost: 434, appraisalCost: 543, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Delta County': {
      inspectionCost: 402, appraisalCost: 503, surveyFee: 489, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Denton County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 515, pestInspectionCost: 151,
      lawyerFee: 429, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Dickens County': {
      inspectionCost: 426, appraisalCost: 532, surveyFee: 517, pestInspectionCost: 152,
      lawyerFee: 431, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Dimmit County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Donley County': {
      inspectionCost: 406, appraisalCost: 507, surveyFee: 493, pestInspectionCost: 145,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Duval County': {
      inspectionCost: 438, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 443, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Eastland County': {
      inspectionCost: 437, appraisalCost: 546, surveyFee: 530, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Ector County': {
      inspectionCost: 407, appraisalCost: 509, surveyFee: 494, pestInspectionCost: 145,
      lawyerFee: 412, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Edwards County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 413, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'El Paso County': {
      inspectionCost: 419, appraisalCost: 524, surveyFee: 509, pestInspectionCost: 149,
      lawyerFee: 424, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Ellis County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Erath County': {
      inspectionCost: 435, appraisalCost: 543, surveyFee: 528, pestInspectionCost: 155,
      lawyerFee: 440, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Falls County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Fannin County': {
      inspectionCost: 437, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Fayette County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 497, pestInspectionCost: 146,
      lawyerFee: 414, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Fisher County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Floyd County': {
      inspectionCost: 421, appraisalCost: 527, surveyFee: 512, pestInspectionCost: 150,
      lawyerFee: 426, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Foard County': {
      inspectionCost: 423, appraisalCost: 529, surveyFee: 514, pestInspectionCost: 151,
      lawyerFee: 428, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Fort Bend County': {
      inspectionCost: 414, appraisalCost: 517, surveyFee: 502, pestInspectionCost: 147,
      lawyerFee: 419, titleInsuranceCost: 0.0053, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Franklin County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 497, pestInspectionCost: 146,
      lawyerFee: 414, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Freestone County': {
      inspectionCost: 401, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Frio County': {
      inspectionCost: 411, appraisalCost: 514, surveyFee: 499, pestInspectionCost: 147,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Gaines County': {
      inspectionCost: 427, appraisalCost: 534, surveyFee: 519, pestInspectionCost: 152,
      lawyerFee: 433, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Galveston County': {
      inspectionCost: 419, appraisalCost: 524, surveyFee: 509, pestInspectionCost: 149,
      lawyerFee: 424, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Garza County': {
      inspectionCost: 407, appraisalCost: 509, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 412, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Gillespie County': {
      inspectionCost: 405, appraisalCost: 507, surveyFee: 492, pestInspectionCost: 144,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Glasscock County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 497, pestInspectionCost: 146,
      lawyerFee: 414, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Goliad County': {
      inspectionCost: 404, appraisalCost: 505, surveyFee: 491, pestInspectionCost: 144,
      lawyerFee: 409, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Gonzales County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Gray County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 494, pestInspectionCost: 145,
      lawyerFee: 411, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Grayson County': {
      inspectionCost: 434, appraisalCost: 543, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Gregg County': {
      inspectionCost: 399, appraisalCost: 499, surveyFee: 485, pestInspectionCost: 142,
      lawyerFee: 404, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Grimes County': {
      inspectionCost: 437, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Guadalupe County': {
      inspectionCost: 411, appraisalCost: 514, surveyFee: 499, pestInspectionCost: 147,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Hale County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Hall County': {
      inspectionCost: 433, appraisalCost: 542, surveyFee: 526, pestInspectionCost: 154,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Hamilton County': {
      inspectionCost: 399, appraisalCost: 499, surveyFee: 485, pestInspectionCost: 142,
      lawyerFee: 404, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Hansford County': {
      inspectionCost: 410, appraisalCost: 512, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 415, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Hardeman County': {
      inspectionCost: 402, appraisalCost: 503, surveyFee: 489, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Hardin County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Harris County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 486, pestInspectionCost: 142,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Harrison County': {
      inspectionCost: 406, appraisalCost: 507, surveyFee: 493, pestInspectionCost: 145,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Hartley County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 413, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Haskell County': {
      inspectionCost: 429, appraisalCost: 536, surveyFee: 521, pestInspectionCost: 153,
      lawyerFee: 434, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Hays County': {
      inspectionCost: 428, appraisalCost: 536, surveyFee: 520, pestInspectionCost: 153,
      lawyerFee: 433, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Hemphill County': {
      inspectionCost: 436, appraisalCost: 545, surveyFee: 529, pestInspectionCost: 155,
      lawyerFee: 441, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Henderson County': {
      inspectionCost: 435, appraisalCost: 544, surveyFee: 529, pestInspectionCost: 155,
      lawyerFee: 441, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Hidalgo County': {
      inspectionCost: 413, appraisalCost: 516, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 418, titleInsuranceCost: 0.0053, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Hill County': {
      inspectionCost: 433, appraisalCost: 541, surveyFee: 526, pestInspectionCost: 154,
      lawyerFee: 438, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Hockley County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Hood County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Hopkins County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 413, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Houston County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 532, pestInspectionCost: 156,
      lawyerFee: 444, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Howard County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 486, pestInspectionCost: 143,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Hudspeth County': {
      inspectionCost: 402, appraisalCost: 503, surveyFee: 489, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Hunt County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Hutchinson County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Irion County': {
      inspectionCost: 405, appraisalCost: 506, surveyFee: 492, pestInspectionCost: 144,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Jack County': {
      inspectionCost: 413, appraisalCost: 516, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 418, titleInsuranceCost: 0.0053, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Jackson County': {
      inspectionCost: 417, appraisalCost: 522, surveyFee: 507, pestInspectionCost: 149,
      lawyerFee: 422, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Jasper County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 523, pestInspectionCost: 153,
      lawyerFee: 436, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Jeff Davis County': {
      inspectionCost: 412, appraisalCost: 516, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 417, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Jefferson County': {
      inspectionCost: 421, appraisalCost: 527, surveyFee: 512, pestInspectionCost: 150,
      lawyerFee: 426, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Jim Hogg County': {
      inspectionCost: 421, appraisalCost: 527, surveyFee: 512, pestInspectionCost: 150,
      lawyerFee: 426, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Jim Wells County': {
      inspectionCost: 422, appraisalCost: 528, surveyFee: 513, pestInspectionCost: 151,
      lawyerFee: 427, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Johnson County': {
      inspectionCost: 429, appraisalCost: 536, surveyFee: 521, pestInspectionCost: 153,
      lawyerFee: 434, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Jones County': {
      inspectionCost: 428, appraisalCost: 535, surveyFee: 520, pestInspectionCost: 153,
      lawyerFee: 433, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Karnes County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 493, pestInspectionCost: 145,
      lawyerFee: 411, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Kaufman County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Kendall County': {
      inspectionCost: 435, appraisalCost: 544, surveyFee: 529, pestInspectionCost: 155,
      lawyerFee: 441, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Kenedy County': {
      inspectionCost: 418, appraisalCost: 522, surveyFee: 507, pestInspectionCost: 149,
      lawyerFee: 423, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Kent County': {
      inspectionCost: 415, appraisalCost: 519, surveyFee: 504, pestInspectionCost: 148,
      lawyerFee: 420, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Kerr County': {
      inspectionCost: 435, appraisalCost: 544, surveyFee: 529, pestInspectionCost: 155,
      lawyerFee: 441, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Kimble County': {
      inspectionCost: 418, appraisalCost: 522, surveyFee: 507, pestInspectionCost: 149,
      lawyerFee: 423, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'King County': {
      inspectionCost: 407, appraisalCost: 509, surveyFee: 494, pestInspectionCost: 145,
      lawyerFee: 412, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Kinney County': {
      inspectionCost: 412, appraisalCost: 515, surveyFee: 500, pestInspectionCost: 147,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Kleberg County': {
      inspectionCost: 427, appraisalCost: 534, surveyFee: 519, pestInspectionCost: 152,
      lawyerFee: 432, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Knox County': {
      inspectionCost: 425, appraisalCost: 532, surveyFee: 517, pestInspectionCost: 152,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'La Salle County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 497, pestInspectionCost: 146,
      lawyerFee: 414, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Lamar County': {
      inspectionCost: 411, appraisalCost: 513, surveyFee: 499, pestInspectionCost: 146,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Lamb County': {
      inspectionCost: 421, appraisalCost: 526, surveyFee: 511, pestInspectionCost: 150,
      lawyerFee: 426, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Lampasas County': {
      inspectionCost: 402, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 407, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Lavaca County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Lee County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Leon County': {
      inspectionCost: 417, appraisalCost: 522, surveyFee: 507, pestInspectionCost: 149,
      lawyerFee: 422, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Liberty County': {
      inspectionCost: 401, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Limestone County': {
      inspectionCost: 410, appraisalCost: 513, surveyFee: 498, pestInspectionCost: 146,
      lawyerFee: 415, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Lipscomb County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Live Oak County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Llano County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 496, pestInspectionCost: 145,
      lawyerFee: 413, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Loving County': {
      inspectionCost: 434, appraisalCost: 542, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Lubbock County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 522, pestInspectionCost: 153,
      lawyerFee: 435, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Lynn County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Madison County': {
      inspectionCost: 432, appraisalCost: 540, surveyFee: 525, pestInspectionCost: 154,
      lawyerFee: 437, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Marion County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 515, pestInspectionCost: 151,
      lawyerFee: 429, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Martin County': {
      inspectionCost: 433, appraisalCost: 541, surveyFee: 526, pestInspectionCost: 154,
      lawyerFee: 438, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Mason County': {
      inspectionCost: 427, appraisalCost: 533, surveyFee: 518, pestInspectionCost: 152,
      lawyerFee: 432, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Matagorda County': {
      inspectionCost: 421, appraisalCost: 527, surveyFee: 512, pestInspectionCost: 150,
      lawyerFee: 426, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Maverick County': {
      inspectionCost: 406, appraisalCost: 507, surveyFee: 493, pestInspectionCost: 145,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'McCulloch County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'McLennan County': {
      inspectionCost: 411, appraisalCost: 513, surveyFee: 499, pestInspectionCost: 146,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 47, floodDeterminationFee: 27
    },
    'McMullen County': {
      inspectionCost: 414, appraisalCost: 518, surveyFee: 503, pestInspectionCost: 148,
      lawyerFee: 419, titleInsuranceCost: 0.0053, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Medina County': {
      inspectionCost: 434, appraisalCost: 543, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Menard County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 413, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Midland County': {
      inspectionCost: 440, appraisalCost: 550, surveyFee: 534, pestInspectionCost: 157,
      lawyerFee: 445, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Milam County': {
      inspectionCost: 419, appraisalCost: 524, surveyFee: 509, pestInspectionCost: 149,
      lawyerFee: 424, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Mills County': {
      inspectionCost: 411, appraisalCost: 513, surveyFee: 499, pestInspectionCost: 146,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Mitchell County': {
      inspectionCost: 403, appraisalCost: 504, surveyFee: 489, pestInspectionCost: 144,
      lawyerFee: 408, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Montague County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 532, pestInspectionCost: 156,
      lawyerFee: 443, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Montgomery County': {
      inspectionCost: 401, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Moore County': {
      inspectionCost: 407, appraisalCost: 509, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 412, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Morris County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Motley County': {
      inspectionCost: 439, appraisalCost: 549, surveyFee: 533, pestInspectionCost: 157,
      lawyerFee: 444, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Nacogdoches County': {
      inspectionCost: 429, appraisalCost: 536, surveyFee: 521, pestInspectionCost: 153,
      lawyerFee: 434, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Navarro County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 413, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Newton County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 515, pestInspectionCost: 151,
      lawyerFee: 429, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Nolan County': {
      inspectionCost: 409, appraisalCost: 512, surveyFee: 497, pestInspectionCost: 146,
      lawyerFee: 414, titleInsuranceCost: 0.0053, recordingFees: 175, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Nueces County': {
      inspectionCost: 408, appraisalCost: 510, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 413, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Ochiltree County': {
      inspectionCost: 438, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 443, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Oldham County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 486, pestInspectionCost: 142,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Orange County': {
      inspectionCost: 436, appraisalCost: 546, surveyFee: 530, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Palo Pinto County': {
      inspectionCost: 428, appraisalCost: 536, surveyFee: 520, pestInspectionCost: 153,
      lawyerFee: 433, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Panola County': {
      inspectionCost: 404, appraisalCost: 505, surveyFee: 490, pestInspectionCost: 144,
      lawyerFee: 408, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Parker County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 515, pestInspectionCost: 151,
      lawyerFee: 429, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Parmer County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 515, pestInspectionCost: 151,
      lawyerFee: 429, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Pecos County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Polk County': {
      inspectionCost: 434, appraisalCost: 542, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Potter County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 522, pestInspectionCost: 153,
      lawyerFee: 435, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Presidio County': {
      inspectionCost: 433, appraisalCost: 541, surveyFee: 525, pestInspectionCost: 154,
      lawyerFee: 438, titleInsuranceCost: 0.0053, recordingFees: 185, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Rains County': {
      inspectionCost: 405, appraisalCost: 506, surveyFee: 492, pestInspectionCost: 144,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Randall County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Reagan County': {
      inspectionCost: 415, appraisalCost: 519, surveyFee: 504, pestInspectionCost: 148,
      lawyerFee: 420, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Real County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 515, pestInspectionCost: 151,
      lawyerFee: 429, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Red River County': {
      inspectionCost: 423, appraisalCost: 529, surveyFee: 514, pestInspectionCost: 151,
      lawyerFee: 428, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Reeves County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 493, pestInspectionCost: 145,
      lawyerFee: 411, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Refugio County': {
      inspectionCost: 420, appraisalCost: 526, surveyFee: 511, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Roberts County': {
      inspectionCost: 437, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Robertson County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Rockwall County': {
      inspectionCost: 406, appraisalCost: 507, surveyFee: 493, pestInspectionCost: 145,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Runnels County': {
      inspectionCost: 404, appraisalCost: 505, surveyFee: 491, pestInspectionCost: 144,
      lawyerFee: 409, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Rusk County': {
      inspectionCost: 399, appraisalCost: 498, surveyFee: 484, pestInspectionCost: 142,
      lawyerFee: 403, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Sabine County': {
      inspectionCost: 404, appraisalCost: 505, surveyFee: 491, pestInspectionCost: 144,
      lawyerFee: 409, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 26
    },
    'San Augustine County': {
      inspectionCost: 414, appraisalCost: 518, surveyFee: 503, pestInspectionCost: 148,
      lawyerFee: 419, titleInsuranceCost: 0.0053, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 27
    },
    'San Jacinto County': {
      inspectionCost: 411, appraisalCost: 513, surveyFee: 499, pestInspectionCost: 146,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 47, floodDeterminationFee: 27
    },
    'San Patricio County': {
      inspectionCost: 422, appraisalCost: 527, surveyFee: 512, pestInspectionCost: 150,
      lawyerFee: 427, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'San Saba County': {
      inspectionCost: 435, appraisalCost: 544, surveyFee: 529, pestInspectionCost: 155,
      lawyerFee: 441, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Schleicher County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 494, pestInspectionCost: 145,
      lawyerFee: 411, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Scurry County': {
      inspectionCost: 406, appraisalCost: 507, surveyFee: 493, pestInspectionCost: 145,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Shackelford County': {
      inspectionCost: 404, appraisalCost: 506, surveyFee: 491, pestInspectionCost: 144,
      lawyerFee: 409, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Shelby County': {
      inspectionCost: 439, appraisalCost: 549, surveyFee: 533, pestInspectionCost: 156,
      lawyerFee: 444, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Sherman County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Smith County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 486, pestInspectionCost: 143,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Somervell County': {
      inspectionCost: 415, appraisalCost: 519, surveyFee: 504, pestInspectionCost: 148,
      lawyerFee: 420, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Starr County': {
      inspectionCost: 440, appraisalCost: 550, surveyFee: 534, pestInspectionCost: 157,
      lawyerFee: 445, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Stephens County': {
      inspectionCost: 404, appraisalCost: 506, surveyFee: 491, pestInspectionCost: 144,
      lawyerFee: 409, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Sterling County': {
      inspectionCost: 438, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 443, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Stonewall County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 522, pestInspectionCost: 153,
      lawyerFee: 435, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Sutton County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 523, pestInspectionCost: 153,
      lawyerFee: 436, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Swisher County': {
      inspectionCost: 438, appraisalCost: 548, surveyFee: 532, pestInspectionCost: 156,
      lawyerFee: 443, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Tarrant County': {
      inspectionCost: 403, appraisalCost: 504, surveyFee: 490, pestInspectionCost: 144,
      lawyerFee: 408, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Taylor County': {
      inspectionCost: 434, appraisalCost: 543, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Terrell County': {
      inspectionCost: 424, appraisalCost: 530, surveyFee: 515, pestInspectionCost: 151,
      lawyerFee: 429, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Terry County': {
      inspectionCost: 437, appraisalCost: 546, surveyFee: 530, pestInspectionCost: 156,
      lawyerFee: 442, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Throckmorton County': {
      inspectionCost: 430, appraisalCost: 538, surveyFee: 523, pestInspectionCost: 153,
      lawyerFee: 436, titleInsuranceCost: 0.0053, recordingFees: 184, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Titus County': {
      inspectionCost: 416, appraisalCost: 520, surveyFee: 505, pestInspectionCost: 148,
      lawyerFee: 421, titleInsuranceCost: 0.0053, recordingFees: 178, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Tom Green County': {
      inspectionCost: 438, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 443, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Travis County': {
      inspectionCost: 412, appraisalCost: 516, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 417, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Trinity County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 486, pestInspectionCost: 142,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Tyler County': {
      inspectionCost: 425, appraisalCost: 531, surveyFee: 516, pestInspectionCost: 151,
      lawyerFee: 430, titleInsuranceCost: 0.0053, recordingFees: 182, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Upshur County': {
      inspectionCost: 420, appraisalCost: 526, surveyFee: 511, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Upton County': {
      inspectionCost: 438, appraisalCost: 547, surveyFee: 531, pestInspectionCost: 156,
      lawyerFee: 443, titleInsuranceCost: 0.0053, recordingFees: 187, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Uvalde County': {
      inspectionCost: 429, appraisalCost: 536, surveyFee: 521, pestInspectionCost: 153,
      lawyerFee: 434, titleInsuranceCost: 0.0053, recordingFees: 183, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Val Verde County': {
      inspectionCost: 405, appraisalCost: 506, surveyFee: 492, pestInspectionCost: 144,
      lawyerFee: 410, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Van Zandt County': {
      inspectionCost: 406, appraisalCost: 508, surveyFee: 493, pestInspectionCost: 145,
      lawyerFee: 411, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Victoria County': {
      inspectionCost: 435, appraisalCost: 544, surveyFee: 528, pestInspectionCost: 155,
      lawyerFee: 440, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 29
    },
    'Walker County': {
      inspectionCost: 404, appraisalCost: 505, surveyFee: 491, pestInspectionCost: 144,
      lawyerFee: 409, titleInsuranceCost: 0.0052, recordingFees: 173, creditReportFee: 47, floodDeterminationFee: 26
    },
    'Waller County': {
      inspectionCost: 439, appraisalCost: 549, surveyFee: 533, pestInspectionCost: 157,
      lawyerFee: 444, titleInsuranceCost: 0.0053, recordingFees: 188, creditReportFee: 51, floodDeterminationFee: 29
    },
    'Ward County': {
      inspectionCost: 407, appraisalCost: 509, surveyFee: 495, pestInspectionCost: 145,
      lawyerFee: 412, titleInsuranceCost: 0.0052, recordingFees: 174, creditReportFee: 47, floodDeterminationFee: 27
    },
    'Washington County': {
      inspectionCost: 421, appraisalCost: 527, surveyFee: 512, pestInspectionCost: 150,
      lawyerFee: 426, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Webb County': {
      inspectionCost: 422, appraisalCost: 528, surveyFee: 513, pestInspectionCost: 151,
      lawyerFee: 427, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Wharton County': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Wheeler County': {
      inspectionCost: 411, appraisalCost: 514, surveyFee: 499, pestInspectionCost: 147,
      lawyerFee: 416, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Wichita County': {
      inspectionCost: 419, appraisalCost: 524, surveyFee: 509, pestInspectionCost: 149,
      lawyerFee: 424, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Wilbarger County': {
      inspectionCost: 412, appraisalCost: 516, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 417, titleInsuranceCost: 0.0053, recordingFees: 176, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Willacy County': {
      inspectionCost: 418, appraisalCost: 522, surveyFee: 507, pestInspectionCost: 149,
      lawyerFee: 423, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Williamson County': {
      inspectionCost: 421, appraisalCost: 526, surveyFee: 511, pestInspectionCost: 150,
      lawyerFee: 426, titleInsuranceCost: 0.0053, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Wilson County': {
      inspectionCost: 423, appraisalCost: 529, surveyFee: 514, pestInspectionCost: 151,
      lawyerFee: 428, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Winkler County': {
      inspectionCost: 400, appraisalCost: 500, surveyFee: 486, pestInspectionCost: 143,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Wise County': {
      inspectionCost: 419, appraisalCost: 524, surveyFee: 509, pestInspectionCost: 149,
      lawyerFee: 424, titleInsuranceCost: 0.0053, recordingFees: 179, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Wood County': {
      inspectionCost: 401, appraisalCost: 502, surveyFee: 488, pestInspectionCost: 143,
      lawyerFee: 406, titleInsuranceCost: 0.0052, recordingFees: 172, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Yoakum County': {
      inspectionCost: 413, appraisalCost: 516, surveyFee: 501, pestInspectionCost: 147,
      lawyerFee: 418, titleInsuranceCost: 0.0053, recordingFees: 177, creditReportFee: 48, floodDeterminationFee: 27
    },
    'Young County': {
      inspectionCost: 423, appraisalCost: 529, surveyFee: 514, pestInspectionCost: 151,
      lawyerFee: 428, titleInsuranceCost: 0.0053, recordingFees: 181, creditReportFee: 49, floodDeterminationFee: 28
    },
    'Zapata County': {
      inspectionCost: 434, appraisalCost: 542, surveyFee: 527, pestInspectionCost: 155,
      lawyerFee: 439, titleInsuranceCost: 0.0053, recordingFees: 186, creditReportFee: 50, floodDeterminationFee: 28
    },
    'Zavala County': {
      inspectionCost: 401, appraisalCost: 501, surveyFee: 487, pestInspectionCost: 143,
      lawyerFee: 405, titleInsuranceCost: 0.0052, recordingFees: 171, creditReportFee: 46, floodDeterminationFee: 26
    },
    'Default': {
      inspectionCost: 420, appraisalCost: 525, surveyFee: 510, pestInspectionCost: 150,
      lawyerFee: 425, titleInsuranceCost: 0.0055, recordingFees: 180, creditReportFee: 49, floodDeterminationFee: 28
    },
  },
  // UTAH
  'UT': {
    'Beaver County': {
      inspectionCost: 423, appraisalCost: 510, surveyFee: 520, pestInspectionCost: 132,
      lawyerFee: 510, titleInsuranceCost: 0.0053, recordingFees: 168, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Box Elder County': {
      inspectionCost: 429, appraisalCost: 517, surveyFee: 527, pestInspectionCost: 134,
      lawyerFee: 517, titleInsuranceCost: 0.0053, recordingFees: 170, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Cache County': {
      inspectionCost: 418, appraisalCost: 504, surveyFee: 514, pestInspectionCost: 131,
      lawyerFee: 504, titleInsuranceCost: 0.0053, recordingFees: 166, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Carbon County': {
      inspectionCost: 394, appraisalCost: 475, surveyFee: 485, pestInspectionCost: 123,
      lawyerFee: 475, titleInsuranceCost: 0.0052, recordingFees: 156, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Daggett County': {
      inspectionCost: 432, appraisalCost: 520, surveyFee: 530, pestInspectionCost: 135,
      lawyerFee: 520, titleInsuranceCost: 0.0053, recordingFees: 171, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Davis County': {
      inspectionCost: 415, appraisalCost: 500, surveyFee: 510, pestInspectionCost: 130,
      lawyerFee: 500, titleInsuranceCost: 0.0053, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Duchesne County': {
      inspectionCost: 418, appraisalCost: 504, surveyFee: 514, pestInspectionCost: 131,
      lawyerFee: 504, titleInsuranceCost: 0.0053, recordingFees: 166, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Emery County': {
      inspectionCost: 433, appraisalCost: 522, surveyFee: 532, pestInspectionCost: 135,
      lawyerFee: 522, titleInsuranceCost: 0.0053, recordingFees: 172, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Garfield County': {
      inspectionCost: 425, appraisalCost: 513, surveyFee: 523, pestInspectionCost: 133,
      lawyerFee: 513, titleInsuranceCost: 0.0053, recordingFees: 169, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Grand County': {
      inspectionCost: 434, appraisalCost: 524, surveyFee: 534, pestInspectionCost: 136,
      lawyerFee: 524, titleInsuranceCost: 0.0053, recordingFees: 172, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Iron County': {
      inspectionCost: 422, appraisalCost: 508, surveyFee: 518, pestInspectionCost: 132,
      lawyerFee: 508, titleInsuranceCost: 0.0053, recordingFees: 167, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Juab County': {
      inspectionCost: 399, appraisalCost: 481, surveyFee: 490, pestInspectionCost: 125,
      lawyerFee: 481, titleInsuranceCost: 0.0052, recordingFees: 158, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Kane County': {
      inspectionCost: 410, appraisalCost: 494, surveyFee: 503, pestInspectionCost: 128,
      lawyerFee: 494, titleInsuranceCost: 0.0053, recordingFees: 163, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Millard County': {
      inspectionCost: 427, appraisalCost: 515, surveyFee: 525, pestInspectionCost: 134,
      lawyerFee: 515, titleInsuranceCost: 0.0053, recordingFees: 170, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Morgan County': {
      inspectionCost: 420, appraisalCost: 507, surveyFee: 517, pestInspectionCost: 131,
      lawyerFee: 507, titleInsuranceCost: 0.0053, recordingFees: 167, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Piute County': {
      inspectionCost: 434, appraisalCost: 523, surveyFee: 533, pestInspectionCost: 136,
      lawyerFee: 523, titleInsuranceCost: 0.0053, recordingFees: 172, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Rich County': {
      inspectionCost: 428, appraisalCost: 516, surveyFee: 526, pestInspectionCost: 134,
      lawyerFee: 516, titleInsuranceCost: 0.0053, recordingFees: 170, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Salt Lake County': {
      inspectionCost: 430, appraisalCost: 518, surveyFee: 528, pestInspectionCost: 134,
      lawyerFee: 518, titleInsuranceCost: 0.0053, recordingFees: 171, creditReportFee: 47, floodDeterminationFee: 24
    },
    'San Juan County': {
      inspectionCost: 412, appraisalCost: 497, surveyFee: 506, pestInspectionCost: 129,
      lawyerFee: 497, titleInsuranceCost: 0.0053, recordingFees: 164, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sanpete County': {
      inspectionCost: 413, appraisalCost: 498, surveyFee: 508, pestInspectionCost: 129,
      lawyerFee: 498, titleInsuranceCost: 0.0053, recordingFees: 164, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sevier County': {
      inspectionCost: 395, appraisalCost: 476, surveyFee: 485, pestInspectionCost: 123,
      lawyerFee: 476, titleInsuranceCost: 0.0052, recordingFees: 157, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Summit County': {
      inspectionCost: 417, appraisalCost: 502, surveyFee: 512, pestInspectionCost: 130,
      lawyerFee: 502, titleInsuranceCost: 0.0053, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Tooele County': {
      inspectionCost: 407, appraisalCost: 490, surveyFee: 500, pestInspectionCost: 127,
      lawyerFee: 490, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Uintah County': {
      inspectionCost: 416, appraisalCost: 501, surveyFee: 511, pestInspectionCost: 130,
      lawyerFee: 501, titleInsuranceCost: 0.0053, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Utah County': {
      inspectionCost: 397, appraisalCost: 479, surveyFee: 488, pestInspectionCost: 124,
      lawyerFee: 479, titleInsuranceCost: 0.0052, recordingFees: 158, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Wasatch County': {
      inspectionCost: 432, appraisalCost: 521, surveyFee: 531, pestInspectionCost: 135,
      lawyerFee: 521, titleInsuranceCost: 0.0053, recordingFees: 171, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Washington County': {
      inspectionCost: 416, appraisalCost: 502, surveyFee: 512, pestInspectionCost: 130,
      lawyerFee: 502, titleInsuranceCost: 0.0053, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Wayne County': {
      inspectionCost: 427, appraisalCost: 515, surveyFee: 525, pestInspectionCost: 134,
      lawyerFee: 515, titleInsuranceCost: 0.0053, recordingFees: 170, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Weber County': {
      inspectionCost: 434, appraisalCost: 523, surveyFee: 533, pestInspectionCost: 135,
      lawyerFee: 523, titleInsuranceCost: 0.0053, recordingFees: 172, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Default': {
      inspectionCost: 415, appraisalCost: 500, surveyFee: 510, pestInspectionCost: 130,
      lawyerFee: 500, titleInsuranceCost: 0.0055, recordingFees: 165, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // VIRGINIA
  'VA': {
    'Accomack County': {
      inspectionCost: 461, appraisalCost: 548, surveyFee: 445, pestInspectionCost: 158,
      lawyerFee: 768, titleInsuranceCost: 0.0061, recordingFees: 174, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Albemarle County': {
      inspectionCost: 461, appraisalCost: 548, surveyFee: 446, pestInspectionCost: 159,
      lawyerFee: 769, titleInsuranceCost: 0.0061, recordingFees: 174, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Alleghany County': {
      inspectionCost: 429, appraisalCost: 510, surveyFee: 415, pestInspectionCost: 148,
      lawyerFee: 716, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Amelia County': {
      inspectionCost: 456, appraisalCost: 543, surveyFee: 441, pestInspectionCost: 157,
      lawyerFee: 761, titleInsuranceCost: 0.0061, recordingFees: 172, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Amherst County': {
      inspectionCost: 440, appraisalCost: 523, surveyFee: 425, pestInspectionCost: 151,
      lawyerFee: 733, titleInsuranceCost: 0.006, recordingFees: 166, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Appomattox County': {
      inspectionCost: 468, appraisalCost: 556, surveyFee: 452, pestInspectionCost: 161,
      lawyerFee: 780, titleInsuranceCost: 0.0061, recordingFees: 176, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Arlington County': {
      inspectionCost: 444, appraisalCost: 528, surveyFee: 429, pestInspectionCost: 152,
      lawyerFee: 740, titleInsuranceCost: 0.006, recordingFees: 167, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Augusta County': {
      inspectionCost: 462, appraisalCost: 549, surveyFee: 447, pestInspectionCost: 159,
      lawyerFee: 771, titleInsuranceCost: 0.0061, recordingFees: 174, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Bath County': {
      inspectionCost: 432, appraisalCost: 514, surveyFee: 418, pestInspectionCost: 148,
      lawyerFee: 720, titleInsuranceCost: 0.006, recordingFees: 163, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Bedford County': {
      inspectionCost: 459, appraisalCost: 545, surveyFee: 443, pestInspectionCost: 158,
      lawyerFee: 765, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Bland County': {
      inspectionCost: 430, appraisalCost: 511, surveyFee: 415, pestInspectionCost: 148,
      lawyerFee: 717, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Botetourt County': {
      inspectionCost: 471, appraisalCost: 560, surveyFee: 455, pestInspectionCost: 162,
      lawyerFee: 786, titleInsuranceCost: 0.0061, recordingFees: 178, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Brunswick County': {
      inspectionCost: 457, appraisalCost: 543, surveyFee: 441, pestInspectionCost: 157,
      lawyerFee: 762, titleInsuranceCost: 0.0061, recordingFees: 172, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Buchanan County': {
      inspectionCost: 454, appraisalCost: 540, surveyFee: 439, pestInspectionCost: 156,
      lawyerFee: 757, titleInsuranceCost: 0.0061, recordingFees: 171, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Buckingham County': {
      inspectionCost: 468, appraisalCost: 556, surveyFee: 452, pestInspectionCost: 161,
      lawyerFee: 780, titleInsuranceCost: 0.0061, recordingFees: 176, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Campbell County': {
      inspectionCost: 468, appraisalCost: 556, surveyFee: 452, pestInspectionCost: 161,
      lawyerFee: 780, titleInsuranceCost: 0.0061, recordingFees: 176, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Caroline County': {
      inspectionCost: 454, appraisalCost: 540, surveyFee: 439, pestInspectionCost: 156,
      lawyerFee: 758, titleInsuranceCost: 0.0061, recordingFees: 171, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Carroll County': {
      inspectionCost: 433, appraisalCost: 515, surveyFee: 419, pestInspectionCost: 149,
      lawyerFee: 723, titleInsuranceCost: 0.006, recordingFees: 163, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Charles City County': {
      inspectionCost: 444, appraisalCost: 528, surveyFee: 429, pestInspectionCost: 153,
      lawyerFee: 741, titleInsuranceCost: 0.006, recordingFees: 167, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Charlotte County': {
      inspectionCost: 447, appraisalCost: 531, surveyFee: 432, pestInspectionCost: 154,
      lawyerFee: 745, titleInsuranceCost: 0.006, recordingFees: 168, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Chesterfield County': {
      inspectionCost: 449, appraisalCost: 534, surveyFee: 434, pestInspectionCost: 154,
      lawyerFee: 749, titleInsuranceCost: 0.006, recordingFees: 169, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Clarke County': {
      inspectionCost: 444, appraisalCost: 528, surveyFee: 429, pestInspectionCost: 153,
      lawyerFee: 741, titleInsuranceCost: 0.006, recordingFees: 167, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Craig County': {
      inspectionCost: 450, appraisalCost: 535, surveyFee: 435, pestInspectionCost: 155,
      lawyerFee: 750, titleInsuranceCost: 0.006, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Culpeper County': {
      inspectionCost: 458, appraisalCost: 545, surveyFee: 443, pestInspectionCost: 157,
      lawyerFee: 764, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Cumberland County': {
      inspectionCost: 461, appraisalCost: 548, surveyFee: 446, pestInspectionCost: 159,
      lawyerFee: 769, titleInsuranceCost: 0.0061, recordingFees: 174, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Dickenson County': {
      inspectionCost: 440, appraisalCost: 523, surveyFee: 425, pestInspectionCost: 151,
      lawyerFee: 733, titleInsuranceCost: 0.006, recordingFees: 166, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Dinwiddie County': {
      inspectionCost: 439, appraisalCost: 522, surveyFee: 424, pestInspectionCost: 151,
      lawyerFee: 732, titleInsuranceCost: 0.006, recordingFees: 165, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Essex County': {
      inspectionCost: 436, appraisalCost: 518, surveyFee: 421, pestInspectionCost: 150,
      lawyerFee: 726, titleInsuranceCost: 0.006, recordingFees: 164, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Fairfax County': {
      inspectionCost: 456, appraisalCost: 543, surveyFee: 441, pestInspectionCost: 157,
      lawyerFee: 761, titleInsuranceCost: 0.0061, recordingFees: 172, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Fauquier County': {
      inspectionCost: 458, appraisalCost: 545, surveyFee: 443, pestInspectionCost: 157,
      lawyerFee: 764, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Floyd County': {
      inspectionCost: 451, appraisalCost: 537, surveyFee: 436, pestInspectionCost: 155,
      lawyerFee: 753, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Fluvanna County': {
      inspectionCost: 451, appraisalCost: 536, surveyFee: 436, pestInspectionCost: 155,
      lawyerFee: 752, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Franklin County': {
      inspectionCost: 439, appraisalCost: 522, surveyFee: 424, pestInspectionCost: 151,
      lawyerFee: 732, titleInsuranceCost: 0.006, recordingFees: 165, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Frederick County': {
      inspectionCost: 458, appraisalCost: 545, surveyFee: 443, pestInspectionCost: 157,
      lawyerFee: 764, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Giles County': {
      inspectionCost: 456, appraisalCost: 542, surveyFee: 441, pestInspectionCost: 157,
      lawyerFee: 760, titleInsuranceCost: 0.0061, recordingFees: 172, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Gloucester County': {
      inspectionCost: 469, appraisalCost: 558, surveyFee: 454, pestInspectionCost: 161,
      lawyerFee: 783, titleInsuranceCost: 0.0061, recordingFees: 177, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Goochland County': {
      inspectionCost: 463, appraisalCost: 550, surveyFee: 447, pestInspectionCost: 159,
      lawyerFee: 771, titleInsuranceCost: 0.0061, recordingFees: 174, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Grayson County': {
      inspectionCost: 465, appraisalCost: 553, surveyFee: 450, pestInspectionCost: 160,
      lawyerFee: 776, titleInsuranceCost: 0.0061, recordingFees: 175, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Greene County': {
      inspectionCost: 438, appraisalCost: 521, surveyFee: 423, pestInspectionCost: 150,
      lawyerFee: 730, titleInsuranceCost: 0.006, recordingFees: 165, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Greensville County': {
      inspectionCost: 438, appraisalCost: 521, surveyFee: 423, pestInspectionCost: 150,
      lawyerFee: 730, titleInsuranceCost: 0.006, recordingFees: 165, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Halifax County': {
      inspectionCost: 451, appraisalCost: 536, surveyFee: 436, pestInspectionCost: 155,
      lawyerFee: 752, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Hanover County': {
      inspectionCost: 436, appraisalCost: 518, surveyFee: 421, pestInspectionCost: 150,
      lawyerFee: 726, titleInsuranceCost: 0.006, recordingFees: 164, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Henrico County': {
      inspectionCost: 429, appraisalCost: 510, surveyFee: 414, pestInspectionCost: 147,
      lawyerFee: 715, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Henry County': {
      inspectionCost: 458, appraisalCost: 545, surveyFee: 443, pestInspectionCost: 157,
      lawyerFee: 764, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Highland County': {
      inspectionCost: 459, appraisalCost: 545, surveyFee: 443, pestInspectionCost: 158,
      lawyerFee: 765, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Isle of Wight County': {
      inspectionCost: 471, appraisalCost: 560, surveyFee: 455, pestInspectionCost: 162,
      lawyerFee: 785, titleInsuranceCost: 0.0061, recordingFees: 177, creditReportFee: 51, floodDeterminationFee: 27
    },
    'James City County': {
      inspectionCost: 459, appraisalCost: 546, surveyFee: 444, pestInspectionCost: 158,
      lawyerFee: 766, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 50, floodDeterminationFee: 26
    },
    'King George County': {
      inspectionCost: 452, appraisalCost: 537, surveyFee: 437, pestInspectionCost: 155,
      lawyerFee: 753, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
    'King William County': {
      inspectionCost: 450, appraisalCost: 536, surveyFee: 435, pestInspectionCost: 155,
      lawyerFee: 751, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
    'King and Queen County': {
      inspectionCost: 434, appraisalCost: 516, surveyFee: 420, pestInspectionCost: 149,
      lawyerFee: 724, titleInsuranceCost: 0.006, recordingFees: 164, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Lancaster County': {
      inspectionCost: 444, appraisalCost: 528, surveyFee: 429, pestInspectionCost: 153,
      lawyerFee: 741, titleInsuranceCost: 0.006, recordingFees: 167, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Lee County': {
      inspectionCost: 450, appraisalCost: 535, surveyFee: 435, pestInspectionCost: 155,
      lawyerFee: 750, titleInsuranceCost: 0.006, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Loudoun County': {
      inspectionCost: 441, appraisalCost: 524, surveyFee: 426, pestInspectionCost: 151,
      lawyerFee: 735, titleInsuranceCost: 0.006, recordingFees: 166, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Louisa County': {
      inspectionCost: 463, appraisalCost: 550, surveyFee: 447, pestInspectionCost: 159,
      lawyerFee: 771, titleInsuranceCost: 0.0061, recordingFees: 174, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Lunenburg County': {
      inspectionCost: 439, appraisalCost: 522, surveyFee: 424, pestInspectionCost: 151,
      lawyerFee: 732, titleInsuranceCost: 0.006, recordingFees: 166, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Madison County': {
      inspectionCost: 463, appraisalCost: 551, surveyFee: 448, pestInspectionCost: 159,
      lawyerFee: 772, titleInsuranceCost: 0.0061, recordingFees: 175, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Mathews County': {
      inspectionCost: 445, appraisalCost: 529, surveyFee: 430, pestInspectionCost: 153,
      lawyerFee: 742, titleInsuranceCost: 0.006, recordingFees: 168, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Mecklenburg County': {
      inspectionCost: 455, appraisalCost: 541, surveyFee: 440, pestInspectionCost: 156,
      lawyerFee: 759, titleInsuranceCost: 0.0061, recordingFees: 172, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Middlesex County': {
      inspectionCost: 469, appraisalCost: 558, surveyFee: 453, pestInspectionCost: 161,
      lawyerFee: 782, titleInsuranceCost: 0.0061, recordingFees: 177, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Montgomery County': {
      inspectionCost: 430, appraisalCost: 511, surveyFee: 416, pestInspectionCost: 148,
      lawyerFee: 717, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Nelson County': {
      inspectionCost: 434, appraisalCost: 516, surveyFee: 419, pestInspectionCost: 149,
      lawyerFee: 723, titleInsuranceCost: 0.006, recordingFees: 164, creditReportFee: 47, floodDeterminationFee: 25
    },
    'New Kent County': {
      inspectionCost: 431, appraisalCost: 512, surveyFee: 416, pestInspectionCost: 148,
      lawyerFee: 718, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Northampton County': {
      inspectionCost: 442, appraisalCost: 526, surveyFee: 428, pestInspectionCost: 152,
      lawyerFee: 738, titleInsuranceCost: 0.006, recordingFees: 167, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Northumberland County': {
      inspectionCost: 469, appraisalCost: 558, surveyFee: 453, pestInspectionCost: 161,
      lawyerFee: 782, titleInsuranceCost: 0.0061, recordingFees: 177, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Nottoway County': {
      inspectionCost: 472, appraisalCost: 561, surveyFee: 456, pestInspectionCost: 162,
      lawyerFee: 786, titleInsuranceCost: 0.0061, recordingFees: 178, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Orange County': {
      inspectionCost: 468, appraisalCost: 556, surveyFee: 452, pestInspectionCost: 161,
      lawyerFee: 780, titleInsuranceCost: 0.0061, recordingFees: 176, creditReportFee: 50, floodDeterminationFee: 27
    },
    'Page County': {
      inspectionCost: 455, appraisalCost: 541, surveyFee: 440, pestInspectionCost: 156,
      lawyerFee: 759, titleInsuranceCost: 0.0061, recordingFees: 172, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Patrick County': {
      inspectionCost: 448, appraisalCost: 532, surveyFee: 433, pestInspectionCost: 154,
      lawyerFee: 747, titleInsuranceCost: 0.006, recordingFees: 169, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Pittsylvania County': {
      inspectionCost: 459, appraisalCost: 546, surveyFee: 444, pestInspectionCost: 158,
      lawyerFee: 765, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Powhatan County': {
      inspectionCost: 466, appraisalCost: 554, surveyFee: 450, pestInspectionCost: 160,
      lawyerFee: 777, titleInsuranceCost: 0.0061, recordingFees: 176, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Prince Edward County': {
      inspectionCost: 428, appraisalCost: 509, surveyFee: 414, pestInspectionCost: 147,
      lawyerFee: 714, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Prince George County': {
      inspectionCost: 454, appraisalCost: 540, surveyFee: 439, pestInspectionCost: 156,
      lawyerFee: 757, titleInsuranceCost: 0.0061, recordingFees: 171, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Prince William County': {
      inspectionCost: 459, appraisalCost: 545, surveyFee: 443, pestInspectionCost: 158,
      lawyerFee: 765, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Pulaski County': {
      inspectionCost: 436, appraisalCost: 519, surveyFee: 422, pestInspectionCost: 150,
      lawyerFee: 728, titleInsuranceCost: 0.006, recordingFees: 165, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Rappahannock County': {
      inspectionCost: 443, appraisalCost: 527, surveyFee: 428, pestInspectionCost: 152,
      lawyerFee: 739, titleInsuranceCost: 0.006, recordingFees: 167, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Richmond County': {
      inspectionCost: 471, appraisalCost: 560, surveyFee: 455, pestInspectionCost: 162,
      lawyerFee: 786, titleInsuranceCost: 0.0061, recordingFees: 178, creditReportFee: 51, floodDeterminationFee: 27
    },
    'Roanoke County': {
      inspectionCost: 438, appraisalCost: 521, surveyFee: 424, pestInspectionCost: 151,
      lawyerFee: 731, titleInsuranceCost: 0.006, recordingFees: 165, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Rockbridge County': {
      inspectionCost: 446, appraisalCost: 530, surveyFee: 431, pestInspectionCost: 153,
      lawyerFee: 744, titleInsuranceCost: 0.006, recordingFees: 168, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Rockingham County': {
      inspectionCost: 431, appraisalCost: 512, surveyFee: 416, pestInspectionCost: 148,
      lawyerFee: 718, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Russell County': {
      inspectionCost: 463, appraisalCost: 551, surveyFee: 448, pestInspectionCost: 159,
      lawyerFee: 773, titleInsuranceCost: 0.0061, recordingFees: 175, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Scott County': {
      inspectionCost: 441, appraisalCost: 525, surveyFee: 427, pestInspectionCost: 152,
      lawyerFee: 736, titleInsuranceCost: 0.006, recordingFees: 166, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Shenandoah County': {
      inspectionCost: 432, appraisalCost: 514, surveyFee: 418, pestInspectionCost: 149,
      lawyerFee: 721, titleInsuranceCost: 0.006, recordingFees: 163, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Smyth County': {
      inspectionCost: 427, appraisalCost: 508, surveyFee: 413, pestInspectionCost: 147,
      lawyerFee: 712, titleInsuranceCost: 0.006, recordingFees: 161, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Southampton County': {
      inspectionCost: 429, appraisalCost: 510, surveyFee: 415, pestInspectionCost: 148,
      lawyerFee: 716, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Spotsylvania County': {
      inspectionCost: 438, appraisalCost: 521, surveyFee: 423, pestInspectionCost: 150,
      lawyerFee: 730, titleInsuranceCost: 0.006, recordingFees: 165, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Stafford County': {
      inspectionCost: 466, appraisalCost: 554, surveyFee: 450, pestInspectionCost: 160,
      lawyerFee: 777, titleInsuranceCost: 0.0061, recordingFees: 176, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Surry County': {
      inspectionCost: 433, appraisalCost: 515, surveyFee: 418, pestInspectionCost: 149,
      lawyerFee: 722, titleInsuranceCost: 0.006, recordingFees: 163, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Sussex County': {
      inspectionCost: 449, appraisalCost: 534, surveyFee: 434, pestInspectionCost: 154,
      lawyerFee: 749, titleInsuranceCost: 0.006, recordingFees: 169, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Tazewell County': {
      inspectionCost: 459, appraisalCost: 546, surveyFee: 444, pestInspectionCost: 158,
      lawyerFee: 766, titleInsuranceCost: 0.0061, recordingFees: 173, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Warren County': {
      inspectionCost: 449, appraisalCost: 533, surveyFee: 434, pestInspectionCost: 154,
      lawyerFee: 748, titleInsuranceCost: 0.006, recordingFees: 169, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Washington County': {
      inspectionCost: 451, appraisalCost: 537, surveyFee: 436, pestInspectionCost: 155,
      lawyerFee: 753, titleInsuranceCost: 0.0061, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
    'Westmoreland County': {
      inspectionCost: 464, appraisalCost: 552, surveyFee: 448, pestInspectionCost: 159,
      lawyerFee: 774, titleInsuranceCost: 0.0061, recordingFees: 175, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Wise County': {
      inspectionCost: 449, appraisalCost: 534, surveyFee: 434, pestInspectionCost: 154,
      lawyerFee: 749, titleInsuranceCost: 0.006, recordingFees: 169, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Wythe County': {
      inspectionCost: 429, appraisalCost: 510, surveyFee: 415, pestInspectionCost: 148,
      lawyerFee: 716, titleInsuranceCost: 0.006, recordingFees: 162, creditReportFee: 46, floodDeterminationFee: 24
    },
    'York County': {
      inspectionCost: 466, appraisalCost: 554, surveyFee: 451, pestInspectionCost: 160,
      lawyerFee: 777, titleInsuranceCost: 0.0061, recordingFees: 176, creditReportFee: 50, floodDeterminationFee: 26
    },
    'Default': {
      inspectionCost: 450, appraisalCost: 535, surveyFee: 435, pestInspectionCost: 155,
      lawyerFee: 750, titleInsuranceCost: 0.0063, recordingFees: 170, creditReportFee: 49, floodDeterminationFee: 26
    },
  },
  // VERMONT
  'VT': {
    'Addison County': {
      inspectionCost: 431, appraisalCost: 514, surveyFee: 415, pestInspectionCost: 150,
      lawyerFee: 831, titleInsuranceCost: 0.0058, recordingFees: 153, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Bennington County': {
      inspectionCost: 428, appraisalCost: 511, surveyFee: 413, pestInspectionCost: 149,
      lawyerFee: 826, titleInsuranceCost: 0.0058, recordingFees: 152, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Caledonia County': {
      inspectionCost: 405, appraisalCost: 484, surveyFee: 391, pestInspectionCost: 141,
      lawyerFee: 782, titleInsuranceCost: 0.0057, recordingFees: 144, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Chittenden County': {
      inspectionCost: 403, appraisalCost: 481, surveyFee: 389, pestInspectionCost: 141,
      lawyerFee: 778, titleInsuranceCost: 0.0057, recordingFees: 144, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Essex County': {
      inspectionCost: 402, appraisalCost: 479, surveyFee: 387, pestInspectionCost: 140,
      lawyerFee: 775, titleInsuranceCost: 0.0057, recordingFees: 143, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Franklin County': {
      inspectionCost: 405, appraisalCost: 483, surveyFee: 390, pestInspectionCost: 141,
      lawyerFee: 780, titleInsuranceCost: 0.0057, recordingFees: 144, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Grand Isle County': {
      inspectionCost: 433, appraisalCost: 516, surveyFee: 417, pestInspectionCost: 151,
      lawyerFee: 835, titleInsuranceCost: 0.0058, recordingFees: 154, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Lamoille County': {
      inspectionCost: 432, appraisalCost: 516, surveyFee: 417, pestInspectionCost: 151,
      lawyerFee: 834, titleInsuranceCost: 0.0058, recordingFees: 154, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Orange County': {
      inspectionCost: 431, appraisalCost: 514, surveyFee: 416, pestInspectionCost: 150,
      lawyerFee: 832, titleInsuranceCost: 0.0058, recordingFees: 153, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Orleans County': {
      inspectionCost: 417, appraisalCost: 497, surveyFee: 402, pestInspectionCost: 145,
      lawyerFee: 804, titleInsuranceCost: 0.0058, recordingFees: 148, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Rutland County': {
      inspectionCost: 428, appraisalCost: 511, surveyFee: 413, pestInspectionCost: 149,
      lawyerFee: 826, titleInsuranceCost: 0.0058, recordingFees: 152, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Washington County': {
      inspectionCost: 416, appraisalCost: 496, surveyFee: 401, pestInspectionCost: 145,
      lawyerFee: 803, titleInsuranceCost: 0.0058, recordingFees: 148, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Windham County': {
      inspectionCost: 417, appraisalCost: 497, surveyFee: 402, pestInspectionCost: 145,
      lawyerFee: 804, titleInsuranceCost: 0.0058, recordingFees: 148, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Windsor County': {
      inspectionCost: 395, appraisalCost: 471, surveyFee: 380, pestInspectionCost: 138,
      lawyerFee: 761, titleInsuranceCost: 0.0057, recordingFees: 140, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Default': {
      inspectionCost: 415, appraisalCost: 495, surveyFee: 400, pestInspectionCost: 145,
      lawyerFee: 800, titleInsuranceCost: 0.006, recordingFees: 148, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
  // WASHINGTON
  'WA': {
    'Adams County': {
      inspectionCost: 491, appraisalCost: 621, surveyFee: 569, pestInspectionCost: 170,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 212, creditReportFee: 56, floodDeterminationFee: 31
    },
    'Asotin County': {
      inspectionCost: 492, appraisalCost: 622, surveyFee: 570, pestInspectionCost: 171,
      lawyerFee: 648, titleInsuranceCost: 0.0058, recordingFees: 212, creditReportFee: 57, floodDeterminationFee: 31
    },
    'Benton County': {
      inspectionCost: 461, appraisalCost: 583, surveyFee: 534, pestInspectionCost: 160,
      lawyerFee: 607, titleInsuranceCost: 0.0057, recordingFees: 199, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Chelan County': {
      inspectionCost: 467, appraisalCost: 590, surveyFee: 541, pestInspectionCost: 162,
      lawyerFee: 615, titleInsuranceCost: 0.0057, recordingFees: 201, creditReportFee: 54, floodDeterminationFee: 29
    },
    'Clallam County': {
      inspectionCost: 454, appraisalCost: 573, surveyFee: 525, pestInspectionCost: 157,
      lawyerFee: 597, titleInsuranceCost: 0.0057, recordingFees: 195, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Clark County': {
      inspectionCost: 456, appraisalCost: 576, surveyFee: 528, pestInspectionCost: 158,
      lawyerFee: 600, titleInsuranceCost: 0.0057, recordingFees: 197, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Columbia County': {
      inspectionCost: 491, appraisalCost: 621, surveyFee: 569, pestInspectionCost: 170,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 212, creditReportFee: 56, floodDeterminationFee: 31
    },
    'Cowlitz County': {
      inspectionCost: 456, appraisalCost: 576, surveyFee: 528, pestInspectionCost: 158,
      lawyerFee: 600, titleInsuranceCost: 0.0057, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Douglas County': {
      inspectionCost: 489, appraisalCost: 618, surveyFee: 567, pestInspectionCost: 170,
      lawyerFee: 644, titleInsuranceCost: 0.0058, recordingFees: 211, creditReportFee: 56, floodDeterminationFee: 30
    },
    'Ferry County': {
      inspectionCost: 472, appraisalCost: 597, surveyFee: 547, pestInspectionCost: 164,
      lawyerFee: 621, titleInsuranceCost: 0.0058, recordingFees: 203, creditReportFee: 54, floodDeterminationFee: 29
    },
    'Franklin County': {
      inspectionCost: 463, appraisalCost: 585, surveyFee: 536, pestInspectionCost: 161,
      lawyerFee: 610, titleInsuranceCost: 0.0057, recordingFees: 200, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Garfield County': {
      inspectionCost: 487, appraisalCost: 615, surveyFee: 564, pestInspectionCost: 169,
      lawyerFee: 641, titleInsuranceCost: 0.0058, recordingFees: 210, creditReportFee: 56, floodDeterminationFee: 30
    },
    'Grant County': {
      inspectionCost: 464, appraisalCost: 586, surveyFee: 537, pestInspectionCost: 161,
      lawyerFee: 611, titleInsuranceCost: 0.0057, recordingFees: 200, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Grays Harbor County': {
      inspectionCost: 480, appraisalCost: 607, surveyFee: 556, pestInspectionCost: 166,
      lawyerFee: 632, titleInsuranceCost: 0.0058, recordingFees: 207, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Island County': {
      inspectionCost: 483, appraisalCost: 610, surveyFee: 559, pestInspectionCost: 167,
      lawyerFee: 635, titleInsuranceCost: 0.0058, recordingFees: 208, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Jefferson County': {
      inspectionCost: 476, appraisalCost: 602, surveyFee: 552, pestInspectionCost: 165,
      lawyerFee: 627, titleInsuranceCost: 0.0058, recordingFees: 205, creditReportFee: 55, floodDeterminationFee: 30
    },
    'King County': {
      inspectionCost: 460, appraisalCost: 582, surveyFee: 533, pestInspectionCost: 160,
      lawyerFee: 606, titleInsuranceCost: 0.0057, recordingFees: 198, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Kitsap County': {
      inspectionCost: 460, appraisalCost: 581, surveyFee: 532, pestInspectionCost: 159,
      lawyerFee: 605, titleInsuranceCost: 0.0057, recordingFees: 198, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Kittitas County': {
      inspectionCost: 454, appraisalCost: 573, surveyFee: 525, pestInspectionCost: 157,
      lawyerFee: 597, titleInsuranceCost: 0.0057, recordingFees: 195, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Klickitat County': {
      inspectionCost: 470, appraisalCost: 594, surveyFee: 544, pestInspectionCost: 163,
      lawyerFee: 618, titleInsuranceCost: 0.0057, recordingFees: 202, creditReportFee: 54, floodDeterminationFee: 29
    },
    'Lewis County': {
      inspectionCost: 461, appraisalCost: 583, surveyFee: 534, pestInspectionCost: 160,
      lawyerFee: 607, titleInsuranceCost: 0.0057, recordingFees: 199, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Lincoln County': {
      inspectionCost: 481, appraisalCost: 608, surveyFee: 557, pestInspectionCost: 167,
      lawyerFee: 633, titleInsuranceCost: 0.0058, recordingFees: 207, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Mason County': {
      inspectionCost: 483, appraisalCost: 610, surveyFee: 559, pestInspectionCost: 167,
      lawyerFee: 635, titleInsuranceCost: 0.0058, recordingFees: 208, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Okanogan County': {
      inspectionCost: 475, appraisalCost: 600, surveyFee: 550, pestInspectionCost: 165,
      lawyerFee: 625, titleInsuranceCost: 0.0058, recordingFees: 205, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Pacific County': {
      inspectionCost: 466, appraisalCost: 589, surveyFee: 540, pestInspectionCost: 162,
      lawyerFee: 614, titleInsuranceCost: 0.0057, recordingFees: 201, creditReportFee: 54, floodDeterminationFee: 29
    },
    'Pend Oreille County': {
      inspectionCost: 498, appraisalCost: 629, surveyFee: 576, pestInspectionCost: 173,
      lawyerFee: 655, titleInsuranceCost: 0.0058, recordingFees: 215, creditReportFee: 57, floodDeterminationFee: 31
    },
    'Pierce County': {
      inspectionCost: 458, appraisalCost: 579, surveyFee: 530, pestInspectionCost: 159,
      lawyerFee: 603, titleInsuranceCost: 0.0057, recordingFees: 197, creditReportFee: 53, floodDeterminationFee: 28
    },
    'San Juan County': {
      inspectionCost: 472, appraisalCost: 596, surveyFee: 546, pestInspectionCost: 164,
      lawyerFee: 621, titleInsuranceCost: 0.0058, recordingFees: 203, creditReportFee: 54, floodDeterminationFee: 29
    },
    'Skagit County': {
      inspectionCost: 479, appraisalCost: 606, surveyFee: 555, pestInspectionCost: 166,
      lawyerFee: 631, titleInsuranceCost: 0.0058, recordingFees: 207, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Skamania County': {
      inspectionCost: 491, appraisalCost: 620, surveyFee: 568, pestInspectionCost: 170,
      lawyerFee: 646, titleInsuranceCost: 0.0058, recordingFees: 211, creditReportFee: 56, floodDeterminationFee: 31
    },
    'Snohomish County': {
      inspectionCost: 486, appraisalCost: 614, surveyFee: 563, pestInspectionCost: 168,
      lawyerFee: 640, titleInsuranceCost: 0.0058, recordingFees: 209, creditReportFee: 56, floodDeterminationFee: 30
    },
    'Spokane County': {
      inspectionCost: 477, appraisalCost: 603, surveyFee: 553, pestInspectionCost: 165,
      lawyerFee: 628, titleInsuranceCost: 0.0058, recordingFees: 206, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Stevens County': {
      inspectionCost: 494, appraisalCost: 625, surveyFee: 573, pestInspectionCost: 171,
      lawyerFee: 651, titleInsuranceCost: 0.0058, recordingFees: 213, creditReportFee: 57, floodDeterminationFee: 31
    },
    'Thurston County': {
      inspectionCost: 454, appraisalCost: 574, surveyFee: 526, pestInspectionCost: 157,
      lawyerFee: 598, titleInsuranceCost: 0.0057, recordingFees: 196, creditReportFee: 52, floodDeterminationFee: 28
    },
    'Wahkiakum County': {
      inspectionCost: 484, appraisalCost: 612, surveyFee: 561, pestInspectionCost: 168,
      lawyerFee: 638, titleInsuranceCost: 0.0058, recordingFees: 209, creditReportFee: 56, floodDeterminationFee: 30
    },
    'Walla Walla County': {
      inspectionCost: 479, appraisalCost: 606, surveyFee: 555, pestInspectionCost: 166,
      lawyerFee: 631, titleInsuranceCost: 0.0058, recordingFees: 207, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Whatcom County': {
      inspectionCost: 476, appraisalCost: 602, surveyFee: 552, pestInspectionCost: 165,
      lawyerFee: 627, titleInsuranceCost: 0.0058, recordingFees: 205, creditReportFee: 55, floodDeterminationFee: 30
    },
    'Whitman County': {
      inspectionCost: 465, appraisalCost: 588, surveyFee: 539, pestInspectionCost: 161,
      lawyerFee: 613, titleInsuranceCost: 0.0057, recordingFees: 201, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Yakima County': {
      inspectionCost: 461, appraisalCost: 582, surveyFee: 534, pestInspectionCost: 160,
      lawyerFee: 606, titleInsuranceCost: 0.0057, recordingFees: 199, creditReportFee: 53, floodDeterminationFee: 29
    },
    'Default': {
      inspectionCost: 475, appraisalCost: 600, surveyFee: 550, pestInspectionCost: 165,
      lawyerFee: 625, titleInsuranceCost: 0.006, recordingFees: 205, creditReportFee: 55, floodDeterminationFee: 30
    },
  },
  // WISCONSIN
  'WI': {
    'Adams County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Ashland County': {
      inspectionCost: 364, appraisalCost: 452, surveyFee: 355, pestInspectionCost: 136,
      lawyerFee: 608, titleInsuranceCost: 0.0053, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Barron County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 624, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Bayfield County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 378, pestInspectionCost: 145,
      lawyerFee: 647, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Brown County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Buffalo County': {
      inspectionCost: 359, appraisalCost: 445, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 599, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Burnett County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Calumet County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 611, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Chippewa County': {
      inspectionCost: 379, appraisalCost: 471, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Clark County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Columbia County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Crawford County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Dane County': {
      inspectionCost: 364, appraisalCost: 451, surveyFee: 354, pestInspectionCost: 135,
      lawyerFee: 606, titleInsuranceCost: 0.0052, recordingFees: 150, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Dodge County': {
      inspectionCost: 391, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 146,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Door County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 370, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Douglas County': {
      inspectionCost: 386, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 644, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Dunn County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Eau Claire County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Florence County': {
      inspectionCost: 369, appraisalCost: 458, surveyFee: 359, pestInspectionCost: 138,
      lawyerFee: 616, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Fond du Lac County': {
      inspectionCost: 362, appraisalCost: 449, surveyFee: 352, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Forest County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Grant County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 611, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Green County': {
      inspectionCost: 368, appraisalCost: 456, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 613, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Green Lake County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Iowa County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Iron County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Jackson County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Jefferson County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Juneau County': {
      inspectionCost: 368, appraisalCost: 457, surveyFee: 358, pestInspectionCost: 137,
      lawyerFee: 614, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Kenosha County': {
      inspectionCost: 373, appraisalCost: 462, surveyFee: 363, pestInspectionCost: 139,
      lawyerFee: 621, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Kewaunee County': {
      inspectionCost: 390, appraisalCost: 483, surveyFee: 379, pestInspectionCost: 145,
      lawyerFee: 650, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'La Crosse County': {
      inspectionCost: 377, appraisalCost: 468, surveyFee: 367, pestInspectionCost: 140,
      lawyerFee: 629, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Lafayette County': {
      inspectionCost: 379, appraisalCost: 470, surveyFee: 369, pestInspectionCost: 141,
      lawyerFee: 632, titleInsuranceCost: 0.0053, recordingFees: 156, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Langlade County': {
      inspectionCost: 370, appraisalCost: 459, surveyFee: 360, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Lincoln County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Manitowoc County': {
      inspectionCost: 380, appraisalCost: 471, surveyFee: 370, pestInspectionCost: 141,
      lawyerFee: 633, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Marathon County': {
      inspectionCost: 372, appraisalCost: 461, surveyFee: 362, pestInspectionCost: 139,
      lawyerFee: 620, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Marinette County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 611, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Marquette County': {
      inspectionCost: 369, appraisalCost: 457, surveyFee: 359, pestInspectionCost: 137,
      lawyerFee: 615, titleInsuranceCost: 0.0053, recordingFees: 152, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Menominee County': {
      inspectionCost: 384, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Milwaukee County': {
      inspectionCost: 360, appraisalCost: 447, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 601, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Monroe County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Oconto County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Oneida County': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 626, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Outagamie County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 379, pestInspectionCost: 145,
      lawyerFee: 650, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Ozaukee County': {
      inspectionCost: 367, appraisalCost: 455, surveyFee: 357, pestInspectionCost: 137,
      lawyerFee: 612, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Pepin County': {
      inspectionCost: 360, appraisalCost: 447, surveyFee: 351, pestInspectionCost: 134,
      lawyerFee: 601, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Pierce County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 352, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Polk County': {
      inspectionCost: 387, appraisalCost: 480, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Portage County': {
      inspectionCost: 381, appraisalCost: 472, surveyFee: 371, pestInspectionCost: 142,
      lawyerFee: 635, titleInsuranceCost: 0.0053, recordingFees: 157, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Price County': {
      inspectionCost: 384, appraisalCost: 477, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 641, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Racine County': {
      inspectionCost: 392, appraisalCost: 486, surveyFee: 382, pestInspectionCost: 146,
      lawyerFee: 654, titleInsuranceCost: 0.0053, recordingFees: 162, creditReportFee: 48, floodDeterminationFee: 25
    },
    'Richland County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Rock County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Rusk County': {
      inspectionCost: 356, appraisalCost: 441, surveyFee: 346, pestInspectionCost: 133,
      lawyerFee: 593, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Sauk County': {
      inspectionCost: 357, appraisalCost: 443, surveyFee: 347, pestInspectionCost: 133,
      lawyerFee: 595, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Sawyer County': {
      inspectionCost: 360, appraisalCost: 446, surveyFee: 350, pestInspectionCost: 134,
      lawyerFee: 600, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Shawano County': {
      inspectionCost: 372, appraisalCost: 461, surveyFee: 362, pestInspectionCost: 139,
      lawyerFee: 620, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Sheboygan County': {
      inspectionCost: 357, appraisalCost: 443, surveyFee: 347, pestInspectionCost: 133,
      lawyerFee: 595, titleInsuranceCost: 0.0052, recordingFees: 147, creditReportFee: 43, floodDeterminationFee: 22
    },
    'St. Croix County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 379, pestInspectionCost: 145,
      lawyerFee: 650, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Taylor County': {
      inspectionCost: 388, appraisalCost: 481, surveyFee: 377, pestInspectionCost: 144,
      lawyerFee: 646, titleInsuranceCost: 0.0053, recordingFees: 160, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Trempealeau County': {
      inspectionCost: 361, appraisalCost: 448, surveyFee: 352, pestInspectionCost: 135,
      lawyerFee: 603, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Vernon County': {
      inspectionCost: 366, appraisalCost: 454, surveyFee: 356, pestInspectionCost: 136,
      lawyerFee: 611, titleInsuranceCost: 0.0053, recordingFees: 151, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Vilas County': {
      inspectionCost: 362, appraisalCost: 449, surveyFee: 352, pestInspectionCost: 135,
      lawyerFee: 604, titleInsuranceCost: 0.0052, recordingFees: 149, creditReportFee: 44, floodDeterminationFee: 23
    },
    'Walworth County': {
      inspectionCost: 387, appraisalCost: 479, surveyFee: 376, pestInspectionCost: 144,
      lawyerFee: 645, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Washburn County': {
      inspectionCost: 374, appraisalCost: 464, surveyFee: 364, pestInspectionCost: 139,
      lawyerFee: 623, titleInsuranceCost: 0.0053, recordingFees: 154, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Washington County': {
      inspectionCost: 376, appraisalCost: 466, surveyFee: 366, pestInspectionCost: 140,
      lawyerFee: 627, titleInsuranceCost: 0.0053, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
    'Waukesha County': {
      inspectionCost: 390, appraisalCost: 484, surveyFee: 380, pestInspectionCost: 145,
      lawyerFee: 651, titleInsuranceCost: 0.0053, recordingFees: 161, creditReportFee: 47, floodDeterminationFee: 25
    },
    'Waupaca County': {
      inspectionCost: 384, appraisalCost: 476, surveyFee: 374, pestInspectionCost: 143,
      lawyerFee: 640, titleInsuranceCost: 0.0053, recordingFees: 158, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Waushara County': {
      inspectionCost: 370, appraisalCost: 459, surveyFee: 360, pestInspectionCost: 138,
      lawyerFee: 618, titleInsuranceCost: 0.0053, recordingFees: 153, creditReportFee: 45, floodDeterminationFee: 23
    },
    'Winnebago County': {
      inspectionCost: 385, appraisalCost: 478, surveyFee: 375, pestInspectionCost: 144,
      lawyerFee: 643, titleInsuranceCost: 0.0053, recordingFees: 159, creditReportFee: 47, floodDeterminationFee: 24
    },
    'Wood County': {
      inspectionCost: 358, appraisalCost: 445, surveyFee: 349, pestInspectionCost: 133,
      lawyerFee: 598, titleInsuranceCost: 0.0052, recordingFees: 148, creditReportFee: 44, floodDeterminationFee: 22
    },
    'Default': {
      inspectionCost: 375, appraisalCost: 465, surveyFee: 365, pestInspectionCost: 140,
      lawyerFee: 625, titleInsuranceCost: 0.0055, recordingFees: 155, creditReportFee: 46, floodDeterminationFee: 24
    },
  },
  // WEST VIRGINIA
  'WV': {
    'Barbour County': {
      inspectionCost: 349, appraisalCost: 426, surveyFee: 339, pestInspectionCost: 116,
      lawyerFee: 557, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Berkeley County': {
      inspectionCost: 343, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 114,
      lawyerFee: 549, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Boone County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 121,
      lawyerFee: 581, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Braxton County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 363, pestInspectionCost: 124,
      lawyerFee: 597, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 20
    },
    'Brooke County': {
      inspectionCost: 343, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 114,
      lawyerFee: 549, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Cabell County': {
      inspectionCost: 365, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 121,
      lawyerFee: 584, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Calhoun County': {
      inspectionCost: 370, appraisalCost: 452, surveyFee: 360, pestInspectionCost: 123,
      lawyerFee: 591, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 20
    },
    'Clay County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 114,
      lawyerFee: 550, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Doddridge County': {
      inspectionCost: 356, appraisalCost: 435, surveyFee: 346, pestInspectionCost: 118,
      lawyerFee: 568, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Fayette County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 117,
      lawyerFee: 561, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Gilmer County': {
      inspectionCost: 371, appraisalCost: 454, surveyFee: 361, pestInspectionCost: 123,
      lawyerFee: 593, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 20
    },
    'Grant County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 117,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Greenbrier County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 122,
      lawyerFee: 585, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Hampshire County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 117,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Hancock County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 122,
      lawyerFee: 585, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Hardy County': {
      inspectionCost: 347, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 115,
      lawyerFee: 555, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Harrison County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 116,
      lawyerFee: 556, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Jackson County': {
      inspectionCost: 358, appraisalCost: 437, surveyFee: 348, pestInspectionCost: 119,
      lawyerFee: 572, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Jefferson County': {
      inspectionCost: 361, appraisalCost: 441, surveyFee: 351, pestInspectionCost: 120,
      lawyerFee: 577, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Kanawha County': {
      inspectionCost: 359, appraisalCost: 439, surveyFee: 349, pestInspectionCost: 119,
      lawyerFee: 574, titleInsuranceCost: 0.0053, recordingFees: 129, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Lewis County': {
      inspectionCost: 349, appraisalCost: 427, surveyFee: 340, pestInspectionCost: 116,
      lawyerFee: 558, titleInsuranceCost: 0.0052, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Lincoln County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 121,
      lawyerFee: 583, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Logan County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 117,
      lawyerFee: 563, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Marion County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 121,
      lawyerFee: 581, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Marshall County': {
      inspectionCost: 352, appraisalCost: 430, surveyFee: 342, pestInspectionCost: 117,
      lawyerFee: 562, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Mason County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 122,
      lawyerFee: 584, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 20
    },
    'McDowell County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 364, pestInspectionCost: 124,
      lawyerFee: 598, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 20
    },
    'Mercer County': {
      inspectionCost: 365, appraisalCost: 447, surveyFee: 355, pestInspectionCost: 121,
      lawyerFee: 584, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Mineral County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 334, pestInspectionCost: 114,
      lawyerFee: 550, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Mingo County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 122,
      lawyerFee: 588, titleInsuranceCost: 0.0053, recordingFees: 133, creditReportFee: 43, floodDeterminationFee: 20
    },
    'Monongalia County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 345, pestInspectionCost: 118,
      lawyerFee: 566, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Monroe County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 120,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Morgan County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 354, pestInspectionCost: 121,
      lawyerFee: 583, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Nicholas County': {
      inspectionCost: 362, appraisalCost: 442, surveyFee: 352, pestInspectionCost: 120,
      lawyerFee: 578, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Ohio County': {
      inspectionCost: 366, appraisalCost: 447, surveyFee: 356, pestInspectionCost: 122,
      lawyerFee: 585, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Pendleton County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 338, pestInspectionCost: 116,
      lawyerFee: 556, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Pleasants County': {
      inspectionCost: 363, appraisalCost: 444, surveyFee: 353, pestInspectionCost: 121,
      lawyerFee: 580, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Pocahontas County': {
      inspectionCost: 347, appraisalCost: 424, surveyFee: 337, pestInspectionCost: 115,
      lawyerFee: 554, titleInsuranceCost: 0.0052, recordingFees: 125, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Preston County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 341, pestInspectionCost: 117,
      lawyerFee: 561, titleInsuranceCost: 0.0053, recordingFees: 126, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Putnam County': {
      inspectionCost: 366, appraisalCost: 448, surveyFee: 356, pestInspectionCost: 122,
      lawyerFee: 585, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Raleigh County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 347, pestInspectionCost: 119,
      lawyerFee: 570, titleInsuranceCost: 0.0053, recordingFees: 128, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Randolph County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 343, pestInspectionCost: 117,
      lawyerFee: 563, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Ritchie County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 114,
      lawyerFee: 550, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Roane County': {
      inspectionCost: 343, appraisalCost: 420, surveyFee: 334, pestInspectionCost: 114,
      lawyerFee: 549, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Summers County': {
      inspectionCost: 368, appraisalCost: 450, surveyFee: 358, pestInspectionCost: 122,
      lawyerFee: 588, titleInsuranceCost: 0.0053, recordingFees: 132, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Taylor County': {
      inspectionCost: 372, appraisalCost: 455, surveyFee: 362, pestInspectionCost: 124,
      lawyerFee: 595, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 20
    },
    'Tucker County': {
      inspectionCost: 362, appraisalCost: 443, surveyFee: 352, pestInspectionCost: 120,
      lawyerFee: 579, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Tyler County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 354, pestInspectionCost: 121,
      lawyerFee: 582, titleInsuranceCost: 0.0053, recordingFees: 131, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Upshur County': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 120,
      lawyerFee: 576, titleInsuranceCost: 0.0053, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 20
    },
    'Wayne County': {
      inspectionCost: 371, appraisalCost: 453, surveyFee: 360, pestInspectionCost: 123,
      lawyerFee: 592, titleInsuranceCost: 0.0053, recordingFees: 134, creditReportFee: 43, floodDeterminationFee: 20
    },
    'Webster County': {
      inspectionCost: 376, appraisalCost: 459, surveyFee: 365, pestInspectionCost: 125,
      lawyerFee: 600, titleInsuranceCost: 0.0053, recordingFees: 135, creditReportFee: 43, floodDeterminationFee: 20
    },
    'Wetzel County': {
      inspectionCost: 345, appraisalCost: 421, surveyFee: 335, pestInspectionCost: 115,
      lawyerFee: 551, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Wirt County': {
      inspectionCost: 353, appraisalCost: 432, surveyFee: 343, pestInspectionCost: 117,
      lawyerFee: 564, titleInsuranceCost: 0.0053, recordingFees: 127, creditReportFee: 41, floodDeterminationFee: 19
    },
    'Wood County': {
      inspectionCost: 344, appraisalCost: 421, surveyFee: 334, pestInspectionCost: 114,
      lawyerFee: 550, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Wyoming County': {
      inspectionCost: 343, appraisalCost: 419, surveyFee: 333, pestInspectionCost: 114,
      lawyerFee: 548, titleInsuranceCost: 0.0052, recordingFees: 124, creditReportFee: 40, floodDeterminationFee: 19
    },
    'Default': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 350, pestInspectionCost: 120,
      lawyerFee: 575, titleInsuranceCost: 0.0055, recordingFees: 130, creditReportFee: 42, floodDeterminationFee: 20
    },
  },
  // WYOMING
  'WY': {
    'Albany County': {
      inspectionCost: 349, appraisalCost: 426, surveyFee: 426, pestInspectionCost: 97,
      lawyerFee: 412, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Big Horn County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 97,
      lawyerFee: 414, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Campbell County': {
      inspectionCost: 374, appraisalCost: 457, surveyFee: 457, pestInspectionCost: 104,
      lawyerFee: 442, titleInsuranceCost: 0.0049, recordingFees: 161, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Carbon County': {
      inspectionCost: 342, appraisalCost: 418, surveyFee: 418, pestInspectionCost: 95,
      lawyerFee: 404, titleInsuranceCost: 0.0048, recordingFees: 147, creditReportFee: 39, floodDeterminationFee: 20
    },
    'Converse County': {
      inspectionCost: 345, appraisalCost: 422, surveyFee: 422, pestInspectionCost: 96,
      lawyerFee: 408, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Crook County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 433, pestInspectionCost: 98,
      lawyerFee: 419, titleInsuranceCost: 0.0049, recordingFees: 152, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Fremont County': {
      inspectionCost: 369, appraisalCost: 451, surveyFee: 451, pestInspectionCost: 102,
      lawyerFee: 436, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Goshen County': {
      inspectionCost: 348, appraisalCost: 425, surveyFee: 425, pestInspectionCost: 96,
      lawyerFee: 411, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Hot Springs County': {
      inspectionCost: 354, appraisalCost: 433, surveyFee: 433, pestInspectionCost: 98,
      lawyerFee: 418, titleInsuranceCost: 0.0049, recordingFees: 152, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Johnson County': {
      inspectionCost: 367, appraisalCost: 449, surveyFee: 449, pestInspectionCost: 102,
      lawyerFee: 434, titleInsuranceCost: 0.0049, recordingFees: 158, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Laramie County': {
      inspectionCost: 349, appraisalCost: 426, surveyFee: 426, pestInspectionCost: 97,
      lawyerFee: 412, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Lincoln County': {
      inspectionCost: 365, appraisalCost: 446, surveyFee: 446, pestInspectionCost: 101,
      lawyerFee: 430, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Natrona County': {
      inspectionCost: 374, appraisalCost: 458, surveyFee: 458, pestInspectionCost: 104,
      lawyerFee: 442, titleInsuranceCost: 0.0049, recordingFees: 161, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Niobrara County': {
      inspectionCost: 370, appraisalCost: 453, surveyFee: 453, pestInspectionCost: 103,
      lawyerFee: 437, titleInsuranceCost: 0.0049, recordingFees: 159, creditReportFee: 43, floodDeterminationFee: 22
    },
    'Park County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 97,
      lawyerFee: 415, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Platte County': {
      inspectionCost: 351, appraisalCost: 429, surveyFee: 429, pestInspectionCost: 97,
      lawyerFee: 414, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Sheridan County': {
      inspectionCost: 350, appraisalCost: 428, surveyFee: 428, pestInspectionCost: 97,
      lawyerFee: 413, titleInsuranceCost: 0.0049, recordingFees: 150, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Sublette County': {
      inspectionCost: 356, appraisalCost: 435, surveyFee: 435, pestInspectionCost: 98,
      lawyerFee: 420, titleInsuranceCost: 0.0049, recordingFees: 153, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Sweetwater County': {
      inspectionCost: 344, appraisalCost: 420, surveyFee: 420, pestInspectionCost: 95,
      lawyerFee: 406, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Teton County': {
      inspectionCost: 364, appraisalCost: 445, surveyFee: 445, pestInspectionCost: 101,
      lawyerFee: 430, titleInsuranceCost: 0.0049, recordingFees: 157, creditReportFee: 42, floodDeterminationFee: 22
    },
    'Uinta County': {
      inspectionCost: 352, appraisalCost: 431, surveyFee: 431, pestInspectionCost: 98,
      lawyerFee: 416, titleInsuranceCost: 0.0049, recordingFees: 151, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Washakie County': {
      inspectionCost: 357, appraisalCost: 436, surveyFee: 436, pestInspectionCost: 99,
      lawyerFee: 422, titleInsuranceCost: 0.0049, recordingFees: 153, creditReportFee: 41, floodDeterminationFee: 21
    },
    'Weston County': {
      inspectionCost: 343, appraisalCost: 420, surveyFee: 420, pestInspectionCost: 95,
      lawyerFee: 405, titleInsuranceCost: 0.0049, recordingFees: 148, creditReportFee: 40, floodDeterminationFee: 21
    },
    'Default': {
      inspectionCost: 360, appraisalCost: 440, surveyFee: 440, pestInspectionCost: 100,
      lawyerFee: 425, titleInsuranceCost: 0.0051, recordingFees: 155, creditReportFee: 42, floodDeterminationFee: 22
    },
  },
};

/**
 * Get 3rd party costs for a specific county (NORMAL version)
 * Falls back to state default if county not found
 */
export const getCountyThirdPartyCosts = (state: string, county?: string): CountyLevelCosts => {
  const stateCosts = COUNTY_THIRD_PARTY_COSTS[state];
  
  // National average fallback (all 9 fields)
  const nationalAverage: CountyLevelCosts = {
    inspectionCost: 360,
    appraisalCost: 460,
    surveyFee: 420,
    pestInspectionCost: 120,
    lawyerFee: 500,
    titleInsuranceCost: 0.0052,
    recordingFees: 140,
    creditReportFee: 45,
    floodDeterminationFee: 24,
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

/**
 * Get a breakdown label for a specific cost
 */
export const getCostLabel = (key: keyof CountyLevelCosts): string => {
  const labels: Record<keyof CountyLevelCosts, string> = {
    inspectionCost: 'Home Inspection',
    appraisalCost: 'Appraisal',
    surveyFee: 'Survey',
    pestInspectionCost: 'Pest Inspection',
    lawyerFee: 'Attorney/Closing',
    titleInsuranceCost: 'Title Insurance (%)',
    recordingFees: 'Recording Fees',
    creditReportFee: 'Credit Report',
    floodDeterminationFee: 'Flood Determination',
  };
  return labels[key];
};
