import { connect } from 'react-redux';
import Game from './Game';

const mapStateToProps = state => {
  return state.steps;
};

const StatefulGame = connect(mapStateToProps)(Game);

export default StatefulGame;
