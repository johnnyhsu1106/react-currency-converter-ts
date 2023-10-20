import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ICurrencyContext {
  isError: boolean;
  currencyOptions: string[];
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  handleFromCurrencySelect: (currency: string) => void;
  handleFromAmountChange: (amount: number) => void;
  handleToCurrencySelect: (currency: string) => void,
  handleToAmountChange: (amount: number) => void;
};

const BASE_URL: string = 'https://api.apilayer.com/exchangerates_data';
const API_KEY: string = import.meta.env.VITE_API_TOKEN;
const CurrencyContext = createContext<ICurrencyContext | null>(null)

const useCurrencyContext = (): ICurrencyContext => {
  const context = useContext(CurrencyContext);
  if (context === null) {
    throw new Error('useCurrencyContext must be used within CurrencyProvder');
  }
  return context;
};

const CurrencyProvider = ({ children } : { children: ReactNode}) => {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('TWD');
  const [amount, setAmount] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  // Get Derived States
  const fromAmount: number = amountInFromCurrency ? amount : amount / exchangeRate; 
  const toAmount: number = amountInFromCurrency ? amount * exchangeRate : amount;
  
  // Get Currency Options 
  useEffect(() => {

    fetch(`${BASE_URL}/symbols`, {
      method: 'GET',
      redirect: 'follow',
      credentials: 'include',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        'apikey': API_KEY
      }
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Invalid Https Request');
      }
      return res.json();
    })
    .then((data) => {
      const { symbols } = data;
      const currencies: string[] = Object.keys(symbols);
      setCurrencyOptions(currencies);
    })
    .catch((err) => {
      setIsError(true);
      console.error(err);
    });
  }, []);

  // Get Exchange at first and Update Exchange Rate if fromCurrency or toCurrency is changed.
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;


    fetch(`${BASE_URL}/latest?base=${fromCurrency}&symbols=${toCurrency}`, {
      method: 'GET',
      redirect: 'follow',
      credentials: 'include',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
        'apikey': API_KEY
      },
      signal
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid Https Request');
        }
        return res.json();
      })
      .then((data) => {
        const { rates } = data;
        setExchangeRate(rates[toCurrency]);
      })
      .catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
        setIsError(true);
        console.error(err);
      })
    
      return () => {
        controller.abort();
      }

  }, [fromCurrency, toCurrency]);


  const handleFromCurrencySelect = (currency: string): void => {
    setFromCurrency(currency);
  };

  const handleToCurrencySelect = (currency: string): void => {
    setToCurrency(currency);
  };

  const handleFromAmountChange = (amount: number): void => {
    setAmount(amount);
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (amount: number): void => {
    setAmount(amount);
    setAmountInFromCurrency(false);
  };
  
  const value: ICurrencyContext = {
    isError,
    currencyOptions,
    fromAmount,
    fromCurrency,
    toAmount,
    toCurrency,
    handleFromCurrencySelect,
    handleFromAmountChange,
    handleToCurrencySelect,
    handleToAmountChange,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider> 
  )
}

export { useCurrencyContext, CurrencyProvider };