/**
 * Pennsylvania Title Insurance Rate Table
 * Source: https://www.alphaadv.net/patitle/parate25.html
 * Effective: May 1, 2016
 * 
 * Rates are for SALE transactions (all-inclusive rates)
 */

interface RateRange {
  min: number;
  max: number;
  saleRate: number;
}

// Pennsylvania Title Insurance Rate Table for amounts over $250,000
// For sale transactions
const PA_TITLE_RATES_OVER_250K: RateRange[] = [
  { min: 0, max: 30000, saleRate: 569.00 },
  { min: 30000.01, max: 31000, saleRate: 576.41 },
  { min: 31000.01, max: 32000, saleRate: 583.82 },
  { min: 32000.01, max: 33000, saleRate: 591.23 },
  { min: 33000.01, max: 34000, saleRate: 598.64 },
  { min: 34000.01, max: 35000, saleRate: 606.05 },
  { min: 35000.01, max: 36000, saleRate: 613.46 },
  { min: 36000.01, max: 37000, saleRate: 620.87 },
  { min: 37000.01, max: 38000, saleRate: 628.28 },
  { min: 38000.01, max: 39000, saleRate: 635.69 },
  { min: 39000.01, max: 40000, saleRate: 643.10 },
  { min: 40000.01, max: 41000, saleRate: 650.51 },
  { min: 41000.01, max: 42000, saleRate: 657.92 },
  { min: 42000.01, max: 43000, saleRate: 665.33 },
  { min: 43000.01, max: 44000, saleRate: 672.74 },
  { min: 44000.01, max: 45000, saleRate: 680.15 },
  { min: 45000.01, max: 46000, saleRate: 686.42 },
  { min: 46000.01, max: 47000, saleRate: 692.69 },
  { min: 47000.01, max: 48000, saleRate: 698.96 },
  { min: 48000.01, max: 49000, saleRate: 705.23 },
  { min: 49000.01, max: 50000, saleRate: 711.50 },
  { min: 50000.01, max: 51000, saleRate: 717.77 },
  { min: 51000.01, max: 52000, saleRate: 724.04 },
  { min: 52000.01, max: 53000, saleRate: 730.31 },
  { min: 53000.01, max: 54000, saleRate: 736.58 },
  { min: 54000.01, max: 55000, saleRate: 742.85 },
  { min: 55000.01, max: 56000, saleRate: 749.12 },
  { min: 56000.01, max: 57000, saleRate: 755.39 },
  { min: 57000.01, max: 58000, saleRate: 761.66 },
  { min: 58000.01, max: 59000, saleRate: 767.93 },
  { min: 59000.01, max: 60000, saleRate: 774.20 },
  { min: 60000.01, max: 61000, saleRate: 780.47 },
  { min: 61000.01, max: 62000, saleRate: 786.74 },
  { min: 62000.01, max: 63000, saleRate: 793.01 },
  { min: 63000.01, max: 64000, saleRate: 799.28 },
  { min: 64000.01, max: 65000, saleRate: 805.55 },
  { min: 65000.01, max: 66000, saleRate: 811.82 },
  { min: 66000.01, max: 67000, saleRate: 818.09 },
  { min: 67000.01, max: 68000, saleRate: 824.36 },
  { min: 68000.01, max: 69000, saleRate: 830.63 },
  { min: 69000.01, max: 70000, saleRate: 836.90 },
  { min: 70000.01, max: 71000, saleRate: 843.17 },
  { min: 71000.01, max: 72000, saleRate: 849.44 },
  { min: 72000.01, max: 73000, saleRate: 855.71 },
  { min: 73000.01, max: 74000, saleRate: 861.98 },
  { min: 74000.01, max: 75000, saleRate: 868.25 },
  { min: 75000.01, max: 76000, saleRate: 874.52 },
  { min: 76000.01, max: 77000, saleRate: 880.79 },
  { min: 77000.01, max: 78000, saleRate: 887.06 },
  { min: 78000.01, max: 79000, saleRate: 893.33 },
  { min: 79000.01, max: 80000, saleRate: 899.60 },
  { min: 80000.01, max: 81000, saleRate: 905.87 },
  { min: 81000.01, max: 82000, saleRate: 912.14 },
  { min: 82000.01, max: 83000, saleRate: 918.41 },
  { min: 83000.01, max: 84000, saleRate: 924.68 },
  { min: 84000.01, max: 85000, saleRate: 930.95 },
  { min: 85000.01, max: 86000, saleRate: 937.22 },
  { min: 86000.01, max: 87000, saleRate: 943.49 },
  { min: 87000.01, max: 88000, saleRate: 949.76 },
  { min: 88000.01, max: 89000, saleRate: 956.03 },
  { min: 89000.01, max: 90000, saleRate: 962.30 },
  { min: 90000.01, max: 91000, saleRate: 968.57 },
  { min: 91000.01, max: 92000, saleRate: 974.84 },
  { min: 92000.01, max: 93000, saleRate: 981.11 },
  { min: 93000.01, max: 94000, saleRate: 987.38 },
  { min: 94000.01, max: 95000, saleRate: 993.65 },
  { min: 95000.01, max: 96000, saleRate: 999.92 },
  { min: 96000.01, max: 97000, saleRate: 1006.19 },
  { min: 97000.01, max: 98000, saleRate: 1012.46 },
  { min: 98000.01, max: 99000, saleRate: 1018.73 },
  { min: 99000.01, max: 100000, saleRate: 1025.00 },
  { min: 100000.01, max: 101000, saleRate: 1031.27 },
  { min: 101000.01, max: 102000, saleRate: 1037.54 },
  { min: 102000.01, max: 103000, saleRate: 1043.81 },
  { min: 103000.01, max: 104000, saleRate: 1050.08 },
  { min: 104000.01, max: 105000, saleRate: 1056.35 },
  { min: 105000.01, max: 106000, saleRate: 1062.62 },
  { min: 106000.01, max: 107000, saleRate: 1068.89 },
  { min: 107000.01, max: 108000, saleRate: 1075.16 },
  { min: 108000.01, max: 109000, saleRate: 1081.43 },
  { min: 109000.01, max: 110000, saleRate: 1087.70 },
  { min: 110000.01, max: 111000, saleRate: 1093.97 },
  { min: 111000.01, max: 112000, saleRate: 1100.24 },
  { min: 112000.01, max: 113000, saleRate: 1106.51 },
  { min: 113000.01, max: 114000, saleRate: 1112.78 },
  { min: 114000.01, max: 115000, saleRate: 1119.05 },
  { min: 115000.01, max: 116000, saleRate: 1125.32 },
  { min: 116000.01, max: 117000, saleRate: 1131.59 },
  { min: 117000.01, max: 118000, saleRate: 1137.86 },
  { min: 118000.01, max: 119000, saleRate: 1144.13 },
  { min: 119000.01, max: 120000, saleRate: 1150.40 },
  { min: 120000.01, max: 121000, saleRate: 1156.67 },
  { min: 121000.01, max: 122000, saleRate: 1162.94 },
  { min: 122000.01, max: 123000, saleRate: 1169.21 },
  { min: 123000.01, max: 124000, saleRate: 1175.48 },
  { min: 124000.01, max: 125000, saleRate: 1181.75 },
  { min: 125000.01, max: 126000, saleRate: 1188.02 },
  { min: 126000.01, max: 127000, saleRate: 1194.29 },
  { min: 127000.01, max: 128000, saleRate: 1200.56 },
  { min: 128000.01, max: 129000, saleRate: 1206.83 },
  { min: 129000.01, max: 130000, saleRate: 1213.10 },
  { min: 130000.01, max: 131000, saleRate: 1219.37 },
  { min: 131000.01, max: 132000, saleRate: 1225.64 },
  { min: 132000.01, max: 133000, saleRate: 1231.91 },
  { min: 133000.01, max: 134000, saleRate: 1238.18 },
  { min: 134000.01, max: 135000, saleRate: 1244.45 },
  { min: 135000.01, max: 136000, saleRate: 1250.72 },
  { min: 136000.01, max: 137000, saleRate: 1256.99 },
  { min: 137000.01, max: 138000, saleRate: 1263.26 },
  { min: 138000.01, max: 139000, saleRate: 1269.53 },
  { min: 139000.01, max: 140000, saleRate: 1275.80 },
  { min: 140000.01, max: 141000, saleRate: 1282.07 },
  { min: 141000.01, max: 142000, saleRate: 1288.34 },
  { min: 142000.01, max: 143000, saleRate: 1294.61 },
  { min: 143000.01, max: 144000, saleRate: 1300.88 },
  { min: 144000.01, max: 145000, saleRate: 1307.15 },
  { min: 145000.01, max: 146000, saleRate: 1313.42 },
  { min: 146000.01, max: 147000, saleRate: 1319.69 },
  { min: 147000.01, max: 148000, saleRate: 1325.96 },
  { min: 148000.01, max: 149000, saleRate: 1332.23 },
  { min: 149000.01, max: 150000, saleRate: 1338.50 },
  { min: 150000.01, max: 151000, saleRate: 1344.77 },
  { min: 151000.01, max: 152000, saleRate: 1351.04 },
  { min: 152000.01, max: 153000, saleRate: 1357.31 },
  { min: 153000.01, max: 154000, saleRate: 1363.58 },
  { min: 154000.01, max: 155000, saleRate: 1369.85 },
  { min: 155000.01, max: 156000, saleRate: 1376.12 },
  { min: 156000.01, max: 157000, saleRate: 1382.39 },
  { min: 157000.01, max: 158000, saleRate: 1388.66 },
  { min: 158000.01, max: 159000, saleRate: 1394.93 },
  { min: 159000.01, max: 160000, saleRate: 1401.20 },
  { min: 160000.01, max: 161000, saleRate: 1407.47 },
  { min: 161000.01, max: 162000, saleRate: 1413.74 },
  { min: 162000.01, max: 163000, saleRate: 1420.01 },
  { min: 163000.01, max: 164000, saleRate: 1426.28 },
  { min: 164000.01, max: 165000, saleRate: 1432.55 },
  { min: 165000.01, max: 166000, saleRate: 1438.82 },
  { min: 166000.01, max: 167000, saleRate: 1445.09 },
  { min: 167000.01, max: 168000, saleRate: 1451.36 },
  { min: 168000.01, max: 169000, saleRate: 1457.63 },
  { min: 169000.01, max: 170000, saleRate: 1463.90 },
  { min: 170000.01, max: 171000, saleRate: 1470.17 },
  { min: 171000.01, max: 172000, saleRate: 1476.44 },
  { min: 172000.01, max: 173000, saleRate: 1482.71 },
  { min: 173000.01, max: 174000, saleRate: 1488.98 },
  { min: 174000.01, max: 175000, saleRate: 1495.25 },
  { min: 175000.01, max: 176000, saleRate: 1501.52 },
  { min: 176000.01, max: 177000, saleRate: 1507.79 },
  { min: 177000.01, max: 178000, saleRate: 1514.06 },
  { min: 178000.01, max: 179000, saleRate: 1520.33 },
  { min: 179000.01, max: 180000, saleRate: 1526.60 },
  { min: 180000.01, max: 181000, saleRate: 1532.87 },
  { min: 181000.01, max: 182000, saleRate: 1539.14 },
  { min: 182000.01, max: 183000, saleRate: 1545.41 },
  { min: 183000.01, max: 184000, saleRate: 1551.68 },
  { min: 184000.01, max: 185000, saleRate: 1557.95 },
  { min: 185000.01, max: 186000, saleRate: 1564.22 },
  { min: 186000.01, max: 187000, saleRate: 1570.49 },
  { min: 187000.01, max: 188000, saleRate: 1576.76 },
  { min: 188000.01, max: 189000, saleRate: 1583.03 },
  { min: 189000.01, max: 190000, saleRate: 1589.30 },
  { min: 190000.01, max: 191000, saleRate: 1595.57 },
  { min: 191000.01, max: 192000, saleRate: 1601.84 },
  { min: 192000.01, max: 193000, saleRate: 1608.11 },
  { min: 193000.01, max: 194000, saleRate: 1614.38 },
  { min: 194000.01, max: 195000, saleRate: 1620.65 },
  { min: 195000.01, max: 196000, saleRate: 1626.92 },
  { min: 196000.01, max: 197000, saleRate: 1633.19 },
  { min: 197000.01, max: 198000, saleRate: 1639.46 },
  { min: 198000.01, max: 199000, saleRate: 1645.73 },
  { min: 199000.01, max: 200000, saleRate: 1652.00 },
  { min: 200000.01, max: 201000, saleRate: 1658.27 },
  { min: 201000.01, max: 202000, saleRate: 1664.54 },
  { min: 202000.01, max: 203000, saleRate: 1670.81 },
  { min: 203000.01, max: 204000, saleRate: 1677.08 },
  { min: 204000.01, max: 205000, saleRate: 1683.35 },
  { min: 205000.01, max: 206000, saleRate: 1689.62 },
  { min: 206000.01, max: 207000, saleRate: 1695.89 },
  { min: 207000.01, max: 208000, saleRate: 1702.16 },
  { min: 208000.01, max: 209000, saleRate: 1708.43 },
  { min: 209000.01, max: 210000, saleRate: 1714.70 },
  { min: 210000.01, max: 211000, saleRate: 1720.97 },
  { min: 211000.01, max: 212000, saleRate: 1727.24 },
  { min: 212000.01, max: 213000, saleRate: 1733.51 },
  { min: 213000.01, max: 214000, saleRate: 1739.78 },
  { min: 214000.01, max: 215000, saleRate: 1746.05 },
  { min: 215000.01, max: 216000, saleRate: 1752.32 },
  { min: 216000.01, max: 217000, saleRate: 1758.59 },
  { min: 217000.01, max: 218000, saleRate: 1764.86 },
  { min: 218000.01, max: 219000, saleRate: 1771.13 },
  { min: 219000.01, max: 220000, saleRate: 1777.40 },
  { min: 220000.01, max: 221000, saleRate: 1783.67 },
  { min: 221000.01, max: 222000, saleRate: 1789.94 },
  { min: 222000.01, max: 223000, saleRate: 1796.21 },
  { min: 223000.01, max: 224000, saleRate: 1802.48 },
  { min: 224000.01, max: 225000, saleRate: 1808.75 },
  { min: 225000.01, max: 226000, saleRate: 1815.02 },
  { min: 226000.01, max: 227000, saleRate: 1821.29 },
  { min: 227000.01, max: 228000, saleRate: 1827.56 },
  { min: 228000.01, max: 229000, saleRate: 1833.83 },
  { min: 229000.01, max: 230000, saleRate: 1840.10 },
  { min: 230000.01, max: 231000, saleRate: 1846.37 },
  { min: 231000.01, max: 232000, saleRate: 1852.64 },
  { min: 232000.01, max: 233000, saleRate: 1858.91 },
  { min: 233000.01, max: 234000, saleRate: 1865.18 },
  { min: 234000.01, max: 235000, saleRate: 1871.45 },
  { min: 235000.01, max: 236000, saleRate: 1877.72 },
  { min: 236000.01, max: 237000, saleRate: 1883.99 },
  { min: 237000.01, max: 238000, saleRate: 1890.26 },
  { min: 238000.01, max: 239000, saleRate: 1896.53 },
  { min: 239000.01, max: 240000, saleRate: 1902.80 },
  { min: 240000.01, max: 241000, saleRate: 1909.07 },
  { min: 241000.01, max: 242000, saleRate: 1915.34 },
  { min: 242000.01, max: 243000, saleRate: 1921.61 },
  { min: 243000.01, max: 244000, saleRate: 1927.88 },
  { min: 244000.01, max: 245000, saleRate: 1934.15 },
  { min: 245000.01, max: 246000, saleRate: 1940.42 },
  { min: 246000.01, max: 247000, saleRate: 1946.69 },
  { min: 247000.01, max: 248000, saleRate: 1952.96 },
  { min: 248000.01, max: 249000, saleRate: 1959.23 },
  { min: 249000.01, max: 250000, saleRate: 1965.50 },
];

