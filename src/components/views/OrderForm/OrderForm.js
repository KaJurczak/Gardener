import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/plantsRedux';
import { getCart} from '../../../redux/cartRedux';
import { DataForm } from '../DataForm/DataForm';

import styles from './OrderForm.module.scss';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 550,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
}));

function createData(name, choosenColor, price, value, total, id) {
  return { name, choosenColor, price, value, total, id };
}

class Component extends React.Component {

  render(){
    const {className, classes, plantsInCart} = this.props;

    const rows = plantsInCart ? plantsInCart.map(plant => createData(plant.polishName, plant.choosenColor?plant.choosenColor:'', plant.price, plant.value, plant.price*plant.value, plant.id)) : [];

    const totalPrice = () => {
      let sum = [];
      rows.map(row => row.total ? sum.push(row.total) : sum.push(0));
      const total = sum.reduce((a, b) => a + b, 0); //get sum of array elements
      return total;
    };

    return(
      (rows.length !== 0) ? (
        <div className={clsx(className, styles.root)}>
          <Container maxWidth="sm" className={clsx(className, styles.root)}>
            <Paper elevation={0} >
              <h2>Twoje zamówienie</h2>
              <TableContainer component={Paper}>
                <Table 
                  className={classes.table} 
                  size="small" 
                  aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Roślina</TableCell>
                      <TableCell align="right">Kolor kwiatów</TableCell>
                      <TableCell align="right">Cena (PLN)</TableCell>
                      <TableCell align="right">Ilość</TableCell>
                      <TableCell align="right">Cena całkowita (PLN)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.choosenColor ? row.choosenColor : 'nie wybrano koloru'}</TableCell>
                        <TableCell align="right">{row.price}</TableCell>
                        <TableCell align="right">{row.value}</TableCell>
                        <TableCell align="right">{row.total}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow key="dostawa">
                      <TableCell component="th" scope="row">
                        Koszt dostawy
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">20</TableCell>
                    </TableRow>
                    <TableRow key="suma">
                      <TableCell component="th" scope="row">
                        Do zapłaty
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">{totalPrice() + 20} PLN</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <br></br>
              <h2>Formularz danych kontaktowych</h2>
              <Paper elevation={1} >
                <DataForm />
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
                  // component={Link} 
                  // to={'/orderForm'} 
                  color="inherit" 
                  className={styles.button} >
                  Wyślij zamówienie
                </Button>
              </div>
            </Paper>
          </Container>
        </div>
      ) : (
        <div className={clsx(className, styles.root)}>
          <Container maxWidth="sm" className={clsx(className, styles.root)}>
            <Paper elevation={0} >
              <h2>Twój zamówienie jest puste</h2>
            </Paper>
          </Container>
        </div>
      )
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object,
  plantsInCart: PropTypes.array,
};

const mapStateToProps = state => ({
  plants: getAll(state),
  plantsInCart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  // setCartToLocalSt: (cart) => dispatch(setCartToLocalSt(cart)),
  // getCartFromLocalSt: () => dispatch(getCartFromLocalSt()),
});

const ContainerConnect = withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Component));


export {
  // Component as OrderForm,
  ContainerConnect as OrderForm,
  Component as OrderFormComponent,
};
