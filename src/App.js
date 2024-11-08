// src/App.js
import React, { useState, useEffect } from "react";
import CryptoList from "./components/CryptoList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import { fetchCryptocurrencyData } from "./api/cryptoApi";
import "./App.css";

const App = () => {
  const [cryptos, setCryptos] = useState([]);
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCryptocurrencyData().then((data) => {
      setCryptos(data);
      setFilteredCryptos(data);
    }).catch(() => alert("Failed to load cryptocurrency data."));
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilteredCryptos(
      cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const handleFilter = (criteria) => {
    const sortedData = [...filteredCryptos].sort((a, b) =>
      criteria === "market_cap" ? b.market_cap - a.market_cap :
      criteria === "price" ? b.current_price - a.current_price :
      criteria === "availability" ? b.circulating_supply - a.circulating_supply : 0
    );
    setFilteredCryptos(sortedData);
  };

  return (
    <div className="app">
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />
      <CryptoList cryptos={filteredCryptos} />
    </div>
  );
};

export default App;
