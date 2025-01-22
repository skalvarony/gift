import React from 'react';

const Wish = ({ name }) => {
  return (
    <div className='wish-message'>
      Es hoy !!! Disfuta en el  <span className='highlight'>{name.toUpperCase()}</span> !!!
    </div>
  );
};

export default Wish;
