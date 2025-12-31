# Recover Missing Deals

If you're missing a deal, it might still be in your browser's localStorage. Here's how to check:

## Method 1: Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Paste and run this code:

```javascript
// Check for all saved deals
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
      console.log(`  Full deal:`, deal);
    });
  } catch (e) {
    console.error(`Error parsing ${key}:`, e);
  }
});
```

## Method 2: Check Application Storage

1. Open Developer Tools (F12)
2. Go to the Application tab (Chrome) or Storage tab (Firefox)
3. Expand "Local Storage"
4. Look for keys starting with `zsrehab_deals_`
5. Click on the key for your username
6. You should see all saved deals as JSON

## What Was Fixed

The issue was that when saving a deal, if another deal had the same address, it would overwrite the existing deal instead of creating a new one. This has been fixed - now every save creates a new deal, so you won't lose deals by accident.

