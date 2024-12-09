let previousData = [];
const list = [
  'eur-usd', 'gbp-usd', 'usd-jpy',
  'usd-chf', 'aud-usd', 'usd-cad',
  'nzd-usd', 'usd-try', 'usd-inr',
  'usd-krw', 'usd-brl'
]; 

const flags = [
  '\uD83C\uDDEA\uD83C\uDDFA', // EU 🇪🇺 v
  '\uD83C\uDDEC\uD83C\uDDE7', // UK 🇬🇧 v
  '\uD83C\uDDEF\uD83C\uDDF5', // Japan 🇯🇵 v
  '\uD83C\uDDE8\uD83C\uDDED', // Switzerland 🇨🇭 v
  '\uD83C\uDDE6\uD83C\uDDFA', // Australia 🇦🇺 v
  '\uD83C\uDDE8\uD83C\uDDE6', // Canada 🇨🇦 
  '\uD83C\uDDF3\uD83C\uDDFF', // New Zealand 🇳🇿 v
  '\uD83C\uDDF9\uD83C\uDDF7', // Turkey 🇹🇷 v
  '\uD83C\uDDEE\uD83C\uDDF3', // India 🇮🇳 v 
  '\uD83C\uDDF0\uD83C\uDDF7', // South Korea 🇰🇷 
  '\uD83C\uDDE7\uD83C\uDDF7', // Brazil 🇧🇷 v
];


// Function to fetch currency data and update the table
async function fetchCurrencyData() {
  try {
    const response = await fetch('/api/currency-data');
    if (!response.ok) throw new Error('Failed to fetch currency data');
    const data = await response.json(); // Expecting an array of objects

    updateTable(data); // Update the table with the received data
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to update the table with fetched data
function updateTable(data) {
  const tableBody = document.getElementById('currencyTableBody');
  tableBody.innerHTML = ''; // Clear the existing table rows

  data.forEach((item, index) => {
    const row = document.createElement('tr');

    // Determine the style based on price change
    const rowColor =
      item.price_close < item.price_open
        ? 'color: #007C32; font-weight: bold;'
        : item.price_close > item.price_open
        ? 'color: #ff0000; font-weight: bold;'
        : 'color: grey; font-weight: bold;';

    const opencolor =
      item.price_open < item.price_open
          ? 'color: #007C32; font-weight: bold;'
          : item.price_open > item.price_open
          ? 'color: #ff0000; font-weight: bold;'
          : 'color: grey; font-weight: bold;';

    const closecolor =
    item.price_close < item.price_close
        ? 'color: #007C32; font-weight: bold;'
        : item.price_close > item.price_close
        ? 'color: #ff0000; font-weight: bold;'
        : 'color: grey; font-weight: bold;';
  
        
    const highcolor =
    item.price_high < item.price_high
        ? 'color: #007C32; font-weight: bold;'
        : item.price_high > item.price_high
        ? 'color: #ff0000; font-weight: bold;'
        : 'color: grey; font-weight: bold;';

    const lowcolor =
    item.price_low < item.price_low
        ? 'color: #007C32; font-weight: bold;'
        : item.price_low > item.price_low
        ? 'color: #ff0000; font-weight: bold;'
        : 'color: grey; font-weight: bold;';
  
    const valuecolor =
    item.value < item.value
        ? 'color: #007C32; font-weight: bold;'
        : item.value > item.value
        ? 'color: #ff0000; font-weight: bold;'
        : 'color: grey; font-weight: bold;';


    row.innerHTML = `
      <td>${index+1}</td>
      <td style="${rowColor}">${item.price_open}</td>
      <td style="${rowColor}">${item.price_high}</td>
      <td style="${rowColor}">${item.price_low}</td>
      <td style="${rowColor}">${item.price_close}</td>
      <td style="${rowColor}">${item.value}</td>
      <td>${new Date(item.date).toLocaleString()}</td>
    `;

    tableBody.appendChild(row);
  });
}

function updateTime() {
  const currentTime = new Date().toLocaleTimeString(); // Get local time as a string
  document.getElementById("time").innerHTML = currentTime; // Display the time
}

// Call updateTime every second
setInterval(updateTime, 1000);


// Fetch data every 30 seconds
fetchCurrencyData(); // Initial fetch
setInterval(fetchCurrencyData, 30000); // Repeat every 30 seconds
