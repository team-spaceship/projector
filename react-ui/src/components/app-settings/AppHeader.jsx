import React from 'react';
import PropTypes from 'prop-types';

const AppHeader = (props) => {
  return (
    <div>
      <h1 className="display-3 intro-text">{props.name}</h1>
    </div>
  );
};

AppHeader.propTypes = {
  name: PropTypes.string.isRequired,
};

export default AppHeader;
