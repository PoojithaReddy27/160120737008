const axios = require('axios');

const app = express();
const PORT = 8008;

// Function to fetch numbers from a given URL with a timeout
async function fetchNumbersFromURL(url) {
  try {
    const response = await Promise.race([
      axios.get(url),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Request timeout')), 500))
    ]);
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers from ${url}: ${error.message}`);
    return [];
  }
}

// API endpoint to handle the list of URLs
app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!Array.isArray(url)) {
    return res.status(400).json({ error: 'URL parameter must be an array' });
  }

  try {
    const requests = url.map((link) => fetchNumbersFromURL(link));
    const responses = await Promise.allSettled(requests);

    let numbers = [];
    responses.forEach((response) => {
      if (response.status === 'fulfilled') {
        numbers = numbers.concat(response.value);
      }
    });

    numbers = [...new Set(numbers)].sort((a, b) => a - b);
    return res.json({ numbers });
  } catch (error) {
    console.error('Error processing URLs:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});