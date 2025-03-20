import { useState, useEffect } from 'react';
import type { PropsWithChildren, JSX } from 'react';

import BaseButton from '@components/base/button/button';
import BaseSvg from '@components/base/svg/svg';

import './modal.scss';

type ModalProps = {
  isOpened: boolean;
  onClose: () => void;
};

function Modal(props: PropsWithChildren<ModalProps>): JSX.Element {
  const {
    children,
    isOpened,
    onClose
  } = props;

  const [modalState, setModalState] = useState<boolean>(isOpened);

  useEffect(() => {
    setModalState(isOpened);
  }, [isOpened]);

  const onCloseClick = (): void => {
    setModalState(false);
    onClose();
  };

  return (
    <div className={`modal ${modalState ? '_opened' : ''}`}>
      <div className='modal__inner'>
        <BaseButton
          classes='modal__close'
          onClick={onCloseClick}
        >
          <BaseSvg name='close'/>
        </BaseButton>
        {children}
      </div>
      <div className='modal__overlay' onClick={onCloseClick}></div>
    </div>
  )
}

export default Modal;
