// src/components/CryptoDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCryptocurrencyData } from "../api/cryptoApi"; // Correct function name
import "./CryptoDetails.css";

const CryptoDetails = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);

  useEffect(() => {
    const getCryptoDetails = async () => {
      const data = await fetchCryptocurrencyData();
      const cryptoData = data.find((crypto) => crypto.id === id);
      setCrypto(cryptoData);
    };
    getCryptoDetails();
  }, [id]);

  if (!crypto) return <p>Loading...</p>;

  return (
    <div className="crypto-details">
      <img src={crypto.image} alt={crypto.name} className="crypto-logo-large" />
      <h1>{crypto.name}</h1>
      <p>Market Cap: ₹{crypto.market_cap.toLocaleString("en-IN")}</p>
      <p>Price: ₹{crypto.current_price.toLocaleString("en-IN")}</p>
      <p>Availability: {crypto.circulating_supply.toLocaleString("en-IN")}</p>
      <button
        className="buy-button"
        onClick={() => window.open(crypto.buy_link, "_blank")}
      >
        Buy {crypto.name}
      </button>
    </div>
  );
};

export default CryptoDetails;
