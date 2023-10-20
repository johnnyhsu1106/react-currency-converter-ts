import CurrencyRow from './CurrencyRow';
import { useCurrencyContext } from '../context/CurrencyContext';
import style from './CurrencyConverter.module.css';
import { CurrencyRowType } from '../types/types';

const CurrencyConverter = () => {
  const {
    isError,
  } = useCurrencyContext();

  if (isError) {
    return <p>Something goes wrong</p>
  }

  return (
    <>
      <h1 className='title'>Convert Currency</h1>
      <CurrencyRow rowType={CurrencyRowType.from} />
      <div className={style.equals}> = </div>
      <CurrencyRow rowType={CurrencyRowType.to} />
    </>
  )
}

export default CurrencyConverter;
