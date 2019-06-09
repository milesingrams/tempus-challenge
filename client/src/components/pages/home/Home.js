import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import UserInfoCard from 'components/reusable/UserInfoCard';
import Map from 'components/reusable/Map';
import './Home.scss';

let useStyles = makeStyles(theme => ({
  header: {
    color: 'white'
  }
}));

export default function Home ({history}) {
  // initialize our state
  let [patients, setPatients] = useState([]);
  let [user, setUser] = useState(null);
  let mapRef = useRef();

  let classes = useStyles();

  let goToUserLocation = function (user) {
    mapRef.current.goToLocation(user.location)
  }

  useEffect(() => {
    let fetchData = async () => {
      let userResponse = await axios.get('api/users/me');
      let user = userResponse.data.user
      if (user) {
        setUser(user);

        if (user.role === 'doctor') {
          let patientsResponse = await axios.get('api/users');
          setPatients(patientsResponse.data.users);
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
              { patients.map((patient) =>
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
