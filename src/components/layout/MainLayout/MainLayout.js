import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './MainLayout.module.scss';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <Header />
    {children}
    <Footer />
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as MainLayout,
  Component as MainLayoutComponent,
};
