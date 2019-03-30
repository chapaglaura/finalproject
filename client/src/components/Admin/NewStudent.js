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
      password: "",
      projects: []
    };
  }

  componentDidMount() {
    API.getAny().then(res => {
      if (res.data.type !== "admin") {
        this.props.history.push("/");
      }
    });

    API.getAll("project").then(res => {
      const projects = [...res.data];
      this.setState({
        projects,
        project: projects[0]._id
      });
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
    const project = this.state.project;
    const username = this.state.username.trim();
    const password = this.state.password.trim();

    API.signupUser({
      username,
      password,
      type: "student"
    }).then(res => {
      if (res) {
        API.saveNew("students", {
          student: {
            name,
            university,
            username
          },
          project,
          userID: res.data._id
        }).then(() => {
          this.setState({
            name: "",
            university: "",
            username: "",
            password: ""
          });
        });
      }
    });
  };

  render() {
    const { name, university, projects, username, password } = this.state;
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
          <label htmlFor="project">Project:</label>
          <select onChange={this.handleInputChange} name="project" className="form-control" id="project">
            {projects.map(project => {
              console.log(project);
              return <option value={project._id} key={project._id}>{project.name}</option>;
            })}
          </select>
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
