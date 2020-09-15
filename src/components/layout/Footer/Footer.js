import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './Footer.module.scss';


const Component = ({ className }) => {

  return(
    <footer className={clsx(className, styles.root)}>
      <div className={styles.footer}>
        <p className={styles.title}>
          All rights reserved
        </p>
      </div>
    </footer>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

export {
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