/**
 * Calculate Pennsylvania Title Insurance cost based on total loan amount
 * Uses the official PA Title Insurance Rate Table
 * Source: https://www.alphaadv.net/patitle/parate25.html
 * @param totalLoanAmount - Purchase Price + Rehab Budget
 * @returns Title insurance cost in dollars
 */
export function calculatePATitleInsurance(totalLoanAmount: number): number {
  if (totalLoanAmount <= 0) {
    return 0;
  }

  // Use the lookup table for all amounts in the table (up to $250,000)
  // Find the range that contains the amount
  for (const range of PA_TITLE_RATES_OVER_250K) {
    if (totalLoanAmount >= range.min && totalLoanAmount <= range.max) {
      return range.saleRate;
    }
  }

  // If amount exceeds the table (over $250,000), calculate based on the pattern
  // The rate increases by approximately $6.27 per $1,000 after $250k
  // Based on the pattern from the last entries in the table
  const lastTableRate = PA_TITLE_RATES_OVER_250K[PA_TITLE_RATES_OVER_250K.length - 1].saleRate;
  const lastTableMax = PA_TITLE_RATES_OVER_250K[PA_TITLE_RATES_OVER_250K.length - 1].max;
  
  if (totalLoanAmount > lastTableMax) {
    const amountOverLastRange = totalLoanAmount - lastTableMax;
    // Calculate additional rate based on $1,000 increments
    const additionalRate = Math.ceil(amountOverLastRange / 1000) * 6.27;
    return lastTableRate + additionalRate;
  }

  // Fallback (should not reach here, but just in case)
  return 0;
}

