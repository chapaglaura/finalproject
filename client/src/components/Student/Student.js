import React, { Component } from 'react';
import API from "../../utils/API";

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {}
    };
  }

  componentDidMount() {
    API.getStudent(this.props.match.params.id)
      .then(res => {
        this.setState({ student: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const student = this.state.student;
    return (
      <div className="container">
      <p>{student.id}</p>
      </div>
    );
  }
}

export default Student;
