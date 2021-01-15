import { ReactComponent as SvgLogo } from '../../../assets/img/ugcompass_logo.svg';
import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ width, height }) => {
  return (
    <div className='logo'>
      <a href='/'>
        <SvgLogo style={{ width: width + 'px', height: height + 'px' }} />
      </a>
    </div>
  );
};

Logo.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Logo.defaultProps = {
  width: 180,
  height: 40,
};

export default Logo;
