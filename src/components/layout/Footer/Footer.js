import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import styles from './Footer.module.scss';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';

const Component = ({ className }) => {

  return(
    <footer className={clsx(className, styles.root)}>
      <div className={styles.footer}>
        <div className={styles.copyright}>
          <p>Copyright ©2020 All rights reserved</p>
        </div>
        <div className={styles.socialMedia}>
          <ul>
            <li>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer'>
                <TwitterIcon>Twitter</TwitterIcon>
              </a>
            </li>
            <li>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
                <FacebookIcon>Facebook</FacebookIcon>
              </a>
            </li>
            <li>
              <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'>
                <YouTubeIcon>YouTube</YouTubeIcon>
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.adress}>
          <ul>
            <li>
              <p><b>GARDENER</b> <br></br>
              Akacjowa 100, 00-000 Somma</p>
            </li>
          </ul>
        </div>
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
