import React from 'react'
import { MODAL } from '../utils/enums';
import styles from './ContextMenu.module.css';

interface Points {
  top: number,
  left: number,
  openModal: (arg: string) => void,
  removeRow: () => void
}

const ContextMenu = ({ top, left, openModal, removeRow }: Points) => {
  return (
    <div className={styles.container} style={{ top: `${top}px`, left: `${left}px` }}>
      <ul>
        <li onClick={() => openModal(MODAL.AMEND_TRADE)}>Amend Trade</li>
        <li onClick={removeRow}>Delete Trade</li>
      </ul>
    </div>
  )
}

export default ContextMenu
