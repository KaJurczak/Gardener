import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/plantsRedux';

import styles from './Basket.module.scss';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 550,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
  },
}));

function createData(name, colors, price, quantity, total) {
  return { name, colors, price, quantity, total };
}

const Component = ({className, plants, value}) => {
  const classes = useStyles();
  // const [setColors] = React.useState('');

  // const handleChange = (event) => {
  // setColors(event.target.value);
  // };

  const rows = plants.map(plant => createData(plant.polishName, plant.colors, plant.price, plant.quantity?plant.quantity:0, plant.quantity?plant.price*plant.quantity:plant.price*0));

  // console.log(rows);
  
  return(
    <div className={clsx(className, styles.root)}>
      <Container maxWidth="sm" className={clsx(className, styles.root)}>
        <Paper elevation={0} >
          <h2>Koszyk</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
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
                    <TableCell>
                      <FormControl className={classes.formControl}>
                        {/* <InputLabel id="demo-simple-select-label">Kolor</InputLabel> */}
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          // value={row.colors}
                          // onChange={handleChange}
                        >
                          {row.colors.map(choosenSize => 
                            <MenuItem key={choosenSize} value={choosenSize}>{choosenSize}</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">
                      <input type="number" min="1" max="10" value={value}>
                      </input>
                    </TableCell>
                    {console.log()}
                    <TableCell align="right">{row.total}</TableCell>
                  </TableRow>
                ))}
                <TableRow key="suma">
                  <TableCell component="th" scope="row">
                    SUMA
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">0</TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button component={Link} to={'/orderForm'} color="inherit" className={styles.button} >Zamawiam i płacę</Button>
        </Paper>
      </Container>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  plants: PropTypes.array,
  match: PropTypes.object,
  value: PropTypes.number,
};

const mapStateToProps = state => ({
  plants: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ContainerConnect = connect(mapStateToProps)(Component);

export {
  // Component as Basket,
  ContainerConnect as Basket,
  Component as BasketComponent,
};
