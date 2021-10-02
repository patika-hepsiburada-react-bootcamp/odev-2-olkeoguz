import React, { useState } from 'react';
import './Hint.scss';

const Hint = ({ hint }) => {
  const [showHint, setShowHint] = useState(false);
  return (
    <div className='hintContainer' onClick={() => setShowHint(true)}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
      >
        <g fill='none'>
          <path
            fill='#F5CF3F'
            d='M23.759 19.918l-9.885-18.79C13.332.1 12.054-.299 11.02.241c-.38.199-.691.508-.891.887L.242 19.918C-.3 20.948.1 22.22 1.135 22.76c.302.158.64.24.981.24h19.769C23.054 23 24 22.058 24 20.895c0-.34-.082-.676-.241-.977zM10.943 7.732c0-.581.474-1.053 1.058-1.053.583 0 1.057.472 1.057 1.053v6.315c0 .581-.474 1.053-1.057 1.053-.584 0-1.058-.472-1.058-1.053V7.732zm1.11 12.115h-.03c-.865-.003-1.576-.685-1.609-1.547-.031-.858.641-1.578 1.503-1.61h.059c.865 0 1.577.682 1.61 1.544.035.857-.636 1.579-1.497 1.612l-.036.001z'
          />
        </g>
      </svg>
      {showHint ? <span>{hint}</span> : <span>Take a hint</span>}
    </div>
  );
};

export default Hint;
