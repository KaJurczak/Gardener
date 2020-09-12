import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './Footer.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    right: 0,
  },
  appBar: {
    top: 0,
    bottom: 0,
  },
}));

const Component = ({className, children}) => {
  const classes = useStyles();

  return(
    <div className={clsx(className, styles.root)}>
      <BottomNavigation className={styles.footer} color="inherit">
        <Typography className={clsx(classes.title, styles.title)}>
          All rights reserved
        </Typography>
      </BottomNavigation>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export {
  Component as Footer,
  // Container as Footer,
  Component as FooterComponent,
};
