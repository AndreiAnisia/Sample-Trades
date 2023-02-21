import React, { useState } from 'react'
import useContextMenu from '../hooks/useContextMenu';
import { MODAL } from '../utils/enums';
import { formatData, iData } from '../utils/formatData';
import ContextMenu from './ContextMenu';
import Modal from './Modal';
import styles from './Table.module.css';

export interface FormattedData {
  securityCode: string,
  price: string,
  volume: string,
  owner: string
}

const initialData: iData[] = [
  { securityCode: 'AAPL', price: 1010.00, volume: 1000, owner: 'John' },
  { securityCode: 'GOOG', price: 520.50, volume: 500, owner: 'Alice' },
  { securityCode: 'BTC', price: 19520.00, volume: 2000, owner: 'Bob' }
];

const Table = () => {
  const [data, setData] = useState<iData[]>(initialData);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [rowClicked, setRowClicked] = useState(0);
  const [modalType, setModalType] = useState(MODAL.ADD_TRADE);
  const { clicked, setClicked, points, setPoints } = useContextMenu();

  const handleClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    e.preventDefault();
    setClicked(true);
    setPoints({ x: e.pageX, y: e.pageY });
    // @ts-ignore: Unreachable code error
    setRowClicked(e.target.parentNode.rowIndex);
  }

  const openModal = (type: string) => {
    setModalType(type);
    setShowModal(true);
  }

  const removeRow = () => {
    const newData = data.filter((_, index) => index + 1 !== rowClicked);
    setData(newData);
  }

  const renderTableRows = () => {
    const formattedData = data.map(entry => formatData(entry));
    return formattedData.map((entry, key) => (
      <tr key={key} onContextMenu={handleClick}>
        <td>{key + 1}</td>
        <td>{entry.securityCode}</td>
        <td>{entry.price}</td>
        <td>{entry.volume}</td>
        <td>{entry.owner}</td>
      </tr>
    ))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <h2>Trades</h2>
          <span className={styles.tradesNumber}>{data.length}</span>
        </div>
        <button className={styles.addTrade} onClick={() => openModal(MODAL.ADD_TRADE)}>+ Add New Trade</button>
      </div>
      <table>
        <tr>
          <th>Trade Id</th>
          <th>Security Code</th>
          <th>Trade Price($)</th>
          <th>Trade Volume</th>
          <th>Trade Owner</th>
        </tr>
        {renderTableRows()}
      </table>
      {clicked && <ContextMenu top={points.y} left={points.x} openModal={openModal} removeRow={removeRow} />}
      <Modal onClose={() => setShowModal(false)} show={showModal} data={data} setData={setData} modalType={modalType} rowClicked={rowClicked} />
    </div >
  )
}

export default Table
