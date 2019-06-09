import React, { useState, useEffect } from 'react';
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

  let classes = useStyles();

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
              <UserInfoCard user={user}></UserInfoCard>
            </div>
          ) : null}

          {user && user.role === 'doctor' ? (
            <div>
              <div className="content-section">
                <Typography className={classes.header} align="center" component="h1" variant="h5" gutterBottom>
                  Patients
                </Typography>
                { patients.map((patient) =>
                    (<UserInfoCard user={patient}></UserInfoCard>)
                )}
              </div>
              <div className="content-section">
                <Typography className={classes.header} align="center" component="h1" variant="h5" gutterBottom>
                  Patient Info
                </Typography>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div className="background-map">
        <Map></Map>
      </div>
    </div>
  );
}
