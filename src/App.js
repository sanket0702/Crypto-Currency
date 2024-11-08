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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCryptocurrencyData();
        setCryptos(data);
        setFilteredCryptos(data);
      } catch (err) {
        setError("Failed to load cryptocurrency data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
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
    const sortedData = [...filteredCryptos].sort((a, b) => {
      switch (criteria) {
        case "market_cap":
          return b.market_cap - a.market_cap;
        case "price":
          return b.current_price - a.current_price;
        case "availability":
          return b.circulating_supply - a.circulating_supply;
        default:
          return 0;
      }
    });
    setFilteredCryptos(sortedData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app">
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />
      <CryptoList cryptos={filteredCryptos} />
    </div>
  );
};

export default App;
