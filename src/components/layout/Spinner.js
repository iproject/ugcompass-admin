import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ padding, text, size }) => {
  return (
    <div className='spinner-wrapper' style={{ padding: padding + 'rem' }}>
      <div class={`ui active text loader ${size}`}>{text}</div>
    </div>
  );
};

Spinner.defaultProps = {
  padding: '1rem',
  text: '',
  size: 'medium',
};

Spinner.propTypes = {
  size: PropTypes.string,
  text: PropTypes.string,
  padding: PropTypes.string,
};

export default Spinner;
