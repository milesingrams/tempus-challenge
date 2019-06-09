import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import UserInfoTable from 'components/reusable/UserInfoTable';
import Map from 'components/reusable/Map';
import './Home.scss';

export default function Home () {
  // initialize our state
  let [patients, setPatients] = useState([]);

  useEffect(() => {
    let fetchData = async () => {
      let response = await axios.get('api/users');
      setPatients(response.data.users);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="home-page-content-wrap">
        <div className="home-page-content">
          <div className="content-section">
            <Typography align="center" component="h1" variant="h5" color="primary" gutterBottom>
              My Info
            </Typography>
          </div>
          <div className="content-section">
            <Typography align="center" component="h1" variant="h5" color="primary" gutterBottom>
              Patients
            </Typography>
            <UserInfoTable users={patients}></UserInfoTable>
          </div>
          <div className="content-section">
            <Typography align="center" component="h1" variant="h5" color="primary" gutterBottom>
              Patient Info
            </Typography>
          </div>
        </div>
      </div>
      <div className="background-map">
        <Map></Map>
      </div>
    </div>
  );
}
