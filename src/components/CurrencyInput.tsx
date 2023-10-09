import { ChangeEvent } from 'react';
import { useCurrencyContext, ICurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';
import { CurrencyRowType } from '../types/types';

interface CurrencyInputProps {
  rowType: CurrencyRowType;
}

const CurrencyInput = ({ rowType } : CurrencyInputProps) => {
  const {
    fromAmount,
    toAmount,
    handleFromAmountChange,
    handleToAmountChange,
  }: ICurrencyContext = useCurrencyContext();
  
  const isFromRow = rowType === 'from';
  const amount = isFromRow ? fromAmount : toAmount;
  const onChangeAmount: (amount: number) => void  = isFromRow ? handleFromAmountChange : handleToAmountChange;

  return (
    <input
      className={style.input}
      type='number'
      value={amount}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {onChangeAmount(Number(e.target.value))}} 
    />
  )
}

export default CurrencyInput;