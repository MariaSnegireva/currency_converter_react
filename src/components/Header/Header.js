import React from 'react';
import './Header.css';

export default function Header({usdToUah, eurToUah}) {
  return (
    <header className="header">   
      <h1>Currency Converter</h1>
        <div>
          <p>1 USD = {usdToUah} UAH</p>
          <p>1 EUR = {eurToUah} UAH</p>
        </div>
    </header>
  )
}
