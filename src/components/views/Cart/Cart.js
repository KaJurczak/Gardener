import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/plantsRedux';
import { getCart, changeValue, changeSelectValue, removeProduct } from '../../../redux/cartRedux';
import { getCartFromLocalSt, changeCartInLocalSt } from '../../../redux/cartRedux';

import styles from './Cart.module.scss';
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
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 550,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
}));

function createData(name, colors, price, quantity, total, _id) {
  return { name, colors, price, quantity, total, _id };
}

class Component extends React.Component {
  componentDidMount() {
    this.props.getCartFromLocalSt();
  }

  componentDidUpdate() {
    this.props.changeCartInLocalSt(this.props.plantsInCart);
  }

  render(){
    const {className, classes, plantsInCart, changeValue, changeSelectValue, removeProduct} = this.props;

    const rows = plantsInCart ? plantsInCart.map(plant => createData(plant.polishName, plant.colors, plant.price, plant.value, plant.value?plant.price*plant.value:plant.price*0, plant._id)) : [];

    const changeSelect = (event, _id) => {
      event.preventDefault();
      changeSelectValue({_id, chosenColor: event.target.value});
    };

    const changeInput = (event, _id) => {
      event.preventDefault();
      changeValue({_id, value: parseInt(event.target.value)});
    };

    const removePlant = (_id) => {
      removeProduct(_id);
    };

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
              <h2>Koszyk</h2>
              <TableContainer component={Paper}>
                <Table 
                  className={classes.table} 
                  size="small" 
                  aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Roślina</TableCell>
                      <TableCell align="center">Kolor kwiatów</TableCell>
                      <TableCell align="center">Cena (PLN)</TableCell>
                      <TableCell align="center">Ilość</TableCell>
                      <TableCell align="center">Usuń</TableCell>
                      <TableCell align="center">Cena całkowita (PLN)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>
                          <FormControl 
                            className={classes.formControl}
                          >
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // defaultValue={row.chosenColor ? row.chosenColor : row.colors}
                              onChange={e => changeSelect(e, row._id)}
                            >
                              {row.colors.map(chosenColor => 
                                <MenuItem key={chosenColor} value={chosenColor}>
                                  {chosenColor}
                                </MenuItem>
                              )}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center">
                          <input 
                            type="number" 
                            min="1" 
                            max="10" 
                            value={row.quantity}
                            onChange={e => changeInput(e, row._id)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="inherit"
                            onClick={() => removePlant(row._id)}
                          >
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                        <TableCell align="center">{row.total}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow key="suma">
                      <TableCell component="th" scope="row">
                        SUMA
                      </TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">{totalPrice()}</TableCell>

                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Button 
                component={Link} 
                to={'/orderForm'} 
                color="inherit" 
                className={styles.button} >
                Zamawiam i płacę
              </Button>
            </Paper>
          </Container>
        </div>
      ) : (
        <div className={clsx(className, styles.root)}>
          <Container maxWidth="sm" className={clsx(className, styles.root)}>
            <Paper elevation={0} >
              <h2>Twój koszyk jest pusty</h2>
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
  changeValue: PropTypes.func,
  changeSelectValue: PropTypes.func,
  getCartFromLocalSt: PropTypes.func,
  changeCartInLocalSt: PropTypes.func,
  removeProduct: PropTypes.func,
};

const mapStateToProps = state => ({
  plants: getAll(state),
  plantsInCart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  changeValue: ({_id, value}) => dispatch(changeValue({_id, value})), 
  changeSelectValue: ({_id, chosenColor}) => dispatch(changeSelectValue({_id, chosenColor})),
  getCartFromLocalSt: () => dispatch(getCartFromLocalSt()),
  changeCartInLocalSt: (cart) => dispatch(changeCartInLocalSt(cart)),
  removeProduct: (_id) => dispatch(removeProduct(_id)),
});

const ContainerConnect = withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Component));

export {
  ContainerConnect as Cart,
  Component as CartComponent,
};