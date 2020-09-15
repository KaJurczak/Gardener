import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getCart} from '../../../redux/cartRedux';

import styles from './OrderTable.module.scss';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


function createData(name, choosenColor, price, value, total, id) {
  return { name, choosenColor, price, value, total, id };
}

class Component extends React.Component {

  render(){
    const {plantsInCart} = this.props;

    const rows = plantsInCart ? plantsInCart.map(plant => createData(plant.polishName, plant.choosenColor?plant.choosenColor:'', plant.price, plant.value, plant.price*plant.value, plant.id)) : [];

    const totalPrice = () => {
      let sum = [];
      rows.map(row => row.total ? sum.push(row.total) : sum.push(0));
      const total = sum.reduce((a, b) => a + b, 0); //get sum of array elements
      return total;
    };

    return(
      (rows.length !== 0) ? (
        <div>
          <h2>Twoje zamówienie</h2>
          <TableContainer component={Paper}>
            <Table 
              className={styles.table} 
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
        </div>
      ) : (
        <div>
          <h2>Twoje zamówienie jest puste</h2>
          <Button 
            component={Link} 
            to={'/cart'} 
            color="inherit" 
            className={styles.button} >
            Wróć do koszyka
          </Button>
          <Button 
            component={Link} 
            to={'/'} 
            color="inherit" 
            className={styles.button} >
            Wróć do strony głównej
          </Button>
        </div>
      )
    );
  }
}

Component.propTypes = {
  classes: PropTypes.object,
  plantsInCart: PropTypes.array,
};

const mapStateToProps = state => ({
  plantsInCart: getCart(state),
});

const ContainerConnect = connect(mapStateToProps)(Component);


export {
  ContainerConnect as OrderTable,
  Component as OrderTableComponent,
};
