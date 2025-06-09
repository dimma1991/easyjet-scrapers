const express = require('express');
const bodyParser = require('('body-parser');
const cors = require('cors');
const { scrapeEasyJetPrice } = require('./scraper/easyjetScraper');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/easyjet', async (req, res) => {
  const { origin, destination, date } = req.body;
  try {
    const result = await scrapeEasyJetPrice(origin, destination, date);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch EasyJet data' });
  }
});

app.get('/', (_, res) => {
  res.send('EasyJet Scraper API is running ✅');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));