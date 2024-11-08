// src/api/cryptoApi.js
export const fetchCryptocurrencyData = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr");
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    return [];
  }
};
