import { useEffect, useState } from 'react';
import './App.css';
import Currency from './components/Currency';
import Header from './components/Header';


const BASE_URL_API = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);
  const [usdToUah, setUsdToUah] = useState(0);
  const [eurToUah, setEurToUah] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleFromAmountChange = (event) => {
    setAmount(+event.target.value);
    setAmountFromCurrency(true);
  };

  const handleToAmountChange = (event) => {
    setAmount(+event.target.value);
    setAmountFromCurrency(false);
  };

  let toAmount = 0;
  let fromAmount = 0;

  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(BASE_URL_API)
      .then(response => response.json())
      .then(currencyData => {
        const usdCurrency = currencyData.find(item => item.cc === 'USD');
        const eurCurrency = currencyData.find(item => item.cc === 'EUR');
        const options = ['UAH', 'USD', 'EUR'];
        setCurrencyOptions(options);
        setFromCurrency('USD');
        setToCurrency('UAH');
        setExchangeRate(usdCurrency ? usdCurrency.rate : 1);
        setUsdToUah(usdCurrency ? usdCurrency.rate : 0);
        setEurToUah(eurCurrency ? eurCurrency.rate : 0);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setIsError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(BASE_URL_API)
        .then(response => response.json())
        .then(currencyData => {
          const fromCurrencyData = currencyData.find(item => item.cc === fromCurrency);
          const toCurrencyData = currencyData.find(item => item.cc === toCurrency);
          
          if (fromCurrency === 'UAH') {
            setExchangeRate(1 / toCurrencyData?.rate || 1);
          } else if (toCurrency === 'UAH') {
            setExchangeRate(fromCurrencyData?.rate || 1);
          } else {
            setExchangeRate(fromCurrencyData?.rate / toCurrencyData?.Amount);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [fromCurrency, toCurrency]);

  return (
    <div>
      
      {isLoading && (
          <p className="loader"></p>
        )} 
        {isError && (
          <h1 className="error_message">Error fetching data</h1>
      )}
    
      <Header
        usdToUah={usdToUah}
        eurToUah={eurToUah}
      />

      <div className="currency_container">
        <Currency
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={handleFromCurrencyChange}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
        />
        <div className="equals">=</div>
        <Currency
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={handleToCurrencyChange}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
        />
      </div>
    </div>
  );
}

export default App;
