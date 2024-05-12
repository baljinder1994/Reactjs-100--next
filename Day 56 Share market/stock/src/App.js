import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

const API_KEY = 'YOUR API KEY';
const STOCK_SYMBOLS = ['AAPL', 'GOOGL', 'MSFT', 'AMZN']; // Example stock symbols
const API_URL_PREFIX = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&apikey=${API_KEY}&symbol=`;

const StockCard = ({ stock }) => {
  return (
    <div className="stock-card">
      <h3>{stock.symbol}</h3>
      <p>Company: {stock.companyName}</p>
      <p>Price: ${stock.price}</p>
      <p>Volume: {stock.volume}</p>
      <p>Open Price: ${stock.openPrice}</p>
      <p>Close Price: ${stock.closePrice}</p>
      <p>High Price: ${stock.highPrice}</p>
      <p>Low Price: ${stock.lowPrice}</p>
    </div>
  );
};

const StockList = ({ stocks }) => {
  return (
    <div className="stock-list">
      {stocks.map((stock, index) => (
        <StockCard key={index} stock={stock} />
      ))}
    </div>
  );
};

const StockMarketTracker = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const promises = STOCK_SYMBOLS.map(async (symbol) => {
        try {
          const response = await axios.get(API_URL_PREFIX + symbol);
          const data = response.data['Global Quote'];
          if (data) {
            return {
              symbol: symbol.toUpperCase(),
              companyName: 'Company Name', // You can fetch this data from another API if available
              price: parseFloat(data['05. price']).toFixed(2),
              volume: parseInt(data['06. volume']),
              openPrice: parseFloat(data['02. open']).toFixed(2),
              closePrice: parseFloat(data['08. previous close']).toFixed(2),
              highPrice: parseFloat(data['03. high']).toFixed(2),
              lowPrice: parseFloat(data['04. low']).toFixed(2)
            };
          } else {
            console.error('Stock data not found for symbol:', symbol);
            return null;
          }
        } catch (error) {
          console.error('Error fetching stock data:', error);
          return null;
        }
      });

      const stocksData = await Promise.all(promises);
      setStocks(stocksData.filter((stock) => stock !== null));
    };

    fetchStockData();
  }, []);

  return (
    <div className="stock-market-tracker">
      <h1>Stock Market Tracker</h1>
      <StockList stocks={stocks} />
    </div>
  );
};

export default StockMarketTracker;
