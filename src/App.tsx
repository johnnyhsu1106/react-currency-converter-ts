import CurrencyConverter from './components/CurrencyConverter';
import { CurrencyProvider } from './context/CurrencyContext';
import { FC } from 'react';
import './App.css';


const App: FC = () => {
  return (
    <CurrencyProvider>
      <CurrencyConverter />
    </CurrencyProvider>

  )
}
export default App;
