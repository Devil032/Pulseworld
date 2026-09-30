const API_KEY = '2ZQ3ALSUIKBALSHH';

// शेयर का ताज़ा भाव फ़ेच करने का फ़ंक्शन
async function fetchStockQuote(symbol) {
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const quote = data['Global Quote'];
    if (!quote || Object.keys(quote).length === 0) {
      console.error('डेटा नहीं मिला या लिमिट समाप्त हो गई:', data);
      document.getElementById('stock-container').innerText = 'डेटा लोड करने में समस्या आई।';
      return;
    }

    const price = quote['05. price'];
    const change = quote['09. change'];
    const changePercent = quote['10. change percent'];

    // HTML में डेटा दिखाना
    document.getElementById('stock-symbol').innerText = symbol;
    document.getElementById('stock-price').innerText = `कीमत: $${parseFloat(price).toFixed(2)}`;
    document.getElementById('stock-change').innerText = `बदलाव: ${change} (${changePercent})`;
  } catch (error) {
    console.error('API कॉल में त्रुटि:', error);
  }
}

// डिफ़ॉल्ट रूप से IBM का डेटा लोड करें
fetchStockQuote('IBM');
