import React, { Component } from 'react';
import axios from 'axios';

class Home extends Component {
  // initialize our state
  state = {
    user: null,
    patients: [],
  };

  componentDidMount () {
    this.getPatients();
  }

  componentWillUnmount () {
  }

  async getPatients () {
    let response = await axios.get('api/users');
    this.setState({
      patients: response.data.users
    });
    console.log(response.data.users);
  };

  render() {
    const { patients } = this.state;
    return (
      <div>
        <h1>Patients</h1>
        <ul>
          {
            patients.map((patient) => (
              <li key={patient.email}>
                {patient.name}
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default Home;
