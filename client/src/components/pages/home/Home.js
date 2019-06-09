import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import UserInfoTable from './UserInfoTable';

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
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Patients
      </Typography>
      <UserInfoTable users={patients}></UserInfoTable>
    </div>
  );
}
