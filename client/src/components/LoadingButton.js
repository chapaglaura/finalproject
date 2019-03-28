import React, { Component } from "react";
import API from "../utils/API";
import Button from "react-bootstrap/Button";

class LoadingButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isLoading: false,
      loggedIn: false
    };
  }

  simulateNetworkRequest() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  handleClick = () => {
    this.setState({ isLoading: true }, () => {
      this.simulateNetworkRequest().then(() => {
        this.setState({ isLoading: false, status: !this.state.status });
      });
    });
    if (this.state.check) {
      API.saveCheckOut(this.props.id, { checkOut: new Date() }).then(res => {});
      this.setState({ check: false });
    } else {
      API.saveCheckIn(this.props.id, { checkIn: new Date() }).then(res => {});
      this.setState({ check: true });
    }
  };

  getButtonTextByStatus = () => {
    const { status } = this.state;
    return status ? "Check Out" : "Check In";
  };

  render() {
    const { isLoading } = this.state;

    return (
      <Button
        variant="primary"
        disabled={isLoading}
        onClick={!isLoading ? this.handleClick : null}
      >
        {isLoading ? "Loading…" : this.getButtonTextByStatus()}
      </Button>
    );
  }
}

export default LoadingButton;
