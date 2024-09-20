import React from 'react';
import './Currency.css';

export default function Currency({
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  amount
}) {
  return (
    <div className="currency_options">
      <input
        type="number"
        className="input"
        value={amount}
        onChange={onChangeAmount}
      />
      <select
        className="select"
        value={selectedCurrency}
        onChange={onChangeCurrency}
      >
        {currencyOptions.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
