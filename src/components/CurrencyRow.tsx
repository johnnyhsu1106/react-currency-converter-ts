import CurrencyInput from './CurrencyInput';
import CurrencyDropdown from './CurrencyDropdown';
import { CurrencyRowType } from '../types/types';

interface CurrencyRowProps {
  rowType: CurrencyRowType;
};

const CurrencyRow = ({ rowType }: CurrencyRowProps) => {
  return (
    <>
      <CurrencyInput rowType={rowType} />
      <CurrencyDropdown rowType={rowType}/>
    </>
  )
}

export default CurrencyRow