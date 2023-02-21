import React, { useEffect, useState } from 'react'
import { MODAL } from '../utils/enums';
import { iData } from '../utils/formatData';
import styles from './Modal.module.css';

interface IModal {
  show: boolean,
  onClose: () => void,
  data: iData[],
  setData: React.Dispatch<React.SetStateAction<any>>,
  modalType: string,
  rowClicked: number
}

const numbersReg = /^-?\d*\.?\d*$/;

const Modal = ({ show, onClose, data, setData, modalType, rowClicked }: IModal) => {
  const [securityCode, setSecurityCode] = useState('');
  const [tradePrice, setTradePrice] = useState(0);
  const [tradeVolume, setTradeVolume] = useState(0);
  const [tradeOwner, setTradeOwner] = useState('');
  const [error, setError] = useState(false);

  const handleChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/[^a-z]/gi, '');
    setSecurityCode(result);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.match(numbersReg)) {
      setTradePrice(Number(value));
    }
  }

  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.match(numbersReg)) {
      setTradeVolume(Number(value));
    }
  }

  const handleChangeOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const result = e.target.value.replace(/[^a-z]' '/gi, '');
    setTradeOwner(result);
  };

  const clearFields = () => {
    setSecurityCode('');
    setTradePrice(0);
    setTradeVolume(0);
    setTradeOwner('');
  }

  const submitForm = () => {
    const isError = securityCode === '' || tradePrice === 0 || tradeVolume === 0 || tradeOwner === '';
    if (isError) {
      setError(true);
      return;
    }

    const newRow = { securityCode, price: tradePrice, volume: tradeVolume, owner: tradeOwner };

    if (modalType === MODAL.AMEND_TRADE) {
      const updatedData = data.map((entry, index) => {
        if (index === rowClicked - 1) {
          return newRow
        }
        return entry;
      })
      setData(updatedData);
    } else {
      setData((prevState: any) => ([...prevState, newRow]));
    }
    clearFields();
    onClose();
  }

  const renderTitle = () => {
    if (modalType === MODAL.ADD_TRADE) {
      return 'Add a new Trade';
    }

    return 'Amend Trade';
  }

  useEffect(() => {
    setError(false);
    if (show) {
      document.querySelector('.App')?.classList.add(styles.overflowHidden);
    }

    return () => document.querySelector('.App')?.classList.remove(styles.overflowHidden);
  }, [show]);

  useEffect(() => {
    if (modalType === MODAL.AMEND_TRADE) {
      const rowData = data[rowClicked - 1];
      setSecurityCode(rowData?.securityCode);
      setTradePrice(rowData?.price);
      setTradeVolume(rowData?.volume);
      setTradeOwner(rowData?.owner);
    } else {
      clearFields();
    }

  }, [modalType, data, rowClicked]);

  if (!show) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>{renderTitle()}</div>
        <div className={styles.body}>
          <label>Security Code</label>
          <input type='text' name='securityCode' autoFocus value={securityCode} onChange={handleChangeCode} />

          <label>Trade Price</label>
          <input type='text' name='tradePrice' value={tradePrice} onChange={handleChangePrice} />

          <label>Trade Volume</label>
          <input type='text' name='tradeVolume' value={tradeVolume} onChange={handleChangeVolume} />

          <label>Trade Owner</label>
          <input type='text' name='tradeOwner' value={tradeOwner} onChange={handleChangeOwner} />
        </div>
        <div className={styles.footer}>
          {error && <span>Invalid Values</span>}
          <button className={styles.ok} onClick={submitForm}>Ok</button>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
