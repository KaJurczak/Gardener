import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getCart } from '../../../redux/cartRedux';
import { getCartFromLocalSt } from '../../../redux/cartRedux';


import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  title: {
    flexGrow: 1,
  },
  rootCart: {
    '& > *': {
      // margin: theme.spacing(1),
      padding: 0,
    },
  },
}));

class Component extends React.Component {
  // componentDidUpdate() {
  //   console.log('this.props.plantsInCart', JSON.parse(localStorage.getItem('cart')));
  // }

  render(){
    const {className, classes  } = this.props;
    // console.log('JSON.parse(localStorage.getItem())', JSON.parse(localStorage.getItem('cart')));
    const cartNumber = 0;
    // const cartNumber = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).length : 0;

    return(
      <div className={clsx(className, styles.root)}>
        <AppBar className={styles.header} position="static">
          <Toolbar className={styles.buttonWrapper}>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography className={clsx(classes.title, styles.logo)} component={Link} to={`/`} color="inherit" underline="hover">
              GARDENER
            </Typography>
            <Button component={Link} to={'/cart'} color="inherit" className={styles.button}>
              <div className={classes.rootCart}>
                <Badge badgeContent={cartNumber} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </div>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  plantsInCart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  getCartFromLocalSt: () => dispatch(getCartFromLocalSt()),
});

const ContainerConnect = withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Component));

export {
  ContainerConnect as Header,
  Component as HeaderComponent,
};