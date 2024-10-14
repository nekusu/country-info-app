const express = require('express');
const app = express();
require('dotenv').config();

app.get('/api/countries', async (req, res) => {
  try {
    const response = await fetch(`${process.env.NAGER_DATE_API_URL}/AvailableCountries`);
    if (!response.ok) throw new Error('Could not fetch data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/api/countries/:countryCode', async (req, res) => {
  try {
    const response = await fetch(`${process.env.NAGER_DATE_API_URL}/CountryInfo/${req.params.countryCode}`);
    if (!response.ok) throw new Error('Could not fetch data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/api/flags', async (req, res) => {
  try {
    const response = await fetch(`${process.env.COUNTRIES_NOW_API_URL}/countries/flag/images`);
    if (!response.ok) throw new Error('Could not fetch data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.get('/api/population', async (req, res) => {
  try {
    const response = await fetch(`${process.env.COUNTRIES_NOW_API_URL}/countries/population`);
    if (!response.ok) throw new Error('Could not fetch data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(5000, () => console.log('Server started on port 5000'));
