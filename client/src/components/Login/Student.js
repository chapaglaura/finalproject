import React, { Component } from "react";
import API from "../../utils/API";

class StudentLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  submitLogin = event => {
    event.preventDefault();
    const username = this.state.username.trim();
    const password = this.state.password.trim();
    const type = "student";

    API.loginUser({
      username,
      password,
      type
    }).then(res => {
      const student = res.data;
      if (student) {
        API.getByUserID("student", student._id).then(resp => {
          this.props.history.push(`/student/${student._id}`);
        });
      }
    });
  };

  
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <form className="container" onSubmit={this.submitLogin}>
          <h1>Student Login</h1>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
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
              type="password"
              placeholder="password"
              onChange={this.handleInputChange}
              value={password}
            />
          </div>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default StudentLogin;
