import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPlant, fetchSinglePlant } from '../../../redux/plantsRedux';
import { addToCart, setCartToLocalSt } from '../../../redux/cartRedux';


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
      value: 0,
    },
  }

  async componentDidMount(){
    // console.log('componentDidMount() at plant');
    const {fetchSinglePlant} = this.props;
    const id = this.props.match.params.id;
    await fetchSinglePlant(id);
  }

  render(){
    const {className, getSinglePlant, addToCart, classes} = this.props;
    const {value} = this.state.data;

    const singlePlant = getSinglePlant[0];

    const changeInput = ( event ) => {
      event.preventDefault();
      const { data } = this.state;
      this.setState({
        data: {...data, value: event.target.value,
        }});
    };

    const sendToCart = (singlePlant, value) => {
      addToCart(singlePlant, value);
      // this.props.setCartToLocalSt(singlePlant);
    };

    return(
      getSinglePlant[0] ? 
        (
          <div className={clsx(className, styles.root)}>
            <Container maxWidth="sm" className={clsx(className, styles.root)}>
              <Paper elevation={0} >
                <Grid container spacing={2} className={styles.card}>
                  <Grid item xs={3}>
                    <GridList cellHeight={160} className={classes.gridList} cols={1}>
                      {singlePlant.photo ? (singlePlant.photo.map((image) => (
                        <GridListTile key={image} cols={image.cols || 1}>
                          <img src={image} alt={image} />
                        </GridListTile>
                      ))) : ''}
                    </GridList>
                  </Grid>
                  <Grid item xs={9}>
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
  singlePlant: PropTypes.node,
  fetchSinglePlant: PropTypes.func,
  match: PropTypes.object,
  addToCart: PropTypes.func,
  getSinglePlant: PropTypes.object,
};

const mapStateToProps = (state, id) => ({
  getSinglePlant: getPlant(state, id),
  // getAll: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchSinglePlant: (id) => dispatch(fetchSinglePlant(id)),
  addToCart: (plantInformation, value) => dispatch(addToCart(plantInformation, value)),
  setCartToLocalSt: (getSinglePlant) => dispatch(setCartToLocalSt(getSinglePlant)),
});

// const ContainerConnect = connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles, { withTheme: true })(Component));

const ContainerConnect = withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Component));

export {
  // Component as Plant,
  ContainerConnect as Plant,
  Component as PlantComponent,
};
