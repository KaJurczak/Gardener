import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/plantsRedux';
import { addToCart } from '../../../redux/cartRedux';


import styles from './Plant.module.scss';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

const Component = ({className, plants, match, addToCart}) => {
  const classes = useStyles();
  const plant = plants.filter(plant => plant.id === match.params.id)[0];

  const [value, setValue] = React.useState(0);
  const onChange = ({ target }) => {
    setValue(parseInt(target.value));
  };

  const sendToCart = (plant, value) => {
    addToCart(plant, value);
    // console.log('information was sending')
    // console.log('plant', plant, 'value', value)
  };

  return(
    <div className={clsx(className, styles.root)}>
      <Container maxWidth="sm" className={clsx(className, styles.root)}>
        <Paper elevation={0} >
          <Grid container spacing={2} className={styles.card}>
            <Grid item xs={3}>
              <GridList cellHeight={160} className={classes.gridList} cols={1}>
                {plant.photo.map((image) => (
                  <GridListTile key={image} cols={image.cols || 1}>
                    <img src={image} alt={image} />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
            <Grid item xs={9}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={plant.photo[0]}
                    title={plant.polishName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {plant.polishName}
                    </Typography>
                    <Typography gutterBottom  variant="subtitle1" color="textSecondary" component="p">
                      {`(${plant.latinName})`}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" component="p">
                      {plant.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {`${plant.content} (źródło:${plant.source})`}
                    </Typography>
                    <br></br>
                    <Typography gutterBottom  variant="h6" color="textSecondary" component="p">
                      {`cena: ${plant.price}PLN`}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <input 
                    type="number" 
                    min="0" 
                    max="10" 
                    value={value} 
                    onChange={onChange} />
                  <Button 
                    size="small" 
                    color="primary"
                    onClick={() => sendToCart(
                      plant, value
                    )}>
                    DODAJ DO KOSZYKA
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
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
  addToCart: PropTypes.func,
};

const mapStateToProps = state => ({
  plants: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  addToCart: (plantInformation, value) => dispatch(addToCart(plantInformation, value)),
});

const ContainerConnect = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as Plant,
  ContainerConnect as Plant,
  Component as PlantComponent,
};
