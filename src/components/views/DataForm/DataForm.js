import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './DataForm.module.scss';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


class Component extends React.Component {
  state = {
    order: {
      imie: '',
      nazwisko: '',
      email: '',
      ulica: '',
      nrDomu: '',
      miasto: '',
      kodPocztowy: '',
      dodatkoweInfo: '',
    },
  };

  changeInput = (event, name) => {
    event.preventDefault();
    const { order } = this.state;

    this.setState({ order: { ...order, [name]: event.target.value } });
  };

  render() {
    const { className } = this.props;
    const { changeInput } = this;
    const { order } = this.state;

    return (
      <div className={clsx(className, styles.root)}>
        <Grid
          className={styles.container}
          container
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="imie"
              name="imie"
              label="Imie"
              fullWidth
              value={order.imie}
              onChange={(e) => changeInput(e, 'imie')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nazwisko"
              name="nazwisko"
              label="Nazwisko"
              fullWidth
              value={order.nazwisko}
              onChange={(e) => changeInput(e, 'nazwisko')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              value={order.email}
              onChange={(e) => changeInput(e, 'email')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="ulica"
              name="ulica"
              label="Ulica"
              fullWidth
              value={order.ulica}
              onChange={(e) => changeInput(e, 'ulica')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="nrDomu"
              name="nrDomu"
              label="Nr domu"
              fullWidth
              value={order.nrDomu}
              onChange={(e) => changeInput(e, 'nrDomu')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="miasto"
              name="miasto"
              label="Miasto"
              fullWidth
              value={order.miasto}
              onChange={(e) => changeInput(e, 'miasto')}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="kodPocztowy"
              name="kodPocztowy"
              label="Kod pocztowy"
              fullWidth
              value={order.kodPocztowy}
              onChange={(e) => changeInput(e, 'kodPocztowy')}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="dodatkoweInfo"
              name="dodatkoweInfo"
              label="Dodatkowe informacje"
              multiline
              fullWidth
              value={order.dodatkoweInfo}
              onChange={(e) => changeInput(e, 'dodatkoweInfo')}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as DataForm,
  // Container as DataForm,
  Component as DataFormComponent,
};
