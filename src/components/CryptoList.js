// src/components/CryptoList.js
import React from "react";
import "./CryptoList.css";

const CryptoList = ({ cryptos }) => {
  const getDetail = (cryptoName) => {
    const formattedName = cryptoName.toLowerCase().replace(/\s+/g, "-");
    const url = `https://coinmarketcap.com/currencies/${formattedName}/`;
    window.open(url, "_blank");
  };

  return (
    <div className="crypto-list">
      {cryptos.map((crypto) => (
        <div
          className="crypto-card"
          key={crypto.id}
          onClick={() => getDetail(crypto.name)}
        >
          <img src={crypto.image} alt={crypto.name} className="crypto-logo" />
          <h2>{crypto.name}</h2>
          <p>Market Cap: ₹{crypto.market_cap.toLocaleString()}</p>
          <p>Price: ₹{crypto.current_price}</p>
          <p>Availability: {crypto.circulating_supply.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default CryptoList;
