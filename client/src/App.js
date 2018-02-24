import React, { Component } from "react";

class App extends Component {
  // Initialize state
  state = { orders: [] };

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch("/api/orders/get")
      .then(res => res.json())
      .then(orders => this.setState({ orders }));
  };

  render() {
    const { orders } = this.state;

    return <div className="App">{orders}</div>;
  }
}

export default App;
