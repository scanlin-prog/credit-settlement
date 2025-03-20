import type { JSX } from 'react';
import './svg.scss';

interface BaseSvgProps {
  name: string;
  classes?: string;
}

function BaseSvg({name, classes}: BaseSvgProps): JSX.Element {

  return (
    <div className={`icon ${classes || ''}`}>
      <svg>
        <use xlinkHref={`#${name}`} />
      </svg>
    </div>
  );
}

export default BaseSvg;
