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
      student: {
        name: "",
        username: "",
        university: "",
        hours: 0
      },
      project: {
        name: "",
        id: "",
        hours: 0,
        organization: "",
        area: ""
      }
    };
  }

  componentDidMount() {
    API.getAny().then(res => {
      if (res.data.type !== "student") {
        this.props.history.push("/");
      } else {
        API.getByUserID(res.data.type, res.data._id).then(res => {
          console.log(res);
          const { hours, name, university, username } = res.data.student;
          const { project } = res.data;

          API.getOne("project", project).then(res => {
            console.log(res);
            const project  = {...res.data.dbModel};
            this.setState({
              student: {
                name,
                username,
                university,
                hours
              },
              project
            });
          });
        });
      }
    });
  }

  checkIn = () => {
    const { name, username } = this.state.student;
    const { project } = this.state;
    const date = new Date();
    console.log(name, project, date);
    API.checkIn({
      student: name,
      studentID: username,
      date,
      project
    });
  };

  logout = () => {
    API.logoutUser().then(res => {
      this.props.history.push("/");
    });
  };

  render() {
    const { name, username, university, hours } = this.state.student;
    console.log(hours);
    const project = this.state.project.name;

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
          <button type="button" className="btn btn-info" onClick={this.checkIn}>
            Check in
          </button>
        </div>
        <Card>
          <Card.Header>Quick Information</Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">StudentID: {username}</li>
                <li className="list-group-item">Project: {project}</li>
                <li className="list-group-item">Hours: {'' + hours}</li>
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
