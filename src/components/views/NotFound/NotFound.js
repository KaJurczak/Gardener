import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>NotFound</h2>
    <Link to={`/`} variant="outlined" color="primary" >
      Go to main page
    </Link>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as NotFound,
  // Container as NotFound,
  Component as NotFoundComponent,
};
