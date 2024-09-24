import { useEffect, useState } from 'react';
import './App.css';
import Currency from './components/Currency';
import Header from './components/Header';
import { useCurrencyData } from './hooks/useCurrencyData';

function App() {
  const { currencyOptions, exchangeRates, usdToUah, eurToUah, isLoading, isError } = useCurrencyData();
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('UAH');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [amount, setAmount] = useState(1);
  const [amountFromCurrency, setAmountFromCurrency] = useState(true);

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

  useEffect(() => {
    if (fromCurrency && toCurrency) {   
      if (fromCurrency === 'UAH' && exchangeRates[toCurrency]) {
        setExchangeRate(1 / exchangeRates[toCurrency]);
      } else if (toCurrency === 'UAH') {
        setExchangeRate(exchangeRates[fromCurrency] || 1);
      } else {
        setExchangeRate(exchangeRates[fromCurrency] / exchangeRates[toCurrency]);
      }
    }
  }, [fromCurrency, toCurrency, exchangeRates]);

  let toAmount = 0;
  let fromAmount = 0;

  if (amountFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  return (
    <div>
      
      {isLoading && <p className="loader"></p>} 

      {isError && <h1 className="error_message">Error fetching data</h1>}
    
      <Header usdToUah={usdToUah} eurToUah={eurToUah} />

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
