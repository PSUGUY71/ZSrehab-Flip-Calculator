// Recovery script to check localStorage for all saved deals
// Run this in browser console to see all saved deals

console.log('=== Checking for saved deals ===');

// Check all localStorage keys that might contain deals
const allKeys = Object.keys(localStorage);
const dealKeys = allKeys.filter(key => key.startsWith('zsrehab_deals_'));

console.log(`Found ${dealKeys.length} deal storage keys:`);
dealKeys.forEach(key => {
  console.log(`\n--- ${key} ---`);
  try {
    const deals = JSON.parse(localStorage.getItem(key) || '[]');
    console.log(`Number of deals: ${deals.length}`);
    deals.forEach((deal, index) => {
      console.log(`\nDeal ${index + 1}:`);
      console.log(`  ID: ${deal.id}`);
      console.log(`  Name: ${deal.name}`);
      console.log(`  Date: ${deal.date}`);
      console.log(`  Address: ${deal.data?.address || 'N/A'}`);
    });
  } catch (e) {
    console.error(`Error parsing ${key}:`, e);
  }
});

// Also check for any backup or old format
console.log('\n=== Checking for other potential deal storage ===');
allKeys.forEach(key => {
  if (key.includes('deal') || key.includes('Deal')) {
    console.log(`Found key: ${key}`);
    try {
      const value = localStorage.getItem(key);
      if (value && value.startsWith('[')) {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].data) {
          console.log(`  Contains ${parsed.length} potential deals`);
        }
      }
    } catch (e) {
      // Ignore
    }
  }
});



