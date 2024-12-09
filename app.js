// Import external modules
const express = require('express');
const { investing } = require('investing-com-api');

const app = express();
app.use(express.static('public')); // Serve static files from the "public" folder

const currencyPairs = [
  'eur-usd', 'usd-jpy',
  'usd-chf', 'aud-usd', 'usd-cad',
  'nzd-usd', 'usd-try', 'usd-inr',
  'usd-krw'
];


// Endpoint for fetching currency data
app.get('/api/currency-data', async (req, res) => {
  try {
    const fetchCurrencyData = async(pairs) =>{
      const data = [];
      for (const pair of pairs) {
        const CurrencyData = await investing(`currencies/${pair}`, 'P1D', 'PT1M');
        const CurData = {...CurrencyData}
        data.push(CurData[287])
      }
      return data;
    };

    const lastdata = await fetchCurrencyData(currencyPairs);
    res.json(lastdata);

  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Failed to fetch currency data' });
  }
});

module.exports = app;
