import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPlants } from '../../../redux/plantsRedux';

import styles from './Homepage.module.scss';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

class Component extends React.Component {

  async componentDidMount(){
    // console.log('componentDidMount() at homepage');
    const {fetchPlants} = this.props;
    await fetchPlants();
  }

  render(){
    const {className, children, plants, classes} = this.props;

    return(
      <div>
        <Container maxWidth="sm" className={clsx(className, styles.root)}>
          <h2>O sobie</h2>
          <p>W obecnym kształcie na stronie można znaleść sklep internetowy z roślinami ogrodowymi. 
          Docelowo ma to byc jednak narzędzie dla autorki - poczatkującej ogrodniczki, wskazujące terminy cięcia roślin, sposób nawożenia i parę innych przydatnych informacji o roślinach które ma w swoim ogrodzie. Całość uporządkowana tak aby móc filtrować zabiegi do wykonania w danym miesiącu.
          </p>
          <br></br>
          <h2>Wybrane produkty</h2>
          <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {plants.map((plant) => (
                <GridListTile key={plant._id} component={Link} to={`/plant/${plant._id}`}>
                  <img src={plant.photo[0]} alt={plant.polishName} />
                  <GridListTileBar
                    title={plant.polishName}
                    subtitle={<span>price: {plant.price}PLN</span>}
                    actionIcon={
                      <IconButton aria-label={`info about ${plant.polishName}`} className={classes.icon}>
                        <InfoIcon />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          {children}
        </Container>
      </div>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object,
  plants: PropTypes.array,
  fetchPlants: PropTypes.func,
};

const mapStateToProps = state => ({
  plants: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPlants: () => dispatch(fetchPlants()),
});

const ContainerConnect = withStyles(useStyles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Component));

export {
  ContainerConnect as Homepage,
  Component as HomepageComponent,
};
