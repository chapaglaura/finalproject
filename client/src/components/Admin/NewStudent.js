import React, { Component } from "react";
import API from "../../utils/API";

class NewStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      university: "",
      project: "",
      username: "",
      password: ""
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

  submitStudent = event => {
    event.preventDefault();
    const name = this.state.name.trim();
    const university = this.state.university.trim();
    const project = this.state.project.trim();
    const username = this.state.username.trim();
    const password = this.state.password.trim();

    API.signupUser({
      username,
      password,
      type: "student"
    }).then(res => {
      if (res) {
        API.saveNew("students", {
          name,
          university,
          project,
          username,
          userID: res.data._id
        }).then(() => {
          this.setState({
            name: "",
            university: "",
            project: "",
            username: ""
          });
        });
      }
    });
  };

  render() {
    const { name, university, project, username, password } = this.state;
    return (
      <form className="container" onSubmit={this.submitStudent}>
        <h1>Add a New Social Service Student</h1>
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
          <label htmlFor="university">University:</label>
          <input
            className="form-control"
            name="university"
            placeholder="university"
            onChange={this.handleInputChange}
            value={university}
          />
        </div>

        <div className="form-group">
          <label htmlFor="project">Assigned Project:</label>
          <input
            className="form-control"
            name="project"
            type="text"
            placeholder="project"
            onChange={this.handleInputChange}
            value={project}
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Assigned ID:</label>
          <input
            className="form-control"
            name="username"
            type="text"
            placeholder="id"
            onChange={this.handleInputChange}
            value={username}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            className="form-control"
            name="password"
            type="text"
            placeholder="password"
            onChange={this.handleInputChange}
            value={password}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default NewStudent;
