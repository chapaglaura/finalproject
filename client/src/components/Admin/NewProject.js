import React, { Component } from "react";
import API from "../../utils/API";

class NewProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      organization: "",
      area: "",
      students: ""
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

  submitProject = event => {
    event.preventDefault();

    const name = this.state.name.trim();
    const organization = this.state.organization.trim();
    const area = this.state.area.trim();
    const students = parseInt(this.state.students.trim());

    API.saveNew("projects", {
      name,
      organization,
      area,
      students
    }).then(() => {
      this.setState({
        name: "",
        organization: "",
        area: "",
        students: 0
      });
    });
  };

  render() {
    const { name, organization, area, students } = this.state;

    return (
      <form className="container" onSubmit={this.submitProject}>
        <h1>Add a New Social Service Project</h1>
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
          <label htmlFor="org">Organization:</label>
          <input
            className="form-control"
            name="organization"
            type="text"
            placeholder="organization"
            onChange={this.handleInputChange}
            value={organization}
          />
        </div>
        <div className="form-group">
          <label htmlFor="area">Area:</label>
          <input
            className="form-control"
            name="area"
            type="text"
            placeholder="area"
            onChange={this.handleInputChange}
            value={area}
          />
        </div>

        <div className="form-group">
          <label htmlFor="students">Required Students:</label>
          <input
            className="form-control"
            name="students"
            type="text"
            placeholder="students"
            onChange={this.handleInputChange}
            value={students}
          />
        </div>

        <button className="btn btn-info" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default NewProject;
