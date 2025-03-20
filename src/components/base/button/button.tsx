import type { JSX, PropsWithChildren } from 'react';
import classNames from 'classnames';

import './button.scss';

interface ButtonProps {
  buttonType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  primary?: boolean;
  secondary?: boolean;
  text?: boolean;
  full?: boolean;
  classes?: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
}

function BaseButton(props: PropsWithChildren<ButtonProps>): JSX.Element {

  const {
    children,
    classes,
    primary = false,
    secondary = false,
    text = false,
    full = false,
    buttonType = 'button',
    disabled = false,
    onClick
  } = props;

  const buttonClasses = classNames(
    classes,
    'button',
    {
      'button--primary': primary,
      'button--secondary': secondary,
      'button--text': text,
      'button--full': full
    }
  );

  return (
    <button
      type={buttonType}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      <div className='button__content'>
        {children}
      </div>
    </button>
  );
}

export default BaseButton;
