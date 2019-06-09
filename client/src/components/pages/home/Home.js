import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UserInfoCard from 'components/reusable/UserInfoCard';
import Map from 'components/reusable/Map';
import TextField from '@material-ui/core/TextField';
import './Home.scss';

let useStyles = makeStyles(theme => ({
  header: {
    color: 'white'
  },
  nameFilter: {
    backgroundColor: 'white',
    marginBottom: '1rem',
    borderRadius: '4px'
  }
}));

export default function Home ({history}) {
  // initialize our state
  let [user, setUser] = useState(null);
  let [patients, setPatients] = useState([]);
  let [patientsFilter, setPatientsFilter] = useState('');
  let mapRef = useRef();

  let classes = useStyles();

  let goToUserLocation = function (user) {
    mapRef.current.goToLocation(user.location)
  }

  let filteredPatients = function () {
    let filterText = patientsFilter.toLowerCase();
    let filtered = patients.filter((patient) => {
      let patientName = patient.name.toLowerCase();
      return patientName.indexOf(filterText) !== -1;
    });
    return filtered
  }

  useEffect(() => {
    let fetchData = async () => {
      let userResponse = await axios.get('api/users/me');
      let user = userResponse.data.user
      if (user) {
        setUser(user);

        if (user.role === 'doctor') {
          let patientsResponse = await axios.get('api/users/patients');
          setPatients(patientsResponse.data.patients);
        }
      } else {
        history.push('/signIn')
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="home-page-content-wrap">
        <div className="home-page-content">
          {user ? (
            <div className="content-section">
              <Typography className={classes.header} align="center" component="h1" variant="h5" gutterBottom>
                My Info
              </Typography>
              <div onClick={e => goToUserLocation(user)}>
                <UserInfoCard user={user}></UserInfoCard>
              </div>
            </div>
          ) : null}

          {user && user.role === 'doctor' ? (
            <div className="content-section">
              <Typography className={classes.header} align="center" component="h1" variant="h5" gutterBottom>
                Patients
              </Typography>
                <TextField
                  label="Name Search"
                  className={classes.nameFilter}
                  margin="normal"
                  variant="filled"
                  fullWidth
                  value={patientsFilter}
                  onChange={e => setPatientsFilter(e.target.value)}
                />
              { filteredPatients().map((patient) =>
                  (<div onClick={e => goToUserLocation(patient)} key={patient._id}>
                    <UserInfoCard user={patient}></UserInfoCard>
                  </div>)
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className="background-map">
        <Map ref={mapRef}></Map>
      </div>
    </div>
  );
}
