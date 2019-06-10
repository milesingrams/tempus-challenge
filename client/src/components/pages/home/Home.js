import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Zoom from '@material-ui/core/Zoom';
import UserInfoCard from 'components/reusable/UserInfoCard';
import Map from 'components/reusable/Map';
import TextField from '@material-ui/core/TextField';

let useStyles = makeStyles(theme => ({
  header: {
    color: 'white'
  },
  nameFilter: {
    backgroundColor: 'white',
    marginBottom: '1rem',
    borderRadius: '4px'
  },
  signOutButton: {
    position: 'fixed',
    top: '1rem',
    right: '1rem'
  },
  homePageContentWrap: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  homePageContent: {
    display: 'flex',
    flexDirection: 'column'
  },
  contentSection: {
    width: '100%',
    ':not(:last-child)': {
      marginBottom: '4rem'
    }
  },
  backgroundMap: {
    opacity: .8,
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: -1
  }
}));

export default function Home ({history}) {
  // initialize our state
  let [user, setUser] = useState(null);
  let [patients, setPatients] = useState([]);
  let [patientsFilter, setPatientsFilter] = useState('');
  let [expandedUser, setExpandedUser] = useState('');
  let mapRef = useRef();

  let classes = useStyles();

  let onUserClick = function (user) {
    mapRef.current.goToLocation(user.location);
    if (expandedUser !== user) {
      setExpandedUser(user);
    } else {
      setExpandedUser('');
    }
  };

  let filteredPatients = function () {
    let filterText = patientsFilter.toLowerCase();
    let filtered = patients.filter((patient) => {
      let patientName = patient.name.toLowerCase();
      return patientName.indexOf(filterText) !== -1;
    });
    return filtered;
  };

  let signOut = async function () {
    let signOutResponse = await axios.get('api/users/signOut');
    if (signOutResponse) {
      history.push('/signIn');
    }
  };

  useEffect(() => {
    let fetchData = async function () {
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
      <Button variant="contained" size="medium" color="secondary" className={classes.signOutButton} onClick={signOut}>
        Sign Out
      </Button>
      <div className={classes.homePageContentWrap}>
        <div className={classes.homePageContent}>
          {user ? (
          <div className={classes.contentSection}>
            <Typography className={classes.header} align="center" component="h1" variant="h5" gutterBottom>
              My Info
            </Typography>
            <Zoom in>
              <div onClick={e => onUserClick(user)}>
                <UserInfoCard user={user} expanded={expandedUser === user}></UserInfoCard>
              </div>
            </Zoom>
          </div>
          ) : null}

          {user && user.role === 'doctor' ? (
          <div className={classes.contentSection}>
            <Typography className={classes.header} align="center" component="h1" variant="h5" gutterBottom>
              Patients
            </Typography>
            <TextField
              label="Name Search"
              className={classes.nameFilter}
              variant="filled"
              fullWidth
              value={patientsFilter}
              onChange={e => setPatientsFilter(e.target.value)}
            />

            {filteredPatients().map((patient, index) => (
            <Zoom in style={{transitionDelay: `${index * 50}ms`}} key={patient._id}>
              <div onClick={e => onUserClick(patient)}>
                <UserInfoCard user={patient} expanded={expandedUser === patient}></UserInfoCard>
              </div>
            </Zoom>)
            )}

          </div>
          ) : null}
        </div>
      </div>
      <div className={classes.backgroundMap}>
        <Map ref={mapRef}></Map>
      </div>
    </div>
  );
}
