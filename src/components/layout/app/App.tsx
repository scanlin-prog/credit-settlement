import { useState } from 'react'

import BaseButton from '@components/base/button/button'
import MainModal from '@components/modals/main/main-modal'

import './App.scss'

function App() {
  const [openedModal, setOpenedModal] = useState<boolean>(false);

  function openModal() {
    setOpenedModal(true);
  }

  function closeModal() {
    setOpenedModal(false);
  }

  return (
    <div className='app'>
        <BaseButton
          secondary
          onClick={openModal}
        >
          Расчет платежей
        </BaseButton>
        <MainModal
          isOpened={openedModal}
          onClose={closeModal}
        />
    </div>
  )
}

export default App
