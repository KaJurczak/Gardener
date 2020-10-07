import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/plantsRedux';
import { getCart, sendOrder } from '../../../redux/cartRedux';
import { OrderTable } from '../OrderTable/OrderTable';

import styles from './OrderForm.module.scss';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


class Component extends React.Component {
  state = {
    order: {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      houseNumber: '',
      city: '',
      postcode: '',
      addInfo: '',
    },
  };

  changeInput = (event, name) => {
    event.preventDefault();
    const { order } = this.state;

    this.setState({ order: { ...order, [name]: event.target.value } });
    console.log(this.state);
  };

  onSubmit = async () => {
    const { order } = this.state;
    const { sendOrder, plantsInCart } = this.props;
    plantsInCart ? 
      ((order.firstName && order.lastName && order.email && order.street && order.houseNumber && order.city && order.postcode) ? 
        await sendOrder({ order, plantsInCart }) :
        alert('Nie wpisano wszystkich danych adresowych')
      ) 
      : alert('Brak roślin w koszyku');
  };

  render(){
    const { className, plantsInCart } = this.props;
    const { changeInput, onSubmit } = this;
    const { order } = this.state;

    return(
      <div className={clsx(className, styles.root)}>
        <Container maxWidth="sm" className={clsx(className, styles.root)}>
          <Paper elevation={0} >
            <OrderTable />
            <br></br>
            <h2>Formularz danych kontaktowych</h2>
            <Paper elevation={1} >
              <div className={clsx(className, styles.rootForm)}>
                <Grid
                  className={styles.container}
                  container
                  spacing={3}
                >
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="firstName"
                      name="firstName"
                      label="Imię"
                      fullWidth
                      value={order.firstName}
                      onChange={(e) => changeInput(e, 'firstName')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="lastName"
                      name="lastName"
                      label="Nazwisko"
                      fullWidth
                      value={order.lastName}
                      onChange={(e) => changeInput(e, 'lastName')}
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
                      id="street"
                      name="street"
                      label="Ulica"
                      fullWidth
                      value={order.street}
                      onChange={(e) => changeInput(e, 'street')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="houseNumber"
                      name="houseNumber"
                      label="Nr domu"
                      fullWidth
                      value={order.houseNumber}
                      onChange={(e) => changeInput(e, 'houseNumber')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="Miasto"
                      fullWidth
                      value={order.city}
                      onChange={(e) => changeInput(e, 'city')}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="postcode"
                      name="postcode"
                      label="Kod pocztowy"
                      fullWidth
                      value={order.postcode}
                      onChange={(e) => changeInput(e, 'postcode')}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="addInfo"
                      name="addInfo"
                      label="Dodatkowe informacje"
                      multiline
                      fullWidth
                      value={order.addInfo}
                      onChange={(e) => changeInput(e, 'addInfo')}
                    />
                  </Grid>
                </Grid>
              </div>
            </Paper>
            <div className={styles.buttonWrapper}>
              <Button 
                component={Link} 
                to={'/cart'} 
                color="inherit" 
                className={styles.button} >
                Cofnij do koszyka
              </Button>
              <Button 
                color="inherit" 
                className={styles.button}
                onClick={() => onSubmit(order, plantsInCart)}
              >
                Wyślij zamówienie
              </Button>
            </div>
          </Paper>
        </Container>
      </div>
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  plantsInCart: PropTypes.array,
  sendOrder: PropTypes.func,
};

const mapStateToProps = state => ({
  plants: getAll(state),
  plantsInCart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  sendOrder: ({ order, plantsInCart }) => dispatch(sendOrder({ order, plantsInCart })),
});

const ContainerConnect = connect(mapStateToProps, mapDispatchToProps)(Component);


export {
  ContainerConnect as OrderForm,
  Component as OrderFormComponent,
};
