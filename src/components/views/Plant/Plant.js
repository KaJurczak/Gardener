import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPlants } from '../../../redux/plantsRedux';
import { addToCart, setCartToLocalSt, getCart } from '../../../redux/cartRedux';


import styles from './Plant.module.scss';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 600,
  },
});

class Component extends React.Component {
  state = {
    data: {
      value: 1,
    },
  }

  async componentDidMount(){
    await this.props.fetchPlants();
  }

  render(){
    const {className, addToCart, classes, plants} = this.props;
    const {value} = this.state.data;

    const singlePlant = plants.filter(plant => plant._id === this.props.match.params.id)[0];
    
    const changeInput = ( event ) => {
      event.preventDefault();
      const { data } = this.state;
      this.setState({
        data: {...data, value: event.target.value,
        }});
    };

    const sendToCart = async (singlePlant, value) => {
      if(value !== 0){
        await addToCart(singlePlant, value);
        this.props.setCartToLocalSt(singlePlant, value);
      } else {alert('nie wpisałeś ilości roślin');}
    };

    return(
      plants.length !== 0 ? 
        (
          <div className={clsx(className, styles.root)}>
            <Container maxWidth="sm" className={clsx(className, styles.root)}>
              <Paper elevation={0} >
                <Grid container spacing={2} className={styles.card}>
                  <Grid item xs={12} sm={3}>
                    <GridList cellHeight={160} className={classes.gridList} cols={1}>
                      {singlePlant.photo ? (singlePlant.photo.map((image) => (
                        <GridListTile key={image} cols={image.cols || 1}>
                          <img src={image} alt={image} />
                        </GridListTile>
                      ))) : ''}
                    </GridList>
                  </Grid>
                  <Grid item xs={12} sm={9}>
                    <Card className={classes.root}>
                      <CardActionArea>
                        <div className={styles.imageWrapper}>
                          <img src={singlePlant.photo[0]} alt="alternative" className={styles.image}/>
                        </div>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {singlePlant.polishName}
                          </Typography>
                          <Typography gutterBottom  variant="subtitle1" color="textSecondary" component="p">
                            {`(${singlePlant.latinName})`}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary" component="p">
                            {singlePlant.type}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {`${singlePlant.content} (źródło:${singlePlant.source})`}
                          </Typography>
                          <br></br>
                          <Typography gutterBottom  variant="h6" color="textSecondary" component="p">
                            {`cena: ${singlePlant.price}PLN`}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <input 
                          type="number" 
                          min="0" 
                          max="10" 
                          value={value} 
                          onChange={e => changeInput(e)} 
                        />
                        <Button 
                          size="small" 
                          color="primary"
                          onClick={() => sendToCart(
                            singlePlant, value
                          )}
                        >
                          DODAJ DO KOSZYKA
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Paper>
            </Container>
          </div>
        ) : (
          <div className={clsx(className, styles.root)}>
            <Container maxWidth="sm" className={clsx(className, styles.root)}>
              <Paper elevation={0} >
                <h2>
                  Strona jest pusta. Wróć proszę do strony głównej
                </h2>
                <Typography className={clsx(classes.title, styles.logo)} component={Link} to={`/`} color="inherit" underline="hover">
                  GARDENER
                </Typography>
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
  plants: PropTypes.array,
  match: PropTypes.object,
  fetchPlants: PropTypes.func,
  addToCart: PropTypes.func,
  setCartToLocalSt: PropTypes.func,
};

const mapStateToProps = (state, id) => ({
  plants: getAll(state),
  getCart: getCart(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPlants: () => dispatch(fetchPlants()),
  addToCart: (plantInformation, value) => dispatch(addToCart(plantInformation, value)),
  setCartToLocalSt: (cart, value) => dispatch(setCartToLocalSt(cart, value)),
});

const ContainerConnect = withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Component));

export {
  ContainerConnect as Plant,
  Component as PlantComponent,
};
