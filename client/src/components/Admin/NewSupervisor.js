import React, { Component } from "react";
import API from "../../utils/API";

class NewLeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
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

  submitSupervisor = event => {
    event.preventDefault();
    const name = this.state.name.trim();
    const project = this.state.project.trim();
    const username = this.state.username.trim();
    const password = this.state.password.trim();

    API.signupUser({
      username,
      password,
      type: "supervisor"
    }).then(res => {
      if (res) {
        API.saveNew("supervisors", {
          name,
          project,
          username,
          userID: res.data._id
        }).then(() => {
          this.setState({
            name: "",
            project: "",
            username: ""
          });
        });
      }
    });
  };

  render() {
    const {
      name,
      projects,
      username,
      password
    } = this.state;

    return (
      <form className="container" onSubmit={this.submitSupervisor}>
        <h1>Add a New Supervisor</h1>
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
          <label htmlFor="project">Project:</label>
          <select onChange={this.handleInputChange} name="project" className="form-control" id="project">
            {projects.map(project => {
              console.log(project);
              return <option value={project._id} key={project._id}>{project.name}</option>;
            })}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="username">Assigned username:</label>
          <input
            className="form-control"
            name="username"
            type="text"
            placeholder="username"
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

export default NewLeader;
