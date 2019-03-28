import React, { Component } from "react";
import API from "../../utils/API";

class NewEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      date: "",
      hours: ""
    };
  }

  componentDidMount() {
    API.getAny().then(res => {
      if (res.data.type !== "admin") {
        this.props.history.push("/");
      }
    });
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  submitEvent = event => {
    event.preventDefault();
    const name = this.state.name.trim();
    const date = this.state.date.trim();
    const hours = this.state.hours.trim();

    API.saveNew("events", {
      name,
      date,
      hours
    }).then(() => {
      this.setState({
        name: "",
        date: "",
        hours: ""
      });
    });
  };

  render() {
    const { name, date, hours } = this.state;

    return (
      <form className="container" onSubmit={this.submitEvent}>
        <h1>Add a New Event</h1>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            className="form-control"
            name="name"
            type="text"
            placeholder="name"
            onChange={this.handleInputChange}
            value={name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            className="form-control"
            name="date"
            placeholder="date"
            onChange={this.handleInputChange}
            value={date}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours Validated:</label>
          <input
            className="form-control"
            name="hours"
            type="text"
            placeholder="hours"
            onChange={this.handleInputChange}
            value={hours}
          />
        </div>

        <button className="btn btn-info" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default NewEvent;
