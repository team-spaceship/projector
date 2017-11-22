import React from 'react';
import PropTypes from 'prop-types';

const AppHeader = (props) => {
  return (
    <div>
      <div>
        <p className="lead app-lead">App settings</p>
        <h1 className="display-3 intro-text">{props.appId}</h1>
      </div>
    </div>
  );
};

AppHeader.propTypes = {
  appId: PropTypes.string.isRequired,
};

export default AppHeader;
