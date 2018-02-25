import React, { Component } from "react";
import { connect } from "react-redux";
import { changeWord } from "../actions";

class App extends Component {
  componentDidMount() {
    this.props.wordChange("jelte is cool");
  }
  render() {
    return <div>{this.props.word}</div>;
  }
}

const mapStateToProps = state => {
  return {
    word: state.word
  };
};

const mapDispatchToProps = dispatch => {
  return {
    wordChange: word => {
      dispatch(changeWord(word));
    }
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(App);

export default VisibleTodoList;
