import { ChangeEvent } from 'react';
import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';
import { CurrencyRowType } from '../types/types';

interface CurrencyDropdownProps {
  rowType: CurrencyRowType;
};


const CurrencyDropdown = ({ rowType }: CurrencyDropdownProps) => {
  const {
    currencyOptions,
    fromCurrency,
    toCurrency,
    handleFromCurrencySelect,
    handleToCurrencySelect,
  } = useCurrencyContext();
  
  const isFromRow: boolean = rowType === 'from';
  const selectedCurrency: string = isFromRow ? fromCurrency : toCurrency;
  const onSelectCurrency: (currency: string) => void = isFromRow ? handleFromCurrencySelect : handleToCurrencySelect;
  
  return (
    <select
      className={style.options}
      value={selectedCurrency}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => { onSelectCurrency(e.target.value) }}
    >

      {currencyOptions.map((currencyOption) => {
        return (
          <option
            key={currencyOption}
            value={currencyOption}
          >
            {currencyOption}
          </option>
        )
      })
      }
    </select>
  )
}

export default CurrencyDropdown