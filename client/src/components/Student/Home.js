import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Events from "./Events";
import Clock from "../../components/Clock";
import LoadingButton from "../../components/LoadingButton";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      university: "",
      project: "",
      username: "",
      hours: 0,
      checkin: "",
      checkout: "",
      check: false
    };
  }

  componentDidMount() {
    API.getAny().then(res => {
      if (res.data.type !== "student") {
        this.props.history.push("/");
      } else {
        API.getByUserID(res.data.type, res.data._id).then(res => {
          console.log(res);
          const {
            name,
            university,
            project,
            username,
            hours,
            checkin,
            checkout
          } = res.data;
          this.setState({
            name,
            university,
            project,
            username,
            hours,
            checkin,
            checkout
          });
        });
      }
    });
  }

  logout = () => {
    API.logoutUser().then(res => {
      this.props.history.push("/");
    });
  };

  render() {
    const {
      name,
      university,
      project,
      username,
      hours,
      checkin,
      checkout
    } = this.state;
    const id = this.props.match.params.id;
    return (
      <div className="container">
        <div className="d-flex justify-content-between align-items-center py-5">
          <h1>Hello, {name}</h1>
          <Clock />
        </div>
        <h2 id="event">
          <Events />
        </h2>
        <div className="jumbotron">
          <LoadingButton id={id} />
        </div>
        <Card>
          <Card.Header>Quick Information</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">StudentID: {username}</li>
                <li className="list-group-item">Project: {project}</li>
                <li className="list-group-item">Hours: {hours}</li>
              </ul>
            </blockquote>
          </Card.Body>
        </Card>
        <button className="btn btn-info" type="button" onClick={this.logout}>
          Log out
        </button>
      </div>
    );
  }
}

export default Home;
