import { useEffect, useState } from 'react';

const BASE_URL_API = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

export const useCurrencyData = () => {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [usdToUah, setUsdToUah] = useState(0);
  const [eurToUah, setEurToUah] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(BASE_URL_API)
      .then(response => response.json())
      .then(currencyData => {
        const usdCurrency = currencyData.find(item => item.cc === 'USD');
        const eurCurrency = currencyData.find(item => item.cc === 'EUR');
        const rates = currencyData.reduce((acc, item) => {
          acc[item.cc] = item.rate;
          return acc;
        }, {});
        
        setCurrencyOptions(['UAH', 'USD', 'EUR']);
        setExchangeRates(rates);
        setUsdToUah(usdCurrency ? usdCurrency.rate : 0);
        setEurToUah(eurCurrency ? eurCurrency.rate : 0);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return { currencyOptions, exchangeRates, usdToUah, eurToUah, isLoading, isError };
};
