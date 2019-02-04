import { connect } from 'react-redux';
import Board from './Board';

const mapStateToProps = state => {
  return {
    squares: state.steps.history.slice(-1).pop()
  };
};

const StatefulBoard = connect(mapStateToProps)(Board);

export default StatefulBoard;
